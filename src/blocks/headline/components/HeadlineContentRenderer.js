import classnames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import RootElement from '../../../components/root-element';
import IconWrapper from '../../../components/icon-wrapper';
import Element from '../../../components/element';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

export default function HeadlineContentRenderer( props ) {
	const {
		name,
		clientId,
		attributes,
		setAttributes,
		onSplit,
		onReplace,
		InnerContent = RichText,
		headlineRef,
	} = props;

	const {
		uniqueId,
		element,
		content,
		icon,
		hasIcon,
		anchor,
		removeText,
		ariaLabel,
		dynamicContentType,
		dynamicLinkType,
	} = attributes;

	let htmlAttributes = {
		className: classnames( {
			'gb-headline': true,
			[ `gb-headline-${ uniqueId }` ]: true,
			'gb-headline-text': ! hasIcon,
		} ),
		id: anchor ? anchor : null,
		ref: headlineRef,
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

	const tagName = ( 'terms' !== dynamicContentType && !! dynamicLinkType ) ? 'a' : 'span';

	const linkAllowedFormats = useSelect( ( select ) => ( select( 'core/rich-text' ).getFormatTypes() ), [] );

	const textFormats = useMemo( () => {
		if ( linkAllowedFormats && !! dynamicLinkType ) {
			return linkAllowedFormats
				.filter( ( format ) => ( 'core/link' !== format.name ) )
				.map( ( formatNames ) => ( formatNames.name ) );
		}

		return richTextFormats;
	}, [ linkAllowedFormats, richTextFormats, dynamicLinkType ] );

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
						tagName={ tagName }
						value={ content }
						onChange={ ( newContent ) => setAttributes( { content: newContent } ) }
						onSplit={ onSplit( attributes, clientId ) }
						onReplace={ onReplace }
						placeholder={ __( 'Headline', 'generateblocks' ) }
						allowedFormats={ textFormats }
					/>
				</IconWrapper>
			</Element>
		</RootElement>
	);
}
