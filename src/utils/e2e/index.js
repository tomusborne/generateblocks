import { openDocumentSettingsSidebar, searchForBlock } from '@wordpress/e2e-test-utils';

/**
 * Return xPath to check if contains class
 *
 * @param {string} className The Class name
 * @return {string} {`[contains(concat(' ',normalize-space(@class),' '),' ${string} ')]`}
 */
const containsClass = ( className ) => ( `contains(concat(' ',normalize-space(@class),' '),' ${ className } ')` );

/**
 * Select a different unit
 *
 * @param {string} wrapperClass The wrapper class
 * @param {string} unit The unit
 * @return {Promise<void>} Void
 */
const selectUnit = async( wrapperClass, unit ) => {
	const sanitizedWrapper = ( wrapperClass.includes( '.' ) || wrapperClass.includes( '#' ) )
		? wrapperClass.substr( 1 )
		: wrapperClass;

	const wrapperXPath = `//div[${ containsClass( sanitizedWrapper ) }]`;
	const unitsXPath = '//div[@class="components-gblocks-control__units"]';
	const unitClass = `components-gblocks-control-button__units--${ unit }`;
	const buttonXPath = `//button[${ containsClass( unitClass ) }]`;

	const unitButton = await page.waitForXPath( wrapperXPath + unitsXPath + buttonXPath );

	await unitButton.click();
};

/**
 * Open the attributes panel
 *
 * @param {string} attributeLabel The attribute label
 * @return {Promise<void>} Void
 */
const openAttributesPanel = async( attributeLabel ) => {
	const typographyButton = await page
		.waitForXPath(
			`//h2[@class="components-panel__body-title"]//button[contains(text(), '${ attributeLabel }')]`
		);

	await typographyButton.click();
};

/**
 * Fill an input field with custom value
 *
 * @param {string} targetElement The target element
 * @param {string} inputValue The value to fill the input
 * @returns {Promise<void>}
 */
const fillInputValue = async( targetElement, inputValue ) => {
	await page.$eval( targetElement, ( el, value ) => el.value = value, '' );
	await page.focus( targetElement );
	await page.keyboard.type( inputValue, { delay: 100 } );
};

/**
 * Set the layout attributes for the active block
 *
 * @param {Object} attributes The layout attribute values
 * @param {string} attributes.outerContainer Outer container select value
 * @param {string} attributes.innerContainer Inner container select value
 * @param {string} attributes.containerWidth Container width input value
 * @param {string} attributes.tagName Tag name select value
 * @return {Promise<void>} Void
 */
const setBlockLayoutAttributes = async( attributes ) => {
	const { outerContainer, innerContainer, containerWidth, tagName } = attributes;

	if ( outerContainer ) {
		await page.select( '.gblocks-container-control select', outerContainer );
	}

	if ( innerContainer && 'contained' === outerContainer ) {
		await page.select( '.gblocks-inner-container-control select', innerContainer );
	}

	if ( 'contained' === outerContainer || 'contained' === innerContainer ) {
		await fillInputValue( '.gblocks-container-width input', containerWidth );
	}

	if ( tagName ) {
		await page.select( '.gblocks-tag-name-control select', tagName );
	}
};

/**
 * Set the typography attributes for the active block
 *
 * @param {Object} attributes The typography attribute values
 * @param {string} attributes.fontWeight Font weight select value
 * @param {string} attributes.textTransform Text transform select value
 * @param {string} attributes.fontSize Font size input value
 * @param {string} attributes.fontSizeUnit Font size unit
 * @return {Promise<void>} Void
 */
const setBlockTypographyAttributes = async( attributes ) => {
	const {
		fontWeight,
		textTransform,
		fontFamily,
		fontSize,
		fontSizeUnit,
	} = attributes;

	await openAttributesPanel( 'Typography' );

	if ( fontWeight ) {
		await page.select( '.gblocks-font-weight-control select', fontWeight );
	}

	if ( textTransform ) {
		await page.select( '.gblocks-transform-control select', textTransform );
	}

	if ( fontFamily || fontSize ) {
		const advancedButton = await page.waitForXPath(
			`//div[${ containsClass( 'gblocks-advanced-typography-control' ) }]`
		);

		await advancedButton.click();
	}

	if ( fontFamily ) {
		await page.select( '.gblocks-font-family-shortcuts select', fontFamily );
	}

	if ( fontSizeUnit ) {
		await selectUnit( 'gblocks-font-size-control', fontSizeUnit );
	}

	if ( fontSize ) {
		await fillInputValue( '.gblocks-font-size-control input', fontSize );
	}
};

