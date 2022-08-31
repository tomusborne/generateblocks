import PanelArea from '../../../components/panel-area';
import getIcon from '../../../utils/get-icon';
import UnitControl from '../../../components/unit-control';
import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';

export default ( props ) => {
	const {
		attributes,
		setAttributes,
		deviceType,
		state,
		tagNames,
		filterTagName,
	} = props;

	const {
		tagName,
		zindex,
		orderTablet,
		orderMobile,
		isGrid,
	} = attributes;

	return (
		<>
			<PanelArea
				{ ...props }
				title={ __( 'Layout', 'generateblocks' ) }
				initialOpen={ true }
				icon={ getIcon( 'layout' ) }
				className={ 'gblocks-panel-label' }
				id={ 'containerLayout' }
				state={ state }
			>
				<UnitControl
					{ ...props }
					label={ __( 'max-width', 'generateblocks' ) }
					id="gblocks-max-width"
					attributeName="maxWidth"
					device={ deviceType }
					min="1"
					units={ [ 'px', '%', 'vw', 'rem' ] }
				/>

				<UnitControl
					{ ...props }
					label={ __( 'Width', 'generateblocks' ) }
					id="gblocks-width"
					attributeName="width"
					device={ deviceType }
					min="1"
					units={ [ 'px', '%', 'vw', 'rem' ] }
				/>

				<SelectControl
					label={ __( 'Tag Name', 'generateblocks' ) }
					value={ tagName }
					options={ tagNames }
					onChange={ ( value ) => {
						setAttributes( {
							tagName: filterTagName( value ),
						} );
					} }
				/>

				{ applyFilters( 'generateblocks.editor.controls', '', 'containerAfterElementTag', props, state ) }

				{ 'Desktop' === deviceType &&
					<>
						<TextControl
							label={ __( 'z-index', 'generateblocks' ) }
							type={ 'number' }
							value={ zindex || 0 === zindex ? zindex : '' }
							onChange={ ( value ) => {
								setAttributes( {
									zindex: value,
								} );
							} }
							onBlur={ () => {
								setAttributes( {
									zindex: parseFloat( zindex ),
								} );
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>
					</>
				}

				{ 'Tablet' === deviceType &&
					<>
						{ !! isGrid &&
							<TextControl
								type={ 'number' }
								label={ __( 'Order', 'generateblocks' ) }
								value={ orderTablet || 0 === orderTablet ? orderTablet : '' }
								onChange={ ( value ) => {
									setAttributes( {
										orderTablet: parseFloat( value ),
									} );
								} }
							/>
						}
					</>
				}

				{ 'Mobile' === deviceType &&
					<>
						{ !! isGrid &&
							<TextControl
								type={ 'number' }
								label={ __( 'Order', 'generateblocks' ) }
								value={ orderMobile || 0 === orderMobile ? orderMobile : '' }
								onChange={ ( value ) => {
									setAttributes( {
										orderMobile: parseFloat( value ),
									} );
								} }
							/>
						}
					</>
				}

				{ applyFilters( 'generateblocks.editor.controls', '', 'containerLayout', props, state ) }
			</PanelArea>
		</>
	);
};
