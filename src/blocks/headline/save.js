/**
 * Block: Headline
 */

import classnames from 'classnames';
import Element from '../../components/element';
import { RichText } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import IconWrapper from '../../components/icon-wrapper';

export default ( { attributes } ) => {
	const {
		uniqueId,
		className,
		anchor,
		element,
		content,
		icon,
		hasIcon,
		removeText,
		ariaLabel,
	} = attributes;

	let htmlAttributes = {
		className: classnames( {
			'gb-headline': true,
			[ `gb-headline-${ uniqueId }` ]: true,
			'gb-headline-text': ! hasIcon,
			[ className ]: undefined !== className,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/headline',
		attributes
	);

	return (
		<Element tagName={ element } htmlAttrs={ htmlAttributes }>
			<IconWrapper
				hasIcon={ hasIcon }
				icon={ icon }
				hideChildren={ removeText }
				showWrapper={ false }
				ariaLabel={ ( !! removeText && !! ariaLabel ? ariaLabel : undefined ) }
			>
				<RichText.Content
					value={ content }
					tagName={ hasIcon && icon ? 'span' : undefined }
					className={ hasIcon && icon ? 'gb-headline-text' : undefined }
				/>
			</IconWrapper>
		</Element>
	);
};
