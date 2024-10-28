import { __ } from '@wordpress/i18n';

import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	IdAttributeControl,
	TagNameControl,
} from '@components/index.js';

import { QueryInspectorControls } from './QueryInspectorControls';

export function BlockSettings( {
	onStyleChange,
	name,
	attributes,
	setAttributes,
} ) {
	const panelProps = {
		name,
		attributes,
		setAttributes,
	};

	const {
		tagName,
		htmlAttributes,
	} = attributes;

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
				<TagNameControl
					blockName="generateblocks/query"
					value={ tagName }
					onChange={ ( value ) => {
						setAttributes( { tagName: value } );
					} }
				/>

				<IdAttributeControl
					value={ htmlAttributes.id }
					onChange={ ( value ) => {
						setAttributes( {
							htmlAttributes: {
								...htmlAttributes,
								id: value,
							},
						} );
					} }
				/>
			</OpenPanel>
		</ApplyFilters>
	);
}
