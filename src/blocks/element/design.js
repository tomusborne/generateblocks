export const containerColorControls = [
	{
		label: 'Background Color',
		value: 'backgroundColor',
		selector: '',
	},
	{
		label: 'Text Color',
		value: 'color',
		selector: '',
	},
	{
		label: 'Link Color',
		value: 'color',
		selector: 'a',
	},
	{
		label: 'Link Hover Color',
		value: 'color',
		selector: 'a:is(:hover, :focus)',
	},
];

export const buttonColorControls = [
	{
		label: 'Background Color',
		value: 'backgroundColor',
		selector: '',
	},
	{
		label: 'Hover Background Color',
		value: 'backgroundColor',
		selector: ':is(:hover, :focus)',
	},
	{
		label: 'Text Color',
		value: 'color',
		selector: '',
	},
	{
		label: 'Hover Text Color',
		value: 'color',
		selector: ':is(:hover, :focus)',
	},
];
