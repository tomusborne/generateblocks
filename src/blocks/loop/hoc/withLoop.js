import QueryLoopRenderer from '../components/QueryLoopRenderer';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes } = props;

		const newProps = 'loopRepeater' === attributes.variantRole ? Object.assign( {}, props, {
			defaultLayout: '100',
			templateLock: 'all',
			ContentRenderer: QueryLoopRenderer,
		} ) : props;

		return <WrappedComponent { ...newProps } />;
	};
};
