/// <reference types="cypress" />

// main test suit that include all test cases related to the checkout flow
describe("Add to Cart Flow", function()
{
    // create global variable to get data from json file
    let userData;

    // create global variables to store the item price and its tax
    var priceNumber;
    var tax;

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

    // test suit for checkout flow happy scenarios
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

    });
   
});

