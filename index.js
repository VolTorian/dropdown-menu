const dropdown = document.getElementById("dropdown-test");
dropdown.onclick = toggleDropdown;

function toggleDropdown(event) {
    event.target.nextElementSibling.classList.toggle("open");
}