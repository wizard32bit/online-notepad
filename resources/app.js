
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
const svgContainer= document.querySelector('#svgContainer');

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

  svgContainer.innerHTML= hidePreview ? 
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