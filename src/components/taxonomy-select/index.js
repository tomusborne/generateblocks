import { useTaxonomies } from '../../hooks';
import SimpleSelect from '../simple-select';
import { useMemo } from '@wordpress/element';

export default function TaxonomySelect( props ) {
	const taxonomies = useTaxonomies();

	const taxonomiesOptions = useMemo( () => (
		taxonomies.map( ( tax ) => ( { value: tax.slug, label: tax.name } ) )
	), [ taxonomies ] );

	return (
		<SimpleSelect
			{ ...props }
			options={ taxonomiesOptions }
		/>
	);
}
