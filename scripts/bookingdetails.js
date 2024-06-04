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
      return '';
    }
    if (
      document.getElementById("email").value !==
      document.getElementById("confirmEmail").value
    ) {
      alert("Emails do not match");
      return '';
    }
    if (
      document.getElementById("phone").value.length < 10 ||
      document.getElementById("phone").value.length > 15 ||
      isNaN(document.getElementById("phone").value) === true
    ) {
      alert("Please enter a valid phone number");
      return '';
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
      if (passengerInfo.studentid === "") {
        alert("Please enter your student ID");
        return '';
      }
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
      return '';
    }
    sessionStorage.setItem("passengerInfo", JSON.stringify(passengerInfo));
    window.location.href = "/booking-confirmation.html";
  }
  
  function GetJourneyDetails() {
    let bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails"));

    let bookingDate = bookingDetails.dateDepart;
    bookingDate = bookingDate.split("-").reverse().join("/");

    let journeyCardTitle = document.getElementById("journeyCardTitle");
  
    journeyCardTitle.textContent = `From: ${bookingDetails.from} to ${bookingDetails.to} on ${bookingDate}`;

    let journeyCard = document.getElementById("journeyDetails");
    let bookingTime = bookingDetails.time;
    let colonIndex = bookingTime.indexOf(':');
    bookingTime = bookingTime.slice(0, colonIndex);
    bookingTime = parseInt(bookingTime) + 1;
    bookingTime = bookingTime + ":00";
    journeyCard.textContent = 'Journey: ';
    journeyCard.textContent += `Departure: ${bookingDetails.time} Arrival: ${bookingTime}`;

    if (bookingDetails.ticketType === "Return") {
      let journeyCard2 = document.getElementById("journeyDetails2");

      let returnDate = bookingDetails.dateReturn;
      returnDate = returnDate.split("-").reverse().join("/");
      journeyCard2.textContent = `Return: ${returnDate} `;

      let bookingRetTime = bookingDetails.returntime;
      let colonRetIndex = bookingTime.indexOf(':');
      bookingRetTime = bookingRetTime.slice(0, colonRetIndex);
      bookingRetTime = parseInt(bookingRetTime) + 1;
      bookingRetTime = bookingRetTime + ":00";
      journeyCard2.textContent += `Departure: ${bookingDetails.returntime} Arrival: ${bookingRetTime}`;
    }
    return;
  }