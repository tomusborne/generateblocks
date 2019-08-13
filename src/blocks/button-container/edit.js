/**
 * Block: Buttons
 */

import classnames from 'classnames';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	TextControl,
	PanelBody,
	TabPanel,
	RangeControl,
	Notice,
	Tooltip,
	IconButton,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InspectorAdvancedControls,
	InnerBlocks,
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
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingTopMobile,
			paddingRightMobile,
			paddingBottomMobile,
			paddingLeftMobile,
		} = attributes;

		const css = `
			.fx-button-wrapper-` + uniqueId + ` {
			  padding-top: ` + paddingTop + `px;
			  padding-right: ` + paddingRight + `px;
			  padding-bottom: ` + paddingBottom + `px;
			  padding-left: ` + paddingLeft + `px;
			}
		`

		return (
			<Fragment>

				<InspectorControls>
				<PanelBody
					title={ __( 'Spacing', 'flex-blocks' ) }
					initialOpen={ true }
					>
						<TabPanel className="flex-blocks-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'desktop',
									title: __( 'Desktop', 'flex-blocks' ),
									className: 'desktop',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'flex-blocks' ),
									className: 'mobile',
								},
							] }>
							{
								( tab ) => {
									const isDesktop = tab.name === 'desktop';

									return (
										<div>
											{ isDesktop ? (
												<Fragment>

													<RangeControl
														label={ __( 'Top Padding', 'flex-blocks' ) }
														value={ paddingTop }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingTop: nextSpacing
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
														initialPosition={ flexBlocksDefaults.buttonContainer.paddingTop }
													/>

													<RangeControl
														label={ __( 'Right Padding', 'flex-blocks' ) }
														value={ paddingRight }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingRight: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
														initialPosition={ flexBlocksDefaults.buttonContainer.paddingRight }
													/>

													<RangeControl
														label={ __( 'Bottom Padding', 'flex-blocks' ) }
														value={ paddingBottom }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingBottom: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
														initialPosition={ flexBlocksDefaults.buttonContainer.paddingBottom }
													/>

													<RangeControl
														label={ __( 'Left Padding', 'flex-blocks' ) }
														value={ paddingLeft }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingLeft: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
														initialPosition={ flexBlocksDefaults.buttonContainer.paddingLeft }
													/>

												</Fragment>

											) : (

												<Fragment>
													<div className={ 'additional-class-notice' }>
														<Notice
															status={ 'warning' }
															isDismissible={ false }
														>
															{ __( 'Mobile options can not be live previewed at the moment.', 'flex-blocks' ) }
														</Notice>
													</div>

													<RangeControl
														label={ __( 'Top Padding', 'flex-blocks' ) }
														value={ paddingTopMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingTopMobile: nextSpacing
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
														initialPosition={ flexBlocksDefaults.buttonContainer.paddingTopMobile }
													/>

													<RangeControl
														label={ __( 'Right Padding', 'flex-blocks' ) }
														value={ paddingRightMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingRightMobile: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
														initialPosition={ flexBlocksDefaults.buttonContainer.paddingRightMobile }
													/>

													<RangeControl
														label={ __( 'Bottom Padding', 'flex-blocks' ) }
														value={ paddingBottomMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingBottomMobile: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
														initialPosition={ flexBlocksDefaults.buttonContainer.paddingBottomMobile }
													/>

													<RangeControl
														label={ __( 'Left Padding', 'flex-blocks' ) }
														value={ paddingLeftMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingLeftMobile: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
														initialPosition={ flexBlocksDefaults.buttonContainer.paddingLeftMobile }
													/>

												</Fragment>
											) }
										</div>
									);
								}
							}
						</TabPanel>
					</PanelBody>
				</InspectorControls>

				<InspectorAdvancedControls>
					<TextControl
						label={ __( 'Element ID', 'flex-blocks' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'flex-blocks' ) }
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
						template={ [ [ 'flex-blocks/button' ] ] }
						allowedBlocks={ [ 'flex-blocks/button' ] }
					/>

					<Tooltip text={ __( 'Add Button', 'flex-blocks' ) }>
                        <IconButton
                            icon={ 'insert' }
                            onClick={ () => {
								wp.data.dispatch( 'core/block-editor' ).insertBlocks( wp.blocks.createBlock( 'flex-blocks/button' ), undefined, clientId );
                            } }
                        />
                    </Tooltip>
				</div>
			</Fragment>
		);
	}
}

export default ( FlexButtonContainer );
