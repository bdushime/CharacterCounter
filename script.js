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

textInput.addEventListener('input', function() {
   
    let text = textInput.value;

    
    let characterCount = 0;
    
    if (excludeSpacesCheckbox.checked) {
        let textWithoutSpaces = text.replace(/\s/g, '');
        characterCount = textWithoutSpaces.length;
    } else {
        
        characterCount = text.length;
    }

    let wordsArray = text.split(/\s+/).filter(function(word) {
        return word.trim() !== '';
    });
    let wordCount = wordsArray.length;

    let sentencesArray = text.split(/[.!?\n]+/).filter(function(sentence) {
        return sentence.trim().length > 0; 
    });
    
    let sentenceCount = sentencesArray.length;


    charCountDisplay.innerText = characterCount < 10 ? '0' + characterCount : characterCount;
    wordCountDisplay.innerText = wordCount < 10 ? '0' + wordCount : wordCount;
    sentenceCountDisplay.innerText = sentenceCount < 10 ? '0' + sentenceCount : sentenceCount;

  
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

    if (wordCount === 0) {
        readingTimeDisplay.innerText = "Approx. reading time: 0 minutes";
    } else if (wordCount < 200) {
        
        readingTimeDisplay.innerText = "Approx. reading time: <1 minute";
    } else {
      
        let minutes = Math.ceil(wordCount / 200);
        readingTimeDisplay.innerText = "Approx. reading time: " + minutes + " minutes";
    }

    let lettersOnly = text.replace(/[^a-zA-Z]/g, '').toUpperCase();

    let letterCounts = {};
    for (let i = 0; i < lettersOnly.length; i++) {
        let letter = lettersOnly[i];
        if (letterCounts[letter]) {
            letterCounts[letter] = letterCounts[letter] + 1;
        } else {
            letterCounts[letter] = 1; 
        }
    }

    let sortableLetters = [];
    for (let letter in letterCounts) {
        sortableLetters.push([letter, letterCounts[letter]]);
    }

    sortableLetters.sort(function(a, b) {
        return b[1] - a[1];
    });


    let lettersToDisplay;
    if (showAllDensity) {
        lettersToDisplay = sortableLetters;
    } else {
        lettersToDisplay = sortableLetters.slice(0, 5);
    }

    if (sortableLetters.length > 5) {
        seeMoreBtn.style.display = 'flex'; 
    } else {
        seeMoreBtn.style.display = 'none'; 
    }

    densityContainer.innerHTML = '';
    let totalLettersCount = lettersOnly.length;

    if (totalLettersCount === 0) {
         densityContainer.innerHTML = '<p style="color: var(--neutral-200);">No letters found yet. Start typing to see letter density.</p>';
    } else {
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

excludeSpacesCheckbox.addEventListener('change', function() {
    
    if (excludeSpacesCheckbox.checked) {
        charCountLabel.innerText = "Total Characters (no space)";
    } else {
        charCountLabel.innerText = "Total Characters";
    }
    textInput.dispatchEvent(new Event('input'));
});


charLimitCheckbox.addEventListener('change', function() {
    if (charLimitCheckbox.checked) {
        charLimitInput.classList.add('show');
    } else {
        charLimitInput.classList.remove('show');
    }
    textInput.dispatchEvent(new Event('input'));
});


charLimitInput.addEventListener('input', function() {
    textInput.dispatchEvent(new Event('input'));
});


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

textInput.dispatchEvent(new Event('input'));
