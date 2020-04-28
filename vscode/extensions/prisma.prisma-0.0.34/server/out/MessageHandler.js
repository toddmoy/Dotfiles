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
const vscode_languageserver_1 = require("vscode-languageserver");
const util = __importStar(require("./util"));
const provider_1 = require("./provider");
const sdk_1 = require("@prisma/sdk");
const format_1 = __importDefault(require("./format"));
function getWordAtPosition(document, position) {
    const currentLine = document.getText({
        start: { line: position.line, character: 0 },
        end: { line: position.line, character: 9999 },
    });
    // search for the word's beginning and end
    const beginning = currentLine.slice(0, position.character + 1).search(/\S+$/);
    const end = currentLine.slice(position.character).search(/\W/);
    if (end < 0) {
        return '';
    }
    return currentLine.slice(beginning, end + position.character);
}
function handleDefinitionRequest(documents, params) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Replace bad workaround as soon as ASTNode is available
        const textDocument = params.textDocument;
        const position = params.position;
        const document = documents.get(textDocument.uri);
        if (!document) {
            return new Promise((resolve) => resolve());
        }
        const documentText = document.getText();
        const word = getWordAtPosition(document, position);
        if (word === '') {
            return new Promise((resolve) => resolve());
        }
        // parse schem file to datamodel meta format (DMMF)
        const dmmf = yield sdk_1.getDMMF({ datamodel: documentText });
        const modelName = (_a = dmmf.datamodel.models
            .map((model) => model.name)) === null || _a === void 0 ? void 0 : _a.find((name) => name === word);
        // selected word is not a model type
        if (!modelName) {
            return new Promise((resolve) => resolve());
        }
        const modelDefinition = 'model ';
        // get start position of model type
        const index = documentText.indexOf(modelDefinition + modelName);
        const buf = documentText.slice(0, index);
        const EOL = '\n';
        const lines = buf.split(EOL).length - 1;
        const lastLineIndex = buf.lastIndexOf(EOL);
        const startPosition = {
            line: lines,
            character: index + modelDefinition.length - lastLineIndex - 1,
        };
        const endPosition = {
            line: lines,
            character: index + modelDefinition.length - lastLineIndex - 1 + modelName.length,
        };
        return {
            uri: textDocument.uri,
            range: vscode_languageserver_1.Range.create(startPosition, endPosition),
        };
    });
}
exports.handleDefinitionRequest = handleDefinitionRequest;
/**
 * This handler provides the modification to the document to be formatted.
 */
function handleDocumentFormatting(params, documents, onError) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = params.options;
        const document = documents.get(params.textDocument.uri);
        if (!document) {
            return [];
        }
        const binPath = yield util.getBinPath();
        return format_1.default(binPath, options.tabSize, document.getText(), onError).then((formatted) => [
            vscode_languageserver_1.TextEdit.replace(provider_1.fullDocumentRange(document), formatted),
        ]);
    });
}
exports.handleDocumentFormatting = handleDocumentFormatting;
//# sourceMappingURL=MessageHandler.js.map