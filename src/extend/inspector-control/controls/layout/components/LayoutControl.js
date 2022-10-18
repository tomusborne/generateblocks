import { BaseControl, ButtonGroup, Button, Tooltip } from '@wordpress/components';
import flexOptions from '../options';
import './editor.scss';
import classnames from 'classnames';

export default ( props ) => {
	const {
		value,
		onChange,
		label,
		attributeName,
		directionValue,
	} = props;

	function ButtonElement( option ) {
		return (
			<Button
				isPrimary={ option.value === value }
				onClick={ () => onChange( option.value ) }
			>
				{ option.icon || option.label }
			</Button>
		);
	}

	return (
		<BaseControl
			id={ attributeName }
			label={ label }
			className={ classnames( {
				[ `gblocks-flex-direction-${ attributeName + '-' + directionValue }` ]: true,
			} ) }
		>
			<ButtonGroup id={ attributeName } className="gblocks-flex-button-group">
				{
					flexOptions[ attributeName ].map( ( flexOption ) => {
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
			</ButtonGroup>
		</BaseControl>
	);
};
