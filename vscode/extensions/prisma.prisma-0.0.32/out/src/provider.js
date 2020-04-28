"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const format_1 = __importDefault(require("./format"));
function fullDocumentRange(document) {
    const lastLineId = document.lineCount - 1;
    return new vscode_1.Range(0, 0, lastLineId, document.lineAt(lastLineId).text.length);
}
exports.fullDocumentRange = fullDocumentRange;
class PrismaEditProvider {
    constructor(binPath) {
        this.binPath = binPath;
    }
    provideDocumentFormattingEdits(document, options, token) {
        return format_1.default(this.binPath, options.tabSize, document.getText()).then(formatted => [
            vscode_1.TextEdit.replace(fullDocumentRange(document), formatted),
        ]);
    }
}
exports.default = PrismaEditProvider;
//# sourceMappingURL=provider.js.map