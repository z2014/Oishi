const createIndexCode = (dirname) => {
    return `export { default } from './${dirname}';
`
}
const createStyleCode = (dirname) => {
    let dupDirname = dirname.split('');
    dupDirname.splice(2, 0, '-');
    return `.${dupDirname.join('')}{}`
}
const createComponentsCode = (dirname) => {
    let dupDirname = dirname.split('');
    dupDirname.splice(2, 0, '-');
    return `
import React from 'react';
import { CTYPE } from '@/meta/const';
import './style.less';

export default class ${dirname} extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="${dupDirname.join('')}">
            </div>
        );
    }
}
    
    `
}
const createMetaIndexCode = (dirname) => {
    return `export { default as ${dirname}Meta } from './meta';
export { default as ${dirname}DefaultData } from './defaultData';
    `
}
const createDefaultDataCode = (dirname) => {
    return `export default {

}`
}
const createMetaCode = (dirname) => {
    return `export default []`
}
const createXJviewerIndexCode = (code, dirname) => {
    const tmp = `import _${dirname} from './${dirname}';
export const ${dirname} = _${dirname};\n\n`;
    const dir = `    ${dirname},\n`;
    const site1 = code.indexOf('export const Viewers');
    return code.slice(0, site1 - 1) + tmp + code.slice(site1, site1 + 25) + dir + code.slice(site1 + 25, code.length)
}

module.exports = {
    createComponentsCode,
    createStyleCode,
    createIndexCode,
    createMetaIndexCode,
    createDefaultDataCode,
    createMetaCode,
    createXJviewerIndexCode
}
