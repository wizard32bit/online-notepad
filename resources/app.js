const textarea = document.getElementById("noteContent");
const previewContainer=  document.querySelector('#preview');

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

  previewContainer.innerHTML= marked.parse(textarea.value);
  this.style.height = "auto";       // reset height
  this.style.height = this.scrollHeight + "px"; // set to content height
});


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
