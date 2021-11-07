Feature: Modify Account Details

    As a student user of CourseComrade
    I would like to modify account details
    So that my profile can contain correct information.

    Background:
        Given student <username> is logged in to CourseComrade 
        And student <username> has password <old_password> and username <old_username>
        And student <username> provides new credentials <new_password> and <new_username>

    Scenario Outline: Attempt to modify account details with valid credentials (Normal Flow)
        When student <username> requests to modify account details
        And student <username> provides valid credentials <new_password> and <new_username>
        Then account details <old_password> and <old_username> shall be updated to <new_password> and <new_username>
        Examples:
            | old_username  | old_password  | new_username  | new_password  |
            | big_suze      | soccer2       | small_suze    | soccer1       |
            | bob123        | bball3        | joe123        | bball2        |
            | test_user     | tennis1       | trial_user    | tennis3       | 

    Scenario Outline: Attempt to modify account details with an existing username (Error Flow)
        When student <username> requests to modify account details
        And username <new_username> already exists in the system
        And student <username> provides a new username <new_username> and a new password <new_password>
        Then no change shall occur to account belonging to <old_username>
        And the error message "Username already taken" is issued
        Examples:
            | old_username  | old_password  | new_username  | new_password  |
            | big_suze      | soccer2       | big_suze      | wordpass      |
            | bob123        | bball3        | bob123        | bball2        |
            | test_user     | tennis1       | test_user     | tennis3       | 

    Scenario Outline: Attempt to modify account details with invalid credentials (Error Flow)
        When student <username> requests to modify account details
        And student <username> provides invalid credentials <new_password> and <new_username>
        Then no change shall occur to account belonging to <old_username>
        And the error message "Invalid credentials were given" is issued
        Examples:
            | old_username  | old_password  | new_username                   | new_password  |
            | big_suze      | soccer2       |                                |               |
            | bob123        | bball3        | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa | bball2        |
            | test_user     | tennis1       | trial_user                     | trial_user    | 