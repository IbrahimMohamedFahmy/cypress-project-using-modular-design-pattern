/// <reference types = "cypress"/>

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
    context("happy scenarios", function()
    {
        it("test", function()
        {
            cy.visit("https://www.saucedemo.com/");

        });
    });

    // test suit for sign in flow sad scenarios
    context("sad scenarios", function()
    {
        
    });
});