const db=require('../db.js')
const fs=require('fs')
jest.mock('fs')

describe('db',()=>{
    it('can read',async ()=>{
       const data =[{title:'hi',done:true}]
       fs.setMock('./xxx','null',JSON.stringify(data))
       const list = await db.read('./xxx')
       expect(list).toStrickEqual(data)
    })
    it('can write',async ()=>{
        let fakeFile
        fs.setWriteFileMock('./yyy',(path,data,callback)=>{
            fakeFile=data
            callback(null)
        })
        const list2 = [{title:'a apple',done:true}]
        await db.write(list2,'./yyy')
        expect(fakeFile).toBe(JSON.stringify(list2)+'\n')
    })
})