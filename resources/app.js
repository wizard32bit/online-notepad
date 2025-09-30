const fileBtn= document.querySelector('#fileBtn');
const fileInputLayout= document.querySelector('#fileInputLayout');
const fileInput= document.querySelector('#fileInput');
const fileUploadErrorSpan= document.querySelector('#fileUploadErrorSpan');
const filePreview= document.querySelector('.imgPreview');
const fileUploadLabel= document.querySelector('#fileUploadLabel');


// image description span (under the image)
const imageDescriptionInput= document.querySelector('#imageDescriptionInput');
const imageDescriptionContainer= document.querySelector('#imageDescriptionContainer');


let fileInputLayoutVisiblity= false;
fileBtn.addEventListener('click', ()=>{
  fileInputLayoutVisiblity= !fileInputLayoutVisiblity;
  fileInputLayout.hidden= !fileInputLayoutVisiblity;
});

// Allowed types
const allowedTypes = {
    "image":["image/jpeg", "image/png"], 
    "pdf": ["application/pdf"]
};

const allAllowedTypes= [...allowedTypes.image, ...allowedTypes.pdf];
// Max size (e.g. 2 MB)
const maxSize = 2 * 1024 * 1024;

fileInput.addEventListener("change", () => {

  const file = fileInput.files[0];
  if (!file) return;

  // Reset error span before validation
  fileUploadErrorSpan.textContent = "";
  fileUploadErrorSpan.classList.add("d-none");
  imageDescriptionContainer.classList.add("d-none");

  if(!allAllowedTypes.includes(file.type) || file.size > maxSize){
    let msg= null;
    //if file type is not supported or file size is above max
    if(!allAllowedTypes.includes(file.type)){
      //if file type is not supported
      msg= "Type fichier invalide. Veuillez déposer un fichier de type JPEG, PNG ou PDF";
    }else if(file.size > maxSize){
      //if file size is above max
      msg= "La taille du fichier ne doit pas dépasser 2MB";
    }
    fileUploadErrorSpan.textContent= msg;
    fileUploadErrorSpan.classList.remove("d-none");

  }else{
    //if file type is supported (image/PDF) && file size is lessEqual to max
    if(allowedTypes.image.includes(file.type)){
      //if file type is image
      imageDescriptionContainer.classList.remove("d-none"); 
      imageDescriptionInput.value= removeExtension(file.name);
    
    }else if(allowedTypes.pdf.includes(file.type)){
      //if file type is pdf
    }

    fileUploadLabel.textContent= file.type;
  }
});

function removeExtension(fileName) {
  return fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
}



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


const addLinkBtn= document.querySelector("#addLinkBtn");
const addLinkLayout= document.querySelector("#addLinkLayout");
let addLinkLayoutVisibility= false;


addLinkBtn.addEventListener('click', function(){
  addLinkLayoutVisibility = !addLinkLayoutVisibility;
  addLinkLayout.hidden= !addLinkLayoutVisibility;
});