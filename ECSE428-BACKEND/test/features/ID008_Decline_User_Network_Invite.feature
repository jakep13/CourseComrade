Feature: Decline User Network Invite

As a student user of CourseComrade,
I want to be able to decline an invite to join another user's network,
So that they won't be added to my network and will not be able to see the classes I am in.

Background:
    Given students "big_suzee" and "marty_the_martlett" exists in the system
    And student "big_suzee" is logged in to CourseComrade account


Scenario: Decline an invite received by a CourseComrade user to join that user's network (Normal Flow)
    Given "big_suzee" received an invite from "marty_the_martlett"
    When "big_suzee" declines the invite from "marty_the_martlett"
    Then "marty_the_martlett" will not be added to the network of "big_suzee" and vis-versa


Scenario: Attempt to decline an invite reveived by a CourseComrade user to join that user's network (Error Flow)
    Given "big_suzee" received an invite from "marty_the_martlett" 
    And "big_suzee" already accepted the invite from "marty_the_martlett" in another session
    When "big_suzee" attempts to decline the invite
    Then "big_suzee" will be added to the network of "marty_the_martlett" and vis-versa
