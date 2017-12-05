'use strict';

const readConfig = require('./util.js');
const fs = require('fs');
const chalk = require('chalk');

function createIgnore() {
    const ignoreStr = 'node_modules';
    fs.writeFileSync(process.cwd() + '/' + '.gitignore', ignoreStr);
}

function createLint(rules) {
    for (let i = 0; i < rules.length; i++) {
        const ruleName = rules[i];
        let file;
        try {
            file = fs.readFileSync(process.cwd() + '/.lint/rules/' + ruleName, 'utf8');
        } catch (err) {
            console.log(chalk.red(`read ${ruleName} failed`));
        }
        try {
            fs.writeFileSync(process.cwd() + '/' + ruleName, file);
        } catch (err) {
            console.log(chalk.red(`write ${ruleName} failed`));
        }
    }
}

function createFile() {
    const config = readConfig();
    const rules = config.plan.default;
    createLint(rules);
    createIgnore();
}

module.exports = {
    createFile
};