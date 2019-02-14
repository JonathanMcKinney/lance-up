$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    name = data.email;
    return name;
  });

  $("#submitNewProject").on("click", function(event) {
    event.preventDefault();

    var skillsArray = [];

    $("input[name='skills']:checked").each(function() {
      skillsArray.push(this.id);
    });

    var newProject = {
      client_name: name,
      project_name: $("#projectTitleInput")
        .val()
        .trim(),
      project_description: $("#projectDescription")
        .val()
        .trim(),
      start_budget: $("#projectBudgetInput")
        .val()
        .trim(),
      remain_budget: $("#projectBudgetInput")
        .val()
        .trim(),
      project_length: $("#timelineInput")
        .find(":selected")
        .text(),
      desired_skills: skillsArray.toString()
    };

    $.post("/api/projects", newProject, function(data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    }).then(function(response) {
      console.log("created new project: " + response);
    });

    console.log(newProject);

    $.get("/api/devs").then(function(results) {
      // console.log("this is a list of all devs" + results);
    });
  });
});
