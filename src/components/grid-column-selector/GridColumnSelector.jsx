import classnames from 'classnames';
import { Button } from '@wordpress/components';
import { layouts } from './layouts';
import './editor.scss';

export function GridColumnSelector( { onClick, value } ) {
	return (
		<div className="gb-grid-control__grid-template-columns-rows--presets">
			{ layouts.map( ( { label, id, layout, divs } ) => {
				return (
					<Button
						label={ label }
						showTooltip={ true }
						key={ `layout-${ id }` }
						className="gb-grid-control__grid-template-columns-rows--presets-button"
						onClick={ () => onClick( layout ) }
						isPressed={ layout === value }
						style={ { '--grid-template-columns': layout } }
					>
						{ Array.from( { length: divs }, ( _, index ) => (
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
