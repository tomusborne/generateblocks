import { __ } from '@wordpress/i18n';

export default [
	{
		id: 'per_page',
		type: 'number',
		default: 10,
		label: __( 'Posts per page', 'generateblocks' ),
		description: __( 'Number of post to show per page', 'generateblocks' ),
		group: __( 'Pagination', 'generateblocks' ),
	},
	{
		id: 'post_type',
		type: 'postTypeSelect',
		default: 'post',
		label: __( 'Post type', 'generateblocks' ),
		description: __( 'Retrieves posts by post types', 'generateblocks' ),
		group: __( 'Post type', 'generateblocks' ),
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
];
