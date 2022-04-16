
import { change } from "./siblings.1";

// do some async task
await new Promise<void>(queueMicrotask);

// Then modify the node again!
await change();




export default 1;