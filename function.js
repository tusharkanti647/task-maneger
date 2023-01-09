// export function createModel(){
//     const modal=document.createElement("div");
//     modal.classList.add("modal");
//     modal.setAttribute("id", "myModal");

//     const modalContent=document.createElement("div");
//     modalContent.classList.add("modal-content");

//     const close=document.createElement("span");
//     close.classList.add("close");
//     close.innerText ="&times;";

//     const taskInput=document.createElement("div");
//     taskInput.classList.add("task-input");

//     const labelTaskHeaderInput=document.createElement("label");
//     labelTaskHeaderInput.setAttribute("for", "task-header-input");
//     labelTaskHeaderInput.innerText ="Enter The Task Heading";

//     const taskHeaderInput=document.createElement("input");
//     taskHeaderInput.classList.add("task-header-input");
//     taskHeaderInput.setAttribute("id", "task-header-input");

//     //take task Description and label it 
//     const labelTaskDescriptionInput=document.createElement("label");
//     labelTaskHeaderInput.setAttribute("for", "task-description-input");
//     labelTaskDescriptionInput.innerText = "Enter The Task Description";

//     const taskDescriptionInput=document.createElement("textarea");
//     taskDescriptionInput.classList.add("task-description-input");
//     taskDescriptionInput.setAttribute("id", "task-description-input");


//     const saveCancelButtonWrapper=document.createElement("div");
//     saveCancelButtonWrapper.classList.add("save-cancel-button-wrapper");

//     //save button in the model
//     const saveButton=document.createElement("button");
//     saveButton.setAttribute("id", "save_button");
//     saveButton.classList.add("button", "success", "add-button");
//     saveButton.innerText ="Save";
//     saveButton.addEventListener("click",() => {
//         // when input box is not empty call function create object.
//         const newTaskObject = createObject(taskHeaderInput.value, taskDescriptionInput.value);
         
//         //store all task object in the storeArray
//         storeArray[taskAddIconId].push(newTaskObject);
//         console.log("------------------");
//         i=1;
//         fun();
        
//     })

//     //cancel button in the model
//     const cancelButton=document.createElement("button");
//     cancelButton.setAttribute("id", "cancel_button");
//     cancelButton.classList.add("button", "delete");
//     cancelButton.innerText ="Cancel";


//     //connect and append all the model element and button
//     modal.appendChild(modalContent);

//     modalContent.appendChild(close);
//     modalContent.appendChild(taskInput);

//     taskInput.appendChild(labelTaskHeaderInput);
//     taskInput.appendChild(taskHeaderInput);
//     taskInput.appendChild(labelTaskDescriptionInput);
//     taskInput.appendChild(taskDescriptionInput);
//     taskInput.appendChild(saveCancelButtonWrapper);
    
//     saveCancelButtonWrapper.appendChild(saveButton);
//     saveCancelButtonWrapper.appendChild(cancelButton);

//     return modal;
// }

export function get(key){
    let string = localStorage.getItem(key);

    try{
        return JSON.parse(string);
    }
    catch{
        return [[], [], [], [], []];
    }
}


export function set(key, value){
    let string = JSON.stringify(value);

    localStorage.setItem(key,string);
}