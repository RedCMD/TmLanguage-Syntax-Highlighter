/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check
'use strict';

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

/** @type WebpackConfig */
const webExtensionConfig = {
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
	target: 'webworker', // extensions run in a webworker context
	entry: {
		extension: './src/extension.ts',
		test: './src/test/suite/index.ts'
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, './out/web'),
		libraryTarget: 'commonjs',
		devtoolModuleFilenameTemplate: '../../[resource-path]'
	},
	resolve: {
		mainFields: ['browser', 'module', 'main'], // look for `browser` entry point in imported node modules
		extensions: ['.ts', '.js'], // support ts-files and js-files
		alias: {
			// provides alternate implementation for node module and source files
			// process: "process/browser",
		},
		fallback: {
			// Webpack 5 no longer polyfills Node.js core modules automatically.
			// see https://webpack.js.org/configuration/resolve/#resolvefallback
			// for the list of Node.js core module polyfills.
			// 'assert': require.resolve('assert'),
			path: require.resolve('path-browserify'),
			stream: require.resolve('stream-browserify'),
			fs: false,
		}
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [{
				loader: 'ts-loader'
			}]
		}]
	},
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1 // disable chunks by default since web extensions must be a single bundle
		}),
		new webpack.ProvidePlugin({
			process: 'process/browser', // provide a shim for the global `process` variable
		}),
	],
	externals: {
		vscode: 'commonjs vscode', // ignored because it doesn't exist
	},
	performance: {
		hints: false
	},
	devtool: 'nosources-source-map', // create a source map that points to the original source file
	infrastructureLogging: {
		level: "log", // enables logging required for problem matchers
	},
	optimization: {
		// minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					// keep_fnames: true, // Prevents renaming of ALL functions
					// keep_classnames: true, // Optional: Prevents renaming of classes
					mangle: {
						// These won't be renamed
						reserved: [
							'StringLiteral', 'NullLiteral', 'InfinityLiteral', 'UndefinedLiteral', 'BooleanLiteral', 'PassthroughLiteral', 'Parens'
						],
						// TODO:
						// reserved: [
						// 	'extend', 'addDataToNode', 'CodeFragment', 'HoistTarget', 'Directive', 'Literal', 'PassthroughLiteral', 'ComputedPropertyName', 'FuncDirectiveReturn', 'YieldReturn', 'AwaitReturn', 'MetaProperty', 'JSXTag', 'JSXExpressionContainer', 'JSXEmptyExpression', 'JSXText', 'JSXAttribute', 'JSXAttributes', 'JSXNamespacedName', 'SuperCall', 'Super', 'Extends', 'Access', 'Index', 'Range', 'Slice', 'ObjectProperty', 'ExecutableClassBody', 'ClassProperty', 'ClassPrototypeProperty', 'ModuleDeclaration', 'ImportDeclaration', 'ImportClause', 'ExportDeclaration', 'ExportNamedDeclaration', 'ExportDefaultDeclaration', 'ExportAllDeclaration', 'ModuleSpecifierList', 'ImportSpecifierList', 'ExportSpecifierList', 'ModuleSpecifier', 'ImportSpecifier', 'ImportDefaultSpecifier', 'ImportNamespaceSpecifier', 'ExportSpecifier', 'DynamicImportCall', 'FuncGlyph', 'Param', 'Elision', 'In', 'TemplateElement', 'Interpolation', 'EmptyInterpolation', 'SwitchWhen', 'mergeLocationData', 'mergeAstLocationData', 'jisonLocationDataToAstLocationData'
						// ],
					},
				},
			}),
		],
	}
};

module.exports = [webExtensionConfig];