import {createSiblings, SiblingMap} from "@virtualstate/ore";
import { toKDLString } from "@virtualstate/kdl";
import {toJSON} from "@virtualstate/focus";

const node = createSiblings({
    referenceProperty: "id"
});
const { h, remove, clear, [SiblingMap]: map } = node;

// void shows that we don't need to read the return value from the expression
// we could use brackets () or {}, semicolons, or expressions to split up jsx blocks
void (
    <h1>Hello</h1>
)

console.log("This is a log!");

<main>
    <p>Whats up</p>
</main>

console.log(await toKDLString(node));

// We can re-use this later
const Footer = <footer class="original">Original footer</footer>

console.log(await toKDLString(node));

remove(Footer);

console.log("after");

<footer>Different footer????</footer>

console.log(await toKDLString(node));


clear();
console.log("cleared");

{
    <div class="main" id="main">
        <h1>Start again</h1>
        <p>Whats up</p>
        <section>
            This is in a section
        </section>
    </div>
}

{
    <div class="footer-container">
        <Footer/>
    </div>
}

console.log(map);

console.log(await toKDLString(node));

export async function change() {
    const random = Math.random();
    (
        <div>
            <a href="https://example.com">Added link {random}</a>
        </div>
    )
    console.log(`Added link ${random}`);
    console.log(await toKDLString(node));
}

export async function replace() {
    const random = Math.random();
    (
        <main class="replaced" id="main">
            <h1>Replaced {random}</h1>
        </main>
    )
    console.log(`Replaced main with ${random}`);
    console.log(await toKDLString(node));
}
