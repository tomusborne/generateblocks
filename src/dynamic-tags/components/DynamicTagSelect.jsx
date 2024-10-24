import { useState, useEffect, useMemo, useCallback } from '@wordpress/element';
import {
	ComboboxControl,
	Button,
	TextControl,
	CheckboxControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDebounce } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';

import {
	SelectPost,
	SelectMeta,
	Autocomplete,
	usePostRecord,
	useTermRecord,
	useUserRecord,
} from '@edge22/components';

import { SelectTaxonomy } from './SelectTaxonomy';
import { SelectTerm } from './SelectTerm';
import { useUsers } from '@hooks';

function parseTag( tagString ) {
	const regex = /\{([\w_]+)(?:\s+(\w+(?::(?:[^|]+))?(?:\|[\w_]+(?::(?:[^|]+))?)*)?)?\}/;
	const match = tagString.match( regex );

	if ( ! match ) {
		return null;
	}

	const [ , tag, paramsString ] = match;
	const params = {};

	if ( paramsString ) {
		paramsString.split( '|' ).forEach( ( param ) => {
			const [ key, value ] = param.split( ':' );
			params[ key ] = value || true;
		} );
	}

	return {
		tag,
		params,
	};
}

function getTagSpecificControls( options, extraTagParams, setExtraTagParams ) {
	if ( ! options ) {
		return null;
	}

	return Object.entries( options ).map( ( option ) => {
		const {
			type,
			label,
			help,
			options: choices,
			placeholder = '',
		} = option[ 1 ];

		function handleChange( newValue ) {
			return setExtraTagParams( ( prevState ) => {
				const newState = { ...prevState };

				if ( newValue ) {
					newState[ option[ 0 ] ] = newValue;
				} else {
					delete newState[ option[ 0 ] ];
				}

				return newState;
			} );
		}

		const value = extraTagParams?.[ option[ 0 ] ] ?? '';

		const props = {
			label,
			help,
			value,
			placeholder,
			onChange: handleChange,
		};

		let Component = TextControl;

		switch ( type ) {
			case 'checkbox':
				Component = CheckboxControl;
				break;
			case 'select':
				Component = SelectControl;
				break;
		}

		if ( Array.isArray( choices ) ) {
			props.options = [
				{
					value: '',
					label: __( 'Default', 'generateblocks' ),
				},
				...choices.map( ( choice ) => {
					if ( 'object' === typeof choice ) {
						return {
							value: choice.value,
							label: choice?.label ?? choice.value,
						};
					}

					return { label: choice, value: choice };
				} ),
			];
		}

		if ( 'number' === type ) {
			props.type = 'number';
		}

		if ( 'checkbox' === type ) {
			props.checked = !! value;
			delete props.value;
		}

		/**
		 * Allow developers to filter the control output.
		 *
		 * @since 2.0
		 * @param {Object} options Options object from tag registration.
		 * @param {Object} state   The current state and state setter.
		 */
		return applyFilters(
			'generateblocks.editor.tagSpecificControls',
			<Component key={ option[ 0 ] } { ...props } />,
			options,
			{ state: extraTagParams, setState: setExtraTagParams }
		);
	} );
}

function getVisibleTags( dynamicTags, context ) {
	return dynamicTags.filter( ( tag ) => {
		const { visibility = true } = tag;

		if ( ! visibility ) {
			return false;
		}

		if ( true === visibility ) {
			return true;
		}

		if ( visibility?.context ) {
			return visibility.context.every( ( key ) => context?.[ key ] );
		}

		return true;
	} );
}

function getLinkToKeySourceId( linkTo, postRecord, postId, userId, termId ) {
	if ( linkTo.includes( 'author' ) && postRecord ) {
		return postRecord?.post_author;
	}

	return postId || userId || termId;
}

function getLinkToType( linkTo ) {
	if ( linkTo.includes( 'term' ) ) {
		return 'term';
	}

	if ( linkTo.includes( 'author' ) ) {
		return 'author';
	}

	if ( linkTo.includes( 'user' ) ) {
		return 'user';
	}

	return 'post';
}

