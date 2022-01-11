const mysql= require('mysql2')
const inquirer = require('inquirer');
require('console.table');

//connection to mysql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'P1nkh41r',
  database: 'employee_tracker_db',
});

connection.connect(err => {
  if (err) throw err;

});



const promptUser = () => {
  console.log("***********************************")
  console.log("*                                 *")
  console.log("*        EMPLOYEE MANAGER         *")
  console.log("*                                 *")
  console.log("***********************************")

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
              "View employees by manager",
              "View employees by department", 
              "Delete a department", 
              "Delete a role", 
              "Delete an employee",
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
    
    if(option === "View employees by manager") {
      employeeByManager()
    }
    
    if(option === "View employees by department") {
      employeeByDepartment()
    }
    
    if(option === "Delete a department") {
      deleteDepartment()
    }
    
    if(option === "Delete a role") {
      deleteRole()
    }

    if(option === "Delete an employee") {
      deleteEmployee()
    }
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

  viewEmployees = () => {
   //get all Employees
const sql = `SELECT * FROM employee`;
connection.query(sql, (err, res) => { 
  if (err) throw err;
    
      console.table(res);
      promptUser();
  })
}

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
          veiwDepartments();
      })
    });
  }

  // function to add a role 
addRole = () => {
  inquirer.prompt([
    {
      type: 'input', 
      name: 'role',
      message: "What role do you want to add?"
    },
    {
      type: 'input', 
      name: 'salary',
      message: "What is the salary of this role?"
    }
  ])
    .then(answer => {
      const params = [answer.role, answer.salary];

      // grab dept from department table
      const roleSql = `SELECT name, id FROM department`; 

      connection.query(roleSql, (err, data) => {
        if (err) throw err; 
    
        const dept = data.map(({ name, id }) => ({ name: name, value: id }));

        inquirer.prompt([
        {
          type: 'list', 
          name: 'dept',
          message: "What department is this role in?",
          choices: dept
        }
        ])
          .then(deptChoice => {
            const dept = deptChoice.dept;
            params.push(dept);

            const sql = `INSERT INTO role (title, salary, department_id)
                        VALUES (?, ?, ?)`;

            connection.query(sql, params, (err, result) => {
              if (err) throw err;
              console.log('Added' + answer.role + " to roles!"); 

                viewRoles();
        });
      });
    });
  });
};


  // function to add an employee 
addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "What is the employee's first name?"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?"
    }
  ])
  .then(answer => {
    const firstName = answer.firstName
    const lastName= answer.lastName 
  const sql = ` INSERT INTO employee (first_name, last_name)
  VALUES ('${firstName}', '${lastName}');`;
    connection.query(sql, (err, res) => { 
      if (err) throw err;
  
          console.table(res);
    viewEmployees()
      })
    })
  }
  
employeeByManager = () =>{
  const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, employee.first_name, employee.last_name
  FROM employee
  LEFT JOIN employee manager on manager.id = employee.manager_id
  INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
  INNER JOIN department ON (department.id = role.department_id)
  ORDER BY manager;`;
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.log('\n');
      console.log('VIEW EMPLOYEE BY MANAGER');
      console.log('\n');
      console.table(res);
      promptUser();
  });
}

  employeeByDepartment = () => {
   const query = `SELECT department.name AS department, role.title, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY DEPARTMENT');
        console.log('\n');
        console.table(res);
      promptUser();
    });
}

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
              veiwDepartments();
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
              viewRoles();
        })
      });
  });
}

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
          message:'Which employee id would you like to delete?',
          choices: employeeChoices
        }])
      .then(answer => {
        const {option} = answer
        const sql = `DELETE FROM employee WHERE id = ${option}`; 
        connection.query(sql, (err, res) => { 
          if (err) throw err
          
              console.table(res);
              viewEmployees();
        })
      });
    });
  }

  async function updateRole() {
    const employeeId = await inquirer.prompt(askId());

    connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
        if (err) throw err;
        const { role } = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: () => res.map(res => res.title),
                message: 'What is the new employee role?: '
            }
        ]);
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        connection.query(`UPDATE employee 
        SET role_id = ${roleId}
        WHERE employee.id = ${employeeId.name}`, async (err, res) => {
            if (err) throw err;
            console.log('Role has been updated..')
            prompt();
        });
    });
}
promptUser()

