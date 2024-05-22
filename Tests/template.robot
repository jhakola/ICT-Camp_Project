### This is a template for the robot tests

*** Settings ***

Library  SeleniumLibrary

Variables   ../Resources/Environment/variables.yaml
Variables   ../Resources/Environment/locators.yaml


*** Variables ***

${browser} =  ${test_browser}


*** Test Cases ***

TC_001 Browser Start and Close
    Open Browser  ${url_homepage}  ${browser}
    Close Browser

