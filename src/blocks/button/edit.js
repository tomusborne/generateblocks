/**
 * Block: Buttons
 */

import classnames from 'classnames';
import ColorPicker from '../../components/color-picker';
import URLInput from '../../components/url-input';
import DimensionsControl from '../../components/dimensions/';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	PanelBody,
	TabPanel,
	BaseControl,
	TextControl,
	RangeControl,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	RichText,
} = wp.blockEditor;

const ELEMENT_ID_REGEX = /[\s#]/g;

class GenerateButton extends Component {
	componentDidMount() {
		var instanceId = this.props.instanceId + 1;

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: instanceId,
			} );
		} else if ( this.props.attributes.uniqueId && this.props.attributes.uniqueId !== instanceId ) {
			this.props.setAttributes( {
				uniqueId: instanceId,
			} );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			toggleSelection,
			instanceId,
			isSelected,
		} = this.props;

		const {
			count,
			uniqueId,
			elementId,
			cssClasses,
			text,
			url,
			target,
			rel,
			backgroundColor,
			textColor,
			backgroundColorHover,
			textColorHover,
			borderRadius,
			fontSize,
			gap,
			borderSizeTop,
			borderSizeRight,
			borderSizeBottom,
			borderSizeLeft,
			borderSizeSyncUnits,
			borderColor,
			borderColorHover,
		} = attributes;

		var borderRadiusValue = '',
			fontSizeValue = '',
			gapValue = '',
			borderValue = '',
			borderHoverValue = '';

		if ( borderRadius ) {
			borderRadiusValue = borderRadius + 'px';
		}

		if ( fontSize ) {
			fontSizeValue = fontSize + 'em';
		}

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			borderStyleValue = 'solid';
		}

		const css = `
			.editor-block-list__block a.gp-button-` + uniqueId + ` {
				background-color: ` + backgroundColor + `;
				color: ` + textColor + `;
				border-radius: ` + borderRadiusValue + `;
				font-size: ` + fontSizeValue + `;
				border-width: 0;
				border-top-width: ` + borderSizeTop + `px;
				border-right-width: ` + borderSizeRight + `px;
				border-bottom-width: ` + borderSizeBottom + `px;
				border-left-width: ` + borderSizeLeft + `px;
				border-style: ` + borderStyleValue + `;
				border-color: ` + borderColor + `;
			}

			.editor-block-list__block a.gp-button-` + uniqueId + `:hover,
			.editor-block-list__block a.gp-button-` + uniqueId + `:focus,
			.editor-block-list__block a.gp-button-` + uniqueId + `:active {
				background-color: ` + backgroundColorHover + `;
				color: ` + textColorHover + `;
				border-color: ` + borderHoverValue + `;
			}
		`

		$( '.gp-button' ).on( 'click', function( e ) {
			e.preventDefault();
		} );

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody>
						<TabPanel className="grid-tab-panel generatepress-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'grid-default',
									title: __( 'Default', 'gp-premium' ),
									className: 'grid-default',
								},
								{
									name: 'grid-tablet',
									title: __( 'Tablet', 'gp-premium' ),
									className: 'grid-tablet',
								},
								{
									name: 'grid-mobile',
									title: __( 'Mobile', 'gp-premium' ),
									className: 'grid-mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'grid-default' === tab.name ? (
												<Fragment>
													<RangeControl
														label={ __( 'Font Size', 'gp-premium' ) }
														value={ fontSize }
														onChange={ ( value ) => {
															setAttributes( {
																fontSize: value
															} );
														} }
														min={ 0.3 }
														max={ 3 }
														step={ 0.1 }
														allowReset={ true }
														initialPosition={ generatepressDefaults.button.fontSize }
													/>

													<SelectControl
														label={ __( 'Text Transform', 'gp-premium' ) }
														value={ textTransform }
														options={ [
															{ label: 'none', value: '' },
															{ label: 'uppercase', value: 'uppercase' },
															{ label: 'lowercase', value: 'lowercase' },
															{ label: 'capitalize', value: 'capitalize' },
														] }
														onChange={ ( textTransform ) => { setAttributes( { textTransform } ) } }
													/>

													<RangeControl
														label={ __( 'Gap', 'gp-premium' ) }
														value={ gap }
														onChange={ ( value ) => {
															setAttributes( {
																gap: value
															} );
														} }
														min={ 0 }
														max={ 50 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ generatepressDefaults.button.gap }
													/>

													<BaseControl label={ __( 'Border Radius', 'gp-premium' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Border Radius', 'gp-premium' ) }
															valueTop={ borderRadiusTopRight }
															valueRight={ borderRadiusBottomRight }
															valueBottom={ borderRadiusBottomLeft }
															valueLeft={ borderRadiusTopLeft }
															//unit={ paddingUnit }
															syncUnits={ borderRadiusSyncUnits }
															attrTop={ 'borderRadiusTopRight' }
															attrRight={ 'borderRadiusBottomRight' }
															attrBottom={ 'borderRadiusBottomLeft' }
															attrLeft={ 'borderRadiusTopLeft' }
															attrSyncUnits={ 'borderRadiusSyncUnits' }
															labelTop={ __( 'T-Right', 'flex-blocks' ) }
															labelRight={ __( 'B-Right', 'flex-blocks' ) }
															labelBottom={ __( 'B-Left', 'flex-blocks' ) }
															labelLeft={ __( 'T-Left', 'flex-blocks' ) }
														/>
													</BaseControl>

													<BaseControl label={ __( 'Border Size', 'gp-premium' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Border Size', 'gp-premium' ) }
															valueTop={ borderSizeTop }
															valueRight={ borderSizeRight }
															valueBottom={ borderSizeBottom }
															valueLeft={ borderSizeLeft }
															//unit={ paddingUnit }
															syncUnits={ borderSizeSyncUnits }
															attrTop={ 'borderSizeTop' }
															attrRight={ 'borderSizeRight' }
															attrBottom={ 'borderSizeBottom' }
															attrLeft={ 'borderSizeLeft' }
															attrSyncUnits={ 'borderSizeSyncUnits' }
														/>
													</BaseControl>
												</Fragment>
											) : '' }

											{ 'grid-tablet' === tab.name ? (
												<Fragment>

												</Fragment>
											) : '' }

											{ 'grid-mobile' === tab.name ? (
												<Fragment>

												</Fragment>
											) : '' }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody
						title={ __( 'Colors', 'gp-premium' ) }
						initialOpen={ false }
						>

						<TabPanel className="layout-tab-panel generatepress-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'button-colors',
									title: __( 'Normal', 'gp-premium' ),
									className: 'button-colors',
								},
								{
									name: 'button-colors-hover',
									title: __( 'Hover', 'gp-premium' ),
									className: 'button-colors-hover',
								},
							] }>
							{
								( tab ) => {
									const isNormal = tab.name === 'button-colors';

									return (
										<div>
											{ isNormal ? (
												<Fragment>
													<ColorPicker
														label={ __( 'Background Color', 'gp-premium' ) }
														value={ backgroundColor }
														onChange={ ( nextBackgroundColor ) =>
															setAttributes( {
																backgroundColor: nextBackgroundColor
															} )
														}
														alpha={ true }
													/>

													<ColorPicker
														label={ __( 'Text Color', 'gp-premium' ) }
														value={ textColor }
														onChange={ ( nextTextColor ) =>
															setAttributes( {
																textColor: nextTextColor
															} )
														}
														alpha={ false }
													/>

													<ColorPicker
														label={ __( 'Border Color', 'gp-premium' ) }
														value={ borderColor }
														onChange={ ( value ) =>
															setAttributes( {
																borderColor: value
															} )
														}
														alpha={ false }
													/>
												</Fragment>

											) : (

												<Fragment>
													<ColorPicker
														label={ __( 'Background Color', 'gp-premium' ) }
														value={ backgroundColorHover }
														onChange={ ( nextBackgroundColorHover ) =>
															setAttributes( {
																backgroundColorHover: nextBackgroundColorHover
															} )
														}
														alpha={ true }
													/>

													<ColorPicker
														label={ __( 'Text Color', 'gp-premium' ) }
														value={ textColorHover }
														onChange={ ( nextTextColorHover ) =>
															setAttributes( {
																textColorHover: nextTextColorHover
															} )
														}
														alpha={ false }
													/>

													<ColorPicker
														label={ __( 'Border Color', 'gp-premium' ) }
														value={ borderColorHover }
														onChange={ ( value ) =>
															setAttributes( {
																borderColorHover: value
															} )
														}
														alpha={ false }
													/>
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>

					</PanelBody>
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'Element ID', 'gp-premium' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'gp-premium' ) }
						value={ cssClasses }
						onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
					/>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<a
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'gp-button': true,
						[`gp-button-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
					href={ !! url ? url : undefined }
					target={ !! target ? target : undefined }
					rel={ !! rel ? rel : undefined }
				>
					<span className={ 'button-text' }>
						<RichText
							placeholder={ __( 'Add text…' ) }
							value={ text }
							onChange={ ( value ) => setAttributes( { text: value } ) }
							formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
							isSelected={ isSelected }
							keepPlaceholderOnFocus
						/>
					</span>
				</a>
				{ isSelected ? (
                    <URLInput
                        url={ url }
                        target={ target }
                        rel={ rel }
                        onChange={ ( data ) => {
                            setAttributes( data );
                        } }
                        autoFocus={ false }
                        className="generatepress-component-url-input-float"
                    />
                ) : '' }
			</Fragment>
		);
	}
}

export default ( GenerateButton );
