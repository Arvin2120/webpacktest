#!/usr/bin/env node


const path = require("path");
// 入口
const entry = path.resolve(__dirname, '../src/index.js')
// 出口
const outPut = path.resolve(__dirname, '../dist/main.js')


const fs = require("fs");
const ejs = require("ejs");
// 读取 (根据读取的入口文件里面的方法执行，ejs模板渲染)
let script = fs.readFileSync(entry, 'utf-8');
let modules =[];
modules.push({name:entry,content:script})
const reg=/require\(['\"](.+?)['\"]\)/g;
script = script.replace(reg,(abc)=>{
    console.log(abc)
    const tempPath = path.resolve(__dirname, '../src')
    const r = /["|'](.*)["|']/;
    let name =path.join(tempPath,abc.match(r)[1])
    let content = fs.readFileSync(name,'utf-8');
    modules.push({name,content})
    console.log(name)
    return `require('${name}')`
})
// 使用ejs模板渲染 没有引入文件
let template1 = `(() => {
    var __webpack_modules__ = ({
      "<%-entry%>": (() => {
        eval(\`<%-script%>\`);
      })
    }); 
    var __webpack_exports__ = {};
     __webpack_modules__["<%-entry%>"]();
  })();`
// 使用ejs模板渲染 引入了文件
let template2 = `(() => {
    var __webpack_modules__ = ({
        
        <%for(let i=0 ;i<modules.length;i++){let item = modules[i];%>
            "<%-item.name%>":((module) => {
                eval(\`<%-item.content%>\`);
            }),
            <%}%>
        }%>);
    var __webpack_module_cache__ = {};
    function require(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        if(typeof(__webpack_modules__[moduleId])=='function'){
        __webpack_modules__[moduleId](module, module.exports, require);
        }
        return module.exports;
    }
    var __webpack_exports__ = require("<%-entry%>");
})();`
let res = ejs.render(template2, {
    entry: entry, script,modules
})
fs.writeFileSync(outPut, res);
console.log('成功')
