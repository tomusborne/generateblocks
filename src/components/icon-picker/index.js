/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';
import socialSvgs from './svgs-social';
import generalSvgs from './svgs-general';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component, Fragment, renderToString } = wp.element;
const { compose } = wp.compose;
const { BaseControl, SelectControl, ToggleControl, TextControl, Tooltip, Button, Popover } = wp.components;

/**
 * Typography Component
 */
class IconPicker extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		const {
			className,
			setAttributes,
			valueIcon,
			attrIcon,
			valueCustomIcon,
			attrCustomIcon,
			valueIconLocation,
			attrIconLocation,
			locationOptions,
			valueRemoveText,
			attrRemoveText,
			valueAriaLabel,
			attrAriaLabel,
		} = this.props;

		const sanitizeSVG = ( svg ) => {
			return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } );
		}

		return (
			<Fragment>
				<div className="icon-chooser-container">
					<BaseControl label={ __( 'Social', 'flexblocks' ) }>
						<ul className="fx-icon-chooser">
						{
							Object.keys( socialSvgs ).map( ( svg, i ) => {
								return (
									<li key={ `editor-pblock-types-list-item-${ i }` }>
										<Tooltip text={ ( socialSvgs[ svg ]['label'] ) }>
											<Button
												isLarge
												className="editor-block-list-item-button"
												onClick={ () => {
													setAttributes( { [ this.props[ 'attrIcon' ] ]: renderToString( socialSvgs[ svg ]['icon'] ) } );
													setAttributes( { [ this.props[ 'attrCustomIcon' ] ]: false } );
												} }
											>
												<span className="editor-block-types-list__item-icon">
													{ socialSvgs[ svg ]['icon'] }
												</span>
											</Button>
										</Tooltip>
									</li>
								);
							} )
						}
						</ul>
					</BaseControl>

					<BaseControl label={ __( 'General', 'flexblocks' ) }>
						<ul className="fx-icon-chooser">
						{
							Object.keys( generalSvgs ).map( ( svg, i ) => {
								return (
									<li key={ `editor-pblock-types-list-item-${ i }` }>
										<Tooltip text={ ( generalSvgs[ svg ]['label'] ) }>
											<Button
												isLarge
												className="editor-block-list-item-button"
												onClick={ () => {
													setAttributes( { [ this.props[ 'attrIcon' ] ]: renderToString( generalSvgs[ svg ]['icon'] ) } );
													setAttributes( { [ this.props[ 'attrCustomIcon' ] ]: false } );
												} }
											>
												<span className="editor-block-types-list__item-icon">
													{ generalSvgs[ svg ]['icon'] }
												</span>
											</Button>
										</Tooltip>
									</li>
								);
							} )
						}
						</ul>
					</BaseControl>
				</div>

				<BaseControl className="advanced-icon-controls">
					<Button
						isLarge
						className="choose-custom-icon"
						onClick={ () => {
							setAttributes( { [ this.props[ 'attrCustomIcon' ] ]: true } );
						} }
					>
						<span className="editor-block-types-list__item-icon">
							{ __( 'Custom SVG', 'flexblocks' ) }
						</span>
					</Button>

					<Button
						isLarge
						className="reset-icon"
						onClick={ () => {
							setAttributes( { [ this.props[ 'attrCustomIcon' ] ]: false } );
							setAttributes( { [ this.props[ 'attrIcon' ] ]: '' } );
						} }
					>
						<span className="editor-block-types-list__item-icon">
							{ __( 'Reset', 'flexblocks' ) }
						</span>
					</Button>
				</BaseControl>

				{ !! valueCustomIcon ? (
					<BaseControl className="fx-svg-html">
						<TextControl
							label={ __( 'Icon SVG HTML', 'flexblocks' ) }
							value={ valueIcon }
							onChange={ ( value ) => {
								setAttributes( {
									[ this.props[ 'attrIcon' ] ]: sanitizeSVG( value )
								} );
							} }
						/>
					</BaseControl>
				) : '' }

				<SelectControl
					label={ __( 'Icon Location', 'flexblocks' ) }
					value={ valueIconLocation }
					options={ locationOptions }
					onChange={ ( value ) => {
						setAttributes( {
							[ this.props[ 'attrIconLocation' ] ]: value
						} );
					} }
				/>


				<ToggleControl
					label={ __( 'Remove Text', 'flexblocks' ) }
					checked={ !! valueRemoveText }
					onChange={ ( value ) => {
						setAttributes( {
							[ this.props[ 'attrRemoveText' ] ]: value
						} );
					} }
				/>

				{ !! valueRemoveText ? (
					<TextControl
						label={ __( 'ARIA Label', 'flexblocks' ) }
						help={ __( 'Helpful to people using screen readers.', 'flexblocks' ) }
						value={ valueAriaLabel }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrAriaLabel' ] ]: value
							} );
						} }
					/>
				) : '' }
			</Fragment>
		);
	}
}

export default IconPicker;
