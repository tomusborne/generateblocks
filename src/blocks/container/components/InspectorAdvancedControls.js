import { InspectorAdvancedControls } from '@wordpress/block-editor';
import HTMLAnchor from '../../../components/html-anchor';
import TagName from './TagName';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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

			<TextControl
				label={ __( 'Block label', 'generateblocks' ) }
				help={ __( 'Add a label for this block in the List View.', 'generateblocks' ) }
				value={ attributes.blockLabel }
				onChange={ ( blockLabel ) => setAttributes( { blockLabel } ) }
			/>
		</InspectorAdvancedControls>
	);
};
