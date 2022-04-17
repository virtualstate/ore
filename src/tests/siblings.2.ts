
import {change, replace} from "./siblings.1";

// do some async task
await new Promise<void>(queueMicrotask);

// Then modify the node again!
await change();

// do some async task
await new Promise<void>(queueMicrotask);

// Then modify the node again!
await replace();


export default 1;