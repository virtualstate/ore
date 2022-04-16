// assert based functions
/* c8 ignore start */

export function isLike<T>(value: unknown, ...and: unknown[]): value is T {
  if (!and.length) return !!value;
  return !!value && and.every((value) => !!value);
}

export function ok(
  value: unknown,
  message?: string,
  ...conditions: unknown[]
): asserts value;
export function ok<T>(
  value: unknown,
  message?: string,
  ...conditions: unknown[]
): asserts value is T;
export function ok(
  value: unknown,
  message?: string,
  ...conditions: unknown[]
): asserts value {
  if (conditions.length ? !conditions.every((value) => value) : !value) {
    // console.log({ conditions, value })
    throw new Error(message ?? "Expected value");
  }
}

export function isRejected<R extends PromiseRejectedResult>(
  value: PromiseSettledResult<unknown>
): value is R {
  return value?.status === "rejected";
}

export function isFulfilled<T>(
  value: PromiseSettledResult<T>
): value is PromiseFulfilledResult<T> {
  return value?.status === "fulfilled";
}