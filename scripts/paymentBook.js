function choosePayment() {
    event.preventDefault();
  
    let paymentMethod = event.target.id;
    let targetElement = event.target;
  
    let newParent = document.getElementById("paymentSelected");
    let paymentSelected = "";
    switch (paymentMethod) {
      case "chooseCreditCard":
        paymentSelected = `
                      <div>
                          <label for="cardNumber">Credit Card Number:</label>
                          <input type="text" id="cCardNumber" name="cardNumber">
                      </div>
                      <div>
                          <label for="expiryDate">Expiry Date:</label>
                          <input type="month" id="expiryDate" name="expiryDate">
                      </div>
                      <div>
                          <label for="cvv">CVV:</label>
                          <input type="text" id="cvv" name="cvv">
                      </div>
                      `;
        targetElement.class = "paymentChoice";
        break;
      case "chooseDebitCard":
        paymentSelected = `
                      <div>
                          <label for="cardNumber">Debit Card Number:</label>
                          <input type="text" id="dCardNumber" name="cardNumber">
                      </div>
                      <div>
                          <label for="expiryDate">Expiry Date:</label>
                          <input type="month" id="expiryDate" name="expiryDate">
                      </div>
                      <div>
                          <label for="cvv">CVV:</label>
                          <input type="text" id="cvv" name="cvv">
                      </div>
                      `;
        targetElement.class = "paymentChoice";
        break;
      case "choosePayPal":
        paymentSelected = `
                      <div>
                          <label for="paypalEmail">PayPal Email:</label>
                          <input type="email" id="paypalEmail" name="paypalEmail">
                      </div>
                          `;
        targetElement.class = "paymentChoice";
        break;
      default:
        return "";
    }
  
    newParent.innerHTML = paymentSelected + `<div></div><button onclick="paymentSelected();">Proceed</button>`;
    return newParent;
  }
  
  function paymentSelected() {
    if (document.getElementById("paypalEmail")) {
      return;
    } else if (document.getElementById("dCardNumber")) {
      if (document.getElementById("dCardNumber").value.length !== 16) {
        alert("Please enter a valid debit card number");
      }
      if (document.getElementById("expiryDate").value === "") {
        alert("Please enter an expiry date");
      }
      if (document.getElementById("cvv").value.length !== 3) {
        alert("Please enter a valid CVV");
      }
      window.location.href = "/booking-complete.html";
  
    } else if (document.getElementById("cCardNumber")) {
      if (document.getElementById("cCardNumber").value.length !== 16) {
        alert("Please enter a valid debit card number");
      }
      if (document.getElementById("expiryDate").value === "") {
        alert("Please enter an expiry date");
      }
      if (document.getElementById("cvv").value.length !== 3) {
        alert("Please enter a valid CVV");
      }
      window.location.href = "/booking-complete.html";
  
    } else {
      console.log("error: no payment method selected");
    }
  }