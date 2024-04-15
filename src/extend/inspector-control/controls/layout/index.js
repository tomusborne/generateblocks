import { __ } from '@wordpress/i18n';
import { useContext, useRef, useState, useEffect } from '@wordpress/element';
import { SelectControl, TextControl, BaseControl, Button } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import ControlsContext from '../../../../block-context';
import LayoutControl from './components/LayoutControl';
import isFlexLayout from '../../../../utils/is-flex-layout';
import isGridLayout from '../../../../utils/is-grid-layout';
import getAttribute from '../../../../utils/get-attribute';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';
import FlexDirection from './components/FlexDirection';
import LegacyLayoutControls from '../../../../blocks/container/components/LegacyLayoutControls';
import ZIndex from './components/ZIndex';
import MigrateInnerContainer from '../../../../components/migrate-inner-container';
import UnitControl from '../../../../components/unit-control';
import { positionOptions, overflowOptions } from './options';
import FlexControl from '../../../../components/flex-control';
import getDeviceType from '../../../../utils/get-device-type';
import ThemeWidth from './components/ThemeWidth';
import { useStyleIndicator, useDeviceAttributes } from '../../../../hooks';
import { getContentAttribute } from '../../../../utils/get-content-attribute';
import useParentAttributes from '../../../../hooks/useParentAttributes';
import { GridColumnSelector } from './components/GridColumnSelector';
import hasNumericValue from '../../../../utils/has-numeric-value';

