/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = exports.DocumentSelector = void 0;
const vscode = __webpack_require__(1);
const TreeSitter_1 = __webpack_require__(2);
const oniguruma_1 = __webpack_require__(6);
const DiagnosticCollection_1 = __webpack_require__(27);
const tokenColorCustomizations_1 = __webpack_require__(28);
const RenameProvider_1 = __webpack_require__(30);
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
    // initTextMate(context);
    (0, DiagnosticCollection_1.initDiagnostics)(context);
    (0, tokenColorCustomizations_1.initTokenColorCustomizations)(context);
    // initCallStackView(context);
    // context.subscriptions.push(vscode.window.registerTreeDataProvider('TextMate', TreeDataProvider)); // Call Stack
    // context.subscriptions.push(vscode.languages.registerHoverProvider(DocumentSelector, HoverProvider)); // Mouse over Hovers
    context.subscriptions.push(vscode.languages.registerRenameProvider(exports.DocumentSelector, RenameProvider_1.RenameProvider)); // [F2] Rename
    // context.subscriptions.push(vscode.languages.registerCodeLensProvider(DocumentSelector, CodeLensProvider)); // Code Lens
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
// export function stringify(this: any, key: string, value: any) {
// 	if (typeof value === 'function') {
// 		return "<function>";
// 	}
// 	if (typeof value === 'symbol') {
// 		return "<symbol>";
// 	}
// 	if (typeof value === 'undefined') {
// 		return "<undefined>";
// 	}
// 	if (value === null) {
// 		return null;
// 	}
// 	if (key.startsWith("HEAP")) {
// 		return "<error>";
// 	}
// 	return value ?? "<idk>";
// }


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
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
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
/* 29 */,
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
/* 31 */,
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