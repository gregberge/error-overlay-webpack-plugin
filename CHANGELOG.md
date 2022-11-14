# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.1](https://github.com/gregberge/error-overlay-webpack-plugin/compare/v1.1.0...v1.1.1) (2022-11-14)


### Bug Fixes

* compatibility with `webpack-dev-server` ([f3eaa7b](https://github.com/gregberge/error-overlay-webpack-plugin/commit/f3eaa7b0d4ad7c71f1ef56b5d15083449ef52a86))

## [1.1.0](https://github.com/gregberge/error-overlay-webpack-plugin/compare/v1.0.0...v1.1.0) (2022-02-12)


### Features

* upgrade & various fixes ([bb87e5f](https://github.com/gregberge/error-overlay-webpack-plugin/commit/bb87e5f4a5b3cf86530929616ee6e35cf84aaa81)), closes [#91](https://github.com/gregberge/error-overlay-webpack-plugin/issues/91) [#90](https://github.com/gregberge/error-overlay-webpack-plugin/issues/90) [#82](https://github.com/gregberge/error-overlay-webpack-plugin/issues/82)


### Bug Fixes

* options has an unknown property 'before' ([#88](https://github.com/gregberge/error-overlay-webpack-plugin/issues/88)) ([28de3ed](https://github.com/gregberge/error-overlay-webpack-plugin/commit/28de3ed3441b5e4b6185fd74c77b6dff3c792ea0))

## [1.0.0](https://github.com/gregberge/error-overlay-webpack-plugin/compare/v0.4.2...v1.0.0) (2021-08-30)

### [0.4.2](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.4.1...v0.4.2) (2021-02-02)


### Bug Fixes

* pass in compiler to devServer before() ([#66](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/66)) ([c0feceb](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/c0feceb73c6c7a38cddc40898cdfbcb0ae83a35e))

### [0.4.1](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.4.0...v0.4.1) (2019-08-28)


### Features

* upgrade dependencies ([effea01](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/effea01))

<a name="0.4.0"></a>
# [0.4.0](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.3.0...v0.4.0) (2019-06-17)


### Features

* support single string entry ([#43](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/43)) ([494e689](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/494e689))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.2.0...v0.3.0) (2019-05-23)


### Features

* close overlay on 'ok' event ([#39](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/39)) ([1471e29](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/1471e29))
* use webpack options sockPath, sockHost, and sockPort to get socket URL ([#42](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/42)) ([b763f76](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/b763f76))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.1.7...v0.2.0) (2019-03-21)


### Features

* made socket listener optional (required when using dev-middleware only) ([#34](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/34)) ([90caf91](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/90caf91))



<a name="0.1.7"></a>
## [0.1.7](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.1.6...v0.1.7) (2019-03-14)


### Bug Fixes

* format compiler errors ([#28](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/28)) ([#30](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/30)) ([6a83ce2](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/6a83ce2))



<a name="0.1.6"></a>
## [0.1.6](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.1.5...v0.1.6) (2019-01-11)


### Bug Fixes

* preserve both arguments of original before function ([#23](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/23)) ([433ccb3](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/433ccb3))



<a name="0.1.5"></a>
## [0.1.5](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.1.4...v0.1.5) (2018-05-25)


### Bug Fixes

* fix IE11 ([9e84e09](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/9e84e09)), closes [#13](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/13)



<a name="0.1.4"></a>
## [0.1.4](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.1.3...v0.1.4) (2018-03-14)


### Bug Fixes

* use ES5 syntax ([483d2c6](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/483d2c6))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.1.2...v0.1.3) (2018-03-11)


### Bug Fixes

* expose package without `.default` ([bcdcd15](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/bcdcd15)), closes [#3](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/3)
* handle Object-based entry settings (multi-entries) ([3d6489d](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/3d6489d)), closes [#4](https://github.com/smooth-code/error-overlay-webpack-plugin/issues/4)



<a name="0.1.2"></a>
## [0.1.2](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.1.1...v0.1.2) (2018-03-09)


### Bug Fixes

* fix shipped sources ([3b59642](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/3b59642))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/smooth-code/error-overlay-webpack-plugin/compare/v0.1.0...v0.1.1) (2018-03-09)


### Bug Fixes

* fix pkg.json ([7661bc5](https://github.com/smooth-code/error-overlay-webpack-plugin/commit/7661bc5))



<a name="0.1.0"></a>
# 0.1.0 (2018-03-09)


### Features

* first version ([b15e26e](https://github.com/smooth-code/webpack-error-overlay-plugin/commit/b15e26e))
