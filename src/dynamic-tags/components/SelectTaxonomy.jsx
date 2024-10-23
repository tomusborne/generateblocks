import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { useTaxonomies } from '@hooks';
import { ComboboxControl } from '@wordpress/components';

export function SelectTaxonomy( { onChange, value, help } ) {
	const taxonomies = useTaxonomies();
	const options = useMemo( () => {
		return taxonomies
			.map( ( tax ) => ( { value: tax.slug, label: tax.name } ) );
	}, [ taxonomies ] );

	return (
		<ComboboxControl
			id={ 'gblocks-select-taxonomy' }
			label={ __( 'Select taxonomy', 'generateblocks' ) }
			help={ help }
			placeholder={ __( 'Select taxonomy', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
}
