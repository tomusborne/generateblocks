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

	const options = [
		{
			label: __( 'Default', 'generateblocks' ),
			value: '',
			icon: alignNone,
		},
		{
			label: __( 'Wide', 'generateblocks' ),
			value: 'wide',
			icon: stretchWide,
		},
		{
			label: __( 'Full', 'generateblocks' ),
			value: 'full',
			icon: stretchFullWidth,
		},
	];

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
					{ options.map( ( option ) => {
						return (
							<Tooltip key={ 'align' + option.value } text={ option.label }>
								<Button
									variant={ value === option.value ? 'primary' : '' }
									onClick={ () => onChange( option.value ) }
									icon={ option.icon }
								/>
							</Tooltip>
						);
					} ) }
				</ButtonGroup>
			</div>
		</BaseControl>
	);
}
