/// <reference types="cypress" />

// main test suit that include all test cases related to the sign in flow
describe("sign in flow", function()
{
    // create global variable to get data from json file
    let userData;

    // configuration function before every test cases will be run
    beforeEach("set configuration", function()
    {
        cy.openDemo();
    });

    // get all data we will need from json file once in  the beginning of the scrip
    before("load fixture", function()
    {
        cy.fixture("testData").then((data)=>
            {
                userData = data;
            });
    });

    // test suit for sign in flow happy scenarios
    context("Happy Scenarios", function()
    {
        it("verify that user can login with valid data", function()
        {
            // step 1: verify that the actual base url match the expected url
            cy.checkUrl("https://www.saucedemo.com/");

            // step 2: get the user name text filed and type a valid user name
            cy.get('[data-test="username"]').type(userData.UserName);

            // step 3: get the password text filed and type a valid password
            cy.get('[data-test="password"]').type(userData.Password);

            // step 4: verify that the login button is visible and click on it
            cy.get('[data-test="login-button"]').should("be.visible").click();
            
            // step 5: verify that the user reach the home page
            cy.checkUrl("https://www.saucedemo.com/inventory.html");

            // step 6: check the logo's title
            cy.xpath("//div[text()='Swag Labs']").should("contain", "Swag Labs");

            // step 6: check the tap's title
            cy.title().should("eq", "Swag Labs");
        });

       
    });

    // test suit for sign in flow sad scenarios
    context("Sad Scenarios", function()
    {
        it("verify that user can not login with invalid data'", function()
        {
            // step 1: verify that the actual base url match the expected url
            cy.checkUrl("https://www.saucedemo.com/");

            // step 2: get the user name text filed and type an invalid user name
            cy.get('[data-test="username"]').type(userData.InvalidUserName);

            // step 3: get the password text filed and type a valid password
            cy.get('[data-test="password"]').type(userData.Password);

            // step 4: verify that the login button is visible and click on it
            cy.get('[data-test="login-button"]').should("be.visible").click();

            // step 5: check the system behavior 
            cy.xpath("//h3[@data-test='error']").should("be.visible").and("contain", "Username and password do not match any user in this service");
            
            // step 6: verify that the user still in the sign in page
            cy.checkUrl("https://www.saucedemo.com/");
        });
        
        it("verify that user can not login with empty user name'", function()
        {
            // step 1: verify that the actual base url match the expected url
            cy.checkUrl("https://www.saucedemo.com/");

            // step 2: get the user name text filed and check it visible
            cy.get('[data-test="username"]').should("be.visible");

            // step 3: get the password text filed and check it visible
            cy.get('[data-test="password"]').type(userData.Password);

            // step 4: verify that the login button is visible and click on it
            cy.get('[data-test="login-button"]').should("be.visible").click();

            // step 5: check the system behavior 
            cy.get('[data-test="error"]').should("be.visible").and("contain", "Epic sadface: Username is required");
            
            // step 6: verify that the user still in the sign in page
            cy.checkUrl("https://www.saucedemo.com/");
        });

        it("verify that user can not login with empty password'", function()
        {
            // step 1: verify that the actual base url match the expected url
            cy.checkUrl("https://www.saucedemo.com/");

            // step 2: get the user name text filed and type a valid user name
            cy.get('[data-test="username"]').type(userData.UserName);

            // step 3: get the password text filed and check it visible
            cy.get('[data-test="password"]').should("be.visible");

            // step 4: verify that the login button is visible and click on it
            cy.get('[data-test="login-button"]').should("be.visible").click();

            // step 5: check the system behavior 
            cy.get('[data-test="error"]').should("be.visible").and("contain", "Epic sadface: Password is required");
            
            // step 6: verify that the user still in the sign in page
            cy.checkUrl("https://www.saucedemo.com/");
        });
    });
});
