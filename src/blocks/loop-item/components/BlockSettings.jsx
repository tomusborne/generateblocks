import { __ } from '@wordpress/i18n';
import { BaseControl, Notice } from '@wordpress/components';

import {
	ApplyFilters,
	OpenPanel,
	URLControls,
	TagNameControl,
	HtmlAttributes,
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
		tagName,
		htmlAttributes,
		styles,
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
				title={ __( 'Link Destination', 'generateblocks' ) }
				shouldRender={ 'a' === tagName && '' === currentAtRule }
				panelId="link-destination"
			>
				<URLControls
					setAttributes={ setAttributes }
					htmlAttributes={ htmlAttributes }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				title={ __( 'Settings', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
				panelId="settings"
			>
				<TagNameControl
					blockName="generateblocks/loop-item"
					value={ tagName }
					onChange={ ( value ) => {
						setAttributes( { tagName: value } );

						if ( 'a' === value && ! styles?.display ) {
							onStyleChange( 'display', 'block' );
						}
					} }
				/>

				{ 'a' === tagName && (
					<BaseControl>
						<Notice
							status="warning"
							isDismissible={ false }
						>
							{ __( 'This container is now a link element. Be sure not to add any interactive elements inside of it, like buttons or other links.', 'generateblocks' ) }
						</Notice>
					</BaseControl>
				) }

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
