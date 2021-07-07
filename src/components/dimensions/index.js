/**
 * External dependencies
 */
import classnames from 'classnames';
import './editor.scss';
import getIcon from '../../utils/get-icon';
import UnitPicker from '../unit-picker';

/**
 * WordPress dependencies
 */
import {
	__,
	sprintf,
} from '@wordpress/i18n';

import {
	Component,
	Fragment,
} from '@wordpress/element';

import {
	Button,
	Tooltip,
} from '@wordpress/components';

class DimensionsControl extends Component {
	constructor() {
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
		this.props.setAttributes( { [ this.props[ 'attrTop' ] ]: value } ); // eslint-disable-line dot-notation
	}

	onChangeRight( value ) {
		this.props.setAttributes( { [ this.props[ 'attrRight' ] ]: value } ); // eslint-disable-line dot-notation
	}

	onChangeBottom( value ) {
		this.props.setAttributes( { [ this.props[ 'attrBottom' ] ]: value } ); // eslint-disable-line dot-notation
	}

	onChangeLeft( value ) {
		this.props.setAttributes( { [ this.props[ 'attrLeft' ] ]: value } ); // eslint-disable-line dot-notation
	}

	onChangeAll( value ) {
		this.props.setAttributes( { [ this.props[ 'attrTop' ] ]: value, [ this.props[ 'attrRight' ] ]: value, [ this.props[ 'attrBottom' ] ]: value, [ this.props[ 'attrLeft' ] ]: value } ); // eslint-disable-line dot-notation
	}

	syncUnits() {
		const numbers = [ this.props.attributes[ this.props.attrTop ], this.props.attributes[ this.props.attrRight ], this.props.attributes[ this.props.attrBottom ], this.props.attributes[ this.props.attrLeft ] ];

		const syncValue = Math.max.apply( null, numbers );

		this.props.setAttributes( {
			[ this.props[ 'attrSyncUnits' ] ]: ! this.props.attributes[ this.props.attrSyncUnits ], // eslint-disable-line dot-notation
			[ this.props[ 'attrTop' ] ]: syncValue.toString(), [ this.props[ 'attrRight' ] ]: syncValue.toString(), [ this.props[ 'attrBottom' ] ]: syncValue.toString(), [ this.props[ 'attrLeft' ] ]: syncValue.toString(), // eslint-disable-line dot-notation
		} );
	}

	onChangeUnits( value ) {
		this.props.setAttributes( { [ this.props[ 'attrUnit' ] ]: value } ); // eslint-disable-line dot-notation
	}

