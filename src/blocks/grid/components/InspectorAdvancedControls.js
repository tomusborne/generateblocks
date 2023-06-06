import { InspectorAdvancedControls } from '@wordpress/block-editor';
import HTMLAnchor from '../../../components/html-anchor';
import BlockLabel from '../../../extend/inspector-control/controls/block-label';

export default ( { anchor, blockLabel, setAttributes } ) => {
	return (
		<InspectorAdvancedControls>
			<HTMLAnchor anchor={ anchor } setAttributes={ setAttributes } />

			<BlockLabel
				value={ blockLabel }
				onChange={ ( value ) => setAttributes( { blockLabel: value } ) }
			/>
		</InspectorAdvancedControls>
	);
};
