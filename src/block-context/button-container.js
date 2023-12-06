import defaultContext from './default';
import { defaultsDeep } from 'lodash';

const buttonContainerContext = defaultsDeep( {
	id: 'buttonContainer',
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
