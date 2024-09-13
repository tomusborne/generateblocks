import { __ } from '@wordpress/i18n';

import {
	ApplyFilters,
	OpenPanel,
	moreDesignOptions,
	HtmlAttributes,
	GridColumnSelector,
} from '@components/index.js';
import { useBlockStyles } from '@hooks/useBlockStyles';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		htmlAttributes,
	} = attributes;

	const {
		currentAtRule,
	} = useBlockStyles();

	const panelProps = {
		name,
		attributes,
		setAttributes,
	};

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
				{ ...panelProps }
				title={ __( 'Design', 'generateblocks' ) }
				dropdownOptions={ [
					moreDesignOptions,
				] }
				panelId="design"
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
				{ ...panelProps }
				title={ __( 'Settings', 'generateblocks' ) }
				panelId="settings"
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
