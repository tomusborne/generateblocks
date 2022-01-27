export default {
	isDynamicContent: {
		type: 'boolean',
		default: false,
	},

	contentType: {
		type: 'string',
		default: 'post-title',
	},

	dynamicSource: {
		type: 'string',
		default: 'current-post',
	},

	postId: {
		type: 'number',
		default: '',
	},

	postType: {
		type: 'string',
		default: 'post',
	},

	icon: {
		type: 'string',
		default: '',
	},
};
