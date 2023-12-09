import { __ } from '@wordpress/i18n';
import { useContext, useRef, useState, useMemo } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import ControlsContext from '../../../../block-context';
import LayoutControl from './components/LayoutControl';
import isFlexItem from '../../../../utils/is-flex-item';
import getAttribute from '../../../../utils/get-attribute';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';
import FlexDirection from './components/FlexDirection';
import LegacyLayoutControls from '../../../../blocks/container/components/LegacyLayoutControls';
import ZIndex from './components/ZIndex';
import FlexChild from '../flex-child-panel';
import MigrateInnerContainer from '../../../../components/migrate-inner-container';
import UnitControl from '../../../../components/unit-control';
import { positionOptions, overflowOptions } from './options';
import FlexControl from '../../../../components/flex-control';
import getDeviceType from '../../../../utils/get-device-type';
import ThemeWidth from './components/ThemeWidth';

/**
 * Helper function to get the source of CSS properties
 *
 * @param {HTMLElement} element    The element to check
 * @param {string[]}    properties The CSS properties to check
 * @param {string[]}    sources    The sources to check (e.g., 'inline', 'tag', 'stylesheet')
 * @return {Object}    An object of objects containing the source, selector, and value of each CSS property
 */
export function getComputedStyleSources( element, properties, sources = [ 'inline', 'tag' ] ) {
	if ( ! properties || properties.length === 0 ) {
		throw new Error( 'Properties must be specified' );
	}

	const queryDocument =
		document.querySelector( 'iframe[name="editor-canvas"]' )?.contentDocument || document;

	const computedStyles = getComputedStyle( element );
	const result = {};
	const styleTags = sources.includes( 'tag' ) ? queryDocument.querySelectorAll( 'style' ) : [];
	const styleSheets = sources.includes( 'stylesheet' ) ? queryDocument.styleSheets : [];

	for ( const property of properties ) {
		const computedValue = computedStyles[ property ];

		if ( sources.includes( 'inline' ) ) {
			// Check inline styles first
			const inlineStyle = element.style[ property ];
			if ( inlineStyle ) {
				result[ property ] = { source: 'inline', selector: '', value: computedValue };
				continue;
			}
		}

		if ( sources.includes( 'tag' ) ) {
			// Check all <style> tags
			for ( const styleTag of styleTags ) {
				try {
					const rules = styleTag.sheet.cssRules;
					for ( const rule of rules ) {
						if ( rule instanceof CSSStyleRule ) {
							if (
								element.matches( rule.selectorText ) &&
								rule.style[ property ] === computedValue
							) {
								result[ property ] = {
									source: 'tag',
									selector: rule.selectorText,
									value: computedValue,
								};
								break;
							}
						}
					}
				} catch ( error ) {
					// Some stylesheets may throw a SecurityError when trying to access them
					console.error( 'Error accessing stylesheet:', error.message ); // eslint-disable-line no-console
				}
			}

			if ( property in result ) {
				continue;
			}
		}

		if ( sources.includes( 'stylesheet' ) ) {
			// Check external stylesheets
			for ( const styleSheet of styleSheets ) {
				try {
					const rules = styleSheet.rules || styleSheet.cssRules;
					for ( const rule of rules ) {
						if ( rule instanceof CSSStyleRule ) {
							const value = rule.style[ property ];
							if (
								element.matches( rule.selectorText ) &&
								value === computedValue
							) {
								result[ property ] = {
									source: 'stylesheet',
									selector: rule.selectorText,
									value: computedValue,
								};
								break;
							}
						}
					}
				} catch ( error ) {
					// Some stylesheets may throw a SecurityError when trying to access them
					console.error( 'Error accessing stylesheet:', error.message ); // eslint-disable-line no-console
				}
			}
			if ( property in result ) {
				continue;
			}
		}

		// User agent style or style not found
		result[ property ] = { source: null, selector: '', value: computedValue };
	}

	return result;
}

/**
 * Get the source and computed value of a CSS property for a list of elements
 * or a single element.
 *
 * @param {NodeList|HTMLElement} elements   A list of elements or a single element
 * @param {string|string[]}      properties A single CSS property or a list of CSS property to check
 * @return {Object[]}            An array of objects containing the source and value of the CSS property or a single object if a single element was passed.
 */
export function getElementStyles( elements, properties ) {
	console.log( 'getting element styles for properties:', properties.join( ', ' ) );

	const singleProp = ! Array.isArray( properties );
	const props = singleProp ? properties : [ properties ];

	if ( Array.isArray( elements ) ) {
		return Array.from( elements ).map( ( element ) => {
			const result = getComputedStyleSources( element, props );

			return singleProp ? result[ properties ] : result;
		} );
	}

	const result = getComputedStyleSources( elements, props );

	return singleProp ? result[ properties ] : result;
}

