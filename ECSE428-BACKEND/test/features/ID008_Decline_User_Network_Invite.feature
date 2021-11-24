Feature: Decline User Network Invite

As a student user of CourseComrade,
I want to be able to decline an invite to join another user's network,
So that they won't be added to my network and will not be able to see the classes I am in.

Background:
    Given students "big_suze" and "marty_the_martlet" exists in the system
    And student "big_suze" is logged in to CourseComrade account


Scenario: Decline an invite received by a CourseComrade user to join that user's network (Normal Flow)
    Given "big_suze" received an invite from "marty_the_martlet"
    When "big_suze" declines the invite from "marty_the_martlet"
    Then "marty_the_martlet" will not be added to the network of "big_suze" and vis-versa


Scenario: Attempt to decline an invite reveived by a CourseComrade user to join that user's network (Error Flow)
    Given "big_suze" received an invite from "marty_the_martlet"
    When "big_suze" attempts to decline the invite
    And the invite was already accepted in another session
    Then "big_suze" will be added to the network of "marty_the_martlet" and vis-versa
