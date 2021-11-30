import { Fragment, useEffect } from '@wordpress/element';
import InspectorControls from '../components/InspectorControls';
import QueryLoopRenderer from '../components/QueryLoopRenderer';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes, setAttributes } = props;

		useEffect( () => {
			setAttributes( { isQueryLoop: true } );
		}, [] );

		const newProps = attributes.isQueryLoop ? Object.assign( {}, props, {
			defaultLayout: '100',
			templateLock: 'all',
			InnerBlocksRenderer: QueryLoopRenderer,
		} ) : props;

		return (
			<Fragment>
				<InspectorControls />
				<WrappedComponent { ...newProps } />
			</Fragment>
		);
	};
};
