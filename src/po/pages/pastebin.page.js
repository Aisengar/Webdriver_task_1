const Dropdown = require('../components/dropdown.component');


class PastebinPage {

    get codeInput() { return $('[name="PostForm[text]"]'); }
    get titleInput() { return $('[name="PostForm[name]"]'); }
    get createButton() { return $('button.btn.-big[type="submit"]'); }

 
    constructor() {
        this.expirationDropdown = new Dropdown('#select2-postform-expiration-container', '//li[contains(text(), "10 Minutes")]');
    }

    async open() {
        await browser.url('https://pastebin.com/');
    }

    async setCode(code) {
        await this.codeInput.setValue(code);
    }

    async setTitle(title) {
        await this.titleInput.setValue(title);
    }

    async setExpiration(expirationText) {
        await this.expirationDropdown.SelectByVisibleText(expirationText);
    }

    async createPaste() {
        await this.createButton.click();
    }

    async getCurrentUrl() {
        return await browser.getUrl();
    }
}

module.exports = PastebinPage;