import { InspectorControls, store } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import PanelArea from '../../../components/panel-area';
import { useEffect, useMemo, useState } from '@wordpress/element';
import SelectQueryParameter from './inspector-controls/SelectQueryParameter';
import AddQueryParameterButton from './inspector-controls/AddQueryParameterButton';
import ParameterList from './inspector-controls/parameter-list';
import useQueryReducer from '../hooks/useQueryReducer';
import isEmpty from '../../../utils/object-is-empty';
import postTypeParameterOptions from '../post-type-parameters-options';
import taxonomyParameterOptions from '../taxonomy-parameters-options';
import QueryTypeSelect from './inspector-controls/QueryTypeSelect';

function getQueryTypeDefaultParams( type ) {
	switch ( type ) {
		case 'taxonomy':
			return {
				'taxonomy': 'category',
				'per_page': 10,
			};

		default:
			return {
				'post_type': 'post',
				'per_page': 10,
			};
	}
}

export function getParameterOptions( type ) {
	switch ( type ) {
		case 'taxonomy':
			return taxonomyParameterOptions;

		default:
			return postTypeParameterOptions;
	}
}

export default ( { attributes, setAttributes } ) => {
	const {
		queryState,
		insertParameters,
		setParameter,
		removeParameter,
		resetParameters,
	} = useQueryReducer();
	const [ displayParameterSelect, setDisplayParameterSelect ] = useState( false );
	const [ queryType, setQueryType ] = useState( attributes.queryType );

	useEffect( () => {
		setQueryType( attributes.queryType || 'postType' );

		if ( ! isEmpty( attributes.query ) ) {
			insertParameters( attributes.query );
		}
	}, [] );

	useEffect( () => {
		if ( attributes.queryType !== queryType ) {
			setAttributes( { queryType } );
			resetParameters();
			insertParameters( getQueryTypeDefaultParams( queryType ) );
		}
	}, [ queryType ] );

	useEffect( () => {
		setAttributes( { queryType, query: queryState } );
	}, [ queryState ] );

	const parameterOptions = useMemo( () => (
		getParameterOptions( queryType ).map( ( parameter ) => {
			parameter.isDisabled = ! parameter.isRepeatable && Object.keys( queryState ).includes( parameter.id );

			return parameter;
		} )
	), [ queryState ] );

	return (
		<InspectorControls>
			<PanelArea
				id={ 'queryLoopControls' }
				title={ __( 'Query loop', 'generateblocks' ) }
				initialOpen={ true }
			>
				<QueryTypeSelect
					value={ queryType }
					onChange={ ( option ) => setQueryType( option.value ) }
				/>

				<ParameterList
					queryType={ queryType }
					query={ queryState }
					setParameter={ setParameter }
					removeParameter={ removeParameter }
				/>

				<AddQueryParameterButton onClick={ () => {
					setDisplayParameterSelect( true );
				} } />

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
			</PanelArea>
		</InspectorControls>
	);
};
