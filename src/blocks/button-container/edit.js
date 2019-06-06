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
} = wp.editor;

const {
	createBlock,
} = wp.blocks;

const {
    withSelect,
    withDispatch,
} = wp.data;

const ELEMENT_ID_REGEX = /[\s#]/g;

class GenerateButtonContainer extends Component {
	componentDidMount() {
		var instanceId = this.props.instanceId + 1;

		if ( ! this.props.attributes.uniqueId ) {
			this.props.setAttributes( {
				uniqueId: instanceId,
			} );
		} else if ( this.props.attributes.uniqueId && this.props.attributes.uniqueId !== instanceId ) {
			this.props.setAttributes( {
				uniqueId: instanceId,
			} );
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
			count,
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
			.gp-button-wrapper-` + uniqueId + ` {
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
					title={ __( 'Spacing', 'gp-premium' ) }
					initialOpen={ true }
					>
						<TabPanel className="generatepress-control-tabs"
							activeClass="active-tab"
							tabs={ [
								{
									name: 'desktop',
									title: __( 'Desktop', 'gp-premium' ),
									className: 'desktop',
								},
								{
									name: 'mobile',
									title: __( 'Mobile', 'gp-premium' ),
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
														label={ __( 'Top Padding', 'gp-premium' ) }
														value={ paddingTop }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingTop: nextSpacing
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
													/>

													<RangeControl
														label={ __( 'Right Padding', 'gp-premium' ) }
														value={ paddingRight }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingRight: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
													/>

													<RangeControl
														label={ __( 'Bottom Padding', 'gp-premium' ) }
														value={ paddingBottom }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingBottom: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
													/>

													<RangeControl
														label={ __( 'Left Padding', 'gp-premium' ) }
														value={ paddingLeft }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingLeft: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 10 }
													/>

												</Fragment>

											) : (

												<Fragment>
													<div className={ 'additional-class-notice' }>
														<Notice
															status={ 'warning' }
															isDismissible={ false }
														>
															{ __( 'Mobile options can not be live previewed at the moment.', 'gp-premium' ) }
														</Notice>
													</div>

													<RangeControl
														label={ __( 'Top Padding', 'gp-premium' ) }
														value={ paddingTopMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingTopMobile: nextSpacing
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
													/>

													<RangeControl
														label={ __( 'Right Padding', 'gp-premium' ) }
														value={ paddingRightMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingRightMobile: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
													/>

													<RangeControl
														label={ __( 'Bottom Padding', 'gp-premium' ) }
														value={ paddingBottomMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingBottomMobile: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
													/>

													<RangeControl
														label={ __( 'Left Padding', 'gp-premium' ) }
														value={ paddingLeftMobile }
														onChange={ ( nextSpacing ) => {
															setAttributes( {
																paddingLeftMobile: nextSpacing,
															} );
														} }
														min={ 0 }
														max={ 200 }
														step={ 1 }
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
						label={ __( 'Element ID', 'gp-premium' ) }
						value={ elementId }
						onChange={ ( elementId ) => {
							elementId = elementId.replace( ELEMENT_ID_REGEX, '-' );
							setAttributes( { elementId } );
						} }
					/>

					<TextControl
						label={ __( 'CSS Classes', 'gp-premium' ) }
						value={ cssClasses }
						onChange={ ( cssClasses ) => { setAttributes( { cssClasses } ) } }
					/>
				</InspectorAdvancedControls>

				<style>{ css }</style>

				<div
					id={ !! elementId ? elementId : undefined }
					className={ classnames( {
						'gp-button-wrapper': true,
						[`gp-button-wrapper-${ uniqueId }`]: true,
						[`${ cssClasses }`]: '' !== cssClasses
					} ) }
				>
					<InnerBlocks
						template={ [ [ 'generatepress/button' ] ] }
						allowedBlocks={ [ 'generatepress/button' ] }
					/>

					<Tooltip text={ __( 'Add Button', 'gp-premium' ) }>
                        <IconButton
                            icon={ 'insert' }
                            onClick={ () => {
								wp.data.dispatch( 'core/editor' ).insertBlocks( wp.blocks.createBlock( 'generatepress/button' ), undefined, clientId );
                            } }
                        />
                    </Tooltip>
				</div>
			</Fragment>
		);
	}
}

export default ( GenerateButtonContainer );
