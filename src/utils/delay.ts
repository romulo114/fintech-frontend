export const sleep = (ms: number) => new Promise(
    (resolve) => setTimeout(resolve, ms)
);

export const delayedCall = async <T>(promise: Promise<T>, ms: number = 1000) => {
    const result = await Promise.all([promise, sleep(ms)]);
    return result[0];
}

export const delayedFunc = <T>(promise: () => Promise<T>, ms: number = 1000) => () => {
    return delayedCall(promise(), ms);
}
