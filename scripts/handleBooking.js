
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
                console.log(selectedOptions);
            }
        });
    });

    function addReturnbtn(){
        // Check if the 'Return on:' dropdown already exists
        if (document.getElementById('returnDropdown')) {
            // If it exists, remove it
            document.getElementById('returnDropdown').remove();
        }

        if (selectedOptions.ticketType === 'Return') {
            // Create the new 'li' element
            let li = document.createElement('li');
            li.id = 'returnDropdown'; // Add an id to the 'li' element

            // Set the innerHTML of the 'li' element
            li.innerHTML = `
                <p>Return on:</p>
                <div class="dropdown">
                    <button class="dropbtn">Return</button>
                    <div class="dropdown-content">
                        <a href="#">Oh god how</a>
                    </div>
                </div>
            `;

            // Append the new 'li' element to the 'ul' element
            document.querySelector('.text-green').appendChild(li);
        }
    }
}