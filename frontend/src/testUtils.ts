import {act} from "@testing-library/react";

export async function flushPromises() {
    await act(async () => {
        await new Promise(resolve => setImmediate(resolve))
    })
}