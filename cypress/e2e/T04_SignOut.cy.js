/// <reference types="cypress" />

// main test suit that include all test cases related to the sign out flow
describe("Sign Out flow", function()
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

    context("Happy Scenarios", function()
    {
        it("verify that user can sign out after successfully sign in", function()
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

            // step 7: check the tap's title
            cy.title().should("eq", "Swag Labs");

            // step 8: verify that left side menu is visible and click on it
            cy.get("#react-burger-menu-btn").should("be.visible").click();

            // step 9: verify that the user can signout during click on sign out button
            cy.get("#logout_sidebar_link").should("be.visible").click();

            // step 10: verify that the actual base url match the expected url
            cy.checkUrl("https://www.saucedemo.com/");
        });

        it("verify that user can sign out from left side menu on the cart page", function()
        {
            // step 1: verify that the actual base url match the expected url for sign in page
            cy.checkUrl("https://www.saucedemo.com/");

            // step 2: get the user name text filed and type a valid user name
            cy.get('[data-test="username"]').type(userData.UserName);

            // step 3: get the password text filed and type a valid password
            cy.get('[data-test="password"]').type(userData.Password);

            // step 4: verify that the login button is visible and click on it
            cy.get('[data-test="login-button"]').should("be.visible").click();
            
            // step 5: verify that the user reach the home page
            cy.checkUrl("https://www.saucedemo.com/inventory.html");

            // step 6: check the logo's title in the add to cart page
            cy.xpath("//div[text()='Swag Labs']").should("contain", "Swag Labs");

            // step 7: go to cart page 
            cy.get(".shopping_cart_link").should("be.visible").click();

            // step 8: check the url of the cart page
            cy.checkUrl("https://www.saucedemo.com/cart.html");

           // step 9: verify that left side menu is visible and click on it
           cy.get("#react-burger-menu-btn").should("be.visible").click();

           // step 10: verify that the user can signout during click on signout button
           cy.get("#logout_sidebar_link").should("be.visible").click();

           // step 11: verify that the actual base url match the expected url
           cy.checkUrl("https://www.saucedemo.com/");
        });

        it("verify that user can sign out from left side menu on the check out page", function()
        {
            // step 1: verify that the actual base url match the expected url for sign in page
            cy.checkUrl("https://www.saucedemo.com/");

            // step 2: get the user name text filed and type a valid user name
            cy.get('[data-test="username"]').type(userData.UserName);

            // step 3: get the password text filed and type a valid password
            cy.get('[data-test="password"]').type(userData.Password);

            // step 4: verify that the login button is visible and click on it
            cy.get('[data-test="login-button"]').should("be.visible").click();
            
            // step 5: verify that the user reach the home page
            cy.checkUrl("https://www.saucedemo.com/inventory.html");

            // step 6: check the logo's title in the add to cart page
            cy.xpath("//div[text()='Swag Labs']").should("contain", "Swag Labs");
             
            // step 8: add a product to the cart
            cy.get("#add-to-cart-sauce-labs-backpack").should("be.visible").click();

            //step 9: go to cart page 
            cy.get(".shopping_cart_link").should("be.visible").click();

            // step 10: check the url of the cart page
            cy.checkUrl("https://www.saucedemo.com/cart.html");

            // step 11: get the checkout button and verify it is visible and its name is "Checkout"
            cy.get("#checkout").should("be.visible").then((ButtonName)=>
                {
                    expect(ButtonName.text()).to.be.equal("Checkout");
                });
            // step 12: verify that the checkout button redirect to the check out page step one
            cy.get("#checkout").click();

            // step 13: check the url for checkout page
            cy.checkUrl("https://www.saucedemo.com/checkout-step-one.html");

            // step 14: verify that left side menu is visible and click on it
           cy.get("#react-burger-menu-btn").should("be.visible").click();

           // step 15: verify that the user can sign out during click on sign out button
           cy.get("#logout_sidebar_link").should("be.visible").click();

           // step 16: verify that the actual base url match the expected url
           cy.checkUrl("https://www.saucedemo.com/");
        });

        it("verify that user can signout from left side menu after end to end scenario", function()
        {
            // step 1: verify that the actual base url match the expected url for sign in page
            cy.checkUrl("https://www.saucedemo.com/");

            // step 2: get the user name text filed and type a valid user name
            cy.get('[data-test="username"]').type(userData.UserName);

            // step 3: get the password text filed and type a valid password
            cy.get('[data-test="password"]').type(userData.Password);

            // step 4: verify that the login button is visible and click on it
            cy.get('[data-test="login-button"]').should("be.visible").click();
            
            // step 5: verify that the user reach the home page
            cy.checkUrl("https://www.saucedemo.com/inventory.html");

            // step 6: check the logo's title in the add to cart page
            cy.xpath("//div[text()='Swag Labs']").should("contain", "Swag Labs");
             
            // step 8: add that product to the cart
            cy.get("#add-to-cart-sauce-labs-backpack").should("be.visible").click();

            //step 9: go to cart page 
            cy.get(".shopping_cart_link").should("be.visible").click();

            // step 10: check the url of the cart page
            cy.checkUrl("https://www.saucedemo.com/cart.html");

            // step 12: verify that the check out button redirect to the check out page step one
            cy.get("#checkout").click();

            // step 13: check the url for checkout page
            cy.checkUrl("https://www.saucedemo.com/checkout-step-one.html");

            // step 14: get the text filed for the first name and type a valid first name
            cy.get("#first-name").type(userData.FirstName);

            // step 15: get the text filed for the last name and type a valid last name
            cy.get("#last-name").type(userData.LastName);

            // step 16: get the text filed for the post code and type a valid code
            cy.get("#postal-code").type(userData.PostNumber);

            // step 17: verify that the continue button is visible and click in it
            cy.get("#continue").should("be.visible").click();

            // step 18: verify that the url of the second step of the check out process is true
            cy.checkUrl("https://www.saucedemo.com/checkout-step-two.html");

            // step 19: verify that the finish button is visible 
            cy.get("#finish").should("be.visible").click();

            // step 20: check tha successful message is shown
            cy.xpath("//h2[text()='Thank you for your order!']").should("contain", "Thank you for your order!");

            // step 21: verify that the go back button is exist and redirect to the products page
            cy.get("#back-to-products").should("be.visible").click(); 

             // step 22: verify that left side menu is visible and click on it
           cy.get("#react-burger-menu-btn").should("be.visible").click();

           // step 23: verify that the user can sign out during click on sign out button
           cy.get("#logout_sidebar_link").should("be.visible").click();

           // step 24: verify that the actual base url match the expected url
           cy.checkUrl("https://www.saucedemo.com/");
        });
        
    });

    context("Sad Scenarios", function()
    {
        it("verify that user can not sign out after successfully sign in without open the left side", function()
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

            // step 7: check the tap's title
            cy.title().should("eq", "Swag Labs");

            // step 8: verify that left side menu is visible
            cy.get("#react-burger-menu-btn").should("be.visible");

            // step 9: verify that the sign out button is not visible
            cy.get("#logout_sidebar_link").should("not.be.visible");
        });

        it("verify that user can not sign out from left side menu without open it on the cart page", function()
        {
            // step 1: verify that the actual base url match the expected url for sign in page
            cy.checkUrl("https://www.saucedemo.com/");

            // step 2: get the user name text filed and type a valid user name
            cy.get('[data-test="username"]').type(userData.UserName);

            // step 3: get the password text filed and type a valid password
            cy.get('[data-test="password"]').type(userData.Password);

            // step 4: verify that the login button is visible and click on it
            cy.get('[data-test="login-button"]').should("be.visible").click();
            
            // step 5: verify that the user reach the home page
            cy.checkUrl("https://www.saucedemo.com/inventory.html");

            // step 6: check the logo's title in the add to cart page
            cy.xpath("//div[text()='Swag Labs']").should("contain", "Swag Labs");

            // step 7: go to cart page 
            cy.get(".shopping_cart_link").should("be.visible").click();

            // step 8: check the url of the cart page
            cy.checkUrl("https://www.saucedemo.com/cart.html");

           // step 9: verify that left side menu is visible
           cy.get("#react-burger-menu-btn").should("be.visible");

           // step 10: verify that the sign out button is not visible
           cy.get("#logout_sidebar_link").should("not.be.visible");
        });

        it("verify that user can not sign out from left side menu on the check out page without open it", function()
        {
            // step 1: verify that the actual base url match the expected url for sign in page
            cy.checkUrl("https://www.saucedemo.com/");

            // step 2: get the user name text filed and type a valid user name
            cy.get('[data-test="username"]').type(userData.UserName);

            // step 3: get the password text filed and type a valid password
            cy.get('[data-test="password"]').type(userData.Password);

            // step 4: verify that the login button is visible and click on it
            cy.get('[data-test="login-button"]').should("be.visible").click();
            
            // step 5: verify that the user reach the home page
            cy.checkUrl("https://www.saucedemo.com/inventory.html");

            // step 6: check the logo's title in the add to cart page
            cy.xpath("//div[text()='Swag Labs']").should("contain", "Swag Labs");
             
            // step 8: add a product to the cart
            cy.get("#add-to-cart-sauce-labs-backpack").should("be.visible").click();

            //step 9: go to cart page 
            cy.get(".shopping_cart_link").should("be.visible").click();

            // step 10: check the url of the cart page
            cy.checkUrl("https://www.saucedemo.com/cart.html");

            // step 11: get the checkout button and verify it is visible and its name is "Checkout"
            cy.get("#checkout").should("be.visible").then((ButtonName)=>
                {
                    expect(ButtonName.text()).to.be.equal("Checkout");
                });
            // step 12: verify that the checkout button redirect to the check out page step one
            cy.get("#checkout").click();

            // step 13: check the url for checkout page
            cy.checkUrl("https://www.saucedemo.com/checkout-step-one.html");

            // step 14: verify that left side menu is visible
           cy.get("#react-burger-menu-btn").should("be.visible");

           // step 15: verify that the sign out button is not visible
           cy.get("#logout_sidebar_link").should("not.be.visible");
        });
    });
});
