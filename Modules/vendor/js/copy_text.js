// Copy js

// Basically making a temporary input field to select

function copy(element_id){
var inp =document.createElement('input');
document.body.appendChild(inp);
inp.value =element_id.value;
console.log(element_id.value);
inp.select();
document.execCommand('copy',false);
inp.remove();

alert("Copied the text: " + element_id.value);

}


function copy_textarea(element_id) {
  $(element_id).select();
  document.execCommand('copy',false);
  // $("#msg").show();
  alert("Copied the text");
}


// function copy_text(id_element) {
//   /* Get the text field */
//   var copyText = document.getElementById(id_element);
//   console.log(copyText);
//   /* Select the text field */
//   copyText.value;
//   console.log(copyText.value);
//   // copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
//   /* Alert the copied text */
//   alert("Copied the text: " + copyText.value);
// }