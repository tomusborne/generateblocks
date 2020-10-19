/**
 * Internal dependencies
 */
import '../icon-picker/editor.scss';
import './editor.scss';
import generalSvgs from './svgs-general';
import sanitizeSVG from '../../utils/sanitize-svg';

/**
 * WordPress dependencies
 */
const {
	__,
} = wp.i18n;

const {
	Component,
	Fragment,
	renderToString,
} = wp.element;

const {
	BaseControl,
	TextControl,
	Tooltip,
	Button,
	PanelBody,
	PanelRow,
} = wp.components;

/**
 * Typography Component
 */
class IconPicker extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			showIcons: false,
			showGeneralIcons: false,
			showSocialIcons: false,
		};
	}

	render() {
		const {
			attributes,
			setAttributes,
			attrShape,
		} = this.props;

		return (
			<Fragment>
				<BaseControl className="gb-svg-html">
					<TextControl
						label={ __( 'Shape SVG HTML', 'generateblocks' ) }
						value={ attributes[ attrShape ] }
						onChange={ ( value ) => {
							setAttributes( {
								[ this.props[ 'attrShape' ] ]: sanitizeSVG( value ), // eslint-disable-line dot-notation
							} );
						} }
					/>

					<div className="gb-icon-preview">
						<span dangerouslySetInnerHTML={ { __html: sanitizeSVG( attributes[ attrShape ] ) } } />

						<Button
							isSmall
							className="reset-icon is-secondary"
							onClick={ () => {
								setAttributes( {
									[ this.props[ 'attrShape' ] ]: '', // eslint-disable-line dot-notation
								} );
							} }
						>
							<span className="editor-block-types-list__item-icon">
								{ __( 'Clear', 'generateblocks' ) }
							</span>
						</Button>
					</div>
				</BaseControl>

				<BaseControl className="gb-icon-chooser gb-shape-divider-chooser">
					<PanelBody title={ __( 'General Icons', 'generateblocks' ) } initialOpen={ false }>
						<PanelRow>
							<BaseControl>
								<ul className="gblocks-icon-chooser">
									{
										Object.keys( generalSvgs ).map( ( svg, i ) => {
											return (
												<li key={ `editor-pblock-types-list-item-${ i }` }>
													<Tooltip text={ ( generalSvgs[ svg ].label ) }>
														<Button
															className="editor-block-list-item-button"
															onClick={ () => {
																setAttributes( {
																	[ this.props[ 'attrShape' ] ]: renderToString( generalSvgs[ svg ][ 'icon' ] ), // eslint-disable-line dot-notation
																} );
															} }
														>
															<span className="editor-block-types-list__item-icon">
																{ generalSvgs[ svg ].icon }
															</span>
														</Button>
													</Tooltip>
												</li>
											);
										} )
									}
								</ul>
							</BaseControl>
						</PanelRow>
					</PanelBody>
				</BaseControl>
			</Fragment>
		);
	}
}

export default IconPicker;
