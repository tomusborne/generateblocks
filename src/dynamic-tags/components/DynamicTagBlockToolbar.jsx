import { ToolbarGroup, Dropdown, ToolbarButton, MenuItem, MenuGroup } from '@wordpress/components';
import { BlockControls, store as blockEditorStore } from '@wordpress/block-editor';
import { useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { create, insert, RichTextData } from '@wordpress/rich-text';

import { DynamicTagModal } from '../index.js';
import { getIcon } from '@utils/index.js';
import { edit, plus } from '@wordpress/icons';

function containsTag( value, data ) {
	for ( const key in data ) {
		const tag = data[ key ].tag;
		if ( value.includes( `{${ tag }` ) ) {
			return true; // Or return tag if you need to know which tag was found
		}
	}
	return false;
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
	const hasTag = containsTag( value, allTags );

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

	const isTagSelected = useMemo( () => {
		if ( ! selectedText ) {
			return false;
		}

		return selectedText.startsWith( '{' ) && selectedText.endsWith( '}' );
	}, [ selectedText ] );

	useEffect( () => {
		if ( hasTag && ! isSelected ) {
			setContentMode( 'preview' );
		}
	}, [ hasTag, isSelected ] );

	function getButtonLabel() {
		if ( 'preview' === contentMode ) {
			return __( 'Enable edit mode to edit or add dynamic tags', 'generateblocks' );
		}

		if ( isTagSelected ) {
			return __( 'Edit dynamic tag', 'generateblocks' );
		}

		return __( 'Add dynamic tag', 'generateblocks' );
	}

	function getEditIcon() {
		if ( isTagSelected ) {
			return edit;
		}

		if ( hasTag ) {
			return plus;
		}

		return getIcon( 'database' );
	}

	return (
		<BlockControls>
			<ToolbarGroup>
				{ hasTag && (
					<>
						<Dropdown
							renderToggle={ ( { onToggle } ) => (
								<ToolbarButton
									onClick={ onToggle }
									isPressed={ true }
									className="gb-dynamic-tag-content-mode-toggle"
									icon={ getIcon( 'database' ) }
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

				{ 'edit' === contentMode && !! selectionStart?.offset && (
					<DynamicTagModal
						onInsert={ ( newValue ) => {
							if ( ! newValue ) {
								return;
							}

							const richTextValue = insert(
								value,
								create( { html: newValue } ),
								selectionStart?.offset,
								selectionEnd?.offset
							);

							onChange( new RichTextData( richTextValue ) );
						} }
						renderToggle={ ( { isOpen, onToggle } ) => (
							<ToolbarButton
								icon={ getEditIcon() }
								label={ getButtonLabel() }
								showTooltip
								onClick={ onToggle }
								aria-expanded={ isOpen }
								className="gb-dynamic-tag-toolbar-button"
							/>
						) }
						tagName={ tagName }
						value={ selectedText }
					/>
				) }
			</ToolbarGroup>
		</BlockControls>

	);
}
