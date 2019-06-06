/**
 * Block: Buttons
 */

import classnames from 'classnames';
import ColorPicker from '../../components/color-picker';
import URLInput from '../../components/url-input';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	PanelBody,
	TabPanel,
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
} = wp.editor;

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
		} = attributes;

		var borderRadiusValue = '',
			fontSizeValue = '',
			gapValue = '';

		if ( borderRadius ) {
			borderRadiusValue = borderRadius + 'px';
		}

		if ( fontSize ) {
			fontSizeValue = fontSize + 'em';
		}

		const css = `
			.editor-block-list__block a.gp-button-` + uniqueId + ` {
				background-color: ` + backgroundColor + `;
				color: ` + textColor + `;
			}

			.editor-block-list__block a.gp-button-` + uniqueId + `:hover,
			.editor-block-list__block a.gp-button-` + uniqueId + `:focus,
			.editor-block-list__block a.gp-button-` + uniqueId + `:active {
				background-color: ` + backgroundColorHover + `;
				color: ` + textColorHover + `;
			}

			a.gp-button-` + uniqueId + ` {
				border-radius: ` + borderRadiusValue + `;
				font-size: ` + fontSizeValue + `;
			}
		`

		$( '.gp-button' ).on( 'click', function( e ) {
			e.preventDefault();
		} );

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody>
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
						/>

						<RangeControl
							label={ __( 'Border Radius', 'gp-premium' ) }
							value={ borderRadius }
							onChange={ ( nextBorderRadius ) => {
								setAttributes( {
									borderRadius: nextBorderRadius
								} );
							} }
							min={ 0 }
							max={ 50 }
							step={ 1 }
							initialPosition={ 0 }
						/>
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
														alpha={ false }
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
														alpha={ false }
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
