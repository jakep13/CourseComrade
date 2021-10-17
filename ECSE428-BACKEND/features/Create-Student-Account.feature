Feature: Create New Student Account

    As a student studying at McGill
    I would like to become a student user of the CourseComrade Application System
    So that I can see which courses I will have the most friends in and let my comrades more easily see the courses I am taking.

    Scenario Outline: Create Student Account (Normal Flow)
        When the student <username> wants to create an account with CourseComrade with the password <password> which matches the verification password <verif_password> and consists of at least six characters of which at least one is a digit and letter.
        Then a new student account will be created with the username <username>
        Then a new user with username <username> will be populated into the system with the given password <password>
        Examples:
            | username  | password     | verif_password |
            | dudeski_1 | love_cesar<3 | love_cesar<3   |
            | broski_12 | hate_cesar9  | hate_cesar9    |


    Scenario Outline: Attempt to Create a student account with invalid Password format (Error Flow)
        When the student <username> wants to create an account with the password <password> and a matching verification password <verif_password>
        Then a resulting "invalid password" message is issued
        Examples:
            | username  | password | verif_password |
            | dudeski_5 | nomorep  | nomorep        |
            | broski_13 | 123920   | 123920         |

    Scenario Outline: Attempt to Create a student account with password which doesn't match the verification password (Error Flow)
        When the student <username> wants to create an account with the password <password> and a non-matching verification password <verif_password>
        Then a resulting "please enter your password twice" message is issued
        Examples:
            | username  | password   | verif_password |
            | dudeski_5 | nomorep1   | nomorepwow1    |
            | broski_13 | hatecesar1 | hatecesarwhat1 |


    Scenario Outline: Attempt to create a student account with a username which is already associated with an existing account (Error Flow)
        Given student with username <username> and password <password> exists
        When a student with username <username> tries to register an account with a password <password> and a matching verification password <verif_password>
        Then a resulting "username already taken" message is issued
        Examples:
            | username  | password     | verif_password |
            | dudeski_1 | love_cesar<3 | love_cesar<3   |
            | broski_12 | hate_cesar9  | hate_cesar9    |



