import { __ } from '@wordpress/i18n';
import ParameterControl from './ParameterControl';
import { getParameterOptions } from '../../InspectorControls';

const getParametersList = ( type, query ) => {
	return getParameterOptions( type ).filter( ( parameter ) => Object.keys( query ).includes( parameter.id ) );
};

export default ( { queryType, query, setParameter, removeParameter } ) => {
	const parameterList = getParametersList( queryType, query );

	return (
		<>
			<h4>{ __( 'Active parameters', 'generateblocks' ) }</h4>
			<div style={ { marginBottom: '1.33em' } }>
				{ parameterList && parameterList.map( ( parameter ) => (
					<ParameterControl
						parameter={ parameter }
						query={ query }
						setParameter={ setParameter }
						removeParameter={ removeParameter }
					/>
				) ) }
			</div>
		</>
	);
};
