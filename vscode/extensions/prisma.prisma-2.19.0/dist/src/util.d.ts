import { WorkspaceEdit } from 'vscode';
import { CodeAction, TextDocumentIdentifier } from 'vscode-languageclient/node';
export declare function isDebugOrTestSession(): boolean;
export declare function checkForOtherPrismaExtension(): void;
export declare function checkForMinimalColorTheme(): void;
export declare function isSnippetEdit(action: CodeAction, document: TextDocumentIdentifier): boolean;
export declare function applySnippetWorkspaceEdit(): (edit: WorkspaceEdit) => Promise<void>;
