const Dropdown = require('../../po/components/dropdown.component.js');
const testData = require('../../po/data/testdata.js');
const PastebinPage = require('../../po/pages/pastebin.page.js');
const pastebinNewPage = require('../../po/pages/pastebinNew.page.js');

describe("WebdriverIO Test", () => {

    beforeEach(async () => {
        const pastebinPage = new PastebinPage();
        await pastebinPage.open();
    });
    
    afterEach(async () => {
        await browser.reloadSession();
    });

    describe("Task 1: Create a paste and verify it", () => {
        it("Create a new paste with the following parameters: Title: helloweb, Code: Hello from WebDriver, Expiration: 10 Minutes", async () => {  
            const pastebinPage = new PastebinPage(); //Initialize the PastebinPage object  
            
            // Input the code for the paste
            await pastebinPage.setCode(testData.codeText);

            // Set the expiration to 10 minutes
            await pastebinPage.setExpiration(testData.expirationText);
            
            //imput the title for the paste
            await pastebinPage.setTitle(testData.Title); 
            
            // Verify the code input
            const actualCode = await pastebinPage.codeInput.getValue();
            await expect(actualCode).toEqual(testData.codeText);
            
            // Verify the title input
            const actualTitle = await pastebinPage.titleInput.getValue();
            await expect(actualTitle).toEqual(testData.Title);
            
            // Verify the expiration selection
            const selectedOption = await pastebinPage.expirationDropdown.selectedText();
            await expect(selectedOption).toEqual(testData.expirationText);
            
            // Click on the "Create New Paste" button
            await pastebinPage.createPaste();
            
            // Verification to ensure the paste was created
            await browser.pause(2000);
            const newPasteUrl = await pastebinPage.getCurrentUrl();
            console.log(`New Paste URL: ${newPasteUrl}`);
        });
    });

    describe("Task 2: create a new paste adding diferent values", () => {
        it("Create a new paste with the following parameters: Title: how to gain dominance among developers, Code: git , Expiration: 10 Minutes, syntax HL: Bash", async () => {
            const pastebinPage = new PastebinPage();

             // Input the code for the paste
            await pastebinPage.setCode(testData.codeText2);

            // Set the expiration to 10 minutes
            await pastebinPage.setExpiration(testData.expirationText);

            // Select syntax highlighting and verify it
            const syntaxDropdown = new Dropdown('#select2-postform-format-container', '.select2-search__field');
            await syntaxDropdown.SelectByVisibleText('Bash');
            
            //imput the title for the paste
            await pastebinPage.setTitle(testData.Title2); 
            
            // Click on the "Create New Paste" button
            await pastebinPage.createPaste();

            // Verification to ensure the paste was created
            await browser.pause(2000);
            const newPasteUrl = await pastebinPage.getCurrentUrl();
            console.log(`New Paste URL: ${newPasteUrl}`);

            // Initialize the new paste page
            //const pasteNewPage = new pastebinNewPage(testData.pastebinwebtest);//this one oppen an already create paste url for testing 
            const pasteNewPage = new pastebinNewPage(newPasteUrl);// this one captures the new create paste url and open it 
            
            //open a new page
            await pasteNewPage.open();
            
            await browser.pause(2000);
            // Verify the paste code content
            const actualCode = await pasteNewPage.getPasteContent();
            await expect(actualCode).toEqual(testData.codetest);

            // Verify the paste page title
            const actualTitle = await pasteNewPage.getPageTitle();
            await expect(actualTitle).toEqual(testData.Title2+" - Pastebin.com");

            //Verify the paste syntax
            const actualSyntax = await pasteNewPage.getSyntax();
            await expect(actualSyntax).toEqual(testData.syntaxText);
            
        })
    })    
});