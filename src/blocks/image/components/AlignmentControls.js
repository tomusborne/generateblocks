import { store as blockEditorStore } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import getAttribute from '../../../utils/get-attribute';
import {
	alignLeft,
	alignRight,
	alignCenter,
	positionLeft,
	positionRight,
	stretchFullWidth,
	stretchWide,
} from '@wordpress/icons';

export default function AlignmentControls( props ) {
	const {
		attributes,
		setAttributes,
		deviceType,
	} = props;

	const { align } = attributes;

	const { wideControlsEnabled = false } = useSelect(
		( select ) => {
			const { getSettings } = select( blockEditorStore );
			const settings = getSettings();
			return {
				wideControlsEnabled: settings.alignWide,
			};
		},
		[]
	);

	const selectedIcons = {
		left: alignLeft,
		center: alignCenter,
		right: alignRight,
		floatLeft: positionLeft,
		floatRight: positionRight,
		wide: stretchWide,
		full: stretchFullWidth,
	};

	const selectedIcon =
		align
			? selectedIcons[ align ]
			: selectedIcons[ getAttribute( 'alignment', props ) ] ||
			alignLeft;

	const updateAlignment = ( value ) => setAttributes( {
		[ getAttribute( 'alignment', props, true ) ]:
			value !== getAttribute( 'alignment', props )
				? value
				: '',
		align: '',
	} );

	const alignmentOptions = [
		{
			icon: alignLeft,
			title: __( 'Align left', 'generateblocks' ),
			onClick: () => updateAlignment( 'left' ),
			isActive: 'left' === getAttribute( 'alignment', props ),
		},
		{
			icon: alignCenter,
			title: __( 'Align center', 'generateblocks' ),
			onClick: () => updateAlignment( 'center' ),
			isActive: 'center' === getAttribute( 'alignment', props ),
		},
		{
			icon: alignRight,
			title: __( 'Align right', 'generateblocks' ),
			onClick: () => updateAlignment( 'right' ),
			isActive: 'right' === getAttribute( 'alignment', props ),
		},
		{
			icon: positionLeft,
			title: __( 'Float left', 'generateblocks' ),
			onClick: () => updateAlignment( 'floatLeft' ),
			isActive: 'floatLeft' === getAttribute( 'alignment', props ),
		},
		{
			icon: positionRight,
			title: __( 'Float right', 'generateblocks' ),
			onClick: () => updateAlignment( 'floatRight' ),
			isActive: 'floatRight' === getAttribute( 'alignment', props ),
		},
	];

	if ( wideControlsEnabled && 'Desktop' === deviceType ) {
		alignmentOptions.push(
			{
				icon: stretchWide,
				title: __( 'Wide width', 'generateblocks' ),
				onClick: () => setAttributes( {
					align: 'wide' !== align ? 'wide' : '',
					alignment: '',
					alignmentTablet: '',
					alignmentMobile: '',
				} ),
				isActive: 'wide' === align,
			},
			{
				icon: stretchFullWidth,
				title: __( 'Full width', 'generateblocks' ),
				onClick: () => setAttributes( {
					align: 'full' !== align ? 'full' : '',
					alignment: '',
					alignmentTablet: '',
					alignmentMobile: '',
				} ),
				isActive: 'full' === align,
			},
		);
	}

	return (
		<ToolbarGroup
			isCollapsed={ true }
			icon={ selectedIcon }
			controls={ alignmentOptions }
		/>
	);
}
