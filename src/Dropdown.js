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
            allowHTML: false,
            content: "",
            openType: "click",
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

        
        if (finalOptions.openType === "hover") {
            this.button.addEventListener("mouseenter", this.openDropdown);
            // this.target.classList.add("open-type-hover");
            dropdownItems.forEach((item) => item.classList.add("open-type-hover"));
        }
        else {
            this.button.addEventListener("click", this.toggleDropdown);
        }

        if (finalOptions.width === "inherit") {
            this.target.classList.add("options-width-inherit");
            this.content.classList.add("options-width-inherit");
        }

        if (finalOptions.stayOpenOnSelect === true) {
            dropdownItems.forEach((item) => item.classList.add("stay-open-on-select"));
        }

        if (finalOptions.allowHTML === true && finalOptions.content !== "") {
            this.button.innerHTML = finalOptions.content;
        }
    }

    openDropdown(event) {
        const menu = event.currentTarget.nextElementSibling;

        if (Dropdown.currentOpenMenu && Dropdown.currentOpenMenu !== menu) {
            Dropdown.currentOpenMenu.classList.remove("open");
        }

        menu.classList.add("open");
        Dropdown.currentOpenMenu = menu;
    }

    toggleDropdown(event) {
        const menu = event.currentTarget.nextElementSibling;

        if (Dropdown.currentOpenMenu && Dropdown.currentOpenMenu !== menu) {
            Dropdown.currentOpenMenu.classList.remove("open");
        }

        menu.classList.toggle("open");
        if (menu.classList.contains("open")) {
            Dropdown.currentOpenMenu = menu;
        }
        else {
            Dropdown.currentOpenMenu = null;
        }
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
                items[i].target = "_blank";
                items[i].rel = "no referrer noopener";
            }
        }
    }
}

Dropdown.currentOpenMenu = null;

document.addEventListener("click", closeClickDropdowns);
document.addEventListener("mouseover", closeHoverDropdowns);

function closeClickDropdowns(event) {
    let targetElement = event.target;
    let isDropdownButton = false;
    let hasStayOpenProp = false;
    while (targetElement) {
        if (targetElement.classList) {
            if (targetElement.classList.contains("dropdown-button")) {
                isDropdownButton = true;
            }
            if (targetElement.classList.contains("stay-open-on-select")) {
                hasStayOpenProp = true;
            }
        }

        if (isDropdownButton && hasStayOpenProp) {
            break;
        }
        targetElement = targetElement.parentElement;
    }
    
    if (!isDropdownButton && !hasStayOpenProp) {
        let elements = document.getElementsByClassName("dropdown-content");
        Array.from(elements).forEach((element) => {
            element.classList.remove("open");
        });
        Dropdown.currentOpenMenu = null;
    }
}

function closeHoverDropdowns(event) {
    let targetElement = event.target;
    if (!targetElement.classList.contains("open-type-hover")) {
        let elements = document.getElementsByClassName("dropdown-content");
        Array.from(elements).forEach((element) => {
            element.classList.remove("open");
        });
        Dropdown.currentOpenMenu = null;
    }
}

export default Dropdown;