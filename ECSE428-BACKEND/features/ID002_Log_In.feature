Feature: Log In as Student

  As a student user of CourseComrade
  I would like to log in CourseComrade Application System
  So that I can get access to my personal account.

  Scenario Outline: Log in with valid credentials (Normal Flow)

    Student should successfully log in.

    Given a student account with <username> and <password> exists
    When student enters a valid username <username>
    And student enters corresponding valid password <password>
    And student requests to log in
    Then student should be successfully logged in
    Examples:
      | username      | password           |
      | "test123"     | "dogs88"           |
      | "broksi1122"  | "ilovecesar1"      |
      | "dudeski1122" | "ilovetheworld_88" |

  Scenario Outline: Attempt to log in with invalid username (Error Flow)

    Student should not be logged in and see an error message.

    Given a student account with <username> and <password> exists
    When student enters a wrong username <input_username> and student enters valid password <password>
    Then student should not be logged in
    And student should see the error message "login failed: incorrect username or password"
    Examples:
      | username      | password           | input_username |
      | "test123"     | "dogs88"           | "test12"       |
      | "broksi1122"  | "ilovecesar1"      | "Broksi1122"   |
      | "dudeski1122" | "ilovetheworld_88" | "wrong_user"   |

  Scenario Outline: Attempt to log in with invalid password (Error Flow)

    The student should not be logged in and see an error message.

    Given a student account with <username> and <password> exists
    When student enters valid username <username> and a wrong password <input_password>
    Then student should not be logged in
    And student should see the error message "login failed: incorrect username or password"
    Examples:
      | username      | password           | input_password |
      | "test123"     | "dogs88"           | "dogs885"      |
      | "broksi1122"  | "ilovecesar1"      | "iLovecesar1"  |
      | "dudeski1122" | "ilovetheworld_88" | "wrong_pass33" |