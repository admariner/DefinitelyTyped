export interface Dictionary<T> {
    [key: string]: T;
}
export type IterableCollection<T> = T[] | IterableIterator<T> | Dictionary<T>;

export interface ErrorCallback<E = Error> {
    (err?: E | null): void;
}
export interface AsyncBooleanResultCallback<E = Error> {
    (err?: E | null, truthValue?: boolean): void;
}
export interface AsyncResultCallback<T, E = Error> {
    (err?: E | null, result?: T): void;
}
export interface AsyncResultArrayCallback<T, E = Error> {
    (err?: E | null, results?: Array<T | undefined>): void;
}
export interface AsyncResultObjectCallback<T, E = Error> {
    (err: E | undefined, results: Dictionary<T | undefined>): void;
}

export interface AsyncFunction<T, E = Error> {
    (callback: (err?: E | null, result?: T) => void): void;
}
export interface AsyncFunctionEx<T, E = Error> {
    (callback: (err?: E | null, ...results: T[]) => void): void;
}
export interface AsyncIterator<T, E = Error> {
    (item: T, callback: ErrorCallback<E>): void;
}
export interface AsyncForEachOfIterator<T, E = Error> {
    (item: T, key: number | string, callback: ErrorCallback<E>): void;
}
export interface AsyncResultIterator<T, R, E = Error> {
    (item: T, callback: AsyncResultCallback<R, E>): void;
}
export interface AsyncMemoIterator<T, R, E = Error> {
    (memo: R | undefined, item: T, callback: AsyncResultCallback<R, E>): void;
}
export interface AsyncBooleanIterator<T, E = Error> {
    (item: T, callback: AsyncBooleanResultCallback<E>): void;
}

export interface AsyncWorker<T, E = Error> {
    (task: T, callback: ErrorCallback<E>): void;
}
export interface AsyncVoidFunction<E = Error> {
    (callback: ErrorCallback<E>): void;
}

export type AsyncAutoTasks<R extends Dictionary<any>, E> = { [K in keyof R]: AsyncAutoTask<R[K], R, E> };
export type AsyncAutoTask<R1, R extends Dictionary<any>, E> =
    | AsyncAutoTaskFunctionWithoutDependencies<R1, E>
    | Array<keyof R | AsyncAutoTaskFunction<R1, R, E>>;
export interface AsyncAutoTaskFunctionWithoutDependencies<R1, E = Error> {
    (cb: AsyncResultCallback<R1, E> | ErrorCallback<E>): void;
}
export interface AsyncAutoTaskFunction<R1, R extends Dictionary<any>, E = Error> {
    (results: R, cb: AsyncResultCallback<R1, E> | ErrorCallback<E>): void;
}

export interface DataContainer<T> {
    data: T;
    priority: number;
}

export interface CallbackContainer {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    callback: Function;
}

export interface PriorityContainer {
    priority: number;
}

export interface QueueObject<T> {
    /**
     * Returns the number of items waiting to be processed.
     */
    length(): number;

    /**
     * Indicates whether or not any items have been pushed and processed by the queue.
     */
    started: boolean;

    /**
     * Returns the number of items currently being processed.
     */
    running(): number;

    /**
     * Returns an array of items currently being processed.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    workersList<TWorker extends DataContainer<T>, CallbackContainer>(): TWorker[];

    /**
     * Returns false if there are items waiting or being processed, or true if not.
     */
    idle(): boolean;

    /**
     * An integer for determining how many worker functions should be run in parallel.
     * This property can be changed after a queue is created to alter the concurrency on-the-fly.
     */
    concurrency: number;

    /**
     * An integer that specifies how many items are passed to the worker function at a time.
     * Only applies if this is a cargo object
     */
    payload: number;

    /**
     * Add a new task to the queue. Calls `callback` once the worker has finished
     * processing the task.
     *
     * Instead of a single task, a tasks array can be submitted.
     * The respective callback is used for every task in the list.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    push<R>(task: T | T[]): Promise<R>;
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    push<R, E = Error>(task: T | T[], callback: AsyncResultCallback<R, E>): void;

    /**
     * Add a new task to the front of the queue
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    unshift<R>(task: T | T[]): Promise<R>;
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    unshift<R, E = Error>(task: T | T[], callback: AsyncResultCallback<R, E>): void;

    /**
     * The same as `q.push`, except this returns a promise that rejects if an error occurs.
     * The `callback` arg is ignored
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    pushAsync<R>(task: T | T[]): Promise<R>;

    /**
     * The same as `q.unshift`, except this returns a promise that rejects if an error occurs.
     * The `callback` arg is ignored
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    unshiftAsync<R>(task: T | T[]): Promise<R>;

    /**
     * Remove items from the queue that match a test function.
     * The test function will be passed an object with a `data` property,
     * and a `priority` property, if this is a `priorityQueue` object.
     */
    remove(filter: (node: DataContainer<T>) => boolean): void;

