Feature: View Personal Classes

  As a student user of the CourseComrade
  I would like to view a list of the classes I registered for
  So that I can manage the classes registered on my account

  Scenario: View list of personal registered classes (Normal Flow)
    Given student "big_suze" is logged in
    And the student is registered to the following courses:
      | course  | course_name                    |
      | COMP551 | Applied Machine Learning       |
      | ECSE428 | Software Engineering Practices |
      | MATH328 | History and Philosophy of Math |
      | MATH240 | Discrete Structures            |
      | COMP330 | Theory of Computation          |
    When the student requests to view their classes
    Then the following list of classes is generated:
      | course  | course_name                    |
      | COMP551 | Applied Machine Learning       |
      | ECSE428 | Software Engineering Practices |
      | MATH328 | History and Philosophy of Math |
      | MATH240 | Discrete Structures            |
      | COMP330 | Theory of Computation          |

  Scenario: Confirm list of personal registered classes after removing a class (Alternate Flow)
    Given student "big_suze" is logged into the CourseComrade
    And the student is registered to the following courses:
      | course  | course_name                    |
      | COMP551 | Applied Machine Learning       |
      | ECSE428 | Software Engineering Practices |
      | MATH328 | History and Philosophy of Math |
      | MATH240 | Discrete Structures            |
      | COMP330 | Theory of Computation          |
    And course "COMP551" is removed
    When the student requests to view their classes
    Then the following list of classes is generated:
      | course  | course_name                    |
      | ECSE428 | Software Engineering Practices |
      | MATH328 | History and Philosophy of Math |
      | MATH240 | Discrete Structures            |
      | COMP330 | Theory of Computation          |


  Scenario: Attempt to view personal registered classes when no classes are registered (Error Flow)
    Given student "marty_the_martlet" is logged in
    And the student is not registered to any courses
    When the student requests to view their classes
    Then a resulting "you are not registered to any classes" message is issued
