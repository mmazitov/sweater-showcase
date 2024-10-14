const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const eslint = require('gulp-eslint');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

// Функция для динамического импорта gulp-imagemin
async function imagemin() {
	const imagemin = await import('gulp-imagemin');
	return imagemin.default;
}

// Пути к файлам
const paths = {
	pug: {
		src: './src/pug/**/*.pug',
		dist: 'dist',
		pages: './src/pug/pages/**/*.pug',
	},
	styles: {
		src: './src/scss/**/*.scss',
		dist: './dist/css',
	},
	scripts: {
		src: './src/js/**/*.js',
		dist: './dist/js',
	},
	fonts: {
		src: './src/fonts/**/*',
		dist: './dist/fonts',
	},
	images: {
		src: './src/images/**/*',
		dist: './dist/images',
	},
	pic: {
		src: './src/pic/**/*',
		dist: './dist/pic',
	},
};

// Компиляция Pug в HTML
function pugTask() {
	return gulp
		.src(paths.pug.pages)
		.pipe(
			pug({
				pretty: true,
			})
		)
		.pipe(gulp.dest(paths.pug.dist))
		.pipe(browserSync.stream());
}

// Компиляция SCSS в CSS
function sassTask() {
	return gulp
		.src(paths.styles.src)
		.pipe(sass().on('error', sass.logError)) // Обработка ошибок
		.pipe(cleanCSS()) // Минификация CSS
		.pipe(gulp.dest(paths.styles.dist)) // Сохранение CSS в dist
		.pipe(browserSync.stream()); // Перезагрузка браузера
}

// Линтинг и компиляция JavaScript
function jsTask() {
	return gulp
		.src(paths.scripts.src)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(terser())
		.pipe(gulp.dest(paths.scripts.dist))
		.pipe(browserSync.stream());
}

// Копирование шрифтов
function fontsTask() {
	return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dist));
}

// Оптимизация изображений (с динамическим импортом gulp-imagemin)
async function imagesTask() {
	const imageminInstance = await imagemin();
	return gulp
		.src(paths.images.src)
		.pipe(imageminInstance())
		.pipe(gulp.dest(paths.images.dist));
}

// Оптимизация картинок (папка pic)
async function picTask() {
	const imageminInstance = await imagemin();
	return gulp
		.src(paths.pic.src)
		.pipe(imageminInstance())
		.pipe(gulp.dest(paths.pic.dist));
}

// Запуск сервера и отслеживание изменений
function watchTask() {
	browserSync.init({
		server: {
			baseDir: './dist',
		},
	});

	gulp.watch(paths.styles.src, sassTask);
	gulp.watch(paths.pug.src, pugTask);
	gulp.watch(paths.scripts.src, jsTask);
	gulp.watch(paths.images.src, imagesTask);
	gulp.watch(paths.pic.src, picTask);
	gulp.watch(paths.fonts.src, fontsTask);
}

// Определение задач
exports.default = gulp.series(
	gulp.parallel(pugTask, sassTask, jsTask, fontsTask, imagesTask, picTask),
	watchTask
);
