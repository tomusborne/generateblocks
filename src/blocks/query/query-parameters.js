import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

export default applyFilters( 'generateblocks.editor.query.query-parameters', [
	{
		id: 'post_type',
		type: 'postTypeSelect',
		default: [ 'post' ],
		label: __( 'Post type', 'generateblocks' ),
		description: __( 'Retrieves posts by post types.', 'generateblocks' ),
		group: __( 'Post type', 'generateblocks' ),
		isSticky: true,
	},
	{
		id: 'posts_per_page',
		type: 'number',
		default: 10,
		label: __( 'Posts per page', 'generateblocks' ),
		description: __( 'Number of post to show per page.', 'generateblocks' ),
		group: __( 'Pagination', 'generateblocks' ),
		isSticky: true,
	},
	{
		id: 'paged',
		type: 'number',
		default: 1,
		label: __( 'Page', 'generateblocks' ),
		description: __( 'Display posts from page.', 'generateblocks' ),
		group: __( 'Pagination', 'generateblocks' ),
	},
	{
		id: 'offset',
		type: 'number',
		default: undefined,
		label: __( 'Offset', 'generateblocks' ),
		description: __( 'Offset the result set by a specific number of items.', 'generateblocks' ),
		group: __( 'Pagination', 'generateblocks' ),
	},
	{
		id: 's',
		type: 'text',
		default: '',
		label: __( 'Search', 'generateblocks' ),
		description: __( 'Show posts based on a keyword search.', 'generateblocks' ),
		group: __( 'Search', 'generateblocks' ),
	},
	{
		id: 'order',
		type: 'select',
		default: 'desc',
		selectOptions: [
			{ value: 'DESC', label: 'DESC' },
			{ value: 'ASC', label: 'ASC' },
		],
		label: __( 'Order', 'generateblocks' ),
		description: __( 'Designates the ascending or descending order of the ‘orderby‘ parameter.', 'generateblocks' ),
		group: __( 'Order & Order by', 'generateblocks' ),
	},
	{
		id: 'orderby',
		type: 'select',
		default: 'date',
		selectOptions: [
			{ value: 'id', label: 'Id' },
			{ value: 'title', label: 'Title' },
			{ value: 'name', label: 'Slug' },
			{ value: 'author', label: 'Author' },
			{ value: 'date', label: 'Date' },
			{ value: 'modified', label: 'Last modified date' },
			{ value: 'parent', label: 'Parent id' },
			{ value: 'menu_order', label: 'Menu order' },
		],
		label: __( 'Order by', 'generateblocks' ),
		description: __( 'Sort retrieved posts by parameter.', 'generateblocks' ),
		group: __( 'Order & Order by', 'generateblocks' ),
	},
	{
		id: 'author__in',
		type: 'authorsSelect',
		default: [],
		dependencies: {
			filterName: 'generateblocks.editor.query.author--in',
		},
		label: __( 'Authors', 'generateblocks' ),
		description: __( 'Show posts from authors. Search by name or ID.', 'generateblocks' ),
		group: __( 'Author', 'generateblocks' ),
	},
	{
		id: 'author__not_in',
		type: 'authorsSelect',
		default: [],
		dependencies: {
			filterName: 'generateblocks.editor.query.author--not-in',
		},
		label: __( 'Exclude authors', 'generateblocks' ),
		description: __( 'Exclude posts from authors. Search by name or ID.', 'generateblocks' ),
		group: __( 'Author', 'generateblocks' ),
	},
	{
		id: 'tax_query',
		type: 'taxonomySelect',
		default: [],
		label: __( 'Taxonomies', 'generateblocks' ),
		description: __( 'Include or exclude posts from a list of taxonomies. Search by name or ID.', 'generateblocks' ),
		group: __( 'Taxonomy', 'generateblocks' ),
		isRepeatable: true,
		repeatableDefaultValue: { taxonomy: '', terms: [], rest: '', include_children: true, operator: 'IN' },
	},
	{
		id: 'post_status',
		type: 'multiSelect',
		default: [],
		selectOptions: [
			{ value: 'publish', label: __( 'Publish', 'generateblocks' ) },
			{ value: 'pending', label: __( 'Pending', 'generateblocks' ) },
			{ value: 'draft', label: __( 'Draft', 'generateblocks' ) },
			{ value: 'auto-draft', label: __( 'Auto draft', 'generateblocks' ) },
			{ value: 'future', label: __( 'Future', 'generateblocks' ) },
			{ value: 'private', label: __( 'Private', 'generateblocks' ) },
			{ value: 'inherit', label: __( 'Inherit', 'generateblocks' ) },
			{ value: 'trash', label: __( 'Trash', 'generateblocks' ) },
			{ value: 'any', label: __( 'Any', 'generateblocks' ) },
		],
		label: __( 'Post status', 'generateblocks' ),
		description: __( 'Show posts by post status.', 'generateblocks' ),
		group: __( 'Status', 'generateblocks' ),
	},
	{
		id: 'post_parent__in',
		type: 'includePosts',
		default: [],
		dependencies: {
			postType: 'post_type',
			filterName: 'generateblocks.editor.query.post-parent--in',
		},
		label: __( 'Parent', 'generateblocks' ),
		description: __( 'Show posts from parents. Search by name or ID.', 'generateblocks' ),
		group: __( 'Post', 'generateblocks' ),
	},
	{
		id: 'post_parent__not_in',
		type: 'excludePosts',
		default: [],
		dependencies: {
			postType: 'post_type',
			filterName: 'generateblocks.editor.query.post-parent--not-in',
		},
		label: __( 'Parent exclude', 'generateblocks' ),
		description: __( 'Do not show posts from parents. Search by name or ID.', 'generateblocks' ),
		group: __( 'Post', 'generateblocks' ),
	},
	{
		id: 'post__in',
		type: 'includePosts',
		default: [],
		dependencies: {
			postType: 'post_type',
		},
		label: __( 'Include posts', 'generateblocks' ),
		description: __( 'Limit result set to specific posts. Search by name or ID.', 'generateblocks' ),
		group: __( 'Post', 'generateblocks' ),
	},
	{
		id: 'post__not_in',
		type: 'excludePosts',
		default: [],
		dependencies: {
			postType: 'post_type',
			filterName: 'generateblocks.editor.query.post--not-in',
		},
		label: __( 'Exclude posts', 'generateblocks' ),
		description: __( 'Ensure result set excludes specific posts. Search by name or ID.', 'generateblocks' ),
		group: __( 'Post', 'generateblocks' ),
	},
	{
		id: 'stickyPosts',
		type: 'select',
		default: 'include',
		selectOptions: [
			{ value: 'include', label: 'Include' },
			{ value: 'exclude', label: 'Exclude' },
			{ value: 'ignore', label: 'Ignore' },
			{ value: 'only', label: 'Only' },
		],
		label: __( 'Sticky posts', 'generateblocks' ),
		description: __( 'Configure how sticky posts should show in the query.', 'generateblocks' ),
		group: __( 'Post', 'generateblocks' ),
	},
	{
		id: 'date_query',
		type: 'dateQuery',
		label: __( 'Date', 'generateblocks' ),
		description: __( 'Limit response to posts published before or after a given date.', 'generateblocks' ),
		group: __( 'Date', 'generateblocks' ),
		default: [],
		isRepeatable: true,
		repeatableDefaultValue: { before: new Date().toLocaleString(), inclusive: true },
	},
] );
