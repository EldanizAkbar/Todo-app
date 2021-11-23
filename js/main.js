const inputBox = document.querySelector(".add-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".clear");
const infopart=document.querySelector(".info");
const right=document.querySelector(".right");

inputBox.onkeyup = () => {
  let userEnteredValue = inputBox.value;
  if (userEnteredValue.trim() != 0) { 
    addBtn.classList.remove("disabled");
    addBtn.classList.add("active"); 
  } else {
    addBtn.classList.remove("active");
    addBtn.classList.add("disabled"); 
  }
}


showTasks(); //calling showTask function
addBtn.onclick = () => { 
  let userEnteredValue = inputBox.value; 
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if (getLocalStorageData == null) { 
    listArray = []; 
  } else {
    listArray = JSON.parse(getLocalStorageData);  
  }
  listArray.push(userEnteredValue); 
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); //calling showTask function
  addBtn.classList.remove("active");
  addBtn.classList.add("disabled"); 
}
function showTasks() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if (listArray.length > 0) { //if array length is greater than 0
    deleteAllBtn.classList.remove("passive");
    infopart.classList.remove("opa");
    right.classList.remove("opa");  //active the delete button
  } else {
    deleteAllBtn.classList.add("passive");

  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li><div class="d-flex justify-content-between align-items-center"><span class="text-left"> ${element}</span><span class="icon ps-3" onclick="deleteTask(${index})"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></span></div></li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
}

// delete task function
function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}


// delete all tasks function
deleteAllBtn.onclick = () => {
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}

