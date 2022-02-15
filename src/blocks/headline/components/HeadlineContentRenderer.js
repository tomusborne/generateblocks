import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import RootElement from '../../../components/root-element';
import IconWrapper from '../../../components/icon-wrapper';
import Element from '../../../components/element';

export default function HeadlineContentRenderer( props ) {
	const {
		name,
		clientId,
		attributes,
		setAttributes,
		onSplit,
		onReplace,
		InnerContent = RichText,
	} = props;
	const {
		uniqueId,
		element,
		content,
		icon,
		hasIcon,
		anchor,
		removeText,
		ariaLabel
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

	const blockProps = useBlockProps( htmlAttributes );

	const richTextFormats = applyFilters(
		'generateblocks.editor.headlineDisableFormatting',
		false,
		props
	) ? [] : null;

	return (
		<RootElement name={ name } clientId={ clientId }>
			<Element tagName={ element } htmlAttrs={ blockProps }>
				<IconWrapper
					hasIcon={ hasIcon }
					icon={ icon }
					hideChildren={ removeText }
					showWrapper={ ! removeText && hasIcon }
					wrapperClassname={ 'gb-headline-text' }
					ariaLabel={ ( !! removeText && !! ariaLabel ? ariaLabel : undefined ) }
				>
					<InnerContent
						name={ name }
						tagName="span"
						value={ content }
						onChange={ ( newContent ) => setAttributes( { content: newContent } ) }
						onSplit={ onSplit( attributes, clientId ) }
						onReplace={ onReplace }
						placeholder={ __( 'Headline', 'generateblocks' ) }
						allowedFormats={ richTextFormats }
					/>
				</IconWrapper>
			</Element>
		</RootElement>
	);
}
