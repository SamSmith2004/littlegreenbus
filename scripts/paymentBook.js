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
                      <div class="paySelectContainer>
                          <label for="cardNumber">Credit Card Number:</label>
                          <input type="text" id="cCardNumber" name="cardNumber">
                      </div>
                      <div class="paySelectContainer>
                          <label for="expiryDate">Expiry Date:</label>
                          <input type="month" id="expiryDate" name="expiryDate">
                      </div>
                      <div class="paySelectContainer>
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