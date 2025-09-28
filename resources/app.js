const textarea = document.getElementById("noteContent");

// dynamic assignment of heading
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



// link upload dynamic width
document.querySelectorAll(".dynamic-width").forEach(input => {
    const baseWidth = 50; // min width in pixels
    const perChar = 25;    // width per character (approx)

    function resize() {
      const length = input.value.length;
      input.style.width = Math.max(baseWidth, length * perChar) + "px";
    }

    input.addEventListener("input", resize);
    resize(); // initialize on page load
  });




  // auto height on textarea input
textarea.addEventListener("input", function () {
this.style.height = "auto";            // reset height
this.style.height = this.scrollHeight + "px"; // set to content height
});



const linkUrl = document.getElementById('linkUrl');
const linkTarName = document.getElementById('linkTarName');

document.querySelector('#submitLinkBtn').addEventListener('click', () => {
  const url = linkUrl.value.length > 0 ? linkUrl.value : '#';
  const name = linkTarName.value.length > 0 ? linkTarName.value : url;

  // Append Markdown link syntax instead of raw <a> tag
  textarea.value += ` [${name}](${url}) `;
});

const addLinkBtn= document.querySelector("#addLinkBtn");
const addLinkLayout= document.querySelector("#addLinkLayout");
let addLinkLayoutVisibility= false;

window.addEventListener('load', ()=>{
  addLinkLayout.hidden= true;
});

addLinkBtn.addEventListener('click', function(){
  addLinkLayoutVisibility = !addLinkLayoutVisibility;
  addLinkLayout.hidden= !addLinkLayoutVisibility;
});

