Feature: Accept User to Personal Network

    As a student user of CourseComrade
    I would like to accept a connection request from a fellow user outside my personal network
    So that I can connect with friends through CourseComrade.

    Background:
        Given student <username1> is logged in to CourseComrade account
        And student <username2> exists in the system
	    And student <username2> requested to connect with student <username1>

    Scenario Outline: Request to Accept a Connection Request (Normal Flow)
        When student <username1> attempts to accept the connection request by <username2> 
        Then <username2> should be added to the network belonging to <username1> 
        And <username1> should be added to the network belonging to <username2> 
        Examples:
            | username1  | username2   |
            | jake_p  	 | arian_o     |
            | cath_vg    | norman_k    |
            | caesar_a   | annabelle_d |

