import { ToggleControl, Modal, Button, Notice, ExternalLink } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useContext } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import ControlsContext from '../../block-context';
import { doInnerContainerMigration, doSimpleMigration, shouldMigrateInnerContainer } from './utils';

export default function MigrateInnerContainer( props ) {
	const {
		setAttributes,
		attributes,
	} = props;

	const {
		useInnerContainer,
		useGlobalStyle,
		isGlobalStyle,
	} = attributes;

	const { clientId } = useContext( ControlsContext );
	const [ isInnerContainerMigrateOpen, setIsInnerContainerMigrateOpen ] = useState( false );
	const openModal = () => setIsInnerContainerMigrateOpen( true );
	const closeModal = () => setIsInnerContainerMigrateOpen( false );

	const {
		getBlocksByClientId,
		getBlockParentsByBlockName,
		getBlock,
		isBlockMultiSelected,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const {
		insertBlocks,
		replaceBlocks,
	} = useDispatch( 'core/block-editor' );

	function isInsideGridBlock( blockClientId ) {
		return getBlockParentsByBlockName( blockClientId, 'generateblocks/grid', true )[ 0 ];
	}

	function getChildBlock( blockClientId ) {
		const currentBlock = getBlock( blockClientId );
		return currentBlock && currentBlock.innerBlocks.length ? getBlock( currentBlock.innerBlocks[ 0 ].clientId ) : '';
	}

	const migrateInnerContainer = shouldMigrateInnerContainer( {
		attributes,
		insideGridBlock: isInsideGridBlock( clientId ),
		childBlock: getChildBlock( clientId ),
	} );

	function migrateInnerContainerButton() {
		return <Button
			variant={ !! migrateInnerContainer ? 'primary' : 'secondary' }
			style={ { marginRight: '5px' } }
			onClick={ () => {
				doInnerContainerMigration( {
					attributes,
					setAttributes,
					parentBlock: getBlocksByClientId( clientId )[ 0 ],
					replaceBlocks,
					insertBlocks,
					clientId,
				} );
				closeModal();
			} }
		>
			{ __( 'Enable new system with inner Container block', 'generateblocks' ) }
		</Button>;
	}

	function enableNewSystemButton() {
		return <Button
			variant={ ! migrateInnerContainer ? 'primary' : 'secondary' }
			style={ { marginRight: '5px' } }
			onClick={ () => {
				doSimpleMigration( { attributes, setAttributes } );
				closeModal();
			} }
		>
			{ __( 'Enable new system only', 'generateblocks' ) }
		</Button>;
	}

	if ( isBlockMultiSelected( clientId ) ) {
		return null;
	}

	return (
		<>
			{ !! useInnerContainer &&
				<ToggleControl
					label={ __( 'Use legacy layout system', 'generateblocks' ) }
					help={
						<>
							{ __( 'This Container is using an old layout system. Toggle this to migrate to the new system.', 'generateblocks' ) }

							<ExternalLink
								style={ { display: 'block', marginTop: '8px' } }
								href={ __(
									'https://docs.generateblocks.com/article/migrating-container-legacy-layout/'
								) }
							>
								{ __( 'Learn more about the new system' ) }
							</ExternalLink>
						</>
					}
					checked={ !! useInnerContainer }
					onChange={ openModal }
				/>
			}

			{ !! isInnerContainerMigrateOpen &&
				<Modal title={ __( 'New Layout System', 'generateblocks' ) } onRequestClose={ closeModal }>
					<p>{ __( 'Migrating to our new layout system will do the following:', 'generateblocks' ) }</p>
					<ul className="gblocks-layout-system-ul">
						<li>{ __( 'Remove the inner div element that was included by default in the old system.', 'generateblocks' ) }</li>
						<li>{ __( 'Enable our new layout system for this Container block.', 'generateblocks' ) }</li>
					</ul>
					<p>{ __( 'We can automatically replace the old inner div element with a Container block if your layout relies on it.', 'generateblocks' ) }</p>

					{ !! useGlobalStyle &&
						<Notice status="warning" isDismissible={ false } className="gblocks-inner-container-notice">
							<strong>{ __( 'Warning:', 'generateblocks' ) }</strong>
							{ ' ' + __( 'This block is using a Global Style. Make sure the Global Style you are using is also using the new layout system.', 'generateblocks' ) }

							{ !! migrateInnerContainer &&
								<p style={ { marginBottom: 0 } }>{ __( 'You may want to create two new Global Styles for this Container. One for the outer Container block and one for the inner Container block.', 'generateblocks' ) }</p>
							}
						</Notice>
					}

					{ !! isGlobalStyle &&
						<Notice status="warning" isDismissible={ false } className="gblocks-inner-container-notice">
							<strong>{ __( 'Warning:', 'generateblocks' ) }</strong>
							{ ' ' + __( 'This block is a Global Style. If you migrate the inner container on this block you will need to make sure that all Container blocks using it are migrated as well.', 'generateblocks' ) }
						</Notice>
					}

					<Notice status="info" isDismissible={ false } className="gblocks-inner-container-notice">
						{ !! migrateInnerContainer
							? (
								<>
									<p style={ { marginTop: 0 } }><strong>{ __( 'Recommendation:', 'generateblocks' ) }</strong> { __( 'Yes, we recommend you add a new inner Container block to maintain your current layout.', 'generateblocks' ) }</p>

									{ migrateInnerContainerButton() }
								</>
							) : (
								<>
									<p style={ { marginTop: 0 } }><strong>{ __( 'Recommendation:', 'generateblocks' ) }</strong> { __( 'No, we do not believe you need an inner Container block based on your current layout.', 'generateblocks' ) }</p>
									{ enableNewSystemButton() }
								</>
							)
						}
					</Notice>

					{ ! migrateInnerContainer &&
						migrateInnerContainerButton()
					}

					{ !! migrateInnerContainer &&
						enableNewSystemButton()
					}

					<Button
						variant="secondary"
						onClick={ closeModal }
					>
						{ __( 'Cancel', 'generateblocks' ) }
					</Button>
				</Modal>
			}
		</>
	);
}
