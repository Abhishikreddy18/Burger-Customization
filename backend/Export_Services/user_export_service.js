const exporttoexcel=require('./export_service')

const path=require('path')
const exportUserstoExcel=(users)=>{
    const worksheetcolumnNames=['Id','Name','Email','Role']
    const worksheetName='Users'
    const filepath=path.join(__dirname, '../../frontend/public/datafiles/usersfromregister.xlsx')
    const data=users.map((user)=>{
      let role;
      if (user.isAdmin) {
        role = 'Admin';
      } else if (user.isEmployee) {
        role = 'Employee';
      } else {
        role = 'User';
      }
  
      return[user._id.toString(),user.name,user.email,role]
    })
    
    exporttoexcel(data,worksheetcolumnNames,worksheetName,filepath)

}
module.exports = exportUserstoExcel