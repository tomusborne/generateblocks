import PostTemplateRenderer from '../components/PostTemplateRenderer';

export default ( WrappedComponent ) => {
	return ( props ) => {
		const { attributes } = props;

		const newProps = attributes.isQueryLoop ? Object.assign( {}, props, {
			defaultLayout: '100',
			templateLock: 'all',
			InnerBlocksRenderer: PostTemplateRenderer,
		} ) : props;

		return <WrappedComponent { ...newProps } />;
	};
};
