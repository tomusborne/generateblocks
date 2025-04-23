import { __ } from '@wordpress/i18n';

import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	GridColumnSelector,
	TagNameControl,
} from '@components/index.js';
import { moreDesignOptions } from '@utils';
import { useBlockStyles } from '@hooks/useBlockStyles';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		atRule,
	} = useBlockStyles();

	const panelProps = {
		name,
		attributes,
		setAttributes,
		getStyleValue,
		onStyleChange,
	};

	const {
		tagName,
	} = attributes;

	return (
		<ApplyFilters
			name="generateblocks.editor.blockControls"
			blockName={ name }
			getStyleValue={ getStyleValue }
			onStyleChange={ onStyleChange }
			currentAtRule={ atRule }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				{ ...panelProps }
				dropdownOptions={ [
					moreDesignOptions,
				] }
				panelId="design"
			>
				<GridColumnSelector
					label={ __( 'Layout', 'generateblocks' ) }
					value={ getStyleValue( 'gridTemplateColumns', atRule ) }
					onClick={ ( value ) => {
						onStyleChange( 'display', 'grid', atRule );
						onStyleChange( 'gridTemplateColumns', value, atRule );
					} }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				panelId="settings"
			>
				{ '' === atRule && (
					<TagNameControl
						blockName="generateblocks/looper"
						value={ tagName }
						onChange={ ( value ) => {
							setAttributes( { tagName: value } );
						} }
					/>
				) }
			</OpenPanel>
		</ApplyFilters>
	);
}
