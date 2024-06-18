function choosePayment() {
    //event.preventDefault();

    if (hasSelectedPayment === true || priorSelectedPayment === event.target.id) {
      let targetElement = document.getElementById(priorSelectedPayment);
      targetElement.classList.remove("paymentChoice");
    }
  
    let paymentMethod = event.target.id;
    let targetElement = event.target;
  
    let newParent = document.getElementById("paymentSelected");
    let paymentSelected = "";
    switch (paymentMethod) {
      case "chooseCreditCard":
        paymentSelected = `
                      <div class="paySelectContainer">
                          <label for="cardNumber">Credit Card Number:</label>
                          <input type="text" id="cCardNumber" name="cardNumber">
                      </div>
                      <div class="paySelectContainer">
                          <label for="expiryDate">Expiry Date:</label>
                          <input type="month" id="expiryDate" name="expiryDate">
                      </div>
                      <div class="paySelectContainer">
                          <label for="cvv">CVV:</label>
                          <input type="text" id="cvv" name="cvv">
                      </div>
                      `;
                      targetElement.classList.add("paymentChoice");
                      hasSelectedPayment = true;
                      priorSelectedPayment = event.target.id;
        break;
      case "chooseDebitCard":
        paymentSelected = `
                      <div class="paySelectContainer">
                          <label for="cardNumber">Debit Card Number:</label>
                          <input type="text" id="dCardNumber" name="cardNumber">
                      </div>
                      <div class="paySelectContainer">
                          <label for="expiryDate">Expiry Date:</label>
                          <input type="month" id="expiryDate" name="expiryDate">
                      </div>
                      <div class="paySelectContainer">
                          <label for="cvv">CVV:</label>
                          <input type="text" id="cvv" name="cvv">
                      </div>
                      `;
                      targetElement.classList.add("paymentChoice");
                      hasSelectedPayment = true;
                      priorSelectedPayment= event.target.id;
        break;
      case "choosePayPal":
                          targetElement.classList.add("paymentChoice");
                          hasSelectedPayment = true;
                          priorSelectedPayment= event.target.id;
                          window.open("https://paypal.me/websamplepay12?country.x=IE&locale.x=en_US", "_blank");
        break;
      default:
        return "";
    }
  
    newParent.innerHTML = paymentSelected + `<div></div><button class="payment-button" onclick="paymentSelected();">Proceed</button>`;
    return hasSelectedPayment;
  }

  function paymentSelected() {
    if (document.getElementById('choosePayPal').classList.contains("paymentChoice")) {
      window.location.href = "/booking-complete.html";
    } else if (document.getElementById("dCardNumber")) {
      if (document.getElementById("dCardNumber").value.length !== 16) {
        alert("Please enter a valid debit card number");
        return '';
      }
      if (document.getElementById("expiryDate").value === "") {
        alert("Please enter an expiry date");
        return;
      }
      if (document.getElementById("cvv").value.length !== 3) {
        alert("Please enter a valid CVV");
        return;
      }
      window.location.href = "/booking-complete.html";
  
    } else if (document.getElementById("cCardNumber")) {
      if (document.getElementById("cCardNumber").value.length !== 16) {
        alert("Please enter a valid debit card number");
        return '';
      }
      if (document.getElementById("expiryDate").value === "") {
        alert("Please enter an expiry date");
        return '';
      }
      if (document.getElementById("cvv").value.length !== 3) {
        alert("Please enter a valid CVV");
        return '';
      }
      window.location.href = "/booking-complete.html";
  
    } else {
      alert("Please select a payment method");
      return '';
    }
  }

function paymentDetails() {
  let bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails"));
  console.log(bookingDetails);

  let TicketDetails = {
  };
  let price = 0;

  if (bookingDetails.adultcount > 0) {
    TicketDetails.adultTicket = bookingDetails.adultcount;
    price = price + (1000 * bookingDetails.adultcount);
  }
  if (bookingDetails.childcount > 0) {
    TicketDetails.childTicket = bookingDetails.childcount;
    price = price + (600 * bookingDetails.childcount); 
  }
  if (bookingDetails.studentcount > 0) {
    TicketDetails.studentTicket = bookingDetails.studentcount;
    price = price + (800 * bookingDetails.studentcount); 
  }

  if (bookingDetails.ticketType === "Return") {
    price = price * 1.5;
  }

  let tickets = ''
  if (TicketDetails.adultTicket) {
    if (tickets.length > 1) {
      tickets +='1 Adult Ticket, ';
    } else {
      tickets +='1 Adult Ticket, ';
    }
  }
  if (TicketDetails.childTicket) {
    if (tickets.length > 1) {
      tickets +='1 Child Ticket, ';
    } else {
      tickets +='1 Child Ticket, ';
    }
  }
  if (TicketDetails.studentTicket) {
    if (tickets.length > 1) {
      tickets +='1 Student Ticket, ';
    } else {
      tickets +='1 Student Ticket, ';
    }
  }

  tickets = tickets.trim(); // Trim any leading or trailing whitespace
  if (tickets.endsWith(',')) {
    tickets = tickets.slice(0, -1); // remove the trailing comma
  }

  let ticketElement = document.getElementById("TicketCount");
  ticketElement.textContent = `Tickets: ${tickets}`;

  let priceElement = document.getElementById("TotalPrice");
  let formattedPrice = formatPrice(price);
  priceElement.textContent = `Total Price: €${formattedPrice}`;
}

function formatPrice(price) {
  let priceStr = price.toString();
  if (priceStr.length < 3) {
    // If the price is less than 100, ensure it's correctly formatted as 0.xx
    priceStr = priceStr.padStart(3, '0'); 
  }
  // Insert a decimal point before the last two digits
  let newprice = priceStr.slice(0, priceStr.length - 2) + "." + priceStr.slice(priceStr.length - 2);
  return newprice;
}