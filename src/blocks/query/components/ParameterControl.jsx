import { ControlBuilder } from './ControlBuilder';

const attributeValueNormalizer = ( attribute, value ) => {
	switch ( attribute ) {
		case 'post_type':
		case 'order':
		case 'orderby':
		case 'stickyPosts':
			return value.value;

		case 'post_status':
		case 'author__in':
		case 'author__not_in':
		case 'post__in':
		case 'post__not_in':
		case 'post_parent__in':
		case 'post_parent__not_in':
			return value.reduce( ( result, option ) => {
				result.push( option.value );

				return result;
			}, [] );

		default:
			return value;
	}
};

export function ParameterControl( { parameter, query, setParameter, removeParameter } ) {
	const { dependencies = {} } = parameter;
	const parameterValue = query[ parameter.id ];

	function onChangeControl( newValue ) {
		setParameter( parameter.id, attributeValueNormalizer( parameter.id, newValue ) );
	}

	const dependenciesValues = Object.keys( dependencies ).reduce( ( dependenciesProps, dependencyKey ) => {
		dependenciesProps[ dependencyKey ] = query[ dependencies[ dependencyKey ] ] || dependencies[ dependencyKey ];

		return dependenciesProps;
	}, {} );

	function BuiltControl( value, onChange, onClickRemove ) {
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
		return BuiltControl( parameterValue, onChangeControl, removeParameter );
	}

	return (
		<>
			{ Array.isArray( parameterValue ) && parameterValue.map( ( value, idx ) => (
				BuiltControl( value, ( newValue ) => {
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
}
