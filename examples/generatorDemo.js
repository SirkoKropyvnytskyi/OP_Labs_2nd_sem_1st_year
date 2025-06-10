import { colorCycle } from '../lib/generator.js';

const gen = colorCycle(1);

for (let i = 0; i < 6; i++) {
  console.log(gen.next().value); // red, green, blue, red, green, blue
}
