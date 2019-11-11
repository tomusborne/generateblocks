/**
 * Block: Button Container
 */

import classnames from 'classnames';
import DimensionsControl from '../../components/dimensions/';

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
const fbButtonContainerIds = [];

class FlexButtonContainer extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {
		let id = this.props.clientId.substr( 2, 9 ).replace( '-', '' );

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbButtonContainerIds.push( id );
		} else if ( fbButtonContainerIds.includes( this.props.attributes.uniqueId ) ) {
			this.props.setAttributes( {
				uniqueId: id,
			} );

			fbButtonContainerIds.push( id );
		} else {
			fbButtonContainerIds.push( this.props.attributes.uniqueId );
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
			stacked = '';

		if ( 'right' === alignment ) {
			flexAlignment = 'flex-end';
		} else {
			flexAlignment = alignment;
		}

		if ( stack ) {
			stacked = `
				.fx-button-wrapper-` + uniqueId + ` {
					flex-direction: column;
					align-items: ` + flexAlignment + `;
				}

				.fx-button-wrapper-` + uniqueId + ` > .editor-inner-blocks > .editor-block-list__layout {
					flex-direction: column;
				}
			`
		}

		const css = `
			.fx-button-wrapper-` + uniqueId + ` {
			  margin-top: ` + marginTop + marginUnit + `;
			  margin-right: ` + marginRight + marginUnit + `;
			  margin-bottom: ` + marginBottom + marginUnit + `;
			  margin-left: ` + marginLeft + marginUnit + `;
			  justify-content: ` + flexAlignment + `;
			}

			` + stacked + `
		`

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						isCollapsed={ false }
						value={ alignment }
						onChange={ ( nextAlign ) => {
							setAttributes( { alignment: nextAlign } );
						} }
					/>
				</BlockControls>

				<InspectorControls>
					<PanelBody
						title={ __( 'Spacing', 'flexblocks' ) }
						initialOpen={ true }
					>
						<TabPanel className="flexblocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'default',
									title: __( 'Default', 'flexblocks' ),
									className: 'default',
								},
								{
									name: 'tablet',
									title: __( 'Tablet', 'flexblocks' ),
									className: 'tablet',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'flexblocks' ),
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
														onChange={ ( value ) => {
															setAttributes( { alignment: value } );
														} }
													/>

													<DimensionsControl { ...this.props }
														type={ 'margin' }
														label={ __( 'Margin', 'flexblocks' ) }
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
														label={ __( 'Stack Vertically', 'flexblocks' ) }
														checked={ !! stack }
														onChange={ ( value ) => {
															setAttributes( {
																stack: value
															} );
														} }
													/>

													<ToggleControl
														label={ __( 'Fill Horizontal Space', 'flexblocks' ) }
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
														label={ __( 'Margin', 'flexblocks' ) }
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
														label={ __( 'Stack Vertically', 'flexblocks' ) }
														checked={ !! stackTablet }
														onChange={ ( value ) => {
															setAttributes( {
																stackTablet: value
															} );
														} }
													/>

													<ToggleControl
														label={ __( 'Fill Horizontal Space', 'flexblocks' ) }
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
														label={ __( 'Margin', 'flexblocks' ) }
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
														label={ __( 'Stack Vertically', 'flexblocks' ) }
														checked={ !! stackMobile }
														onChange={ ( value ) => {
															setAttributes( {
																stackMobile: value
															} );
														} }
													/>

													<ToggleControl
														label={ __( 'Fill Horizontal Space', 'flexblocks' ) }
														checked={ !! fillHorizontalSpaceMobile }
														onChange={ ( value ) => {
															setAttributes( {
																fillHorizontalSpaceMobile: value
															} );
														} }
													/>
												</Fragment>
											) : '' }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'Element ID', 'flexblocks' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'flexblocks' ) }
						value={ cssClasses }
						onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
					/>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<div
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'fx-button-wrapper': true,
						[`fx-button-wrapper-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
				>
					<InnerBlocks
						template={ [ [ 'flexblocks/button' ] ] }
						allowedBlocks={ [ 'flexblocks/button' ] }
					/>

					<Tooltip text={ __( 'Add Button', 'flexblocks' ) }>
                        <IconButton
                            icon={ 'insert' }
                            onClick={ () => {
								wp.data.dispatch( 'core/block-editor' ).insertBlocks( wp.blocks.createBlock( 'flexblocks/button' ), undefined, clientId );
                            } }
                        />
                    </Tooltip>
				</div>
			</Fragment>
		);
	}
}

export default ( FlexButtonContainer );
