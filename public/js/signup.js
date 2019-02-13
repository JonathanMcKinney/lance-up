$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    var userType = $("#userTypeDropdown option:selected").text();
    console.log(userType);
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      user_type: userType
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    //, userData.user_type
    signUpUser(userData.email, userData.password, userData.user_type);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors

  function signUpUser(email, password, user_type) {
    $.post("/api/signup", {
      email: email,
      password: password,
      user_type: user_type
    }).then(function(data) {
      window.location.replace("/login");
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
