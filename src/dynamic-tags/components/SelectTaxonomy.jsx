import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { useTaxonomies } from '@hooks';
import { ComboboxControl } from '@wordpress/components';

export function SelectTaxonomy( { onChange, value, help, postType = 'post', currentPostOnly = true } ) {
	const taxonomies = useTaxonomies();
	const options = useMemo( () => {
		console.log( { taxonomies, currentPostOnly } );
		const availableTaxonomies = currentPostOnly
			? taxonomies.filter( ( tax ) => ( tax.types.includes( postType ) ) )
			: taxonomies;
		return availableTaxonomies
			.map( ( tax ) => ( { value: tax.slug, label: tax.name } ) );
	}, [ taxonomies, postType, currentPostOnly ] );

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
