function readConfig() {
    const path = `${process.cwd()}/.lint/config.js`;
    const config = require(path);
    return config
}

module.exports = readConfig