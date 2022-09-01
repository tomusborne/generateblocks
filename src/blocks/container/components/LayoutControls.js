import UnitControl from '../../../components/unit-control';
import GridItemWidthControl from './GridItemWidthControl';
import FlexControls from './FlexControls';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

export default ( props ) => {
	const {
		setAttributes,
		attributes,
		deviceType,
	} = props;

	const {
		isGrid,
		useLegacyLayout,
		useGlobalContainerWidth,
	} = attributes;

	if ( useLegacyLayout ) {
		return null;
	}

	return (
		<>
			{ ! useGlobalContainerWidth &&
				<UnitControl
					{ ...props }
					label={ __( 'max-width', 'generateblocks' ) }
					id="gblocks-max-width"
					attributeName="maxWidth"
					device={ deviceType }
					min="1"
					units={ [ 'px', '%', 'vw', 'rem' ] }
				/>
			}

			<ToggleControl
				label={ __( 'Use Global Container Width', 'generateblocks' ) }
				checked={ !! useGlobalContainerWidth }
				onChange={ ( value ) => {
					setAttributes( {
						useGlobalContainerWidth: value,
					} );
				} }
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
