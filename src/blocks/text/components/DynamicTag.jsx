import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { create, insert, applyFormat } from '@wordpress/rich-text';
import getIcon from '@utils/get-icon';
import { DynamicTagBlockToolbar } from '../../../dynamic-tags';

export function DynamicTag( { onChange, value } ) {
	const selectedBlock = useSelect( ( select ) => {
		return select( blockEditorStore ).getSelectedBlock();
	}, [] );

	if ( selectedBlock && 'generateblocks/text' !== selectedBlock.name ) {
		return null;
	}

	return (
		<DynamicTagBlockToolbar
			tooltip={ __( 'Insert dynamic tag', 'generateblocks' ) }
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
			renderToggle={ ( { isOpen, onToggle, isPressed } ) => (
				<ToolbarButton
					icon={ getIcon( 'database' ) }
					label={ __( 'Dynamic Tags', 'generateblocks' ) }
					onClick={ onToggle }
					aria-expanded={ isOpen }
					isPressed={ isPressed }
				/>
			) }
		/>
	);
}
