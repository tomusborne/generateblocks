import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { ToggleControl, SelectControl } from '@wordpress/components';
import { isEqual } from 'lodash';

import PanelArea from '../../../components/panel-area';
import SelectQueryParameter from './inspector-controls/SelectQueryParameter';
import AddQueryParameterButton from './inspector-controls/AddQueryParameterButton';
import ParameterList from './inspector-controls/parameter-list';
import useQueryReducer from '../hooks/useQueryReducer';
import isEmpty from '../../../utils/object-is-empty';
import queryParameterOptions from '../query-parameters';
import getIcon from '../../../utils/get-icon';

export default ( { attributes, setAttributes } ) => {
	const { queryState, insertParameters, setParameter, removeParameter } = useQueryReducer( attributes.query );
	const [ displayParameterSelect, setDisplayParameterSelect ] = useState( false );

	useEffect( () => {
		if ( isEmpty( attributes.query ) ) {
			insertParameters( {
				post_type: 'post',
				per_page: 10,
			} );
		}
	}, [] );

	useEffect( () => {
		setAttributes( { query: queryState } );
	}, [ JSON.stringify( queryState ), ! isEqual( attributes.query, queryState ) ] );

	const parameterOptions = useMemo( () => (
		queryParameterOptions.map( ( parameter ) => {
			parameter.isDisabled = ! parameter.isRepeatable && Object.keys( queryState ).includes( parameter.id );

			return parameter;
		} )
	), [ queryState ] );

	return (
		<InspectorControls>
			<PanelArea
				id={ 'queryLoopControls' }
				title={ __( 'Query Parameters', 'generateblocks' ) }
				initialOpen={ true }
				icon={ getIcon( 'query-params' ) }
				className="gblocks-panel-label"
			>
				<SelectControl
					value={ attributes.queryType }
					onChange={ ( value ) => setAttributes( { queryType: value } ) }
					label={ __( 'Query Type', 'generateblocks' ) }
					options={ [
						{ value: 'WP_Query', label: __( 'WP Query', 'generateblocks' ) },
						{ value: 'acf', label: __( 'ACF', 'generateblocks' ) },
					] }
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
				<ToggleControl
					checked={ !! attributes.forceReload }
					label={ __( 'Force page reload', 'generateblocks' ) }
					help={
						!! attributes.forceReload
							? __(
								'Clicking pagination links will reload the page.',
								'generateblocks'
							)
							: __(
								"Clicking pagination links won't require a page reload unless incompatible blocks are present.",
								'generateblocks'
							)
					}
					onChange={ ( value ) => setAttributes( { forceReload: value } ) }
				/>
			</PanelArea>
		</InspectorControls>
	);
};
