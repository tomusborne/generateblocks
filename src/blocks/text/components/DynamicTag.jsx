import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { create, insert, applyFormat } from '@wordpress/rich-text';
import getIcon from '@utils/get-icon';
import { DynamicTagBlockToolbar } from '../../../dynamic-tags';

export function DynamicTag( { onChange, value } ) {
	const selectedBlock = useSelect( ( select ) => {
		return select( blockEditorStore ).getSelectedBlock();
	}, [] );

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

		return value.text.substring( selectionStart.offset, selectionEnd.offset );
	}, [ selectionStart, selectionEnd, value ] );

	const tagName = useMemo( () => {
		if ( ! selectedBlock ) {
			return '';
		}

		return selectedBlock.attributes.tagName;
	}, [ selectedBlock ] );

	const isSelected = useMemo( () => {
		if ( ! selectedText ) {
			return false;
		}

		return selectedText.startsWith( '{' ) && selectedText.endsWith( '}' );
	}, [ selectedText ] );

	if ( selectedBlock && 'generateblocks/text' !== selectedBlock.name ) {
		return null;
	}

	return (
		<DynamicTagBlockToolbar
			tooltip={ __( 'Insert dynamic tag', 'generateblocks' ) }
			tagName={ tagName }
			value={ isSelected ? selectedText : '' }
			onInsert={ ( newValue ) => {
				if ( ! newValue?.value ) {
					return;
				}

				if ( newValue?.insertAsLink ) {
					const linkFormat = {
						type: 'core/link',
						attributes: {
							href: newValue?.value,
						},
					};

					newValue = applyFormat(
						value,
						linkFormat
					);

					onChange( newValue );
					return;
				}

				const richTextValue = create( { html: newValue?.value } );
				onChange( insert( value, richTextValue ) );
			} }
			renderToggle={ ( { isOpen, onToggle } ) => (
				<ToolbarButton
					icon={ getIcon( 'database' ) }
					label={ __( 'Dynamic Tags', 'generateblocks' ) }
					onClick={ onToggle }
					aria-expanded={ isOpen }
					isPressed={ isSelected }
				/>
			) }
		/>
	);
}
