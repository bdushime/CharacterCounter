// Toggle between light and dark theme 
const themeButton = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const logoImage = document.getElementById('main-logo');
const bodyElement = document.body;

themeButton.addEventListener('click', function() {

    bodyElement.classList.toggle('light-theme');

    if (bodyElement.classList.contains('light-theme')) {
        
        logoImage.src = './assets/images/logo-light-theme.svg';
        themeIcon.src = './assets/images/icon-moon.svg';
    } else {
       
        logoImage.src = './assets/images/logo-dark-theme.svg';
        themeIcon.src = './assets/images/icon-sun.svg';
    }
});


const textInput = document.getElementById('text-input');
const charCountDisplay = document.getElementById('char-count');
const wordCountDisplay = document.getElementById('word-count');
const sentenceCountDisplay = document.getElementById('sentence-count');
const excludeSpacesCheckbox = document.getElementById('exclude-spaces-checkbox');
const readingTimeDisplay = document.getElementById('reading-time-display');
const densityContainer = document.getElementById('letter-density-container');
const seeMoreBtn = document.getElementById('see-more-btn');
const seeMoreText = document.getElementById('see-more-text');
const seeMoreIcon = document.getElementById('see-more-icon');
const charLimitCheckbox = document.getElementById('char-limit-checkbox');
const charLimitInput = document.getElementById('char-limit-input');
const limitErrorMsg = document.getElementById('limit-error-msg');
const limitErrorText = document.getElementById('limit-error-text');
const charCountLabel = document.getElementById('char-count-label');

let showAllDensity = false;

// Update all counts, warnings, reading time, and letter density in real-time when user types
textInput.addEventListener('input', function() {
    let text = textInput.value;

    // Count characters based on whether spaces are excluded
    let characterCount = 0;
    if (excludeSpacesCheckbox.checked) {
        let textWithoutSpaces = text.replace(/\s/g, '');
        characterCount = textWithoutSpaces.length;
    } else {
        characterCount = text.length;
    }

    // Count words by splitting on spaces and filtering empty strings
    let wordsArray = text.split(/\s+/).filter(function(word) {
        return word.trim() !== '';
    });
    let wordCount = wordsArray.length;

    // Count sentences by splitting on punctuation and newlines
    let sentencesArray = text.split(/[.!?\n]+/).filter(function(sentence) {
        return sentence.trim().length > 0; 
    });
    let sentenceCount = sentencesArray.length;

    // Display counts with leading zero for single-digit numbers
    charCountDisplay.innerText = characterCount < 10 ? '0' + characterCount : characterCount;
    wordCountDisplay.innerText = wordCount < 10 ? '0' + wordCount : wordCount;
    sentenceCountDisplay.innerText = sentenceCount < 10 ? '0' + sentenceCount : sentenceCount;

    // Handle character limit warning and highlight input if exceeded
    if (charLimitCheckbox.checked) {
        let limit = parseInt(charLimitInput.value) || 0;
        if (characterCount > limit) {
            limitErrorMsg.classList.add('show');
            limitErrorText.innerText = `Limit reached! Your text exceeds ${limit} characters.`;
            textInput.classList.add('limit-reached');
        } else {
            limitErrorMsg.classList.remove('show');
            textInput.classList.remove('limit-reached');
        }
    } else {
        limitErrorMsg.classList.remove('show');
        textInput.classList.remove('limit-reached');
    }

    // Calculate and display approximate reading time
    if (wordCount === 0) {
        readingTimeDisplay.innerText = "Approx. reading time: 0 minutes";
    } else if (wordCount < 200) {
        readingTimeDisplay.innerText = "Approx. reading time: <1 minute";
    } else {
        let minutes = Math.ceil(wordCount / 200);
        readingTimeDisplay.innerText = "Approx. reading time: " + minutes + " minutes";
    }

    // Extract only letters and convert to uppercase for density count
    let lettersOnly = text.replace(/[^a-zA-Z]/g, '').toUpperCase();

    // Count frequency of each letter
    let letterCounts = {};
    for (let i = 0; i < lettersOnly.length; i++) {
        let letter = lettersOnly[i];
        if (letterCounts[letter]) {
            letterCounts[letter] = letterCounts[letter] + 1;
        } else {
            letterCounts[letter] = 1; 
        }
    }

    // Convert letter counts to an array for sorting
    let sortableLetters = [];
    for (let letter in letterCounts) {
        sortableLetters.push([letter, letterCounts[letter]]);
    }

    // Sort letters by frequency descending
    sortableLetters.sort(function(a, b) {
        return b[1] - a[1];
    });

    // Determine which letters to display based on See More toggle
    let lettersToDisplay;
    if (showAllDensity) {
        lettersToDisplay = sortableLetters;
    } else {
        lettersToDisplay = sortableLetters.slice(0, 5);
    }

    // Show or hide the See More button depending on letter count
    if (sortableLetters.length > 5) {
        seeMoreBtn.style.display = 'flex'; 
    } else {
        seeMoreBtn.style.display = 'none'; 
    }

    // Clear previous letter density display
    densityContainer.innerHTML = '';
    let totalLettersCount = lettersOnly.length;

    // Display message if no letters typed yet
    if (totalLettersCount === 0) {
         densityContainer.innerHTML = '<p style="color: var(--neutral-200);">No letters found yet. Start typing to see letter density.</p>';
    } else {
        // Build and display letter density bars for each letter
        for (let i = 0; i < lettersToDisplay.length; i++) {
            let letterName = lettersToDisplay[i][0];
            let count = lettersToDisplay[i][1];
            let percentage = ((count / totalLettersCount) * 100).toFixed(2);

            densityContainer.innerHTML += `
              <div class="density-row">
                <span class="letter">${letterName}</span>
                <div class="bar-container">
                  <div class="bar-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="percentage">${count} (${percentage}%)</span>
              </div>
            `;
        }
    }
});

// Update character label when Exclude Spaces checkbox is toggled
excludeSpacesCheckbox.addEventListener('change', function() {
    if (excludeSpacesCheckbox.checked) {
        charCountLabel.innerText = "Total Characters (no space)";
    } else {
        charCountLabel.innerText = "Total Characters";
    }
    textInput.dispatchEvent(new Event('input')); 
});

// Show/hide character limit input when its checkbox is toggled
charLimitCheckbox.addEventListener('change', function() {
    if (charLimitCheckbox.checked) {
        charLimitInput.classList.add('show');
    } else {
        charLimitInput.classList.remove('show');
    }
    textInput.dispatchEvent(new Event('input')); 
});

// Recalculate counts when character limit input changes
charLimitInput.addEventListener('input', function() {
    textInput.dispatchEvent(new Event('input'));
});

// Toggle full/partial letter density display when See More button is clicked
seeMoreBtn.addEventListener('click', function() {
    showAllDensity = !showAllDensity;

    if (showAllDensity) {
        seeMoreText.innerText = "See less";
        seeMoreIcon.style.transform = "rotate(180deg)";
    } else {
        seeMoreText.innerText = "See more";
        seeMoreIcon.style.transform = "rotate(0deg)";
    }

    textInput.dispatchEvent(new Event('input')); 
});

// Trigger initial input event to populate counts and UI on page load
textInput.dispatchEvent(new Event('input'));