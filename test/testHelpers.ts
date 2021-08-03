/* eslint-disable */

/**
 * License: zlib/libpng
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/forget-me-not
 */

import { assert } from "chai";
import { Suite } from "mocha";

export interface SpyData {
  (...args: any[]): any;
  callCount: number;
  thisValues: any[];
  args: any[][];
  assertCalls: (args: any[], thisValues?: any[]) => void;
  assertNoCall: () => void;
  reset: () => void;
}

// tslint:disable-next-line:ban-types
export function createSpy(wrappedFunction?: Function) {
  const spyData = function (...args: any[]) {
    spyData.callCount++;
    // @ts-ignore
    spyData.thisValues.push(this);
    spyData.args.push(Array.from(args));

    if (wrappedFunction) {
      // @ts-ignore
      return wrappedFunction.apply(this, args);
    }
  } as SpyData;
  spyData.callCount = 0;
  spyData.thisValues = [];
  spyData.args = [];
  spyData.assertCalls = (args, thisValues?) => {
    assert.deepEqual(spyData.args, args);
    if (thisValues) assert.deepEqual(spyData.thisValues, thisValues);
    spyData.reset();
  };
  spyData.assertNoCall = () => {
    assert.strictEqual(spyData.callCount, 0);
  };

  spyData.reset = () => {
    spyData.callCount = 0;
    spyData.thisValues.length = 0;
    spyData.args.length = 0;
  };
  return spyData;
}

export function spyOn<T>(instance: T, method: keyof T) {
  const original = instance[method];
  assert.isFunction(original);
  const spy = createSpy(original as any);
  instance[method] = spy as any;
  return spy;
}

export const clone = (value: any) => JSON.parse(JSON.stringify(value));

export function ensureNotNull<T>(value: T | null): T {
  assert.isNotNull(value);
  // @ts-ignore
  return value;
}

// tslint:disable-next-line:ban-types
export function doneHandler<T extends Function>(
  handler: T,
  done: Mocha.Done,
  doneCondition?: () => boolean
) {
  return (...args: any[]) => {
    try {
      handler.apply(null, args);
      if (!doneCondition || doneCondition()) done();
    } catch (e) {
      done(e);
    }
  };
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function booleanVariations(count: number): boolean[][] {
  const result: boolean[][] = [];
  const size = Math.pow(2, count);
  for (let i = 0; i < size; i++) {
    const entry = i
      .toString(2)
      .split("")
      .map((b) => (b === "0" ? false : true));
    while (entry.length !== count) entry.unshift(false);
    result.push(entry);
  }
  return result;
}

function getArgs(func: (...value: boolean[]) => void): string[] {
  const match = /.*\(([^)]*)\)/.exec(func.toString());
  if (!match) throw new Error("Can't detect argument names for function");

  return match[1]
    .split(",")
    .map((arg: string) => arg.replace(/\/\*.*\*\//, "").trim())
    .filter((arg: string) => arg);
}

export interface SimpleSuiteFunction<T> {
  (callback: T): void;
  only: (callback: T) => void;
}
function createSimpleSuiteFunction<T>(
  wrapper: (
    context: (title: string, fn: (this: Suite) => void) => Suite,
    callback: T
  ) => void
) {
  const result: SimpleSuiteFunction<T> = (callback: T) =>
    wrapper(context, callback);
  result.only = (callback: T) => wrapper(context.only, callback);
  return result;
}

export const booleanContext = createSimpleSuiteFunction<
  (...value: boolean[]) => void
>((context, callback) => {
  const names = getArgs(callback);
  booleanVariations(names.length).forEach((booleans) => {
    const label =
      "with " +
      booleans.map((value, index) => `${names[index]} = ${value}`).join(", ");

    context(label, () => callback.apply(null, booleans));
  });
});

type ContextWithResultRow<CT, RT> = { context: CT; result: RT };

export function contextWithResult<CT, RT>(
  name: string,
  rows: Array<ContextWithResultRow<CT, RT>>,
  callback: (context: CT, result: RT) => void
) {
  rows.forEach((row) =>
    context(`with ${name} = ${row.context}`, () =>
      callback(row.context, row.result)
    )
  );
}

// tslint:disable-next-line:no-namespace
export namespace contextWithResult {
  export function only<CT, RT>(
    name: string,
    rows: Array<ContextWithResultRow<CT, RT>>,
    callback: (context: CT, result: RT) => void
  ): void {
    rows.forEach((row) =>
      context.only(`with ${name} = ${row.context}`, () =>
        callback(row.context, row.result)
      )
    );
  }
}
