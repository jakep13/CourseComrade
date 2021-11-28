Feature: Search Comrades by Class

    As a student user of CourseComrade,
    I would like to be able to search for comrades by class,
    So that I know which comrades are in my classes.

    Background:
        Given student "big_suze" exists in the system
        And student "big_suze" is logged in to CourseComrade account


    Scenario: Get list of comrades registered in a class (Normal Flow)
        Given the class "ECSE428" exists
        And "marty_the_martlet" is a comrade of "big_suze" that is registered in class "ECSE428":
        When "big_suze" searches for comrades registered in class "ECSE428"
        Then "big_suze" should see "marty_the_martlet" in the list of comrades


    Scenario: Get list of comrades registered in a non-existent class (Error Flow)
        Given the class "UUCC111" does not exist
        When "big_suze" searches for comrades registered in class "UUCC111"
        Then the error message "invalid course" is issued
