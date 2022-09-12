import { InspectorAdvancedControls } from '@wordpress/block-editor';
import HTMLAnchor from '../../../components/html-anchor';
import MigrateInnerContainer from './MigrateInnerContainer';

export default ( props ) => {
	return (
		<InspectorAdvancedControls>
			<HTMLAnchor { ...props } />
			<MigrateInnerContainer { ...props } />
		</InspectorAdvancedControls>
	);
};
