const chalk = require('chalk');
const shell = require('shelljs');
const readConfig = require('./util.js');

function installDependence(packageName, config) {
    const version = config[packageName];
    console.log(chalk.green(`${packageName}@${version}`))
    try {
        shell.exec(`npm install ${packageName}@${version} --save-dev`, {silent: true})
    } catch (e) {
        console.log(chalk.red(`${packageName}安装失败`), e)
    }
}

async function install() {
    const config = readConfig();
    const hasDependence = JSON.parse(JSON.stringify(require(process.cwd() + '/package.json'))).devDependencies;
    const dependenceList = Object.keys(config.dependence.npm);
    for(let i = 0; i <= dependenceList.length - 1; i++) {
        if (!hasDependence || !hasDependence[dependenceList[i]]) {
            await installDependence(dependenceList[i], config.dependence.npm)
        }
    }
}


module.exports = {
    install: install
}