import { __ } from '@wordpress/i18n';
import { BaseControl, ToggleControl, useBaseControlProps } from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';

import { Stack } from '@edge22/components';

import { DynamicTagModal } from '../../dynamic-tags';
import './editor.scss';

export function URLControls( {
	htmlAttributes,
	setAttributes,
	attributesName = 'htmlAttributes',
	label = __( 'Link', 'generateblocks' ),
	context,
	tagName,
} ) {
	const url = htmlAttributes?.href ?? '';
	const target = htmlAttributes?.target ?? '';
	const rel = htmlAttributes?.rel ?? '';

	useEffect( () => {
		if ( '_blank' === target ) {
			if ( ! rel.includes( 'noopener' ) ) {
				const relItems = rel ? rel.split( ' ' ) : [];
				relItems.push( 'noopener' );

				setAttributes( {
					[ attributesName ]: {
						...htmlAttributes,
						rel: relItems.join( ' ' ),
					},
				} );
			}
		} else if ( rel.includes( 'noopener' ) ) {
			const relItems = rel ? rel.split( ' ' ) : [];
			relItems.splice( relItems.indexOf( 'noopener' ), 1 );

			setAttributes( {
				[ attributesName ]: {
					...htmlAttributes,
					rel: relItems.join( ' ' ),
				},
			} );
		}
	}, [ target, rel ] );

	const { baseControlProps, controlProps } = useBaseControlProps( {
		label,
	} );

	return (
		<div className="gb-url-controls components-base-control">
			<BaseControl { ...baseControlProps }>
				<Stack layout="flex" direction="horizontal" wrap={ false } gap="5px">
					<URLInput
						{ ...controlProps }
						className={ 'gb-url-controls__link-input' }
						value={ url }
						onChange={ ( value ) => {
							setAttributes( {
								[ attributesName ]: {
									...htmlAttributes,
									href: value,
								},
							} );
						} }
						disableSuggestions={ url.includes( '{{' ) }
					/>

					<DynamicTagModal
						onInsert={ ( value ) => {
							setAttributes( {
								[ attributesName ]: {
									...htmlAttributes,
									href: value,
								},
							} );
						} }
						selectedText={ url.startsWith( '{{' ) ? url : '' }
						context={ context }
						tagName={ tagName }
					/>
				</Stack>
			</BaseControl>

			{ ( !! url || !! target || !! rel ) && (
				<>
					<ToggleControl
						label={ __( 'Open link in a new tab', 'generateblocks' ) }
						checked={ target || '' }
						onChange={ ( value ) => {
							const newHtmlAttributes = { ...htmlAttributes };

							if ( value ) {
								newHtmlAttributes.target = '_blank';
							} else {
								delete newHtmlAttributes.target;
							}

							setAttributes( {
								[ attributesName ]: newHtmlAttributes,
							} );
						} }
					/>

					<ToggleControl
						label={ __( 'Add rel="nofollow"', 'generateblocks' ) }
						checked={ rel?.includes( 'nofollow' ) || '' }
						onChange={ ( value ) => {
							const newHtmlAttributes = { ...htmlAttributes };
							const relItems = rel ? rel.split( ' ' ) : [];

							if ( value && ! relItems.includes( 'nofollow' ) ) {
								relItems.push( 'nofollow' );
							}

							if ( ! value && relItems.includes( 'nofollow' ) ) {
								relItems.splice( relItems.indexOf( 'nofollow' ), 1 );
							}

							if ( relItems.length > 0 ) {
								newHtmlAttributes.rel = relItems.join( ' ' );
							} else {
								delete newHtmlAttributes.rel;
							}

							setAttributes( {
								[ attributesName ]: newHtmlAttributes,
							} );
						} }
					/>

					<ToggleControl
						label={ __( 'Add rel="sponsored"', 'generateblocks' ) }
						checked={ rel?.includes( 'sponsored' ) || '' }
						onChange={ ( value ) => {
							const newHtmlAttributes = { ...htmlAttributes };
							const relItems = rel ? rel.split( ' ' ) : [];

							if ( value && ! relItems.includes( 'sponsored' ) ) {
								relItems.push( 'sponsored' );
							}

							if ( ! value && relItems.includes( 'sponsored' ) ) {
								relItems.splice( relItems.indexOf( 'sponsored' ), 1 );
							}

							if ( relItems.length > 0 ) {
								newHtmlAttributes.rel = relItems.join( ' ' );
							} else {
								delete newHtmlAttributes.rel;
							}

							setAttributes( {
								[ attributesName ]: newHtmlAttributes,
							} );
						} }
					/>
				</>
			) }
		</div>
	);
}
