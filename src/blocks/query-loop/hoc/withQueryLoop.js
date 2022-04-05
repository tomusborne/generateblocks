import QueryLoopRenderer from '../components/QueryLoopRenderer';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes } = props;

		const newProps = attributes.isQueryLoop ? Object.assign( {}, props, {
			defaultLayout: '100',
			templateLock: 'all',
			InnerBlocksRenderer: QueryLoopRenderer,
		} ) : props;

		return <WrappedComponent { ...newProps } />;
	};
};
