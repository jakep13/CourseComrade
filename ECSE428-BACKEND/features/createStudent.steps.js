const { defineFeature, loadFeature } = require("jest-cucumber")
const supertest = require("supertest");
const app = require("../app");
const { User } = require('./../models/user')
const { Course } = require('./../models/course')

const req = supertest(app)

const feature = loadFeature(
  "./features/Create-Student-Account.feature"
);


// When the student <username> wants to create an account with CourseComrade with the password <password> which matches the verification password <verif_password> and consists of at least six characters of which at least one is a digit/letter.


// const whenStudentCreateAccount = (when) => {
//   when("When the student <username> wants to create an account with CourseComrade with the password <password> which matches the verification password <verif_password> and consists of at least six characters of which at least one is a digit and letter.", async () => {
//     await request.post("/createAccount").send({
//       username: "wowman",
//       password: "pass1weod"
//     });
//   })
// };

// // const thenStudentExists = (then) => { //check that the given student exists
// //   then("The student exists", async () => {
// //     await 
// //   })
// // }


defineFeature(feature, (test) => {

  test('Create Student Account (Normal Flow)', ({ when, then }) => {
    when(/^the student (.*) wants to create an account with CourseComrade with the password (.*) which matches the verification password (.*) and consists of at least six characters of which at least one is a digit and letter.$/, async (username, password, verif_password) => {
      const user = await req.post("/createAccount").send({ username, password });
    });

    then(/^a new student account will be created with the username (.*)$/, async (arg0) => {
        var usr = await User.findOne({username: arg0 });
        expect(usr).not.toBe(null)
      

    });

    then(/^a new user with username (.*) will be populated into the system with the given password (.*)$/, async (arg0, arg1) => {
        var usr = await User.findOne({username: arg0 , password: arg1});
        expect(usr).not.toBe(null)

    });
  });

  test('Attempt to Create a student account with invalid Password format (Error Flow)', ({ when, then }) => {
    when(/^the student (.*) wants to create an account with the password (.*) and a matching verification password (.*)$/, (arg0, arg1, arg2) => {

    });

    then(/^a resulting "(.*)" message is issued$/, (arg0) => {

    });
  });

  test('Attempt to Create a student account with password which doesn\'t match the verification password (Error Flow)', ({ when, then }) => {
    when(/^the student (.*) wants to create an account with the password (.*) and a non-matching verification password (.*)$/, (arg0, arg1, arg2) => {

    });

    then(/^a resulting "(.*)" message is issued$/, (arg0) => {

    });
  });

  test('Attempt to create a student account with a username which is already associated with an existing account (Error Flow)', ({ given, when, then }) => {
    given(/^student with username (.*) and password (.*) exists$/, (arg0, arg1) => {

    });

    when(/^a student with username (.*) tries to register an account with a password (.*)$/, (arg0, arg1) => {

    });

    then(/^a resulting "(.*)" message is issued$/, (arg0) => {

    });
  });
});
