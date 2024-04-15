import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

function buildLayout( layouts, layout ) {
	return (
		<div
			label={ layout }
			key={ `layout-${ layout }` }
			className="gb-grid-control__grid-template-columns-rows--presets-button"
			style={ { '--grid-template-columns': layout } }
		>
			{ Array.from( { length: layouts[ layout ] }, ( _, index ) => (
				<div
					key={ `layout-${ index }` }
					className={ classnames( 'gb-preview-column' ) }
				/>
			) ) }
		</div>
	);
}

function generateInnerBlocks( layouts, layoutKey ) {
	const repeatCount = layouts[ layoutKey ] || 1;
	const innerBlocks = [];
	for ( let i = 0; i < repeatCount; i++ ) {
		innerBlocks.push( [ 'generateblocks/container', {} ] );
	}
	return innerBlocks;
}

function addTemplateSelectors( context, props ) {
	const layouts = {
		'': 1,
		'repeat(2, 1fr)': 2,
		'repeat(3, 1fr)': 3,
		'repeat(4, 1fr)': 4,
		'1fr 3fr': 2,
		'3fr 1fr': 2,
		'1fr 1fr 2fr': 3,
		'1fr 2fr 1fr': 3,
		'2fr 1fr 1fr': 3,
		'20% 1fr 20%': 3,
		'repeat(5, 1fr)': 5,
		'repeat(6, 1fr)': 6,
	};

	const tabTemplates = {
		label: __( 'Grid', 'generateblocks' ),
		instructions: __( 'Choose how many Containers to start with.', 'generateblocks' ),
		templates: [
			{
				id: 'one-column',
				label: __( 'One Column', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, '' ),
				innerBlocks: generateInnerBlocks( layouts, '' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: '1fr',
				},
			},
			{
				id: 'two-column',
				label: __( 'Two Columns', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, 'repeat(2, 1fr)' ),
				innerBlocks: generateInnerBlocks( layouts, 'repeat(2, 1fr)' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: 'repeat(2, 1fr)',
				},
			},
			{
				id: 'three-column',
				label: __( 'Three Columns', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, 'repeat(3, 1fr)' ),
				innerBlocks: generateInnerBlocks( layouts, 'repeat(3, 1fr)' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
				},
			},
			{
				id: 'four-column',
				label: __( 'Four Columns', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, 'repeat(4, 1fr)' ),
				innerBlocks: generateInnerBlocks( layouts, 'repeat(4, 1fr)' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
				},
			},
			{
				id: 'two-column-1-3',
				label: __( 'Two Columns (1/3)', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, '1fr 3fr' ),
				innerBlocks: generateInnerBlocks( layouts, '1fr 3fr' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: '1fr 3fr',
				},
			},
			{
				id: 'two-column-3-1',
				label: __( 'Two Columns (3/1)', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, '3fr 1fr' ),
				innerBlocks: generateInnerBlocks( layouts, '3fr 1fr' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: '3fr 1fr',
				},
			},
			{
				id: 'three-column-1-1-2',
				label: __( 'Three Columns (1/1/2)', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, '1fr 1fr 2fr' ),
				innerBlocks: generateInnerBlocks( layouts, '1fr 1fr 2fr' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: '1fr 1fr 2fr',
				},
			},
			{
				id: 'three-column-1-2-1',
				label: __( 'Three Columns (1/2/1)', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, '1fr 2fr 1fr' ),
				innerBlocks: generateInnerBlocks( layouts, '1fr 2fr 1fr' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: '1fr 2fr 1fr',
				},
			},
			{
				id: 'three-column-2-1-1',
				label: __( 'Three Columns (2/1/1)', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, '2fr 1fr 1fr' ),
				innerBlocks: generateInnerBlocks( layouts, '2fr 1fr 1fr' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: '2fr 1fr 1fr',
				},
			},
			{
				id: 'three-column-20-60-20',
				label: __( 'Three Columns (20/60/20)', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, '20% 1fr 20%' ),
				innerBlocks: generateInnerBlocks( layouts, '20% 1fr 20%' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: '20% 1fr 20%',
				},
			},
			{
				id: 'five-column',
				label: __( 'Five Columns', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, 'repeat(5, 1fr)' ),
				innerBlocks: generateInnerBlocks( layouts, 'repeat(5, 1fr)' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: 'repeat(5, 1fr)',
				},
			},
			{
				id: 'six-column',
				label: __( 'Six Columns', 'generateblocks' ),
				labelAsTooltip: true,
				icon: buildLayout( layouts, 'repeat(6, 1fr)' ),
				innerBlocks: generateInnerBlocks( layouts, 'repeat(6, 1fr)' ),
				attributes: {
					display: 'grid',
					gridTemplateColumns: 'repeat(6, 1fr)',
				},
			},
		],
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
