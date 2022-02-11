import { RichText } from '@wordpress/block-editor';
import useDynamicContent from './hooks/useDynamicContent';
import filterAttributes from '../../../../utils/filter-attributes';
import dynamicContentAttributes from './attributes';
import applyContext from './utils/applyContext';
import { useEntityProp } from '@wordpress/core-data';

function LinkWrapper( { children, postId, postType, dynamicLinkType } ) {
	if ( ! dynamicLinkType || dynamicLinkType === '' ) {
		return ( children );
	}

	const [ link ] = useEntityProp( 'postType', postType, 'link', postId );
	const linkAttributes = {
		href: link,
		onClick: ( e ) => ( e.preventDefault() ),
	};

	return ( <a { ...linkAttributes }>{ children }</a> );
}

export default ( { attributes, context } ) => {
	const dynamicAttributes = filterAttributes( attributes, Object.keys( dynamicContentAttributes ) );
	const attributesWithContext = applyContext( context, dynamicAttributes );
	const content = useDynamicContent( attributesWithContext );

	return (
		<LinkWrapper
			dynamicLinkType={attributesWithContext.dynamicLinkType}
			postType={ attributesWithContext.postType }
			postId={ attributesWithContext.postId }
		>
			<RichText.Content
				value={ content }
				tagName={ attributes.hasIcon && attributes.icon ? 'span' : undefined }
				className={ attributes.hasIcon && attributes.icon ? 'gb-headline-text' : undefined }
			/>
		</LinkWrapper>
	);
};
