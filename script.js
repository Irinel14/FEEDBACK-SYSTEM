// Script for Feedback Submission

// Get references to elements
const feedbackInput = document.getElementById('feedback-input');
const submitButton = document.getElementById('submit-button');
const feedbackContainer = document.getElementById('feedback-container');

// Function to handle feedback submission
submitButton.addEventListener('click', () => {
    const feedbackText = feedbackInput.value.trim();

    // Check if feedback is not empty
    if (feedbackText === '') {
        alert('Please write some feedback before submitting!');
        return;
    }

    // Create a new feedback card
    const feedbackItem = document.createElement('div');
    feedbackItem.classList.add('feedback-item');

    const feedbackHeader = document.createElement('h3');
    feedbackHeader.textContent = 'New User';

    const feedbackContent = document.createElement('p');
    feedbackContent.textContent = feedbackText;

    // Append the header and content to the feedback card
    feedbackItem.appendChild(feedbackHeader);
    feedbackItem.appendChild(feedbackContent);

    // Add the new feedback card to the container
    feedbackContainer.appendChild(feedbackItem);

    // Clear the input field
    feedbackInput.value = '';
});