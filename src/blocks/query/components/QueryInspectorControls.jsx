import { __ } from '@wordpress/i18n';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { ToggleControl, SelectControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

import { isEqual } from 'lodash';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

import useQueryReducer from '@hooks/useQueryReducer';
import { SelectQueryParameter } from './SelectQueryParameter';
import { AddQueryParameterButton } from './AddQueryParameterButton';
import { ParameterList } from './ParameterList';
import { getParameters } from '../query-parameters';

const queryClient = new QueryClient();

export function QueryInspectorControls( { attributes, setAttributes, context } ) {
	const { queryState, setParameter, removeParameter } = useQueryReducer( attributes.query );
	const [ displayParameterSelect, setDisplayParameterSelect ] = useState( false );

	useEffect( () => {
		setAttributes( { query: queryState } );
	}, [ JSON.stringify( queryState ), ! isEqual( attributes.query, queryState ) ] );

	const parameterOptions = useMemo( () => (
		getParameters().map( ( parameter ) => {
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
				help: __( 'Standard WP_Query for posts and pages.', 'generateblocks' ),
			},
		],
		attributes
	);

	const selectedQueryType = useMemo( () => {
		return queryTypes.find( ( option ) => option.value === attributes.queryType );
	}, [ queryTypes, attributes.queryType ] );

	return (
		<QueryClientProvider client={ queryClient }>
			{ queryTypes.length > 1 && (
				<SelectControl
					value={ attributes.queryType }
					options={ queryTypes }
					onChange={ ( value ) => setAttributes( { queryType: value, queryData: [], query: [] } ) }
					label={ __( 'Query Type', 'generateblocks' ) }
					help={ selectedQueryType?.help }
				/>
			) }

			<SelectControl
				label={ __( 'Pagination type', 'generateblocks' ) }
				value={ attributes.paginationType }
				options={ [
					{
						label: __( 'Standard', 'generateblocks' ),
						value: 'standard',
					},
					{
						label: __( 'Instant', 'generateblocks' ),
						value: 'instant',
					},
				] }
				onChange={ ( value ) => setAttributes( { paginationType: value } ) }
			/>
			{ 'WP_Query' === attributes.queryType && (
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
								queryClient={ queryClient }
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
			) }
			{
				applyFilters(
					'generateblocks.editor.query.inspectorControls',
					null,
					{
						queryType: attributes.queryType,
						attributes,
						setAttributes,
						queryState,
						setParameter,
						removeParameter,
						context,
						queryClient,
					}
				)
			}
		</QueryClientProvider>
	);
}
