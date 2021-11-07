Feature: Delete Student Account

    As a student user of CourseComrade
    I would like to delete my student account from the CourseComrade Application System
    So that none of my friends can see the courses that I am taking.

    Scenario Outline: Successfully Delete Student Account (Normal Flow)
        Given student with <username> and <password> exists and is logged in
        When the student <username> deletes their account
        Then the student account with the username <username> will be deleted from the system
        And the user should logged out
        Examples:
            | username  | password      | input_password |
            | big_suze  | iLikeCheese66 | iLikeCheese66  |
            | bob123    | CompSux11     | CompSux11      |
            | test_user | IDKqqq1       | IDKqqq1        |






