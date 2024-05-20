function openPopup() {
    document.getElementById('popupForm').style.display = 'block';
}

function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
}

function submitAnswers() {
    const question1 = document.getElementById('question1').value;
    const question2 = document.getElementById('question2').value;
    const question3 = document.getElementById('question3').value;

    const answers = {
        question1: question1,
        question2: question2,
        question3: question3
    };

    console.log('Answers:', answers); // Store the answers for further use, e.g., sending to ChatGPT.

    // Close the popup
    closePopup();

    // You can now send the answers to your backend or use them as needed.
}
