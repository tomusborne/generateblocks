import { __ } from '@wordpress/i18n';

export const layouts = [
	{
		id: 'one-column',
		label: __( 'One Column', 'generateblocks' ),
		layout: '1fr',
		divs: 1,
	},
	{
		id: 'two-column',
		label: __( 'Two Columns', 'generateblocks' ),
		layout: 'repeat(2, minmax(0, 1fr))',
		divs: 2,
	},
	{
		id: 'three-column',
		label: __( 'Three Columns', 'generateblocks' ),
		layout: 'repeat(3, minmax(0, 1fr))',
		divs: 3,
	},
	{
		id: 'four-column',
		label: __( 'Four Columns', 'generateblocks' ),
		layout: 'repeat(4, minmax(0, 1fr))',
		divs: 4,
	},
	{
		id: 'two-column-1-3',
		label: __( 'Two Columns (1/3)', 'generateblocks' ),
		layout: '1fr 3fr',
		divs: 2,
	},
	{
		id: 'two-column-3-1',
		label: __( 'Two Columns (3/1)', 'generateblocks' ),
		layout: '3fr 1fr',
		divs: 2,
	},
	{
		id: 'three-column-1-1-2',
		label: __( 'Three Columns (1/1/2)', 'generateblocks' ),
		layout: '1fr 1fr 2fr',
		divs: 3,
	},
	{
		id: 'three-column-1-2-1',
		label: __( 'Three Columns (1/2/1)', 'generateblocks' ),
		layout: '1fr 2fr 1fr',
		divs: 3,
	},
	{
		id: 'three-column-2-1-1',
		label: __( 'Three Columns (2/1/1)', 'generateblocks' ),
		layout: '2fr 1fr 1fr',
		divs: 3,
	},
	{
		id: 'three-column-20-60-20',
		label: __( 'Three Columns (20/60/20)', 'generateblocks' ),
		layout: '1fr 3fr 1fr',
		divs: 3,
	},
	{
		id: 'five-column',
		label: __( 'Five Columns', 'generateblocks' ),
		layout: 'repeat(5, minmax(0, 1fr))',
		divs: 5,
	},
	{
		id: 'six-column',
		label: __( 'Six Columns', 'generateblocks' ),
		layout: 'repeat(6, minmax(0, 1fr))',
		divs: 6,
	},
];
