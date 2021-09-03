import hasNumericValue from '../../utils/has-numeric-value';

// Import CSS
import './editor.scss';

import {
	Component,
} from '@wordpress/element';

import {
	RangeControl,
	TextControl,
} from '@wordpress/components';

export default class RangeControlInput extends Component {
	render() {
		const {
			label,
			value,
			onChange,
			rangeMin = 0,
			rangeMax = 100,
			inputMin = '',
			inputMax = '',
			step = 1,
			help = '',
			beforeIcon = '',
			initialPosition = '',
			placeholder = '',
			disabled = false,
		} = this.props;

		return (
			<div className="components-gblocks-range-control">
				{ label &&
					<div className="components-gblocks-range-control--label">
						{ label }
					</div>
				}

				<div className="components-gblocks-range-control--wrapper">
					<div className="components-gblocks-range-control--range">
						<RangeControl
							className={ 'gblocks-range-control-range' }
							beforeIcon={ beforeIcon }
							value={ hasNumericValue( value ) ? parseFloat( value ) : '' }
							onChange={ ( newVal ) => onChange( newVal ) }
							min={ rangeMin }
							max={ rangeMax }
							step={ step }
							withInputField={ false }
							initialPosition={ initialPosition }
							disabled={ disabled }
						/>
					</div>

					<div className="components-gblocks-range-control-input">
						<TextControl
							type="number"
							placeholder={ '' !== placeholder ? placeholder : '' }
							min={ inputMin }
							max={ inputMax }
							step={ step }
							value={ hasNumericValue( value ) ? value : '' }
							disabled={ disabled }
							onChange={ ( newVal ) => onChange( newVal ) }
							onBlur={ () => {
								if ( hasNumericValue( value ) ) {
									onChange( parseFloat( value ) );
								}
							} }
							onClick={ ( e ) => {
								// Make sure onBlur fires in Firefox.
								e.currentTarget.focus();
							} }
						/>
					</div>
				</div>

				{ help &&
					<p className="components-base-control__help">
						{ help }
					</p>
				}
			</div>
		);
	}
}
