var gulp = require("gulp");
var useref = require("gulp-useref");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-clean-css");
var gulpIf = require("gulp-if");
var gutil = require('gulp-util');

//files
var backend = "backend/**";
var pages = "pages/*.html";
var resources = "res/*";
var intro = "intro/intro.html";
var introResources = "intro/res/*";
var config = "config.php";
var particles = "js/particles.js";
var fonts = "bower_components/font-awesome/fonts/*";
var directives = "js/directives/*";

var buildTasks = ["minifyJoinFiles","minifyIntro","buildBackend",
"buildPages","buildResources","buildIntroRes","buildConfig","buildParticles",
"buildFonts","buildDirectives"];

//minifies and concatenates js and css files
gulp.task("minifyJoinFiles",()=>{
  gulp.src("index.php")
  .pipe(useref())
  .pipe(gulpIf("*.js",uglify()))
  .pipe(gulpIf("*.css",minifyCss()))
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulp.dest("dist"));
});

gulp.task("minifyIntro",()=>{
  gulp.src(intro)
  .pipe(useref())
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulpIf("*.js",uglify()))
  .pipe(gulpIf("*.css",minifyCss()))
  .pipe(gulp.dest("dist/intro"));
});

//builds every other file that doesnt need minifying into the dist folder
gulp.task("buildBackend",()=>{
  gulp.src(backend)
  .pipe(gulp.dest("dist/backend"));
});

gulp.task("buildPages",()=>{
  gulp.src(pages)
  .pipe(gulp.dest("dist/pages"));
});

gulp.task("buildResources",()=>{
  gulp.src(resources)
  .pipe(gulp.dest("dist/res"));
});

gulp.task("buildIntroRes",()=>{
  gulp.src(introResources)
  .pipe(gulp.dest("dist/intro/res"));
});

gulp.task("buildConfig",()=>{
  gulp.src(config)
  .pipe(gulp.dest("dist"));
});

gulp.task("buildParticles",()=>{
  gulp.src(particles)
  .pipe(uglify())
  .pipe(gulp.dest("dist/js/"));
});

gulp.task("buildFonts",()=>{
  gulp.src(fonts)
  .pipe(gulp.dest("dist/fonts/"));
});

gulp.task("buildDirectives",()=>{
  gulp.src(directives)
  .pipe(gulp.dest("dist/js/directives/"));
});

//finally build app
gulp.task("build",buildTasks);
