import { RichText } from '@wordpress/block-editor';
import useDynamicContent from './hooks/useDynamicContent';
import filterAttributes from '../../../../utils/filter-attributes';
import dynamicContentAttributes from './attributes';
import applyContext from './utils/applyContext';

function LinkWrapper( { children, displayLink } ) {
	if ( ! displayLink ) {
		return ( children );
	}

	const linkAttributes = {
		href: '#',
		onClick: ( e ) => ( e.preventDefault() ),
	};

	return ( <a { ...linkAttributes }>{ children }</a> );
}

export default ( { attributes, context, name } ) => {
	const dynamicAttributes = filterAttributes( attributes, Object.keys( dynamicContentAttributes ) );
	const attributesWithContext = applyContext( context, dynamicAttributes );
	const content = useDynamicContent( attributesWithContext );
	const displayLink = ! (
		! attributesWithContext.dynamicLinkType ||
		attributesWithContext.dynamicLinkType === '' ||
		'generateblocks/button' === name
	);

	return (
		<LinkWrapper displayLink={ displayLink }>
			<RichText.Content
				value={ content }
				tagName={ attributes.hasIcon && attributes.icon ? 'span' : undefined }
				className={ attributes.hasIcon && attributes.icon ? 'gb-headline-text' : undefined }
			/>
		</LinkWrapper>
	);
};
