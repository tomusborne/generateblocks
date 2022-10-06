import { BaseControl, ButtonGroup, Button, Tooltip } from '@wordpress/components';
import getAttribute from '../../../../../utils/get-attribute';
import getResponsivePlaceholder from '../../../../../utils/get-responsive-placeholder';
import flexOptions from '../options';
import './editor.scss';
import classnames from 'classnames';

export default ( props ) => {
	const {
		setAttributes,
		label,
		attributeName,
		deviceType,
		attributes,
	} = props;

	const directionValue = getResponsivePlaceholder( 'flexDirection', attributes, deviceType, 'row' );

	function ButtonElement( option ) {
		return (
			<Button
				isPrimary={ option.value === getAttribute( attributeName, props ) }
				onClick={ () => setAttributes( {
					[ getAttribute( attributeName, props, true ) ]: option.value !== getAttribute( attributeName, props ) ? option.value : '',
				} ) }
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
