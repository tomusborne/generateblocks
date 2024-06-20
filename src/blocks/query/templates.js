import { __ } from '@wordpress/i18n';

const buttonStyles = {
	paddingTop: '1rem',
	paddingRight: '1rem',
	paddingBottom: '1rem',
	paddingLeft: '1rem',
	borderTopColor: '#000',
	borderRightColor: '#000',
	borderBottomColor: '#000',
	borderLeftColor: '#000',
	borderTopStyle: 'solid',
	borderRightStyle: 'solid',
	borderBottomStyle: 'solid',
	borderLeftStyle: 'solid',
	borderTopWidth: '1px',
	borderRightWidth: '1px',
	borderBottomWidth: '1px',
	borderLeftWidth: '1px',
	backgroundColor: '#ffffff',
	color: '#000000',
	display: 'inline-flex',
	textDecoration: 'none',
	lineHeight: '1',
	fontSize: '14px',
};

const pagination = [ 'generateblocks/element',
	{
		styles: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: '20px',
			columnGap: '10px',
			rowGap: '10px',
		},
	},
	[
		[ 'generateblocks/text',
			{
				tagName: 'a',
				content: __( 'Previous', 'generateblocks' ),
				htmlAttributes: {
					href: '{previous_posts_page_url}',
				},
				styles: {
					...buttonStyles,
				},
			},
		],
		[ 'generateblocks/query-page-numbers',
			{
				styles: {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					columnGap: '5px',
					rowGap: '5px',
					'.page-numbers': {
						...buttonStyles,
					},
					'.page-numbers:is(.current, .dots)': {
						borderTopWidth: '0',
						borderRightWidth: '0',
						borderBottomWidth: '0',
						borderLeftWidth: '0',
					},
				},
			},
		],
		[ 'generateblocks/text',
			{
				tagName: 'a',
				content: __( 'Next', 'generateblocks' ),
				htmlAttributes: {
					href: '{next_posts_page_url}',
				},
				styles: {
					...buttonStyles,
				},
			},
		],
	],
];

const noResults = [ 'generateblocks/query-no-results',
	{},
	[
		[ 'generateblocks/text',
			{
				tagName: 'p',
				content: __( 'No results found.', 'generateblocks' ),
			},
		],
	],
];

export const templates = [
	{
		id: 'title-date-excerpt',
		label: __( 'Title, date, & excerpt', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M15 33h171v11H15zM15 51h79v5H15zM15 71h171v5H15zM15 82h171v5H15zM15 116h171v11H15zM15 134h79v5H15zM15 154h171v5H15zM15 165h171v5H15z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/looper',
				{
					styles: {
						display: 'flex',
						flexDirection: 'column',
						rowGap: '40px',
					},
				},
				[
					[ 'generateblocks/element',
						{},
						[
							[ 'generateblocks/text', {
								tagName: 'h2',
								content: '{post_title}',
							} ],
							[ 'generateblocks/text', {
								tagName: 'p',
								content: '{modified_date}',
								styles: {
									fontSize: '14px',
								},
							} ],
							[ 'core/post-excerpt', {} ],
						],
					],
				],
			],
			pagination,
			noResults,
		],
	},
	{
		id: 'title-date',
		label: __( 'Title & date', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M14 30h171v11H14zM14 48h79v5H14zM14 88h171v11H14zM14 106h79v5H14zM14 146h171v11H14zM14 164h79v5H14z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/looper',
				{
					styles: {
						display: 'flex',
						flexDirection: 'column',
						rowGap: '20px',
					},
				},
				[
					[ 'generateblocks/element',
						{},
						[
							[ 'generateblocks/text', {
								tagName: 'h2',
								styles: {
									fontSize: '20px',
									marginBottom: '5px',
								},
								content: '<a href="{post_permalink}">{post_title}</a>',
							} ],
							[ 'generateblocks/text', {
								tagName: 'p',
								styles: {
									marginBottom: '0px',
									fontSize: '14px',
								},
								content: '{modified_date}',
							} ],
						],
					],
				],
			],
			pagination,
			noResults,
		],
	},
	{
		id: 'two-columns',
		label: __( 'Two columns', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M14 28h78v11H14zM14 46h36.035v5H14zM14 66h78v5H14zM14 77h78v5H14zM108 28h78v11h-78zM108 46h36.035v5H108zM108 66h78v5h-78zM108 77h78v5h-78zM14 118h78v11H14zM14 136h36.035v5H14zM14 156h78v5H14zM14 167h78v5H14zM108 118h78v11h-78zM108 136h36.035v5H108zM108 156h78v5h-78zM108 167h78v5h-78z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/looper',
				{
					styles: {
						display: 'grid',
						gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
						columnGap: '20px',
						rowGap: '20px',
					},
				},
				[
					[ 'generateblocks/element',
						{
							styles: {
								backgroundColor: '#fafafa',
								paddingTop: '20px',
								paddingRight: '20px',
								paddingBottom: '20px',
								paddingLeft: '20px',
							},
						},
						[
							[ 'generateblocks/text', {
								tagName: 'h2',
								styles: {
									fontSize: '30px',
									marginBottom: '5px',
								},
								content: '<a href="{post_permalink}">{post_title}</a>',
							} ],
							[ 'generateblocks/text', {
								tagName: 'p',
								styles: {
									marginBottom: '30px',
									fontSize: '14px',
								},
								content: '{modified_date}',
							} ],
							[ 'core/post-excerpt', {} ],
						],
					],
				],
			],
			pagination,
			noResults,
		],
	},
	{
		id: 'two-columns-feature-image',
		label: __( 'Two columns & featured image', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M110 57h78v11h-78V57ZM110 16h78v35h-78V16ZM110 76h78v5h-78zM110 87h55v5h-55zM110 149h78v11h-78v-11ZM110 108h78v35h-78v-35ZM110 168h78v5h-78zM110 179h55v5h-55zM15 149h78v11H15v-11ZM15 108h78v35H15v-35ZM15 168h78v5H15zM15 179h55v5H15zM15 57h78v11H15V57ZM15 16h78v35H15V16ZM15 76h78v5H15zM15 87h55v5H15z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/looper',
				{
					styles: {
						display: 'grid',
						gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
						columnGap: '20px',
						rowGap: '20px',
					},
				},
				[
					[ 'generateblocks/element',
						{
							styles: {
								backgroundColor: '#fafafa',
								paddingTop: '20px',
								paddingRight: '20px',
								paddingBottom: '20px',
								paddingLeft: '20px',
							},
						},
						[
							[ 'generateblocks/media', {
								tagName: 'img',
								htmlAttributes: {
									src: '{featured_image_url}',
									alt: '{post_title}',
								},
								styles: {
									marginBottom: '30px',
								},
							} ],
							[ 'generateblocks/text', {
								tagName: 'h2',
								styles: {
									fontSize: '30px',
									marginBottom: '5px',
								},
								content: '<a href="{post_permalink}">{post_title}</a>',
							} ],
							[ 'generateblocks/text', {
								tagName: 'p',
								styles: {
									marginBottom: '30px',
									fontSize: '14px',
								},
								content: '{modified_date}',
							} ],
							[ 'core/post-excerpt', {} ],
						],
					],
				],
			],
			pagination,
			noResults,
		],
	},
	{
		id: 'blank',
		label: __( 'Start blank', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"></svg>,
		innerBlocks: [
			[ 'generateblocks/looper',
				{},
				[
					[ 'generateblocks/element',
						{},
					],
				],
			],
		],
	},
];
