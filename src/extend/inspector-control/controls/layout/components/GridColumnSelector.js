import classnames from 'classnames';
import { Button } from '@wordpress/components';

export function GridTemplateSelector( { onClick, value } ) {
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

	return (
		<div className="gb-grid-control__grid-template-columns-rows--presets">
			{ Object.keys( layouts ).map( ( layout ) => {
				return (
					<Button
						label={ layout }
						showTooltip={ true }
						key={ `layout-${ layout }` }
						className="gb-grid-control__grid-template-columns-rows--presets-button"
						onClick={ () => onClick( layout ) }
						isPressed={ layout === value }
						style={ { '--grid-template-columns': layout } }
					>
						{ Array.from( { length: layouts[ layout ] }, ( _, index ) => (
							<div
								key={ `layout-${ index }` }
								className={ classnames( 'gb-preview-column' ) }
							/>
						) ) }
					</Button>
				);
			} ) }
		</div>
	);
}
