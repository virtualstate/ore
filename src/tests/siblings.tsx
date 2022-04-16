import { createSiblings } from "@virtualstate/ore";
import { toKDLString } from "@virtualstate/kdl";

const node = createSiblings();
const { h, remove, clear } = node;

<h1>Hello</h1>;

console.log("This is a log!");

<main>
    <p>Whats up</p>
</main>;

console.log(await toKDLString(node));

const footer = <footer>Hello</footer>

console.log(await toKDLString(node));

remove(footer);

console.log("after");

<footer>Different footer????</footer>

console.log(await toKDLString(node));


clear();
console.log("cleared");

<div class="main">
    <h1>Start again</h1>
    <p>Whats up</p>
    <section>
        This is in a section
    </section>
</div>;

<div class="footer-container">
    <footer>This is the footer</footer>
</div>

console.log(await toKDLString(node));