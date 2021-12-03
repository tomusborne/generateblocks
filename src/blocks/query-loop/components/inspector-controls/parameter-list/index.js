import { __ } from '@wordpress/i18n';
import queryParameterOptions from '../../../query-parameters';
import ParameterControl from './ParameterControl';

const getParametersList = ( query ) => {
	return queryParameterOptions.filter( ( parameter ) => Object.keys( query ).includes( parameter.id ) );
};

export default ( { query, setParameter, removeParameter } ) => {
	const parameterList = getParametersList( query );

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
