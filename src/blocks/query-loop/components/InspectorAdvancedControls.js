import { InspectorAdvancedControls } from '@wordpress/block-editor';
import BlockLabel from '../../../extend/inspector-control/controls/block-label';

export default function( { blockLabel, setAttributes } ) {
	return (
		<InspectorAdvancedControls>
			<BlockLabel
				value={ blockLabel }
				onChange={ ( value ) => setAttributes( { blockLabel: value } ) }
			/>
		</InspectorAdvancedControls>
	);
}
