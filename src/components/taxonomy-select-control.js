import { useTaxonomies } from '../hooks';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import SimpleSelect from './simple-select';

export default function TaxonomySelectControl( { taxonomy, postType, onChange } ) {
	const taxonomies = useTaxonomies();

	const taxonomiesOptions = useMemo( () => (
		taxonomies
			// .filter( ( tax ) => ( tax.types.includes( postType ) ) )
			.map( ( tax ) => ( { value: tax.slug, label: tax.name } ) )
	), [ taxonomies, postType ] );

	return (
		<SimpleSelect
			label={ __( 'Taxonomy', 'generateblocks' ) }
			options={ taxonomiesOptions }
			value={ taxonomy }
			onChange={ onChange }
		/>
	);
}
