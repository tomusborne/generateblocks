/**
 * Block: Headline
 */

import classnames from 'classnames';
import Element from '../../components/element';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import IconWrapper from '../../components/icon-wrapper';

export default ( { attributes } ) => {
	const {
		uniqueId,
		anchor,
		element,
		content,
		icon,
		hasIcon,
		removeText,
	} = attributes;

	let htmlAttributes = {
		className: classnames( {
			'gb-headline': true,
			[ `gb-headline-${ uniqueId }` ]: true,
			'gb-headline-text': ! hasIcon,
		} ),
		id: anchor ? anchor : null,
	};

	htmlAttributes = applyFilters(
		'generateblocks.frontend.htmlAttributes',
		htmlAttributes,
		'generateblocks/headline',
		attributes
	);

	const blockProps = useBlockProps.save( htmlAttributes );

	return (
		<Element tagName={ element } htmlAttrs={ blockProps }>
			<IconWrapper
				hasIcon={ hasIcon }
				icon={ icon }
				hideChildren={ removeText }
				showWrapper={ false }
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
