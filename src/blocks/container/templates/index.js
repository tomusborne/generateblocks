import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';
import { useSelect } from '@wordpress/data';
import { ExternalLink } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

function ContainerTemplateSelector( context, props ) {
	const {
		getBlockRootClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );
	const [ showSelector, setShowSelector ] = useState( false );

	useEffect( () => {
		// Existing top-level Container blocks with no innerBlocks shouldn't show the selector.
		if ( '' === props.attributes.uniqueId ) {
			setShowSelector( true );
		}
	}, [] );

	const tabTemplates = {
		label: __( 'Container', 'generateblocks' ),
		instructions: <>
			{ __( 'Choose a Container layout to start with.', 'generateblocks' ) }

			{ ' ' }<ExternalLink
				href={ __(
					'https://docs.generateblocks.com/article/add-inner-container/'
				) }
			>
				{ __( 'Learn more' ) }
			</ExternalLink>
		</>,
		templates: [
			{
				id: 'plain',
				label: __( 'Single Container', 'generateblocks' ),
				icon: getIcon( 'single-container' ),
				innerBlocks: [],
				onClick: () => setShowSelector( false ), // Disable the selector even though there are no innerBlocks.
			},
			{
				id: 'inner-container',
				label: __( 'With Inner Container', 'generateblocks' ),
				icon: getIcon( 'with-inner-container' ),
				innerBlocks: [
					[ 'generateblocks/container',
						{
							useGlobalMaxWidth: true,
							marginLeft: 'auto',
							marginRight: 'auto',
						},
					],
				],
			},
		],
	};

	const hasParentBlock = getBlockRootClientId( props.clientId );

	if ( ! hasParentBlock && '' === props.attributes.variantRole && showSelector ) {
		return tabTemplates;
	}

	return context;
}

addFilter(
	'generateblocks.editor.templateContext',
	'generateblocks/container/add-template-selector',
	ContainerTemplateSelector
);
