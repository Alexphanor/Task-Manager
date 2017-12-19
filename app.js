//Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load All Event Listeners
loadEventListeners();

//Load All Event Listeners
function loadEventListeners(){
//Add Task event
form.addEventListener("submit", addTask);
// Remove Task event
taskList.addEventListener("click", removeTask);
//Filter Tasks Events
filter.addEventListener("keyup", filterTasks);
//Clear Task event
clearBtn.addEventListener("click", clearTasks);

}

//Add Task
function addTask(e) {
if(taskInput.value === ""){
  alert("Add a task");
}
//Create li element
const li = document.createElement("li");
//add class
li.className = "collection-item";
//Create a text node and append a child
li.appendChild(document.createTextNode(taskInput.value));
//Create new link element
const link = document.createElement("a");
//add class
link.className = "delete-item secondary-content";
//Add Icon Html
link.innerHTML = "<i class='fa fa-remove'></i>";
//append the link to li
li.appendChild(link);

//Append li to ul
taskList.appendChild(li);

//Store in local storage
storeTaskInLocalStorage(taskInput.value);

//Clear input
taskInput.value = "";

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem("tasks") === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(e){
if(e.target.parentElement.classList.contains("delete-item")){
  if(confirm("Are You Sure?")){
   e.target.parentElement.parentElement.remove();
  }
}
}
// clear Tasks ** 2 ways **
function clearTasks(e){
  // taskList.innerHTML = "";

  //Faster
  while(taskList.fisrtChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //Clear from local storage
  clearTaskFromLocalStorage();
}

//clear Task from local Storage
function clearTaskFromLocalStorage(){
  localStorage.clear();
}


  //Filter Task
  function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-item").forEach(function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){task.style.display = "block";
    } else {
      task.style.display = "none";
    }
    });
  }
