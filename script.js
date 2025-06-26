// DOM ELEMENT SELECTION
// We use getElementById to get references to HTML elements we need to manipulate
// This is more efficient than using querySelector for IDs

const advicetext = document.getElementById("advice-text");
// Get reference to the paragraph that displays the advice text
// We'll update the content of this element when we get new advice

const Id = document.getElementById("advice-id");
// Get reference to the paragraph that shows the advice number
// We'll update this to show the ID of the new advice

const dice = document.getElementById("dice");
// Get reference to the dice button
// We'll add a click event listener to this button

// MAIN FUNCTION TO FETCH ADVICE FROM API
// We use 'async' keyword because we're making an API call that takes time
// This allows us to use 'await' inside the function for cleaner asynchronous code
const Advice = async () => {
  // TRY-CATCH BLOCK
  // We wrap our API call in try-catch to handle any errors that might occur
  // This prevents our app from crashing if the API is down or network fails
  try {
    
    // FETCH API CALL
    // We use the modern fetch() method to make HTTP requests
    // await pauses execution until the fetch completes and returns a response
    const advicefetch = await fetch('https://api.adviceslip.com/advice', {
      // REQUEST HEADERS
      // We specify that we want JSON data back from the API
      // Some APIs require this header to return data in the correct format
      headers: {
        Accept: 'application/json',
      }
    });

    // PARSE JSON RESPONSE
    // The fetch response contains raw data that we need to convert to JavaScript objects
    // .json() method parses the JSON string into a usable JavaScript object
    // We use await because parsing can take time with large responses
    const advicejson = await advicefetch.json();

    // UPDATE DOM ELEMENTS WITH NEW DATA
    // We use .innerText instead of .innerHTML for security (prevents XSS attacks)
    // .innerText only sets text content, while .innerHTML can execute scripts

    // Update the advice text with the new advice from API
    // We add quotes around the advice and access the nested data structure
    // API returns: { slip: { advice: "text", id: number } }
    advicetext.innerText = `"${advicejson.slip.advice}"`;

    // Update the advice ID number
    // Template literal allows us to easily combine text and variables
    Id.innerText = `Advice #${advicejson.slip.id}`;

  } catch (error) {
    // ERROR HANDLING
    // If anything goes wrong (network error, API down, etc.), we log the error
    // In a production app, we might show a user-friendly error message instead
    console.log(error);
  }
}

// EVENT LISTENER FOR DICE BUTTON
// We add a click event listener to the dice button
// When clicked, it will execute our callback function
dice.addEventListener("click", () => {
  
  // VISUAL FEEDBACK - GLOW EFFECT
  // We add a glowing effect when the button is clicked for better user experience
  // This gives immediate feedback that the click was registered
  
  // Set a timer to remove the glow effect after 1 second (1000 milliseconds)
  // setTimeout allows us to execute code after a delay
  setTimeout(() => {
    dice.style.boxShadow = "";  // Remove the glow effect
  }, 1000);

  // FETCH NEW ADVICE
  // Call our async function to get new advice from the API
  // This happens immediately when the button is clicked
  Advice();

  // ADD GLOW EFFECT IMMEDIATELY
  // We apply a green glow effect using CSS box-shadow
  // The color matches our green theme (hsl(150, 100%, 66%))
  dice.style.boxShadow = "0 0 12px hsl(150, 100%, 66%)";
});