    /**
     * A function that sets a callback that is called when the number of
     * running workers hits the `concurrency` limit, and further tasks will be
     * queued.
     *
     * If the callback is omitted, `q.saturated()` returns a promise
     * for the next occurrence.
     */
    saturated(): Promise<void>;
    saturated(handler: () => void): void;

    /**
     * A function that sets a callback that is called when the number
     * of running workers is less than the `concurrency` & `buffer` limits,
     * and further tasks will not be queued
     *
     * If the callback is omitted, `q.unsaturated()` returns a promise
     * for the next occurrence.
     */
    unsaturated(): Promise<void>;
    unsaturated(handler: () => void): void;

    /**
     * A minimum threshold buffer in order to say that the `queue` is `unsaturated`.
     */
    buffer: number;

    /**
     * A function that sets a callback that is called when the last item from the `queue`
     * is given to a `worker`.
     *
     * If the callback is omitted, `q.empty()` returns a promise for the next occurrence.
     */
    empty(): Promise<void>;
    empty(handler: () => void): void;

    /**
     * A function that sets a callback that is called when the last item from
     * the `queue` has returned from the `worker`.
     *
     * If the callback is omitted, `q.drain()` returns a promise for the next occurrence.
     */
    drain(): Promise<void>;
    drain(handler: () => void): void;

    /**
     * A function that sets a callback that is called when a task errors.
     *
     * If the callback is omitted, `q.error()` returns a promise that rejects on the next error.
     */
    error(): Promise<never>;
    error(handler: (error: Error, task: T) => void): void;

    /**
     * A boolean for determining whether the queue is in a paused state.
     */
    paused: boolean;

    /**
     * A function that pauses the processing of tasks until `q.resume()` is called.
     */
    pause(): void;

    /**
     * A function that resumes the processing of queued tasks when the queue
     * is paused.
     */
    resume(): void;

    /**
     * A function that removes the drain callback and empties remaining tasks
     * from the queue forcing it to go idle. No more tasks should be pushed to
     * the queue after calling this function.
     */
    kill(): void;
}

/**
 * A priorityQueue object to manage the tasks.
 *
 * There are two differences between queue and priorityQueue objects:
 * - `push(task, priority, [callback])` — priority should be a number. If an array of tasks is given, all tasks will be assigned the same priority.
 * - The `unshift` method was removed.
 */
// FIXME: can not use Omit due to ts version restriction. Replace Pick with Omit, when ts 3.5+ will be allowed
export interface AsyncPriorityQueue<T> extends Pick<QueueObject<T>, Exclude<keyof QueueObject<T>, "push" | "unshift">> {
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    push<R>(task: T | T[], priority?: number): Promise<R>;
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    push<R, E = Error>(task: T | T[], priority: number, callback: AsyncResultCallback<R, E>): void;
}

/**
 * @deprecated this is a type that left here for backward compatibility.
 * Please use QueueObject instead
 */
export type AsyncQueue<T> = QueueObject<T>;

/**
 * @deprecated this is a type that left here for backward compatibility.
 * Please use QueueObject instead
 */
export type AsyncCargoQueue<T = any> = QueueObject<T>;

