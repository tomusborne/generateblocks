import { __ } from '@wordpress/i18n';

import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	GridColumnSelector,
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
			/>
		</ApplyFilters>
	);
}
