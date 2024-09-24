import { useState, useEffect, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { ComboboxControl, Button, TextControl, CheckboxControl, SelectControl } from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';

import { Autocomplete } from '@edge22/components';

import { SelectPostType } from './SelectPostType';
import { SelectPost } from './SelectPost';
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

export function DynamicTagSelect( { onInsert, tagName, value: selectedValue, currentPost } ) {
	const [ availableTags, setAvailableTags ] = useState( {} );
	const [ dynamicSource, setDynamicSource ] = useState( 'current' );
	const [ postTypeSource, setPostTypeSource ] = useState( currentPost?.type ?? 'post' );
	const [ postIdSource, setPostIdSource ] = useState( 0 );
	const [ taxonomySource, setTaxonomySource ] = useState( '' );
	const [ termSource, setTermSource ] = useState( 0 );
	const [ dynamicTag, setDynamicTag ] = useState( '' );
	const [ dynamicTagData, setDynamicTagData ] = useState( { type: 'post' } );
	const dynamicTagSupports = dynamicTagData?.supports ?? [];
	const dynamicTagType = dynamicTagData?.type ?? 'post';
	const [ dynamicTagToInsert, setDynamicTagToInsert ] = useState( '' );
	const [ metaKey, setMetaKey ] = useState( '' );
	const [ insertAsLink, setInsertAsLink ] = useState( false );
	const [ commentsCountText, setCommentsCountText ] = useState( {
		none: __( 'No comments', 'generateblocks' ),
		one: __( 'One comment', 'generateblocks' ),
		// translators: %s: number of comments
		multiple: __( '%s comments', 'generateblocks' ),
	} );
	const [ linkTo, setLinkTo ] = useState( '' );
	const [ renderIfEmpty, setRenderIfEmpty ] = useState( false );

	const { getSelectionStart, getSelectionEnd } = useSelect( blockEditorStore, [] );
	const selectionStart = getSelectionStart();
	const selectionEnd = getSelectionEnd();
	const hasSelection = selectionStart?.offset !== selectionEnd?.offset;
	const currentPostId = currentPost?.id ?? 0;

	const postRecordArgs = useMemo( () => {
		const options = {};
		const load = [];
		if ( 'author' === dynamicTagType ) {
			load.push( 'author' );
		} else if ( 'comment' === dynamicTagType ) {
			load.push( 'comments' );
		} else if ( 'term' === dynamicTagType ) {
			load.push( 'terms' );
		}

		if ( taxonomySource ) {
			options.taxonomy = taxonomySource;
		}

		return {
			load,
			options,
			postType: postTypeSource,
			postId: postIdSource ? postIdSource : currentPostId,
		};
	}, [ dynamicTagType, postIdSource, postTypeSource, taxonomySource ] );

	// Use getEntityRecord to get the post to retrieve meta from.
	const { record, isLoading } = usePostRecord( postRecordArgs );
	const { record: termRecord, isLoading: termRecordLoading } = useTermRecord( {
		termId: termSource,
		taxonomy: taxonomySource,
	} );

	function updateDynamicTag( newTag ) {
		setDynamicTag( newTag );
		setDynamicTagData( availableTags[ newTag ] );
		setLinkTo( '' );
		setInsertAsLink( false );
	}

	/**
	 * If there's an existing value we're highlighting, fill in our fields with the
	 * appropriate values.
	 */
	useEffect( () => {
		if ( ! selectedValue ) {
			return;
		}

		const parsedTag = parseTag( selectedValue );
		const tag = parsedTag?.tag;

		if ( ! tag ) {
			return;
		}

		updateDynamicTag( tag );

		const params = parsedTag?.params;

		if ( params?.id ) {
			if ( 'term_meta' === tag ) {
				setDynamicSource( 'term' );
				setTermSource( parseInt( params.id ) );
			} else {
				setDynamicSource( 'post' );
				setPostIdSource( parseInt( params.id ) );
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
	}, [ selectedValue, availableTags, dynamicTagType ] );

	const dynamicTagOptions = useMemo( () => (
		Object.entries( availableTags ).map(
			( [ tag, { title, type } ] ) => ( { label: title, value: tag, type } )
		)
	), [ availableTags ] );

	useEffect( () => {
		/**
		 * Load the dynamic tags.
		 */
		async function loadTags() {
			if ( Object.keys( availableTags ).length ) {
				return;
			}

			const response = await apiFetch( {
				path: '/generateblocks/v1/dynamic-tags',
				method: 'GET',
			} );

			setAvailableTags( response.reduce( ( prev, curr ) => {
				return { ...prev, [ curr.tag ]: curr };
			}, {} ) );
		}

		loadTags();
	}, [] );

	useEffect( () => {
		if ( ! dynamicTag ) {
			setDynamicTagToInsert( '' );
			return;
		}

		const options = [];

		if ( 'term_meta' === dynamicTag && 'term' !== dynamicSource ) {
			setDynamicSource( 'term' );
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
	const showInsertAsLink = supportsLink && hasSelection && ! interactiveTagNames.includes( tagName ) && ! linkTo;
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

				const postItems = Object.keys( record.meta ).map( ( key ) => ( { label: key, value: key } ) );

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
	}, [ record, isLoading, dynamicTag, dynamicTagType, termRecordLoading, termRecord ] );

	const metaKeyOptions = applyFilters(
		'generateblocks.editor.dynamicTags.metaKeys.list',
		postMetaKeyList,
		{
			postRecord: record,
			termRecord,
			dynamicTagType,
			dynamicSource,
			termSource,
			postTypeSource,
			postIdSource,
			dynamicTag,
			isLoading,
		} );

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
			{ isLoading && <p>{ __( 'Loading…', 'generateblocks' ) }</p> }
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
							<SelectPostType
								value={ postTypeSource }
								onChange={ ( value ) => setPostTypeSource( value ) }
							/>

							<SelectPost
								postType={ postTypeSource }
								value={ postIdSource }
								id={ 'gblocks-select-post' }
								label={ __( 'Select source post', 'generateblocks' ) }
								help={ __( 'Search by name or ID.', 'generateblocks' ) }
								onChange={ ( value ) => setPostIdSource( value ) }
								isMulti={ false }
							/>
						</>
					) }

					{ 'term' === dynamicTagType && (
						<SelectTaxonomy
							onChange={ setTaxonomySource }
							value={ taxonomySource }
							postType={ postTypeSource }
							currentPostOnly={ 'term' !== dynamicSource }
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
							label={ __( 'Meta key', 'generateblocks' ) }
							defaultValue={ metaKey }
							selected={ metaKey }
							onSelect={ ( { value } ) => {
								setMetaKey( value );
							} }
							source={ metaKeyOptions }
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

					{ !! showInsertAsLink && (
						<CheckboxControl
							label={ __( 'Insert as link', 'generateblocks' ) }
							checked={ insertAsLink }
							onChange={ ( value ) => setInsertAsLink( value ) }
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
							onInsert( {
								value: dynamicTagToInsert,
								insertAsLink,
							} );
						} }
					>
						{ __( 'Insert dynamic tag', 'generateblocks' ) }
					</Button>
				</>
			) }
		</>
	);
}