// Collections
export function each<T, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncIterator<T, E>,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function each<T, E = Error>(arr: IterableCollection<T>, iterator: AsyncIterator<T, E>): Promise<void>;
export const eachSeries: typeof each;
export function eachLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncIterator<T, E>,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function eachLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncIterator<T, E>,
): Promise<void>;
export const forEach: typeof each;
export const forEachSeries: typeof each;
export const forEachLimit: typeof eachLimit;
export function forEachOf<T, E = Error>(
    obj: IterableCollection<T>,
    iterator: AsyncForEachOfIterator<T, E>,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function forEachOf<T, E = Error>(
    obj: IterableCollection<T>,
    iterator: AsyncForEachOfIterator<T, E>,
): Promise<void>;
export const forEachOfSeries: typeof forEachOf;
export function forEachOfLimit<T, E = Error>(
    obj: IterableCollection<T>,
    limit: number,
    iterator: AsyncForEachOfIterator<T, E>,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function forEachOfLimit<T, E = Error>(
    obj: IterableCollection<T>,
    limit: number,
    iterator: AsyncForEachOfIterator<T, E>,
): Promise<void>;
export const eachOf: typeof forEachOf;
export const eachOfSeries: typeof forEachOf;
export const eachOfLimit: typeof forEachOfLimit;
export function map<T, R, E = Error>(
    arr: T[] | IterableIterator<T> | Dictionary<T>,
    iterator: AsyncResultIterator<T, R, E>,
    callback: AsyncResultArrayCallback<R, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function map<T, R, E = Error>(
    arr: T[] | IterableIterator<T> | Dictionary<T>,
    iterator: AsyncResultIterator<T, R, E>,
): Promise<R[]>;
export const mapSeries: typeof map;
export function mapLimit<T, R, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncResultIterator<T, R, E>,
    callback: AsyncResultArrayCallback<R, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function mapLimit<T, R, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncResultIterator<T, R, E>,
): Promise<R[]>;

export function mapValuesLimit<T, R, E = Error>(
    obj: Dictionary<T>,
    limit: number,
    iteratee: (value: T, key: string, callback: AsyncResultCallback<R, E>) => void,
    callback: AsyncResultObjectCallback<R, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function mapValuesLimit<T, R, E = Error>(
    obj: Dictionary<T>,
    limit: number,
    iteratee: (value: T, key: string, callback: AsyncResultCallback<R, E>) => void,
): Promise<R>;

export function mapValues<T, R, E = Error>(
    obj: Dictionary<T>,
    iteratee: (value: T, key: string, callback: AsyncResultCallback<R, E>) => void,
    callback: AsyncResultObjectCallback<R, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function mapValues<T, R, E = Error>(
    obj: Dictionary<T>,
    iteratee: (value: T, key: string, callback: AsyncResultCallback<R, E>) => void,
): Promise<R>;
export const mapValuesSeries: typeof mapValues;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function filter<T, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncBooleanIterator<T, E>,
    callback: AsyncResultArrayCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function filter<T, E = Error>(arr: IterableCollection<T>, iterator: AsyncBooleanIterator<T, E>): Promise<T[]>;
export const filterSeries: typeof filter;
export function filterLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncBooleanIterator<T, E>,
    callback: AsyncResultArrayCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function filterLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncBooleanIterator<T, E>,
): Promise<T[]>;
export const select: typeof filter;
export const selectSeries: typeof filter;
export const selectLimit: typeof filterLimit;
export const reject: typeof filter;
export const rejectSeries: typeof filter;
export const rejectLimit: typeof filterLimit;
export function reduce<T, R, E = Error>(
    arr: T[] | IterableIterator<T>,
    memo: R,
    iterator: AsyncMemoIterator<T, R, E>,
    callback?: AsyncResultCallback<R, E>,
): void;
export const inject: typeof reduce;
export const foldl: typeof reduce;
export const reduceRight: typeof reduce;
export const foldr: typeof reduce;
export function detect<T, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncResultCallback<T, E>,
): void;
export const detectSeries: typeof detect;
export function detectLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncResultCallback<T, E>,
): void;
export const find: typeof detect;
export const findSeries: typeof detect;
export const findLimit: typeof detectLimit;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function sortBy<T, V, E = Error>(
    arr: T[] | IterableIterator<T>,
    iterator: AsyncResultIterator<T, V, E>,
    callback?: AsyncResultArrayCallback<T, E>,
): void;
export function some<T, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncBooleanResultCallback<E>,
): void;
export const someSeries: typeof some;
export function someLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncBooleanResultCallback<E>,
): void;
export const any: typeof some;
export const anySeries: typeof someSeries;
export const anyLimit: typeof someLimit;
export function every<T, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncBooleanResultCallback<E>,
): void;
export const everySeries: typeof every;
export function everyLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncBooleanResultCallback<E>,
): void;
export const all: typeof every;
export const allSeries: typeof every;
export const allLimit: typeof everyLimit;

export function concat<T, R, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncResultIterator<T, R[], E>,
    callback?: AsyncResultArrayCallback<R, E>,
): void;
export function concatLimit<T, R, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncResultIterator<T, R[], E>,
    callback?: AsyncResultArrayCallback<R, E>,
): void;
export const concatSeries: typeof concat;

