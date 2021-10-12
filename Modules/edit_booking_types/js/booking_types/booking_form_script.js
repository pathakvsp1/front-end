const container = document.querySelector(".container");
const form = document.querySelector("#dynamic_form");
const addItem = document.querySelector("#btnModalField");
// const optionContainer = document.querySelector(".addingOptions");
// const textField = document.querySelector("#textField");
// const optionGroup = document.querySelector("#optionGroup");
const itemContainer = document.querySelector(".addItemContainer");

//default number of options that will be displayed on popup window.
let defaultOpts = [];
let str = '<section id="optionsGroup">';
for (let i = 0; i < 3; i++) {
  if (i > 0) {
    defaultOpts.push(
      `<div id = "opt${
        i + 1
      }"><input type="text" name="answers" class="answers"><i id = "del${i + 1}" onclick="del(${
        i + 1
      });" class="material-icons del" title="delete">delete</i></div>`
    );
  } else {
    defaultOpts.push(
      `<div id = "opt${
        i + 1
      }"><input type="text" name="answers" class="answers"></div>`
    );
  }
  str += defaultOpts[i];
}
str += "</section>";

//mainmodel
let mainmodel = `<div class="field_container">
            <div class="error"></div>
            <h3>New Element</h3>
          <form>
          <div id="elementForm">
            <div class = "input_container">
              <label for="description">Label*</label>
              <input type="text" name="description" id="description">
            </div>
            <div>
              <input type="checkbox" name="checkbox" id="is_required" value="require"> <span>required</span>
            </div>
            <select name="select" id="question_type"  onchange = "getLabelType();">
              <option value="Text Field" id="textField" selected>Text Field</option>
              <option value="radio" id="radio">
                radio
              </option>
               <option value="checkbox" id="checkbox">
                checkbox
              </option>
              <option value="textarea" id="textarea">
                textarea
              </option>
              <option value="dropdown" id="dropdown">
                dropdown
              </option>
            </select>
          </div>
          <section class="buttons">
            <button id="btnCloseModalField" type="button">Cancel</button>
            <button id="btnSaveModalField" type="button" >Add</button>
          </section>
          </form>
      </div>`;

//inputfield variable
let inputfield;

//setInputField it will runs when we click on "add new element" and when we try to edit text field
function setInputField(inputValue, check) {
  let c;
  let value;
  if (check) {
    c = "checked";
  }
  //checking whether the label, becuase if we try to add new element then inputvalue will be null
  if (inputValue) {
    value = `value="${inputValue}"`;
  }

  inputfield = `<div class="field_container">
            <div class="error"></div>
            <h3>Add New Input Field</h3>
          <form action="">
            <div class = "input_container">
              <label for="description">description*</label>
              <input type="text" name="description" id="description" ${value}>
            </div>
            <div>
              <input type="checkbox" name="checkbox" id="is_required" value="require" ${c}> <span>required</span>
            </div>
          </form>
          <section class="buttons">
            <button id="btnCloseModalField" type="button">Cancel</button>
            <button id="btnSaveModalField" type"button">Add</button>
          </section>
      </div>`;
}

//radiobuttonsfield varaible
let optionsfield;

//setOptionsField it will runs when we click on "add new element" and when we try to edit options field
function setOptionsField(inputValue, answers, require, type) {
  //gettting label, options , require field and type of the options radio or checkbox.
  let options = "",
    value,
    r,
    c,
    req,
    radioOrCheck;

  //checking for the type of the options radio or checkbox.
  if (type == "dropdown") {
    radioOrCheck = "";
  } else {
    if (type == "radio") {
      r = "checked";
    } else {
      c = "checked";
    }
    radioOrCheck = ` <section>
              <input type="radio" name ="option" id="radioButton" value="radioButton" ${r}>
              <label for="radioButton">radio buttons</label>
              <input type="radio" name = "option" id="checkBox" value="checkBox" ${c}>
              <label for="checkBox">checkbox</label>
            </section>`;
  }

  //checking whether the label and options are given or not, becuase if we try to add new element then inputvalue and options will be null
  if (inputValue && answers) {
    value = `value="${inputValue}"`;
    let i = 0;
    options += `<section id="optionsGroup">`;
    answers.map((ans) => {
      options += `<div id = "opt${
        i + 1
      }"><input type="text" name="answers" class="answers" value="${
        ans.innerHTML
      }">
      <i id = "del${i + 1}" onclick="del(${
        i + 1
      });" class="material-icons del" title="delete">delete</i></div>`;
      i += 1;
    });
    options += "</section>";
  } else {
    value = "";
    options = str;
    console.log(options);
  }
  if (require) {
    req = "checked";
  }
  optionsfield = `<div class="field_container">
            <div class="error"></div>
            <h3>Add Option Group</h3>
          <form action="">
            <div class = "input_container">
              <label for="description">Question*</label>
              <input type="text" name="description" id="description" ${value}>
            </div>
            <div>
              <input type="checkbox" name="checkbox" id="is_required" value="require" ${req}><span>required</span>
            </div>
            ${radioOrCheck}
            ${options}
            <input type="button" value="Add Option" id="addOption">
          </form>
          <section class="buttons">
            <button id="btnCloseModalField" type="button">Cancel</button>
            <button id="btnSaveModalField" type="button">Add</button>
          </section>
      </div>`;
}

