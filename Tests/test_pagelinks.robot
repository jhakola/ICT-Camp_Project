### This is test suite for the site page links

*** Settings ***

# importing seleniumlibrary
Library  SeleniumLibrary

# importing environment variables and locators
Variables   ../Resources/Environment/variables.yaml
Variables   ../Resources/Environment/locators.yaml


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

Browse Through The Site
    # this test will go through the website page links, and check they work

    ## Home -> About Us -> Support -> Home

    # start by checking we are on the front page
    Location Should Be      ${url_homepage}

    # click link for 'About Us' and check location afterwards is right
    Click Element           ${link_aboutus}
    Location Should Be      ${url_aboutus}

    # click link for 'Support' and check location afterwards is right
    Click Element           ${link_support}
    Location Should Be      ${url_support}

    # NOTE: waiting for support page to be fixed so it shows up online
    # # click link for 'Home' and check location afterwards is right
    # Click Element           ${link_homepage}
    # Location Should Be      ${url_homepage}