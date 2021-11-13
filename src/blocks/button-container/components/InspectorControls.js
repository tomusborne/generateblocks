import ResponsiveTabs from '../../../components/responsive-tabs';
import PanelArea from '../../../components/panel-area';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';
import { Fragment } from '@wordpress/element';
import DimensionsControl from '../../../components/dimensions';
import { ToggleControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { InspectorControls } from '@wordpress/block-editor';

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		deviceType,
		setDeviceType,
		state,
		blockDefaults,
	} = props;

	const {
		stack,
		stackTablet,
		stackMobile,
		fillHorizontalSpace,
		fillHorizontalSpaceTablet,
		fillHorizontalSpaceMobile,
	} = attributes;

	return (
		<InspectorControls>
			<ResponsiveTabs { ...props } selectedDevice={ deviceType } onClick={ setDeviceType } />

			<PanelArea
				{ ...props }
				title={ __( 'Spacing', 'generateblocks' ) }
				initialOpen={ true }
				icon={ getIcon( 'spacing' ) }
				className={ 'gblocks-panel-label' }
				id={ 'buttonContainerSpacing' }
				state={ state }
			>
				{ 'Desktop' === deviceType && (
					<Fragment>
						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'margin' }
							label={ __( 'Margin', 'generateblocks' ) }
							attrTop={ 'marginTop' }
							attrRight={ 'marginRight' }
							attrBottom={ 'marginBottom' }
							attrLeft={ 'marginLeft' }
							attrUnit={ 'marginUnit' }
							attrSyncUnits={ 'marginSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>

						<ToggleControl
							label={ __( 'Stack Vertically', 'generateblocks' ) }
							checked={ !! stack }
							onChange={ ( value ) => {
								setAttributes( {
									stack: value,
									stackTablet: !! value && ! stackTablet ? value : stackTablet,
									stackMobile: !! value && ! stackMobile ? value : stackMobile,
								} );
							} }
						/>

						<ToggleControl
							label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
							checked={ !! fillHorizontalSpace }
							onChange={ ( value ) => {
								setAttributes( {
									fillHorizontalSpace: value,
									fillHorizontalSpaceTablet: !! value && ! fillHorizontalSpaceTablet ? value : fillHorizontalSpaceTablet,
									fillHorizontalSpaceMobile: !! value && ! fillHorizontalSpaceMobile ? value : fillHorizontalSpaceMobile,
								} );
							} }
						/>
					</Fragment>
				) }

				{ 'Tablet' === deviceType && (
					<Fragment>
						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'margin' }
							label={ __( 'Margin', 'generateblocks' ) }
							attrTop={ 'marginTopTablet' }
							attrRight={ 'marginRightTablet' }
							attrBottom={ 'marginBottomTablet' }
							attrLeft={ 'marginLeftTablet' }
							attrUnit={ 'marginUnit' }
							attrSyncUnits={ 'marginSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>

						<ToggleControl
							label={ __( 'Stack Vertically', 'generateblocks' ) }
							checked={ !! stackTablet }
							onChange={ ( value ) => {
								setAttributes( {
									stackTablet: value,
									stackMobile: !! value && ! stackMobile ? value : stackMobile,
								} );
							} }
						/>

						<ToggleControl
							label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
							checked={ !! fillHorizontalSpaceTablet }
							onChange={ ( value ) => {
								setAttributes( {
									fillHorizontalSpaceTablet: value,
									fillHorizontalSpaceMobile: !! value && ! fillHorizontalSpaceMobile ? value : fillHorizontalSpaceMobile,
								} );
							} }
						/>
					</Fragment>
				) }

				{ 'Mobile' === deviceType && (
					<Fragment>
						<DimensionsControl
							{ ...props }
							device={ deviceType }
							type={ 'margin' }
							label={ __( 'Margin', 'generateblocks' ) }
							attrTop={ 'marginTopMobile' }
							attrRight={ 'marginRightMobile' }
							attrBottom={ 'marginBottomMobile' }
							attrLeft={ 'marginLeftMobile' }
							attrUnit={ 'marginUnit' }
							attrSyncUnits={ 'marginSyncUnits' }
							defaults={ blockDefaults }
							units={ [ 'px', 'em', '%' ] }
						/>

						<ToggleControl
							label={ __( 'Stack Vertically', 'generateblocks' ) }
							checked={ !! stackMobile }
							onChange={ ( value ) => {
								setAttributes( {
									stackMobile: value,
								} );
							} }
						/>

						<ToggleControl
							label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
							checked={ !! fillHorizontalSpaceMobile }
							onChange={ ( value ) => {
								setAttributes( {
									fillHorizontalSpaceMobile: value,
								} );
							} }
						/>
					</Fragment>
				) }

				{ applyFilters( 'generateblocks.editor.controls', '', 'buttonContainerSpacing', props, state ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Documentation', 'generateblocks' ) }
				icon={ getIcon( 'documentation' ) }
				initialOpen={ false }
				className={ 'gblocks-panel-label' }
				id={ 'buttonContainerDocumentation' }
				state={ state }
			>
				<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
				<a href="https://docs.generateblocks.com/collection/buttons/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>

				{ applyFilters( 'generateblocks.editor.controls', '', 'buttonContainerDocumentation', props, state ) }
			</PanelArea>
		</InspectorControls>
	);
};
