const Dropdown = require('../../po/components/dropdown.component.js');
const testData = require('../../po/data/testdata.js');
const PastebinPage = require('../../po/pages/pastebin.page.js');

describe("WebdriverIO Test", () => {

    beforeEach(async () => {
        await browser.url("https://pastebin.com/");
    });
    
    afterEach(async () => {
        await browser.reloadSession();
    });

    describe("Task 1: Create a paste and verify it", () => {
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
            expect(selectedOption).toEqual(testData.expirationText);
            
            // Click on the "Create New Paste" button
            await pastebinPage.createPaste();
            
            // Verification to ensure the paste was created
            //await browser.pause(5000);
            const newPasteUrl = await pastebinPage.getCurrentUrl();
            console.log(`New Paste URL: ${newPasteUrl}`); // Log the URL of the new paste
        });
    });

    describe("Task 2: create a new paste adding diferent values", () => {
        it("Create a new paste with the following parameters: Title: how to gain dominance among developers, Code: git , Expiration: 10 Minutes, syntax HL: Bash", async () => {
            const pastebinPage = new PastebinPage(); //Initialize the PastebinPage object
            
            // Input the code for the paste
            await pastebinPage.setCode(testData.codeText2);
            
            //imput the title for the paste
            await pastebinPage.setTitle(testData.Title2); 
            
            // Set the expiration to 10 minutes
            await pastebinPage.setExpiration(testData.expirationText);

            // Select syntax highlighting and verify it
            const syntaxDropdown = new Dropdown('#select2-postform-format-container', '.select2-search__field');
            await syntaxDropdown.SelectByVisibleText('Bash');
            
            // Click on the "Create New Paste" button
            await pastebinPage.createPaste();

            // Verification to ensure the paste was created
            await browser.pause(8000);
            const newPasteUrl = await pastebinPage.getCurrentUrl();
            console.log(`New Paste URL: ${newPasteUrl}`); // Log the URL of the new paste
        })
    })    
});