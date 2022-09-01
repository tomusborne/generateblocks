import UnitControl from '../../../components/unit-control';
import GridItemWidthControl from './GridItemWidthControl';
import FlexControls from './FlexControls';
import { __ } from '@wordpress/i18n';

export default ( props ) => {
	const {
		attributes,
		deviceType,
	} = props;

	const {
		isGrid,
	} = attributes;

	return (
		<>
			<UnitControl
				{ ...props }
				label={ __( 'max-width', 'generateblocks' ) }
				id="gblocks-max-width"
				attributeName="maxWidth"
				device={ deviceType }
				min="1"
				units={ [ 'px', '%', 'vw', 'rem' ] }
			/>

			{ !! isGrid &&
				<>
					<GridItemWidthControl
						{ ...props }
					/>

					<FlexControls
						{ ...props }
					/>
				</>
			}
		</>
	);
};
