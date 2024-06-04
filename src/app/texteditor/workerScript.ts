// workerScript.ts

self.onmessage = function(e) {
    try {
        const result = eval(e.data);
        console.log("result: ", result);
       self.postMessage({ type: 'result', data: result });
    } catch (err:any) {
       self.postMessage({ type: 'error', data: err.toString() });
    }
};
