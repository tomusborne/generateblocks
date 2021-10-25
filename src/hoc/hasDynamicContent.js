import filterAttributes from '../utils/filter-attributes';
import DynamicContentControl, { dynamicContentAttributes } from '../components/dynamic-content';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes, setAttributes } = props;

		return (
			<Fragment>
				<InspectorControls>
					<DynamicContentControl
						attributes={ filterAttributes( attributes, Object.keys( dynamicContentAttributes ) ) }
						setAttributes={ setAttributes }
					/>
				</InspectorControls>

				<WrappedComponent { ...props } />
			</Fragment>
		);
	};
};
