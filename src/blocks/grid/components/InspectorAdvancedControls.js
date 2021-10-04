import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

export default ( { anchor, setAttributes } ) => {
	return (
		<InspectorAdvancedControls>
			<TextControl
				label={ __( 'HTML Anchor', 'generateblocks' ) }
				help={ __( 'Anchors lets you link directly to a section on a page.', 'generateblocks' ) }
				value={ anchor || '' }
				onChange={ ( nextValue ) => {
					nextValue = nextValue.replace( ANCHOR_REGEX, '-' );
					setAttributes( {
						anchor: nextValue,
					} );
				} } />
		</InspectorAdvancedControls>
	);
};
