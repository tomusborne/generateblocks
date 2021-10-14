import { Fragment } from '@wordpress/element';
import InspectorControls from '../components/query-loop/InspectorControls';
import QueryLoopRenderer from '../components/QueryLoopRenderer';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes, setAttributes } = props;

		const newProps = attributes.isQueryLoop ? Object.assign( {}, props, {
			defaultLayout: '100',
			templateLock: 'all',
			InnerBlocksRenderer: QueryLoopRenderer,
		} ) : props;

		return (
			<Fragment>
				<InspectorControls attributes={ attributes } setAttributes={ setAttributes } />
				<WrappedComponent { ...newProps } />
			</Fragment>
		);
	};
};
