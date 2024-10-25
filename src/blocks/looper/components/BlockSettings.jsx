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
	styles,
} ) {
	const {
		currentAtRule,
	} = useBlockStyles();

	const {
		tagName,
	} = attributes;

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
				<TagNameControl
					blockName="generateblocks/looper"
					value={ tagName }
					onChange={ ( value ) => {
						setAttributes( { tagName: value } );

						if ( 'a' === value && ! styles?.display ) {
							onStyleChange( 'display', 'block' );
						}
					} }
				/>
			</OpenPanel>
		</ApplyFilters>
	);
}
