import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, ToggleControl } from '@wordpress/components';

import { OpenPanel } from '@edge22/components';

import {
	ApplyFilters,
	URLControls,
	IconControl,
	TagNameControl,
	DynamicTagsOnboarder,
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
		htmlAttributes,
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
					onClear={ () => {
						setAttributes( { icon: '' } );
					} }
					attributes={ attributes }
				/>

				{ !! icon && (
					<>
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

						<ToggleControl
							label={ __( 'Show icon only', 'generateblocks' ) }
							checked={ !! iconOnly }
							onChange={ () => setAttributes( { iconOnly: ! iconOnly } ) }
						/>

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

			<DynamicTagsOnboarder
				screenshot={ generateblocksBlockText.dynamicTagsScreenshot }
			/>
		</ApplyFilters>
	);
}
