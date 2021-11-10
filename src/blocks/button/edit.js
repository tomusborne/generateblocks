import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import InspectorAdvancedControls from './components/InspectorAdvancedControls';
import ComponentCSS from './components/ComponentCSS';
import GoogleFontLink from '../../components/google-font-link';
import Element from '../../components/element';
import IconWrapper from '../../components/icon-wrapper';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import URLInput from '../../components/url-input';
import { Fragment } from '@wordpress/element';
import { useDeviceType } from '../../hooks';
import { applyFilters } from '@wordpress/hooks';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';
import { withButtonLegacyMigration, withUniqueId } from '../../hoc';

const ButtonEdit = ( props ) => {
	const {
		attributes,
		setAttributes,
		isSelected,
		clientId,
	} = props;

	const {
		uniqueId,
		className,
		anchor,
		text,
		url,
		target,
		relNoFollow,
		relSponsored,
		icon,
		iconLocation,
		removeText,
		ariaLabel,
		fontFamily,
		googleFont,
		googleFontVariants,
	} = attributes;

	const [ deviceType, setDeviceType ] = useDeviceType( 'Desktop' );

	const relAttributes = [];

	if ( relNoFollow ) {
		relAttributes.push( 'nofollow' );
	}

	if ( target ) {
		relAttributes.push( 'noopener', 'noreferrer' );
	}

	if ( relSponsored ) {
		relAttributes.push( 'sponsored' );
	}

	let htmlAttributes = {
		className: classnames( {
			'gb-button': true,
			[ `gb-button-${ uniqueId }` ]: true,
			'gb-button-text': ! icon,
			[ `${ className }` ]: undefined !== className,
		} ),
		rel: relAttributes && relAttributes.length > 0 ? relAttributes.join( ' ' ) : null,
		'aria-label': !! ariaLabel ? ariaLabel : null,
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/button',
		attributes
	);

	const richTextFormats = applyFilters(
		'generateblocks.editor.buttonDisableFormatting',
		false,
		props
	) ? [] : [ 'core/bold', 'core/italic', 'core/strikethrough' ];

	return (
		<Fragment>
			<BlockControls clientId={ clientId } />

			<InspectorControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ deviceType }
				setDeviceType={ setDeviceType }
				state={ { deviceType } }
				blockDefaults={ generateBlocksDefaults.button }
			/>

			<InspectorAdvancedControls
				anchor={ anchor }
				ariaLabel={ ariaLabel }
				setAttributes={ setAttributes }
			/>

			<ComponentCSS { ...props } deviceType={ deviceType } />

			<GoogleFontLink
				fontFamily={ fontFamily }
				googleFont={ googleFont }
				googleFontVariants={ googleFontVariants }
			/>

			<Element tagName={ url ? 'a' : 'span' } htmlAttrs={ htmlAttributes }>
				<IconWrapper
					hasIcon={ !! icon }
					icon={ icon }
					direction={ iconLocation }
					hideChildren={ removeText }
					showWrapper={ !removeText && !! icon }
					wrapperClassname={ 'gb-button-text' }
					ariaLabel={ ( !! removeText && !! ariaLabel ? ariaLabel : undefined ) }
				>
					<RichText
						placeholder={ __( 'Add text…', 'generateblocks' ) }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						allowedFormats={ richTextFormats }
						isSelected={ isSelected }
					/>
				</IconWrapper>
			</Element>

			{ isSelected &&
				<URLInput
					url={ url }
					target={ target }
					relNoFollow={ relNoFollow }
					relSponsored={ relSponsored }
					onChange={ ( data ) => {
						setAttributes( data );

						if ( '' !== data.url ) {
							setAttributes( {
								hasUrl: true,
							} );
						} else {
							setAttributes( {
								hasUrl: false,
							} );
						}
					} }
					autoFocus={ false } // eslint-disable-line jsx-a11y/no-autofocus
					className="gblocks-component-url-input-float"
				/>
			}
		</Fragment>
	);
};

export default compose(
	withUniqueId,
	withButtonLegacyMigration
)( ButtonEdit );
