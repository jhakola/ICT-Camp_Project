### This is test suite for all the genre filters on the main page

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

Test Filter For All Game Genres
    # this will go through all genre filters one by one, and check if they work
    # (that things that should be visible are, and things that shouldn't be aren't :D)

    # first check that we are on the home page
    Location Should Be      ${url_homepage}

    # create a list of available genres (via a user defined keyword, using an external yaml file)
    ${genrelist} =  Create Genre List

    # create empty list to use for filtering loop
    ${filter_genrelist} =   Create List
    # get the length of the genrelist to use for loop indexing


    # create a loop of filter testing, that goes through all genres one by one
    ${length} =             Get Length     ${genrelist}
    FOR  ${genre_index}     IN RANGE       0     ${length}

        # create a list for filtering and sets the value to that of ${genrelist} (= all genres)
        ${filter_genrelist} =       Set Variable            ${genrelist}
        # pick a genre from the yaml file according to the index and makes it the current genre
        ${current_genre} =          Set Variable            ${genre_names}[${genre_index}]



        ## select current genre, click the button, and check visibility of that genre

        # click genre button to filter other games out
        Click Button    ${button_${current_genre}}

        # check visibility of current genre game (property 'display' value should be 'block')
        ${current_genre_visibility} =  Get CSS Property Value    ${visibility_${current_genre}}    display
        Should Be Equal                 ${current_genre_visibility}  block



        ## create filtered list of genres that doesnt' have current genre in it

        # remove the current genre from the ${filter_genrelist} because it's already checked
        Remove Values From List     ${filter_genrelist}     ${current_genre}

        # create a loop that goes through ${filter_genrelist} and checks visibility of hidden items
        ${hidden_length} =    Get Length    ${filter_genrelist}
        FOR  ${hidden_index}  IN RANGE  0   ${hidden_length}

            ${current_hidden} =    Set Variable         ${filter_genrelist}[${hidden_index}]

            # check that current genre is hidden
            ${current_hidden_visibility} =  Get CSS Property Value    ${visibility_${current_hidden}}    display
            Should Be Equal                 ${current_hidden_visibility}  none



        END


        # restore genrelist to full length before entering next round
        Append To List              ${filter_genrelist}     ${current_genre}

        # click 'clear filter' to reset things on page
        Click Button    ${button_clearfilter}



    END





