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
addLinkBtn.addEventListener('click', function(){
  addLinkLayoutVisibility = !addLinkLayoutVisibility;
  if(!addLinkLayoutVisibility) addLinkLayout.remove();
  else document.appendChild(addLinkLayout);
});

const imageBtn= document.querySelector('#imageBtn');
const imageInputLayout= document.querySelector('#imageInputLayout');

let imageInputLayoutVisiblity= false;
imageBtn.addEventListener('click', ()=>{
  imageInputLayoutVisiblity= !imageInputLayoutVisiblity;
  imageInputLayout.hidden= !imageInputLayoutVisiblity;
});