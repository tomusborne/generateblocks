import { InspectorAdvancedControls } from '@wordpress/block-editor';
import HTMLAnchor from '../../../components/html-anchor';

export default ( props ) => {
	return (
		<InspectorAdvancedControls>
			<HTMLAnchor { ...props } />
		</InspectorAdvancedControls>
	);
};
