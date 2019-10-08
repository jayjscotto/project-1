<<<<<<< HEAD
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}
=======
//comment


console.log("hello World!!!")

//counts from one up to ten
function count() {
    for (let i = 0; i < 10; i ++) {
        console.log(i);
    }
} 

//call count function
count();
>>>>>>> bd20ca846f5123479e330295981d9edbd0fd6787
