import { __ } from '@wordpress/i18n';
import SettingsPanel from './components/settings-panel';
import LibrariesList from './components/libraries-list';
import useLibraries, { arrayFromCollection } from './hooks/useLibraries';

const generateId = () => (
	Math.random().toString( 36 ).substring( 2, 10 ) +
	Math.random().toString( 36 ).substring( 2, 10 )
);

export default function PatternLibrarySettings() {
	const [ libraries, , updateAction, deleteAction, saveAction ] = useLibraries();
	const { data, isLoading, error, isSaving, showSaveMessage } = libraries;

	return (
		<SettingsPanel
			title={ __( 'Pattern Library', 'generateblocks' ) }
			onSave={ saveAction }
			isSaving={ isSaving }
			showSaveMessage={ showSaveMessage }
		>
			<LibrariesList
				data={ arrayFromCollection( data ) }
				isLoading={ isLoading }
				error={ error }
				onChange={ ( id, field, value ) => {
					updateAction( id, { [ field ]: value } );
				} }
				onDelete={ deleteAction }
				onAdd={ () => {
					const id = generateId();

					updateAction( id, {
						id,
						name: '',
						domain: '',
						publicKey: '',
						isEnabled: false,
						isDefault: false,
					} );
				} }
			/>
		</SettingsPanel>
	);
}
