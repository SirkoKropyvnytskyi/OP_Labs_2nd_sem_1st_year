import { numberIterator, timeoutIterator } from "../lib/iterator.js";

const iterator = numberIterator();
timeoutIterator(500, 5, iterator);