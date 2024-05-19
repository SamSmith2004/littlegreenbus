
function handleTicketCount() {
    // Create an array of counts, one for each count display, and initialize each count to 0
    let counts = Array.from(document.getElementsByClassName("count-display")).map(() => 0);
    /* 
    Array.from() creates a new array from an array-like object (in this case, the count displays)
    map(() => 0) creates a new array with the same length as the original array, but with all elements initialized to 0
    */

    // Get all the increment buttons
    let incrementButtons = document.getElementsByClassName("increment-btn");
    // Increments the count when the increment button is clicked
    for (let i = 0; i < incrementButtons.length; i++) { // incrementButtons.length = number of increment buttons
        incrementButtons[i].addEventListener('click', function () {
            // When an increment button is clicked, increment the corresponding count
            counts[i]++;
            // Update the text content of the corresponding count display to the new count
            document.getElementsByClassName("count-display")[i].textContent = counts[i];
        });
    }

    // Get all the decrement buttons
    let decrementButtons = document.getElementsByClassName("decrement-btn");
    // Same jazz as above but for decrementing
    for (let i = 0; i < decrementButtons.length; i++) {
        decrementButtons[i].addEventListener('click', function () {
            if (counts[i] > 0) counts[i]--;
            document.getElementsByClassName("count-display")[i].textContent = counts[i];
        });
    }
}

let selectedOptions = {
    from: '',
    to: '',
    ticketType: '',
    adultcount: 0,
    childcount: 0,
    studentcount: 0
};

let removedElement = null;
let dropdownContent = '';

function TicketDetails() {
    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', event => {
            // Prevent the default action
            event.preventDefault();

            // Get the id of the dropdown button
            let dropdownBtnId = event.target.parentNode.previousElementSibling.id;
            /* event.target is the HTML element that triggered the event (in this case, the <a> tag that was clicked).
               event.target.parentNode refers to the parent element of the element that triggered the event.
               event.target.parentNode.previousElementSibling refers to the sibling element that comes before the parent of the element that triggered the event,
               which is the button element that has the dropdown content.
            */

            // Update the text of the dropdown button
            document.getElementById(dropdownBtnId).textContent = event.target.textContent;

            // Save the selected option
            switch (dropdownBtnId) {
                // Checks which dropdown button was clicked and saves the selected option
                case 'travelFromBtn':
                    selectedOptions.from = event.target.textContent;
                    break;
                case 'travelToBtn':
                    selectedOptions.to = event.target.textContent;
                    break;
                case 'ticketTypeBtn':
                    selectedOptions.ticketType = event.target.textContent;
                    break;
            }
            if ((selectedOptions.from !== '') && (selectedOptions.to !== '') && (selectedOptions.ticketType !== '')) {
                //console.log(selectedOptions);
                addReturnbtn(selectedOptions);
            }
            if (document.getElementById('travelFromBtn').textContent === document.getElementById('travelToBtn').textContent) {
                alert('You cannot travel from and to the same location');
                document.getElementById('travelFromBtn').textContent = 'Travel From';
                document.getElementById('travelToBtn').textContent = 'Travel To';
            }

        });
    });
}

function addReturnbtn() {
    if (selectedOptions.ticketType === 'Return') {
        const element = document.getElementById('return/depart');
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.appendChild(document.createTextNode('Return on:'));
        let div = document.createElement('div');
        div.className = 'dropdown'; // Use .className instead of .class
        let btn = document.createElement('button');
        btn.className = 'dropbtn'; // Use .className instead of .class
        btn.appendChild(document.createTextNode('Return'));
        let div2 = document.createElement('div');
        div2.className = 'dropdown-content'; // Use .className instead of .class
        let a = document.createElement('a');
        a.appendChild(document.createTextNode('placeholder'));
        div2.appendChild(a);
        div.appendChild(btn);
        div.appendChild(div2);
        li.appendChild(p);
        li.appendChild(div);
        li.id = 'returnBtn';
        /* This creates:
        <li>
            <p>Return on:</p>
            <div class="dropdown">
                <button class="dropbtn">Return</button>
                <div class="dropdown-content">
                    <a href="#">placeholder</a>
                </div>
            </div>
        </li>
        */
        element.appendChild(li); // add the list to the element with id 'return/depart'
        //console.log('if sucessful');
        bookButton(selectedOptions)
    }
    if (document.getElementById('returnBtn') && selectedOptions.ticketType !== 'Return') {
        document.getElementById('returnBtn').remove();
        //console.log('if removed');

    }
}

let ticketDetails;

function bookButton() {
    const bookButton = document.getElementById('bookBtn');

    // Check if the 'click' event listener has already been added
    if (bookButton.hasAttribute('data-click-listener-added')) {
        return;
    }

    bookButton.addEventListener('click', function (event) {
        event.preventDefault();

        ticketDetails = {
            from: selectedOptions.from,
            to: selectedOptions.to,
            ticketType: selectedOptions.ticketType,
            adultcount: document.getElementById('adultCount').textContent,
            childcount: document.getElementById('childCount').textContent,
            studentcount: document.getElementById('studentCount').textContent
        };
        //console.log(ticketDetails);

        sessionStorage.setItem('ticketDetails', JSON.stringify(ticketDetails)); // Store ticketDetails in localStorage

        // Redirect to a new page
        window.location.href = '/booking-select.html';
    });
    // Mark that the 'click' event listener has been added
    bookButton.setAttribute('data-click-listener-added', 'true');
}

