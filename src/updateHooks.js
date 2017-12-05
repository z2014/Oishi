const shell = require('shelljs');
const readConfig = require('./util.js')


function update() {
    const initHooksConfig = readConfig().initHooks;
    shell.exec(`sh ./.lint/${initHooksConfig}`);
}

module.exports = {
    update
}