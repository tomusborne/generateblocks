import HeadlineContentRenderer from '../../blocks/headline/components/HeadlineContentRenderer';
import ButtonContentRenderer from '../../blocks/button/components/ButtonContentRenderer';
import filterAttributes from '../../utils/filter-attributes';
import dynamicContentAttributes from './attributes';
import applyContext from './utils/applyContext';
import { RichText } from '@wordpress/block-editor';
import useDynamicContent from './hooks/useDynamicContent';
import { useMemo } from '@wordpress/element';
import ContainerContentRenderer from '../../blocks/container/components/ContainerContentRenderer';
import ImageContentRenderer from '../../blocks/image/components/ImageContentRenderer';

function getContentRenderer( name ) {
	const contentRenders = {
		'generateblocks/headline': HeadlineContentRenderer,
		'generateblocks/button': ButtonContentRenderer,
		'generateblocks/container': ContainerContentRenderer,
		'generateblocks/image': ImageContentRenderer,
	};

	return contentRenders[ name ];
}

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

	const ContentRenderer = getContentRenderer( name );

	const staticContent = 'generateblocks/headline' === name ? attributes.content : attributes.text;

	const content = useMemo( () => {
		if ( !! dynamicLinkType && 'terms' === contentType && 'generateblocks/headline' === name ) {
			return rawContent
				.split( termSeparator )
				.map( ( newContent, idx, fullContent ) => {
					return ( <><a>{ newContent }</a>{ idx + 1 !== fullContent.length && termSeparator }</> ); // eslint-disable-line jsx-a11y/anchor-is-valid
				} );
		}

		// Only return first term in buttons for now.
		if ( 'terms' === contentType && 'generateblocks/button' === name ) {
			return rawContent.split( termSeparator )[ 0 ];
		}

		return !! attributes.contentType ? rawContent : staticContent;
	}, [
		contentType,
		dynamicLinkType,
		termSeparator,
		rawContent,
		staticContent,
	] );

	const newAttributes = Object.assign( {}, attributes, {
		content: 'generateblocks/headline' === name ? content : undefined,
		text: 'generateblocks/button' === name ? content : undefined,
		dynamicImage: 'generateblocks/container' === name ? content : undefined,
	} );

	const newProps = Object.assign( {}, props, {
		InnerContent: !! attributes.contentType ? RichText.Content : RichText,
		attributes: newAttributes,
	} );

	return (
		<ContentRenderer { ...newProps } />
	);
}
