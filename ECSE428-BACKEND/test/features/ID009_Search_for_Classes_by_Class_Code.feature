Feature: Search for Classes by Class Code

    As a student user of CourseComrade
    I would like to search for a class by class code
    So that I can see which courses I can add to my schedule 

    Background:
        Given student <username> is logged in to CourseComrade account

    Scenario Outline: Search for a class that exists (Normal Flow)
        Given <course> exists in the CourseComrade database
        When student <username> searches for existing class <course> on CourseComrade
        Then <course> should be issued to student <username> 
        Examples:
            | username  | course  |
            | user111   | COMP551 |
            | bob123    | COMP330 |
            | test_user | ECSE428 |
            

    Scenario Outline: Search for a class that does not exist (Error Flow)
        When student <username> searches for non-existing class <course> on CourseComrade
        Then a resulting "invalid course input" error message is issued
        Examples:
            | username  | course |
            | big_suze  | COMP11 |
            | bob123    | C112   |
            | test_user | 10202  |
