import { BaseControl, Button, ButtonGroup, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { alignNone, stretchWide, stretchFullWidth } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';

export default function ThemeWidth( { value, onChange } ) {
	const { themeSupportsAlignWide } = useSelect(
		( select ) => {
			const { getSettings } = select( blockEditorStore );
			return {
				themeSupportsAlignWide: getSettings()?.alignWide,
			};
		},
		[]
	);

	if ( ! themeSupportsAlignWide ) {
		return null;
	}

	return (
		<BaseControl
			label={ __( 'Block Alignment', 'generateblocks' ) }
			id="gblocks-theme-width-button-group"
			help={ __( 'Change the width of this block using a method defined by your theme.', 'generateblocks' ) }
		>
			<div>
				<ButtonGroup
					className="gblocks-alignment-button-group"
					id="gblocks-theme-width-button-group"
				>
					<Tooltip text={ __( 'Default', 'generateblocks' ) }>
						<Button
							variant={ '' === value ? 'primary' : '' }
							onClick={ () => onChange( '' ) }
							icon={ alignNone }
						/>
					</Tooltip>
					<Tooltip text={ __( 'Wide', 'generateblocks' ) }>
						<Button
							variant={ 'wide' === value ? 'primary' : '' }
							onClick={ () => onChange( 'wide' ) }
							icon={ stretchWide }
						/>
					</Tooltip>
					<Tooltip text={ __( 'Full', 'generateblocks' ) }>
						<Button
							variant={ 'full' === value ? 'primary' : '' }
							onClick={ () => onChange( 'full' ) }
							icon={ stretchFullWidth }
						/>
					</Tooltip>
				</ButtonGroup>
			</div>
		</BaseControl>
	);
}
