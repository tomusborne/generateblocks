import { defaultAtRules } from '@edge22/styles-builder';

export const mobileAtRule = defaultAtRules.find( ( rule ) => 'smallWidth' === rule.id )?.value ?? '@media (max-width:767px)';
