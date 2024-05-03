
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
        incrementButtons[i].addEventListener('click', function() {
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
        decrementButtons[i].addEventListener('click', function() {
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
            switch(dropdownBtnId) {
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
        });
    });
}

function addReturnbtn(){
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

    bookButton.addEventListener('click', function(event) {
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
        window.location.href = '../booking/booking-select.html'; 
    });
    // Mark that the 'click' event listener has been added
    bookButton.setAttribute('data-click-listener-added', 'true');
}

function carryBookingDetails() {
    let bookingDetails = JSON.parse(sessionStorage.getItem('ticketDetails')); // Retrieve ticketDetails from localStorage
    console.log(bookingDetails);
}