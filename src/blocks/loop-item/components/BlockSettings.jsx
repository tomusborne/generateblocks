import { __ } from '@wordpress/i18n';
import { BaseControl, Notice } from '@wordpress/components';

import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	URLControls,
	TagNameControl,
} from '@components/index.js';
import { useBlockStyles } from '@hooks/useBlockStyles';
import { InlineBackgroundImage } from '../../element/components/InlineBackgroundImage';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
	htmlAttributes,
	styles,
	context,
} ) {
	const {
		tagName,
	} = attributes;

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
				shouldRender={ 'a' === tagName && '' === atRule }
				panelId="link-destination"
			>
				<URLControls
					label={ __( 'Link Destination', 'generateblocks' ) }
					setAttributes={ setAttributes }
					htmlAttributes={ htmlAttributes }
					context={ context }
					tagName={ tagName }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				shouldRender={ '' === atRule }
				panelId="inline-background-image"
			>
				<InlineBackgroundImage
					label={ __( 'Inline Background Image', 'generateblocks' ) }
					htmlAttributes={ htmlAttributes }
					setAttributes={ setAttributes }
					styles={ styles }
					onStyleChange={ onStyleChange }
					context={ context }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				panelId="settings"
			>
				{ '' === atRule && (
					<>
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
					</>
				) }
			</OpenPanel>
		</ApplyFilters>
	);
}
