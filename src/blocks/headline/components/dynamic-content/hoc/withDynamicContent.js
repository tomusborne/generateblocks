import { Fragment } from '@wordpress/element';
import InspectorControls from '../InspectorControls';
import DynamicRenderer from '../DynamicRenderer';
import DynamicContentRenderer from '../DynamicContentRenderer';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes, setAttributes, context, name } = props;

		const newProps = attributes.isDynamicContent ? Object.assign( {}, props, {
			ContentRenderer: DynamicRenderer,
		} ) : props;

		return (
			<Fragment>
				<WrappedComponent { ...newProps } />
				<InspectorControls
					context={ context }
					attributes={ attributes }
					setAttributes={ setAttributes }
					name={ name }
				/>
			</Fragment>
		);
	};
};
