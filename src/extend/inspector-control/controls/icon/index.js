import PanelArea from '../../../../components/panel-area';
import { __ } from '@wordpress/i18n';
import getIcon from '../../../../utils/get-icon';
import { useDeviceType } from '../../../../hooks';
import IconPicker from '../../../../components/icon-picker';
import IconStyles from './components/icon-styles';
import IconSize from './components/icon-size';

export default function IconControls( { attributes, setAttributes } ) {
	const [ device ] = useDeviceType();
	const {
		icon,
		iconLocation,
		iconLocationTablet,
		iconLocationMobile,
		iconVerticalAlignment,
		iconVerticalAlignmentTablet,
		iconVerticalAlignmentMobile,
		removeText,
	} = attributes;

	return (
		<PanelArea
			title={ __( 'Icon', 'generateblocks' ) }
			initialOpen={ false }
			icon={ getIcon( 'icons' ) }
			className="gblocks-panel-label"
			id="headlineIcon"
		>
			{ 'Desktop' === device &&
				<>
					<IconPicker
						attributes={ attributes }
						setAttributes={ setAttributes }
						attrIcon={ 'icon' }
						attrRemoveText={ 'removeText' }
						attrAriaLabel={ 'ariaLabel' }
					/>

					{ !! icon && ! removeText &&
						<IconStyles
							attributes={ attributes }
							setAttributes={ setAttributes }
							iconLocation={ iconLocation }
							onChangeLocation={ ( value ) => {
								setAttributes( {
									iconLocation: value,
									iconPaddingRight: 'inline' === value ? '0.5' : '',
									iconPaddingBottom: 'above' === value ? '0.5' : '',
								} );
							} }
							iconVerticalAlignment={ iconVerticalAlignment }
							onChangeAlignment={ ( value ) => {
								setAttributes( {
									iconVerticalAlignment: value,
								} );
							} }
						/>
					}
				</>
			}

			{ 'Tablet' === device && !! icon && ! removeText &&
				<IconStyles
					attributes={ attributes }
					setAttributes={ setAttributes }
					iconLocation={ iconLocationTablet }
					onChangeLocation={ ( value ) => {
						setAttributes( {
							iconLocationTablet: value,
							iconPaddingRightTablet: 'inline' === value ? '0.5' : '',
							iconPaddingBottomTablet: 'above' === value ? '0.5' : '',
						} );
					} }
					iconVerticalAlignment={ iconVerticalAlignmentTablet }
					onChangeAlignment={ ( value ) => {
						setAttributes( {
							iconVerticalAlignmentTablet: value,
						} );
					} }
				/>
			}

			{ 'Mobile' === device && !! icon && ! removeText &&
				<IconStyles
					attributes={ attributes }
					setAttributes={ setAttributes }
					iconLocation={ iconLocationMobile }
					onChangeLocation={ ( value ) => {
						setAttributes( {
							iconLocationMobile: value,
							iconPaddingRightMobile: 'inline' === value ? '0.5' : '',
							iconPaddingBottomMobile: 'above' === value ? '0.5' : '',
						} );
					} }
					iconVerticalAlignment={ iconVerticalAlignmentMobile }
					onChangeAlignment={ ( value ) => {
						setAttributes( {
							iconVerticalAlignmentMobile: value,
						} );
					} }
				/>
			}

			{ !! icon && <IconSize attributes={ attributes } setAttributes={ setAttributes } /> }
		</PanelArea>
	);
}
