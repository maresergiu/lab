const gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  prefixCss = require('gulp-autoprefixer'),
  postCssEnv = require('postcss-preset-env'),
  cssCustomMedia = require('postcss-custom-media'),
  preCss = require('precss'),
  postcssCustomSelectors = require('postcss-custom-selectors'),
  postcssConditions = require('postcss-conditionals'),
  postcssVars = require('postcss-simple-vars'),
  postcssAdvanceVars = require('postcss-advanced-variables'),
  postcssMath = require('postcss-automath'),
  postcssPerfectionist = require('perfectionist'),
  postCssNestedProps = require('postcss-nested-props'),
  postcssImport = require('postcss-import'),
  plumber = require('gulp-plumber'),
  uglifycss = require('gulp-uglifycss'),
  concat = require('gulp-concat'),
  babel = require('gulp-babel'),
  minifyJs = require('gulp-minify'),
  cssFile = {
    helpers: 'assets/css/helpers.css',
    destination: 'public/assets/css',
    modifyThisFiles: [
      'assets/css/libs/*.css',
      'assets/css/global.css',
      'assets/css/modules/*.css'
    ]
  },
  jsFile = {
    destination: 'public/assets/scripts',
    modifyThisFiles: [
      'assets/scripts/libs/*.js',
      'assets/scripts/helpers.js',
      'assets/scripts/global.js',
      'assets/scripts/modules/*.js'
    ]
  };

// main
// ----
// prefixes all the css
function postCss() {
  return new Promise(function (resolve, reject) {
    gulp
      .src(cssFile.modifyThisFiles)
      .pipe(plumber())
      .pipe(
        postcss([
          postcssImport(),
          postCssNestedProps(),
          postcssAdvanceVars(),
          postcssVars(),
          postcssMath(),
          postcssConditions(),
          postCssEnv({
            preserve: false,
            importFrom: cssFile.helpers
          }),
          cssCustomMedia({
            importFrom: cssFile.helpers
          }),
          preCss(),
          postcssCustomSelectors({
            importFrom: cssFile.helpers
          }),
          postcssPerfectionist({
            cascade: false,
            format: 'compact'
          })
        ])
      )
      .pipe(
        prefixCss({
          browsers: ['since 2010'],
          cascade: false
        })
      )
      .pipe(concat('style.css'))
      .pipe(uglifycss({
        'maxLineLen': 80,
        'uglyComments': true
      }))
      .pipe(gulp.dest(cssFile.destination));

    resolve();
  });
};

gulp.task('postCss', postCss);

// convert es6++ to es5
function babelJsFunc() {
  return new Promise(function (resolve, reject) {
    gulp.src(jsFile.modifyThisFiles)
      .pipe(plumber())
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(minifyJs())
      .pipe(concat('script-bundle-min.js'))
      .pipe(gulp.dest('public/assets/script'));

    resolve();
  });
};

gulp.task('babelJs', babelJsFunc);

// watch for changes
function watchForChanges() {
  return new Promise(function (resolve, reject) {
    gulp.watch(cssFile.modifyThisFiles, gulp.series(postCss));

    resolve();
  });
}
gulp.task('watch', watchForChanges);

// default message
function defaultGulp() {
  postCss();
  babelJsFunc();
  watchForChanges();
};

gulp.task('default', async function () {
  defaultGulp();
});