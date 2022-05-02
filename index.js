//Include inquirer needed for this application
const inquirer = require('inquirer');

//Create an array of questions for user input
const questions = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project? (Required)',
      validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log('Please enter your project title!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a short description explaining the what, why, and how of your project. (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter your project description.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Provide a step-by-step descriptions of of how to install your project. (Required)',
      validate: installationInput => {
        if (installationInput) {
          return true;
        } else {
          console.log('Please enter your installation instructions.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide instructions and examples for use. (Required)',
      validate: usageInput => {
        if (usageInput) {
          return true;
        } else {
          console.log('Please enter your usage instructions.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'contribution',
      message: 'Provide a description of what kinds of contributions you are seeking and your guidelines. (Required)',
      validate: contributionInput => {
        if (contributionInput) {
          return true;
        } else {
          console.log('Please enter contribution guidelines.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Provide instructions on how to run all tests on your project. (Required)',
      validate: testInput => {
        if (testInput) {
          return true;
        } else {
          console.log('Please enter your test instructions.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'username',
      message: 'Provide your GitHub username. (Required)',
      validate: usernameInput => {
        if (usernameInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'email',
      message: 'Provide your email address. (Required)',
      validate: emailInput => {
        if (emailInput) {
          return true;
        } else {
          console.log('Please enter your email address.');
          return false;
        }
      }
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for this project. (Required)',
      choices: ['MIT', 'Apache 2.0', 'BSD 3-Clause', 'GNU GPLv3', 'ISC', 'The Unlicense'],
      validate: licenseInput => {
        if (licenseInput) {
          return true;
        } else {
          console.log('You did not select a license for this project. The "License" section of your README.md file will be blank.');
          return false;
        }
      }
    },
  ])
};

questions ();