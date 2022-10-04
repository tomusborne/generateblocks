import defaultContext from './default';
import { __ } from '@wordpress/i18n';
import { defaultsDeep } from 'lodash';

const gridContext = defaultsDeep( {
	id: 'grid',
	supports: {
		responsiveTabs: true,
		settingsPanel: {
			enabled: true,
			label: __( 'Layout', 'generateblocks' ),
			icon: 'layout',
		},
	},
}, defaultContext );

export default gridContext;
