const fs = require('fs');
const chalk = require('chalk');
const shell = require('shelljs');
const template = require('./templateCode');

module.exports = async (dirName) => {
    const xjviewPath = `${process.cwd()}/src/components/XJView/${dirName}`;
    const xjviewIndex = `${process.cwd()}/src/components/XJView/index.js`;
    fs.access(xjviewPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        if (!err) {
            console.log(chalk.red('XJView目录下已存在'));
            return;
        }
        const metaPath = `${process.cwd()}/src/meta/${dirName}`;
        fs.access(metaPath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (!err) {
                console.log(chalk.red('meta目录下已存在'));
                return;
            }
            shell.exec(`mkdir ${xjviewPath}`, {silent: true});
            fs.writeFileSync(`${xjviewPath}/index.js`, template.createIndexCode(dirName), (err) => {
                if (err) {
                    console.log(chalk.red('创建xjview目录下index文件失败'))
                }
            })
            fs.writeFileSync(`${xjviewPath}/${dirName}.js`, template.createComponentsCode(dirName), (err) => {
                if (err) {
                    console.log(chalk.red(`创建xjview目录下${dirName}文件失败`))
                }
            })
            fs.writeFileSync(`${xjviewPath}/style.less`, template.createStyleCode(dirName), (err) => {
                if (err) {
                    console.log(chalk.red(`创建xjview目录下style文件失败`))
                }
            });
            console.log(chalk.green(`创建xjview目录文件成功...`))
            shell.exec(`mkdir ${metaPath}`, {silent: true});
            fs.writeFileSync(`${metaPath}/index.js`, template.createMetaIndexCode(dirName), (err) => {
                if (err) {
                    console.log(chalk.red('创建meta目录下index文件失败'))
                }
            })
            fs.writeFileSync(`${metaPath}/defaultData.js`, template.createDefaultDataCode(dirName), (err) => {
                if (err) {
                    console.log(chalk.red(`创建xjview目录下${dirName}文件失败`))
                }
            })
            fs.writeFileSync(`${metaPath}/meta.js`, template.createMetaCode(dirName), (err) => {
                if (err) {
                    console.log(chalk.red(`创建xjview目录下style文件失败`))
                }
            })
            console.log(chalk.green(`创建meta目录文件成功...`))
            let xjviewerText = fs.readFileSync(xjviewIndex, 'utf8');
            fs.writeFileSync(xjviewIndex, template.createXJviewerIndexCode(xjviewerText, dirName), (err) => {
                if (err) {
                    console.log(chalk.red(`写入文件失败`))
                }
            })
            console.log(chalk.yellow(`tips: 请在src/meta/index文件中注册配置\n在src/meta/const文件中注册组件XJType`))
        });
    });
}
