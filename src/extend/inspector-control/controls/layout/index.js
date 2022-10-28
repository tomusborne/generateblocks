import { __ } from '@wordpress/i18n';
import PanelArea from '../../../../components/panel-area';
import getIcon from '../../../../utils/get-icon';
import { useDeviceType } from '../../../../hooks';
import { useContext } from '@wordpress/element';
import ControlsContext from '../../../../block-context';
import LayoutControl from './components/LayoutControl';
import Display from './components/Display';
import isFlexItem from '../../../../utils/is-flex-item';
import getAttribute from '../../../../utils/get-attribute';
import getResponsivePlaceholder from '../../../../utils/get-responsive-placeholder';
import FlexDirection from './components/FlexDirection';
import LegacyLayoutControls from '../../../../blocks/container/components/LegacyLayoutControls';
import ZIndex from './components/ZIndex';
import FlexChild from '../flex-child-panel';
import MigrateInnerContainer from '../../../../components/migrate-inner-container';
import UnitControl from '../../../../components/unit-control';

export default function Layout( { attributes, setAttributes } ) {
	const [ device ] = useDeviceType();
	const { id, supports: { layout, flexChildPanel } } = useContext( ControlsContext );

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
		columnGap,
		columnGapTablet,
		rowGap,
		rowGapTablet,
	} = attributes;

	const directionValue = getResponsivePlaceholder( 'flexDirection', attributes, device, 'row' );

	return (
		<PanelArea
			title={ __( 'Layout', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'layout' ) }
			className="gblocks-panel-label"
			id={ `${ id }Layout` }
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
				<Display
					value={ getAttribute( 'display', componentProps ) }
					onChange={ ( nextDisplay ) => setAttributes( {
						[ getAttribute( 'display', componentProps, true ) ]: nextDisplay,
					} ) }
				/>
			}

			{ isFlexItem( { device, display, displayTablet, displayMobile } ) && ! useInnerContainer &&
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
						/>
					}

					{ layout.alignItems &&
						<LayoutControl
							value={ getAttribute( 'alignItems', componentProps ) }
							onChange={ ( value ) => setAttributes( {
								[ getAttribute( 'alignItems', componentProps, true ) ]: value !== getAttribute( 'alignItems', componentProps ) ? value : '',
							} ) }
							label={ __( 'Align Items', 'generateblocks' ) }
							attributeName="alignItems"
							directionValue={ directionValue }
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
						/>
					}

					{ ( layout.columnGap || layout.rowGap ) &&
						<div className="gblocks-layout-gap">
							{ layout.columnGap &&
								<UnitControl
									label={ __( 'Column Gap', 'generateblocks' ) }
									id="gblocks-column-gap"
									units={ [ 'px', '%', 'vw', 'rem' ] }
									value={ getAttribute( 'columnGap', componentProps ) }
									desktopValue={ columnGap }
									tabletValue={ columnGapTablet }
									onChange={ ( value ) => setAttributes( {
										[ getAttribute( 'columnGap', componentProps, true ) ]: value,
									} ) }
								/>
							}

							{ layout.rowGap &&
								<UnitControl
									label={ __( 'Row Gap', 'generateblocks' ) }
									id="gblocks-row-gap"
									units={ [ 'px', '%', 'vw', 'rem' ] }
									value={ getAttribute( 'rowGap', componentProps ) }
									desktopValue={ rowGap }
									tabletValue={ rowGapTablet }
									onChange={ ( value ) => setAttributes( {
										[ getAttribute( 'rowGap', componentProps, true ) ]: value,
									} ) }
								/>
							}
						</div>
					}
				</>
			}

			{ layout.zIndex && 'Desktop' === device &&
				<>
					<ZIndex
						label={ useInnerContainer && __( 'Outer z-index', 'generateblocks' ) }
						value={ zindex }
						onChange={ ( value ) => setAttributes( { zindex: value } ) }
					/>

					{ useInnerContainer &&
						<ZIndex
							label={ __( 'Inner z-index', 'generateblocks' ) }
							value={ innerZindex }
							onChange={ ( value ) => setAttributes( { innerZindex: value } ) }
						/>
					}
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