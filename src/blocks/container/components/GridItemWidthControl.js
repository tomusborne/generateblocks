import {
	BaseControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import UnitPicker from '../../../components/unit-picker';
import hasNumericValue from '../../../utils/has-numeric-value';
import RangeControlInput from '../../../components/range-control';

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		deviceType,
		blockDefaults,
		hideWidthDesktop,
		hideWidthTablet,
		hideWidthMobile,
	} = props;

	const {
		width,
		widthTablet,
		widthMobile,
		autoWidthTablet,
		autoWidthMobile,
	} = attributes;

	return (
		<>
			{ 'Desktop' === deviceType &&
				<BaseControl>
					<UnitPicker
						label={ __( 'Container Width', 'generateblocks' ) }
						value={ '%' }
						units={ [ '%' ] }
						onClick={ () => {
							return false;
						} }
					/>

					{ !! hideWidthDesktop &&
						<div className="gblocks-small-notice-description">
							{ __( 'Width disabled as Flex Basis is not "auto".', 'generateblocks' ) }
						</div>
					}

					<ButtonGroup className={ 'widthButtons' }>
						<Button isPrimary={ width === 25 } onClick={ () => setAttributes( { width: 25 } ) } disabled={ hideWidthDesktop }>25</Button>
						<Button isPrimary={ width === 33.33 } onClick={ () => setAttributes( { width: 33.33 } ) } disabled={ hideWidthDesktop }>33</Button>
						<Button isPrimary={ width === 50 } onClick={ () => setAttributes( { width: 50 } ) } disabled={ hideWidthDesktop }>50</Button>
						<Button isPrimary={ width === 66.66 } onClick={ () => setAttributes( { width: 66.66 } ) } disabled={ hideWidthDesktop }>66</Button>
						<Button isPrimary={ width === 75 } onClick={ () => setAttributes( { width: 75 } ) } disabled={ hideWidthDesktop }>75</Button>
						<Button isPrimary={ width === 100 } onClick={ () => setAttributes( { width: 100 } ) } disabled={ hideWidthDesktop }>100</Button>
					</ButtonGroup>

					<RangeControlInput
						value={ hasNumericValue( width ) ? width : '' }
						onChange={ ( value ) => {
							// No zero value or values that start with zero.
							if ( String( value ).startsWith( 0 ) ) {
								value = '';
							}

							setAttributes( {
								width: value,
							} );
						} }
						rangeMin={ 10 }
						rangeMax={ 100 }
						step={ 5 }
						initialPosition={ blockDefaults.width }
						disabled={ hideWidthDesktop }
					/>
				</BaseControl>
			}

			{ 'Tablet' === deviceType &&
				<BaseControl>
					<UnitPicker
						label={ __( 'Container Width', 'generateblocks' ) }
						value={ '%' }
						units={ [ '%' ] }
						onClick={ () => {
							return false;
						} }
					/>

					{ !! hideWidthTablet &&
						<div className="gblocks-small-notice-description">
							{ __( 'Width disabled as Flex Basis is not "auto".', 'generateblocks' ) }
						</div>
					}

					<ButtonGroup className={ 'widthButtons' }>
						<Button isPrimary={ !! autoWidthTablet } disabled={ hideWidthTablet } onClick={ () => {
							if ( autoWidthTablet ) {
								setAttributes( { autoWidthTablet: false } );
							} else {
								setAttributes( { autoWidthTablet: true } );
							}
						} }>
							{ __( 'Auto', 'generateblocks' ) }
						</Button>

						<Button isPrimary={ widthTablet === 25 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 25, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>25</Button>
						<Button isPrimary={ widthTablet === 33.33 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 33.33, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>33</Button>
						<Button isPrimary={ widthTablet === 50 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 50, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>50</Button>
						<Button isPrimary={ widthTablet === 66.66 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 66.66, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>66</Button>
						<Button isPrimary={ widthTablet === 75 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 75, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>75</Button>
						<Button isPrimary={ widthTablet === 100 && ! autoWidthTablet } onClick={ () => setAttributes( { widthTablet: 100, autoWidthTablet: false } ) } disabled={ hideWidthTablet }>100</Button>
					</ButtonGroup>

					{ ! autoWidthTablet &&
						<RangeControlInput
							value={ hasNumericValue( widthTablet ) ? widthTablet : '' }
							onChange={ ( value ) => {
								// No zero value or values that start with zero.
								if ( String( value ).startsWith( 0 ) ) {
									value = '';
								}

								setAttributes( {
									widthTablet: value,
									autoWidthTablet: false,
								} );
							} }
							rangeMin={ 10 }
							rangeMax={ 100 }
							step={ 5 }
							initialPosition={ blockDefaults.widthTablet }
							disabled={ hideWidthTablet }
						/>
					}
				</BaseControl>
			}

			{ 'Mobile' === deviceType &&
				<BaseControl>
					<UnitPicker
						label={ __( 'Container Width', 'generateblocks' ) }
						value={ '%' }
						units={ [ '%' ] }
						onClick={ () => {
							return false;
						} }
					/>

					{ !! hideWidthMobile &&
						<div className="gblocks-small-notice-description">
							{ __( 'Width disabled as Flex Basis is not "auto".', 'generateblocks' ) }
						</div>
					}

					<ButtonGroup className={ 'widthButtons' }>
						<Button isPrimary={ !! autoWidthMobile } disabled={ hideWidthMobile } onClick={ () => {
							if ( autoWidthMobile ) {
								setAttributes( { autoWidthMobile: false } );
							} else {
								setAttributes( { autoWidthMobile: true } );
							}
						} }>
							{ __( 'Auto', 'generateblocks' ) }
						</Button>

						<Button isPrimary={ widthMobile === 25 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 25, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>25</Button>
						<Button isPrimary={ widthMobile === 33.33 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 33.33, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>33</Button>
						<Button isPrimary={ widthMobile === 50 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 50, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>50</Button>
						<Button isPrimary={ widthMobile === 66.66 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 66.66, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>66</Button>
						<Button isPrimary={ widthMobile === 75 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 75, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>75</Button>
						<Button isPrimary={ widthMobile === 100 && ! autoWidthMobile } onClick={ () => setAttributes( { widthMobile: 100, autoWidthMobile: false } ) } disabled={ hideWidthMobile }>100</Button>
					</ButtonGroup>

					{ ! autoWidthMobile &&
						<RangeControlInput
							value={ hasNumericValue( widthMobile ) ? widthMobile : '' }
							onChange={ ( value ) => {
								// No zero value or values that start with zero.
								if ( String( value ).startsWith( 0 ) ) {
									value = '';
								}

								setAttributes( {
									widthMobile: value,
									autoWidthMobile: false,
								} );
							} }
							rangeMin={ 10 }
							rangeMax={ 100 }
							step={ 5 }
							initialPosition={ blockDefaults.widthMobile }
							disabled={ hideWidthMobile }
						/>
					}
				</BaseControl>
			}
		</>
	);
};
