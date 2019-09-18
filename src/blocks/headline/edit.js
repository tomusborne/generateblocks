/**
 * Block: Headline
 */

import classnames from 'classnames';
import range from 'lodash/range';
import ColorPicker from '../../components/color-picker';
import TypographyControls from '../../components/typography';
import getIcon from '../../utils/get-icon';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	TextControl,
	Toolbar,
	PanelBody,
	RangeControl,
	SelectControl,
	BaseControl,
	TabPanel,
	DropdownMenu,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	RichText,
	BlockControls,
	AlignmentToolbar,
} = wp.blockEditor;

const ELEMENT_ID_REGEX = /[\s#]/g;
const fbHeadlineIds = [];

class FlexBlockHeadline extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {
		let id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbHeadlineIds.push( id );
		} else if ( fbHeadlineIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbHeadlineIds.push( id );
		} else {
			fbHeadlineIds.push( this.props.attributes.uniqueId );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			toggleSelection,
			instanceId
		} = this.props;

		const {
			uniqueId,
			elementId,
			cssClasses,
			content,
			element,
			alignment,
			alignmentTablet,
			alignmentMobile,
			backgroundColor,
			textColor,
			fontFamily,
			googleFont,
			fontWeight,
			fontSize,
			fontSizeTablet,
			fontSizeMobile,
			textTransform,
			lineHeight,
			lineHeightTablet,
			lineHeightMobile,
			marginTop,
			marginTopTablet,
			marginTopMobile,
			marginBottom,
			marginBottomTablet,
			marginBottomMobile,
			letterSpacing,
			letterSpacingTablet,
			letterSpacingMobile
		} = attributes;

		const css = `
			.editor-styles-wrapper .fx-headline-` + uniqueId + ` {
				font-family: ` + fontFamily + `;
				font-weight: ` + fontWeight + `;
				text-transform: ` + textTransform + `;
				text-align: ` + alignment + `;
				font-size: ` + fontSize + `px;
				background-color: ` + backgroundColor + `;
				color: ` + textColor + `;
				line-height: ` + lineHeight + `em;
				letter-spacing: ` + letterSpacing + `em;
				margin-top: ` + marginTop + `px;
				margin-bottom: ` + marginBottom + `px;
			}
		`

		return (
			<Fragment>

				<BlockControls>
					<Toolbar>
						<DropdownMenu
							icon={ getIcon( 'paragraph' ) }
							label={ __( 'Element' ) }
							controls={ [
								{
									title: 'paragraph',
									onClick: () => setAttributes( { element: 'p' } ),
								},
								{
									title: 'h1',
									onClick: () => setAttributes( { element: 'h1' } ),
								},
								{
									title: 'h2',
									onClick: () => setAttributes( { element: 'h2' } ),
								},
								{
									title: 'h3',
									onClick: () => setAttributes( { element: 'h3' } ),
								},
								{
									title: 'h4',
									onClick: () => setAttributes( { element: 'h4' } ),
								},
							] }
						/>
					</Toolbar>

					<AlignmentToolbar
						isCollapsed={ false }
						value={ alignment }
						onChange={ ( nextAlign ) => {
							setAttributes( { alignment: nextAlign } );
						} }
					/>
				</BlockControls>

				<InspectorControls>
					<PanelBody>
						<TabPanel className="headline-tab-panel flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'flexblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'flexblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'flexblocks' ),
									className: 'mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'default' === tab.name ? (
												<Fragment>
													<SelectControl
														label={ __( 'Element', 'flexblocks' ) }
														value={ element }
														options={ [
															{ label: 'p', value: 'p' },
															{ label: 'h1', value: 'h1' },
															{ label: 'h2', value: 'h2' },
															{ label: 'h3', value: 'h3' },
															{ label: 'h4', value: 'h4' },
															{ label: 'h5', value: 'h5' },
															{ label: 'h6', value: 'h6' },
														] }
														onChange={ ( element ) => { setAttributes( { element } ) } }
													/>

													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignment }
														onChange={ ( value ) => {
															setAttributes( { alignment: value } );
														} }
													/>

													<ColorPicker
														label={ __( 'Background Color', 'flexblocks' ) }
														value={ backgroundColor }
														onChange={ ( value ) =>
															setAttributes( {
																backgroundColor: value
															} )
														}
														alpha={ true }
													/>

													<ColorPicker
														label={ __( 'Color', 'flexblocks' ) }
														value={ textColor }
														onChange={ ( value ) =>
															setAttributes( {
																textColor: value
															} )
														}
														alpha={ false }
													/>

													<TypographyControls { ...this.props }
														valueFontFamily={ fontFamily }
														valueFontWeight={ fontWeight }
														valueGoogleFont={ googleFont }
														valueTextTransform={ textTransform }
														valueFontSize={ fontSize }
														valueLineHeight={ lineHeight }
														valueLetterSpacing={ letterSpacing }
														attrFontFamily={ 'fontFamily' }
														attrGoogleFont={ 'googleFont' }
														attrFontWeight={ 'fontWeight' }
														attrTextTransform={ 'textTransform' }
														attrFontSize={ 'fontSize' }
														attrLineHeight={ 'lineHeight' }
														attrLetterSpacing={ 'letterSpacing' }
														initialFontSize={ flexBlocksDefaults.headline.fontSize }
														initialLineHeight={ flexBlocksDefaults.headline.lineHeight }
														initialLetterSpacing={ flexBlocksDefaults.headline.letterSpacing }
														uniqueId={ uniqueId }
													/>

													<RangeControl
														label={ __( 'Margin Top', 'flexblocks' ) }
														value={ marginTop }
														onChange={ ( value ) => {
															setAttributes( {
																marginTop: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ 0 }
													/>

													<RangeControl
														label={ __( 'Margin Bottom', 'flexblocks' ) }
														value={ marginBottom }
														onChange={ ( value ) => {
															setAttributes( {
																marginBottom: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ flexBlocksDefaults.headline.marginBottom }
													/>
												</Fragment>
											) : '' }

											{ 'tablet' === tab.name ? (
												<Fragment>
													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignmentTablet }
														onChange={ ( value ) => {
															setAttributes( { alignmentTablet: value } );
														} }
													/>

													<TypographyControls { ...this.props }
														valueFontSize={ fontSizeTablet }
														valueLineHeight={ lineHeightTablet }
														valueLetterSpacing={ letterSpacingTablet }
														attrFontSize={ 'fontSizeTablet' }
														attrLineHeight={ 'lineHeightTablet' }
														attrLetterSpacing={ 'letterSpacingTablet' }
														initialFontSize={ flexBlocksDefaults.headline.fontSizeTablet }
														initialLineHeight={ flexBlocksDefaults.headline.lineHeightTablet }
														initialLetterSpacing={ flexBlocksDefaults.headline.letterSpacingTablet }
														uniqueId={ uniqueId }
													/>

													<RangeControl
														label={ __( 'Margin Top', 'flexblocks' ) }
														value={ marginTopTablet }
														onChange={ ( value ) => {
															setAttributes( {
																marginTopTablet: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ 0 }
													/>

													<RangeControl
														label={ __( 'Margin Bottom', 'flexblocks' ) }
														value={ marginBottomTablet }
														onChange={ ( value ) => {
															setAttributes( {
																marginBottomTablet: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ flexBlocksDefaults.headline.marginBottomTablet }
													/>
												</Fragment>
											) : '' }

											{ 'mobile' === tab.name ? (
												<Fragment>
													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignmentMobile }
														onChange={ ( value ) => {
															setAttributes( { alignmentMobile: value } );
														} }
													/>

													<TypographyControls { ...this.props }
														valueFontSize={ fontSizeMobile }
														valueLineHeight={ lineHeightMobile }
														valueLetterSpacing={ letterSpacingMobile }
														attrFontSize={ 'fontSizeMobile' }
														attrLineHeight={ 'lineHeightMobile' }
														attrLetterSpacing={ 'letterSpacingMobile' }
														initialFontSize={ flexBlocksDefaults.headline.fontSizeMobile }
														initialLineHeight={ flexBlocksDefaults.headline.lineHeightMobile }
														initialLetterSpacing={ flexBlocksDefaults.headline.letterSpacingMobile }
														uniqueId={ uniqueId }
													/>

													<RangeControl
														label={ __( 'Margin Top', 'flexblocks' ) }
														value={ marginTopMobile }
														onChange={ ( value ) => {
															setAttributes( {
																marginTopMobile: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ 0 }
													/>

													<RangeControl
														label={ __( 'Margin Bottom', 'flexblocks' ) }
														value={ marginBottomMobile }
														onChange={ ( value ) => {
															setAttributes( {
																marginBottomMobile: value
															} );
														} }
														min={ 0 }
														max={ 100 }
														step={ 1 }
														allowReset={ true }
														initialPosition={ flexBlocksDefaults.headline.marginBottomMobile }
													/>
												</Fragment>
											) : '' }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'Element ID', 'flexblocks' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'flexblocks' ) }
						value={ cssClasses }
						onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
					/>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<RichText
					allowedFormats={ [ 'core/bold', 'core/italic', 'core/link', 'core/underline', 'core/mark' ] }
					tagName={ element }
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'fx-headline': true,
						[`fx-headline-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
					placeholder={ __( 'Write headline…' ) }
				/>
			</Fragment>
		);
	}
}

export default ( FlexBlockHeadline );
