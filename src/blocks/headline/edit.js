/**
 * Block: Buttons
 */

import classnames from 'classnames';
import range from 'lodash/range';
import ColorPicker from '../../components/color-picker';
import TypographyControls from '../../components/typography';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	TextControl,
	Toolbar,
	PanelBody,
	RangeControl,
	SelectControl,
	BaseControl,
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
			align,
			color,
			fontFamily,
			googleFont,
			fontWeight,
			size,
			textTransform,
			lineHeight,
			marginTop,
			marginBottom,
			letterSpacing,
		} = attributes;

		const css = `
			.editor-styles-wrapper .fx-headline-` + uniqueId + ` {
				font-family: ` + fontFamily + `;
				font-weight: ` + fontWeight + `;
				text-transform: ` + textTransform + `;
				text-align: ` + align + `;
				font-size: ` + size + `px;
				color: ` + color + `;
				line-height: ` + lineHeight + `em;
				letter-spacing: ` + letterSpacing + `em;
				margin-top: ` + marginTop + `px;
				margin-bottom: ` + marginBottom + `px;
			}
		`

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody>
						<SelectControl
							label={ __( 'Element', 'flex-blocks' ) }
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

						<ColorPicker
							label={ __( 'Color', 'flex-blocks' ) }
							value={ color }
							onChange={ ( value ) =>
								setAttributes( {
									color: value
								} )
							}
							alpha={ false }
						/>

						<AlignmentToolbar
							isCollapsed={ false }
							value={ align }
							onChange={ ( value ) => {
								setAttributes( { align: value } );
							} }
						/>

						<TypographyControls { ...this.props }
							valueFontFamily={ fontFamily }
							valueFontWeight={ fontWeight }
							valueGoogleFont={ googleFont }
							valueTextTransform={ textTransform }
							valueFontSize={ size }
							valueLineHeight={ lineHeight }
							valueLetterSpacing={ letterSpacing }
							attrFontFamily={ 'fontFamily' }
							attrGoogleFont={ 'googleFont' }
							attrFontWeight={ 'fontWeight' }
							attrTextTransform={ 'textTransform' }
							attrFontSize={ 'size' }
							attrLineHeight={ 'lineHeight' }
							attrLetterSpacing={ 'letterSpacing' }
							initialFontSize={ flexBlocksDefaults.headline.size }
							initialLineHeight={ flexBlocksDefaults.headline.lineHeight }
							initialLetterSpacing={ flexBlocksDefaults.headline.letterSpacing }
							uniqueId={ uniqueId }
						/>

						<RangeControl
							label={ __( 'Margin Top', 'flex-blocks' ) }
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
							label={ __( 'Margin Bottom', 'flex-blocks' ) }
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
