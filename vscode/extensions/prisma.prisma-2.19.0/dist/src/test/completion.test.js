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
const vscode_1 = __importDefault(require("vscode"));
const assert_1 = __importDefault(require("assert"));
const helper_1 = require("./helper");
function testCompletion(docUri, position, expectedCompletionList, isActivated, triggerCharacter) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!isActivated) {
            yield helper_1.activate(docUri);
        }
        const actualCompletions = (yield vscode_1.default.commands.executeCommand('vscode.executeCompletionItemProvider', docUri, position, triggerCharacter));
        assert_1.default.deepStrictEqual(actualCompletions.isIncomplete, expectedCompletionList.isIncomplete);
        assert_1.default.deepStrictEqual(actualCompletions.items.length, expectedCompletionList.items.length);
        assert_1.default.deepStrictEqual(actualCompletions.items.map((items) => items.label).sort(), expectedCompletionList.items.map((items) => items.label).sort());
        assert_1.default.deepStrictEqual(actualCompletions.items.map((item) => item.kind).sort(), expectedCompletionList.items.map((item) => item.kind).sort());
    });
}
suite('Should auto-complete', () => {
    // Uri's
    const emptyDocUri = helper_1.getDocUri('completions/empty.prisma');
    const sqliteDocUri = helper_1.getDocUri('completions/datasourceWithSqlite.prisma');
    const dataSourceWithUri = helper_1.getDocUri('completions/datasourceWithUrl.prisma');
    const emptyBlocksUri = helper_1.getDocUri('completions/emptyBlocks.prisma');
    const modelBlocksUri = helper_1.getDocUri('completions/modelBlocks.prisma');
    const enumCommentUri = helper_1.getDocUri('completions/enumWithComments.prisma');
    // ALL BLOCKS
    test('Diagnoses block type suggestions with sqlite as provider', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(sqliteDocUri, new vscode_1.default.Position(4, 0), new vscode_1.default.CompletionList([
            { label: 'datasource', kind: vscode_1.default.CompletionItemKind.Class },
            { label: 'generator', kind: vscode_1.default.CompletionItemKind.Class },
            { label: 'model', kind: vscode_1.default.CompletionItemKind.Class },
        ], false), false);
    }));
    test('Diagnoses block type suggestions for empty file', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(emptyDocUri, new vscode_1.default.Position(0, 0), new vscode_1.default.CompletionList([
            { label: 'datasource', kind: vscode_1.default.CompletionItemKind.Class },
            { label: 'enum', kind: vscode_1.default.CompletionItemKind.Class },
            { label: 'generator', kind: vscode_1.default.CompletionItemKind.Class },
            { label: 'model', kind: vscode_1.default.CompletionItemKind.Class },
        ], false), false);
    }));
    // DATASOURCE BLOCK
    const fieldPreviewFeatures = {
        label: 'previewFeatures',
        kind: vscode_1.default.CompletionItemKind.Field,
    };
    const fieldProvider = {
        label: 'provider',
        kind: vscode_1.default.CompletionItemKind.Field,
    };
    const fieldUrl = { label: 'url', kind: vscode_1.default.CompletionItemKind.Field };
    const fieldShadowDatabaseUrl = {
        label: 'shadowDatabaseUrl',
        kind: vscode_1.default.CompletionItemKind.Field,
    };
    const sqlite = { label: 'sqlite', kind: vscode_1.default.CompletionItemKind.Constant };
    const mysql = { label: 'mysql', kind: vscode_1.default.CompletionItemKind.Constant };
    const postgresql = {
        label: 'postgresql',
        kind: vscode_1.default.CompletionItemKind.Constant,
    };
    const mssql = { label: 'sqlserver', kind: vscode_1.default.CompletionItemKind.Constant };
    const array = { label: '[]', kind: vscode_1.default.CompletionItemKind.Property };
    const quotationMarks = {
        label: '""',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const envArgument = {
        label: 'DATABASE_URL',
        kind: vscode_1.default.CompletionItemKind.Constant,
    };
    const env = { label: 'env()', kind: vscode_1.default.CompletionItemKind.Property };
    test('Diagnoses datasource field suggestions in empty block', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(emptyBlocksUri, new vscode_1.default.Position(1, 0), new vscode_1.default.CompletionList([
            fieldProvider,
            fieldUrl,
            fieldShadowDatabaseUrl,
        ]), false);
    }));
    test('Diagnoses datasource field suggestions with existing field', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(sqliteDocUri, new vscode_1.default.Position(2, 0), new vscode_1.default.CompletionList([fieldUrl, fieldShadowDatabaseUrl]), false);
        yield testCompletion(dataSourceWithUri, new vscode_1.default.Position(2, 0), new vscode_1.default.CompletionList([fieldProvider, fieldShadowDatabaseUrl]), false);
    }));
    test('Diagnoses url argument suggestions for datasource block', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(dataSourceWithUri, new vscode_1.default.Position(7, 10), new vscode_1.default.CompletionList([quotationMarks, env], true), false),
            yield testCompletion(dataSourceWithUri, new vscode_1.default.Position(11, 15), new vscode_1.default.CompletionList([envArgument], false), true);
    }));
    test('Diagnoses single provider suggestions for datasource block', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(sqliteDocUri, new vscode_1.default.Position(14, 14), new vscode_1.default.CompletionList([mysql, postgresql, sqlite, mssql], true), false),
            yield testCompletion(sqliteDocUri, new vscode_1.default.Position(18, 13), new vscode_1.default.CompletionList([quotationMarks, array], true), false);
    }));
    test('Diagnoses multiple provider suggestions for datasource block', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(sqliteDocUri, new vscode_1.default.Position(6, 15), new vscode_1.default.CompletionList([mysql, postgresql, sqlite, mssql], true), true),
            yield testCompletion(sqliteDocUri, new vscode_1.default.Position(22, 14), new vscode_1.default.CompletionList([quotationMarks], true), true);
        yield testCompletion(sqliteDocUri, new vscode_1.default.Position(10, 25), new vscode_1.default.CompletionList([mysql, postgresql, mssql], true), true);
    }));
    // GENERATOR BLOCK
    const fieldOutput = { label: 'output', kind: vscode_1.default.CompletionItemKind.Field };
    const fieldBinaryTargets = {
        label: 'binaryTargets',
        kind: vscode_1.default.CompletionItemKind.Field,
    };
    const generatorWithExistingFieldsUri = helper_1.getDocUri('completions/generatorWithExistingFields.prisma');
    test('Diagnoses generator field suggestions in empty block', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(emptyBlocksUri, new vscode_1.default.Position(5, 0), new vscode_1.default.CompletionList([
            fieldBinaryTargets,
            fieldOutput,
            fieldPreviewFeatures,
            fieldProvider,
        ]), false);
    }));
    test('Diagnoses generator field suggestions with existing fields', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.activate(generatorWithExistingFieldsUri);
        yield testCompletion(generatorWithExistingFieldsUri, new vscode_1.default.Position(2, 0), new vscode_1.default.CompletionList([
            fieldBinaryTargets,
            fieldOutput,
            fieldPreviewFeatures,
        ]), true);
        yield testCompletion(generatorWithExistingFieldsUri, new vscode_1.default.Position(7, 0), new vscode_1.default.CompletionList([
            fieldBinaryTargets,
            fieldPreviewFeatures,
            fieldProvider,
        ]), true);
    }));
    // BLOCK ATTRIBUTES
    const blockAttributeId = {
        label: '@@id([])',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const blockAttributeMap = {
        label: '@@map("")',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const blockAttributeUnique = {
        label: '@@unique([])',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const blockAttributeIndex = {
        label: '@@index([])',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const blockAttributeIgnore = {
        label: '@@ignore',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    test('Diagnoses block attribute suggestions first in a line', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(emptyBlocksUri, new vscode_1.default.Position(9, 0), new vscode_1.default.CompletionList([
            blockAttributeId,
            blockAttributeIndex,
            blockAttributeMap,
            blockAttributeUnique,
            blockAttributeIgnore,
        ]), false);
    }));
    test('Diagnoses block attribute suggestions with existing attributes first in a line', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.activate(modelBlocksUri);
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(5, 0), new vscode_1.default.CompletionList([
            blockAttributeId,
            blockAttributeIndex,
            blockAttributeMap,
            blockAttributeUnique,
            blockAttributeIgnore,
        ]), true);
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(14, 0), new vscode_1.default.CompletionList([
            blockAttributeIndex,
            blockAttributeMap,
            blockAttributeUnique,
            blockAttributeIgnore,
        ]), true);
    }));
    // TYPES
    test('Diagnoses type suggestions in model block', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(51, 7), new vscode_1.default.CompletionList([
            { label: 'Boolean', kind: vscode_1.default.CompletionItemKind.TypeParameter },
            { label: 'Cat', kind: vscode_1.default.CompletionItemKind.Reference },
            { label: 'DateTime', kind: vscode_1.default.CompletionItemKind.TypeParameter },
            { label: 'Float', kind: vscode_1.default.CompletionItemKind.TypeParameter },
            { label: 'Hello', kind: vscode_1.default.CompletionItemKind.Reference },
            { label: 'Int', kind: vscode_1.default.CompletionItemKind.TypeParameter },
            { label: 'Json', kind: vscode_1.default.CompletionItemKind.TypeParameter },
            { label: 'Person', kind: vscode_1.default.CompletionItemKind.Reference },
            { label: 'Post', kind: vscode_1.default.CompletionItemKind.Reference },
            { label: 'SecondUser', kind: vscode_1.default.CompletionItemKind.Reference },
            { label: 'String', kind: vscode_1.default.CompletionItemKind.TypeParameter },
            { label: 'Bytes', kind: vscode_1.default.CompletionItemKind.TypeParameter },
            { label: 'Decimal', kind: vscode_1.default.CompletionItemKind.TypeParameter },
            { label: 'BigInt', kind: vscode_1.default.CompletionItemKind.TypeParameter },
            {
                label: 'Unsupported("")',
                kind: vscode_1.default.CompletionItemKind.TypeParameter,
            },
            { label: 'Test', kind: vscode_1.default.CompletionItemKind.Reference },
            { label: 'ThirdUser', kind: vscode_1.default.CompletionItemKind.Reference },
            { label: 'TypeCheck', kind: vscode_1.default.CompletionItemKind.Reference },
            { label: 'User', kind: vscode_1.default.CompletionItemKind.Reference },
        ], true), true);
    }));
    // FIELD ATTRIBUTES
    const fieldAttributeId = {
        label: '@id',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const fieldAttributeUnique = {
        label: '@unique',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const fieldAttributeMap = {
        label: '@map("")',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const fieldAttributeDefault = {
        label: '@default()',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const fieldAttributeRelation = {
        label: '@relation()',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const fieldAttributeIgnore = {
        label: '@ignore',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const functionCuid = {
        label: 'cuid()',
        kind: vscode_1.default.CompletionItemKind.Function,
    };
    const functionUuid = {
        label: 'uuid()',
        kind: vscode_1.default.CompletionItemKind.Function,
    };
    const functionAutoInc = {
        label: 'autoincrement()',
        kind: vscode_1.default.CompletionItemKind.Function,
    };
    const functionNow = {
        label: 'now()',
        kind: vscode_1.default.CompletionItemKind.Function,
    };
    const functionDbGenerated = {
        label: 'dbgenerated("")',
        kind: vscode_1.default.CompletionItemKind.Function,
    };
    const staticValueTrue = {
        label: 'true',
        kind: vscode_1.default.CompletionItemKind.Value,
    };
    const staticValueFalse = {
        label: 'false',
        kind: vscode_1.default.CompletionItemKind.Value,
    };
    const fieldsProperty = {
        label: 'fields: []',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const referencesProperty = {
        label: 'references: []',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    const nameProperty = {
        label: '""',
        kind: vscode_1.default.CompletionItemKind.Property,
    };
    test('Diagnoses field and block attribute suggestions', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(18, 14), new vscode_1.default.CompletionList([
            fieldAttributeDefault,
            fieldAttributeId,
            fieldAttributeMap,
            fieldAttributeRelation,
            fieldAttributeUnique,
            fieldAttributeIgnore,
        ]), true);
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(19, 14), new vscode_1.default.CompletionList([
            fieldAttributeDefault,
            fieldAttributeMap,
            fieldAttributeRelation,
            fieldAttributeUnique,
            fieldAttributeIgnore,
        ]), true);
    }));
    test('Diagnoses functions as default values', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(11, 24), new vscode_1.default.CompletionList([functionDbGenerated, functionAutoInc]), true);
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(28, 27), new vscode_1.default.CompletionList([
            functionDbGenerated,
            functionCuid,
            functionUuid,
        ]), true);
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(30, 36), new vscode_1.default.CompletionList([functionDbGenerated, functionNow]), true);
    }));
    test('Diagnoses static default values', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(24, 28), new vscode_1.default.CompletionList([
            functionDbGenerated,
            staticValueFalse,
            staticValueTrue,
        ]), true);
    }));
    test('Diagnoses arguments of @@unique', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(38, 15), new vscode_1.default.CompletionList([
            { label: 'firstName', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'isAdmin', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'lastName', kind: vscode_1.default.CompletionItemKind.Field },
        ]), true);
    }));
    test('Diagnoses arguments of @@id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(46, 10), new vscode_1.default.CompletionList([
            { label: 'firstName', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'isAdmin', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'lastName', kind: vscode_1.default.CompletionItemKind.Field },
        ]), true);
    }));
    test('Diagnoses arguments of @@index', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(modelBlocksUri, new vscode_1.default.Position(47, 13), new vscode_1.default.CompletionList([
            { label: 'firstName', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'isAdmin', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'lastName', kind: vscode_1.default.CompletionItemKind.Field },
        ]), true);
    }));
    test('Diagnoses default suggestions for enum values excluding comments', () => __awaiter(void 0, void 0, void 0, function* () {
        yield testCompletion(enumCommentUri, new vscode_1.default.Position(11, 30), new vscode_1.default.CompletionList([
            functionDbGenerated,
            { label: 'ADMIN', kind: vscode_1.default.CompletionItemKind.Value },
            { label: 'NORMAL', kind: vscode_1.default.CompletionItemKind.Value },
        ]), false);
    }));
    const relationDirectiveUri = helper_1.getDocUri('completions/relationDirective.prisma');
    test('Diagnoses arguments of @relation directive', () => __awaiter(void 0, void 0, void 0, function* () {
        yield helper_1.activate(relationDirectiveUri);
        yield testCompletion(relationDirectiveUri, new vscode_1.default.Position(12, 26), new vscode_1.default.CompletionList([
            nameProperty,
            fieldsProperty,
            referencesProperty,
        ]), true);
        yield testCompletion(relationDirectiveUri, new vscode_1.default.Position(21, 39), new vscode_1.default.CompletionList([
            { label: 'id', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'items', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'total', kind: vscode_1.default.CompletionItemKind.Field },
        ]), true);
        yield testCompletion(relationDirectiveUri, new vscode_1.default.Position(30, 44), new vscode_1.default.CompletionList([nameProperty, fieldsProperty]), true);
        yield testCompletion(relationDirectiveUri, new vscode_1.default.Position(39, 45), new vscode_1.default.CompletionList([nameProperty, referencesProperty]), true);
        yield testCompletion(relationDirectiveUri, new vscode_1.default.Position(48, 35), new vscode_1.default.CompletionList([
            { label: 'id', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'orderId', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'productName', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'productPrice', kind: vscode_1.default.CompletionItemKind.Field },
            { label: 'quantity', kind: vscode_1.default.CompletionItemKind.Field },
        ]), true);
    }));
});
//# sourceMappingURL=completion.test.js.map