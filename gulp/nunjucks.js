'use strict';

var fs = require('fs');
var path = require('path');
var foldero = require('foldero');
var nunjucks = require('gulp-nunjucks-html');
var yaml = require('js-yaml');
var gulpif = require('gulp-if');

module.exports = function(gulp, plugins, args, config, taskTarget, browserSync) {
  var dirs = config.directories;
  var dest = path.join(taskTarget);
  var dataPath = path.join(dirs.source, dirs.data);

  // Nunjucks template compile
  gulp.task('nunjucks', function() {
    var siteData = {};
    if (fs.existsSync(dataPath)) {
      // Convert directory to JS Object
      siteData = foldero(dataPath, {
        recurse: true,
        whitelist: '(.*/)*.+\.(json|ya?ml)$',
        loader: function loadAsString(file) {
          var json = {};
          try {
            if (path.extname(file).match(/^.ya?ml$/)) {
              json = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
            }
            else {
              json = JSON.parse(fs.readFileSync(file, 'utf8'));
            }
          }
          catch(e) {
            console.log('Error Parsing DATA file: ' + file);
            console.log('==== Details Below ====');
            console.log(e);
          }
          return json;
        }
      });
    }

    // Add --debug option to your gulp task to view
    // what data is being loaded into your templates
    if (args.debug) {
      console.log('==== DEBUG: site.data being injected to templates ====');
      console.log(siteData);
      console.log('\n==== DEBUG: package.json config being injected to templates ====');
      console.log(config);
    }


    // All the _data files with 2 letters are a language-specific translation
    var languages = Object.keys(siteData).filter((l) => l.length === 2);

    for( let lang of languages ) {
      // Inject a global _ variable for each language (translation) 
      // and build a copy of the html into a separate /es/ or /en/ folder
      let translation = siteData[lang];      

      gulp.src([
        path.join(dirs.source, '**/*.nunjucks'),
        '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}')
      ])
      .pipe(plugins.changed(dest))
      .pipe(plugins.plumber())
      .pipe(plugins.data({
        config: config,
        debug: true,
        site: {
          data: siteData
        }
      }))
      .pipe(nunjucks({
        searchPaths: [path.join(dirs.source)],
        ext: '.html',
        setUp: function(env) {
          // The language var is global (no need to pass it explicitly to a macro/module)
          env.addGlobal('_', translation);
          env.addGlobal('_currentLanguage', lang);
          env.addGlobal('baseUrl', config.baseUrl);
          return env;
        }
      })
      .on('error', function(err) {
        plugins.util.log(err);
      }))
      .on('error', plugins.notify.onError(config.defaultNotification))
      .pipe(plugins.htmlmin({
        collapseBooleanAttributes: true,
        conservativeCollapse: true,
        removeCommentsFromCDATA: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true
      }))
      .pipe(gulp.dest(dest + '/' + lang + '/'))
      .on('end', browserSync.reload);
    }    


    // Copy the redirect
    gulp.src([
      path.join(dirs.source+'/_redirect/', 'index.nunjucks')
    ])
    .pipe(plugins.data({
      config: config,
      debug: true,
      supportedLanguages: languages
    }))
    .pipe(nunjucks({
      searchPaths: [path.join(dirs.source)],
      ext: '.html'
    }))
    .pipe(gulp.dest(dest));
    
  });
};
