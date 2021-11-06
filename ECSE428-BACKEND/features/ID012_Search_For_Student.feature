Feature: Search for Another Student by Name

    As a student user of CourseComrade
    I would like to search for another user by name
    So that I can see who I can connect with.

    Background:
        Given student <username1> is logged in to CourseComrade account
        And student <username2> exists in the system

    Scenario Outline: Search an existing user (Normal Flow)
        When student <username1> searches for user <username2> on CourseComrade
        Then <username2> should be shown to <username1>
        Examples: 
            | username1  | username2   |
            | jake_p  	 | arian_o     |
            | cath_vg    | norman_k    |
            | caesar_a   | annabelle_d |

    Scenario Outline: Request to add non-existant student to personal network (Error Flow)
        When student <username1> searches for non-existant user <DNE> on CourseComrade
        Then the error message "No user of this username exists" is issued
        Examples:
            | username1  | DNE    |
            | jake_p  	 | fake1  |
            | cath_vg    | fake2  |
            | caesar_a   | fake3  |