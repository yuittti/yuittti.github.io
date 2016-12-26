//Open/Close side menu with <details> elements (#mobNav) in 340px view mode

var mainNavEl = document.getElementById("mobNav");

function closeSideMenu(){
    mainNavEl.style.left = "-90.18%";
    mainNavEl.className = "";
};

// Open/Close side menu when clicked
// ---------------------------------
mainNavEl.addEventListener("click", function(e){
    if (this == e.target && window.innerWidth <= 340) {
        if (mainNavEl.className){
            closeSideMenu();
        } else {
            mainNavEl.style.left = 0;
            mainNavEl.className = "nav-open";
        }
    }
});

// Close menu when window outside menu was clicked
// -----------------------------------------------
document.addEventListener("click", function(e){
    var navContent = String(mainNavEl.innerText);
    var target = e.target;
    if (e.target != mainNavEl
            && (navContent.indexOf(target.innerText) == -1)
            && window.innerWidth <= 340
            && mainNavEl.className) {
        closeSideMenu();
    }
});
