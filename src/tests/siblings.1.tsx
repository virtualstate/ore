import {createSiblings, SiblingSet} from "@virtualstate/ore";
import { toKDLString } from "@virtualstate/kdl";
import {toJSON} from "@virtualstate/focus";

const node = createSiblings();
const { h, remove, clear, [SiblingSet]: set } = node;

// void shows that we don't need to read the return value from the expression

void (
    <h1>Hello</h1>
)

console.log("This is a log!");

void (
    <main>
        <p>Whats up</p>
    </main>
)

console.log(await toKDLString(node));

const Footer = <footer>Original footer</footer>

console.log(await toKDLString(node));

remove(Footer);

console.log("after");

void (
    <footer>Different footer????</footer>
)

console.log(await toKDLString(node));


clear();
console.log("cleared");

void (
    <div class="main">
        <h1>Start again</h1>
        <p>Whats up</p>
        <section>
            This is in a section
        </section>
    </div>
)

void (
    <div class="footer-container">
        <Footer />
    </div>
)

console.log(set);

console.log(await toKDLString(node));

export async function change() {
    const random = Math.random();
    void (
        <div>
            <a href="https://example.com">Added link {random}</a>
        </div>
    )
    console.log(`Added link ${random}`);
    console.log(await toKDLString(node));
}