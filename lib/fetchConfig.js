'use strict';

const shell = require('shelljs');
const configReposity = 'https://github.com/z2014/lint.git';
const fetchConfig = () => {
    const shellStr = `rm -rf ./.lint && git clone -b master ${configReposity} .lint && cd .lint && rm -rf ./.git`;
    shell.exec(shellStr, { silent: true });
};

module.exports = fetchConfig;