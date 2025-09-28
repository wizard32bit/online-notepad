const textarea = document.getElementById("noteContent");

textarea.addEventListener("input", function () {
this.style.height = "auto";            // reset height
this.style.height = this.scrollHeight + "px"; // set to content height
});


const dropdownButton = document.querySelector('.dropdown-toggle'); 
const dropdownItems = document.querySelectorAll('.dropdown-item');
const headingInput= document.querySelector('#heading');
dropdownItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        // Replace button content with the clicked item's content (SVG)
        dropdownButton.innerHTML = item.innerHTML;
        headingInput.value= item.id;
        console.log(headingInput.value);

    });
});
