Feature: Delete Class From Student Account

    As a student user of CourseComrade
    I would like to remove a course from my profile
    So that I can correct/update my course list.

    Scenario: Delete Class From Student Account (Normal Flow)
        Given student "big_suze" is logged in
        And the student is registered to the following courses:
            | course  | course_name                    |
            | ECSE429 | Software Validation            |
            | ECSE428 | Software Engineering Practices |
        When the student request to remove the course "ECSE428" from their profile
        Then the student is no longer registered to the course "ECSE428"

    Scenario: Delete Unregistered Class From Student Account (Error Flow)
        Given student "big_suze" is logged in
        And the student is registered to the following courses:
            | course  | course_name                    |
            | ECSE429 | Software Validation            |
            | ECSE428 | Software Engineering Practices |
        When the student request to remove the unregistered course "COMP332" from their profile
        Then "cannot delete unregistered course" error message is issued
        And the student is registered to the following courses:
            | course  | course_name                    |
            | ECSE429 | Software Validation            |
            | ECSE428 | Software Engineering Practices |