//new element click event
function buttonclick()
{
  itemContainer.style.visibility = "visible";
  getLabelType();
}

// For gettings question type
function getLabelType() {
  
  itemContainer.querySelector(".error").style.display = "none";
  const value = itemContainer.querySelector("#question_type").value;
  if (value == "radio" || value == "checkbox" || value == "dropdown") {
    if (!itemContainer.querySelector("#options")) {
      optionsfield = `${str}<input type="button" value="Add Option" id="addOption">`;
      const optionFields = document.createElement("div");
      optionFields.setAttribute("id", "options");
      console.log("line 196");
      console.log(optionFields);
      optionFields.innerHTML = optionsfield;
      itemContainer.querySelector("#elementForm").appendChild(optionFields);
      //add another option
      addAnotherOption();
    }
  } else if (value == "Text Field" || value == "textarea") {
    if (itemContainer.querySelector("#options")) {
      itemContainer
        .querySelector("#elementForm")
        .removeChild(itemContainer.querySelector("#options"));
    }
  }

  //add
  itemContainer.querySelector("#btnSaveModalField").addEventListener("click", () => {


    let selectedValue = itemContainer.querySelector("#question_type").value;
    if (selectedValue == "Text Field") {
      addText(0);
    } else if (selectedValue == "radio") {
      addOptionGroup(0, true, false);
    } else if (selectedValue == "checkbox") {
      addOptionGroup(0, false, true);
    } else if (selectedValue == "textarea") {
      addTextarea(0);
    } else if (selectedValue == "dropdown") {
      addDropdown(0);
    }
  });

  //cancel
  itemContainer.querySelector("#btnCloseModalField").addEventListener("click", () => {
    itemContainer.innerHTML = mainmodel;
    itemContainer.style.visibility = "hidden";
  });
}

//model popup for inputfield and collecting info from that model.
function openText(inputfield, id) {
  if (inputfield) {
    itemContainer.innerHTML = inputfield;
    console.log(inputfield);
    console.log("Inside openText");
    itemContainer.style.visibility = "visible";
  }
  //cancel
  itemContainer.querySelector("#btnCloseModalField").addEventListener("click", () => {
    itemContainer.innerHTML = mainmodel;
    itemContainer.style.visibility = "hidden";
  });
  //add
  itemContainer.querySelector("#btnSaveModalField").addEventListener("click", () => {
    addText(id);
  });
}

//adding functionality for text feild
function addText(id) {
  //variables
  const inputValue = String(itemContainer.querySelector("#description").value).trim() ;
  console.log(inputValue);
  let require = "";
  let star = ""
  //checking for require field
  if (itemContainer.querySelector("#is_required").checked) {
    
    require = "required placeholder = 'required'";
     star = "*"
  } else {
    require = "";
  }
  //validation on enter empty value
  if (!inputValue) {
    itemContainer.querySelector(".error").innerHTML = "please enter all values";
    itemContainer.querySelector(".error").style.display = "block";
    return;
  }

  if (id == 0) {
    //functionality to add
    const input = `${
      form.innerHTML
    }<div class="input_container" id="edit${new Date().getTime()}">
      <label for="text${new Date().getTime()}">${inputValue} ${star}</label><br>
      <input type="text" name="text" id="text${new Date().getTime()}" 
      ${require}/>
      <i onclick="delInput(${new Date().getTime()});" class="material-icons del" title="delete">delete</i>
      <i onclick="editInput(${new Date().getTime()});" class="material-icons edit" title="edit">edit</i>
      <i class="material-icons handle" title="edit">drag_indicator</i>
      </div>`;

    addToForm(input);
  } else {
    //functionality to update
    form.querySelector(`#edit${id} label`).innerHTML = String(inputValue + star).trim();
    if (itemContainer.querySelector("#is_required").checked) {
      form.querySelector(`#edit${id} input`).required = true;
      form
        .querySelector(`#edit${id} input`)
        .setAttribute("placeholder", "required");
    } else {
      form.querySelector(`#edit${id} input`).required = false;
      form.querySelector(`#edit${id} input`).removeAttribute("placeholder");
    }
  }

  //closing  model after adding the element
  itemContainer.innerHTML = mainmodel;
  itemContainer.style.visibility = "hidden";
}

