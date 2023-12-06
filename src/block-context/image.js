import defaultContext from './default';
import { __ } from '@wordpress/i18n';
import { defaultsDeep } from 'lodash';

const imageContext = defaultsDeep( {
	id: 'image',
	supports: {
		responsiveTabs: true,
		settingsPanel: {
			enabled: true,
			icon: 'backgrounds',
		},
		spacing: {
			enabled: true,
			padding: true,
			margin: true,
		},
		borders: {
			enabled: true,
			borderColors: [
				{
					state: '',
					tooltip: __( 'Border', 'generateblocks' ),
					alpha: true,
				},
			],
			borderTop: true,
			borderRight: true,
			borderBottom: true,
			borderLeft: true,
			borderRadius: true,
		},
	},
}, defaultContext );

export default imageContext;
