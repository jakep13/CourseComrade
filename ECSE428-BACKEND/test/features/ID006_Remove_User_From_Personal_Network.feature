Feature: Remove User From Personal Network

    As a student user of CourseComrade
    I would like to remove a fellow user from my personal network
    So that I can update my personal network.

    Background:
        Given student <username1> is logged in to CourseComrade account
        And student <username2> exists in the system
	    And student <username2> is in the personal network of student <username1>

    Scenario Outline: Request to Remove User From Personal Network (Normal Flow)
        When student <username1> attempts to remove user <username2> to their personal network 
        Then <username2> should be removed from the network belonging to <username1> 
        And <username1> should be removed from the network belonging to <username1> 
        Examples:
            | username1  | username2   |
            | jake_p  	 | arian_o     |
            | cath_vg    | norman_k    |
            | caesar_a   | annabelle_d |



