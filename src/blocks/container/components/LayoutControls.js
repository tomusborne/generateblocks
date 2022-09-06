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
		useInnerContainer,
	} = attributes;

	if ( useLegacyLayout ) {
		return null;
	}

	return (
		<>
			<UnitControl
				{ ...props }
				label={ ! useInnerContainer
					? __( 'max-width', 'generateblocks' )
					: __( 'Outer max-width', 'generateblocks' )
				}
				id="gblocks-max-width"
				attributeName="maxWidth"
				device={ deviceType }
				min="1"
				units={ [ 'px', '%', 'vw', 'rem' ] }
			/>

			{ !! useInnerContainer &&
				<UnitControl
					{ ...props }
					label={ __( 'Inner max-width', 'generateblocks' ) }
					id="gblocks-inner-max-width"
					attributeName="innerMaxWidth"
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
