import { Button } from '@wordpress/components';
import { plus } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';

export function InsertPattern( { label, onClick, patterns, globalStyleData, className } ) {
	return applyFilters(
		'generateblocks.patterns.insertPatternButton',
		(
			<Button
				className={ className }
				variant="primary"
				icon={ plus }
				onClick={ onClick }
			>
				{ label }
			</Button>
		),
		{ label, onClick, patterns, globalStyleData }
	);
}
