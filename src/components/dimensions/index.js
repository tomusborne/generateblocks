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
const { BaseControl, Button, Tooltip, ButtonGroup } = wp.components;

class DimensionsControl extends Component {

	constructor( props ) {
		super( ...arguments );
		this.onChangeTop = this.onChangeTop.bind( this );
		this.onChangeRight = this.onChangeRight.bind( this );
		this.onChangeBottom = this.onChangeBottom.bind( this );
		this.onChangeLeft = this.onChangeLeft.bind( this );
		this.onChangeAll = this.onChangeAll.bind( this );
		this.syncUnits = this.syncUnits.bind( this );
		this.onChangeUnits = this.onChangeUnits.bind( this );
	}

	onReset( type ) {
		this.props.setAttributes( { [ this.props[ type ] ]: '' } );
	}

	onChangeTop( value ) {
		this.props.setAttributes( { [ this.props[ 'attrTop' ] ]: value } );
	}

	onChangeRight( value ) {
		this.props.setAttributes( { [ this.props[ 'attrRight' ] ]: value } );
	}

	onChangeBottom( value ) {
		this.props.setAttributes( { [ this.props[ 'attrBottom' ] ]: value } );
	}

	onChangeLeft( value ) {
		this.props.setAttributes( { [ this.props[ 'attrLeft' ] ]: value } );
	}

	onChangeAll( value ) {
		this.props.setAttributes( { [ this.props[ 'attrTop' ] ]: value, [ this.props[ 'attrRight' ] ]: value, [ this.props[ 'attrBottom' ] ]: value, [ this.props[ 'attrLeft' ] ]: value } );
	}

	syncUnits( value ) {
		var numbers = [ this.props[ 'valueTop' ], this.props[ 'valueRight' ], this.props[ 'valueBottom' ], this.props[ 'valueLeft' ]];

		const syncValue = Math.max.apply( null, numbers );

		this.props.setAttributes( {
			[ this.props[ 'attrSyncUnits' ] ]: ! this.props[ 'syncUnits' ],
			[ this.props[ 'attrTop' ] ]: syncValue.toString(), [ this.props[ 'attrRight' ] ]: syncValue.toString(), [ this.props[ 'attrBottom' ] ]: syncValue.toString(), [ this.props[ 'attrLeft' ] ]: syncValue.toString()
		} );
	}

	onChangeUnits( value ) {
		this.props.setAttributes( { [ this.props[ 'attrUnit' ] ]: value } );
	}

