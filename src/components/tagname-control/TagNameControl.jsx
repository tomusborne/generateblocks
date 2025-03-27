import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getBlockType } from '@wordpress/blocks';

export function TagNameControl( { value, options = [], onChange, blockName } ) {
	const tagNames = getBlockType( blockName )?.attributes?.tagName?.enum ?? [];
	const tagNameOptions = options.length
		? options
		: tagNames.map( ( tag ) => ( {
			label: tag,
			value: tag,
		} ) );

	if ( ! tagNameOptions.length ) {
		return null;
	}

	return (
		<SelectControl
			label={ __( 'Tag Name', 'generateblocks' ) }
			value={ value }
			options={ tagNameOptions }
			onChange={ onChange }
		/>
	);
}
