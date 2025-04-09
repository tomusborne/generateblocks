import { __ } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';

import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	TagNameControl,
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
		midSize,
		tagName,
	} = attributes;

	const panelProps = {
		name,
		attributes,
		setAttributes,
		getStyleValue,
		onStyleChange,
	};

	const {
		atRule,
	} = useBlockStyles();

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
				panelId="settings"
			>
				{ '' === atRule && (
					<>
						<RangeControl
							type="number"
							label={ __( 'Mid Size', 'generateblocks' ) }
							value={ midSize }
							onChange={ ( value ) => setAttributes( { midSize: value } ) }
							step="1"
							min="0"
							max="10"
						/>

						<TagNameControl
							blockName="generateblocks/query-page-numbers"
							value={ tagName }
							onChange={ ( value ) => {
								setAttributes( { tagName: value } );
							} }
						/>
					</>
				) }
			</OpenPanel>
		</ApplyFilters>
	);
}
