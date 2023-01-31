const {I,loginPage} = inject();

Given('Im on the right page', () => {
    loginPage.visit()
});

When('I fill the form with my email and password', () => {
    loginPage.login('carlos.jest@udea.edu.co','a1b2c3d4')
});

Then('I should see the dashboard page', () => {
    loginPage.validateLogin()
});

