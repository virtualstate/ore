import * as jsx from "@virtualstate/focus";
import {ok} from "./like";

export interface SiblingsNode {
    h: typeof jsx.h;
    remove(node: unknown): boolean;
    clear(): void;
    children: AsyncIterable<unknown>;
}

export function createSiblings(): SiblingsNode {
    const siblings = new Set();
    const node = jsx.h(Siblings);
    const proxied = new Proxy(node, {
        get(t, key) {
            if (key === "h") {
                return h;
            }
            if (key === "remove") {
                return remove;
            }
            if (key === "clear") {
                return clear;
            }
            return node[key];
        }
    });
    ok<SiblingsNode>(proxied);
    return proxied;

    function Siblings() {
        return siblings;
    }
    function h(source: unknown, options?: Record<string | symbol, unknown>, ...children: unknown[]) {
        const flatChildren = children.flatMap(value => value);
        const node = jsx.h(source, options, ...flatChildren);
        for (const child of flatChildren) {
            siblings.delete(child);
        }
        siblings.add(node);
        return node;
    }
    function remove(node: unknown) {
        return siblings.delete(node);
    }
    function clear() {
        siblings.clear();
    }
}