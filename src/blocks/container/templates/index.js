import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../utils/get-icon';
import { useSelect } from '@wordpress/data';

function ContainerTemplateSelector( context, props ) {
	const {
		getBlockRootClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const tabTemplates = {
		label: __( 'Container', 'generateblocks-pro' ),
		instructions: __( 'Choose a Container layout to start with.', 'generateblocks-pro' ),
		templates: [
			{
				id: 'plain',
				label: __( 'Plain Container', 'generateblocks-pro' ),
				icon: getIcon( 'container' ),
				innerBlocks: [],
			},
			{
				id: 'inner-container',
				label: __( 'With Inner Container', 'generateblocks-pro' ),
				icon: getIcon( 'section' ),
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

	if ( ! hasParentBlock ) {
		return tabTemplates;
	}

	return context;
}

addFilter(
	'generateblocks.editor.templateContext',
	'generateblocks/container/add-template-selector',
	ContainerTemplateSelector
);
