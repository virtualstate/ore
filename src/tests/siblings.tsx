import { createSiblings } from "@virtualstate/ore";
import { toKDLString } from "@virtualstate/kdl";

const node = createSiblings();
const { h } = node;

<h1>Hello</h1>;

console.log("This is a log!");

<main>
    <p>Whats up</p>
</main>;

console.log(await toKDLString(node));