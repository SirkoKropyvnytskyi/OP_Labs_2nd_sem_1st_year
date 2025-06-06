import { colorCycle } from '../lib/generator.js';

const gen = colorCycle();

for (let i = 0; i < 6; i++) {
  console.log(gen.next().value); // red, green, blue, red, green, blue
}
