import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

import { OpenPanel, IconControl, ColorPicker, Checkbox } from '@edge22/components';

import {
	ApplyFilters,
	URLControls,
	TagNameControl,
	DynamicTagsOnboarder,
} from '@components/index.js';
import { useBlockStyles } from '@hooks/useBlockStyles';
import generalSvgs from '@components/icon-picker/svgs-general';
import socialSvgs from '@components/icon-picker/svgs-social';
import { BaseControl } from '@wordpress/components';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
	htmlAttributes,
} ) {
	const {
		tagName,
		icon,
		iconLocation,
		iconOnly,
	} = attributes;

	const {
		currentAtRule,
	} = useBlockStyles();

	const panelProps = {
		name,
		attributes,
		setAttributes,
	};

	const icons = applyFilters(
		'generateblocks.editor.iconSVGSets',
		{
			general: {
				group: __( 'General', 'generateblocks' ),
				svgs: generalSvgs,
			},
			social: {
				group: __( 'Social', 'generateblocks' ),
				svgs: socialSvgs,
			},
		},
		{ attributes }
	);

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
					blockName="generateblocks/text"
					value={ tagName }
					onChange={ ( value ) => {
						setAttributes( { tagName: value } );

						if ( 'a' === value && ! getStyleValue( 'display', currentAtRule ) ) {
							onStyleChange( 'display', 'block' );
						}
					} }
				/>
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				title={ __( 'Icon', 'generateblocks' ) }
				shouldRender={ '' === currentAtRule }
				panelId="icon"
			>
				<IconControl
					label={ __( 'Icon SVG', 'generateblocks' ) }
					value={ icon }
					onChange={ ( value ) => {
						// If the user hasn't done this before, align the icon and text.
						if ( ! icon ) {
							onStyleChange( 'display', 'inline-flex' );
							onStyleChange( 'alignItems', 'center' );
							onStyleChange( 'columnGap', '0.5em' );
						}

						setAttributes( { icon: value } );
					} }
					onClear={ () => setAttributes( { icon: '' } ) }
					icons={ icons }
					clearLabel={ __( 'Clear', 'generateblocks' ) }
					openLabel={ __( 'Open Library', 'generateblocks' ) }
					modalTitle={ __( 'Shape Library', 'generateblocks' ) }
				/>

				{ !! icon && (
					<>
						<ColorPicker
							label={ __( 'Icon Color', 'generateblocks' ) }
							value={ getStyleValue( 'color', currentAtRule, '.gb-shape svg' ) }
							onChange={ ( value ) => onStyleChange( 'color', value, currentAtRule, '.gb-shape svg' ) }
						/>

						{ ! iconOnly && (
							<SelectControl
								label={ __( 'Icon Location', 'generateblocks' ) }
								value={ iconLocation }
								options={ [
									{ label: __( 'Before', 'generateblocks' ), value: 'before' },
									{ label: __( 'After', 'generateblocks' ), value: 'after' },
								] }
								onChange={ ( value ) => setAttributes( { iconLocation: value } ) }
							/>
						) }

						<BaseControl
							label={ __( 'Show Icon Only', 'generateblocks' ) }
							id="gb-icon-only"
						>
							<Checkbox
								id="gb-icon-only"
								label={ __( 'Remove the text', 'generateblocks' ) }
								checked={ !! iconOnly }
								onChange={ () => setAttributes( { iconOnly: ! iconOnly } ) }
							/>
						</BaseControl>

						<TextControl
							label={ __( 'ARIA Label', 'generateblocks' ) }
							value={ htmlAttributes[ 'aria-label' ] ?? '' }
							onChange={ ( value ) => {
								const newHtmlAttributes = { ...htmlAttributes };

								if ( ! value && htmlAttributes[ 'aria-label' ] ) {
									delete newHtmlAttributes[ 'aria-label' ];
								} else if ( value ) {
									newHtmlAttributes[ 'aria-label' ] = value;
								}

								setAttributes( {
									htmlAttributes: newHtmlAttributes,
								} );
							} }
						/>
					</>
				) }
			</OpenPanel>

			<DynamicTagsOnboarder />
		</ApplyFilters>
	);
}
