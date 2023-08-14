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
		isSelected,
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

	let content = staticContent;

	if ( ! isSelected && staticContent && staticContent.includes( '{dynamic_data}' ) ) {
		if ( !! dynamicLinkType && 'terms' !== dynamicContentType && 'generateblocks/headline' === name ) {
			content = staticContent.replace( '{dynamic_data}', `<a>${ rawContent }</a>` );
		} else {
			content = staticContent.replace( '{dynamic_data}', rawContent );
		}
	}

	if (
		! isSelected &&
		!! dynamicLinkType &&
		'terms' === dynamicContentType &&
		'generateblocks/headline' === name
	) {
		const contentTags = rawContent
			.split( termSeparator )
			.map( ( newContent ) => {
				return `<a>${ newContent }</a>`;
			} ).join( termSeparator );

		content = staticContent.replace( '{dynamic_data}', contentTags );
	}

	// Only return first term in buttons for now.
	if ( ! isSelected && 'terms' === dynamicContentType && 'generateblocks/button' === name ) {
		content = staticContent.replace( '{dynamic_data}', rawContent.split( termSeparator )[ 0 ] );
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
		attributes: newAttributes,
	} );

	return (
		<ContentRenderer { ...newProps } />
	);
}
