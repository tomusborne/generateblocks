/**
 * Block: Button Container
 */

import classnames from 'classnames';
import DimensionsControl from '../../components/dimensions/';
import getIcon from '../../utils/get-icon';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	TextControl,
	PanelBody,
	TabPanel,
	RangeControl,
	Notice,
	Tooltip,
	IconButton,
	BaseControl,
	ToggleControl,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
	AlignmentToolbar,
	BlockControls,
} = wp.blockEditor;

const {
	createBlock,
} = wp.blocks;

const {
    withSelect,
    withDispatch,
} = wp.data;

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
	}

	componentDidMount() {
		let id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbButtonContainerIds.push( id );
		} else if ( gbButtonContainerIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.attributes.uniqueId = id; // Need this to update ID on duplicate.

			this.props.setAttributes( {
				uniqueId: id,
			} );

			gbButtonContainerIds.push( id );
		} else {
			gbButtonContainerIds.push( this.props.attributes.uniqueId );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			toggleSelection,
			instanceId,
			clientId,
		} = this.props;

		const {
			uniqueId,
			elementId,
			cssClasses,
			alignment,
			alignmentTablet,
			alignmentMobile,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginUnit,
			marginSyncUnits,
			marginTopTablet,
			marginRightTablet,
			marginBottomTablet,
			marginLeftTablet,
			marginTopMobile,
			marginRightMobile,
			marginBottomMobile,
			marginLeftMobile,
			stack,
			stackTablet,
			stackMobile,
			fillHorizontalSpace,
			fillHorizontalSpaceTablet,
			fillHorizontalSpaceMobile,
		} = attributes;

		let flexAlignment = '',
			stacked = '',
			fillHorizontal = '',
			stackAndFill = '';

		if ( 'right' === alignment ) {
			flexAlignment = 'flex-end';
		} else {
			flexAlignment = alignment;
		}

		if ( stack ) {
			stacked = `
				.gb-button-wrapper-` + uniqueId + ` {
					flex-direction: column;
					align-items: ` + flexAlignment + `;
				}

				.gb-button-wrapper-` + uniqueId + ` > .block-editor-inner-blocks > .block-editor-block-list__layout {
					flex-direction: column;
				}
			`
		}

		if ( fillHorizontalSpace ) {
			fillHorizontal = `
				.gb-button-wrapper-` + uniqueId + ` {
					display: block;
				}

				.gb-button-wrapper-` + uniqueId + ` > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block {
					flex: 1;
				}

				.gb-button-wrapper-` + uniqueId + ` > .components-button {
					background: #fff;
					border: 1px solid #ddd;
					margin-top: 10px;
				}
			`
		}

		if ( stack && fillHorizontalSpace ) {
			stackAndFill = `
				.gb-button-wrapper-` + uniqueId + ` > .block-editor-inner-blocks > .block-editor-block-list__layout > .wp-block {
					width: 100% !important;
					box-sizing: border-box;
				}
			`
		}

		const css = `
			.gb-button-wrapper-` + uniqueId + ` {
			  margin-top: ` + marginTop + marginUnit + `;
			  margin-right: ` + marginRight + marginUnit + `;
			  margin-bottom: ` + marginBottom + marginUnit + `;
			  margin-left: ` + marginLeft + marginUnit + `;
			  justify-content: ` + flexAlignment + `;
			}

			` + stacked + fillHorizontal + stackAndFill + `
		`

		return (
			<Fragment>
				<BlockControls>
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
					<PanelBody
						title={ __( 'Spacing', 'generateblocks' ) }
						initialOpen={ true }
						icon={ getIcon( 'spacing' ) }
						className={ 'gblocks-panel-label' }
					>
						<TabPanel className="gblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'generateblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'generateblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'generateblocks' ),
									className: 'mobile',
								},
							] }>
							{
								( tab ) => {
									return (
										<div>
											{ 'default' === tab.name && (
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
														type={ 'margin' }
														label={ __( 'Margin', 'generateblocks' ) }
														valueTop={ marginTop }
														valueRight={ marginRight }
														valueBottom={ marginBottom }
														valueLeft={ marginLeft }
														valueUnit={ marginUnit }
														syncUnits={ marginSyncUnits }
														attrTop={ 'marginTop' }
														attrRight={ 'marginRight' }
														attrBottom={ 'marginBottom' }
														attrLeft={ 'marginLeft' }
														attrUnit={ 'marginUnit' }
														attrSyncUnits={ 'marginSyncUnits' }
													/>

													<ToggleControl
														label={ __( 'Stack Vertically', 'generateblocks' ) }
														checked={ !! stack }
														onChange={ ( value ) => {
															setAttributes( {
																stack: value
															} );
														} }
													/>

													<ToggleControl
														label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
														checked={ !! fillHorizontalSpace }
														onChange={ ( value ) => {
															setAttributes( {
																fillHorizontalSpace: value
															} );
														} }
													/>
												</Fragment>

											) }

											{ 'tablet' === tab.name && (
												<Fragment>
													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignmentTablet }
														onChange={ ( value ) => {
															setAttributes( { alignmentTablet: value } );
														} }
													/>

													<DimensionsControl { ...this.props }
														type={ 'margin' }
														label={ __( 'Margin', 'generateblocks' ) }
														valueTop={ marginTopTablet }
														valueRight={ marginRightTablet }
														valueBottom={ marginBottomTablet }
														valueLeft={ marginLeftTablet }
														valueUnit={ marginUnit }
														syncUnits={ marginSyncUnits }
														attrTop={ 'marginTopTablet' }
														attrRight={ 'marginRightTablet' }
														attrBottom={ 'marginBottomTablet' }
														attrLeft={ 'marginLeftTablet' }
														attrUnit={ 'marginUnit' }
														attrSyncUnits={ 'marginSyncUnits' }
													/>

													<ToggleControl
														label={ __( 'Stack Vertically', 'generateblocks' ) }
														checked={ !! stackTablet }
														onChange={ ( value ) => {
															setAttributes( {
																stackTablet: value
															} );
														} }
													/>

													<ToggleControl
														label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
														checked={ !! fillHorizontalSpaceTablet }
														onChange={ ( value ) => {
															setAttributes( {
																fillHorizontalSpaceTablet: value
															} );
														} }
													/>
												</Fragment>
											) }

											{ 'mobile' === tab.name && (
												<Fragment>
													<AlignmentToolbar
														isCollapsed={ false }
														value={ alignmentMobile }
														onChange={ ( value ) => {
															setAttributes( { alignmentMobile: value } );
														} }
													/>

													<DimensionsControl { ...this.props }
														type={ 'margin' }
														label={ __( 'Margin', 'generateblocks' ) }
														valueTop={ marginTopMobile }
														valueRight={ marginRightMobile }
														valueBottom={ marginBottomMobile }
														valueLeft={ marginLeftMobile }
														valueUnit={ marginUnit }
														syncUnits={ marginSyncUnits }
														attrTop={ 'marginTopMobile' }
														attrRight={ 'marginRightMobile' }
														attrBottom={ 'marginBottomMobile' }
														attrLeft={ 'marginLeftMobile' }
														attrUnit={ 'marginUnit' }
														attrSyncUnits={ 'marginSyncUnits' }
													/>

													<ToggleControl
														label={ __( 'Stack Vertically', 'generateblocks' ) }
														checked={ !! stackMobile }
														onChange={ ( value ) => {
															setAttributes( {
																stackMobile: value
															} );
														} }
													/>

													<ToggleControl
														label={ __( 'Fill Horizontal Space', 'generateblocks' ) }
														checked={ !! fillHorizontalSpaceMobile }
														onChange={ ( value ) => {
															setAttributes( {
																fillHorizontalSpaceMobile: value
															} );
														} }
													/>
												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody
						title={ __( 'Advanced', 'generateblocks' ) }
						initialOpen={ false }
						icon={ getIcon( 'advanced' ) }
						className={ 'gblocks-panel-label' }
					>
						<TextControl
							label={ __( 'Element ID', 'generateblocks' ) }
							value={ elementId }
							onChange={ ( elementId ) => {
								elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
								setAttributes( { elementId } );
							} }
						/>

						<TextControl
							label={ __( 'CSS Classes', 'generateblocks' ) }
							value={ cssClasses }
							onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
						/>
					</PanelBody>
				</InspectorControls>

				<style>{ css }</style>

				<div
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'gb-button-wrapper': true,
						[`gb-button-wrapper-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
				>
					<InnerBlocks
						template={ [ [ 'generateblocks/button' ] ] }
						allowedBlocks={ [ 'generateblocks/button' ] }
					/>

					<Tooltip text={ __( 'Add Button', 'generateblocks' ) }>
                        <IconButton
							className="gblocks-add-button"
                            icon={ 'insert' }
                            onClick={ () => {
								wp.data.dispatch( 'core/block-editor' ).insertBlocks( wp.blocks.createBlock( 'generateblocks/button' ), undefined, clientId );
                            } }
                        />
                    </Tooltip>
				</div>
			</Fragment>
		);
	}
}

export default ( GenerateButtonContainer );
