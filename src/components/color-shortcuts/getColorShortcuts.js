export function getColorShortcuts( { tagName, icon } ) {
	const colorShortcuts = [
		{
			name: 'Text',
			property: 'color',
			colors: [
				{
					name: 'Static',
					nestedRule: '',
				},
				{
					name: 'Hover',
					nestedRule: '&:hover',
				},
				{
					name: 'Hover & Focus',
					nestedRule: '&:is(:hover, :focus)',
				},
			],
		},
		{
			name: 'Background',
			property: 'backgroundColor',
			colors: [
				{
					name: 'Static',
					nestedRule: '',
				},
				{
					name: 'Hover',
					nestedRule: '&:hover',
				},
				{
					name: 'Hover & Focus',
					nestedRule: '&:is(:hover, :focus)',
				},
			],
		},
	];

	if ( 'a' !== tagName ) {
		colorShortcuts.push(
			{
				name: 'Links',
				property: 'color',
				colors: [
					{
						name: 'Static',
						nestedRule: 'a',
					},
					{
						name: 'Hover',
						nestedRule: 'a:hover',
					},
					{
						name: 'Hover & Focus',
						nestedRule: 'a:is(:hover, :focus)',
					},
				],
			}
		);
	}

	if ( icon ) {
		colorShortcuts.push(
			{
				name: 'Icon',
				property: 'color',
				colors: [
					{
						name: 'Static',
						nestedRule: '.gb-shape svg',
					},
					{
						name: 'Hover',
						nestedRule: '&:hover > .gb-shape svg',
					},
					{
						name: 'Hover & Focus',
						nestedRule: '&:is(:hover, :focus) > .gb-shape svg',
					},
				],
			}
		);
	}

	return colorShortcuts;
}
