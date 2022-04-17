import * as jsx from "@virtualstate/focus";
import {ok} from "./like";
import {isUnknownJSXNode} from "@virtualstate/focus";

export const SiblingMap = Symbol.for("Sibling Map");

export interface SiblingsNode {
    /**
     * @internal use at your own risk
     */
    [SiblingMap]: Map<object, number>;
    h: typeof jsx.h;
    remove(node: unknown): boolean;
    clear(): void;
    children: AsyncIterable<unknown>;
}

export interface SiblingsOptions {
    referenceProperty?: string;
}

export function createSiblings({ referenceProperty }: SiblingsOptions = {}): SiblingsNode {
    let counter = -1;
    const siblings = new Map<object, number>();
    const node = jsx.h(Siblings);
    const api: Record<string | symbol, unknown> = {
        h,
        remove,
        clear,
        /**
         * @internal use at your own risk
         */
        [SiblingMap]: siblings
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
        return [...siblings.entries()]
            .sort(([,a], [,b]) => a < b ? -1 : 1)
            .map(([node]) => node);
    }
    function h(source: unknown, options?: Record<string | symbol, unknown>, ...children: unknown[]) {
        const flatChildren = children.flatMap(value => value);
        const node = jsx.h(source, options, ...flatChildren);
        for (const child of flatChildren) {
            if (isUnknownJSXNode(child)) {
                siblings.delete(child);
            }
        }
        if (referenceProperty) {
            const reference = jsx.properties(node)?.[referenceProperty];
            if (typeof reference === "string" && reference) {
                const existing = existingNode(reference);
                if (existing) {
                    const index = siblings.get(existing);
                    siblings.set(node, index);
                    remove(existing);
                    return node;
                }
            }
        }
        const index = counter += 1;
        siblings.set(node, index);
        return node;
    }

    function existingNode(reference: string) {
        return [...siblings.keys()].find(node => {
            return jsx.properties(node)?.[referenceProperty] === reference;
        });
    }

    function remove(node: object) {
        return siblings.delete(node);
    }
    function clear() {
        siblings.clear();
    }
}