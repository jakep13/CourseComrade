Feature: Create New Student Account

    As a student studying at McGill
    I would like to become a student user of the CourseComrade Application System
    So that I can see which courses I will have the most friends in and let my comrades more easily see the courses I am taking.

    Scenario Outline: Create Student Account (Normal Flow)
        When the student <username> wants to create an account with CourseComrade with the password <password> which matches the verification password <verif_password> and consists of at least six characters of which at least one is a digit and letter
        Then a new user with username <username> will be populated into the system with the given password <password>
        Examples:
            | username    | password       | verif_password   |
            | "dudeski_1" | "love_cesar<3" | "love_cesar<3"   |
            | "broski_12" | "hate_cesar9"  | "hate_cesar9"    |

