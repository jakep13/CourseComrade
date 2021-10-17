Feature: Add Class to User Profile

    As a student user of CourseComrade
    I would like to add a class to my profile
    So that my friends can know which courses I am currently taking or have taken in the past.

    Background:
        Given student <username> is logged in to CourseComrade account

    Scenario Outline: Register class to student profile (Normal Flow)
        When student <username> registers for class <course> on CourseComrade
        Then <course> should be added to student <username> profile
        Examples:
            | username    | course    |
            | "big_suze"  | "COMP551" |
            | "bob123"    | "ECSE321" |
            | "test_user" | "COMP330" |

    Scenario Outline: Attempt to register for an invalid course (Error Flow)
        When student <username> registers for an invalid class <course> on CourseComrade
        Then  a resulting "invalid course input" error message is issued
        Examples:
            | username    | course   |
            | "big_suze"  | "COMP11" |
            | "bob123"    | "C112"   |
            | "test_user" | "10202"  |