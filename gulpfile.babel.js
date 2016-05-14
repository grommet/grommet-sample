import gulp from 'gulp';
import yargs from 'yargs';
const argv = yargs.argv;
import grommetToolbox, { getOptions } from 'grommet-toolbox';

const options = getOptions();

gulp.task('set-webpack-alias', function () {
  if (options.alias && argv.useAlias) {
    console.log('Using local alias for development.');
    options.webpack.resolve.alias = options.alias;
  }
});

grommetToolbox(gulp);
