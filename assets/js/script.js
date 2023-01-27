// create empty array for localStorage

///////////////////////////////////
// When the textField submit button is clicked
$("#addTask").click(function(event) {
    event.preventDefault();

    // collect val from text area
    let userText = $("#userInput").val().trim();
    console.log(userText);

    // if userText exists 
    if (userText) {
        // run html generation script
        createTaskEl(userText);
        
        // reset the form 
        userInput.value = "";
    } else {
        window.alert("You need to type something down");
    }
});

// .val of textField dynamically generated in htmlEl
let createTaskEl = function(userText) {
    
    alert(userText)
    
    //  <li> container to hold the user task
    let taskContainerEl = $("<li>").addClass("taskItem");

    // inside create a <span> element that contains userText.val();
    let taskTextEl = $("<span>").text(userText).addClass("taskText");

    // append taskTextEl to taskContainerEl
    taskContainerEl.append(taskTextEl);

    $("#taskList").append(taskContainerEl);

};




// create a button that deletes the generated content.
///////////////////////////////////

///////////////////////////////////
// Function - deleteEntry 

// When deleteBtn is clicked, delete single task 
///////////////////////////////////

// Function - deleteAllBtn

// When this btn is clicked, delete all list items on the page. 