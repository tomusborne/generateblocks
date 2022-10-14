import { BaseControl, ButtonGroup, Button, Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import flexOptions from '../options';
import './editor.scss';
import classnames from 'classnames';

export default ( props ) => {
	const {
		value,
		onChange,
		onReverse,
		label,
		directionValue,
	} = props;

	function ButtonElement( option ) {
		return (
			<Button
				isPrimary={ value.includes( option.value ) }
				onClick={ () => onChange( option.value ) }
			>
				{ option.icon || option.label }
			</Button>
		);
	}

	return (
		<BaseControl
			id={ 'flexDirection' }
			label={ label }
			className={ classnames( {
				[ `gblocks-flex-direction-flexDirection-${ directionValue }` ]: true,
			} ) }
		>
			<ButtonGroup id={ 'flexDirection' } className="gblocks-flex-button-group">
				{
					flexOptions.flexDirection.map( ( flexOption ) => {
						return (
							<>
								{ !! flexOption.icon
									? <Tooltip text={ flexOption.label } key={ flexOption.label }>
										{ ButtonElement( flexOption ) }
									</Tooltip>
									: ButtonElement( flexOption )
								}
							</>
						);
					} )
				}

				<Tooltip text={ __( 'Reverse', 'generateblocks' ) }>
					<Button
						isPrimary={ value.includes( 'reverse' ) }
						onClick={ () => onReverse( value ) }
					>
						{ ( value.includes( 'row' ) || '' === value )
							? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path d="m9 19 1.41-1.41L5.83 13H22v-2H5.83l4.59-4.59L9 5l-7 7 7 7z" /></svg>
							: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z" /><path d="m5 9 1.41 1.41L11 5.83V22h2V5.83l4.59 4.59L19 9l-7-7-7 7z" /></svg>
						}
					</Button>
				</Tooltip>
			</ButtonGroup>
		</BaseControl>
	);
};
