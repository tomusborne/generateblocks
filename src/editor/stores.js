import { register } from '@wordpress/data';
import {
	currentStyleStore,
	atRuleStore,
	nestedRuleStore,
} from '../store/block-styles';

register( currentStyleStore );
register( atRuleStore );
register( nestedRuleStore );
