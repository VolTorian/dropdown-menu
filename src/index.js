import './styles.css';

const dropdown = document.getElementById("dropdown-test");
dropdown.onclick = toggleDropdown;
document.addEventListener("click", closeDropdown);

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