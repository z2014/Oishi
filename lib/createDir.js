'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');
const template = require('./templateCode');

module.exports = (() => {
    var _ref = _asyncToGenerator(function* (dirName) {
        const xjviewPath = `${process.cwd()}/src/components/XJView/${dirName}`;
        const xjviewIndex = `${process.cwd()}/src/components/XJView/index.js`;
        fs.access(xjviewPath, fs.constants.R_OK | fs.constants.W_OK, function (err) {
            if (!err) {
                console.log(chalk.red('XJView目录下已存在'));
                return;
            }
            const metaPath = `${process.cwd()}/src/meta/${dirName}`;
            fs.access(metaPath, fs.constants.R_OK | fs.constants.W_OK, function (err) {
                if (!err) {
                    console.log(chalk.red('meta目录下已存在'));
                    return;
                }
                shell.exec(`mkdir ${xjviewPath}`, { silent: true });
                fs.writeFileSync(`${xjviewPath}/index.js`, template.createIndexCode(dirName), function (err) {
                    if (err) {
                        console.log(chalk.red('创建xjview目录下index文件失败'));
                    }
                });
                fs.writeFileSync(`${xjviewPath}/${dirName}.js`, template.createComponentsCode(dirName), function (err) {
                    if (err) {
                        console.log(chalk.red(`创建xjview目录下${dirName}文件失败`));
                    }
                });
                fs.writeFileSync(`${xjviewPath}/style.less`, template.createStyleCode(dirName), function (err) {
                    if (err) {
                        console.log(chalk.red(`创建xjview目录下style文件失败`));
                    }
                });
                console.log(chalk.green(`创建xjview目录文件成功...`));
                shell.exec(`mkdir ${metaPath}`, { silent: true });
                fs.writeFileSync(`${metaPath}/index.js`, template.createMetaIndexCode(dirName), function (err) {
                    if (err) {
                        console.log(chalk.red('创建meta目录下index文件失败'));
                    }
                });
                fs.writeFileSync(`${metaPath}/defaultData.js`, template.createDefaultDataCode(dirName), function (err) {
                    if (err) {
                        console.log(chalk.red(`创建xjview目录下${dirName}文件失败`));
                    }
                });
                fs.writeFileSync(`${metaPath}/meta.js`, template.createMetaCode(dirName), function (err) {
                    if (err) {
                        console.log(chalk.red(`创建xjview目录下style文件失败`));
                    }
                });
                console.log(chalk.green(`创建meta目录文件成功...`));
                let xjviewerText = fs.readFileSync(xjviewIndex, 'utf8');
                fs.writeFileSync(xjviewIndex, template.createXJviewerIndexCode(xjviewerText, dirName), function (err) {
                    if (err) {
                        console.log(chalk.red(`写入文件失败`));
                    }
                });
                console.log(chalk.yellow(`tips: 请在src/meta/index文件中注册配置\n在src/meta/const文件中注册组件XJType`));
            });
        });
    });

    return function (_x) {
        return _ref.apply(this, arguments);
    };
})();