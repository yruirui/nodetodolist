const { option } = require("commander");

const fs = jest.createMockFromModule('fs');
const _fs=jest.requireActual('fs')

Object.assign(fs,_fs)

let mocks={}

fs.setMock=(path,error,data)=>{
    mocks[path]=[error,data]
}
//这里对readfile做了一个拦截，当路径是在mocks里就走mock出的数据
//不然就走原fs的方法，原fs是被拷贝在_fs里的
//这里如果用户没有传callback时需要指定一下callback
fs.readFile = (path,options,callback)=>{
    if(callback===undefined){callback=options}
    if(path in mocks){
        callback(mocks[path][0],mocks[path][1])
    }else{
        _fs.readFile(path,options,callback)
    }
}

//写的操作

let writeMock={}
fs.setWriteFileMock=(path,fn)=>{
    writeMock[path]=fn
}
fs.writeFile=(path,data,options,callback)=>{
    if(callback === undefined){ callback = options}
    if(path in writeMock){
        writerMocks[path](path,data,options,callback)
    }else{
        _fs.writeFile(path,data,options,callback)
    }
}

module.exports = fs;