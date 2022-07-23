const homedir=require('os').homedir()
const home=process.env.HOME || homedir
const  fs  = require('fs')
const p=require('path')
const dbPath=p.join(home,'.todo')

const db={
    read(path = dbPath){
        return new Promise((resolve,reject)=>{
            fs.readFile(path,{flag:'a+'},(error,data)=>{
                if(error){
                    reject(error)
                    return
                }
                    let list
                    try{
                        list=JSON.parse(data.toString())
                    }catch(error2){
                        list=[]
                   }
                   resolve(list)               
            }) 
        })
        
    },
    write(list,path = dbPath){
        return new Promise ((resolve,reject)=>{
            const string=JSON.stringify(list)
            fs.writeFile(dbPath,string+'\n',(error)=>{
                if(error){reject(error) 
                    return}
                    resolve()             
            })
        })
       }
}
module.exports = db