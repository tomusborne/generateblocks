import { Button, TextControl, BaseControl } from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';
import './editor.scss';

function sanitizeAttribute( attribute ) {
	const safeValues = [
		'title',
		'role',
		'download',
		'itemtype',
		'itemscope',
		'itemprop',
		'href',
		'style',
	];

	let isValueSafe = false;

	if ( attribute.startsWith( 'data-' ) ) {
		isValueSafe = true;
	}

	if ( attribute.startsWith( 'aria-' ) ) {
		isValueSafe = true;
	}

	if ( safeValues.includes( attribute ) ) {
		isValueSafe = true;
	}

	if ( ! isValueSafe ) {
		attribute = '';
	}

	return attribute;
}

export function HtmlAttributes( { items, onAdd, onRemove, onChange } ) {
	function onAddItem( key, value ) {
		const htmlAttributes = [ ...items ];
		htmlAttributes.push( { key, value } );
		onAdd( htmlAttributes );
	}

	function onRemoveItem( index ) {
		const htmlAttributes = [ ...items ];
		htmlAttributes.splice( index, 1 );
		onRemove( htmlAttributes );
	}

	function onChangeItem( value, index, type ) {
		const htmlAttributes = [ ...items ];

		if ( 'key' === type ) {
			htmlAttributes[ index ] = { key: value, value: htmlAttributes[ index ].value };
		}

		if ( 'value' === type ) {
			htmlAttributes[ index ] = { key: htmlAttributes[ index ].key, value };
		}

		onChange( htmlAttributes );
	}

	return (
		<>
			<BaseControl
				label="HTML Attributes"
				id="" // haha
			>
				<div className="gb-html-attributes">
					{ items.map( ( item, index ) => (
						<div className="gb-html-attributes__item" key={ index }>
							<TextControl
								type="text"
								value={ item.key }
								onChange={ ( value ) => onChangeItem( value, index, 'key' ) }
								onBlur={ () => onChangeItem( sanitizeAttribute( item.key ), index, 'key' ) }
							/>
							<TextControl
								type="text"
								value={ item.value }
								onChange={ ( value ) => onChangeItem( value, index, 'value' ) }
							/>
							<Button
								onClick={ () => onRemoveItem( index ) }
								icon={ closeSmall }
								size="small"
								iconSize="20"
								isDestructive
							/>
						</div>
					) ) }
				</div>
				<Button
					onClick={ () => onAddItem( '', '' ) }
					variant="secondary"
					size="compact"
				>
					Add Item
				</Button>
			</BaseControl>
		</>
	);
}
