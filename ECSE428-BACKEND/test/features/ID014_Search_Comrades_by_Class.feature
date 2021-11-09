Feature: Search Comrades by Class

    As a student user of CourseComrade,
    I would like to be able to search for comrades by class,
    So that I know which comrades are in my classes.

    Background:
        Given student "big_suze" exists in the system
        And student "big_suze" is logged in to CourseComrade account


    Scenario: Get list of comrades registered in a class (Normal Flow)
        Given the class "ECSE428" exists
        And the following are comrades of "big_suze" that are registered in class "ECSE428":
            | username    |
            | jake_p      |
            | arian_o     |
            | norman_k    |
            | annabelle_d |
        When "big_suze" searches for comrades registered in class "ECSE428"
        Then they should see the following list of comrades:
            | username    |
            | jake_p      |
            | arian_o     |
            | norman_k    |
            | annabelle_d |


    Scenario: Get list of comrades registered in a non-existent class (Error Flow)
        Given the class "FUCK111" does not exist
        When "big_suze" searches for comrades registered in class "FUCK111"
        Then the error message "invalid course" is issued
