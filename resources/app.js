
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
["input", "change"].forEach(event =>
  textarea.addEventListener(event, ()=>{
  notePreview.innerHTML = DOMPurify.sanitize(marked.parse(textarea.value));
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
})
);



const linkUrl = document.getElementById('linkUrl');
const linkTarName = document.getElementById('linkTarName');

document.querySelector('#submitLinkBtn').addEventListener('click', () => {
  const url = linkUrl.value.length > 0 ? DOMPurify.sanitize(linkUrl.value) : '#';
  const name = linkTarName.value.length > 0 ? DOMPurify.sanitize(linkTarName.value) : url;

  textarea.value += `<a href="${linkUrl.value}" target="_blank" rel="noopener noreferrer" id="linkAdd_BlankTo">${linkTarName.value}</a><br>`;
  // test this before committing
  
  notePreview.innerHTML = DOMPurify.sanitize(marked.parse(textarea.value));
  
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
});

const addLinkBtn= document.querySelector("#addLinkBtn");
const addLinkLayout= document.querySelector("#addLinkLayout");
const addLinkBtnSubmit= document.querySelector("#addLinkBtnSubmit");
let addLinkLayoutVisibility= false;


addLinkBtn.addEventListener('click', function(){
  addLinkLayoutVisibility = !addLinkLayoutVisibility;
  addLinkLayout.hidden= !addLinkLayoutVisibility;
});

addLinkBtnSubmit.addEventListener('click', ()=>{
  notePreview.innerHTML = DOMPurify.sanitize(marked.parse(textarea.value));

  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
  previewBtn.click();
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
<<<<<<< Updated upstream
  
=======

  notePreview.innerHTML = DOMPurify.sanitize(marked.parse(textarea.value));
  textarea.style.height = "auto";
  textarea.style.height = textarea.scrollHeight + "px";
>>>>>>> Stashed changes
});

window.addEventListener('load', ()=>{
<<<<<<< Updated upstream
  addLinkLayout.hidden= true;
  notePreview.hidden= true;
  previewBtn.classList.add("btn-primary");
=======
  addLinkLayout.hidden= notePreview.hidden= true;
  previewBtn.classList.add("btn-secondary");
});

const fullScreenBtn= document.querySelector('#fullScreenBtn');
fullScreenBtn.addEventListener('click', ()=>{
  let innerSvg= null;
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen();
    innerSvg= `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 21v-3H3v-2h5v5zm10 0v-5h5v2h-3v3zM3 8V6h3V3h2v5zm13 0V3h2v3h3v2z"/></svg>`;
  }else{
    document.exitFullscreen();
    innerSvg= `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-5h2v3h3v2zm13 0v-2h3v-3h2v5zM3 8V3h5v2H5v3zm16 0V5h-3V3h5v5z"/></svg>`;
  }
  document.querySelector('#fullScreenBtnSvgContainer').innerHTML= innerSvg;
});

document.addEventListener('fullscreenchange', ()=>{
  document.querySelector('#fullScreenBtnSvgContainer').innerHTML= !document.fullscreenElement 
                                                                  ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-5h2v3h3v2zm13 0v-2h3v-3h2v5zM3 8V3h5v2H5v3zm16 0V5h-3V3h5v5z"/></svg>`
                                                                  : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 21v-3H3v-2h5v5zm10 0v-5h5v2h-3v3zM3 8V6h3V3h2v5zm13 0V3h2v3h3v2z"/></svg>` ;
});

const noteShareBtn= document.querySelector('#noteShareBtn');
const noteShareBtnSvgContainer= document.querySelector('#noteShareBtnSvgContainer');
const noteShareBtnSpan= document.querySelector('#noteShareBtnSpan');
let is_personnal= true;

noteShareBtn.addEventListener('click', ()=>{
  is_personnal= !is_personnal;
  noteShareBtnSpan.textContent= is_personnal ? "Personel" : "Publique";
  noteShareBtnSvgContainer.innerHTML= is_personnal  ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"/></svg>`
                                                    : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m-2.5-8.5q1.45 0 2.475-1.025T13 10t-1.025-2.475T9.5 6.5T7.025 7.525T6 10t1.025 2.475T9.5 13.5m7 1q1.05 0 1.775-.725T19 12t-.725-1.775T16.5 9.5t-1.775.725T14 12t.725 1.775t1.775.725M12 20q2.125 0 3.875-1t2.825-2.65q-.525-.15-1.075-.25T16.5 16q-1.325 0-3.2.775t-3 3.05q.425.1.85.138T12 20m-3.175-.65q.875-1.8 1.988-2.675T12.5 15.5q-.725-.225-1.463-.362T9.5 15q-1.125 0-2.225.275t-2.125.775q.65 1.075 1.588 1.938t2.087 1.362"/></svg>`;
});


document.addEventListener('click', (e) => {
  if (e.target.id === 'linkAdd_BlankTo') {
    e.target.target = "_blank";
    e.target.rel = "noopener noreferrer";
  }
>>>>>>> Stashed changes
});