import { InspectorAdvancedControls } from '@wordpress/block-editor';
import HTMLAnchor from '../../../components/html-anchor';
import MigrateInnerContainer from './MigrateInnerContainer';
import TagName from './TagName';

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		filterTagName,
	} = props;

	return (
		<InspectorAdvancedControls>
			<HTMLAnchor { ...props } />

			<TagName
				filterTagName={ filterTagName }
				tagName={ attributes.tagName }
				onChange={ ( value ) => setAttributes( { tagName: filterTagName( value ) } ) }
			/>

			<MigrateInnerContainer { ...props } />
		</InspectorAdvancedControls>
	);
};
