import { useMemo } from '@wordpress/element';
import { useBlockParent } from './useBlockParent.js';
import { getElementType } from '../blocks/element/block-types.js';

export function useTagNameCheck() {
	const blockParent = useBlockParent();
	const parentElementType = useMemo( () => {
		if ( ! blockParent ) {
			return null;
		}

		return getElementType( blockParent.attributes.tagName );
	}, [ blockParent?.name ] );
	const parentElementTagName = useMemo( () => {
		if ( ! blockParent ) {
			return '';
		}

		return blockParent?.attributes?.tagName;
	}, [ blockParent?.name ] );

	return ( tagName ) => {
		if ( 'li' === tagName && 'list' !== parentElementType ) {
			return {
				isValid: false,
				validTagName: 'span',
			};
		}

		const elementType = getElementType( tagName );

		if ( 'heading' === parentElementType ) {
			if (
				'text' !== elementType &&
				'button' !== elementType
			) {
				return {
					isValid: false,
					validTagName: 'span',
				};
			}
		}

		if ( 'button' === parentElementType ) {
			if ( 'text' !== elementType ) {
				return {
					isValid: false,
					validTagName: 'span',
				};
			}
		}

		if ( 'list' === parentElementType ) {
			if ( 'li' !== tagName ) {
				return {
					isValid: false,
					validTagName: 'li',
				};
			}
		}

		if ( 'li' === parentElementTagName ) {
			if ( 'text' !== elementType ) {
				return {
					isValid: false,
					validTagName: 'span',
				};
			}
		}

		if ( 'paragraph' === parentElementType ) {
			if (
				'text' !== elementType &&
				'button' !== elementType
			) {
				return {
					isValid: false,
					validTagName: 'span',
				};
			}
		}

		return {
			isValid: true,
		};
	};
}
