// import './styles.css';
import Dropdown from "./Dropdown.js";

const dropdown = document.getElementById("dropdown-test");
dropdown.onclick = toggleDropdown;
document.addEventListener("click", closeDropdown);

const dropdown2 = new Dropdown("module-test", ["item 1", "only strings", "for now", "lol"]);

function toggleDropdown(event) {
    event.target.nextElementSibling.classList.toggle("open");
}

function closeDropdown(event) {
    if (!event.target.classList.contains("dropdown-button")) {
        let elements = document.getElementsByClassName("dropdown-content");
        Array.from(elements).forEach((element) => {
            element.classList.remove("open");
        });
    }
}