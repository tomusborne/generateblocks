export default ( { isQueryLoop, children } ) => {
	if ( ! isQueryLoop ) {
		return children;
	}

	return <div className="gb-query-wrapper">{ children }</div>;
};
