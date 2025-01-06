import { useState, useEffect, useMemo } from '@wordpress/element';
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
	SelectUser,
	SelectTerm,
} from '@edge22/components';

import { SelectTaxonomy } from './SelectTaxonomy';
import { parseTag } from '../utils';

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
				props.checked = !! value;
				delete props.value;

				break;
			case 'select':
				Component = SelectControl;
				break;
		}

		if ( Array.isArray( choices ) ) {
			props.options = choices.map( ( choice ) => {
				if ( 'object' === typeof choice ) {
					return {
						value: choice.value,
						label: choice?.label ?? choice.value,
					};
				}

				return { label: choice, value: choice };
			} );
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

function getVisibleTags( dynamicTags, context, attributes ) {
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

		if ( Array.isArray( visibility?.attributes ) ) {
			return visibility.attributes.every( ( attribute ) => {
				const { value, name = '', compare = '===' } = attribute;

				if ( ! name || undefined === value ) {
					return true;
				}

				const attributeValue = attributes?.[ name ] ?? '';

				switch ( compare ) {
					case 'IN':
						if ( Array.isArray( attributeValue ) ) {
							return attributeValue.includes( value );
						}

						return value.includes( attributeValue );
					case 'NOT_IN':
						if ( Array.isArray( attributeValue ) ) {
							return ! attributeValue.includes( value );
						}

						return ! value.includes( attributeValue );
					case '!==':
						return attributeValue !== value;
					case '===':
					default:
						return attributeValue === value;
				}
			} );
		}

		return true;
	} );
}

function getLinkToKeySourceId( linkTo, postRecord, postId, userId, termId ) {
	if ( linkTo?.includes( 'author' ) && postRecord ) {
		return postRecord?.post_author;
	}

	return postId || userId || termId;
}

function getLinkToType( linkTo ) {
	if ( linkTo?.includes( 'term' ) ) {
		return 'term';
	}

	if ( linkTo?.includes( 'author' ) ) {
		return 'author';
	}

	if ( linkTo?.includes( 'user' ) ) {
		return 'user';
	}

	return 'post';
}

function tagSupports( tagData, support ) {
	const { supports = [] } = tagData;

	const tagSupport = {
		meta: supports?.includes( 'meta' ) || supports?.includes( 'properties' ),
		'image-size': supports?.includes( 'image-size' ),
		date: supports?.includes( 'date' ),
		taxonomy: supports?.includes( 'taxonomy' ),
		source: supports?.includes( 'source' ),
		link: supports?.includes( 'link' ),
	};

	if ( Array.isArray( support ) ) {
		return support.every( ( item ) => tagSupport[ item ] || false );
	}

	return tagSupport[ support ] || false;
}

