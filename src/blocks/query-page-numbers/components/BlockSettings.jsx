import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';

import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
} from '@components/index.js';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		midSize,
		tagName,
	} = attributes;

	const tagNames = getBlockType( 'generateblocks/query-page-numbers' )?.attributes?.tagName?.enum;
	const tagNameOptions = tagNames.map( ( tag ) => ( {
		label: tag,
		value: tag,
	} ) );

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
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				{ ...panelProps }
				title={ __( 'Settings', 'generateblocks' ) }
				panelId="settings"
			>
				<RangeControl
					type="number"
					label={ __( 'Mid Size', 'generateblocks' ) }
					value={ midSize }
					onChange={ ( value ) => setAttributes( { midSize: value } ) }
					step="1"
					min="0"
					max="10"
				/>

				<SelectControl
					label={ __( 'Tag Name' ) }
					value={ tagName }
					options={ tagNameOptions }
					onChange={ ( value ) => setAttributes( { tagName: value } ) }
				/>
			</OpenPanel>
		</ApplyFilters>
	);
}
