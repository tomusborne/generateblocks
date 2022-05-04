import { __ } from '@wordpress/i18n';

const templates = [
	{
		name: 'title-date-excerpt',
		title: __( 'Title, date, & excerpt', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M15 33h171v11H15zM15 51h79v5H15zM15 71h171v5H15zM15 82h171v5H15zM15 116h171v11H15zM15 134h79v5H15zM15 154h171v5H15zM15 165h171v5H15z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/grid',
				{
					isQueryLoop: true,
					verticalGap: 40,
					lock: {
						remove: true,
					},
				},
				[
					[ 'generateblocks/container',
						{
							isQueryLoopItem: true,
							width: 100,
							lock: {
								remove: true,
								move: true,
							},
						},
						[
							[ 'generateblocks/headline', {
								useDynamicData: true,
								dynamicContentType: 'post-title',
								dynamicLinkType: 'single-post',
								marginBottom: '5',
							} ],
							[ 'generateblocks/headline', {
								useDynamicData: true,
								element: 'p',
								dynamicContentType: 'post-date',
								fontSize: 14,
							} ],
							[ 'generateblocks/headline', {
								useDynamicData: true,
								element: 'div',
								dynamicContentType: 'post-excerpt',
							} ],
						],
					],
				],
			],
		],
	},
	{
		name: 'title-date',
		title: __( 'Title & date', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M14 30h171v11H14zM14 48h79v5H14zM14 88h171v11H14zM14 106h79v5H14zM14 146h171v11H14zM14 164h79v5H14z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/grid',
				{
					isQueryLoop: true,
					verticalGap: 20,
					lock: {
						remove: true,
					},
				},
				[
					[ 'generateblocks/container',
						{
							isQueryLoopItem: true,
							width: 100,
							lock: {
								remove: true,
								move: true,
							},
						},
						[
							[ 'generateblocks/headline', {
								useDynamicData: true,
								element: 'h2',
								fontSize: 20,
								dynamicContentType: 'post-title',
								dynamicLinkType: 'single-post',
								marginBottom: '5',
							} ],
							[ 'generateblocks/headline', {
								useDynamicData: true,
								element: 'p',
								marginBottom: '0',
								dynamicContentType: 'post-date',
								fontSize: 14,
							} ],
						],
					],
				],
			],
		],
	},
	{
		name: 'two-columns',
		title: __( 'Two columns', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M14 28h78v11H14zM14 46h36.035v5H14zM14 66h78v5H14zM14 77h78v5H14zM108 28h78v11h-78zM108 46h36.035v5H108zM108 66h78v5h-78zM108 77h78v5h-78zM14 118h78v11H14zM14 136h36.035v5H14zM14 156h78v5H14zM14 167h78v5H14zM108 118h78v11h-78zM108 136h36.035v5H108zM108 156h78v5h-78zM108 167h78v5h-78z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/grid',
				{
					isQueryLoop: true,
					verticalGap: 20,
					horizontalGap: 20,
					lock: {
						remove: true,
					},
				},
				[
					[ 'generateblocks/container',
						{
							isQueryLoopItem: true,
							width: 50,
							widthMobile: 100,
							backgroundColor: '#fafafa',
							paddingTop: '20',
							paddingRight: '20',
							paddingBottom: '20',
							paddingLeft: '20',
							lock: {
								remove: true,
								move: true,
							},
						},
						[
							[ 'generateblocks/headline', {
								useDynamicData: true,
								element: 'h2',
								fontSize: 30,
								dynamicContentType: 'post-title',
								dynamicLinkType: 'single-post',
								marginBottom: '5',
							} ],
							[ 'generateblocks/headline', {
								useDynamicData: true,
								element: 'p',
								marginBottom: '30',
								dynamicContentType: 'post-date',
								fontSize: 14,
							} ],
							[ 'generateblocks/headline', {
								useDynamicData: true,
								element: 'div',
								dynamicContentType: 'post-excerpt',
							} ],
						],
					],
				],
			],
		],
	},
	{
		name: 'two-columns-feature-image',
		title: __( 'Two columns & featured image', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M110 57h78v11h-78V57ZM110 16h78v35h-78V16ZM110 76h78v5h-78zM110 87h55v5h-55zM110 149h78v11h-78v-11ZM110 108h78v35h-78v-35ZM110 168h78v5h-78zM110 179h55v5h-55zM15 149h78v11H15v-11ZM15 108h78v35H15v-35ZM15 168h78v5H15zM15 179h55v5H15zM15 57h78v11H15V57ZM15 16h78v35H15V16ZM15 76h78v5H15zM15 87h55v5H15z" /></svg>,
		innerBlocks: [
			[ 'generateblocks/grid',
				{
					isQueryLoop: true,
					verticalGap: 20,
					horizontalGap: 20,
					lock: {
						remove: true,
					},
				},
				[
					[ 'generateblocks/container',
						{
							isQueryLoopItem: true,
							width: 50,
							widthMobile: 100,
							backgroundColor: '#fafafa',
							paddingTop: '20',
							paddingRight: '20',
							paddingBottom: '20',
							paddingLeft: '20',
							lock: {
								remove: true,
								move: true,
							},
						},
						[
							[ 'generateblocks/image', {
								useDynamicData: true,
								dynamicContentType: 'featured-image',
								marginBottom: '30',
							} ],
							[ 'generateblocks/headline', {
								useDynamicData: true,
								element: 'h2',
								fontSize: 30,
								dynamicContentType: 'post-title',
								dynamicLinkType: 'single-post',
								marginBottom: '5',
							} ],
							[ 'generateblocks/headline', {
								useDynamicData: true,
								element: 'p',
								marginBottom: '30',
								dynamicContentType: 'post-date',
								fontSize: 14,
							} ],
							[ 'generateblocks/headline', {
								useDynamicData: true,
								element: 'div',
								dynamicContentType: 'post-excerpt',
							} ],
						],
					],
				],
			],
		],
	},
	{
		name: 'blank',
		title: __( 'Start blank', 'generateblocks' ),
		icon: <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"></svg>,
		innerBlocks: [
			[ 'generateblocks/grid',
				{
					isQueryLoop: true,
					lock: {
						remove: true,
					},
				},
				[
					[ 'generateblocks/container',
						{
							isQueryLoopItem: true,
							width: 100,
							lock: {
								remove: true,
								move: true,
							},
						},
					],
				],
			],
		],
	},
];

export default templates;
