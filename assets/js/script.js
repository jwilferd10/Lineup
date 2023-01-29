// create empty array for localStorage

///////////////////////////////////
// When the textField submit button is clicked
$("#addTask").click(function(event) {
    event.preventDefault();

    // collect val from text area
    let userText = $("#userInput").val().trim();

    // if userText exists 
    if (userText) {
        // run html generation script
        createTaskEl(userText);
        
        // reset the form 
        userInput.value = "";
    } else if (userText === "") {
        window.alert("You need to type something down");
    }
});

// .val of textField dynamically generated in htmlEl
let createTaskEl = function(userText) {    
    //  <li> container to hold the user task
    let taskContainerEl = $("<ul>").addClass("taskItem d-flex flex-row");

    // delete this task btn
    let deleteBtn = $("<button>").addClass("deleteBtn btn btn-primary pr-2");

    // inside create a <span> element that contains userText.val();
    let taskTextEl = $("<span>").text(userText).addClass("taskText border");

    // append taskTextEl to taskContainerEl
    taskContainerEl.append(deleteBtn, taskTextEl);

    $("#taskList").append(taskContainerEl);

    // add for loop to provide each taskItem with an ID 

};

///////////////////////////////////

// add event listener for the button 
$("#deleteBtn").each(function(createTaskEl) {

    
    
    
    // let removeHTML = $(this).remove("<ul>");
    // delete task based on that ID

});
///////////////////////////////////

///////////////////////////////////

// Function - deleteAllBtn

// When this btn is clicked, delete all list items on the page. 