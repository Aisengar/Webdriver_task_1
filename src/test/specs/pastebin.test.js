//const { Key } = require('webdriverio');

const testData = require('../../po/data/testdata.js');


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
            const codeText = testData.codeText;
            await codeInput.setValue(codeText);
    
            // Input the title for the paste
            const titleInput = await browser.$('[name="PostForm[name]"]');
            const expectedTitle = testData.expectedTitle;
            await titleInput.setValue(expectedTitle);
    
            // Set the expiration to 10 minutes
            const dropdown = await browser.$('#select2-postform-expiration-container');
            await dropdown.click();
            const optionElement = await browser.$('//li[contains(text(), "10 Minutes")]');
            await optionElement.click();

            // Verify the code input
            const actualCode = await codeInput.getValue();
            expect(actualCode).toEqual(codeText);
    
            // Verify the title input
            const actualTitle = await titleInput.getValue();
            console.log(`Actual Title: ${actualTitle}`); // Log the actual title
            expect(actualTitle).toEqual(expectedTitle);
    
            // Verify the expiration selection
            const selectedOption = await dropdown.getText();
            console.log(`Selected Option: ${selectedOption}`); // Log the selected option
            expect(selectedOption).toHaveText("10 Minutes");
    
            // Click on the "Create New Paste" and wait for 2 seconds so we can check if the paste data is okay
            await browser.pause(2000);
            const createButton = await browser.$('button.btn.-big[type="submit"]');
            await createButton.click();
    
            // Verification to ensure the paste was created
            await browser.pause(2000);
            const newPasteUrl = await browser.getUrl();
            console.log(`New Paste URL: ${newPasteUrl}`); // Log the URL of the new paste
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