import ControlBuilder from './ControlBuilder';

const attributeValueNormalizer = ( attribute, value ) => {
	switch ( attribute ) {
		case 'post_type':
		case 'order':
		case 'orderby':
			return value.value;

		case 'status':
		case 'author':
		case 'author_exclude':
		case 'include':
		case 'exclude':
		case 'parent':
		case 'parent_exclude':
			return value.reduce( ( result, option ) => {
				result.push( option.value );

				return result;
			}, [] );

		default:
			return value;
	}
};

export default ( { parameter, query, setParameter, removeParameter } ) => {
	const { dependencies = {} } = parameter;
	const parameterValue = query[ parameter.id ];

	function onChangeControl( newValue ) {
		setParameter( parameter.id, attributeValueNormalizer( parameter.id, newValue ) );
	}

	const dependenciesValues = Object.keys( dependencies ).reduce( ( dependenciesProps, dependencyKey ) => {
		dependenciesProps[ dependencyKey ] = query[ dependencies[ dependencyKey ] ];

		return dependenciesProps;
	}, {} );

	function ParameterControl( value, onChange, onClickRemove ) {
		return (
			<ControlBuilder
				{ ...parameter }
				value={ value }
				onChange={ onChange }
				onClickRemove={ onClickRemove }
				dependencies={ dependenciesValues }
			/>
		);
	}

	if ( ! parameter.isRepeatable ) {
		return ParameterControl( parameterValue, onChangeControl, removeParameter );
	}

	return (
		<>
			{ Array.isArray( parameterValue ) && parameterValue.map( ( value, idx ) => (
				ParameterControl( value, ( newValue ) => {
					parameterValue[ idx ] = newValue;
					setParameter( parameter.id, [ ...parameterValue ] );
				}, ( id ) => {
					parameterValue.splice( idx, 1 );

					if ( parameterValue.length === 0 ) {
						removeParameter( id );
					} else {
						setParameter( parameter.id, [ ...parameterValue ] );
					}
				} )
			) ) }
		</>
	);
};
