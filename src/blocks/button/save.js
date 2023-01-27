/**
 * Block: Buttons
 */

import classnames from 'classnames';
import Element from '../../components/element';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import IconWrapper from '../../components/icon-wrapper';

export default ( props ) => {
	const {
		attributes,
	} = props;

	const {
		uniqueId,
		text,
		url,
		target,
		relNoFollow,
		relSponsored,
		icon,
		iconLocation,
		removeText,
		ariaLabel,
		anchor,
		buttonType,
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
		href: !! url && 'link' === buttonType ? url : null,
		target: !! target && 'link' === buttonType ? '_blank' : null,
		rel: relAttributes && relAttributes.length > 0 && 'link' === buttonType ? relAttributes.join( ' ' ) : null,
		'aria-label': !! ariaLabel ? ariaLabel : null,
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/button',
		attributes
	);

	const blockProps = useBlockProps.save( htmlAttributes );
	const linkButtonTagName = url ? 'a' : 'span';
	const buttonTagName = 'button' === buttonType
		? 'button'
		: linkButtonTagName;

	return (
		<Element tagName={ buttonTagName } htmlAttrs={ blockProps }>
			<IconWrapper
				hasIcon={ !! icon }
				direction={ iconLocation }
				icon={ icon }
				hideChildren={ removeText }
				showWrapper={ false }
			>
				<RichText.Content
					value={ text }
					tagName={ !! icon ? 'span' : undefined }
					className={ !! icon ? 'gb-button-text' : undefined }
				/>
			</IconWrapper>
		</Element>
	);
};
