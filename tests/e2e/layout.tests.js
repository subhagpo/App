describe('Define your Suite', function() {  
 
    it('Define your Spec', function() {
        // wait for the splash screen.
        browser.driver.sleep(7000);
        
        var loginButton = element(by.id("login"));
        loginButton.click();
        
        // show the FB account screen
        browser.driver.sleep(7000);
        
        // validate that the viewport is not null.
        var viewport = element(by.id("viewport"));
        expect(viewport).not.toBe(null);
    })
});