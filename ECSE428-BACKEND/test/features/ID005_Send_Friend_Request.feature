Feature: Send Friend Request

    As a student user of CourseComrade
    I would like to add a fellow user to my personal network
    So that I can connect with other users.

    Background:
        Given students exists in the system:
            | username    |
            | jake_p      |
            | arian_o     |
            | norman_k    |
            | annabelle_d |
        And student "jake_p" is logged in to CourseComrade account

    Scenario Outline: Request to add fellow student to personal network (Normal Flow)
        When student "jake_p" requests to add user <username> to their personal network
        Then "jake_p" should have sent a request to <username>
        And <username> should have a pending friend request from "jake_p"
        Examples:
            | username    |
            | arian_o     |
            | norman_k    |
            | annabelle_d |

    Scenario Outline: Request to add non-existent student to personal network (Error Flow)
        When student "jake_p" requests to add non-existant user <username> to their personal network
        Then no change to any personal network will occur
        And the error message "no user exists with that username" is issued
        Examples:
            | username |
            | fake1    |
            | fake2    |
            | fake3    |