	render() {

		const {
			className,
			label = __( 'Margin', 'flexblocks' ),
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
			attrSyncUnits,
			labelTop = __( 'Top', 'flexblocks' ),
			labelRight = __( 'Right', 'flexblocks' ),
			labelBottom = __( 'Bottom', 'flexblocks' ),
			labelLeft = __( 'Left', 'flexblocks' ),
			valueUnit,
			attrUnit,
			unitChoices,
		} = this.props;

		const classes = classnames(
			'components-base-control',
			'components-fx-dimensions-control',
		);

		const onChangeTopValue = ( event ) => {
			var newValue = event.target.value;

			if ( '' === newValue ) {
				this.onReset( 'attrTop' );
				return;
			}

			if ( this.props[ 'syncUnits' ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeTop( newValue );
			}
		};

		const onChangeRightValue = ( event ) => {
			var newValue = event.target.value;

			if ( '' === newValue ) {
				this.onReset( 'attrRight' );
				return;
			}

			if ( this.props[ 'syncUnits' ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeRight( newValue );
			}
		};

		const onChangeBottomValue = ( event ) => {
			var newValue = event.target.value;

			if ( '' === newValue ) {
				this.onReset( 'attrBottom' );
				return;
			}

			if ( this.props[ 'syncUnits' ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeBottom( newValue );
			}
		};

		const onChangeLeftValue = ( event ) => {
			var newValue = event.target.value;

			if ( '' === newValue ) {
				this.onReset( 'attrLeft' );
				return;
			}

			if ( this.props[ 'syncUnits' ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeLeft( newValue );
			}
		};

		let unitSizes = [
			{
				name: _x( 'Pixel', 'A size unit for CSS markup', 'flexblocks' ),
				unitValue: 'px',
			},
			{
				name: _x( 'Em', 'A size unit for CSS markup' ),
				unitValue: 'em',
			},
			{
				name: _x( 'Percentage', 'A size unit for CSS markup', 'flexblocks' ),
				unitValue: '%',
			},
		];

		return (
			<Fragment>
				<div className={ classes }>
					<div className="components-fx-dimensions-control__header">
						<div className="components-fx-dimensions-control__label">
							{ label }
						</div>

						{ ( typeof valueUnit !== 'undefined' ) ?
							<div className="components-fx-dimensions-control__units">
								<ButtonGroup className="components-fx-dimensions-control__units" aria-label={ __( 'Select Units', 'flexblocks' ) }>
									{ unitSizes.map( ( unit ) =>
										/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
										<Tooltip text={ sprintf( __( '%s Units', 'flexblocks' ), unit.name ) } key={ unit.unitValue }>
											<Button
												key={ unit.unitValue }
												className={ 'components-fx-dimensions-control__units--' + unit.name }
												isSmall
												isPrimary={ valueUnit === unit.unitValue }
												aria-pressed={ valueUnit === unit.unitValue }
												/* translators: %s: values associated with CSS syntax, 'Pixel', 'Em', 'Percentage' */
												aria-label={ sprintf( __( '%s Units', 'flexblocks' ), unit.name ) }
												onClick={ () => this.onChangeUnits( unit.unitValue ) }
											>
												{ unit.unitValue }
											</Button>
										</Tooltip>
									) }
								</ButtonGroup>
							</div> : null
						}
					</div>

					<div className="components-fx-dimensions-control__inputs">
						<input
							className="components-fx-dimensions-control__number"
							type="number"
							onChange={ onChangeTopValue }
							aria-label={ sprintf( __( '%s Top', 'flexblocks' ), label ) }
							value={ valueTop ? valueTop : '' }
							min={ type == 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<input
							className="components-fx-dimensions-control__number"
							type="number"
							onChange={ onChangeRightValue }
							aria-label={ sprintf( __( '%s Right', 'flexblocks' ), label ) }
							value={ valueRight ? valueRight : '' }
							min={ type == 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<input
							className="components-fx-dimensions-control__number"
							type="number"
							onChange={ onChangeBottomValue }
							aria-label={ sprintf( __( '%s Bottom', 'flexblocks' ), label ) }
							value={ valueBottom ? valueBottom : '' }
							min={ type == 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<input
							className="components-fx-dimensions-control__number"
							type="number"
							onChange={ onChangeLeftValue }
							aria-label={ sprintf( __( '%s Left', 'flexblocks' ), label ) }
							value={ valueLeft ? valueLeft : '' }
							min={ type == 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<Tooltip text={ !! syncUnits ? __( 'Unsync', 'flexblocks' ) : __( 'Sync', 'flexblocks' ) } >
							<Button
								className="components-fx-dimensions-control_sync"
								aria-label={ __( 'Sync Units', 'flexblocks' ) }
								isPrimary={ syncUnits ? syncUnits : false }
								aria-pressed={ syncUnits ? syncUnits : false }
								onClick={ ( value ) => this.syncUnits( value, '' ) }
								isSmall
							>
								{ !! syncUnits ? getIcon( 'sync' ) : getIcon( 'sync' ) }
							</Button>
						</Tooltip>
					</div>

					<div className='components-fx-dimensions-control__input-labels'>
						<span className='components-fx-dimensions-control__number-label'>{  labelTop }</span>
						<span className='components-fx-dimensions-control__number-label'>{  labelRight }</span>
						<span className='components-fx-dimensions-control__number-label'>{  labelBottom }</span>
						<span className='components-fx-dimensions-control__number-label'>{  labelLeft }</span>
						<span className='components-fx-dimensions-control__number-label'></span>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default DimensionsControl;
