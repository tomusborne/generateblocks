import './editor.scss';
import { Button, Placeholder } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import TemplateContext from './templateContext';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export default function TemplateSelector( { clientId, setAttributes } ) {
	const { label, instructions, templates } = useContext( TemplateContext );
	const { replaceInnerBlocks, removeBlock, selectBlock } = useDispatch( 'core/block-editor' );

	return (
		<div className="wp-block">
			<Placeholder
				label={ label }
				instructions={ instructions }
				className="gb-select-layout"
			>
				<div className="gb-templates-wrapper">
					{ templates && templates.map( ( template ) => (
						<Button
							key={ `template-${ template.id }` }
							className="gb-template-selector-button"
							onClick={ () => {
								replaceInnerBlocks(
									clientId,
									createBlocksFromInnerBlocksTemplate( template.innerBlocks )
								);

								if ( template.attributes ) {
									setAttributes( template.attributes );
								}

								if ( 'function' === typeof template.onClick ) {
									template.onClick();
								}

								selectBlock( clientId );
							} }
						>
							{ template.icon }<span>{ template.label }</span>
						</Button>
					) ) }
				</div>

				<div className="gb-select-layout__actions">
					<Button
						className="gblocks-cancel-placeholder is-small"
						onClick={ () => removeBlock( clientId ) }
						variant="secondary"
					>
						{ __( 'Cancel', 'generateblocks' ) }
					</Button>
				</div>
			</Placeholder>
		</div>
	);
}
