import gridAttributes from '../grid/attributes';

export default Object.assign( {}, gridAttributes, {
	uniqueId: {
		type: 'string',
		default: '',
	},

	inheritQuery: {
		type: 'boolean',
		default: false,
	},

	query: {
		type: 'object',
		default: {},
	},
} );
