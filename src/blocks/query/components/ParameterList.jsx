import { Stack } from '@edge22/components';

import queryParameterOptions from '../query-parameters';
import { ParameterControl } from './ParameterControl';

const getParametersList = ( query ) => {
	const options = queryParameterOptions.filter( ( param ) => param.isSticky );

	return options.concat( Object.keys( query ).map( ( id ) => (
		queryParameterOptions.find( ( param ) => ( id === param.id && ! param.isSticky ) )
	) ).filter( Boolean ) );
};

export function ParameterList( { query, setParameter, removeParameter } ) {
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
				/>
			) ) }
		</Stack>
	);
}
