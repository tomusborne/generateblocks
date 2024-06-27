import { __ } from '@wordpress/i18n';

import ApplyFilters from '@components/apply-filters';
import { OpenPanel } from '@components/open-panel';
import { moreDesignOptions } from '@components/open-panel/utils';
import { HtmlAttributes } from '@components/html-attributes';
import { GridColumnSelector } from '@components/grid-column-selector';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	currentAtRule,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		htmlAttributes,
	} = attributes;

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			getStyleValue={ getStyleValue }
			onStyleChange={ onStyleChange }
			currentAtRule={ currentAtRule }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				title={ __( 'Design', 'generateblocks' ) }
				dropdownOptions={ [
					moreDesignOptions,
				] }
			>
				<GridColumnSelector
					value={ getStyleValue( 'gridTemplateColumns', currentAtRule ) }
					onClick={ ( value ) => {
						onStyleChange( 'display', 'grid', currentAtRule );
						onStyleChange( 'gridTemplateColumns', value, currentAtRule );
					} }
				/>
			</OpenPanel>

			<OpenPanel
				title={ __( 'Settings', 'generateblocks' ) }
			>
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