export default function Layout( { attributes, setAttributes, computedStyles } ) {
	const device = getDeviceType();
	const { clientId, id, blockName, supports: { layout } } = useContext( ControlsContext );
	const contentValue = getContentAttribute( attributes, blockName );
	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const [ isFlexItem, setIsFlexItem ] = useState( false );
	const [ isGridItem, setIsGridItem ] = useState( false );
	const [ showGridTemplateColumns, setShowGridTemplateColumns ] = useState( false );
	const parentAttributes = useParentAttributes( clientId );
	const panelControls = {
		alignItems: false,
		columnGap: false,
		display: false,
		flexDirection: false,
		flexWrap: false,
		justifyContent: false,
		overflowX: false,
		overflowY: false,
		position: false,
		rowGap: false,
		zIndex: false,
	};
	const {
		dispatchControlGlobalStyle,
		styleSources,
		hasGlobalStyle,
		contentWasUpdated,
	} = useStyleIndicator( computedStyles, panelControls, contentValue, deviceAttributes );
	const panelRef = useRef( null );

	const componentProps = {
		attributes,
		deviceType: device,
	};

	const {
		display,
		displayTablet,
		displayMobile,
		useInnerContainer,
		zindex,
		innerZindex,
		align,
		order,
		isGrid: isGridBlockItem,
	} = attributes;

	const directionValue = getAttribute( 'flexDirection', componentProps ) || getResponsivePlaceholder( 'flexDirection', attributes, device, 'row' );
	const isFlex = isFlexLayout( { device, display, displayTablet, displayMobile } );
	const isGrid = isGridLayout( { device, display, displayTablet, displayMobile } );

	useEffect( () => {
		if ( ! parentAttributes.display ) {
			return;
		}

		const displayAttributes = {
			device,
			display: parentAttributes?.display,
			displayTablet: parentAttributes?.displayTablet,
			displayMobile: parentAttributes?.displayMobile,
		};

		setIsFlexItem( isFlexLayout( displayAttributes ) );
		setIsGridItem( isGridLayout( displayAttributes ) );
	}, [ parentAttributes ] );

	function getLabel( defaultLabel, rules ) {
		return applyFilters(
			'generateblocks.editor.control.label',
			defaultLabel,
			rules,
			styleSources,
			dispatchControlGlobalStyle,
			contentWasUpdated,
		);
	}

	const labels = {
		display: getLabel(
			__( 'Display', 'generateblocks' ),
			{
				display: getAttribute( 'display', componentProps ),
			},
		),
		flexDirection: getLabel(
			__( 'Direction', 'generateblocks' ),
			{
				flexDirection: directionValue,
			}
		),
		alignItems: getLabel(
			__( 'Align Items', 'generateblocks' ),
			{
				alignItems: getAttribute( 'alignItems', componentProps ),
			},
		),
		justifyContent: getLabel(
			__( 'Justify Content', 'generateblocks' ),
			{
				justifyContent: getAttribute( 'justifyContent', componentProps ),
			},
		),
		flexWrap: getLabel(
			__( 'Wrap', 'generateblocks' ),
			{
				flexWrap: getAttribute( 'flexWrap', componentProps ),
			},
		),
		columnGap: getLabel(
			__( 'Column Gap', 'generateblocks' ),
			{
				columnGap: getAttribute( 'columnGap', componentProps ),
			},
		),
		rowGap: getLabel(
			__( 'Row Gap', 'generateblocks' ),
			{
				rowGap: getAttribute( 'rowGap', componentProps ),
			},
		),
		gridTemplateColumns: getLabel(
			__( 'Grid Template Columns', 'generateblocks' ),
			{
				gridTemplateColumns: getAttribute( 'gridTemplateColumns', componentProps ),
			},
		),
		gridTemplateRows: getLabel(
			__( 'Grid Template Rows', 'generateblocks' ),
			{
				gridTemplateRows: getAttribute( 'gridTemplateRows', componentProps ),
			},
		),
		gridColumn: getLabel(
			__( 'Grid Column', 'generateblocks' ),
			{
				gridColumn: getAttribute( 'gridColumn', componentProps ),
			},
		),
		gridRow: getLabel(
			__( 'Grid Row', 'generateblocks' ),
			{
				gridRow: getAttribute( 'gridRow', componentProps ),
			},
		),
		position: getLabel(
			__( 'Position', 'generateblocks' ),
			{
				position: getAttribute( 'position', componentProps ),
			},
		),
		zIndex: getLabel(
			__( 'z-index', 'generateblocks' ),
			{
				zIndex: getAttribute( 'zindex', componentProps ),
			},
		),
		overflowX: getLabel(
			__( 'Oveflow-x', 'generateblocks' ),
			{
				overflowX: getAttribute( 'overflowX', componentProps ),
			},
		),
		overflowY: getLabel(
			__( 'Oveflow-y', 'generateblocks' ),
			{
				overflowY: getAttribute( 'overflowY', componentProps ),
			},
		),
		flexGrow: getLabel(
			__( 'Flex Grow', 'generateblocks' ),
			{
				flexGrow: getAttribute( 'flexGrow', componentProps ),
			},
		),
		flexShrink: getLabel(
			__( 'Flex Shrink', 'generateblocks' ),
			{
				flexShrink: getAttribute( 'flexShrink', componentProps ),
			},
		),
		flexBasis: getLabel(
			__( 'Flex Basis', 'generateblocks' ),
			{
				flexBasis: getAttribute( 'flexBasis', componentProps ),
			},
		),
		order: getLabel(
			__( 'Order', 'generateblocks' ),
			{
				order: getAttribute( 'order', componentProps ),
			},
		),
	};

	return (
		<PanelArea
			title={ __( 'Layout', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'layout' ) }
			className="gblocks-panel-label"
			id={ `${ id }Layout` }
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
					label={ labels.display }
					options={ [
						{ label: __( 'Default', 'generateblocks' ), value: '' },
						{ label: 'Block', value: 'block' },
						{ label: 'Inline Block', value: 'inline-block' },
						{ label: 'Flex', value: 'flex' },
						{ label: 'Inline Flex', value: 'inline-flex' },
						{ label: 'Inline', value: 'inline' },
						{ label: 'Grid', value: 'grid' },
					] }
					value={ getAttribute( 'display', componentProps ) }
					onChange={ ( nextDisplay ) => setAttributes( {
						[ getAttribute( 'display', componentProps, true ) ]: nextDisplay,
					} ) }
				/>
			}

			{ isFlex && ! useInnerContainer &&
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
							label={ labels.flexDirection }
							directionValue={ directionValue }
							fallback={ getResponsivePlaceholder( 'flexDirection', attributes, device, 'row' ) }
						/>
					}

					{ layout.flexWrap &&
						<LayoutControl
							value={ getAttribute( 'flexWrap', componentProps ) }
							onChange={ ( value ) => setAttributes( {
								[ getAttribute( 'flexWrap', componentProps, true ) ]: value !== getAttribute( 'flexWrap', componentProps ) ? value : '',
							} ) }
							label={ labels.flexWrap }
							attributeName="flexWrap"
							directionValue={ directionValue }
							fallback={ getResponsivePlaceholder( 'flexWrap', attributes, device, '' ) }
						/>
					}
				</>
			}

			{ isGrid && ! useInnerContainer &&
				<>
					{ layout.gridTemplateColumns &&
						<BaseControl
							label={ labels.gridTemplateColumns }
							id="grid-template-columns"
						>
							<div className="gb-grid-control__grid-template-columns-rows">
								<TextControl
									id="grid-template-columns"
									value={ deviceAttributes.gridTemplateColumns }
									onChange={ ( value ) => setDeviceAttributes( { gridTemplateColumns: value } ) }
								/>
								<Button
									size="small"
									onClick={ () => setShowGridTemplateColumns( ! showGridTemplateColumns ) }
									icon={ () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><rect x="32" y="56" width="192" height="144" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="96" y1="56" x2="96" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="160" y1="56" x2="160" y2="200" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="32" y1="104" x2="224" y2="104" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><line x1="32" y1="152" x2="224" y2="152" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg> }
									isPressed={ showGridTemplateColumns }
									label={ __( 'Choose a preset', 'generateblocks-pro' ) }
									showTooltip
								/>
							</div>

							{ !! showGridTemplateColumns && (
								<GridColumnSelector
									value={ deviceAttributes.gridTemplateColumns }
									onClick={ ( value ) => {
										setDeviceAttributes( { gridTemplateColumns: value } );
									} }
								/>
							) }
						</BaseControl>
					}

					{ layout.gridTemplateRows &&
						<TextControl
							label={ labels.gridTemplateRows }
							value={ deviceAttributes.gridTemplateRows }
							onChange={ ( value ) => setDeviceAttributes( { gridTemplateRows: value } ) }
						/>
					}
				</>
			}

			{ ( isFlex || isGrid ) && ! useInnerContainer &&
				<>
					{ layout.alignItems &&
						<LayoutControl
							value={ getAttribute( 'alignItems', componentProps ) }
							onChange={ ( value ) => setAttributes( {
								[ getAttribute( 'alignItems', componentProps, true ) ]: value !== getAttribute( 'alignItems', componentProps ) ? value : '',
							} ) }
							label={ labels.alignItems }
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
							label={ labels.justifyContent }
							attributeName="justifyContent"
							directionValue={ directionValue }
							fallback={ getResponsivePlaceholder( 'justifyContent', attributes, device, '' ) }
						/>
					}

					{ ( layout.columnGap || layout.rowGap ) &&
						<FlexControl>
							{ layout.columnGap &&
								<UnitControl
									label={ labels.columnGap }
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
									label={ labels.rowGap }
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

			{ isGridItem && ! useInnerContainer && (
				<>
					{ layout.gridColumn &&
						<TextControl
							type="text"
							label={ labels.gridColumn }
							value={ deviceAttributes.gridColumn }
							placeholder={ getResponsivePlaceholder( 'gridColumn', attributes, device ) }
							onChange={ ( value ) => setDeviceAttributes( { gridColumn: value } ) }
						/>
					}

					{ layout.gridRow &&
						<TextControl
							type="text"
							label={ labels.gridRow }
							value={ deviceAttributes.gridRow }
							placeholder={ getResponsivePlaceholder( 'gridRow', attributes, device ) }
							onChange={ ( value ) => setDeviceAttributes( { gridRow: value } ) }
						/>
					}
				</>
			) }

			{ ( isFlexItem || isGridBlockItem ) && (
				<>
					{ ( layout.flexGrow || layout.flexShrink ) &&
						<FlexControl>
							{ layout.flexGrow &&
								<TextControl
									label={ labels.flexGrow }
									id="gblocks-flex-grow"
									type={ 'number' }
									value={ deviceAttributes.flexGrow }
									min="0"
									step="1"
									placeholder={ getResponsivePlaceholder( 'flexGrow', attributes, device, '0' ) }
									onChange={ ( value ) => setDeviceAttributes( { flexGrow: value } ) }
									onBlur={ () => {
										if ( '' !== deviceAttributes.flexGrow ) {
											setDeviceAttributes( { flexGrow: parseFloat( deviceAttributes.flexGrow ) } );
										}
									} }
									onClick={ ( e ) => {
										// Make sure onBlur fires in Firefox.
										e.currentTarget.focus();
									} }
								/>
							}

							{ layout.flexShrink &&
								<TextControl
									label={ labels.flexShrink }
									id="gblocks-flex-shrink"
									type={ 'number' }
									value={ deviceAttributes.flexShrink }
									min="0"
									step="1"
									placeholder={ getResponsivePlaceholder( 'flexShrink', attributes, device, '1' ) }
									onChange={ ( value ) => setDeviceAttributes( { flexShrink: value } ) }
									onBlur={ () => {
										if ( '' !== deviceAttributes.flexShrink ) {
											setDeviceAttributes( { flexShrink: parseFloat( deviceAttributes.flexShrink ) } );
										}
									} }
									onClick={ ( e ) => {
										// Make sure onBlur fires in Firefox.
										e.currentTarget.focus();
									} }
								/>
							}
						</FlexControl>
					}

					{ layout.flexBasis &&
						<UnitControl
							id="gblocks-flex-basis"
							label={ labels.flexBasis }
							value={ deviceAttributes.flexBasis }
							placeholder={ getResponsivePlaceholder( 'flexBasis', attributes, device ) }
							onChange={ ( value ) => setDeviceAttributes( { flexBasis: value } ) }
						/>
					}
				</>
			) }

			{ ( isFlexItem || isGridItem || isGridBlockItem ) &&
				<>
					{ layout.order &&
						<TextControl
							type={ 'number' }
							label={ labels.order }
							value={ hasNumericValue( deviceAttributes.order ) ? deviceAttributes.order : '' }
							placeholder={ getResponsivePlaceholder( 'order', attributes, device ) }
							onChange={ ( value ) => setDeviceAttributes( { order: value } ) }
							onBlur={ () => {
								if ( '' !== deviceAttributes.order ) {
									setDeviceAttributes( { order: parseFloat( order ) } );
								}
							} }
							onClick={ ( e ) => {
							// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>
					}
				</>
			}

			{ ! useInnerContainer &&
				<>
					{ layout.position &&
						<SelectControl
							label={ labels.position }
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
								label={ labels.overflowX }
								value={ getAttribute( 'overflowX', componentProps ) }
								options={ overflowOptions }
								onChange={ ( value ) => setAttributes( {
									[ getAttribute( 'overflowX', componentProps, true ) ]: value,
								} ) }
							/>

							<SelectControl
								label={ labels.overflowY }
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
							label={ labels.zIndex }
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
		</PanelArea>
	);
}
