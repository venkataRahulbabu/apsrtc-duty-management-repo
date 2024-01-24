// function myFunc(){
//     alert("Backend part is not yet ready...");
// }

// function mySub(){
//     alert("Won't take the email until backend is ready...");
// }

// var numberOfButtons=document.querySelectorAll(".download-button").length;
// for(var i=0;i<numberOfButtons;i++){
//     document.querySelectorAll(".download-button")[i].addEventListener("click",myFunc);
// }

// document.querySelector(".subscribe").addEventListener("click",mySub);

// $(".download").click(function (){
//     $("p.para").slideToggle();
//     $("p.para").text("You can't download it😂").css({marginLeft:"50px",fontSize:"1.5rem"}).show();
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const toggleButton = document.querySelector('[data-collapse-toggle="navbar-default"]');
//     const mobileMenu = document.getElementById('navbar-default');

//     toggleButton.addEventListener('click', () => {
//         mobileMenu.classList.toggle('hidden');
//     });
// });


document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('menu').classList.toggle('hidden');
});

document.getElementById('dropdown-toggle').addEventListener('click', function () {
    document.getElementById('dropdown-menu').classList.toggle('hidden');
});


document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector('[data-collapse-toggle="navbar-default"]');
    const mobileMenu = document.getElementById('navbar-default');

    toggleButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});

// Function to close the alert box
function closeAlertBox() {
    const alertBox = document.getElementById('alertbox');
    if (alertBox) {
        alertBox.style.display = 'none';
    }
}

// Attach click event to the close button
const closeAlertButton = document.querySelector('.closealertbutton');
if (closeAlertButton) {
    closeAlertButton.addEventListener('click', closeAlertBox);
}


