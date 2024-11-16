import { useCallback } from '@wordpress/element';

import { ControlBuilder } from './ControlBuilder';

function attributeValueNormalizer( attribute, value ) {
	switch ( attribute ) {
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
}

export function ParameterControl( { parameter, query, setParameter, removeParameter } ) {
	const { dependencies = {} } = parameter;
	const parameterValue = query[ parameter.id ];
	const postType = query?.post_type ?? 'post';

	const onChangeControl = useCallback( function onChangeControl( newValue ) {
		setParameter( parameter.id, attributeValueNormalizer( parameter.id, newValue ) );
	}, [ setParameter ] );

	const dependenciesValues = Object.keys( dependencies ).reduce( ( dependenciesProps, dependencyKey ) => {
		dependenciesProps[ dependencyKey ] = query[ dependencies[ dependencyKey ] ] || dependencies[ dependencyKey ];

		return dependenciesProps;
	}, {} );

	if ( ! parameter.isRepeatable ) {
		return (
			<ControlBuilder
				{ ...parameter }
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
