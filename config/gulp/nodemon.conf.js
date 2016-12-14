module.exports = {
  script: 'bin/start',
  ext: 'html js',
  ignore: [
    '**/*.config.json',
    '.git',
    'node_modules/**',
    'dist/**',
    'public/**'
  ],
  restartable: 'rs'
};
