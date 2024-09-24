import { ToolbarGroup, Dropdown, ToolbarButton, MenuItem, MenuGroup } from '@wordpress/components';
import { BlockControls, store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { create, insert, replace, RichTextData } from '@wordpress/rich-text';

import { DynamicTagModal } from '../index.js';
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

						const selectionOffset = selectionStart?.offset ?? value.length;
						const selectionEndOffset = selectionEnd?.offset ?? value.length;

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
