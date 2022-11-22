import { RichText, useBlockProps } from '@wordpress/block-editor';
import IconWrapper from '../../../components/icon-wrapper';
import { __ } from '@wordpress/i18n';
import Element from '../../../components/element';
import RootElement from '../../../components/root-element';
import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';

export default function ButtonContentRenderer( props ) {
	const {
		attributes,
		setAttributes,
		isSelected,
		InnerContent = RichText,
		context,
		name,
		buttonRef,
		clientId,
	} = props;

	const {
		uniqueId,
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
	} = attributes;

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
		} ),
		rel: relAttributes && relAttributes.length > 0 ? relAttributes.join( ' ' ) : null,
		'aria-label': !! ariaLabel ? ariaLabel : null,
		id: anchor ? anchor : null,
		ref: buttonRef,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/button',
		attributes
	);

	const blockProps = useBlockProps( htmlAttributes );

	const richTextFormats = applyFilters(
		'generateblocks.editor.buttonDisableFormatting',
		false,
		props
	) ? [] : [ 'core/bold', 'core/italic', 'core/strikethrough' ];

	let buttonTagName = applyFilters( 'generateblocks.frontend.buttonTagName', url ? 'a' : 'span', props );

	// The `button` element prevents RichText from allowing spaces.
	// To fix that we'll return a `span` element in the editor only.
	if ( 'button' === buttonTagName ) {
		buttonTagName = 'span';
	}

	return (
		<RootElement name={ name } clientId={ clientId }>
			<Element tagName={ buttonTagName } htmlAttrs={ blockProps }>
				<IconWrapper
					hasIcon={ !! icon }
					icon={ icon }
					direction={ iconLocation }
					hideChildren={ removeText }
					showWrapper={ ! removeText && !! icon }
					wrapperClassname={ 'gb-button-text' }
				>
					<InnerContent
						name={ name }
						placeholder={ __( 'Add text…', 'generateblocks' ) }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						allowedFormats={ richTextFormats }
						isSelected={ isSelected }
						attributes={ attributes }
						context={ context }
					/>
				</IconWrapper>
			</Element>
		</RootElement>
	);
}
