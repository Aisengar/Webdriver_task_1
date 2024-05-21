class PastebinNewPage {
    // Constructor to accept the URL of the new paste
    constructor(url) {
        this.url = url;
    }
    // Method to open the paste page
    async open() {
        await browser.url(this.url);
    }
    // Method to get the paste content
    async getPasteContent() {
        const codeElement = await browser.$('//ol[@class="bash"]/li[@class="li1"][2]/div[@class="de1"]');
        return await codeElement.getText();
    }
    // Method to get the paste title
    async getSyntax() {
        const syntaxElement = await browser.$('div.left > a.btn.-small.h_800');
        return await syntaxElement.getText();
    }
    async getPageTitle() {
        return await browser.getTitle();
    }
}

module.exports = PastebinNewPage;