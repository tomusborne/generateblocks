import TaxonomyRecordsSelect from '../../../../../components/taxonomy-records-select';
import { useEffect, useState } from '@wordpress/element';
import TaxonomySelect from '../../../../../components/taxonomy-select';
import useTaxonomies from '../../../../../hooks/useTaxonomies';

export default function TaxonomyParameterControl( { label, value, onChange } ) {
	const [ taxonomy, setTaxonomy ] = useState();
	const [ terms, setTerms ] = useState( [] );

	const taxonomies = useTaxonomies();

	useEffect( () => {
		if ( !! value.taxonomy ) {
			setTaxonomy( value.taxonomy );
		}

		if ( !! value.terms ) {
			setTerms( value.terms );
		}
	}, [] );

	useEffect( () => {
		if ( value.taxonomy !== taxonomy ) {
			setTaxonomy( value.taxonomy );
		}

		if ( JSON.stringify( value.terms ) !== JSON.stringify( terms ) ) {
			setTerms( value.terms );
		}
	}, [ value ] );

	useEffect( () => {
		if ( !! taxonomy ) {
			const tax = taxonomies.filter( ( tax ) => ( tax.slug === taxonomy ) );
			const rest = !! tax[0] ? tax[0].rest_base : undefined;

			onChange( { taxonomy, terms, rest } );
		}
	}, [ taxonomy, terms ] );

	const labelStyles = { marginBottom: '8px', display: 'inline-block' };

	return (
		<>
			{ label && <label style={ labelStyles }>{ label }</label> }

			<TaxonomySelect
				wrapperStyles={ { marginBottom: '8px' } }
				value={ taxonomy }
				onChange={ ( option ) => {
					setTaxonomy( option.value );
					setTerms( [] );
				} }
			/>

			<TaxonomyRecordsSelect
				taxonomy={ taxonomy }
				value={ terms }
				onChange={ ( value ) => {
					const terms = value.reduce( ( result, option ) => {
						result.push( option.value );

						return result;
					}, [] );

					setTerms( terms );
				} }
			/>
		</>
	);
}
