const esbuild = require('esbuild');
const extensibilityMap = require('@neos-project/neos-ui-extensibility/extensibilityMap.json');

const isWatch = process.argv.includes('--watch');

const options = {
    logLevel: 'info',
    bundle: true,
    minify: true,
    sourcemap: 'linked',
    legalComments: 'linked',
    target: 'es2020',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    tsconfigRaw: {
        compilerOptions: {
            jsx: 'react'
        }
    },
    entryPoints: {Plugin: './src/index.tsx'},
    outdir: './Resources/Public/JavaScript',
    alias: extensibilityMap
};

if (isWatch) {
    esbuild.context(options).then(context => context.watch());
} else {
    esbuild.build(options);
}
