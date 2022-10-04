import { SelectControl } from '@wordpress/components';
import getAttribute from '../../../../../utils/get-attribute';

export default ( props ) => {
	const {
		setAttributes,
		label,
		attributeName,
		options = [],
	} = props;

	return (
		<SelectControl
			label={ label }
			value={ getAttribute( attributeName, props ) }
			options={ options }
			onChange={ ( value ) => {
				setAttributes( {
					[ getAttribute( attributeName, props, true ) ]: value,
				} );
			} }
		/>
	);
};
