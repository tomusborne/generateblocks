import { useCallback } from '@wordpress/element';

import { ControlBuilder } from './ControlBuilder';

export function ParameterControl( { parameter, query, setParameter, removeParameter, queryClient } ) {
	const { dependencies = {} } = parameter;
	const parameterValue = query[ parameter.id ];
	const postType = query?.post_type ?? [ 'post' ];

	const onChangeControl = useCallback( function onChangeControl( newValue ) {
		setParameter( parameter.id, newValue );
	}, [ setParameter, parameter.id ] );

	const dependenciesValues = Object.keys( dependencies ).reduce( ( dependenciesProps, dependencyKey ) => {
		dependenciesProps[ dependencyKey ] = query[ dependencies[ dependencyKey ] ] || dependencies[ dependencyKey ];

		return dependenciesProps;
	}, {} );

	if ( ! parameter.isRepeatable ) {
		return (
			<ControlBuilder
				{ ...parameter }
				queryClient={ queryClient }
				postType={ postType }
				value={ parameterValue }
				onChange={ onChangeControl }
				onClickRemove={ removeParameter }
				dependencies={ dependenciesValues }
			/>
		);
	}

	return (
		Array.isArray( parameterValue ) && parameterValue.map( ( value, i ) => (
			<ControlBuilder
				{ ...parameter }
				queryClient={ queryClient }
				key={ `${ parameter.id }-${ i }` }
				postType={ postType }
				value={ value }
				onClickRemove={ ( id ) => {
					parameterValue.splice( i, 1 );

					if ( parameterValue.length === 0 ) {
						removeParameter( id );
					} else {
						setParameter( parameter.id, [ ...parameterValue ] );
					}
				} }
				onChange={ ( newValue ) => {
					parameterValue[ i ] = newValue;
					setParameter( parameter.id, [ ...parameterValue ] );
				} }
				dependencies={ dependenciesValues }
			/>
		) )
	);
}
