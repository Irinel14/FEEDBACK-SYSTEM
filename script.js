// Selectăm stelele și inițializăm variabilele
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

// Funcționalitate pentru stelele de rating
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        selectedRating = index + 1;
        updateStarDisplay();
    });

    star.addEventListener('mouseover', () => {
        highlightStars(index);
    });

    star.addEventListener('mouseout', () => {
        updateStarDisplay();
    });
});

// Evidentiaza stelele pe măsură ce utilizatorul trece cu mouse-ul peste ele
function highlightStars(index) {
    stars.forEach((star, i) => {
        if (i <= index) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Actualizează afișajul stelelor pe baza ratingului selectat
function updateStarDisplay() {
    stars.forEach((star, i) => {
        if (i < selectedRating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

// Funcționalitate pentru trimiterea feedback-ului
const feedbackInput = document.getElementById('feedback-input');
const submitButton = document.getElementById('submit-button');
const feedbackContainer = document.getElementById('feedback-container');
const userNameInput = document.getElementById('user-name'); // Input pentru numele utilizatorului

submitButton.addEventListener('click', () => {
    const userName = userNameInput.value.trim(); // Obținem numele utilizatorului
    const feedbackText = feedbackInput.value.trim(); // Obținem feedback-ul text
    if (feedbackText && selectedRating > 0 && userName) { // Verificăm că toate câmpurile sunt completate
        addFeedback(userName, feedbackText, selectedRating); // Adăugăm feedback-ul
        feedbackInput.value = ''; // Resetează câmpul de feedback
        userNameInput.value = ''; // Resetează câmpul de nume
        selectedRating = 0; // Resetează rating-ul
        updateStarDisplay(); // Actualizează stelele
    } else {
        alert('Please provide your name, feedback, and a star rating.');
    }
});

// Adăugăm feedback-ul la containerul de feedback-uri
function addFeedback(userName, text, rating) {
    const feedbackItem = document.createElement('div');
    feedbackItem.classList.add('feedback-item');

    // Creăm elemente pentru nume, text și rating
    const feedbackName = document.createElement('h3');
    feedbackName.textContent = userName; // Folosim numele introdus de utilizator

    const feedbackText = document.createElement('p');
    feedbackText.textContent = text; // Folosim feedback-ul text

    const feedbackRating = document.createElement('span');
    feedbackRating.classList.add('rating');
    feedbackRating.textContent = '★'.repeat(rating) + '☆'.repeat(5 - rating); // Afișăm rating-ul cu stele

    // Adăugăm elementele în feedbackItem
    feedbackItem.appendChild(feedbackName);
    feedbackItem.appendChild(feedbackText);
    feedbackItem.appendChild(feedbackRating);

    // Adăugăm feedback-ul în containerul de feedback-uri
    feedbackContainer.appendChild(feedbackItem);
}