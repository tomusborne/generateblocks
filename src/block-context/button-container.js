import defaultContext from './default';
import { defaultsDeep } from 'lodash';

const buttonContainerContext = defaultsDeep( {
	blockName: 'buttonContainer',
	supports: {
		responsiveTabs: true,
		spacing: {
			enabled: true,
			margin: true,
			stackVertically: true,
			fillHorizontalSpace: true,
		},
	},
}, defaultContext );

export default buttonContainerContext;
