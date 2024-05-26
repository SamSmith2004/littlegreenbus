function CheckStudent() {
    let bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails"));
    if (bookingDetails.studentcount == 0) {
      return;
    }
    let form = document.getElementById("passengerDetailsForm");
    let inputdiv = document.createElement("div");
    inputdiv.className = "input-group";
    let label = document.createElement("label");
    label.for = "studentID";
    label.textContent = "Leap ID:";
    let input = document.createElement("input");
    input.type = "text";
    input.id = "studentid";
    input.name = "studentid";
    input.placeholder = "Enter your student ID";
  
    inputdiv.appendChild(label);
    inputdiv.appendChild(input);
    form.appendChild(inputdiv);
  }

  function PassengerDetailsSubmit() {
    if (document.getElementById("email").value.includes("@") === false) {
      alert("Please enter a valid email address");
    }
    if (
      document.getElementById("email").value !==
      document.getElementById("confirmEmail").value
    ) {
      alert("Emails do not match");
    }
    if (
      document.getElementById("phone").value.length < 10 ||
      document.getElementById("phone").value.length > 15 ||
      isNaN(document.getElementById("phone").value) === true
    ) {
      alert("Please enter a valid phone number");
    }
  
    let passengerInfo = {
      firstname: document.getElementById("firstname").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      postcode: document.getElementById("postcode").value,
    };
    if (document.getElementById("studentid")) {
      passengerInfo.studentid = document.getElementById("studentid").value;
    }
    if (
      passengerInfo.firstname === "" ||
      passengerInfo.lastname === "" ||
      passengerInfo.email === "" ||
      passengerInfo.phone === "" ||
      passengerInfo.address === "" ||
      passengerInfo.city === "" ||
      passengerInfo.postcode === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    sessionStorage.setItem("passengerInfo", JSON.stringify(passengerInfo));
    window.location.href = "/booking-confirmation.html";
  }
  
  function GetJourneyDetails() {
    let bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails"));
  
    let journeyCardTitle = document.getElementById("journeyCardTitle");
  
    journeyCardTitle.textContent = `From: ${bookingDetails.from} To: ${bookingDetails.to} Date: ${bookingDetails.date}`;
    return journeyCardTitle;
  }