const Dropdown = require('../components/dropdown.component');

class PastebinPage {
    // Selectors
    get codeInput() { return $('[name="PostForm[text]"]'); }
    get titleInput() { return $('[name="PostForm[name]"]'); }
    get createButton() { return $('button.btn.-big[type="submit"]'); }

    // Initialize dropdown component
    expirationDropdown = new Dropdown('#select2-postform-expiration-container', '//li[contains(text(), "10 Minutes")]');

    // Methods
    async open() {
        await this.codeInput.setValue(title);
    }

    async setCode() {
        await this.codeInput.setValue(code);
    }
    async setExpiration(expirationText) {
        await this.expirationDropdown.SelectByVisibleText(expirationText);
    }
    async createButton(){
        await this.createButton.click();
    }
    async getCurrentUrl() {
        return await browser.getUrl();
    }
}