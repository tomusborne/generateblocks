import { __ } from '@wordpress/i18n';
import { addFilter, applyFilters } from '@wordpress/hooks';

function AddColorItems( items, props ) {
	const {
		name,
		attributes,
	} = props;

	const {
		useDynamicData,
		dynamicContentType,
	} = attributes;

	const addCurrentColors = applyFilters(
		'generateblocks.editor.addButtonCurrentColors',
		'generateblocks/button' === name && useDynamicData && 'pagination-numbers' === dynamicContentType,
		props
	);

	if ( addCurrentColors ) {
		const newItems = [
			{
				group: 'background',
				attribute: 'backgroundColorCurrent',
				tooltip: __( 'Current', 'generateblocks' ),
				alpha: true,
			},
			{
				group: 'text',
				attribute: 'textColorCurrent',
				tooltip: __( 'Current', 'generateblocks' ),
				alpha: false,
			},
			{
				group: 'border',
				attribute: 'borderColorCurrent',
				tooltip: __( 'Current', 'generateblocks' ),
				alpha: true,
			},
		];

		items.forEach( ( colorItem, index ) => {
			newItems.forEach( ( newColorItem ) => {
				if (
					newColorItem.group === colorItem.group &&
					! colorItem.items.some( ( item ) => item.attribute === newColorItem.attribute )
				) {
					items[ index ].items.push(
						{
							tooltip: newColorItem.tooltip,
							attribute: newColorItem.attribute,
							alpha: newColorItem.alpha,
						}
					);
				}
			} );
		} );
	}

	return items;
}

addFilter(
	'generateblocks.editor.colorGroupItems',
	'generateblocks/button-colors/add-conditional-color-items',
	AddColorItems
);
