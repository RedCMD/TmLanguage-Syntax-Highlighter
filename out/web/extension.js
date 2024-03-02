/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringify = exports.deactivate = exports.activate = exports.DocumentSelector = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
const oniguruma_1 = __webpack_require__(6);
const TextMate_1 = __webpack_require__(8);
const DiagnosticCollection_1 = __webpack_require__(27);
const tokenColorCustomizations_1 = __webpack_require__(28);
const TreeDataProvider_1 = __webpack_require__(29);
const RenameProvider_1 = __webpack_require__(30);
const CodeLensProvider_1 = __webpack_require__(31);
const ReferenceProvider_1 = __webpack_require__(32);
const DefinitionProvider_1 = __webpack_require__(33);
const CallHierarchyProvider_1 = __webpack_require__(34);
const DocumentSymbolProvider_1 = __webpack_require__(35);
const DocumentHighlightProvider_1 = __webpack_require__(36);
const CompletionItemProvider_1 = __webpack_require__(37);
const DocumentFormattingEditProvider_1 = __webpack_require__(38);
exports.DocumentSelector = [
    { language: 'json-textmate' }
];
async function activate(context) {
    // vscode.window.showInformationMessage(JSON.stringify("TextMate Extension"));
    await (0, TreeSitter_1.initTreeSitter)(context);
    await (0, oniguruma_1.initOniguruma)(context);
    (0, TextMate_1.initTextMate)(context);
    (0, DiagnosticCollection_1.initDiagnostics)(context);
    (0, tokenColorCustomizations_1.initTokenColorCustomizations)(context);
    (0, TreeDataProvider_1.initCallStackView)(context);
    context.subscriptions.push(vscode.window.registerTreeDataProvider('TextMate', TreeDataProvider_1.TreeDataProvider)); // Call Stack
    // context.subscriptions.push(vscode.languages.registerHoverProvider(DocumentSelector, HoverProvider)); // Mouse over Hovers
    context.subscriptions.push(vscode.languages.registerRenameProvider(exports.DocumentSelector, RenameProvider_1.RenameProvider)); // [F2] Rename
    context.subscriptions.push(vscode.languages.registerCodeLensProvider(exports.DocumentSelector, CodeLensProvider_1.CodeLensProvider)); // Code Lens
    context.subscriptions.push(vscode.languages.registerReferenceProvider(exports.DocumentSelector, ReferenceProvider_1.ReferenceProvider)); // Go to References
    context.subscriptions.push(vscode.languages.registerDefinitionProvider(exports.DocumentSelector, DefinitionProvider_1.DefinitionProvider)); // ctrl+click Go to Definition
    context.subscriptions.push(vscode.languages.registerCallHierarchyProvider(exports.DocumentSelector, CallHierarchyProvider_1.CallHierarchyProvider)); // right click => Peak Call Hierarchy
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(exports.DocumentSelector, DocumentSymbolProvider_1.DocumentSymbolProvider)); // Breadcrumbs
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(exports.DocumentSelector, CompletionItemProvider_1.CompletionItemProvider, ...CompletionItemProvider_1.triggerCharacters)); // Intellisense ctrl+space completions
    context.subscriptions.push(vscode.languages.registerDocumentHighlightProvider(exports.DocumentSelector, DocumentHighlightProvider_1.DocumentHighlightProvider)); // Context aware variable highlighting
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(exports.DocumentSelector, DocumentFormattingEditProvider_1.DocumentFormattingEditProvider)); // right-click => Format Document
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(exports.DocumentSelector, DocumentFormattingEditProvider_1.DocumentRangeFormattingEditProvider)); // right-click => Format Selection
    // context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider(DocumentSelector, DocumentSemanticTokensProvider, SemanticTokensLegend)); // Context aware syntax highlighting
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() {
    // vscode.window.showInformationMessage(JSON.stringify("deactivate"));
    // https://github.com/microsoft/vscode/issues/105484
    // https://github.com/microsoft/vscode/issues/201664
}
exports.deactivate = deactivate;
function stringify(key, value) {
    if (typeof value === 'function') {
        return "<function>";
    }
    if (typeof value === 'symbol') {
        return "<symbol>";
    }
    if (typeof value === 'undefined') {
        return "<undefined>";
    }
    if (value === null) {
        return null;
    }
    if (key.startsWith("HEAP")) {
        return "<error>";
    }
    return value ?? "<idk>";
}
exports.stringify = stringify;


/***/ }),
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initTreeSitter = exports.trueParent = exports.toPoint = exports.toRange = exports.queryForPosition = exports.queryNode = exports.getLastNode = exports.getComment = exports.getRegexNode = exports.getTree = exports.getTrees = void 0;
const vscode = __webpack_require__(1);
const Parser = __webpack_require__(3);
const extension_1 = __webpack_require__(0);
const trees = {};
function getTrees(source) {
    const uriString = 'uri' in source ? source.uri.toString() : source.toString();
    return trees[uriString];
}
exports.getTrees = getTrees;
/**
 * @deprecated use {@link getTrees()} instead
 */
function getTree(document) {
    const uriString = document.uri.toString();
    const tree = trees[uriString]?.jsonTree;
    return tree;
}
exports.getTree = getTree;
function getRegexNode(source, node) {
    const nodeId = typeof node == 'number' ? node : node.id;
    if ('uri' in source) {
        const uriString = source.uri.toString();
        const regexTrees = trees[uriString]?.regexTrees;
        const regexTree = regexTrees[nodeId];
        return regexTree.rootNode;
    }
    if ('scheme' in source) {
        const uriString = source.toString();
        const regexTrees = trees[uriString]?.regexTrees;
        const regexTree = regexTrees[nodeId];
        return regexTree.rootNode;
    }
    if ('regexTrees' in source) {
        const regexTrees = source.regexTrees;
        const regexTree = regexTrees[nodeId];
        return regexTree.rootNode;
    }
    const regexTree = source[nodeId];
    return regexTree.rootNode;
}
exports.getRegexNode = getRegexNode;
/**
 * Returns the first non-empty comment in the parent node
 */
function getComment(node) {
    const parent = trueParent(node);
    const query = `
		(comment (value) @comment (.not-eq? @comment ""))
		(comment_slash (value) @comment (.not-eq? @comment ""))
	`;
    const capture = queryNode(parent, query)[0];
    return capture?.node?.text?.replace(/\\(.)?/g, '$1');
}
exports.getComment = getComment;
function getLastNode(rootNode, type) {
    const nodes = rootNode.namedChildren;
    while (nodes.length) {
        const childNode = nodes.pop(); // bottom up
        if (childNode.type == type) {
            return childNode;
        }
    }
}
exports.getLastNode = getLastNode;
function queryNode(node, queryString, startPoint, endPoint) {
    const language = node.tree.getLanguage();
    const query = language.query(queryString);
    const queryCaptures = query.captures(node, startPoint, endPoint || startPoint);
    if (queryCaptures.length > 10000) {
        vscode.window.showWarningMessage("Unoptimized Query: " + queryCaptures.length + " results returned:\n" + queryString);
        // vscode.window.showInformationMessage(JSON.stringify(queryCaptures));
    }
    if (startPoint && !endPoint) {
        if (endPoint === false) {
            return queryCaptures.pop(); // the last/inner most node
        }
        const position = new vscode.Position(startPoint.row, startPoint.column);
        while (queryCaptures.length) { // TreeSitter doesn't actually check if the captured node intersects the startPoint :/
            const queryCapture = queryCaptures.pop(); // the last/inner most node
            if (toRange(queryCapture.node).contains(position)) {
                return queryCapture;
            }
        }
        return null;
    }
    return queryCaptures;
}
exports.queryNode = queryNode;
/**
 * @deprecated use {@link queryNode()} instead
 */
function queryForPosition(tree, queryString, point) {
    const language = tree.getLanguage();
    const query = language.query(queryString);
    const queryCaptures = query.captures(tree.rootNode, point, point);
    const queryCapture = queryCaptures.pop(); // the last/inner most node
    return queryCapture;
}
exports.queryForPosition = queryForPosition;
function toRange(node) {
    if (!node) {
        return null;
    }
    const startPosition = node.startPosition;
    const endPosition = node.endPosition;
    return new vscode.Range(startPosition.row, startPosition.column, endPosition.row, endPosition.column);
}
exports.toRange = toRange;
function toPoint(position) {
    const row = position.line;
    const column = position.character;
    const point = { row: row, column: column };
    return point;
}
exports.toPoint = toPoint;
/**
 * TreeSitter bug
 * Using `.parent` on a 0width node returns the `previousSilbing` rather than the `parent`
 * https://github.com/tree-sitter/tree-sitter/issues/1872
 */
function trueParent(node) {
    const parent = node.parent;
    if (parent == null) {
        // vscode.window.showInformationMessage(JSON.stringify(node.toString()));
        // vscode.window.showInformationMessage(JSON.stringify(node.type));
        // vscode.window.showInformationMessage(JSON.stringify(node.text));
        return node;
    }
    if (node.text != '') {
        return parent;
    }
    return parent.parent;
    // const sibling = parent.nextSibling;
    // return sibling ? sibling.equals(node) ? parent.parent : parent : parent;
}
exports.trueParent = trueParent;
async function initTreeSitter(context) {
    // vscode.window.showInformationMessage(JSON.stringify("TreeSitterInit"));
    // We only need to provide these options when running in the web worker
    const moduleOptions = typeof navigator === 'undefined'
        ? undefined
        : {
            locateFile() {
                return vscode.Uri.joinPath(context.extensionUri, 'node_modules', 'web-tree-sitter', 'tree-sitter.wasm').toString(true);
            }
        };
    await Parser.init(moduleOptions); // Everything MUST wait until TreeSitter initializes
    // vscode.window.showInformationMessage(JSON.stringify("Parser"));
    const jsonParser = new Parser();
    const jsonWasmUri = vscode.Uri.joinPath(context.extensionUri, 'out', 'tree-sitter-jsontm.wasm');
    const jsonWasm = jsonWasmUri.scheme === 'file' ? jsonWasmUri.fsPath : jsonWasmUri.toString(true);
    const jsonLanguage = await Parser.Language.load(jsonWasm);
    jsonParser.setLanguage(jsonLanguage);
    const regexParser = new Parser();
    const regexWasmUri = vscode.Uri.joinPath(context.extensionUri, 'out', 'tree-sitter-regextm.wasm');
    const regexWasm = regexWasmUri.scheme === 'file' ? regexWasmUri.fsPath : regexWasmUri.toString(true);
    const regexLanguage = await Parser.Language.load(regexWasm);
    regexParser.setLanguage(regexLanguage);
    // vscode.window.showInformationMessage(JSON.stringify("Lang"));
    // const jsonParser = new Parser();
    // const jsonWasm = context.asAbsolutePath('out/tree-sitter-jsontm.wasm');
    // const jsonLanguage = await Parser.Language.load(jsonWasm);
    // jsonParser.setLanguage(jsonLanguage);
    // const regexParser = new Parser();
    // const regexWasm = context.asAbsolutePath('out/tree-sitter-regextm.wasm');
    // const regexLanguage = await Parser.Language.load(regexWasm);
    // regexParser.setLanguage(regexLanguage);
    vscode.window.visibleTextEditors.forEach(editor => {
        // vscode.window.showInformationMessage(JSON.stringify("visible"));
        parseTextDocument(editor.document, jsonParser, regexParser);
    });
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument(document => {
        // vscode.window.showInformationMessage(JSON.stringify("open"));
        parseTextDocument(document, jsonParser, regexParser);
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(edits => {
        // vscode.window.showInformationMessage(JSON.stringify("change"));
        reparseTextDocument(edits, jsonParser, regexParser);
    }));
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(document => {
        // vscode.window.showInformationMessage(JSON.stringify("close"));
        const uriString = document.uri.toString();
        delete trees[uriString];
    }));
}
exports.initTreeSitter = initTreeSitter;
function parseTextDocument(document, jsonParser, regexParser) {
    // vscode.window.showInformationMessage(JSON.stringify("ParseTextDocument"));
    if (!vscode.languages.match(extension_1.DocumentSelector, document)) {
        return;
    }
    // vscode.window.showInformationMessage(JSON.stringify(document.uri));
    const uriString = document.uri.toString();
    if (uriString in trees) {
        console.log("JSON TextMate: Why are we here?");
        vscode.window.showInformationMessage("JSON TextMate: Why are we here?");
        return;
    }
    const text = document.getText();
    const jsonTree = jsonParser.parse(text);
    // const languageJSON = jsonParser.getLanguage();
    // const query = languageJSON.query(`(regex) @regex`);
    // const queryCaptures = query.captures(jsonTree.rootNode);
    const queryCaptures = queryNode(jsonTree.rootNode, `(regex) @regex`);
    const regexTrees = {};
    const regexNodes = {};
    for (const queryCapture of queryCaptures) {
        const node = queryCapture.node;
        const range = {
            startPosition: node.startPosition,
            endPosition: node.endPosition,
            startIndex: node.startIndex,
            endIndex: node.endIndex
        };
        const ranges = [range];
        const options = { includedRanges: ranges };
        const regexTree = regexParser.parse(text, null, options);
        regexTrees[node.id] = regexTree;
        const regexNode = regexTree.rootNode;
        regexNodes[regexNode.id] = node;
    }
    trees[uriString] = {
        jsonTree: jsonTree,
        regexTrees: regexTrees,
        regexNodes: regexNodes,
    };
    // let index = 0;
    // const regexIds = {};
    // const ranges: Parser.Range[] = [];
    // for (const queryCapture of queryCaptures) {
    // 	const node = queryCapture.node;
    // 	const range: Parser.Range = {
    // 		startPosition: node.startPosition,
    // 		endPosition: node.endPosition,
    // 		startIndex: node.startIndex,
    // 		endIndex: node.endIndex
    // 	};
    // 	ranges.push(range);
    // 	const id = node.id;
    // 	regexIds[id] = index++;
    // }
    // const Options: Parser.Options = { includedRanges: ranges };
    // const regexTree = regexParser.parse(text, jsonTree, Options);
    //  if(node.hasChanges()) {}
}
function reparseTextDocument(edits, JSONParser, regexParser) {
    // vscode.window.showInformationMessage(JSON.stringify("ReparseTextDocument"));
    const document = edits.document;
    if (!vscode.languages.match(extension_1.DocumentSelector, document)) {
        return;
    }
    const uriString = document.uri.toString();
    if (!(uriString in trees)) {
        return;
    }
    const jsonTreeOld = trees[uriString].jsonTree;
    const text = document.getText();
    // const trees = getTrees(document);
    // if (!trees) {
    // 	return;
    // }
    // const oldTree = trees.jsonTree;
    for (const edit of edits.contentChanges) {
        const startIndex = edit.rangeOffset;
        const oldEndIndex = edit.rangeOffset + edit.rangeLength;
        const newEndIndex = edit.rangeOffset + edit.text.length;
        const startPos = document.positionAt(startIndex);
        const oldEndPos = document.positionAt(oldEndIndex);
        const newEndPos = document.positionAt(newEndIndex);
        // const startPosition: Parser.Point = { row: startPos.line, column: startPos.character };
        // const oldEndPosition: Parser.Point = { row: oldEndPos.line, column: oldEndPos.character };
        // const newEndPosition: Parser.Point = { row: newEndPos.line, column: newEndPos.character };
        const startPosition = toPoint(startPos);
        const oldEndPosition = toPoint(oldEndPos);
        const newEndPosition = toPoint(newEndPos);
        const delta = {
            startIndex,
            oldEndIndex,
            newEndIndex,
            startPosition,
            oldEndPosition,
            newEndPosition,
        };
        jsonTreeOld.edit(delta);
    }
    const jsonTree = JSONParser.parse(text, jsonTreeOld);
    // trees[uriString].jsonTree = jsonTree;
    // Todo: only reparse modified regex nodes. tree.getChangedRanges();
    const queryCaptures = queryNode(jsonTree.rootNode, `(regex) @regex`);
    const regexTrees = {};
    const regexNodes = {};
    for (const queryCapture of queryCaptures) {
        const node = queryCapture.node;
        const range = {
            startPosition: node.startPosition,
            endPosition: node.endPosition,
            startIndex: node.startIndex,
            endIndex: node.endIndex
        };
        const ranges = [range];
        const options = { includedRanges: ranges };
        const regexTree = regexParser.parse(text, jsonTreeOld, options);
        regexTrees[node.id] = regexTree;
        const regexNode = regexTree.rootNode;
        regexNodes[regexNode.id] = node;
    }
    // vscode.window.showInformationMessage(JSON.stringify(tree));
    // const changedRanges = tree.getChangedRanges(oldTree);
    // vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.firstNamedChild));
    // tree.rootNode.firstNamedChild = null;
    // vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.firstNamedChild));
    // const regexCaptures = trees[uriString].regexCaptures;
    // for (const edit of edits.contentChanges) {
    // 	const editStartIndex = edit.rangeOffset;
    // 	const editEndIndex = edit.rangeOffset + edit.rangeLength;
    // 	for (let index = 0; index < trees[uriString].regexCaptures.length; index++) {
    // 		const regexCapture = trees[uriString].regexCaptures[index];
    // 		if (regexCapture.node.startIndex <= editStartIndex && // Todo editIndex range can be both outside and inside the regexNode
    // 			regexCapture.node.endIndex >= editEndIndex) {
    // 			const regexTree = trees[uriString].regexTrees[index];
    // 			const text = tree.rootNode.descendantForIndex(editStartIndex).text;
    // 			const newRegexTree = regexParser.parse(text, regexTree);
    // 			trees[uriString].regexTrees[index] = newRegexTree;
    // 		}
    // 	}
    // 	// for (let regexTree of trees[uriString].regexTrees) {
    // 	// 	if (regexTree.rootNode.startIndex <= editStartIndex && // Todo editIndex range can be both outside and inside the regexNode
    // 	// 		regexTree.rootNode.endIndex >= editEndIndex) {
    // 	// 		const text = tree.rootNode.descendantForIndex(editStartIndex).text;
    // 	// 		const newRegexTree = regexParser.parse(text, regexTree);
    // 	// 		const index = trees[uriString].regexTrees.indexOf(regexTree);
    // 	// 		trees[uriString].regexTrees[index] = newRegexTree;
    // 	// 	}
    // 	// }
    // }
    trees[uriString] = {
        jsonTree: jsonTree,
        regexTrees: regexTrees,
        regexNodes: regexNodes,
    };
    // vscode.window.showInformationMessage(JSON.stringify(trees[uriString]));
}


/***/ }),
/* 3 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var __dirname = "/";
var Module=void 0!==Module?Module:{},TreeSitter=function(){var initPromise,document="object"==typeof window?{currentScript:window.document.currentScript}:null;class Parser{constructor(){this.initialize()}initialize(){throw new Error("cannot construct a Parser before calling `init()`")}static init(moduleOptions){return initPromise||(Module=Object.assign({},Module,moduleOptions),initPromise=new Promise((resolveInitPromise=>{var moduleOverrides=Object.assign({},Module),arguments_=[],thisProgram="./this.program",quit_=(e,t)=>{throw t},ENVIRONMENT_IS_WEB="object"==typeof window,ENVIRONMENT_IS_WORKER="function"==typeof importScripts,ENVIRONMENT_IS_NODE="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,scriptDirectory="",read_,readAsync,readBinary,setWindowTitle;function locateFile(e){return Module.locateFile?Module.locateFile(e,scriptDirectory):scriptDirectory+e}function logExceptionOnExit(e){if(e instanceof ExitStatus)return;err("exiting due to exception: "+e)}if(ENVIRONMENT_IS_NODE){var fs=__webpack_require__(4),nodePath=__webpack_require__(5);scriptDirectory=ENVIRONMENT_IS_WORKER?nodePath.dirname(scriptDirectory)+"/":__dirname+"/",read_=(e,t)=>(e=isFileURI(e)?new URL(e):nodePath.normalize(e),fs.readFileSync(e,t?void 0:"utf8")),readBinary=e=>{var t=read_(e,!0);return t.buffer||(t=new Uint8Array(t)),t},readAsync=(e,t,r)=>{e=isFileURI(e)?new URL(e):nodePath.normalize(e),fs.readFile(e,(function(e,_){e?r(e):t(_.buffer)}))},process.argv.length>1&&(thisProgram=process.argv[1].replace(/\\/g,"/")),arguments_=process.argv.slice(2), true&&(module.exports=Module),quit_=(e,t)=>{if(keepRuntimeAlive())throw process.exitCode=e,t;logExceptionOnExit(t),process.exit(e)},Module.inspect=function(){return"[Emscripten Module object]"}}else(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&(ENVIRONMENT_IS_WORKER?scriptDirectory=self.location.href:void 0!==document&&document.currentScript&&(scriptDirectory=document.currentScript.src),scriptDirectory=0!==scriptDirectory.indexOf("blob:")?scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1):"",read_=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.send(null),t.responseText},ENVIRONMENT_IS_WORKER&&(readBinary=e=>{var t=new XMLHttpRequest;return t.open("GET",e,!1),t.responseType="arraybuffer",t.send(null),new Uint8Array(t.response)}),readAsync=(e,t,r)=>{var _=new XMLHttpRequest;_.open("GET",e,!0),_.responseType="arraybuffer",_.onload=()=>{200==_.status||0==_.status&&_.response?t(_.response):r()},_.onerror=r,_.send(null)},setWindowTitle=e=>document.title=e);var out=Module.print||console.log.bind(console),err=Module.printErr||console.warn.bind(console);Object.assign(Module,moduleOverrides),moduleOverrides=null,Module.arguments&&(arguments_=Module.arguments),Module.thisProgram&&(thisProgram=Module.thisProgram),Module.quit&&(quit_=Module.quit);var STACK_ALIGN=16,dynamicLibraries=Module.dynamicLibraries||[],wasmBinary;Module.wasmBinary&&(wasmBinary=Module.wasmBinary);var noExitRuntime=Module.noExitRuntime||!0,wasmMemory;"object"!=typeof WebAssembly&&abort("no native wasm support detected");var ABORT=!1,EXITSTATUS,UTF8Decoder="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function UTF8ArrayToString(e,t,r){for(var _=t+r,n=t;e[n]&&!(n>=_);)++n;if(n-t>16&&e.buffer&&UTF8Decoder)return UTF8Decoder.decode(e.subarray(t,n));for(var s="";t<n;){var a=e[t++];if(128&a){var o=63&e[t++];if(192!=(224&a)){var i=63&e[t++];if((a=224==(240&a)?(15&a)<<12|o<<6|i:(7&a)<<18|o<<12|i<<6|63&e[t++])<65536)s+=String.fromCharCode(a);else{var l=a-65536;s+=String.fromCharCode(55296|l>>10,56320|1023&l)}}else s+=String.fromCharCode((31&a)<<6|o)}else s+=String.fromCharCode(a)}return s}function UTF8ToString(e,t){return e?UTF8ArrayToString(HEAPU8,e,t):""}function stringToUTF8Array(e,t,r,_){if(!(_>0))return 0;for(var n=r,s=r+_-1,a=0;a<e.length;++a){var o=e.charCodeAt(a);if(o>=55296&&o<=57343)o=65536+((1023&o)<<10)|1023&e.charCodeAt(++a);if(o<=127){if(r>=s)break;t[r++]=o}else if(o<=2047){if(r+1>=s)break;t[r++]=192|o>>6,t[r++]=128|63&o}else if(o<=65535){if(r+2>=s)break;t[r++]=224|o>>12,t[r++]=128|o>>6&63,t[r++]=128|63&o}else{if(r+3>=s)break;t[r++]=240|o>>18,t[r++]=128|o>>12&63,t[r++]=128|o>>6&63,t[r++]=128|63&o}}return t[r]=0,r-n}function stringToUTF8(e,t,r){return stringToUTF8Array(e,HEAPU8,t,r)}function lengthBytesUTF8(e){for(var t=0,r=0;r<e.length;++r){var _=e.charCodeAt(r);_<=127?t++:_<=2047?t+=2:_>=55296&&_<=57343?(t+=4,++r):t+=3}return t}function updateGlobalBufferAndViews(e){buffer=e,Module.HEAP8=HEAP8=new Int8Array(e),Module.HEAP16=HEAP16=new Int16Array(e),Module.HEAP32=HEAP32=new Int32Array(e),Module.HEAPU8=HEAPU8=new Uint8Array(e),Module.HEAPU16=HEAPU16=new Uint16Array(e),Module.HEAPU32=HEAPU32=new Uint32Array(e),Module.HEAPF32=HEAPF32=new Float32Array(e),Module.HEAPF64=HEAPF64=new Float64Array(e)}var INITIAL_MEMORY=Module.INITIAL_MEMORY||33554432;wasmMemory=Module.wasmMemory?Module.wasmMemory:new WebAssembly.Memory({initial:INITIAL_MEMORY/65536,maximum:32768}),wasmMemory&&(buffer=wasmMemory.buffer),INITIAL_MEMORY=buffer.byteLength,updateGlobalBufferAndViews(buffer);var wasmTable=new WebAssembly.Table({initial:20,element:"anyfunc"}),__ATPRERUN__=[],__ATINIT__=[],__ATMAIN__=[],__ATPOSTRUN__=[],__RELOC_FUNCS__=[],runtimeInitialized=!1;function keepRuntimeAlive(){return noExitRuntime}function preRun(){if(Module.preRun)for("function"==typeof Module.preRun&&(Module.preRun=[Module.preRun]);Module.preRun.length;)addOnPreRun(Module.preRun.shift());callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=!0,callRuntimeCallbacks(__RELOC_FUNCS__),callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module.postRun)for("function"==typeof Module.postRun&&(Module.postRun=[Module.postRun]);Module.postRun.length;)addOnPostRun(Module.postRun.shift());callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(e){__ATPRERUN__.unshift(e)}function addOnInit(e){__ATINIT__.unshift(e)}function addOnPostRun(e){__ATPOSTRUN__.unshift(e)}var runDependencies=0,runDependencyWatcher=null,dependenciesFulfilled=null;function addRunDependency(e){runDependencies++,Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies)}function removeRunDependency(e){if(runDependencies--,Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies),0==runDependencies&&(null!==runDependencyWatcher&&(clearInterval(runDependencyWatcher),runDependencyWatcher=null),dependenciesFulfilled)){var t=dependenciesFulfilled;dependenciesFulfilled=null,t()}}function abort(e){throw Module.onAbort&&Module.onAbort(e),err(e="Aborted("+e+")"),ABORT=!0,EXITSTATUS=1,e+=". Build with -sASSERTIONS for more info.",new WebAssembly.RuntimeError(e)}var dataURIPrefix="data:application/octet-stream;base64,",wasmBinaryFile,tempDouble,tempI64;function isDataURI(e){return e.startsWith(dataURIPrefix)}function isFileURI(e){return e.startsWith("file://")}function getBinary(e){try{if(e==wasmBinaryFile&&wasmBinary)return new Uint8Array(wasmBinary);if(readBinary)return readBinary(e);throw"both async and sync fetching of the wasm failed"}catch(e){abort(e)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if("function"==typeof fetch&&!isFileURI(wasmBinaryFile))return fetch(wasmBinaryFile,{credentials:"same-origin"}).then((function(e){if(!e.ok)throw"failed to load wasm binary file at '"+wasmBinaryFile+"'";return e.arrayBuffer()})).catch((function(){return getBinary(wasmBinaryFile)}));if(readAsync)return new Promise((function(e,t){readAsync(wasmBinaryFile,(function(t){e(new Uint8Array(t))}),t)}))}return Promise.resolve().then((function(){return getBinary(wasmBinaryFile)}))}function createWasm(){var e={env:asmLibraryArg,wasi_snapshot_preview1:asmLibraryArg,"GOT.mem":new Proxy(asmLibraryArg,GOTHandler),"GOT.func":new Proxy(asmLibraryArg,GOTHandler)};function t(e,t){var r=e.exports;r=relocateExports(r,1024);var _=getDylinkMetadata(t);_.neededDynlibs&&(dynamicLibraries=_.neededDynlibs.concat(dynamicLibraries)),mergeLibSymbols(r,"main"),Module.asm=r,addOnInit(Module.asm.__wasm_call_ctors),__RELOC_FUNCS__.push(Module.asm.__wasm_apply_data_relocs),removeRunDependency("wasm-instantiate")}function r(e){t(e.instance,e.module)}function _(t){return getBinaryPromise().then((function(t){return WebAssembly.instantiate(t,e)})).then((function(e){return e})).then(t,(function(e){err("failed to asynchronously prepare wasm: "+e),abort(e)}))}if(addRunDependency("wasm-instantiate"),Module.instantiateWasm)try{return Module.instantiateWasm(e,t)}catch(e){return err("Module.instantiateWasm callback failed with error: "+e),!1}return wasmBinary||"function"!=typeof WebAssembly.instantiateStreaming||isDataURI(wasmBinaryFile)||isFileURI(wasmBinaryFile)||ENVIRONMENT_IS_NODE||"function"!=typeof fetch?_(r):fetch(wasmBinaryFile,{credentials:"same-origin"}).then((function(t){return WebAssembly.instantiateStreaming(t,e).then(r,(function(e){return err("wasm streaming compile failed: "+e),err("falling back to ArrayBuffer instantiation"),_(r)}))})),{}}wasmBinaryFile="tree-sitter.wasm",isDataURI(wasmBinaryFile)||(wasmBinaryFile=locateFile(wasmBinaryFile));var ASM_CONSTS={};function ExitStatus(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}var GOT={},CurrentModuleWeakSymbols=new Set([]),GOTHandler={get:function(e,t){var r=GOT[t];return r||(r=GOT[t]=new WebAssembly.Global({value:"i32",mutable:!0})),CurrentModuleWeakSymbols.has(t)||(r.required=!0),r}};function callRuntimeCallbacks(e){for(;e.length>0;)e.shift()(Module)}function getDylinkMetadata(e){var t=0,r=0;function _(){for(var r=0,_=1;;){var n=e[t++];if(r+=(127&n)*_,_*=128,!(128&n))break}return r}function n(){var r=_();return UTF8ArrayToString(e,(t+=r)-r,r)}function s(e,t){if(e)throw new Error(t)}var a="dylink.0";if(e instanceof WebAssembly.Module){var o=WebAssembly.Module.customSections(e,a);0===o.length&&(a="dylink",o=WebAssembly.Module.customSections(e,a)),s(0===o.length,"need dylink section"),r=(e=new Uint8Array(o[0])).length}else{s(!(1836278016==new Uint32Array(new Uint8Array(e.subarray(0,24)).buffer)[0]),"need to see wasm magic number"),s(0!==e[8],"need the dylink section to be first"),t=9;var i=_();r=t+i,a=n()}var l={neededDynlibs:[],tlsExports:new Set,weakImports:new Set};if("dylink"==a){l.memorySize=_(),l.memoryAlign=_(),l.tableSize=_(),l.tableAlign=_();for(var u=_(),d=0;d<u;++d){var c=n();l.neededDynlibs.push(c)}}else{s("dylink.0"!==a);for(;t<r;){var m=e[t++],p=_();if(1===m)l.memorySize=_(),l.memoryAlign=_(),l.tableSize=_(),l.tableAlign=_();else if(2===m)for(u=_(),d=0;d<u;++d)c=n(),l.neededDynlibs.push(c);else if(3===m)for(var f=_();f--;){var h=n();256&_()&&l.tlsExports.add(h)}else if(4===m)for(f=_();f--;){n(),h=n();1==(3&_())&&l.weakImports.add(h)}else t+=p}}return l}function getValue(e,t="i8"){switch(t.endsWith("*")&&(t="*"),t){case"i1":case"i8":return HEAP8[e>>0];case"i16":return HEAP16[e>>1];case"i32":case"i64":return HEAP32[e>>2];case"float":return HEAPF32[e>>2];case"double":return HEAPF64[e>>3];case"*":return HEAPU32[e>>2];default:abort("invalid type for getValue: "+t)}return null}function asmjsMangle(e){return 0==e.indexOf("dynCall_")||["stackAlloc","stackSave","stackRestore","getTempRet0","setTempRet0"].includes(e)?e:"_"+e}function mergeLibSymbols(e,t){for(var r in e)if(e.hasOwnProperty(r)){asmLibraryArg.hasOwnProperty(r)||(asmLibraryArg[r]=e[r]);var _=asmjsMangle(r);Module.hasOwnProperty(_)||(Module[_]=e[r]),"__main_argc_argv"==r&&(Module._main=e[r])}}var LDSO={loadedLibsByName:{},loadedLibsByHandle:{}};function dynCallLegacy(e,t,r){var _=Module["dynCall_"+e];return r&&r.length?_.apply(null,[t].concat(r)):_.call(null,t)}var wasmTableMirror=[];function getWasmTableEntry(e){var t=wasmTableMirror[e];return t||(e>=wasmTableMirror.length&&(wasmTableMirror.length=e+1),wasmTableMirror[e]=t=wasmTable.get(e)),t}function dynCall(e,t,r){return e.includes("j")?dynCallLegacy(e,t,r):getWasmTableEntry(t).apply(null,r)}function createInvokeFunction(e){return function(){var t=stackSave();try{return dynCall(e,arguments[0],Array.prototype.slice.call(arguments,1))}catch(e){if(stackRestore(t),e!==e+0)throw e;_setThrew(1,0)}}}var ___heap_base=78144;function zeroMemory(e,t){return HEAPU8.fill(0,e,e+t),e}function getMemory(e){if(runtimeInitialized)return zeroMemory(_malloc(e),e);var t=___heap_base,r=t+e+15&-16;return ___heap_base=r,GOT.__heap_base.value=r,t}function isInternalSym(e){return["__cpp_exception","__c_longjmp","__wasm_apply_data_relocs","__dso_handle","__tls_size","__tls_align","__set_stack_limits","_emscripten_tls_init","__wasm_init_tls","__wasm_call_ctors","__start_em_asm","__stop_em_asm"].includes(e)}function uleb128Encode(e,t){e<128?t.push(e):t.push(e%128|128,e>>7)}function sigToWasmTypes(e){for(var t={i:"i32",j:"i32",f:"f32",d:"f64",p:"i32"},r={parameters:[],results:"v"==e[0]?[]:[t[e[0]]]},_=1;_<e.length;++_)r.parameters.push(t[e[_]]),"j"===e[_]&&r.parameters.push("i32");return r}function generateFuncType(e,t){var r=e.slice(0,1),_=e.slice(1),n={i:127,p:127,j:126,f:125,d:124};t.push(96),uleb128Encode(_.length,t);for(var s=0;s<_.length;++s)t.push(n[_[s]]);"v"==r?t.push(0):t.push(1,n[r])}function convertJsFunctionToWasm(e,t){if("function"==typeof WebAssembly.Function)return new WebAssembly.Function(sigToWasmTypes(t),e);var r=[1];generateFuncType(t,r);var _=[0,97,115,109,1,0,0,0,1];uleb128Encode(r.length,_),_.push.apply(_,r),_.push(2,7,1,1,101,1,102,0,0,7,5,1,1,102,0,0);var n=new WebAssembly.Module(new Uint8Array(_));return new WebAssembly.Instance(n,{e:{f:e}}).exports.f}function updateTableMap(e,t){if(functionsInTableMap)for(var r=e;r<e+t;r++){var _=getWasmTableEntry(r);_&&functionsInTableMap.set(_,r)}}var functionsInTableMap=void 0,freeTableIndexes=[];function getEmptyTableSlot(){if(freeTableIndexes.length)return freeTableIndexes.pop();try{wasmTable.grow(1)}catch(e){if(!(e instanceof RangeError))throw e;throw"Unable to grow wasm table. Set ALLOW_TABLE_GROWTH."}return wasmTable.length-1}function setWasmTableEntry(e,t){wasmTable.set(e,t),wasmTableMirror[e]=wasmTable.get(e)}function addFunction(e,t){if(functionsInTableMap||(functionsInTableMap=new WeakMap,updateTableMap(0,wasmTable.length)),functionsInTableMap.has(e))return functionsInTableMap.get(e);var r=getEmptyTableSlot();try{setWasmTableEntry(r,e)}catch(_){if(!(_ instanceof TypeError))throw _;setWasmTableEntry(r,convertJsFunctionToWasm(e,t))}return functionsInTableMap.set(e,r),r}function updateGOT(e,t){for(var r in e)if(!isInternalSym(r)){var _=e[r];r.startsWith("orig$")&&(r=r.split("$")[1],t=!0),GOT[r]||(GOT[r]=new WebAssembly.Global({value:"i32",mutable:!0})),(t||0==GOT[r].value)&&("function"==typeof _?GOT[r].value=addFunction(_):"number"==typeof _?GOT[r].value=_:err("unhandled export type for `"+r+"`: "+typeof _))}}function relocateExports(e,t,r){var _={};for(var n in e){var s=e[n];"object"==typeof s&&(s=s.value),"number"==typeof s&&(s+=t),_[n]=s}return updateGOT(_,r),_}function resolveGlobalSymbol(e,t){var r;return t&&(r=asmLibraryArg["orig$"+e]),r||(r=asmLibraryArg[e])&&r.stub&&(r=void 0),r||(r=Module[asmjsMangle(e)]),!r&&e.startsWith("invoke_")&&(r=createInvokeFunction(e.split("_")[1])),r}function alignMemory(e,t){return Math.ceil(e/t)*t}function loadWebAssemblyModule(binary,flags,handle){var metadata=getDylinkMetadata(binary);function loadModule(){var firstLoad=!handle||!HEAP8[handle+12>>0];if(firstLoad){var memAlign=Math.pow(2,metadata.memoryAlign);memAlign=Math.max(memAlign,STACK_ALIGN);var memoryBase=metadata.memorySize?alignMemory(getMemory(metadata.memorySize+memAlign),memAlign):0,tableBase=metadata.tableSize?wasmTable.length:0;handle&&(HEAP8[handle+12>>0]=1,HEAPU32[handle+16>>2]=memoryBase,HEAP32[handle+20>>2]=metadata.memorySize,HEAPU32[handle+24>>2]=tableBase,HEAP32[handle+28>>2]=metadata.tableSize)}else memoryBase=HEAPU32[handle+16>>2],tableBase=HEAPU32[handle+24>>2];var tableGrowthNeeded=tableBase+metadata.tableSize-wasmTable.length,moduleExports;function resolveSymbol(e){var t=resolveGlobalSymbol(e,!1);return t||(t=moduleExports[e]),t}tableGrowthNeeded>0&&wasmTable.grow(tableGrowthNeeded);var proxyHandler={get:function(e,t){switch(t){case"__memory_base":return memoryBase;case"__table_base":return tableBase}if(t in asmLibraryArg)return asmLibraryArg[t];var r;t in e||(e[t]=function(){return r||(r=resolveSymbol(t)),r.apply(null,arguments)});return e[t]}},proxy=new Proxy({},proxyHandler),info={"GOT.mem":new Proxy({},GOTHandler),"GOT.func":new Proxy({},GOTHandler),env:proxy,wasi_snapshot_preview1:proxy};function postInstantiation(instance){function addEmAsm(addr,body){for(var args=[],arity=0;arity<16&&-1!=body.indexOf("$"+arity);arity++)args.push("$"+arity);args=args.join(",");var func="("+args+" ) => { "+body+"};";ASM_CONSTS[start]=eval(func)}if(updateTableMap(tableBase,metadata.tableSize),moduleExports=relocateExports(instance.exports,memoryBase),flags.allowUndefined||reportUndefinedSymbols(),"__start_em_asm"in moduleExports)for(var start=moduleExports.__start_em_asm,stop=moduleExports.__stop_em_asm;start<stop;){var jsString=UTF8ToString(start);addEmAsm(start,jsString),start=HEAPU8.indexOf(0,start)+1}var applyRelocs=moduleExports.__wasm_apply_data_relocs;applyRelocs&&(runtimeInitialized?applyRelocs():__RELOC_FUNCS__.push(applyRelocs));var init=moduleExports.__wasm_call_ctors;return init&&(runtimeInitialized?init():__ATINIT__.push(init)),moduleExports}if(flags.loadAsync){if(binary instanceof WebAssembly.Module){var instance=new WebAssembly.Instance(binary,info);return Promise.resolve(postInstantiation(instance))}return WebAssembly.instantiate(binary,info).then((function(e){return postInstantiation(e.instance)}))}var module=binary instanceof WebAssembly.Module?binary:new WebAssembly.Module(binary),instance=new WebAssembly.Instance(module,info);return postInstantiation(instance)}return CurrentModuleWeakSymbols=metadata.weakImports,flags.loadAsync?metadata.neededDynlibs.reduce((function(e,t){return e.then((function(){return loadDynamicLibrary(t,flags)}))}),Promise.resolve()).then((function(){return loadModule()})):(metadata.neededDynlibs.forEach((function(e){loadDynamicLibrary(e,flags)})),loadModule())}function loadDynamicLibrary(e,t,r){t=t||{global:!0,nodelete:!0};var _=LDSO.loadedLibsByName[e];if(_)return t.global&&!_.global&&(_.global=!0,"loading"!==_.module&&mergeLibSymbols(_.module,e)),t.nodelete&&_.refcount!==1/0&&(_.refcount=1/0),_.refcount++,r&&(LDSO.loadedLibsByHandle[r]=_),!t.loadAsync||Promise.resolve(!0);function n(e){if(t.fs&&t.fs.findObject(e)){var r=t.fs.readFile(e,{encoding:"binary"});return r instanceof Uint8Array||(r=new Uint8Array(r)),t.loadAsync?Promise.resolve(r):r}if(e=locateFile(e),t.loadAsync)return new Promise((function(t,r){readAsync(e,(e=>t(new Uint8Array(e))),r)}));if(!readBinary)throw new Error(e+": file not found, and synchronous loading of external files is not available");return readBinary(e)}function s(){if("undefined"!=typeof preloadedWasm&&preloadedWasm[e]){var _=preloadedWasm[e];return t.loadAsync?Promise.resolve(_):_}return t.loadAsync?n(e).then((function(e){return loadWebAssemblyModule(e,t,r)})):loadWebAssemblyModule(n(e),t,r)}function a(t){_.global&&mergeLibSymbols(t,e),_.module=t}return _={refcount:t.nodelete?1/0:1,name:e,module:"loading",global:t.global},LDSO.loadedLibsByName[e]=_,r&&(LDSO.loadedLibsByHandle[r]=_),t.loadAsync?s().then((function(e){return a(e),!0})):(a(s()),!0)}function reportUndefinedSymbols(){for(var e in GOT)if(0==GOT[e].value){var t=resolveGlobalSymbol(e,!0);if(!t&&!GOT[e].required)continue;if("function"==typeof t)GOT[e].value=addFunction(t,t.sig);else{if("number"!=typeof t)throw new Error("bad export type for `"+e+"`: "+typeof t);GOT[e].value=t}}}function preloadDylibs(){dynamicLibraries.length?(addRunDependency("preloadDylibs"),dynamicLibraries.reduce((function(e,t){return e.then((function(){return loadDynamicLibrary(t,{loadAsync:!0,global:!0,nodelete:!0,allowUndefined:!0})}))}),Promise.resolve()).then((function(){reportUndefinedSymbols(),removeRunDependency("preloadDylibs")}))):reportUndefinedSymbols()}function setValue(e,t,r="i8"){switch(r.endsWith("*")&&(r="*"),r){case"i1":case"i8":HEAP8[e>>0]=t;break;case"i16":HEAP16[e>>1]=t;break;case"i32":HEAP32[e>>2]=t;break;case"i64":tempI64=[t>>>0,(tempDouble=t,+Math.abs(tempDouble)>=1?tempDouble>0?(0|Math.min(+Math.floor(tempDouble/4294967296),4294967295))>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[e>>2]=tempI64[0],HEAP32[e+4>>2]=tempI64[1];break;case"float":HEAPF32[e>>2]=t;break;case"double":HEAPF64[e>>3]=t;break;case"*":HEAPU32[e>>2]=t;break;default:abort("invalid type for setValue: "+r)}}var ___memory_base=new WebAssembly.Global({value:"i32",mutable:!1},1024),___stack_pointer=new WebAssembly.Global({value:"i32",mutable:!0},78144),___table_base=new WebAssembly.Global({value:"i32",mutable:!1},1),nowIsMonotonic=!0,_emscripten_get_now;function __emscripten_get_now_is_monotonic(){return nowIsMonotonic}function _abort(){abort("")}function _emscripten_date_now(){return Date.now()}function _emscripten_memcpy_big(e,t,r){HEAPU8.copyWithin(e,t,t+r)}function getHeapMax(){return 2147483648}function emscripten_realloc_buffer(e){try{return wasmMemory.grow(e-buffer.byteLength+65535>>>16),updateGlobalBufferAndViews(wasmMemory.buffer),1}catch(e){}}function _emscripten_resize_heap(e){var t=HEAPU8.length;e>>>=0;var r=getHeapMax();if(e>r)return!1;for(var _=1;_<=4;_*=2){var n=t*(1+.2/_);if(n=Math.min(n,e+100663296),emscripten_realloc_buffer(Math.min(r,(s=Math.max(e,n))+((a=65536)-s%a)%a)))return!0}var s,a;return!1}__emscripten_get_now_is_monotonic.sig="i",Module._abort=_abort,_abort.sig="v",_emscripten_date_now.sig="d",_emscripten_get_now=ENVIRONMENT_IS_NODE?()=>{var e=process.hrtime();return 1e3*e[0]+e[1]/1e6}:()=>performance.now(),_emscripten_get_now.sig="d",_emscripten_memcpy_big.sig="vppp",_emscripten_resize_heap.sig="ip";var SYSCALLS={DEFAULT_POLLMASK:5,calculateAt:function(e,t,r){if(PATH.isAbs(t))return t;var _;-100===e?_=FS.cwd():_=SYSCALLS.getStreamFromFD(e).path;if(0==t.length){if(!r)throw new FS.ErrnoError(44);return _}return PATH.join2(_,t)},doStat:function(e,t,r){try{var _=e(t)}catch(e){if(e&&e.node&&PATH.normalize(t)!==PATH.normalize(FS.getPath(e.node)))return-54;throw e}HEAP32[r>>2]=_.dev,HEAP32[r+8>>2]=_.ino,HEAP32[r+12>>2]=_.mode,HEAPU32[r+16>>2]=_.nlink,HEAP32[r+20>>2]=_.uid,HEAP32[r+24>>2]=_.gid,HEAP32[r+28>>2]=_.rdev,tempI64=[_.size>>>0,(tempDouble=_.size,+Math.abs(tempDouble)>=1?tempDouble>0?(0|Math.min(+Math.floor(tempDouble/4294967296),4294967295))>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[r+40>>2]=tempI64[0],HEAP32[r+44>>2]=tempI64[1],HEAP32[r+48>>2]=4096,HEAP32[r+52>>2]=_.blocks;var n=_.atime.getTime(),s=_.mtime.getTime(),a=_.ctime.getTime();return tempI64=[Math.floor(n/1e3)>>>0,(tempDouble=Math.floor(n/1e3),+Math.abs(tempDouble)>=1?tempDouble>0?(0|Math.min(+Math.floor(tempDouble/4294967296),4294967295))>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[r+56>>2]=tempI64[0],HEAP32[r+60>>2]=tempI64[1],HEAPU32[r+64>>2]=n%1e3*1e3,tempI64=[Math.floor(s/1e3)>>>0,(tempDouble=Math.floor(s/1e3),+Math.abs(tempDouble)>=1?tempDouble>0?(0|Math.min(+Math.floor(tempDouble/4294967296),4294967295))>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[r+72>>2]=tempI64[0],HEAP32[r+76>>2]=tempI64[1],HEAPU32[r+80>>2]=s%1e3*1e3,tempI64=[Math.floor(a/1e3)>>>0,(tempDouble=Math.floor(a/1e3),+Math.abs(tempDouble)>=1?tempDouble>0?(0|Math.min(+Math.floor(tempDouble/4294967296),4294967295))>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[r+88>>2]=tempI64[0],HEAP32[r+92>>2]=tempI64[1],HEAPU32[r+96>>2]=a%1e3*1e3,tempI64=[_.ino>>>0,(tempDouble=_.ino,+Math.abs(tempDouble)>=1?tempDouble>0?(0|Math.min(+Math.floor(tempDouble/4294967296),4294967295))>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[r+104>>2]=tempI64[0],HEAP32[r+108>>2]=tempI64[1],0},doMsync:function(e,t,r,_,n){if(!FS.isFile(t.node.mode))throw new FS.ErrnoError(43);if(2&_)return 0;var s=HEAPU8.slice(e,e+r);FS.msync(t,s,n,r,_)},varargs:void 0,get:function(){return SYSCALLS.varargs+=4,HEAP32[SYSCALLS.varargs-4>>2]},getStr:function(e){return UTF8ToString(e)},getStreamFromFD:function(e){var t=FS.getStream(e);if(!t)throw new FS.ErrnoError(8);return t}};function _proc_exit(e){EXITSTATUS=e,keepRuntimeAlive()||(Module.onExit&&Module.onExit(e),ABORT=!0),quit_(e,new ExitStatus(e))}function exitJS(e,t){EXITSTATUS=e,_proc_exit(e)}_proc_exit.sig="vi";var _exit=exitJS;function _fd_close(e){try{var t=SYSCALLS.getStreamFromFD(e);return FS.close(t),0}catch(e){if("undefined"==typeof FS||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function convertI32PairToI53Checked(e,t){return t+2097152>>>0<4194305-!!e?(e>>>0)+4294967296*t:NaN}function _fd_seek(e,t,r,_,n){try{var s=convertI32PairToI53Checked(t,r);if(isNaN(s))return 61;var a=SYSCALLS.getStreamFromFD(e);return FS.llseek(a,s,_),tempI64=[a.position>>>0,(tempDouble=a.position,+Math.abs(tempDouble)>=1?tempDouble>0?(0|Math.min(+Math.floor(tempDouble/4294967296),4294967295))>>>0:~~+Math.ceil((tempDouble-+(~~tempDouble>>>0))/4294967296)>>>0:0)],HEAP32[n>>2]=tempI64[0],HEAP32[n+4>>2]=tempI64[1],a.getdents&&0===s&&0===_&&(a.getdents=null),0}catch(e){if("undefined"==typeof FS||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function doWritev(e,t,r,_){for(var n=0,s=0;s<r;s++){var a=HEAPU32[t>>2],o=HEAPU32[t+4>>2];t+=8;var i=FS.write(e,HEAP8,a,o,_);if(i<0)return-1;n+=i,void 0!==_&&(_+=i)}return n}function _fd_write(e,t,r,_){try{var n=doWritev(SYSCALLS.getStreamFromFD(e),t,r);return HEAPU32[_>>2]=n,0}catch(e){if("undefined"==typeof FS||!(e instanceof FS.ErrnoError))throw e;return e.errno}}function _tree_sitter_log_callback(e,t){if(currentLogCallback){const r=UTF8ToString(t);currentLogCallback(r,0!==e)}}function _tree_sitter_parse_callback(e,t,r,_,n){var s=currentParseCallback(t,{row:r,column:_});"string"==typeof s?(setValue(n,s.length,"i32"),stringToUTF16(s,e,10240)):setValue(n,0,"i32")}function handleException(e){if(e instanceof ExitStatus||"unwind"==e)return EXITSTATUS;quit_(1,e)}function allocateUTF8OnStack(e){var t=lengthBytesUTF8(e)+1,r=stackAlloc(t);return stringToUTF8Array(e,HEAP8,r,t),r}function stringToUTF16(e,t,r){if(void 0===r&&(r=2147483647),r<2)return 0;for(var _=t,n=(r-=2)<2*e.length?r/2:e.length,s=0;s<n;++s){var a=e.charCodeAt(s);HEAP16[t>>1]=a,t+=2}return HEAP16[t>>1]=0,t-_}function AsciiToString(e){for(var t="";;){var r=HEAPU8[e++>>0];if(!r)return t;t+=String.fromCharCode(r)}}_exit.sig="vi",_fd_close.sig="ii",_fd_seek.sig="iijip",_fd_write.sig="iippp";var asmLibraryArg={__heap_base:___heap_base,__indirect_function_table:wasmTable,__memory_base:___memory_base,__stack_pointer:___stack_pointer,__table_base:___table_base,_emscripten_get_now_is_monotonic:__emscripten_get_now_is_monotonic,abort:_abort,emscripten_get_now:_emscripten_get_now,emscripten_memcpy_big:_emscripten_memcpy_big,emscripten_resize_heap:_emscripten_resize_heap,exit:_exit,fd_close:_fd_close,fd_seek:_fd_seek,fd_write:_fd_write,memory:wasmMemory,tree_sitter_log_callback:_tree_sitter_log_callback,tree_sitter_parse_callback:_tree_sitter_parse_callback},asm=createWasm(),___wasm_call_ctors=Module.___wasm_call_ctors=function(){return(___wasm_call_ctors=Module.___wasm_call_ctors=Module.asm.__wasm_call_ctors).apply(null,arguments)},___wasm_apply_data_relocs=Module.___wasm_apply_data_relocs=function(){return(___wasm_apply_data_relocs=Module.___wasm_apply_data_relocs=Module.asm.__wasm_apply_data_relocs).apply(null,arguments)},_malloc=Module._malloc=function(){return(_malloc=Module._malloc=Module.asm.malloc).apply(null,arguments)},_calloc=Module._calloc=function(){return(_calloc=Module._calloc=Module.asm.calloc).apply(null,arguments)},_realloc=Module._realloc=function(){return(_realloc=Module._realloc=Module.asm.realloc).apply(null,arguments)},_free=Module._free=function(){return(_free=Module._free=Module.asm.free).apply(null,arguments)},_ts_language_symbol_count=Module._ts_language_symbol_count=function(){return(_ts_language_symbol_count=Module._ts_language_symbol_count=Module.asm.ts_language_symbol_count).apply(null,arguments)},_ts_language_version=Module._ts_language_version=function(){return(_ts_language_version=Module._ts_language_version=Module.asm.ts_language_version).apply(null,arguments)},_ts_language_field_count=Module._ts_language_field_count=function(){return(_ts_language_field_count=Module._ts_language_field_count=Module.asm.ts_language_field_count).apply(null,arguments)},_ts_language_symbol_name=Module._ts_language_symbol_name=function(){return(_ts_language_symbol_name=Module._ts_language_symbol_name=Module.asm.ts_language_symbol_name).apply(null,arguments)},_ts_language_symbol_for_name=Module._ts_language_symbol_for_name=function(){return(_ts_language_symbol_for_name=Module._ts_language_symbol_for_name=Module.asm.ts_language_symbol_for_name).apply(null,arguments)},_ts_language_symbol_type=Module._ts_language_symbol_type=function(){return(_ts_language_symbol_type=Module._ts_language_symbol_type=Module.asm.ts_language_symbol_type).apply(null,arguments)},_ts_language_field_name_for_id=Module._ts_language_field_name_for_id=function(){return(_ts_language_field_name_for_id=Module._ts_language_field_name_for_id=Module.asm.ts_language_field_name_for_id).apply(null,arguments)},_memset=Module._memset=function(){return(_memset=Module._memset=Module.asm.memset).apply(null,arguments)},_memcpy=Module._memcpy=function(){return(_memcpy=Module._memcpy=Module.asm.memcpy).apply(null,arguments)},_ts_parser_delete=Module._ts_parser_delete=function(){return(_ts_parser_delete=Module._ts_parser_delete=Module.asm.ts_parser_delete).apply(null,arguments)},_ts_parser_reset=Module._ts_parser_reset=function(){return(_ts_parser_reset=Module._ts_parser_reset=Module.asm.ts_parser_reset).apply(null,arguments)},_ts_parser_set_language=Module._ts_parser_set_language=function(){return(_ts_parser_set_language=Module._ts_parser_set_language=Module.asm.ts_parser_set_language).apply(null,arguments)},_ts_parser_timeout_micros=Module._ts_parser_timeout_micros=function(){return(_ts_parser_timeout_micros=Module._ts_parser_timeout_micros=Module.asm.ts_parser_timeout_micros).apply(null,arguments)},_ts_parser_set_timeout_micros=Module._ts_parser_set_timeout_micros=function(){return(_ts_parser_set_timeout_micros=Module._ts_parser_set_timeout_micros=Module.asm.ts_parser_set_timeout_micros).apply(null,arguments)},_memmove=Module._memmove=function(){return(_memmove=Module._memmove=Module.asm.memmove).apply(null,arguments)},_memcmp=Module._memcmp=function(){return(_memcmp=Module._memcmp=Module.asm.memcmp).apply(null,arguments)},_ts_query_new=Module._ts_query_new=function(){return(_ts_query_new=Module._ts_query_new=Module.asm.ts_query_new).apply(null,arguments)},_ts_query_delete=Module._ts_query_delete=function(){return(_ts_query_delete=Module._ts_query_delete=Module.asm.ts_query_delete).apply(null,arguments)},_iswspace=Module._iswspace=function(){return(_iswspace=Module._iswspace=Module.asm.iswspace).apply(null,arguments)},_iswalnum=Module._iswalnum=function(){return(_iswalnum=Module._iswalnum=Module.asm.iswalnum).apply(null,arguments)},_ts_query_pattern_count=Module._ts_query_pattern_count=function(){return(_ts_query_pattern_count=Module._ts_query_pattern_count=Module.asm.ts_query_pattern_count).apply(null,arguments)},_ts_query_capture_count=Module._ts_query_capture_count=function(){return(_ts_query_capture_count=Module._ts_query_capture_count=Module.asm.ts_query_capture_count).apply(null,arguments)},_ts_query_string_count=Module._ts_query_string_count=function(){return(_ts_query_string_count=Module._ts_query_string_count=Module.asm.ts_query_string_count).apply(null,arguments)},_ts_query_capture_name_for_id=Module._ts_query_capture_name_for_id=function(){return(_ts_query_capture_name_for_id=Module._ts_query_capture_name_for_id=Module.asm.ts_query_capture_name_for_id).apply(null,arguments)},_ts_query_string_value_for_id=Module._ts_query_string_value_for_id=function(){return(_ts_query_string_value_for_id=Module._ts_query_string_value_for_id=Module.asm.ts_query_string_value_for_id).apply(null,arguments)},_ts_query_predicates_for_pattern=Module._ts_query_predicates_for_pattern=function(){return(_ts_query_predicates_for_pattern=Module._ts_query_predicates_for_pattern=Module.asm.ts_query_predicates_for_pattern).apply(null,arguments)},_ts_tree_copy=Module._ts_tree_copy=function(){return(_ts_tree_copy=Module._ts_tree_copy=Module.asm.ts_tree_copy).apply(null,arguments)},_ts_tree_delete=Module._ts_tree_delete=function(){return(_ts_tree_delete=Module._ts_tree_delete=Module.asm.ts_tree_delete).apply(null,arguments)},_ts_init=Module._ts_init=function(){return(_ts_init=Module._ts_init=Module.asm.ts_init).apply(null,arguments)},_ts_parser_new_wasm=Module._ts_parser_new_wasm=function(){return(_ts_parser_new_wasm=Module._ts_parser_new_wasm=Module.asm.ts_parser_new_wasm).apply(null,arguments)},_ts_parser_enable_logger_wasm=Module._ts_parser_enable_logger_wasm=function(){return(_ts_parser_enable_logger_wasm=Module._ts_parser_enable_logger_wasm=Module.asm.ts_parser_enable_logger_wasm).apply(null,arguments)},_ts_parser_parse_wasm=Module._ts_parser_parse_wasm=function(){return(_ts_parser_parse_wasm=Module._ts_parser_parse_wasm=Module.asm.ts_parser_parse_wasm).apply(null,arguments)},_ts_language_type_is_named_wasm=Module._ts_language_type_is_named_wasm=function(){return(_ts_language_type_is_named_wasm=Module._ts_language_type_is_named_wasm=Module.asm.ts_language_type_is_named_wasm).apply(null,arguments)},_ts_language_type_is_visible_wasm=Module._ts_language_type_is_visible_wasm=function(){return(_ts_language_type_is_visible_wasm=Module._ts_language_type_is_visible_wasm=Module.asm.ts_language_type_is_visible_wasm).apply(null,arguments)},_ts_tree_root_node_wasm=Module._ts_tree_root_node_wasm=function(){return(_ts_tree_root_node_wasm=Module._ts_tree_root_node_wasm=Module.asm.ts_tree_root_node_wasm).apply(null,arguments)},_ts_tree_edit_wasm=Module._ts_tree_edit_wasm=function(){return(_ts_tree_edit_wasm=Module._ts_tree_edit_wasm=Module.asm.ts_tree_edit_wasm).apply(null,arguments)},_ts_tree_get_changed_ranges_wasm=Module._ts_tree_get_changed_ranges_wasm=function(){return(_ts_tree_get_changed_ranges_wasm=Module._ts_tree_get_changed_ranges_wasm=Module.asm.ts_tree_get_changed_ranges_wasm).apply(null,arguments)},_ts_tree_cursor_new_wasm=Module._ts_tree_cursor_new_wasm=function(){return(_ts_tree_cursor_new_wasm=Module._ts_tree_cursor_new_wasm=Module.asm.ts_tree_cursor_new_wasm).apply(null,arguments)},_ts_tree_cursor_delete_wasm=Module._ts_tree_cursor_delete_wasm=function(){return(_ts_tree_cursor_delete_wasm=Module._ts_tree_cursor_delete_wasm=Module.asm.ts_tree_cursor_delete_wasm).apply(null,arguments)},_ts_tree_cursor_reset_wasm=Module._ts_tree_cursor_reset_wasm=function(){return(_ts_tree_cursor_reset_wasm=Module._ts_tree_cursor_reset_wasm=Module.asm.ts_tree_cursor_reset_wasm).apply(null,arguments)},_ts_tree_cursor_goto_first_child_wasm=Module._ts_tree_cursor_goto_first_child_wasm=function(){return(_ts_tree_cursor_goto_first_child_wasm=Module._ts_tree_cursor_goto_first_child_wasm=Module.asm.ts_tree_cursor_goto_first_child_wasm).apply(null,arguments)},_ts_tree_cursor_goto_next_sibling_wasm=Module._ts_tree_cursor_goto_next_sibling_wasm=function(){return(_ts_tree_cursor_goto_next_sibling_wasm=Module._ts_tree_cursor_goto_next_sibling_wasm=Module.asm.ts_tree_cursor_goto_next_sibling_wasm).apply(null,arguments)},_ts_tree_cursor_goto_parent_wasm=Module._ts_tree_cursor_goto_parent_wasm=function(){return(_ts_tree_cursor_goto_parent_wasm=Module._ts_tree_cursor_goto_parent_wasm=Module.asm.ts_tree_cursor_goto_parent_wasm).apply(null,arguments)},_ts_tree_cursor_current_node_type_id_wasm=Module._ts_tree_cursor_current_node_type_id_wasm=function(){return(_ts_tree_cursor_current_node_type_id_wasm=Module._ts_tree_cursor_current_node_type_id_wasm=Module.asm.ts_tree_cursor_current_node_type_id_wasm).apply(null,arguments)},_ts_tree_cursor_current_node_is_named_wasm=Module._ts_tree_cursor_current_node_is_named_wasm=function(){return(_ts_tree_cursor_current_node_is_named_wasm=Module._ts_tree_cursor_current_node_is_named_wasm=Module.asm.ts_tree_cursor_current_node_is_named_wasm).apply(null,arguments)},_ts_tree_cursor_current_node_is_missing_wasm=Module._ts_tree_cursor_current_node_is_missing_wasm=function(){return(_ts_tree_cursor_current_node_is_missing_wasm=Module._ts_tree_cursor_current_node_is_missing_wasm=Module.asm.ts_tree_cursor_current_node_is_missing_wasm).apply(null,arguments)},_ts_tree_cursor_current_node_id_wasm=Module._ts_tree_cursor_current_node_id_wasm=function(){return(_ts_tree_cursor_current_node_id_wasm=Module._ts_tree_cursor_current_node_id_wasm=Module.asm.ts_tree_cursor_current_node_id_wasm).apply(null,arguments)},_ts_tree_cursor_start_position_wasm=Module._ts_tree_cursor_start_position_wasm=function(){return(_ts_tree_cursor_start_position_wasm=Module._ts_tree_cursor_start_position_wasm=Module.asm.ts_tree_cursor_start_position_wasm).apply(null,arguments)},_ts_tree_cursor_end_position_wasm=Module._ts_tree_cursor_end_position_wasm=function(){return(_ts_tree_cursor_end_position_wasm=Module._ts_tree_cursor_end_position_wasm=Module.asm.ts_tree_cursor_end_position_wasm).apply(null,arguments)},_ts_tree_cursor_start_index_wasm=Module._ts_tree_cursor_start_index_wasm=function(){return(_ts_tree_cursor_start_index_wasm=Module._ts_tree_cursor_start_index_wasm=Module.asm.ts_tree_cursor_start_index_wasm).apply(null,arguments)},_ts_tree_cursor_end_index_wasm=Module._ts_tree_cursor_end_index_wasm=function(){return(_ts_tree_cursor_end_index_wasm=Module._ts_tree_cursor_end_index_wasm=Module.asm.ts_tree_cursor_end_index_wasm).apply(null,arguments)},_ts_tree_cursor_current_field_id_wasm=Module._ts_tree_cursor_current_field_id_wasm=function(){return(_ts_tree_cursor_current_field_id_wasm=Module._ts_tree_cursor_current_field_id_wasm=Module.asm.ts_tree_cursor_current_field_id_wasm).apply(null,arguments)},_ts_tree_cursor_current_node_wasm=Module._ts_tree_cursor_current_node_wasm=function(){return(_ts_tree_cursor_current_node_wasm=Module._ts_tree_cursor_current_node_wasm=Module.asm.ts_tree_cursor_current_node_wasm).apply(null,arguments)},_ts_node_symbol_wasm=Module._ts_node_symbol_wasm=function(){return(_ts_node_symbol_wasm=Module._ts_node_symbol_wasm=Module.asm.ts_node_symbol_wasm).apply(null,arguments)},_ts_node_child_count_wasm=Module._ts_node_child_count_wasm=function(){return(_ts_node_child_count_wasm=Module._ts_node_child_count_wasm=Module.asm.ts_node_child_count_wasm).apply(null,arguments)},_ts_node_named_child_count_wasm=Module._ts_node_named_child_count_wasm=function(){return(_ts_node_named_child_count_wasm=Module._ts_node_named_child_count_wasm=Module.asm.ts_node_named_child_count_wasm).apply(null,arguments)},_ts_node_child_wasm=Module._ts_node_child_wasm=function(){return(_ts_node_child_wasm=Module._ts_node_child_wasm=Module.asm.ts_node_child_wasm).apply(null,arguments)},_ts_node_named_child_wasm=Module._ts_node_named_child_wasm=function(){return(_ts_node_named_child_wasm=Module._ts_node_named_child_wasm=Module.asm.ts_node_named_child_wasm).apply(null,arguments)},_ts_node_child_by_field_id_wasm=Module._ts_node_child_by_field_id_wasm=function(){return(_ts_node_child_by_field_id_wasm=Module._ts_node_child_by_field_id_wasm=Module.asm.ts_node_child_by_field_id_wasm).apply(null,arguments)},_ts_node_next_sibling_wasm=Module._ts_node_next_sibling_wasm=function(){return(_ts_node_next_sibling_wasm=Module._ts_node_next_sibling_wasm=Module.asm.ts_node_next_sibling_wasm).apply(null,arguments)},_ts_node_prev_sibling_wasm=Module._ts_node_prev_sibling_wasm=function(){return(_ts_node_prev_sibling_wasm=Module._ts_node_prev_sibling_wasm=Module.asm.ts_node_prev_sibling_wasm).apply(null,arguments)},_ts_node_next_named_sibling_wasm=Module._ts_node_next_named_sibling_wasm=function(){return(_ts_node_next_named_sibling_wasm=Module._ts_node_next_named_sibling_wasm=Module.asm.ts_node_next_named_sibling_wasm).apply(null,arguments)},_ts_node_prev_named_sibling_wasm=Module._ts_node_prev_named_sibling_wasm=function(){return(_ts_node_prev_named_sibling_wasm=Module._ts_node_prev_named_sibling_wasm=Module.asm.ts_node_prev_named_sibling_wasm).apply(null,arguments)},_ts_node_parent_wasm=Module._ts_node_parent_wasm=function(){return(_ts_node_parent_wasm=Module._ts_node_parent_wasm=Module.asm.ts_node_parent_wasm).apply(null,arguments)},_ts_node_descendant_for_index_wasm=Module._ts_node_descendant_for_index_wasm=function(){return(_ts_node_descendant_for_index_wasm=Module._ts_node_descendant_for_index_wasm=Module.asm.ts_node_descendant_for_index_wasm).apply(null,arguments)},_ts_node_named_descendant_for_index_wasm=Module._ts_node_named_descendant_for_index_wasm=function(){return(_ts_node_named_descendant_for_index_wasm=Module._ts_node_named_descendant_for_index_wasm=Module.asm.ts_node_named_descendant_for_index_wasm).apply(null,arguments)},_ts_node_descendant_for_position_wasm=Module._ts_node_descendant_for_position_wasm=function(){return(_ts_node_descendant_for_position_wasm=Module._ts_node_descendant_for_position_wasm=Module.asm.ts_node_descendant_for_position_wasm).apply(null,arguments)},_ts_node_named_descendant_for_position_wasm=Module._ts_node_named_descendant_for_position_wasm=function(){return(_ts_node_named_descendant_for_position_wasm=Module._ts_node_named_descendant_for_position_wasm=Module.asm.ts_node_named_descendant_for_position_wasm).apply(null,arguments)},_ts_node_start_point_wasm=Module._ts_node_start_point_wasm=function(){return(_ts_node_start_point_wasm=Module._ts_node_start_point_wasm=Module.asm.ts_node_start_point_wasm).apply(null,arguments)},_ts_node_end_point_wasm=Module._ts_node_end_point_wasm=function(){return(_ts_node_end_point_wasm=Module._ts_node_end_point_wasm=Module.asm.ts_node_end_point_wasm).apply(null,arguments)},_ts_node_start_index_wasm=Module._ts_node_start_index_wasm=function(){return(_ts_node_start_index_wasm=Module._ts_node_start_index_wasm=Module.asm.ts_node_start_index_wasm).apply(null,arguments)},_ts_node_end_index_wasm=Module._ts_node_end_index_wasm=function(){return(_ts_node_end_index_wasm=Module._ts_node_end_index_wasm=Module.asm.ts_node_end_index_wasm).apply(null,arguments)},_ts_node_to_string_wasm=Module._ts_node_to_string_wasm=function(){return(_ts_node_to_string_wasm=Module._ts_node_to_string_wasm=Module.asm.ts_node_to_string_wasm).apply(null,arguments)},_ts_node_children_wasm=Module._ts_node_children_wasm=function(){return(_ts_node_children_wasm=Module._ts_node_children_wasm=Module.asm.ts_node_children_wasm).apply(null,arguments)},_ts_node_named_children_wasm=Module._ts_node_named_children_wasm=function(){return(_ts_node_named_children_wasm=Module._ts_node_named_children_wasm=Module.asm.ts_node_named_children_wasm).apply(null,arguments)},_ts_node_descendants_of_type_wasm=Module._ts_node_descendants_of_type_wasm=function(){return(_ts_node_descendants_of_type_wasm=Module._ts_node_descendants_of_type_wasm=Module.asm.ts_node_descendants_of_type_wasm).apply(null,arguments)},_ts_node_is_named_wasm=Module._ts_node_is_named_wasm=function(){return(_ts_node_is_named_wasm=Module._ts_node_is_named_wasm=Module.asm.ts_node_is_named_wasm).apply(null,arguments)},_ts_node_has_changes_wasm=Module._ts_node_has_changes_wasm=function(){return(_ts_node_has_changes_wasm=Module._ts_node_has_changes_wasm=Module.asm.ts_node_has_changes_wasm).apply(null,arguments)},_ts_node_has_error_wasm=Module._ts_node_has_error_wasm=function(){return(_ts_node_has_error_wasm=Module._ts_node_has_error_wasm=Module.asm.ts_node_has_error_wasm).apply(null,arguments)},_ts_node_is_missing_wasm=Module._ts_node_is_missing_wasm=function(){return(_ts_node_is_missing_wasm=Module._ts_node_is_missing_wasm=Module.asm.ts_node_is_missing_wasm).apply(null,arguments)},_ts_query_matches_wasm=Module._ts_query_matches_wasm=function(){return(_ts_query_matches_wasm=Module._ts_query_matches_wasm=Module.asm.ts_query_matches_wasm).apply(null,arguments)},_ts_query_captures_wasm=Module._ts_query_captures_wasm=function(){return(_ts_query_captures_wasm=Module._ts_query_captures_wasm=Module.asm.ts_query_captures_wasm).apply(null,arguments)},___cxa_atexit=Module.___cxa_atexit=function(){return(___cxa_atexit=Module.___cxa_atexit=Module.asm.__cxa_atexit).apply(null,arguments)},_iswdigit=Module._iswdigit=function(){return(_iswdigit=Module._iswdigit=Module.asm.iswdigit).apply(null,arguments)},_iswalpha=Module._iswalpha=function(){return(_iswalpha=Module._iswalpha=Module.asm.iswalpha).apply(null,arguments)},_iswlower=Module._iswlower=function(){return(_iswlower=Module._iswlower=Module.asm.iswlower).apply(null,arguments)},_memchr=Module._memchr=function(){return(_memchr=Module._memchr=Module.asm.memchr).apply(null,arguments)},_strlen=Module._strlen=function(){return(_strlen=Module._strlen=Module.asm.strlen).apply(null,arguments)},_towupper=Module._towupper=function(){return(_towupper=Module._towupper=Module.asm.towupper).apply(null,arguments)},_setThrew=Module._setThrew=function(){return(_setThrew=Module._setThrew=Module.asm.setThrew).apply(null,arguments)},stackSave=Module.stackSave=function(){return(stackSave=Module.stackSave=Module.asm.stackSave).apply(null,arguments)},stackRestore=Module.stackRestore=function(){return(stackRestore=Module.stackRestore=Module.asm.stackRestore).apply(null,arguments)},stackAlloc=Module.stackAlloc=function(){return(stackAlloc=Module.stackAlloc=Module.asm.stackAlloc).apply(null,arguments)},__Znwm=Module.__Znwm=function(){return(__Znwm=Module.__Znwm=Module.asm._Znwm).apply(null,arguments)},__ZdlPv=Module.__ZdlPv=function(){return(__ZdlPv=Module.__ZdlPv=Module.asm._ZdlPv).apply(null,arguments)},__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev=Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev=function(){return(__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev=Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev=Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEED2Ev).apply(null,arguments)},__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm=Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm=function(){return(__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm=Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm=Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9__grow_byEmmmmmm).apply(null,arguments)},__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm=Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm=function(){return(__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm=Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm=Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE6__initEPKcm).apply(null,arguments)},__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm=Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm=function(){return(__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm=Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm=Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE7reserveEm).apply(null,arguments)},__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm=Module.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm=function(){return(__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm=Module.__ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm=Module.asm._ZNKSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE4copyEPcmm).apply(null,arguments)},__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc=Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc=function(){return(__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc=Module.__ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc=Module.asm._ZNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEE9push_backEc).apply(null,arguments)},__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev=Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev=function(){return(__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev=Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev=Module.asm._ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEED2Ev).apply(null,arguments)},__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw=Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw=function(){return(__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw=Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw=Module.asm._ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE9push_backEw).apply(null,arguments)},__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE6resizeEmw=Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE6resizeEmw=function(){return(__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE6resizeEmw=Module.__ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE6resizeEmw=Module.asm._ZNSt3__212basic_stringIwNS_11char_traitsIwEENS_9allocatorIwEEE6resizeEmw).apply(null,arguments)},dynCall_jiji=Module.dynCall_jiji=function(){return(dynCall_jiji=Module.dynCall_jiji=Module.asm.dynCall_jiji).apply(null,arguments)},_orig$ts_parser_timeout_micros=Module._orig$ts_parser_timeout_micros=function(){return(_orig$ts_parser_timeout_micros=Module._orig$ts_parser_timeout_micros=Module.asm.orig$ts_parser_timeout_micros).apply(null,arguments)},_orig$ts_parser_set_timeout_micros=Module._orig$ts_parser_set_timeout_micros=function(){return(_orig$ts_parser_set_timeout_micros=Module._orig$ts_parser_set_timeout_micros=Module.asm.orig$ts_parser_set_timeout_micros).apply(null,arguments)},calledRun;function callMain(e){var t=Module._main;if(t){(e=e||[]).unshift(thisProgram);var r=e.length,_=stackAlloc(4*(r+1)),n=_>>2;e.forEach((e=>{HEAP32[n++]=allocateUTF8OnStack(e)})),HEAP32[n]=0;try{var s=t(r,_);return exitJS(s,!0),s}catch(e){return handleException(e)}}}Module.AsciiToString=AsciiToString,Module.stringToUTF16=stringToUTF16,dependenciesFulfilled=function e(){calledRun||run(),calledRun||(dependenciesFulfilled=e)};var dylibsLoaded=!1;function run(e){function t(){calledRun||(calledRun=!0,Module.calledRun=!0,ABORT||(initRuntime(),preMain(),Module.onRuntimeInitialized&&Module.onRuntimeInitialized(),shouldRunNow&&callMain(e),postRun()))}e=e||arguments_,runDependencies>0||!dylibsLoaded&&(preloadDylibs(),dylibsLoaded=!0,runDependencies>0)||(preRun(),runDependencies>0||(Module.setStatus?(Module.setStatus("Running..."),setTimeout((function(){setTimeout((function(){Module.setStatus("")}),1),t()}),1)):t()))}if(Module.preInit)for("function"==typeof Module.preInit&&(Module.preInit=[Module.preInit]);Module.preInit.length>0;)Module.preInit.pop()();var shouldRunNow=!0;Module.noInitialRun&&(shouldRunNow=!1),run();const C=Module,INTERNAL={},SIZE_OF_INT=4,SIZE_OF_NODE=5*SIZE_OF_INT,SIZE_OF_POINT=2*SIZE_OF_INT,SIZE_OF_RANGE=2*SIZE_OF_INT+2*SIZE_OF_POINT,ZERO_POINT={row:0,column:0},QUERY_WORD_REGEX=/[\w-.]*/g,PREDICATE_STEP_TYPE_CAPTURE=1,PREDICATE_STEP_TYPE_STRING=2,LANGUAGE_FUNCTION_REGEX=/^_?tree_sitter_\w+/;var VERSION,MIN_COMPATIBLE_VERSION,TRANSFER_BUFFER,currentParseCallback,currentLogCallback;class ParserImpl{static init(){TRANSFER_BUFFER=C._ts_init(),VERSION=getValue(TRANSFER_BUFFER,"i32"),MIN_COMPATIBLE_VERSION=getValue(TRANSFER_BUFFER+SIZE_OF_INT,"i32")}initialize(){C._ts_parser_new_wasm(),this[0]=getValue(TRANSFER_BUFFER,"i32"),this[1]=getValue(TRANSFER_BUFFER+SIZE_OF_INT,"i32")}delete(){C._ts_parser_delete(this[0]),C._free(this[1]),this[0]=0,this[1]=0}setLanguage(e){let t;if(e){if(e.constructor!==Language)throw new Error("Argument must be a Language");{t=e[0];const r=C._ts_language_version(t);if(r<MIN_COMPATIBLE_VERSION||VERSION<r)throw new Error(`Incompatible language version ${r}. Compatibility range ${MIN_COMPATIBLE_VERSION} through ${VERSION}.`)}}else t=0,e=null;return this.language=e,C._ts_parser_set_language(this[0],t),this}getLanguage(){return this.language}parse(e,t,r){if("string"==typeof e)currentParseCallback=(t,r,_)=>e.slice(t,_);else{if("function"!=typeof e)throw new Error("Argument must be a string or a function");currentParseCallback=e}this.logCallback?(currentLogCallback=this.logCallback,C._ts_parser_enable_logger_wasm(this[0],1)):(currentLogCallback=null,C._ts_parser_enable_logger_wasm(this[0],0));let _=0,n=0;if(r&&r.includedRanges){_=r.includedRanges.length,n=C._calloc(_,SIZE_OF_RANGE);let e=n;for(let t=0;t<_;t++)marshalRange(e,r.includedRanges[t]),e+=SIZE_OF_RANGE}const s=C._ts_parser_parse_wasm(this[0],this[1],t?t[0]:0,n,_);if(!s)throw currentParseCallback=null,currentLogCallback=null,new Error("Parsing failed");const a=new Tree(INTERNAL,s,this.language,currentParseCallback);return currentParseCallback=null,currentLogCallback=null,a}reset(){C._ts_parser_reset(this[0])}setTimeoutMicros(e){C._ts_parser_set_timeout_micros(this[0],e)}getTimeoutMicros(){return C._ts_parser_timeout_micros(this[0])}setLogger(e){if(e){if("function"!=typeof e)throw new Error("Logger callback must be a function")}else e=null;return this.logCallback=e,this}getLogger(){return this.logCallback}}class Tree{constructor(e,t,r,_){assertInternal(e),this[0]=t,this.language=r,this.textCallback=_}copy(){const e=C._ts_tree_copy(this[0]);return new Tree(INTERNAL,e,this.language,this.textCallback)}delete(){C._ts_tree_delete(this[0]),this[0]=0}edit(e){marshalEdit(e),C._ts_tree_edit_wasm(this[0])}get rootNode(){return C._ts_tree_root_node_wasm(this[0]),unmarshalNode(this)}getLanguage(){return this.language}walk(){return this.rootNode.walk()}getChangedRanges(e){if(e.constructor!==Tree)throw new TypeError("Argument must be a Tree");C._ts_tree_get_changed_ranges_wasm(this[0],e[0]);const t=getValue(TRANSFER_BUFFER,"i32"),r=getValue(TRANSFER_BUFFER+SIZE_OF_INT,"i32"),_=new Array(t);if(t>0){let e=r;for(let r=0;r<t;r++)_[r]=unmarshalRange(e),e+=SIZE_OF_RANGE;C._free(r)}return _}}class Node{constructor(e,t){assertInternal(e),this.tree=t}get typeId(){return marshalNode(this),C._ts_node_symbol_wasm(this.tree[0])}get type(){return this.tree.language.types[this.typeId]||"ERROR"}get endPosition(){return marshalNode(this),C._ts_node_end_point_wasm(this.tree[0]),unmarshalPoint(TRANSFER_BUFFER)}get endIndex(){return marshalNode(this),C._ts_node_end_index_wasm(this.tree[0])}get text(){return getText(this.tree,this.startIndex,this.endIndex)}isNamed(){return marshalNode(this),1===C._ts_node_is_named_wasm(this.tree[0])}hasError(){return marshalNode(this),1===C._ts_node_has_error_wasm(this.tree[0])}hasChanges(){return marshalNode(this),1===C._ts_node_has_changes_wasm(this.tree[0])}isMissing(){return marshalNode(this),1===C._ts_node_is_missing_wasm(this.tree[0])}equals(e){return this.id===e.id}child(e){return marshalNode(this),C._ts_node_child_wasm(this.tree[0],e),unmarshalNode(this.tree)}namedChild(e){return marshalNode(this),C._ts_node_named_child_wasm(this.tree[0],e),unmarshalNode(this.tree)}childForFieldId(e){return marshalNode(this),C._ts_node_child_by_field_id_wasm(this.tree[0],e),unmarshalNode(this.tree)}childForFieldName(e){const t=this.tree.language.fields.indexOf(e);if(-1!==t)return this.childForFieldId(t)}get childCount(){return marshalNode(this),C._ts_node_child_count_wasm(this.tree[0])}get namedChildCount(){return marshalNode(this),C._ts_node_named_child_count_wasm(this.tree[0])}get firstChild(){return this.child(0)}get firstNamedChild(){return this.namedChild(0)}get lastChild(){return this.child(this.childCount-1)}get lastNamedChild(){return this.namedChild(this.namedChildCount-1)}get children(){if(!this._children){marshalNode(this),C._ts_node_children_wasm(this.tree[0]);const e=getValue(TRANSFER_BUFFER,"i32"),t=getValue(TRANSFER_BUFFER+SIZE_OF_INT,"i32");if(this._children=new Array(e),e>0){let r=t;for(let t=0;t<e;t++)this._children[t]=unmarshalNode(this.tree,r),r+=SIZE_OF_NODE;C._free(t)}}return this._children}get namedChildren(){if(!this._namedChildren){marshalNode(this),C._ts_node_named_children_wasm(this.tree[0]);const e=getValue(TRANSFER_BUFFER,"i32"),t=getValue(TRANSFER_BUFFER+SIZE_OF_INT,"i32");if(this._namedChildren=new Array(e),e>0){let r=t;for(let t=0;t<e;t++)this._namedChildren[t]=unmarshalNode(this.tree,r),r+=SIZE_OF_NODE;C._free(t)}}return this._namedChildren}descendantsOfType(e,t,r){Array.isArray(e)||(e=[e]),t||(t=ZERO_POINT),r||(r=ZERO_POINT);const _=[],n=this.tree.language.types;for(let t=0,r=n.length;t<r;t++)e.includes(n[t])&&_.push(t);const s=C._malloc(SIZE_OF_INT*_.length);for(let e=0,t=_.length;e<t;e++)setValue(s+e*SIZE_OF_INT,_[e],"i32");marshalNode(this),C._ts_node_descendants_of_type_wasm(this.tree[0],s,_.length,t.row,t.column,r.row,r.column);const a=getValue(TRANSFER_BUFFER,"i32"),o=getValue(TRANSFER_BUFFER+SIZE_OF_INT,"i32"),i=new Array(a);if(a>0){let e=o;for(let t=0;t<a;t++)i[t]=unmarshalNode(this.tree,e),e+=SIZE_OF_NODE}return C._free(o),C._free(s),i}get nextSibling(){return marshalNode(this),C._ts_node_next_sibling_wasm(this.tree[0]),unmarshalNode(this.tree)}get previousSibling(){return marshalNode(this),C._ts_node_prev_sibling_wasm(this.tree[0]),unmarshalNode(this.tree)}get nextNamedSibling(){return marshalNode(this),C._ts_node_next_named_sibling_wasm(this.tree[0]),unmarshalNode(this.tree)}get previousNamedSibling(){return marshalNode(this),C._ts_node_prev_named_sibling_wasm(this.tree[0]),unmarshalNode(this.tree)}get parent(){return marshalNode(this),C._ts_node_parent_wasm(this.tree[0]),unmarshalNode(this.tree)}descendantForIndex(e,t=e){if("number"!=typeof e||"number"!=typeof t)throw new Error("Arguments must be numbers");marshalNode(this);let r=TRANSFER_BUFFER+SIZE_OF_NODE;return setValue(r,e,"i32"),setValue(r+SIZE_OF_INT,t,"i32"),C._ts_node_descendant_for_index_wasm(this.tree[0]),unmarshalNode(this.tree)}namedDescendantForIndex(e,t=e){if("number"!=typeof e||"number"!=typeof t)throw new Error("Arguments must be numbers");marshalNode(this);let r=TRANSFER_BUFFER+SIZE_OF_NODE;return setValue(r,e,"i32"),setValue(r+SIZE_OF_INT,t,"i32"),C._ts_node_named_descendant_for_index_wasm(this.tree[0]),unmarshalNode(this.tree)}descendantForPosition(e,t=e){if(!isPoint(e)||!isPoint(t))throw new Error("Arguments must be {row, column} objects");marshalNode(this);let r=TRANSFER_BUFFER+SIZE_OF_NODE;return marshalPoint(r,e),marshalPoint(r+SIZE_OF_POINT,t),C._ts_node_descendant_for_position_wasm(this.tree[0]),unmarshalNode(this.tree)}namedDescendantForPosition(e,t=e){if(!isPoint(e)||!isPoint(t))throw new Error("Arguments must be {row, column} objects");marshalNode(this);let r=TRANSFER_BUFFER+SIZE_OF_NODE;return marshalPoint(r,e),marshalPoint(r+SIZE_OF_POINT,t),C._ts_node_named_descendant_for_position_wasm(this.tree[0]),unmarshalNode(this.tree)}walk(){return marshalNode(this),C._ts_tree_cursor_new_wasm(this.tree[0]),new TreeCursor(INTERNAL,this.tree)}toString(){marshalNode(this);const e=C._ts_node_to_string_wasm(this.tree[0]),t=AsciiToString(e);return C._free(e),t}}class TreeCursor{constructor(e,t){assertInternal(e),this.tree=t,unmarshalTreeCursor(this)}delete(){marshalTreeCursor(this),C._ts_tree_cursor_delete_wasm(this.tree[0]),this[0]=this[1]=this[2]=0}reset(e){marshalNode(e),marshalTreeCursor(this,TRANSFER_BUFFER+SIZE_OF_NODE),C._ts_tree_cursor_reset_wasm(this.tree[0]),unmarshalTreeCursor(this)}get nodeType(){return this.tree.language.types[this.nodeTypeId]||"ERROR"}get nodeTypeId(){return marshalTreeCursor(this),C._ts_tree_cursor_current_node_type_id_wasm(this.tree[0])}get nodeId(){return marshalTreeCursor(this),C._ts_tree_cursor_current_node_id_wasm(this.tree[0])}get nodeIsNamed(){return marshalTreeCursor(this),1===C._ts_tree_cursor_current_node_is_named_wasm(this.tree[0])}get nodeIsMissing(){return marshalTreeCursor(this),1===C._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0])}get nodeText(){marshalTreeCursor(this);const e=C._ts_tree_cursor_start_index_wasm(this.tree[0]),t=C._ts_tree_cursor_end_index_wasm(this.tree[0]);return getText(this.tree,e,t)}get startPosition(){return marshalTreeCursor(this),C._ts_tree_cursor_start_position_wasm(this.tree[0]),unmarshalPoint(TRANSFER_BUFFER)}get endPosition(){return marshalTreeCursor(this),C._ts_tree_cursor_end_position_wasm(this.tree[0]),unmarshalPoint(TRANSFER_BUFFER)}get startIndex(){return marshalTreeCursor(this),C._ts_tree_cursor_start_index_wasm(this.tree[0])}get endIndex(){return marshalTreeCursor(this),C._ts_tree_cursor_end_index_wasm(this.tree[0])}currentNode(){return marshalTreeCursor(this),C._ts_tree_cursor_current_node_wasm(this.tree[0]),unmarshalNode(this.tree)}currentFieldId(){return marshalTreeCursor(this),C._ts_tree_cursor_current_field_id_wasm(this.tree[0])}currentFieldName(){return this.tree.language.fields[this.currentFieldId()]}gotoFirstChild(){marshalTreeCursor(this);const e=C._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);return unmarshalTreeCursor(this),1===e}gotoNextSibling(){marshalTreeCursor(this);const e=C._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);return unmarshalTreeCursor(this),1===e}gotoParent(){marshalTreeCursor(this);const e=C._ts_tree_cursor_goto_parent_wasm(this.tree[0]);return unmarshalTreeCursor(this),1===e}}class Language{constructor(e,t){assertInternal(e),this[0]=t,this.types=new Array(C._ts_language_symbol_count(this[0]));for(let e=0,t=this.types.length;e<t;e++)C._ts_language_symbol_type(this[0],e)<2&&(this.types[e]=UTF8ToString(C._ts_language_symbol_name(this[0],e)));this.fields=new Array(C._ts_language_field_count(this[0])+1);for(let e=0,t=this.fields.length;e<t;e++){const t=C._ts_language_field_name_for_id(this[0],e);this.fields[e]=0!==t?UTF8ToString(t):null}}get version(){return C._ts_language_version(this[0])}get fieldCount(){return this.fields.length-1}fieldIdForName(e){const t=this.fields.indexOf(e);return-1!==t?t:null}fieldNameForId(e){return this.fields[e]||null}idForNodeType(e,t){const r=lengthBytesUTF8(e),_=C._malloc(r+1);stringToUTF8(e,_,r+1);const n=C._ts_language_symbol_for_name(this[0],_,r,t);return C._free(_),n||null}get nodeTypeCount(){return C._ts_language_symbol_count(this[0])}nodeTypeForId(e){const t=C._ts_language_symbol_name(this[0],e);return t?UTF8ToString(t):null}nodeTypeIsNamed(e){return!!C._ts_language_type_is_named_wasm(this[0],e)}nodeTypeIsVisible(e){return!!C._ts_language_type_is_visible_wasm(this[0],e)}query(e){const t=lengthBytesUTF8(e),r=C._malloc(t+1);stringToUTF8(e,r,t+1);const _=C._ts_query_new(this[0],r,t,TRANSFER_BUFFER,TRANSFER_BUFFER+SIZE_OF_INT);if(!_){const t=getValue(TRANSFER_BUFFER+SIZE_OF_INT,"i32"),_=UTF8ToString(r,getValue(TRANSFER_BUFFER,"i32")).length,n=e.substr(_,100).split("\n")[0];let s,a=n.match(QUERY_WORD_REGEX)[0];switch(t){case 2:s=new RangeError(`Bad node name '${a}'`);break;case 3:s=new RangeError(`Bad field name '${a}'`);break;case 4:s=new RangeError(`Bad capture name @${a}`);break;case 5:s=new TypeError(`Bad pattern structure at offset ${_}: '${n}'...`),a="";break;default:s=new SyntaxError(`Bad syntax at offset ${_}: '${n}'...`),a=""}throw s.index=_,s.length=a.length,C._free(r),s}const n=C._ts_query_string_count(_),s=C._ts_query_capture_count(_),a=C._ts_query_pattern_count(_),o=new Array(s),i=new Array(n);for(let e=0;e<s;e++){const t=C._ts_query_capture_name_for_id(_,e,TRANSFER_BUFFER),r=getValue(TRANSFER_BUFFER,"i32");o[e]=UTF8ToString(t,r)}for(let e=0;e<n;e++){const t=C._ts_query_string_value_for_id(_,e,TRANSFER_BUFFER),r=getValue(TRANSFER_BUFFER,"i32");i[e]=UTF8ToString(t,r)}const l=new Array(a),u=new Array(a),d=new Array(a),c=new Array(a),m=new Array(a);for(let e=0;e<a;e++){const t=C._ts_query_predicates_for_pattern(_,e,TRANSFER_BUFFER),r=getValue(TRANSFER_BUFFER,"i32");c[e]=[],m[e]=[];const n=[];let s=t;for(let t=0;t<r;t++){const t=getValue(s,"i32");s+=SIZE_OF_INT;const r=getValue(s,"i32");if(s+=SIZE_OF_INT,t===PREDICATE_STEP_TYPE_CAPTURE)n.push({type:"capture",name:o[r]});else if(t===PREDICATE_STEP_TYPE_STRING)n.push({type:"string",value:i[r]});else if(n.length>0){if("string"!==n[0].type)throw new Error("Predicates must begin with a literal value");const t=n[0].value;let r=!0;switch(t){case"not-eq?":r=!1;case"eq?":if(3!==n.length)throw new Error("Wrong number of arguments to `#eq?` predicate. Expected 2, got "+(n.length-1));if("capture"!==n[1].type)throw new Error(`First argument of \`#eq?\` predicate must be a capture. Got "${n[1].value}"`);if("capture"===n[2].type){const t=n[1].name,_=n[2].name;m[e].push((function(e){let n,s;for(const r of e)r.name===t&&(n=r.node),r.name===_&&(s=r.node);return void 0===n||void 0===s||n.text===s.text===r}))}else{const t=n[1].name,_=n[2].value;m[e].push((function(e){for(const n of e)if(n.name===t)return n.node.text===_===r;return!0}))}break;case"not-match?":r=!1;case"match?":if(3!==n.length)throw new Error(`Wrong number of arguments to \`#match?\` predicate. Expected 2, got ${n.length-1}.`);if("capture"!==n[1].type)throw new Error(`First argument of \`#match?\` predicate must be a capture. Got "${n[1].value}".`);if("string"!==n[2].type)throw new Error(`Second argument of \`#match?\` predicate must be a string. Got @${n[2].value}.`);const _=n[1].name,s=new RegExp(n[2].value);m[e].push((function(e){for(const t of e)if(t.name===_)return s.test(t.node.text)===r;return!0}));break;case"set!":if(n.length<2||n.length>3)throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${n.length-1}.`);if(n.some((e=>"string"!==e.type)))throw new Error('Arguments to `#set!` predicate must be a strings.".');l[e]||(l[e]={}),l[e][n[1].value]=n[2]?n[2].value:null;break;case"is?":case"is-not?":if(n.length<2||n.length>3)throw new Error(`Wrong number of arguments to \`#${t}\` predicate. Expected 1 or 2. Got ${n.length-1}.`);if(n.some((e=>"string"!==e.type)))throw new Error(`Arguments to \`#${t}\` predicate must be a strings.".`);const a="is?"===t?u:d;a[e]||(a[e]={}),a[e][n[1].value]=n[2]?n[2].value:null;break;default:c[e].push({operator:t,operands:n.slice(1)})}n.length=0}}Object.freeze(l[e]),Object.freeze(u[e]),Object.freeze(d[e])}return C._free(r),new Query(INTERNAL,_,o,m,c,Object.freeze(l),Object.freeze(u),Object.freeze(d))}static load(e){let t;if(e instanceof Uint8Array)t=Promise.resolve(e);else{const r=e;if("undefined"!=typeof process&&process.versions&&process.versions.node){const e=__webpack_require__(4);t=Promise.resolve(e.readFileSync(r))}else t=fetch(r).then((e=>e.arrayBuffer().then((t=>{if(e.ok)return new Uint8Array(t);{const r=new TextDecoder("utf-8").decode(t);throw new Error(`Language.load failed with status ${e.status}.\n\n${r}`)}}))))}const r="function"==typeof loadSideModule?loadSideModule:loadWebAssemblyModule;return t.then((e=>r(e,{loadAsync:!0}))).then((e=>{const t=Object.keys(e),r=t.find((e=>LANGUAGE_FUNCTION_REGEX.test(e)&&!e.includes("external_scanner_")));r||console.log(`Couldn't find language function in WASM file. Symbols:\n${JSON.stringify(t,null,2)}`);const _=e[r]();return new Language(INTERNAL,_)}))}}class Query{constructor(e,t,r,_,n,s,a,o){assertInternal(e),this[0]=t,this.captureNames=r,this.textPredicates=_,this.predicates=n,this.setProperties=s,this.assertedProperties=a,this.refutedProperties=o,this.exceededMatchLimit=!1}delete(){C._ts_query_delete(this[0]),this[0]=0}matches(e,t,r,_){t||(t=ZERO_POINT),r||(r=ZERO_POINT),_||(_={});let n=_.matchLimit;if(void 0===n)n=0;else if("number"!=typeof n)throw new Error("Arguments must be numbers");marshalNode(e),C._ts_query_matches_wasm(this[0],e.tree[0],t.row,t.column,r.row,r.column,n);const s=getValue(TRANSFER_BUFFER,"i32"),a=getValue(TRANSFER_BUFFER+SIZE_OF_INT,"i32"),o=getValue(TRANSFER_BUFFER+2*SIZE_OF_INT,"i32"),i=new Array(s);this.exceededMatchLimit=!!o;let l=0,u=a;for(let t=0;t<s;t++){const r=getValue(u,"i32");u+=SIZE_OF_INT;const _=getValue(u,"i32");u+=SIZE_OF_INT;const n=new Array(_);if(u=unmarshalCaptures(this,e.tree,u,n),this.textPredicates[r].every((e=>e(n)))){i[l++]={pattern:r,captures:n};const e=this.setProperties[r];e&&(i[t].setProperties=e);const _=this.assertedProperties[r];_&&(i[t].assertedProperties=_);const s=this.refutedProperties[r];s&&(i[t].refutedProperties=s)}}return i.length=l,C._free(a),i}captures(e,t,r,_){t||(t=ZERO_POINT),r||(r=ZERO_POINT),_||(_={});let n=_.matchLimit;if(void 0===n)n=0;else if("number"!=typeof n)throw new Error("Arguments must be numbers");marshalNode(e),C._ts_query_captures_wasm(this[0],e.tree[0],t.row,t.column,r.row,r.column,n);const s=getValue(TRANSFER_BUFFER,"i32"),a=getValue(TRANSFER_BUFFER+SIZE_OF_INT,"i32"),o=getValue(TRANSFER_BUFFER+2*SIZE_OF_INT,"i32"),i=[];this.exceededMatchLimit=!!o;const l=[];let u=a;for(let t=0;t<s;t++){const t=getValue(u,"i32");u+=SIZE_OF_INT;const r=getValue(u,"i32");u+=SIZE_OF_INT;const _=getValue(u,"i32");if(u+=SIZE_OF_INT,l.length=r,u=unmarshalCaptures(this,e.tree,u,l),this.textPredicates[t].every((e=>e(l)))){const e=l[_],r=this.setProperties[t];r&&(e.setProperties=r);const n=this.assertedProperties[t];n&&(e.assertedProperties=n);const s=this.refutedProperties[t];s&&(e.refutedProperties=s),i.push(e)}}return C._free(a),i}predicatesForPattern(e){return this.predicates[e]}didExceedMatchLimit(){return this.exceededMatchLimit}}function getText(e,t,r){const _=r-t;let n=e.textCallback(t,null,r);for(t+=n.length;t<r;){const _=e.textCallback(t,null,r);if(!(_&&_.length>0))break;t+=_.length,n+=_}return t>r&&(n=n.slice(0,_)),n}function unmarshalCaptures(e,t,r,_){for(let n=0,s=_.length;n<s;n++){const s=getValue(r,"i32"),a=unmarshalNode(t,r+=SIZE_OF_INT);r+=SIZE_OF_NODE,_[n]={name:e.captureNames[s],node:a}}return r}function assertInternal(e){if(e!==INTERNAL)throw new Error("Illegal constructor")}function isPoint(e){return e&&"number"==typeof e.row&&"number"==typeof e.column}function marshalNode(e){let t=TRANSFER_BUFFER;setValue(t,e.id,"i32"),t+=SIZE_OF_INT,setValue(t,e.startIndex,"i32"),t+=SIZE_OF_INT,setValue(t,e.startPosition.row,"i32"),t+=SIZE_OF_INT,setValue(t,e.startPosition.column,"i32"),t+=SIZE_OF_INT,setValue(t,e[0],"i32")}function unmarshalNode(e,t=TRANSFER_BUFFER){const r=getValue(t,"i32");if(0===r)return null;const _=getValue(t+=SIZE_OF_INT,"i32"),n=getValue(t+=SIZE_OF_INT,"i32"),s=getValue(t+=SIZE_OF_INT,"i32"),a=getValue(t+=SIZE_OF_INT,"i32"),o=new Node(INTERNAL,e);return o.id=r,o.startIndex=_,o.startPosition={row:n,column:s},o[0]=a,o}function marshalTreeCursor(e,t=TRANSFER_BUFFER){setValue(t+0*SIZE_OF_INT,e[0],"i32"),setValue(t+1*SIZE_OF_INT,e[1],"i32"),setValue(t+2*SIZE_OF_INT,e[2],"i32")}function unmarshalTreeCursor(e){e[0]=getValue(TRANSFER_BUFFER+0*SIZE_OF_INT,"i32"),e[1]=getValue(TRANSFER_BUFFER+1*SIZE_OF_INT,"i32"),e[2]=getValue(TRANSFER_BUFFER+2*SIZE_OF_INT,"i32")}function marshalPoint(e,t){setValue(e,t.row,"i32"),setValue(e+SIZE_OF_INT,t.column,"i32")}function unmarshalPoint(e){return{row:getValue(e,"i32"),column:getValue(e+SIZE_OF_INT,"i32")}}function marshalRange(e,t){marshalPoint(e,t.startPosition),marshalPoint(e+=SIZE_OF_POINT,t.endPosition),setValue(e+=SIZE_OF_POINT,t.startIndex,"i32"),setValue(e+=SIZE_OF_INT,t.endIndex,"i32"),e+=SIZE_OF_INT}function unmarshalRange(e){const t={};return t.startPosition=unmarshalPoint(e),e+=SIZE_OF_POINT,t.endPosition=unmarshalPoint(e),e+=SIZE_OF_POINT,t.startIndex=getValue(e,"i32"),e+=SIZE_OF_INT,t.endIndex=getValue(e,"i32"),t}function marshalEdit(e){let t=TRANSFER_BUFFER;marshalPoint(t,e.startPosition),t+=SIZE_OF_POINT,marshalPoint(t,e.oldEndPosition),t+=SIZE_OF_POINT,marshalPoint(t,e.newEndPosition),t+=SIZE_OF_POINT,setValue(t,e.startIndex,"i32"),t+=SIZE_OF_INT,setValue(t,e.oldEndIndex,"i32"),t+=SIZE_OF_INT,setValue(t,e.newEndIndex,"i32"),t+=SIZE_OF_INT}for(const e of Object.getOwnPropertyNames(ParserImpl.prototype))Object.defineProperty(Parser.prototype,e,{value:ParserImpl.prototype[e],enumerable:!1,writable:!1});Parser.Language=Language,Module.onRuntimeInitialized=()=>{ParserImpl.init(),resolveInitPromise()}})))}}return Parser}(); true&&(module.exports=TreeSitter);


/***/ }),
/* 4 */
/***/ (() => {

/* (ignored) */

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initOniguruma = void 0;
const vscode = __webpack_require__(1);
const vscodeOniguruma = __webpack_require__(7);
async function initOniguruma(context) {
    const uri = vscode.Uri.joinPath(context.extensionUri, 'node_modules', 'vscode-oniguruma', 'release', 'onig.wasm');
    const wasm = await vscode.workspace.fs.readFile(uri);
    const options = {
        data: wasm,
        print(string) {
            console.log(string);
        }
    };
    await vscodeOniguruma.loadWASM(options);
    // // https://github.com/microsoft/vscode-oniguruma/issues/10
    // const response = await fetch('/node_modules/vscode-oniguruma/release/onig.wasm');
    // const contentType = response.headers.get('content-type');
    // // Using the response directly only works if the server sets the MIME type 'application/wasm'.
    // // Otherwise, a TypeError is thrown when using the streaming compiler.
    // // We therefore use the non-streaming compiler :(.
    // const wasm = contentType === 'application/wasm' ? response : await response.arrayBuffer();
    // const options: vscodeOniguruma.IDataOptions = {
    // 	data: wasm,
    // 	print(string: string) {
    // 		console.log(string);
    // 	}
    // }
    // await vscodeOniguruma.loadWASM(options);
}
exports.initOniguruma = initOniguruma;


/***/ }),
/* 7 */
/***/ (function(module) {

!function(t,n){ true?module.exports=n():0}(this,(()=>{return t={770:function(t,n,e){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(n,"__esModule",{value:!0}),n.setDefaultDebugCall=n.createOnigScanner=n.createOnigString=n.loadWASM=n.OnigScanner=n.OnigString=void 0;const i=r(e(418));let o=null,a=!1;class f{static _utf8ByteLength(t){let n=0;for(let e=0,r=t.length;e<r;e++){const i=t.charCodeAt(e);let o=i,a=!1;if(i>=55296&&i<=56319&&e+1<r){const n=t.charCodeAt(e+1);n>=56320&&n<=57343&&(o=65536+(i-55296<<10)|n-56320,a=!0)}n+=o<=127?1:o<=2047?2:o<=65535?3:4,a&&e++}return n}constructor(t){const n=t.length,e=f._utf8ByteLength(t),r=e!==n,i=r?new Uint32Array(n+1):null;r&&(i[n]=e);const o=r?new Uint32Array(e+1):null;r&&(o[e]=n);const a=new Uint8Array(e);let s=0;for(let e=0;e<n;e++){const f=t.charCodeAt(e);let u=f,c=!1;if(f>=55296&&f<=56319&&e+1<n){const n=t.charCodeAt(e+1);n>=56320&&n<=57343&&(u=65536+(f-55296<<10)|n-56320,c=!0)}r&&(i[e]=s,c&&(i[e+1]=s),u<=127?o[s+0]=e:u<=2047?(o[s+0]=e,o[s+1]=e):u<=65535?(o[s+0]=e,o[s+1]=e,o[s+2]=e):(o[s+0]=e,o[s+1]=e,o[s+2]=e,o[s+3]=e)),u<=127?a[s++]=u:u<=2047?(a[s++]=192|(1984&u)>>>6,a[s++]=128|(63&u)>>>0):u<=65535?(a[s++]=224|(61440&u)>>>12,a[s++]=128|(4032&u)>>>6,a[s++]=128|(63&u)>>>0):(a[s++]=240|(1835008&u)>>>18,a[s++]=128|(258048&u)>>>12,a[s++]=128|(4032&u)>>>6,a[s++]=128|(63&u)>>>0),c&&e++}this.utf16Length=n,this.utf8Length=e,this.utf16Value=t,this.utf8Value=a,this.utf16OffsetToUtf8=i,this.utf8OffsetToUtf16=o}createString(t){const n=t._omalloc(this.utf8Length);return t.HEAPU8.set(this.utf8Value,n),n}}class s{constructor(t){if(this.id=++s.LAST_ID,!o)throw new Error("Must invoke loadWASM first.");this._onigBinding=o,this.content=t;const n=new f(t);this.utf16Length=n.utf16Length,this.utf8Length=n.utf8Length,this.utf16OffsetToUtf8=n.utf16OffsetToUtf8,this.utf8OffsetToUtf16=n.utf8OffsetToUtf16,this.utf8Length<1e4&&!s._sharedPtrInUse?(s._sharedPtr||(s._sharedPtr=o._omalloc(1e4)),s._sharedPtrInUse=!0,o.HEAPU8.set(n.utf8Value,s._sharedPtr),this.ptr=s._sharedPtr):this.ptr=n.createString(o)}convertUtf8OffsetToUtf16(t){return this.utf8OffsetToUtf16?t<0?0:t>this.utf8Length?this.utf16Length:this.utf8OffsetToUtf16[t]:t}convertUtf16OffsetToUtf8(t){return this.utf16OffsetToUtf8?t<0?0:t>this.utf16Length?this.utf8Length:this.utf16OffsetToUtf8[t]:t}dispose(){this.ptr===s._sharedPtr?s._sharedPtrInUse=!1:this._onigBinding._ofree(this.ptr)}}n.OnigString=s,s.LAST_ID=0,s._sharedPtr=0,s._sharedPtrInUse=!1;class u{constructor(t){if(!o)throw new Error("Must invoke loadWASM first.");const n=[],e=[];for(let r=0,i=t.length;r<i;r++){const i=new f(t[r]);n[r]=i.createString(o),e[r]=i.utf8Length}const r=o._omalloc(4*t.length);o.HEAPU32.set(n,r/4);const i=o._omalloc(4*t.length);o.HEAPU32.set(e,i/4);const a=o._createOnigScanner(r,i,t.length);for(let e=0,r=t.length;e<r;e++)o._ofree(n[e]);o._ofree(i),o._ofree(r),0===a&&function(t){throw new Error(t.UTF8ToString(t._getLastOnigError()))}(o),this._onigBinding=o,this._ptr=a}dispose(){this._onigBinding._freeOnigScanner(this._ptr)}findNextMatchSync(t,n,e){let r=a,i=0;if("number"==typeof e?(8&e&&(r=!0),i=e):"boolean"==typeof e&&(r=e),"string"==typeof t){t=new s(t);const e=this._findNextMatchSync(t,n,r,i);return t.dispose(),e}return this._findNextMatchSync(t,n,r,i)}_findNextMatchSync(t,n,e,r){const i=this._onigBinding;let o;if(o=e?i._findNextOnigScannerMatchDbg(this._ptr,t.id,t.ptr,t.utf8Length,t.convertUtf16OffsetToUtf8(n),r):i._findNextOnigScannerMatch(this._ptr,t.id,t.ptr,t.utf8Length,t.convertUtf16OffsetToUtf8(n),r),0===o)return null;const a=i.HEAPU32;let f=o/4;const s=a[f++],u=a[f++];let c=[];for(let n=0;n<u;n++){const e=t.convertUtf8OffsetToUtf16(a[f++]),r=t.convertUtf8OffsetToUtf16(a[f++]);c[n]={start:e,end:r,length:r-e}}return{index:s,captureIndices:c}}}n.OnigScanner=u;let c=!1,l=null;n.loadWASM=function(t){if(c)return l;let n,e,r,a;if(c=!0,function(t){return"function"==typeof t.instantiator}(t))n=t.instantiator,e=t.print;else{let r;!function(t){return void 0!==t.data}(t)?r=t:(r=t.data,e=t.print),n=function(t){return"undefined"!=typeof Response&&t instanceof Response}(r)?"function"==typeof WebAssembly.instantiateStreaming?function(t){return n=>WebAssembly.instantiateStreaming(t,n)}(r):function(t){return async n=>{const e=await t.arrayBuffer();return WebAssembly.instantiate(e,n)}}(r):function(t){return n=>WebAssembly.instantiate(t,n)}(r)}return l=new Promise(((t,n)=>{r=t,a=n})),function(t,n,e,r){(0,i.default)({print:n,instantiateWasm:(n,e)=>{if("undefined"==typeof performance){const t=()=>Date.now();n.env.emscripten_get_now=t,n.wasi_snapshot_preview1.emscripten_get_now=t}return t(n).then((t=>e(t.instance)),r),{}}}).then((t=>{o=t,e()}))}(n,e,r,a),l},n.createOnigString=function(t){return new s(t)},n.createOnigScanner=function(t){return new u(t)},n.setDefaultDebugCall=function(t){a=t}},418:t=>{var n=("undefined"!=typeof document&&document.currentScript&&document.currentScript.src,function(t){var n,e,r=void 0!==(t=t||{})?t:{};r.ready=new Promise((function(t,r){n=t,e=r}));var i,o=Object.assign({},r),a=[],f=!1,s=!1,u=!0,c="";function l(t){return r.locateFile?r.locateFile(t,c):c+t}u&&(i=function(t){let n;return"function"==typeof readbuffer?new Uint8Array(readbuffer(t)):(n=read(t,"binary"),m("object"==typeof n),n)},"undefined"!=typeof scriptArgs?a=scriptArgs:void 0!==arguments&&(a=arguments),"undefined"!=typeof onig_print&&("undefined"==typeof console&&(console={}),console.log=onig_print,console.warn=console.error="undefined"!=typeof printErr?printErr:onig_print));var h,p,d=r.print||console.log.bind(console),g=r.printErr||console.warn.bind(console);Object.assign(r,o),o=null,r.arguments&&(a=r.arguments),r.thisProgram&&r.thisProgram,r.quit&&r.quit,r.wasmBinary&&(h=r.wasmBinary),r.noExitRuntime,"object"!=typeof WebAssembly&&k("no native wasm support detected");var _=!1;function m(t,n){t||k(n)}var y,w,S,v="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function A(t,n,e){for(var r=n+e,i=n;t[i]&&!(i>=r);)++i;if(i-n>16&&t.buffer&&v)return v.decode(t.subarray(n,i));for(var o="";n<i;){var a=t[n++];if(128&a){var f=63&t[n++];if(192!=(224&a)){var s=63&t[n++];if((a=224==(240&a)?(15&a)<<12|f<<6|s:(7&a)<<18|f<<12|s<<6|63&t[n++])<65536)o+=String.fromCharCode(a);else{var u=a-65536;o+=String.fromCharCode(55296|u>>10,56320|1023&u)}}else o+=String.fromCharCode((31&a)<<6|f)}else o+=String.fromCharCode(a)}return o}function b(t,n){return t?A(w,t,n):""}function O(t){y=t,r.HEAP8=new Int8Array(t),r.HEAP16=new Int16Array(t),r.HEAP32=new Int32Array(t),r.HEAPU8=w=new Uint8Array(t),r.HEAPU16=new Uint16Array(t),r.HEAPU32=S=new Uint32Array(t),r.HEAPF32=new Float32Array(t),r.HEAPF64=new Float64Array(t)}r.INITIAL_MEMORY;var U=[],P=[],R=[];function x(){if(r.preRun)for("function"==typeof r.preRun&&(r.preRun=[r.preRun]);r.preRun.length;)M(r.preRun.shift());G(U)}function T(){G(P)}function E(){if(r.postRun)for("function"==typeof r.postRun&&(r.postRun=[r.postRun]);r.postRun.length;)I(r.postRun.shift());G(R)}function M(t){U.unshift(t)}function L(t){P.unshift(t)}function I(t){R.unshift(t)}var W=0,D=null,C=null;function N(t){W++,r.monitorRunDependencies&&r.monitorRunDependencies(W)}function j(t){if(W--,r.monitorRunDependencies&&r.monitorRunDependencies(W),0==W&&(null!==D&&(clearInterval(D),D=null),C)){var n=C;C=null,n()}}function k(t){r.onAbort&&r.onAbort(t),g(t="Aborted("+t+")"),_=!0,t+=". Build with -sASSERTIONS for more info.";var n=new WebAssembly.RuntimeError(t);throw e(n),n}var B,H,F="data:application/octet-stream;base64,";function V(t){return t.startsWith(F)}function z(t){try{if(t==B&&h)return new Uint8Array(h);if(i)return i(t);throw"both async and sync fetching of the wasm failed"}catch(t){k(t)}}function q(){return h||!f&&!s||"function"!=typeof fetch?Promise.resolve().then((function(){return z(B)})):fetch(B,{credentials:"same-origin"}).then((function(t){if(!t.ok)throw"failed to load wasm binary file at '"+B+"'";return t.arrayBuffer()})).catch((function(){return z(B)}))}function Y(){var t={env:nt,wasi_snapshot_preview1:nt};function n(t,n){var e=t.exports;r.asm=e,O((p=r.asm.memory).buffer),r.asm.__indirect_function_table,L(r.asm.__wasm_call_ctors),j()}function i(t){n(t.instance)}function o(n){return q().then((function(n){return WebAssembly.instantiate(n,t)})).then((function(t){return t})).then(n,(function(t){g("failed to asynchronously prepare wasm: "+t),k(t)}))}if(N(),r.instantiateWasm)try{return r.instantiateWasm(t,n)}catch(t){g("Module.instantiateWasm callback failed with error: "+t),e(t)}return(h||"function"!=typeof WebAssembly.instantiateStreaming||V(B)||"function"!=typeof fetch?o(i):fetch(B,{credentials:"same-origin"}).then((function(n){return WebAssembly.instantiateStreaming(n,t).then(i,(function(t){return g("wasm streaming compile failed: "+t),g("falling back to ArrayBuffer instantiation"),o(i)}))}))).catch(e),{}}function G(t){for(;t.length>0;)t.shift()(r)}function J(t,n,e){w.copyWithin(t,n,n+e)}function K(t){try{return p.grow(t-y.byteLength+65535>>>16),O(p.buffer),1}catch(t){}}function Q(t){var n,e=w.length,r=2147483648;if((t>>>=0)>r)return!1;for(var i=1;i<=4;i*=2){var o=e*(1+.2/i);if(o=Math.min(o,t+100663296),K(Math.min(r,(n=Math.max(t,o))+(65536-n%65536)%65536)))return!0}return!1}V(B="onig.wasm")||(B=l(B)),H="undefined"!=typeof dateNow?dateNow:()=>performance.now();var X=[null,[],[]];function Z(t,n){var e=X[t];0===n||10===n?((1===t?d:g)(A(e,0)),e.length=0):e.push(n)}function $(t,n,e,r){for(var i=0,o=0;o<e;o++){var a=S[n>>2],f=S[n+4>>2];n+=8;for(var s=0;s<f;s++)Z(t,w[a+s]);i+=f}return S[r>>2]=i,0}var tt,nt={emscripten_get_now:H,emscripten_memcpy_big:J,emscripten_resize_heap:Q,fd_write:$};function et(t){function e(){tt||(tt=!0,r.calledRun=!0,_||(T(),n(r),r.onRuntimeInitialized&&r.onRuntimeInitialized(),E()))}t=t||a,W>0||(x(),W>0||(r.setStatus?(r.setStatus("Running..."),setTimeout((function(){setTimeout((function(){r.setStatus("")}),1),e()}),1)):e()))}if(Y(),r.___wasm_call_ctors=function(){return(r.___wasm_call_ctors=r.asm.__wasm_call_ctors).apply(null,arguments)},r.___errno_location=function(){return(r.___errno_location=r.asm.__errno_location).apply(null,arguments)},r._omalloc=function(){return(r._omalloc=r.asm.omalloc).apply(null,arguments)},r._ofree=function(){return(r._ofree=r.asm.ofree).apply(null,arguments)},r._getLastOnigError=function(){return(r._getLastOnigError=r.asm.getLastOnigError).apply(null,arguments)},r._createOnigScanner=function(){return(r._createOnigScanner=r.asm.createOnigScanner).apply(null,arguments)},r._freeOnigScanner=function(){return(r._freeOnigScanner=r.asm.freeOnigScanner).apply(null,arguments)},r._findNextOnigScannerMatch=function(){return(r._findNextOnigScannerMatch=r.asm.findNextOnigScannerMatch).apply(null,arguments)},r._findNextOnigScannerMatchDbg=function(){return(r._findNextOnigScannerMatchDbg=r.asm.findNextOnigScannerMatchDbg).apply(null,arguments)},r.stackSave=function(){return(r.stackSave=r.asm.stackSave).apply(null,arguments)},r.stackRestore=function(){return(r.stackRestore=r.asm.stackRestore).apply(null,arguments)},r.stackAlloc=function(){return(r.stackAlloc=r.asm.stackAlloc).apply(null,arguments)},r.dynCall_jiji=function(){return(r.dynCall_jiji=r.asm.dynCall_jiji).apply(null,arguments)},r.UTF8ToString=b,C=function t(){tt||et(),tt||(C=t)},r.preInit)for("function"==typeof r.preInit&&(r.preInit=[r.preInit]);r.preInit.length>0;)r.preInit.pop()();return et(),t.ready});t.exports=n}},n={},function e(r){var i=n[r];if(void 0!==i)return i.exports;var o=n[r]={exports:{}};return t[r].call(o.exports,o,o.exports,e),o.exports}(770);var t,n}));

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tokenizeFile = exports.tokenizeLine = exports.initTextMate = exports.registry = exports.endRuleId = void 0;
const vscode = __webpack_require__(1);
const vscodeTextmate = __webpack_require__(9);
// import * as vscodeTextmate from "vscode-textmate";
const vscodeOniguruma = __webpack_require__(7);
const extension_1 = __webpack_require__(0);
exports.endRuleId = -1;
async function onigLibInterface() {
    return {
        createOnigScanner(sources) {
            return new vscodeOniguruma.OnigScanner(sources);
        },
        createOnigString(str) {
            return new vscodeOniguruma.OnigString(str);
        }
    };
}
async function loadGrammar(scopeName) {
    for (const extension of vscode.extensions.all) {
        const packageJSON = extension.packageJSON;
        const grammars = packageJSON.contributes?.grammars;
        if (grammars) {
            for (const grammar of grammars) {
                if (grammar.scopeName == scopeName) {
                    const path = grammar.path;
                    if (path) {
                        const uri = vscode.Uri.joinPath(extension.extensionUri, path);
                        if (uri.scheme != 'untitled') {
                            const document = await vscode.workspace.openTextDocument(uri);
                            const rawGrammar = vscodeTextmate.parseRawGrammar(document.getText(), uri.path);
                            return rawGrammar;
                        }
                    }
                }
            }
        }
    }
    vscode.window.showInformationMessage(`Unknown scopeName: ${scopeName}`);
    console.log(`TextMate: Unknown scope name: ${scopeName}`);
    return null;
}
function initTextMate(context) {
    const options = {
        onigLib: onigLibInterface(),
        loadGrammar: loadGrammar,
    };
    // Create a registry that can create a grammar from a scope name.
    exports.registry = new vscodeTextmate.Registry(options);
}
exports.initTextMate = initTextMate;
function getScopeName(lang) {
    for (const extension of vscode.extensions.all) {
        const packageJSON = extension.packageJSON;
        const grammars = packageJSON.contributes?.grammars;
        if (grammars) {
            for (const grammar of grammars) {
                if (grammar.language == lang) {
                    const scopeName = grammar.scopeName;
                    if (scopeName) {
                        return scopeName;
                    }
                }
            }
        }
    }
    return null;
}
async function tokenizeLine(document, lineNumber) {
    const lang = document.languageId;
    const scopeName = getScopeName(lang);
    const grammar = await exports.registry.loadGrammar(scopeName);
    // vscode.window.showInformationMessage(JSON.stringify(grammar));
    // vscode.window.showInformationMessage(JSON.stringify(grammar, stringify));
    // const text = [
    // 	`function sayHello(name) {`,
    // 	`\treturn "Hello, " + name;`,
    // 	`}`
    // ];
    // const text = document.getText();
    let tokenLineResult;
    let ruleStack = vscodeTextmate.INITIAL;
    for (let i = 0; i <= lineNumber; i++) {
        const line = document.lineAt(i).text;
        // const line = text[i];
        // vscode.window.showInformationMessage(JSON.stringify(ruleStack));
        // const lineTokens = tokenizeLine(grammar, line, ruleStack);
        const lineTokens = grammar.tokenizeLine(line, ruleStack, 15000);
        // vscode.window.showInformationMessage(JSON.stringify(lineTokens));
        // console.log(`\nTokenizing line: ${line}`);
        // for (let j = 0; j < lineTokens.tokens.length; j++) {
        // 	const token = lineTokens.tokens[j];
        // 	console.log(` - token from ${token.startIndex} to ${token.endIndex} ` +
        // 		`(${line.substring(token.startIndex, token.endIndex)}) ` +
        // 		`with scopes ${token.scopes.join(', ')}`
        // 	);
        // }
        ruleStack = lineTokens.ruleStack;
        tokenLineResult = lineTokens;
    }
    // vscode.window.showInformationMessage(stringifyMaxDepth(grammar._ruleId2desc, 6));
    // @ts-ignore
    // vscode.window.showInformationMessage(JSON.stringify((grammar as Grammar)._ruleId2desc, stringify));
    // vscode.window.showInformationMessage(JSON.stringify(ruleStack, stringify));
    return tokenLineResult;
}
exports.tokenizeLine = tokenizeLine;
async function tokenizeFile(document) {
    const lang = document.languageId;
    const scopeName = getScopeName(lang);
    // const grammar = await registry.loadGrammar(scopeName);
    const grammar = await exports.registry.loadGrammar(scopeName);
    // Very hacky, assigns array so `_tokenizeString()` can add rules to it
    grammar.rules = [];
    // const tokenLineResults: vscodeTextmate.ITokenizeLineResult[] = [];
    let ruleStack = vscodeTextmate.INITIAL;
    for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i).text;
        const lineTokens = grammar.tokenizeLine(line, ruleStack, 15000);
        // tokenLineResults.push(
        // 	{
        // 		tokens: lineTokens.tokens,
        // 		ruleStack: structuredClone(lineTokens.ruleStack),
        // 		stoppedEarly: lineTokens.stoppedEarly,
        // 	}
        // );
        ruleStack = lineTokens.ruleStack;
    }
    // vscode.window.showInformationMessage(JSON.stringify(registry, stringify));
    vscode.window.showInformationMessage(JSON.stringify(grammar, extension_1.stringify));
    // vscode.window.showInformationMessage(JSON.stringify(tokenLineResults, stringify));
    // return tokenLineResults;
    return grammar;
}
exports.tokenizeFile = tokenizeFile;


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.applyStateStackDiff = exports.diffStateStacksRefEq = exports.parseRawGrammar = exports.INITIAL = exports.Registry = void 0;
const grammar_1 = __webpack_require__(10);
const grammarReader = __webpack_require__(22);
const registry_1 = __webpack_require__(25);
const theme_1 = __webpack_require__(19);
const grammarDependencies_1 = __webpack_require__(18);
const diffStateStacks_1 = __webpack_require__(26);
Object.defineProperty(exports, "applyStateStackDiff", ({ enumerable: true, get: function () { return diffStateStacks_1.applyStateStackDiff; } }));
Object.defineProperty(exports, "diffStateStacksRefEq", ({ enumerable: true, get: function () { return diffStateStacks_1.diffStateStacksRefEq; } }));
__exportStar(__webpack_require__(15), exports);
/**
 * The registry that will hold all grammars.
 */
class Registry {
    _options;
    _syncRegistry;
    _ensureGrammarCache;
    constructor(options) {
        this._options = options;
        this._syncRegistry = new registry_1.SyncRegistry(theme_1.Theme.createFromRawTheme(options.theme, options.colorMap), options.onigLib);
        this._ensureGrammarCache = new Map();
    }
    dispose() {
        this._syncRegistry.dispose();
    }
    /**
     * Change the theme. Once called, no previous `ruleStack` should be used anymore.
     */
    setTheme(theme, colorMap) {
        this._syncRegistry.setTheme(theme_1.Theme.createFromRawTheme(theme, colorMap));
    }
    /**
     * Returns a lookup array for color ids.
     */
    getColorMap() {
        return this._syncRegistry.getColorMap();
    }
    /**
     * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
     * Please do not use language id 0.
     */
    loadGrammarWithEmbeddedLanguages(initialScopeName, initialLanguage, embeddedLanguages) {
        return this.loadGrammarWithConfiguration(initialScopeName, initialLanguage, { embeddedLanguages });
    }
    /**
     * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
     * Please do not use language id 0.
     */
    loadGrammarWithConfiguration(initialScopeName, initialLanguage, configuration) {
        return this._loadGrammar(initialScopeName, initialLanguage, configuration.embeddedLanguages, configuration.tokenTypes, new grammar_1.BalancedBracketSelectors(configuration.balancedBracketSelectors || [], configuration.unbalancedBracketSelectors || []));
    }
    /**
     * Load the grammar for `scopeName` and all referenced included grammars asynchronously.
     */
    loadGrammar(initialScopeName) {
        return this._loadGrammar(initialScopeName, 0, null, null, null);
    }
    async _loadGrammar(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
        const dependencyProcessor = new grammarDependencies_1.ScopeDependencyProcessor(this._syncRegistry, initialScopeName);
        while (dependencyProcessor.Q.length > 0) {
            await Promise.all(dependencyProcessor.Q.map((request) => this._loadSingleGrammar(request.scopeName)));
            dependencyProcessor.processQueue();
        }
        return this._grammarForScopeName(initialScopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors);
    }
    async _loadSingleGrammar(scopeName) {
        if (!this._ensureGrammarCache.has(scopeName)) {
            this._ensureGrammarCache.set(scopeName, this._doLoadSingleGrammar(scopeName));
        }
        return this._ensureGrammarCache.get(scopeName);
    }
    async _doLoadSingleGrammar(scopeName) {
        const grammar = await this._options.loadGrammar(scopeName);
        if (grammar) {
            const injections = typeof this._options.getInjections === "function" ? this._options.getInjections(scopeName) : undefined;
            this._syncRegistry.addGrammar(grammar, injections);
        }
    }
    /**
     * Adds a rawGrammar.
     */
    async addGrammar(rawGrammar, injections = [], initialLanguage = 0, embeddedLanguages = null) {
        this._syncRegistry.addGrammar(rawGrammar, injections);
        return (await this._grammarForScopeName(rawGrammar.scopeName, initialLanguage, embeddedLanguages));
    }
    /**
     * Get the grammar for `scopeName`. The grammar must first be created via `loadGrammar` or `addGrammar`.
     */
    _grammarForScopeName(scopeName, initialLanguage = 0, embeddedLanguages = null, tokenTypes = null, balancedBracketSelectors = null) {
        return this._syncRegistry.grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors);
    }
}
exports.Registry = Registry;
exports.INITIAL = grammar_1.StateStackImpl.NULL;
exports.parseRawGrammar = grammarReader.parseRawGrammar;


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(11), exports);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LineTokens = exports.BalancedBracketSelectors = exports.StateStackImpl = exports.AttributedScopeStack = exports.Grammar = exports.createGrammar = void 0;
const debug_1 = __webpack_require__(12);
const encodedTokenAttributes_1 = __webpack_require__(13);
const matcher_1 = __webpack_require__(14);
const onigLib_1 = __webpack_require__(15);
const rule_1 = __webpack_require__(16);
const theme_1 = __webpack_require__(19);
const utils_1 = __webpack_require__(17);
const basicScopesAttributeProvider_1 = __webpack_require__(20);
const tokenizeString_1 = __webpack_require__(21);
function createGrammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib) {
    return new Grammar(scopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, onigLib); //TODO
}
exports.createGrammar = createGrammar;
function collectInjections(result, selector, rule, ruleFactoryHelper, grammar) {
    const matchers = (0, matcher_1.createMatchers)(selector, nameMatcher);
    const ruleId = rule_1.RuleFactory.getCompiledRuleId(rule, ruleFactoryHelper, grammar.repository);
    for (const matcher of matchers) {
        result.push({
            debugSelector: selector,
            matcher: matcher.matcher,
            ruleId: ruleId,
            grammar: grammar,
            priority: matcher.priority
        });
    }
}
function nameMatcher(identifers, scopes) {
    if (scopes.length < identifers.length) {
        return false;
    }
    let lastIndex = 0;
    return identifers.every(identifier => {
        for (let i = lastIndex; i < scopes.length; i++) {
            if (scopesAreMatching(scopes[i], identifier)) {
                lastIndex = i + 1;
                return true;
            }
        }
        return false;
    });
}
function scopesAreMatching(thisScopeName, scopeName) {
    if (!thisScopeName) {
        return false;
    }
    if (thisScopeName === scopeName) {
        return true;
    }
    const len = scopeName.length;
    return thisScopeName.length > len && thisScopeName.substr(0, len) === scopeName && thisScopeName[len] === '.';
}
class Grammar {
    _rootScopeName;
    balancedBracketSelectors;
    _onigLib;
    _rootId;
    _lastRuleId;
    _ruleId2desc;
    _includedGrammars;
    _grammarRepository;
    _grammar;
    _injections;
    _basicScopeAttributesProvider;
    _tokenTypeMatchers;
    get themeProvider() { return this._grammarRepository; }
    constructor(_rootScopeName, grammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, grammarRepository, _onigLib) {
        this._rootScopeName = _rootScopeName;
        this.balancedBracketSelectors = balancedBracketSelectors;
        this._onigLib = _onigLib;
        this._basicScopeAttributesProvider = new basicScopesAttributeProvider_1.BasicScopeAttributesProvider(initialLanguage, embeddedLanguages);
        this._rootId = -1;
        this._lastRuleId = 0;
        this._ruleId2desc = [null];
        this._includedGrammars = {};
        this._grammarRepository = grammarRepository;
        this._grammar = initGrammar(grammar, null);
        this._injections = null;
        this._tokenTypeMatchers = [];
        if (tokenTypes) {
            for (const selector of Object.keys(tokenTypes)) {
                const matchers = (0, matcher_1.createMatchers)(selector, nameMatcher);
                for (const matcher of matchers) {
                    this._tokenTypeMatchers.push({
                        matcher: matcher.matcher,
                        type: tokenTypes[selector],
                    });
                }
            }
        }
    }
    dispose() {
        for (const rule of this._ruleId2desc) {
            if (rule) {
                rule.dispose();
            }
        }
    }
    createOnigScanner(sources) {
        return this._onigLib.createOnigScanner(sources);
    }
    createOnigString(sources) {
        return this._onigLib.createOnigString(sources);
    }
    getMetadataForScope(scope) {
        return this._basicScopeAttributesProvider.getBasicScopeAttributes(scope);
    }
    _collectInjections() {
        const grammarRepository = {
            lookup: (scopeName) => {
                if (scopeName === this._rootScopeName) {
                    return this._grammar;
                }
                return this.getExternalGrammar(scopeName);
            },
            injections: (scopeName) => {
                return this._grammarRepository.injections(scopeName);
            },
        };
        const result = [];
        const scopeName = this._rootScopeName;
        const grammar = grammarRepository.lookup(scopeName);
        if (grammar) {
            // add injections from the current grammar
            const rawInjections = grammar.injections;
            if (rawInjections) {
                for (let expression in rawInjections) {
                    collectInjections(result, expression, rawInjections[expression], this, grammar);
                }
            }
            // add injection grammars contributed for the current scope
            const injectionScopeNames = this._grammarRepository.injections(scopeName);
            if (injectionScopeNames) {
                injectionScopeNames.forEach((injectionScopeName) => {
                    const injectionGrammar = this.getExternalGrammar(injectionScopeName);
                    if (injectionGrammar) {
                        const selector = injectionGrammar.injectionSelector;
                        if (selector) {
                            collectInjections(result, selector, injectionGrammar, this, injectionGrammar);
                        }
                    }
                });
            }
        }
        result.sort((i1, i2) => i1.priority - i2.priority); // sort by priority
        return result;
    }
    getInjections() {
        if (this._injections === null) {
            this._injections = this._collectInjections();
            if (debug_1.DebugFlags.InDebugMode && this._injections.length > 0) {
                console.log(`Grammar ${this._rootScopeName} contains the following injections:`);
                for (const injection of this._injections) {
                    console.log(`  - ${injection.debugSelector}`);
                }
            }
        }
        return this._injections;
    }
    registerRule(factory) {
        const id = ++this._lastRuleId;
        const result = factory((0, rule_1.ruleIdFromNumber)(id));
        this._ruleId2desc[id] = result;
        return result;
    }
    getRule(ruleId) {
        return this._ruleId2desc[(0, rule_1.ruleIdToNumber)(ruleId)];
    }
    getExternalGrammar(scopeName, repository) {
        if (this._includedGrammars[scopeName]) {
            return this._includedGrammars[scopeName];
        }
        else if (this._grammarRepository) {
            const rawIncludedGrammar = this._grammarRepository.lookup(scopeName);
            if (rawIncludedGrammar) {
                // console.log('LOADED GRAMMAR ' + pattern.include);
                this._includedGrammars[scopeName] = initGrammar(rawIncludedGrammar, repository && repository.$base);
                return this._includedGrammars[scopeName];
            }
        }
        return undefined;
    }
    tokenizeLine(lineText, prevState, timeLimit = 0) {
        const r = this._tokenize(lineText, prevState, false, timeLimit);
        return {
            tokens: r.lineTokens.getResult(r.ruleStack, r.lineLength),
            ruleStack: r.ruleStack,
            stoppedEarly: r.stoppedEarly,
        };
    }
    tokenizeLine2(lineText, prevState, timeLimit = 0) {
        const r = this._tokenize(lineText, prevState, true, timeLimit);
        return {
            tokens: r.lineTokens.getBinaryResult(r.ruleStack, r.lineLength),
            ruleStack: r.ruleStack,
            stoppedEarly: r.stoppedEarly,
        };
    }
    _tokenize(lineText, prevState, emitBinaryTokens, timeLimit) {
        if (this._rootId === -1) {
            this._rootId = rule_1.RuleFactory.getCompiledRuleId(this._grammar.repository.$self, this, this._grammar.repository);
            // This ensures ids are deterministic, and thus equal in renderer and webworker.
            this.getInjections();
        }
        let isFirstLine;
        if (!prevState || prevState === StateStackImpl.NULL) {
            isFirstLine = true;
            const rawDefaultMetadata = this._basicScopeAttributesProvider.getDefaultAttributes();
            const defaultStyle = this.themeProvider.getDefaults();
            const defaultMetadata = encodedTokenAttributes_1.EncodedTokenAttributes.set(0, rawDefaultMetadata.languageId, rawDefaultMetadata.tokenType, null, defaultStyle.fontStyle, defaultStyle.foregroundId, defaultStyle.backgroundId);
            const rootScopeName = this.getRule(this._rootId).getName(null, null);
            let scopeList;
            if (rootScopeName) {
                scopeList = AttributedScopeStack.createRootAndLookUpScopeName(rootScopeName, defaultMetadata, this);
            }
            else {
                scopeList = AttributedScopeStack.createRoot("unknown", defaultMetadata);
            }
            prevState = new StateStackImpl(null, this._rootId, -1, -1, false, null, scopeList, scopeList);
        }
        else {
            isFirstLine = false;
            prevState.reset();
        }
        lineText = lineText + "\n";
        const onigLineText = this.createOnigString(lineText);
        const lineLength = onigLineText.content.length;
        const lineTokens = new LineTokens(emitBinaryTokens, lineText, this._tokenTypeMatchers, this.balancedBracketSelectors);
        const r = (0, tokenizeString_1._tokenizeString)(this, onigLineText, isFirstLine, 0, prevState, lineTokens, true, timeLimit);
        (0, onigLib_1.disposeOnigString)(onigLineText);
        return {
            lineLength: lineLength,
            lineTokens: lineTokens,
            ruleStack: r.stack,
            stoppedEarly: r.stoppedEarly,
        };
    }
}
exports.Grammar = Grammar;
function initGrammar(grammar, base) {
    grammar = (0, utils_1.clone)(grammar);
    grammar.repository = grammar.repository || {};
    grammar.repository.$self = {
        $vscodeTextmateLocation: grammar.$vscodeTextmateLocation,
        patterns: grammar.patterns,
        name: grammar.scopeName
    };
    grammar.repository.$base = base || grammar.repository.$self;
    return grammar;
}
class AttributedScopeStack {
    parent;
    scopePath;
    tokenAttributes;
    static fromExtension(namesScopeList, contentNameScopesList) {
        let current = namesScopeList;
        let scopeNames = namesScopeList?.scopePath ?? null;
        for (const frame of contentNameScopesList) {
            scopeNames = theme_1.ScopeStack.push(scopeNames, frame.scopeNames);
            current = new AttributedScopeStack(current, scopeNames, frame.encodedTokenAttributes);
        }
        return current;
    }
    static createRoot(scopeName, tokenAttributes) {
        return new AttributedScopeStack(null, new theme_1.ScopeStack(null, scopeName), tokenAttributes);
    }
    static createRootAndLookUpScopeName(scopeName, tokenAttributes, grammar) {
        const rawRootMetadata = grammar.getMetadataForScope(scopeName);
        const scopePath = new theme_1.ScopeStack(null, scopeName);
        const rootStyle = grammar.themeProvider.themeMatch(scopePath);
        const resolvedTokenAttributes = AttributedScopeStack.mergeAttributes(tokenAttributes, rawRootMetadata, rootStyle);
        return new AttributedScopeStack(null, scopePath, resolvedTokenAttributes);
    }
    get scopeName() { return this.scopePath.scopeName; }
    /**
     * Invariant:
     * ```
     * if (parent && !scopePath.extends(parent.scopePath)) {
     * 	throw new Error();
     * }
     * ```
     */
    constructor(parent, scopePath, tokenAttributes) {
        this.parent = parent;
        this.scopePath = scopePath;
        this.tokenAttributes = tokenAttributes;
    }
    toString() {
        return this.getScopeNames().join(' ');
    }
    equals(other) {
        return AttributedScopeStack.equals(this, other);
    }
    static equals(a, b) {
        do {
            if (a === b) {
                return true;
            }
            if (!a && !b) {
                // End of list reached for both
                return true;
            }
            if (!a || !b) {
                // End of list reached only for one
                return false;
            }
            if (a.scopeName !== b.scopeName || a.tokenAttributes !== b.tokenAttributes) {
                return false;
            }
            // Go to previous pair
            a = a.parent;
            b = b.parent;
        } while (true);
    }
    static mergeAttributes(existingTokenAttributes, basicScopeAttributes, styleAttributes) {
        let fontStyle = -1 /* FontStyle.NotSet */;
        let foreground = 0;
        let background = 0;
        if (styleAttributes !== null) {
            fontStyle = styleAttributes.fontStyle;
            foreground = styleAttributes.foregroundId;
            background = styleAttributes.backgroundId;
        }
        return encodedTokenAttributes_1.EncodedTokenAttributes.set(existingTokenAttributes, basicScopeAttributes.languageId, basicScopeAttributes.tokenType, null, fontStyle, foreground, background);
    }
    pushAttributed(scopePath, grammar) {
        if (scopePath === null) {
            return this;
        }
        if (scopePath.indexOf(' ') === -1) {
            // This is the common case and much faster
            return AttributedScopeStack._pushAttributed(this, scopePath, grammar);
        }
        const scopes = scopePath.split(/ /g);
        let result = this;
        for (const scope of scopes) {
            result = AttributedScopeStack._pushAttributed(result, scope, grammar);
        }
        return result;
    }
    static _pushAttributed(target, scopeName, grammar) {
        const rawMetadata = grammar.getMetadataForScope(scopeName);
        const newPath = target.scopePath.push(scopeName);
        const scopeThemeMatchResult = grammar.themeProvider.themeMatch(newPath);
        const metadata = AttributedScopeStack.mergeAttributes(target.tokenAttributes, rawMetadata, scopeThemeMatchResult);
        return new AttributedScopeStack(target, newPath, metadata);
    }
    getScopeNames() {
        return this.scopePath.getSegments();
    }
    getExtensionIfDefined(base) {
        const result = [];
        let self = this;
        while (self && self !== base) {
            result.push({
                encodedTokenAttributes: self.tokenAttributes,
                scopeNames: self.scopePath.getExtensionIfDefined(self.parent?.scopePath ?? null),
            });
            self = self.parent;
        }
        return self === base ? result.reverse() : undefined;
    }
}
exports.AttributedScopeStack = AttributedScopeStack;
/**
 * Represents a "pushed" state on the stack (as a linked list element).
 */
class StateStackImpl {
    parent;
    ruleId;
    beginRuleCapturedEOL;
    endRule;
    nameScopesList;
    contentNameScopesList;
    _stackElementBrand = undefined;
    // TODO remove me
    static NULL = new StateStackImpl(null, 0, 0, 0, false, null, null, null);
    /**
     * The position on the current line where this state was pushed.
     * This is relevant only while tokenizing a line, to detect endless loops.
     * Its value is meaningless across lines.
     */
    _enterPos;
    /**
     * The captured anchor position when this stack element was pushed.
     * This is relevant only while tokenizing a line, to restore the anchor position when popping.
     * Its value is meaningless across lines.
     */
    _anchorPos;
    /**
     * The depth of the stack.
     */
    depth;
    /**
     * Invariant:
     * ```
     * if (contentNameScopesList !== nameScopesList && contentNameScopesList?.parent !== nameScopesList) {
     * 	throw new Error();
     * }
     * if (this.parent && !nameScopesList.extends(this.parent.contentNameScopesList)) {
     * 	throw new Error();
     * }
     * ```
     */
    constructor(
    /**
     * The previous state on the stack (or null for the root state).
     */
    parent, 
    /**
     * The state (rule) that this element represents.
     */
    ruleId, enterPos, anchorPos, 
    /**
     * The state has entered and captured \n. This means that the next line should have an anchorPosition of 0.
     */
    beginRuleCapturedEOL, 
    /**
     * The "pop" (end) condition for this state in case that it was dynamically generated through captured text.
     */
    endRule, 
    /**
     * The list of scopes containing the "name" for this state.
     */
    nameScopesList, 
    /**
     * The list of scopes containing the "contentName" (besides "name") for this state.
     * This list **must** contain as an element `scopeName`.
     */
    contentNameScopesList) {
        this.parent = parent;
        this.ruleId = ruleId;
        this.beginRuleCapturedEOL = beginRuleCapturedEOL;
        this.endRule = endRule;
        this.nameScopesList = nameScopesList;
        this.contentNameScopesList = contentNameScopesList;
        this.depth = this.parent ? this.parent.depth + 1 : 1;
        this._enterPos = enterPos;
        this._anchorPos = anchorPos;
    }
    equals(other) {
        if (other === null) {
            return false;
        }
        return StateStackImpl._equals(this, other);
    }
    static _equals(a, b) {
        if (a === b) {
            return true;
        }
        if (!this._structuralEquals(a, b)) {
            return false;
        }
        return AttributedScopeStack.equals(a.contentNameScopesList, b.contentNameScopesList);
    }
    /**
     * A structural equals check. Does not take into account `scopes`.
     */
    static _structuralEquals(a, b) {
        do {
            if (a === b) {
                return true;
            }
            if (!a && !b) {
                // End of list reached for both
                return true;
            }
            if (!a || !b) {
                // End of list reached only for one
                return false;
            }
            if (a.depth !== b.depth ||
                a.ruleId !== b.ruleId ||
                a.endRule !== b.endRule) {
                return false;
            }
            // Go to previous pair
            a = a.parent;
            b = b.parent;
        } while (true);
    }
    clone() {
        return this;
    }
    static _reset(el) {
        while (el) {
            el._enterPos = -1;
            el._anchorPos = -1;
            el = el.parent;
        }
    }
    reset() {
        StateStackImpl._reset(this);
    }
    pop() {
        return this.parent;
    }
    safePop() {
        if (this.parent) {
            return this.parent;
        }
        return this;
    }
    push(ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList) {
        return new StateStackImpl(this, ruleId, enterPos, anchorPos, beginRuleCapturedEOL, endRule, nameScopesList, contentNameScopesList);
    }
    getEnterPos() {
        return this._enterPos;
    }
    getAnchorPos() {
        return this._anchorPos;
    }
    getRule(grammar) {
        return grammar.getRule(this.ruleId);
    }
    toString() {
        const r = [];
        this._writeString(r, 0);
        return "[" + r.join(",") + "]";
    }
    _writeString(res, outIndex) {
        if (this.parent) {
            outIndex = this.parent._writeString(res, outIndex);
        }
        res[outIndex++] = `(${this.ruleId}, ${this.nameScopesList?.toString()}, ${this.contentNameScopesList?.toString()})`;
        return outIndex;
    }
    withContentNameScopesList(contentNameScopeStack) {
        if (this.contentNameScopesList === contentNameScopeStack) {
            return this;
        }
        return this.parent.push(this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, this.endRule, this.nameScopesList, contentNameScopeStack);
    }
    withEndRule(endRule) {
        if (this.endRule === endRule) {
            return this;
        }
        return new StateStackImpl(this.parent, this.ruleId, this._enterPos, this._anchorPos, this.beginRuleCapturedEOL, endRule, this.nameScopesList, this.contentNameScopesList);
    }
    // Used to warn of endless loops
    hasSameRuleAs(other) {
        let el = this;
        while (el && el._enterPos === other._enterPos) {
            if (el.ruleId === other.ruleId) {
                return true;
            }
            el = el.parent;
        }
        return false;
    }
    toStateStackFrame() {
        return {
            ruleId: (0, rule_1.ruleIdToNumber)(this.ruleId),
            beginRuleCapturedEOL: this.beginRuleCapturedEOL,
            endRule: this.endRule,
            nameScopesList: this.nameScopesList?.getExtensionIfDefined(this.parent?.nameScopesList ?? null) ?? [],
            contentNameScopesList: this.contentNameScopesList?.getExtensionIfDefined(this.nameScopesList) ?? [],
        };
    }
    static pushFrame(self, frame) {
        const namesScopeList = AttributedScopeStack.fromExtension(self?.nameScopesList ?? null, frame.nameScopesList);
        return new StateStackImpl(self, (0, rule_1.ruleIdFromNumber)(frame.ruleId), frame.enterPos ?? -1, frame.anchorPos ?? -1, frame.beginRuleCapturedEOL, frame.endRule, namesScopeList, AttributedScopeStack.fromExtension(namesScopeList, frame.contentNameScopesList));
    }
}
exports.StateStackImpl = StateStackImpl;
class BalancedBracketSelectors {
    balancedBracketScopes;
    unbalancedBracketScopes;
    allowAny = false;
    constructor(balancedBracketScopes, unbalancedBracketScopes) {
        this.balancedBracketScopes = balancedBracketScopes.flatMap((selector) => {
            if (selector === '*') {
                this.allowAny = true;
                return [];
            }
            return (0, matcher_1.createMatchers)(selector, nameMatcher).map((m) => m.matcher);
        });
        this.unbalancedBracketScopes = unbalancedBracketScopes.flatMap((selector) => (0, matcher_1.createMatchers)(selector, nameMatcher).map((m) => m.matcher));
    }
    get matchesAlways() {
        return this.allowAny && this.unbalancedBracketScopes.length === 0;
    }
    get matchesNever() {
        return this.balancedBracketScopes.length === 0 && !this.allowAny;
    }
    match(scopes) {
        for (const excluder of this.unbalancedBracketScopes) {
            if (excluder(scopes)) {
                return false;
            }
        }
        for (const includer of this.balancedBracketScopes) {
            if (includer(scopes)) {
                return true;
            }
        }
        return this.allowAny;
    }
}
exports.BalancedBracketSelectors = BalancedBracketSelectors;
class LineTokens {
    balancedBracketSelectors;
    _emitBinaryTokens;
    /**
     * defined only if `DebugFlags.InDebugMode`.
     */
    _lineText;
    /**
     * used only if `_emitBinaryTokens` is false.
     */
    _tokens;
    /**
     * used only if `_emitBinaryTokens` is true.
     */
    _binaryTokens;
    _lastTokenEndIndex;
    _tokenTypeOverrides;
    constructor(emitBinaryTokens, lineText, tokenTypeOverrides, balancedBracketSelectors) {
        this.balancedBracketSelectors = balancedBracketSelectors;
        this._emitBinaryTokens = emitBinaryTokens;
        this._tokenTypeOverrides = tokenTypeOverrides;
        if (debug_1.DebugFlags.InDebugMode) {
            this._lineText = lineText;
        }
        else {
            this._lineText = null;
        }
        this._tokens = [];
        this._binaryTokens = [];
        this._lastTokenEndIndex = 0;
    }
    produce(stack, endIndex) {
        this.produceFromScopes(stack.contentNameScopesList, endIndex);
    }
    produceFromScopes(scopesList, endIndex) {
        if (this._lastTokenEndIndex >= endIndex) {
            return;
        }
        if (this._emitBinaryTokens) {
            let metadata = scopesList?.tokenAttributes ?? 0;
            let containsBalancedBrackets = false;
            if (this.balancedBracketSelectors?.matchesAlways) {
                containsBalancedBrackets = true;
            }
            if (this._tokenTypeOverrides.length > 0 || (this.balancedBracketSelectors && !this.balancedBracketSelectors.matchesAlways && !this.balancedBracketSelectors.matchesNever)) {
                // Only generate scope array when required to improve performance
                const scopes = scopesList?.getScopeNames() ?? [];
                for (const tokenType of this._tokenTypeOverrides) {
                    if (tokenType.matcher(scopes)) {
                        metadata = encodedTokenAttributes_1.EncodedTokenAttributes.set(metadata, 0, (0, encodedTokenAttributes_1.toOptionalTokenType)(tokenType.type), null, -1 /* FontStyle.NotSet */, 0, 0);
                    }
                }
                if (this.balancedBracketSelectors) {
                    containsBalancedBrackets = this.balancedBracketSelectors.match(scopes);
                }
            }
            if (containsBalancedBrackets) {
                metadata = encodedTokenAttributes_1.EncodedTokenAttributes.set(metadata, 0, 8 /* OptionalStandardTokenType.NotSet */, containsBalancedBrackets, -1 /* FontStyle.NotSet */, 0, 0);
            }
            if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 1] === metadata) {
                // no need to push a token with the same metadata
                this._lastTokenEndIndex = endIndex;
                return;
            }
            if (debug_1.DebugFlags.InDebugMode) {
                const scopes = scopesList?.getScopeNames() ?? [];
                console.log('  token: |' + this._lineText.substring(this._lastTokenEndIndex, endIndex).replace(/\n$/, '\\n') + '|');
                for (let k = 0; k < scopes.length; k++) {
                    console.log('      * ' + scopes[k]);
                }
            }
            this._binaryTokens.push(this._lastTokenEndIndex);
            this._binaryTokens.push(metadata);
            this._lastTokenEndIndex = endIndex;
            return;
        }
        const scopes = scopesList?.getScopeNames() ?? [];
        if (debug_1.DebugFlags.InDebugMode) {
            console.log('  token: |' + this._lineText.substring(this._lastTokenEndIndex, endIndex).replace(/\n$/, '\\n') + '|');
            for (let k = 0; k < scopes.length; k++) {
                console.log('      * ' + scopes[k]);
            }
        }
        this._tokens.push({
            startIndex: this._lastTokenEndIndex,
            endIndex: endIndex,
            // value: lineText.substring(lastTokenEndIndex, endIndex),
            scopes: scopes
        });
        this._lastTokenEndIndex = endIndex;
    }
    getResult(stack, lineLength) {
        if (this._tokens.length > 0 && this._tokens[this._tokens.length - 1].startIndex === lineLength - 1) {
            // pop produced token for newline
            this._tokens.pop();
        }
        if (this._tokens.length === 0) {
            this._lastTokenEndIndex = -1;
            this.produce(stack, lineLength);
            this._tokens[this._tokens.length - 1].startIndex = 0;
        }
        return this._tokens;
    }
    getBinaryResult(stack, lineLength) {
        if (this._binaryTokens.length > 0 && this._binaryTokens[this._binaryTokens.length - 2] === lineLength - 1) {
            // pop produced token for newline
            this._binaryTokens.pop();
            this._binaryTokens.pop();
        }
        if (this._binaryTokens.length === 0) {
            this._lastTokenEndIndex = -1;
            this.produce(stack, lineLength);
            this._binaryTokens[this._binaryTokens.length - 2] = 0;
        }
        const result = new Uint32Array(this._binaryTokens.length);
        for (let i = 0, len = this._binaryTokens.length; i < len; i++) {
            result[i] = this._binaryTokens[i];
        }
        return result;
    }
}
exports.LineTokens = LineTokens;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UseOnigurumaFindOptions = exports.DebugFlags = void 0;
exports.DebugFlags = {
    InDebugMode: (typeof process !== 'undefined' && !!process.env['VSCODE_TEXTMATE_DEBUG'])
};
exports.UseOnigurumaFindOptions = false;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toOptionalTokenType = exports.EncodedTokenAttributes = void 0;
var EncodedTokenAttributes;
(function (EncodedTokenAttributes) {
    function toBinaryStr(encodedTokenAttributes) {
        return encodedTokenAttributes.toString(2).padStart(32, "0");
    }
    EncodedTokenAttributes.toBinaryStr = toBinaryStr;
    function print(encodedTokenAttributes) {
        const languageId = EncodedTokenAttributes.getLanguageId(encodedTokenAttributes);
        const tokenType = EncodedTokenAttributes.getTokenType(encodedTokenAttributes);
        const fontStyle = EncodedTokenAttributes.getFontStyle(encodedTokenAttributes);
        const foreground = EncodedTokenAttributes.getForeground(encodedTokenAttributes);
        const background = EncodedTokenAttributes.getBackground(encodedTokenAttributes);
        console.log({
            languageId: languageId,
            tokenType: tokenType,
            fontStyle: fontStyle,
            foreground: foreground,
            background: background,
        });
    }
    EncodedTokenAttributes.print = print;
    function getLanguageId(encodedTokenAttributes) {
        return ((encodedTokenAttributes & 255 /* EncodedTokenDataConsts.LANGUAGEID_MASK */) >>>
            0 /* EncodedTokenDataConsts.LANGUAGEID_OFFSET */);
    }
    EncodedTokenAttributes.getLanguageId = getLanguageId;
    function getTokenType(encodedTokenAttributes) {
        return ((encodedTokenAttributes & 768 /* EncodedTokenDataConsts.TOKEN_TYPE_MASK */) >>>
            8 /* EncodedTokenDataConsts.TOKEN_TYPE_OFFSET */);
    }
    EncodedTokenAttributes.getTokenType = getTokenType;
    function containsBalancedBrackets(encodedTokenAttributes) {
        return (encodedTokenAttributes & 1024 /* EncodedTokenDataConsts.BALANCED_BRACKETS_MASK */) !== 0;
    }
    EncodedTokenAttributes.containsBalancedBrackets = containsBalancedBrackets;
    function getFontStyle(encodedTokenAttributes) {
        return ((encodedTokenAttributes & 30720 /* EncodedTokenDataConsts.FONT_STYLE_MASK */) >>>
            11 /* EncodedTokenDataConsts.FONT_STYLE_OFFSET */);
    }
    EncodedTokenAttributes.getFontStyle = getFontStyle;
    function getForeground(encodedTokenAttributes) {
        return ((encodedTokenAttributes & 16744448 /* EncodedTokenDataConsts.FOREGROUND_MASK */) >>>
            15 /* EncodedTokenDataConsts.FOREGROUND_OFFSET */);
    }
    EncodedTokenAttributes.getForeground = getForeground;
    function getBackground(encodedTokenAttributes) {
        return ((encodedTokenAttributes & 4278190080 /* EncodedTokenDataConsts.BACKGROUND_MASK */) >>>
            24 /* EncodedTokenDataConsts.BACKGROUND_OFFSET */);
    }
    EncodedTokenAttributes.getBackground = getBackground;
    /**
     * Updates the fields in `metadata`.
     * A value of `0`, `NotSet` or `null` indicates that the corresponding field should be left as is.
     */
    function set(encodedTokenAttributes, languageId, tokenType, containsBalancedBrackets, fontStyle, foreground, background) {
        let _languageId = EncodedTokenAttributes.getLanguageId(encodedTokenAttributes);
        let _tokenType = EncodedTokenAttributes.getTokenType(encodedTokenAttributes);
        let _containsBalancedBracketsBit = EncodedTokenAttributes.containsBalancedBrackets(encodedTokenAttributes) ? 1 : 0;
        let _fontStyle = EncodedTokenAttributes.getFontStyle(encodedTokenAttributes);
        let _foreground = EncodedTokenAttributes.getForeground(encodedTokenAttributes);
        let _background = EncodedTokenAttributes.getBackground(encodedTokenAttributes);
        if (languageId !== 0) {
            _languageId = languageId;
        }
        if (tokenType !== 8 /* OptionalStandardTokenType.NotSet */) {
            _tokenType = fromOptionalTokenType(tokenType);
        }
        if (containsBalancedBrackets !== null) {
            _containsBalancedBracketsBit = containsBalancedBrackets ? 1 : 0;
        }
        if (fontStyle !== -1 /* FontStyle.NotSet */) {
            _fontStyle = fontStyle;
        }
        if (foreground !== 0) {
            _foreground = foreground;
        }
        if (background !== 0) {
            _background = background;
        }
        return (((_languageId << 0 /* EncodedTokenDataConsts.LANGUAGEID_OFFSET */) |
            (_tokenType << 8 /* EncodedTokenDataConsts.TOKEN_TYPE_OFFSET */) |
            (_containsBalancedBracketsBit <<
                10 /* EncodedTokenDataConsts.BALANCED_BRACKETS_OFFSET */) |
            (_fontStyle << 11 /* EncodedTokenDataConsts.FONT_STYLE_OFFSET */) |
            (_foreground << 15 /* EncodedTokenDataConsts.FOREGROUND_OFFSET */) |
            (_background << 24 /* EncodedTokenDataConsts.BACKGROUND_OFFSET */)) >>>
            0);
    }
    EncodedTokenAttributes.set = set;
})(EncodedTokenAttributes || (exports.EncodedTokenAttributes = EncodedTokenAttributes = {}));
function toOptionalTokenType(standardType) {
    return standardType;
}
exports.toOptionalTokenType = toOptionalTokenType;
function fromOptionalTokenType(standardType) {
    return standardType;
}


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createMatchers = void 0;
function createMatchers(selector, matchesName) {
    const results = [];
    const tokenizer = newTokenizer(selector);
    let token = tokenizer.next();
    while (token !== null) {
        let priority = 0;
        if (token.length === 2 && token.charAt(1) === ':') {
            switch (token.charAt(0)) {
                case 'R':
                    priority = 1;
                    break;
                case 'L':
                    priority = -1;
                    break;
                default:
                    console.log(`Unknown priority ${token} in scope selector`);
            }
            token = tokenizer.next();
        }
        let matcher = parseConjunction();
        results.push({ matcher, priority });
        if (token !== ',') {
            break;
        }
        token = tokenizer.next();
    }
    return results;
    function parseOperand() {
        if (token === '-') {
            token = tokenizer.next();
            const expressionToNegate = parseOperand();
            return matcherInput => !!expressionToNegate && !expressionToNegate(matcherInput);
        }
        if (token === '(') {
            token = tokenizer.next();
            const expressionInParents = parseInnerExpression();
            if (token === ')') {
                token = tokenizer.next();
            }
            return expressionInParents;
        }
        if (isIdentifier(token)) {
            const identifiers = [];
            do {
                identifiers.push(token);
                token = tokenizer.next();
            } while (isIdentifier(token));
            return matcherInput => matchesName(identifiers, matcherInput);
        }
        return null;
    }
    function parseConjunction() {
        const matchers = [];
        let matcher = parseOperand();
        while (matcher) {
            matchers.push(matcher);
            matcher = parseOperand();
        }
        return matcherInput => matchers.every(matcher => matcher(matcherInput)); // and
    }
    function parseInnerExpression() {
        const matchers = [];
        let matcher = parseConjunction();
        while (matcher) {
            matchers.push(matcher);
            if (token === '|' || token === ',') {
                do {
                    token = tokenizer.next();
                } while (token === '|' || token === ','); // ignore subsequent commas
            }
            else {
                break;
            }
            matcher = parseConjunction();
        }
        return matcherInput => matchers.some(matcher => matcher(matcherInput)); // or
    }
}
exports.createMatchers = createMatchers;
function isIdentifier(token) {
    return !!token && !!token.match(/[\w\.:]+/);
}
function newTokenizer(input) {
    let regex = /([LR]:|[\w\.:][\w\.:\-]*|[\,\|\-\(\)])/g;
    let match = regex.exec(input);
    return {
        next: () => {
            if (!match) {
                return null;
            }
            const res = match[0];
            match = regex.exec(input);
            return res;
        }
    };
}


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.disposeOnigString = void 0;
function disposeOnigString(str) {
    if (typeof str.dispose === 'function') {
        str.dispose();
    }
}
exports.disposeOnigString = disposeOnigString;


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompiledRule = exports.RegExpSourceList = exports.RegExpSource = exports.RuleFactory = exports.BeginWhileRule = exports.BeginEndRule = exports.IncludeOnlyRule = exports.MatchRule = exports.CaptureRule = exports.Rule = exports.ruleIdToNumber = exports.ruleIdFromNumber = exports.whileRuleId = exports.endRuleId = void 0;
const utils_1 = __webpack_require__(17);
const grammarDependencies_1 = __webpack_require__(18);
const HAS_BACK_REFERENCES = /\\(\d+)/;
const BACK_REFERENCING_END = /\\(\d+)/g;
const ruleIdSymbol = Symbol('RuleId');
// This is a special constant to indicate that the end regexp matched.
exports.endRuleId = -1;
// This is a special constant to indicate that the while regexp matched.
exports.whileRuleId = -2;
function ruleIdFromNumber(id) {
    return id;
}
exports.ruleIdFromNumber = ruleIdFromNumber;
function ruleIdToNumber(id) {
    return id;
}
exports.ruleIdToNumber = ruleIdToNumber;
class Rule {
    $location;
    id;
    _nameIsCapturing;
    _name;
    _contentNameIsCapturing;
    _contentName;
    constructor($location, id, name, contentName) {
        this.$location = $location;
        this.id = id;
        this._name = name || null;
        this._nameIsCapturing = utils_1.RegexSource.hasCaptures(this._name);
        this._contentName = contentName || null;
        this._contentNameIsCapturing = utils_1.RegexSource.hasCaptures(this._contentName);
    }
    get debugName() {
        const location = this.$location ? `${(0, utils_1.basename)(this.$location.filename)}:${this.$location.line}` : 'unknown';
        return `${this.constructor.name}#${this.id} @ ${location}`;
    }
    getName(lineText, captureIndices) {
        if (!this._nameIsCapturing || this._name === null || lineText === null || captureIndices === null) {
            return this._name;
        }
        return utils_1.RegexSource.replaceCaptures(this._name, lineText, captureIndices);
    }
    getContentName(lineText, captureIndices) {
        if (!this._contentNameIsCapturing || this._contentName === null) {
            return this._contentName;
        }
        return utils_1.RegexSource.replaceCaptures(this._contentName, lineText, captureIndices);
    }
}
exports.Rule = Rule;
class CaptureRule extends Rule {
    retokenizeCapturedWithRuleId;
    constructor($location, id, name, contentName, retokenizeCapturedWithRuleId) {
        super($location, id, name, contentName);
        this.retokenizeCapturedWithRuleId = retokenizeCapturedWithRuleId;
    }
    dispose() {
        // nothing to dispose
    }
    collectPatterns(grammar, out) {
        throw new Error('Not supported!');
    }
    compile(grammar, endRegexSource) {
        throw new Error('Not supported!');
    }
    compileAG(grammar, endRegexSource, allowA, allowG) {
        throw new Error('Not supported!');
    }
}
exports.CaptureRule = CaptureRule;
class MatchRule extends Rule {
    _match;
    captures;
    _cachedCompiledPatterns;
    constructor($location, id, name, match, captures) {
        super($location, id, name, null);
        this._match = new RegExpSource(match, this.id);
        this.captures = captures;
        this._cachedCompiledPatterns = null;
    }
    dispose() {
        if (this._cachedCompiledPatterns) {
            this._cachedCompiledPatterns.dispose();
            this._cachedCompiledPatterns = null;
        }
    }
    get debugMatchRegExp() {
        return `${this._match.source}`;
    }
    collectPatterns(grammar, out) {
        out.push(this._match);
    }
    compile(grammar, endRegexSource) {
        return this._getCachedCompiledPatterns(grammar).compile(grammar);
    }
    compileAG(grammar, endRegexSource, allowA, allowG) {
        return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
    }
    _getCachedCompiledPatterns(grammar) {
        if (!this._cachedCompiledPatterns) {
            this._cachedCompiledPatterns = new RegExpSourceList();
            this.collectPatterns(grammar, this._cachedCompiledPatterns);
        }
        return this._cachedCompiledPatterns;
    }
}
exports.MatchRule = MatchRule;
class IncludeOnlyRule extends Rule {
    hasMissingPatterns;
    patterns;
    _cachedCompiledPatterns;
    constructor($location, id, name, contentName, patterns) {
        super($location, id, name, contentName);
        this.patterns = patterns.patterns;
        this.hasMissingPatterns = patterns.hasMissingPatterns;
        this._cachedCompiledPatterns = null;
    }
    dispose() {
        if (this._cachedCompiledPatterns) {
            this._cachedCompiledPatterns.dispose();
            this._cachedCompiledPatterns = null;
        }
    }
    collectPatterns(grammar, out) {
        for (const pattern of this.patterns) {
            const rule = grammar.getRule(pattern);
            rule.collectPatterns(grammar, out);
        }
    }
    compile(grammar, endRegexSource) {
        return this._getCachedCompiledPatterns(grammar).compile(grammar);
    }
    compileAG(grammar, endRegexSource, allowA, allowG) {
        return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
    }
    _getCachedCompiledPatterns(grammar) {
        if (!this._cachedCompiledPatterns) {
            this._cachedCompiledPatterns = new RegExpSourceList();
            this.collectPatterns(grammar, this._cachedCompiledPatterns);
        }
        return this._cachedCompiledPatterns;
    }
}
exports.IncludeOnlyRule = IncludeOnlyRule;
class BeginEndRule extends Rule {
    _begin;
    beginCaptures;
    _end;
    endHasBackReferences;
    endCaptures;
    applyEndPatternLast;
    hasMissingPatterns;
    patterns;
    _cachedCompiledPatterns;
    constructor($location, id, name, contentName, begin, beginCaptures, end, endCaptures, applyEndPatternLast, patterns) {
        super($location, id, name, contentName);
        this._begin = new RegExpSource(begin, this.id);
        this.beginCaptures = beginCaptures;
        this._end = new RegExpSource(end ? end : '\uFFFF', -1);
        this.endHasBackReferences = this._end.hasBackReferences;
        this.endCaptures = endCaptures;
        this.applyEndPatternLast = applyEndPatternLast || false;
        this.patterns = patterns.patterns;
        this.hasMissingPatterns = patterns.hasMissingPatterns;
        this._cachedCompiledPatterns = null;
    }
    dispose() {
        if (this._cachedCompiledPatterns) {
            this._cachedCompiledPatterns.dispose();
            this._cachedCompiledPatterns = null;
        }
    }
    get debugBeginRegExp() {
        return `${this._begin.source}`;
    }
    get debugEndRegExp() {
        return `${this._end.source}`;
    }
    getEndWithResolvedBackReferences(lineText, captureIndices) {
        return this._end.resolveBackReferences(lineText, captureIndices);
    }
    collectPatterns(grammar, out) {
        out.push(this._begin);
    }
    compile(grammar, endRegexSource) {
        return this._getCachedCompiledPatterns(grammar, endRegexSource).compile(grammar);
    }
    compileAG(grammar, endRegexSource, allowA, allowG) {
        return this._getCachedCompiledPatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
    }
    _getCachedCompiledPatterns(grammar, endRegexSource) {
        if (!this._cachedCompiledPatterns) {
            this._cachedCompiledPatterns = new RegExpSourceList();
            for (const pattern of this.patterns) {
                const rule = grammar.getRule(pattern);
                rule.collectPatterns(grammar, this._cachedCompiledPatterns);
            }
            if (this.applyEndPatternLast) {
                this._cachedCompiledPatterns.push(this._end.hasBackReferences ? this._end.clone() : this._end);
            }
            else {
                this._cachedCompiledPatterns.unshift(this._end.hasBackReferences ? this._end.clone() : this._end);
            }
        }
        if (this._end.hasBackReferences) {
            if (this.applyEndPatternLast) {
                this._cachedCompiledPatterns.setSource(this._cachedCompiledPatterns.length() - 1, endRegexSource);
            }
            else {
                this._cachedCompiledPatterns.setSource(0, endRegexSource);
            }
        }
        return this._cachedCompiledPatterns;
    }
}
exports.BeginEndRule = BeginEndRule;
class BeginWhileRule extends Rule {
    _begin;
    beginCaptures;
    whileCaptures;
    _while;
    whileHasBackReferences;
    hasMissingPatterns;
    patterns;
    _cachedCompiledPatterns;
    _cachedCompiledWhilePatterns;
    constructor($location, id, name, contentName, begin, beginCaptures, _while, whileCaptures, patterns) {
        super($location, id, name, contentName);
        this._begin = new RegExpSource(begin, this.id);
        this.beginCaptures = beginCaptures;
        this.whileCaptures = whileCaptures;
        this._while = new RegExpSource(_while, exports.whileRuleId);
        this.whileHasBackReferences = this._while.hasBackReferences;
        this.patterns = patterns.patterns;
        this.hasMissingPatterns = patterns.hasMissingPatterns;
        this._cachedCompiledPatterns = null;
        this._cachedCompiledWhilePatterns = null;
    }
    dispose() {
        if (this._cachedCompiledPatterns) {
            this._cachedCompiledPatterns.dispose();
            this._cachedCompiledPatterns = null;
        }
        if (this._cachedCompiledWhilePatterns) {
            this._cachedCompiledWhilePatterns.dispose();
            this._cachedCompiledWhilePatterns = null;
        }
    }
    get debugBeginRegExp() {
        return `${this._begin.source}`;
    }
    get debugWhileRegExp() {
        return `${this._while.source}`;
    }
    getWhileWithResolvedBackReferences(lineText, captureIndices) {
        return this._while.resolveBackReferences(lineText, captureIndices);
    }
    collectPatterns(grammar, out) {
        out.push(this._begin);
    }
    compile(grammar, endRegexSource) {
        return this._getCachedCompiledPatterns(grammar).compile(grammar);
    }
    compileAG(grammar, endRegexSource, allowA, allowG) {
        return this._getCachedCompiledPatterns(grammar).compileAG(grammar, allowA, allowG);
    }
    _getCachedCompiledPatterns(grammar) {
        if (!this._cachedCompiledPatterns) {
            this._cachedCompiledPatterns = new RegExpSourceList();
            for (const pattern of this.patterns) {
                const rule = grammar.getRule(pattern);
                rule.collectPatterns(grammar, this._cachedCompiledPatterns);
            }
        }
        return this._cachedCompiledPatterns;
    }
    compileWhile(grammar, endRegexSource) {
        return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compile(grammar);
    }
    compileWhileAG(grammar, endRegexSource, allowA, allowG) {
        return this._getCachedCompiledWhilePatterns(grammar, endRegexSource).compileAG(grammar, allowA, allowG);
    }
    _getCachedCompiledWhilePatterns(grammar, endRegexSource) {
        if (!this._cachedCompiledWhilePatterns) {
            this._cachedCompiledWhilePatterns = new RegExpSourceList();
            this._cachedCompiledWhilePatterns.push(this._while.hasBackReferences ? this._while.clone() : this._while);
        }
        if (this._while.hasBackReferences) {
            this._cachedCompiledWhilePatterns.setSource(0, endRegexSource ? endRegexSource : '\uFFFF');
        }
        return this._cachedCompiledWhilePatterns;
    }
}
exports.BeginWhileRule = BeginWhileRule;
class RuleFactory {
    static createCaptureRule(helper, $location, name, contentName, retokenizeCapturedWithRuleId) {
        return helper.registerRule((id) => {
            return new CaptureRule($location, id, name, contentName, retokenizeCapturedWithRuleId);
        });
    }
    static getCompiledRuleId(desc, helper, repository) {
        if (!desc.id) {
            helper.registerRule((id) => {
                desc.id = id;
                if (desc.match) {
                    return new MatchRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.match, RuleFactory._compileCaptures(desc.captures, helper, repository));
                }
                if (typeof desc.begin === 'undefined') {
                    if (desc.repository) {
                        repository = (0, utils_1.mergeObjects)({}, repository, desc.repository);
                    }
                    let patterns = desc.patterns;
                    if (typeof patterns === 'undefined' && desc.include) {
                        patterns = [{ include: desc.include }];
                    }
                    return new IncludeOnlyRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, RuleFactory._compilePatterns(patterns, helper, repository));
                }
                if (desc.while) {
                    return new BeginWhileRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, desc.begin, RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository), desc.while, RuleFactory._compileCaptures(desc.whileCaptures || desc.captures, helper, repository), RuleFactory._compilePatterns(desc.patterns, helper, repository));
                }
                return new BeginEndRule(desc.$vscodeTextmateLocation, desc.id, desc.name, desc.contentName, desc.begin, RuleFactory._compileCaptures(desc.beginCaptures || desc.captures, helper, repository), desc.end, RuleFactory._compileCaptures(desc.endCaptures || desc.captures, helper, repository), desc.applyEndPatternLast, RuleFactory._compilePatterns(desc.patterns, helper, repository));
            });
        }
        return desc.id;
    }
    static _compileCaptures(captures, helper, repository) {
        let r = [];
        if (captures) {
            // Find the maximum capture id
            let maximumCaptureId = 0;
            for (const captureId in captures) {
                if (captureId === '$vscodeTextmateLocation') {
                    continue;
                }
                const numericCaptureId = parseInt(captureId, 10);
                if (numericCaptureId > maximumCaptureId) {
                    maximumCaptureId = numericCaptureId;
                }
            }
            // Initialize result
            for (let i = 0; i <= maximumCaptureId; i++) {
                r[i] = null;
            }
            // Fill out result
            for (const captureId in captures) {
                if (captureId === '$vscodeTextmateLocation') {
                    continue;
                }
                const numericCaptureId = parseInt(captureId, 10);
                let retokenizeCapturedWithRuleId = 0;
                if (captures[captureId].patterns) {
                    retokenizeCapturedWithRuleId = RuleFactory.getCompiledRuleId(captures[captureId], helper, repository);
                }
                r[numericCaptureId] = RuleFactory.createCaptureRule(helper, captures[captureId].$vscodeTextmateLocation, captures[captureId].name, captures[captureId].contentName, retokenizeCapturedWithRuleId);
            }
        }
        return r;
    }
    static _compilePatterns(patterns, helper, repository) {
        let r = [];
        if (patterns) {
            for (let i = 0, len = patterns.length; i < len; i++) {
                const pattern = patterns[i];
                let ruleId = -1;
                if (pattern.include) {
                    const reference = (0, grammarDependencies_1.parseInclude)(pattern.include);
                    switch (reference.kind) {
                        case 0 /* IncludeReferenceKind.Base */:
                        case 1 /* IncludeReferenceKind.Self */:
                            ruleId = RuleFactory.getCompiledRuleId(repository[pattern.include], helper, repository);
                            break;
                        case 2 /* IncludeReferenceKind.RelativeReference */:
                            // Local include found in `repository`
                            let localIncludedRule = repository[reference.ruleName];
                            if (localIncludedRule) {
                                ruleId = RuleFactory.getCompiledRuleId(localIncludedRule, helper, repository);
                            }
                            else {
                                // console.warn('CANNOT find rule for scopeName: ' + pattern.include + ', I am: ', repository['$base'].name);
                            }
                            break;
                        case 3 /* IncludeReferenceKind.TopLevelReference */:
                        case 4 /* IncludeReferenceKind.TopLevelRepositoryReference */:
                            const externalGrammarName = reference.scopeName;
                            const externalGrammarInclude = reference.kind === 4 /* IncludeReferenceKind.TopLevelRepositoryReference */
                                ? reference.ruleName
                                : null;
                            // External include
                            const externalGrammar = helper.getExternalGrammar(externalGrammarName, repository);
                            if (externalGrammar) {
                                if (externalGrammarInclude) {
                                    let externalIncludedRule = externalGrammar.repository[externalGrammarInclude];
                                    if (externalIncludedRule) {
                                        ruleId = RuleFactory.getCompiledRuleId(externalIncludedRule, helper, externalGrammar.repository);
                                    }
                                    else {
                                        // console.warn('CANNOT find rule for scopeName: ' + pattern.include + ', I am: ', repository['$base'].name);
                                    }
                                }
                                else {
                                    ruleId = RuleFactory.getCompiledRuleId(externalGrammar.repository.$self, helper, externalGrammar.repository);
                                }
                            }
                            else {
                                // console.warn('CANNOT find grammar for scopeName: ' + pattern.include + ', I am: ', repository['$base'].name);
                            }
                            break;
                    }
                }
                else {
                    ruleId = RuleFactory.getCompiledRuleId(pattern, helper, repository);
                }
                if (ruleId !== -1) {
                    const rule = helper.getRule(ruleId);
                    let skipRule = false;
                    if (rule instanceof IncludeOnlyRule || rule instanceof BeginEndRule || rule instanceof BeginWhileRule) {
                        if (rule.hasMissingPatterns && rule.patterns.length === 0) {
                            skipRule = true;
                        }
                    }
                    if (skipRule) {
                        // console.log('REMOVING RULE ENTIRELY DUE TO EMPTY PATTERNS THAT ARE MISSING');
                        continue;
                    }
                    r.push(ruleId);
                }
            }
        }
        return {
            patterns: r,
            hasMissingPatterns: ((patterns ? patterns.length : 0) !== r.length)
        };
    }
}
exports.RuleFactory = RuleFactory;
class RegExpSource {
    source;
    ruleId;
    hasAnchor;
    hasBackReferences;
    _anchorCache;
    constructor(regExpSource, ruleId) {
        if (regExpSource) {
            const len = regExpSource.length;
            let lastPushedPos = 0;
            let output = [];
            let hasAnchor = false;
            for (let pos = 0; pos < len; pos++) {
                const ch = regExpSource.charAt(pos);
                if (ch === '\\') {
                    if (pos + 1 < len) {
                        const nextCh = regExpSource.charAt(pos + 1);
                        if (nextCh === 'z') {
                            output.push(regExpSource.substring(lastPushedPos, pos));
                            output.push('$(?!\\n)(?<!\\n)');
                            lastPushedPos = pos + 2;
                        }
                        else if (nextCh === 'A' || nextCh === 'G') {
                            hasAnchor = true;
                        }
                        pos++;
                    }
                }
            }
            this.hasAnchor = hasAnchor;
            if (lastPushedPos === 0) {
                // No \z hit
                this.source = regExpSource;
            }
            else {
                output.push(regExpSource.substring(lastPushedPos, len));
                this.source = output.join('');
            }
        }
        else {
            this.hasAnchor = false;
            this.source = regExpSource;
        }
        if (this.hasAnchor) {
            this._anchorCache = this._buildAnchorCache();
        }
        else {
            this._anchorCache = null;
        }
        this.ruleId = ruleId;
        this.hasBackReferences = HAS_BACK_REFERENCES.test(this.source);
        // console.log('input: ' + regExpSource + ' => ' + this.source + ', ' + this.hasAnchor);
    }
    clone() {
        return new RegExpSource(this.source, this.ruleId);
    }
    setSource(newSource) {
        if (this.source === newSource) {
            return;
        }
        this.source = newSource;
        if (this.hasAnchor) {
            this._anchorCache = this._buildAnchorCache();
        }
    }
    resolveBackReferences(lineText, captureIndices) {
        let capturedValues = captureIndices.map((capture) => {
            return lineText.substring(capture.start, capture.end);
        });
        BACK_REFERENCING_END.lastIndex = 0;
        return this.source.replace(BACK_REFERENCING_END, (match, g1) => {
            return (0, utils_1.escapeRegExpCharacters)(capturedValues[parseInt(g1, 10)] || '');
        });
    }
    _buildAnchorCache() {
        let A0_G0_result = [];
        let A0_G1_result = [];
        let A1_G0_result = [];
        let A1_G1_result = [];
        let pos, len, ch, nextCh;
        for (pos = 0, len = this.source.length; pos < len; pos++) {
            ch = this.source.charAt(pos);
            A0_G0_result[pos] = ch;
            A0_G1_result[pos] = ch;
            A1_G0_result[pos] = ch;
            A1_G1_result[pos] = ch;
            if (ch === '\\') {
                if (pos + 1 < len) {
                    nextCh = this.source.charAt(pos + 1);
                    if (nextCh === 'A') {
                        A0_G0_result[pos + 1] = '\uFFFF';
                        A0_G1_result[pos + 1] = '\uFFFF';
                        A1_G0_result[pos + 1] = 'A';
                        A1_G1_result[pos + 1] = 'A';
                    }
                    else if (nextCh === 'G') {
                        A0_G0_result[pos + 1] = '\uFFFF';
                        A0_G1_result[pos + 1] = 'G';
                        A1_G0_result[pos + 1] = '\uFFFF';
                        A1_G1_result[pos + 1] = 'G';
                    }
                    else {
                        A0_G0_result[pos + 1] = nextCh;
                        A0_G1_result[pos + 1] = nextCh;
                        A1_G0_result[pos + 1] = nextCh;
                        A1_G1_result[pos + 1] = nextCh;
                    }
                    pos++;
                }
            }
        }
        return {
            A0_G0: A0_G0_result.join(''),
            A0_G1: A0_G1_result.join(''),
            A1_G0: A1_G0_result.join(''),
            A1_G1: A1_G1_result.join('')
        };
    }
    resolveAnchors(allowA, allowG) {
        if (!this.hasAnchor || !this._anchorCache) {
            return this.source;
        }
        if (allowA) {
            if (allowG) {
                return this._anchorCache.A1_G1;
            }
            else {
                return this._anchorCache.A1_G0;
            }
        }
        else {
            if (allowG) {
                return this._anchorCache.A0_G1;
            }
            else {
                return this._anchorCache.A0_G0;
            }
        }
    }
}
exports.RegExpSource = RegExpSource;
class RegExpSourceList {
    _items;
    _hasAnchors;
    _cached;
    _anchorCache;
    constructor() {
        this._items = [];
        this._hasAnchors = false;
        this._cached = null;
        this._anchorCache = {
            A0_G0: null,
            A0_G1: null,
            A1_G0: null,
            A1_G1: null
        };
    }
    dispose() {
        this._disposeCaches();
    }
    _disposeCaches() {
        if (this._cached) {
            this._cached.dispose();
            this._cached = null;
        }
        if (this._anchorCache.A0_G0) {
            this._anchorCache.A0_G0.dispose();
            this._anchorCache.A0_G0 = null;
        }
        if (this._anchorCache.A0_G1) {
            this._anchorCache.A0_G1.dispose();
            this._anchorCache.A0_G1 = null;
        }
        if (this._anchorCache.A1_G0) {
            this._anchorCache.A1_G0.dispose();
            this._anchorCache.A1_G0 = null;
        }
        if (this._anchorCache.A1_G1) {
            this._anchorCache.A1_G1.dispose();
            this._anchorCache.A1_G1 = null;
        }
    }
    push(item) {
        this._items.push(item);
        this._hasAnchors = this._hasAnchors || item.hasAnchor;
    }
    unshift(item) {
        this._items.unshift(item);
        this._hasAnchors = this._hasAnchors || item.hasAnchor;
    }
    length() {
        return this._items.length;
    }
    setSource(index, newSource) {
        if (this._items[index].source !== newSource) {
            // bust the cache
            this._disposeCaches();
            this._items[index].setSource(newSource);
        }
    }
    compile(onigLib) {
        if (!this._cached) {
            let regExps = this._items.map(e => e.source);
            this._cached = new CompiledRule(onigLib, regExps, this._items.map(e => e.ruleId));
        }
        return this._cached;
    }
    compileAG(onigLib, allowA, allowG) {
        if (!this._hasAnchors) {
            return this.compile(onigLib);
        }
        else {
            if (allowA) {
                if (allowG) {
                    if (!this._anchorCache.A1_G1) {
                        this._anchorCache.A1_G1 = this._resolveAnchors(onigLib, allowA, allowG);
                    }
                    return this._anchorCache.A1_G1;
                }
                else {
                    if (!this._anchorCache.A1_G0) {
                        this._anchorCache.A1_G0 = this._resolveAnchors(onigLib, allowA, allowG);
                    }
                    return this._anchorCache.A1_G0;
                }
            }
            else {
                if (allowG) {
                    if (!this._anchorCache.A0_G1) {
                        this._anchorCache.A0_G1 = this._resolveAnchors(onigLib, allowA, allowG);
                    }
                    return this._anchorCache.A0_G1;
                }
                else {
                    if (!this._anchorCache.A0_G0) {
                        this._anchorCache.A0_G0 = this._resolveAnchors(onigLib, allowA, allowG);
                    }
                    return this._anchorCache.A0_G0;
                }
            }
        }
    }
    _resolveAnchors(onigLib, allowA, allowG) {
        let regExps = this._items.map(e => e.resolveAnchors(allowA, allowG));
        return new CompiledRule(onigLib, regExps, this._items.map(e => e.ruleId));
    }
}
exports.RegExpSourceList = RegExpSourceList;
class CompiledRule {
    regExps;
    rules;
    scanner;
    constructor(onigLib, regExps, rules) {
        this.regExps = regExps;
        this.rules = rules;
        this.scanner = onigLib.createOnigScanner(regExps);
    }
    dispose() {
        if (typeof this.scanner.dispose === "function") {
            this.scanner.dispose();
        }
    }
    toString() {
        const r = [];
        for (let i = 0, len = this.rules.length; i < len; i++) {
            r.push("   - " + this.rules[i] + ": " + this.regExps[i]);
        }
        return r.join("\n");
    }
    findNextMatchSync(string, startPosition, options) {
        const result = this.scanner.findNextMatchSync(string, startPosition, options);
        if (!result) {
            return null;
        }
        return {
            ruleId: this.rules[result.index],
            captureIndices: result.captureIndices,
        };
    }
}
exports.CompiledRule = CompiledRule;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.performanceNow = exports.CachedFn = exports.escapeRegExpCharacters = exports.isValidHexColor = exports.strArrCmp = exports.strcmp = exports.RegexSource = exports.basename = exports.mergeObjects = exports.clone = void 0;
function clone(something) {
    return doClone(something);
}
exports.clone = clone;
function doClone(something) {
    if (Array.isArray(something)) {
        return cloneArray(something);
    }
    if (typeof something === 'object') {
        return cloneObj(something);
    }
    return something;
}
function cloneArray(arr) {
    let r = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        r[i] = doClone(arr[i]);
    }
    return r;
}
function cloneObj(obj) {
    let r = {};
    for (let key in obj) {
        r[key] = doClone(obj[key]);
    }
    return r;
}
function mergeObjects(target, ...sources) {
    sources.forEach(source => {
        for (let key in source) {
            target[key] = source[key];
        }
    });
    return target;
}
exports.mergeObjects = mergeObjects;
function basename(path) {
    const idx = ~path.lastIndexOf('/') || ~path.lastIndexOf('\\');
    if (idx === 0) {
        return path;
    }
    else if (~idx === path.length - 1) {
        return basename(path.substring(0, path.length - 1));
    }
    else {
        return path.substr(~idx + 1);
    }
}
exports.basename = basename;
let CAPTURING_REGEX_SOURCE = /\$(\d+)|\${(\d+):\/(downcase|upcase)}/g;
class RegexSource {
    static hasCaptures(regexSource) {
        if (regexSource === null) {
            return false;
        }
        CAPTURING_REGEX_SOURCE.lastIndex = 0;
        return CAPTURING_REGEX_SOURCE.test(regexSource);
    }
    static replaceCaptures(regexSource, captureSource, captureIndices) {
        return regexSource.replace(CAPTURING_REGEX_SOURCE, (match, index, commandIndex, command) => {
            let capture = captureIndices[parseInt(index || commandIndex, 10)];
            if (capture) {
                let result = captureSource.substring(capture.start, capture.end);
                // Remove leading dots that would make the selector invalid
                while (result[0] === '.') {
                    result = result.substring(1);
                }
                switch (command) {
                    case 'downcase':
                        return result.toLowerCase();
                    case 'upcase':
                        return result.toUpperCase();
                    default:
                        return result;
                }
            }
            else {
                return match;
            }
        });
    }
}
exports.RegexSource = RegexSource;
function strcmp(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
exports.strcmp = strcmp;
function strArrCmp(a, b) {
    if (a === null && b === null) {
        return 0;
    }
    if (!a) {
        return -1;
    }
    if (!b) {
        return 1;
    }
    let len1 = a.length;
    let len2 = b.length;
    if (len1 === len2) {
        for (let i = 0; i < len1; i++) {
            let res = strcmp(a[i], b[i]);
            if (res !== 0) {
                return res;
            }
        }
        return 0;
    }
    return len1 - len2;
}
exports.strArrCmp = strArrCmp;
function isValidHexColor(hex) {
    if (/^#[0-9a-f]{6}$/i.test(hex)) {
        // #rrggbb
        return true;
    }
    if (/^#[0-9a-f]{8}$/i.test(hex)) {
        // #rrggbbaa
        return true;
    }
    if (/^#[0-9a-f]{3}$/i.test(hex)) {
        // #rgb
        return true;
    }
    if (/^#[0-9a-f]{4}$/i.test(hex)) {
        // #rgba
        return true;
    }
    return false;
}
exports.isValidHexColor = isValidHexColor;
/**
 * Escapes regular expression characters in a given string
 */
function escapeRegExpCharacters(value) {
    return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&');
}
exports.escapeRegExpCharacters = escapeRegExpCharacters;
class CachedFn {
    fn;
    cache = new Map();
    constructor(fn) {
        this.fn = fn;
    }
    get(key) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        const value = this.fn(key);
        this.cache.set(key, value);
        return value;
    }
}
exports.CachedFn = CachedFn;
exports.performanceNow = typeof performance === "undefined"
    // performance.now() is not available in this environment, so use Date.now()
    ? function () {
        return Date.now();
    }
    : function () {
        return performance.now();
    };


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseInclude = exports.TopLevelRepositoryReference = exports.TopLevelReference = exports.RelativeReference = exports.SelfReference = exports.BaseReference = exports.ScopeDependencyProcessor = exports.ExternalReferenceCollector = exports.TopLevelRepositoryRuleReference = exports.TopLevelRuleReference = void 0;
const utils_1 = __webpack_require__(17);
/**
 * References the top level rule of a grammar with the given scope name.
*/
class TopLevelRuleReference {
    scopeName;
    constructor(scopeName) {
        this.scopeName = scopeName;
    }
    toKey() {
        return this.scopeName;
    }
}
exports.TopLevelRuleReference = TopLevelRuleReference;
/**
 * References a rule of a grammar in the top level repository section with the given name.
*/
class TopLevelRepositoryRuleReference {
    scopeName;
    ruleName;
    constructor(scopeName, ruleName) {
        this.scopeName = scopeName;
        this.ruleName = ruleName;
    }
    toKey() {
        return `${this.scopeName}#${this.ruleName}`;
    }
}
exports.TopLevelRepositoryRuleReference = TopLevelRepositoryRuleReference;
class ExternalReferenceCollector {
    _references = [];
    _seenReferenceKeys = new Set();
    get references() {
        return this._references;
    }
    visitedRule = new Set();
    add(reference) {
        const key = reference.toKey();
        if (this._seenReferenceKeys.has(key)) {
            return;
        }
        this._seenReferenceKeys.add(key);
        this._references.push(reference);
    }
}
exports.ExternalReferenceCollector = ExternalReferenceCollector;
class ScopeDependencyProcessor {
    repo;
    initialScopeName;
    seenFullScopeRequests = new Set();
    seenPartialScopeRequests = new Set();
    Q;
    constructor(repo, initialScopeName) {
        this.repo = repo;
        this.initialScopeName = initialScopeName;
        this.seenFullScopeRequests.add(this.initialScopeName);
        this.Q = [new TopLevelRuleReference(this.initialScopeName)];
    }
    processQueue() {
        const q = this.Q;
        this.Q = [];
        const deps = new ExternalReferenceCollector();
        for (const dep of q) {
            collectReferencesOfReference(dep, this.initialScopeName, this.repo, deps);
        }
        for (const dep of deps.references) {
            if (dep instanceof TopLevelRuleReference) {
                if (this.seenFullScopeRequests.has(dep.scopeName)) {
                    // already processed
                    continue;
                }
                this.seenFullScopeRequests.add(dep.scopeName);
                this.Q.push(dep);
            }
            else {
                if (this.seenFullScopeRequests.has(dep.scopeName)) {
                    // already processed in full
                    continue;
                }
                if (this.seenPartialScopeRequests.has(dep.toKey())) {
                    // already processed
                    continue;
                }
                this.seenPartialScopeRequests.add(dep.toKey());
                this.Q.push(dep);
            }
        }
    }
}
exports.ScopeDependencyProcessor = ScopeDependencyProcessor;
function collectReferencesOfReference(reference, baseGrammarScopeName, repo, result) {
    const selfGrammar = repo.lookup(reference.scopeName);
    if (!selfGrammar) {
        if (reference.scopeName === baseGrammarScopeName) {
            throw new Error(`No grammar provided for <${baseGrammarScopeName}>`);
        }
        return;
    }
    const baseGrammar = repo.lookup(baseGrammarScopeName);
    if (reference instanceof TopLevelRuleReference) {
        collectExternalReferencesInTopLevelRule({ baseGrammar, selfGrammar }, result);
    }
    else {
        collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, { baseGrammar, selfGrammar, repository: selfGrammar.repository }, result);
    }
    const injections = repo.injections(reference.scopeName);
    if (injections) {
        for (const injection of injections) {
            result.add(new TopLevelRuleReference(injection));
        }
    }
}
function collectExternalReferencesInTopLevelRepositoryRule(ruleName, context, result) {
    if (context.repository && context.repository[ruleName]) {
        const rule = context.repository[ruleName];
        collectExternalReferencesInRules([rule], context, result);
    }
}
function collectExternalReferencesInTopLevelRule(context, result) {
    if (context.selfGrammar.patterns && Array.isArray(context.selfGrammar.patterns)) {
        collectExternalReferencesInRules(context.selfGrammar.patterns, { ...context, repository: context.selfGrammar.repository }, result);
    }
    if (context.selfGrammar.injections) {
        collectExternalReferencesInRules(Object.values(context.selfGrammar.injections), { ...context, repository: context.selfGrammar.repository }, result);
    }
}
function collectExternalReferencesInRules(rules, context, result) {
    for (const rule of rules) {
        if (result.visitedRule.has(rule)) {
            continue;
        }
        result.visitedRule.add(rule);
        const patternRepository = rule.repository ? (0, utils_1.mergeObjects)({}, context.repository, rule.repository) : context.repository;
        if (Array.isArray(rule.patterns)) {
            collectExternalReferencesInRules(rule.patterns, { ...context, repository: patternRepository }, result);
        }
        const include = rule.include;
        if (!include) {
            continue;
        }
        const reference = parseInclude(include);
        switch (reference.kind) {
            case 0 /* IncludeReferenceKind.Base */:
                collectExternalReferencesInTopLevelRule({ ...context, selfGrammar: context.baseGrammar }, result);
                break;
            case 1 /* IncludeReferenceKind.Self */:
                collectExternalReferencesInTopLevelRule(context, result);
                break;
            case 2 /* IncludeReferenceKind.RelativeReference */:
                collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, { ...context, repository: patternRepository }, result);
                break;
            case 3 /* IncludeReferenceKind.TopLevelReference */:
            case 4 /* IncludeReferenceKind.TopLevelRepositoryReference */:
                const selfGrammar = reference.scopeName === context.selfGrammar.scopeName
                    ? context.selfGrammar
                    : reference.scopeName === context.baseGrammar.scopeName
                        ? context.baseGrammar
                        : undefined;
                if (selfGrammar) {
                    const newContext = { baseGrammar: context.baseGrammar, selfGrammar, repository: patternRepository };
                    if (reference.kind === 4 /* IncludeReferenceKind.TopLevelRepositoryReference */) {
                        collectExternalReferencesInTopLevelRepositoryRule(reference.ruleName, newContext, result);
                    }
                    else {
                        collectExternalReferencesInTopLevelRule(newContext, result);
                    }
                }
                else {
                    if (reference.kind === 4 /* IncludeReferenceKind.TopLevelRepositoryReference */) {
                        result.add(new TopLevelRepositoryRuleReference(reference.scopeName, reference.ruleName));
                    }
                    else {
                        result.add(new TopLevelRuleReference(reference.scopeName));
                    }
                }
                break;
        }
    }
}
class BaseReference {
    kind = 0 /* IncludeReferenceKind.Base */;
}
exports.BaseReference = BaseReference;
class SelfReference {
    kind = 1 /* IncludeReferenceKind.Self */;
}
exports.SelfReference = SelfReference;
class RelativeReference {
    ruleName;
    kind = 2 /* IncludeReferenceKind.RelativeReference */;
    constructor(ruleName) {
        this.ruleName = ruleName;
    }
}
exports.RelativeReference = RelativeReference;
class TopLevelReference {
    scopeName;
    kind = 3 /* IncludeReferenceKind.TopLevelReference */;
    constructor(scopeName) {
        this.scopeName = scopeName;
    }
}
exports.TopLevelReference = TopLevelReference;
class TopLevelRepositoryReference {
    scopeName;
    ruleName;
    kind = 4 /* IncludeReferenceKind.TopLevelRepositoryReference */;
    constructor(scopeName, ruleName) {
        this.scopeName = scopeName;
        this.ruleName = ruleName;
    }
}
exports.TopLevelRepositoryReference = TopLevelRepositoryReference;
function parseInclude(include) {
    if (include === '$base') {
        return new BaseReference();
    }
    else if (include === '$self') {
        return new SelfReference();
    }
    const indexOfSharp = include.indexOf("#");
    if (indexOfSharp === -1) {
        return new TopLevelReference(include);
    }
    else if (indexOfSharp === 0) {
        return new RelativeReference(include.substring(1));
    }
    else {
        const scopeName = include.substring(0, indexOfSharp);
        const ruleName = include.substring(indexOfSharp + 1);
        return new TopLevelRepositoryReference(scopeName, ruleName);
    }
}
exports.parseInclude = parseInclude;


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThemeTrieElement = exports.ThemeTrieElementRule = exports.ColorMap = exports.fontStyleToString = exports.ParsedThemeRule = exports.parseTheme = exports.StyleAttributes = exports.ScopeStack = exports.Theme = void 0;
const utils_1 = __webpack_require__(17);
class Theme {
    _colorMap;
    _defaults;
    _root;
    static createFromRawTheme(source, colorMap) {
        return this.createFromParsedTheme(parseTheme(source), colorMap);
    }
    static createFromParsedTheme(source, colorMap) {
        return resolveParsedThemeRules(source, colorMap);
    }
    _cachedMatchRoot = new utils_1.CachedFn((scopeName) => this._root.match(scopeName));
    constructor(_colorMap, _defaults, _root) {
        this._colorMap = _colorMap;
        this._defaults = _defaults;
        this._root = _root;
    }
    getColorMap() {
        return this._colorMap.getColorMap();
    }
    getDefaults() {
        return this._defaults;
    }
    match(scopePath) {
        if (scopePath === null) {
            return this._defaults;
        }
        const scopeName = scopePath.scopeName;
        const matchingTrieElements = this._cachedMatchRoot.get(scopeName);
        const effectiveRule = matchingTrieElements.find((v) => _scopePathMatchesParentScopes(scopePath.parent, v.parentScopes));
        if (!effectiveRule) {
            return null;
        }
        return new StyleAttributes(effectiveRule.fontStyle, effectiveRule.foreground, effectiveRule.background);
    }
}
exports.Theme = Theme;
class ScopeStack {
    parent;
    scopeName;
    static push(path, scopeNames) {
        for (const name of scopeNames) {
            path = new ScopeStack(path, name);
        }
        return path;
    }
    static from(...segments) {
        let result = null;
        for (let i = 0; i < segments.length; i++) {
            result = new ScopeStack(result, segments[i]);
        }
        return result;
    }
    constructor(parent, scopeName) {
        this.parent = parent;
        this.scopeName = scopeName;
    }
    push(scopeName) {
        return new ScopeStack(this, scopeName);
    }
    getSegments() {
        let item = this;
        const result = [];
        while (item) {
            result.push(item.scopeName);
            item = item.parent;
        }
        result.reverse();
        return result;
    }
    toString() {
        return this.getSegments().join(' ');
    }
    extends(other) {
        if (this === other) {
            return true;
        }
        if (this.parent === null) {
            return false;
        }
        return this.parent.extends(other);
    }
    getExtensionIfDefined(base) {
        const result = [];
        let item = this;
        while (item && item !== base) {
            result.push(item.scopeName);
            item = item.parent;
        }
        return item === base ? result.reverse() : undefined;
    }
}
exports.ScopeStack = ScopeStack;
function _scopePathMatchesParentScopes(scopePath, parentScopes) {
    if (parentScopes === null) {
        return true;
    }
    let index = 0;
    let scopePattern = parentScopes[index];
    while (scopePath) {
        if (_matchesScope(scopePath.scopeName, scopePattern)) {
            index++;
            if (index === parentScopes.length) {
                return true;
            }
            scopePattern = parentScopes[index];
        }
        scopePath = scopePath.parent;
    }
    return false;
}
function _matchesScope(scopeName, scopePattern) {
    return scopePattern === scopeName || (scopeName.startsWith(scopePattern) && scopeName[scopePattern.length] === '.');
}
class StyleAttributes {
    fontStyle;
    foregroundId;
    backgroundId;
    constructor(fontStyle, foregroundId, backgroundId) {
        this.fontStyle = fontStyle;
        this.foregroundId = foregroundId;
        this.backgroundId = backgroundId;
    }
}
exports.StyleAttributes = StyleAttributes;
/**
 * Parse a raw theme into rules.
 */
function parseTheme(source) {
    if (!source) {
        return [];
    }
    if (!source.settings || !Array.isArray(source.settings)) {
        return [];
    }
    let settings = source.settings;
    let result = [], resultLen = 0;
    for (let i = 0, len = settings.length; i < len; i++) {
        let entry = settings[i];
        if (!entry.settings) {
            continue;
        }
        let scopes;
        if (typeof entry.scope === 'string') {
            let _scope = entry.scope;
            // remove leading commas
            _scope = _scope.replace(/^[,]+/, '');
            // remove trailing commans
            _scope = _scope.replace(/[,]+$/, '');
            scopes = _scope.split(',');
        }
        else if (Array.isArray(entry.scope)) {
            scopes = entry.scope;
        }
        else {
            scopes = [''];
        }
        let fontStyle = -1 /* FontStyle.NotSet */;
        if (typeof entry.settings.fontStyle === 'string') {
            fontStyle = 0 /* FontStyle.None */;
            let segments = entry.settings.fontStyle.split(' ');
            for (let j = 0, lenJ = segments.length; j < lenJ; j++) {
                let segment = segments[j];
                switch (segment) {
                    case 'italic':
                        fontStyle = fontStyle | 1 /* FontStyle.Italic */;
                        break;
                    case 'bold':
                        fontStyle = fontStyle | 2 /* FontStyle.Bold */;
                        break;
                    case 'underline':
                        fontStyle = fontStyle | 4 /* FontStyle.Underline */;
                        break;
                    case 'strikethrough':
                        fontStyle = fontStyle | 8 /* FontStyle.Strikethrough */;
                        break;
                }
            }
        }
        let foreground = null;
        if (typeof entry.settings.foreground === 'string' && (0, utils_1.isValidHexColor)(entry.settings.foreground)) {
            foreground = entry.settings.foreground;
        }
        let background = null;
        if (typeof entry.settings.background === 'string' && (0, utils_1.isValidHexColor)(entry.settings.background)) {
            background = entry.settings.background;
        }
        for (let j = 0, lenJ = scopes.length; j < lenJ; j++) {
            let _scope = scopes[j].trim();
            let segments = _scope.split(' ');
            let scope = segments[segments.length - 1];
            let parentScopes = null;
            if (segments.length > 1) {
                parentScopes = segments.slice(0, segments.length - 1);
                parentScopes.reverse();
            }
            result[resultLen++] = new ParsedThemeRule(scope, parentScopes, i, fontStyle, foreground, background);
        }
    }
    return result;
}
exports.parseTheme = parseTheme;
class ParsedThemeRule {
    scope;
    parentScopes;
    index;
    fontStyle;
    foreground;
    background;
    constructor(scope, parentScopes, index, fontStyle, foreground, background) {
        this.scope = scope;
        this.parentScopes = parentScopes;
        this.index = index;
        this.fontStyle = fontStyle;
        this.foreground = foreground;
        this.background = background;
    }
}
exports.ParsedThemeRule = ParsedThemeRule;
function fontStyleToString(fontStyle) {
    if (fontStyle === -1 /* FontStyle.NotSet */) {
        return 'not set';
    }
    let style = '';
    if (fontStyle & 1 /* FontStyle.Italic */) {
        style += 'italic ';
    }
    if (fontStyle & 2 /* FontStyle.Bold */) {
        style += 'bold ';
    }
    if (fontStyle & 4 /* FontStyle.Underline */) {
        style += 'underline ';
    }
    if (fontStyle & 8 /* FontStyle.Strikethrough */) {
        style += 'strikethrough ';
    }
    if (style === '') {
        style = 'none';
    }
    return style.trim();
}
exports.fontStyleToString = fontStyleToString;
/**
 * Resolve rules (i.e. inheritance).
 */
function resolveParsedThemeRules(parsedThemeRules, _colorMap) {
    // Sort rules lexicographically, and then by index if necessary
    parsedThemeRules.sort((a, b) => {
        let r = (0, utils_1.strcmp)(a.scope, b.scope);
        if (r !== 0) {
            return r;
        }
        r = (0, utils_1.strArrCmp)(a.parentScopes, b.parentScopes);
        if (r !== 0) {
            return r;
        }
        return a.index - b.index;
    });
    // Determine defaults
    let defaultFontStyle = 0 /* FontStyle.None */;
    let defaultForeground = '#000000';
    let defaultBackground = '#ffffff';
    while (parsedThemeRules.length >= 1 && parsedThemeRules[0].scope === '') {
        let incomingDefaults = parsedThemeRules.shift();
        if (incomingDefaults.fontStyle !== -1 /* FontStyle.NotSet */) {
            defaultFontStyle = incomingDefaults.fontStyle;
        }
        if (incomingDefaults.foreground !== null) {
            defaultForeground = incomingDefaults.foreground;
        }
        if (incomingDefaults.background !== null) {
            defaultBackground = incomingDefaults.background;
        }
    }
    let colorMap = new ColorMap(_colorMap);
    let defaults = new StyleAttributes(defaultFontStyle, colorMap.getId(defaultForeground), colorMap.getId(defaultBackground));
    let root = new ThemeTrieElement(new ThemeTrieElementRule(0, null, -1 /* FontStyle.NotSet */, 0, 0), []);
    for (let i = 0, len = parsedThemeRules.length; i < len; i++) {
        let rule = parsedThemeRules[i];
        root.insert(0, rule.scope, rule.parentScopes, rule.fontStyle, colorMap.getId(rule.foreground), colorMap.getId(rule.background));
    }
    return new Theme(colorMap, defaults, root);
}
class ColorMap {
    _isFrozen;
    _lastColorId;
    _id2color;
    _color2id;
    constructor(_colorMap) {
        this._lastColorId = 0;
        this._id2color = [];
        this._color2id = Object.create(null);
        if (Array.isArray(_colorMap)) {
            this._isFrozen = true;
            for (let i = 0, len = _colorMap.length; i < len; i++) {
                this._color2id[_colorMap[i]] = i;
                this._id2color[i] = _colorMap[i];
            }
        }
        else {
            this._isFrozen = false;
        }
    }
    getId(color) {
        if (color === null) {
            return 0;
        }
        color = color.toUpperCase();
        let value = this._color2id[color];
        if (value) {
            return value;
        }
        if (this._isFrozen) {
            throw new Error(`Missing color in color map - ${color}`);
        }
        value = ++this._lastColorId;
        this._color2id[color] = value;
        this._id2color[value] = color;
        return value;
    }
    getColorMap() {
        return this._id2color.slice(0);
    }
}
exports.ColorMap = ColorMap;
class ThemeTrieElementRule {
    scopeDepth;
    parentScopes;
    fontStyle;
    foreground;
    background;
    constructor(scopeDepth, parentScopes, fontStyle, foreground, background) {
        this.scopeDepth = scopeDepth;
        this.parentScopes = parentScopes;
        this.fontStyle = fontStyle;
        this.foreground = foreground;
        this.background = background;
    }
    clone() {
        return new ThemeTrieElementRule(this.scopeDepth, this.parentScopes, this.fontStyle, this.foreground, this.background);
    }
    static cloneArr(arr) {
        let r = [];
        for (let i = 0, len = arr.length; i < len; i++) {
            r[i] = arr[i].clone();
        }
        return r;
    }
    acceptOverwrite(scopeDepth, fontStyle, foreground, background) {
        if (this.scopeDepth > scopeDepth) {
            console.log('how did this happen?');
        }
        else {
            this.scopeDepth = scopeDepth;
        }
        // console.log('TODO -> my depth: ' + this.scopeDepth + ', overwriting depth: ' + scopeDepth);
        if (fontStyle !== -1 /* FontStyle.NotSet */) {
            this.fontStyle = fontStyle;
        }
        if (foreground !== 0) {
            this.foreground = foreground;
        }
        if (background !== 0) {
            this.background = background;
        }
    }
}
exports.ThemeTrieElementRule = ThemeTrieElementRule;
class ThemeTrieElement {
    _mainRule;
    _children;
    _rulesWithParentScopes;
    constructor(_mainRule, rulesWithParentScopes = [], _children = {}) {
        this._mainRule = _mainRule;
        this._children = _children;
        this._rulesWithParentScopes = rulesWithParentScopes;
    }
    static _sortBySpecificity(arr) {
        if (arr.length === 1) {
            return arr;
        }
        arr.sort(this._cmpBySpecificity);
        return arr;
    }
    static _cmpBySpecificity(a, b) {
        if (a.scopeDepth === b.scopeDepth) {
            const aParentScopes = a.parentScopes;
            const bParentScopes = b.parentScopes;
            let aParentScopesLen = aParentScopes === null ? 0 : aParentScopes.length;
            let bParentScopesLen = bParentScopes === null ? 0 : bParentScopes.length;
            if (aParentScopesLen === bParentScopesLen) {
                for (let i = 0; i < aParentScopesLen; i++) {
                    const aLen = aParentScopes[i].length;
                    const bLen = bParentScopes[i].length;
                    if (aLen !== bLen) {
                        return bLen - aLen;
                    }
                }
            }
            return bParentScopesLen - aParentScopesLen;
        }
        return b.scopeDepth - a.scopeDepth;
    }
    match(scope) {
        if (scope === '') {
            return ThemeTrieElement._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
        }
        let dotIndex = scope.indexOf('.');
        let head;
        let tail;
        if (dotIndex === -1) {
            head = scope;
            tail = '';
        }
        else {
            head = scope.substring(0, dotIndex);
            tail = scope.substring(dotIndex + 1);
        }
        if (this._children.hasOwnProperty(head)) {
            return this._children[head].match(tail);
        }
        return ThemeTrieElement._sortBySpecificity([].concat(this._mainRule).concat(this._rulesWithParentScopes));
    }
    insert(scopeDepth, scope, parentScopes, fontStyle, foreground, background) {
        if (scope === '') {
            this._doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background);
            return;
        }
        let dotIndex = scope.indexOf('.');
        let head;
        let tail;
        if (dotIndex === -1) {
            head = scope;
            tail = '';
        }
        else {
            head = scope.substring(0, dotIndex);
            tail = scope.substring(dotIndex + 1);
        }
        let child;
        if (this._children.hasOwnProperty(head)) {
            child = this._children[head];
        }
        else {
            child = new ThemeTrieElement(this._mainRule.clone(), ThemeTrieElementRule.cloneArr(this._rulesWithParentScopes));
            this._children[head] = child;
        }
        child.insert(scopeDepth + 1, tail, parentScopes, fontStyle, foreground, background);
    }
    _doInsertHere(scopeDepth, parentScopes, fontStyle, foreground, background) {
        if (parentScopes === null) {
            // Merge into the main rule
            this._mainRule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
            return;
        }
        // Try to merge into existing rule
        for (let i = 0, len = this._rulesWithParentScopes.length; i < len; i++) {
            let rule = this._rulesWithParentScopes[i];
            if ((0, utils_1.strArrCmp)(rule.parentScopes, parentScopes) === 0) {
                // bingo! => we get to merge this into an existing one
                rule.acceptOverwrite(scopeDepth, fontStyle, foreground, background);
                return;
            }
        }
        // Must add a new rule
        // Inherit from main rule
        if (fontStyle === -1 /* FontStyle.NotSet */) {
            fontStyle = this._mainRule.fontStyle;
        }
        if (foreground === 0) {
            foreground = this._mainRule.foreground;
        }
        if (background === 0) {
            background = this._mainRule.background;
        }
        this._rulesWithParentScopes.push(new ThemeTrieElementRule(scopeDepth, parentScopes, fontStyle, foreground, background));
    }
}
exports.ThemeTrieElement = ThemeTrieElement;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BasicScopeAttributesProvider = exports.BasicScopeAttributes = void 0;
const utils_1 = __webpack_require__(17);
class BasicScopeAttributes {
    languageId;
    tokenType;
    constructor(languageId, tokenType) {
        this.languageId = languageId;
        this.tokenType = tokenType;
    }
}
exports.BasicScopeAttributes = BasicScopeAttributes;
class BasicScopeAttributesProvider {
    _defaultAttributes;
    _embeddedLanguagesMatcher;
    constructor(initialLanguageId, embeddedLanguages) {
        this._defaultAttributes = new BasicScopeAttributes(initialLanguageId, 8 /* OptionalStandardTokenType.NotSet */);
        this._embeddedLanguagesMatcher = new ScopeMatcher(Object.entries(embeddedLanguages || {}));
    }
    getDefaultAttributes() {
        return this._defaultAttributes;
    }
    getBasicScopeAttributes(scopeName) {
        if (scopeName === null) {
            return BasicScopeAttributesProvider._NULL_SCOPE_METADATA;
        }
        return this._getBasicScopeAttributes.get(scopeName);
    }
    static _NULL_SCOPE_METADATA = new BasicScopeAttributes(0, 0);
    _getBasicScopeAttributes = new utils_1.CachedFn((scopeName) => {
        const languageId = this._scopeToLanguage(scopeName);
        const standardTokenType = this._toStandardTokenType(scopeName);
        return new BasicScopeAttributes(languageId, standardTokenType);
    });
    /**
     * Given a produced TM scope, return the language that token describes or null if unknown.
     * e.g. source.html => html, source.css.embedded.html => css, punctuation.definition.tag.html => null
     */
    _scopeToLanguage(scope) {
        return this._embeddedLanguagesMatcher.match(scope) || 0;
    }
    _toStandardTokenType(scopeName) {
        const m = scopeName.match(BasicScopeAttributesProvider.STANDARD_TOKEN_TYPE_REGEXP);
        if (!m) {
            return 8 /* OptionalStandardTokenType.NotSet */;
        }
        switch (m[1]) {
            case "comment":
                return 1 /* OptionalStandardTokenType.Comment */;
            case "string":
                return 2 /* OptionalStandardTokenType.String */;
            case "regex":
                return 3 /* OptionalStandardTokenType.RegEx */;
            case "meta.embedded":
                return 0 /* OptionalStandardTokenType.Other */;
        }
        throw new Error("Unexpected match for standard token type!");
    }
    static STANDARD_TOKEN_TYPE_REGEXP = /\b(comment|string|regex|meta\.embedded)\b/;
}
exports.BasicScopeAttributesProvider = BasicScopeAttributesProvider;
class ScopeMatcher {
    values;
    scopesRegExp;
    constructor(values) {
        if (values.length === 0) {
            this.values = null;
            this.scopesRegExp = null;
        }
        else {
            this.values = new Map(values);
            // create the regex
            const escapedScopes = values.map(([scopeName, value]) => (0, utils_1.escapeRegExpCharacters)(scopeName));
            escapedScopes.sort();
            escapedScopes.reverse(); // Longest scope first
            this.scopesRegExp = new RegExp(`^((${escapedScopes.join(")|(")}))($|\\.)`, "");
        }
    }
    match(scope) {
        if (!this.scopesRegExp) {
            return undefined;
        }
        const m = scope.match(this.scopesRegExp);
        if (!m) {
            // no scopes matched
            return undefined;
        }
        return this.values.get(m[1]);
    }
}


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStackElement = exports._tokenizeString = void 0;
const debug_1 = __webpack_require__(12);
const onigLib_1 = __webpack_require__(15);
const rule_1 = __webpack_require__(16);
const utils_1 = __webpack_require__(17);
class TokenizeStringResult {
    stack;
    stoppedEarly;
    constructor(stack, stoppedEarly) {
        this.stack = stack;
        this.stoppedEarly = stoppedEarly;
    }
}
/**
 * Tokenize a string
 * @param grammar
 * @param lineText
 * @param isFirstLine
 * @param linePos
 * @param stack
 * @param lineTokens
 * @param checkWhileConditions
 * @param timeLimit Use `0` to indicate no time limit
 * @returns the StackElement or StackElement.TIME_LIMIT_REACHED if the time limit has been reached
 */
function _tokenizeString(grammar, lineText, isFirstLine, linePos, stack, lineTokens, checkWhileConditions, timeLimit) {
    const lineLength = lineText.content.length;
    let STOP = false;
    let anchorPosition = -1;
    if (checkWhileConditions) {
        const whileCheckResult = _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens);
        stack = whileCheckResult.stack;
        linePos = whileCheckResult.linePos;
        isFirstLine = whileCheckResult.isFirstLine;
        anchorPosition = whileCheckResult.anchorPosition;
    }
    const startTime = Date.now();
    while (!STOP) {
        if (timeLimit !== 0) {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime > timeLimit) {
                return new TokenizeStringResult(stack, true);
            }
        }
        scanNext(); // potentially modifies linePos && anchorPosition
    }
    return new TokenizeStringResult(stack, false);
    function scanNext() {
        if (debug_1.DebugFlags.InDebugMode) {
            console.log("");
            console.log(`@@scanNext ${linePos}: |${lineText.content
                .substr(linePos)
                .replace(/\n$/, "\\n")}|`);
        }
        const r = matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
        // @ts-ignore
        grammar.rules.push(r);
        if (!r) {
            if (debug_1.DebugFlags.InDebugMode) {
                console.log("  no more matches.");
            }
            // No match
            lineTokens.produce(stack, lineLength);
            STOP = true;
            return;
        }
        const captureIndices = r.captureIndices;
        const matchedRuleId = r.matchedRuleId;
        const hasAdvanced = captureIndices && captureIndices.length > 0
            ? captureIndices[0].end > linePos
            : false;
        if (matchedRuleId === rule_1.endRuleId) {
            // We matched the `end` for this rule => pop it
            const poppedRule = stack.getRule(grammar);
            if (debug_1.DebugFlags.InDebugMode) {
                console.log("  popping " +
                    poppedRule.debugName +
                    " - " +
                    poppedRule.debugEndRegExp);
            }
            lineTokens.produce(stack, captureIndices[0].start);
            stack = stack.withContentNameScopesList(stack.nameScopesList);
            handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, poppedRule.endCaptures, captureIndices);
            lineTokens.produce(stack, captureIndices[0].end);
            // pop
            const popped = stack;
            stack = stack.parent;
            anchorPosition = popped.getAnchorPos();
            if (!hasAdvanced && popped.getEnterPos() === linePos) {
                // Grammar pushed & popped a rule without advancing
                if (debug_1.DebugFlags.InDebugMode) {
                    console.error("[1] - Grammar is in an endless loop - Grammar pushed & popped a rule without advancing");
                }
                // See https://github.com/Microsoft/vscode-textmate/issues/12
                // Let's assume this was a mistake by the grammar author and the intent was to continue in this state
                stack = popped;
                lineTokens.produce(stack, lineLength);
                STOP = true;
                return;
            }
        }
        else {
            // We matched a rule!
            const _rule = grammar.getRule(matchedRuleId);
            lineTokens.produce(stack, captureIndices[0].start);
            const beforePush = stack;
            // push it on the stack rule
            const scopeName = _rule.getName(lineText.content, captureIndices);
            const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
            stack = stack.push(matchedRuleId, linePos, anchorPosition, captureIndices[0].end === lineLength, null, nameScopesList, nameScopesList);
            if (_rule instanceof rule_1.BeginEndRule) {
                const pushedRule = _rule;
                if (debug_1.DebugFlags.InDebugMode) {
                    console.log("  pushing " +
                        pushedRule.debugName +
                        " - " +
                        pushedRule.debugBeginRegExp);
                }
                handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, pushedRule.beginCaptures, captureIndices);
                lineTokens.produce(stack, captureIndices[0].end);
                anchorPosition = captureIndices[0].end;
                const contentName = pushedRule.getContentName(lineText.content, captureIndices);
                const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
                stack = stack.withContentNameScopesList(contentNameScopesList);
                if (pushedRule.endHasBackReferences) {
                    stack = stack.withEndRule(pushedRule.getEndWithResolvedBackReferences(lineText.content, captureIndices));
                }
                if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
                    // Grammar pushed the same rule without advancing
                    if (debug_1.DebugFlags.InDebugMode) {
                        console.error("[2] - Grammar is in an endless loop - Grammar pushed the same rule without advancing");
                    }
                    stack = stack.pop();
                    lineTokens.produce(stack, lineLength);
                    STOP = true;
                    return;
                }
            }
            else if (_rule instanceof rule_1.BeginWhileRule) {
                const pushedRule = _rule;
                if (debug_1.DebugFlags.InDebugMode) {
                    console.log("  pushing " + pushedRule.debugName);
                }
                handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, pushedRule.beginCaptures, captureIndices);
                lineTokens.produce(stack, captureIndices[0].end);
                anchorPosition = captureIndices[0].end;
                const contentName = pushedRule.getContentName(lineText.content, captureIndices);
                const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
                stack = stack.withContentNameScopesList(contentNameScopesList);
                if (pushedRule.whileHasBackReferences) {
                    stack = stack.withEndRule(pushedRule.getWhileWithResolvedBackReferences(lineText.content, captureIndices));
                }
                if (!hasAdvanced && beforePush.hasSameRuleAs(stack)) {
                    // Grammar pushed the same rule without advancing
                    if (debug_1.DebugFlags.InDebugMode) {
                        console.error("[3] - Grammar is in an endless loop - Grammar pushed the same rule without advancing");
                    }
                    stack = stack.pop();
                    lineTokens.produce(stack, lineLength);
                    STOP = true;
                    return;
                }
            }
            else {
                const matchingRule = _rule;
                if (debug_1.DebugFlags.InDebugMode) {
                    console.log("  matched " +
                        matchingRule.debugName +
                        " - " +
                        matchingRule.debugMatchRegExp);
                }
                handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, matchingRule.captures, captureIndices);
                lineTokens.produce(stack, captureIndices[0].end);
                // pop rule immediately since it is a MatchRule
                stack = stack.pop();
                if (!hasAdvanced) {
                    // Grammar is not advancing, nor is it pushing/popping
                    if (debug_1.DebugFlags.InDebugMode) {
                        console.error("[4] - Grammar is in an endless loop - Grammar is not advancing, nor is it pushing/popping");
                    }
                    stack = stack.safePop();
                    lineTokens.produce(stack, lineLength);
                    STOP = true;
                    return;
                }
            }
        }
        if (captureIndices[0].end > linePos) {
            // Advance stream
            linePos = captureIndices[0].end;
            isFirstLine = false;
        }
    }
}
exports._tokenizeString = _tokenizeString;
/**
 * Walk the stack from bottom to top, and check each while condition in this order.
 * If any fails, cut off the entire stack above the failed while condition. While conditions
 * may also advance the linePosition.
 */
function _checkWhileConditions(grammar, lineText, isFirstLine, linePos, stack, lineTokens) {
    let anchorPosition = (stack.beginRuleCapturedEOL ? 0 : -1);
    const whileRules = [];
    for (let node = stack; node; node = node.pop()) {
        const nodeRule = node.getRule(grammar);
        if (nodeRule instanceof rule_1.BeginWhileRule) {
            whileRules.push({
                rule: nodeRule,
                stack: node
            });
        }
    }
    for (let whileRule = whileRules.pop(); whileRule; whileRule = whileRules.pop()) {
        const { ruleScanner, findOptions } = prepareRuleWhileSearch(whileRule.rule, grammar, whileRule.stack.endRule, isFirstLine, linePos === anchorPosition);
        const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
        if (debug_1.DebugFlags.InDebugMode) {
            console.log('  scanning for while rule');
            console.log(ruleScanner.toString());
        }
        if (r) {
            const matchedRuleId = r.ruleId;
            if (matchedRuleId !== rule_1.whileRuleId) {
                // we shouldn't end up here
                stack = whileRule.stack.pop();
                break;
            }
            if (r.captureIndices && r.captureIndices.length) {
                lineTokens.produce(whileRule.stack, r.captureIndices[0].start);
                handleCaptures(grammar, lineText, isFirstLine, whileRule.stack, lineTokens, whileRule.rule.whileCaptures, r.captureIndices);
                lineTokens.produce(whileRule.stack, r.captureIndices[0].end);
                anchorPosition = r.captureIndices[0].end;
                if (r.captureIndices[0].end > linePos) {
                    linePos = r.captureIndices[0].end;
                    isFirstLine = false;
                }
            }
        }
        else {
            if (debug_1.DebugFlags.InDebugMode) {
                console.log('  popping ' + whileRule.rule.debugName + ' - ' + whileRule.rule.debugWhileRegExp);
            }
            stack = whileRule.stack.pop();
            break;
        }
    }
    return { stack: stack, linePos: linePos, anchorPosition: anchorPosition, isFirstLine: isFirstLine };
}
function matchRuleOrInjections(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
    // Look for normal grammar rule
    const matchResult = matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
    // Look for injected rules
    const injections = grammar.getInjections();
    if (injections.length === 0) {
        // No injections whatsoever => early return
        return matchResult;
    }
    const injectionResult = matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition);
    if (!injectionResult) {
        // No injections matched => early return
        return matchResult;
    }
    if (!matchResult) {
        // Only injections matched => early return
        return injectionResult;
    }
    // Decide if `matchResult` or `injectionResult` should win
    const matchResultScore = matchResult.captureIndices[0].start;
    const injectionResultScore = injectionResult.captureIndices[0].start;
    if (injectionResultScore < matchResultScore || (injectionResult.priorityMatch && injectionResultScore === matchResultScore)) {
        // injection won!
        return injectionResult;
    }
    return matchResult;
}
function matchRule(grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
    const rule = stack.getRule(grammar);
    const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, stack.endRule, isFirstLine, linePos === anchorPosition);
    let perfStart = 0;
    if (debug_1.DebugFlags.InDebugMode) {
        perfStart = (0, utils_1.performanceNow)();
    }
    const r = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
    if (debug_1.DebugFlags.InDebugMode) {
        const elapsedMillis = (0, utils_1.performanceNow)() - perfStart;
        if (elapsedMillis > 5) {
            console.warn(`Rule ${rule.debugName} (${rule.id}) matching took ${elapsedMillis} against '${lineText}'`);
        }
        console.log(`  scanning for (linePos: ${linePos}, anchorPosition: ${anchorPosition})`);
        console.log(ruleScanner.toString());
        if (r) {
            console.log(`matched rule id: ${r.ruleId} from ${r.captureIndices[0].start} to ${r.captureIndices[0].end}`);
        }
    }
    if (r) {
        return {
            captureIndices: r.captureIndices,
            matchedRuleId: r.ruleId
        };
    }
    return null;
}
function matchInjections(injections, grammar, lineText, isFirstLine, linePos, stack, anchorPosition) {
    // The lower the better
    let bestMatchRating = Number.MAX_VALUE;
    let bestMatchCaptureIndices = null;
    let bestMatchRuleId;
    let bestMatchResultPriority = 0;
    const scopes = stack.contentNameScopesList.getScopeNames();
    for (let i = 0, len = injections.length; i < len; i++) {
        const injection = injections[i];
        if (!injection.matcher(scopes)) {
            // injection selector doesn't match stack
            continue;
        }
        const rule = grammar.getRule(injection.ruleId);
        const { ruleScanner, findOptions } = prepareRuleSearch(rule, grammar, null, isFirstLine, linePos === anchorPosition);
        const matchResult = ruleScanner.findNextMatchSync(lineText, linePos, findOptions);
        if (!matchResult) {
            continue;
        }
        if (debug_1.DebugFlags.InDebugMode) {
            console.log(`  matched injection: ${injection.debugSelector}`);
            console.log(ruleScanner.toString());
        }
        const matchRating = matchResult.captureIndices[0].start;
        if (matchRating >= bestMatchRating) {
            // Injections are sorted by priority, so the previous injection had a better or equal priority
            continue;
        }
        bestMatchRating = matchRating;
        bestMatchCaptureIndices = matchResult.captureIndices;
        bestMatchRuleId = matchResult.ruleId;
        bestMatchResultPriority = injection.priority;
        if (bestMatchRating === linePos) {
            // No more need to look at the rest of the injections.
            break;
        }
    }
    if (bestMatchCaptureIndices) {
        return {
            priorityMatch: bestMatchResultPriority === -1,
            captureIndices: bestMatchCaptureIndices,
            matchedRuleId: bestMatchRuleId
        };
    }
    return null;
}
function prepareRuleSearch(rule, grammar, endRegexSource, allowA, allowG) {
    if (debug_1.UseOnigurumaFindOptions) {
        const ruleScanner = rule.compile(grammar, endRegexSource);
        const findOptions = getFindOptions(allowA, allowG);
        return { ruleScanner, findOptions };
    }
    const ruleScanner = rule.compileAG(grammar, endRegexSource, allowA, allowG);
    return { ruleScanner, findOptions: 0 /* FindOption.None */ };
}
function prepareRuleWhileSearch(rule, grammar, endRegexSource, allowA, allowG) {
    if (debug_1.UseOnigurumaFindOptions) {
        const ruleScanner = rule.compileWhile(grammar, endRegexSource);
        const findOptions = getFindOptions(allowA, allowG);
        return { ruleScanner, findOptions };
    }
    const ruleScanner = rule.compileWhileAG(grammar, endRegexSource, allowA, allowG);
    return { ruleScanner, findOptions: 0 /* FindOption.None */ };
}
function getFindOptions(allowA, allowG) {
    let options = 0 /* FindOption.None */;
    if (!allowA) {
        options |= 1 /* FindOption.NotBeginString */;
    }
    if (!allowG) {
        options |= 4 /* FindOption.NotBeginPosition */;
    }
    return options;
}
function handleCaptures(grammar, lineText, isFirstLine, stack, lineTokens, captures, captureIndices) {
    if (captures.length === 0) {
        return;
    }
    const lineTextContent = lineText.content;
    const len = Math.min(captures.length, captureIndices.length);
    const localStack = [];
    const maxEnd = captureIndices[0].end;
    for (let i = 0; i < len; i++) {
        const captureRule = captures[i];
        if (captureRule === null) {
            // Not interested
            continue;
        }
        const captureIndex = captureIndices[i];
        if (captureIndex.length === 0) {
            // Nothing really captured
            continue;
        }
        if (captureIndex.start > maxEnd) {
            // Capture going beyond consumed string
            break;
        }
        // pop captures while needed
        while (localStack.length > 0 && localStack[localStack.length - 1].endPos <= captureIndex.start) {
            // pop!
            lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
            localStack.pop();
        }
        if (localStack.length > 0) {
            lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, captureIndex.start);
        }
        else {
            lineTokens.produce(stack, captureIndex.start);
        }
        if (captureRule.retokenizeCapturedWithRuleId) {
            // the capture requires additional matching
            const scopeName = captureRule.getName(lineTextContent, captureIndices);
            const nameScopesList = stack.contentNameScopesList.pushAttributed(scopeName, grammar);
            const contentName = captureRule.getContentName(lineTextContent, captureIndices);
            const contentNameScopesList = nameScopesList.pushAttributed(contentName, grammar);
            const stackClone = stack.push(captureRule.retokenizeCapturedWithRuleId, captureIndex.start, -1, false, null, nameScopesList, contentNameScopesList);
            const onigSubStr = grammar.createOnigString(lineTextContent.substring(0, captureIndex.end));
            _tokenizeString(grammar, onigSubStr, (isFirstLine && captureIndex.start === 0), captureIndex.start, stackClone, lineTokens, false, /* no time limit */ 0);
            (0, onigLib_1.disposeOnigString)(onigSubStr);
            continue;
        }
        const captureRuleScopeName = captureRule.getName(lineTextContent, captureIndices);
        if (captureRuleScopeName !== null) {
            // push
            const base = localStack.length > 0 ? localStack[localStack.length - 1].scopes : stack.contentNameScopesList;
            const captureRuleScopesList = base.pushAttributed(captureRuleScopeName, grammar);
            localStack.push(new LocalStackElement(captureRuleScopesList, captureIndex.end));
        }
    }
    while (localStack.length > 0) {
        // pop!
        lineTokens.produceFromScopes(localStack[localStack.length - 1].scopes, localStack[localStack.length - 1].endPos);
        localStack.pop();
    }
}
class LocalStackElement {
    scopes;
    endPos;
    constructor(scopes, endPos) {
        this.scopes = scopes;
        this.endPos = endPos;
    }
}
exports.LocalStackElement = LocalStackElement;


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseRawGrammar = void 0;
const plist = __webpack_require__(23);
const debug_1 = __webpack_require__(12);
const json_1 = __webpack_require__(24);
function parseRawGrammar(content, filePath = null) {
    if (filePath !== null && /\.json$/.test(filePath)) {
        return parseJSONGrammar(content, filePath);
    }
    return parsePLISTGrammar(content, filePath);
}
exports.parseRawGrammar = parseRawGrammar;
function parseJSONGrammar(contents, filename) {
    if (debug_1.DebugFlags.InDebugMode) {
        return (0, json_1.parseJSON)(contents, filename, true);
    }
    return JSON.parse(contents);
}
function parsePLISTGrammar(contents, filename) {
    if (debug_1.DebugFlags.InDebugMode) {
        return plist.parseWithLocation(contents, filename, '$vscodeTextmateLocation');
    }
    return plist.parsePLIST(contents);
}


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parsePLIST = exports.parseWithLocation = void 0;
function parseWithLocation(content, filename, locationKeyName) {
    return _parse(content, filename, locationKeyName);
}
exports.parseWithLocation = parseWithLocation;
/**
 * A very fast plist parser
 */
function parsePLIST(content) {
    return _parse(content, null, null);
}
exports.parsePLIST = parsePLIST;
function _parse(content, filename, locationKeyName) {
    const len = content.length;
    let pos = 0;
    let line = 1;
    let char = 0;
    // Skip UTF8 BOM
    if (len > 0 && content.charCodeAt(0) === 65279 /* ChCode.BOM */) {
        pos = 1;
    }
    function advancePosBy(by) {
        if (locationKeyName === null) {
            pos = pos + by;
        }
        else {
            while (by > 0) {
                let chCode = content.charCodeAt(pos);
                if (chCode === 10 /* ChCode.LINE_FEED */) {
                    pos++;
                    line++;
                    char = 0;
                }
                else {
                    pos++;
                    char++;
                }
                by--;
            }
        }
    }
    function advancePosTo(to) {
        if (locationKeyName === null) {
            pos = to;
        }
        else {
            advancePosBy(to - pos);
        }
    }
    function skipWhitespace() {
        while (pos < len) {
            let chCode = content.charCodeAt(pos);
            if (chCode !== 32 /* ChCode.SPACE */ && chCode !== 9 /* ChCode.TAB */ && chCode !== 13 /* ChCode.CARRIAGE_RETURN */ && chCode !== 10 /* ChCode.LINE_FEED */) {
                break;
            }
            advancePosBy(1);
        }
    }
    function advanceIfStartsWith(str) {
        if (content.substr(pos, str.length) === str) {
            advancePosBy(str.length);
            return true;
        }
        return false;
    }
    function advanceUntil(str) {
        let nextOccurence = content.indexOf(str, pos);
        if (nextOccurence !== -1) {
            advancePosTo(nextOccurence + str.length);
        }
        else {
            // EOF
            advancePosTo(len);
        }
    }
    function captureUntil(str) {
        let nextOccurence = content.indexOf(str, pos);
        if (nextOccurence !== -1) {
            let r = content.substring(pos, nextOccurence);
            advancePosTo(nextOccurence + str.length);
            return r;
        }
        else {
            // EOF
            let r = content.substr(pos);
            advancePosTo(len);
            return r;
        }
    }
    let state = 0 /* State.ROOT_STATE */;
    let cur = null;
    let stateStack = [];
    let objStack = [];
    let curKey = null;
    function pushState(newState, newCur) {
        stateStack.push(state);
        objStack.push(cur);
        state = newState;
        cur = newCur;
    }
    function popState() {
        if (stateStack.length === 0) {
            return fail('illegal state stack');
        }
        state = stateStack.pop();
        cur = objStack.pop();
    }
    function fail(msg) {
        throw new Error('Near offset ' + pos + ': ' + msg + ' ~~~' + content.substr(pos, 50) + '~~~');
    }
    const dictState = {
        enterDict: function () {
            if (curKey === null) {
                return fail('missing <key>');
            }
            let newDict = {};
            if (locationKeyName !== null) {
                newDict[locationKeyName] = {
                    filename: filename,
                    line: line,
                    char: char
                };
            }
            cur[curKey] = newDict;
            curKey = null;
            pushState(1 /* State.DICT_STATE */, newDict);
        },
        enterArray: function () {
            if (curKey === null) {
                return fail('missing <key>');
            }
            let newArr = [];
            cur[curKey] = newArr;
            curKey = null;
            pushState(2 /* State.ARR_STATE */, newArr);
        }
    };
    const arrState = {
        enterDict: function () {
            let newDict = {};
            if (locationKeyName !== null) {
                newDict[locationKeyName] = {
                    filename: filename,
                    line: line,
                    char: char
                };
            }
            cur.push(newDict);
            pushState(1 /* State.DICT_STATE */, newDict);
        },
        enterArray: function () {
            let newArr = [];
            cur.push(newArr);
            pushState(2 /* State.ARR_STATE */, newArr);
        }
    };
    function enterDict() {
        if (state === 1 /* State.DICT_STATE */) {
            dictState.enterDict();
        }
        else if (state === 2 /* State.ARR_STATE */) {
            arrState.enterDict();
        }
        else { // ROOT_STATE
            cur = {};
            if (locationKeyName !== null) {
                cur[locationKeyName] = {
                    filename: filename,
                    line: line,
                    char: char
                };
            }
            pushState(1 /* State.DICT_STATE */, cur);
        }
    }
    function leaveDict() {
        if (state === 1 /* State.DICT_STATE */) {
            popState();
        }
        else if (state === 2 /* State.ARR_STATE */) {
            return fail('unexpected </dict>');
        }
        else { // ROOT_STATE
            return fail('unexpected </dict>');
        }
    }
    function enterArray() {
        if (state === 1 /* State.DICT_STATE */) {
            dictState.enterArray();
        }
        else if (state === 2 /* State.ARR_STATE */) {
            arrState.enterArray();
        }
        else { // ROOT_STATE
            cur = [];
            pushState(2 /* State.ARR_STATE */, cur);
        }
    }
    function leaveArray() {
        if (state === 1 /* State.DICT_STATE */) {
            return fail('unexpected </array>');
        }
        else if (state === 2 /* State.ARR_STATE */) {
            popState();
        }
        else { // ROOT_STATE
            return fail('unexpected </array>');
        }
    }
    function acceptKey(val) {
        if (state === 1 /* State.DICT_STATE */) {
            if (curKey !== null) {
                return fail('too many <key>');
            }
            curKey = val;
        }
        else if (state === 2 /* State.ARR_STATE */) {
            return fail('unexpected <key>');
        }
        else { // ROOT_STATE
            return fail('unexpected <key>');
        }
    }
    function acceptString(val) {
        if (state === 1 /* State.DICT_STATE */) {
            if (curKey === null) {
                return fail('missing <key>');
            }
            cur[curKey] = val;
            curKey = null;
        }
        else if (state === 2 /* State.ARR_STATE */) {
            cur.push(val);
        }
        else { // ROOT_STATE
            cur = val;
        }
    }
    function acceptReal(val) {
        if (isNaN(val)) {
            return fail('cannot parse float');
        }
        if (state === 1 /* State.DICT_STATE */) {
            if (curKey === null) {
                return fail('missing <key>');
            }
            cur[curKey] = val;
            curKey = null;
        }
        else if (state === 2 /* State.ARR_STATE */) {
            cur.push(val);
        }
        else { // ROOT_STATE
            cur = val;
        }
    }
    function acceptInteger(val) {
        if (isNaN(val)) {
            return fail('cannot parse integer');
        }
        if (state === 1 /* State.DICT_STATE */) {
            if (curKey === null) {
                return fail('missing <key>');
            }
            cur[curKey] = val;
            curKey = null;
        }
        else if (state === 2 /* State.ARR_STATE */) {
            cur.push(val);
        }
        else { // ROOT_STATE
            cur = val;
        }
    }
    function acceptDate(val) {
        if (state === 1 /* State.DICT_STATE */) {
            if (curKey === null) {
                return fail('missing <key>');
            }
            cur[curKey] = val;
            curKey = null;
        }
        else if (state === 2 /* State.ARR_STATE */) {
            cur.push(val);
        }
        else { // ROOT_STATE
            cur = val;
        }
    }
    function acceptData(val) {
        if (state === 1 /* State.DICT_STATE */) {
            if (curKey === null) {
                return fail('missing <key>');
            }
            cur[curKey] = val;
            curKey = null;
        }
        else if (state === 2 /* State.ARR_STATE */) {
            cur.push(val);
        }
        else { // ROOT_STATE
            cur = val;
        }
    }
    function acceptBool(val) {
        if (state === 1 /* State.DICT_STATE */) {
            if (curKey === null) {
                return fail('missing <key>');
            }
            cur[curKey] = val;
            curKey = null;
        }
        else if (state === 2 /* State.ARR_STATE */) {
            cur.push(val);
        }
        else { // ROOT_STATE
            cur = val;
        }
    }
    function escapeVal(str) {
        return str.replace(/&#([0-9]+);/g, function (_, m0) {
            return String.fromCodePoint(parseInt(m0, 10));
        }).replace(/&#x([0-9a-f]+);/g, function (_, m0) {
            return String.fromCodePoint(parseInt(m0, 16));
        }).replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, function (_) {
            switch (_) {
                case '&amp;': return '&';
                case '&lt;': return '<';
                case '&gt;': return '>';
                case '&quot;': return '"';
                case '&apos;': return '\'';
            }
            return _;
        });
    }
    function parseOpenTag() {
        let r = captureUntil('>');
        let isClosed = false;
        if (r.charCodeAt(r.length - 1) === 47 /* ChCode.SLASH */) {
            isClosed = true;
            r = r.substring(0, r.length - 1);
        }
        return {
            name: r.trim(),
            isClosed: isClosed
        };
    }
    function parseTagValue(tag) {
        if (tag.isClosed) {
            return '';
        }
        let val = captureUntil('</');
        advanceUntil('>');
        return escapeVal(val);
    }
    while (pos < len) {
        skipWhitespace();
        if (pos >= len) {
            break;
        }
        const chCode = content.charCodeAt(pos);
        advancePosBy(1);
        if (chCode !== 60 /* ChCode.LESS_THAN */) {
            return fail('expected <');
        }
        if (pos >= len) {
            return fail('unexpected end of input');
        }
        const peekChCode = content.charCodeAt(pos);
        if (peekChCode === 63 /* ChCode.QUESTION_MARK */) {
            advancePosBy(1);
            advanceUntil('?>');
            continue;
        }
        if (peekChCode === 33 /* ChCode.EXCLAMATION_MARK */) {
            advancePosBy(1);
            if (advanceIfStartsWith('--')) {
                advanceUntil('-->');
                continue;
            }
            advanceUntil('>');
            continue;
        }
        if (peekChCode === 47 /* ChCode.SLASH */) {
            advancePosBy(1);
            skipWhitespace();
            if (advanceIfStartsWith('plist')) {
                advanceUntil('>');
                continue;
            }
            if (advanceIfStartsWith('dict')) {
                advanceUntil('>');
                leaveDict();
                continue;
            }
            if (advanceIfStartsWith('array')) {
                advanceUntil('>');
                leaveArray();
                continue;
            }
            return fail('unexpected closed tag');
        }
        let tag = parseOpenTag();
        switch (tag.name) {
            case 'dict':
                enterDict();
                if (tag.isClosed) {
                    leaveDict();
                }
                continue;
            case 'array':
                enterArray();
                if (tag.isClosed) {
                    leaveArray();
                }
                continue;
            case 'key':
                acceptKey(parseTagValue(tag));
                continue;
            case 'string':
                acceptString(parseTagValue(tag));
                continue;
            case 'real':
                acceptReal(parseFloat(parseTagValue(tag)));
                continue;
            case 'integer':
                acceptInteger(parseInt(parseTagValue(tag), 10));
                continue;
            case 'date':
                acceptDate(new Date(parseTagValue(tag)));
                continue;
            case 'data':
                acceptData(parseTagValue(tag));
                continue;
            case 'true':
                parseTagValue(tag);
                acceptBool(true);
                continue;
            case 'false':
                parseTagValue(tag);
                acceptBool(false);
                continue;
        }
        if (/^plist/.test(tag.name)) {
            continue;
        }
        return fail('unexpected opened tag ' + tag.name);
    }
    return cur;
}


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseJSON = void 0;
function doFail(streamState, msg) {
    // console.log('Near offset ' + streamState.pos + ': ' + msg + ' ~~~' + streamState.source.substr(streamState.pos, 50) + '~~~');
    throw new Error('Near offset ' + streamState.pos + ': ' + msg + ' ~~~' + streamState.source.substr(streamState.pos, 50) + '~~~');
}
function parseJSON(source, filename, withMetadata) {
    let streamState = new JSONStreamState(source);
    let token = new JSONToken();
    let state = 0 /* JSONState.ROOT_STATE */;
    let cur = null;
    let stateStack = [];
    let objStack = [];
    function pushState() {
        stateStack.push(state);
        objStack.push(cur);
    }
    function popState() {
        state = stateStack.pop();
        cur = objStack.pop();
    }
    function fail(msg) {
        doFail(streamState, msg);
    }
    while (nextJSONToken(streamState, token)) {
        if (state === 0 /* JSONState.ROOT_STATE */) {
            if (cur !== null) {
                fail('too many constructs in root');
            }
            if (token.type === 3 /* JSONTokenType.LEFT_CURLY_BRACKET */) {
                cur = {};
                if (withMetadata) {
                    cur.$vscodeTextmateLocation = token.toLocation(filename);
                }
                pushState();
                state = 1 /* JSONState.DICT_STATE */;
                continue;
            }
            if (token.type === 2 /* JSONTokenType.LEFT_SQUARE_BRACKET */) {
                cur = [];
                pushState();
                state = 4 /* JSONState.ARR_STATE */;
                continue;
            }
            fail('unexpected token in root');
        }
        if (state === 2 /* JSONState.DICT_STATE_COMMA */) {
            if (token.type === 5 /* JSONTokenType.RIGHT_CURLY_BRACKET */) {
                popState();
                continue;
            }
            if (token.type === 7 /* JSONTokenType.COMMA */) {
                state = 3 /* JSONState.DICT_STATE_NO_CLOSE */;
                continue;
            }
            fail('expected , or }');
        }
        if (state === 1 /* JSONState.DICT_STATE */ || state === 3 /* JSONState.DICT_STATE_NO_CLOSE */) {
            if (state === 1 /* JSONState.DICT_STATE */ && token.type === 5 /* JSONTokenType.RIGHT_CURLY_BRACKET */) {
                popState();
                continue;
            }
            if (token.type === 1 /* JSONTokenType.STRING */) {
                let keyValue = token.value;
                if (!nextJSONToken(streamState, token) || /*TS bug*/ token.type !== 6 /* JSONTokenType.COLON */) {
                    fail('expected colon');
                }
                if (!nextJSONToken(streamState, token)) {
                    fail('expected value');
                }
                state = 2 /* JSONState.DICT_STATE_COMMA */;
                if (token.type === 1 /* JSONTokenType.STRING */) {
                    cur[keyValue] = token.value;
                    continue;
                }
                if (token.type === 8 /* JSONTokenType.NULL */) {
                    cur[keyValue] = null;
                    continue;
                }
                if (token.type === 9 /* JSONTokenType.TRUE */) {
                    cur[keyValue] = true;
                    continue;
                }
                if (token.type === 10 /* JSONTokenType.FALSE */) {
                    cur[keyValue] = false;
                    continue;
                }
                if (token.type === 11 /* JSONTokenType.NUMBER */) {
                    cur[keyValue] = parseFloat(token.value);
                    continue;
                }
                if (token.type === 2 /* JSONTokenType.LEFT_SQUARE_BRACKET */) {
                    let newArr = [];
                    cur[keyValue] = newArr;
                    pushState();
                    state = 4 /* JSONState.ARR_STATE */;
                    cur = newArr;
                    continue;
                }
                if (token.type === 3 /* JSONTokenType.LEFT_CURLY_BRACKET */) {
                    let newDict = {};
                    if (withMetadata) {
                        newDict.$vscodeTextmateLocation = token.toLocation(filename);
                    }
                    cur[keyValue] = newDict;
                    pushState();
                    state = 1 /* JSONState.DICT_STATE */;
                    cur = newDict;
                    continue;
                }
            }
            fail('unexpected token in dict');
        }
        if (state === 5 /* JSONState.ARR_STATE_COMMA */) {
            if (token.type === 4 /* JSONTokenType.RIGHT_SQUARE_BRACKET */) {
                popState();
                continue;
            }
            if (token.type === 7 /* JSONTokenType.COMMA */) {
                state = 6 /* JSONState.ARR_STATE_NO_CLOSE */;
                continue;
            }
            fail('expected , or ]');
        }
        if (state === 4 /* JSONState.ARR_STATE */ || state === 6 /* JSONState.ARR_STATE_NO_CLOSE */) {
            if (state === 4 /* JSONState.ARR_STATE */ && token.type === 4 /* JSONTokenType.RIGHT_SQUARE_BRACKET */) {
                popState();
                continue;
            }
            state = 5 /* JSONState.ARR_STATE_COMMA */;
            if (token.type === 1 /* JSONTokenType.STRING */) {
                cur.push(token.value);
                continue;
            }
            if (token.type === 8 /* JSONTokenType.NULL */) {
                cur.push(null);
                continue;
            }
            if (token.type === 9 /* JSONTokenType.TRUE */) {
                cur.push(true);
                continue;
            }
            if (token.type === 10 /* JSONTokenType.FALSE */) {
                cur.push(false);
                continue;
            }
            if (token.type === 11 /* JSONTokenType.NUMBER */) {
                cur.push(parseFloat(token.value));
                continue;
            }
            if (token.type === 2 /* JSONTokenType.LEFT_SQUARE_BRACKET */) {
                let newArr = [];
                cur.push(newArr);
                pushState();
                state = 4 /* JSONState.ARR_STATE */;
                cur = newArr;
                continue;
            }
            if (token.type === 3 /* JSONTokenType.LEFT_CURLY_BRACKET */) {
                let newDict = {};
                if (withMetadata) {
                    newDict.$vscodeTextmateLocation = token.toLocation(filename);
                }
                cur.push(newDict);
                pushState();
                state = 1 /* JSONState.DICT_STATE */;
                cur = newDict;
                continue;
            }
            fail('unexpected token in array');
        }
        fail('unknown state');
    }
    if (objStack.length !== 0) {
        fail('unclosed constructs');
    }
    return cur;
}
exports.parseJSON = parseJSON;
class JSONStreamState {
    source;
    pos;
    len;
    line;
    char;
    constructor(source) {
        this.source = source;
        this.pos = 0;
        this.len = source.length;
        this.line = 1;
        this.char = 0;
    }
}
class JSONToken {
    value;
    type;
    offset;
    len;
    line; /* 1 based line number */
    char;
    constructor() {
        this.value = null;
        this.type = 0 /* JSONTokenType.UNKNOWN */;
        this.offset = -1;
        this.len = -1;
        this.line = -1;
        this.char = -1;
    }
    toLocation(filename) {
        return {
            filename: filename,
            line: this.line,
            char: this.char
        };
    }
}
/**
 * precondition: the string is known to be valid JSON (https://www.ietf.org/rfc/rfc4627.txt)
 */
function nextJSONToken(_state, _out) {
    _out.value = null;
    _out.type = 0 /* JSONTokenType.UNKNOWN */;
    _out.offset = -1;
    _out.len = -1;
    _out.line = -1;
    _out.char = -1;
    let source = _state.source;
    let pos = _state.pos;
    let len = _state.len;
    let line = _state.line;
    let char = _state.char;
    //------------------------ skip whitespace
    let chCode;
    do {
        if (pos >= len) {
            return false; /*EOS*/
        }
        chCode = source.charCodeAt(pos);
        if (chCode === 32 /* ChCode.SPACE */ || chCode === 9 /* ChCode.HORIZONTAL_TAB */ || chCode === 13 /* ChCode.CARRIAGE_RETURN */) {
            // regular whitespace
            pos++;
            char++;
            continue;
        }
        if (chCode === 10 /* ChCode.LINE_FEED */) {
            // newline
            pos++;
            line++;
            char = 0;
            continue;
        }
        // not whitespace
        break;
    } while (true);
    _out.offset = pos;
    _out.line = line;
    _out.char = char;
    if (chCode === 34 /* ChCode.QUOTATION_MARK */) {
        //------------------------ strings
        _out.type = 1 /* JSONTokenType.STRING */;
        pos++;
        char++;
        do {
            if (pos >= len) {
                return false; /*EOS*/
            }
            chCode = source.charCodeAt(pos);
            pos++;
            char++;
            if (chCode === 92 /* ChCode.BACKSLASH */) {
                // skip next char
                pos++;
                char++;
                continue;
            }
            if (chCode === 34 /* ChCode.QUOTATION_MARK */) {
                // end of the string
                break;
            }
        } while (true);
        _out.value = source.substring(_out.offset + 1, pos - 1).replace(/\\u([0-9A-Fa-f]{4})/g, (_, m0) => {
            return String.fromCodePoint(parseInt(m0, 16));
        }).replace(/\\(.)/g, (_, m0) => {
            switch (m0) {
                case '"': return '"';
                case '\\': return '\\';
                case '/': return '/';
                case 'b': return '\b';
                case 'f': return '\f';
                case 'n': return '\n';
                case 'r': return '\r';
                case 't': return '\t';
                default: doFail(_state, 'invalid escape sequence');
            }
            throw new Error('unreachable');
        });
    }
    else if (chCode === 91 /* ChCode.LEFT_SQUARE_BRACKET */) {
        _out.type = 2 /* JSONTokenType.LEFT_SQUARE_BRACKET */;
        pos++;
        char++;
    }
    else if (chCode === 123 /* ChCode.LEFT_CURLY_BRACKET */) {
        _out.type = 3 /* JSONTokenType.LEFT_CURLY_BRACKET */;
        pos++;
        char++;
    }
    else if (chCode === 93 /* ChCode.RIGHT_SQUARE_BRACKET */) {
        _out.type = 4 /* JSONTokenType.RIGHT_SQUARE_BRACKET */;
        pos++;
        char++;
    }
    else if (chCode === 125 /* ChCode.RIGHT_CURLY_BRACKET */) {
        _out.type = 5 /* JSONTokenType.RIGHT_CURLY_BRACKET */;
        pos++;
        char++;
    }
    else if (chCode === 58 /* ChCode.COLON */) {
        _out.type = 6 /* JSONTokenType.COLON */;
        pos++;
        char++;
    }
    else if (chCode === 44 /* ChCode.COMMA */) {
        _out.type = 7 /* JSONTokenType.COMMA */;
        pos++;
        char++;
    }
    else if (chCode === 110 /* ChCode.n */) {
        //------------------------ null
        _out.type = 8 /* JSONTokenType.NULL */;
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 117 /* ChCode.u */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 108 /* ChCode.l */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 108 /* ChCode.l */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
    }
    else if (chCode === 116 /* ChCode.t */) {
        //------------------------ true
        _out.type = 9 /* JSONTokenType.TRUE */;
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 114 /* ChCode.r */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 117 /* ChCode.u */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 101 /* ChCode.e */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
    }
    else if (chCode === 102 /* ChCode.f */) {
        //------------------------ false
        _out.type = 10 /* JSONTokenType.FALSE */;
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 97 /* ChCode.a */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 108 /* ChCode.l */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 115 /* ChCode.s */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
        chCode = source.charCodeAt(pos);
        if (chCode !== 101 /* ChCode.e */) {
            return false; /* INVALID */
        }
        pos++;
        char++;
    }
    else {
        //------------------------ numbers
        _out.type = 11 /* JSONTokenType.NUMBER */;
        do {
            if (pos >= len) {
                return false; /*EOS*/
            }
            chCode = source.charCodeAt(pos);
            if (chCode === 46 /* ChCode.DOT */
                || (chCode >= 48 /* ChCode.D0 */ && chCode <= 57 /* ChCode.D9 */)
                || (chCode === 101 /* ChCode.e */ || chCode === 69 /* ChCode.E */)
                || (chCode === 45 /* ChCode.MINUS */ || chCode === 43 /* ChCode.PLUS */)) {
                // looks like a piece of a number
                pos++;
                char++;
                continue;
            }
            // pos--; char--;
            break;
        } while (true);
    }
    _out.len = pos - _out.offset;
    if (_out.value === null) {
        _out.value = source.substr(_out.offset, _out.len);
    }
    _state.pos = pos;
    _state.line = line;
    _state.char = char;
    // console.log('PRODUCING TOKEN: ', _out.value, JSONTokenType[_out.type]);
    return true;
}


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SyncRegistry = void 0;
const grammar_1 = __webpack_require__(10);
class SyncRegistry {
    _onigLibPromise;
    _grammars = new Map();
    _rawGrammars = new Map();
    _injectionGrammars = new Map();
    _theme;
    constructor(theme, _onigLibPromise) {
        this._onigLibPromise = _onigLibPromise;
        this._theme = theme;
    }
    dispose() {
        for (const grammar of this._grammars.values()) {
            grammar.dispose();
        }
    }
    setTheme(theme) {
        this._theme = theme;
    }
    getColorMap() {
        return this._theme.getColorMap();
    }
    /**
     * Add `grammar` to registry and return a list of referenced scope names
     */
    addGrammar(grammar, injectionScopeNames) {
        this._rawGrammars.set(grammar.scopeName, grammar);
        if (injectionScopeNames) {
            this._injectionGrammars.set(grammar.scopeName, injectionScopeNames);
        }
    }
    /**
     * Lookup a raw grammar.
     */
    lookup(scopeName) {
        return this._rawGrammars.get(scopeName);
    }
    /**
     * Returns the injections for the given grammar
     */
    injections(targetScope) {
        return this._injectionGrammars.get(targetScope);
    }
    /**
     * Get the default theme settings
     */
    getDefaults() {
        return this._theme.getDefaults();
    }
    /**
     * Match a scope in the theme.
     */
    themeMatch(scopePath) {
        return this._theme.match(scopePath);
    }
    /**
     * Lookup a grammar.
     */
    async grammarForScopeName(scopeName, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors) {
        if (!this._grammars.has(scopeName)) {
            let rawGrammar = this._rawGrammars.get(scopeName);
            if (!rawGrammar) {
                return null;
            }
            this._grammars.set(scopeName, (0, grammar_1.createGrammar)(scopeName, rawGrammar, initialLanguage, embeddedLanguages, tokenTypes, balancedBracketSelectors, this, await this._onigLibPromise));
        }
        return this._grammars.get(scopeName);
    }
}
exports.SyncRegistry = SyncRegistry;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.applyStateStackDiff = exports.diffStateStacksRefEq = void 0;
const grammar_1 = __webpack_require__(10);
function diffStateStacksRefEq(first, second) {
    let pops = 0;
    const newFrames = [];
    let curFirst = first;
    let curSecond = second;
    while (curFirst !== curSecond) {
        if (curFirst && (!curSecond || curFirst.depth >= curSecond.depth)) {
            // curFirst is certainly not contained in curSecond
            pops++;
            curFirst = curFirst.parent;
        }
        else {
            // curSecond is certainly not contained in curFirst.
            // Also, curSecond must be defined, as otherwise a previous case would match
            newFrames.push(curSecond.toStateStackFrame());
            curSecond = curSecond.parent;
        }
    }
    return {
        pops,
        newFrames: newFrames.reverse(),
    };
}
exports.diffStateStacksRefEq = diffStateStacksRefEq;
function applyStateStackDiff(stack, diff) {
    let curStack = stack;
    for (let i = 0; i < diff.pops; i++) {
        curStack = curStack.parent;
    }
    for (const frame of diff.newFrames) {
        curStack = grammar_1.StateStackImpl.pushFrame(curStack, frame);
    }
    return curStack;
}
exports.applyStateStackDiff = applyStateStackDiff;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initDiagnostics = void 0;
const vscode = __webpack_require__(1);
const vscodeOniguruma = __webpack_require__(7);
const TreeSitter_1 = __webpack_require__(2);
const extension_1 = __webpack_require__(0);
function initDiagnostics(context) {
    // vscode.window.showInformationMessage(JSON.stringify("initDiagnostics"));
    const DiagnosticCollection = vscode.languages.createDiagnosticCollection("textmate");
    context.subscriptions.push(DiagnosticCollection);
    for (const editor of vscode.window.visibleTextEditors) {
        // vscode.window.showInformationMessage(JSON.stringify("visible"));
        Diagnostics(editor.document, DiagnosticCollection);
    }
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument((document) => {
        // vscode.window.showInformationMessage(JSON.stringify("open"));
        Diagnostics(document, DiagnosticCollection);
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((edits) => {
        // vscode.window.showInformationMessage(JSON.stringify("change"));
        Diagnostics(edits.document, DiagnosticCollection);
    }));
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument((document) => {
        // vscode.window.showInformationMessage(JSON.stringify("close"));
        DiagnosticCollection.delete(document.uri);
    }));
}
exports.initDiagnostics = initDiagnostics;
function Diagnostics(document, Diagnostics) {
    if (!vscode.languages.match(extension_1.DocumentSelector, document)) {
        return;
    }
    const diagnostics = [];
    if (false) {}
    if (false) {}
    if (true) { // Oniguruma Regex errors. https://github.com/kkos/oniguruma
        // vscode.window.showInformationMessage(JSON.stringify("diagnostics Regex Oniguruma"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        // const jsonTree = trees.jsonTree;
        const regexTrees = trees.regexTrees;
        const regexNodes = trees.regexNodes;
        for (const id in regexTrees) {
            const regexTree = regexTrees[id];
            const node = regexTree.rootNode;
            const text = node.text;
            const regexNode = regexNodes[node.id];
            const key = regexNode.previousNamedSibling;
            let regex = text.replace(/\\[\\\/bfnrt"]|\\u[0-9a-fA-F]{4}/g, regexEscapeReplacer);
            if (key.text == 'end' || key.text == 'while') {
                // `\\3` could be valid; could be invalid. Who knows?
                // Would need to check the `begin` regex first for the number of capture groups
                // Then how to tell Oniguruma how many are available??
                // Keeping in mind /(?I:...)/
                regex = regex.replace(/\\[1-9](\d{2})?(?!\d)/g, '\\0');
            }
            const scanner = new vscodeOniguruma.OnigScanner([regex]);
            const onigBinding = scanner._onigBinding;
            const errorCode = onigBinding.UTF8ToString(onigBinding._getLastOnigError());
            // const string = vscodeOniguruma.createOnigString(''); // blank. Maybe can test against a user provided string?
            // const match = scanner.findNextMatchSync(string, 0); // returns null if `regex` is invalid
            if (errorCode != 'undefined error code') {
                const range = (0, TreeSitter_1.toRange)(key);
                const diagnostic = {
                    range: range,
                    message: errorCode,
                    severity: vscode.DiagnosticSeverity.Error,
                    source: 'Oniguruma',
                };
                diagnostics.push(diagnostic);
            }
        }
    }
    // vscode.window.showInformationMessage(JSON.stringify(diagnostics));
    Diagnostics.set(document.uri, diagnostics);
}
function regexEscapeReplacer(substring, ...args) {
    const char = substring.charAt(1);
    switch (char) {
        case '\\': return '\\';
        case '/': return '/';
        case 'b': return '\b';
        case 'f': return '\f';
        case 'n': return '\n';
        case 'r': return '\r';
        case 't': return '\t';
        case '"': return '"';
        case 'u':
            const hexStr = substring.substring(2, 6);
            const hexCode = parseInt(hexStr, 16);
            const char = String.fromCodePoint(hexCode);
            return char;
    }
}


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initTokenColorCustomizations = void 0;
const vscode = __webpack_require__(1);
function initTokenColorCustomizations(context) {
    // vscode.window.showInformationMessage(JSON.stringify("tokenColorCustomizations"));
    const activeDocument = vscode.window.activeTextEditor?.document; // `activeTextEditor` can be `undefined`!
    update(packageJSON(activeDocument) || jsonTextMate(activeDocument));
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor((editor) => {
        // vscode.window.showInformationMessage(JSON.stringify("active"));
        const document = editor?.document; // `editor` can be `undefined`!
        update(packageJSON(document) || jsonTextMate(document));
    }));
    context.subscriptions.push(vscode.workspace.onDidOpenTextDocument((document) => {
        // vscode.window.showInformationMessage(JSON.stringify("open"));
        if (document == vscode.window.activeTextEditor?.document) { // `activeTextEditor` can be `undefined`!
            update(packageJSON(document) || jsonTextMate(document));
        }
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((edits) => {
        // vscode.window.showInformationMessage(JSON.stringify("change"));
        if (edits.contentChanges.length == 0) {
            return;
        }
        const document = edits.document;
        if (vscode.languages.match(packageJSONSelector, document)) {
            if (document == vscode.window.activeTextEditor?.document) { // `activeTextEditor` can be `undefined`!
                update(packageJSON(document));
            }
        }
    }));
    // context.subscriptions.push(
    // 	vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) => {
    // 		// vscode.window.showInformationMessage(JSON.stringify("config"));
    // 		if (event.affectsConfiguration("editor.tokenColorCustomizations")) {
    // 			const document = vscode.window.activeTextEditor?.document; // `activeTextEditor` can be `undefined`!
    // 			update(packageJSON(document) || jsonTextMate(document));
    // 		}
    // 	})
    // );
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument((document) => {
        // vscode.window.showInformationMessage(JSON.stringify("close"));
        if (document == vscode.window.activeTextEditor?.document) { // `activeTextEditor` can be `undefined`!
            update(null);
        }
    }));
}
exports.initTokenColorCustomizations = initTokenColorCustomizations;
const packageJSONSelector = [
    { pattern: "**/package.json", scheme: "file" },
    { pattern: "**/package.json", scheme: "vscode-vfs" }
];
const jsonTextMateSelector = [
    { language: "json-textmate", scheme: "file" },
    { language: "json-textmate", scheme: "vscode-vfs" }
];
// const documentSelector: vscode.DocumentSelector = [packageJSONSelector, jsonTextMateSelector];
function packageJSON(document) {
    // vscode.window.showInformationMessage(JSON.stringify("packageJSON"));
    if (!document) {
        return null;
    }
    if (vscode.languages.match(packageJSONSelector, document)) {
        const uri = document.uri;
        return uri;
    }
}
function jsonTextMate(document) {
    // vscode.window.showInformationMessage(JSON.stringify("jsonTextMate"));
    if (!document) {
        return null;
    }
    if (vscode.languages.match(jsonTextMateSelector, document)) {
        const uri = vscode.Uri.joinPath(document.uri, '../../package.json');
        return uri;
    }
}
let ignoreFailParse = false;
let hadTokenColorCustomizations = false;
const bak = '[tokenColorCustomizations_bak_JSON_TextMate'; // The square bracket is there on purpose so that the json `settings` schema doesn't complain about it
async function update(uri) {
    // vscode.window.showInformationMessage(JSON.stringify("update"));
    // Workspace settings have higher priority than Global settings. But... Workspace settings don't work when there is no Workspace
    const configurationTarget = vscode.workspace.name ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
    const configurationValue = vscode.workspace.name ? 'workspaceValue' : 'globalValue';
    if (uri && uri.scheme != 'untitled') {
        try {
            const packageDocument = await vscode.workspace.openTextDocument(uri);
            const packageParsed = await JSON.parse(packageDocument?.getText());
            const package_tokenColorCustomizations = packageParsed?.contributes?.configurationDefaults?.['editor.tokenColorCustomizations'];
            if (package_tokenColorCustomizations) {
                const editor = vscode.workspace.getConfiguration("editor");
                const tokenColorCustomizations = editor.inspect("tokenColorCustomizations")[configurationValue] ?? {};
                const tokenColorCustomizations_bak = tokenColorCustomizations[bak] ?? tokenColorCustomizations;
                delete tokenColorCustomizations_bak[bak];
                package_tokenColorCustomizations[bak] = tokenColorCustomizations_bak;
                editor.update("tokenColorCustomizations", package_tokenColorCustomizations, configurationTarget);
                hadTokenColorCustomizations = true;
                return;
            }
        }
        catch (error) {
            if (hadTokenColorCustomizations && ignoreFailParse == false) {
                const message = `Failed to parse package.json:\n${error}`;
                const ignore = "Ignore";
                vscode.window.showWarningMessage(message, ignore).then((value) => {
                    if (value == ignore) {
                        ignoreFailParse = true;
                    }
                    return true;
                });
            }
        }
    }
    const editor = vscode.workspace.getConfiguration("editor");
    const tokenColorCustomizations = editor.inspect("tokenColorCustomizations")[configurationValue] ?? {};
    const tokenColorCustomizations_bak = tokenColorCustomizations[bak];
    if (tokenColorCustomizations_bak !== undefined) {
        const length = Object.keys(tokenColorCustomizations_bak).length;
        editor.update("tokenColorCustomizations", length ? tokenColorCustomizations_bak : undefined, configurationTarget);
    }
}


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __dirname = "/";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initCallStackView = exports.TreeDataProvider = void 0;
const vscode = __webpack_require__(1);
// import * as vscodeTextmate from 'vscode-textmate';
const path = __webpack_require__(5);
const TextMate_1 = __webpack_require__(8);
const extension_1 = __webpack_require__(0);
// const ruleList: rule[] = [];
let grammar;
const FileIcon = path.join(__dirname, '..', 'assets', 'TextMate-file-icon.svg');
const onDidChangeTreeData = new vscode.EventEmitter();
exports.TreeDataProvider = {
    async getChildren(element) {
        // vscode.window.showInformationMessage(JSON.stringify("getChildren"));
        // vscode.window.showInformationMessage(JSON.stringify(element));
        if (false) {}
        if (false) {}
        if (true) {
            const elements = [];
            if (!element) {
                const activeTextEditor = vscode.window.activeTextEditor;
                if (!activeTextEditor) {
                    return;
                }
                const childElement = {
                    id: -1,
                    document: activeTextEditor.document,
                };
                elements.push(childElement);
                return elements;
            }
            const document = element.document;
            if (element.id == -1) {
                grammar = await (0, TextMate_1.tokenizeFile)(document);
                grammar.rules.unshift({
                    captureIndices: [
                        {
                            start: 0,
                            end: 0,
                            length: 0,
                        }
                    ],
                    matchedRuleId: 1,
                });
                const childElement = {
                    id: 0,
                    document: document,
                };
                elements.push(childElement);
                return elements;
            }
            if (true) {
                const id = element.id;
                const document = element.document;
                const childElement = {
                    line: 0,
                    ruleId: 1,
                    id: 0,
                    document: document,
                };
                elements.push(childElement);
                let depth = 0;
                let line = 0;
                for (let index = id; index < grammar.rules.length; index++) {
                    const matchResult = grammar.rules[index];
                    if (matchResult == null) {
                        line++;
                        continue;
                    }
                    const ruleId = matchResult.matchedRuleId;
                    if (ruleId == -1) {
                        if (depth == 0) {
                            break;
                        }
                        depth--;
                    }
                    else {
                        depth++;
                        const childElement = {
                            line: line,
                            ruleId: ruleId,
                            id: index,
                            document: document,
                        };
                        elements.push(childElement);
                    }
                }
                return elements;
            }
        }
    },
    getTreeItem(element) {
        // vscode.window.showInformationMessage(JSON.stringify("getTreeItem"));
        // vscode.window.showInformationMessage(JSON.stringify(element));
        if (false) {}
        if (false) {}
        if (true) {
            const id = element.id;
            const document = element.document;
            if (id == -1) {
                const item = new vscode.TreeItem(document.uri);
                item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
                item.description = document.languageId;
                item.iconPath = FileIcon;
                return item;
            }
            const ruleId = element.ruleId;
            const line = element.line;
            const rule = grammar._ruleId2desc[ruleId - 1];
            // const _enterPos = rule._enterPos;
            const label = rule._name;
            const item = new vscode.TreeItem(label);
            item.collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
            item.description = line.toString();
            item.iconPath = FileIcon;
            item.tooltip = `Start Index: $s{_enterPos}`;
            // const locations: vscode.Location[] = [];
            // const range = line == 0 ?
            // 	new vscode.Range(0, 0, document.lineCount, 0)
            // 	:
            // 	new vscode.Range(line - 1, _enterPos, line - 1, _enterPos + 1);
            // const location = new vscode.Location(
            // 	document.uri,
            // 	range,
            // );
            // locations.push(location);
            // const position = line == 0 ?
            // 	new vscode.Position(0, 0)
            // 	:
            // 	new vscode.Position(line - 1, _enterPos);
            // const command: vscode.Command = {
            // 	title: `title`,
            // 	tooltip: `tooltip`,
            // 	command: 'editor.action.goToLocations',
            // 	arguments: [
            // 		document.uri,
            // 		position,
            // 		locations,
            // 	]
            // };
            // item.command = command;
            return item;
        }
        return;
    },
    getParent(element) {
        vscode.window.showInformationMessage(JSON.stringify("getParent"));
        vscode.window.showInformationMessage(JSON.stringify(element));
        console.log("getParent");
        console.log(element);
        return;
    },
    resolveTreeItem(item, element, token) {
        // vscode.window.showInformationMessage(JSON.stringify("resolveTreeItem"));
        // vscode.window.showInformationMessage(JSON.stringify(item));
        // vscode.window.showInformationMessage(JSON.stringify(element));
        return item;
    },
    onDidChangeTreeData: onDidChangeTreeData.event,
};
function initCallStackView(context) {
    // vscode.window.showInformationMessage(JSON.stringify("initCallStackView"));
    // context.subscriptions.push(vscode.commands.registerCommand("textmate.callstack", CallStackView, 'context'));
    context.subscriptions.push(vscode.commands.registerTextEditorCommand("textmate.callstack", CallStackView, 'context'));
    // context.subscriptions.push(
    // 	vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor) => {
    // 		// vscode.window.showInformationMessage(JSON.stringify("active"));
    // 		// vscode.window.showInformationMessage(JSON.stringify(editor));
    // 		if (!editor) {
    // 			return;
    // 		}
    // 		const document = editor.document;
    // 		const element: element = {
    // 			line: -1,
    // 			document: document,
    // 		};
    // 		onDidChangeTreeData.fire(element);
    // 	})
    // );
}
exports.initCallStackView = initCallStackView;
async function CallStackView(textEditor, edit, ...args) {
    // vscode.window.showInformationMessage(JSON.stringify("CallStackView"));
    // vscode.window.showInformationMessage(JSON.stringify(textEditor));
    // vscode.window.showInformationMessage(JSON.stringify(edit));
    // vscode.window.showInformationMessage(JSON.stringify(args));
    const document = textEditor.document;
    // const tokenLineResults = await tokenizeFile(document);
    // // vscode.window.showInformationMessage(JSON.stringify(tokenLineResults, stringify));
    // let rootParent = true;
    // let index = 0;
    // const ruleList: {
    // 	scopeName: string,
    // 	ruleId: RuleId,
    // 	depth: number,
    // 	_enterPos: number,
    // 	line: number,
    // }[] = [];
    // for (const tokenLine of tokenLineResults) {
    // 	let parentRule = <StateStackImpl>tokenLine.ruleStack;
    // 	index++;
    // 	const tempRules = [];
    // 	while (parentRule) {
    // 		if (parentRule._enterPos != -1 || rootParent) {
    // 			const rule = {
    // 				scopeName: parentRule.nameScopesList.scopePath.scopeName,
    // 				ruleId: parentRule.ruleId,
    // 				depth: parentRule.depth,
    // 				_enterPos: parentRule._enterPos,
    // 				line: index,
    // 			};
    // 			tempRules.unshift(rule);
    // 			rootParent = false;
    // 		}
    // 		parentRule = parentRule.parent;
    // 	}
    // 	ruleList.push(...tempRules);
    // 	// ruleList = [...ruleList, ...tempRules];
    // }
    // const ruleTree = {};
    // vscode.window.showInformationMessage(JSON.stringify(ruleList, stringify));
    const grammar = await (0, TextMate_1.tokenizeFile)(document);
    onDidChangeTreeData.fire(undefined);
}
function getParents(rule) {
}


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RenameProvider = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
const cursorQuery = `
	(include (value (scopeName) @scopeName))
	(include (value (ruleName) @ruleName))
	;(json (scopeName (value) @root_scopeName))
	(repo (key) @repo)
`;
exports.RenameProvider = {
    /* async */ provideRenameEdits(document, position, newName, token) {
        // vscode.window.showInformationMessage(JSON.stringify("RenameEdit"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const jsonTree = trees.jsonTree;
        const point = (0, TreeSitter_1.toPoint)(position);
        const cursorCapture = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, cursorQuery, point);
        if (!cursorCapture) {
            return;
        }
        const cursorName = cursorCapture.name;
        const cursorNode = cursorCapture.node;
        const cursorText = cursorNode.text;
        const cursorRange = (0, TreeSitter_1.toRange)(cursorNode);
        const rootScopeName = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, `(json (scopeName (value) @scopeName))`).pop()?.node?.text;
        const edits = [];
        const workspaceEdits = new vscode.WorkspaceEdit();
        const uri = document.uri;
        let query = ``;
        switch (cursorName) {
            case 'ruleName':
                query += `(repo (key) @repo (#eq? @repo "${cursorText}"))`;
                query += `(include (value (ruleName) @ruleName) @include (#eq? @include "#${cursorText}"))`;
                if (rootScopeName) {
                    query += `(include (value (ruleName) @ruleName) @include (#eq? @include "${rootScopeName}#${cursorText}"))`;
                }
                break;
            // case 'root_scopeName':
            //	 const uriPackage = vscode.Uri.joinPath(uri, '../../package.json');
            //	 await vscode.workspace.openTextDocument(uriPackage);
            //	 for (const textDocument of vscode.workspace.textDocuments) {
            //	 	if (!vscode.languages.match({ pattern: "**/package.json", scheme: "file" }, textDocument)) {
            //	 		continue;
            //	 	}
            //	 	try {
            //	 		const packageParsed = await JSON.parse(textDocument.getText());
            //	 		const grammars = packageParsed.contributes?.grammars;
            //	 		if (grammars) {
            //	 			for (const grammar of grammars) {
            //	 				if (grammar.scopeName == cursorText) {
            //	 					const edit = new vscode.TextEdit(range, newName); // Cant get range
            //	 					workspaceEdits.set(textDocument.uri, [edit]);
            //	 				}
            //	 			}
            //	 		}
            //	 	} catch (error) {
            //	 	}
            //	 }
            //	 break;
            case 'scopeName':
                query += `(include (value (scopeName) @scopeName (#eq? @scopeName "${cursorText}")))`;
                query += `(json (scopeName (value) @scopeName (#eq? @scopeName "${cursorText}")))`;
                break;
            case 'repo':
                query += `(include (value (ruleName) @ruleName) @include (#eq? @include "#${cursorText}"))`;
                if (rootScopeName) {
                    query += `(include (value (ruleName) @ruleName) @include (#eq? @include "${rootScopeName}#${cursorText}"))`;
                }
                const edit = new vscode.TextEdit(cursorRange, newName);
                edits.push(edit);
                break;
            default:
                return;
        }
        const queryCaptures = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, query);
        for (const queryCapture of queryCaptures) {
            if (queryCapture.name == 'include') {
                continue;
            }
            const node = queryCapture.node;
            const range = (0, TreeSitter_1.toRange)(node);
            const edit = new vscode.TextEdit(range, newName);
            edits.push(edit);
        }
        workspaceEdits.set(uri, edits);
        // vscode.window.showInformationMessage(JSON.stringify(workspaceEdits));
        return workspaceEdits;
    },
    prepareRename(document, position, token) {
        // vscode.window.showInformationMessage(JSON.stringify("Rename"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const jsonTree = trees.jsonTree;
        const point = (0, TreeSitter_1.toPoint)(position);
        const cursorCapture = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, cursorQuery, point);
        if (!cursorCapture) {
            return Promise.reject('Item not renamable');
        }
        // const cursorName = cursorCapture.name;
        const cursorNode = cursorCapture.node;
        const cursorText = cursorNode.text;
        const cursorRange = (0, TreeSitter_1.toRange)(cursorNode);
        // if (cursorName == 'root_scopeName') {
        // 	const uriPackage = vscode.Uri.joinPath(document.uri, '../../package.json');
        // 	vscode.workspace.openTextDocument(uriPackage);
        // }
        const rename = { range: cursorRange, placeholder: cursorText };
        // vscode.window.showInformationMessage(JSON.stringify(rename));
        return rename;
    },
};


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeLensProvider = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
exports.CodeLensProvider = {
    provideCodeLenses(document, token) {
        // vscode.window.showInformationMessage(JSON.stringify("provideCodeLenses"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const tree = trees.jsonTree;
        const query = `
			(json (scopeName (value) @scopeName))
			;(repo (key) @repo)
		`;
        const captures = (0, TreeSitter_1.queryNode)(tree.rootNode, query);
        const codeLenses = [];
        for (const capture of captures) {
            const node = capture.node;
            const range = (0, TreeSitter_1.toRange)(node);
            const codeLens = new vscode.CodeLens(range);
            codeLens.capture = capture;
            codeLens.document = document;
            codeLenses.push(codeLens);
        }
        // vscode.window.showInformationMessage(JSON.stringify(codeLens));
        return codeLenses;
    },
    async resolveCodeLens(codeLen, token) {
        // vscode.window.showInformationMessage(JSON.stringify("resolveCodeLens"));
        const text = codeLen.capture.node.text;
        const uri = codeLen.document.uri;
        const name = codeLen.capture.name;
        const locations = [];
        switch (name) {
            case 'scopeName':
                for (const extension of vscode.extensions.all) {
                    const grammars = extension.packageJSON?.contributes?.grammars;
                    if (grammars) {
                        for (const grammar of grammars) {
                            if (grammar.scopeName == text) {
                                const uri = vscode.Uri.joinPath(extension.extensionUri, 'package.json');
                                await vscode.workspace.openTextDocument(uri);
                            }
                        }
                    }
                }
                const uriPackage = vscode.Uri.joinPath(uri, '../../package.json');
                if (uriPackage.scheme != 'untitled') {
                    await vscode.workspace.openTextDocument(uriPackage);
                }
                for (const textDocument of vscode.workspace.textDocuments) {
                    if (!vscode.languages.match({ pattern: "**/package.json" }, textDocument)) {
                        continue;
                    }
                    try {
                        const packageJSON = await JSON.parse(textDocument.getText());
                        const grammars = packageJSON?.contributes?.grammars;
                        if (grammars) {
                            for (const grammar of grammars) {
                                if (grammar.scopeName == text) {
                                    const location = new vscode.Location(textDocument.uri, new vscode.Range(0, 0, textDocument.lineCount, 1000));
                                    locations.push(location);
                                    break;
                                }
                            }
                        }
                    }
                    catch (error) { }
                }
                break;
            case 'repo':
                break;
            default:
                return;
        }
        const length = locations.length;
        const command = {
            title: `${length} reference${length == 1 ? '' : 's'}`,
            tooltip: `${name}: ${text}`,
            command: 'editor.action.showReferences',
            arguments: [
                uri,
                codeLen.range.start,
                locations,
            ]
        };
        const codeLens = new vscode.CodeLens(codeLen.range, command);
        // vscode.window.showInformationMessage(JSON.stringify(codeLens));
        return codeLens;
    },
};


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReferenceProvider = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
exports.ReferenceProvider = {
    provideReferences(document, position, context, token) {
        // vscode.window.showInformationMessage(JSON.stringify("references"));
        const tree = (0, TreeSitter_1.getTree)(document);
        const point = (0, TreeSitter_1.toPoint)(position);
        let queryString;
        // vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.namedDescendantForPosition(point).text));
        queryString = `
			;(json (scopeName (value) @scopeName))
			(include (value) @include)
			(repo (key) @repo)
		`;
        // const referenceQueryCapture = queryForPosition(tree, queryString, point);
        const referenceQueryCapture = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString, point);
        if (referenceQueryCapture == null) {
            return;
        }
        const node = referenceQueryCapture.node;
        const text = node.text;
        // vscode.window.showInformationMessage(JSON.stringify(node.toString()));
        queryString = `(json (scopeName (value) @scopeName))`;
        const rootScopeName = (0, TreeSitter_1.queryForPosition)(tree, queryString)?.node?.text;
        switch (referenceQueryCapture.name) {
            case 'repo':
                if (text == '$self' || text == '$base') {
                    return;
                }
                queryString =
                    `(include (value) @include (#eq? @include "#${text}"))` +
                        `(repo (key) @repo (#eq? @repo "${text}"))`;
                if (rootScopeName && text)
                    queryString += `(include (value) @include (#eq? @include "${rootScopeName}#${text}"))`;
                break;
            case 'include': // move to own function. Can be used for code-lens and symbol-highlight etc
                /*
                                        *fail
                #invalid				*fail
                invalid					*fail
                invalid#				*fail
                invalid#$self			*fail
                invalid#$base			*fail
                invalid#invalid			*fail
                $self					$self
                #$self					$self
                source.same				$self
                source.same#			$self
                source.same#$self		$self
                $base					$base
                #$base					$base
                source.same#$base		$base
                source.other#$base		$base
                #						#include
                #include				#include
                source.same#include		#include
                source.other			other
                source.other#			other
                source.other#$self		other
                source.other#include	other#include
                */
                if (text == '') { // *fail
                    // vscode.window.showInformationMessage("*fail");
                    return;
                }
                if (node.childForFieldName('base')) { // $base
                    // vscode.window.showInformationMessage("$base");
                    queryString = `(include (value) @include (#match? @include "^([^#]*#)?\\\\$base$"))`;
                }
                else {
                    const scopeName = node.childForFieldName('scopeName')?.text;
                    const ruleName = node.childForFieldName('ruleName')?.text;
                    if (scopeName && scopeName != rootScopeName) {
                        if (ruleName) { // other#include
                            // vscode.window.showInformationMessage("other#include");
                            queryString = `(include (value) @include (#eq? @include "${scopeName}#${ruleName}"))`;
                        }
                        else { // other
                            // vscode.window.showInformationMessage("other");
                            queryString =
                                `(include (value) @include (#eq? @include "${scopeName}"))` +
                                    `(include (value) @include (#eq? @include "${scopeName}#"))` +
                                    `(include (value) @include (#eq? @include "${scopeName}#$self"))`;
                        }
                    }
                    else if (node.childForFieldName('self') || (scopeName && !ruleName)) { // $self
                        // vscode.window.showInformationMessage("$self");
                        queryString =
                            `(include (value) @include (#match? @include "^#?\\\\$self$"))`;
                        if (rootScopeName) {
                            queryString +=
                                `(include (value) @include (#eq? @include "${rootScopeName}"))` +
                                    `(include (value) @include (#eq? @include "${rootScopeName}#"))` +
                                    `(include (value) @include (#eq? @include "${rootScopeName}#$self"))`;
                        }
                    }
                    else { // #include
                        // vscode.window.showInformationMessage("#include");
                        queryString =
                            `(include (value) @include (#eq? @include "#${ruleName}"))` +
                                `(repo (key) @repo (#eq? @repo "${ruleName}"))`;
                        if (ruleName) {
                            queryString += `(include (value) @include (#eq? @include "${rootScopeName}#${ruleName}"))`;
                        }
                    }
                }
                break;
            default:
                return;
        }
        // vscode.window.showInformationMessage(queryString);
        const language = tree.getLanguage();
        const query = language.query(queryString);
        const queryCaptures = query.captures(tree.rootNode);
        const locations = [];
        const uri = document.uri;
        for (const queryCapture of queryCaptures) {
            if (queryCapture.name == 'include') {
                const range = (0, TreeSitter_1.toRange)(queryCapture.node); // .parent?
                const location = new vscode.Location(uri, range);
                locations.push(location);
            }
        }
        // if (referenceQueryCapture.name == 'repo' && locations.length == 0) {
        // 	const range = toRange(node); // .parent?
        // 	const location = new vscode.Location(uri, range);
        // 	locations.push(location);
        // }
        if (( /* referenceQueryCapture.name == 'repo' && */locations.length == 0) ||
            (referenceQueryCapture.name == 'include' && locations.length <= 1)) {
            for (const queryCapture of queryCaptures) {
                if (queryCapture.name == 'repo') {
                    const range = (0, TreeSitter_1.toRange)(queryCapture.node); // .parent?
                    const location = new vscode.Location(uri, range);
                    locations.push(location);
                }
            }
        }
        // vscode.window.showInformationMessage(JSON.stringify(locations));
        return locations;
    }
};


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefinitionProvider = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
const extension_1 = __webpack_require__(0);
exports.DefinitionProvider = {
    async provideDefinition(document, position, token) {
        // vscode.window.showInformationMessage(JSON.stringify("Definition"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const tree = trees.jsonTree;
        const point = (0, TreeSitter_1.toPoint)(position);
        // vscode.window.showInformationMessage(JSON.stringify(tree.rootNode.namedDescendantForPosition(point).text));
        const cursorQuery = `
			(json (scopeName (value) @scopeName))
			(repo (key) @repo)
			(include (value) @include)
			(captures (capture (key) @capture))
			(beginCaptures (capture (key) @beginCapture))
			(endCaptures (capture (key) @endCapture))
			(whileCaptures (capture (key) @whileCapture))
			;(match (regex) @regex)
		`;
        const cursorCapture = (0, TreeSitter_1.queryNode)(tree.rootNode, cursorQuery, point);
        // vscode.window.showInformationMessage(JSON.stringify(cursorCapture));
        if (cursorCapture == null) {
            return;
        }
        const node = cursorCapture.node;
        // vscode.window.showInformationMessage(JSON.stringify(node));
        const originSelectionRange = (0, TreeSitter_1.toRange)(node);
        if (!originSelectionRange.contains(position)) {
            return;
        }
        const text = node.text;
        let queryString;
        // vscode.window.showInformationMessage(JSON.stringify(node.text));
        const definitions = [];
        switch (cursorCapture.name) {
            case 'scopeName':
                for (const extension of vscode.extensions.all) {
                    const grammars = extension.packageJSON?.contributes?.grammars;
                    if (grammars) {
                        for (const grammar of grammars) {
                            if (grammar.scopeName == text) {
                                const uri = vscode.Uri.joinPath(extension.extensionUri, 'package.json');
                                await vscode.workspace.openTextDocument(uri);
                            }
                        }
                    }
                }
                const uri = vscode.Uri.joinPath(document.uri, '../../package.json');
                if (uri) {
                    await vscode.workspace.openTextDocument(uri);
                }
                for (const textDocument of vscode.workspace.textDocuments) {
                    if (!vscode.languages.match({ pattern: "**/package.json" }, textDocument)) {
                        continue;
                    }
                    try {
                        const packageJSON = await JSON.parse(textDocument.getText());
                        const grammars = packageJSON?.contributes?.grammars;
                        if (grammars) {
                            for (const grammar of grammars) {
                                if (grammar.scopeName == text) {
                                    const definitionLink = {
                                        originSelectionRange: originSelectionRange, // Underlined text
                                        targetUri: textDocument.uri,
                                        targetRange: new vscode.Range(0, 0, textDocument.lineCount, 1000), // Hover text
                                        targetSelectionRange: new vscode.Range(0, 0, textDocument.lineCount + 1, 0) // Highlighted text
                                    };
                                    definitions.push(definitionLink);
                                }
                            }
                        }
                    }
                    catch (error) {
                    }
                }
                break;
            case 'repo':
                if (text == '$self' || text == '$base') {
                    return;
                }
                // Call ReferenceProvider() (see at bottom)
                break;
            case 'include':
                if (node.childForFieldName('base')) { // $base
                    // Call ReferenceProvider() (see at bottom)
                    break;
                }
                queryString = `(json (scopeName (value) @scopeName))`;
                const rootScopeNameNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString).pop()?.node ?? null;
                const rootScopeNameText = rootScopeNameNode?.text ?? '';
                const scopeName = node.childForFieldName('scopeName')?.text ?? '';
                const ruleName = node.childForFieldName('ruleName')?.text ?? '';
                queryString = `(json (patterns) @patterns)`;
                const rootPatternsNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString).pop()?.node;
                const rootPatternsRange = (0, TreeSitter_1.toRange)(rootPatternsNode);
                if ((node.childForFieldName('self') && !scopeName) || (scopeName == rootScopeNameText && !ruleName)) { // $self
                    if (rootPatternsNode == null) {
                        break;
                    }
                    const targetSelectionRange = rootPatternsRange.contains(originSelectionRange) ?
                        (0, TreeSitter_1.toRange)(rootPatternsNode.childForFieldName('key')) :
                        rootPatternsRange;
                    const locationLink = {
                        originSelectionRange: originSelectionRange, // Underlined text
                        targetUri: document.uri,
                        targetRange: rootPatternsRange, // Hover text
                        targetSelectionRange: targetSelectionRange // Highlighted text
                    };
                    definitions.push(locationLink);
                    break;
                }
                if (!scopeName || scopeName == rootScopeNameText) { // #include
                    queryString = `(repo
										[(patterns) (include)] (repository
											(repo
												(key) @repo (.eq? @repo "${ruleName}")))
										!match !begin)`;
                    const nestedRepoNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString, point, false)?.node;
                    if (nestedRepoNode) {
                        const locationLink = {
                            originSelectionRange: originSelectionRange, // Underlined text
                            targetUri: document.uri,
                            targetRange: (0, TreeSitter_1.toRange)(nestedRepoNode.parent), // Hover text
                            targetSelectionRange: (0, TreeSitter_1.toRange)(nestedRepoNode) // Highlighted text
                        };
                        definitions.push(locationLink);
                        break;
                    }
                    queryString = `(json (repository (repo (key) @repo (.eq? @repo "${ruleName}"))))`;
                    const rootRepoNode = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString).pop()?.node;
                    if (rootRepoNode) {
                        const locationLink = {
                            originSelectionRange: originSelectionRange, // Underlined text
                            targetUri: document.uri,
                            targetRange: (0, TreeSitter_1.toRange)(rootRepoNode.parent), // Hover text
                            targetSelectionRange: (0, TreeSitter_1.toRange)(rootRepoNode) // Highlighted text
                        };
                        definitions.push(locationLink);
                    }
                    break;
                }
                for (const extension of vscode.extensions.all) { // other
                    const grammars = extension.packageJSON?.contributes?.grammars;
                    if (grammars) {
                        for (const grammar of grammars) {
                            if (grammar.scopeName == scopeName) {
                                const uri = vscode.Uri.joinPath(extension.extensionUri, grammar.path);
                                const document = await vscode.workspace.openTextDocument(uri);
                                vscode.languages.setTextDocumentLanguage(document, 'json-textmate');
                            }
                        }
                    }
                }
                for (const textDocument of vscode.workspace.textDocuments) { // other#include
                    if (!vscode.languages.match(extension_1.DocumentSelector, textDocument)) {
                        continue;
                    }
                    const documentTree = (0, TreeSitter_1.getTree)(textDocument);
                    queryString = `(json (scopeName (value) @scopeName (.eq? @scopeName "${scopeName}")))`;
                    const documentScopeNameNode = (0, TreeSitter_1.queryNode)(documentTree.rootNode, queryString).pop()?.node;
                    if (documentScopeNameNode) {
                        if (ruleName) { // source.other#include
                            queryString = `(json (repository (repo (key) @repo (.eq? @repo "${ruleName}"))))`;
                            const repoNode = (0, TreeSitter_1.queryNode)(documentTree.rootNode, queryString).pop()?.node;
                            if (repoNode) {
                                const locationLink = {
                                    originSelectionRange: originSelectionRange, // Underlined text
                                    targetUri: textDocument.uri,
                                    targetRange: (0, TreeSitter_1.toRange)(repoNode.parent), // Hover text
                                    targetSelectionRange: (0, TreeSitter_1.toRange)(repoNode) // Highlighted text
                                };
                                definitions.push(locationLink);
                            }
                        }
                        else { // source.other
                            queryString = `(json (patterns) @patterns)`;
                            const documentPatternsNode = (0, TreeSitter_1.queryNode)(documentTree.rootNode, queryString).pop()?.node;
                            const locationLink = {
                                originSelectionRange: originSelectionRange, // Underlined text
                                targetUri: textDocument.uri,
                                targetRange: (0, TreeSitter_1.toRange)(documentPatternsNode), // Hover text
                                targetSelectionRange: (0, TreeSitter_1.toRange)(documentScopeNameNode) // Highlighted text
                            };
                            definitions.push(locationLink);
                        }
                    }
                }
                break;
            case 'capture':
                const tripleParent = node.parent.parent.parent;
                if (tripleParent.childForFieldName('match')) {
                    const matchGroup = getRegexGroup(trees, node, 'match');
                    const groupRange = (0, TreeSitter_1.toRange)(matchGroup);
                    const locationLink = {
                        originSelectionRange: originSelectionRange, // Underlined text
                        targetUri: document.uri,
                        targetRange: groupRange, // Hover text
                        targetSelectionRange: groupRange // Highlighted text
                    };
                    definitions.push(locationLink);
                    break;
                }
                if (!tripleParent.childForFieldName('begin')) {
                    break;
                }
                if (!(0, TreeSitter_1.getLastNode)(tripleParent, 'beginCaptures')) {
                    const beginGroup = getRegexGroup(trees, node, 'begin');
                    if (beginGroup) {
                        const groupRange = (0, TreeSitter_1.toRange)(beginGroup);
                        const locationLink = {
                            originSelectionRange: originSelectionRange, // Underlined text
                            targetUri: document.uri,
                            targetRange: groupRange, // Hover text
                            targetSelectionRange: groupRange // Highlighted text
                        };
                        definitions.push(locationLink);
                    }
                }
                if (tripleParent.childForFieldName('while')) {
                    if (!tripleParent.childForFieldName('whileCaptures')) {
                        const whileNode = getRegexGroup(trees, node, 'while');
                        if (whileNode) {
                            const groupRange = (0, TreeSitter_1.toRange)(whileNode);
                            const locationLink = {
                                originSelectionRange: originSelectionRange, // Underlined text
                                targetUri: document.uri,
                                targetRange: groupRange, // Hover text
                                targetSelectionRange: groupRange // Highlighted text
                            };
                            definitions.push(locationLink);
                        }
                    }
                    break;
                }
                if (!tripleParent.childForFieldName('endCaptures')) {
                    const endGroup = getRegexGroup(trees, node, 'end');
                    if (endGroup) {
                        const groupRange = (0, TreeSitter_1.toRange)(endGroup);
                        const locationLink = {
                            originSelectionRange: originSelectionRange, // Underlined text
                            targetUri: document.uri,
                            targetRange: groupRange, // Hover text
                            targetSelectionRange: groupRange // Highlighted text
                        };
                        definitions.push(locationLink);
                    }
                }
                break;
            case 'beginCapture':
                // const beginNode = queryNode(node.parent.parent.parent, `(begin (regex) @begin)`).pop()?.node;
                // const beginRegexTrees = trees.regexTrees;
                // const beginRegexNode = beginRegexTrees[beginNode.id]?.rootNode;
                // const beginIndex = parseInt(text); // Ignores random characters after the first numeric, just like VSCode TextMate
                // const beginGroupQuery = `
                // 	(capture_group) @group
                // 	(capture_group_name) @name
                // `;
                // const beginGroupCaptures = queryNode(beginRegexNode, beginGroupQuery);
                // const beginGroupRange = toRange(beginIndex ? beginGroupCaptures[beginIndex - 1].node : beginRegexNode);
                const beginGroupRange = (0, TreeSitter_1.toRange)(getRegexGroup(trees, node, 'begin'));
                const beginLocationLink = {
                    originSelectionRange: originSelectionRange, // Underlined text
                    targetUri: document.uri,
                    targetRange: beginGroupRange, // Hover text
                    targetSelectionRange: beginGroupRange // Highlighted text
                };
                definitions.push(beginLocationLink);
                break;
            case 'endCapture':
                // const endNode = queryNode(node.parent.parent.parent, `(end (regex) @end)`).pop()?.node;
                // const endRegexTrees = trees.regexTrees;
                // const endRegexNode = endRegexTrees[endNode.id]?.rootNode;
                // const endIndex = parseInt(text); // Ignores random characters after the first numeric, just like VSCode TextMate
                // const endGroupQuery = `
                // 	(capture_group) @group
                // 	(capture_group_name) @name
                // `;
                // const endGroupCaptures = queryNode(endRegexNode, endGroupQuery);
                // const endGroupRange = toRange(endIndex ? endGroupCaptures[endIndex - 1].node : endRegexNode);
                const endGroupRange = (0, TreeSitter_1.toRange)(getRegexGroup(trees, node, 'end'));
                const endLocationLink = {
                    originSelectionRange: originSelectionRange, // Underlined text
                    targetUri: document.uri,
                    targetRange: endGroupRange, // Hover text
                    targetSelectionRange: endGroupRange // Highlighted text
                };
                definitions.push(endLocationLink);
                break;
            case 'whileCapture':
                // const whileNode = getLastNode(node.parent.parent.parent, 'while');
                // const whileRegexTrees = trees.regexTrees;
                // const whileRegexNode = whileRegexTrees[whileNode.childForFieldName('regex').id]?.rootNode;
                // const whileIndex = parseInt(text); // Ignores random characters after the first numeric, just like VSCode TextMate
                // const whileGroupQuery = `
                // 		(capture_group) @group
                // 		(capture_group_name) @name
                // 	`;
                // const whileGroupCaptures = queryNode(whileRegexNode, whileGroupQuery);
                // const whileGroupRange = toRange(whileIndex ? whileGroupCaptures[whileIndex - 1].node : whileRegexNode);
                const whileGroupRange = (0, TreeSitter_1.toRange)(getRegexGroup(trees, node, 'while'));
                const whileLocationLink = {
                    originSelectionRange: originSelectionRange, // Underlined text
                    targetUri: document.uri,
                    targetRange: whileGroupRange, // Hover text
                    targetSelectionRange: whileGroupRange // Highlighted text
                };
                definitions.push(whileLocationLink);
                break;
            case 'regex':
                const regexGroupRefs = getCaptureRefs(trees, node, position);
                if (!regexGroupRefs) {
                    return;
                }
                for (const capture of regexGroupRefs.captures) {
                    const targetRange = (0, TreeSitter_1.toRange)(capture.node);
                    const regexLocationLink = {
                        originSelectionRange: regexGroupRefs.range, // Underlined text
                        targetUri: document.uri,
                        targetRange: targetRange, // Hover text
                        targetSelectionRange: targetRange // Highlighted text
                    };
                    definitions.push(regexLocationLink);
                }
                return definitions;
            default:
                return;
        }
        if (definitions.length == 0) {
            // vscode will automatically run the ReferenceProvider() if the only location overlaps with the input
            const targetRange = (0, TreeSitter_1.toRange)(node.parent);
            const definitionLink = {
                originSelectionRange: originSelectionRange, // Underlined text
                targetUri: document.uri,
                targetRange: targetRange // Hover text
            };
            definitions.push(definitionLink);
        }
        // vscode.window.showInformationMessage(JSON.stringify(definitions));
        return definitions;
    }
};
function getCaptureRefs(trees, node, position) {
    const regexTrees = trees.regexTrees;
    const regexNode = regexTrees[node.id]?.rootNode;
    const captureGroupQuery = `
		(capture_group) @group
		(capture_group_extended) @group
		(capture_group_name) @name
		(capture_group_name_extended) @name
	`;
    let groupNode;
    const groupCaptures = (0, TreeSitter_1.queryNode)(regexNode, captureGroupQuery);
    let index = groupCaptures.length;
    while (groupCaptures.length) {
        const captureNode = groupCaptures.pop().node;
        if ((0, TreeSitter_1.toRange)(captureNode).contains(position)) {
            groupNode = captureNode;
            break;
        }
        index--;
    }
    vscode.window.showInformationMessage(JSON.stringify(index));
    if (!groupNode) {
        return;
    }
    const groupSyntaxQuery = `
		"(" @open
		")" @close
		"(?<" @open
		"(?'" @open
		">" @close
		"'" @close
		(name) @name
	`;
    // const startPoint = toPoint(new vscode.Position(position.line, position.character - 1));
    const startPoint = { row: position.line, column: position.character - 1 };
    // const endPoint = toPoint(new vscode.Position(position.line, position.character + 1));
    const endPoint = { row: position.line, column: position.character + 1 };
    const groupSyntaxNode = (0, TreeSitter_1.queryNode)(groupNode, groupSyntaxQuery, startPoint, endPoint).pop()?.node;
    if (!groupSyntaxNode) {
        return;
    }
    const targetQuery = `
		;(regex (subroutine (number)) @subroutine)
		(regex (subroutine (number)) @subroutine (#eq? @subroutine "\\\\\\\\g<${index}>"))
	`;
    const targetCaptures = (0, TreeSitter_1.queryNode)(regexNode, targetQuery);
    vscode.window.showInformationMessage(JSON.stringify(regexNode.toString()));
    vscode.window.showInformationMessage(JSON.stringify(targetCaptures));
    return { range: (0, TreeSitter_1.toRange)(groupNode), captures: targetCaptures };
}
function getRegexGroup(trees, captureNode, type) {
    const node = (0, TreeSitter_1.getLastNode)(captureNode.parent.parent.parent, type);
    const regexTrees = trees.regexTrees;
    const regexNode = regexTrees[node.childForFieldName('regex').id]?.rootNode;
    const index = parseInt(captureNode.text); // Ignores random characters after the first numeric, just like VSCode TextMate
    if (index == 0) {
        return regexNode;
    }
    const query = `
		(capture_group) @group
		(capture_group_extended) @group
		(capture_group_name) @name
		(capture_group_name_extended) @name
	`;
    const captures = (0, TreeSitter_1.queryNode)(regexNode, query);
    return captures[index - 1]?.node;
}


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CallHierarchyProvider = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
const DocumentSymbolProvider_1 = __webpack_require__(35);
exports.CallHierarchyProvider = {
    prepareCallHierarchy(document, position, token) {
        // vscode.window.showInformationMessage(JSON.stringify("CallHierarchy"));
        const uri = document.uri;
        const trees = (0, TreeSitter_1.getTrees)(uri);
        const tree = trees.jsonTree;
        const rootNode = tree.rootNode;
        const point = (0, TreeSitter_1.toPoint)(position);
        const includeQuery = `(include (value !scopeName (ruleName) @include))`; // TODO: support scopeNames
        const includeCapture = (0, TreeSitter_1.queryNode)(rootNode, includeQuery, point);
        const includeText = includeCapture?.node?.text;
        const repoQuery = includeText ? `
			(json (repository (repo (key) @repo (.eq? @repo "${includeText}"))))
			(repo
				[(patterns) (include)] (repository
					(repo
						(key) @repo (.eq? @repo "${includeText}")))
				!match !begin)
		`
            : `(repo (key) @repo)`;
        const repoCapture = (0, TreeSitter_1.queryNode)(rootNode, repoQuery, point, false);
        if (!repoCapture) {
            return;
        }
        const node = repoCapture.node;
        const selectionRange = (0, TreeSitter_1.toRange)(node);
        const range = (0, TreeSitter_1.toRange)((0, TreeSitter_1.trueParent)(node));
        const detail = (0, TreeSitter_1.getComment)(node);
        const name = node.text;
        const kind = DocumentSymbolProvider_1.SymbolKind[repoCapture.name];
        const callHierarchyItem = new vscode.CallHierarchyItem(kind, name, detail, uri, range, selectionRange);
        // vscode.window.showInformationMessage(JSON.stringify(callHierarchyItem));
        return callHierarchyItem;
    },
    provideCallHierarchyIncomingCalls(item, token) {
        // vscode.window.showInformationMessage(JSON.stringify("CallHierarchyIncoming"));
        // vscode.window.showInformationMessage(JSON.stringify(item));
        const uri = item.uri;
        const trees = (0, TreeSitter_1.getTrees)(uri);
        const tree = trees.jsonTree;
        const rootNode = tree.rootNode;
        const callHierarchyIncomingCalls = [];
        const includeQuery = `(include (value !scopeName (ruleName) @include (.eq? @include "${item.name}")))`;
        const includeCaptures = (0, TreeSitter_1.queryNode)(rootNode, includeQuery);
        for (const includeCapture of includeCaptures) {
            const includeNode = includeCapture.node;
            const selectionRange = (0, TreeSitter_1.toRange)(includeNode);
            const range = (0, TreeSitter_1.toRange)((0, TreeSitter_1.trueParent)(includeNode));
            const targetQuery = `
				(json (scopeName (value) @scopeName))
				(repo (key) @repo)
			`;
            const targetCapture = (0, TreeSitter_1.queryNode)(rootNode, targetQuery, includeNode.startPosition, false);
            const targetNode = targetCapture.node;
            const detail = (0, TreeSitter_1.getComment)(targetNode);
            const name = targetNode.text;
            const kind = DocumentSymbolProvider_1.SymbolKind[includeCapture.name];
            const callHierarchyItem = new vscode.CallHierarchyItem(kind, name, detail, uri, range, selectionRange);
            const ranges = [range];
            const callHierarchyIncomingCall = new vscode.CallHierarchyIncomingCall(callHierarchyItem, ranges);
            callHierarchyIncomingCalls.push(callHierarchyIncomingCall);
        }
        // vscode.window.showInformationMessage(JSON.stringify(callHierarchyOutgoingCalls));
        return callHierarchyIncomingCalls;
    },
    provideCallHierarchyOutgoingCalls(item, token) {
        // vscode.window.showInformationMessage(JSON.stringify("CallHierarchyOutgoing"));
        // vscode.window.showInformationMessage(JSON.stringify(item));
        const uri = item.uri;
        const trees = (0, TreeSitter_1.getTrees)(uri);
        const tree = trees.jsonTree;
        const rootNode = tree.rootNode;
        const callHierarchyOutgoingCalls = [];
        const includeQuery = `
			;(include (value) @include)
			(include (value !scopeName (ruleName) @include))
		`;
        const startPoint = (0, TreeSitter_1.toPoint)(item.range.start);
        const endPoint = (0, TreeSitter_1.toPoint)(item.range.end);
        const includeCaptures = (0, TreeSitter_1.queryNode)(rootNode, includeQuery, startPoint, endPoint);
        for (const includeCapture of includeCaptures) {
            const includeNode = includeCapture.node;
            const includeText = includeNode.text;
            const repoQuery = `
				(json (repository (repo (key) @repo (.eq? @repo "${includeText}"))))
				(repo
					[(patterns) (include)] (repository
						(repo
							(key) @repo (.eq? @repo "${includeText}")))
					!match !begin)
			`;
            const repoCapture = (0, TreeSitter_1.queryNode)(rootNode, repoQuery, startPoint, false);
            if (!repoCapture) {
                continue;
            }
            const repoNode = repoCapture.node;
            const selectionRange = (0, TreeSitter_1.toRange)(repoNode);
            const range = (0, TreeSitter_1.toRange)((0, TreeSitter_1.trueParent)(repoNode));
            const text = repoNode.text;
            const detail = (0, TreeSitter_1.getComment)(repoNode);
            const kind = DocumentSymbolProvider_1.SymbolKind[repoCapture.name];
            const callHierarchyItem = new vscode.CallHierarchyItem(kind, text, detail, uri, range, selectionRange);
            const parentRange = (0, TreeSitter_1.toRange)((0, TreeSitter_1.trueParent)(includeNode));
            const ranges = [parentRange];
            const callHierarchyOutgoingCall = new vscode.CallHierarchyOutgoingCall(callHierarchyItem, ranges);
            callHierarchyOutgoingCalls.push(callHierarchyOutgoingCall);
        }
        // vscode.window.showInformationMessage(JSON.stringify(callHierarchyOutgoingCalls));
        return callHierarchyOutgoingCalls;
    },
};


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentSymbolProvider = exports.SymbolKind = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
exports.SymbolKind = {
    /*
        'File': vscode.SymbolKind.File,
        'Module': vscode.SymbolKind.Module,
        'Namespace': vscode.SymbolKind.Namespace,
        'Package': vscode.SymbolKind.Package,
        'Class': vscode.SymbolKind.Class,
        'Method': vscode.SymbolKind.Method,
        'Property': vscode.SymbolKind.Property,
        'Field': vscode.SymbolKind.Field,
        'Constructor': vscode.SymbolKind.Constructor,
        'Enum': vscode.SymbolKind.Enum,
        'Interface': vscode.SymbolKind.Interface,
        'Function': vscode.SymbolKind.Function,
        'Variable': vscode.SymbolKind.Variable,
        'Constant': vscode.SymbolKind.Constant,
        'String': vscode.SymbolKind.String,
        'Number': vscode.SymbolKind.Number,
        'Boolean': vscode.SymbolKind.Boolean,
        'Array': vscode.SymbolKind.Array,
        'Object': vscode.SymbolKind.Object,
        'Key': vscode.SymbolKind.String,
        'Null': vscode.SymbolKind.Null,
        'EnumMember': vscode.SymbolKind.EnumMember,
        'Struct': vscode.SymbolKind.Struct,
        'Event': vscode.SymbolKind.Event,
        'Operator': vscode.SymbolKind.Operator,
        'TypeParameter': vscode.SymbolKind.TypeParameter,
    */
    'json': vscode.SymbolKind.File,
    'patterns': vscode.SymbolKind.Array,
    'pattern': vscode.SymbolKind.Number,
    'repository': vscode.SymbolKind.Object,
    'repo': vscode.SymbolKind.Function,
    'captures': vscode.SymbolKind.Field,
    'beginCaptures': vscode.SymbolKind.Field,
    'endCaptures': vscode.SymbolKind.Field,
    'capture': vscode.SymbolKind.Number,
    'match': vscode.SymbolKind.String,
    'begin': vscode.SymbolKind.String,
    'end': vscode.SymbolKind.String,
    'while': vscode.SymbolKind.String,
    'scopeName': vscode.SymbolKind.String,
    'name_scope': vscode.SymbolKind.String,
    'name': vscode.SymbolKind.String,
    'version': vscode.SymbolKind.String,
    'schema': vscode.SymbolKind.String,
    'fileTypes': vscode.SymbolKind.String,
    'firstLineMatch': vscode.SymbolKind.String,
    'foldingStartMarker': vscode.SymbolKind.String,
    'foldingStopMarker': vscode.SymbolKind.String,
    'uuid': vscode.SymbolKind.Number,
    'injectionSelector': vscode.SymbolKind.String,
    'injections': vscode.SymbolKind.Object,
    'injection': vscode.SymbolKind.Number,
    'include': vscode.SymbolKind.Variable,
    'comment': vscode.SymbolKind.String,
    'comment_slash': vscode.SymbolKind.String,
    'object': vscode.SymbolKind.Object,
    'array': vscode.SymbolKind.Array,
    'item': vscode.SymbolKind.String,
    'value': vscode.SymbolKind.Key,
    'key': vscode.SymbolKind.Property,
    'boolean': vscode.SymbolKind.Boolean,
    'null': vscode.SymbolKind.Null,
    'integer': vscode.SymbolKind.Number,
    'string': vscode.SymbolKind.String,
    'regex': vscode.SymbolKind.Event,
    '{': vscode.SymbolKind.Object,
    '}': vscode.SymbolKind.Object,
    '[': vscode.SymbolKind.Array,
    ']': vscode.SymbolKind.Array,
    ',': vscode.SymbolKind.Property,
    ':': vscode.SymbolKind.Property,
    '"': vscode.SymbolKind.Property,
    'literal': vscode.SymbolKind.String,
    'backslash': vscode.SymbolKind.Property,
};
exports.DocumentSymbolProvider = {
    provideDocumentSymbols(document, token) {
        // vscode.window.showInformationMessage(JSON.stringify("documentSymbol"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const tree = trees.jsonTree;
        let node = tree.rootNode;
        let index = 0;
        let documentSymbol = newDocumentSymbol(node);
        const nodeStack = [];
        const indexStack = [];
        const documentSymbolStack = [];
        while (true) {
            // let childNode = node.child(index);
            let childNode = node.namedChild(index);
            if (!childNode) {
                node = nodeStack.pop();
                if (node === undefined) {
                    break;
                }
                index = indexStack.pop();
                index++;
                const tempSymbol = documentSymbolStack.pop();
                tempSymbol.children.push(documentSymbol);
                documentSymbol = tempSymbol;
                continue;
            }
            if (childNode.type == 'regex') {
                childNode = (0, TreeSitter_1.getRegexNode)(trees, childNode) ?? childNode;
                // childNode = regexTrees[childNode.id]?.rootNode ?? childNode;
            }
            // if (childNode.childCount && indexStack.length < 900) { // StackOverFlow
            if (childNode.namedChildCount && indexStack.length < 900) { // StackOverFlow
                nodeStack.push(node);
                indexStack.push(index);
                documentSymbolStack.push(documentSymbol);
                documentSymbol = newDocumentSymbol(childNode);
                node = childNode;
                index = 0;
                continue;
            }
            documentSymbol.children.push(newDocumentSymbol(childNode));
            index++;
        }
        return [documentSymbol];
    },
};
function newDocumentSymbol(node) {
    let text;
    switch (node.type) {
        case 'pattern':
        case 'injection':
            let index = 0;
            let sibling = node;
            while (sibling = sibling.previousNamedSibling) {
                index++;
            }
            text = index.toString();
            break;
        case 'repo':
        case 'capture':
            text = node.firstNamedChild.text;
            break;
        case 'name_scope':
            text = 'name';
            break;
        case 'value':
            text = node.text;
            break;
    }
    const name = text?.slice(0, 50) || node.type;
    const detail = node.text.slice(0, 50);
    const kind = exports.SymbolKind[node.type] ?? (node.isNamed() ? vscode.SymbolKind.Method : vscode.SymbolKind.Field);
    const range = (0, TreeSitter_1.toRange)(node);
    const selectionRange = range;
    // const selectionRange = toRange(node.firstNamedChild) ?? range;
    const documentSymbol = new vscode.DocumentSymbol(name, detail, kind, range, selectionRange);
    // vscode.window.showInformationMessage(JSON.stringify(documentSymbol));
    return documentSymbol;
}


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentHighlightProvider = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
exports.DocumentHighlightProvider = {
    provideDocumentHighlights(document, position, token) {
        // vscode.window.showInformationMessage(JSON.stringify("DocumentHighlights"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const jsonTree = trees.jsonTree;
        const point = (0, TreeSitter_1.toPoint)(position);
        const cursorQuery = `
			(key) @key
			(value !scopeName !ruleName !self !base) @value
			(capture . (key) @key)
			(repo . (key) @repo)
			(json (scopeName (value) @rootScopeName))
			(include (value (scopeName) !ruleName !base) @scopeName)
			(include (value (ruleName)) @include)
			(include (value !scopeName (self) @self))
			(include (value (base) @base))
			(name_scope (value (scope) @scope))
		`;
        const cursorCapture = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, cursorQuery, point);
        if (!cursorCapture) {
            return;
        }
        const cursorName = cursorCapture.name;
        const cursorNode = cursorCapture.node;
        const cursorText = cursorNode.text;
        // const cursorRange = toRange(cursorNode);
        // const scopeName = cursorNode.parent.childForFieldName('scopeName')?.text;
        const rootScopeName = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, `(json (scopeName (value) @scopeName))`).pop()?.node?.text;
        let query = ``;
        switch (cursorName) {
            case 'key':
                const cursorType = (0, TreeSitter_1.trueParent)(cursorNode).type;
                // const cursorType = cursorText ? cursorNode.parent.type : cursorNode.parent.parent.type;
                query = `(${cursorType} . (key) @key (#eq? @key "${cursorText}"))`;
                break;
            case 'value':
                query = `(_ (value) @value (#eq? @value "${cursorText}"))`;
                break;
            case 'repo':
                query = `(repo (key) @repo (#eq? @repo "${cursorText}"))`;
                query += `(include (value (scopeName)? @_scopeName (#eq? @_scopeName "${rootScopeName}") (ruleName) @_ruleName (#eq? @_ruleName "${cursorText}")) @include)`;
                break;
            case 'self':
            case 'rootScopeName':
                query = `(json (scopeName (value) @scopeName))`;
                query += `(include (value (scopeName) @_scopeName (#eq? @_scopeName "${rootScopeName}") !ruleName !base) @include)`;
                query += `(include (value (self) !scopeName) @self)`;
                break;
            case 'base':
                query = `(include (value (base)) @base)`;
                break;
            case 'scopeName':
                const scopeName = cursorNode.childForFieldName('scopeName')?.text;
                query = `(include (value (scopeName) @_scopeName (#eq? @_scopeName "${scopeName}") !ruleName !base) @include)`;
                if (scopeName == rootScopeName) {
                    query += `(json (scopeName (value) @scopeName))`;
                    query += `(include (value (self) !scopeName) @self)`;
                }
                break;
            case 'include':
                const scopeName2 = cursorNode.childForFieldName('scopeName')?.text;
                const ruleName = cursorNode.childForFieldName('ruleName')?.text;
                if (!scopeName2 || scopeName2 == rootScopeName) {
                    query = `(include (value (scopeName)? @_scopeName (#eq? @_scopeName "${scopeName2 ?? rootScopeName}") (ruleName) @_ruleName (#eq? @_ruleName "${ruleName}")) @include)`;
                    query += `(repo (key) @repo (#eq? @repo "${ruleName}"))`;
                }
                else {
                    query = `(include (value (scopeName) @_scopeName (#eq? @_scopeName "${scopeName2}") (ruleName) @_ruleName (#eq? @_ruleName "${ruleName}")) @include)`;
                }
                break;
            case 'scope':
                query = `(name_scope (value (scope) @scope (#eq? @scope "${cursorText}")))`;
                break;
            default:
                return;
        }
        const documentHighlights = [];
        const queryCaptures = (0, TreeSitter_1.queryNode)(jsonTree.rootNode, query);
        for (const queryCapture of queryCaptures) {
            if (queryCapture.name.charAt(0) == '_') {
                // Ignore internal use captures
                continue;
            }
            const node = queryCapture.node;
            const range = (0, TreeSitter_1.toRange)(node);
            const documentHighlight = new vscode.DocumentHighlight(range, vscode.DocumentHighlightKind.Read);
            documentHighlights.push(documentHighlight);
        }
        // vscode.window.showInformationMessage(JSON.stringify(documentHighlights));
        return documentHighlights;
    }
};


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CompletionItemProvider = exports.triggerCharacters = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
const triggerCharactersInclude = ['"', '#', '.', '$'];
const triggerCharactersRegex = ['\\', '(', '?', '<', '\''];
exports.triggerCharacters = [].concat(triggerCharactersInclude, triggerCharactersRegex);
exports.CompletionItemProvider = {
    async provideCompletionItems(document, position, token, context) {
        // vscode.window.showInformationMessage(JSON.stringify("Completions"));
        const trees = (0, TreeSitter_1.getTrees)(document);
        const tree = trees.jsonTree;
        const point = (0, TreeSitter_1.toPoint)(position);
        const cursorQuery = `
			(include (value) @include)
			;(regex) @regex
		`;
        const cursorCapture = (0, TreeSitter_1.queryNode)(tree.rootNode, cursorQuery, point);
        if (cursorCapture == null) {
            return;
        }
        const cursorNode = cursorCapture.node;
        const cursorRange = (0, TreeSitter_1.toRange)(cursorNode);
        const completionItems = [];
        switch (cursorCapture.name) {
            case 'include':
                if (context.triggerKind == vscode.CompletionTriggerKind.TriggerCharacter) {
                    if (triggerCharactersInclude.indexOf(context.triggerCharacter) == -1) {
                        return;
                    }
                }
                const rootPatternsQuery = `(json (patterns) @patterns)`;
                const rootPatternsText = (0, TreeSitter_1.queryNode)(tree.rootNode, rootPatternsQuery).pop()?.node?.text;
                const selfLabel = {
                    label: '$self',
                    description: 'Includes the current grammar file'
                };
                const selfDocumentation = new vscode.MarkdownString();
                selfDocumentation.appendCodeblock(rootPatternsText, 'json-textmate');
                const selfCompletionItem = {
                    label: selfLabel,
                    range: cursorRange,
                    kind: vscode.CompletionItemKind.Class,
                    documentation: selfDocumentation
                };
                completionItems.push(selfCompletionItem);
                completionItems.push(new vscode.CompletionItem({ label: '$base', description: 'Includes the highest parent grammar' }, vscode.CompletionItemKind.Class));
                repoCompletionItems(completionItems, tree, cursorRange);
                const cursorScopeName = cursorNode.childForFieldName('scopeName')?.text;
                if (cursorScopeName) {
                    const rootScopeNameQuery = `(json (scopeName (value) @scopeName))`;
                    const rootScopeName = (0, TreeSitter_1.queryNode)(tree.rootNode, rootScopeNameQuery).pop()?.node?.text;
                    const rootScopeNameLabel = {
                        label: rootScopeName,
                        description: 'use $self instead'
                    };
                    const rootScopeNameCompletionItem = {
                        label: rootScopeNameLabel,
                        range: cursorRange,
                        kind: vscode.CompletionItemKind.Field,
                        documentation: selfDocumentation,
                        commitCharacters: ['#'],
                        command: { command: 'editor.action.triggerSuggest', title: 'Trigger `source#include` completions' }
                    };
                    completionItems.push(rootScopeNameCompletionItem);
                    if (rootScopeName == cursorScopeName) {
                        repoCompletionItems(completionItems, tree, cursorRange, rootScopeName);
                    }
                }
                for (const extension of vscode.extensions.all) {
                    const grammars = extension.packageJSON?.contributes?.grammars;
                    if (grammars) {
                        const cursorText = cursorNode.text;
                        for (const grammar of grammars) {
                            const grammarScopeName = grammar.scopeName;
                            if (grammarScopeName) {
                                const grammarDocumentation = new vscode.MarkdownString();
                                if (cursorScopeName == grammarScopeName) {
                                    const grammarUri = vscode.Uri.joinPath(extension.extensionUri, grammar.path);
                                    const grammarDocument = await vscode.workspace.openTextDocument(grammarUri);
                                    const grammarTree = (0, TreeSitter_1.getTree)(grammarDocument);
                                    repoCompletionItems(completionItems, grammarTree, cursorRange, cursorScopeName);
                                    if (cursorText == grammarScopeName) {
                                        const grammarPatternsText = (0, TreeSitter_1.queryNode)(grammarTree.rootNode, rootPatternsQuery).pop()?.node?.text;
                                        // grammarDocumentation.appendCodeblock(grammarPatternsText, 'json-textmate'); // if Word Wrap worked
                                        let grammarDocText;
                                        if (grammarDocument.lineCount == 1) {
                                            try {
                                                const parsedPatterns = JSON.parse('{' + grammarPatternsText + '}');
                                                grammarDocText = '"patterns": ' + JSON.stringify(parsedPatterns.patterns, null, 2).slice(0, 99900);
                                            }
                                            catch (error) {
                                                grammarDocText = grammarPatternsText.slice(0, 1000); // How to enable Word Wrap?
                                            }
                                        }
                                        else {
                                            grammarDocText = grammarPatternsText.slice(0, 99900);
                                        }
                                        grammarDocumentation.appendCodeblock(grammarDocText, 'json-textmate'); // but no, it doesn't work....
                                    }
                                }
                                else {
                                    grammarDocumentation.appendCodeblock(JSON.stringify(grammar, null, 2), 'json');
                                }
                                const grammarLabel = {
                                    label: grammarScopeName,
                                    description: grammar.language
                                };
                                const grammarCompletion = {
                                    label: grammarLabel,
                                    range: cursorRange,
                                    kind: vscode.CompletionItemKind.Field,
                                    documentation: grammarDocumentation,
                                    commitCharacters: ['#'],
                                    command: { command: 'editor.action.triggerSuggest', title: 'Trigger `source#include` completions' }
                                };
                                completionItems.push(grammarCompletion);
                            }
                        }
                    }
                }
                break;
            case 'regex':
                if (context.triggerKind == vscode.CompletionTriggerKind.TriggerCharacter) {
                    if (triggerCharactersRegex.indexOf(context.triggerCharacter) == -1) {
                        return;
                    }
                }
                vscode.window.showInformationMessage(JSON.stringify(document.getText(new vscode.Range(position.line, position.character - 1, position.line, position.character))));
                const text = document.getText(new vscode.Range(position.line, position.character - 1, position.line, position.character));
                // switch (text) {
                // 	case '\\':
                const completionItemQuad = {
                    label: '\\\\\\\\',
                    kind: vscode.CompletionItemKind.Class
                };
                completionItems.push(completionItemQuad);
                const completionItemWhiteSpace = {
                    label: '\\\\s',
                    kind: vscode.CompletionItemKind.Class
                };
                completionItems.push(completionItemWhiteSpace);
                completionItems.push(new vscode.CompletionItem('\\\\w', vscode.CompletionItemKind.Class));
                // 		break;
                // 	default:
                // 		break;
                // }
                // const newPoint: Parser.Point = {
                // 	row: point.row,
                // 	column: point.column - 1
                // }
                // const regexTrees = trees.regexTrees;
                // const regexNode = regexTrees[cursorNode.id].rootNode;
                // vscode.window.showInformationMessage("1" + JSON.stringify(regexNode.toString()));
                // vscode.window.showInformationMessage("2" + JSON.stringify(regexNode.descendantForPosition(point).text));
                // vscode.window.showInformationMessage("3" + JSON.stringify(regexNode.descendantForPosition(newPoint).text));
                // vscode.window.showInformationMessage("4" + JSON.stringify(regexNode.descendantForPosition(point).toString()));
                // vscode.window.showInformationMessage("5" + JSON.stringify(regexNode.descendantForPosition(newPoint).toString()));
                // vscode.window.showInformationMessage("6" + JSON.stringify(context.triggerCharacter));
                // vscode.window.showInformationMessage("7" + JSON.stringify(queryNode(regexNode, `(_ _ @node)`, point).node.text));
                // vscode.window.showInformationMessage("8" + JSON.stringify(queryNode(regexNode, `(_ _ @node)`, newPoint).node.text));
                break;
            default:
                break;
        }
        const completionList = new vscode.CompletionList(completionItems);
        // vscode.window.showInformationMessage(JSON.stringify(completionList));
        return completionList;
    }
};
function repoCompletionItems(completionItems, tree, cursorRange, scopeName) {
    const rootNode = tree.rootNode;
    const repoQuery = `(json (repository (repo (key) @rootRepo (.not-match? @rootRepo "^\\\\$(self|base)$"))))` +
        (scopeName ? `` :
            `(repo
				[(patterns) (include)] (repository
					(repo
						(key) @nestRepo (.not-match? @nestRepo "^\\\\$(self|base)$")))
				!match !begin)`);
    // const repoCaptures = queryNode(rootNode, repoQuery);
    const repoCaptures = scopeName ? (0, TreeSitter_1.queryNode)(rootNode, repoQuery) : (0, TreeSitter_1.queryNode)(rootNode, repoQuery, (0, TreeSitter_1.toPoint)(cursorRange.start), (0, TreeSitter_1.toPoint)(cursorRange.end));
    for (const repoCapture of repoCaptures) {
        const repoNode = repoCapture.node;
        const repoText = repoNode.text;
        const repoNodeParent = repoText ? repoNode.parent : repoNode.parent.parent; // Tree-sitter buggy on 0width nodes
        const commentQuery = `(comment (value) @comment (.not-eq? @comment ""))` +
            `(comment_slash (value) @comment (.not-eq? @comment ""))`;
        const commentText = (0, TreeSitter_1.queryNode)(repoNodeParent, commentQuery)[0]?.node?.text?.replace(/\\(.)?/g, '$1');
        const repoLabel = {
            label: (scopeName ?? '') + '#' + repoText,
            description: commentText
        };
        const repoNodeParentText = repoNodeParent.text;
        let repoDocText;
        if (rootNode.startPosition.row == rootNode.endPosition.row) {
            try {
                const repoParsed = JSON.parse('{' + repoNodeParentText + '}');
                repoDocText = `"${repoText}": ` + JSON.stringify(repoParsed[repoText], null, 2).slice(0, 99900);
            }
            catch (error) {
                repoDocText = repoNodeParentText.slice(0, 1000); // How to enable Word Wrap?
            }
        }
        else {
            repoDocText = repoNodeParentText.slice(0, 99900);
        }
        const documentation = new vscode.MarkdownString();
        documentation.appendCodeblock(repoDocText, 'json-textmate');
        // documentation.appendCodeblock(parentRepoNodeText, 'json-textmate'); // if Word Wrap worked
        const repoCompletionItem = {
            label: repoLabel,
            range: cursorRange,
            kind: vscode.CompletionItemKind.Function,
            documentation: documentation
            // sortText: '~#' + repoText
        };
        if (repoCapture.name == 'nestRepo') {
            repoCompletionItem.sortText = ' #' + repoText;
        }
        completionItems.push(repoCompletionItem);
    }
}


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentRangeFormattingEditProvider = exports.DocumentFormattingEditProvider = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
exports.DocumentFormattingEditProvider = {
    provideDocumentFormattingEdits(document, options, token) {
        // vscode.window.showInformationMessage(JSON.stringify("Format"));
        const tree = (0, TreeSitter_1.getTree)(document);
        const textEdits = [];
        const tabType = options.insertSpaces ? ' ' : '\t';
        const tabSize = options.insertSpaces ? options.tabSize : 1;
        parseAllChildren(tree.rootNode, textEdits, 0, tabSize, tabType);
        // vscode.window.showInformationMessage(JSON.stringify(textEdits));
        return textEdits;
    },
};
exports.DocumentRangeFormattingEditProvider = {
    provideDocumentRangeFormattingEdits(document, range, options, token) {
        // vscode.window.showInformationMessage(JSON.stringify("FormatRange"));
        const tree = (0, TreeSitter_1.getTree)(document);
        const textEdits = [];
        const tabType = options.insertSpaces ? ' ' : '\t';
        const tabSize = options.insertSpaces ? options.tabSize : 1;
        const startPoint = (0, TreeSitter_1.toPoint)(range.start);
        const endPoint = (0, TreeSitter_1.toPoint)(range.end);
        const queryString = `(_) @node`;
        const nestedCaptures = (0, TreeSitter_1.queryNode)(tree.rootNode, queryString, startPoint, endPoint);
        let level = -1;
        let node;
        for (const nestedCapture of nestedCaptures) {
            const nestedNode = nestedCapture.node;
            if (!(0, TreeSitter_1.toRange)(nestedNode).contains(range)) {
                break;
            }
            node = nestedNode;
            level++;
        }
        const indent = Math.min(level, node.startPosition.column);
        parseAllChildren(node, textEdits, indent, tabSize, tabType);
        // vscode.window.showInformationMessage(JSON.stringify(textEdits));
        return textEdits;
    },
};
function parseAllChildren(parentNode, textEdits, indent, tabSize, tabType) {
    let range;
    let whiteSpace;
    let textEdit;
    let expand = false;
    for (const node of parentNode.namedChildren) {
        if (parseAllChildren(node, textEdits, indent + tabSize, tabSize, tabType)) {
            expand = true;
        }
    }
    if (expand == false) {
        const namedChildCount = parentNode.namedChildCount;
        if (namedChildCount > 1) {
            switch (parentNode.type) {
                case 'value':
                case 'regex':
                    break;
                case 'repo':
                case 'repository':
                case 'injection':
                    expand = true;
                    break;
                case 'patterns':
                    if (parentNode.parent.type == 'json') {
                        expand = true;
                        break;
                    }
                default:
                    if (namedChildCount > 2) {
                        expand = true;
                        break;
                    }
                    if (parentNode.firstNamedChild.type != 'key') {
                        expand = true;
                        break;
                    }
                    if (parentNode.text.length > 2000) {
                        expand = true;
                        break;
                    }
            }
        }
    }
    for (const node of parentNode.children) {
        switch (node.type) {
            case '{':
            case '[':
                indent += tabSize;
                if (node.nextSibling == null)
                    break;
                if (expand == true)
                    whiteSpace = '\n'.padEnd(indent + 1, tabType);
                else
                    whiteSpace = ' ';
                range = new vscode.Range(node.endPosition.row, node.endPosition.column, node.nextSibling.startPosition.row, node.nextSibling.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                break;
            case '}':
            case ']':
                indent -= tabSize;
                if (node.previousSibling == null)
                    break;
                if (node.previousSibling.type == '{')
                    break;
                if (node.previousSibling.type == '[')
                    break;
                if (expand == true)
                    whiteSpace = '\n'.padEnd(indent + 1, tabType);
                else
                    whiteSpace = ' ';
                range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.startPosition.row, node.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                break;
            case ',':
                if (node.nextSibling == null)
                    break;
                if (expand == true)
                    whiteSpace = '\n'.padEnd(indent + 1, tabType);
                else
                    whiteSpace = ' ';
                range = new vscode.Range(node.endPosition.row, node.endPosition.column, node.nextSibling.startPosition.row, node.nextSibling.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                if (node.previousSibling == null)
                    break;
                whiteSpace = '';
                range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.startPosition.row, node.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                break;
            case ':':
                if (node.nextSibling == null)
                    break;
                whiteSpace = ' ';
                range = new vscode.Range(node.endPosition.row, node.endPosition.column, node.nextSibling.startPosition.row, node.nextSibling.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                if (node.previousSibling == null)
                    break;
                whiteSpace = '';
                range = new vscode.Range(node.previousSibling.endPosition.row, node.previousSibling.endPosition.column, node.startPosition.row, node.startPosition.column);
                textEdit = vscode.TextEdit.replace(range, whiteSpace);
                textEdits.push(textEdit);
                break;
        }
    }
    return expand;
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map