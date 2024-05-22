### This is test suite for the genre filters on the main page

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
Suite Setup      Open Browser   ${url_homepage}     ${browser}

# For test suite teardown, close all open browsers (should be only one open by the end, but still)
Suite Teardown   Close All Browsers


*** Variables ***

# setting variable for browser
# (comes from an external file, so if same browser is used for a lot of tests, it's easier to change it)
${browser} =  ${test_browser}



*** Test Cases ***

## This was a single filter test case that I made first to try things out
## before building the test case for all filters
## (Also to test out the 'Get CSS Property Value' keyword in a simple setting)

# Test Filter For Strategy Games
#     # check location is homepage and click filter button for 'strategy'
#     Location Should Be      ${url_homepage}
#     Click Button            ${button_strategy}

#     # the 'clear filter' button visibility should be 'block'
#     ${clearfilter_visibility} =     Get CSS Property Value    ${button_clearfilter}    display
#     Should Be Equal   ${clearfilter_visibility}  block

#     # click the 'clear filter' button, and the button visibility should become 'none'
#     Click Button            ${button_clearfilter}
#     ${clearfilter_visibility} =     Get CSS Property Value    ${button_clearfilter}    display
#      Should Be Equal    ${clearfilter_visibility}  none


Test Filter For All Games
    # this will go through all genre filters one by one, and check if they work
    # (that things that should be visible are, and things that shouldn't be aren't :D)

    # create a list of available genres (via a user defined keyword)
    ${genrelist} =  Create Genre List

    # debugging
    Log    ${genrelist}

