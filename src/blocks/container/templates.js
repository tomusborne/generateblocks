import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

export const layouts = [
	{
		id: 'one-column',
		label: __( 'One Column', 'generateblocks' ),
		layout: '',
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

function buildLayout( layout ) {
	const id = layouts.find( ( { layout: l } ) => l === layout ).id;
	const value = layouts.find( ( { layout: l } ) => l === layout ).layout;

	return (
		<div
			key={ `layout-${ id }` }
			className="gb-grid-control__grid-template-columns-rows--presets-button"
			style={ { '--grid-template-columns': value } }
		>
			{ Array.from( { length: layouts.find( ( { layout: l } ) => l === layout ).divs }, ( _, index ) => (
				<div
					key={ `layout-${ index }` }
					className={ classnames( 'gb-preview-column' ) }
				/>
			) ) }
		</div>
	);
}

function generateInnerBlocks( layoutKey ) {
	const repeatCount = layouts.find( ( { layout } ) => layout === layoutKey ).divs;
	const innerBlocks = [];
	for ( let i = 0; i < repeatCount; i++ ) {
		innerBlocks.push( [ 'generateblocks/container', {} ] );
	}
	return innerBlocks;
}

function addTemplateSelectors( context, props ) {
	const tabTemplates = {
		label: __( 'Grid', 'generateblocks' ),
		instructions: __( 'Choose how many Containers to start with.', 'generateblocks' ),
		templates: layouts.map( ( { label, layout, id } ) => {
			return {
				id,
				label,
				labelAsTooltip: true,
				icon: buildLayout( layout ),
				innerBlocks: generateInnerBlocks( layout ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: layout,
				},
			};
		} ),
	};

	if ( 'grid' === props.attributes.variantRole ) {
		return tabTemplates;
	}

	return context;
}

addFilter(
	'generateblocks.editor.templateContext',
	'generateblocks/grid/add-template-selector',
	addTemplateSelectors
);
