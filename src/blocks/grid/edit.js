/**
 * Block: Buttons
 */

import classnames from 'classnames';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	PanelBody,
	TabPanel,
	TextControl,
	RangeControl,
	Tooltip,
	Icon,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	RichText,
} = wp.editor;

const ELEMENT_ID_REGEX = /[\s#]/g;

class GenerateGrid extends Component {
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
			hasChildBlocks,
			clientId,
		} = this.props;

		const {
			uniqueId,
			elementId,
			cssClasses,
			width,
		} = attributes;

		const css = `
			#block-` + clientId + ` {
				width: ` + width + `%;
			}
		`

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<RangeControl
							label={ __( 'Width', 'gp-premium' ) }
							value={ width }
							onChange={ ( value ) => {
								setAttributes( {
									width: value
								} );
							} }
							min={ 5 }
							max={ 100 }
							step={ 5 }
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

				<div
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'gp-grid': true,
						[`gp-grid-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
				>
					{ ! isSelected ? (
						<div className="gp-column-button-select">
							<Tooltip text={ __( 'Select Column', 'gp-premium' ) }>
								<Icon icon="screenoptions" />
							</Tooltip>
						</div>
					) : '' }
					<InnerBlocks
						templateLock={ false }
						renderAppender={ (
							hasChildBlocks ?
								undefined :
								() => <InnerBlocks.ButtonBlockAppender />
						) }
					/>
				</div>
			</Fragment>
		);
	}
}

export default ( GenerateGrid );
