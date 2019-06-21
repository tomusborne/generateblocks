/**
 * Block: Buttons
 */

import classnames from 'classnames';
import range from 'lodash/range';
import ColorPicker from '../../components/color-picker';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	TextControl,
	Toolbar,
	PanelBody,
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
	BlockControls,
	AlignmentToolbar,
} = wp.blockEditor;

const ELEMENT_ID_REGEX = /[\s#]/g;

class GenerateText extends Component {
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
			size,
			lineHeight,
			marginTop,
			marginBottom,
			letterSpacing,
		} = attributes;

		const css = `
			.editor-styles-wrapper .gp-text-` + uniqueId + ` {
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
							label={ __( 'Element', 'gp-premium' ) }
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
							value={ align }
							onChange={ ( value ) => {
								setAttributes( { align: value } );
							} }
						/>

						<RangeControl
							label={ __( 'Font Size', 'gp-premium' ) }
							value={ size }
							onChange={ ( value ) => {
								setAttributes( {
									size: value
								} );
							} }
							min={ 5 }
							max={ 100 }
							step={ 1 }
							allowReset={ true }
						/>

						<RangeControl
							label={ __( 'Line Height', 'gp-premium' ) }
							value={ lineHeight }
							onChange={ ( value ) => {
								setAttributes( {
									lineHeight: value
								} );
							} }
							min={ 0 }
							max={ 5 }
							step={ 0.1 }
							allowReset={ true }
						/>

						<RangeControl
							label={ __( 'Letter Spacing', 'gp-premium' ) }
							value={ letterSpacing }
							onChange={ ( value ) => {
								setAttributes( {
									letterSpacing: value
								} );
							} }
							min={ 0 }
							max={ 5 }
							step={ 0.01 }
							allowReset={ true }
						/>

						<RangeControl
							label={ __( 'Margin Top', 'gp-premium' ) }
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
						/>

						<RangeControl
							label={ __( 'Margin Bottom', 'gp-premium' ) }
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
						/>

						<ColorPicker
							label={ __( 'Color', 'gp-premium' ) }
							value={ color }
							onChange={ ( value ) =>
								setAttributes( {
									color: value
								} )
							}
							alpha={ false }
						/>
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

				<RichText
					formattingControls={ [ 'bold', 'italic', 'link', 'underline', 'mark' ] }
					tagName={ element }
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'gp-text': true,
						[`gp-text-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
					placeholder={ __( 'Write text…' ) }
				/>
			</Fragment>
		);
	}
}

export default ( GenerateText );