// Control Flow
export function series<T, E = Error>(
    tasks: Array<AsyncFunction<T, E>>,
    callback?: AsyncResultArrayCallback<T, E>,
): void;
export function series<T, E = Error>(
    tasks: Dictionary<AsyncFunction<T, E>>,
    callback?: AsyncResultObjectCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function series<T, R, E = Error>(
    tasks: Array<AsyncFunction<T, E>> | Dictionary<AsyncFunction<T, E>>,
): Promise<R>;
export function parallel<T, E = Error>(
    tasks: Array<AsyncFunction<T, E>>,
    callback?: AsyncResultArrayCallback<T, E>,
): void;
export function parallel<T, E = Error>(
    tasks: Dictionary<AsyncFunction<T, E>>,
    callback?: AsyncResultObjectCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function parallel<T, R, E = Error>(
    tasks: Array<AsyncFunction<T, E>> | Dictionary<AsyncFunction<T, E>>,
): Promise<R>;
export function parallelLimit<T, E = Error>(
    tasks: Array<AsyncFunction<T, E>>,
    limit: number,
    callback?: AsyncResultArrayCallback<T, E>,
): void;
export function parallelLimit<T, E = Error>(
    tasks: Dictionary<AsyncFunction<T, E>>,
    limit: number,
    callback?: AsyncResultObjectCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function parallelLimit<T, R, E = Error>(
    tasks: Array<AsyncFunction<T, E>> | Dictionary<AsyncFunction<T, E>>,
    limit: number,
): Promise<R>;
export function whilst<E = Error>(
    test: (cb: (err: any, truth: boolean) => boolean) => boolean,
    fn: AsyncVoidFunction<E>,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function whilst<R, E = Error>(
    test: (cb: (err: any, truth: boolean) => boolean) => boolean,
    fn: AsyncVoidFunction<E>,
): Promise<R>;
export function doWhilst<T, E = Error>(
    fn: AsyncFunctionEx<T, E>,
    test: (...results: T[]) => boolean,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function doWhilst<T, R, E = Error>(fn: AsyncFunctionEx<T, E>, test: (...results: T[]) => boolean): Promise<R>;
export function until<E = Error>(test: () => boolean, fn: AsyncVoidFunction<E>, callback: ErrorCallback<E>): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function until<R, E = Error>(test: () => boolean, fn: AsyncVoidFunction<E>): Promise<R>;
export function doUntil<T, E = Error>(
    fn: AsyncFunctionEx<T, E>,
    test: (...results: T[]) => boolean,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function doUntil<T, R, E = Error>(fn: AsyncFunctionEx<T, E>, test: (...results: T[]) => boolean): Promise<R>;
export function during<E = Error>(
    test: (testCallback: AsyncBooleanResultCallback<E>) => void,
    fn: AsyncVoidFunction<E>,
    callback: ErrorCallback<E>,
): void;
export function doDuring<E = Error>(
    fn: AsyncVoidFunction<E>,
    test: (testCallback: AsyncBooleanResultCallback<E>) => void,
    callback: ErrorCallback<E>,
): void;
export function forever<E = Error>(next: (next: ErrorCallback<E>) => void, errBack: ErrorCallback<E>): void;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function waterfall<T, E = Error>(tasks: Function[], callback?: AsyncResultCallback<T, E>): void; // eslint-disable-line @definitelytyped/no-unnecessary-generics
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function compose(...fns: Function[]): Function;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function seq(...fns: Function[]): Function;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function applyEach(fns: Function[], ...argsAndCallback: any[]): void; // applyEach(fns, args..., callback). TS does not support ... for a middle argument. Callback is optional.
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function applyEachSeries(fns: Function[], ...argsAndCallback: any[]): void; // applyEachSeries(fns, args..., callback). TS does not support ... for a middle argument. Callback is optional.
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function queue<T, E = Error>(worker: AsyncWorker<T, E>, concurrency?: number): QueueObject<T>;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function queue<T, R, E = Error>(worker: AsyncResultIterator<T, R, E>, concurrency?: number): QueueObject<T>;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function priorityQueue<T, E = Error>(worker: AsyncWorker<T, E>, concurrency?: number): AsyncPriorityQueue<T>;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function cargo<T, E = Error>(worker: AsyncWorker<T[], E>, payload?: number): QueueObject<T>;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function cargoQueue<T, E = Error>(
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    worker: AsyncWorker<T[], E>,
    concurrency?: number,
    payload?: number,
): QueueObject<T>;
export function auto<R extends Dictionary<any>, E = Error>(
    tasks: AsyncAutoTasks<R, E>,
    concurrency?: number,
    callback?: AsyncResultCallback<R, E>,
): void;
export function auto<R extends Dictionary<any>, E = Error>(
    tasks: AsyncAutoTasks<R, E>,
    callback?: AsyncResultCallback<R, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function autoInject<E = Error>(tasks: any, callback?: AsyncResultCallback<any, E>): void;

export interface RetryOptions {
    times?: number;
    interval?: number | ((retryCount: number) => number);
    errorFilter?: (error: Error) => boolean;
}
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function retry<T, E = Error>(
    opts?: number | RetryOptions,
    task?: (callback: AsyncResultCallback<T, E>, results: any) => void,
): Promise<void>;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function retry<T, E = Error>(
    opts?: number | RetryOptions,
    task?: (callback: AsyncResultCallback<T, E>, results: any) => void,
    callback?: AsyncResultCallback<any, E>,
): void;

export function retryable<T, E = Error>(task: AsyncFunction<T, E>): AsyncFunction<T, E>;
export function retryable<T, E = Error>(
    opts: number | (RetryOptions & { arity?: number }),
    task: AsyncFunction<T, E>,
): AsyncFunction<T, E>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function apply<E = Error>(fn: Function, ...args: any[]): AsyncFunction<any, E>; // eslint-disable-line @definitelytyped/no-unnecessary-generics
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function nextTick(callback: Function, ...args: any[]): void;
export const setImmediate: typeof nextTick;

export function reflect<T, E = Error>(
    fn: AsyncFunction<T, E>,
): (callback: (err: null, result: { error?: E; value?: T }) => void) => void;
export function reflectAll<T, E = Error>(
    tasks: Array<AsyncFunction<T, E>>,
): Array<(callback: (err: null, result: { error?: E; value?: T }) => void) => void>;

export function timeout<T, E = Error>(fn: AsyncFunction<T, E>, milliseconds: number, info?: any): AsyncFunction<T, E>;
export function timeout<T, R, E = Error>(
    fn: AsyncResultIterator<T, R, E>,
    milliseconds: number,
    info?: any,
): AsyncResultIterator<T, R, E>;

export function times<T, E = Error>(
    n: number,
    iterator: AsyncResultIterator<number, T, E>,
    callback: AsyncResultArrayCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function times<T, E = Error>(n: number, iterator: AsyncResultIterator<number, T, E>): Promise<T>;
export const timesSeries: typeof times;
export function timesLimit<T, E = Error>(
    n: number,
    limit: number,
    iterator: AsyncResultIterator<number, T, E>,
    callback: AsyncResultArrayCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function timesLimit<T, E = Error>(
    n: number,
    limit: number,
    iterator: AsyncResultIterator<number, T, E>,
): Promise<T>;

// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function transform<T, R, E = Error>(
    arr: T[],
    iteratee: (acc: R[], item: T, key: number, callback: (error?: E) => void) => void,
    callback?: AsyncResultArrayCallback<T, E>,
): void;
export function transform<T, R, E = Error>(
    arr: T[],
    acc: R[],
    iteratee: (acc: R[], item: T, key: number, callback: (error?: E) => void) => void,
    callback?: AsyncResultArrayCallback<T, E>,
): void;

// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
export function transform<T, R, E = Error>(
    arr: { [key: string]: T },
    iteratee: (acc: { [key: string]: R }, item: T, key: string, callback: (error?: E) => void) => void,
    callback?: AsyncResultObjectCallback<T, E>,
): void;

export function transform<T, R, E = Error>(
    arr: { [key: string]: T },
    acc: { [key: string]: R },
    iteratee: (acc: { [key: string]: R }, item: T, key: string, callback: (error?: E) => void) => void,
    callback?: AsyncResultObjectCallback<T, E>,
): void;

export function race<T, E = Error>(tasks: Array<AsyncFunction<T, E>>, callback: AsyncResultCallback<T, E>): void;

// Utils
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function memoize(fn: Function, hasher?: Function): Function;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function unmemoize(fn: Function): Function;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function ensureAsync(fn: (...argsAndCallback: any[]) => void): Function;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function constant(...values: any[]): AsyncFunction<any>;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function asyncify(fn: Function): (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function wrapSync(fn: Function): Function;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function log(fn: Function, ...args: any[]): void;
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function dir(fn: Function, ...args: any[]): void;
