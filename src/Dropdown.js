import './styles.css';

class Dropdown {
    constructor(elementId, contentArray, options = {}) {
        this.target = document.getElementById(elementId);

        if (this.target === null) {
            console.log(`Element with ID ${elementId} not found!`);
            return;
        }

        const defaultOptions = {
            width: "fit",
            stayOpenOnSelect: false,
        };

        const finalOptions = {...defaultOptions, ...options};

        this.target.classList.add("dropdown");
        this.button = document.createElement("button");
        this.button.classList.add("dropdown-button");
        this.button.textContent = this.target.textContent;
        this.target.textContent = "";
        this.content = document.createElement("div");
        this.content.classList.add("dropdown-content");
        this.target.append(this.button, this.content);

        const dropdownItems = [];

        contentArray.forEach((item) => {
            const contentItem = document.createElement("a");
            contentItem.textContent = item;
            this.content.appendChild(contentItem);
            dropdownItems.push(contentItem);
        });

        this.button.addEventListener("click", this.toggleDropdown);

        if (finalOptions.width === "inherit") {
            this.target.classList.add("options-width-inherit");
            this.content.classList.add("options-width-inherit");
        }

        if (finalOptions.stayOpenOnSelect === true) {
            dropdownItems.forEach((item) => item.classList.add("stay-open-on-select"));
        }
    }

    toggleDropdown(event) {
        const menu = event.target.nextElementSibling;

        if (Dropdown.currentOpenMenu && Dropdown.currentOpenMenu !== menu) {
            Dropdown.currentOpenMenu.classList.remove("open");
        }

        menu.classList.toggle("open");
        Dropdown.currentOpenMenu = menu;
    }

    setLinks(linksArray) {
        if (!Array.isArray(linksArray)) {
            console.log("input is not an array");
            return;
        }

        const items = this.content.querySelectorAll("a");

        if (linksArray.length > items.length) {
            console.log("input has more links than expected, ignoring extras");
        }
        if (linksArray.length < items.length) {
            console.log("input has fewer links than expected");
        }

        for (let i = 0; i < Math.min(linksArray.length, items.length); i++) {
            if (linksArray[i] != "") {
                items[i].href = linksArray[i];
            }
        }
    }
}

Dropdown.currentOpenMenu = null;

document.addEventListener("click", closeDropdown);

function closeDropdown(event) {
    if (!event.target.classList.contains("dropdown-button") && !event.target.classList.contains("stay-open-on-select")) {
        let elements = document.getElementsByClassName("dropdown-content");
        Array.from(elements).forEach((element) => {
            element.classList.remove("open");
        });
    }
}

export default Dropdown;