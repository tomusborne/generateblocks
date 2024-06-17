export const containerColorControls = [
	{
		label: 'Background Color',
		id: 'container-background-color',
		items: [
			{
				tooltip: 'Background Color',
				value: 'backgroundColor',
				selector: '',
			},
		],
	},
	{
		label: 'Text Color',
		id: 'container-text-color',
		items: [
			{
				tooltip: 'Text Color',
				value: 'color',
				selector: '',
			},
		],
	},
	{
		label: 'Link Color',
		id: 'container-link-color',
		items: [
			{
				tooltip: 'Link Color',
				value: 'color',
				selector: 'a',
			},
			{
				tooltip: 'Link Hover Color',
				value: 'color',
				selector: 'a:is(:hover, :focus)',
			},
		],
	},
];

export const linkElementColorControls = [
	{
		label: 'Background Color',
		id: 'link-element-background-color',
		items: [
			{
				tooltip: 'Background Color',
				value: 'backgroundColor',
				selector: '',
			},
			{
				tooltip: 'Hover Background Color',
				value: 'backgroundColor',
				selector: '&:is(:hover, :focus)',
			},
		],
	},
	{
		label: 'Text Color',
		id: 'link-element-text-color',
		items: [
			{
				tooltip: 'Text Color',
				value: 'color',
				selector: '',
			},
			{
				tooltip: 'Hover Text Color',
				value: 'color',
				selector: '&:is(:hover, :focus)',
			},
		],
	},
];

export const buttonColorControls = [
	{
		label: 'Background Color',
		id: 'button-background-color',
		items: [
			{
				tooltip: 'Background Color',
				value: 'backgroundColor',
				selector: '',
			},
			{
				tooltip: 'Hover Background Color',
				value: 'backgroundColor',
				selector: '&:is(:hover, :focus)',
			},
		],
	},
	{
		label: 'Text Color',
		id: 'button-text-color',
		items: [
			{
				tooltip: 'Text Color',
				value: 'color',
				selector: '',
			},
			{
				tooltip: 'Hover Text Color',
				value: 'color',
				selector: '&:is(:hover, :focus)',
			},
		],
	},
	{
		label: 'Icon Color',
		id: 'icon-color',
		items: [
			{
				tooltip: 'Icon Color',
				value: 'color',
				selector: 'svg',
			},
			{
				tooltip: 'Hover Icon Color',
				value: 'color',
				selector: '&:is(:hover, :focus) svg',
			},
		],
	},
];

export const textColorControls = [
	{
		label: 'Background Color',
		id: 'text-background-color',
		items: [
			{
				tooltip: 'Background Color',
				value: 'backgroundColor',
				selector: '',
			},
		],
	},
	{
		label: 'Text Color',
		id: 'text-text-color',
		items: [
			{
				tooltip: 'Text Color',
				value: 'color',
				selector: '',
			},
		],
	},
	{
		label: 'Icon Color',
		id: 'icon-color',
		items: [
			{
				tooltip: 'Icon Color',
				value: 'color',
				selector: 'svg',
			},
		],
	},
];

export const shapeColorControls = [
	{
		label: 'Color',
		id: 'shape-color',
		items: [
			{
				tooltip: 'Color',
				value: 'color',
				selector: 'svg',
			},
		],
	},
];
