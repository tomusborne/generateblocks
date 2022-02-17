import HeadlineContentRenderer from '../HeadlineContentRenderer';
import ButtonContentRenderer from '../../../button/components/ButtonContentRenderer';
import filterAttributes from '../../../../utils/filter-attributes';
import dynamicContentAttributes from './attributes';
import applyContext from './utils/applyContext';
import { RichText } from '@wordpress/block-editor';
import useDynamicContent from './hooks/useDynamicContent';
import { useMemo } from '@wordpress/element';

export default function DynamicRenderer( props ) {
	const {
		name,
		attributes,
		context,
	} = props;

	const dynamicAttributes = filterAttributes( attributes, Object.keys( dynamicContentAttributes ) );
	const attributesWithContext = applyContext( context, dynamicAttributes );
	const {
		contentType,
		dynamicLinkType,
		termSeparator,
	} = attributesWithContext;
	const rawContent = useDynamicContent( attributesWithContext );

	const ContentRenderer = 'generateblocks/headline' === name
		? HeadlineContentRenderer
		: ButtonContentRenderer;

	const content = useMemo( () => {
		if ( !! dynamicLinkType && 'terms' === contentType && 'generateblocks/headline' === name ) {
			return rawContent
				.split( termSeparator )
				.map( ( content, idx, fullContent ) => {
					return ( <><a>{ content }</a>{ idx + 1 !== fullContent.length && termSeparator }</> );
				} );
		}

		return !! attributes.contentType ? rawContent : attributes.content;
	}, [
		contentType,
		dynamicLinkType,
		termSeparator,
		rawContent,
		attributes.content
	] );

	const newAttributes = Object.assign( {}, attributes, {
		content: 'generateblocks/headline' === name ? content : undefined,
		text: 'generateblocks/button' === name ? content : undefined,
	})

	const newProps = Object.assign( {}, props, {
		InnerContent: !! attributes.contentType ? RichText.Content : RichText,
		attributes: newAttributes,
	} );

	return (
		<ContentRenderer { ...newProps } />
	);
}
