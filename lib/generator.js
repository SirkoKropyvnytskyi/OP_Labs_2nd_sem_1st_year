export function* colorCycle(initialValue = 0) {
  console.log("initialValue:" + initialValue)
  let index = initialValue
  while (true) {
    console.log("index:" + index)
    yield colors[index % colors.length];
    index++;
  }
}

const colors = ['red', 'green', 'blue', 'violet']