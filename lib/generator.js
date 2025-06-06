export function* colorCycle(colors = ['red', 'green', 'blue']) {
  let index = 0;
  while (true) {
    yield colors[index % colors.length];
    index++;
  }
}