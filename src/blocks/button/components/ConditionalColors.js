import { __ } from '@wordpress/i18n';
import { addFilter, applyFilters } from '@wordpress/hooks';

function shouldShowCurrentColors( props ) {
	const {
		attributes,
	} = props;

	const {
		useDynamicData,
		dynamicContentType,
	} = attributes;

	return applyFilters(
		'generateblocks.editor.addButtonCurrentColors',
		useDynamicData && 'pagination-numbers' === dynamicContentType,
		props
	);
}

function AddColorItems( items, props ) {
	const {
		name,
	} = props;

	if ( 'generateblocks/button' !== name ) {
		return items;
	}

	const addCurrentColors = shouldShowCurrentColors( props );

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

function addBorderCurrent( context, props ) {
	const {
		name,
	} = props;

	if ( 'generateblocks/button' !== name ) {
		return context;
	}

	const addCurrentColors = shouldShowCurrentColors( props );

	if ( addCurrentColors ) {
		const existingColors = context.supports.borders.borderColors;

		if ( ! existingColors.some( ( e ) => 'Current' === e.state ) ) {
			context.supports.borders.borderColors.push( {
				state: 'Current',
				tooltip: __( 'Border Current', 'generateblocks' ),
				alpha: true,
			} );
		}
	}

	return context;
}

addFilter(
	'generateblocks.editor.blockContext',
	'generateblocks/button-context/add-current-border-color',
	addBorderCurrent
);
