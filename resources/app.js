
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



const textarea = document.getElementById("noteContent");
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
  addLinkLayout.hidden= !addLinkLayoutVisibility;
});

const notePreview= document.querySelector('#notePreview');
const previewBtn= document.querySelector("#previewBtn");
const previewBtnSvgPreviewOn= document.querySelector('#previewBtnSvgPreviewOn');
const previewBtnSvgPreviewOff= document.querySelector('#previewBtnSvgPreviewOff');

let hidePreview= true;
previewBtn.addEventListener('click', ()=>{

  hidePreview= !hidePreview;
  notePreview.hidden= hidePreview;
  textarea.hidden= !notePreview.hidden;
  console.log(hidePreview);
  let btn_classes={
    'hidden': "btn-secondary",
    'not_hidden': "btn-primary"
  };
  let current_class= null;
  for (const css_class of previewBtn.classList){
    if(css_class.startsWith('btn-')){
      current_class= css_class;
      break;
    }
  };
  
  let btn_class= current_class === btn_classes.hidden ? btn_classes.not_hidden : btn_classes.hidden;
  previewBtn.classList.replace(current_class, btn_class);
  
});

window.addEventListener('load', ()=>{
  addLinkLayout.hidden= true;
  notePreview.hidden= true;
  previewBtn.classList.add("btn-primary");
});