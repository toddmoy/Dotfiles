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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exec_1 = __importDefault(require("./exec"));
function format(execPath, identWidth, text, onError) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield exec_1.default(execPath, ['format', '-s', identWidth.toString()], text);
        }
        catch (errors) {
            const errorMessage = "prisma-fmt error'd during formatting. This was likely due to a syntax error. Please see linter output.";
            if (onError) {
                onError(errorMessage);
            }
            console.warn(errorMessage);
            return text;
        }
    });
}
exports.default = format;
//# sourceMappingURL=format.js.map