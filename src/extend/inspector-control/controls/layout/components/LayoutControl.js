import { BaseControl, ButtonGroup, Button, Tooltip } from '@wordpress/components';
import getAttribute from '../../../../../utils/get-attribute';
import flexOptions from '../options';
import './editor.scss';

export default ( props ) => {
	const {
		setAttributes,
		label,
		attributeName,
		deviceType,
		attributes,
	} = props;

	const {
		flexDirection,
		flexDirectionTablet,
		flexDirectionMobile,
	} = attributes;

	function attributeHasColumn( attribute ) {
		return attribute.includes( 'column' );
	}

	function isColumn() {
		if ( 'alignItems' === attributeName || 'justifyContent' === attributeName ) {
			if ( 'Desktop' === deviceType ) {
				return attributeHasColumn( flexDirection );
			}

			if ( 'Tablet' === deviceType ) {
				return attributeHasColumn( flexDirectionTablet ) || ( '' === flexDirectionTablet && attributeHasColumn( flexDirection ) );
			}

			if ( 'Mobile' === deviceType ) {
				return attributeHasColumn( flexDirectionMobile ) ||
				(
					'' === flexDirectionMobile &&
					attributeHasColumn( flexDirectionTablet )
				) ||
				(
					'' === flexDirectionTablet &&
					attributeHasColumn( flexDirection )
				);
			}
		}
	}

	return (
		<BaseControl
			id={ attributeName }
			label={ label }
			className={ isColumn() ? 'gblocks-is-column-direction-' + attributeName : '' }
		>
			<ButtonGroup id={ attributeName } className="gblocks-flex-button-group">
				{
					flexOptions[ attributeName ].map( ( flexOption ) => {
						return (
							<Tooltip text={ flexOption.label } key={ flexOption.label }>
								<Button
									isPrimary={ flexOption.value === getAttribute( attributeName, props ) }
									onClick={ () => setAttributes( {
										[ getAttribute( attributeName, props, true ) ]: flexOption.value !== getAttribute( attributeName, props ) ? flexOption.value : '',
									} ) }
								>
									{ flexOption.icon }
								</Button>
							</Tooltip>
						);
					} )
				}
			</ButtonGroup>
		</BaseControl>
	);
};
