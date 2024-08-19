import { BlockSettingsMenuControls, store as blockEditorStore } from '@wordpress/block-editor';
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { createBlock, getBlockType } from '@wordpress/blocks';
import { convertLocalToStyles } from '@utils/convertLocalToStyles';

export function ConvertBlock( { clientId, name, attributes } ) {
	const {
		url,
		target,
		relNoFollow,
		relSponsored,
		text,
		hasButtonContainer,
		variantRole,
		globalClasses,
		icon,
		removeText,
	} = attributes;
	const { replaceBlock } = useDispatch( blockEditorStore );

	if (
		hasButtonContainer || // The old Button Container block only accepts 1.0 Button blocks.
		variantRole // If this button is a variant, we should convert it separately.
	) {
		return null;
	}

	return (
		<BlockSettingsMenuControls>
			<MenuItem
				onClick={ () => {
					const attributeData = getBlockType( name )?.attributes;
					const styles = convertLocalToStyles( attributeData, attributes, '&:is(:hover, :focus)' );
					const relAttributes = [];
					const htmlAttributes = {};

					if ( url ) {
						if ( target ) {
							relAttributes.push( 'noopener' );
							relAttributes.push( 'noreferrer' );
						}

						if ( relNoFollow ) {
							relAttributes.push( 'nofollow' );
						}

						if ( relSponsored ) {
							relAttributes.push( 'sponsored' );
						}
					}

					if ( url ) {
						htmlAttributes.href = url;
					}

					if ( target ) {
						htmlAttributes.target = '_blank';
					}

					if ( relAttributes.length ) {
						htmlAttributes.rel = relAttributes.join( ' ' );
					}

					const newBlock = createBlock(
						'generateblocks/text',
						{
							globalClasses,
							tagName: 'a',
							content: text,
							htmlAttributes,
							styles: {
								...styles,
								textDecoration: 'none',
							},
							icon,
							iconOnly: removeText,
						}
					);

					replaceBlock( clientId, newBlock );
				} }
			>
				{ __( 'Convert to 2.0', 'generateblocks' ) }
			</MenuItem>
		</BlockSettingsMenuControls>
	);
}
