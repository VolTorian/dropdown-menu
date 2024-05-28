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

        this.button.addEventListener("click", this.toggleDropdown);
    }

    toggleDropdown(event) {
        const menu = event.target.nextElementSibling;

        if (Dropdown.currentOpenMenu && Dropdown.currentOpenMenu !== menu) {
            Dropdown.currentOpenMenu.classList.remove("open");
        }

        menu.classList.toggle("open");
        Dropdown.currentOpenMenu = menu;
    }
}

Dropdown.currentOpenMenu = null;

document.addEventListener("click", closeDropdown);

function closeDropdown(event) {
    if (!event.target.classList.contains("dropdown-button")) {
        let elements = document.getElementsByClassName("dropdown-content");
        Array.from(elements).forEach((element) => {
            element.classList.remove("open");
        });
    }
}

export default Dropdown;