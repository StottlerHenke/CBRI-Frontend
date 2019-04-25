# Front-end development seed

This seed directory is a common starting point for front-end development work at Concentric Sky. As work on a project progresses elements of this seed directory will be replaced by production code. This primarily acts as a checklist for what should be delivered to the browser, with some examples of current best practices.

# Getting started

Run the following commands:

1. npm install
2. npm run dev

Next steps:

1. Remove this README.md, and rename README.md.example to README.md
2. Rename gitignore.example to .gitignore
3. Update package.json with appropriate project name and git url
4. Begin the [Development Process](https://confluence.concentricsky.com/display/UD/Development+Process) starting from Step 2
5. Make an initial commit to the master branch and then create the development branch, check it out, and push to origin

# 1.0 src

Where all of the front-end code for the website or web app will be placed. On some projects this may contain templates that are consumed by the application, otherwise it will contain the styles and static assets only.

## 1.1 src/css

| Details | Notes |
| ------- | ----- |
| Contains | Third-party css, images referenced by CSS, and fonts referenced by CSS|
| Compiles To | dist/css |
| reset.css | Eric Meyer's reset |

## 1.2 src/docs

| Details | Notes |
| ------- | ----- |
| Contains | Markdown files to be consumed by Fractal |
| Compiles To | patternlibrary |
| 01-index.md | Overview documentation for developers and designers.|
| 03-release_notes.md | A place to document version changes to the pattern library. |

## 1.5 src/scss

| Details | Notes |
| ------- | ----- |
| Contains | Sass files and Fractal meta files (previews, components, and configs) |
| Compiles To | dist/css, and patternlibrary |
| _base.scss | Sass variables, @font-face declarations, and mixins |
| screen.scss | Base rules and imports. Compiles to dist/css/screen.css |
| preview.hbs | Default wrapper for Fractal components |

# 2.0 auto-docs.js

Parses `_base.scss` and auto generates markdown docs.

# 3.0 build-and-publish.sh

A script used by Jenkins to publish the pattern library to AWS and publish the node package to Nexus.

# 4.0 fracal.js

Configuration file for Fractal.

# 5.0 git-version.js

Script used to auto tag and push a version of the pattern library.

# 6.0 Gruntfile.js

Configuration file for Grunt.

# 5.0 package.json

| Package | Purpose |
| ------- | ------- |
| @frctl/fractal | The Fractal pattern library |
| @frctl/handlebars | Required since we extend this package with the handlebar-helpers package |
| @frctl/mandelbrot | The web UI theme for Fractal (included in case you want to override the default color)
| autoprefixer | Auto-injects browser prefixes for new CSS attributes |
| grunt | Our build tool |
| grunt-concurrent | Allows running of Fractal and watch concurrently |
| grunt-cli | Runs grunt on the CLI |
| grunt-contrib-copy | Copies static assets from src to dist |
| grunt-contrib-uglify | Compiles third-party scripts into a single minified file |
| grunt-shell | Allows running certain packages from the command line, via grunt |
| grunt-contrib-watch | Watches for changes, runs various Grunt commands |
| handlebars-helpers | Extends the default handelbar templates in Fractal |
| imagemin-cli | Minifies images |
| json | Used in build scripts |
| node-sass | Compiles Sass via node.js |
| postcss-cli | The package which runs auto prefixer |
| semver | Used in build scripts |
| shelljs | Used in build scripts |
