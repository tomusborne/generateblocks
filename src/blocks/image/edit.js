import './editor.scss';
import InspectorControls from './components/InspectorControls';
import ImageContentRenderer from './components/ImageContentRenderer';
import { compose } from '@wordpress/compose';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import { withUniqueId } from '../../hoc';

function ImageEdit( props ) {
	const {
		attributes,
		setAttributes,
		ContentRenderer = ImageContentRenderer,
	} = props;

	return (
		<>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<ContentRenderer { ...props } />
		</>
	);
}

export default compose(
	withDynamicContent,
	withUniqueId,
)( ImageEdit );