function openOption(optionsfield, id) {
  if (optionsfield) {
    itemContainer.innerHTML = optionsfield;
    itemContainer.style.visibility = "visible";
  }

  //cancel
  itemContainer.querySelector("#btnCloseModalField").addEventListener("click", () => {
    itemContainer.innerHTML = mainmodel;
    itemContainer.style.visibility = "hidden";
  });

  //addOption
  addAnotherOption();

  //add
  itemContainer.querySelector("#btnSaveModalField").addEventListener("click", () => {
    addOptionGroup(id);
  });
}

//addAnotherOption
function addAnotherOption() {
  //addOption
  itemContainer.querySelector("#addOption").addEventListener("click", () => {
    const newAnswer = document.createElement("div");
    newAnswer.setAttribute("id", `opt${defaultOpts.length + 1}`);
    const newOption = `
              <input type="text" name="answers" class="answers" >
              <i onclick="del(${defaultOpts.length + 1});" id= "del${
      defaultOpts.length + 1
    }" class="material-icons del" title="delete">delete</i>`;
    4;
    newAnswer.innerHTML = newOption;
    console.log(newOption);
    itemContainer.querySelector("#optionsGroup").appendChild(newAnswer);
    defaultOpts.push(newOption);
  });
}

//addto optiongroup
function addOptionGroup(id, radio, check) {
  //variables
  const inputValue = itemContainer.querySelector("#description").value;

  const answers = itemContainer.querySelectorAll(".answers");
  let c, r;
  if (
    itemContainer.querySelector("#checkBox") &&
    itemContainer.querySelector("#radioButton")
  ) {
    c = itemContainer.querySelector("#checkBox").checked;
    r = itemContainer.querySelector("#radioButton").checked;
  }
  let req;
  if (itemContainer.querySelector("#is_required").checked) {
    req = "required";
  } else {
    req = "";
  }
  let opts = "";
  if (radio || r) {
    answers.forEach((element) => {
      if (!element.value) {
      } else {
        opts += `<div><input type="radio" name="option" id="${element.value}" value="${element.value}" ${req}>
                <label for="${element.value}">${element.value}</label></div>
                `;
      }
    });
  } else if (check || c) {
    answers.forEach((element) => {
      if (!element.value) {
      } else {
        opts += `<div><input type="checkbox" name="checkbox" id="${element.value}" value="${element.value}" ${req}>
                <label for="${element.value}">${element.value}</label></div>
                `;
      }
    });
  }

  if (!inputValue || !opts) {
    itemContainer.querySelector(".error").innerHTML = "please enter all values";
    itemContainer.querySelector(".error").style.display = "block";
    return;
  }

  if (id == 0) {
    if (req == ""){
      let input = `${form.innerHTML}<div id = "edit${new Date().getTime()}" class="input_container"><label>${inputValue}</label>
      <i onclick="delInput(${new Date().getTime()});" class="material-icons del" title="delete">delete</i>
      <i onclick="editInput(${new Date().getTime()});" class="material-icons edit" title="edit">edit</i>
      <i class="material-icons handle" title="edit">drag_indicator</i>
      <section class="optionsColumn">
      ${opts}
      </section>
      </div>`;
      addToForm(input);
    }
    else{
      let input = `${form.innerHTML}<div id = "edit${new Date().getTime()}" class="input_container"><label> ${inputValue}* </label>
      <i onclick="delInput(${new Date().getTime()});" class="material-icons del" title="delete">delete</i>
      <i onclick="editInput(${new Date().getTime()});" class="material-icons edit" title="edit">edit</i>
      <i class="material-icons handle" title="edit">drag_indicator</i>
      <section class="optionsColumn">
      ${opts}
      </section>
      </div>`;
      addToForm(input);
    }

    
  } else {

    inputValue1 = String(inputValue).replaceAll("*", "").trim();
    console.log(inputValue1);
    if (req == ""){
    form.querySelector(`#edit${id} > label`).innerHTML = inputValue1;
    }
    else if(req = "required"){
      form.querySelector(`#edit${id} > label`).innerHTML = inputValue1 + "*";
    }
    form.querySelector(`#edit${id} section`).innerHTML = opts;
  }

  //closing  model
  itemContainer.innerHTML = mainmodel;
  itemContainer.style.visibility = "hidden";
}

