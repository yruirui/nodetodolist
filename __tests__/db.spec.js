const db=require('../db.js')
const fs=require('fs')
jest.mock('fs')

describe('db',()=>{
    it('can read',()=>{
       expect(db.read instanceof Function)
    })
    it('can write',()=>{
        expect(fs.x()).toBe('xxx')
    })
})