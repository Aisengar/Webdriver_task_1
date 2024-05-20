class Dropdown{
    constructor(containerSelector, optionSelector){
        this.containerSelector = $(containerSelector);
        this.optionSelector = optionSelector;
    }

    async SelectByVisibleText(text) {
        await this.containerSelector.click();  
        const optionElement = await $(`//li[contains(text(), "${text}")]`);
        await optionElement.click();
    }
    async selectedText(){
        return this.containerSelector.getText();
    }

}

module.exports = Dropdown;