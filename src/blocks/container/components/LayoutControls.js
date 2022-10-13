import FlexControls from './FlexControls';

export default ( props ) => {
	const {
		attributes,
	} = props;

	const {
		isGrid,
		useInnerContainer,
	} = attributes;

	if ( useInnerContainer ) {
		return null;
	}

	return (
		<>
			{ !! isGrid &&
				<>
					<FlexControls
						{ ...props }
					/>
				</>
			}
		</>
	);
};
