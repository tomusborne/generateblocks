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
		useInnerContainer,
		useGlobalContainerWidth,
	} = attributes;

	if ( useInnerContainer ) {
		return null;
	}

	return (
		<>
			<UnitControl
				{ ...props }
				label={ __( 'Maximum Width', 'generateblocks' ) }
				id="gblocks-max-width"
				attributeName="maxWidth"
				device={ deviceType }
				min="1"
				units={ [ 'px', '%', 'vw', 'rem' ] }
				overrideValue={ !! useGlobalContainerWidth ? generateBlocksInfo.globalContainerWidth : null }
				disabled={ !! useGlobalContainerWidth }
			/>

			<ToggleControl
				label={ __( 'Use Global Container Width', 'generateblocks' ) }
				className={ 'gblocks-global-container-width' }
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
