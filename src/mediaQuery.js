const { get } = require('jquery');

const xl = 1200;
const lg = 992;
const md = 768;
const sm = 576;

const screenQuery = size => `only screen and (min-width: ${size}px)`

const getScreenSizeBreakPoint = () => {
	if(window.matchMedia(screenQuery(xl)).matches) {
		return 'xl';
	} else if(window.matchMedia(screenQuery(lg)).matches) {
		return 'lg';
	} else if(window.matchMedia(screenQuery(md)).matches) {
		return 'md';
	} else if(window.matchMedia(screenQuery(sm)).matches) {
		return 'sm';
	} else {
		return 'xs';
	}
}

const isXl = () => getScreenSizeBreakPoint() === 'xl';
const isLg = () => isXl() || getScreenSizeBreakPoint() === 'lg';
const isMd = () => isLg() || getScreenSizeBreakPoint() === 'md';
const isSm = () => isMd() || getScreenSizeBreakPoint() === 'sm';
const isXs = () => getScreenSizeBreakPoint() === 'xs';

export {
	getScreenSizeBreakPoint,
	isXs,
	isSm,
	isMd,
	isLg,
	isXl
};
