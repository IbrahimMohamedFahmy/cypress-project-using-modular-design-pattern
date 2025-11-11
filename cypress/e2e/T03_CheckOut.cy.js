/// <reference types="cypress" />

// main test suit that include all test cases related to the checkout flow
describe("Checkout Flow", function()
{
    // create global variable to get data from json file
    let userData;

    // create global variables to store the item price and its tax
    var priceNumber;
    var tax;
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

    context("Happy Scenarios", function()
    {
        it("verify that user can go to the checkout page successfully and order his item", function()
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

            // step 11: get the checkout button and verify it is visible and its name is "Checkout"
            cy.get("#checkout").should("be.visible").then((ButtonName)=>
                {
                    expect(ButtonName.text()).to.be.equal("Checkout");
                });
            // step 12: verify that the checkout button redirect to the checkout page step one
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

            // step 18: verify that the url of the second step of the checkout process is true
            cy.checkUrl("https://www.saucedemo.com/checkout-step-two.html");

            // step 19: get the item total price
            cy.get('[data-test="subtotal-label"]').invoke('text').then((text) => 
            {
            const price = text.match(/\d+(\.\d+)?/)[0];
            priceNumber = parseFloat(price);
            });
  
            // step 20: get the item tax
            cy.get('[data-test="tax-label"]').invoke('text').then((text) => 
            {
            const taxValue = text.match(/\d+(\.\d+)?/)[0];
            tax = parseFloat(taxValue);
            });

            // step 21: get the total price and check calculation
            cy.get('[data-test="total-label"]').invoke('text').then((text) => 
            {
                const totalValue = text.match(/\d+(\.\d+)?/)[0];
                var total = parseFloat(totalValue);
                expect(priceNumber+tax).to.be.equal(total);
            });

            // step 22: verify that the finish button is visible 
            cy.get("#finish").should("be.visible").click();

            // step 23: check tha successful message is showen
            cy.xpath("//h2[text()='Thank you for your order!']").should("contain", "Thank you for your order!");

            // step 24: verify that the go back button is exist and redirect to the products page
            cy.get("#back-to-products").should("be.visible").click(); 
        });
    });

    context("Sad Scenarios", function()
    {   
        it("verify that the user can not go to the checkout page without the first name in the step one", function()
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
 
             // step 11: get the checkout button and verify it is visible and its name is "Checkout"
             cy.get("#checkout").should("be.visible").then((ButtonName)=>
                 {
                     expect(ButtonName.text()).to.be.equal("Checkout");
                 });
             // step 12: verify that the checkout button redirect to the checkout page step one
             cy.get("#checkout").click();
 
             // step 13: check the url for checkout page
             cy.checkUrl("https://www.saucedemo.com/checkout-step-one.html");
 
             // step 14: get the text filed for the first name and check it visible
             cy.get("#first-name").should("be.visible");
 
             // step 15: get the text filed for the last name and type a valid last name
             cy.get("#last-name").type(userData.LastName);

             // step 16: get the text filed for the post code and and type a valid post code
             cy.get("#postal-code").type(userData.PostNumber);

             // step 17: verify that the continue button is visible and click in it
            cy.get("#continue").should("be.visible").click();

            // step 18: get the validation for the first name text filed
            cy.xpath("//h3[@data-test='error']").then((validation)=>
                {
                    expect(validation.text()).to.be.equal("Error: First Name is required");
                });
 
        });

        it("verify that the user can not go to the checkout page without the last name in the step one", function()
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
 
             // step 11: get the checkout button and verify it is visible and its name is "Checkout"
             cy.get("#checkout").should("be.visible").then((ButtonName)=>
                 {
                     expect(ButtonName.text()).to.be.equal("Checkout");
                 });
             // step 12: verify that the checkout button redirect to the checkout page step one
             cy.get("#checkout").click();
 
             // step 13: check the url for checkout page
             cy.checkUrl("https://www.saucedemo.com/checkout-step-one.html");
 
             // step 14: get the text filed for the first name and type a valid first name
             cy.get("#first-name").type(userData.FirstName);

             // step 15: get the text filed for the last name and check it visible
             cy.get("#last-name").should("be.visible");

             // step 16: get the text filed for the post code and and type a valid post code
             cy.get("#postal-code").type(userData.PostNumber);

             // step 17: verify that the continue button is visible and click in it
            cy.get("#continue").should("be.visible").click();

            // step 18: get the validation for the first name text filed
            cy.xpath("//h3[@data-test='error']").then((validation)=>
                {
                    expect(validation.text()).to.be.equal("Error: Last Name is required");
                });
 
        });

        it("verify that the user can not go to the checkout page without the post code in the step one", function()
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
 
             // step 11: get the checkout button and verify it is visible and its name is "Checkout"
             cy.get("#checkout").should("be.visible").then((ButtonName)=>
                 {
                     expect(ButtonName.text()).to.be.equal("Checkout");
                 });
             // step 12: verify that the checkout button redirect to the checkout page step one
             cy.get("#checkout").click();
 
             // step 13: check the url for checkout page
             cy.checkUrl("https://www.saucedemo.com/checkout-step-one.html");
 
             // step 14: get the text filed for the first name and type a valid first name
             cy.get("#first-name").type(userData.FirstName);

             // step 15: get the text filed for the last name and type a valid last name
             cy.get("#last-name").type(userData.LastName);

             // step 16: get the text filed for the post code and check it is visible
             cy.get("#postal-code").should("be.visible");

             // step 17: verify that the continue button is visible and click in it
            cy.get("#continue").should("be.visible").click();

            // step 18: get the validation for the first name text filed
            cy.xpath("//h3[@data-test='error']").then((validation)=>
                {
                    expect(validation.text()).to.be.equal("Error: Postal Code is required");
                });
 
        });

        it("verify that user can not order his item without complete the second step", function()
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

            // step 11: get the checkout button and verify it is visible and its name is "Checkout"
            cy.get("#checkout").should("be.visible").then((ButtonName)=>
                {
                    expect(ButtonName.text()).to.be.equal("Checkout");
                });
            // step 12: verify that the checkout button redirect to the checkout page step one
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

            // step 18: verify that the url of the second step of the checkout process is true
            cy.checkUrl("https://www.saucedemo.com/checkout-step-two.html");

            // step 19: verify that item is not ordered if user leaves checkout before finishing
            cy.get("#react-burger-menu-btn").should("be.visible").click();

            // step 20: select the "all items" option
            cy.get("#inventory_sidebar_link").should("be.visible").click();

            // step 21: get product's name
            cy.xpath('//div[text()="Sauce Labs Backpack"]').then((element)=>
                {
                    ProductName = element.text();
                });

             //step 22: go to cart page 
             cy.get(".shopping_cart_link").should("be.visible").click();

             // step 23: check the url of the cart page
             cy.checkUrl("https://www.saucedemo.com/cart.html");

             // step 24: check that the product still exist in the cart and not order yet
            cy.get(".inventory_item_name").then((element)=>
                {
                    let ProductName1 = element.text();
                    expect(ProductName1).to.be.eq(ProductName);
                });
        });
    });
   
});

