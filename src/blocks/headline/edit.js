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

class FlexBlockHeadline extends Component {
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
			textTransform,
			lineHeight,
			marginTop,
			marginBottom,
			letterSpacing,
		} = attributes;

		const css = `
			.editor-styles-wrapper .fx-headline-` + uniqueId + ` {
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

						<AlignmentToolbar
							value={ align }
							onChange={ ( value ) => {
								setAttributes( { align: value } );
							} }
						/>

						<RangeControl
							label={ __( 'Font Size', 'flex-blocks' ) }
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
							initialPosition={ flexBlocksDefaults.headline.size }
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
							label={ __( 'Line Height', 'flex-blocks' ) }
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
							initialPosition={ 1 }
						/>

						<RangeControl
							label={ __( 'Letter Spacing', 'flex-blocks' ) }
							value={ letterSpacing }
							onChange={ ( value ) => {
								setAttributes( {
									letterSpacing: value
								} );
							} }
							min={ -5 }
							max={ 5 }
							step={ 0.01 }
							allowReset={ true }
							initialPosition={ 1 }
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
					formattingControls={ [ 'bold', 'italic', 'link', 'underline', 'mark' ] }
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
