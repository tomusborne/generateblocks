import { Stack } from '@edge22/components';

import { getParameters } from '../query-parameters';
import { ParameterControl } from './ParameterControl';

const getParametersList = ( query ) => {
	const allOptions = getParameters();
	const options = allOptions.filter( ( param ) => param.isSticky );

	return options.concat( Object.keys( query ).map( ( id ) => (
		allOptions.find( ( param ) => ( id === param.id && ! param.isSticky ) )
	) ).filter( Boolean ) );
};

export function ParameterList( { query, setParameter, removeParameter, queryClient } ) {
	const parameterList = getParametersList( query );

	return (
		<Stack gap="24px">
			{ parameterList && parameterList.map( ( parameter, i ) => (
				<ParameterControl
					key={ `${ parameter.id }-${ i }` }
					parameter={ parameter }
					query={ query }
					setParameter={ setParameter }
					removeParameter={ removeParameter }
					queryClient={ queryClient }
				/>
			) ) }
		</Stack>
	);
}
