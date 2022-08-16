`use strict`;

const { src, dest, series, parallel, watch } = require(`gulp`);
const include = require(`gulp-include`);
const concat = require(`gulp-concat`);
const babel = require(`gulp-babel`);
const uglify = require(`gulp-uglify`);
const cleanCSS = require(`gulp-clean-css`);
const rename = require(`gulp-rename`);
const clean = require(`gulp-clean`);
const autoprefixer = require(`gulp-autoprefixer`);
const htmlmin = require(`gulp-htmlmin`);
const browserSync = require(`browser-sync`).create();

const jsFilesArr = [
  `src/js/lib/jquery-3.6.0.min.js`,
  `src/js/lib/promise-polyfill.min.js`,
  `src/js/lib/date.js`,
  `src/js/utils/getMonthLetter.js`,
  `src/js/utils/padTo2Digits.js`,
  `src/js/utils/getParentFolder.js`,
  `src/js/constants.js`,
  `env.js`,
  `src/js/constantsButtons.js`,
  `src/js/utils/searchFile.js`,
  `src/js/utils/puttyConnection.js`,
  `src/js/utils/getClientsNum.js`,
  `src/js/utils/getJobsNum.js`,
  `src/js/utils/connectNetworkDrive.js`,
  `src/js/utils/connect1C.js`,
  `src/js/utils/convertSize.js`,
  `src/js/utils/getDiskFreeSpace.js`,
  `src/js/utils/declOfNum.js`,
  `src/js/layouts/addOkBlock.js`,
  `src/js/layouts/addNOkBlock.js`,
  `src/js/layouts/addSendMailButton.js`,
  `src/js/visual.js`,
  `src/js/buttons.js`,
];

const DIST = `build`;
const APP_NAME = `checklist.hta`;

const cleanDist = () => src(`${DIST}/*`, { read: false }).pipe(clean({ force: true }));
const cleanMin = () => src(`${DIST}/*min*`, { read: false }).pipe(clean({ force: true }));
const copyDistr = () => src(`src/distr/**`).pipe(dest(`${DIST}/distr/`));

const css = () => {
  return src(`src/css/**/*.css`)
    .pipe(concat(`main.css`))
    .pipe(autoprefixer([`last 15 versions`, `> 1%`, `ie 8`, `ie 7`], { cascade: true }))
    .pipe(cleanCSS({ compatibility: `*` }))
    .pipe(rename(`main.min.css`))
    .pipe(dest(DIST))
    .pipe(browserSync.stream());
};

const js = () => {
  return src(jsFilesArr)
    .pipe(concat(`main.js`))
    .pipe(
      babel({
        presets: [`@babel/preset-env`],
      })
    )
    .pipe(uglify({ toplevel: true }))
    .pipe(rename(`main.min.js`))
    .pipe(dest(DIST))
    .pipe(browserSync.stream());
};

const build = () => {
  return src(`src/${APP_NAME}`)
    .pipe(
      include({
        includePaths: [DIST],
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(dest(DIST))
    .pipe(browserSync.stream());
};

const serve = () => {
  browserSync.init({
    server: {
      baseDir: DIST,
      index: APP_NAME,
    },
    browser: `iexplore.exe`,
    reloadOnRestart: true,
  });
  watch(`src/css/**/*.css`, series(css, build));
  watch(jsFilesArr, series(js, build));
  watch(`src/${APP_NAME}`, build);
  watch(`${DIST}/${APP_NAME}`).on(`change`, browserSync.reload);
};

exports.build = series(cleanDist, parallel(css, js), build, cleanMin, copyDistr);
exports.serve = series(cleanDist, parallel(css, js), build, copyDistr, serve);
