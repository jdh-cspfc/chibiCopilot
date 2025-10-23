"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDetector = createDetector;
function createDetector() {
    var callbacks = {
        start: [],
        partial: [],
        done: [],
        error: []
    };
    // For now, this is a stub implementation
    // In a real implementation, this would detect AI activity from Cursor/VS Code
    // by monitoring editor events, API calls, or other indicators
    return {
        onStart: function (callback) { return callbacks.start.push(callback); },
        onPartial: function (callback) { return callbacks.partial.push(callback); },
        onDone: function (callback) { return callbacks.done.push(callback); },
        onError: function (callback) { return callbacks.error.push(callback); }
    };
}
