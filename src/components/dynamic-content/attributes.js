export default {
	hasDynamicContent: {
		type: 'boolean',
		default: false,
	},

	dynamicSource: {
		type: 'string',
		default: 'current-post',
	},

	postType: {
		type: 'string',
		default: '',
	},

	postId: {
		type: 'number',
		default: '',
	},

	dynamicContentType: {
		type: 'string',
		default: '',
	},

	dynamicLinkType: {
		type: 'string',
		default: '',
	},

	dynamicIcon: {
		type: 'string',
		default: '',
	},

	metaFieldName: {
		type: 'string',
		default: '',
	},

	linkMetaFieldName: {
		type: 'string',
		default: '',
	},

	dateType: {
		type: 'string',
		default: 'published',
	},

	dateReplacePublished: {
		type: 'boolean',
		default: false,
	},

	termTaxonomy: {
		type: 'string',
		default: 'category',
	},

	termSeparator: {
		type: 'string',
		default: ', ',
	},

	noCommentsText: {
		type: 'string',
		default: '',
	},

	singleCommentText: {
		type: 'string',
		default: '',
	},

	multipleCommentsText: {
		type: 'string',
		default: '',
	},
};