	render() {
		const {
			attributes,
			label = __( 'Margin', 'generateblocks' ),
			type = 'margin',
			attrTop,
			attrRight,
			attrBottom,
			attrLeft,
			attrSyncUnits,
			attrUnit,
			labelTop = __( 'Top', 'generateblocks' ),
			labelRight = __( 'Right', 'generateblocks' ),
			labelBottom = __( 'Bottom', 'generateblocks' ),
			labelLeft = __( 'Left', 'generateblocks' ),
			device,
			block,
			units,
		} = this.props;

		const classes = classnames(
			'components-base-control',
			'components-gblocks-dimensions-control',
		);

		const onChangeTopValue = ( event ) => {
			let newValue = event.target.value;

			if ( 'padding' === type ) {
				// No negative values allowed here.
				newValue = newValue.toString().replace( /-/g, '' );
			}

			if ( '' === newValue ) {
				this.onReset( 'attrTop' );
				return;
			}

			if ( this.props.attributes[ this.props.attrSyncUnits ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeTop( newValue );
			}
		};

		const onChangeRightValue = ( event ) => {
			let newValue = event.target.value;

			if ( 'padding' === type ) {
				// No negative values allowed here.
				newValue = newValue.toString().replace( /-/g, '' );
			}

			if ( '' === newValue ) {
				this.onReset( 'attrRight' );
				return;
			}

			if ( this.props.attributes[ this.props.attrSyncUnits ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeRight( newValue );
			}
		};

		const onChangeBottomValue = ( event ) => {
			let newValue = event.target.value;

			if ( 'padding' === type ) {
				// No negative values allowed here.
				newValue = newValue.toString().replace( /-/g, '' );
			}

			if ( '' === newValue ) {
				this.onReset( 'attrBottom' );
				return;
			}

			if ( this.props.attributes[ this.props.attrSyncUnits ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeBottom( newValue );
			}
		};

		const onChangeLeftValue = ( event ) => {
			let newValue = event.target.value;

			if ( 'padding' === type ) {
				// No negative values allowed here.
				newValue = newValue.toString().replace( /-/g, '' );
			}

			if ( '' === newValue ) {
				this.onReset( 'attrLeft' );
				return;
			}

			if ( this.props.attributes[ this.props.attrSyncUnits ] ) {
				this.onChangeAll( newValue );
			} else {
				this.onChangeLeft( newValue );
			}
		};

		let topPlaceholder = '',
			rightPlaceholder = '',
			bottomPlaceholder = '',
			leftPlaceholder = '';

		if ( 'headline' === block && attrBottom.includes( 'marginBottom' ) ) {
			if ( 'px' === this.props.attributes.marginUnit ) {
				const headlineId = document.querySelector( '.gb-headline-' + this.props.attributes.uniqueId );

				if ( headlineId ) {
					bottomPlaceholder = parseFloat( window.getComputedStyle( headlineId ).marginBottom );
				}
			} else if ( 'em' === this.props.attributes.marginUnit && 'undefined' !== typeof generateBlocksStyling.headline ) {
				if ( 'undefined' !== typeof generateBlocksStyling.headline[ attributes.element ] && 'undefined' !== typeof generateBlocksStyling.headline[ attributes.element ].marginBottom ) {
					if ( generateBlocksStyling.headline[ attributes.element ].marginUnit === attributes.marginUnit ) {
						bottomPlaceholder = generateBlocksStyling.headline[ attributes.element ].marginBottom;
					}
				}
			}

			if ( 'div' === this.props.attributes.element || 'span' === this.props.attributes.element ) {
				bottomPlaceholder = '';
			}
		}

		if ( 'Tablet' === device ) {
			const topAttrName = attrTop.replace( 'Tablet', '' ),
				rightAttrName = attrRight.replace( 'Tablet', '' ),
				bottomAttrName = attrBottom.replace( 'Tablet', '' ),
				leftAttrName = attrLeft.replace( 'Tablet', '' );

			topPlaceholder = attributes[ topAttrName ] ? attributes[ topAttrName ] : topPlaceholder;
			rightPlaceholder = attributes[ rightAttrName ] ? attributes[ rightAttrName ] : rightPlaceholder;
			bottomPlaceholder = attributes[ bottomAttrName ] ? attributes[ bottomAttrName ] : bottomPlaceholder;
			leftPlaceholder = attributes[ leftAttrName ] ? attributes[ leftAttrName ] : leftPlaceholder;
		}

		if ( 'Mobile' === device ) {
			const topAttrName = attrTop.replace( 'Mobile', '' ),
				rightAttrName = attrRight.replace( 'Mobile', '' ),
				bottomAttrName = attrBottom.replace( 'Mobile', '' ),
				leftAttrName = attrLeft.replace( 'Mobile', '' );

			if ( attributes[ topAttrName + 'Tablet' ] ) {
				topPlaceholder = attributes[ topAttrName + 'Tablet' ];
			} else if ( attributes[ topAttrName ] ) {
				topPlaceholder = attributes[ topAttrName ];
			}

			if ( attributes[ rightAttrName + 'Tablet' ] ) {
				rightPlaceholder = attributes[ rightAttrName + 'Tablet' ];
			} else if ( attributes[ rightAttrName ] ) {
				rightPlaceholder = attributes[ rightAttrName ];
			}

			if ( attributes[ bottomAttrName + 'Tablet' ] ) {
				bottomPlaceholder = attributes[ bottomAttrName + 'Tablet' ];
			} else if ( attributes[ bottomAttrName ] ) {
				bottomPlaceholder = attributes[ bottomAttrName ];
			}

			if ( attributes[ leftAttrName + 'Tablet' ] ) {
				leftPlaceholder = attributes[ leftAttrName + 'Tablet' ];
			} else if ( attributes[ leftAttrName ] ) {
				leftPlaceholder = attributes[ leftAttrName ];
			}
		}

		return (
			<Fragment>
				<div className={ classes }>
					<UnitPicker
						label={ label }
						value={ 'undefined' !== typeof attributes[ attrUnit ] ? attributes[ attrUnit ] : 'px' }
						units={ units }
						onClick={ ( value ) => {
							if ( 'undefined' !== typeof attributes[ attrUnit ] ) {
								this.onChangeUnits( value );
							} else {
								return false;
							}
						} }
					/>

					<div className="components-gblocks-dimensions-control__inputs">
						<input
							className="components-gblocks-dimensions-control__number"
							placeholder={ topPlaceholder }
							type="number"
							onChange={ onChangeTopValue }
							/* translators: Dimension label (padding, margin, border) */
							aria-label={ sprintf( __( '%s Top', 'generateblocks' ), label ) }
							value={ attributes[ attrTop ] ? attributes[ attrTop ] : '' }
							min={ type === 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<input
							className="components-gblocks-dimensions-control__number"
							placeholder={ rightPlaceholder }
							type="number"
							onChange={ onChangeRightValue }
							/* translators: Dimension label (padding, margin, border) */
							aria-label={ sprintf( __( '%s Right', 'generateblocks' ), label ) }
							value={ attributes[ attrRight ] ? attributes[ attrRight ] : '' }
							min={ type === 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<input
							className="components-gblocks-dimensions-control__number"
							placeholder={ bottomPlaceholder }
							type="number"
							onChange={ onChangeBottomValue }
							/* translators: Dimension label (padding, margin, border) */
							aria-label={ sprintf( __( '%s Bottom', 'generateblocks' ), label ) }
							value={ attributes[ attrBottom ] ? attributes[ attrBottom ] : '' }
							min={ type === 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<input
							className="components-gblocks-dimensions-control__number"
							placeholder={ leftPlaceholder }
							type="number"
							onChange={ onChangeLeftValue }
							/* translators: Dimension label (padding, margin, border) */
							aria-label={ sprintf( __( '%s Left', 'generateblocks' ), label ) }
							value={ attributes[ attrLeft ] ? attributes[ attrLeft ] : '' }
							min={ type === 'padding' ? 0 : undefined }
							data-attribute={ type }
						/>
						<Tooltip text={ !! attributes[ attrSyncUnits ] ? __( 'Unsync', 'generateblocks' ) : __( 'Sync', 'generateblocks' ) } >
							<Button
								className="components-gblocks-dimensions-control_sync"
								aria-label={ __( 'Sync Units', 'generateblocks' ) }
								isPrimary={ attributes[ attrSyncUnits ] ? attributes[ attrSyncUnits ] : false }
								aria-pressed={ attributes[ attrSyncUnits ] ? attributes[ attrSyncUnits ] : false }
								onClick={ ( value ) => this.syncUnits( value, '' ) }
								isSmall
							>
								{ !! attributes[ attrSyncUnits ] ? getIcon( 'sync' ) : getIcon( 'sync' ) }
							</Button>
						</Tooltip>
					</div>

					<div className="components-gblocks-dimensions-control__input-labels">
						<span className="components-gblocks-dimensions-control__number-label">{ labelTop }</span>
						<span className="components-gblocks-dimensions-control__number-label">{ labelRight }</span>
						<span className="components-gblocks-dimensions-control__number-label">{ labelBottom }</span>
						<span className="components-gblocks-dimensions-control__number-label">{ labelLeft }</span>
						<span className="components-gblocks-dimensions-control__number-label"></span>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default DimensionsControl;
