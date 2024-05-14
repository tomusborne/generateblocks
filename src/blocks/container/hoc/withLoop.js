import InnerBlocksRenderer from '../../looper/components/LoopInnerBlocksRenderer';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes } = props;

		const newProps = 'loopRepeater' === attributes.variantRole ? Object.assign( {}, props, {
			defaultLayout: '100',
			templateLock: 'all',
			InnerBlocksRenderer,
			isBlockPreview: true,
		} ) : props;

		return <WrappedComponent { ...newProps } />;
	};
};
