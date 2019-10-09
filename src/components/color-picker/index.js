import classnames from 'classnames';

// Import CSS
import './editor.scss';

const WPColorPicker = wp.components.ColorPicker;

const { Component } = wp.element;

const { __ } = wp.i18n;

const {
	Dropdown,
	Tooltip,
	BaseControl,
	Button,
} = wp.components;

export default class ColorPicker extends Component {
	render() {
		const {
			value,
			onChange,
			onClear,
			label,
			alpha = false,
		} = this.props;

		return (
			<BaseControl
				label={ label }
				className="fx-component-color-picker-wrapper"
			>
				<Dropdown
					className={ classnames( 'components-color-palette__item-wrapper', value ? '' : 'components-color-palette__custom-color' ) }
					contentClassName="components-color-palette__picker"
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Tooltip text={ __( 'Choose Color', 'flexblocks' ) }>
							<button
								type="button"
								aria-expanded={ isOpen }
								className="components-color-palette__item"
								onClick={ onToggle }
								aria-label={ __( 'Custom color picker' ) }
								style={ { color: value ? value : '' } }
							>
								<span className="components-color-palette__custom-color-gradient" />
							</button>
						</Tooltip>
					) }
					renderContent={ () => (
						<div className="fx-component-color-picker">
							<WPColorPicker
								color={ value }
								onChangeComplete={ ( color ) => {
									let colorString;

									if ( typeof color.rgb === 'undefined' || color.rgb.a === 1 ) {
										colorString = color.hex;
									} else {
										const { r, g, b, a } = color.rgb;
										colorString = `rgba(${ r }, ${ g }, ${ b }, ${ a })`;
									}

									onChange( colorString );
								} }
								disableAlpha={ ! alpha }
							/>

							<BaseControl className="color-picker-clear">
								<Button
									isLarge
									onClick={ onClear }
								>
									{ __( 'Clear', 'flexblocks' ) }
								</Button>
							</BaseControl>
						</div>
					) }
				/>
			</BaseControl>
		);
	}
}
