import { Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * Get columns sizes array from layout string
 *
 * @param {string} layout   The layout string. Example: `3-6-3`
 * @param {string} uniqueId The grid block uniqueId attribute
 * @return {Array} The columns attributes
 */
export const getColumnsFromLayout = ( layout, uniqueId ) => {
	const {
		gridItemPaddingTop,
		gridItemPaddingRight,
		gridItemPaddingBottom,
		gridItemPaddingLeft,
	} = generateBlocksStyling.container;

	const columnsData = layout.split( '-' ) || [];

	return columnsData.map( ( col ) => ( {
		isGrid: true,
		gridId: uniqueId,
		paddingTop: gridItemPaddingTop || '',
		paddingRight: gridItemPaddingRight || '',
		paddingBottom: gridItemPaddingBottom || '',
		paddingLeft: gridItemPaddingLeft || '',
		sizing: {
			width: `${ col }%`,
			widthMobile: '100%',
		},
	} ) );
};

export default ( { uniqueId, onClick, isDisabled = false } ) => {
	if ( isDisabled ) {
		return false;
	}

	const layouts = [
		'100',
		'50-50',
		'33.33-33.33-33.33',
		'25-25-25-25',

		'25-75',
		'75-25',
		'25-25-50',
		'25-50-25',

		'50-25-25',
		'20-60-20',
		'20-20-20-20-20',
		'16-16-16-16-16-16',
	];

	return (
		<Placeholder
			label={ __( 'Grid', 'generateblocks' ) }
			instructions={ __( 'Choose how many Containers to start with.', 'generateblocks' ) }
			className="gb-select-layout"
		>
			<div className="gb-grid-wrapper-layout-preview">
				{ layouts.map( ( layout ) => {
					const columnsData = getColumnsFromLayout( layout, uniqueId );

					return (
						<button
							key={ `layout-${ layout }` }
							className="gb-grid-wrapper-layout-preview-btn"
							onClick={ () => onClick( layout ) }
						>
							{ columnsData.map( ( colAttrs, idx ) => {
								const colWidth = colAttrs.sizing.width.replace( '%', '' ).replace( '.', '-' );

								return (
									<div
										key={ `layout-${ layout }-col-${ idx }` }
										className={ classnames( 'gb-col', `gb-col-${ colWidth }` ) }
									/>
								);
							} ) }
						</button>
					);
				} ) }
			</div>
		</Placeholder>
	);
};
