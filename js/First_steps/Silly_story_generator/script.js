const sillyStoryGenerator = document.querySelector('.silly-story-generator');
const ssgInput = sillyStoryGenerator.querySelector('#customname');
const ssgUs = sillyStoryGenerator.querySelector('#us');
const ssgUk = sillyStoryGenerator.querySelector('#uk');
const ssgButton = sillyStoryGenerator.querySelector('.randomize');
const ssgStory = document.querySelector('.story');

let ssgStoryText = `\
It was 94 fahrenheit outside, so :insertx: went for a walk.
When they got to :inserty:, they stared in horror for a few moments,
then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds,
and it was a hot day.
`

let ssgInsertxList = [
  'Willy the Goblin',
  'Big Daddy',
  'Father Christmas'
];

let ssgInsertyList = [
  'the soup kitchen',
  'Disneyland',
  'the White House'
];

let ssgInsertzList = [
  'spontaneously combusted',
  'melted into a puddle on the sidewalk',
  'turned into a slug and crawled away',
];

ssgButton.addEventListener('click', () => {
  let story = ssgStoryText;

  story = story.replaceAll(':insertx:', randomValueFromArray(ssgInsertxList));
  story = story.replace(':inserty:', randomValueFromArray(ssgInsertyList));
  story = story.replace(':insertz:', randomValueFromArray(ssgInsertzList));

  let name = ssgInput.value;
  name = name === '' ? "Bob" : name;
  story = story.replace('Bob', name);

  if (ssgUs.checked) {
    story = story.replace('94 fahrenheit', `${fahrenheitToCelsius(94)} celsius`);
    story = story.replace('300 pounds', `${poundsToStones(300)} stones`);
  }
  else if (ssgUk.checked) {
    story = story.replace('94 fahrenheit', `${CelsiusToFahrenheit(33.5)} fahrenheit`);
    story = story.replace('300 pounds', `${stonesToPounds(21.4)} pounds`);
  }

  ssgStory.textContent = story;
  ssgStory.style.visibility = 'visible';
});

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

function CelsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9 / 5) + 32);
}

function fahrenheitToCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) * 5 / 9);
}

function poundsToStones(pounds) {
  return Math.round(pounds / 14);
}

function stonesToPounds(stones) {
  return Math.round(stones * 14);
}
