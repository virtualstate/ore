import * as jsx from "@virtualstate/focus";

export function createSiblings() {
    const siblings: unknown[] = [];
    const node = jsx.h(Siblings);
    return new Proxy(node, {
        get(t, key) {
            if (key === "h") {
                return h;
            }
            return node[key];
        }
    });
    function Siblings() {
        return siblings;
    }
    function h(source: unknown, options?: Record<string | symbol, unknown>, ...children: unknown[]) {
        const flatChildren = children.flatMap(value => value);
        const node = jsx.h(source, options, ...flatChildren);
        for (const child of flatChildren) {
            const index = siblings.indexOf(child);
            if (index > -1) {
                siblings.splice(index, 1);
            }
        }
        siblings.push(node);
        return node;
    }
}