// import './styles.css';
import Dropdown from "./Dropdown.js";

const dropdown1 = new Dropdown("dropdown1", ["item 1", "only strings", "for now", "lol"], {width:"inherit"});
const dropdown2 = new Dropdown("dropdown2", ["item 1", "only strings", "for now", "lol"], {stayOpenOnSelect:true});
const dropdown3 = new Dropdown("dropdown3", ["second dropdown", "item 2", "testing"], {allowHTML:true, content:"<strong>I'm BOLD</strong>", stayOpenOnSelect:true});
dropdown3.setLinks(["", "https://www.youtube.com", "https://github.com", "https://twitter.com"]);