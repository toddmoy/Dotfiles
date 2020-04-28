"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = __importStar(require("./provider"));
const vscode = __importStar(require("vscode"));
const install_1 = __importDefault(require("./install"));
const util = __importStar(require("./util"));
const fs = __importStar(require("fs"));
const lint_1 = __importDefault(require("./lint"));
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const binPath = yield util.getBinPath();
        if (!fs.existsSync(binPath)) {
            try {
                yield install_1.default(binPath);
                vscode.window.showInformationMessage('Prisma plugin installation succeeded.');
            }
            catch (err) {
                // No error on install error.
                // vscode.window.showErrorMessage("Cannot install prisma-fmt: " + err)
            }
        }
        if (fs.existsSync(binPath)) {
            // This registers our formatter, prisma-fmt
            vscode.languages.registerDocumentFormattingEditProvider('prisma', new provider_1.default(binPath));
            // This registers our linter, also prisma-fmt for now.
            const collection = vscode.languages.createDiagnosticCollection('prisma');
            vscode.workspace.onDidChangeTextDocument((e) => __awaiter(this, void 0, void 0, function* () {
                yield updatePrismaDiagnostics(e.document, collection);
            }));
            if (vscode.window.activeTextEditor) {
                yield updatePrismaDiagnostics(vscode.window.activeTextEditor.document, collection);
            }
            context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => __awaiter(this, void 0, void 0, function* () {
                if (editor) {
                    yield updatePrismaDiagnostics(editor.document, collection);
                }
            })));
        }
    });
}
exports.activate = activate;
function updatePrismaDiagnostics(document, collection) {
    return __awaiter(this, void 0, void 0, function* () {
        // ignore for non-prisma files
        if (!document || document.languageId !== 'prisma') {
            collection.clear();
            return;
        }
        const text = document.getText(provider_1.fullDocumentRange(document));
        const binPath = yield util.getBinPath();
        const res = yield lint_1.default(binPath, text);
        const errors = [];
        for (const error of res) {
            errors.push({
                code: '',
                message: error.text,
                range: new vscode.Range(document.positionAt(error.start), document.positionAt(error.end)),
                severity: vscode.DiagnosticSeverity.Error,
                source: '',
                relatedInformation: [],
            });
        }
        collection.set(document.uri, errors);
    });
}
//# sourceMappingURL=extension.js.map