import { useState, useEffect, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { ComboboxControl, Button, TextControl, CheckboxControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDebounce } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';

import { Autocomplete } from '@edge22/components';

import { SelectTaxonomy } from './SelectTaxonomy';
import { usePostRecord } from '../hooks/usePostRecord';
import { useTermRecord } from '../hooks/useTermRecord';
import { useUserRecord } from '../hooks/useUserRecord';
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

function getLinkToOptions( type ) {
	switch ( type ) {
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
			];
	}
}

function groupFilter( source, query, itemToString ) {
	return source
		.map( ( item ) => {
			const { items = [] } = item;
			return {
				...item,
				items: items.filter( ( subItem ) =>
					itemToString( subItem ).toLowerCase().includes( query.toLowerCase() )
				),
			};
		} )
		.filter( ( f ) => f.items.length > 0 );
}

function getTagSpecificControls( options, extraTagParams, setExtraTagParams ) {
	if ( ! options ) {
		return null;
	}

	return Object.entries( options ).map( ( option ) => {
		const { type, label, help, choices } = option[ 1 ];

		function handleChange( newValue ) {
			return setExtraTagParams( ( prevState ) => {
				return {
					...prevState,
					[ option[ 0 ] ]: newValue,
				};
			} );
		}

		const value = extraTagParams?.[ option[ 0 ] ];
		const props = {
			label,
			help,
			value,
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
			props.options = choices;
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

export function DynamicTagSelect( { onInsert, tagName, selectedText, currentPost, currentUser, context } ) {
	const availableTags = getVisibleTags( generateBlocksEditor?.dynamicTags, context );
	const [ dynamicSource, setDynamicSource ] = useState( 'current' );
	const [ extraTagParams, setExtraTagParams ] = useState( {} );
	const [ allPosts, setAllPosts ] = useState( [] );
	const [ postIdSource, setPostIdSource ] = useState( '' );
	const [ taxonomySource, setTaxonomySource ] = useState( '' );
	const [ termSource, setTermSource ] = useState( '' );
	const [ userSource, setUserSource ] = useState( '' );
	const [ dynamicTag, setDynamicTag ] = useState( '' );
	const [ dynamicTagData, setDynamicTagData ] = useState( { type: 'post' } );
	const dynamicTagSupports = dynamicTagData?.supports ?? [];
	const dynamicTagType = dynamicTagData?.type ?? 'post';
	const tagSupportsMeta = dynamicTagSupports?.includes( 'meta' );
	const showSource = [ 'post', 'user', 'term' ].includes( dynamicTagType );
	const [ dynamicTagToInsert, setDynamicTagToInsert ] = useState( '' );
	const [ metaKey, setMetaKey ] = useState( '' );
	const debouncedSetMetaKey = useDebounce( setMetaKey, 200 );
	const [ commentsCountText, setCommentsCountText ] = useState( {
		none: __( 'No comments', 'generateblocks' ),
		one: __( 'One comment', 'generateblocks' ),
		// translators: %s: number of comments
		multiple: __( '%s comments', 'generateblocks' ),
	} );
	const [ linkTo, setLinkTo ] = useState( '' );
	const [ renderIfEmpty, setRenderIfEmpty ] = useState( false );
	const [ separator, setSeparator ] = useState( '' );
	const currentPostId = currentPost?.id ?? 0;

	useEffect( () => {
		/**
		 * Load the dynamic tags.
		 */
		async function loadPosts() {
			if ( Object.keys( allPosts ).length ) {
				return;
			}

			const response = await apiFetch( {
				path: '/generateblocks/v1/get-posts',
				method: 'GET',
			} );

			setAllPosts( response );
		}

		loadPosts();
	}, [] );

	const { records: allUsers } = useUsers( 'user' === dynamicSource );

	const userOptions = useMemo( () => {
		return Array.isArray( allUsers ) ? allUsers.map( ( user ) => {
			return {
				label: `#${ user.id } ${ user.username }`,
				value: `${ user.id }`,
			};
		} ) : [];
	}, [ allUsers ] );

	const postRecordArgs = useMemo( () => {
		const options = {};
		const load = [];
		if ( 'author' === dynamicTagType ) {
			load.push( 'author' );
		} else if ( 'comment' === dynamicTagType ) {
			load.push( 'comments' );
		} else if ( 'term' === dynamicTagType ) {
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
	}, [ dynamicTagType, postIdSource, taxonomySource ] );

	// Use getEntityRecord to get the post to retrieve meta from.
	const { record } = usePostRecord( postRecordArgs );
	const { record: termRecord, isLoading: termRecordLoading } = useTermRecord( {
		termId: termSource,
		taxonomy: taxonomySource,
	} );
	const { record: userRecord } = useUserRecord( userSource );

	function updateDynamicTag( newTag ) {
		setDynamicTag( newTag );
		const tagData = availableTags.find( ( tag ) => tag.tag === newTag );
		setDynamicTagData( tagData );
		setLinkTo( '' );
		setDynamicSource( 'current' );
		setPostIdSource( '' );
		setTaxonomySource( '' );
		setTermSource( '' );
		setUserSource( '' );
		setMetaKey( '' );

		return tagData;
	}

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
			none = null,
			one = null,
			multiple = null,
			link = null,
			renderIfEmpty: renderIfEmptyParam = null,
			sep = null,
			tax = null,
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

		if ( 'comments_count' === tag ) {
			const existingCommentsCountText = { ...commentsCountText };

			if ( none ) {
				existingCommentsCountText.none = none;
			}

			if ( one ) {
				existingCommentsCountText.one = one;
			}

			if ( multiple ) {
				existingCommentsCountText.multiple = multiple;
			}

			setCommentsCountText( existingCommentsCountText );
		}

		if ( tax ) {
			setTaxonomySource( tax );
		}

		if ( sep ) {
			setSeparator( sep );
		}

		if ( link ) {
			setLinkTo( link );
		}

		if ( renderIfEmptyParam ) {
			setRenderIfEmpty( true );
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

		if ( dynamicTag.startsWith( 'comments_count' ) ) {
			options.push( `none:${ commentsCountText.none }` );
			options.push( `one:${ commentsCountText.one }` );
			options.push( `multiple:${ commentsCountText.multiple }` );
		}

		if ( linkTo && dynamicTagSupports.includes( 'link' ) ) {
			options.push( `link:${ linkTo }` );
		}

		if ( dynamicTag.startsWith( 'term_list' ) && separator ) {
			options.push( `sep:${ separator }` );
		}

		if ( renderIfEmpty ) {
			options.push( 'renderIfEmpty' );
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
		commentsCountText,
		linkTo,
		renderIfEmpty,
		taxonomySource,
		termSource,
		separator,
		extraTagParams,
	] );

	const interactiveTagNames = [ 'a', 'button' ];
	const supportsLink = dynamicTagSupports.includes( 'link' );
	const showLinkTo = supportsLink && ! interactiveTagNames.includes( tagName );
	const linkToOptions = useMemo( () => {
		if ( ! showLinkTo ) {
			return [];
		}

		return getLinkToOptions( dynamicTagType );
	}, [ dynamicTagType, showLinkTo ] );
	const metaKeys = useMemo( () => {
		if ( ! tagSupportsMeta ) {
			return [];
		}

		switch ( dynamicTagType ) {
			case 'post':
				if ( ! record?.meta ) {
					return [];
				}

				const postItems = applyFilters(
					'generateblocks.editor.dynamicTags.postMetaKeys',
					Object.keys( record.meta ).map( ( key ) => ( { label: key, value: key } ) ),
					record
				);

				if ( postItems.length === 0 ) {
					return [];
				}

				return [
					{
						id: 'post_meta',
						label: __( 'Post Meta', 'generateblocks' ),
						items: postItems,
					},
				];
			case 'author':
				const authorMeta = record?.author?.meta;

				if ( ! authorMeta ) {
					return [];
				}

				const authorItems = Object.keys( authorMeta ).map( ( key ) => ( { label: key, value: key } ) );

				if ( authorItems.length === 0 ) {
					return [];
				}

				return [
					{
						id: 'author_meta',
						label: __( 'Author Meta', 'generateblocks' ),
						items: authorItems,
					},
				];
			case 'user':
				const userMeta = 'current' === dynamicSource ? currentUser?.meta : userRecord?.meta ?? {};

				if ( ! userMeta ) {
					return [];
				}
				const userItems = Object.keys( userMeta ).map( ( key ) => ( { label: key, value: key } ) );

				if ( userItems.length === 0 ) {
					return [];
				}

				return [
					{
						id: 'user_meta',
						label: __( 'User Meta', 'generateblocks' ),
						items: userItems,
					},
				];
			case 'term':
				const termMeta = termRecord?.meta ?? {};

				if ( ! termMeta ) {
					return [];
				}
				const termItems = Object.keys( termMeta ).map( ( key ) => ( { label: key, value: key } ) );

				if ( termItems.length === 0 ) {
					return [];
				}

				return [
					{
						id: 'term_meta',
						label: __( 'Term Meta', 'generateblocks' ),
						items: termItems,
					},
				];
			default:
				return [];
		}
	}, [ record, dynamicTag, dynamicTagType, termRecordLoading, termRecord, tagSupportsMeta, currentUser, userRecord, dynamicSource ] );

	const metaKeyOptions = applyFilters(
		'generateblocks.editor.dynamicTags.metaKeys',
		metaKeys,
		{
			postRecord: record,
			userRecord: userRecord ? userRecord : currentUser,
			termRecord,
			dynamicTagType,
			dynamicSource,
			termSource,
			postIdSource,
			dynamicTag,
		}
	);

	const termOptions = useMemo( () => {
		if ( ! record?.terms?.length ) {
			return [];
		}

		return record.terms.map( ( term ) => {
			return {
				label: term.name,
				value: term.id,
			};
		} );
	}, [ record, taxonomySource ] );

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
		console.log( { extraTagParams } );
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
							<Autocomplete
								label={ __( 'Select source post', 'generateblocks' ) }
								defaultValue={ postIdSource }
								selected={ postIdSource }
								onSelect={ ( { value } ) => setPostIdSource( value ) }
								source={ allPosts }
								showClear={ true }
								onClear={ () => setPostIdSource( '' ) }
								afterInputWrapper={ ( { inputValue, items } ) => {
									return (
										<Button
											variant="primary"
											size="compact"
											className="gb-gc-add__button"
											disabled={ ! inputValue || items.length > 0 }
											onClick={ () => {
												setPostIdSource( inputValue );
											} }
										>
											{ __( 'Add', 'generateblocks' ) }
										</Button>
									);
								} }
							/>
						</>
					) }

					{ 'user' === dynamicSource && (
						<>
							<Autocomplete
								label={ __( 'Select source user', 'generateblocks' ) }
								defaultValue={ userSource }
								selected={ userSource }
								onSelect={ ( { value } ) => setUserSource( value ) }
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
							value={ taxonomySource }
						/>
					) }

					{ ( 'term' === dynamicSource ) && (
						<ComboboxControl
							id={ 'gblocks-select-term' }
							label={ __( 'Select Term', 'generateblocks' ) }
							placeholder={ __( 'Select Term', 'generateblocks' ) }
							options={ termOptions }
							value={ termSource }
							onChange={ setTermSource }
						/>
					) }

					{ tagSupportsMeta && (
						<Autocomplete
							className="gb-meta-key-select"
							label={ __( 'Meta key', 'generateblocks' ) }
							selected={ metaKey }
							onSelect={ ( newSelected ) => {
								const newMetaKey = newSelected?.value ?? newSelected;
								debouncedSetMetaKey( newMetaKey ? newMetaKey : '' );
							} }
							source={ metaKeyOptions }
							toStringKey="value"
							showClear={ true }
							onEnter={ ( inputValue ) => {
								setMetaKey( inputValue );
							} }
							onClear={ () => setMetaKey( '' ) }
							itemFilter={ groupFilter }
							afterInputWrapper={ ( { inputValue, items } ) => {
								return (
									<Button
										variant="primary"
										size="compact"
										className="gb-gc-add__button"
										disabled={ ! inputValue || items.length > 0 }
										onClick={ () => setMetaKey( inputValue ) }
									>
										{ __( 'Add', 'generateblocks' ) }
									</Button>
								);
							} }
						/>
					) }

					{ dynamicTagToInsert.startsWith( '{comments_count' ) && (
						<>
							<TextControl
								label={ __( 'No comments text', 'generateblocks' ) }
								value={ commentsCountText.none }
								onChange={ ( value ) => setCommentsCountText( { ...commentsCountText, none: value } ) }
							/>

							<TextControl
								label={ __( 'One comment text', 'generateblocks' ) }
								value={ commentsCountText.one }
								onChange={ ( value ) => setCommentsCountText( { ...commentsCountText, one: value } ) }
							/>

							<TextControl
								label={ __( 'Multiple comments text', 'generateblocks' ) }
								value={ commentsCountText.multiple }
								onChange={ ( value ) => setCommentsCountText( { ...commentsCountText, multiple: value } ) }
							/>
						</>
					) }

					{ dynamicTagToInsert.startsWith( '{term_list' ) && (
						<>
							<TextControl
								label={ __( 'Separator', 'generateblocks' ) }
								value={ separator }
								onChange={ setSeparator }
							/>
						</>
					) }

					{ tagSpecificControls }

					{ showLinkTo && (
						<SelectControl
							label={ __( 'Link to', 'generateblocks' ) }
							value={ linkTo }
							options={ linkToOptions }
							onChange={ setLinkTo }
						/>
					) }

					<TextControl
						label={ __( 'Dynamic tag to insert', 'generateblocks' ) }
						value={ dynamicTagToInsert }
						onChange={ setDynamicTagToInsert }
					/>

					<CheckboxControl
						label={ __( 'Render block if empty', 'generateblocks' ) }
						className="gb-dynamic-tag-select__render-if-empty"
						checked={ !! renderIfEmpty }
						onChange={ setRenderIfEmpty }
						help={ __( 'Render the block even if this dynamic tag has no value.', 'generateblocks' ) }
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
