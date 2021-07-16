import { mount } from 'enzyme';
import UnitPicker from '../index';

describe( 'UnitPicker', () => {
	it( 'should render', () => {
		const wrapper = mount(
			<UnitPicker
				label={ 'My label' }
				value={ 'px' }
				units={ [ 'px', 'em' ] }
				onClick={ ( value ) => ( value ) }
			/>
		);

		expect( wrapper.find( '.components-gblocks-units-control-header__units' ).length ).toBe( 1 );
	} );
} );
