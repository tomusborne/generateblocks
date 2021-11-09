import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

export default ( { anchor, setAttributes } ) => {
	return (
		<TextControl
			label={ __( 'HTML Anchor', 'generateblocks' ) }
			help={ __( 'Anchors lets you link directly to a section on a page.', 'generateblocks' ) }
			value={ anchor || '' }
			onChange={ ( value ) => {
				const anchorValue = value.replace( ANCHOR_REGEX, '-' );

				setAttributes( { anchor: anchorValue } );
			} } />
	);
};
