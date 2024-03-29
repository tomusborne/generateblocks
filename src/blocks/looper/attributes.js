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
	wpQuery: {
		type: 'object',
		default: {},
	},
	query: {
		type: 'object',
		default: {},
	},
	blockLabel: {
		type: 'string',
		default: '',
	},
	isLoop: {
		type: 'boolean',
		default: true,
	},
} );
