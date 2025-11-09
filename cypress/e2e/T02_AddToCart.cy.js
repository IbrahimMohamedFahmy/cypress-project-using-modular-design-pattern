/// <reference types="cypress" />

// main test suit that include all test cases related to the add to cart flow
describe("Add to Cart Flow", function()
{
    // create global variable to get data from json file
    let userData;

    // create global variable to store product name
    let ProductName;

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

    // test suit for add to cart flow happy scenarios
    context("Happy Scenarios", function()
    {
        it("verify that user can add a product to his cart successfully from the add to cart page", function()
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

            // step 7: get product's name
            cy.xpath('//div[text()="Sauce Labs Backpack"]').then((element)=>
                {
                    ProductName = element.text();
                });
             
            // step 8: add that product to the cart
            cy.get("#add-to-cart-sauce-labs-backpack").should("be.visible").click();

            //step 9: go to cart page 
            cy.get(".shopping_cart_link").should("be.visible").click();

            // step 10: check the url of the cart page
            cy.checkUrl("https://www.saucedemo.com/cart.html");

            // step 10: check the product name is match
            cy.get(".inventory_item_name").then((element)=>
                {
                    let ProductName1 = element.text();
                    expect(ProductName1).to.be.eq(ProductName);
                });
        });

        it("verify that the user can go the product's page and add it to cart page successfully", function()
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

            // step 7: get product's name
            cy.xpath('//div[text()="Sauce Labs Backpack"]').then((element)=>
                {
                    ProductName = element.text();
                });
            // Step 8: go to the product's page
            cy.get("#item_4_title_link").should("be.visible").click();

            // step 9: check the url of the product page
            cy.checkUrl("https://www.saucedemo.com/inventory-item.html?id=4");

            // step 10: add that product to the cart
            cy.get("#add-to-cart").should("be.visible").click();

            //step 11: go to cart page 
            cy.get(".shopping_cart_link").should("be.visible").click();

            // step 12: check the product name is match
            cy.get(".inventory_item_name").then((element)=>
                {
                    let ProductName1 = element.text();
                    expect(ProductName1).to.be.eq(ProductName);
                });
        });

        context("Sad Scenarios", function()
        {
            it("should redirect unauthenticated user to login page", function()
            {
                // step 1: user try to access products page during the url
                cy.visit("https://www.saucedemo.com/inventory.html", { failOnStatusCode: false });

                // step 2: check the user will redirect to sign in page
                cy.url().should("eq", "https://www.saucedemo.com/");
            });
              
            it("should not allow adding product without login", function()
            {
                // step 1: user try to access product page during the url
                cy.visit("https://www.saucedemo.com/inventory-item.html?id=4", { failOnStatusCode: false });

                // step 2: verify that the add to cart button not exists 
                cy.get("#add-to-cart").should("not.exist");

                // step 3: check the user will redirect to sign in page
                 cy.url().should("eq", "https://www.saucedemo.com/");
            });
              
        });
    });

    
   
});

