*** Settings ***
Documentation   These are the user defined keywords used in the test suite

Library         SeleniumLibrary


*** Keywords ***

Get CSS Property Value
    # NOTE: I found this solution for getting the CSS property value online
    # https://stackoverflow.com/questions/33362308/how-to-find-the-css-style-attribute-of-a-particular-html-element-using-robot-fra
    # (getting a property value is not as easy as getting an attribute value...)


    [Documentation]      Get the CSS property value of an Element

    # This keyword retrieves the CSS property value of an element.
    # The element is retrieved using the locator.

    [Arguments]     ${locator}          ${attribute name}

    # this gets the WebElement of the element indicated by the locator, and stores it in variable 'css'
    ${css}=         Get WebElement      ${locator}
    # this uses method 'value_of_css_property' to find the value of attribute 'attribute name'
    # of the element stored in 'css', and returns it
    ${prop_val}=    Call Method         ${css}    value_of_css_property    ${attribute name}
    [Return]        ${prop_val}


    # Arguments:
    # - locator           (string)    any Selenium Library supported locator xpath/css/id etc.
    # - property_name     (string)    the name of the css property for which the value is returned.

    # Returns             (string)    returns the string value of the given css attribute or fails.

    # value_of_css_property is a method of Selenium Python module (?)
    # Call Method is a keyword of Robot Framework's Built-in library (no import needed)

    # usage example:  ${style}=    Get CSS Property Value    class:logo    background-image