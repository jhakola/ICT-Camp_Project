*** Settings ***
Documentation   These are the user defined keywords used in the test suite

# importing libraries
Library         SeleniumLibrary
Library         Collections                 # for list operations

# importing variables needed
Variables       ../Environment/genres.yaml


*** Variables ***


*** Keywords ***

Create Genre List
    [Documentation]             creates a list of genres from yaml file

    # create an empty list to be filled with genres
    ${genrelist} =  Create List

    Log    ${genrelist}

    # get length of genre_names list (from yaml file)
    ${length} =      Get Length  ${genre_names}

    # run a loop from 0 to ${length} to append each genre name into the list
    FOR  ${genre_index}    IN RANGE    0    ${length}


        # set current genre to be the one indicated by the index number
        ${current_genre} =   Set Variable   ${genre_names}[${genre_index}]

        # append the name of the current genre into the genre list
        Append To List    ${genrelist}  ${current_genre}


    END

    # RETURN the list or else the value of it will become 'None' on the test side!!!
    RETURN      ${genrelist}




Get CSS Property Value
    # NOTE: I found this solution for getting the CSS property value online
    # https://stackoverflow.com/questions/33362308/how-to-find-the-css-style-attribute-of-a-particular-html-element-using-robot-fra
    # (getting a property value is not as easy as getting an attribute value...)

    # usage example:  ${style}=    Get CSS Property Value    class:logo    background-image

    [Documentation]      Get the CSS property value of an Element

    # This keyword retrieves the CSS property value of an element.
    # The element is retrieved using the locator.

    [Arguments]     ${locator}          ${attribute name}

    # this gets the WebElement of the element indicated by the locator, and stores it in variable 'css'
    ${css}=         Get WebElement      ${locator}
    # this uses method 'value_of_css_property' to find the value of attribute 'attribute name'
    # of the element stored in 'css', and returns it
    ${prop_val}=    Call Method         ${css}    value_of_css_property    ${attribute name}
    RETURN        ${prop_val}


    # Arguments:
    # - locator           (string)    any Selenium Library supported locator xpath/css/id etc.
    # - property_name     (string)    the name of the css property for which the value is returned.

    # Returns             (string)    returns the string value of the given css attribute or fails.

    # value_of_css_property is a method of Selenium Python module (?)
    # Call Method is a keyword of Robot Framework's Built-in library (no import needed)

