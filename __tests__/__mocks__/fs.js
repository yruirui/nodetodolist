const { option } = require("commander");

const fs = jest.createMockFromModule('fs');
const _fs=jest.requireActual('fs')

Object.assign(fs,_fs)

const mocks={}

fs.setMock=(path,error,data)=>{
    mocks[path]=[error,data]
}

fs.readFile = (path,options,callback)=>{
    if(callback===undefined){callback=options}
    if(path in mocks){
        callback(mocks[path][0],mocks[path][1])
    }else{
        _fs.readFile(path,options,callback)
    }
}

module.exports = fs;