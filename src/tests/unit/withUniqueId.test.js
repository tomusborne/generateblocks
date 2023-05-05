import getEditorBlocks from '../../utils/get-editor-blocks';
import { getUniqueIdFromBlocks, hasDuplicates } from '../../hoc/withUniqueId';

function mockGetBlocks( returnBlocks = [], returnInnerBlocks = [] ) {
	window.wp = {
		data: {
			select: () => {
				return {
					getBlocks: ( clientId ) => {
						return clientId ? returnInnerBlocks : returnBlocks;
					},
				};
			},
		},
	};
}

function clearMocks() {
	window.wp = undefined;
}

describe( 'Unique Id internals', () => {
	afterEach( () => {
		clearMocks();
	} );

	it( 'can get all unique id from blocks', () => {
		mockGetBlocks( [
			{
				name: 'generateblocks/container',
				clientId: '921678f2-e01f-4c0e-a548-792e3b7e09a2',
				attributes: {
					uniqueId: '1678f2e0',
				},
				innerBlocks: [
					{
						name: 'generateblocks/button',
						clientId: 'b5eb022f-b67a-4fd2-ba16-1e026b76348d',
						attributes: {
							uniqueId: 'eb022fb6',
						},
					},
				],
			},
			{
				name: 'generateblocks/headline',
				clientId: '415b20e2-ef01-4ff8-a8ae-5d209a0cecce',
				attributes: {
					uniqueId: '5b20e2ef',
				},
			},
		] );

		const { uniqueIds, clientIds } = getUniqueIdFromBlocks( getEditorBlocks() );

		expect( uniqueIds.length ).toEqual( 3 );
		expect( uniqueIds[ 1 ] ).toEqual( 'eb022fb6' );

		expect( clientIds.length ).toEqual( 3 );
		expect( clientIds[ 2 ] ).toEqual( '415b20e2-ef01-4ff8-a8ae-5d209a0cecce' );
	} );

	it( 'can validate if has duplicate blocks uniqueIds', () => {
		mockGetBlocks( [
			{
				name: 'generateblocks/container',
				clientId: '921678f2-e01f-4c0e-a548-792e3b7e09a2',
				attributes: {
					uniqueId: '1678f2e0',
				},
			},
			{
				name: 'generateblocks/headline',
				clientId: 'b5eb022f-b67a-4fd2-ba16-1e026b76348d',
				attributes: {
					uniqueId: '1678f2e0',
				},
			},
		] );
		const { uniqueIds } = getUniqueIdFromBlocks( getEditorBlocks() );

		expect( hasDuplicates( uniqueIds, '1e026b76', 0 ) ).toBeFalsy();
		expect( hasDuplicates( uniqueIds, '1678f2e0', 0 ) ).toBeFalsy();
		expect( hasDuplicates( uniqueIds, '1678f2e0', 1 ) ).toBeTruthy();
	} );

	it( 'can validate if has duplicate uniqueIds in the widget editor', () => {
		mockGetBlocks( [
			{
				clientId: 'da95940b-4ce7-41b9-a0a2-8fce3b6b7357',
				attributes: {},
				innerBlocks: [],
				name: 'core/widget-area',
			},
		], [
			{
				name: 'generateblocks/container',
				clientId: '921678f2-e01f-4c0e-a548-792e3b7e09a2',
				attributes: {
					uniqueId: '1678f2e0',
				},
				innerBlocks: [
					{
						name: 'generateblocks/button',
						clientId: 'b5eb022f-b67a-4fd2-ba16-1e026b76348d',
						attributes: {
							uniqueId: 'eb022fb6',
						},
					},
				],
			},
			{
				name: 'generateblocks/headline',
				clientId: '415b20e2-ef01-4ff8-a8ae-5d209a0cecce',
				attributes: {
					uniqueId: 'eb022fb6',
				},
			},
		] );

		const { uniqueIds } = getUniqueIdFromBlocks( getEditorBlocks() );

		expect( hasDuplicates( uniqueIds, 'eb022fb6', 2 ) ).toEqual( true );
	} );
} );
