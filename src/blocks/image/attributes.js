export default {
	uniqueId: {
		type: 'string',
	},
	mediaId: {
		type: 'number',
	},
	mediaUrl: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'src',
	},
	alt: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'alt',
	},
	title: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'title',
	},
	href: {
		type: 'string',
		source: 'attribute',
		selector: 'figure > a',
		attribute: 'href',
	},
	openInNewWindow: {
		type: 'boolean',
		default: false,
	},
	relNoFollow: {
		type: 'boolean',
		default: false,
	},
	relSponsored: {
		type: 'boolean',
		default: false,
	},
	sizeSlug: {
		type: 'string',
		default: '',
	},
	width: {
		type: 'string',
		default: '',
	},
	widthTablet: {
		type: 'string',
		default: '',
	},
	widthMobile: {
		type: 'string',
		default: '',
	},
	height: {
		type: 'string',
		default: '',
	},
	heightTablet: {
		type: 'string',
		default: '',
	},
	heightMobile: {
		type: 'string',
		default: '',
	},
	objectFit: {
		type: 'string',
		default: '',
	},
	objectFitTablet: {
		type: 'string',
		default: '',
	},
	objectFitMobile: {
		type: 'string',
		default: '',
	},
	borderColor: {
		type: 'string',
		default: '',
	},
	anchor: {
		type: 'string',
		default: '',
	},
	align: {
		type: 'string',
		default: '',
	},
	alignment: {
		type: 'string',
		default: '',
	},
	alignmentTablet: {
		type: 'string',
		default: '',
	},
	alignmentMobile: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
	},
};
