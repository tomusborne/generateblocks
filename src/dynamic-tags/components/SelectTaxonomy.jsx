import { __ } from '@wordpress/i18n';
import { useTaxonomies } from '@hooks';
import { ComboboxControl } from '@wordpress/components';

export function SelectTaxonomy( { onChange, value, help, postType } ) {
	const taxonomies = useTaxonomies( postType );
	const options = [
		{
			value: '',
			label: __( 'Select Taxonomy…', 'generateblocks' ),
		},
		...( taxonomies
			? taxonomies
				.map( ( tax ) => ( { value: tax.slug, label: tax.name } ) )
			: [] ),
	];

	return (
		<ComboboxControl
			id={ 'gblocks-select-taxonomy' }
			label={ __( 'Select taxonomy', 'generateblocks' ) }
			help={ help }
			placeholder={ __( 'Select Taxonomy…', 'generateblocks' ) }
			options={ options }
			value={ value ? value : options[ 0 ]?.value ?? '' }
			onChange={ onChange }
		/>
	);
}
