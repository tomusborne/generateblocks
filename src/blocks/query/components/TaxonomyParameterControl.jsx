import { useEffect, useMemo, useState } from '@wordpress/element';
import { ToggleControl, ComboboxControl, CustomSelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { Stack } from '@edge22/components';

import { TaxonomiesSelect } from '@components';
import { useTaxonomies } from '@hooks';

export function TaxonomyParameterControl( props ) {
	const { label, placeholder, value, onChange, help } = props;
	const [ taxonomy, setTaxonomy ] = useState( value.taxonomy );
	const [ terms, setTerms ] = useState( value.terms );
	const [ includeChildren, setIncludeChildren ] = useState( false !== value.includeChildren );
	const [ operator, setOperator ] = useState( 'IN' );

	const taxonomies = useTaxonomies();

	const isHierarchical = useMemo( () => {
		const tax = taxonomies.filter( ( record ) => ( record.slug === taxonomy ) );

		return !! tax[ 0 ] ? tax[ 0 ].hierarchical : false;
	}, [ JSON.stringify( taxonomies ), taxonomy ] );

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
			const hierarchical = !! tax[ 0 ] ? tax[ 0 ].hierarchical : false;

			onChange( {
				taxonomy,
				terms,
				rest,
				includeChildren: hierarchical ? includeChildren : undefined,
			} );
		}
	}, [ taxonomy, JSON.stringify( terms ), includeChildren ] );

	const taxonomiesOptions = useMemo( () => (
		taxonomies
			.filter( ( tax ) => ( 'nav_menu' !== tax.slug ) )
			.map( ( tax ) => ( { value: tax.slug, label: tax.name } ) )
	), [ JSON.stringify( taxonomies ) ] );

	return (
		<Stack gap="12px">
			<ComboboxControl
				label={ label }
				placeholder={ placeholder || __( 'Select taxonomy', 'generateblocks' ) }
				options={ taxonomiesOptions }
				value={ taxonomy }
				onChange={ ( newValue ) => {
					setTaxonomy( newValue );
					setTerms( [] );
				} }
			/>

			{ taxonomy &&
				<>
					<TaxonomiesSelect
						taxonomy={ taxonomy }
						value={ terms }
						filterName={ 'generateblocks.editor.taxonomy-parameter-control.' + props.id }
						placeholder={ placeholder || __( 'Search terms…', 'generateblocks' ) }
						onChange={ ( newValue ) => {
							const newTerms = newValue.reduce( ( result, option ) => {
								result.push( option.value );

								return result;
							}, [] );

							setTerms( newTerms );
						} }
						help={ terms.length === 0 ? __( 'You must select at least one term. Search by name or ID.', 'generateblocks' ) : help }
					/>
					<ComboboxControl
						label={ __( 'Include or exclude', 'generateblocks' ) }
						value={ operator }
						options={ [
							{
								value: 'IN',
								label: __( 'Include', 'generateblocks' ),
							},
							{
								value: 'NOT IN',
								label: __( 'Exclude', 'generateblocks' ),
							},
						] }
						onChange={ setOperator }
						help={ __( 'Choose to include or exclude the selected taxonomy terms' ) }
					/>
					{ isHierarchical &&
						<ToggleControl
							checked={ includeChildren }
							label={ __( 'Include child terms', 'generateblocks' ) }
							onChange={ setIncludeChildren }
						/>
					}
				</>
			}
		</Stack>
	);
}
