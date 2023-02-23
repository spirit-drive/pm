type Func<A, B> = (a: A) => B;

export function compose<
  F1 extends Func<unknown, unknown>,
  FN extends Array<Func<unknown, unknown>>,
  R extends FN extends []
    ? F1
    : FN extends [Func<infer A, unknown>]
    ? (a: A) => ReturnType<F1>
    : FN extends [unknown, Func<infer A, unknown>]
    ? (a: A) => ReturnType<F1>
    : FN extends [unknown, unknown, Func<infer A, unknown>]
    ? (a: A) => ReturnType<F1>
    : FN extends [unknown, unknown, unknown, Func<infer A, unknown>]
    ? (a: A) => ReturnType<F1>
    : FN extends [unknown, unknown, unknown, unknown, Func<infer A, unknown>]
    ? (a: A) => ReturnType<F1>
    : FN extends [unknown, unknown, unknown, unknown, unknown, Func<infer A, unknown>]
    ? (a: A) => ReturnType<F1>
    : FN extends [unknown, unknown, unknown, unknown, unknown, unknown, Func<infer A, unknown>]
    ? (a: A) => ReturnType<F1>
    : Func<unknown, ReturnType<F1>>
>(func: F1, ...funcs: FN): R {
  const allFuncs = [func, ...funcs];
  return function composed(raw: unknown) {
    return allFuncs.reduceRight((memo, _func) => _func.call(this, memo), raw);
  } as R;
}