//model popup for inputfield and collecting info from that model.
function openTextarea(inputfield, id) {
  if (inputfield) {
    itemContainer.innerHTML = inputfield;
    itemContainer.style.visibility = "visible";
  }
  //cancel
  itemContainer.querySelector("#btnCloseModalField").addEventListener("click", () => {
    itemContainer.innerHTML = mainmodel;
    itemContainer.style.visibility = "hidden";
  });
  //add
  itemContainer.querySelector("#btnSaveModalField").addEventListener("click", () => {
    addTextarea(id);
  });
}

//add functionality for textarea
function addTextarea(id) {
  //variables
  const inputValue = itemContainer.querySelector("#description").value;
  let require = "";

  //checking for require field
  if (itemContainer.querySelector("#is_required").checked) {
    require = "required placeholder = 'required'";
  } else {
    require = "";
  }
  //validation on enter empty value
  if (!inputValue) {
    itemContainer.querySelector(".error").innerHTML = "please enter all values";
    itemContainer.querySelector(".error").style.display = "block";
    return;
  }

  if (id == 0) {
    //functionality to add
    const input = `${
      form.innerHTML
    }<div class="input_container" id="edit${new Date().getTime()}">
      <label for="text${new Date().getTime()}">${inputValue}</label><br>
      <textarea name="textarea" id="text${new Date().getTime()}" cols="30" rows="5" ${require} style="resize:none"></textarea>
      <i onclick="delInput(${new Date().getTime()});" class="material-icons del" title="delete">delete</i>
      <i onclick="editInput(${new Date().getTime()});" class="material-icons edit" title="edit">edit</i>
      <i class="material-icons handle" title="edit">drag_indicator</i>
      </div>`;

    addToForm(input);
  } else {
    //functionality to update
    form.querySelector(`#edit${id} label`).innerHTML = inputValue;
    if (itemContainer.querySelector("#is_required").checked) {
      form.querySelector(`#edit${id} textarea`).required = true;
      form
        .querySelector(`#edit${id} textarea`)
        .setAttribute("placeholder", "required");
    } else {
      form.querySelector(`#edit${id} textarea`).required = false;
      form.querySelector(`#edit${id} textarea`).removeAttribute("placeholder");
    }
  }

  //closing  model after adding the element
  itemContainer.innerHTML = mainmodel;
  itemContainer.style.visibility = "hidden";
}

//add to form function it will add the particular element to the form
function addToForm(input) {
  //functionality
  form.innerHTML = input;
}

//del Option it will delete the particular option before adding it form
function del(e) {
  itemContainer
    .querySelector("#optionsGroup")
    .removeChild(itemContainer.querySelector(`#opt${e}`));
  defaultOpts.pop(itemContainer.querySelector(`#opt${e}`));
}

