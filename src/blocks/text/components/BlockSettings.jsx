import { __ } from '@wordpress/i18n';
import { SelectControl, BaseControl, ToggleControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

import { OpenPanel, IconControl, ColorPicker } from '@edge22/components';

import {
	ApplyFilters,
	URLControls,
	TagNameControl,
	DynamicTagsOnboarder,
} from '@components/index.js';
import { useBlockStyles } from '@hooks/useBlockStyles';
import generalSvgs from '@components/icon-picker/svgs-general';
import socialSvgs from '@components/icon-picker/svgs-social';

export function BlockSettings( {
	getStyleValue,
	onStyleChange,
	name,
	attributes,
	setAttributes,
	htmlAttributes,
	context,
} ) {
	const {
		tagName,
		icon,
		iconLocation,
		iconOnly,
	} = attributes;

	const {
		atRule,
	} = useBlockStyles();

	const panelProps = {
		name,
		attributes,
		setAttributes,
		onStyleChange,
		getStyleValue,
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
				panelId="icon"
			>
				<IconControl
					label={ __( 'Icon', 'generateblocks' ) }
					value={ icon }
					onChange={ ( value ) => {
						// If the user hasn't done this before, align the icon and text.
						if ( ! icon ) {
							if ( ! getStyleValue( 'display' ) ) {
								onStyleChange( 'display', 'inline-flex' );
							}

							if ( ! getStyleValue( 'alignItems' ) ) {
								onStyleChange( 'alignItems', 'center' );
							}

							if ( ! getStyleValue( 'columnGap' ) ) {
								onStyleChange( 'columnGap', '0.5em' );
							}

							if ( ! getStyleValue( 'width', '', '.gb-shape svg' ) ) {
								onStyleChange( 'width', '1em', '', '.gb-shape svg' );
							}

							if ( ! getStyleValue( 'height', '', '.gb-shape svg' ) ) {
								onStyleChange( 'height', '1em', '', '.gb-shape svg' );
							}

							if ( ! getStyleValue( 'fill', '', '.gb-shape svg' ) ) {
								onStyleChange( 'fill', 'currentColor', '', '.gb-shape svg' );
							}
						}

						setAttributes( { icon: value } );
					} }
					onClear={ () => setAttributes( { icon: '' } ) }
					icons={ icons }
					clearLabel={ __( 'Clear', 'generateblocks' ) }
					openLabel={ __( 'Open Library', 'generateblocks' ) }
					modalTitle={ __( 'Icon Library', 'generateblocks' ) }
				/>

				{ !! icon && (
					<>
						<ColorPicker
							label={ __( 'Icon Color', 'generateblocks' ) }
							value={ getStyleValue( 'color', atRule, '.gb-shape svg' ) }
							onChange={ ( value ) => onStyleChange( 'color', value, atRule, '.gb-shape svg' ) }
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
							label={ __( 'Icon Display', 'generateblocks' ) }
							id="gb-icon-only"
						>
							<ToggleControl
								id="gb-icon-only"
								label={ __( 'Show the icon by itself', 'generateblocks' ) }
								checked={ !! iconOnly }
								onChange={ () => setAttributes( { iconOnly: ! iconOnly } ) }
							/>
						</BaseControl>
					</>
				) }
			</OpenPanel>

			<OpenPanel
				{ ...panelProps }
				panelId="settings"
			>
				{ '' === atRule && (
					<TagNameControl
						blockName="generateblocks/text"
						value={ tagName }
						onChange={ ( value ) => {
							setAttributes( { tagName: value } );

							if ( 'a' === value && ! getStyleValue( 'display', atRule ) ) {
								onStyleChange( 'display', 'block' );
							}
						} }
					/>
				) }
			</OpenPanel>

			<DynamicTagsOnboarder />
		</ApplyFilters>
	);
}
