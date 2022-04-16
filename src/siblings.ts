import * as jsx from "@virtualstate/focus";
import {ok} from "./like";

export const SiblingSet = Symbol.for("Sibling Set");

export interface SiblingsNode {
    /**
     * @internal use at your own risk
     */
    [SiblingSet]: Set<unknown>;
    h: typeof jsx.h;
    remove(node: unknown): boolean;
    clear(): void;
    children: AsyncIterable<unknown>;
}


export function createSiblings(): SiblingsNode {
    const siblings = new Set<unknown>();
    const node = jsx.h(Siblings);
    const api: Record<string | symbol, unknown> = {
        h,
        remove,
        clear,
        /**
         * @internal use at your own risk
         */
        [SiblingSet]: siblings
    }
    const proxied = new Proxy(node, {
        get(t, key) {
            if (api[key]) {
                return api[key];
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