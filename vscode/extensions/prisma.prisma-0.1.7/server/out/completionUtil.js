"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_1 = require("vscode-languageserver");
exports.corePrimitiveTypes = [
    {
        label: 'String',
        kind: vscode_languageserver_1.CompletionItemKind.TypeParameter,
        documentation: 'Variable length text',
    },
    {
        label: 'Boolean',
        kind: vscode_languageserver_1.CompletionItemKind.TypeParameter,
        documentation: 'True or false value',
    },
    {
        label: 'Int',
        kind: vscode_languageserver_1.CompletionItemKind.TypeParameter,
        documentation: 'Integer value',
    },
    {
        label: 'Float',
        kind: vscode_languageserver_1.CompletionItemKind.TypeParameter,
        documentation: 'Floating point number',
    },
    {
        label: 'DateTime',
        kind: vscode_languageserver_1.CompletionItemKind.TypeParameter,
        documentation: 'Timestamp',
    },
];
exports.allowedBlockTypes = [
    {
        label: 'datasource',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        documentation: 'The datasource block tells the schema where the models are backed.',
    },
    {
        label: 'generator',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        documentation: "Generator blocks configure which clients are generated and how they're generated. Language preferences and binary configuration will go in here.",
    },
    {
        label: 'model',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        documentation: 'Models represent the entities of your application domain. They are defined using model blocks in the data model. ',
    },
    {
        label: 'type_alias',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
    },
    {
        label: 'enum',
        kind: vscode_languageserver_1.CompletionItemKind.Class,
        documentation: "Enums are defined via the enum block. You can define enums in your data model if they're supported by the data source you use:\n• PostgreSQL: Supported\n• MySQL: Supported\n• MariaDB: Supported\n• SQLite: Not supported",
    },
];
exports.blockAttributes = [
    {
        label: '@@map([])',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        detail: '@@map(_ name: String)',
        insertTextFormat: 2,
        insertText: '@@map([$0])',
        documentation: 'Defines the name of the underlying table or collection name.',
    },
    {
        label: '@@id([])',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        detail: '@@id(_ fields: Identifier[])',
        insertTextFormat: 2,
        insertText: '@@id([$0])',
        documentation: 'Defines a composite primary key across fields.',
    },
    {
        label: '@@unique([])',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        detail: '@@unique(_ fields: Identifier[], name: String?)',
        insertTextFormat: 2,
        insertText: '@@unique([$0])',
        documentation: 'Defines a composite unique constraint across fields.',
    },
    {
        label: '@@index([])',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertTextFormat: 2,
        insertText: '@@index([$0])',
        detail: '@@index(_ fields: Identifier[], name: String?)',
        documentation: 'Defines an index for multiple fields.',
    },
];
exports.fieldAttributes = [
    {
        label: '@id',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        detail: '@id',
        documentation: 'Defines the primary key. There must be exactly one field @id or block @id',
    },
    {
        label: '@unique',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        detail: '@unique',
        documentation: 'Defines the unique constraint.',
    },
    {
        label: '@map()',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        detail: '@map(_ name: String)',
        insertTextFormat: 2,
        insertText: '@map($0)',
        documentation: 'Defines the raw column name the field is mapped to.',
    },
    {
        label: '@default()',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        detail: '@default(_ expr: Expr)',
        insertTextFormat: 2,
        insertText: '@default(0)',
        documentation: 'Specifies a default value if null is provided.',
    },
    {
        label: '@relation()',
        kind: vscode_languageserver_1.CompletionItemKind.Property,
        insertTextFormat: 2,
        insertText: '@relation($0)',
        detail: '@relation(_ name?: String, references?: Identifier[], onDelete?: CascadeEnum)\nArguments:\n•name: (optional, except when required for disambiguation) defines the name of the relationship. The name of the relation needs to be explicitly given to resolve amibiguities when the model contains two or more fields that refer to the same model (another model or itself).\n•references: (optional) list of field names to reference',
        documentation: 'Specifies and disambiguates relationships when needed. Where possible on relational databases, the @relation annotation will translate to a foreign key constraint, but not an index.',
    },
];
exports.supportedDataSourceFields = [
    {
        label: 'provider',
        kind: vscode_languageserver_1.CompletionItemKind.Field,
        documentation: 'Can be one of the following built in datasource providers:\n•`postgresql`\n•`mysql`\n•`sqlite`',
    },
    {
        label: 'url',
        kind: vscode_languageserver_1.CompletionItemKind.Field,
        documentation: 'Connection URL including authentication info. Each datasource provider documents the URL syntax. Most providers use the syntax provided by the database. (more information see https://github.com/prisma/specs/blob/master/schema/datasource_urls.md)',
    },
];
exports.supportedGeneratorFields = [
    {
        label: 'provider',
        kind: vscode_languageserver_1.CompletionItemKind.Field,
        documentation: 'Can be a path or one of the following built in datasource providers:\n•`prisma-client-js`\n•`prisma-client-go` (This is not implemented yet.)',
    },
    {
        label: 'output',
        kind: vscode_languageserver_1.CompletionItemKind.Field,
        documentation: 'Path for the generated client.',
    },
    {
        label: 'platforms',
        kind: vscode_languageserver_1.CompletionItemKind.Field,
        detail: 'Declarative way to download the required binaries.',
        documentation: '(optional) An array of binaries that are required by the application, string for known platforms and path for custom binaries.',
    },
    {
        label: 'pinnedPlatform',
        kind: vscode_languageserver_1.CompletionItemKind.Field,
        detail: 'Declarative way to choose the runtime binary.',
        documentation: '(optional) A string that points to the name of an object in the platforms field, usually an environment variable.\nWhen a custom binary is provided the pinnedPlatform is required.',
    },
];
//# sourceMappingURL=completionUtil.js.map