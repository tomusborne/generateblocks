import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	TagNameControl,
} from '@components/index.js';

import { QueryInspectorControls } from './QueryInspectorControls';

export function BlockSettings( {
	onStyleChange,
	name,
	attributes,
	setAttributes,
	context,
} ) {
	const panelProps = {
		name,
		attributes,
		setAttributes,
	};

	const {
		tagName,
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
				panelId="query-parameters"
			>
				<QueryInspectorControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					context={ context }
				/>
			</OpenPanel>
			<OpenPanel
				{ ...panelProps }
				panelId="settings"
			>
				<TagNameControl
					blockName="generateblocks/query"
					value={ tagName }
					onChange={ ( value ) => {
						setAttributes( { tagName: value } );
					} }
				/>
			</OpenPanel>
		</ApplyFilters>
	);
}
