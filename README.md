# 🧪 Cypress E2E Testing Project – SauceDemo Automation

## 📌 Overview
This project is a **Cypress end-to-end automation framework** built using the **Modular Design Pattern**.  
It covers complete test flows for the [SauceDemo](https://www.saucedemo.com/) web application, including sign-in, add-to-cart, checkout, and sign-out functionalities.

---
## 🧱 Project Structure
``` 
📦 project-root
├── cypress
│   ├── e2e
│   │   ├── T01_SignIn.cy.js          # Test cases for Sign-In flow
│   │   ├── T02_AddToCart.cy.js       # Test cases for Add to Cart flow
│   │   ├── T03_CheckOut.cy.js        # Test cases for Checkout flow
│   │   ├── T04_SignOut.cy.js         # Test cases for Sign Out flow
│   ├── fixtures
│   │   └── testData.json             # Contains test data (username, password, etc.)
│   ├── reports                       # Contains test execution reports
│   └── support
│       ├── commands.js               # Custom Cypress commands (openDemo, checkUrl, login)
│       └── e2e.js                    # Cypress global configuration
├── cypress.config.js                 # Main Cypress configuration file
├── package.json                      # Project dependencies and scripts
└── README.md                         # Project documentation
``` 
---

## ⚙️ Installation and Setup

1️⃣ Clone the repository
```bash
git clone https://github.com/IbrahimMohamedFahmy/cypress-project-using-modular-design-pattern
cd <project-folder>

2️⃣ Install dependencies
npm install

3️⃣ Run the tests
npx cypress open

🧠 Design Pattern: Modular Design

Each flow (Sign-In, Add to Cart, Checkout, Sign Out) is written as an independent module to:

Increase reusability.

Simplify maintenance.

Allow refactoring without breaking other flows.

Reusable commands like cy.openDemo(), cy.checkUrl() are stored in support/commands.js for DRY (Don’t Repeat Yourself) principles.

🧾 Reporting

Test results are automatically generated and saved inside:

/cypress/reports


You can integrate it later with tools like:

Mochawesome (for HTML reports)

💡 Best Practices Followed

Using before() and beforeEach() hooks for setup and configuration.

Using fixture files for test data management.

Applying assertions for both functional validations.

Clear naming convention for test cases (T01, T02, …).

Following modular and scalable structure.

Added both Happy and Sad test scenarios for full coverage.

🧑‍💻 Author

Engineer Ibrahim Omran (QA Automation Engineer)
Passionate about software quality, automation, and continuous improvement.

📅 Last Updated

November 2025
