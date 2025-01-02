import { __ } from '@wordpress/i18n';
import { MenuGroup, MenuItem } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore, useSetting } from '@wordpress/block-editor';
import { alignNone, stretchWide, stretchFullWidth } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';

export function BlockWidth( { align, onChange, clientId } ) {
	const hasWideSize = useSetting( 'layout.wideSize' );
	const { themeSupportsAlignWide } = useSelect(
		( select ) => {
			const { getSettings } = select( blockEditorStore );
			return {
				themeSupportsAlignWide: getSettings()?.alignWide,
			};
		},
		[]
	);
	const {
		getBlockRootClientId,
	} = useSelect( ( select ) => select( blockEditorStore ), [] );

	const removeBlockWidthOptions = applyFilters(
		'generateblocks.editor.removeBlockWidthOptions',
		false,
		{ clientId }
	);

	if ( ( ! themeSupportsAlignWide && ! hasWideSize ) || removeBlockWidthOptions ) {
		return null;
	}

	const parentBlockId = getBlockRootClientId( clientId );

	if ( parentBlockId ) {
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
		<MenuGroup label={ __( 'Block Width', 'generateblocks' ) }>
			{ options.map( ( option ) => {
				return (
					<MenuItem
						key={ option.value }
						isPressed={ align === option.value }
						onClick={ () => onChange( option.value ) }
						icon={ option.icon }
					>
						{ option.label }
					</MenuItem>
				);
			} ) }
		</MenuGroup>
	);
}
