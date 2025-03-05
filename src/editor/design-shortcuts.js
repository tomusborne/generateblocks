import { addFilter } from '@wordpress/hooks';
import { ColorShortcuts } from '@components/color-shortcuts/ColorShortcuts';

function DesignShortcuts( children, props ) {
	const {
		panelId = '',
		onStyleChange = () => null,
		getStyleValue = () => null,
		attributes = {},
		currentAtRule = '',
	} = props;

	if ( 'colors' !== panelId ) {
		return children;
	}

	return (
		<ColorShortcuts
			onStyleChange={ onStyleChange }
			getStyleValue={ getStyleValue }
			currentAtRule={ currentAtRule }
			attributes={ attributes }
		/>
	);
}

addFilter(
	'generateblocks.blockSettings.openPanel',
	'generateblocks/editor/design-shortcuts',
	DesignShortcuts
);
