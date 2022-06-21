import { Placeholder, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import templates from '../templates';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import getIcon from '../../../utils/get-icon';

export default ( { clientId, isDisabled } ) => {
	if ( isDisabled ) {
		return false;
	}

	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	return (
		<Placeholder
			label={ __( 'Query Loop', 'generateblocks' ) }
			icon={ getIcon( 'query-loop' ) }
			instructions={ __( 'Choose a layout to start with.', 'generateblocks' ) }
			className="gblocks-query-loop-layout-selector"
		>
			<div className="gblocks-query-loop-layout-selector__content">
				{ templates.map( ( template ) => {
					return (
						<Button
							key={ `template-${ template }` }
							onClick={ () => {
								replaceInnerBlocks(
									clientId,
									createBlocksFromInnerBlocksTemplate( template.innerBlocks )
								);
							} }
						>
							{ template.icon }
							<p>
								{ template.title }
							</p>
						</Button>
					);
				} ) }
			</div>
		</Placeholder>
	);
};
