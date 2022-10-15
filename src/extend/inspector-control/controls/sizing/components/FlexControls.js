import {
	BaseControl,
	Button,
	TextControl,
	Tooltip,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import UnitPicker from '../../../../../components/unit-picker';
import getResponsivePlaceholder from '../../../../../utils/get-responsive-placeholder';
import getIcon from '../../../../../utils/get-icon';
import { useDeviceType } from '../../../../../hooks';

export default ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const {
		flexGrow,
		flexGrowTablet,
		flexGrowMobile,
		flexShrink,
		flexShrinkTablet,
		flexShrinkMobile,
		flexBasis,
		flexBasisTablet,
		flexBasisMobile,
		flexBasisUnit,
	} = attributes;

	const [ device ] = useDeviceType();

	return (
		<>
			{ 'Desktop' === device &&
				<BaseControl
					className="gblocks-flex-controls"
				>
					<div className="gblocks-utility-label">
						<label
							htmlFor="gblocks-flex-grow-desktop"
							className="components-base-control__label"
						>
							{ __( 'Flex', 'generateblocks' ) }
						</label>

						<Tooltip text={ __( 'Reset', 'generateblocks' ) } position="top">
							<Button
								className="gblocks-reset-button"
								icon={ getIcon( 'reset' ) }
								onClick={ () => {
									setAttributes( {
										flexGrow: '',
										flexShrink: '',
										flexBasis: '',
									} );
								} }
							/>
						</Tooltip>
					</div>

					<div className="gblocks-flex-controls-inner">
						<TextControl
							help={ __( 'Grow', 'generateblocks' ) }
							id="gblocks-flex-grow-desktop"
							type={ 'number' }
							value={ flexGrow }
							min="0"
							step="1"
							placeholder="0"
							onChange={ ( value ) => {
								setAttributes( {
									flexGrow: value,
								} );
							} }
							onBlur={ () => {
								if ( '' !== flexGrow ) {
									setAttributes( {
										flexGrow: parseFloat( flexGrow ),
									} );
								}
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>

						<TextControl
							help={ __( 'Shrink', 'generateblocks' ) }
							type={ 'number' }
							value={ flexShrink }
							min="0"
							step="1"
							placeholder="1"
							onChange={ ( value ) => {
								setAttributes( {
									flexShrink: value,
								} );
							} }
							onBlur={ () => {
								if ( '' !== flexShrink ) {
									setAttributes( {
										flexShrink: parseFloat( flexShrink ),
									} );
								}
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>

						<div className="gblocks-flex-basis-wrapper">
							{ ! isNaN( flexBasis ) &&
								<UnitPicker
									value={ flexBasisUnit }
									units={ [ 'px', '%' ] }
									onClick={ ( value ) => {
										setAttributes( {
											flexBasisUnit: value,
										} );
									} }
								/>
							}

							<TextControl
								help={ __( 'Basis', 'generateblocks' ) }
								type={ 'text' }
								placeholder="auto"
								value={ flexBasis }
								onChange={ ( value ) => {
									setAttributes( {
										flexBasis: value,
									} );
								} }
								onBlur={ () => {
									if ( ! flexBasis.match( /(auto|fill|max-content|min-content|fit-content|content|inherit|initial|revert|unset|[0-9.]+)/g ) ) {
										setAttributes( {
											flexBasis: '',
										} );
									}
								} }
							/>
						</div>
					</div>
				</BaseControl>
			}

			{ 'Tablet' === device &&
				<BaseControl
					className="gblocks-flex-controls"
				>
					<div className="gblocks-utility-label">
						<label
							htmlFor="gblocks-flex-grow-tablet"
							className="components-base-control__label"
						>
							{ __( 'Flex', 'generateblocks' ) }
						</label>

						<Tooltip text={ __( 'Reset', 'generateblocks' ) } position="top">
							<Button
								className="gblocks-reset-button"
								icon={ getIcon( 'reset' ) }
								onClick={ () => {
									setAttributes( {
										flexGrowTablet: '',
										flexShrinkTablet: '',
										flexBasisTablet: '',
									} );
								} }
							/>
						</Tooltip>
					</div>

					<div className="gblocks-flex-controls-inner">
						<TextControl
							help={ __( 'Grow', 'generateblocks' ) }
							id="gblocks-flex-grow-tablet"
							type={ 'number' }
							value={ flexGrowTablet }
							min="0"
							step="1"
							placeholder={ getResponsivePlaceholder( 'flexGrow', attributes, 'Tablet', '0' ) }
							onChange={ ( value ) => {
								setAttributes( {
									flexGrowTablet: value,
								} );
							} }
							onBlur={ () => {
								if ( '' !== flexGrowTablet ) {
									setAttributes( {
										flexGrowTablet: parseFloat( flexGrowTablet ),
									} );
								}
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>

						<TextControl
							help={ __( 'Shrink', 'generateblocks' ) }
							type={ 'number' }
							value={ flexShrinkTablet }
							min="0"
							step="1"
							placeholder={ getResponsivePlaceholder( 'flexShrink', attributes, 'Tablet', '1' ) }
							onChange={ ( value ) => {
								setAttributes( {
									flexShrinkTablet: value,
								} );
							} }
							onBlur={ () => {
								if ( '' !== flexShrinkTablet ) {
									setAttributes( {
										flexShrinkTablet: parseFloat( flexShrinkTablet ),
									} );
								}
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>

						<div className="gblocks-flex-basis-wrapper">
							{ ! isNaN( flexBasisTablet ) &&
								<UnitPicker
									value={ flexBasisUnit }
									units={ [ 'px', '%' ] }
									onClick={ ( value ) => {
										setAttributes( {
											flexBasisUnit: value,
										} );
									} }
								/>
							}

							<TextControl
								help={ __( 'Basis', 'generateblocks' ) }
								type={ 'text' }
								value={ flexBasisTablet }
								placeholder={ getResponsivePlaceholder( 'flexBasis', attributes, 'Tablet', 'auto' ) }
								onChange={ ( value ) => {
									setAttributes( {
										flexBasisTablet: value,
									} );
								} }
								onBlur={ () => {
									if ( ! flexBasisTablet.match( /(auto|fill|max-content|min-content|fit-content|content|inherit|initial|revert|unset|[0-9.]+)/g ) ) {
										setAttributes( {
											flexBasisTablet: '',
										} );
									}
								} }
							/>
						</div>
					</div>
				</BaseControl>
			}

			{ 'Mobile' === device &&
				<BaseControl
					className="gblocks-flex-controls"
				>
					<div className="gblocks-utility-label">
						<label
							htmlFor="gblocks-flex-grow-mobile"
							className="components-base-control__label"
						>
							{ __( 'Flex', 'generateblocks' ) }
						</label>

						<Tooltip text={ __( 'Reset', 'generateblocks' ) } position="top">
							<Button
								className="gblocks-reset-button"
								icon={ getIcon( 'reset' ) }
								onClick={ () => {
									setAttributes( {
										flexGrowMobile: '',
										flexShrinkMobile: '',
										flexBasisMobile: '',
									} );
								} }
							/>
						</Tooltip>
					</div>

					<div className="gblocks-flex-controls-inner">
						<TextControl
							help={ __( 'Grow', 'generateblocks' ) }
							id="gblocks-flex-grow-mobile"
							type={ 'number' }
							value={ flexGrowMobile }
							min="0"
							step="1"
							placeholder={ getResponsivePlaceholder( 'flexGrow', attributes, 'Mobile', '0' ) }
							onChange={ ( value ) => {
								setAttributes( {
									flexGrowMobile: value,
								} );
							} }
							onBlur={ () => {
								if ( '' !== flexGrowMobile ) {
									setAttributes( {
										flexGrowMobile: parseFloat( flexGrowMobile ),
									} );
								}
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>

						<TextControl
							help={ __( 'Shrink', 'generateblocks' ) }
							type={ 'number' }
							value={ flexShrinkMobile }
							min="0"
							step="1"
							placeholder={ getResponsivePlaceholder( 'flexShrink', attributes, 'Mobile', '1' ) }
							onChange={ ( value ) => {
								setAttributes( {
									flexShrinkMobile: value,
								} );
							} }
							onBlur={ () => {
								if ( '' !== flexShrinkMobile ) {
									setAttributes( {
										flexShrinkMobile: parseFloat( flexShrinkMobile ),
									} );
								}
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>

						<div className="gblocks-flex-basis-wrapper">
							{ ! isNaN( flexBasisMobile ) &&
								<UnitPicker
									value={ flexBasisUnit }
									units={ [ 'px', '%' ] }
									onClick={ ( value ) => {
										setAttributes( {
											flexBasisUnit: value,
										} );
									} }
								/>
							}

							<TextControl
								help={ __( 'Basis', 'generateblocks' ) }
								type={ 'text' }
								value={ flexBasisMobile }
								placeholder={ getResponsivePlaceholder( 'flexBasis', attributes, 'Mobile', 'auto' ) }
								onChange={ ( value ) => {
									setAttributes( {
										flexBasisMobile: value,
									} );
								} }
								onBlur={ () => {
									if ( ! flexBasisMobile.match( /(auto|fill|max-content|min-content|fit-content|content|inherit|initial|revert|unset|[0-9.]+)/g ) ) {
										setAttributes( {
											flexBasisMobile: '',
										} );
									}
								} }
							/>
						</div>
					</div>
				</BaseControl>
			}
		</>
	);
};
