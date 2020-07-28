/**
 * Block: Button Container
 */

import classnames from 'classnames';
import DimensionsControl from '../../components/dimensions/';
import ResponsiveTabs from '../../components/responsive-tabs';
import getIcon from '../../utils/get-icon';
import getSelectedDevice from '../../utils/get-selected-device';
import DesktopCSS from './css/desktop.js';
import PanelArea from '../../components/panel-area/';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	TextControl,
	Tooltip,
	Button,
	ToggleControl,
	Toolbar,
} = wp.components;

const {
	Fragment,
	Component,
} = wp.element;

const {
	InspectorControls,
	InnerBlocks,
	AlignmentToolbar,
	BlockControls,
} = wp.blockEditor;

const {
	createBlock,
	cloneBlock,
} = wp.blocks;

const {
	applyFilters,
} = wp.hooks;

const ELEMENT_ID_REGEX = /[\s#]/g;
const gbButtonContainerIds = [];

const ALIGNMENT_CONTROLS = [
	{
		icon: 'editor-alignleft',
		title: __( 'Align Buttons Left', 'generateblocks' ),
		align: 'left',
	},
	{
		icon: 'editor-aligncenter',
		title: __( 'Align Buttons Center', 'generateblocks' ),
		align: 'center',
	},
	{
		icon: 'editor-alignright',
		title: __( 'Align Buttons Right', 'generateblocks' ),
		align: 'right',
	},
];

class GenerateButtonContainer extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedDevice: 'desktop',
		};
	}

	componentDidMount() {
		const id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbButtonContainerIds.push( id );
		} else if ( gbButtonContainerIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbButtonContainerIds.push( id );
		} else {
			gbButtonContainerIds.push( this.props.attributes.uniqueId );
		}

		const thisBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( this.props.clientId )[ 0 ];

		if ( thisBlock ) {
			const childBlocks = thisBlock.innerBlocks;

			if ( 0 === childBlocks.length ) {
				wp.data.dispatch( 'core/block-editor' ).insertBlocks( createBlock( 'generateblocks/button', generateBlocksStyling.button ), undefined, this.props.clientId );
			}
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			clientId,
		} = this.props;

		const {
			selectedDevice,
		} = this.state;

		const {
			uniqueId,
			elementId,
			cssClasses,
			alignment,
			alignmentTablet,
			alignmentMobile,
			stack,
			stackTablet,
			stackMobile,
			fillHorizontalSpace,
			fillHorizontalSpaceTablet,
			fillHorizontalSpaceMobile,
		} = attributes;

		let htmlAttributes = {
			id: !! elementId ? elementId : undefined,
			className: classnames( {
				'gb-button-wrapper': true,
				[ `gb-button-wrapper-${ uniqueId }` ]: true,
				[ `${ cssClasses }` ]: '' !== cssClasses,
			} ),
		};

		htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button-container', attributes );

		return (
			<Fragment>
				<BlockControls>
					<Toolbar>
						<Tooltip text={ __( 'Add Button', 'generateblocks' ) }>
							<Button
								className="gblocks-add-new-button"
								icon={ 'insert' }
								onClick={ () => {
									const thisBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];

									if ( thisBlock ) {
										const childBlocks = thisBlock.innerBlocks;
										const keys = Object.keys( childBlocks );
										const lastKey = keys[ keys.length - 1 ];

										if ( typeof childBlocks[ lastKey ] !== 'undefined' ) {
											const blockToCopyId = childBlocks[ lastKey ].clientId;

											if ( blockToCopyId ) {
												const blockToCopy = wp.data.select( 'core/block-editor' ).getBlocksByClientId( blockToCopyId )[ 0 ];
												const clonedBlock = cloneBlock( blockToCopy );

												wp.data.dispatch( 'core/block-editor' ).insertBlocks( clonedBlock, undefined, clientId );
											}
										} else if ( 0 === childBlocks.length ) {
											wp.data.dispatch( 'core/block-editor' ).insertBlocks( createBlock( 'generateblocks/button', generateBlocksStyling.button ), undefined, clientId );
										}
									}
								} }
							/>
						</Tooltip>
					</Toolbar>
					<AlignmentToolbar
						isCollapsed={ false }
						value={ alignment }
						alignmentControls={ ALIGNMENT_CONTROLS }
						onChange={ ( nextAlign ) => {
							setAttributes( { alignment: nextAlign } );
						} }
					/>
				</BlockControls>

				<InspectorControls>
					<ResponsiveTabs { ...this.props }
						selectedDevice={ getSelectedDevice( selectedDevice ) }
						onClick={ ( device ) => {
							window.localStorage.setItem( 'generateblocksSelectedDevice', device );

							this.setState( {
								selectedDevice: device,
							} );
						} }
					/>

					<PanelArea { ...this.props }
						title={ __( 'Spacing', 'generateblocks' ) }
						initialOpen={ true }
						icon={ getIcon( 'spacing' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonContainerSpacing' }
						state={ this.state }
					>
						{ 'desktop' === getSelectedDevice( selectedDevice ) && (
							<Fragment>
								<AlignmentToolbar
									isCollapsed={ false }
									value={ alignment }
									alignmentControls={ ALIGNMENT_CONTROLS }
									onChange={ ( value ) => {
										setAttributes( { alignment: value } );
									} }
								/>

								<DimensionsControl { ...this.props }
									device={ getSelectedDevice( selectedDevice ) }
									type={ 'margin' }
									label={ __( 'Margin', 'generateblocks' ) }
									attrTop={ 'marginTop' }
									attrRight={ 'marginRight' }
									attrBottom={ 'marginBottom' }
									attrLeft={ 'marginLeft' }
									attrUnit={ 'marginUnit' }
									attrSyncUnits={ 'marginSyncUnits' }
									defaults={ generateBlocksDefaults.buttonContainer }
								/>

								<ToggleControl
									label={ __( 'Stack Vertically', 'generateblocks' ) }
									checked={ !! stack }
									onChange={ ( value ) => {
										setAttributes( {
											stack: value,
										} );
									} }
								/>

								<ToggleControl
									label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
									checked={ !! fillHorizontalSpace }
									onChange={ ( value ) => {
										setAttributes( {
											fillHorizontalSpace: value,
										} );
									} }
								/>
							</Fragment>
						) }

						{ 'tablet' === getSelectedDevice( selectedDevice ) && (
							<Fragment>
								<AlignmentToolbar
									isCollapsed={ false }
									value={ alignmentTablet }
									alignmentControls={ ALIGNMENT_CONTROLS }
									onChange={ ( value ) => {
										setAttributes( { alignmentTablet: value } );
									} }
								/>

								<DimensionsControl { ...this.props }
									device={ getSelectedDevice( selectedDevice ) }
									type={ 'margin' }
									label={ __( 'Margin', 'generateblocks' ) }
									attrTop={ 'marginTopTablet' }
									attrRight={ 'marginRightTablet' }
									attrBottom={ 'marginBottomTablet' }
									attrLeft={ 'marginLeftTablet' }
									attrUnit={ 'marginUnit' }
									attrSyncUnits={ 'marginSyncUnits' }
									defaults={ generateBlocksDefaults.buttonContainer }
								/>

								<ToggleControl
									label={ __( 'Stack Vertically', 'generateblocks' ) }
									checked={ !! stackTablet }
									onChange={ ( value ) => {
										setAttributes( {
											stackTablet: value,
										} );
									} }
								/>

								<ToggleControl
									label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
									checked={ !! fillHorizontalSpaceTablet }
									onChange={ ( value ) => {
										setAttributes( {
											fillHorizontalSpaceTablet: value,
										} );
									} }
								/>
							</Fragment>
						) }

						{ 'mobile' === getSelectedDevice( selectedDevice ) && (
							<Fragment>
								<AlignmentToolbar
									isCollapsed={ false }
									value={ alignmentMobile }
									alignmentControls={ ALIGNMENT_CONTROLS }
									onChange={ ( value ) => {
										setAttributes( { alignmentMobile: value } );
									} }
								/>

								<DimensionsControl { ...this.props }
									device={ getSelectedDevice( selectedDevice ) }
									type={ 'margin' }
									label={ __( 'Margin', 'generateblocks' ) }
									attrTop={ 'marginTopMobile' }
									attrRight={ 'marginRightMobile' }
									attrBottom={ 'marginBottomMobile' }
									attrLeft={ 'marginLeftMobile' }
									attrUnit={ 'marginUnit' }
									attrSyncUnits={ 'marginSyncUnits' }
									defaults={ generateBlocksDefaults.buttonContainer }
								/>

								<ToggleControl
									label={ __( 'Stack Vertically', 'generateblocks' ) }
									checked={ !! stackMobile }
									onChange={ ( value ) => {
										setAttributes( {
											stackMobile: value,
										} );
									} }
								/>

								<ToggleControl
									label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
									checked={ !! fillHorizontalSpaceMobile }
									onChange={ ( value ) => {
										setAttributes( {
											fillHorizontalSpaceMobile: value,
										} );
									} }
								/>
							</Fragment>
						) }

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonContainerSpacing', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Advanced', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'advanced' ) }
						className={ 'gblocks-panel-label' }
						id={ 'buttonContainerAdvanced' }
						state={ this.state }
						showPanel={ 'desktop' === getSelectedDevice( selectedDevice ) || false }
					>
						<TextControl
							label={ __( 'Element ID', 'generateblocks' ) }
							value={ elementId }
							onChange={ ( value ) => {
								const newElementId = value.replace( ELEMENT_ID_REGEX, '-' );

								setAttributes( {
									elementId: newElementId,
								} );
							} }
						/>

						<TextControl
							label={ __( 'CSS Classes', 'generateblocks' ) }
							value={ cssClasses }
							onChange={ ( value ) => {
								setAttributes( {
									cssClasses: value,
								} );
							} }
						/>

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonContainerAdvanced', this.props, this.state ) }
					</PanelArea>

					<PanelArea { ...this.props }
						title={ __( 'Documentation', 'generateblocks' ) }
						icon={ getIcon( 'documentation' ) }
						initialOpen={ false }
						className={ 'gblocks-panel-label' }
						id={ 'buttonContainerDocumentation' }
						state={ this.state }
					>
						<p>{ __( 'Need help with this block?', 'generateblocks' ) }</p>
						<a href="https://docs.generateblocks.com/collection/buttons/" target="_blank" rel="noreferrer noopener">{ __( 'Visit our documentation', 'generateblocks' ) }</a>

						{ applyFilters( 'generateblocks.editor.controls', '', 'buttonContainerDocumentation', this.props, this.state ) }
					</PanelArea>
				</InspectorControls>

				<DesktopCSS { ...this.props } />

				<div
					{ ...htmlAttributes }
				>
					<InnerBlocks
						allowedBlocks={ [ 'generateblocks/button' ] }
						renderAppender={ () => (
							<Tooltip text={ __( 'Add Button', 'generateblocks' ) }>
								<Button
									className="gblocks-add-new-button gblocks-button-container-appender"
									icon={ 'insert' }
									onClick={ () => {
										wp.data.dispatch( 'core/block-editor' ).insertBlocks( createBlock( 'generateblocks/button', generateBlocksStyling.button ), undefined, clientId );
									} }
								/>
							</Tooltip>
						) }
					/>
				</div>
			</Fragment>
		);
	}
}

export default ( GenerateButtonContainer );
