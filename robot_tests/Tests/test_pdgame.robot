### This will test the Prisoner's Dilemma game on our page

*** Settings ***

# importing libraries
Library     SeleniumLibrary

# importing environment variables and locators
Variables   ../Resources/Environment/variables.yaml
Variables   ../Resources/Environment/locators.yaml
Variables   ../Resources/Environment/genres.yaml

# import user defined keywords
Resource    ../Resources/Keywords/user_keywords.resource


### SETUP AND TEARDOWN FOR THIS TEST SUITE

# As test suite setup, open a new browser window (will remain open through all of the tests)
# NOTE: do this here, not in the external keyword files or inside test segments (only need to do it once)
# in this case, the browser will be opened to the page of the game
Suite Setup      Open Browser   ${url_pd}     ${browser}

# For test suite teardown, close all open browsers (should be only one open by the end, but still)
Suite Teardown   Close All Browsers


*** Variables ***

# setting variable for browser
# (comes from an external file, so if same browser is used for a lot of tests, it's easier to change it)
${browser} =  ${test_browser}



*** Test Cases ***

Play Game Once With Each Strategy
    # this test will play the game once with each available strategy

     # check location is game page
     Location Should Be    ${url_pd}

     # create list of available strategies (using user defined keyword)
     ${strategylist} =   Create Strategy List

     # get length of made list to use for loop
     ${length} =             Get Length     ${strategylist}

     # create loop that will play one round of game with each listed strategy
     FOR  ${strategy_index}     IN RANGE       0     ${length}
          # get current strategy from list through index
          ${current_strategy} =     Set Variable     ${strategylist}[${strategy_index}]

          # user defined keyword runs game with current strategy
          Play One Round Of Prisoner's Dilemma    ${current_strategy}

     END


