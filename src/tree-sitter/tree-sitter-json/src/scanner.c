// https://github.com/tree-sitter/tree-sitter/blob/master/docs/section-3-creating-parsers.md#external-scanners

#include <tree_sitter/parser.h>

enum TokenType
{
	_FORCESTRINGNODE,
	ERROR
};

void* tree_sitter_jsontm_external_scanner_create() {}
void tree_sitter_jsontm_external_scanner_destroy(void* payload) {}
unsigned tree_sitter_jsontm_external_scanner_serialize(void* payload, char* buffer) {}
void tree_sitter_jsontm_external_scanner_deserialize(void* payload, const char* buffer, unsigned length) {}

bool tokenize_ERROR(TSLexer* lexer) {
	START_LEXER();
	while (true) {
		switch (lexer->lookahead) {
			case 0:
			case ' ':
			case '\t':
			case '\r':
			case '\n':
			case ',':
			case ':':
			case '"':
			case '{':
			case '}':
			case '[':
			case ']':
				END_STATE();
				break;
			default:
				lexer->advance(lexer, false);
				ACCEPT_TOKEN(ERROR);
		}
	}
}

bool tree_sitter_jsontm_external_scanner_scan(void* payload, TSLexer* lexer, const bool* valid_symbols) {
	if (valid_symbols[ERROR]) {
		return tokenize_ERROR(lexer);
	}

	if (valid_symbols[_FORCESTRINGNODE] && lexer->lookahead == '"') {
		lexer->result_symbol = _FORCESTRINGNODE;
		return true;
	}

	return false;
}