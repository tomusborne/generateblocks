import { BaseControl, ButtonGroup, Button, Tooltip } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { flexOptions } from '../options';
import './editor.scss';
import classnames from 'classnames';

export default ( props ) => {
	const {
		value,
		onChange,
		label,
		attributeName,
		directionValue,
		fallback,
	} = props;

	function ButtonElement( option ) {
		return (
			<Button
				isPrimary={ option.value === value }
				className={ ! value && fallback === option.value ? 'is-inherited' : '' }
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
					flexOptions[ attributeName ].map( ( flexOption, index ) => {
						return (
							<Fragment key={ attributeName + index }>
								{ !! flexOption.icon
									? <Tooltip text={ flexOption.label || flexOption.value }>
										{ ButtonElement( flexOption ) }
									</Tooltip>
									: ButtonElement( flexOption )
								}
							</Fragment>
						);
					} )
				}
			</ButtonGroup>
		</BaseControl>
	);
};