/**
 * Set the spacing attributes for the active block
 *
 * @param {Object} attributes The spacing attribute values
 * @param {string} attributes.minimumHeight Minimum height input value
 * @param {string} attributes.minimumHeightUnit Minimum height unit value
 * @param {string} attributes.paddingUnit Padding unit value
 * @param {Object} attributes.padding Padding values
 * @param {string} attributes.marginUnit Margin unit value
 * @param {Object} attributes.margin Margin values
 * @param {string} attributes.borderSizeUnit Border size unit value
 * @param {Object} attributes.borderSize Border size values
 * @param {string} attributes.borderRadiusUnit Border radius unit value
 * @param {Object} attributes.borderRadius Border radius values
 * @param {string} attributes.outerZIndex Outer z-index value
 * @param {string} attributes.innerZIndex Inner z-index value
 * @return {Promise<void>} Void
 */
const setBlockSpacingAttributes = async( attributes ) => {
	const {
		minimumHeight,
		minimumHeightUnit,
		paddingUnit,
		padding,
		marginUnit,
		margin,
		borderSizeUnit,
		borderSize,
		borderRadiusUnit,
		borderRadius,
		outerZIndex,
		innerZIndex,
	} = attributes;

	await openAttributesPanel( 'Spacing' );

	if ( minimumHeightUnit ) {
		await selectUnit( 'gblocks-minimum-height-control', minimumHeightUnit );
	}

	if ( minimumHeight ) {
		await fillInputValue( '.gblocks-minimum-height-control input', minimumHeight );
	}

	if ( padding ) {
		await setDimensionsInputs(
			'.gblock-padding-control',
			padding.top,
			padding.right,
			padding.bottom,
			padding.left,
			paddingUnit
		);
	}

	if ( margin ) {
		await setDimensionsInputs(
			'.gblock-margin-control',
			margin.top,
			margin.right,
			margin.bottom,
			margin.left,
			marginUnit
		);
	}

	if ( borderSize ) {
		await setDimensionsInputs(
			'.gblock-border-size-control',
			borderSize.top,
			borderSize.right,
			borderSize.bottom,
			borderSize.left,
			borderSizeUnit
		);
	}

	if ( borderRadius ) {
		await setDimensionsInputs(
			'.gblocks-border-radius-control',
			borderRadius.topLeft,
			borderRadius.topRight,
			borderRadius.bottomLeft,
			borderRadius.bottomRight,
			borderRadiusUnit
		);
	}

	if ( outerZIndex ) {
		await fillInputValue( '.gblocks-outer-zindex-control input', outerZIndex );
	}

	if ( innerZIndex ) {
		await fillInputValue( '.gblocks-inner-zindex-control input', innerZIndex );
	}
};

/**
 * Fill the four spacing input fields
 *
 * @param {string} wrapperClass The wrapper class (including ".")
 * @param {string} firstValue The first field value
 * @param {string} secondValue The second field value
 * @param {string} thirdValue The third field value
 * @param {string} fourthValue The fourth field value
 * @param {string} unitValue The unit value
 * @returns {Promise<void>}
 */
const setDimensionsInputs = async(
	wrapperClass,
	firstValue,
	secondValue,
	thirdValue,
	fourthValue,
	unitValue
) => {
	const parentElement = ' .components-gblocks-dimensions-control__inputs ';

	if ( unitValue ) {
		await selectUnit( wrapperClass, unitValue );
	}

	if ( firstValue ) {
		await fillInputValue( wrapperClass + parentElement + 'input:nth-child(1)', firstValue );
	}

	if ( secondValue ) {
		await fillInputValue( wrapperClass + parentElement + 'input:nth-child(2)', secondValue );
	}

	if ( thirdValue ) {
		await fillInputValue( wrapperClass + parentElement + 'input:nth-child(3)', thirdValue );
	}

	if ( fourthValue ) {
		await fillInputValue( wrapperClass + parentElement + 'input:nth-child(4)', fourthValue );
	}
};

/**
 * Insert a GenerateBlocks block into the page
 *
 * @param {string} blockName The name of the block
 * @param {Object} attributes The block attributes
 * @param {Object} attributes.layout Block layout attributes
 * @param {Object} attributes.typography Block typography attributes
 * @param {Object} attributes.spacing Block spacing attributes
 * @return {Promise<void>} Void
 */
const insertGenerateBlocksBlock = async( blockName, attributes ) => {
	await searchForBlock( `generateblocks/${ blockName }` );

	const insertButton = await page.waitForXPath( `//button//span[contains(text(), '${ blockName }')]` );

	await insertButton.click();

	await page.evaluate( () => {
		wp.data.dispatch( 'core/block-editor' ).selectBlock(
			wp.data.select( 'core/block-editor' ).getSelectedBlockClientId(),
			0
		);
	} );

	if ( ! attributes ) {
		return;
	}

	await openDocumentSettingsSidebar();

	if ( attributes.layout ) {
		await setBlockLayoutAttributes( attributes.layout );
	}

	if ( attributes.typography ) {
		await setBlockTypographyAttributes( attributes.typography );
	}

	if ( attributes.spacing ) {
		await setBlockSpacingAttributes( attributes.spacing );
	}
};

export {
	insertGenerateBlocksBlock,
};
