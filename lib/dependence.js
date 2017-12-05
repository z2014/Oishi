'use strict';

let install = (() => {
    var _ref = _asyncToGenerator(function* () {
        const config = readConfig();
        const hasDependence = JSON.parse(JSON.stringify(require(process.cwd() + '/package.json'))).devDependencies;
        const dependenceList = Object.keys(config.dependence.npm);
        for (let i = 0; i <= dependenceList.length - 1; i++) {
            if (!hasDependence[dependenceList[i]]) {
                yield installDependence(dependenceList[i], config.dependence.npm);
            }
        }
    });

    return function install() {
        return _ref.apply(this, arguments);
    };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const chalk = require('chalk');
const shell = require('shelljs');
const readConfig = require('./util.js');

function installDependence(packageName, config) {
    const version = config[packageName];
    console.log(chalk.green(`${packageName}@${version}`));
    try {
        shell.exec(`npm install ${packageName}@${version} --save-dev`, { silent: true });
    } catch (e) {
        console.log(chalk.red(`${packageName}安装失败`), e);
    }
}

module.exports = {
    install: install
};