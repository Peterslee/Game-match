
function serialize(element) {
  var serializer = new XMLSerializer();
  var result = serializer.serializeToString(element);
  return result.replace(' xmlns="http://www.w3.org/1999/xhtml"', '');
}

function appendNewCardTest() {
  const ERROR = "FAILED::appendNewCardTest::";

  let parent = document.createElement("div");
  parent.id = "card-container";
  let returnValue = appendNewCard(parent);

  if (parent.children.length !== 1) {
    console.error(`${ERROR} This function should be appending a new element as a child of the 'parentElement' parameter but when we checked the number of children on 'parentElement' we got ${parent.children.length}.`);
    console.log("\nHere's what the HTML looks like:\n\n" + serialize(parent) + "\n\n");
    return false;
  }
  
  let card = parent.children[0];
  if (!card.classList.contains("card")) {
    console.error(`${ERROR} This function should be adding a card div with the class 'card' as the first child of 'parentElement' but the child of 'parentElement' doesn't have the 'card' class.`);
    console.log("\nHere's what the HTML looks like:\n\n" + serialize(parent) + "\n\n");
    return false;
  }

  if (card.children.length !== 2) {
    console.error(`${ERROR} card div should have 2 children, got ${card.children.length}. The card-container should have a div with the class card-down and another div with the class card-up.`);
    return false;
  }

  let cardDown = card.children[0];
  let cardUp = card.children[1];

  if (!cardDown.classList.contains("card-down")) {
    console.error(`${ERROR} card div's first child should have 'card-down' class, got ${cardDown.classList}. Make sure to add the card-down class to the first div inside card.`);
    return false;
  }

  if (!cardUp.classList.contains("card-up")) {
    console.error(`${ERROR} card div's second child should have 'card-up' class, got ${cardUp.classList}. Make sure to add the card-up class to the second div inside card.`);
    return false;
  }

  if (returnValue !== card) {
    console.error(`${ERROR} Remember to return the card! The return value of this function should be the card but that's not what we got.`);
    return false;
  }

  console.log("PASSED appendNewCardTest");
  return true;
}

function shuffleCardImageClassesTest() {
  const ERROR = "FAILED::shuffleCardImageClassesTest::";

  if (shuffleCardImageClasses == undefined) {
    console.error(ERROR + getUndefinedError("shuffleCardImageClassesTest"));
    return false;
  }

  let imageArray1 = shuffleCardImageClasses();
  let imageArray2 = shuffleCardImageClasses();
  let imageArray3 = shuffleCardImageClasses();
  let imageArray4 = shuffleCardImageClasses();

  if (typeof(imageArray1) !== "object") {
    console.error(`${ERROR}should return an array of strings but returned ${typeof(imageArray1)}. Make sure this function is defining and returning an array.`);
    return false;
  }

  if (imageArray1.length !== 12) {
    console.error(`${ERROR}should return an array of 12 strings but got ${imageArray1.length}.`);
    return false;
  }

  let allSame = true;
  let badName = "";

  for (let i = 0; i < imageArray1.length; i++) {
    // DANI NOTE: This didn't make it to later elements because of the continue statement below, using alternate method
    // allStrings &= typeof(imageArray1[i]) === "string";

    if (!imageArray1[i].startsWith("image-") ||
        imageArray1[i].length != 7 ||
        imageArray1[i][6] > '6' || 
        imageArray1[i][6] < '1') {
      badName = imageArray1[i];
    }

    if (imageArray1[i] == imageArray2[i] && 
        imageArray1[i] == imageArray3[i] && 
        imageArray1[i] == imageArray4[i]) {
      continue;
    }

    allSame = false;
    break;
  }
  // DANI NOTE: Using alternate method to check if all strings
  if (!imageArray1.every(element => (typeof element === "string"))) {
    console.error(`${ERROR}should return array of all strings but array elements were not all strings. Make sure all your elements are in fact all strings.`);
    return false;
  }
  
  if (allSame) {
    console.error(`${ERROR}should return random array but 4 comparison calls returned the same array. Make sure to shuffle!`);
    return false;
  }

  if (badName != "") {
    console.error(`${ERROR}should return array where names start with 'image-X' (1-6) but got '${badName}'.`);
    return false;
  }

  console.log("PASSED shuffleCardImageClassesTest");
  return true;
}

