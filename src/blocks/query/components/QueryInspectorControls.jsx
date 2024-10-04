import { __ } from '@wordpress/i18n';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { ToggleControl } from '@wordpress/components';
import { applyFilters, doAction } from '@wordpress/hooks';

import { isEqual } from 'lodash';

import { SelectQueryParameter, AdvancedSelect, AddQueryParameterButton } from '@components';
import ParameterList from './ParameterList';
import useQueryReducer from '@hooks/useQueryReducer';
import queryParameterOptions from '../query-parameters';

export function QueryInspectorControls( { attributes, setAttributes } ) {
	const { queryState, setParameter, removeParameter } = useQueryReducer( attributes.query );
	const [ displayParameterSelect, setDisplayParameterSelect ] = useState( false );

	useEffect( () => {
		setAttributes( { query: queryState } );
	}, [ JSON.stringify( queryState ), ! isEqual( attributes.query, queryState ) ] );

	const parameterOptions = useMemo( () => (
		queryParameterOptions.map( ( parameter ) => {
			parameter.isDisabled = ! parameter.isRepeatable && Object.keys( queryState ).includes( parameter.id );

			return parameter;
		} )
	), [ queryState ] );

	const queryTypes = applyFilters(
		'generateblocks.editor.query.queryTypes',
		[
			{
				label: __( 'Post Query', 'generateblocks' ),
				value: 'WP_Query',
			},
		],
		attributes
	);

	const queryType = useMemo( () => {
		return queryTypes.find( ( option ) => option.value === attributes.queryType );
	}, [ queryTypes, attributes.queryType ] );

	return (
		<>
			<AdvancedSelect
				value={ queryType }
				options={ queryTypes }
				onChange={ ( { value } ) => setAttributes( { queryType: value } ) }
				label={ __( 'Query Type', 'generateblocks' ) }
			/>
			{ 'WP_Query' === attributes.queryType ? (
				<>
					<ToggleControl
						label={ __( 'Inherit query from template', 'generateblocks' ) }
						help={ __( 'Toggle to use the global query context that is set with the current template, such as an archive or search.', 'generateblocks' ) }
						checked={ !! attributes.inheritQuery }
						onChange={ ( value ) => setAttributes( { inheritQuery: value } ) }
					/>
					{ ! attributes.inheritQuery &&
						<>
							<ParameterList
								query={ queryState }
								setParameter={ setParameter }
								removeParameter={ removeParameter }
							/>

							{ ! displayParameterSelect &&
								<AddQueryParameterButton onClick={ () => {
									setDisplayParameterSelect( true );
								} } />
							}

							{ displayParameterSelect &&
								<SelectQueryParameter
									options={ parameterOptions }
									onChange={ ( option ) => {
										if (
											!! option.isRepeatable &&
											Array.isArray( option.default ) &&
											!! option.repeatableDefaultValue
										) {
											const parameterValue = !! queryState[ option.id ]
												? queryState[ option.id ]
												: option.default;

											setParameter( option.id, [ ...parameterValue, option.repeatableDefaultValue ] );
										} else {
											setParameter( option.id, option.default );
										}

										setDisplayParameterSelect( false );
									} }
								/>
							}
						</>
					}
				</>
			) : doAction( 'generateblocks.editor.query.queryType.inspectorControls', attributes.queryType, { attributes, setAttributes } ) }
			<ToggleControl
				checked={ !! attributes.instantPagination }
				label={ __( 'Instant pagination', 'generateblocks' ) }
				help={ __( 'Clicking pagination links will instantly load the next set of posts without reloading the page.', 'generateblocks' ) }
				onChange={ ( value ) => setAttributes( { instantPagination: value } ) }
			/>
		</>
	);
}
