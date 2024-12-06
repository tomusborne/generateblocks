import { __ } from '@wordpress/i18n';
import { ToolbarButton, Dropdown, MenuGroup, MenuItem } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
import { alignLeft, alignCenter, alignRight, alignJustify, positionRight, positionLeft, alignNone } from '@wordpress/icons';
import { useBlockStyles } from '@hooks/useBlockStyles';
import { BlockWidth } from './BlockWidth';

const POPOVER_PROPS = {
	position: 'bottom right',
};

export function AlignmentToolbar( {
	getStyleValue,
	onStyleChange,
	align,
	setAttributes,
	clientId,
	withTextAlign = false,
	withFloat = false,
	withBlockWidth = false,
} ) {
	const {
		currentAtRule,
	} = useBlockStyles();

	function getAlignmentIcon() {
		if ( withTextAlign ) {
			const alignment = getStyleValue( 'textAlign', currentAtRule );

			switch ( alignment ) {
				case 'center':
					return alignCenter;
				case 'right':
					return alignRight;
				case 'justify':
					return alignJustify;
				case 'left':
				default:
					return alignLeft;
			}
		}

		if ( withFloat ) {
			const alignment = getStyleValue( 'float', currentAtRule );

			switch ( alignment ) {
				case 'left':
					return positionLeft;
				case 'right':
					return positionRight;
				case 'none':
				default:
					return alignNone;
			}
		}
	}

	const textAlignments = [
		{
			icon: alignLeft,
			value: 'left',
			label: __( 'Left', 'generateblocks' ),
		},
		{
			icon: alignCenter,
			value: 'center',
			label: __( 'Center', 'generateblocks' ),
		},
		{
			icon: alignRight,
			value: 'right',
			label: __( 'Right', 'generateblocks' ),
		},
		{
			icon: alignJustify,
			value: 'justify',
			label: __( 'Justify', 'generateblocks' ),
		},
	];

	const floats = [
		{
			icon: positionLeft,
			value: 'left',
			label: __( 'Left', 'generateblocks' ),
		},
		{
			icon: positionRight,
			value: 'right',
			label: __( 'Right', 'generateblocks' ),
		},
		{
			icon: alignNone,
			value: 'none',
			label: __( 'None', 'generateblocks' ),
		},
	];

	if ( ! withTextAlign && ! withFloat && ! withBlockWidth ) {
		return null;
	}

	return (
		<BlockControls group="inline">
			<Dropdown
				popoverProps={ POPOVER_PROPS }
				renderToggle={ ( { isOpen, onToggle } ) => (
					<ToolbarButton
						icon={ getAlignmentIcon() }
						label={ __( 'Alignment', 'generateblocks' ) }
						onClick={ onToggle }
						aria-expanded={ isOpen }
						isPressed={ !! isOpen }
					/>
				) }
				renderContent={ () => (
					<>
						{ !! withTextAlign && (
							<MenuGroup label={ __( 'Text Alignment', 'generateblocks' ) }>
								{ textAlignments.map( ( { icon, value, label } ) => (
									<MenuItem
										key={ value }
										icon={ icon }
										isPressed={ value === getStyleValue( 'textAlign', currentAtRule ) }
										onClick={ () => {
											if ( value === getStyleValue( 'textAlign', currentAtRule ) ) {
												onStyleChange( 'textAlign', '', currentAtRule );
												return;
											}

											onStyleChange( 'textAlign', value, currentAtRule );
										} }
									>
										{ label }
									</MenuItem>
								) ) }
							</MenuGroup>
						) }

						{ !! withFloat && (
							<MenuGroup label={ __( 'Float', 'generateblocks' ) }>
								{ floats.map( ( { icon, value, label } ) => (
									<MenuItem
										key={ value }
										icon={ icon }
										isPressed={ value === getStyleValue( 'float', currentAtRule ) }
										onClick={ () => {
											if ( value === getStyleValue( 'float', currentAtRule ) ) {
												onStyleChange( 'float', '', currentAtRule );
												return;
											}

											onStyleChange( 'float', value, currentAtRule );
										} }
									>
										{ label }
									</MenuItem>
								) ) }
							</MenuGroup>
						) }

						{ !! withBlockWidth && '' === currentAtRule && undefined !== align && (
							<BlockWidth
								align={ align }
								onChange={ ( value ) => setAttributes( { align: value } ) }
								clientId={ clientId }
							/>
						) }
					</>
				) }
			/>
		</BlockControls>
	);
}
