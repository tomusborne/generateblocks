import queryParameterOptions from '../../../query-parameters';
import ParameterControl from './ParameterControl';

const getParametersList = ( query ) => {
	return queryParameterOptions.filter( ( parameter ) => Object.keys( query ).includes( parameter.id ) );
};

export default ( { query, setParameter, removeParameter } ) => {
	const parameterList = getParametersList( query );

	return (
		<>
			<div style={ { marginBottom: '1.33em' } }>
				{ parameterList && parameterList.map( ( parameter ) => (
					<ParameterControl
						key={ parameter.id }
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
