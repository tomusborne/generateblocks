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
	SelectControl,
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

class FlexBlockButton extends Component {
	componentDidMount() {
		if ( ! this.props.attributes.uniqueId ) {
			var instanceId = this.props.instanceId + 1;

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
			fontSize,
			textTransform,
			gap,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingSyncUnits,
			borderSizeTop,
			borderSizeRight,
			borderSizeBottom,
			borderSizeLeft,
			borderSizeSyncUnits,
			borderRadiusTopRight,
			borderRadiusBottomRight,
			borderRadiusBottomLeft,
			borderRadiusTopLeft,
			borderRadiusSyncUnits,
			borderColor,
			borderColorHover,
		} = attributes;

		var fontSizeValue = '',
			borderStyleValue = '';

		if ( fontSize ) {
			fontSizeValue = fontSize + 'em';
		}

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			borderStyleValue = 'solid';
		}

		const css = `
			.editor-block-list__block a.fx-button-` + uniqueId + ` {
				background-color: ` + backgroundColor + `;
				color: ` + textColor + `;
				padding-top: ` + paddingTop + `px;
				padding-right: ` + paddingRight + `px;
				padding-bottom: ` + paddingBottom + `px;
				padding-left: ` + paddingLeft + `px;
				border-top-right-radius: ` + borderRadiusTopRight + `px;
				border-bottom-right-radius: ` + borderRadiusBottomRight + `px;
				border-bottom-left-radius: ` + borderRadiusBottomLeft + `px;
				border-top-left-radius: ` + borderRadiusTopLeft + `px;
				font-size: ` + fontSizeValue + `;
				border-width: 0;
				border-top-width: ` + borderSizeTop + `px;
				border-right-width: ` + borderSizeRight + `px;
				border-bottom-width: ` + borderSizeBottom + `px;
				border-left-width: ` + borderSizeLeft + `px;
				border-style: ` + borderStyleValue + `;
				border-color: ` + borderColor + `;
				text-transform: ` + textTransform + `;
			}

			.editor-block-list__block a.fx-button-` + uniqueId + `:hover,
			.editor-block-list__block a.fx-button-` + uniqueId + `:focus,
			.editor-block-list__block a.fx-button-` + uniqueId + `:active {
				background-color: ` + backgroundColorHover + `;
				color: ` + textColorHover + `;
				border-color: ` + borderColorHover + `;
			}
		`

		$( '.fx-button' ).on( 'click', function( e ) {
			e.preventDefault();
		} );

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody>
						<TabPanel className="grid-tab-panel flex-blocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'grid-default',
									title: __( 'Default', 'flex-blocks' ),
									className: 'grid-default',
								},
								{
									name: 'grid-tablet',
									title: __( 'Tablet', 'flex-blocks' ),
									className: 'grid-tablet',
								},
								{
									name: 'grid-mobile',
									title: __( 'Mobile', 'flex-blocks' ),
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
														label={ __( 'Font Size', 'flex-blocks' ) }
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
														initialPosition={ flexBlocksDefaults.button.fontSize }
													/>

													<SelectControl
														label={ __( 'Text Transform', 'flex-blocks' ) }
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
														label={ __( 'Gap', 'flex-blocks' ) }
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
														initialPosition={ flexBlocksDefaults.button.gap }
													/>

													<BaseControl label={ __( 'Padding', 'flex-blocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Padding', 'flex-blocks' ) }
															valueTop={ paddingTop }
															valueRight={ paddingRight }
															valueBottom={ paddingBottom }
															valueLeft={ paddingLeft }
															//unit={ paddingUnit }
															syncUnits={ paddingSyncUnits }
															attrTop={ 'paddingTop' }
															attrRight={ 'paddingRight' }
															attrBottom={ 'paddingBottom' }
															attrLeft={ 'paddingLeft' }
															attrSyncUnits={ 'paddingSyncUnits' }
														/>
													</BaseControl>

													<BaseControl label={ __( 'Border Size', 'flex-blocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Border Size', 'flex-blocks' ) }
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

													<BaseControl label={ __( 'Border Radius', 'flex-blocks' ) }>
														<DimensionsControl { ...this.props }
															type={ 'padding' }
															label={ __( 'Border Radius', 'flex-blocks' ) }
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
						title={ __( 'Colors', 'flex-blocks' ) }
						initialOpen={ false }
						>

						<TabPanel className="layout-tab-panel flex-blocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'button-colors',
									title: __( 'Normal', 'flex-blocks' ),
									className: 'button-colors',
								},
								{
									name: 'button-colors-hover',
									title: __( 'Hover', 'flex-blocks' ),
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
														label={ __( 'Background Color', 'flex-blocks' ) }
														value={ backgroundColor }
														onChange={ ( nextBackgroundColor ) =>
															setAttributes( {
																backgroundColor: nextBackgroundColor
															} )
														}
														alpha={ true }
													/>

													<ColorPicker
														label={ __( 'Text Color', 'flex-blocks' ) }
														value={ textColor }
														onChange={ ( nextTextColor ) =>
															setAttributes( {
																textColor: nextTextColor
															} )
														}
														alpha={ false }
													/>

													<ColorPicker
														label={ __( 'Border Color', 'flex-blocks' ) }
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
														label={ __( 'Background Color', 'flex-blocks' ) }
														value={ backgroundColorHover }
														onChange={ ( nextBackgroundColorHover ) =>
															setAttributes( {
																backgroundColorHover: nextBackgroundColorHover
															} )
														}
														alpha={ true }
													/>

													<ColorPicker
														label={ __( 'Text Color', 'flex-blocks' ) }
														value={ textColorHover }
														onChange={ ( nextTextColorHover ) =>
															setAttributes( {
																textColorHover: nextTextColorHover
															} )
														}
														alpha={ false }
													/>

													<ColorPicker
														label={ __( 'Border Color', 'flex-blocks' ) }
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
						label={ __( 'Element ID', 'flex-blocks' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'flex-blocks' ) }
						value={ cssClasses }
						onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
					/>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<a
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'fx-button': true,
						[`fx-button-${ uniqueId }`]: true,
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
                        className="fx-component-url-input-float"
                    />
                ) : '' }
			</Fragment>
		);
	}
}

export default ( FlexBlockButton );
