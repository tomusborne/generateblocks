import HeadlineContentRenderer from '../../blocks/headline/components/HeadlineContentRenderer';
import ButtonContentRenderer from '../../blocks/button/components/ButtonContentRenderer';
import filterAttributes from '../../utils/filter-attributes';
import dynamicContentAttributes from './attributes';
import applyContext from './utils/applyContext';
import { RichText } from '@wordpress/block-editor';
import useDynamicContent from './hooks/useDynamicContent';
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

function isValidUrl( string ) {
	try {
		new URL( string );
		return true;
	} catch ( err ) {
		return false;
	}
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
		dynamicContentType,
		dynamicLinkType,
		termSeparator,
	} = attributesWithContext;
	const rawContent = useDynamicContent( attributesWithContext, name );

	const ContentRenderer = getContentRenderer( name );

	const staticContent = 'generateblocks/headline' === name ? attributes.content : attributes.text;

	let content = !! attributes.dynamicContentType ? rawContent : staticContent;

	if ( !! dynamicLinkType && 'terms' === dynamicContentType && 'generateblocks/headline' === name ) {
		content = rawContent
			.split( termSeparator )
			.map( ( newContent, idx, fullContent ) => {
				return ( <><a>{ newContent }</a>{ idx + 1 !== fullContent.length && termSeparator }</> ); // eslint-disable-line jsx-a11y/anchor-is-valid
			} );
	}

	// Only return first term in buttons for now.
	if ( 'terms' === dynamicContentType && 'generateblocks/button' === name ) {
		content = rawContent.split( termSeparator )[ 0 ];
	}

	const dynamicImage = (
		!! content &&
		( 'generateblocks/container' === name || 'generateblocks/image' === name ) &&
		( isValidUrl( content ) || ! isNaN( parseInt( content ) ) )
	) ? content : undefined;

	const newAttributes = Object.assign( {}, attributes, {
		content: 'generateblocks/headline' === name ? content : undefined,
		text: 'generateblocks/button' === name ? content : undefined,
		dynamicImage,
	} );

	const newProps = Object.assign( {}, props, {
		InnerContent: !! attributes.dynamicContentType ? RichText.Content : RichText,
		attributes: newAttributes,
	} );

	return (
		<ContentRenderer { ...newProps } />
	);
}
