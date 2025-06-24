const advicetext = document.getElementById("advice-text")
const Id = document.getElementById("advice-id");
const dice = document.getElementById("dice");

const Advice = async () => {
  try {
    const advicefetch = await fetch('https://api.adviceslip.com/advice',
      {
        headers : {
          Accept : 'application/json',
        }
      }
    );

    const advicejson = await advicefetch.json();

    advicetext.innerText =  `"${advicejson.slip.advice}"`;
    Id.innerText = `Advice #${advicejson.slip.id}`;


  } catch (error) {
    console.log(error);
  }
}

dice.addEventListener("click", () =>
  Advice());