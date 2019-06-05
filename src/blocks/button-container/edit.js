/**
 * Block: Buttons
 */

import classnames from 'classnames';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	TextControl
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
} = wp.editor;

const ELEMENT_ID_REGEX = /[\s#]/g;

class GenerateButtonContainer extends Component {
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
			count,
			uniqueId,
			elementId,
			cssClasses,
		} = attributes;

		return (
			<Fragment>

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

				<div
					id={ !! elementId ? elementId : false }
					className={ classnames( {
						'gp-button-wrapper': true,
						[`gp-button-wrapper-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
				>
					<InnerBlocks
						template={ [ [ 'generatepress/button' ] ] }
						allowedBlocks={ [ 'generatepress/button' ] }
					/>
				</div>
			</Fragment>
		);
	}
}

export default ( GenerateButtonContainer );
