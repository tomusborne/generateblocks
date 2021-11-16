import classnames from 'classnames';

export default function GridItem( { isGrid, uniqueId, children } ) {
	if ( ! isGrid ) {
		return children;
	}

	return <div className={
		classnames( {
			'gb-grid-column': true,
			[ `gb-grid-column-${ uniqueId }` ]: true,
		} ) }
	>
		{ children }
	</div>;
}
