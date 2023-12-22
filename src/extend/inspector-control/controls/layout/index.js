import { __ } from '@wordpress/i18n';
import { useContext, useRef } from '@wordpress/element';
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
import { useStyleIndicator, useDeviceAttributes } from '../../../../hooks';
import { getContentAttribute } from '../../../../utils/get-content-attribute';

export default function Layout( { attributes, setAttributes, computedStyles } ) {
	const device = getDeviceType();
	const { id, blockName, supports: { layout, flexChildPanel } } = useContext( ControlsContext );
	const contentValue = getContentAttribute( attributes, blockName );
	const [ deviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
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
	} = attributes;

	const directionValue = getAttribute( 'flexDirection', componentProps ) || getResponsivePlaceholder( 'flexDirection', attributes, device, 'row' );

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
					] }
					value={ getAttribute( 'display', componentProps ) }
					onChange={ ( nextDisplay ) => setAttributes( {
						[ getAttribute( 'display', componentProps, true ) ]: nextDisplay,
					} ) }
				/>
			}

			{ isFlexItem( { device, display, displayTablet, displayMobile, computedStyles } ) && ! useInnerContainer &&
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

			{ flexChildPanel.enabled &&
				<FlexChild
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}
		</PanelArea>
	);
}
