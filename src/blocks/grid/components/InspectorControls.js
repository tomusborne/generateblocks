import ResponsiveTabs from '../../../components/responsive-tabs';
import PanelArea from '../../../components/panel-area';
import { Fragment } from '@wordpress/element';
import UnitPicker from '../../../components/unit-picker';
import { __ } from '@wordpress/i18n';
import { Button, SelectControl, TextControl } from '@wordpress/components';
import hasNumericValue from '../../../utils/has-numeric-value';
import getResponsivePlaceholder from '../../../utils/get-responsive-placeholder';
import { applyFilters } from '@wordpress/hooks';
import getIcon from '../../../utils/get-icon';
import { InspectorControls } from '@wordpress/block-editor';

export default ( props ) => {
	const {
		attributes,
		state,
		deviceType,
		setDeviceType,
		setAttributes,
		blockDefaults,
	} = props;
	const {
		horizontalGap,
		verticalGap,
		verticalAlignment,
		horizontalGapTablet,
		verticalGapTablet,
		verticalAlignmentTablet,
		horizontalGapMobile,
		verticalGapMobile,
		verticalAlignmentMobile,
		horizontalAlignment,
		horizontalAlignmentTablet,
		horizontalAlignmentMobile,
	} = attributes;

	return (
		<InspectorControls>
			<ResponsiveTabs
				{ ...props }
				selectedDevice={ deviceType }
				onClick={ setDeviceType }
			/>

			<PanelArea
				{ ...props }
				id={ 'gridLayout' }
				state={ state }
			>
				{ 'Desktop' === deviceType && (
					<Fragment>
						<UnitPicker
							label={ __( 'Horizontal Gap', 'generateblocks' ) }
							value={ 'px' }
							units={ [ 'px' ] }
							onClick={ () => {
								return false;
							} }
						/>

						<div className="components-base-control components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ hasNumericValue( horizontalGap ) ? horizontalGap : '' }
								min="0"
								onChange={ ( value ) => {
									// No hyphens allowed here.
									value = value.toString().replace( /-/g, '' );

									setAttributes( {
										horizontalGap: value,
									} );
								} }
								onBlur={ () => {
									if ( '' !== horizontalGap ) {
										setAttributes( {
											horizontalGap: parseFloat( horizontalGap ),
										} );
									}
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									setAttributes( {
										horizontalGap: blockDefaults.horizontalGap,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>

						<UnitPicker
							label={ __( 'Vertical Gap', 'generateblocks' ) }
							value={ 'px' }
							units={ [ 'px' ] }
							onClick={ () => {
								return false;
							} }
						/>

						<div className="components-base-control components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ hasNumericValue( verticalGap ) ? verticalGap : '' }
								min="0"
								onChange={ ( value ) => {
									// No negative values allowed here.
									value = value.toString().replace( /-/g, '' );

									setAttributes( {
										verticalGap: value,
									} );
								} }
								onBlur={ () => {
									if ( '' !== verticalGap ) {
										setAttributes( {
											verticalGap: parseFloat( verticalGap ),
										} );
									}
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									setAttributes( {
										verticalGap: blockDefaults.verticalGap,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>

						<SelectControl
							label={ __( 'Vertical Alignment', 'generateblocks' ) }
							value={ verticalAlignment }
							help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks' ) }
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									verticalAlignment: value,
								} );
							} }
						/>

						<SelectControl
							label={ __( 'Horizontal Alignment', 'generateblocks' ) }
							value={ horizontalAlignment }
							options={ [
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Left', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Right', 'generateblocks' ), value: 'flex-end' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									horizontalAlignment: value,
								} );
							} }
						/>
					</Fragment>
				) }

				{ 'Tablet' === deviceType && (
					<Fragment>
						<UnitPicker
							label={ __( 'Horizontal Gap', 'generateblocks' ) }
							value={ 'px' }
							units={ [ 'px' ] }
							onClick={ () => {
								return false;
							} }
						/>

						<div className="components-base-control components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ hasNumericValue( horizontalGapTablet ) ? horizontalGapTablet : '' }
								min="0"
								placeholder={ getResponsivePlaceholder( 'horizontalGap', attributes, 'Tablet', '' ) }
								onChange={ ( value ) => {
									// No negative values allowed here.
									value = value.toString().replace( /-/g, '' );

									setAttributes( {
										horizontalGapTablet: value,
									} );
								} }
								onBlur={ () => {
									if ( '' !== horizontalGapTablet ) {
										setAttributes( {
											horizontalGapTablet: parseFloat( horizontalGapTablet ),
										} );
									}
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									setAttributes( {
										horizontalGapTablet: blockDefaults.horizontalGapTablet,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>

						<UnitPicker
							label={ __( 'Vertical Gap', 'generateblocks' ) }
							value={ 'px' }
							units={ [ 'px' ] }
							onClick={ () => {
								return false;
							} }
						/>

						<div className="components-base-control components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ hasNumericValue( verticalGapTablet ) ? verticalGapTablet : '' }
								min="0"
								placeholder={ getResponsivePlaceholder( 'verticalGap', attributes, 'Tablet', '' ) }
								onChange={ ( value ) => {
									// No negative values allowed here.
									value = value.toString().replace( /-/g, '' );

									setAttributes( {
										verticalGapTablet: value,
									} );
								} }
								onBlur={ () => {
									if ( '' !== verticalGapTablet ) {
										setAttributes( {
											verticalGapTablet: parseFloat( verticalGapTablet ),
										} );
									}
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									setAttributes( {
										verticalGapTablet: blockDefaults.verticalGapTablet,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>

						<SelectControl
							label={ __( 'Vertical Alignment', 'generateblocks' ) }
							help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks' ) }
							value={ verticalAlignmentTablet }
							options={ [
								{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									verticalAlignmentTablet: value,
								} );
							} }
						/>

						<SelectControl
							label={ __( 'Horizontal Alignment', 'generateblocks' ) }
							value={ horizontalAlignmentTablet }
							options={ [
								{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Left', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Right', 'generateblocks' ), value: 'flex-end' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									horizontalAlignmentTablet: value,
								} );
							} }
						/>
					</Fragment>
				) }

				{ 'Mobile' === deviceType && (
					<Fragment>
						<UnitPicker
							label={ __( 'Horizontal Gap', 'generateblocks' ) }
							value={ 'px' }
							units={ [ 'px' ] }
							onClick={ () => {
								return false;
							} }
						/>

						<div className="components-base-control components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ hasNumericValue( horizontalGapMobile ) ? horizontalGapMobile : '' }
								min="0"
								placeholder={ getResponsivePlaceholder( 'horizontalGap', attributes, 'Mobile', '' ) }
								onChange={ ( value ) => {
									// No negative values allowed here.
									value = value.toString().replace( /-/g, '' );

									setAttributes( {
										horizontalGapMobile: value,
									} );
								} }
								onBlur={ () => {
									if ( '' !== horizontalGapMobile ) {
										setAttributes( {
											horizontalGapMobile: parseFloat( horizontalGapMobile ),
										} );
									}
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									setAttributes( {
										horizontalGapMobile: blockDefaults.horizontalGapMobile,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>

						<UnitPicker
							label={ __( 'Vertical Gap', 'generateblocks' ) }
							value={ 'px' }
							units={ [ 'px' ] }
							onClick={ () => {
								return false;
							} }
						/>

						<div className="components-base-control components-gblocks-typography-control__inputs">
							<TextControl
								type={ 'number' }
								value={ hasNumericValue( verticalGapMobile ) ? verticalGapMobile : '' }
								min="0"
								placeholder={ getResponsivePlaceholder( 'verticalGap', attributes, 'Mobile', '' ) }
								onChange={ ( value ) => {
									// No negative values allowed here.
									value = value.toString().replace( /-/g, '' );

									setAttributes( {
										verticalGapMobile: value,
									} );
								} }
								onBlur={ () => {
									if ( '' !== verticalGapMobile ) {
										setAttributes( {
											verticalGapMobile: parseFloat( verticalGapMobile ),
										} );
									}
								} }
								onClick={ ( e ) => {
									// Make sure onBlur fires in Firefox.
									e.currentTarget.focus();
								} }
							/>

							<Button
								isSmall
								isSecondary
								className="components-gblocks-default-number"
								onClick={ () => {
									setAttributes( {
										verticalGapMobile: blockDefaults.verticalGapMobile,
									} );
								} }
							>
								{ __( 'Reset', 'generateblocks' ) }
							</Button>
						</div>

						<SelectControl
							label={ __( 'Vertical Alignment', 'generateblocks' ) }
							help={ __( 'Align grid items. Removes same height columns and overrides grid item content alignment.', 'generateblocks' ) }
							value={ verticalAlignmentMobile }
							options={ [
								{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Top', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Bottom', 'generateblocks' ), value: 'flex-end' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									verticalAlignmentMobile: value,
								} );
							} }
						/>

						<SelectControl
							label={ __( 'Horizontal Alignment', 'generateblocks' ) }
							value={ horizontalAlignmentMobile }
							options={ [
								{ label: __( 'Inherit', 'generateblocks' ), value: 'inherit' },
								{ label: __( 'Default', 'generateblocks' ), value: '' },
								{ label: __( 'Left', 'generateblocks' ), value: 'flex-start' },
								{ label: __( 'Center', 'generateblocks' ), value: 'center' },
								{ label: __( 'Right', 'generateblocks' ), value: 'flex-end' },
							] }
							onChange={ ( value ) => {
								setAttributes( {
									horizontalAlignmentMobile: value,
								} );
							} }
						/>
					</Fragment>
				) }

				{ applyFilters( 'generateblocks.editor.controls', '', 'gridLayout', props, state ) }
			</PanelArea>

			<PanelArea
				{ ...props }
				title={ __( 'Documentation', 'generateblocks' ) }
				icon={ getIcon( 'documentation' ) }
				initialOpen={ false }
				className={ 'gblocks-panel-label' }
				id={ 'gridDocumentation' }
				state={ state }
			>
				<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
				<a href="https://docs.generateblocks.com/collection/grid/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>

				{ applyFilters( 'generateblocks.editor.controls', '', 'gridDocumentation', props, state ) }
			</PanelArea>
		</InspectorControls>
	);
};
