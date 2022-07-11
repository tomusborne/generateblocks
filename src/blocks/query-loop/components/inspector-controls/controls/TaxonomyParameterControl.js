import SimpleSelect from '../../../../../components/simple-select';
import TaxonomiesSelect from '../../../../../components/taxonomies-select';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { useTaxonomies } from '../../../../../hooks';
import { ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function TaxonomyParameterControl( props ) {
	const { label, value, onChange } = props;
	const [ taxonomy, setTaxonomy ] = useState( value.taxonomy );
	const [ terms, setTerms ] = useState( value.terms );
	const [ includeChildren, setIncludeChildren ] = useState( false !== value.includeChildren );

	const taxonomies = useTaxonomies();

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

			onChange( { taxonomy, terms, rest, includeChildren } );
		}
	}, [ taxonomy, JSON.stringify( terms ), includeChildren ] );

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

			{ taxonomy &&
				<>
					<TaxonomiesSelect
						taxonomy={ taxonomy }
						value={ terms }
						filterName={ 'generateblocks.editor.taxonomy-parameter-control.' + props.id }
						onChange={ ( newValue ) => {
							const newTerms = newValue.reduce( ( result, option ) => {
								result.push( option.value );

								return result;
							}, [] );

							setTerms( newTerms );
						} }
						help={ terms.length === 0 ? __( 'You must select at least one term.', 'generateblocks' ) : '' }
					/>

					<ToggleControl
						checked={ includeChildren }
						label={ __( 'Include children', 'generateblocks' ) }
						help={ __( 'Whether to include children taxonomies', 'generateblocks' ) }
						onChange={ setIncludeChildren }
					/>
				</>
			}
		</>
	);
}
