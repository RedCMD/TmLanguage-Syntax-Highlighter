#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 30
#define LARGE_STATE_COUNT 8
#define SYMBOL_COUNT 18
#define ALIAS_COUNT 0
#define TOKEN_COUNT 10
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 3
#define PRODUCTION_ID_COUNT 1

enum {
  aux_sym_literal_token1 = 1,
  aux_sym_character_class_literal_token1 = 2,
  anon_sym_BSLASH_BSLASH_BSLASH_BSLASH = 3,
  aux_sym_backslash_token1 = 4,
  aux_sym_backslash_token2 = 5,
  anon_sym_LPAREN = 6,
  anon_sym_RPAREN = 7,
  anon_sym_LBRACK = 8,
  anon_sym_RBRACK = 9,
  sym_regex = 10,
  sym_literal = 11,
  sym_character_class_literal = 12,
  sym_backslash = 13,
  sym_capture_group = 14,
  sym_character_class = 15,
  aux_sym_regex_repeat1 = 16,
  aux_sym_character_class_repeat1 = 17,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [aux_sym_literal_token1] = "literal_token1",
  [aux_sym_character_class_literal_token1] = "character_class_literal_token1",
  [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = "\\\\\\\\",
  [aux_sym_backslash_token1] = "backslash_token1",
  [aux_sym_backslash_token2] = "backslash_token2",
  [anon_sym_LPAREN] = "(",
  [anon_sym_RPAREN] = ")",
  [anon_sym_LBRACK] = "[",
  [anon_sym_RBRACK] = "]",
  [sym_regex] = "regex",
  [sym_literal] = "literal",
  [sym_character_class_literal] = "character_class_literal",
  [sym_backslash] = "backslash",
  [sym_capture_group] = "capture_group",
  [sym_character_class] = "character_class",
  [aux_sym_regex_repeat1] = "regex_repeat1",
  [aux_sym_character_class_repeat1] = "character_class_repeat1",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [aux_sym_literal_token1] = aux_sym_literal_token1,
  [aux_sym_character_class_literal_token1] = aux_sym_character_class_literal_token1,
  [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
  [aux_sym_backslash_token1] = aux_sym_backslash_token1,
  [aux_sym_backslash_token2] = aux_sym_backslash_token2,
  [anon_sym_LPAREN] = anon_sym_LPAREN,
  [anon_sym_RPAREN] = anon_sym_RPAREN,
  [anon_sym_LBRACK] = anon_sym_LBRACK,
  [anon_sym_RBRACK] = anon_sym_RBRACK,
  [sym_regex] = sym_regex,
  [sym_literal] = sym_literal,
  [sym_character_class_literal] = sym_character_class_literal,
  [sym_backslash] = sym_backslash,
  [sym_capture_group] = sym_capture_group,
  [sym_character_class] = sym_character_class,
  [aux_sym_regex_repeat1] = aux_sym_regex_repeat1,
  [aux_sym_character_class_repeat1] = aux_sym_character_class_repeat1,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [aux_sym_literal_token1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_character_class_literal_token1] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_backslash_token1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_backslash_token2] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_LPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RPAREN] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_LBRACK] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RBRACK] = {
    .visible = true,
    .named = false,
  },
  [sym_regex] = {
    .visible = true,
    .named = true,
  },
  [sym_literal] = {
    .visible = true,
    .named = true,
  },
  [sym_character_class_literal] = {
    .visible = true,
    .named = true,
  },
  [sym_backslash] = {
    .visible = true,
    .named = true,
  },
  [sym_capture_group] = {
    .visible = true,
    .named = true,
  },
  [sym_character_class] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_regex_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_character_class_repeat1] = {
    .visible = false,
    .named = false,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
};

static const uint16_t ts_non_terminal_alias_map[] = {
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 2,
  [4] = 4,
  [5] = 5,
  [6] = 4,
  [7] = 5,
  [8] = 8,
  [9] = 9,
  [10] = 9,
  [11] = 11,
  [12] = 8,
  [13] = 13,
  [14] = 14,
  [15] = 15,
  [16] = 16,
  [17] = 16,
  [18] = 18,
  [19] = 19,
  [20] = 14,
  [21] = 13,
  [22] = 15,
  [23] = 19,
  [24] = 18,
  [25] = 25,
  [26] = 18,
  [27] = 27,
  [28] = 28,
  [29] = 27,
};

