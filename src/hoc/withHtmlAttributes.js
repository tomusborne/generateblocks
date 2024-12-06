import { useEffect, useMemo, useState } from '@wordpress/element';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';

import { useUpdateEffect } from 'react-use';

import { convertInlineStyleStringToObject } from '@utils/convertInlineStyleStringToObject';
import { replaceTags } from '../dynamic-tags/utils';

export const booleanAttributes = [
	'allowfullscreen',
	'async',
	'autofocus',
	'autoplay',
	'checked',
	'controls',
	'default',
	'defer',
	'disabled',
	'formnovalidate',
	'hidden',
	'ismap',
	'itemscope',
	'loop',
	'multiple',
	'muted',
	'nomodule',
	'novalidate',
	'open',
	'readonly',
	'required',
	'reversed',
	'selected',
];

function shallowEqual( obj1, obj2 ) {
	if ( obj1 === obj2 ) {
		return true;
	}

	if ( ! obj1 || ! obj2 ) {
		return false;
	}

	const keys1 = Object.keys( obj1 );
	const keys2 = Object.keys( obj2 );

	if ( keys1.length !== keys2.length ) {
		return false;
	}

	for ( const key of keys1 ) {
		if ( obj1[ key ] !== obj2[ key ] ) {
			return false;
		}
	}

	return true;
}

export function withHtmlAttributes( WrappedComponent ) {
	return ( ( props ) => {
		const {
			attributes,
			setAttributes,
			context,
		} = props;

		const {
			htmlAttributes = {},
			uniqueId,
			className,
			align,
		} = attributes;

		const [ styleWithReplacements, setStyleWithReplacements ] = useState( '' );
		const { style = '', href, ...otherAttributes } = htmlAttributes;

		useEffect( () => {
			async function getReplacements() {
			// Check if any replacements need to be made if not, do nothing.
				if ( ! style.includes( '{{' ) ) {
					setStyleWithReplacements( style );
					return;
				}

				const replacements = await replaceTags( style, context );

				if ( ! replacements.length ) {
					setStyleWithReplacements( style );
					return;
				}

				const withReplacements = replacements.reduce( ( acc, { original, replacement, fallback } ) => {
					if ( ! replacement ) {
						return acc.replaceAll( original, fallback );
					}

					return acc.replaceAll( original, replacement );
				}, style );

				setStyleWithReplacements( withReplacements ? withReplacements : style );
			}

			getReplacements();
		}, [ style, context ] );

		useUpdateEffect( () => {
			const layoutClasses = [ 'alignwide', 'alignfull' ];
			const existingClasses = className?.split( ' ' ) || [];
			const newClasses = existingClasses.filter(
				( existingClass ) => ! layoutClasses.includes( existingClass )
			);

			if ( align ) {
				newClasses.push( 'align' + align );
			}

			setAttributes( { className: newClasses.join( ' ' ) } );
		}, [ align ] );

		const inlineStyleObject = typeof styleWithReplacements === 'string'
			? convertInlineStyleStringToObject( styleWithReplacements )
			: '';
		const combinedAttributes = {
			...otherAttributes,
			style: inlineStyleObject,
			'data-gb-id': uniqueId,
			'data-context-post-id': context?.postId ?? context?.[ 'generateblocks/loopIndex' ] ?? 0,
			'data-align': align,
		};

		const frontendHtmlAttributes = useMemo( () => {
			if ( Array.isArray( htmlAttributes ) ) {
				return {};
			}

			return htmlAttributes;
		}, [ JSON.stringify( htmlAttributes ) ] );

		useEffect( () => {
			// Create a shallow copy of the htmlAttributes object.
			const updatedHtmlAttributes = { ...htmlAttributes };

			// Loop through the htmlAttributes object and delete those with invalid values.
			Object.keys( updatedHtmlAttributes ).forEach( ( key ) => {
				const value = updatedHtmlAttributes[ key ];

				// Remove non-boolean attributes if they have empty values.
				if ( ! booleanAttributes.includes( key ) && '' === value ) {
					delete updatedHtmlAttributes[ key ];
				}

				// Remove any values that are not a simple string.
				if ( 'string' !== typeof value && 'boolean' !== typeof value ) {
					delete updatedHtmlAttributes[ key ];
				}

				// We add the `class` attribute elsewhere.
				if ( 'class' === key ) {
					delete updatedHtmlAttributes[ key ];
				}
			} );

			// Update the block's htmlAttributes if there are changes
			if ( ! shallowEqual( updatedHtmlAttributes, htmlAttributes ) ) {
				setAttributes( { htmlAttributes: updatedHtmlAttributes } );
			}
		}, [ JSON.stringify( htmlAttributes ) ] );

		return (
			<>
				<WrappedComponent
					{ ...props }
					editorHtmlAttributes={ combinedAttributes }
					htmlAttributes={ frontendHtmlAttributes }
				/>

				<InspectorAdvancedControls>
					<TextControl
						label="HTML ID"
						value={ htmlAttributes.id }
						onChange={ ( value ) => {
							setAttributes( {
								htmlAttributes: {
									...htmlAttributes,
									id: value,
								},
							} );
						} }
					/>
				</InspectorAdvancedControls>
			</>
		);
	} );
}
