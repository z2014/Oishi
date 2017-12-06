const readConfig = require('./util.js');
const fs = require('fs');
const chalk = require('chalk');
let readline = require('readline');

function hasFile(pathStr) {
    if (pathStr) {
        let s;
        try {
            s = fs.statSync(pathStr);
        } catch (e) {
            return false;
        }
        return s;
    } else {
        return false;
    }
}

function checkExist(filePath) {
    return new Promise((res) => {
        let fileStat = hasFile(filePath);
        if (fileStat && fileStat.isFile()) {
            let rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(`${filePath}文件已存在，是否要覆盖(Y/n)?`, (ans) => {
                rl.close();
                if (ans !== 'n') {
                    res(false);
                } else {
                    res(true);
                }
            });
        } else {
            res(false);
        }
    });
}

async function createIgnore() {
    let exist = await checkExist(process.cwd() + '/' + '.gitignore')
    if (!exist) {
        const ignoreStr = 'node_modules'
        fs.writeFileSync(process.cwd() + '/' + '.gitignore', ignoreStr)
    }
}

async function createLint(rules) {
    for(let i = 0; i < rules.length; i ++) {
        const ruleName = rules[i];
        let exist = await checkExist(process.cwd() + '/' + ruleName);
        if (!exist) {
            let file;
            try {
                file = fs.readFileSync(process.cwd() + '/.lint/rules/' + ruleName, 'utf8')
            } catch (err) {
                console.log(chalk.red(`read ${ruleName} failed`))
            }
            try {
                fs.writeFileSync(process.cwd() + '/' + ruleName, file)
            } catch (err) {
                console.log(chalk.red(`write ${ruleName} failed`))
            }
        }
    }
    createIgnore();
}

function createFile() {
    const config = readConfig();
    const rules = config.plan.default;
    createLint(rules);
    
}


module.exports = {
    createFile
}