function carryBookingDetails() {
    let bookingDetails = JSON.parse(sessionStorage.getItem('ticketDetails')); // Retrieve ticketDetails from localStorage
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    document.getElementById('journeyTitle').textContent = `Outgoing journey: ${bookingDetails.from} to ${bookingDetails.to} on date`;
}

let hasSelectedTime = false;
let selectedTime = '';
function TicketTime() {
    let bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
    document.querySelectorAll('#select-time button').forEach(item => {
        // must add '#' to the querySelectorAll if using id instead of class
        item.addEventListener('click', event => {
            console.log('click') // Logs first click, but fails to log subsequent clicks
            if (hasSelectedTime === true) {
                document.getElementById(selectedTime).classList.remove('time-selected');
            };

            event.preventDefault();

            event.target.classList.add('time-selected');

            bookingDetails.time = event.target.textContent;
            sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
            console.log(JSON.parse(sessionStorage.getItem('bookingDetails')));

            hasSelectedTime = true;
            selectedTime = event.target.id;
            addReturnTime(hasSelectedTime);
            TicketReturnTime(selectedTime);
        });
    });
}

function addReturnTime() {
    if (document.getElementById('select-return-time')) {
        return;
    }

    let returnCheck = JSON.parse(sessionStorage.getItem('bookingDetails'));
    if (returnCheck.ticketType === 'Return' && hasSelectedTime === true) {
        let createHtml = `<h1>Return Times</h1><div id="select-return-time">`;
        let departTime = returnCheck.time.split(':')[0]; // Get the hour of the departure time
        let departTimeNumber = Number(departTime);

        // Ensure the return time is after the departure time
        switch (true) {
            case (departTimeNumber < 10):
                createHtml += `<button class="unbutton"><h1 class="" id="return-10">10:00</h1></button><div></div>`;
            case (departTimeNumber < 12):
                createHtml += `<button class="unbutton"><h1 class="" id="return-12">12:00</h1></button><div></div>`;
            case (departTimeNumber < 18):
                createHtml += `<button class="unbutton"><h1 class="" id="return-18">18:00</h1></button><div></div>`;
            case (departTimeNumber < 19):
                createHtml += `<button class="unbutton"><h1 class="" id="return-19">19:00</h1></button>`;
        }

        createHtml += `</div>`;
        let returntime = document.getElementById('select-time-parent').innerHTML += createHtml;
        return createHtml;
    }
}


let hasSelectedReturnTime = false;
let returnSelectedTime = '';
function TicketReturnTime() {
    if (hasSelectedTime=== false) {
        return;
    } else {
        let bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
        document.querySelectorAll('#select-return-time button').forEach(item => {
            // must add '#' to the querySelectorAll if using id instead of class
            item.addEventListener('click', event => {
                if (hasSelectedReturnTime === true) {
                    document.getElementById(returnSelectedTime).classList.remove('time-selected');
                };

                event.preventDefault();

                event.target.classList.add('time-selected');

                bookingDetails.returntime = event.target.textContent;
                sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

                if (bookingDetails.time === bookingDetails.returntime) {
                    alert('You cannot return at the same time as you depart');
                    event.target.classList.remove('time-selected');

                    selectedReturnTime = false;
                } else {
                    console.table(JSON.parse(sessionStorage.getItem('bookingDetails')));
                    hasSelectedReturnTime = true;
                    returnSelectedTime = event.target.id;
                }
                TicketTime(hasSelectedTime);
            });
        });
    }
}

function CheckStudent() {
    let bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
    if (bookingDetails.studentcount == 0) {
        return;
    }
    let form = document.getElementById('passengerDetailsForm');
    let inputdiv = document.createElement('div');
    inputdiv.className = 'input-group';
    let label = document.createElement('label');
    label.for = 'studentID';
    label.textContent = 'Student ID';
    let input = document.createElement('input');
    input.type = 'text';
    input.id = 'studentid';
    input.name = 'studentid';
    input.placeholder = 'Enter your student ID';
    
    inputdiv.appendChild(label);
    inputdiv.appendChild(input);
    form.appendChild(inputdiv);
}

function TimeSubmit() {
    let bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
    let submitButton = document.getElementById('submitTicketTime');
    submitButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (hasSelectedTime === false) {
            alert('Please select a time for your journey');
        } else if (bookingDetails.ticketType === 'Return' && hasSelectedReturnTime === false) {
            alert('Please select a return time for your journey');
        } else {
            window.location.href = '/booking-details.html';
        }
    });
}
function PassengerDetailsSubmit() {
    if (document.getElementById('email').value.includes('@') === false) {
        alert('Please enter a valid email address');
    }
    if (document.getElementById('email').value !== document.getElementById('confirmEmail').value) {
        alert('Emails do not match');
    }
    if (document.getElementById('phone').value.length < 10 || document.getElementById('phone').value.length > 15 || isNaN(document.getElementById('phone').value) === true) {
        alert('Please enter a valid phone number');
    }

    let passengerInfo = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        postcode: document.getElementById('postcode').value
    };
    if (document.getElementById('studentid')) {
        passengerInfo.studentid = document.getElementById('studentid').value;
    }
    console.log(passengerInfo);
}