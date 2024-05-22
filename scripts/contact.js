
function validateForm(event) {
    event.preventDefault();

    let email = document.getElementById('emailC').value;
    if (!email.includes("@")) {
        alert("Invalid email address");
        return;
    }
    if (document.getElementById('confirmEmailC').value ==! email) {
        alert("Emails don't match");
        return;
    }
    if (document.getElementById('phoneC').value.length < 10 || document.getElementById('phoneC').value.length > 15 || isNaN(document.getElementById('phoneC').value) === true) {
        alert('Please enter a valid phone number');
        return;
    }
    if (document.getElementById('messageC').value == "") {
        alert('Please enter a message');
        return;
    }
    
    let message = document.getElementById('isSubmitted?');
    message.textContent = "Message sent!";
}