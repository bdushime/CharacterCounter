# Character Counter

A beautiful, interactive character and word counting tool built with HTML, CSS, and Vanilla JavaScript. Analyze your text in real-time, get an approximate reading time, and explore your text's unique letter density. 

## Features

- **Real-Time Analytics:** Instantly view character, word, and sentence counts as you type.
- **Letter Density:** Dynamically calculates and displays the frequency of the letters you use in an interactive bar chart.
- **Reading Time Estimation:** Automatically calculates roughly how many minutes it will take to read your text based on an average speed of 200 words per minute.
- **Exclude Spaces Option:** Toggle this feature to count strict characters without padding from spaces or newlines. 
- **Character Limits:** Set custom maximum character limits and receive a visual warning when you exceed them.
- **Dark & Light Mode:** Seamlessly toggle between two stunning, responsive color themes built with custom CSS variables.

## Technologies Used

- **HTML5:** Semantic markup structure.
- **CSS3:** Custom properties (Variables), Flexbox layouts, Transitions, and pseudo-classes.
- **Vanilla JavaScript:** DOM manipulation, Event Listeners, built-in string/array methods (Split, Filter, Replace, Regex), and Object-oriented tallying patterns.

## Concept Highlights

This project demonstrates core knowledge of several foundational web development concepts:

1. **State Management:** Tracking variables (like `showAllDensity`) across event listeners to control UI logic.
2. **Regular Expressions (Regex):** Pattern matching to accurately split text into sentences `/[.!?\n]+/` and strip punctuation for data analysis.
3. **Data Transformation:** Converting raw strings into arrays, mapping frequencies into objects, and sorting that data to generate dynamic HTML visuals.
4. **Responsive UI Toggles:** Injecting CSS classes (`.light-theme`, `.limit-reached`) dynamically via JavaScript based on user interactions.

## How to Run

1. Clone this repository to your local machine:
   ```bash
   git clone <your-repository-url>
   ```
2. Open the project folder.
3. Open `index.html` in your favorite web browser.
   - *No build tools, npm packages, or local servers required!*

## Acknowledgements

Built to showcase foundational DOM manipulation and responsive CSS design without relying on heavy frameworks. Ideal for visualizing strings and array algorithms in an interactive way.
