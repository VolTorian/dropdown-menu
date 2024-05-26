import './styles.css';

class Dropdown {
    constructor(elementId, contentArray) {
        this.target = document.getElementById(elementId);

        if (this.target === null) {
            console.log(`Element with ID ${elementId} not found!`);
            return;
        }

        this.target.classList.add("dropdown");
        this.button = document.createElement("button");
        this.button.classList.add("dropdown-button");
        this.button.textContent = this.target.textContent;
        this.target.textContent = "";
        this.content = document.createElement("div");
        this.content.classList.add("dropdown-content");
        this.target.append(this.button, this.content);

        contentArray.forEach((item) => {
            const contentItem = document.createElement("div");
            contentItem.textContent = item;
            this.content.appendChild(contentItem);
        });
    }
}

export default Dropdown;