export function DynamicTagSelect( { onInsert, tagName, selectedText, currentPost, context } ) {
	const allTags = generateBlocksEditor?.dynamicTags;
	const availableTags = getVisibleTags( allTags, context );
	const imageSizeOptions = useMemo( () => {
		const imageSizes = generateBlocksInfo?.imageSizes ?? [];

		return [
			...imageSizes.map( ( size ) => {
				const sanitizedSizeLabel = size
					.replace( '-', ' ' )
					.replace( '_', ' ' );

				return {
					value: size,
					label: sanitizedSizeLabel.charAt( 0 ).toUpperCase() + sanitizedSizeLabel.slice( 1 ),
				};
			} ),
		];
	}, [] );

	// State.
	const [ dynamicSource, setDynamicSource ] = useState( 'current' );
	const [ extraTagParams, setExtraTagParams ] = useState( {} );
	const [ postIdSource, setPostIdSource ] = useState( '' );
	const [ taxonomySource, setTaxonomySource ] = useState( '' );
	const [ termSource, setTermSource ] = useState( '' );
	const debouncedSetTermSource = useDebounce( setTermSource, 200 );
	const [ userSource, setUserSource ] = useState( '' );
	const [ dynamicTagToInsert, setDynamicTagToInsert ] = useState( '' );
	const [ metaKey, setMetaKey ] = useState( '' );
	const debouncedSetMetaKey = useDebounce( setMetaKey, 200 );
	const [ linkTo, setLinkTo ] = useState( '' );
	const [ linkToKey, setLinkToKey ] = useState( '' );
	const debouncedSetLinkToKey = useDebounce( setLinkToKey, 200 );
	const [ required, setRequired ] = useState( true );
	const [ imageSize, setImageSize ] = useState( 'full' );
	const [ dynamicTag, setDynamicTag ] = useState( () => {
		if ( 'loop_item' === availableTags[ 0 ]?.tag ) {
			return availableTags[ 0 ]?.tag;
		}

		return '';
	} );
	const [ dynamicTagData, setDynamicTagData ] = useState( () => {
		if ( dynamicTag ) {
			return allTags.find( ( tag ) => tag.tag === dynamicTag );
		}
	} );

	// Derived state and values.
	const dynamicTagSupports = dynamicTagData?.supports ?? [];
	const dynamicTagType = dynamicTagData?.type ?? 'post';
	const tagSupportsMeta = dynamicTagSupports?.includes( 'meta' );
	const tagSupportsImageSize = dynamicTagSupports?.includes( 'image-size' );
	const showSource = [ 'post', 'user', 'term' ].includes( dynamicTagType );
	const contextPostId = context?.postId ?? 0;
	const currentPostId = contextPostId ? contextPostId : currentPost?.id ?? 0;

	// TODO: Check if we need to do the terms thing anymore now that we're using SelectTerm.
	const postRecordArgs = useMemo( () => {
		const options = {};
		const load = [];
		if ( 'author' === dynamicTagType || linkTo.includes( 'author' ) ) {
			load.push( 'author' );
		} else if ( 'comment' === dynamicTagType || linkTo.includes( 'comment' ) ) {
			load.push( 'comments' );
		} else if ( 'term' === dynamicTagType || linkTo.includes( 'term' ) ) {
			load.push( 'terms' );
		} else if ( 'post' === dynamicTagType ) {
			load.push( 'post' );
		}

		if ( taxonomySource ) {
			options.taxonomy = taxonomySource;
		}

		const args = {
			load,
			options,
			postId: 0,
		};

		if ( postIdSource ) {
			args.postId = parseInt( postIdSource, 10 );
		} else if ( 'current' === dynamicSource ) {
			args.postId = currentPostId;
		}

		return args;
	}, [ dynamicTagType, postIdSource, taxonomySource, linkTo ] );

	// Use getEntityRecord to get the post to retrieve meta from.
	const { record } = usePostRecord( postRecordArgs );
	const { records: allUsers } = useUsers( 'user' === dynamicSource );

	const userOptions = useMemo( () => {
		return Array.isArray( allUsers ) ? allUsers.map( ( user ) => {
			return {
				label: `#${ user.id } ${ user.username }`,
				value: `${ user.id }`,
			};
		} ) : [];
	}, [ allUsers ] );

	const { record: termRecord } = useTermRecord( {
		termId: termSource,
		taxonomy: taxonomySource,
	} );
	const { record: userRecord } = useUserRecord( userSource );

	const updateDynamicTag = useCallback( function updateDynamicTag( newTag ) {
		setDynamicTag( newTag );
		const tagData = allTags.find( ( tag ) => tag.tag === newTag );
		setDynamicTagData( tagData );
		setLinkTo( '' );
		setDynamicSource( 'current' );
		setPostIdSource( '' );
		setTaxonomySource( '' );
		setTermSource( '' );
		setUserSource( '' );
		setMetaKey( '' );
		setExtraTagParams( {} );
		setImageSize( 'full' );

		return tagData;
	}, [
		setDynamicTag,
		setDynamicTagData,
		setLinkTo,
		setDynamicSource,
		setPostIdSource,
		setTaxonomySource,
		setTermSource,
		setUserSource,
		setMetaKey,
		setExtraTagParams,
		setImageSize,
		allTags,
	] );

	/**
	 * If there's an existing value we're highlighting, fill in our fields with the
	 * appropriate values.
	 */
	useEffect( () => {
		if ( ! selectedText ) {
			return;
		}

		const parsedTag = parseTag( selectedText );
		const tag = parsedTag?.tag;

		if ( ! tag ) {
			return;
		}

		const { type } = updateDynamicTag( tag );

		const {
			id = null,
			key = null,
			link = null,
			required: requiredParam = true,
			tax = null,
			size = null,
			...extraParams
		} = parsedTag?.params;

		if ( id ) {
			if ( 'term' === type ) {
				setDynamicSource( 'term' );
				setTermSource( id );
			} else if ( 'user' === type ) {
				setDynamicSource( 'user' );
				setUserSource( id );
			} else {
				setDynamicSource( 'post' );
				setPostIdSource( id );
			}
		}

		if ( key ) {
			setMetaKey( key );
		}

		if ( tax ) {
			setTaxonomySource( tax );
		}

		if ( link ) {
			const linkToValues = link.split( ',' );

			setLinkTo( linkToValues[ 0 ] );

			if ( linkToValues[ 1 ] ) {
				setLinkToKey( linkToValues[ 1 ] );
			}
		}

		if ( size ) {
			setImageSize( size );
		}

		if ( 'false' === requiredParam ) {
			setRequired( false );
		}

		if ( extraParams ) {
			setExtraTagParams( extraParams );
		}
	}, [ selectedText ] );

	const dynamicTagOptions = useMemo( () => (
		Object.entries( availableTags ).map(
			( [ , { title, tag } ] ) => ( { label: title, value: tag } )
		)
	), [ availableTags ] );

	useEffect( () => {
		if ( ! dynamicTag ) {
			setDynamicTagToInsert( '' );
			return;
		}

		const options = [];

		if ( 'term_meta' === dynamicTag && 'term' !== dynamicSource ) {
			setDynamicSource( 'term' );
		} else if ( ! dynamicSource || 'term_meta' === dynamicSource ) {
			setDynamicSource( 'current' );
		}

		if ( postIdSource && 'post' === dynamicSource ) {
			options.push( `id:${ postIdSource }` );
		} else if ( termSource && 'term' === dynamicSource ) {
			options.push( `id:${ termSource }` );
		}

		if ( tagSupportsMeta && metaKey ) {
			options.push( `key:${ metaKey }` );
		}

		if ( linkTo && dynamicTagSupports.includes( 'link' ) ) {
			const linkToValues = [ linkTo ];

			if ( linkToKey ) {
				linkToValues.push( linkToKey );
			}

			options.push( `link:${ linkToValues.join( ',' ) }` );
		}

		if ( imageSize && 'full' !== imageSize ) {
			options.push( `size:${ imageSize }` );
		}

		if ( ! required ) {
			options.push( 'required:false' );
		}

		if ( taxonomySource && 'term' === dynamicTagType ) {
			options.push( `tax:${ taxonomySource }` );
		}

		if ( extraTagParams ) {
			Object.entries( extraTagParams ).forEach( ( [ key, value ] ) => {
				// If the value is false just remove it.
				if ( false === value ) {
					return;
				}

				// If value is true, we only need to add the key.
				if ( true === value ) {
					options.push( key );
				} else {
					options.push( `${ key }:${ value }` );
				}
			} );
		}

		const tagOptions = options.join( '|' );

		let tagToInsert = dynamicTag;

		if ( tagOptions ) {
			tagToInsert += ' ' + tagOptions;
		}

		tagToInsert = `{${ tagToInsert }}`;

		setDynamicTagToInsert( tagToInsert );
	}, [
		postIdSource,
		dynamicTag,
		dynamicTagType,
		dynamicTagSupports,
		metaKey,
		linkTo,
		linkToKey,
		required,
		taxonomySource,
		termSource,
		extraTagParams,
		imageSize,
	] );

	const interactiveTagNames = [ 'a', 'button' ];
	const supportsLink = dynamicTagSupports.includes( 'link' );
	const showLinkTo = supportsLink && ! interactiveTagNames.includes( tagName );
	const showLinkToKey = showLinkTo && ( linkTo.includes( 'meta' ) || linkTo.includes( 'option' ) );
	const linkToOptions = useMemo( () => {
		if ( ! showLinkTo ) {
			return [];
		}

		switch ( dynamicTagType ) {
			case 'term':
				return [
					{ label: __( 'None', 'generateblocks' ), value: '' },
					{ label: __( 'Term', 'generateblocks' ), value: 'term' },
				];
			default:
				return [
					{ label: __( 'None', 'generateblocks' ), value: '' },
					{ label: __( 'Post', 'generateblocks' ), value: 'post' },
					{ label: __( 'Comments area', 'generateblocks' ), value: 'comments' },
					{ label: __( 'Post Meta', 'generateblocks' ), value: 'post_meta' },
					{ label: __( 'Author Meta', 'generateblocks' ), value: 'author_meta' },
					{ label: __( 'Author Archive', 'generateblocks' ), value: 'author_archive' },
					{ label: __( 'Author Email', 'generateblocks' ), value: 'author_email' },
				];
		}
	}, [ dynamicTagType, showLinkTo ] );

	const sourceOptions = useMemo( () => {
		if ( 'term_meta' === dynamicTag ) {
			return [
				{ label: __( 'Current Term', 'generateblocks' ), value: 'current' },
				{ label: __( 'Term', 'generateblocks' ), value: 'term' },
			];
		}

		if ( 'user' === dynamicTagType ) {
			return [
				{ label: __( 'Current User', 'generateblocks' ), value: 'current' },
				{ label: __( 'Specific User', 'generateblocks' ), value: 'user' },
			];
		}

		return [
			{ label: __( 'Current Post', 'generateblocks' ), value: 'current' },
			{ label: __( 'Specific Post', 'generateblocks' ), value: 'post' },
		];
	}, [ dynamicTag ] );

	const tagSpecificControls = useMemo( () => {
		return getTagSpecificControls(
			dynamicTagData?.options,
			extraTagParams,
			setExtraTagParams
		);
	}, [ dynamicTagData?.options, extraTagParams, setExtraTagParams ] );

	return (
		<>
			<ComboboxControl
				label={ __( 'Select a dynamic tag', 'generateblocks' ) }
				value={ dynamicTag }
				options={ dynamicTagOptions }
				onChange={ updateDynamicTag }
				className="gb-dynamic-tag-select"
				help={ dynamicTagData?.description }
			/>

			{ !! dynamicTag && (
				<>
					{ showSource && (
						<ComboboxControl
							label={ __( 'Source', 'generateblocks' ) }
							value={ dynamicSource }
							options={ sourceOptions }
							onChange={ setDynamicSource }
						/>
					) }

					{ 'post' === dynamicSource && (
						<>
							<SelectPost
								label={ __( 'Select source post', 'generateblocks' ) }
								value={ postIdSource }
								onSelect={ ( selected ) => setPostIdSource( selected?.value ?? '' ) }
								onClear={ () => setPostIdSource( '' ) }
								onAdd={ ( { inputValue } ) => setPostIdSource( inputValue ) }
								onEnter={ ( inputValue ) => {
									setPostIdSource( inputValue );
								} }
								currentPostId={ currentPostId }
							/>
						</>
					) }

					{ 'user' === dynamicSource && (
						<>
							<Autocomplete
								label={ __( 'Select source user', 'generateblocks' ) }
								defaultValue={ userSource }
								selected={ userSource }
								onSelect={ ( selected ) => setUserSource( selected?.value ?? '' ) }
								source={ userOptions }
								showClear={ true }
								onClear={ () => setUserSource( '' ) }
								afterInputWrapper={ ( { inputValue, items } ) => {
									return (
										<Button
											variant="primary"
											size="compact"
											className="gb-gc-add__button"
											disabled={ ! inputValue || items.length > 0 }
											onClick={ () => {
												setUserSource( inputValue );
											} }
										>
											{ __( 'Add', 'generateblocks' ) }
										</Button>
									);
								} }
							/>
						</>
					) }

					{ 'term' === dynamicTagType && (
						<SelectTaxonomy
							onChange={ setTaxonomySource }
							postType={ record?.post_type }
							value={ taxonomySource }
						/>
					) }

					{ ( 'term' === dynamicSource ) && (
						<SelectTerm
							postId={ postIdSource }
							value={ termSource }
							onSelect={ ( selected ) => {
								const newTermSource = selected?.value ?? selected;
								debouncedSetTermSource( newTermSource ? newTermSource : 0 );
							} }
							taxonomy={ taxonomySource }
						/>
					) }

					{ tagSupportsMeta && (
						<SelectMeta
							value={ metaKey }
							onSelect={ ( newSelected ) => {
								const newMetaKey = newSelected?.value ?? newSelected;
								debouncedSetMetaKey( newMetaKey ? newMetaKey : '' );
							} }
							onEnter={ ( inputValue ) => {
								setMetaKey( inputValue );
							} }
							onClear={ () => setMetaKey( '' ) }
							onAdd={ ( { inputValue } ) => setMetaKey( inputValue ) }
							post={ record }
							user={ userRecord }
							term={ termRecord }
							source={ dynamicSource }
							sourceId={ postIdSource || userSource || termSource }
							type={ dynamicTagType }
							help={ __( 'Enter an existing meta key or choose from the list.', 'generateblocks' ) }
						/>
					) }

					{ tagSupportsImageSize && (
						<ComboboxControl
							label={ __( 'Image Size', 'generateblocks' ) }
							value={ imageSize }
							options={ imageSizeOptions }
							onChange={ setImageSize }
						/>
					) }

					{ tagSpecificControls }

					{ showLinkTo && (
						<>
							<ComboboxControl
								label={ __( 'Link to', 'generateblocks' ) }
								value={ linkTo }
								options={ linkToOptions }
								onChange={ setLinkTo }
							/>
							{ showLinkToKey && (
								<SelectMeta
									value={ linkToKey }
									onSelect={ ( newSelected ) => {
										const newMetaKey = newSelected?.value ?? newSelected;
										debouncedSetLinkToKey( newMetaKey ? newMetaKey : '' );
									} }
									onEnter={ setLinkToKey }
									onClear={ () => setLinkToKey( '' ) }
									onAdd={ ( { inputValue } ) => setLinkToKey( inputValue ) }
									post={ record }
									user={ userRecord }
									term={ termRecord }
									source={ dynamicSource }
									sourceId={ getLinkToKeySourceId( linkTo, record, postIdSource, userSource, termSource ) }
									type={ getLinkToType( linkTo ) }
									help={ __( 'Enter an existing meta key or choose from the list.', 'generateblocks' ) }
								/>
							) }
						</>
					) }

					<TextControl
						label={ __( 'Dynamic tag to insert', 'generateblocks' ) }
						value={ dynamicTagToInsert }
						onChange={ setDynamicTagToInsert }
					/>

					<CheckboxControl
						label={ __( 'Required to render', 'generateblocks' ) }
						className="gb-dynamic-tag-select__render-if-empty"
						checked={ !! required }
						onChange={ setRequired }
						help={ __( 'This tag must output a value for the block to be rendered.', 'generateblocks' ) }
					/>

					<Button
						variant="primary"
						onClick={ () => {
							onInsert( dynamicTagToInsert );
						} }
					>
						{ __( 'Insert dynamic tag', 'generateblocks' ) }
					</Button>
				</>
			) }
		</>
	);
}