export function DynamicTagSelect( {
	onInsert,
	tagName,
	selectedText,
	currentPost,
	currentUser,
	context,
	queryClient,
} ) {
	const currentLoopItem = context?.[ 'generateblocks/loopItem' ] ?? {};
	const queryType = context?.[ 'generateblocks/queryType' ] ?? 'WP_Query';
	const allTags = generateBlocksEditor?.dynamicTags;
	const availableTags = getVisibleTags( allTags, context, { tagName } );
	const imageSizeOptions = useMemo( () => {
		const imageSizes = Array.isArray( generateBlocksInfo?.imageSizes )
			? generateBlocksInfo.imageSizes
			: Object.values( generateBlocksInfo?.imageSizes ?? {} );

		return imageSizes.map( ( size ) => {
			const sanitizedSizeLabel = size
				.replace( '-', ' ' )
				.replace( '_', ' ' );

			return {
				value: size,
				label: sanitizedSizeLabel.charAt( 0 ).toUpperCase() + sanitizedSizeLabel.slice( 1 ),
			};
		} );
	}, [] );

	// State.
	const [ dynamicSource, setDynamicSource ] = useState( 'current' );
	const [ extraTagParams, setExtraTagParams ] = useState( {} );
	const [ postIdSource, setPostIdSource ] = useState( '' );
	const [ taxonomySource, setTaxonomySource ] = useState( '' );
	const [ termSource, setTermSource ] = useState( '' );
	const debouncedSetTermSource = useDebounce( setTermSource, 200 );
	const [ userSource, setUserSource ] = useState( '' );
	const [ mediaSource, setMediaSource ] = useState( '' );
	const [ dynamicTagToInsert, setDynamicTagToInsert ] = useState( '' );
	const [ metaKey, setMetaKey ] = useState( '' );
	const debouncedSetMetaKey = useDebounce( setMetaKey, 200 );
	const [ linkTo, setLinkTo ] = useState( '' );
	const [ linkToKey, setLinkToKey ] = useState( '' );
	const debouncedSetLinkToKey = useDebounce( setLinkToKey, 200 );
	const [ required, setRequired ] = useState( true );
	const [ imageSize, setImageSize ] = useState( 'full' );
	const [ dateFormat, setDateFormat ] = useState( '' );
	const [ dynamicTag, setDynamicTag ] = useState( '' );
	const [ dynamicTagData, setDynamicTagData ] = useState( () =>
		dynamicTag
			? allTags.find( ( tag ) => tag.tag === dynamicTag )
			: {}
	);

	// Derived state and values.
	const dynamicTagType = dynamicTagData?.type ?? null;
	const tagSupportsMeta = tagSupports( dynamicTagData, 'meta' );
	const tagSupportsImageSize = tagSupports( dynamicTagData, 'image-size' );
	const tagSupportsDate = tagSupports( dynamicTagData, 'date' );
	const tagSupportsTaxonomy = tagSupports( dynamicTagData, 'taxonomy' );
	const tagSupportsLink = tagSupports( dynamicTagData, 'link' );
	const showSource = tagSupports( dynamicTagData, 'source' );
	const contextPostId = context?.postId ?? 0;
	const currentPostId = contextPostId ? contextPostId : currentPost?.id ?? 0;
	const sourcesInOptions = applyFilters(
		'generateblocks.dynamicTags.sourcesInOptions',
		[]
	);

	const postRecordArgs = useMemo( () => {
		const options = {};
		const load = [];
		if ( 'comment' === dynamicTagType || linkTo?.includes( 'comment' ) ) {
			load.push( 'comments' );
		}

		if ( 'post' === dynamicTagType ) {
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
	const { record: termRecord } = useTermRecord( {
		termId: parseInt( termSource, 10 ),
		taxonomy: taxonomySource,
	} );

	let userRecordId = userSource || 0;

	if ( 'current' === dynamicSource ) {
		if ( 'user' === dynamicTagType ) {
			userRecordId = currentUser?.id ?? 0;
		} else if ( 'author' === dynamicTagType ) {
			userRecordId = currentPost?.author ?? 0;
		}
	}

	const { record: userRecord } = useUserRecord(
		parseInt( userRecordId, 10 )
	);

	function updateDynamicTag( newTag ) {
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
		setImageSize( 'full' );
		setDateFormat( '' );

		// Check if there are any tag specific controls with default values to set.
		const defaultExtraTagParams = {};
		const options = tagData?.options;

		if ( options ) {
			for ( const option in options ) {
				const { default: defaultValue = null } = options[ option ];

				if ( ! [ null, '' ].includes( defaultValue ) ) {
					defaultExtraTagParams[ option ] = defaultValue;
				}
			}
		}

		setExtraTagParams( defaultExtraTagParams );

		return tagData;
	}

	/**
	 * If there's an existing value we're highlighting, fill in our fields with the
	 * appropriate values.
	 */
	useEffect( () => {
		if ( ! selectedText || dynamicTag ) {
			return;
		}

		const parsedTag = parseTag( selectedText );
		const tag = parsedTag?.tag;

		if ( ! tag ) {
			return;
		}

		const { type } = updateDynamicTag( tag );
		const newTagData = allTags.find( ( tagData ) => tagData.tag === tag ) ?? {};

		const {
			id = null,
			source = null,
			key = null,
			link = null,
			required: requiredParam = true,
			tax = null,
			size = null,
			dateFormat: dateFormatParam = null,
			...extraParams
		} = parsedTag?.params;

		if ( id ) {
			switch ( type ) {
				case 'term':
					setDynamicSource( 'term' );
					setTermSource( id );
					break;
				case 'user':
					setDynamicSource( 'user' );
					setUserSource( id );
					break;
				case 'media':
					setMediaSource( id );
					break;
				case 'post':
				default:
					setDynamicSource( 'post' );
					setPostIdSource( id );
					break;
			}
		}

		if ( sourcesInOptions.includes( source ) ) {
			setDynamicSource( source );
		}

		// If the tag doesn't support meta, treat the `key` as an extra param.
		if ( tagSupports( newTagData, 'meta' ) && key ) {
			setMetaKey( key );
		} else if ( key ) {
			extraParams.key = key;
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

		if ( dateFormatParam ) {
			setDateFormat( dateFormatParam );
		}

		if ( 'false' === requiredParam ) {
			setRequired( false );
		}

		if ( extraParams ) {
			setExtraTagParams( extraParams );
		}
	}, [ selectedText, dynamicTag ] );

	const dynamicTagOptions = useMemo( () => {
		const groups = Object.values( availableTags ).reduce( ( acc, { type, title, tag } ) => {
			const typeLabel = type.charAt( 0 ).toUpperCase() + type.slice( 1 );

			return {
				...acc,
				[ type ]: {
					id: type,
					label: typeLabel,
					items: Array.isArray( acc[ type ]?.items )
						? [ ...acc[ type ].items, { label: title, value: tag } ]
						: [ { label: title, value: tag } ],
				},
			};
		}, {} );
		const options = Object.values( groups );

		if ( 'WP_Query' === queryType ) {
			options.sort( ( a, b ) => {
				// Ensure the 'post' group is first then leave the order unchanged.
				if ( a.id === 'post' && b.id !== 'post' ) {
					return -1;
				}

				if ( b.id === 'post' && a.id !== 'post' ) {
					return 1;
				}

				return 0;
			} );
		}

		return options;
	}, [ availableTags, queryType ] );

	useEffect( () => {
		if ( ! dynamicTag ) {
			setDynamicTagToInsert( '' );
			return;
		}

		const options = [];

		if ( postIdSource && 'post' === dynamicTagType && 'post' !== dynamicSource ) {
			setDynamicSource( 'post' );
		} else if ( userSource && 'user' === dynamicTagType && 'user' !== dynamicSource ) {
			setDynamicSource( 'user' );
		} else if ( termSource && 'term' === dynamicTagType && 'term' !== dynamicSource ) {
			setDynamicSource( 'term' );
		} else if ( ! dynamicSource ) {
			setDynamicSource( 'current' );
		}

		if ( sourcesInOptions.includes( dynamicSource ) ) {
			options.push( `source:${ dynamicSource }` );
		}

		if ( postIdSource && 'post' === dynamicSource ) {
			options.push( `id:${ postIdSource }` );
		} else if ( termSource && 'term' === dynamicSource ) {
			options.push( `id:${ termSource }` );
		} else if ( userSource && 'user' === dynamicSource ) {
			options.push( `id:${ userSource }` );
		} else if ( mediaSource && 'media' === dynamicTagType ) {
			options.push( `id:${ mediaSource }` );
		}

		if ( tagSupportsMeta && metaKey ) {
			options.push( `key:${ metaKey }` );
		}

		if ( linkTo && tagSupportsLink ) {
			const linkToValues = [ linkTo ];

			if ( linkToKey ) {
				linkToValues.push( linkToKey );
			}

			options.push( `link:${ linkToValues.join( ',' ) }` );
		}

		if ( imageSize && 'full' !== imageSize ) {
			options.push( `size:${ imageSize }` );
		}

		if ( dateFormat ) {
			options.push( `dateFormat:${ dateFormat }` );
		}

		if ( ! required ) {
			options.push( 'required:false' );
		}

		if ( taxonomySource && ( 'term' === dynamicTagType || tagSupportsTaxonomy ) ) {
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

		tagToInsert = `{{${ tagToInsert }}}`;

		setDynamicTagToInsert( tagToInsert );
	}, [
		postIdSource,
		dynamicTag,
		dynamicTagType,
		dynamicSource,
		metaKey,
		linkTo,
		linkToKey,
		required,
		taxonomySource,
		termSource,
		userSource,
		extraTagParams,
		imageSize,
		tagSupportsMeta,
		tagSupportsTaxonomy,
		tagSupportsLink,
		dateFormat,
		mediaSource,
	] );

	const interactiveTagNames = [ 'a', 'button' ];
	const showLinkTo = tagSupportsLink && ! interactiveTagNames.includes( tagName );
	const showLinkToKey = showLinkTo && ( linkTo?.includes( 'meta' ) || linkTo?.includes( 'option' ) );
	const linkToOptions = useMemo( () => {
		if ( ! showLinkTo ) {
			return [];
		}

		if ( 'term' === dynamicTagType || tagSupportsTaxonomy ) {
			return [
				{ label: __( 'None', 'generateblocks' ), value: '' },
				{ label: __( 'Term', 'generateblocks' ), value: 'term' },
			];
		}

		return [
			{ label: __( 'None', 'generateblocks' ), value: '' },
			{ label: __( 'Post', 'generateblocks' ), value: 'post' },
			{ label: __( 'Comments area', 'generateblocks' ), value: 'comments' },
			{ label: __( 'Post Meta', 'generateblocks' ), value: 'post_meta' },
			{ label: __( 'Author Meta', 'generateblocks' ), value: 'author_meta' },
			{ label: __( 'Author Archive', 'generateblocks' ), value: 'author_archive' },
			{ label: __( 'Author Email', 'generateblocks' ), value: 'author_email' },
		];
	}, [ dynamicTagType, showLinkTo, tagSupportsTaxonomy ] );

	const sourceOptions = useMemo( () => {
		const options = [];

		if ( 'term' === dynamicTagType ) {
			options.push(
				{ label: __( 'Current Term', 'generateblocks' ), value: 'current' },
				{ label: __( 'Term', 'generateblocks' ), value: 'term' }
			);
		} else if ( dynamicTagType === 'user' ) {
			options.push(
				{ label: __( 'Current User', 'generateblocks' ), value: 'current' },
				{ label: __( 'Specific User', 'generateblocks' ), value: 'user' }
			);
		} else {
			options.push(
				{ label: __( 'Current Post', 'generateblocks' ), value: 'current' },
				{ label: __( 'Specific Post', 'generateblocks' ), value: 'post' }
			);
		}

		return applyFilters(
			'generateblocks.dynamicTags.sourceOptions',
			options,
			{
				dynamicTagType,
			},
		);
	}, [ dynamicTagType ] );

	const tagSpecificControls = useMemo( () => {
		return getTagSpecificControls(
			dynamicTagData?.options,
			extraTagParams,
			setExtraTagParams
		);
	}, [ dynamicTagData?.options, extraTagParams, setExtraTagParams ] );

	const loopItemKeys = useMemo( () => {
		return currentLoopItem
			? Object.keys( currentLoopItem )
				.filter( ( key ) => ( key.startsWith( '_' ) || 'password' === key.toLowerCase() )
					? false
					: true
				)
				.map( ( key ) => ( { label: key, value: key } ) )
			: [];
	}, [ currentLoopItem ] );

	return (
		<>
			<Autocomplete
				label={ __( 'Select a dynamic tag', 'generateblocks' ) }
				selected={ dynamicTag }
				source={ dynamicTagOptions }
				onSelect={ ( selected ) => updateDynamicTag( selected?.value ?? '' ) }
				className="gb-dynamic-tag-select"
				help={ dynamicTagData?.description }
				toStringKey="label"
				itemFilter={ Autocomplete.groupItemFilter }
				filterOnSelect={ false }
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
								onChange={ ( selected ) => setPostIdSource( selected?.value ?? '' ) }
								onClear={ () => setPostIdSource( '' ) }
								onAdd={ ( { inputValue } ) => setPostIdSource( inputValue ) }
								onEnter={ ( inputValue ) => {
									setPostIdSource( inputValue );
								} }
								currentPostId={ currentPostId }
								includeCurrent={ false }
								queryClient={ queryClient }
							/>
						</>
					) }

					{ 'user' === dynamicSource && (
						<>
							<SelectUser
								label={ __( 'Select source user', 'generateblocks' ) }
								value={ userSource }
								onChange={ ( selected ) => setUserSource( selected?.value ?? '' ) }
								showClear={ true }
								onClear={ () => setUserSource( '' ) }
								includeCurrent={ false }
								queryClient={ queryClient }
							/>
						</>
					) }

					{ ( ( 'term' === dynamicTagType && 'term' === dynamicSource ) || tagSupportsTaxonomy ) && (
						<SelectTaxonomy
							onChange={ setTaxonomySource }
							postType={ 'term' !== dynamicTagType && record?.post_type }
							value={ taxonomySource }
						/>
					) }

					{ ( 'term' === dynamicSource && taxonomySource ) && (
						<SelectTerm
							postId={ 'post' === dynamicTagType && postIdSource }
							value={ termSource }
							onChange={ ( selected ) => {
								const newTermSource = selected?.value ?? selected;
								debouncedSetTermSource( newTermSource ? newTermSource : 0 );
							} }
							taxonomy={ taxonomySource }
							includeCurrent={ false }
							onClear={ () => setTermSource( '' ) }
						/>
					) }

					{ 'media' === dynamicTagType && (
						<>
							<SelectPost
								label={ __( 'Select source media', 'generateblocks' ) }
								value={ mediaSource }
								onChange={ ( selected ) => setMediaSource( selected?.value ?? '' ) }
								onClear={ () => setMediaSource( '' ) }
								onAdd={ ( { inputValue } ) => setMediaSource( inputValue ) }
								onEnter={ ( inputValue ) => {
									setMediaSource( inputValue );
								} }
								currentPostId={ currentPostId }
								includeCurrent={ false }
								postStatus={ [ 'inherit' ] }
								postType={ [ 'attachment' ] }
								queryClient={ queryClient }
							/>
						</>
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
							fallback={ loopItemKeys }
							post={ record }
							user={ userRecord }
							term={ termRecord }
							source={ dynamicSource }
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

					{ tagSupportsDate && (
						<TextControl
							label={ __( 'Date Format', 'generateblocks' ) }
							value={ dateFormat }
							placeholder={ generateBlocksEditor?.dateFormat ?? '' }
							onChange={ setDateFormat }
							help={ __( 'Enter a valid date format. Leave blank to use the default format.', 'generateblocks' ) }
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
									source={ getLinkToKeySourceId( linkTo, record, postIdSource, userSource, termSource ) }
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
