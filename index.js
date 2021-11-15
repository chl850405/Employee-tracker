const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

//connection to mysql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employeetracker'
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
              "Delete departments", 
              "Delete roles", 
              "Delete employees",
              "View the total utilized budget of a department"
            ]
},
  ])
.then(answer => {
  const {option} = answer;

    if(option === "view all departments") {
      veiwDepartments();
    };

    if(option === "View all roles") {
      viewRoles()
    }
    
    if(option === "View all employees") {
      viewEmployees()
    }
    if(option === "Add a department") {
      addDepartment()
    }

    if(option === "Add a role") {
      addRole()
    }
    
    if(option === "Add an employee") {
      addEmployee()
    }
    
    if(option === "Update an employee role") {
      updateRole()
    }
    
    if(option === "Update employee managers") {
      updateManager()
    }
    
    if(option === "View employees by manager") {
      emoployeeManager()
    }
    
    if(option === "View employees by department") {
      employeeDepartment()
    }
    
    if(option === "Delete a department") {
      deleteDepartment()
    }
    
    if(option === "Delete a role") {
      deleteRole()
    }
    
    if(option === "Delete a employee") {
      deleteEmployee()
    }
    
    if(option === "View the total utilized budget of a department") {
      viewBudget()
    };
  });
};


function veiwDepartments() {

}
  viewRoles()

  viewEmployees()

  addDepartment() {
    con.promise().query("SELECT 1")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => con.end());
  }

  addRole() {
    con.promise().query("SELECT 1")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => con.end());
  }

  addEmployee() {
    con.promise().query("SELECT 1")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => con.end());
  }

  updateRole()

  updateManager()

  emoployeeManager()

  employeeDepartment()

  deleteDepartment()

  deleteRole()

  deleteEmployee()

  viewBudget()

promptUser()