import './editor.scss';
import { Button, Placeholder } from '@wordpress/components';
import { useContext } from '@wordpress/element';
import TemplateContext from './templateContext';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

export default function TemplateSelector( { clientId, setAttributes } ) {
	const { label, instructions, templates } = useContext( TemplateContext );
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

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
							} }
						>
							{ template.icon }<span>{ template.label }</span>
						</Button>
					) ) }
				</div>
			</Placeholder>
		</div>
	);
}
