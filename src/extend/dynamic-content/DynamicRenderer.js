import { RichText } from '@wordpress/block-editor';
import { connect } from 'react-redux';
import headlineConnector from './connectors/headlineConnector';
import buttonConnector from './connectors/buttonConnector';
import imageConnector from './connectors/imageConnector';
import dynamicContentAttributes from './attributes';
import applyContext from './utils/applyContext';
import useDynamicContent from './hooks/useDynamicContent';
import HeadlineContentRenderer from '../../blocks/headline/components/HeadlineContentRenderer';
import ButtonContentRenderer from '../../blocks/button/components/ButtonContentRenderer';
import ContainerContentRenderer from '../../blocks/container/components/ContainerContentRenderer';
import ImageContentRenderer from '../../blocks/image/components/ImageContentRenderer';
import filterAttributes from '../../utils/filter-attributes';

function getContentRenderer( name ) {
	return {
		'generateblocks/headline': HeadlineContentRenderer,
		'generateblocks/button': ButtonContentRenderer,
		'generateblocks/container': ContainerContentRenderer,
		'generateblocks/image': ImageContentRenderer,
	}[ name ];
}

function getConnector( name ) {
	return {
		'generateblocks/headline': headlineConnector,
		'generateblocks/button': buttonConnector,
		'generateblocks/container': imageConnector,
		'generateblocks/image': imageConnector,
	}[ name ];
}

export default function DynamicRenderer( props ) {
	const {
		name,
		attributes,
		context,
	} = props;

	const dynamicAttributes = filterAttributes( attributes, Object.keys( dynamicContentAttributes ) );
	const attributesWithContext = applyContext( context, dynamicAttributes );

	const dynamicContent = useDynamicContent( attributesWithContext );

	const ContentRenderer = getContentRenderer( name );
	const ConnectedRenderer = connect( getConnector( name ) )( ContentRenderer );

	return (
		<ConnectedRenderer
			{ ...props }
			InnerContent={ !! attributes.contentType ? RichText.Content : RichText }
			dynamicContent={ dynamicContent }
		/>
	);
}
