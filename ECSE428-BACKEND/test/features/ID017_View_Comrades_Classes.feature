Feature: View Comrade Classes

    As a student user of the CourseComrade
    I would like to view a list of the classes a fellow comrade has added
    So that I can coordinate my classes with my comrade.

    Background:


    Scenario: View list of a comrade's added classes (Normal Flow)
        Given student "big_suze" is logged in to CourseComrade account
        And student "small_suze" exists in the system
        And student "small_suze" is in the personal network of student "big_suze"
        And student "small_suze" added the following courses:
            | course  | course_name                    |
            | COMP551 | Applied Machine Learning       |
            | ECSE428 | Software Engineering Practices |
            | MATH328 | History and Philosophy of Math |
            | MATH240 | Discrete Structures            |
            | COMP330 | Theory of Computation          |
        When user "big_suze" requests to view the classes of "small_suze"
        Then the following list of classes is generated:
            | course  | course_name                    |
            | COMP551 | Applied Machine Learning       |
            | ECSE428 | Software Engineering Practices |
            | MATH328 | History and Philosophy of Math |
            | MATH240 | Discrete Structures            |
            | COMP330 | Theory of Computation          |

    Scenario: Attempt to view personal registered classes when no classes are registered (Alternate Flow)
        Given student "big_suze" is logged in to CourseComrade account
        And student "marty_the_martlet" exists in the system
        And student "marty_the_martlet" is in the personal network of student "big_suze"
        And student "marty_the_martlet" has no registered courses
        When user "big_suze" requests to view the classes of "marty_the_martlet"
        Then a resulting "this user is not registered to any classes" message is issued


