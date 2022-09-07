const db = require('./db')
const inquirer = require('inquirer')

module.exports.add= async (title)=>{
    //读取之前的任务
    const list= await db.read()
    //往里面添加一个任务
    list.push({title,done:false})
    //写进去
    db.write(list)
}
module.exports.clear = async ()=>{
    await db.write([])
}
function remove(list,index){
  db.write(list.splice(index,1))
  
}
function markAsDone(list,index){
  list[index].done = true
            db.write(list)
}
function markAsUnDone(list,index){
  list[index].done = false
  db.write(list)
}
function updateTitle(list,index){
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: "新标题",
    default:list[index].title
  }).then(answer3=>{
    list[index].title=answer3.title
    db.write(list)
  })
}
function askForAction(list,index){
  const actions={remove,markAsDone,markAsUnDone,updateTitle}
    inquirer.prompt({

        type:'list',name:'action',
        message:'请选择操作',
        choices:[
            {name:'退出',value:'quite'},
            {name:'删除',value:'remove'},
            {name:'已完成',value:'markAsDone'},
            {name:'未完成',value:'markAsUnDone'},
            {name:'改标题',value:'updateTitle'}
        ]
    }).then(answer2=>{
        const action=actions[answer2.action]
        action && action(list,index)
    })
}
function askForCreateTask(list){
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: "新标题",
  }).then(answer3=>{
    list.push({
      title:answer3.title,
      done:false
    })
    db.write(list)
  })
}
function printTask(list){
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'index',
      message: '请选择你要操作的任务',
      //这里的value只能是字符串，不能是数字，
      choices: [{name:'+创建任务',value:'-2'},{name:'退出',value:'-1'},...list.map((task,index)=>{
        return { name:`${task.done?'[x]':'[_]'}${index+1}-${task.title}`,value:index}
      })]
    } 
  ])
  .then((answers) => {
    const index=parseInt(answers.index)
    if(index>=0){
        //选中了一个任务
         askForAction(list,index)
    }else if(index == -2){
        //创建任务
        askForCreateTask(list)
    }
  })
}
module.exports.showAll = async ()=>{
    //读取之前的任务
    const list = await db.read()
    //打印之前的任务
   // printTask
   printTask(list)   
       
}
