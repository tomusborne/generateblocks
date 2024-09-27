import { useState, useEffect, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { ComboboxControl, Button, TextControl, CheckboxControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

import { Autocomplete } from '@edge22/components';

import { SelectTaxonomy } from './SelectTaxonomy';
import { usePostRecord } from '../hooks/usePostRecord';
import { useTermRecord } from '../hooks/useTermRecord';

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

export function DynamicTagSelect( { onInsert, tagName, selectedText, currentPost } ) {
	const availableTags = generateBlocksEditor?.dynamicTags;
	const [ dynamicSource, setDynamicSource ] = useState( 'current' );
	const [ allPosts, setAllPosts ] = useState( [] );
	const [ postIdSource, setPostIdSource ] = useState( '' );
	const [ taxonomySource, setTaxonomySource ] = useState( '' );
	const [ termSource, setTermSource ] = useState( '' );
	const [ dynamicTag, setDynamicTag ] = useState( '' );
	const [ dynamicTagData, setDynamicTagData ] = useState( { type: 'post' } );
	const dynamicTagSupports = dynamicTagData?.supports ?? [];
	const dynamicTagType = dynamicTagData?.type ?? 'post';
	const [ dynamicTagToInsert, setDynamicTagToInsert ] = useState( '' );
	const [ metaKey, setMetaKey ] = useState( '' );
	const [ commentsCountText, setCommentsCountText ] = useState( {
		none: __( 'No comments', 'generateblocks' ),
		one: __( 'One comment', 'generateblocks' ),
		// translators: %s: number of comments
		multiple: __( '%s comments', 'generateblocks' ),
	} );
	const [ linkTo, setLinkTo ] = useState( '' );
	const [ renderIfEmpty, setRenderIfEmpty ] = useState( false );
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

		return {
			load,
			options,
			postId: postIdSource ? postIdSource : currentPostId,
		};
	}, [ dynamicTagType, postIdSource, taxonomySource ] );

	// Use getEntityRecord to get the post to retrieve meta from.
	const { record } = usePostRecord( postRecordArgs );
	const { record: termRecord, isLoading: termRecordLoading } = useTermRecord( {
		termId: termSource,
		taxonomy: taxonomySource,
	} );

	function updateDynamicTag( newTag ) {
		setDynamicTag( newTag );
		setDynamicTagData( availableTags.find( ( tag ) => tag.tag === newTag ) );
		setLinkTo( '' );
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

		updateDynamicTag( tag );

		const params = parsedTag?.params;

		if ( params?.id ) {
			if ( 'term_meta' === tag ) {
				setDynamicSource( 'term' );
				setTermSource( params.id );
			} else {
				setDynamicSource( 'post' );
				setPostIdSource( params.id );
			}
		}

		if ( params?.key ) {
			setMetaKey( params.key );
		}

		if ( 'comments_count' === tag ) {
			const existingCommentsCountText = { ...commentsCountText };

			if ( params.none ) {
				existingCommentsCountText.none = params.none;
			}

			if ( params.one ) {
				existingCommentsCountText.one = params.one;
			}

			if ( params.multiple ) {
				existingCommentsCountText.multiple = params.multiple;
			}

			setCommentsCountText( existingCommentsCountText );
		}

		if ( params?.tax ) {
			setTaxonomySource( params.tax );
		}

		if ( params?.link ) {
			setLinkTo( params.link );
		}

		if ( params?.renderIfEmpty ) {
			setRenderIfEmpty( true );
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

		const isMetaTag = dynamicTag.includes( '_meta' );

		if ( isMetaTag && metaKey ) {
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

		if ( renderIfEmpty ) {
			options.push( 'renderIfEmpty' );
		}

		if ( taxonomySource && 'term' === dynamicTagType ) {
			options.push( `tax:${ taxonomySource }` );
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
	const postMetaKeyList = useMemo( () => {
		if ( ! dynamicTag.includes( '_meta' ) ) {
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

				const authorItems = Object.keys( termMeta ).map( ( key ) => ( { label: key, value: key } ) );

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
	}, [ record, dynamicTag, dynamicTagType, termRecordLoading, termRecord ] );

	const metaKeyOptions = applyFilters(
		'generateblocks.editor.dynamicTags.metaKeys.list',
		postMetaKeyList,
		{
			postRecord: record,
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
				{ label: __( 'Term', 'generateblocks' ), value: 'term' },
			];
		}
		return [
			{ label: __( 'Current', 'generateblocks' ), value: 'current' },
			{ label: __( 'Post', 'generateblocks' ), value: 'post' },
		];
	}, [ dynamicTag ] );

	return (
		<>
			<ComboboxControl
				label={ __( 'Select a dynamic tag', 'generateblocks' ) }
				value={ dynamicTag }
				options={ dynamicTagOptions }
				onChange={ ( value ) => updateDynamicTag( value ) }
				className="gb-dynamic-tag-select"
			/>

			{ !! dynamicTag && (
				<>
					<ComboboxControl
						label={ __( 'Source', 'generateblocks' ) }
						value={ dynamicSource }
						options={ sourceOptions }
						onChange={ ( value ) => setDynamicSource( value ) }
					/>

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

					{ dynamicTag.includes( '_meta' ) && (
						<Autocomplete
							className="gb-meta-key-select"
							label={ __( 'Meta key', 'generateblocks' ) }
							defaultValue={ metaKey }
							selected={ metaKey }
							onSelect={ ( { value } ) => setMetaKey( value ) }
							source={ metaKeyOptions }
							toStringKey="value"
							showClear={ true }
							onClear={ () => setMetaKey( '' ) }
							afterInputWrapper={ ( { inputValue, items } ) => {
								return (
									<Button
										variant="primary"
										size="compact"
										className="gb-gc-add__button"
										disabled={ ! inputValue || items.length > 0 }
										onClick={ () => {
											setMetaKey( inputValue );
										} }
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

					{ showLinkTo && (
						<SelectControl
							label={ __( 'Link to', 'generateblocks' ) }
							value={ linkTo }
							options={ linkToOptions }
							onChange={ ( value ) => setLinkTo( value ) }
						/>
					) }

					<TextControl
						label={ __( 'Dynamic tag to insert', 'generateblocks' ) }
						value={ dynamicTagToInsert }
						onChange={ ( value ) => setDynamicTagToInsert( value ) }
					/>

					<CheckboxControl
						label={ __( 'Render block if empty', 'generateblocks' ) }
						className="gb-dynamic-tag-select__render-if-empty"
						checked={ !! renderIfEmpty }
						onChange={ ( value ) => setRenderIfEmpty( value ) }
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