static inline bool aux_sym_literal_token1_character_set_1(int32_t c) {
  return (c < '?'
    ? (c < '"'
      ? (c < 0
        ? c == 0
        : c <= ' ')
      : (c <= '$' || (c < '.'
        ? (c >= '(' && c <= '+')
        : c <= '.')))
    : (c <= '?' || (c < '{'
      ? (c < '^'
        ? (c >= '[' && c <= '\\')
        : c <= '^')
      : (c <= '|' || c == 127))));
}

static inline bool aux_sym_backslash_token2_character_set_1(int32_t c) {
  return (c < '.'
    ? (c < 14
      ? (c < 11
        ? (c >= 0 && c <= 8)
        : c <= '\f')
      : (c <= ' ' || (c < '('
        ? (c >= '"' && c <= '$')
        : c <= '+')))
    : (c <= '.' || (c < '^'
      ? (c < '['
        ? c == '?'
        : c <= '[')
      : (c <= '^' || (c < 127
        ? (c >= '{' && c <= '|')
        : c <= 127)))));
}

static inline bool aux_sym_backslash_token2_character_set_2(int32_t c) {
  return (c < '&'
    ? (c < 14
      ? (c < 11
        ? (c >= 0 && c <= 8)
        : c <= '\f')
      : (c <= 31 || c == '"'))
    : (c <= '&' || (c < '['
      ? (c < ':'
        ? c == '-'
        : c <= ':')
      : (c <= ']' || c == 127))));
}

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(4);
      if (lookahead == '(') ADVANCE(14);
      if (lookahead == ')') ADVANCE(15);
      if (lookahead == '[') ADVANCE(16);
      if (lookahead == '\\') ADVANCE(1);
      if (lookahead == ']') ADVANCE(18);
      END_STATE();
    case 1:
      if (lookahead == '\\') ADVANCE(13);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(12);
      END_STATE();
    case 2:
      if (lookahead == '\\') ADVANCE(7);
      if (lookahead == ']') ADVANCE(18);
      if (lookahead != 0 &&
          lookahead != '"') ADVANCE(8);
      END_STATE();
    case 3:
      if (eof) ADVANCE(4);
      if (lookahead == '(') ADVANCE(14);
      if (lookahead == ')') ADVANCE(15);
      if (lookahead == '[') ADVANCE(17);
      if (lookahead == '\\') ADVANCE(5);
      if (lookahead != 0 &&
          lookahead != '"') ADVANCE(6);
      END_STATE();
    case 4:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 5:
      ACCEPT_TOKEN(aux_sym_literal_token1);
      if (lookahead == '\\') ADVANCE(13);
      if (aux_sym_backslash_token2_character_set_1(lookahead)) ADVANCE(12);
      if (lookahead != 0 &&
          (lookahead < '\t' || '\r' < lookahead)) ADVANCE(6);
      END_STATE();
    case 6:
      ACCEPT_TOKEN(aux_sym_literal_token1);
      if (!aux_sym_literal_token1_character_set_1(lookahead)) ADVANCE(6);
      END_STATE();
    case 7:
      ACCEPT_TOKEN(aux_sym_character_class_literal_token1);
      if (lookahead == '\\') ADVANCE(13);
      if (aux_sym_backslash_token2_character_set_2(lookahead)) ADVANCE(12);
      if (lookahead != 0 &&
          (lookahead < '\t' || '\r' < lookahead)) ADVANCE(8);
      END_STATE();
    case 8:
      ACCEPT_TOKEN(aux_sym_character_class_literal_token1);
      if (lookahead != 0 &&
          lookahead > 31 &&
          lookahead != '"' &&
          lookahead != '&' &&
          lookahead != '-' &&
          lookahead != ':' &&
          (lookahead < '[' || ']' < lookahead) &&
          lookahead != 127) ADVANCE(8);
      END_STATE();
    case 9:
      ACCEPT_TOKEN(anon_sym_BSLASH_BSLASH_BSLASH_BSLASH);
      END_STATE();
    case 10:
      ACCEPT_TOKEN(aux_sym_backslash_token1);
      END_STATE();
    case 11:
      ACCEPT_TOKEN(aux_sym_backslash_token1);
      if (lookahead == '\\') ADVANCE(9);
      END_STATE();
    case 12:
      ACCEPT_TOKEN(aux_sym_backslash_token2);
      END_STATE();
    case 13:
      ACCEPT_TOKEN(aux_sym_backslash_token2);
      if (lookahead == '\\') ADVANCE(11);
      if (lookahead != 0 &&
          lookahead != '"') ADVANCE(10);
      END_STATE();
    case 14:
      ACCEPT_TOKEN(anon_sym_LPAREN);
      END_STATE();
    case 15:
      ACCEPT_TOKEN(anon_sym_RPAREN);
      END_STATE();
    case 16:
      ACCEPT_TOKEN(anon_sym_LBRACK);
      END_STATE();
    case 17:
      ACCEPT_TOKEN(anon_sym_LBRACK);
      if (!aux_sym_literal_token1_character_set_1(lookahead)) ADVANCE(6);
      END_STATE();
    case 18:
      ACCEPT_TOKEN(anon_sym_RBRACK);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 3},
  [2] = {.lex_state = 3},
  [3] = {.lex_state = 3},
  [4] = {.lex_state = 3},
  [5] = {.lex_state = 3},
  [6] = {.lex_state = 3},
  [7] = {.lex_state = 3},
  [8] = {.lex_state = 2},
  [9] = {.lex_state = 2},
  [10] = {.lex_state = 2},
  [11] = {.lex_state = 2},
  [12] = {.lex_state = 2},
  [13] = {.lex_state = 3},
  [14] = {.lex_state = 3},
  [15] = {.lex_state = 3},
  [16] = {.lex_state = 3},
  [17] = {.lex_state = 3},
  [18] = {.lex_state = 3},
  [19] = {.lex_state = 3},
  [20] = {.lex_state = 3},
  [21] = {.lex_state = 3},
  [22] = {.lex_state = 3},
  [23] = {.lex_state = 3},
  [24] = {.lex_state = 3},
  [25] = {.lex_state = 2},
  [26] = {.lex_state = 2},
  [27] = {.lex_state = 0},
  [28] = {.lex_state = 0},
  [29] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = ACTIONS(1),
    [aux_sym_backslash_token1] = ACTIONS(1),
    [aux_sym_backslash_token2] = ACTIONS(1),
    [anon_sym_LPAREN] = ACTIONS(1),
    [anon_sym_RPAREN] = ACTIONS(1),
    [anon_sym_LBRACK] = ACTIONS(1),
    [anon_sym_RBRACK] = ACTIONS(1),
  },
  [1] = {
    [sym_regex] = STATE(28),
    [sym_literal] = STATE(5),
    [sym_backslash] = STATE(5),
    [sym_capture_group] = STATE(5),
    [sym_character_class] = STATE(5),
    [aux_sym_regex_repeat1] = STATE(5),
    [aux_sym_literal_token1] = ACTIONS(3),
    [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = ACTIONS(5),
    [aux_sym_backslash_token1] = ACTIONS(7),
    [aux_sym_backslash_token2] = ACTIONS(7),
    [anon_sym_LPAREN] = ACTIONS(9),
    [anon_sym_LBRACK] = ACTIONS(11),
  },
  [2] = {
    [sym_regex] = STATE(27),
    [sym_literal] = STATE(7),
    [sym_backslash] = STATE(7),
    [sym_capture_group] = STATE(7),
    [sym_character_class] = STATE(7),
    [aux_sym_regex_repeat1] = STATE(7),
    [aux_sym_literal_token1] = ACTIONS(13),
    [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = ACTIONS(15),
    [aux_sym_backslash_token1] = ACTIONS(17),
    [aux_sym_backslash_token2] = ACTIONS(17),
    [anon_sym_LPAREN] = ACTIONS(19),
    [anon_sym_RPAREN] = ACTIONS(21),
    [anon_sym_LBRACK] = ACTIONS(23),
  },
  [3] = {
    [sym_regex] = STATE(29),
    [sym_literal] = STATE(7),
    [sym_backslash] = STATE(7),
    [sym_capture_group] = STATE(7),
    [sym_character_class] = STATE(7),
    [aux_sym_regex_repeat1] = STATE(7),
    [aux_sym_literal_token1] = ACTIONS(13),
    [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = ACTIONS(15),
    [aux_sym_backslash_token1] = ACTIONS(17),
    [aux_sym_backslash_token2] = ACTIONS(17),
    [anon_sym_LPAREN] = ACTIONS(19),
    [anon_sym_RPAREN] = ACTIONS(25),
    [anon_sym_LBRACK] = ACTIONS(23),
  },
  [4] = {
    [sym_literal] = STATE(4),
    [sym_backslash] = STATE(4),
    [sym_capture_group] = STATE(4),
    [sym_character_class] = STATE(4),
    [aux_sym_regex_repeat1] = STATE(4),
    [ts_builtin_sym_end] = ACTIONS(27),
    [aux_sym_literal_token1] = ACTIONS(29),
    [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = ACTIONS(32),
    [aux_sym_backslash_token1] = ACTIONS(35),
    [aux_sym_backslash_token2] = ACTIONS(35),
    [anon_sym_LPAREN] = ACTIONS(38),
    [anon_sym_LBRACK] = ACTIONS(41),
  },
  [5] = {
    [sym_literal] = STATE(4),
    [sym_backslash] = STATE(4),
    [sym_capture_group] = STATE(4),
    [sym_character_class] = STATE(4),
    [aux_sym_regex_repeat1] = STATE(4),
    [ts_builtin_sym_end] = ACTIONS(44),
    [aux_sym_literal_token1] = ACTIONS(3),
    [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = ACTIONS(5),
    [aux_sym_backslash_token1] = ACTIONS(7),
    [aux_sym_backslash_token2] = ACTIONS(7),
    [anon_sym_LPAREN] = ACTIONS(9),
    [anon_sym_LBRACK] = ACTIONS(11),
  },
  [6] = {
    [sym_literal] = STATE(6),
    [sym_backslash] = STATE(6),
    [sym_capture_group] = STATE(6),
    [sym_character_class] = STATE(6),
    [aux_sym_regex_repeat1] = STATE(6),
    [aux_sym_literal_token1] = ACTIONS(46),
    [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = ACTIONS(49),
    [aux_sym_backslash_token1] = ACTIONS(52),
    [aux_sym_backslash_token2] = ACTIONS(52),
    [anon_sym_LPAREN] = ACTIONS(55),
    [anon_sym_RPAREN] = ACTIONS(27),
    [anon_sym_LBRACK] = ACTIONS(58),
  },
  [7] = {
    [sym_literal] = STATE(6),
    [sym_backslash] = STATE(6),
    [sym_capture_group] = STATE(6),
    [sym_character_class] = STATE(6),
    [aux_sym_regex_repeat1] = STATE(6),
    [aux_sym_literal_token1] = ACTIONS(13),
    [anon_sym_BSLASH_BSLASH_BSLASH_BSLASH] = ACTIONS(15),
    [aux_sym_backslash_token1] = ACTIONS(17),
    [aux_sym_backslash_token2] = ACTIONS(17),
    [anon_sym_LPAREN] = ACTIONS(19),
    [anon_sym_RPAREN] = ACTIONS(44),
    [anon_sym_LBRACK] = ACTIONS(23),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 5,
    ACTIONS(61), 1,
      aux_sym_character_class_literal_token1,
    ACTIONS(63), 1,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
    ACTIONS(67), 1,
      anon_sym_RBRACK,
    ACTIONS(65), 2,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
    STATE(11), 3,
      sym_character_class_literal,
      sym_backslash,
      aux_sym_character_class_repeat1,
  [19] = 5,
    ACTIONS(61), 1,
      aux_sym_character_class_literal_token1,
    ACTIONS(63), 1,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
    ACTIONS(69), 1,
      anon_sym_RBRACK,
    ACTIONS(65), 2,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
    STATE(8), 3,
      sym_character_class_literal,
      sym_backslash,
      aux_sym_character_class_repeat1,
  [38] = 5,
    ACTIONS(61), 1,
      aux_sym_character_class_literal_token1,
    ACTIONS(63), 1,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
    ACTIONS(71), 1,
      anon_sym_RBRACK,
    ACTIONS(65), 2,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
    STATE(12), 3,
      sym_character_class_literal,
      sym_backslash,
      aux_sym_character_class_repeat1,
  [57] = 5,
    ACTIONS(73), 1,
      aux_sym_character_class_literal_token1,
    ACTIONS(76), 1,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
    ACTIONS(82), 1,
      anon_sym_RBRACK,
    ACTIONS(79), 2,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
    STATE(11), 3,
      sym_character_class_literal,
      sym_backslash,
      aux_sym_character_class_repeat1,
  [76] = 5,
    ACTIONS(61), 1,
      aux_sym_character_class_literal_token1,
    ACTIONS(63), 1,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
    ACTIONS(84), 1,
      anon_sym_RBRACK,
    ACTIONS(65), 2,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
    STATE(11), 3,
      sym_character_class_literal,
      sym_backslash,
      aux_sym_character_class_repeat1,
  [95] = 2,
    ACTIONS(86), 3,
      ts_builtin_sym_end,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
    ACTIONS(88), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [107] = 2,
    ACTIONS(90), 3,
      ts_builtin_sym_end,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
    ACTIONS(92), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [119] = 2,
    ACTIONS(94), 3,
      ts_builtin_sym_end,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
    ACTIONS(96), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [131] = 2,
    ACTIONS(98), 3,
      ts_builtin_sym_end,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
    ACTIONS(100), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [143] = 2,
    ACTIONS(98), 3,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
    ACTIONS(100), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [155] = 2,
    ACTIONS(104), 3,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
    ACTIONS(102), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [167] = 2,
    ACTIONS(108), 3,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
    ACTIONS(106), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [179] = 2,
    ACTIONS(90), 3,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
    ACTIONS(92), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [191] = 2,
    ACTIONS(86), 3,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
    ACTIONS(88), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [203] = 2,
    ACTIONS(94), 3,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
      anon_sym_RPAREN,
    ACTIONS(96), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [215] = 2,
    ACTIONS(108), 3,
      ts_builtin_sym_end,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
    ACTIONS(106), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [227] = 2,
    ACTIONS(104), 3,
      ts_builtin_sym_end,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_LPAREN,
    ACTIONS(102), 4,
      aux_sym_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
      anon_sym_LBRACK,
  [239] = 2,
    ACTIONS(112), 2,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_RBRACK,
    ACTIONS(110), 3,
      aux_sym_character_class_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
  [249] = 2,
    ACTIONS(104), 2,
      anon_sym_BSLASH_BSLASH_BSLASH_BSLASH,
      anon_sym_RBRACK,
    ACTIONS(102), 3,
      aux_sym_character_class_literal_token1,
      aux_sym_backslash_token1,
      aux_sym_backslash_token2,
  [259] = 1,
    ACTIONS(114), 1,
      anon_sym_RPAREN,
  [263] = 1,
    ACTIONS(116), 1,
      ts_builtin_sym_end,
  [267] = 1,
    ACTIONS(118), 1,
      anon_sym_RPAREN,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(8)] = 0,
  [SMALL_STATE(9)] = 19,
  [SMALL_STATE(10)] = 38,
  [SMALL_STATE(11)] = 57,
  [SMALL_STATE(12)] = 76,
  [SMALL_STATE(13)] = 95,
  [SMALL_STATE(14)] = 107,
  [SMALL_STATE(15)] = 119,
  [SMALL_STATE(16)] = 131,
  [SMALL_STATE(17)] = 143,
  [SMALL_STATE(18)] = 155,
  [SMALL_STATE(19)] = 167,
  [SMALL_STATE(20)] = 179,
  [SMALL_STATE(21)] = 191,
  [SMALL_STATE(22)] = 203,
  [SMALL_STATE(23)] = 215,
  [SMALL_STATE(24)] = 227,
  [SMALL_STATE(25)] = 239,
  [SMALL_STATE(26)] = 249,
  [SMALL_STATE(27)] = 259,
  [SMALL_STATE(28)] = 263,
  [SMALL_STATE(29)] = 267,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = false}}, SHIFT(16),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [7] = {.entry = {.count = 1, .reusable = false}}, SHIFT(24),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [11] = {.entry = {.count = 1, .reusable = false}}, SHIFT(10),
  [13] = {.entry = {.count = 1, .reusable = false}}, SHIFT(17),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [17] = {.entry = {.count = 1, .reusable = false}}, SHIFT(18),
  [19] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [21] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [23] = {.entry = {.count = 1, .reusable = false}}, SHIFT(9),
  [25] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [27] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_regex_repeat1, 2),
  [29] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_regex_repeat1, 2), SHIFT_REPEAT(16),
  [32] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_regex_repeat1, 2), SHIFT_REPEAT(24),
  [35] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_regex_repeat1, 2), SHIFT_REPEAT(24),
  [38] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_regex_repeat1, 2), SHIFT_REPEAT(2),
  [41] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_regex_repeat1, 2), SHIFT_REPEAT(10),
  [44] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_regex, 1),
  [46] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_regex_repeat1, 2), SHIFT_REPEAT(17),
  [49] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_regex_repeat1, 2), SHIFT_REPEAT(18),
  [52] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_regex_repeat1, 2), SHIFT_REPEAT(18),
  [55] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_regex_repeat1, 2), SHIFT_REPEAT(3),
  [58] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_regex_repeat1, 2), SHIFT_REPEAT(9),
  [61] = {.entry = {.count = 1, .reusable = false}}, SHIFT(25),
  [63] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [65] = {.entry = {.count = 1, .reusable = false}}, SHIFT(26),
  [67] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [69] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [71] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
  [73] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_character_class_repeat1, 2), SHIFT_REPEAT(25),
  [76] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_character_class_repeat1, 2), SHIFT_REPEAT(26),
  [79] = {.entry = {.count = 2, .reusable = false}}, REDUCE(aux_sym_character_class_repeat1, 2), SHIFT_REPEAT(26),
  [82] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_character_class_repeat1, 2),
  [84] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [86] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture_group, 3),
  [88] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_capture_group, 3),
  [90] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_character_class, 2),
  [92] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_character_class, 2),
  [94] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_character_class, 3),
  [96] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_character_class, 3),
  [98] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_literal, 1),
  [100] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_literal, 1),
  [102] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_backslash, 1),
  [104] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_backslash, 1),
  [106] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_capture_group, 2),
  [108] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture_group, 2),
  [110] = {.entry = {.count = 1, .reusable = false}}, REDUCE(sym_character_class_literal, 1),
  [112] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_character_class_literal, 1),
  [114] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [116] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [118] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_regextm(void) {
  static const TSLanguage language = {
    .version = LANGUAGE_VERSION,
    .symbol_count = SYMBOL_COUNT,
    .alias_count = ALIAS_COUNT,
    .token_count = TOKEN_COUNT,
    .external_token_count = EXTERNAL_TOKEN_COUNT,
    .state_count = STATE_COUNT,
    .large_state_count = LARGE_STATE_COUNT,
    .production_id_count = PRODUCTION_ID_COUNT,
    .field_count = FIELD_COUNT,
    .max_alias_sequence_length = MAX_ALIAS_SEQUENCE_LENGTH,
    .parse_table = &ts_parse_table[0][0],
    .small_parse_table = ts_small_parse_table,
    .small_parse_table_map = ts_small_parse_table_map,
    .parse_actions = ts_parse_actions,
    .symbol_names = ts_symbol_names,
    .symbol_metadata = ts_symbol_metadata,
    .public_symbol_map = ts_symbol_map,
    .alias_map = ts_non_terminal_alias_map,
    .alias_sequences = &ts_alias_sequences[0][0],
    .lex_modes = ts_lex_modes,
    .lex_fn = ts_lex,
    .primary_state_ids = ts_primary_state_ids,
  };
  return &language;
}
#ifdef __cplusplus
}
#endif
