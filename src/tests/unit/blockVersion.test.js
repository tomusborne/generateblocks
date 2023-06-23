import { migrationPipe, updateBlockVersion } from '../../hoc/migrations/utils';

describe( 'blockVersion', () => {
	it( 'should update blockVersion', () => {
		const attributes = {
			blockVersion: 1,
		};

		const newAttributes = migrationPipe(
			attributes,
			[
				updateBlockVersion( 2 ),
			]
		);

		expect( newAttributes ).toEqual( { blockVersion: 2 } );
	} );
} );
