import saveHeadline from './save';
import blockAttributes from './attributes';

const deprecated = [
	{
		attributes: {
			...blockAttributes,
			element: {
				type: 'string',
				default: 'p',
			},
		},
		save: saveHeadline,
	},
];

export default deprecated;
