Feature: Modify Account Details

    As a student user of CourseComrade
    I would like to modify account details
    So that my profile can contain correct information.

    Background:
        Given student <old_username> with password <old_password> is logged in to CourseComrade

    Scenario Outline: Attempt to modify account details with valid credentials (Normal Flow)
        When student <old_username> requests to modify account details to <new_username> and <new_password>
        Then account details <old_username> and <old_password> shall be updated to <new_username> and <new_password>
        Examples:
            | old_username | old_password | new_username | new_password |
            | big_suze     | soccer2      | small_suze   | Wordpass_88  |
            | bob123       | bball3       | joe123       | bball2       |
            | test_user    | tennis1      | trial_user   | tennis333    |

    Scenario Outline: Attempt to modify account details with an existing username (Error Flow)
        Given student <new_username> already exists in the system
        When student <old_username> requests to modify account details to <new_username> and <new_password>
        Then no change shall occur to account belonging to <old_username> and <old_password>
        And the error message "username already taken" is issued
        Examples:
            | old_username | old_password | new_username  | new_password |
            | big_suze     | soccer2      | bobby_fischer | Wordpass_88  |
            | bob123       | bball3       | randy_33      | bball2       |
            | test_user    | tennis1      | candice_dic   | tennis3      |

    Scenario Outline: Attempt to modify account details with invalid credentials (Error Flow)
        When student <old_username> requests to modify account details to <new_username> and <new_password>
        Then no change shall occur to account belonging to <old_username> and <old_password>
        And the error message "invalid input" is issued
        Examples:
            | old_username | old_password | new_username              | new_password |
            | big_suze     | soccer2      |                           |              |
            | bob123       | bball3       | aaaaaaaaaaaaaaaaaaaaaaaaa | bball2       |
            | test_user    | tennis1      | trial_user                | trial_user   |