import { useEffect, useState } from '@wordpress/element';
import './editor.scss';
import { BaseControl, Button } from '@wordpress/components';
import UnitControl from '../unit-control';
import classnames from 'classnames';
import getResponsivePlaceholder from '../../utils/get-responsive-placeholder';
import { labels } from './labels';

export default function DimensionsControl( props ) {
	const {
		outerAttributes = {},
		innerAttributes = {},
		outerLabel,
		innerLabel,
		onChange,
		attributes,
		device,
	} = props;

	const [ selectedOption, setSelectedOption ] = useState( '' );
	const [ selectedPresets, setSelectedPresets ] = useState( [] );
	const [ selectedUnit, setSelectedUnit ] = useState( '' );
	const [ selectedValue, setSelectedValue ] = useState( '' );
	const allAttributes = { ...outerAttributes, ...innerAttributes };

	useEffect( () => {
		setSelectedValue( allAttributes[ selectedOption ] || '' );
	}, [ JSON.stringify( allAttributes ), selectedOption ] );

	useEffect( () => {
		const unit = selectedValue ? selectedValue.replace( /(\d+|auto)/g, '' ) : 'px';
		setSelectedUnit( unit );
	}, [ selectedValue ] );

	useEffect( () => {
		if ( 'px' === selectedUnit || 'ch' === selectedUnit ) {
			setSelectedPresets( [ '0', '10', '20', '40', '60', '100', '140', '220' ] );
		}

		if ( '%' === selectedUnit || 'vw' === selectedUnit || 'vh' === selectedUnit ) {
			setSelectedPresets( [ '0', '5', '10', '15', '25', '50', '75', '100' ] );
		}

		if ( 'em' === selectedUnit || 'rem' === selectedUnit ) {
			setSelectedPresets( [ '0', '0.125', '0.25', '0.5', '1', '2', '4', '8' ] );
		}
	}, [ selectedUnit ] );

	return (
		<BaseControl>
			<div className="gblocks-dimensions-control">
				<div className="gblocks-dimensions-control--is-grid">
					{ Object.entries( outerAttributes ).map( ( [ name, value ] ) => (
						<button
							key={ name }
							className={ selectedOption === name ? 'gblocks-dimensions-control__selected-button' : '' }
							onClick={ () => setSelectedOption( name ) }
							aria-expanded={ selectedOption ? true : false }
						>
							{ value || getResponsivePlaceholder( name, attributes, device, '0' ) }
						</button>
					) ) }
					<span className="gblocks-dimentions-control-label">{ outerLabel }</span>
					<div className="gblocks-dimensions-control__inner gblocks-dimensions-control--is-grid">
						{ Object.entries( innerAttributes ).map( ( [ name, value ] ) => (
							<button
								key={ name }
								className={ selectedOption === name ? 'gblocks-dimensions-control__selected-button' : '' }
								onClick={ () => setSelectedOption( name ) }
								aria-expanded={ selectedOption ? true : false }
							>
								{ value || getResponsivePlaceholder( name, attributes, device, '0' ) }
							</button>
						) ) }
						<span className="gblocks-dimentions-control-label">{ innerLabel }</span>
					</div>
				</div>

				{ !! selectedOption &&
					<>
						<div className="gblocks-dimensions-control__picker">
							<UnitControl
								label={ labels[ selectedOption ] || '' }
								value={ selectedValue }
								units={ [ 'px', 'em', '%', 'rem', 'vw', 'vh', 'ch' ] }
								desktopValue={ attributes[ selectedOption ] }
								tabletValue={ attributes[ selectedOption + 'Tablet' ] }
								focusOnMount={ true }
								onChange={ ( newValue ) => {
									onChange( selectedOption, newValue );
								} }
							/>
						</div>

						<div
							className={ classnames( {
								'gblocks-dimensions-control__presets': true,
								'gblocks-dimensions-control__presets--has-auto': !! selectedOption.includes( 'margin' ),
							} ) }
						>
							<>
								{ selectedOption.includes( 'margin' ) &&
									<Button
										onClick={ () => onChange( selectedOption, 'auto' ) }
										variant={ selectedValue === 'auto' ? 'primary' : '' }
										style={ { gridRow: 'span 2' } }
									>
										auto
									</Button>
								}

								{ selectedPresets.map( ( preset ) => {
									return <Button
										key={ preset }
										onClick={ () => {
											onChange( selectedOption, preset + selectedUnit );
										} }
										variant={ selectedValue === preset + selectedUnit ? 'primary' : '' }
									>
										{ preset }
									</Button>;
								} ) }
							</>
						</div>
					</>
				}
			</div>
		</BaseControl>
	);
}
