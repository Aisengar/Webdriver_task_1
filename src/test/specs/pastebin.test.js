//const { Key } = require('webdriverio');

const testData = require('../../po/data/testdata.js');
const PastebinPage = require('../../po/pages/pastebin.page.js');

describe("WebdriverIO Test", () => {

    beforeEach(async () => {
        await browser.url("https://pastebin.com/");
    });
    
    afterEach(async () => {
        await browser.reloadSession();
    });

    describe("Create a new Paste", () => {
        it("Create a new paste with the following parameters: Title: helloweb, Code: Hello from WebDriver, Expiration: 10 Minutes", async () => {  
            const pastebinPage = new PastebinPage(); //Initialize the PastebinPage object  
            // Input the code for the paste
            await pastebinPage.setCode(testData.codeText);
            //imput the title for the paste
            await pastebinPage.setTitle(testData.Title); 
            // Set the expiration to 10 minutes
            await pastebinPage.setExpiration(testData.expirationText);

            // Verify the code input
            const actualCode = await pastebinPage.codeInput.getValue();
            expect(actualCode).toEqual(testData.codeText);
    
            // Verify the title input
            const actualTitle = await pastebinPage.titleInput.getValue();
            expect(actualTitle).toEqual(testData.Title);
    
            // Verify the expiration selection
            const selectedOption = await pastebinPage.expirationDropdown.selectedText();
            console.log(selectedOption);
            expect(selectedOption).toEqual(testData.expirationText);
    
            // Click on the "Create New Paste" and wait for 2 seconds so we can check if the paste data is okay
            await browser.pause(2000);
            await pastebinPage.createPaste();
    
            // Verification to ensure the paste was created
            await browser.pause(5000);
            const newPasteUrl = await pastebinPage.getCurrentUrl();
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