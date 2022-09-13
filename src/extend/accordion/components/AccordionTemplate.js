import { __ } from '@wordpress/i18n';

const template = [ [ 'generateblocks/container',
	{
		accordionItem: true,
	},
	[
		[ 'generateblocks/button-container',
			{
				fillHorizontalSpace: true,
				fillHorizontalSpaceTablet: true,
				fillHorizontalSpaceMobile: true,
			},
			[
				[ 'generateblocks/button',
					{
						text: __( 'Accordion title', 'generateblocks' ),
						accordionToggle: true,
						marginBottom: '10',
						iconLocation: 'right',
						iconPaddingLeft: '0.5',
						alignment: 'space-between',
						hasIcon: true,
						icon: '<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 448 512" width="1em" height="1em" ariahidden="true" role="img" class="gb-accordion__icon"><path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" fill="currentColor"></path></svg><svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 448 512" width="1em" height="1em" ariahidden="true" role="img" class="gb-accordion__icon-open"><path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" fill="currentColor"></path></svg>',
					},
				],
			],
		],
		[ 'generateblocks/container',
			{
				accordionContent: true,
				paddingTop: '20',
				paddingRight: '20',
				paddingBottom: '20',
				paddingLeft: '20',
				marginBottom: '20',
				backgroundColor: '#fafafa',
			},
			[
				[ 'core/paragraph',
					{
						content: __( 'Accordion content.', 'generateblocks' ),
					},
				],
			],
		],
	],
] ];

export default template;