//popup modal for editing dropDown
function openDropdown(optionsfield, id) {
  if (optionsfield) {
    itemContainer.innerHTML = optionsfield;
    itemContainer.style.visibility = "visible";
  }

  //cancel
  itemContainer.querySelector("#btnCloseModalField").addEventListener("click", () => {
    itemContainer.style.visibility = "hidden";
  });

  //addOption
  addAnotherOption();

  //add
  itemContainer.querySelector("#btnSaveModalField").addEventListener("click", () => {
    addDropdown(id);
  });
}
//add functionality of dropdown
function addDropdown(id) {
  //variables
  const inputValue = itemContainer.querySelector("#description").value;
  const answers = itemContainer.querySelectorAll(".answers");
  // let star = "";
  let req;
  if (itemContainer.querySelector("#is_required").checked) {
    req = "required";
    // star = "*"
  } else {
    req = "";
  }

  let opts;
  answers.forEach((element) => {
    if (!element.value) {
    } else {
      opts += `<option value="${element.value}" id="${element.value}">${element.value}</option>`;
    }
  });

  //error in not giving input values
  if (!inputValue || !opts) {
    itemContainer.querySelector(".error").innerHTML = "please enter all values";
    itemContainer.querySelector(".error").style.display = "block";
    return;
  }

  if (id == 0) {
    if (req=="required"){
      let input = 
    `${form.innerHTML}<div id = "edit${new Date().getTime()}" class="input_container">
    <label for="text${new Date().getTime()}">${inputValue}*</label>
    <select required name="select" id="${new Date().getTime()}" value="${answers[0].value}"${opts}</select>
    <i onclick="delInput(${new Date().getTime()});" class="material-icons del" title="delete">delete</i>
    <i onclick="editInput(${new Date().getTime()});" class="material-icons edit" title="edit">edit</i>
    <i class="material-icons handle" title="edit">drag_indicator</i>
    </div>`;
    addToForm(input);
    }
    
    else{
      let input = 
    `${form.innerHTML}<div id = "edit${new Date().getTime()}" class="input_container">
    <label for="text${new Date().getTime()}">${inputValue} </label>
    <select name="select" id=${new Date().getTime()} value="${answers[0].value}">${opts}</select>
    <i onclick="delInput(${new Date().getTime()});" class="material-icons del" title="delete">delete</i>
    <i onclick="editInput(${new Date().getTime()});" class="material-icons edit" title="edit">edit</i>
    <i class="material-icons handle" title="edit">drag_indicator</i>
    </div>`;
    addToForm(input);
    }
    
    
  } else {

    let inputValue1 = String(inputValue).replaceAll("*", "").trim();
    console.log(inputValue1);

    if (req == ""){
    form.querySelector(`#edit${id} > label`).innerHTML = inputValue1;
    form.querySelector(`#edit${id} select`).required = false;
     }
    
    else if(req = "required"){
      form.querySelector(`#edit${id} > label`).innerHTML = String(inputValue1 + "*").trim();
    form.querySelector(`#edit${id} select`).required = true;
    }
    form.querySelector(`#edit${id} select`).innerHTML = opts;
    // form.querySelector(`#edit${id} select`).required
  }

  //closing  model
  itemContainer.innerHTML = mainmodel;
  itemContainer.style.visibility = "hidden";
}

//edit Input
function editInput(e) {
  if (form.querySelector(`#edit${e} .optionsColumn`) != null) {
    console.log("Option edit called");
    console.log(String(form.querySelector(`#edit${e} > label`).innerHTML).replaceAll("*", "").trim());
    var a = setOptionsField(
      form.querySelector(`#edit${e} > label`).innerHTML.replaceAll("*", "").trim(),
      Array.from(form.querySelectorAll(`#edit${e} section label`)),
      // form.querySelector(`#edit${e} section > div select`).required,
      form.querySelector(`#edit${e} section > div input`).required,
      form.querySelectorAll(`#edit${e} section input`)[0].type
    );

    openOption(optionsfield, e);
  } 

  else if (form.querySelector(`#edit${e} select`)) {
    setOptionsField(
      form.querySelector(`#edit${e} > label`).innerHTML.replaceAll("*", "").trim(),
      Array.from(form.querySelectorAll(`#edit${e} option`)),
      form.querySelector(`#edit${e} select`).required,
      "dropdown"
    );
    // var qa = Array.from(form.querySelectorAll(`#edit${e} option`));
    // console.log(optionsfield.replace(/\s\s+/g, ' '));
    //  fixed dropdown option spacing issue
    optionsfield = optionsfield.replace(/\s\s+/g, ' ');
    openDropdown(optionsfield, e);
  } else {
    if (form.querySelector(`#edit${e} textarea`)) {
      
      setInputField(
        form.querySelector(`#edit${e} > label`).innerHTML.replaceAll("*", "").trim() , 
        form.querySelector(`#edit${e} textarea`).required
      );

      openTextarea(inputfield, e);
    } else {
      setInputField(
        form.querySelector(`#edit${e} > label`).innerHTML.replaceAll("*", "").trim(),
        form.querySelector(`#edit${e} input`).required
      );
      openText(inputfield, e);
    }
  }
}

//del Input
function delInput(e) {
  form.removeChild(form.querySelector(`#edit${e}`));
  // localStorage.setItem("customForm", form.innerHTML);
}
