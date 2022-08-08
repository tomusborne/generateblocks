import { applyFilters } from '@wordpress/hooks';

export default applyFilters( 'generateblocks.editor.dynamicContent.attributes', {
	useDynamicData: {
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

	dynamicContentType: {
		type: 'string',
		default: '',
	},

	dynamicLinkType: {
		type: 'string',
		default: '',
	},

	dynamicLinkRemoveIfEmpty: {
		type: 'boolean',
		default: false,
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

	linkMetaFieldType: {
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

	useDefaultMoreLink: {
		type: 'boolean',
		default: true,
	},

	customMoreLinkText: {
		type: 'string',
		default: '',
	},

	excerptLength: {
		type: 'number',
		default: generateBlocksInfo.excerptLength,
	},
} );
