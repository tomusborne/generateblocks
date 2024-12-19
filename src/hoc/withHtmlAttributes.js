import { useEffect, useMemo, useState } from '@wordpress/element';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';

import { useUpdateEffect } from 'react-use';

import { convertInlineStyleStringToObject } from '@utils/convertInlineStyleStringToObject';

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
	'download',
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

const sanitizeAttributeValue = ( value ) => {
	// Replace characters like &, <, >, " with their HTML entity equivalents
	return value
		.replace( /&/g, '&amp;' )
		.replace( /</g, '&lt;' )
		.replace( />/g, '&gt;' )
		.replace( /"/g, '&quot;' )
		.replace( /'/g, '&#039;' );
};

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

		const isSavingPost = useSelect( ( select ) => select( 'core/editor' ).isSavingPost() );
		const { style = '', href, ...otherAttributes } = htmlAttributes;
		const escapedAttributes = Object.keys( otherAttributes ).reduce( ( acc, key ) => {
			acc[ key ] = sanitizeAttributeValue( otherAttributes[ key ] );
			return acc;
		}, {} );
		const [ processedStyle, setProcessedStyle ] = useState( style );

		useEffect( () => {
			async function fetchProcessedStyle() {
				const styleValue = await applyFilters(
					'generateblocks.editor.htmlAttributes.style',
					style,
					{ ...props }
				);

				setProcessedStyle( styleValue );
			}

			fetchProcessedStyle();
		}, [ style, context, isSavingPost ] );

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

		const inlineStyleObject = typeof processedStyle === 'string'
			? convertInlineStyleStringToObject( processedStyle )
			: '';
		const combinedAttributes = {
			...escapedAttributes,
			style: inlineStyleObject,
			'data-gb-id': uniqueId,
			'data-context-post-id': context?.postId ?? context?.[ 'generateblocks/loopIndex' ] ?? 0,
			'data-align': align ? align : undefined,
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
				const isDataAttribute = key.startsWith( 'data-' );
				const value = updatedHtmlAttributes[ key ];

				// Remove non-boolean attributes if they have empty values.
				if ( ! booleanAttributes.includes( key ) && '' === value && ! isDataAttribute ) {
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
