export default function withPreviewContent( WrappedComponent ) {
	return function( props ) {
		return (
			<>
				<WrappedComponent { ...props } />
				<div>{ 'previews buttons will be here' }</div>
			</>
		);
	}
}
