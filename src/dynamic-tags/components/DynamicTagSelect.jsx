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
import { usePostRecord } from '../hooks/usePostRecord';

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

export function DynamicTagSelect( { onInsert, tagName, value: selectedValue, currentPost } ) {
	const [ dynamicTagData, setDynamicTagData ] = useState( {} );
	const [ dynamicSource, setDynamicSource ] = useState( 'current' );
	const [ postTypeSource, setPostTypeSource ] = useState( currentPost?.type ?? 'post' );
	const [ postIdSource, setPostIdSource ] = useState( 0 );
	const [ dynamicTag, setDynamicTag ] = useState( '' );
	const [ dynamicTagType, setDynamicTagType ] = useState( 'post' );
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
		const load = [];
		if ( 'author' === dynamicTagType ) {
			load.push( 'author' );
		} else if ( 'comment' === dynamicTagType ) {
			load.push( 'comments' );
		} else if ( 'term' === dynamicTagType ) {
			load.push( 'terms' );
		}
		return {
			load,
			postType: postTypeSource,
			postId: postIdSource ? postIdSource : currentPostId,
			options: {},
		};
	}, [ dynamicTagType, postIdSource, postTypeSource ] );

	// Use getEntityRecord to get the post to retrieve meta from.
	const { record, isLoading } = usePostRecord( postRecordArgs );

	console.log( { record } );

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

		setDynamicTag( tag );
		setDynamicTagType( dynamicTagData[ tag ]?.type ?? 'post' );

		const params = parsedTag?.params;

		if ( params?.id ) {
			setDynamicSource( 'post' );
			setPostIdSource( parseInt( params.id ) );
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

		if ( params?.link ) {
			setLinkTo( params.link );
		}

		if ( params?.renderIfEmpty ) {
			setRenderIfEmpty( true );
		}
	}, [ selectedValue ] );

	/**
	 * Load the dynamic tags.
	 */
	async function loadTags() {
		if ( Object.keys( dynamicTagData ).length ) {
			return;
		}

		const response = await apiFetch( {
			path: '/generateblocks/v1/dynamic-tags',
			method: 'GET',
		} );

		setDynamicTagData( response.reduce( ( prev, curr ) => {
			return { ...prev, [ curr.tag ]: curr };
		}, {} ) );
	}

	const dynamicTagOptions = useMemo( () => (
		Object.entries( dynamicTagData ).map(
			( [ tag, { title, type } ] ) => ( { label: title, value: tag, type } )
		)
	), [ dynamicTagData ] );

	useEffect( () => {
		loadTags();
	}, [] );

	useEffect( () => {
		if ( ! dynamicTag ) {
			setDynamicTagToInsert( '' );
			return;
		}

		const options = [];

		if ( postIdSource ) {
			options.push( `id:${ postIdSource }` );
		}

		const isMetaTag = dynamicTag.startsWith( 'post_meta' ) ||
            dynamicTag.startsWith( 'author_meta' );

		if ( isMetaTag && metaKey ) {
			options.push( `key:${ metaKey }` );
		}

		if ( dynamicTag.startsWith( 'comments_count' ) ) {
			options.push( `none:${ commentsCountText.none }` );
			options.push( `one:${ commentsCountText.one }` );
			options.push( `multiple:${ commentsCountText.multiple }` );
		}

		if ( linkTo ) {
			options.push( `link:${ linkTo }` );
		}

		if ( renderIfEmpty ) {
			options.push( 'renderIfEmpty' );
		}

		const tagOptions = options.join( '|' );

		let tagToInsert = dynamicTag;

		if ( tagOptions ) {
			tagToInsert += ' ' + tagOptions;
		}

		tagToInsert = `{${ tagToInsert }}`;

		setDynamicTagToInsert( tagToInsert );
	}, [ postIdSource, dynamicTag, metaKey, commentsCountText, linkTo, renderIfEmpty ] );

	const interactiveTagNames = [ 'a', 'button' ];
	const canBeLinked = [ 'post_title', 'comments_count', 'published_date', 'modified_date' ];
	const showLinkTo = canBeLinked.includes( dynamicTag ) && ! interactiveTagNames.includes( tagName );
	const showInsertAsLink = hasSelection && ! interactiveTagNames.includes( tagName ) && ! linkTo;
	const postMetaKeyList = useMemo( () => {
		switch ( dynamicTagType ) {
			case 'post':
				if ( ! record?.meta ) {
					return [];
				}

				return [
					{
						id: 'post_meta',
						label: __( 'Post Meta', 'generateblocks' ),
						items: Object.keys( record.meta ).map( ( key ) => ( { label: key, value: key } ) ),
					},
				];
			case 'author':
				const authorMeta = record?.author?.meta;

				if ( ! authorMeta ) {
					return [];
				}

				return [
					{
						id: 'author_meta',
						label: __( 'Author Meta', 'generateblocks' ),
						items: Object.keys( authorMeta ).map( ( key ) => ( { label: key, value: key } ) ),
					},
				];
			default:
				return [];
		}
	}, [ record, isLoading, dynamicTagType ] );

	const metaKeyOptions = applyFilters(
		'generateblocks.editor.dynamicTags.metaKeys.list',
		postMetaKeyList,
		record,
		{
			dynamicTagType,
			dynamicSource,
			postTypeSource,
			postIdSource,
			dynamicTag,
			isLoading,
		} );

	return (
		<>
			{ isLoading && <p>{ __( 'Loading…', 'generateblocks' ) }</p> }
			<ComboboxControl
				label={ __( 'Select a dynamic tag', 'generateblocks' ) }
				value={ dynamicTag }
				options={ dynamicTagOptions }
				onChange={ ( value ) => setDynamicTag( value ) }
				className="gb-dynamic-tag-select"
			/>

			{ !! dynamicTag && (
				<>
					<ComboboxControl
						label={ __( 'Source', 'generateblocks' ) }
						value={ dynamicSource }
						options={ [
							{ label: __( 'Current', 'generateblocks' ), value: 'current' },
							{ label: __( 'Post', 'generateblocks' ), value: 'post' },
						] }
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

					{ (
						dynamicTagToInsert.startsWith( '{post_meta' ) ||
						dynamicTagToInsert.startsWith( '{author_meta' )
					) && (
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
							options={ [
								{ label: __( 'None', 'generateblocks' ), value: '' },
								{ label: __( 'Post', 'generateblocks' ), value: 'post' },
								{ label: __( 'Comments area', 'generateblocks' ), value: 'comments' },
							] }
							onChange={ ( value ) => setLinkTo( value ) }
						/>
					) }

					<CheckboxControl
						label={ __( 'Render block if empty', 'generateblocks' ) }
						className="gb-dynamic-tag-select__render-if-empty"
						checked={ !! renderIfEmpty }
						onChange={ ( value ) => setRenderIfEmpty( value ) }
						help={ __( 'Render the block even if this dynamic tag has no value.', 'generateblocks' ) }
					/>

					<TextControl
						label={ __( 'Dynamic tag to insert', 'generateblocks' ) }
						value={ dynamicTagToInsert }
						onChange={ ( value ) => setDynamicTagToInsert( value ) }
					/>

					{ !! showInsertAsLink && (
						<CheckboxControl
							label={ __( 'Insert as link', 'generateblocks' ) }
							checked={ insertAsLink }
							onChange={ ( value ) => setInsertAsLink( value ) }
						/>
					) }

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
