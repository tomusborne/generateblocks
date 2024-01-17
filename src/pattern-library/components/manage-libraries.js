import { Button, Modal, ToggleControl, Tooltip } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { settings, trash } from '@wordpress/icons';
import { fetchLibraries, useLibrary } from './library-provider';
import apiFetch from '@wordpress/api-fetch';

async function saveLibraries( newData ) {
	const response = await apiFetch( {
		path: 'generateblocks/v1/pattern-library/libraries/save',
		method: 'POST',
		data: {
			data: newData,
		},
	} );

	return response;
}

function ManageRow( { library, librariesToManage, setLibrariesToManage, isRemote } ) {
	const { setLibraries } = useLibrary();

	return (
		<div key={ library.id } className="gblocks-manage-libraries__library">
			<div className="gblocks-manage-libraries__library-name">
				{ !! isRemote
					? <Tooltip text={ library.domain }><span>{ library.name }</span></Tooltip>
					: library.name
				}

				{ !! isRemote &&
					<Button
						size="small"
						isDestructive
						variant="secondary"
						onClick={ async() => {
							const newData = [ ...librariesToManage ];
							const index = newData.findIndex( ( obj ) => obj.id === library.id );

							newData.splice( index, 1 );
							setLibrariesToManage( newData );
							const response = await saveLibraries( newData );

							if ( response.success && response?.response?.data.length ) {
								setLibraries( response?.response?.data.length );
							}
						} }
						icon={ trash }
						label={ __( 'Delete library', 'generateblocks' ) }
						showTooltip
					/>
				}
			</div>
			<div className="gblocks-manage-libraries__library-actions">
				<ToggleControl
					checked={ !! library.isEnabled }
					label={ __( 'Enabled', 'generateblocks' ) }
					onChange={ async() => {
						const newData = [ ...librariesToManage ];
						const index = newData.findIndex( ( obj ) => obj.id === library.id );

						newData[ index ] = {
							...newData[ index ],
							isEnabled: librariesToManage[ index ].isEnabled ? false : true,
						};

						setLibrariesToManage( newData );
						const response = await saveLibraries( newData );

						if ( response.success && response?.response?.data.length ) {
							setLibraries();
						}
					} }
				/>
			</div>
		</div>
	);
}

export default function ManageLibraries() {
	const [ showManageLibraries, setShowManageLibraries ] = useState( false );
	const [ librariesToManage, setLibrariesToManage ] = useState( [] );

	useEffect( () => {
		( async function() {
			if ( ! showManageLibraries ) {
				return;
			}

			const { data } = await fetchLibraries( false );
			setLibrariesToManage( data );
		}() );
	}, [ showManageLibraries ] );

	const defaultLibraries = librariesToManage.filter( ( library ) => library.isDefault );
	const localCollections = librariesToManage.filter( ( library ) => library.isLocal );
	const remoteLibraries = librariesToManage.filter( ( library ) => ! library.isLocal && ! library.isDefault );

	return (
		<>
			<Button
				variant="tertiary"
				size="compact"
				icon={ settings }
				label={ __( 'Manage Libraries', 'generateblocks' ) }
				showTooltip
				onClick={ setShowManageLibraries }
			/>

			{ !! showManageLibraries &&
				<Modal
					title={ __( 'Manage Libraries', 'generateblocks' ) }
					onRequestClose={ () => setShowManageLibraries( false ) }
				>
					<div className="gblocks-manage-libraries">
						{ !! defaultLibraries.length &&
							<>
								<h4>{ __( 'Default', 'generateblocks' ) }</h4>
								<div className="gblocks-manage-libraries__table">
									{ defaultLibraries.map( ( library ) =>
										<ManageRow
											key={ library.id }
											library={ library }
											librariesToManage={ librariesToManage }
											setLibrariesToManage={ setLibrariesToManage }
										/>
									) }
								</div>
							</>
						}

						{ !! localCollections.length &&
							<>
								<h4>{ __( 'Local', 'generateblocks' ) }</h4>
								<div className="gblocks-manage-libraries__table">
									{ localCollections.map( ( library ) =>
										<ManageRow
											key={ library.id }
											library={ library }
											librariesToManage={ librariesToManage }
											setLibrariesToManage={ setLibrariesToManage }
										/>
									) }
								</div>
							</>
						}

						{ !! remoteLibraries.length &&
							<>
								<h4>{ __( 'Remote', 'generateblocks' ) }</h4>
								<div className="gblocks-manage-libraries__table">
									{ remoteLibraries.map( ( library ) =>
										<ManageRow
											key={ library.id }
											library={ library }
											librariesToManage={ librariesToManage }
											setLibrariesToManage={ setLibrariesToManage }
											isRemote={ true }
										/>
									) }
								</div>
							</>
						}
					</div>
				</Modal>
			}
		</>
	);
}
