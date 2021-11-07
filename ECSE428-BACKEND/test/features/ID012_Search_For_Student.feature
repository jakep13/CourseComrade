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
            | jake__p  	 | arian__o     |
            | cath__vg    | norman__k    |
            | caesar__a   | annabelle__d |

    Scenario Outline: Request to add non-existant student to personal network (Error Flow)
        When student <username1> searches for non-existant user <DNE> on CourseComrade
        Then the error message "no user exists with that username" is issued
        Examples:
            | username1  | DNE    |
            | jake__p  	 | fake1  |
            | cath__vg    | fake2  |
            | caesar__a   | fake3  |