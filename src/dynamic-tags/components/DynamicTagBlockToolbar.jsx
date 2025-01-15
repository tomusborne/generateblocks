import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { BlockControls, store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { create, insert, replace, RichTextData } from '@wordpress/rich-text';

import { DynamicTagModal } from '..';
import { getIcon } from '@utils/index.js';

function getTags( value, data ) {
	const foundTags = [];

	for ( const key in data ) {
		const tag = data[ key ].tag;
		// Create a regular expression to match {tag_name ...}
		const regex = new RegExp( `\\{{${ tag }[^}]*\\}}`, 'g' );

		// Find all matches for the current tag
		const matches = value.match( regex );

		// If matches are found, push them to the foundTags array
		if ( matches ) {
			foundTags.push( ...matches );
		}
	}

	return foundTags;
}

function isSelectionInsideTags( selectionOffset, selectionEndOffset, foundTags, value ) {
	return foundTags.some( ( tag ) => {
		const tagStart = value.indexOf( tag );
		const tagEnd = tagStart + tag.length;

		// Check if the selection falls strictly inside the tag range (excluding boundaries)
		return (
			( selectionOffset > tagStart && selectionOffset < tagEnd ) || // Start strictly inside tag
            ( selectionEndOffset > tagStart && selectionEndOffset < tagEnd ) || // End strictly inside tag
            ( selectionOffset <= tagStart && selectionEndOffset >= tagEnd ) // Selection wraps around the tag
		);
	} );
}

export function DynamicTagBlockToolbar( {
	tagName,
	value,
	contentMode,
	setContentMode,
	onChange,
	context,
	isSelected,
} ) {
	const previewEnabled = 'enabled' === generateBlocksEditor?.dynamicTagsPreview;
	const allTags = generateBlocksEditor.dynamicTags;
	const foundTags = getTags( value, allTags );

	const contentValue = useMemo( () => {
		return value?.text || value;
	}, [ value ] );

	const selectionStart = useSelect( ( select ) => {
		return select( blockEditorStore ).getSelectionStart();
	}, [] );

	const selectionEnd = useSelect( ( select ) => {
		return select( blockEditorStore ).getSelectionEnd();
	}, [] );

	const selectedText = useMemo( () => {
		if ( selectionStart?.offset === selectionEnd?.offset ) {
			return '';
		}

		return contentValue.substring( selectionStart.offset, selectionEnd.offset );
	}, [ selectionStart, selectionEnd, value ] );

	useEffect( () => {
		if ( foundTags.length && ! isSelected && previewEnabled ) {
			setContentMode( 'preview' );
		}
	}, [ foundTags.length, isSelected ] );

	return (
		<BlockControls>
			<ToolbarGroup>
				<DynamicTagModal
					onInsert={ ( newValue, options ) => {
						if ( ! newValue ) {
							return;
						}

						let selectionOffset = selectionStart?.offset ?? value.length;
						let selectionEndOffset = selectionEnd?.offset ?? value.length;

						const isInsideTag = isSelectionInsideTags( selectionOffset, selectionEndOffset, foundTags, value );

						// If inside a tag, adjust the selection to insert at the end.
						if ( isInsideTag ) {
							selectionOffset = value.length;
							selectionEndOffset = value.length;
						}

						let richTextValue = insert(
							value,
							create( { html: newValue } ),
							selectionOffset,
							selectionEndOffset
						);

						if ( options?.tagToReplace ) {
							richTextValue = replace(
								value,
								options.tagToReplace,
								create( { html: newValue } )
							);
						}

						onChange( new RichTextData( richTextValue ) );
						if ( previewEnabled ) {
							setContentMode( 'preview' );
						}
					} }
					onRemove={ ( tagToRemove ) => {
						const newValue = replace( value, tagToRemove, '' );
						onChange( new RichTextData( newValue ) );
					} }
					renderToggle={ ( { isOpen, onToggle } ) => (
						<ToolbarButton
							icon={ getIcon( 'database' ) }
							label={ __( 'Open dynamic tags', 'generateblocks' ) }
							showTooltip
							onClick={ onToggle }
							aria-expanded={ isOpen }
							className="gb-dynamic-tag-toolbar-button"
						/>
					) }
					tagName={ tagName }
					value={ value }
					selectedText={ selectedText }
					foundTags={ foundTags }
					context={ context }
				/>
				{ ( !! foundTags.length && previewEnabled ) && (
					<div className="gb-dynamic-tag-content-mode">
						<ToolbarButton
							onClick={ () => {
								setContentMode( 'preview' );
							} }
							isPressed={ 'preview' === contentMode }
							className="gb-dynamic-tag-content-mode__toggle"
						>
							{ __( 'Preview', 'generateblocks' ) }
						</ToolbarButton>
						<ToolbarButton
							onClick={ () => {
								setContentMode( 'edit' );
							} }
							isPressed={ 'edit' === contentMode }
							className="gb-dynamic-tag-content-mode__toggle"
						>
							{ __( 'Edit', 'generateblocks' ) }
						</ToolbarButton>
					</div>
				) }
			</ToolbarGroup>
		</BlockControls>
	);
}
