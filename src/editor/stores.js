import { register } from '@wordpress/data';
import {
	currentStyleStore,
	stylesStore,
	atRuleStore,
	nestedRuleStore,
} from '../store/block-styles';

register( currentStyleStore );
register( stylesStore );
register( atRuleStore );
register( nestedRuleStore );
