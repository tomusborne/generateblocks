import { useState, useMemo, renderToString } from '@wordpress/element';
import { Button } from '@wordpress/components';
import './editor.scss';
import classNames from 'classnames';

export function IconLibrary( { icons, onInsert, category = '', iconType = '' } ) {
	const defaultCategory = category || Object.keys( icons )[ 0 ];
	const [ currentCategory, setCurrentCategory ] = useState( defaultCategory );
	const categories = Object.keys( icons );
	const currentIcons = useMemo( () => Object.values( icons[ currentCategory ].svgs ), [ currentCategory ] );

	return (
		<div
			className={
				classNames(
					'gb-icon-library',
					{
						[ `gb-icon-library--${ iconType }` ]: iconType,
					}
				)
			}
		>
			<div className="gb-icon-library__categories">
				{ categories.map( ( categoryId, index ) => {
					return (
						<Button
							key={ index }
							className="gb-icon-library__category"
							onClick={ () => setCurrentCategory( categoryId ) }
							isPressed={ categoryId === currentCategory }
						>
							{ icons[ categoryId ].group }
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
