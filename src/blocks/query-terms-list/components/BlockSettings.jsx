import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { useMemo, useEffect } from '@wordpress/element';

import {
	ApplyFilters,
	OpenPanel,
	HtmlAttributes,
} from '@components';
import useTaxonomies from '@hooks/useTaxonomies';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		htmlAttributes,
		taxonomy,
		tagName,
		separator,
	} = attributes;

	const tagNames = getBlockType( 'generateblocks/query-terms-list' )?.attributes?.tagName?.enum;
	const tagNameOptions = tagNames.map( ( tag ) => ( {
		label: tag,
		value: tag,
	} ) );
	const taxonomies = useTaxonomies();
	const taxonomiesOptions = useMemo( () => (
		taxonomies
			.filter( ( tax ) => ( 'nav_menu' !== tax.slug ) )
			.map( ( tax ) => ( { value: tax.slug, label: tax.name } ) )
	), [ JSON.stringify( taxonomies ) ] );

	useEffect( () => {
		if ( ! taxonomy ) {
			setAttributes( { taxonomy: taxonomiesOptions[ 0 ].value } );
		}
	}, [ taxonomy ] );

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			getStyleValue={ getStyleValue }
			onStyleChange={ onStyleChange }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				title={ __( 'Settings', 'generateblocks' ) }
			>
				<SelectControl
					label={ __( 'Taxonomy' ) }
					value={ taxonomy }
					options={ taxonomiesOptions }
					onChange={ ( value ) => setAttributes( { taxonomy: value } ) }
				/>

				<TextControl
					label={ __( 'Separator' ) }
					value={ separator }
					onChange={ ( value ) => setAttributes( { separator: value } ) }
				/>

				<SelectControl
					label={ __( 'Tag Name' ) }
					value={ tagName }
					options={ tagNameOptions }
					onChange={ ( value ) => setAttributes( { tagName: value } ) }
				/>

				<HtmlAttributes
					items={ htmlAttributes }
					onAdd={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onRemove={ ( value ) => setAttributes( { htmlAttributes: value } ) }
					onChange={ ( value ) => setAttributes( { htmlAttributes: value } ) }
				/>
			</OpenPanel>
		</ApplyFilters>
	);
}
