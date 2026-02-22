 
const theme = "theme";
const dataTheme = "data-theme"
const themeTab = ".theme-tab";
const switcherBtn = ".switcher-btn";
const dark = "dark";
const light = "light";
const open = "open";
const active = "active";


const modelOpen = "[data-open]";
const modelClose = "[data-Close]";
const isVisible = "is-visible";

const root = document.documentElement;

//Theme
const toggleTheme = document.querySelector(themeTab)
const switcher = document.querySelectorAll(switcherBtn);
const currentTheme = localStorage.getItem(theme);

/*Model*/

const openModel = document.querySelectorAll(modelOpen);
const closeModel = document.querySelectorAll(modelClose);

const setActive = (elm, selector) => {
  if (document.querySelector(`${selector}.${active}`) !=null) {
    document.querySelector(`${selector}.${active}`).classList.remove(active);
  } else {
    elm.classList.add(active);
  }
} 

toggleTheme.addEventListener("click", function() {
  const tab = this.parentElement.parentElement;
  if (!tab.className.includes(open)) {
    tab.classList.add(open);
  } else {
    tab.classList.remove(open);
  }
});

for (const elm of switcher) {
  elm.addEventListener("click", function() {
    const toggle = this.dataset.toggle;
    setActive(elm, switcherBtn);
  })
}


// Full Site Model "open buttons"...

for (const elm of openModel) {
  elm.addEventListener("click", function() {
    const modelId = this.dataset.open;
    document.getElementById(modelId).classList.add(isVisible);
  })
}

for (const elm of closeModel) {
  elm.addEventListener("click", function() {
    this.parentElement.parentElement.classList.remove(isVisible);
  })
}