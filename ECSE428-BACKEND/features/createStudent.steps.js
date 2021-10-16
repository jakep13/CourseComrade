const request = require('./setup/request');
const { defineFeature, loadFeature } = require("jest-cucumber")


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
      const user = await request.post("/createAccount").send({ username, password });
    });


    then(/^a new user with username (.*) will be populated into the system with the given password (.*)$/, async (arg0, arg1) => {
      const usr = await User.findOne({ username: arg0, password: arg1 });
      expect(usr).not.toBeNull();
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
  });

});
