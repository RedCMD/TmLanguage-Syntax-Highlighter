// https://github.com/tree-sitter/tree-sitter/blob/master/docs/section-3-creating-parsers.md#external-scanners

#include <tree_sitter/parser.h>

enum TokenType // this **MUST** match up with `grammar.js`
{ // multiple options could be valid at once
	_GROUP_END_LOOKAHEAD,
	_FORCE_PROPERTY_NAME_NODE,
	_CALLOUT_SYNTAX,
	_MODIFY_SYNTAX,
	_ERROR
};

void* tree_sitter_regextm_external_scanner_create() { return 0; }
void tree_sitter_regextm_external_scanner_destroy(void* payload) {}
unsigned tree_sitter_regextm_external_scanner_serialize(void* payload, char* buffer) { return 0; }
void tree_sitter_regextm_external_scanner_deserialize(void* payload, const char* buffer, unsigned length) {}

bool tree_sitter_regextm_external_scanner_scan(void* payload, TSLexer* lexer, const bool* valid_symbols) {
	if (valid_symbols[_ERROR]) {
		return false;
	}

	if (valid_symbols[_FORCE_PROPERTY_NAME_NODE]) {
		if (lexer->lookahead == '{' || lexer->lookahead == '}' || lexer->lookahead == '(' || lexer->lookahead == ')' || lexer->lookahead == '|' || lexer->eof(lexer) /* || lexer->lookahead == '"' */) {
		lexer->result_symbol = _FORCE_PROPERTY_NAME_NODE;
		return true;
		}
	}

	if (valid_symbols[_GROUP_END_LOOKAHEAD]) {
		if (lexer->lookahead == ')' || lexer->eof(lexer) /* || lexer->lookahead == '"' */) {
			lexer->result_symbol = _GROUP_END_LOOKAHEAD;
			return true;
		}
	}

	// careful with `advance`; theres no going back

	if (lexer->lookahead == '(') {
		lexer->advance(lexer, false);

		if (valid_symbols[_CALLOUT_SYNTAX]) {
			if (lexer->lookahead == '*') {
				lexer->advance(lexer, false);
				if ((lexer->lookahead >= 'A' && lexer->lookahead <= 'Z') || (lexer->lookahead >= 'a' && lexer->lookahead <= 'z') || lexer->lookahead == '_') {
					lexer->result_symbol = _CALLOUT_SYNTAX;
					return true;
				}
				return false;
			}
		}

		if (valid_symbols[_MODIFY_SYNTAX]) {
			if (lexer->lookahead == '?') {
				lexer->advance(lexer, false);
				// - imx WDSP y{g} y{w} I
				switch (lexer->lookahead) {
					case '-':
					case 'i':
					case 'm':
					case 'x':
					case 'W':
					case 'D':
					case 'S':
					case 'P':
					case 'y':
					case 'I':
						lexer->result_symbol = _MODIFY_SYNTAX;
						return true;
						break;
					default:
						return false;
				}
			}
		}
	}

	return false;
}