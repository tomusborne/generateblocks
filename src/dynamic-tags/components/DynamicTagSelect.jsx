import { useState, useEffect, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { ComboboxControl, Button, TextControl, CheckboxControl } from '@wordpress/components';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { SelectPostType } from './SelectPostType';
import { SelectPost } from './SelectPost';

export function DynamicTagSelect( { onInsert } ) {
	const [ dynamicTagData, setDynamicTagData ] = useState( [] );
	const [ dynamicSource, setDynamicSource ] = useState( 'current' );
	const [ postTypeSource, setPostTypeSource ] = useState( 'post' );
	const [ postIdSource, setPostIdSource ] = useState( 0 );
	const [ dynamicTag, setDynamicTag ] = useState( '' );
	const [ dynamicTagToInsert, setDynamicTagToInsert ] = useState( '' );
	const [ metaKey, setMetaKey ] = useState( '' );
	const [ insertAsLink, setInsertAsLink ] = useState( false );

	const { getSelectionStart, getSelectionEnd } = useSelect( blockEditorStore, [] );
	const selectionStart = getSelectionStart();
	const selectionEnd = getSelectionEnd();
	const hasSelection = selectionStart?.offset !== selectionEnd?.offset;

	async function loadTags() {
		if ( dynamicTagData.length ) {
			return;
		}

		const response = await apiFetch( {
			path: '/generateblocks/v1/dynamic-tags',
			method: 'GET',
		} );

		setDynamicTagData( response );
	}

	const dynamicTagOptions = useMemo( () => (
		dynamicTagData.map( ( { title, tag } ) => ( { label: title, value: tag } ) )
	), [ dynamicTagData ] );

	useEffect( () => {
		loadTags();
	}, [] );

	useEffect( () => {
		if ( ! dynamicTag ) {
			setDynamicTagToInsert( '' );
			return;
		}

		let tagToInsert = dynamicTag;
		const tags = [];

		if ( postIdSource ) {
			tags.push( `postId=${ postIdSource }` );
		}

		if ( metaKey ) {
			tags.push( `metaKey=${ metaKey }` );
		}

		const tagOptions = tags.join( '|' );

		if ( tagOptions ) {
			tagToInsert += ' ' + tagOptions;
		}

		tagToInsert = `{${ tagToInsert }}`;

		setDynamicTagToInsert( tagToInsert );
	}, [ postIdSource, dynamicTag, metaKey ] );

	return (
		<>
			<ComboboxControl
				label={ __( 'Select a dynamic tag', 'generateblocks' ) }
				value={ dynamicTag }
				options={ dynamicTagOptions }
				onChange={ ( value ) => setDynamicTag( value ) }
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

					{ dynamicTagToInsert.startsWith( '{post_meta' ) && (
						<TextControl
							label={ __( 'Meta key', 'generateblocks' ) }
							value={ metaKey }
							onChange={ ( value ) => setMetaKey( value ) }
						/>
					) }

					<TextControl
						label={ __( 'Dynamic tag to insert', 'generateblocks' ) }
						value={ dynamicTagToInsert }
						onChange={ ( value ) => setDynamicTagToInsert( value ) }
					/>

					{ !! hasSelection && (
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
