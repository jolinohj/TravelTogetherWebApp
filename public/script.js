// Open the popup form
function openPopup() {
    document.getElementById('popupForm').style.display = 'block';
}

// Close the popup form
function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
}

// Submit the answers from the form
async function submitAnswers() {
    const question1 = document.getElementById('question1').value;
    const question2 = document.getElementById('question2').value;
    const question3 = document.getElementById('question3').value;

    // Validate inputs
    if (question2 < 1 || question2 > 15) {
        alert('Please enter a number between 1 and 15 for the duration of travel.');
        return;
    }

    if (question3 < 2 || question3 > 6) {
        alert('Please enter a number between 2 and 6 for the number of people in the group.');
        return;
    }

    // Prepare data to send to the server
    const formData = {
        question1: question1,
        question2: question2,
        question3: question3
    };

    try {
        // Send data to the server
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // Parse the response JSON
        const data = await response.json();

        // Display the response to the user
        alert(data.response);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
}

// Call submitAnswers function when submit button is clicked
document.getElementById('submitBtn').addEventListener('click', submitAnswers);
