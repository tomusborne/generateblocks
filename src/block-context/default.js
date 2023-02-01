import { __ } from '@wordpress/i18n';

const defaultContext = {
	id: '',
	blockName: '',
	isInQueryLoop: false,
	supports: {
		responsiveTabs: false,
		settingsPanel: {
			enabled: false,
			label: __( 'Block Settings', 'generateblocks' ),
			icon: 'wrench',
		},
		layout: {
			enabled: false,
			display: false,
			flexDirection: false,
			flexWrap: false,
			alignItems: false,
			justifyContent: false,
			columnGap: false,
			rowGap: false,
			zIndex: false,
			position: false,
			overflow: false,
		},
		flexChildPanel: {
			enabled: false,
			flex: false,
			order: false,
		},
		sizingPanel: {
			enabled: false,
			width: false,
			height: false,
			minWidth: false,
			minHeight: false,
			maxWidth: false,
			maxHeight: false,
			useGlobalMaxWidth: false,
		},
		typography: {
			enabled: false,
			alignment: false,
			fontWeight: false,
			textTransform: false,
			fontSize: false,
			lineHeight: false,
			letterSpacing: false,
			fontFamily: false,
		},
		spacing: {
			enabled: false,
			inlineWidth: false,
			stackVertically: false,
			fillHorizontalSpace: false,
			dimensions: [],
		},
		colors: {
			enabled: false,
			elements: [],
		},
		backgroundPanel: {
			enabled: false,
			backgroundImage: false,
			backgroundGradient: false,
		},
		shapesPanel: {
			enabled: false,
		},
		icon: {
			enabled: false,
			location: [],
		},
	},
};

export default defaultContext;
