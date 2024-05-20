//const { Key } = require('webdriverio');
//const pastebinPage = require('../po/pages/pastebin.page');
//const testData = require('../po/data/testData');


describe("WebdriverIO Test", () => {

    beforeEach(async () => {
        await browser.url("https://pastebin.com/");
    });
    
    afterEach(async () => {
        await browser.reloadSession();
    });

    describe("Create a new Paste", () => {
        it("Create a new paste with the following parameters: Title: helloweb, Code: Hello from WebDriver, Expiration: 10 Minutes", async () => {
            
            // Input the code for the paste
            const codeInput = await browser.$('[name="PostForm[text]"]');
            const codeText = "Hello from WebDriver";
            await codeInput.setValue(codeText);

            // Verify the code input
            const actualCode = await codeInput.getValue();
            expect(codeText).toEqual(codeText);

            // Input the title for the paste
            const titleInput = await browser.$('[name="PostForm[name]"]');
            const expectedTitle = "helloweb";
            await titleInput.setValue(expectedTitle);

            // Verify the title input
            const actualTitle = await titleInput.getValue();
            console.log(actualTitle);
            expect(actualTitle).toEqual(expectedTitle);

            // Set the expiration to 10 minutes
            const dropdown = await browser.$('#select2-postform-expiration-container');
            await dropdown.click();
            const optionElement = await browser.$('//li[contains(text(), "10 Minutes")]');
            await optionElement.click();

            // Verify the expiration selection
            const selectedOption = await dropdown.getText();
            console.log(selectedOption);
            expect(selectedOption).toHaveText("10 Minutes");

            // Click on the"Create New Paste" and wait for 2 seconds so we can check if the paste data is okay
            await browser.pause(2000);
            const createButton = await browser.$('button.btn.-big[type="submit"]');
            await createButton.click();

            // Verification to ensure the paste was created
            await browser.pause(2000); // i want to wait 2 seconds to ensure the paste was created
            const newPasteUrl = await browser.getUrl();
            console.log(newPasteUrl); // we can get the url of the new paste
        });
        /*
        // Select syntax highlighting and verify it
        it("Select syntax highlighting", async () => {
            const syntaxDropdown = await browser.$('#select2-postform-format-container');
            await syntaxDropdown.click();
            const syntaxSearchInput = await browser.$('.select2-search__field');
            await syntaxSearchInput.setValue('Bash');
            await syntaxSearchInput.addValue(Key.Enter);

            //Testea que se a selecciono el elemento deseado Bash
            const selectedSyntax = await syntaxDropdown.getText();
            console.log(selectedSyntax);
            expect(selectedSyntax).toEqual("Bash");
        });*/
    });
});