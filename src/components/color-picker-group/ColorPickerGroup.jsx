import { BaseControl } from '@wordpress/components';
import { v4 as uuidv4 } from 'uuid';
import './editor.scss';

export function ColorPickerGroup( { children, label } ) {
	return (
		<BaseControl
			label={ label }
			id={ uuidv4() }
			className="gb-color-picker-group"
		>
			{ children }
		</BaseControl>
	);
}
