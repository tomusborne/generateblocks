import { Button, TextControl, BaseControl } from '@wordpress/components';
import { check, closeSmall, plus } from '@wordpress/icons';
import { v4 as uuidv4 } from 'uuid';
import { useState } from '@wordpress/element';
import './editor.scss';

const safeValues = [
	'title',
	'role',
	'download',
	'itemtype',
	'itemscope',
	'itemprop',
	'href',
	'style',
	'src',
	'height',
	'width',
];

function isAllowedName( attribute ) {
	return attribute.startsWith( 'data-' ) || attribute.startsWith( 'aria-' ) || safeValues.includes( attribute );
}

export function HtmlAttributes( { items, onAdd, onRemove, onChange } ) {
	const [ newAttributeName, setNewAttributeName ] = useState( '' );
	const [ newAttributeValue, setNewAttributeValue ] = useState( '' );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ editingItem, setEditingItem ] = useState( null );

	const handleAddItem = () => {
		if ( ! isAllowedName( newAttributeName ) ) {
			setErrorMessage( 'This attribute name is not allowed.' );
			return;
		}
		if ( ! newAttributeName ) {
			setErrorMessage( 'Attribute name is required.' );
			return;
		}
		onAdd( { ...items, [ newAttributeName ]: newAttributeValue } );
		setNewAttributeName( '' );
		setNewAttributeValue( '' );
		setErrorMessage( '' );
	};

	const handleRemoveItem = ( key ) => {
		const updatedItems = { ...items };
		delete updatedItems[ key ];
		onRemove( updatedItems );
	};

	const handleChangeItem = ( oldKey ) => {
		if ( ! isAllowedName( editingItem.key ) ) {
			setErrorMessage( 'This attribute name is not allowed.' );
			return;
		}
		if ( ! editingItem.key ) {
			setErrorMessage( 'Attribute name is required.' );
			return;
		}
		const updatedItems = { ...items };
		delete updatedItems[ oldKey ];
		updatedItems[ editingItem.key ] = editingItem.value;
		onChange( updatedItems );
		setEditingItem( null );
		setErrorMessage( '' );
	};

	return (
		<BaseControl label="HTML Attributes" id={ uuidv4() }>
			<div className="gb-html-attributes">
				{ Object.entries( items ).map( ( [ key, value ], index ) => (
					<div className="gb-html-attributes__item" key={ index }>
						<TextControl
							type="text"
							value={ editingItem && editingItem.oldKey === key ? editingItem.key : key }
							onChange={ ( newKey ) => setEditingItem( { oldKey: key, key: newKey, value } ) }
						/>
						<TextControl
							type="text"
							value={ editingItem && editingItem.oldKey === key ? editingItem.value : value }
							onChange={ ( newValue ) => setEditingItem( { oldKey: key, key, value: newValue } ) }
						/>
						{ editingItem && editingItem.oldKey === key ? (
							<Button
								onClick={ () => handleChangeItem( key ) }
								icon={ check }
								size="small"
								iconSize="20"
								variant="primary"
							/>
						) : (
							<Button
								onClick={ () => handleRemoveItem( key ) }
								icon={ closeSmall }
								size="small"
								iconSize="20"
								isDestructive
							/>
						) }
					</div>
				) ) }
				<div className="gb-html-attributes__item">
					<TextControl
						type="text"
						value={ newAttributeName }
						onChange={ ( newValue ) => setNewAttributeName( newValue ) }
					/>
					<TextControl
						type="text"
						value={ newAttributeValue }
						onChange={ ( newValue ) => setNewAttributeValue( newValue ) }
					/>
					<Button
						onClick={ handleAddItem }
						icon={ plus }
						size="small"
						iconSize="20"
						disabled={ ! newAttributeName }
						variant="primary"
					/>
				</div>
				{ errorMessage && <div className="error-message">{ errorMessage }</div> }
			</div>
		</BaseControl>
	);
}
