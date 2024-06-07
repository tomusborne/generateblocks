import { useState, useMemo, renderToString } from '@wordpress/element';
import { Button } from '@wordpress/components';

export function IconLibrary( { icons, onInsert } ) {
	const [ currentCategory, setCurrentCategory ] = useState( 'general' );
	const categories = Object.keys( icons );
	const currentIcons = useMemo( () => Object.values( icons[ currentCategory ].svgs ), [ currentCategory ] );

	return (
		<div className="gb-icon-library">
			<div className="gb-icon-library__categories">
				{ categories.map( ( category, index ) => {
					return (
						<Button
							key={ index }
							className="gb-icon-library__category"
							onClick={ () => setCurrentCategory( category ) }
							isPressed={ category === currentCategory }
						>
							{ icons[ category ].group }
						</Button>
					);
				} ) }
			</div>
			<div className="gb-icon-library__icons">
				{ currentIcons.map( ( { icon }, index ) => {
					let iconValue = icon;

					if ( 'string' !== typeof iconValue ) {
						iconValue = renderToString( iconValue );
					}
					return (
						<Button
							key={ index }
							className="gb-icon-library__icon"
							onClick={ () => onInsert( iconValue ) }
						>
							<span dangerouslySetInnerHTML={ { __html: iconValue } } />
						</Button>
					);
				} ) }
			</div>
		</div>
	);
}
