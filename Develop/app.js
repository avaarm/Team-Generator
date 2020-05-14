const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee
const employeeEmpty = [];


const employeeList = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager", "No more employees to add"],
      },
    ])
    // using switch case to return the followup questions that correspond with the above choices
    .then(function (data) {
      switch (data.role) {
        case "Manager":
          return managerEntry();
        case "Engineer":
          return engineerEntry();
        case "Intern":
          return internEntry();
        case "No more employees to add":
          console.log("Success! Check your output folder for the rendered HTML file with you team");
          return outputHTML();
      }
    });
};

employeeList();

function outputHTML() {
  fs.writeFile(outputPath, render(employeeEmpty), function (err) {
    if (err) {
      throw err;
    }
  });
}

function engineerEntry() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: `What is your engineer's name?`,
      },
      {
        type: "input",
        name: "id",
        message: `What is your engineer's id?`,
      },
      {
        type: "input",
        name: "email",
        message: "What is your engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is your engineer's github username?",
      },
    ])
    .then(function (data) {
      const engineer = new Engineer(data.name, data.id, data.email,data.github);
      employeeEmpty.push(engineer);
      employeeList();
    })
    .catch(function (err) {
      console.log(err);
    });
}


function managerEntry() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your manager's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your manager's email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
      },
    ])
    .then(function (data) {
      const manager = new Manager(data.name, data.id, data.email,data.officeNumber);
      employeeEmpty.push(manager);
      employeeList();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function internEntry() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: `What is your intern's name?`,
      },
      {
        type: "input",
        name: "id",
        message: `What is your intern's id`,
      },
      {
        type: "input",
        name: "email",
        message: "What is your intern's email?",
      },
      {
        type: "input",
        name: "school",
        message: "Where did the intern go to school?",
      },
    ])
    .then(function (data) {
      const intern = new Intern(data.name, data.id, data.email, data.school);
      employeeEmpty.push(intern);
      employeeList();
    })
    .catch(function (err) {
      console.log(err);
    });
}
  

