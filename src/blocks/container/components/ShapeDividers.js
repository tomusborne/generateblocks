import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import sanitizeSVG from '../../../utils/sanitize-svg';

export default ( { attributes, allShapes } ) => {
	const { shapeDividers } = attributes;

	return (
		<Fragment>
			{ !! attributes.shapeDividers.length &&
			<div className="gb-shapes">
				{
					attributes.shapeDividers.map( ( location, index ) => {
						const shapeNumber = index + 1;

						return <Fragment key={ index }>
							{ 'undefined' !== typeof allShapes[ shapeDividers[ index ].shape ] &&
								<div
									className={ classnames( {
										'gb-shape': true,
										[ `gb-shape-${ shapeNumber }` ]: true,
									} ) }
									dangerouslySetInnerHTML={ { __html: sanitizeSVG( allShapes[ shapeDividers[ index ].shape ].icon ) } }
								/>
							}
						</Fragment>;
					} )
				}
			</div>
			}
		</Fragment>
	);
};
