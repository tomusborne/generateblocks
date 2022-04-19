import InspectorControls from '../InspectorControls';
import DynamicRenderer from '../DynamicRenderer';
import { Provider } from 'react-redux';
import gbStore from '../../../store';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes, setAttributes, context, name } = props;

		const newProps = attributes.isDynamicContent &&
			( !! attributes.contentType || !! attributes.dynamicLinkType )
			? Object.assign( {}, props, {
				ContentRenderer: DynamicRenderer,
			} ) : props;

		return (
			<Provider store={ gbStore }>
				<WrappedComponent { ...newProps } />
				<InspectorControls
					context={ context }
					attributes={ attributes }
					setAttributes={ setAttributes }
					name={ name }
				/>
			</Provider>
		);
	};
};
