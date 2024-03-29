import ContentRenderer from '../../looper/components/LoopInnerBlocksRenderer';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes } = props;

		const newProps = 'loopRepeater' === attributes.variantRole ? Object.assign( {}, props, {
			defaultLayout: '100',
			templateLock: 'all',
			ContentRenderer,
		} ) : props;

		return <WrappedComponent { ...newProps } />;
	};
};
