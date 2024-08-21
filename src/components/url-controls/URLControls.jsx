import { __ } from '@wordpress/i18n';
import { BaseControl, ToggleControl } from '@wordpress/components';
import { URLInput } from '@wordpress/block-editor';
import './editor.scss';
import { DynamicTagModal } from '../../dynamic-tags';
import { Stack } from '@edge22/components';

export function URLControls( {
	htmlAttributes,
	setAttributes,
	attributesName = 'htmlAttributes',
	label = __( 'Link', 'generateblocks' ),
} ) {
	const url = htmlAttributes?.href ?? '';
	const target = htmlAttributes?.target ?? '';
	const rel = htmlAttributes?.rel ?? '';

	return (
		<div className="gb-url-controls components-base-control">
			<BaseControl
				label={ label }
				id="gb-url-controls__link"
				htmlFor="gb-url-controls__link-input"
			>
				<Stack layout="flex" direction="horizontal" wrap={ false } gap="0">
					<URLInput
						id="gb-url-controls__link-input"
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
						disableSuggestions={ url.includes( '{' ) }
					/>

					<DynamicTagModal
						onInsert={ ( { value } ) => {
							setAttributes( {
								[ attributesName ]: {
									...htmlAttributes,
									href: value,
								},
							} );
						} }
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
