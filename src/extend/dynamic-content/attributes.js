export default {
	isDynamicContent: {
		type: 'boolean',
		default: false,
	},

	isPagination: {
		type: 'boolean',
		default: false,
	},

	isCaption: {
		type: 'boolean',
		default: false,
	},

	contentType: {
		type: 'string',
		default: '',
	},

	dynamicLinkType: {
		type: 'string',
		default: '',
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

	dateType: {
		type: 'string',
		default: 'published',
	},

	dateReplacePublished: {
		type: 'boolean',
		default: false,
	},

	metaFieldName: {
		type: 'string',
		default: '',
	},

	linkMetaFieldName: {
		type: 'string',
		default: '',
	},

	termTaxonomy: {
		type: 'string',
		default: '',
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
