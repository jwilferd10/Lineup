let taskIdCounter = 0;
let tasks = [];

///////////////////////////////////

// initializes when body is loaded 
let timeInit = function() {
    // get the current local time
    let currentTime = new Date().toLocaleTimeString();

    // timeDisplay previews currentTime data
    $(".timeDisplay").html(currentTime);

    // update every second
    setTimeout(timeInit, 1000);
};

///////////////////////////////////

// collect and present the current date
$(document).ready(function() {
    // get the current date
    let currentDate = new Date().toDateString();

    // display date
    $(".dateDisplay").html(currentDate);

    // Potentially add comma after the days date before year
});

///////////////////////////////////

// When the textField submit button is clicked
$("#addTask").click(function(event) {
    event.preventDefault();

    // collect val from text area
    let userText = $("#userInput").val().trim();

    // if userText exists 
    if (userText) {

        // create an object
        let taskObj = {
            text: userText
        };

        // run html generation script
        createTaskEl(taskObj);
        
        // reset the form 
        userInput.value = "";
    } else if (userText === "") {
        window.alert("You need to type something down");
    }
});

///////////////////////////////////

// .val of textField dynamically generated in htmlEl
let createTaskEl = function(taskObj) {    
    //  <li> container to hold the user task
    let taskContainerEl = $("<ul>").addClass("taskItem d-flex flex-row");

    // add an id to element
    taskContainerEl.attr("taskID", taskIdCounter);

    // delete this task btn
    let deleteBtn = $("<button>").addClass("deleteBtn btn btn-primary pr-2");

    // inside create a <span> element that contains userText.val();
    let taskTextEl = $("<span>").text(taskObj.text).addClass("taskText border col-10");

    // append taskTextEl to taskContainerEl
    taskContainerEl.append(deleteBtn, taskTextEl);

    $("#taskList").append(taskContainerEl);

    // set parameter for taskObj
    taskObj.id = taskIdCounter;

    // push into the array
    tasks.push(taskObj);

    // increase counter for the next element
    taskIdCounter++;

    // check to see if taskObj displays correctly in the array
    // console.log(tasks);

    // save to localStorage
    saveTasks();
};

///////////////////////////////////

let saveTasks = function() {
    // store the created task in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

///////////////////////////////////

let loadTasks = function() {
    // retrieve the task from localStorage 
    let savedItem = localStorage.getItem("tasks");

    if(!savedItem) {
        return false;
    } else {
        // what does the log say? (insert old meme)
        console.log("Those saved tasks? They've been found");
        savedItem = JSON.parse(savedItem);
    }

    // run createTaskEl for every item saved to localStorage
    for (let i = 0; i < savedItem.length; i++) {
        createTaskEl(savedItem[i]);
    }
};

///////////////////////////////////

$(document).on('click', '.deleteBtn', function(taskObj) {

    // find and delete html elemenet 
    let deleteEl = $(this).parent("ul").remove().attr("taskID");

    // deletes the task from the array 
    tasks.splice(deleteEl, 1);

    // using setItem to set it again with new task arr
    localStorage.setItem('tasks', JSON.stringify(tasks));

    console.log(tasks);
    
});

///////////////////////////////////

// Function - deleteAllBtn
$("#delAllTasks").click(function(event) {
    // Clear the tasks array
    tasks = [];

    // clear the localStorage 
    localStorage.clear();

    // alert user
    window.alert("All tasks have been deleted!");
}); 
///////////////////////////////////

loadTasks();
