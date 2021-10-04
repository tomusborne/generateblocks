/**
 * Block: Grid
 */

import classnames from 'classnames';
import MainCSS from './css/main.js';
import hasNumericValue from '../../utils/has-numeric-value';
import isBlockVersionLessThan from '../../utils/check-block-version';
import wasBlockJustInserted from '../../utils/was-block-just-inserted';
import BlockControls from './components/BlockControls';
import InspectorControls from './components/InspectorControls';
import ComponentCSS from './components/ComponentCSS'
import InspectorAdvancedControls from './components/InspectorAdvancedControls';
import { __ } from '@wordpress/i18n';
import { Placeholder } from '@wordpress/components';
import {
	Fragment,
	Component,
} from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { applyFilters } from '@wordpress/hooks';
import {
	withSelect,
	withDispatch,
} from '@wordpress/data';
import { compose } from '@wordpress/compose';

class GenerateBlockGridContainer extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
			selectedLayout: false,
			selectedDevice: 'Desktop',
		};

		this.onLayoutSelect = this.onLayoutSelect.bind( this );
		this.getColumnsFromLayout = this.getColumnsFromLayout.bind( this );
		this.getLayoutsSelector = this.getLayoutsSelector.bind( this );
		this.getDeviceType = this.getDeviceType.bind( this );
		this.setDeviceType = this.setDeviceType.bind( this );
	}

	componentDidMount() {
		// This block used to be static. Set it to dynamic by default from now on.
		if ( 'undefined' === typeof this.props.attributes.isDynamic || ! this.props.attributes.isDynamic ) {
			this.props.setAttributes( {
				isDynamic: true,
			} );
		}

		// Set our old defaults as static values.
		// @since 1.4.0.
		if ( ! wasBlockJustInserted( this.props.attributes ) && isBlockVersionLessThan( this.props.attributes.blockVersion, 2 ) ) {
			const legacyDefaults = generateBlocksLegacyDefaults.v_1_4_0.gridContainer;

			const newAttrs = {};

			const hasGlobalStyle = 'undefined' !== typeof this.props.attributes.useGlobalStyle && this.props.attributes.useGlobalStyle && 'undefined' !== typeof this.props.attributes.globalStyleId && this.props.attributes.globalStyleId;

			if ( ! hasGlobalStyle && ! hasNumericValue( this.props.attributes.horizontalGap ) ) {
				newAttrs.horizontalGap = legacyDefaults.horizontalGap;
			}

			if ( Object.keys( newAttrs ).length > 0 ) {
				this.props.setAttributes( newAttrs );
			}
		}

		// Update block version flag if it's out of date.
		if ( isBlockVersionLessThan( this.props.attributes.blockVersion, 2 ) ) {
			this.props.setAttributes( { blockVersion: 2 } );
		}
	}

	componentDidUpdate() {
		const {
			attributes,
			setAttributes,
			clientId,
		} = this.props;

		let {
			columns,
		} = attributes;

		if ( this.state.selectedLayout ) {
			const columnsData = this.getColumnsFromLayout( this.state.selectedLayout );

			columnsData.forEach( ( colAttrs ) => {
				wp.data.dispatch( 'core/block-editor' ).insertBlocks( createBlock( 'generateblocks/container', colAttrs ), undefined, clientId, false );
			} );

			columns = columnsData.length;

			setAttributes( {
				columns,
			} );

			this.setState( {
				selectedLayout: false,
			} );
		} else {
			const parentBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ];

			if ( parentBlock ) {
				const childBlocks = parentBlock.innerBlocks;
				columns = childBlocks.length;

				setAttributes( {
					columns,
				} );
			}
		}
	}

	/**
	 * Get columns sizes array from layout string
	 *
	 * @param {string} layout - layout data. Example: `3-6-3`
	 * @return {Array}.
	 */
	getColumnsFromLayout( layout ) {
		const result = [];
		const columnsData = layout.split( '-' );

		let i = 0;
		columnsData.forEach( () => {
			const colAttrs = {
				isGrid: true,
				gridId: this.props.attributes.uniqueId,
				paddingTop: generateBlocksStyling.container.gridItemPaddingTop || '',
				paddingRight: generateBlocksStyling.container.gridItemPaddingRight || '',
				paddingBottom: generateBlocksStyling.container.gridItemPaddingBottom || '',
				paddingLeft: generateBlocksStyling.container.gridItemPaddingLeft || '',
				widthMobile: 100,
			};

			colAttrs.width = Number( columnsData[ i ] );
			i++;

			result.push( colAttrs );
		} );

		return result;
	}

	/**
	 * Layouts selector when no columns selected.
	 *
	 * @return {JSX}.
	 */
	getLayoutsSelector() {
		const layouts = [
			'100',
			'50-50',
			'33.33-33.33-33.33',
			'25-25-25-25',

			'25-75',
			'75-25',
			'25-25-50',
			'25-50-25',

			'50-25-25',
			'20-60-20',
			'20-20-20-20-20',
			'16-16-16-16-16-16',
		];

		return (
			<Placeholder
				label={ __( 'Grid', 'generateblocks' ) }
				instructions={ __( 'Select one layout to get started.', 'generateblocks' ) }
				className="gb-select-layout"
			>
				<div className="gb-grid-wrapper-layout-preview">
					{ layouts.map( ( layout ) => {
						const columnsData = this.getColumnsFromLayout( layout );

						return (
							<button
								key={ `layout-${ layout }` }
								className="gb-grid-wrapper-layout-preview-btn"
								onClick={ () => this.onLayoutSelect( layout ) }
							>
								{ columnsData.map( ( colAttrs, i ) => {
									return (
										<div
											key={ `layout-${ layout }-col-${ i }` }
											className={ classnames( 'gb-col', `gb-col-${ colAttrs.width }` ) }
										/>
									);
								} ) }
							</button>
						);
					} ) }
				</div>
			</Placeholder>
		);
	}

	/**
	 * Select predefined layout.
	 *
	 * @param {string} layout layout string.
	 */
	onLayoutSelect( layout ) {
		this.setState( {
			selectedLayout: layout,
		} );
	}

	getDeviceType() {
		let deviceType = this.props.deviceType ? this.props.deviceType : this.state.selectedDevice;

		if ( ! generateBlocksInfo.syncResponsivePreviews ) {
			deviceType = this.state.selectedDevice;
		}

		return deviceType;
	}

	setDeviceType( deviceType ) {
		if ( generateBlocksInfo.syncResponsivePreviews && this.props.deviceType ) {
			this.props.setDeviceType( deviceType );
			this.setState( { selectedDevice: deviceType } );
		} else {
			this.setState( { selectedDevice: deviceType } );
		}
	}

	render() {
		const {
			attributes,
			setAttributes,
			clientId,
		} = this.props;

		const {
			uniqueId,
			className,
			anchor,
			columns,
		} = attributes;

		let htmlAttributes = {
			className: classnames( {
				'gb-grid-wrapper': true,
				[ `gb-grid-wrapper-${ uniqueId }` ]: true,
				[ `${ className }` ]: undefined !== className,
			} ),
			id: anchor ? anchor : null,
		};

		htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/grid', attributes );

		return (
			<Fragment>
				{ ( columns > 0 || this.state.selectedLayout ) &&
					<BlockControls uniqueId={ uniqueId } clientId={ clientId } />
				}

				<InspectorControls
					{ ...this.props }
					state={ { ...this.state } }
					deviceType={ this.getDeviceType() }
					setDeviceType={ this.setDeviceType }
					blockDefaults={ generateBlocksDefaults.gridContainer }
				/>

				<InspectorAdvancedControls
					anchor={ anchor }
					setAttributes={ setAttributes }
				/>

				<MainCSS { ...this.props } />

				<ComponentCSS { ...this.props } />

				<div
					{ ...htmlAttributes }
				>
					{ columns > 0 || this.state.selectedLayout ? (
						<Fragment>
							<InnerBlocks
								allowedBlocks={ [ 'generateblocks/container' ] }
								renderAppender={ false }
							/>
						</Fragment>
					) : this.getLayoutsSelector() }
				</div>
			</Fragment>
		);
	}
}

export default compose( [
	withDispatch( ( dispatch ) => ( {
		setDeviceType( type ) {
			const {
				__experimentalSetPreviewDeviceType: setPreviewDeviceType,
			} = dispatch( 'core/edit-post' ) || false;

			if ( ! setPreviewDeviceType ) {
				return;
			}

			setPreviewDeviceType( type );
		},
	} ) ),
	withSelect( ( select ) => {
		const {
			__experimentalGetPreviewDeviceType: getPreviewDeviceType,
		} = select( 'core/edit-post' ) || false;

		if ( ! getPreviewDeviceType ) {
			return {
				deviceType: null,
			};
		}

		return {
			deviceType: getPreviewDeviceType(),
		};
	} ),
] )( GenerateBlockGridContainer );
