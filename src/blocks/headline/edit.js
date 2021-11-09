/**
 * Block: Headline
 */

import classnames from 'classnames';
import MainCSS from './css/main.js';
import DesktopCSS from './css/desktop.js';
import TabletCSS from './css/tablet.js';
import TabletOnlyCSS from './css/tablet-only.js';
import MobileCSS from './css/mobile.js';
import Element from '../../components/element';
import './markformat';
import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import {
	Fragment,
	Component,
} from '@wordpress/element';
import {
	RichText,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import {
	withSelect,
	withDispatch,
} from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';

/**
 * Regular expression matching invalid anchor characters for replacement.
 *
 * @type {RegExp}
 */
const ANCHOR_REGEX = /[\s#]/g;

class GenerateBlockHeadline extends Component {
	constructor() {
		super( ...arguments );

		this.getFontSizePlaceholder = this.getFontSizePlaceholder.bind( this );
		this.getDeviceType = this.getDeviceType.bind( this );
		this.setDeviceType = this.setDeviceType.bind( this );

		this.state = {
			selectedDevice: 'Desktop',
			fontSizePlaceholder: '17',
		};
	}

	componentDidMount() {
		const tempFontSizePlaceholder = this.getFontSizePlaceholder();

		if ( tempFontSizePlaceholder !== this.state.fontSizePlaceholder ) {
			this.setState( {
				fontSizePlaceholder: tempFontSizePlaceholder,
			} );
		}

		// hasIcon came late, so let's set it on mount if we have an icon.
		if ( ! this.props.attributes.hasIcon && this.props.attributes.icon ) {
			this.props.setAttributes( {
				hasIcon: true,
			} );
		}
	}

	componentDidUpdate() {
		const tempFontSizePlaceholder = this.getFontSizePlaceholder();

		if ( tempFontSizePlaceholder !== this.state.fontSizePlaceholder ) {
			this.setState( {
				fontSizePlaceholder: tempFontSizePlaceholder,
			} );
		}
	}

	getFontSizePlaceholder() {
		let placeholder = '25';

		if ( 'em' === this.props.attributes.fontSizeUnit ) {
			placeholder = '1';
		} else if ( '%' === this.props.attributes.fontSizeUnit ) {
			placeholder = '100';
		} else {
			const headlineId = document.querySelector( '.gb-headline-' + this.props.attributes.uniqueId );

			if ( headlineId ) {
				placeholder = parseFloat( window.getComputedStyle( headlineId ).fontSize );
			}
		}

		return placeholder;
	}

	getDeviceType() {
		let deviceType = this.props.deviceType ? this.props.deviceType : this.state.selectedDevice;

		if ( ! generateBlocksInfo.syncResponsivePreviews ) {
			deviceType = this.state.selectedDevice;
		}

		return deviceType;
	}

	setDeviceType( deviceType ) {
		if ( generateBlocksInfo.syncResponsivePreviews && this.props.deviceType ) {
			this.props.setDeviceType( deviceType );
			this.setState( { selectedDevice: deviceType } );
		} else {
			this.setState( { selectedDevice: deviceType } );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			onReplace,
			clientId,
		} = this.props;

		const {
			uniqueId,
			anchor,
			className,
			content,
			element,
			fontFamily,
			googleFont,
			googleFontVariants,
			icon,
			hasIcon,
			removeText,
			ariaLabel,
		} = attributes;

		let googleFontsAttr = '';

		if ( googleFontVariants ) {
			googleFontsAttr = ':' + googleFontVariants;
		}

		let htmlAttributes = {
			className: classnames( {
				'gb-headline': true,
				[ `gb-headline-${ uniqueId }` ]: true,
				'gb-headline-text': ! hasIcon,
				[ className ]: undefined !== className,
			} ),
			id: anchor ? anchor : null,
		};

		htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/headline', attributes );

		const onSplit = ( value, isOriginal ) => {
			let block;

			if ( isOriginal || value ) {
				block = createBlock( 'generateblocks/headline', {
					...attributes,
					content: value,
				} );
			} else {
				block = createBlock( 'core/paragraph' );
			}

			if ( isOriginal ) {
				block.clientId = clientId;
			}

			return block;
		};

		return (
			<Fragment>
				<BlockControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ this.getDeviceType() }
				/>

				<InspectorControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					deviceType={ this.getDeviceType() }
					setDeviceType={ this.setDeviceType }
					blockState={ this.state }
				/>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'HTML Anchor', 'generateblocks' ) }
						help={ __( 'Anchors lets you link directly to a section on a page.', 'generateblocks' ) }
						value={ anchor || '' }
						onChange={ ( nextValue ) => {
							nextValue = nextValue.replace( ANCHOR_REGEX, '-' );
							setAttributes( {
								anchor: nextValue,
							} );
						} } />
				</InspectorAdvancedControls>

				<MainCSS { ...this.props } />

				{ this.props.deviceType &&
					<Fragment>
						{ 'Desktop' === this.props.deviceType &&
							<DesktopCSS { ...this.props } />
						}

						{ ( 'Tablet' === this.props.deviceType || 'Mobile' === this.props.deviceType ) &&
							<TabletCSS { ...this.props } />
						}

						{ 'Tablet' === this.props.deviceType &&
							<TabletOnlyCSS { ...this.props } />
						}

						{ 'Mobile' === this.props.deviceType &&
							<MobileCSS { ...this.props } />
						}
					</Fragment>
				}

				{ fontFamily && googleFont &&
					<link
						rel="stylesheet"
						href={ 'https://fonts.googleapis.com/css?family=' + fontFamily.replace( / /g, '+' ) + googleFontsAttr }
					/>
				}

				{ applyFilters( 'generateblocks.editor.beforeHeadlineElement', '', this.props ) }

				<Element
					tagName={ element }
					htmlAttrs={ htmlAttributes }
				>
					{ hasIcon &&
						<Fragment>
							<span
								className="gb-icon"
								aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
								dangerouslySetInnerHTML={ { __html: icon } }
							/>

							{ ! removeText &&
								<span className="gb-headline-text">
									<RichText
										tagName="span"
										value={ content }
										onChange={ ( value ) => setAttributes( { content: value } ) }
										onSplit={ onSplit }
										onReplace={ onReplace }
										placeholder={ __( 'Headline', 'generateblocks' ) }
										allowedFormats={ applyFilters( 'generateblocks.editor.headlineDisableFormatting', false, this.props ) ? [] : null }
									/>
								</span>
							}
						</Fragment>
					}

					{ ! hasIcon && ! removeText &&
						<RichText
							tagName="span"
							value={ content }
							onChange={ ( value ) => setAttributes( { content: value } ) }
							onSplit={ onSplit }
							onReplace={ onReplace }
							placeholder={ __( 'Headline', 'generateblocks' ) }
							allowedFormats={ applyFilters( 'generateblocks.editor.headlineDisableFormatting', false, this.props ) ? [] : null }
						/>
					}
				</Element>
			</Fragment>
		);
	}
}

export default compose( [
	withDispatch( ( dispatch ) => ( {
		setDeviceType( type ) {
			const {
				__experimentalSetPreviewDeviceType: setPreviewDeviceType,
			} = dispatch( 'core/edit-post' ) || false;

			if ( ! setPreviewDeviceType ) {
				return;
			}

			setPreviewDeviceType( type );
		},
	} ) ),
	withSelect( ( select ) => {
		const {
			__experimentalGetPreviewDeviceType: getPreviewDeviceType,
		} = select( 'core/edit-post' ) || false;

		if ( ! getPreviewDeviceType ) {
			return {
				deviceType: null,
			};
		}

		return {
			deviceType: getPreviewDeviceType(),
		};
	} ),
] )( GenerateBlockHeadline );
