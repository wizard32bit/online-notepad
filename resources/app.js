
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
const previewBtnSpan= document.querySelector("#previewBtnSpan");
const previewBtnSvgContainer= document.querySelector('#previewBtnSvgContainer');

let hidePreview= true;
previewBtn.addEventListener('click', ()=>{

  hidePreview= !hidePreview;
  notePreview.hidden= hidePreview;
  textarea.hidden= !notePreview.hidden;
  // set bootstrap css classes
  let btn_classes={
    'previewOn': "btn-secondary",
    'previewOff': "btn-primary"
  };

  // preview mode: btn-secondary
  // edit mode: btn-primary
  // !: on page load, the edit mode is on so the class is btn-primary

  // look for the current css class set on the previewBtn
  let current_class= null;
  for (const css_class of previewBtn.classList){
    if(css_class.startsWith('btn-')){
      current_class= css_class;
      break;
    }
  };
  
  // swap the btn-classes with the other different than the current (if on=> set off, vice-versa)
  let btn_class= current_class === btn_classes.previewOn ? btn_classes.previewOff : btn_classes.previewOn;
  let spanText= current_class === btn_classes.previewOn ? "Voir" : "Noter";

  previewBtnSvgContainer.innerHTML= hidePreview ? 
    `<svg id="previewBtnSvgSetPreviewOn" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm0-2h14V7H5zm7-2q-2.05 0-3.662-1.112T6 13q.725-1.775 2.338-2.887T12 9t3.663 1.113T18 13q-.725 1.775-2.337 2.888T12 17m0-2.5q-.625 0-1.062-.437T10.5 13t.438-1.062T12 11.5t1.063.438T13.5 13t-.437 1.063T12 14.5m0 1q1.05 0 1.775-.725T14.5 13t-.725-1.775T12 10.5t-1.775.725T9.5 13t.725 1.775T12 15.5"/>
    </svg>`:
    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12.475 16.825L20.85 8.45l-1.3-1.3l-8.375 8.375zM3 15.275Q3 16 3.5 16.4t1.65.525q.4.05.638.362T6 18q-.025.425-.3.7t-.675.225Q3 18.675 2 17.763t-1-2.488q0-1.625 1.338-2.637t3.712-1.213q.975-.075 1.463-.312T8 10.45q0-.55-.525-.862T5.75 9.1q-.4-.05-.638-.375T4.926 8q.05-.425.35-.687t.7-.213q2.075.3 3.05 1.113T10 10.45q0 1.325-.962 2.075t-2.838.9q-1.6.125-2.4.588T3 15.275m9.95 3.9L8.825 15.05l9.55-9.55q.5-.5 1.188-.5t1.187.5l1.75 1.75q.5.5.5 1.188t-.5 1.187zM8.975 20q-.425.1-.75-.225T8 19.025l.825-3.975l4.125 4.125z"/>
    </svg>`   
    ;

  previewBtnSpan.textContent= spanText;
  previewBtn.classList.replace(current_class, btn_class);

});

window.addEventListener('load', ()=>{
  addLinkLayout.hidden= notePreview.hidden= true;
  previewBtn.classList.add("btn-primary");
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
