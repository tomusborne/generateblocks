import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';
import { useSelect } from '@wordpress/data';
import { ExternalLink } from '@wordpress/components';

function ContainerTemplateSelector( context, props ) {
	const {
		getBlockRootClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const tabTemplates = {
		label: __( 'Container', 'generateblocks-pro' ),
		instructions: <>
			{ __( 'Choose a Container layout to start with.', 'generateblocks' ) }

			{ ' ' }<ExternalLink
				href={ __(
					'https://docs.generateblocks.com/article/migrating-container-legacy-layout/'
				) }
			>
				{ __( 'Learn more' ) }
			</ExternalLink>
		</>,
		templates: [
			{
				id: 'plain',
				label: __( 'Single Container', 'generateblocks-pro' ),
				icon: getIcon( 'single-container' ),
				innerBlocks: [],
			},
			{
				id: 'inner-container',
				label: __( 'With Inner Container', 'generateblocks-pro' ),
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

	if ( ! hasParentBlock && '' === props.attributes.variantRole ) {
		return tabTemplates;
	}

	return context;
}

addFilter(
	'generateblocks.editor.templateContext',
	'generateblocks/container/add-template-selector',
	ContainerTemplateSelector
);
