#! /usr/bin/env node 
const chalk = require('chalk');
const program = require('commander');
const VERSION = require('../package.json').version;
const fetchConfig = require('./fetchConfig.js');
const dependence = require('./dependence.js');
const updateHooks = require('./updateHooks.js');
const ruleFile = require('./ruleFile.js');

program
    .version(VERSION)
    .command('init')
    .option('-p, --plan [value]')
    .description('使用Oishi初始化项目')
    .action(async (options) => {
        console.log(chalk.green('正在拉取lint config 配置 ...'));
        await fetchConfig();
        console.log(chalk.green('正在安装本地依赖...'))
        await dependence.install();
        console.log(chalk.green('正在挂载git hooks'))
        updateHooks.update();
        ruleFile.createFile();
    })

// 调用eslint校验js
program
    .command('lintjs [eslintParams...]')
    .description('使用Oishi检测js代码')
    .option('--exitcode', '使用exitcode')
    .allowUnknownOption()
    .action(function(eslintParams, options) {
        let eslintPath = `${process.cwd()}/node_modules/eslint/lib/cli.js`;
        let eslintCli;
        try {
            eslintCli = require(eslintPath);
        } catch (e) {
            console.log('你尚未安装eslint');
            process.exitCode = 0;
            return;
        }
        let params = process.argv.slice(0);
        params.splice(2, 1);
        if (options.exitcode) {
            // 处理params
            params.splice(params.indexOf('--exitcode'), 1);
        }
        var exitCode = eslintCli.execute(params);
        if (options.exitcode) {
            process.exitCode = exitCode;
        }
    });

// 调用eslint校验css
program
    .command('lintcss [stylelintParams...]')
    .description('使用Oishi检测css代码')
    .option('--exitcode', '使用exitcode')
    .allowUnknownOption()
    .action((stylelintParams, options) => {
        let stylelintPath = `${process.cwd()}/node_modules/stylelint/bin/stylelint.js`;
        let params = process.argv.slice(0);
        params.splice(0, 3);
        if (options.exitcode) {
            // 处理params
            params.splice(params.indexOf('--exitcode'), 1);
        }
        let child = sh.exec(`${stylelintPath} ${params.join(' ')}`, {async: true});
        child.on('exit', (code) => {
            if (options.exitcode) {
                process.exitCode = code;
            }
        });
    });

program.parse(process.argv)