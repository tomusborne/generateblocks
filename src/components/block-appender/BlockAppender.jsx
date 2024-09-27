import { Inserter } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
import { __, sprintf, _x } from '@wordpress/i18n';
import { Button, Icon, Tooltip } from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { plus } from '@wordpress/icons';

import { useInnerBlocksCount } from '../../hooks';
import { getIcon } from '@utils';

import './editor.scss';

export function BlockAppender( { clientId, isSelected, attributes } ) {
	const { isBlockPreview } = attributes;
	const innerBlocksCount = useInnerBlocksCount( clientId );
	const hasChildBlocks = 0 < innerBlocksCount;
	const { selectBlock } = useDispatch( 'core/block-editor' );

	let appender = false;

	const showAppender = applyFilters(
		'generateblocks.editor.showBlockAppender',
		isBlockPreview ? false : true,
		{ clientId, isSelected, attributes }
	);

	if ( ! showAppender ) {
		return null;
	}

	function ButtonBlockAppender() {
		return (
			<Inserter
				placement="bottom right"
				rootClientId={ clientId }
				__experimentalIsQuick
				renderToggle={ ( {
					onToggle,
					disabled,
					isOpen,
					blockTitle,
					hasSingleBlockType,
				} ) => {
					const label = hasSingleBlockType
						? sprintf(
							// translators: %s: the name of the block when there is only one
							_x( 'Add %s', 'directly add the only allowed block', 'generateblocks' ),
							blockTitle
						) : _x( 'Add block', 'Generic label for block inserter button', 'generateblocks' );

					return (
						<Tooltip text={ label }>
							<Button
								className={ 'block-editor-button-block-appender gb-block-appender__button' }
								onClick={ onToggle }
								aria-haspopup={ ! hasSingleBlockType ? 'true' : undefined }
								aria-expanded={ ! hasSingleBlockType ? isOpen : undefined }
								disabled={ disabled }
								label={ label }
							>
								<Icon icon={ plus } />
							</Button>
						</Tooltip>
					);
				} }
				isAppender
			/>
		);
	}

	// Selected Container.
	if ( isSelected ) {
		appender = <ButtonBlockAppender />;
	}

	// Empty non-selected Container.
	if ( ! hasChildBlocks && ! isSelected ) {
		appender = <Button
			className="gblocks-element-selector"
			onClick={ () => selectBlock( clientId ) }
			aria-label={ __( 'Select Container', 'generateblocks' ) }
		>
			<span className="gblocks-element-selector__icon">
				{ getIcon( 'container' ) }
			</span>
		</Button>;
	}

	return applyFilters(
		'generateblocks.editor.blockAppender',
		appender,
		{ clientId, isSelected, attributes }
	);
}
