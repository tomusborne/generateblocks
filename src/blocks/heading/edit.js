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

class GenerateHeading extends Component {
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
			level,
			align,
			color,
			size,
		} = attributes;

		const css = `
			.editor-styles-wrapper .gp-heading-` + uniqueId + ` {
				text-align: ` + align + `;
				font-size: ` + size + `px;
				color: ` + color + `;
			}
		`

		const createLevelControl = ( targetLevel ) => {
			return [ {
				icon: 'heading',
				// translators: %s: heading level e.g: "1", "2", "3"
				title: sprintf( __( 'Heading %d' ), targetLevel ),
				isActive: targetLevel === level,
				onClick: () => setAttributes( { level: targetLevel } ),
				subscript: String( targetLevel ),
			} ];
		};

		const tagName = 'h' + level;

		return (
			<Fragment>

				<InspectorControls>
					<PanelBody>
						<Toolbar controls={ range( 1, 7 ).map( createLevelControl ) } />

						<AlignmentToolbar
							value={ align }
							onChange={ ( value ) => {
								setAttributes( { align: value } );
							} }
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
					tagName={ tagName }
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'gp-heading': true,
						[`gp-heading-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
					placeholder={ __( 'Write heading…' ) }
				/>
			</Fragment>
		);
	}
}

export default ( GenerateHeading );
