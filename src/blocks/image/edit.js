import './editor.scss';
import InspectorControls from './components/InspectorControls';
import ImageContentRenderer from './components/ImageContentRenderer';
import { compose } from '@wordpress/compose';
import withDynamicContent from '../../extend/dynamic-content/hoc/withDynamicContent';
import { withUniqueId } from '../../hoc';
import { useDeviceType } from '../../hooks';
import ComponentCSS from './components/ComponentCSS';

function ImageEdit( props ) {
	const {
		attributes,
		setAttributes,
		ContentRenderer = ImageContentRenderer,
	} = props;

	const [ deviceType ] = useDeviceType( 'Desktop' );

	return (
		<>
			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
			/>

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<ContentRenderer { ...props } />
		</>
	);
}

export default compose(
	withDynamicContent,
	withUniqueId,
)( ImageEdit );
