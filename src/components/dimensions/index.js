/**
 * External dependencies
 */
import classnames from 'classnames';
import './editor.scss';
import getIcon from '../../utils/get-icon';

/**
 * WordPress dependencies
 */
const { __, _x, sprintf } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BaseControl, Button, Tooltip } = wp.components;

class DimensionsControl extends Component {

	constructor( props ) {
		super( ...arguments );
		this.onChangeTop = this.onChangeTop.bind( this );
		this.onChangeRight = this.onChangeRight.bind( this );
		this.onChangeBottom = this.onChangeBottom.bind( this );
		this.onChangeLeft = this.onChangeLeft.bind( this );
		this.onChangeAll = this.onChangeAll.bind( this );
		this.syncUnits = this.syncUnits.bind( this );
	}

	onChangeTop( value ) {
		this.props.setAttributes( { [ this.props[ 'attrTop' ] ]: parseFloat( value ) } );
	}

	onChangeRight( value ) {
		this.props.setAttributes( { [ this.props[ 'attrRight' ] ]: parseFloat( value ) } );
	}

	onChangeBottom( value ) {
		this.props.setAttributes( { [ this.props[ 'attrBottom' ] ]: parseFloat( value ) } );
	}

	onChangeLeft( value ) {
		this.props.setAttributes( { [ this.props[ 'attrLeft' ] ]: parseFloat( value ) } );
	}

	onChangeAll( value ) {
		this.props.setAttributes( { [ this.props[ 'attrTop' ] ]: parseFloat( value ), [ this.props[ 'attrRight' ] ]: parseFloat( value ), [ this.props[ 'attrBottom' ] ]: parseFloat( value ), [ this.props[ 'attrLeft' ] ]: parseFloat( value ) } );
	}

	syncUnits( value ) {
		var numbers = [ this.props[ 'valueTop' ], this.props[ 'valueRight' ], this.props[ 'valueBottom' ], this.props[ 'valueLeft' ]];

		const syncValue = Math.max.apply( null, numbers )

		this.props.setAttributes( {  [ this.props[ 'attrSyncUnits' ] ]: ! this.props[ 'syncUnits' ] } )
		this.props.setAttributes( { [ this.props[ 'attrTop' ] ]: parseFloat( syncValue ), [ this.props[ 'attrRight' ] ]: parseFloat( syncValue ), [ this.props[ 'attrBottom' ] ]: parseFloat( syncValue ), [ this.props[ 'attrLeft' ] ]: parseFloat( syncValue ) } );
	}

	render() {

		const {
			className,
			label = __( 'Margin' ),
			left = true,
			onChange,
			reset = false,
			right = true,
			setAttributes,
			top = true,
			type = 'margin',
			unit,
			units = true,
			valueBottom,
			valueLeft,
			valueRight,
			valueTop,
			syncUnits,
			attrTop,
			attrRight,
			attrBottom,
			attrLeft,
			attrSyncUnits
		} = this.props;

		const classes = classnames(
			'components-base-control',
			'components-generatepress-dimensions-control', {
			}
		);

		const onChangeTopValue = ( event ) => {
			const newValue = event.target.value;

			if  ( this.props[ 'syncUnits' ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeTop( newValue );
			}
		};

		const onChangeRightValue = ( event ) => {
			const newValue = event.target.value;

			if  ( this.props[ 'syncUnits' ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeRight( newValue );
			}
		};

		const onChangeBottomValue = ( event ) => {
			const newValue = event.target.value;

			if  ( this.props[ 'syncUnits' ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeBottom( newValue );
			}
		};

		const onChangeLeftValue = ( event ) => {
			const newValue = event.target.value;

			if  ( this.props[ 'syncUnits' ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeLeft( newValue );
			}
		};

		return (
			<Fragment>
				<div className={ classes }>
					<div className='components-generatepress-dimensions-control__inputs'>
						<input
							className="components-generatepress-dimensions-control__number"
							type="number"
							onChange={ onChangeTopValue }
							aria-label={ sprintf( __( '%s Top' ), label ) }
							value={ parseFloat( valueTop ) }
							min={ type == 'padding' ? 0 : undefined }
						/>
						<input
							className="components-generatepress-dimensions-control__number"
							type="number"
							onChange={ onChangeRightValue }
							aria-label={ sprintf( __( '%s Right' ), label ) }
							value={ parseFloat( valueRight ) }
							min={ type == 'padding' ? 0 : undefined }
						/>
						<input
							className="components-generatepress-dimensions-control__number"
							type="number"
							onChange={ onChangeBottomValue }
							aria-label={ sprintf( __( '%s Bottom' ), label ) }
							value={ parseFloat( valueBottom ) }
							min={ type == 'padding' ? 0 : undefined }
						/>
						<input
							className="components-generatepress-dimensions-control__number"
							type="number"
							onChange={ onChangeLeftValue }
							aria-label={ sprintf( __( '%s Left' ), label ) }
							value={ parseFloat( valueLeft ) }
							min={ type == 'padding' ? 0 : undefined }
						/>
						<Tooltip text={ !! syncUnits ? __( 'Unsync' ) : __( 'Sync' ) } >
							<Button
								className="components-generatepress-dimensions-control_sync"
								aria-label={ __( 'Sync Units' ) }
								isPrimary={ syncUnits ? syncUnits : false }
								aria-pressed={ syncUnits ? syncUnits : false }
								onClick={ ( value ) => this.syncUnits( value, '' ) }
								isSmall
							>
								{ !! syncUnits ? getIcon( 'sync' ) : getIcon( 'sync' ) }
							</Button>
						</Tooltip>
					</div>

					<div className='components-generatepress-dimensions-control__input-labels'>
						<span className='components-generatepress-dimensions-control__number-label'>{  __( 'Top' ) }</span>
						<span className='components-generatepress-dimensions-control__number-label'>{  __( 'Right' ) }</span>
						<span className='components-generatepress-dimensions-control__number-label'>{  __( 'Bottom' ) }</span>
						<span className='components-generatepress-dimensions-control__number-label'>{  __( 'Left' ) }</span>
						<span className='components-generatepress-dimensions-control__number-label'></span>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default DimensionsControl;
