import { Button, TextControl, BaseControl } from '@wordpress/components';
import { closeSmall, plus } from '@wordpress/icons';
import { v4 as uuidv4 } from 'uuid';
import { useState } from '@wordpress/element';
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
	const [ attributeName, setAttributeName ] = useState( '' );
	const [ attributeValue, setAttributeValue ] = useState( '' );
	const [ hasChanged, setHasChanged ] = useState( false );

	function onAddItem( key, value ) {
		const htmlAttributes = { ...items };
		htmlAttributes[ key ] = value;
		onAdd( htmlAttributes );
	}

	function onRemoveItem( key ) {
		const htmlAttributes = { ...items };
		delete htmlAttributes[ key ];
		onRemove( htmlAttributes );
	}

	function onChangeItem( value, key, type ) {
		const htmlAttributes = { ...items };

		if ( 'key' === type ) {
			const oldKey = key;
			const existingValue = htmlAttributes[ oldKey ];
			delete htmlAttributes[ oldKey ];
			htmlAttributes[ value ] = existingValue;
		}

		if ( 'value' === type ) {
			htmlAttributes[ key ] = value;
		}

		onChange( htmlAttributes );
	}

	return (
		<>
			<BaseControl
				label="HTML Attributes"
				id={ uuidv4() }
			>
				<div className="gb-html-attributes">
					{ Object.entries( items ).map( ( [ key, value ], index ) => (
						<div className="gb-html-attributes__item" key={ index }>
							<TextControl
								type="text"
								value={ key }
								onChange={ ( newValue ) => {
									onChangeItem( newValue, key, 'key' );
									setHasChanged( true );
								} }
							/>

							<TextControl
								type="text"
								value={ value }
								onChange={ ( newValue ) => {
									onChangeItem( newValue, key, 'value' );
									setHasChanged( true );
								} }
							/>

							<Button
								onClick={ () => onRemoveItem( key ) }
								icon={ closeSmall }
								size="small"
								iconSize="20"
								isDestructive
							/>
						</div>
					) ) }
					<div className="gb-html-attributes__item">
						<TextControl
							type="text"
							value={ attributeName }
							onChange={ ( newValue ) => setAttributeName( newValue ) }
						/>

						<TextControl
							type="text"
							value={ attributeValue }
							onChange={ ( newValue ) => setAttributeValue( newValue ) }
						/>

						<Button
							onClick={ () => {
								onAddItem( attributeName, attributeValue );
								setAttributeName( '' );
								setAttributeValue( '' );
							} }
							icon={ plus }
							size="small"
							iconSize="20"
							disabled={ ! attributeName }
							variant="primary"
						/>
					</div>
				</div>
			</BaseControl>
		</>
	);
}
