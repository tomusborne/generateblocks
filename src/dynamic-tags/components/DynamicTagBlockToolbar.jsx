import { ToolbarGroup } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
import { DynamicTagModal } from '../index.js';

export function DynamicTagBlockToolbar( { onInsert, tooltip, renderToggle = false } ) {
	return (
		<BlockControls>
			<ToolbarGroup>
				<DynamicTagModal
					onInsert={ onInsert }
					tooltip={ tooltip }
					renderToggle={ renderToggle }
				/>
			</ToolbarGroup>
		</BlockControls>

	);
}