function createCardsTest() {
  const ERROR = "FAILED::createCardsTest::";

  if (createCards == undefined) {
    console.error(ERROR + getUndefinedError("createCards"));
    return false;
  }

  let parent = document.createElement("div");

  // DANI NOTE: I don't know if we want them to have the shuffleCardImageClasses function tested and working by this point, but if we do we should use that here to make it a more accurate test!
  let imageClasses = shuffleCardImageClasses() || [
    "image-1", "image-1", 
    "image-2", "image-2",
    "image-3", "image-3",
    "image-4", "image-4",
    "image-5", "image-5",
    "image-6", "image-6",
  ];
  
  cards = createCards(parent, imageClasses);

  if (parent.children.length != 12) {
    console.error(`${ERROR}should create 12 card objects as children but got ${parent.children.length}. Make sure you are adding the right number of cards to the card-grid-container!`);
    return false;
  }

  if (typeof(cards) !== "object" || cards.length == "undefined") {
    console.error(`${ERROR}should return an array of objects but returned ${typeof(cards)}.`);
    return false;
  }
  
  if (cards.length !== 12) {
    console.error(`${ERROR}should return 12 card objects as children but got ${parent.children.length}. Make sure you are pushing 12 cards onto your cards array!`);
    return false;
  }

  let badObject = null;
  cards.forEach((card) => {
    if (!card.hasOwnProperty("index") || !card.hasOwnProperty("element") || !card.hasOwnProperty("imageClass")) {
      badObject = card;
      return false;
    }
  });

  if (badObject !== null) {
    console.error(`${ERROR}card objects should each have index, element, and imageClass properties but got...`);
    console.error(badObject);
    return false;
  }

  console.log("PASSED createCardsTest");
  return true;
}

function doCardsMatchTest() {
  const ERROR = "FAILED::doCardsMatchTest::";

  if (doCardsMatch == undefined) {
    console.error(ERROR + getUndefinedError("doCardsMatch"));
    return false;
  }
  let cardA = {
    index: 5,
    element: document.createElement("div"),
    imageClass: "image-2"
  };
  let cardB = {
    index: 7,
    element: document.createElement("div"),
    imageClass: "image-2"
  }
  let cardC = {
    index: 9,
    element: document.createElement("div"),
    imageClass: "image-5"
  }

  if (!doCardsMatch(cardA, cardB)) {
    console.error(`${ERROR}should return 'true' for match but got 'false'.`);
    console.error(cardA);
    console.error(cardB);
    return false;
  }

  if (doCardsMatch(cardA, cardC)) {
    console.error(`${ERROR}should return 'false' for mismatch but got 'true'.`);
    console.error(cardA);
    console.error(cardC);
    return false;
  }

  console.log("PASSED doCardsMatchTest");
  return true;
}

function incrementCounterTest() {
  const ERROR = "FAILED::incrementCounterTest::";

  if (incrementCounter == undefined) {
    console.error(ERROR + getUndefinedError("incrementCounter"));
    return false;
  }

  let parentElement = document.createElement("div");

  incrementCounter("counter1", parentElement);
  let string1 = parentElement.innerHTML;
  let value1 = Number(parentElement.innerHTML);

  incrementCounter("counter1", parentElement);
  let string2 = parentElement.innerHTML;
  let value2 = Number(parentElement.innerHTML);

  if (!string1) {
    console.error(`${ERROR}parentElement has not been updated, make sure to change it's innerHTML.`);
    return false;
  }

  if (value1 !== 1) {
    console.error(`${ERROR}should place '1' in parent (counter should increase to 1) after first call but got '${string1}'`);
    return false;
  }

  if ((value2 - value1) !== 1) {
    console.error(`${ERROR}should increment value in parent by 1 but consecutive calls to the same counter but got '${string1}' and '${string2}'`);
    return false;
  }

  let parentElement2 = document.createElement("div");
  incrementCounter("newCounter", parentElement2);
  let string3 = parentElement2.innerHTML;
  let value3 = Number(parentElement2.innerHTML);

  if (value3 !== 1) {
    console.error(`${ERROR}should place '1' in parent after first call with new counterName but got '${string3}'`);
    return false;
  }

  console.log("PASSED incrementCounterTest");
  return true;
}

function runAllTests() {
  let tests = [
    appendNewCardTest, 
    shuffleCardImageClassesTest,
    createCardsTest,
    doCardsMatchTest,
    incrementCounterTest];
  let passed = true;

  tests.forEach((test) => {
    passed &= test();
  });

  if(passed) {
    console.log("ALL TESTS PASSES!!!!");
  } else {
    console.log("TEST RUN FAILED");
  }
}