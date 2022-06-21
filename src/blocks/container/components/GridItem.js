export default ( { isGrid, uniqueId, children } ) => {
	if ( ! isGrid ) {
		return children;
	}

	return <div className={ `gb-grid-column gb-grid-column-${ uniqueId }` }>{ children }</div>;
};
