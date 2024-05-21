class PastebinNewPage {
    
    constructor(url) {
        this.url = url;
    }
    async open() {
        await browser.url(this.url);
    }
    async getPasteContent() {
        const codeElement = await browser.$('//ol[@class="bash"]/li[@class="li1"][2]/div[@class="de1"]');
        return await codeElement.getText();
    }
    async getSyntax() {
        const syntaxElement = await browser.$('div.left > a.btn.-small.h_800');
        return await syntaxElement.getText();
    }
    async getPageTitle() {
        return await browser.getTitle();
    }
}

module.exports = PastebinNewPage;