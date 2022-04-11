import gridAttributes from '../grid/attributes';

export default Object.assign( {}, gridAttributes, {
	uniqueId: {
		type: 'string',
		default: '',
	},

	query: {
		type: 'object',
		default: {},
	},
} );
