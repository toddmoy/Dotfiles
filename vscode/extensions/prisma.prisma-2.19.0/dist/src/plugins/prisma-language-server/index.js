"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chokidar = __importStar(require("chokidar"));
const path_1 = __importDefault(require("path"));
const vscode_1 = require("vscode");
const node_1 = require("vscode-languageclient/node");
const telemetryReporter_1 = __importDefault(require("../../telemetryReporter"));
const util_1 = require("../../util");
const packageJson = require('../../../../package.json'); // eslint-disable-line
let client;
let serverModule;
let telemetry;
let watcher;
const isDebugMode = () => process.env.VSCODE_DEBUG_MODE === 'true';
const isE2ETestOnPullRequest = () => process.env.localLSP === 'true';
function createLanguageServer(serverOptions, clientOptions) {
    return new node_1.LanguageClient('prisma', 'Prisma Language Server', serverOptions, clientOptions);
}
const plugin = {
    name: 'prisma-language-server',
    enabled: () => true,
    activate: (context) => __awaiter(void 0, void 0, void 0, function* () {
        const isDebugOrTest = util_1.isDebugOrTestSession();
        const rootPath = vscode_1.workspace.rootPath;
        if (rootPath) {
            watcher = chokidar.watch(path_1.default.join(rootPath, '**/node_modules/.prisma/client/index.d.ts'), {
                usePolling: false,
                followSymlinks: false,
            });
        }
        if (isDebugMode() || isE2ETestOnPullRequest()) {
            // use LSP from folder for debugging
            console.log('Using local LSP');
            serverModule = context.asAbsolutePath(path_1.default.join('../../packages/language-server/dist/src/bin'));
        }
        else {
            console.log('Using published LSP.');
            // use published npm package for production
            serverModule = require.resolve('@prisma/language-server/dist/src/bin');
        }
        // The debug options for the server
        // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
        const debugOptions = {
            execArgv: ['--nolazy', '--inspect=6009'],
            env: { DEBUG: true },
        };
        // If the extension is launched in debug mode then the debug server options are used
        // Otherwise the run options are used
        const serverOptions = {
            run: { module: serverModule, transport: node_1.TransportKind.ipc },
            debug: {
                module: serverModule,
                transport: node_1.TransportKind.ipc,
                options: debugOptions,
            },
        };
        // Options to control the language client
        const clientOptions = {
            // Register the server for prisma documents
            documentSelector: [{ scheme: 'file', language: 'prisma' }],
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            middleware: {
                provideCodeActions(document, range, context, token, _) {
                    return __awaiter(this, void 0, void 0, function* () {
                        const params = {
                            textDocument: client.code2ProtocolConverter.asTextDocumentIdentifier(document),
                            range: client.code2ProtocolConverter.asRange(range),
                            context: client.code2ProtocolConverter.asCodeActionContext(context),
                        };
                        return client.sendRequest(node_1.CodeActionRequest.type, params, token).then((values) => {
                            if (values === null)
                                return undefined;
                            const result = [];
                            for (const item of values) {
                                if (node_1.CodeAction.is(item)) {
                                    const action = client.protocol2CodeConverter.asCodeAction(item);
                                    if (util_1.isSnippetEdit(item, client.code2ProtocolConverter.asTextDocumentIdentifier(document)) &&
                                        item.edit !== undefined) {
                                        action.command = {
                                            command: 'prisma.applySnippetWorkspaceEdit',
                                            title: '',
                                            arguments: [action.edit],
                                        };
                                        action.edit = undefined;
                                    }
                                    result.push(action);
                                }
                                else {
                                    const command = client.protocol2CodeConverter.asCommand(item);
                                    result.push(command);
                                }
                            }
                            return result;
                        }, (_) => undefined);
                    });
                },
            },
        };
        // Create the language client
        client = createLanguageServer(serverOptions, clientOptions);
        const disposable = client.start();
        // Start the client. This will also launch the server
        context.subscriptions.push(disposable);
        context.subscriptions.push(vscode_1.commands.registerCommand('prisma.restartLanguageServer', () => __awaiter(void 0, void 0, void 0, function* () {
            yield client.stop();
            client = createLanguageServer(serverOptions, clientOptions);
            context.subscriptions.push(client.start());
            yield client.onReady();
            vscode_1.window.showInformationMessage('Prisma language server restarted.'); // eslint-disable-line @typescript-eslint/no-floating-promises
        })), vscode_1.commands.registerCommand('prisma.applySnippetWorkspaceEdit', util_1.applySnippetWorkspaceEdit()));
        if (!isDebugOrTest) {
            // eslint-disable-next-line
            const extensionId = 'prisma.' + packageJson.name;
            // eslint-disable-next-line
            const extensionVersion = packageJson.version;
            telemetry = new telemetryReporter_1.default(extensionId, extensionVersion);
            context.subscriptions.push(telemetry);
            yield telemetry.sendTelemetryEvent();
            if (extensionId === 'prisma.prisma-insider') {
                util_1.checkForOtherPrismaExtension();
            }
        }
        util_1.checkForMinimalColorTheme();
        if (watcher) {
            watcher.on('change', (path) => {
                console.log(`File ${path} has been changed. Restarting TS Server.`);
                vscode_1.commands.executeCommand('typescript.restartTsServer'); // eslint-disable-line
            });
        }
    }),
    deactivate: () => __awaiter(void 0, void 0, void 0, function* () {
        if (!client) {
            return undefined;
        }
        if (!util_1.isDebugOrTestSession()) {
            telemetry.dispose(); // eslint-disable-line @typescript-eslint/no-floating-promises
        }
        return client.stop();
    }),
};
exports.default = plugin;
//# sourceMappingURL=index.js.map