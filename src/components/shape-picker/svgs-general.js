/**
 * WordPress dependencies
 */
const { _x } = wp.i18n;

const svgs = {
	wave: {
		label: _x( 'Wave', 'label', 'generateblocks' ),
		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="currentColor" fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>,
	},
	wave2: {
		label: _x( 'Wave 2', 'label', 'generateblocks' ),
		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="currentColor" fillOpacity="1" d="M0,224L48,229.3C96,235,192,245,288,224C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,197.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>,
	},
	mountains: {
		label: _x( 'Mountains', 'label', 'generateblocks' ),
		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="currentColor" fillOpacity="1" d="M0,128L480,224L960,64L1440,160L1440,320L960,320L480,320L0,320Z"></path></svg>,
	},
	mountains2: {
		label: _x( 'Mountains 2', 'label', 'generateblocks' ),
		icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="currentColor" fillOpacity="1" d="M0,64L480,128L960,192L1440,64L1440,320L960,320L480,320L0,320Z"></path></svg>,
	},
};

export default svgs;
