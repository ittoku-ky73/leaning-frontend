const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alices = document.querySelectorAll('#alice-container img');

// // Callback Hell ver.
// setTimeout(() => {
//   alices[0].animate(aliceTumbling, aliceTiming);
//   setTimeout(() => {
//     alices[1].animate(aliceTumbling, aliceTiming);
//     setTimeout(() => {
//       alices[2].animate(aliceTumbling, aliceTiming);
//     }, aliceTiming.duration)
//   }, aliceTiming.duration)
// }, 0)

// // Arrow function ver.
// alices[0].animate(aliceTumbling, aliceTiming).finished
//   .then(() => alices[1].animate(aliceTumbling, aliceTiming).finished)
//   .then(() => alices[2].animate(aliceTumbling, aliceTiming).finished)
//   .catch((error) => console.error(`Error animating Alices: ${error}`));

// async await ver.
async function alicesRotating() {
  try {
    await alices[0].animate(aliceTumbling, aliceTiming).finished;
    await alices[1].animate(aliceTumbling, aliceTiming).finished;
    await alices[2].animate(aliceTumbling, aliceTiming).finished;
  }
  catch (error) {
    console.error(`Error animating Alices: ${error}`);
  }
  finally {
    console.log('Animation\'s promise is worked');
  }
}

alicesRotating();
