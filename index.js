const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

//connection to mysql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'P1nkh41r',
  database: 'employeetracker'
});

connection.connect(err => {
  if (err) throw err;

});

const promptUser = () => {
  return inquirer.prompt([
      {
      type:'list',
      name:'option',
      message:'What would you like to do?',
      choices:[
              "View all departments", 
              "View all roles", 
              "View all employees", 
              "Add a department", 
              "Add a role", 
              "Add an employee", 
              "Update an employee role",
              "Update employee managers",
              "View employees by manager",
              "View employees by department", 
              "Delete a department", 
              "Delete a role", 
              "Delete a employee",
              "View the total utilized budget of a department"
            ]
},
  ])
.then(answer => {
  const {option} = answer;

    if(option === "View all departments") {
      veiwDepartments();
    };

    if(option === "View all roles") {
      viewRoles()
    }
    
    // if(option === "View all employees") {
    //   viewEmployees()
    // }

    if(option === "Add a department") {
      addDepartment()
    }

    // if(option === "Add a role") {
    //   addRole()
    // }
    
    // if(option === "Add an employee") {
    //   addEmployee()
    // }
    
  //   if(option === "Update an employee role") {
  //     updateRole()
  //   }
    
  //   if(option === "Update employee managers") {
  //     updateManager()
  //   }
    
  //   if(option === "View employees by manager") {
  //     emoployeeManager()
  //   }
    
  //   if(option === "View employees by department") {
  //     employeeDepartment()
  //   }
    
    if(option === "Delete a department") {
      deleteDepartment()
    }
    
    if(option === "Delete a role") {
      deleteRole()
    }
  //   if(option === "View the total utilized budget of a department") {
  //     viewBudget()
  //   };
  });
};


veiwDepartments = () => {
  //get all departments
  const sql = `SELECT * FROM department`;
  connection.query(sql, (err, res) => { 
    if (err) throw err;
      
        console.table(res);
        promptUser();
    })
}
viewRoles = () => {
    //get all role
const sql = `SELECT * FROM role`;
connection.query(sql, (err, res) => { 
  if (err) throw err;
    
      console.table(res);
      promptUser();
  })
}

//   viewEmployees = () => {
//    //get all Employees
// const sql = `SELECT * FROM employee`;
// connection.query(sql, (err, res) => { 
//   if (err) throw err;
    
//       console.table(res);
//       promptUser();
//   })
// }

  addDepartment = () => {
    inquirer.prompt([
      {
        type:'input',
        name:'department',
        message:'What department would you like to add?',  
      }
    ])
    .then(answer => {
    const {department} = answer
    const sql = ` INSERT INTO department (name)
    VALUES ('${department}');`;
    connection.query(sql, (err, res) => { 
      if (err) throw err;
        
          console.table(res);
          promptUser();
      })
    });
  }

  // addRole = () => {
  //   inquirer.prompt([
  //     {
  //       type:'input',
  //       name:'role',
  //       message:'What role would you like to add?',  
  //     }
  //   ])
  //   .then(answer => {
  //   const {role} = answer
  //   const sql = ` INSERT INTO role (name)
  //   VALUES ('${role}');`;
  //   connection.query(sql, (err, res) => { 
  //     if (err) throw err;
        
  //         console.table(res);
  //         promptUser();
  //     })
  //   });
  // }

  // addEmployee = () => {
  // inquirer.prompt([
  //   {
  //     type:'input',
  //     name:'employee',
  //     message:'What employee would you like to add?',  
  //   }
  // ])
  // .then(answer => {
  // const {employee} = answer
  // const sql = ` INSERT INTO employee (name)
  // VALUES ('${employee}');`;
  // connection.query(sql, (err, res) => { 
  //   if (err) throw err;
      
  //       console.table(res);
  //       promptUser();
  //   })
  // });
  // }

//   updateManager = () => {
//     connection.promise().query("SELECT 1")
//     .then( ([rows,fields]) => {
//       console.log(rows);
//     })
//     .catch(console.log)
//     .then( () => con.end());
//   }

//   employeeByManager = () =>{
//     const sql = `SELECT * FROM WHERE id = ?`;
//     const params = [req.params.id];
//     db.query(sql, params, (err, row) => {
//         if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//         }
//         res.json({
//         message: 'success',
//         data: row
//         });
//     });
//   }

//   employeeByDepartment = () => {
//     router.get('/api/party/:id', (req, res) => {
//       const sql = `SELECT * FROM parties WHERE id = ?`;
//       const params = [req.params.id];
//       db.query(sql, params, (err, row) => {
//           if (err) {
//           res.status(400).json({ error: err.message });
//           return;
//           }
//           res.json({
//           message: 'success',
//           data: row
//           });
//       });
//     });
//   }

  deleteDepartment = () => {
  const sql = `SELECT * FROM department`;
  connection.query(sql, (err, res) => { 
    if (err) throw err;
      const departmentChoices = [];
      res.forEach(department => {
        departmentChoices.push({
          name: department.name,
          value: department.id
        })
      })
      inquirer.prompt([{
        type:'list',
        name:'option',
        message:'What department would you like to delete?',
        choices: departmentChoices
      }])
      .then(answer => {
        const {option} = answer
        const sql = `DELETE FROM department WHERE id = ${option}`; 
        connection.query(sql, (err, res) => { 
          if (err) throw err;
            
              console.table(res);
              promptUser();
        })
      });
    })
  };

  deleteRole = () => {
     const sql = `SELECT * FROM role`;
  connection.query(sql, (err, res) => { 
    if (err) throw err;
      const roleChoices = [];
      res.forEach(role => {
        roleChoices.push({
          name: role.name,
          value: role.id
        })
      })
      inquirer.prompt([{
        type:'list',
        name:'option',
        message:'What role would you like to delete?',
        choices: roleChoices
      }])
      .then(answer => {
        const {option} = answer
        const sql = `DELETE FROM role WHERE id = ${option}`; 
        connection.query(sql, (err, res) => { 
          if (err) throw err;
            
              console.table(res);
              promptUser();
        })
      });
  });
  

  deleteEmployee = () => {
    const sql = `SELECT * FROM employee`;
    connection.query(sql, (err, res) => { 
      if (err) throw err;
        const employeeChoices = [];
        res.forEach(employee => {
          employeeChoices.push({
            name: employee.name,
            value: employee.id
          })
        })
        inquirer.prompt([{
          type:'list',
          name:'option',
          message:'Which employee would you like to delete?',
          choices: employeeChoices
        }])
      .then(answer => {
        const {option} = answer
        const sql = `DELETE FROM employee WHERE id = ${option}`; 
        connection.query(sql, (err, res) => { 
          if (err) throw err

              console.table(res);
              promptUser();
        })
      });
    });
  }
}
//   viewBudget = () => {
//     console.log(viewBudget);
//   }

promptUser()