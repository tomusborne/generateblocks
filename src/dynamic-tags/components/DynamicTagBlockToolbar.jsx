import { ToolbarGroup, Dropdown, ToolbarButton, MenuItem, MenuGroup } from '@wordpress/components';
import { BlockControls, store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { create, insert, replace, RichTextData } from '@wordpress/rich-text';

import { DynamicTagModal } from '..';
import { getIcon } from '@utils/index.js';
import { chevronDownSmall } from '@wordpress/icons';

function getTags( value, data ) {
	const foundTags = [];

	for ( const key in data ) {
		const tag = data[ key ].tag;
		// Create a regular expression to match {tag_name ...}
		const regex = new RegExp( `\\{${ tag }[^}]*\\}`, 'g' );

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
	isSelected,
	onChange,
} ) {
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
		if ( foundTags.length && ! isSelected ) {
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
				/>
				{ !! foundTags.length && (
					<>
						<Dropdown
							renderToggle={ ( { onToggle } ) => (
								<ToolbarButton
									onClick={ onToggle }
									isPressed={ true }
									className="gb-dynamic-tag-content-mode-toggle"
									icon={ chevronDownSmall }
									iconPosition="right"
								>
									{ 'preview' === contentMode ? __( 'Preview Mode', 'generateblocks' ) : __( 'Edit Mode', 'generateblocks' ) }
								</ToolbarButton>
							) }
							renderContent={ ( { onClose } ) => {
								return (
									<MenuGroup>
										<MenuItem
											onClick={ () => {
												setContentMode( 'edit' );
												onClose();
											} }
											isPressed={ 'edit' === contentMode }
										>
											{ __( 'Edit Mode', 'generateblocks' ) }
										</MenuItem>
										<MenuItem
											onClick={ () => {
												setContentMode( 'preview' );
												onClose();
											} }
											isPressed={ 'preview' === contentMode }
										>
											{ __( 'Preview Mode', 'generateblocks' ) }
										</MenuItem>
									</MenuGroup>
								);
							} }
						/>
					</>
				) }
			</ToolbarGroup>
		</BlockControls>
	);
}
