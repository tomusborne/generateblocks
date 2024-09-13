import { __ } from '@wordpress/i18n';

import {
	ApplyFilters,
	OpenPanel,
	HtmlAttributes,
} from '@components/index.js';

import { QueryInspectorControls } from './QueryInspectorControls';

export function BlockSettings( {
	onStyleChange,
	name,
	attributes,
	setAttributes,
} ) {
	const {
		htmlAttributes,
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
			onStyleChange={ onStyleChange }
			attributes={ attributes }
			setAttributes={ setAttributes }
		>
			<OpenPanel
				{ ...panelProps }
				title={ __( 'Query Parameters', 'generateblocks' ) }
				panelId="query-parameters"
			>
				<QueryInspectorControls
					attributes={ attributes }
					setAttributes={ setAttributes }
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
