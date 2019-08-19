import * as webpack from 'webpack';
import config from '../webpack.config.common';
import * as merge from 'webpack-merge';
import { DefinePlugin } from 'webpack';
import { productionAppSettings } from './prod.appsettings.transform';
import { appSettings } from '../appsettings';
import { mergeAndTranslateSettings } from '../../src/common/configuration/helpers';
import { webpackConcatPlugin } from '../../src/common/configuration/webpack-concat-wrapper';

export default merge(config, {

    optimization: {
        // We no not want to minimize our code in dev
        minimize: true
    },
    plugins: [
        webpackConcatPlugin({
            // This is the react vendor bundle
            uglify: false,
            sourceMap: true,
            name: 'vendor',
            outputPath: '',
            fileName: '[name].[hash].js',
            filesToConcat: ['./node_modules/react/umd/react.production.js', './node_modules/react-dom/umd/react-dom.production.js']
        }),
        new DefinePlugin({
            appSettings: mergeAndTranslateSettings(appSettings, productionAppSettings)
        })
    ],

    mode: "production",
});