const textarea = document.getElementById("noteContent");
const previewContainer=  document.querySelector('#preview');
let textareaContentArray= [];

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
  this.style.height = "auto";            // reset height
  this.style.height = this.scrollHeight + "px"; // set to content height
});


const imageBtn= document.querySelector('#imageBtn');
const imageInputLayout= document.querySelector('#imageInputLayout');
const imageInput= document.querySelector('#imageInput');
const imageUploadErrorSpan= document.querySelector('#imageUploadErrorSpan');
const imageDescription= document.querySelector('#imageDescription');
const imagePreview= document.querySelector('.imgPreview');


let imageInputLayoutVisiblity= false;
imageBtn.addEventListener('click', ()=>{
  imageInputLayoutVisiblity= !imageInputLayoutVisiblity;
  imageInputLayout.hidden= !imageInputLayoutVisiblity;
});

// Allowed types
const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
// Max size (e.g. 2 MB)
const maxSize = 2 * 1024 * 1024;


let countImgPreviews=0;
let imgPreviewArr= [];
imageInput.addEventListener("change", () => {
  const image = imageInput.files[0];
  if (!image) return;

  // Reset error span before validation
  imageUploadErrorSpan.textContent = "";
  imageUploadErrorSpan.classList.add("d-none");
  imageDescription.value= "";

  // Validate type
  if (!allowedTypes.includes(image.type) || image.size > maxSize) {
    if(!allowedTypes.includes(image.type)){
      imageUploadErrorSpan.textContent =
      "Invalid file type. Please upload JPEG, PNG, or PDF.";
    }else if (image.size > maxSize) {
      // Validate size
      imageUploadErrorSpan.textContent = "File too large. Max allowed size is 2 MB.";
    } 
    imageUploadErrorSpan.classList.remove("d-none");
    imageInput.value = ""; // reset file input
    return;
  }else{
    imageUploadErrorSpan.classList.add("d-none"); // hide errors if valid
    const imageUrl = URL.createObjectURL(image);
    imageDescription.value= imageDescription.value.length > 0 ? imageDescription.value : image.name.split('.').slice(0, -1).join('.'); ;
    let content= `<section id='section${++countImgPreviews}'>
                        <div id='imgPreview${countImgPreviews}' class='imgPreview' >
                          <div id="imgContainer">
                              <button class='closeBtn' onclick="removeImage('section${countImgPreviews}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="12" stroke-dashoffset="12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12l7 7M12 12l-7 -7M12 12l-7 7M12 12l7 -7"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"/></path></svg>
                              </button>
                              <img src="${imageUrl}" />
                          </div>
                          <span class='imageCaption'>${imageDescription.value}</span>
                      </div>
                      </section>`;
    
    textareaContentArray.push({'id': countImgPreviews, 'content': content});
    console.log(textareaContentArray);
    renderPreview();
  }
});


const closeButtons = document.getElementsByClassName('closeBtn');

function removeImage(parentId){
  textareaContentArray =textareaContentArray.filter( (elm) => elm.id !== parentId );
  const parentToRemove= document.getElementById(parentId);
  if(parentToRemove) parentToRemove.remove();

}


function renderPreview(){
  textareaContentArray.forEach(elm => {
    textarea.value+= elm.content;
    previewContainer.innerHTML+= marked.parse(elm.content);
  });
}

renderPreview();