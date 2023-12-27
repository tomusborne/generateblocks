/**
 * WordPress dependencies
 */
import {
	applyFilters,
	doAction,
} from '@wordpress/hooks';

export default function ApplyFilters( props ) {
	const { name, children } = props;
	doAction( 'generateblocks.editor.panel.beforeFilters', props );

	return (
		applyFilters(
			name,
			children || '',
			props,
		)
	);
}

