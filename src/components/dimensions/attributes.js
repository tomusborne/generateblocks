export default function getSpacingAttributes( name, types = [ 'margin', 'padding', 'border', 'borderRadius' ] ) {
	const attributes = {};

	if ( types.includes( 'padding' ) ) {
		Object.assign(
			attributes,
			{
				paddingTop: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingTop,
				},
				paddingRight: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingRight,
				},
				paddingBottom: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingBottom,
				},
				paddingLeft: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingLeft,
				},
				paddingUnit: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingUnit,
				},
				paddingSyncUnits: {
					type: 'boolean',
					default: false,
				},
				paddingTopTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingTopTablet,
				},
				paddingRightTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingRightTablet,
				},
				paddingBottomTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingBottomTablet,
				},
				paddingLeftTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingLeftTablet,
				},
				paddingTopMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingTopMobile,
				},
				paddingRightMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingRightMobile,
				},
				paddingBottomMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingBottomMobile,
				},
				paddingLeftMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].paddingLeftMobile,
				},
			}
		);
	}

	if ( types.includes( 'margin' ) ) {
		Object.assign(
			attributes,
			{
				marginTop: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginTop,
				},
				marginRight: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginRight,
				},
				marginBottom: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginBottom,
				},
				marginLeft: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginLeft,
				},
				marginUnit: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginUnit,
				},
				marginSyncUnits: {
					type: 'boolean',
					default: false,
				},
				marginTopTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginTopTablet,
				},
				marginRightTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginRightTablet,
				},
				marginBottomTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginBottomTablet,
				},
				marginLeftTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginLeftTablet,
				},
				marginTopMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginTopMobile,
				},
				marginRightMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginRightMobile,
				},
				marginBottomMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginBottomMobile,
				},
				marginLeftMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].marginLeftMobile,
				},
			}
		);
	}

	if ( types.includes( 'border' ) ) {
		Object.assign(
			attributes,
			{
				borderSizeTop: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeTop,
				},
				borderSizeRight: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeRight,
				},
				borderSizeBottom: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeBottom,
				},
				borderSizeLeft: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeLeft,
				},
				borderSizeTopTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeTopTablet,
				},
				borderSizeRightTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeRightTablet,
				},
				borderSizeBottomTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeBottomTablet,
				},
				borderSizeLeftTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeLeftTablet,
				},
				borderSizeTopMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeTopMobile,
				},
				borderSizeRightMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeRightMobile,
				},
				borderSizeBottomMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeBottomMobile,
				},
				borderSizeLeftMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderSizeLeftMobile,
				},
			}
		);
	}

	if ( types.includes( 'borderRadius' ) ) {
		Object.assign(
			attributes,
			{
				borderRadiusTopRight: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusTopRight,
				},
				borderRadiusBottomRight: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusBottomRight,
				},
				borderRadiusBottomLeft: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusBottomLeft,
				},
				borderRadiusTopLeft: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusTopLeft,
				},
				borderRadiusUnit: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusUnit,
				},
				borderRadiusTopRightTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusTopRightTablet,
				},
				borderRadiusBottomRightTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusBottomRightTablet,
				},
				borderRadiusBottomLeftTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusBottomLeftTablet,
				},
				borderRadiusTopLeftTablet: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusTopLeftTablet,
				},
				borderRadiusTopRightMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusTopRightMobile,
				},
				borderRadiusBottomRightMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusBottomRightMobile,
				},
				borderRadiusBottomLeftMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusBottomLeftMobile,
				},
				borderRadiusTopLeftMobile: {
					type: 'string',
					default: generateBlocksDefaults[ name ].borderRadiusTopLeftMobile,
				},
			}
		);
	}

	return attributes;
}
