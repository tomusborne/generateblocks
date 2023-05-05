import { pipe, updateBlockVersion } from '../../hoc/migrations/utils';

describe( 'blockVersion', () => {
	it( 'should update blockVersion', () => {
		const attributes = {
			blockVersion: 1,
		};

		const newAttributes = pipe(
			attributes,
			[
				updateBlockVersion( 2 ),
			]
		);

		expect( newAttributes ).toEqual( { blockVersion: 2 } );
	} );
} );
