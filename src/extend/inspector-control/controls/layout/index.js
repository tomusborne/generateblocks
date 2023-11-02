import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useContext, useState, useEffect } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import LayoutControl from './components/LayoutControl';
import Display from './components/Display';
import isFlexLayout from '../../../../utils/is-flex-layout';
import getAttribute from '../../../../utils/get-attribute';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';
import FlexDirection from './components/FlexDirection';
import LegacyLayoutControls from '../../../../blocks/container/components/LegacyLayoutControls';
import ZIndex from './components/ZIndex';
import FlexChild from '../flex-child-panel';
import MigrateInnerContainer from '../../../../components/migrate-inner-container';
import UnitControl from '../../../../components/unit-control';
import { SelectControl, TextControl } from '@wordpress/components';
import { positionOptions, overflowOptions } from './options';
import FlexControl from '../../../../components/flex-control';
import getDeviceType from '../../../../utils/get-device-type';
import ThemeWidth from './components/ThemeWidth';
import isGridLayout from '../../../../utils/is-grid-layout';
import useDeviceAttributes from '../../../../hooks/useDeviceAttributes';
import hasNumericValue from '../../../../utils/has-numeric-value';
import useParentAttributes from '../../../../hooks/useParentAttributes';

function LegacyLayoutPanelContent( { attributes, setAttributes } ) {
	const device = getDeviceType();
	const { supports: { flexChildPanel } } = useContext( ControlsContext );
	const {
		zindex,
		innerZindex,
		isGrid,
	} = attributes;

	return (
		<>
			<LegacyLayoutControls
				attributes={ attributes }
				setAttributes={ setAttributes }
				deviceType={ device }
				blockDefaults={ generateBlocksDefaults.container }
			/>

			{ 'Desktop' === device &&
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

			<MigrateInnerContainer
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			{ flexChildPanel.enabled && isGrid &&
				<FlexChild
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			}
		</>
	);
}

function LayoutPanelContent( { attributes, setAttributes } ) {
	const device = getDeviceType();
	const { clientId, supports: { layout } } = useContext( ControlsContext );
	const [ deviceAttributes, setDeviceAttributes ] = useDeviceAttributes( attributes, setAttributes );
	const [ isFlexItem, setIsFlexItem ] = useState( false );
	const [ isGridItem, setIsGridItem ] = useState( false );
	const parentAttributes = useParentAttributes( clientId );

	const componentProps = {
		attributes,
		deviceType: device,
	};

	const {
		display,
		displayTablet,
		displayMobile,
		align,
	} = attributes;

	const {
		gridTemplateColumns,
		gridTemplateRows,
		gridAutoColumns,
		gridAutoRows,
		gridColumn,
		gridRow,
		order,
		flexGrow,
		flexShrink,
		flexBasis,
	} = deviceAttributes;

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

	return (
		<>
			{ layout.display &&
				<Display
					value={ getAttribute( 'display', componentProps ) }
					onChange={ ( nextDisplay ) => setAttributes( {
						[ getAttribute( 'display', componentProps, true ) ]: nextDisplay,
					} ) }
				/>
			}

			{ isFlex && (
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
							label={ __( 'Direction', 'generateblocks' ) }
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
							label={ __( 'Wrap', 'generateblocks' ) }
							attributeName="flexWrap"
							directionValue={ directionValue }
							fallback={ getResponsivePlaceholder( 'flexWrap', attributes, device, '' ) }
						/>
					}
				</>
			) }

			{ isGrid && (
				<>
					{ layout.gridTemplateColumns &&
						<TextControl
							label={ __( 'Grid Template Columns', 'generateblocks' ) }
							value={ gridTemplateColumns }
							onChange={ ( value ) => setDeviceAttributes( { gridTemplateColumns: value } ) }
						/>
					}

					{ layout.gridTemplateRows &&
						<TextControl
							label={ __( 'Grid Template Rows', 'generateblocks' ) }
							value={ gridTemplateRows }
							onChange={ ( value ) => setDeviceAttributes( { gridTemplateRows: value } ) }
						/>
					}

					{ layout.gridAutoColumns &&
						<TextControl
							label={ __( 'Grid Auto Columns', 'generateblocks' ) }
							value={ gridAutoColumns }
							onChange={ ( value ) => setDeviceAttributes( { gridAutoColumns: value } ) }
						/>
					}

					{ layout.gridAutoRows &&
						<TextControl
							label={ __( 'Grid Auto Rows', 'generateblocks' ) }
							value={ gridAutoRows }
							onChange={ ( value ) => setDeviceAttributes( { gridAutoRows: value } ) }
						/>
					}
				</>
			) }

			{ ( isFlex || isGrid ) &&
				<>
					{ layout.alignItems &&
						<LayoutControl
							value={ getAttribute( 'alignItems', componentProps ) }
							onChange={ ( value ) => setAttributes( {
								[ getAttribute( 'alignItems', componentProps, true ) ]: value !== getAttribute( 'alignItems', componentProps ) ? value : '',
							} ) }
							label={ __( 'Align Items', 'generateblocks' ) }
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
							label={ __( 'Justify Content', 'generateblocks' ) }
							attributeName="justifyContent"
							directionValue={ directionValue }
							fallback={ getResponsivePlaceholder( 'justifyContent', attributes, device, '' ) }
						/>
					}

					{ ( layout.columnGap || layout.rowGap ) &&
						<FlexControl>
							{ layout.columnGap &&
								<UnitControl
									label={ __( 'Column Gap', 'generateblocks' ) }
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
									label={ __( 'Row Gap', 'generateblocks' ) }
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

			{ isGridItem && (
				<>
					{ layout.gridColumn &&
						<TextControl
							type="text"
							label={ __( 'Grid Column', 'generateblocks' ) }
							value={ gridColumn }
							placeholder={ getResponsivePlaceholder( 'gridColumn', attributes, device ) }
							onChange={ ( value ) => setDeviceAttributes( { gridColumn: value } ) }
						/>
					}

					{ layout.gridRow &&
						<TextControl
							type="text"
							label={ __( 'Grid Row', 'generateblocks' ) }
							value={ gridRow }
							placeholder={ getResponsivePlaceholder( 'gridRow', attributes, device ) }
							onChange={ ( value ) => setDeviceAttributes( { gridRow: value } ) }
						/>
					}
				</>
			) }

			{ isFlexItem && (
				<>
					{ layout.flexGrow &&
						<TextControl
							label={ __( 'Flex Grow', 'generateblocks' ) }
							id="gblocks-flex-grow"
							type={ 'number' }
							value={ flexGrow }
							min="0"
							step="1"
							placeholder={ getResponsivePlaceholder( 'flexGrow', attributes, device, '0' ) }
							onChange={ ( value ) => setDeviceAttributes( { flexGrow: value } ) }
							onBlur={ () => {
								if ( '' !== flexGrow ) {
									setDeviceAttributes( { flexGrow: parseFloat( flexGrow ) } );
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
							label={ __( 'Flex Shrink', 'generateblocks' ) }
							id="gblocks-flex-shrink"
							type={ 'number' }
							value={ flexShrink }
							min="0"
							step="1"
							placeholder={ getResponsivePlaceholder( 'flexShrink', attributes, device, '1' ) }
							onChange={ ( value ) => setDeviceAttributes( { flexShrink: value } ) }
							onBlur={ () => {
								if ( '' !== flexShrink ) {
									setDeviceAttributes( { flexShrink: parseFloat( flexShrink ) } );
								}
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>
					}

					{ layout.flexBasis &&
						<UnitControl
							label={ __( 'Flex Basis', 'generateblocks' ) }
							value={ flexBasis }
							placeholder={ getResponsivePlaceholder( 'flexBasis', attributes, device ) }
							onChange={ ( value ) => setDeviceAttributes( { flexBasis: value } ) }
						/>
					}
				</>
			) }

			{ ( isGridItem || isFlexItem ) &&
				<>
					{ layout.order &&
						<TextControl
							type={ 'number' }
							label={ __( 'Order', 'generateblocks' ) }
							value={ hasNumericValue( order ) ? order : '' }
							placeholder={ getResponsivePlaceholder( 'order', attributes, device ) }
							onChange={ ( value ) => setDeviceAttributes( { order: value } ) }
							onBlur={ () => {
								if ( '' !== order ) {
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

			{ layout.position &&
				<SelectControl
					label={ __( 'Position', 'generateblocks' ) }
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

			{ layout.zIndex &&
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
		</>
	);
}

export default function Layout( { attributes, setAttributes } ) {
	const { id } = useContext( ControlsContext );
	const { useInnerContainer } = attributes;
	const LayoutContent = ! useInnerContainer
		? LayoutPanelContent
		: LegacyLayoutPanelContent;

	return (
		<PanelArea
			title={ __( 'Layout', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'layout' ) }
			className="gblocks-panel-label"
			id={ `${ id }Layout` }
		>
			<LayoutContent
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
		</PanelArea>
	);
}
