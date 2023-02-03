import { InspectorAdvancedControls } from '@wordpress/block-editor';
import HTMLAnchor from '../../../components/html-anchor';
import TagName from './TagName';

export default ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		isCaption,
		element,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		marginUnit,
	} = attributes;

	return (
		<InspectorAdvancedControls>
			<HTMLAnchor { ...props } />

			<TagName
				isCaption={ isCaption }
				tagName={ element }
				onChange={ ( value ) => {
					setAttributes( {
						element: value,
					} );

					if ( ! marginTop && ! marginRight && ! marginBottom && ! marginLeft ) {
						if ( 'p' === value ) {
							setAttributes( { marginUnit: 'em' } );
						} else {
							setAttributes( { marginUnit } );
						}
					}
				} }
			/>
		</InspectorAdvancedControls>
	);
};
