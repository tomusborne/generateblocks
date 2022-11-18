import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';

export default applyFilters( 'generateblocks.editor.query-loop.query-parameters', [
	{
		id: 'post_type',
		type: 'postTypeSelect',
		default: 'post',
		label: __( 'Post type', 'generateblocks' ),
		description: __( 'Retrieves posts by post types.', 'generateblocks' ),
		group: __( 'Post type', 'generateblocks' ),
		isSticky: true,
	},
	{
		id: 'per_page',
		type: 'number',
		default: 10,
		label: __( 'Posts per page', 'generateblocks' ),
		description: __( 'Number of post to show per page.', 'generateblocks' ),
		group: __( 'Pagination', 'generateblocks' ),
		isSticky: true,
	},
	{
		id: 'page',
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
		id: 'search',
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
			{ value: 'desc', label: 'DESC' },
			{ value: 'asc', label: 'ASC' },
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
			{ value: 'slug', label: 'Slug' },
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
		id: 'author',
		type: 'authorsSelect',
		default: [],
		dependencies: {
			filterName: 'generateblocks.editor.query-loop.author',
		},
		label: __( 'Authors', 'generateblocks' ),
		description: __( 'Show posts from authors. Use #123 with your ID to search by author ID.', 'generateblocks' ),
		group: __( 'Author', 'generateblocks' ),
	},
	{
		id: 'author_exclude',
		type: 'authorsSelect',
		default: [],
		dependencies: {
			filterName: 'generateblocks.editor.query-loop.author-exclude',
		},
		label: __( 'Exclude authors', 'generateblocks' ),
		description: __( 'Exclude posts from authors. Use #123 with your ID to search by author ID.', 'generateblocks' ),
		group: __( 'Author', 'generateblocks' ),
	},
	{
		id: 'tax_query',
		type: 'taxonomySelect',
		default: [],
		label: __( 'Taxonomies', 'generateblocks' ),
		description: __( 'Show posts from taxonomies. Use #123 with your ID to search by term ID.', 'generateblocks' ),
		group: __( 'Taxonomy', 'generateblocks' ),
		isRepeatable: true,
		repeatableDefaultValue: { taxonomy: '', terms: [], rest: '', includeChildren: true },
	},
	{
		id: 'tax_query_exclude',
		type: 'taxonomySelect',
		default: [],
		label: __( 'Exclude taxonomies', 'generateblocks' ),
		description: __( 'Exclude posts from taxonomies. Use #123 with your ID to search by term ID.', 'generateblocks' ),
		group: __( 'Taxonomy', 'generateblocks' ),
		isRepeatable: true,
		repeatableDefaultValue: { taxonomy: '', terms: [], rest: '', includeChildren: true },
	},
	{
		id: 'status',
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
		id: 'parent',
		type: 'postsSelect',
		default: [],
		dependencies: {
			postType: 'post_type',
			filterName: 'generateblocks.editor.query-loop.include-parent',
		},
		label: __( 'Parent', 'generateblocks' ),
		description: __( 'Show posts from parents. Use #123 with your ID to search by post ID.', 'generateblocks' ),
		group: __( 'Post', 'generateblocks' ),
	},
	{
		id: 'parent_exclude',
		type: 'postsSelect',
		default: [],
		dependencies: {
			postType: 'post_type',
			filterName: 'generateblocks.editor.query-loop.exclude-parent',
		},
		label: __( 'Parent exclude', 'generateblocks' ),
		description: __( 'Do not show posts from parents. Use #123 with your ID to search by post ID.', 'generateblocks' ),
		group: __( 'Post', 'generateblocks' ),
	},
	{
		id: 'include',
		type: 'postsSelect',
		default: [],
		dependencies: {
			postType: 'post_type',
		},
		label: __( 'Include posts', 'generateblocks' ),
		description: __( 'Limit result set to specific posts. Use #123 with your ID to search by post ID.', 'generateblocks' ),
		group: __( 'Post', 'generateblocks' ),
	},
	{
		id: 'exclude',
		type: 'postsSelect',
		default: [],
		dependencies: {
			postType: 'post_type',
			filterName: 'generateblocks.editor.query-loop.exclude-posts-select',
		},
		label: __( 'Exclude posts', 'generateblocks' ),
		description: __( 'Ensure result set excludes specific posts. Use #123 with your ID to search by post ID.', 'generateblocks' ),
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
		id: 'after',
		type: 'dateTimePicker',
		default: '',
		label: __( 'After', 'generateblocks' ),
		description: __( 'Limit response to posts published after a given date.', 'generateblocks' ),
		group: __( 'Date', 'generateblocks' ),
	},
	{
		id: 'before',
		type: 'dateTimePicker',
		default: '',
		label: __( 'Before', 'generateblocks' ),
		description: __( 'Limit response to posts published before a given date.', 'generateblocks' ),
		group: __( 'Date', 'generateblocks' ),
	},
] );
