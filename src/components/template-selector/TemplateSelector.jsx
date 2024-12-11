import './editor.scss';
import { Button, Placeholder } from '@wordpress/components';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as blockEditorStore } from '@wordpress/block-editor';

export function TemplateSelector( {
	clientId,
	setAttributes,
	label,
	instructions,
	templates,
} ) {
	const { replaceInnerBlocks, removeBlock, selectBlock } = useDispatch( blockEditorStore );

	return (
		<div className="wp-block">
			<Placeholder
				label={ label }
				instructions={ instructions }
				className="gb-select-variation"
			>
				<div className="gb-variation-selector">
					{ templates && templates.map( ( template ) => (
						<Button
							key={ `template-${ template.id }` }
							className="gb-variation-selector__button"
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

								setAttributes( {
									showTemplateSelector: false,
								} );

								selectBlock( clientId );
							} }
						>
							{ template.icon }<span>{ template.label }</span>
						</Button>
					) ) }
				</div>

				<div className="gb-select-variation__actions">
					<Button
						className="is-small"
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
