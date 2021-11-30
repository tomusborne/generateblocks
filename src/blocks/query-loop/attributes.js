import gridAttributes from '../grid/attributes';

export default Object.assign( {}, gridAttributes, {
	isQueryLoop: {
		type: 'boolean',
		default: false,
	},
} );
