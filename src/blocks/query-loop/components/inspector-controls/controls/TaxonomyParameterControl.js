import SimpleSelect from '../../../../../components/simple-select';
import TaxonomiesSelect from '../../../../../components/taxonomies-select';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { useTaxonomies } from '../../../../../hooks';

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
			const tax = taxonomies.filter( ( record ) => ( record.slug === taxonomy ) );
			const rest = !! tax[ 0 ] ? tax[ 0 ].rest_base : undefined;

			onChange( { taxonomy, terms, rest } );
		}
	}, [ taxonomy, terms ] );

	const taxonomiesOptions = useMemo( () => (
		taxonomies
			.filter( ( tax ) => ( 'nav_menu' !== tax.slug ) )
			.map( ( tax ) => ( { value: tax.slug, label: tax.name } ) )
	), [ taxonomies ] );

	const labelStyles = { marginBottom: '8px', display: 'inline-block' };

	return (
		<>
			{ label && <label htmlFor={ 'tax-label' } style={ labelStyles }>{ label }</label> }

			<SimpleSelect
				wrapperStyles={ { marginBottom: '8px' } }
				options={ taxonomiesOptions }
				value={ taxonomy }
				onChange={ ( option ) => {
					setTaxonomy( option.value );
					setTerms( [] );
				} }
			/>

			<TaxonomiesSelect
				taxonomy={ taxonomy }
				value={ terms }
				onChange={ ( newValue ) => {
					const newTerms = newValue.reduce( ( result, option ) => {
						result.push( option.value );

						return result;
					}, [] );

					setTerms( newTerms );
				} }
			/>
		</>
	);
}