export default function Layout( { attributes, setAttributes, computedStyles } ) {
	const device = getDeviceType();
	const { supports: { layout, flexChildPanel } } = useContext( ControlsContext );
	const panelRef = useRef( null );
	const [ controlGlobalStyle, setControlGlobalStyle ] = useState( {
		columnGap: false,
		rowGap: false,
		flexDirection: false,
		alignItems: false,
		justifyContent: false,
		flexWrap: false,
		position: false,
		zindex: false,
	} );
	const styleSources = useMemo( applyFilters(
		'generateblocks.editor.panel.computedStyleSources',
		computedStyles,
		Object.keys( controlGlobalStyle ),
	), [ computedStyles, controlGlobalStyle ] );
	const hasGlobalStyle = useMemo( () => {
		Object.values( controlGlobalStyle ).some( ( control ) => control === true );
	}, [ controlGlobalStyle ] );

	const componentProps = {
		attributes,
		deviceType: device,
	};
	console.log( { attributes } );

	const {
		display,
		displayTablet,
		displayMobile,
		useInnerContainer,
		zindex,
		innerZindex,
		align,
	} = attributes;

	const directionValue = getAttribute( 'flexDirection', componentProps ) || getResponsivePlaceholder( 'flexDirection', attributes, device, 'row' );

	const showFlexChildControls = applyFilters(
		'generateblocks.editor.layout.isFlexItem',
		isFlexItem( { device, display, displayTablet, displayMobile } ),
		{ device, display, displayTablet, displayMobile }
	);

	return (
		<PanelArea
			title={ __( 'Layout', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'layout' ) }
			className="gblocks-panel-label"
			id="layout"
			ref={ panelRef }
			hasGlobalStyle={ hasGlobalStyle }
		>
			{ !! useInnerContainer &&
			<LegacyLayoutControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ device }
				blockDefaults={ generateBlocksDefaults.container }
			/>
			}

			{ layout.display && ! useInnerContainer &&
				<SelectControl
					label={ applyFilters(
						'generateblocks.editor.control.label',
						__( 'Display', 'generateblocks' ),
						'display',
						getAttribute( 'display', componentProps ),
						styleSources,
					) }
					options={ [
						{ label: __( 'Default', 'generateblocks' ), value: '' },
						{ label: 'Block', value: 'block' },
						{ label: 'Inline Block', value: 'inline-block' },
						{ label: 'Flex', value: 'flex' },
						{ label: 'Inline Flex', value: 'inline-flex' },
						{ label: 'Inline', value: 'inline' },
					] }
					value={ getAttribute( 'display', componentProps ) }
					onChange={ ( nextDisplay ) => setAttributes( {
						[ getAttribute( 'display', componentProps, true ) ]: nextDisplay,
					} ) }
				/>
			}

			{ showFlexChildControls && ! useInnerContainer &&
			<>
				{ layout.flexDirection &&
				<FlexDirection
					value={ getAttribute( 'flexDirection', componentProps ) }
					onChange={ ( value ) => {
						const currentDirection = getAttribute( 'flexDirection', componentProps );
						value = currentDirection.includes( 'reverse' ) ? value + '-reverse' : value;

						setAttributes( {
							[ getAttribute( 'flexDirection', componentProps, true ) ]: value !== getAttribute( 'flexDirection', componentProps ) ? value : '',
						} );
					} }
					onReverse={ ( value ) => {
						if ( '' === value ) {
							value = 'row';
						}

						value = value.includes( 'reverse' ) ? value.replace( '-reverse', '' ) : value + '-reverse';

						setAttributes( {
							[ getAttribute( 'flexDirection', componentProps, true ) ]: value,
						} );
					} }
					label={ applyFilters(
						'generateblocks.editor.control.label',
						__( 'Direction', 'generateblocks' ),
						'flexDirection',
						directionValue,
						styleSources,
					) }
					directionValue={ directionValue }
					fallback={ getResponsivePlaceholder( 'flexDirection', attributes, device, 'row' ) }
				/>
				}

				{ layout.alignItems &&
				<LayoutControl
					value={ getAttribute( 'alignItems', componentProps ) }
					onChange={ ( value ) => setAttributes( {
						[ getAttribute( 'alignItems', componentProps, true ) ]: value !== getAttribute( 'alignItems', componentProps ) ? value : '',
					} ) }
					label={ applyFilters(
						'generateblocks.editor.control.label',
						__( 'Align Items', 'generateblocks' ),
						'alignItems',
						getAttribute( 'alignItems', componentProps ),
						styleSources,
					) }
					attributeName="alignItems"
					directionValue={ directionValue }
					fallback={ getResponsivePlaceholder( 'alignItems', attributes, device, '' ) }
				/>
				}

				{ layout.justifyContent &&
				<LayoutControl
					value={ getAttribute( 'justifyContent', componentProps ) }
					onChange={ ( value ) => setAttributes( {
						[ getAttribute( 'justifyContent', componentProps, true ) ]: value !== getAttribute( 'justifyContent', componentProps ) ? value : '',
					} ) }
					label={ applyFilters(
						'generateblocks.editor.control.label',
						__( 'Justify Content', 'generateblocks' ),
						'justifyContent',
						getAttribute( 'justifyContent', componentProps ),
						styleSources,
					) }
					attributeName="justifyContent"
					directionValue={ directionValue }
					fallback={ getResponsivePlaceholder( 'justifyContent', attributes, device, '' ) }
				/>
				}

				{ layout.flexWrap &&
				<LayoutControl
					value={ getAttribute( 'flexWrap', componentProps ) }
					onChange={ ( value ) => setAttributes( {
						[ getAttribute( 'flexWrap', componentProps, true ) ]: value !== getAttribute( 'flexWrap', componentProps ) ? value : '',
					} ) }
					label={ applyFilters(
						'generateblocks.editor.control.label',
						__( 'Wrap', 'generateblocks' ),
						'flexWrap'
						getAttribute( 'flexWrap', componentProps ),
						styleSources,
					) }
					attributeName="flexWrap"
					directionValue={ directionValue }
					fallback={ getResponsivePlaceholder( 'flexWrap', attributes, device, '' ) }
				/>
				}

				{ ( layout.columnGap || layout.rowGap ) &&
				<FlexControl>
					{ layout.columnGap &&
					<UnitControl
						label={ applyFilters(
							'generateblocks.editor.control.label',
							__( 'Column Gap', 'generateblocks' ),
							'columnGap',
							getAttribute( 'columnGap', componentProps ),
							styleSources,
						) }
						id="gblocks-column-gap"
						value={ getAttribute( 'columnGap', componentProps ) }
						placeholder={ getResponsivePlaceholder( 'columnGap', attributes, device ) }
						onChange={ ( value ) => setAttributes( {
							[ getAttribute( 'columnGap', componentProps, true ) ]: value,
						} ) }
					/>
					}

					{ layout.rowGap &&
					<UnitControl
						label={ applyFilters(
							'generateblocks.editor.control.label',
							__( 'Row Gap', 'generateblocks' ),
							'rowGap',
							getAttribute( 'rowGap', componentProps ),
							styleSources,
						) }
						id="gblocks-row-gap"
						value={ getAttribute( 'rowGap', componentProps ) }
						placeholder={ getResponsivePlaceholder( 'rowGap', attributes, device ) }
						onChange={ ( value ) => setAttributes( {
							[ getAttribute( 'rowGap', componentProps, true ) ]: value,
						} ) }
					/>
					}
				</FlexControl>
				}
			</>
			}

			{ ! useInnerContainer &&
			<>
				{ layout.position &&
				<SelectControl
					label={ applyFilters(
						'generateblocks.editor.control.label',
						__( 'Position', 'generateblocks' ),
						'position',
						getAttribute( 'position', componentProps ),
						styleSources,
					) }
					value={ getAttribute( 'position', componentProps ) }
					options={ positionOptions }
					onChange={ ( value ) => setAttributes( {
						[ getAttribute( 'position', componentProps, true ) ]: value,
					} ) }
				/>
				}

				{ layout.overflow &&
				<FlexControl>
					<SelectControl
						label={ __( 'Overflow-x', 'generateblocks' ) }
						value={ getAttribute( 'overflowX', componentProps ) }
						options={ overflowOptions }
						onChange={ ( value ) => setAttributes( {
							[ getAttribute( 'overflowX', componentProps, true ) ]: value,
						} ) }
					/>

					<SelectControl
						label={ __( 'Overflow-y', 'generateblocks' ) }
						value={ getAttribute( 'overflowY', componentProps ) }
						options={ overflowOptions }
						onChange={ ( value ) => setAttributes( {
							[ getAttribute( 'overflowY', componentProps, true ) ]: value,
						} ) }
					/>
				</FlexControl>
				}
			</>
			}

			{ layout.zIndex &&
			<>
				{ !! useInnerContainer && 'Desktop' === device &&
				<>
					<ZIndex
						label={ __( 'Outer z-index', 'generateblocks' ) }
						value={ zindex }
						onChange={ ( value ) => setAttributes( { zindex: value } ) }
					/>

					<ZIndex
						label={ __( 'Inner z-index', 'generateblocks' ) }
						value={ innerZindex }
						onChange={ ( value ) => setAttributes( { innerZindex: value } ) }
					/>
				</>
				}

				{ ! useInnerContainer &&
				<ZIndex
					label={ __( 'z-index', 'generateblocks' ) }
					value={ getAttribute( 'zindex', componentProps ) }
					placeholder={ getResponsivePlaceholder( 'zindex', attributes, device ) }
					onChange={ ( value ) => setAttributes( {
						[ getAttribute( 'zindex', componentProps, true ) ]: value,
						[ getAttribute( 'position', componentProps, true ) ]: ! getAttribute( 'position', componentProps )
							? 'relative'
							: getAttribute( 'position', componentProps ),
					} ) }
				/>
				}
			</>
			}

			{ layout.themeWidth &&
			<>
				<ThemeWidth
					value={ align }
					onChange={ ( value ) => {
						setAttributes( {
							align: value,
						} );
					} }
				/>
			</>
			}

			{ !! useInnerContainer &&
			<MigrateInnerContainer
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			}

			{ flexChildPanel.enabled &&
			<FlexChild
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			}
		</PanelArea>
	);
}
