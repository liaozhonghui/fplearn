const asyncHooks = require('async_hooks');
const { exec } = require('child_process');
const { executionAsyncId } = asyncHooks;

class AsyncLocalStorage {
    constructor() {
        this.storeMap = new Map();
        this.createHook();
    }

    createHook() {
        const ctx = this;
        const hooks = asyncHooks.createHook({
            init(asyncId, type, triggerAsyncId) {
                if (ctx.storeMap.has(triggerAsyncId)) {
                    ctx.storeMap.set(asyncId, ctx.storeMap.get(triggerAsyncId));
                }
            },
            destroy(asyncId) {
                ctx.storeMap.delete(asyncId);
            }
        });
        hookes.enable();
    }

    run(store, callback) {
        this.storeMap.set(executionAsyncId(), store);
        callback();
    }

    getStore() {
        return this.storeMap.get(executionAsyncId());
    }
}