const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

const projectRoot = join(__dirname, '..', '..');
const blogModelSrc = join(projectRoot, 'libs', 'models', 'blog-model', 'src');

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
    clean: true,
    ...(process.env.NODE_ENV !== 'production' && {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    }),
  },
  // Resolve @project/blog-model to source so webpack can bundle it (and Prisma client)
  resolve: {
    alias: {
      '@project/blog-model': join(blogModelSrc, 'index.ts'),
    },
    extensionAlias: {
      '.js': ['.ts', '.js'],
    },
  },
  // Don't externalize blog-model so it gets bundled
  externals: [
    ({ request }, callback) => {
      if (typeof request !== 'string') return callback();
      const isBlogModel =
        request === '@project/blog-model' ||
        request.startsWith('@project/blog-model') ||
        (request && (request.includes('blog-model') || request.includes('generated/prisma')));
      if (isBlogModel) return callback(); // bundle
      if (!request.startsWith('.') && !request.startsWith('/')) {
        return callback(undefined, 'commonjs ' + request);
      }
      callback();
    },
  ],
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ["./src/assets"],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: false,
      sourceMap: true,
    })
  ],
};
