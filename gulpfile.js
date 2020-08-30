'use strict';

const {src, dest, series, parallel} = require('gulp');
const include = require('gulp-html-tag-include');
const rm = require( 'gulp-rm' );
const lessc = require('gulp-less');

function clean(){
	return src('src/www/public/**/*.*', {read:false})
		.pipe(rm());
}

function copyHTML(){
	return src('src/www/private/**/*.html')
		.pipe(include())
		.pipe(dest('src/www/public/'));
}

function less(){
	return src('src/www/private/**/*.less')
		.pipe(lessc())
		.pipe(dest('src/www/public/'));
}

function js(){
	return src('src/www/private/**/*.js')
		.pipe(dest('src/www/public/'));
}

module.exports = {
	clean,
	html: copyHTML,
	css: less,
	js,
	default: series(clean, parallel(copyHTML, less, js))
};
