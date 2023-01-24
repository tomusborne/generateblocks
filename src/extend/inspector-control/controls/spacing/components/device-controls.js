import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../../block-context';
import InlineWidth from './inline-width';
import StackVertically from './stack-vertically';
import FillHorizontalSpace from './fill-horizontal-space';

export default function DeviceControls( props ) {
	const { supports: { spacing } } = useContext( ControlsContext );
	const {
		inlineWidth,
		onChangeInlineWidth,
		stack,
		onChangeStack,
		fill,
		onFillChange,
	} = props;

	return (
		<>
			{ spacing.inlineWidth && <InlineWidth checked={ inlineWidth } onChange={ onChangeInlineWidth } /> }
			{ spacing.stackVertically && <StackVertically checked={ stack } onChange={ onChangeStack } /> }
			{ spacing.fillHorizontalSpace && <FillHorizontalSpace checked={ fill } onChange={ onFillChange } /> }
		</>
	);
}
