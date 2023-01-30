import { useContext } from '@wordpress/element';
import BlockContext from '../../block-context';

export default () => {
	const { deviceType } = useContext( BlockContext );

	return deviceType;
};
