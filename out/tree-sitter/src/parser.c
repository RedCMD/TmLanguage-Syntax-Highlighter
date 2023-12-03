#include <tree_sitter/parser.h>

#if defined(__GNUC__) || defined(__clang__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wmissing-field-initializers"
#endif

#ifdef _MSC_VER
#pragma optimize("", off)
#elif defined(__clang__)
#pragma clang optimize off
#elif defined(__GNUC__)
#pragma GCC optimize ("O0")
#endif

#define LANGUAGE_VERSION 14
#define STATE_COUNT 787
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 101
#define ALIAS_COUNT 2
#define TOKEN_COUNT 45
#define EXTERNAL_TOKEN_COUNT 0
#define FIELD_COUNT 0
#define MAX_ALIAS_SEQUENCE_LENGTH 12
#define PRODUCTION_ID_COUNT 11

enum {
  anon_sym_LBRACE = 1,
  anon_sym_COMMA = 2,
  anon_sym_RBRACE = 3,
  sym__whitespace = 4,
  anon_sym_DQUOTE = 5,
  anon_sym_repository = 6,
  anon_sym_COLON = 7,
  aux_sym_repo_token1 = 8,
  aux_sym_repo_token2 = 9,
  anon_sym_patterns = 10,
  anon_sym_LBRACK = 11,
  anon_sym_RBRACK = 12,
  anon_sym_include = 13,
  aux_sym__includeScope_token1 = 14,
  aux_sym__includeScope_token2 = 15,
  anon_sym_POUND = 16,
  anon_sym_scopeName = 17,
  anon_sym_name = 18,
  anon_sym_contentName = 19,
  anon_sym_injectionSelector = 20,
  anon_sym_injections = 21,
  anon_sym_match = 22,
  anon_sym_begin = 23,
  anon_sym_end = 24,
  anon_sym_while = 25,
  anon_sym_applyEndPatternLast = 26,
  anon_sym_captures = 27,
  anon_sym_beginCaptures = 28,
  anon_sym_endCaptures = 29,
  anon_sym_whileCaptures = 30,
  aux_sym_capture_token1 = 31,
  anon_sym_version = 32,
  anon_sym_DOLLARschema = 33,
  anon_sym_fileTypes = 34,
  anon_sym_firstLineMatch = 35,
  anon_sym_foldingStartMarker = 36,
  anon_sym_foldingStopMarker = 37,
  anon_sym_uuid = 38,
  anon_sym_comment = 39,
  anon_sym_SLASH_SLASH = 40,
  anon_sym_true = 41,
  anon_sym_false = 42,
  sym_null = 43,
  sym__string_content = 44,
  sym_json = 45,
  sym_repository = 46,
  sym_repo = 47,
  sym_patterns = 48,
  sym__pattern = 49,
  sym_include = 50,
  sym_value = 51,
  aux_sym__includeScope = 52,
  sym__includeItem = 53,
  sym_scopeName = 54,
  sym_name = 55,
  sym_nameScope = 56,
  sym_contentName = 57,
  sym_injectionSelector = 58,
  sym_injections = 59,
  sym_injection = 60,
  sym_match = 61,
  sym_begin = 62,
  sym_end = 63,
  sym_while = 64,
  sym_applyEndPatternLast = 65,
  sym_captures = 66,
  sym_beginCaptures = 67,
  sym_endCaptures = 68,
  sym_whileCaptures = 69,
  sym_capture = 70,
  sym_version = 71,
  sym_schema = 72,
  sym_fileTypes = 73,
  sym_firstLineMatch = 74,
  sym_foldingStartMarker = 75,
  sym_foldingStopMarker = 76,
  sym_uuid = 77,
  sym__comments = 78,
  sym_comment = 79,
  sym_comment_slash = 80,
  sym_item = 81,
  sym_object = 82,
  sym_array = 83,
  sym__value = 84,
  sym_boolean = 85,
  sym_integer = 86,
  sym__string = 87,
  aux_sym_json_repeat1 = 88,
  aux_sym_json_repeat2 = 89,
  aux_sym_json_repeat3 = 90,
  aux_sym_repository_repeat1 = 91,
  aux_sym_repo_repeat1 = 92,
  aux_sym_patterns_repeat1 = 93,
  aux_sym__pattern_repeat1 = 94,
  aux_sym_injections_repeat1 = 95,
  aux_sym_injection_repeat1 = 96,
  aux_sym_captures_repeat1 = 97,
  aux_sym_fileTypes_repeat1 = 98,
  aux_sym_object_repeat1 = 99,
  aux_sym_array_repeat1 = 100,
  alias_sym_pattern = 101,
  anon_alias_sym_TILDE = 102,
};

static const char * const ts_symbol_names[] = {
  [ts_builtin_sym_end] = "end",
  [anon_sym_LBRACE] = "{",
  [anon_sym_COMMA] = ",",
  [anon_sym_RBRACE] = "}",
  [sym__whitespace] = "_whitespace",
  [anon_sym_DQUOTE] = "\"",
  [anon_sym_repository] = "key",
  [anon_sym_COLON] = ":",
  [aux_sym_repo_token1] = "repo_token1",
  [aux_sym_repo_token2] = "repo_token2",
  [anon_sym_patterns] = "key",
  [anon_sym_LBRACK] = "[",
  [anon_sym_RBRACK] = "]",
  [anon_sym_include] = "key",
  [aux_sym__includeScope_token1] = "_includeScope_token1",
  [aux_sym__includeScope_token2] = "_includeScope_token2",
  [anon_sym_POUND] = "#",
  [anon_sym_scopeName] = "key",
  [anon_sym_name] = "key",
  [anon_sym_contentName] = "key",
  [anon_sym_injectionSelector] = "key",
  [anon_sym_injections] = "key",
  [anon_sym_match] = "key",
  [anon_sym_begin] = "key",
  [anon_sym_end] = "key",
  [anon_sym_while] = "key",
  [anon_sym_applyEndPatternLast] = "key",
  [anon_sym_captures] = "key",
  [anon_sym_beginCaptures] = "key",
  [anon_sym_endCaptures] = "key",
  [anon_sym_whileCaptures] = "key",
  [aux_sym_capture_token1] = "capture_token1",
  [anon_sym_version] = "key",
  [anon_sym_DOLLARschema] = "key",
  [anon_sym_fileTypes] = "key",
  [anon_sym_firstLineMatch] = "key",
  [anon_sym_foldingStartMarker] = "key",
  [anon_sym_foldingStopMarker] = "key",
  [anon_sym_uuid] = "key",
  [anon_sym_comment] = "key",
  [anon_sym_SLASH_SLASH] = "key",
  [anon_sym_true] = "true",
  [anon_sym_false] = "false",
  [sym_null] = "null",
  [sym__string_content] = "key",
  [sym_json] = "json",
  [sym_repository] = "repository",
  [sym_repo] = "repo",
  [sym_patterns] = "patterns",
  [sym__pattern] = "_pattern",
  [sym_include] = "include",
  [sym_value] = "value",
  [aux_sym__includeScope] = "_includeScope",
  [sym__includeItem] = "_includeItem",
  [sym_scopeName] = "scopeName",
  [sym_name] = "name",
  [sym_nameScope] = "nameScope",
  [sym_contentName] = "contentName",
  [sym_injectionSelector] = "injectionSelector",
  [sym_injections] = "injections",
  [sym_injection] = "injection",
  [sym_match] = "match",
  [sym_begin] = "begin",
  [sym_end] = "end",
  [sym_while] = "while",
  [sym_applyEndPatternLast] = "applyEndPatternLast",
  [sym_captures] = "captures",
  [sym_beginCaptures] = "beginCaptures",
  [sym_endCaptures] = "endCaptures",
  [sym_whileCaptures] = "whileCaptures",
  [sym_capture] = "capture",
  [sym_version] = "version",
  [sym_schema] = "schema",
  [sym_fileTypes] = "fileTypes",
  [sym_firstLineMatch] = "firstLineMatch",
  [sym_foldingStartMarker] = "foldingStartMarker",
  [sym_foldingStopMarker] = "foldingStopMarker",
  [sym_uuid] = "uuid",
  [sym__comments] = "_comments",
  [sym_comment] = "comment",
  [sym_comment_slash] = "comment_slash",
  [sym_item] = "item",
  [sym_object] = "object",
  [sym_array] = "array",
  [sym__value] = "_value",
  [sym_boolean] = "boolean",
  [sym_integer] = "integer",
  [sym__string] = "_string",
  [aux_sym_json_repeat1] = "json_repeat1",
  [aux_sym_json_repeat2] = "json_repeat2",
  [aux_sym_json_repeat3] = "json_repeat3",
  [aux_sym_repository_repeat1] = "repository_repeat1",
  [aux_sym_repo_repeat1] = "repo_repeat1",
  [aux_sym_patterns_repeat1] = "patterns_repeat1",
  [aux_sym__pattern_repeat1] = "_pattern_repeat1",
  [aux_sym_injections_repeat1] = "injections_repeat1",
  [aux_sym_injection_repeat1] = "injection_repeat1",
  [aux_sym_captures_repeat1] = "captures_repeat1",
  [aux_sym_fileTypes_repeat1] = "fileTypes_repeat1",
  [aux_sym_object_repeat1] = "object_repeat1",
  [aux_sym_array_repeat1] = "array_repeat1",
  [alias_sym_pattern] = "pattern",
  [anon_alias_sym_TILDE] = "~",
};

static const TSSymbol ts_symbol_map[] = {
  [ts_builtin_sym_end] = ts_builtin_sym_end,
  [anon_sym_LBRACE] = anon_sym_LBRACE,
  [anon_sym_COMMA] = anon_sym_COMMA,
  [anon_sym_RBRACE] = anon_sym_RBRACE,
  [sym__whitespace] = sym__whitespace,
  [anon_sym_DQUOTE] = anon_sym_DQUOTE,
  [anon_sym_repository] = anon_sym_repository,
  [anon_sym_COLON] = anon_sym_COLON,
  [aux_sym_repo_token1] = aux_sym_repo_token1,
  [aux_sym_repo_token2] = aux_sym_repo_token2,
  [anon_sym_patterns] = anon_sym_repository,
  [anon_sym_LBRACK] = anon_sym_LBRACK,
  [anon_sym_RBRACK] = anon_sym_RBRACK,
  [anon_sym_include] = anon_sym_repository,
  [aux_sym__includeScope_token1] = aux_sym__includeScope_token1,
  [aux_sym__includeScope_token2] = aux_sym__includeScope_token2,
  [anon_sym_POUND] = anon_sym_POUND,
  [anon_sym_scopeName] = anon_sym_repository,
  [anon_sym_name] = anon_sym_repository,
  [anon_sym_contentName] = anon_sym_repository,
  [anon_sym_injectionSelector] = anon_sym_repository,
  [anon_sym_injections] = anon_sym_repository,
  [anon_sym_match] = anon_sym_repository,
  [anon_sym_begin] = anon_sym_repository,
  [anon_sym_end] = anon_sym_repository,
  [anon_sym_while] = anon_sym_repository,
  [anon_sym_applyEndPatternLast] = anon_sym_repository,
  [anon_sym_captures] = anon_sym_repository,
  [anon_sym_beginCaptures] = anon_sym_repository,
  [anon_sym_endCaptures] = anon_sym_repository,
  [anon_sym_whileCaptures] = anon_sym_repository,
  [aux_sym_capture_token1] = aux_sym_capture_token1,
  [anon_sym_version] = anon_sym_repository,
  [anon_sym_DOLLARschema] = anon_sym_repository,
  [anon_sym_fileTypes] = anon_sym_repository,
  [anon_sym_firstLineMatch] = anon_sym_repository,
  [anon_sym_foldingStartMarker] = anon_sym_repository,
  [anon_sym_foldingStopMarker] = anon_sym_repository,
  [anon_sym_uuid] = anon_sym_repository,
  [anon_sym_comment] = anon_sym_repository,
  [anon_sym_SLASH_SLASH] = anon_sym_repository,
  [anon_sym_true] = anon_sym_true,
  [anon_sym_false] = anon_sym_false,
  [sym_null] = sym_null,
  [sym__string_content] = anon_sym_repository,
  [sym_json] = sym_json,
  [sym_repository] = sym_repository,
  [sym_repo] = sym_repo,
  [sym_patterns] = sym_patterns,
  [sym__pattern] = sym__pattern,
  [sym_include] = sym_include,
  [sym_value] = sym_value,
  [aux_sym__includeScope] = aux_sym__includeScope,
  [sym__includeItem] = sym__includeItem,
  [sym_scopeName] = sym_scopeName,
  [sym_name] = sym_name,
  [sym_nameScope] = sym_nameScope,
  [sym_contentName] = sym_contentName,
  [sym_injectionSelector] = sym_injectionSelector,
  [sym_injections] = sym_injections,
  [sym_injection] = sym_injection,
  [sym_match] = sym_match,
  [sym_begin] = sym_begin,
  [sym_end] = sym_end,
  [sym_while] = sym_while,
  [sym_applyEndPatternLast] = sym_applyEndPatternLast,
  [sym_captures] = sym_captures,
  [sym_beginCaptures] = sym_beginCaptures,
  [sym_endCaptures] = sym_endCaptures,
  [sym_whileCaptures] = sym_whileCaptures,
  [sym_capture] = sym_capture,
  [sym_version] = sym_version,
  [sym_schema] = sym_schema,
  [sym_fileTypes] = sym_fileTypes,
  [sym_firstLineMatch] = sym_firstLineMatch,
  [sym_foldingStartMarker] = sym_foldingStartMarker,
  [sym_foldingStopMarker] = sym_foldingStopMarker,
  [sym_uuid] = sym_uuid,
  [sym__comments] = sym__comments,
  [sym_comment] = sym_comment,
  [sym_comment_slash] = sym_comment_slash,
  [sym_item] = sym_item,
  [sym_object] = sym_object,
  [sym_array] = sym_array,
  [sym__value] = sym__value,
  [sym_boolean] = sym_boolean,
  [sym_integer] = sym_integer,
  [sym__string] = sym__string,
  [aux_sym_json_repeat1] = aux_sym_json_repeat1,
  [aux_sym_json_repeat2] = aux_sym_json_repeat2,
  [aux_sym_json_repeat3] = aux_sym_json_repeat3,
  [aux_sym_repository_repeat1] = aux_sym_repository_repeat1,
  [aux_sym_repo_repeat1] = aux_sym_repo_repeat1,
  [aux_sym_patterns_repeat1] = aux_sym_patterns_repeat1,
  [aux_sym__pattern_repeat1] = aux_sym__pattern_repeat1,
  [aux_sym_injections_repeat1] = aux_sym_injections_repeat1,
  [aux_sym_injection_repeat1] = aux_sym_injection_repeat1,
  [aux_sym_captures_repeat1] = aux_sym_captures_repeat1,
  [aux_sym_fileTypes_repeat1] = aux_sym_fileTypes_repeat1,
  [aux_sym_object_repeat1] = aux_sym_object_repeat1,
  [aux_sym_array_repeat1] = aux_sym_array_repeat1,
  [alias_sym_pattern] = alias_sym_pattern,
  [anon_alias_sym_TILDE] = anon_alias_sym_TILDE,
};

static const TSSymbolMetadata ts_symbol_metadata[] = {
  [ts_builtin_sym_end] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_LBRACE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_COMMA] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RBRACE] = {
    .visible = true,
    .named = false,
  },
  [sym__whitespace] = {
    .visible = false,
    .named = true,
  },
  [anon_sym_DQUOTE] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_repository] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_COLON] = {
    .visible = true,
    .named = false,
  },
  [aux_sym_repo_token1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_repo_token2] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_patterns] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_LBRACK] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_RBRACK] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_include] = {
    .visible = true,
    .named = true,
  },
  [aux_sym__includeScope_token1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__includeScope_token2] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_POUND] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_scopeName] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_name] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_contentName] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_injectionSelector] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_injections] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_match] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_begin] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_end] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_while] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_applyEndPatternLast] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_captures] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_beginCaptures] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_endCaptures] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_whileCaptures] = {
    .visible = true,
    .named = true,
  },
  [aux_sym_capture_token1] = {
    .visible = false,
    .named = false,
  },
  [anon_sym_version] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_DOLLARschema] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_fileTypes] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_firstLineMatch] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_foldingStartMarker] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_foldingStopMarker] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_uuid] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_comment] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_SLASH_SLASH] = {
    .visible = true,
    .named = true,
  },
  [anon_sym_true] = {
    .visible = true,
    .named = false,
  },
  [anon_sym_false] = {
    .visible = true,
    .named = false,
  },
  [sym_null] = {
    .visible = true,
    .named = true,
  },
  [sym__string_content] = {
    .visible = true,
    .named = true,
  },
  [sym_json] = {
    .visible = true,
    .named = true,
  },
  [sym_repository] = {
    .visible = true,
    .named = true,
  },
  [sym_repo] = {
    .visible = true,
    .named = true,
  },
  [sym_patterns] = {
    .visible = true,
    .named = true,
  },
  [sym__pattern] = {
    .visible = false,
    .named = true,
  },
  [sym_include] = {
    .visible = true,
    .named = true,
  },
  [sym_value] = {
    .visible = true,
    .named = true,
  },
  [aux_sym__includeScope] = {
    .visible = false,
    .named = false,
  },
  [sym__includeItem] = {
    .visible = false,
    .named = true,
  },
  [sym_scopeName] = {
    .visible = true,
    .named = true,
  },
  [sym_name] = {
    .visible = true,
    .named = true,
  },
  [sym_nameScope] = {
    .visible = true,
    .named = true,
  },
  [sym_contentName] = {
    .visible = true,
    .named = true,
  },
  [sym_injectionSelector] = {
    .visible = true,
    .named = true,
  },
  [sym_injections] = {
    .visible = true,
    .named = true,
  },
  [sym_injection] = {
    .visible = true,
    .named = true,
  },
  [sym_match] = {
    .visible = true,
    .named = true,
  },
  [sym_begin] = {
    .visible = true,
    .named = true,
  },
  [sym_end] = {
    .visible = true,
    .named = true,
  },
  [sym_while] = {
    .visible = true,
    .named = true,
  },
  [sym_applyEndPatternLast] = {
    .visible = true,
    .named = true,
  },
  [sym_captures] = {
    .visible = true,
    .named = true,
  },
  [sym_beginCaptures] = {
    .visible = true,
    .named = true,
  },
  [sym_endCaptures] = {
    .visible = true,
    .named = true,
  },
  [sym_whileCaptures] = {
    .visible = true,
    .named = true,
  },
  [sym_capture] = {
    .visible = true,
    .named = true,
  },
  [sym_version] = {
    .visible = true,
    .named = true,
  },
  [sym_schema] = {
    .visible = true,
    .named = true,
  },
  [sym_fileTypes] = {
    .visible = true,
    .named = true,
  },
  [sym_firstLineMatch] = {
    .visible = true,
    .named = true,
  },
  [sym_foldingStartMarker] = {
    .visible = true,
    .named = true,
  },
  [sym_foldingStopMarker] = {
    .visible = true,
    .named = true,
  },
  [sym_uuid] = {
    .visible = true,
    .named = true,
  },
  [sym__comments] = {
    .visible = false,
    .named = true,
  },
  [sym_comment] = {
    .visible = true,
    .named = true,
  },
  [sym_comment_slash] = {
    .visible = true,
    .named = true,
  },
  [sym_item] = {
    .visible = true,
    .named = true,
  },
  [sym_object] = {
    .visible = true,
    .named = true,
  },
  [sym_array] = {
    .visible = true,
    .named = true,
  },
  [sym__value] = {
    .visible = false,
    .named = true,
  },
  [sym_boolean] = {
    .visible = true,
    .named = true,
  },
  [sym_integer] = {
    .visible = true,
    .named = true,
  },
  [sym__string] = {
    .visible = false,
    .named = true,
  },
  [aux_sym_json_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_json_repeat2] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_json_repeat3] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_repository_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_repo_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_patterns_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym__pattern_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_injections_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_injection_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_captures_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_fileTypes_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_object_repeat1] = {
    .visible = false,
    .named = false,
  },
  [aux_sym_array_repeat1] = {
    .visible = false,
    .named = false,
  },
  [alias_sym_pattern] = {
    .visible = true,
    .named = true,
  },
  [anon_alias_sym_TILDE] = {
    .visible = true,
    .named = false,
  },
};

static const TSSymbol ts_alias_sequences[PRODUCTION_ID_COUNT][MAX_ALIAS_SEQUENCE_LENGTH] = {
  [0] = {0},
  [1] = {
    [1] = sym_value,
  },
  [2] = {
    [5] = alias_sym_pattern,
  },
  [3] = {
    [1] = alias_sym_pattern,
  },
  [4] = {
    [6] = alias_sym_pattern,
  },
  [5] = {
    [2] = alias_sym_pattern,
  },
  [6] = {
    [7] = alias_sym_pattern,
  },
  [7] = {
    [1] = anon_sym_repository,
  },
  [8] = {
    [3] = alias_sym_pattern,
  },
  [9] = {
    [8] = alias_sym_pattern,
  },
  [10] = {
    [1] = anon_sym_repository,
    [2] = anon_alias_sym_TILDE,
  },
};

static const uint16_t ts_non_terminal_alias_map[] = {
  sym__pattern, 2,
    sym__pattern,
    alias_sym_pattern,
  aux_sym_repo_repeat1, 3,
    aux_sym_repo_repeat1,
    anon_alias_sym_TILDE,
    anon_sym_repository,
  0,
};

static const TSStateId ts_primary_state_ids[STATE_COUNT] = {
  [0] = 0,
  [1] = 1,
  [2] = 2,
  [3] = 3,
  [4] = 4,
  [5] = 5,
  [6] = 6,
  [7] = 7,
  [8] = 8,
  [9] = 9,
  [10] = 10,
  [11] = 11,
  [12] = 12,
  [13] = 13,
  [14] = 14,
  [15] = 15,
  [16] = 16,
  [17] = 17,
  [18] = 18,
  [19] = 19,
  [20] = 20,
  [21] = 21,
  [22] = 22,
  [23] = 23,
  [24] = 24,
  [25] = 25,
  [26] = 26,
  [27] = 27,
  [28] = 28,
  [29] = 29,
  [30] = 30,
  [31] = 31,
  [32] = 32,
  [33] = 33,
  [34] = 34,
  [35] = 35,
  [36] = 36,
  [37] = 37,
  [38] = 38,
  [39] = 39,
  [40] = 40,
  [41] = 41,
  [42] = 42,
  [43] = 43,
  [44] = 44,
  [45] = 45,
  [46] = 46,
  [47] = 47,
  [48] = 48,
  [49] = 49,
  [50] = 50,
  [51] = 51,
  [52] = 52,
  [53] = 53,
  [54] = 54,
  [55] = 55,
  [56] = 56,
  [57] = 57,
  [58] = 58,
  [59] = 59,
  [60] = 60,
  [61] = 61,
  [62] = 62,
  [63] = 63,
  [64] = 64,
  [65] = 65,
  [66] = 66,
  [67] = 67,
  [68] = 68,
  [69] = 69,
  [70] = 70,
  [71] = 71,
  [72] = 72,
  [73] = 73,
  [74] = 74,
  [75] = 75,
  [76] = 76,
  [77] = 77,
  [78] = 78,
  [79] = 79,
  [80] = 80,
  [81] = 81,
  [82] = 82,
  [83] = 83,
  [84] = 84,
  [85] = 85,
  [86] = 86,
  [87] = 87,
  [88] = 88,
  [89] = 89,
  [90] = 90,
  [91] = 91,
  [92] = 92,
  [93] = 93,
  [94] = 94,
  [95] = 95,
  [96] = 96,
  [97] = 97,
  [98] = 98,
  [99] = 99,
  [100] = 100,
  [101] = 101,
  [102] = 102,
  [103] = 103,
  [104] = 104,
  [105] = 105,
  [106] = 106,
  [107] = 107,
  [108] = 108,
  [109] = 109,
  [110] = 110,
  [111] = 111,
  [112] = 112,
  [113] = 113,
  [114] = 114,
  [115] = 115,
  [116] = 116,
  [117] = 117,
  [118] = 118,
  [119] = 119,
  [120] = 120,
  [121] = 121,
  [122] = 122,
  [123] = 123,
  [124] = 124,
  [125] = 125,
  [126] = 126,
  [127] = 127,
  [128] = 128,
  [129] = 129,
  [130] = 130,
  [131] = 131,
  [132] = 132,
  [133] = 133,
  [134] = 134,
  [135] = 135,
  [136] = 136,
  [137] = 137,
  [138] = 138,
  [139] = 139,
  [140] = 140,
  [141] = 141,
  [142] = 142,
  [143] = 143,
  [144] = 144,
  [145] = 145,
  [146] = 146,
  [147] = 147,
  [148] = 148,
  [149] = 149,
  [150] = 150,
  [151] = 151,
  [152] = 152,
  [153] = 153,
  [154] = 154,
  [155] = 155,
  [156] = 156,
  [157] = 157,
  [158] = 158,
  [159] = 159,
  [160] = 160,
  [161] = 161,
  [162] = 162,
  [163] = 163,
  [164] = 164,
  [165] = 165,
  [166] = 166,
  [167] = 167,
  [168] = 168,
  [169] = 169,
  [170] = 170,
  [171] = 171,
  [172] = 172,
  [173] = 173,
  [174] = 174,
  [175] = 175,
  [176] = 176,
  [177] = 177,
  [178] = 178,
  [179] = 179,
  [180] = 180,
  [181] = 181,
  [182] = 182,
  [183] = 183,
  [184] = 184,
  [185] = 185,
  [186] = 186,
  [187] = 187,
  [188] = 188,
  [189] = 189,
  [190] = 190,
  [191] = 191,
  [192] = 192,
  [193] = 193,
  [194] = 194,
  [195] = 195,
  [196] = 196,
  [197] = 197,
  [198] = 198,
  [199] = 199,
  [200] = 200,
  [201] = 201,
  [202] = 202,
  [203] = 203,
  [204] = 204,
  [205] = 205,
  [206] = 206,
  [207] = 207,
  [208] = 208,
  [209] = 209,
  [210] = 210,
  [211] = 211,
  [212] = 212,
  [213] = 213,
  [214] = 214,
  [215] = 215,
  [216] = 216,
  [217] = 217,
  [218] = 218,
  [219] = 219,
  [220] = 220,
  [221] = 221,
  [222] = 222,
  [223] = 223,
  [224] = 224,
  [225] = 225,
  [226] = 226,
  [227] = 227,
  [228] = 228,
  [229] = 229,
  [230] = 230,
  [231] = 231,
  [232] = 232,
  [233] = 233,
  [234] = 234,
  [235] = 235,
  [236] = 236,
  [237] = 237,
  [238] = 238,
  [239] = 239,
  [240] = 240,
  [241] = 241,
  [242] = 242,
  [243] = 243,
  [244] = 244,
  [245] = 245,
  [246] = 246,
  [247] = 247,
  [248] = 248,
  [249] = 249,
  [250] = 250,
  [251] = 251,
  [252] = 252,
  [253] = 253,
  [254] = 254,
  [255] = 255,
  [256] = 256,
  [257] = 257,
  [258] = 258,
  [259] = 259,
  [260] = 260,
  [261] = 261,
  [262] = 262,
  [263] = 263,
  [264] = 264,
  [265] = 265,
  [266] = 266,
  [267] = 267,
  [268] = 268,
  [269] = 269,
  [270] = 270,
  [271] = 271,
  [272] = 272,
  [273] = 273,
  [274] = 274,
  [275] = 275,
  [276] = 276,
  [277] = 277,
  [278] = 278,
  [279] = 279,
  [280] = 280,
  [281] = 281,
  [282] = 282,
  [283] = 283,
  [284] = 284,
  [285] = 285,
  [286] = 286,
  [287] = 287,
  [288] = 288,
  [289] = 289,
  [290] = 290,
  [291] = 291,
  [292] = 292,
  [293] = 293,
  [294] = 294,
  [295] = 295,
  [296] = 296,
  [297] = 297,
  [298] = 298,
  [299] = 299,
  [300] = 300,
  [301] = 301,
  [302] = 302,
  [303] = 303,
  [304] = 304,
  [305] = 305,
  [306] = 306,
  [307] = 307,
  [308] = 308,
  [309] = 309,
  [310] = 310,
  [311] = 311,
  [312] = 312,
  [313] = 313,
  [314] = 314,
  [315] = 315,
  [316] = 316,
  [317] = 317,
  [318] = 318,
  [319] = 319,
  [320] = 320,
  [321] = 321,
  [322] = 322,
  [323] = 323,
  [324] = 324,
  [325] = 325,
  [326] = 326,
  [327] = 327,
  [328] = 328,
  [329] = 329,
  [330] = 330,
  [331] = 331,
  [332] = 332,
  [333] = 333,
  [334] = 334,
  [335] = 335,
  [336] = 336,
  [337] = 337,
  [338] = 338,
  [339] = 339,
  [340] = 340,
  [341] = 341,
  [342] = 342,
  [343] = 343,
  [344] = 344,
  [345] = 345,
  [346] = 346,
  [347] = 347,
  [348] = 348,
  [349] = 349,
  [350] = 350,
  [351] = 351,
  [352] = 352,
  [353] = 353,
  [354] = 354,
  [355] = 355,
  [356] = 356,
  [357] = 357,
  [358] = 358,
  [359] = 359,
  [360] = 360,
  [361] = 361,
  [362] = 362,
  [363] = 363,
  [364] = 364,
  [365] = 365,
  [366] = 366,
  [367] = 367,
  [368] = 368,
  [369] = 369,
  [370] = 370,
  [371] = 371,
  [372] = 372,
  [373] = 373,
  [374] = 374,
  [375] = 375,
  [376] = 376,
  [377] = 377,
  [378] = 378,
  [379] = 379,
  [380] = 380,
  [381] = 381,
  [382] = 382,
  [383] = 383,
  [384] = 384,
  [385] = 385,
  [386] = 386,
  [387] = 387,
  [388] = 388,
  [389] = 389,
  [390] = 390,
  [391] = 391,
  [392] = 392,
  [393] = 393,
  [394] = 394,
  [395] = 395,
  [396] = 396,
  [397] = 397,
  [398] = 398,
  [399] = 399,
  [400] = 400,
  [401] = 401,
  [402] = 402,
  [403] = 403,
  [404] = 404,
  [405] = 405,
  [406] = 406,
  [407] = 407,
  [408] = 408,
  [409] = 409,
  [410] = 410,
  [411] = 411,
  [412] = 412,
  [413] = 413,
  [414] = 414,
  [415] = 415,
  [416] = 416,
  [417] = 417,
  [418] = 418,
  [419] = 419,
  [420] = 420,
  [421] = 421,
  [422] = 422,
  [423] = 423,
  [424] = 424,
  [425] = 425,
  [426] = 426,
  [427] = 427,
  [428] = 428,
  [429] = 429,
  [430] = 430,
  [431] = 431,
  [432] = 432,
  [433] = 433,
  [434] = 434,
  [435] = 435,
  [436] = 436,
  [437] = 437,
  [438] = 438,
  [439] = 439,
  [440] = 440,
  [441] = 441,
  [442] = 442,
  [443] = 443,
  [444] = 444,
  [445] = 445,
  [446] = 446,
  [447] = 447,
  [448] = 448,
  [449] = 449,
  [450] = 450,
  [451] = 451,
  [452] = 452,
  [453] = 453,
  [454] = 454,
  [455] = 455,
  [456] = 456,
  [457] = 457,
  [458] = 458,
  [459] = 459,
  [460] = 460,
  [461] = 461,
  [462] = 462,
  [463] = 463,
  [464] = 464,
  [465] = 465,
  [466] = 466,
  [467] = 467,
  [468] = 468,
  [469] = 469,
  [470] = 470,
  [471] = 471,
  [472] = 472,
  [473] = 473,
  [474] = 474,
  [475] = 475,
  [476] = 476,
  [477] = 477,
  [478] = 478,
  [479] = 479,
  [480] = 480,
  [481] = 481,
  [482] = 482,
  [483] = 483,
  [484] = 484,
  [485] = 485,
  [486] = 486,
  [487] = 487,
  [488] = 488,
  [489] = 489,
  [490] = 490,
  [491] = 491,
  [492] = 492,
  [493] = 493,
  [494] = 494,
  [495] = 495,
  [496] = 496,
  [497] = 497,
  [498] = 498,
  [499] = 499,
  [500] = 500,
  [501] = 501,
  [502] = 502,
  [503] = 503,
  [504] = 504,
  [505] = 505,
  [506] = 506,
  [507] = 507,
  [508] = 508,
  [509] = 509,
  [510] = 510,
  [511] = 511,
  [512] = 512,
  [513] = 513,
  [514] = 514,
  [515] = 515,
  [516] = 516,
  [517] = 517,
  [518] = 518,
  [519] = 519,
  [520] = 520,
  [521] = 521,
  [522] = 522,
  [523] = 523,
  [524] = 524,
  [525] = 525,
  [526] = 526,
  [527] = 527,
  [528] = 528,
  [529] = 529,
  [530] = 530,
  [531] = 531,
  [532] = 532,
  [533] = 533,
  [534] = 534,
  [535] = 535,
  [536] = 536,
  [537] = 537,
  [538] = 538,
  [539] = 539,
  [540] = 540,
  [541] = 541,
  [542] = 542,
  [543] = 543,
  [544] = 544,
  [545] = 545,
  [546] = 546,
  [547] = 547,
  [548] = 548,
  [549] = 549,
  [550] = 550,
  [551] = 551,
  [552] = 552,
  [553] = 553,
  [554] = 554,
  [555] = 555,
  [556] = 556,
  [557] = 557,
  [558] = 558,
  [559] = 559,
  [560] = 560,
  [561] = 561,
  [562] = 562,
  [563] = 563,
  [564] = 564,
  [565] = 565,
  [566] = 566,
  [567] = 567,
  [568] = 568,
  [569] = 569,
  [570] = 570,
  [571] = 571,
  [572] = 572,
  [573] = 573,
  [574] = 574,
  [575] = 575,
  [576] = 576,
  [577] = 577,
  [578] = 578,
  [579] = 579,
  [580] = 580,
  [581] = 581,
  [582] = 582,
  [583] = 583,
  [584] = 584,
  [585] = 585,
  [586] = 586,
  [587] = 587,
  [588] = 588,
  [589] = 589,
  [590] = 590,
  [591] = 591,
  [592] = 592,
  [593] = 593,
  [594] = 594,
  [595] = 595,
  [596] = 596,
  [597] = 597,
  [598] = 598,
  [599] = 599,
  [600] = 600,
  [601] = 601,
  [602] = 602,
  [603] = 603,
  [604] = 604,
  [605] = 605,
  [606] = 606,
  [607] = 607,
  [608] = 608,
  [609] = 609,
  [610] = 610,
  [611] = 611,
  [612] = 612,
  [613] = 613,
  [614] = 614,
  [615] = 615,
  [616] = 616,
  [617] = 617,
  [618] = 618,
  [619] = 619,
  [620] = 620,
  [621] = 621,
  [622] = 622,
  [623] = 623,
  [624] = 624,
  [625] = 625,
  [626] = 626,
  [627] = 627,
  [628] = 628,
  [629] = 629,
  [630] = 630,
  [631] = 631,
  [632] = 632,
  [633] = 633,
  [634] = 634,
  [635] = 635,
  [636] = 636,
  [637] = 637,
  [638] = 638,
  [639] = 639,
  [640] = 640,
  [641] = 641,
  [642] = 642,
  [643] = 643,
  [644] = 644,
  [645] = 645,
  [646] = 646,
  [647] = 647,
  [648] = 648,
  [649] = 649,
  [650] = 650,
  [651] = 651,
  [652] = 652,
  [653] = 653,
  [654] = 654,
  [655] = 655,
  [656] = 656,
  [657] = 657,
  [658] = 658,
  [659] = 659,
  [660] = 660,
  [661] = 661,
  [662] = 662,
  [663] = 663,
  [664] = 664,
  [665] = 665,
  [666] = 666,
  [667] = 667,
  [668] = 668,
  [669] = 669,
  [670] = 670,
  [671] = 671,
  [672] = 672,
  [673] = 673,
  [674] = 674,
  [675] = 675,
  [676] = 676,
  [677] = 677,
  [678] = 678,
  [679] = 679,
  [680] = 680,
  [681] = 681,
  [682] = 682,
  [683] = 683,
  [684] = 684,
  [685] = 685,
  [686] = 686,
  [687] = 687,
  [688] = 688,
  [689] = 689,
  [690] = 690,
  [691] = 691,
  [692] = 692,
  [693] = 693,
  [694] = 694,
  [695] = 695,
  [696] = 696,
  [697] = 697,
  [698] = 698,
  [699] = 699,
  [700] = 700,
  [701] = 701,
  [702] = 702,
  [703] = 703,
  [704] = 704,
  [705] = 705,
  [706] = 706,
  [707] = 707,
  [708] = 708,
  [709] = 709,
  [710] = 710,
  [711] = 711,
  [712] = 712,
  [713] = 713,
  [714] = 714,
  [715] = 715,
  [716] = 716,
  [717] = 717,
  [718] = 718,
  [719] = 719,
  [720] = 720,
  [721] = 721,
  [722] = 722,
  [723] = 723,
  [724] = 724,
  [725] = 725,
  [726] = 726,
  [727] = 727,
  [728] = 728,
  [729] = 729,
  [730] = 730,
  [731] = 731,
  [732] = 732,
  [733] = 733,
  [734] = 734,
  [735] = 735,
  [736] = 736,
  [737] = 737,
  [738] = 738,
  [739] = 739,
  [740] = 740,
  [741] = 741,
  [742] = 742,
  [743] = 743,
  [744] = 744,
  [745] = 745,
  [746] = 746,
  [747] = 747,
  [748] = 748,
  [749] = 749,
  [750] = 750,
  [751] = 751,
  [752] = 752,
  [753] = 753,
  [754] = 754,
  [755] = 755,
  [756] = 756,
  [757] = 757,
  [758] = 758,
  [759] = 759,
  [760] = 760,
  [761] = 761,
  [762] = 762,
  [763] = 763,
  [764] = 764,
  [765] = 765,
  [766] = 766,
  [767] = 767,
  [768] = 768,
  [769] = 769,
  [770] = 770,
  [771] = 771,
  [772] = 772,
  [773] = 773,
  [774] = 774,
  [775] = 775,
  [776] = 776,
  [777] = 777,
  [778] = 778,
  [779] = 779,
  [780] = 780,
  [781] = 781,
  [782] = 782,
  [783] = 783,
  [784] = 784,
  [785] = 785,
  [786] = 786,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(197);
      if (lookahead == '"') ADVANCE(202);
      if (lookahead == '#') ADVANCE(216);
      if (lookahead == '$') ADVANCE(158);
      if (lookahead == ',') ADVANCE(199);
      if (lookahead == '/') ADVANCE(8);
      if (lookahead == ':') ADVANCE(205);
      if (lookahead == '[') ADVANCE(210);
      if (lookahead == '\\') ADVANCE(1);
      if (lookahead == ']') ADVANCE(211);
      if (lookahead == 'a') ADVANCE(127);
      if (lookahead == 'b') ADVANCE(50);
      if (lookahead == 'c') ADVANCE(26);
      if (lookahead == 'e') ADVANCE(109);
      if (lookahead == 'f') ADVANCE(21);
      if (lookahead == 'i') ADVANCE(110);
      if (lookahead == 'm') ADVANCE(22);
      if (lookahead == 'n') ADVANCE(23);
      if (lookahead == 'p') ADVANCE(25);
      if (lookahead == 'r') ADVANCE(64);
      if (lookahead == 's') ADVANCE(38);
      if (lookahead == 't') ADVANCE(141);
      if (lookahead == 'u') ADVANCE(184);
      if (lookahead == 'v') ADVANCE(61);
      if (lookahead == 'w') ADVANCE(82);
      if (lookahead == '{') ADVANCE(198);
      if (lookahead == '}') ADVANCE(200);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(201);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(245);
      END_STATE();
    case 1:
      if (lookahead == '\n') ADVANCE(214);
      if (lookahead == '#') ADVANCE(206);
      if (lookahead != 0) ADVANCE(206);
      END_STATE();
    case 2:
      if (lookahead == '"') ADVANCE(202);
      if (lookahead == '#') ADVANCE(216);
      if (lookahead == '\\') ADVANCE(196);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(215);
      END_STATE();
    case 3:
      if (lookahead == '"') ADVANCE(202);
      if (lookahead == '$') ADVANCE(416);
      if (lookahead == '/') ADVANCE(267);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'c') ADVANCE(379);
      if (lookahead == 'f') ADVANCE(340);
      if (lookahead == 'i') ADVANCE(369);
      if (lookahead == 'n') ADVANCE(281);
      if (lookahead == 'p') ADVANCE(283);
      if (lookahead == 'r') ADVANCE(319);
      if (lookahead == 's') ADVANCE(300);
      if (lookahead == 'u') ADVANCE(442);
      if (lookahead == 'v') ADVANCE(322);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(449);
      END_STATE();
    case 4:
      if (lookahead == '"') ADVANCE(202);
      if (lookahead == '/') ADVANCE(267);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(387);
      if (lookahead == 'b') ADVANCE(308);
      if (lookahead == 'c') ADVANCE(284);
      if (lookahead == 'e') ADVANCE(365);
      if (lookahead == 'i') ADVANCE(366);
      if (lookahead == 'm') ADVANCE(280);
      if (lookahead == 'n') ADVANCE(281);
      if (lookahead == 'p') ADVANCE(283);
      if (lookahead == 'r') ADVANCE(319);
      if (lookahead == 'w') ADVANCE(336);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(449);
      END_STATE();
    case 5:
      if (lookahead == '"') ADVANCE(202);
      if (lookahead == '/') ADVANCE(267);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'c') ADVANCE(379);
      if (lookahead == 'p') ADVANCE(283);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(449);
      END_STATE();
    case 6:
      if (lookahead == '"') ADVANCE(202);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(449);
      END_STATE();
    case 7:
      if (lookahead == '"') ADVANCE(202);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(207);
      END_STATE();
    case 8:
      if (lookahead == '/') ADVANCE(262);
      END_STATE();
    case 9:
      if (lookahead == 'E') ADVANCE(116);
      END_STATE();
    case 10:
      if (lookahead == 'L') ADVANCE(29);
      END_STATE();
    case 11:
      if (lookahead == 'L') ADVANCE(89);
      END_STATE();
    case 12:
      if (lookahead == 'M') ADVANCE(28);
      END_STATE();
    case 13:
      if (lookahead == 'M') ADVANCE(30);
      END_STATE();
    case 14:
      if (lookahead == 'M') ADVANCE(33);
      END_STATE();
    case 15:
      if (lookahead == 'N') ADVANCE(31);
      END_STATE();
    case 16:
      if (lookahead == 'N') ADVANCE(32);
      END_STATE();
    case 17:
      if (lookahead == 'P') ADVANCE(34);
      END_STATE();
    case 18:
      if (lookahead == 'S') ADVANCE(167);
      END_STATE();
    case 19:
      if (lookahead == 'S') ADVANCE(71);
      if (lookahead == 's') ADVANCE(225);
      END_STATE();
    case 20:
      if (lookahead == 'T') ADVANCE(193);
      END_STATE();
    case 21:
      if (lookahead == 'a') ADVANCE(96);
      if (lookahead == 'i') ADVANCE(98);
      if (lookahead == 'o') ADVANCE(97);
      END_STATE();
    case 22:
      if (lookahead == 'a') ADVANCE(171);
      END_STATE();
    case 23:
      if (lookahead == 'a') ADVANCE(104);
      if (lookahead == 'u') ADVANCE(100);
      END_STATE();
    case 24:
      if (lookahead == 'a') ADVANCE(248);
      END_STATE();
    case 25:
      if (lookahead == 'a') ADVANCE(173);
      END_STATE();
    case 26:
      if (lookahead == 'a') ADVANCE(130);
      if (lookahead == 'o') ADVANCE(108);
      END_STATE();
    case 27:
      if (lookahead == 'a') ADVANCE(146);
      if (lookahead == 'o') ADVANCE(129);
      END_STATE();
    case 28:
      if (lookahead == 'a') ADVANCE(137);
      END_STATE();
    case 29:
      if (lookahead == 'a') ADVANCE(163);
      END_STATE();
    case 30:
      if (lookahead == 'a') ADVANCE(151);
      END_STATE();
    case 31:
      if (lookahead == 'a') ADVANCE(106);
      END_STATE();
    case 32:
      if (lookahead == 'a') ADVANCE(107);
      END_STATE();
    case 33:
      if (lookahead == 'a') ADVANCE(178);
      END_STATE();
    case 34:
      if (lookahead == 'a') ADVANCE(180);
      END_STATE();
    case 35:
      if (lookahead == 'a') ADVANCE(134);
      END_STATE();
    case 36:
      if (lookahead == 'a') ADVANCE(135);
      END_STATE();
    case 37:
      if (lookahead == 'a') ADVANCE(136);
      END_STATE();
    case 38:
      if (lookahead == 'c') ADVANCE(121);
      END_STATE();
    case 39:
      if (lookahead == 'c') ADVANCE(83);
      END_STATE();
    case 40:
      if (lookahead == 'c') ADVANCE(80);
      END_STATE();
    case 41:
      if (lookahead == 'c') ADVANCE(81);
      END_STATE();
    case 42:
      if (lookahead == 'c') ADVANCE(99);
      if (lookahead == 'j') ADVANCE(63);
      END_STATE();
    case 43:
      if (lookahead == 'c') ADVANCE(175);
      END_STATE();
    case 44:
      if (lookahead == 'c') ADVANCE(174);
      END_STATE();
    case 45:
      if (lookahead == 'd') ADVANCE(231);
      END_STATE();
    case 46:
      if (lookahead == 'd') ADVANCE(258);
      END_STATE();
    case 47:
      if (lookahead == 'd') ADVANCE(17);
      END_STATE();
    case 48:
      if (lookahead == 'd') ADVANCE(87);
      END_STATE();
    case 49:
      if (lookahead == 'd') ADVANCE(57);
      END_STATE();
    case 50:
      if (lookahead == 'e') ADVANCE(79);
      END_STATE();
    case 51:
      if (lookahead == 'e') ADVANCE(20);
      END_STATE();
    case 52:
      if (lookahead == 'e') ADVANCE(219);
      END_STATE();
    case 53:
      if (lookahead == 'e') ADVANCE(264);
      END_STATE();
    case 54:
      if (lookahead == 'e') ADVANCE(265);
      END_STATE();
    case 55:
      if (lookahead == 'e') ADVANCE(15);
      END_STATE();
    case 56:
      if (lookahead == 'e') ADVANCE(233);
      END_STATE();
    case 57:
      if (lookahead == 'e') ADVANCE(212);
      END_STATE();
    case 58:
      if (lookahead == 'e') ADVANCE(14);
      END_STATE();
    case 59:
      if (lookahead == 'e') ADVANCE(217);
      END_STATE();
    case 60:
      if (lookahead == 'e') ADVANCE(221);
      END_STATE();
    case 61:
      if (lookahead == 'e') ADVANCE(143);
      END_STATE();
    case 62:
      if (lookahead == 'e') ADVANCE(103);
      END_STATE();
    case 63:
      if (lookahead == 'e') ADVANCE(43);
      END_STATE();
    case 64:
      if (lookahead == 'e') ADVANCE(128);
      END_STATE();
    case 65:
      if (lookahead == 'e') ADVANCE(118);
      END_STATE();
    case 66:
      if (lookahead == 'e') ADVANCE(144);
      END_STATE();
    case 67:
      if (lookahead == 'e') ADVANCE(152);
      END_STATE();
    case 68:
      if (lookahead == 'e') ADVANCE(154);
      END_STATE();
    case 69:
      if (lookahead == 'e') ADVANCE(155);
      END_STATE();
    case 70:
      if (lookahead == 'e') ADVANCE(138);
      END_STATE();
    case 71:
      if (lookahead == 'e') ADVANCE(102);
      END_STATE();
    case 72:
      if (lookahead == 'e') ADVANCE(156);
      END_STATE();
    case 73:
      if (lookahead == 'e') ADVANCE(157);
      END_STATE();
    case 74:
      if (lookahead == 'e') ADVANCE(140);
      END_STATE();
    case 75:
      if (lookahead == 'e') ADVANCE(44);
      END_STATE();
    case 76:
      if (lookahead == 'e') ADVANCE(119);
      END_STATE();
    case 77:
      if (lookahead == 'e') ADVANCE(145);
      END_STATE();
    case 78:
      if (lookahead == 'g') ADVANCE(18);
      END_STATE();
    case 79:
      if (lookahead == 'g') ADVANCE(84);
      END_STATE();
    case 80:
      if (lookahead == 'h') ADVANCE(227);
      END_STATE();
    case 81:
      if (lookahead == 'h') ADVANCE(252);
      END_STATE();
    case 82:
      if (lookahead == 'h') ADVANCE(88);
      END_STATE();
    case 83:
      if (lookahead == 'h') ADVANCE(62);
      END_STATE();
    case 84:
      if (lookahead == 'i') ADVANCE(111);
      END_STATE();
    case 85:
      if (lookahead == 'i') ADVANCE(46);
      END_STATE();
    case 86:
      if (lookahead == 'i') ADVANCE(123);
      END_STATE();
    case 87:
      if (lookahead == 'i') ADVANCE(114);
      END_STATE();
    case 88:
      if (lookahead == 'i') ADVANCE(101);
      END_STATE();
    case 89:
      if (lookahead == 'i') ADVANCE(120);
      END_STATE();
    case 90:
      if (lookahead == 'i') ADVANCE(169);
      END_STATE();
    case 91:
      if (lookahead == 'i') ADVANCE(124);
      END_STATE();
    case 92:
      if (lookahead == 'k') ADVANCE(70);
      END_STATE();
    case 93:
      if (lookahead == 'k') ADVANCE(74);
      END_STATE();
    case 94:
      if (lookahead == 'l') ADVANCE(191);
      END_STATE();
    case 95:
      if (lookahead == 'l') ADVANCE(266);
      END_STATE();
    case 96:
      if (lookahead == 'l') ADVANCE(162);
      END_STATE();
    case 97:
      if (lookahead == 'l') ADVANCE(48);
      END_STATE();
    case 98:
      if (lookahead == 'l') ADVANCE(51);
      if (lookahead == 'r') ADVANCE(159);
      END_STATE();
    case 99:
      if (lookahead == 'l') ADVANCE(186);
      END_STATE();
    case 100:
      if (lookahead == 'l') ADVANCE(95);
      END_STATE();
    case 101:
      if (lookahead == 'l') ADVANCE(56);
      END_STATE();
    case 102:
      if (lookahead == 'l') ADVANCE(75);
      END_STATE();
    case 103:
      if (lookahead == 'm') ADVANCE(24);
      END_STATE();
    case 104:
      if (lookahead == 'm') ADVANCE(52);
      END_STATE();
    case 105:
      if (lookahead == 'm') ADVANCE(65);
      END_STATE();
    case 106:
      if (lookahead == 'm') ADVANCE(59);
      END_STATE();
    case 107:
      if (lookahead == 'm') ADVANCE(60);
      END_STATE();
    case 108:
      if (lookahead == 'm') ADVANCE(105);
      if (lookahead == 'n') ADVANCE(176);
      END_STATE();
    case 109:
      if (lookahead == 'n') ADVANCE(45);
      END_STATE();
    case 110:
      if (lookahead == 'n') ADVANCE(42);
      END_STATE();
    case 111:
      if (lookahead == 'n') ADVANCE(229);
      END_STATE();
    case 112:
      if (lookahead == 'n') ADVANCE(246);
      END_STATE();
    case 113:
      if (lookahead == 'n') ADVANCE(19);
      END_STATE();
    case 114:
      if (lookahead == 'n') ADVANCE(78);
      END_STATE();
    case 115:
      if (lookahead == 'n') ADVANCE(10);
      END_STATE();
    case 116:
      if (lookahead == 'n') ADVANCE(47);
      END_STATE();
    case 117:
      if (lookahead == 'n') ADVANCE(153);
      END_STATE();
    case 118:
      if (lookahead == 'n') ADVANCE(165);
      END_STATE();
    case 119:
      if (lookahead == 'n') ADVANCE(182);
      END_STATE();
    case 120:
      if (lookahead == 'n') ADVANCE(58);
      END_STATE();
    case 121:
      if (lookahead == 'o') ADVANCE(132);
      END_STATE();
    case 122:
      if (lookahead == 'o') ADVANCE(142);
      END_STATE();
    case 123:
      if (lookahead == 'o') ADVANCE(112);
      END_STATE();
    case 124:
      if (lookahead == 'o') ADVANCE(113);
      END_STATE();
    case 125:
      if (lookahead == 'o') ADVANCE(139);
      END_STATE();
    case 126:
      if (lookahead == 'o') ADVANCE(161);
      END_STATE();
    case 127:
      if (lookahead == 'p') ADVANCE(131);
      END_STATE();
    case 128:
      if (lookahead == 'p') ADVANCE(126);
      END_STATE();
    case 129:
      if (lookahead == 'p') ADVANCE(12);
      END_STATE();
    case 130:
      if (lookahead == 'p') ADVANCE(168);
      END_STATE();
    case 131:
      if (lookahead == 'p') ADVANCE(94);
      END_STATE();
    case 132:
      if (lookahead == 'p') ADVANCE(55);
      END_STATE();
    case 133:
      if (lookahead == 'p') ADVANCE(68);
      END_STATE();
    case 134:
      if (lookahead == 'p') ADVANCE(172);
      END_STATE();
    case 135:
      if (lookahead == 'p') ADVANCE(179);
      END_STATE();
    case 136:
      if (lookahead == 'p') ADVANCE(181);
      END_STATE();
    case 137:
      if (lookahead == 'r') ADVANCE(92);
      END_STATE();
    case 138:
      if (lookahead == 'r') ADVANCE(256);
      END_STATE();
    case 139:
      if (lookahead == 'r') ADVANCE(223);
      END_STATE();
    case 140:
      if (lookahead == 'r') ADVANCE(254);
      END_STATE();
    case 141:
      if (lookahead == 'r') ADVANCE(187);
      END_STATE();
    case 142:
      if (lookahead == 'r') ADVANCE(192);
      END_STATE();
    case 143:
      if (lookahead == 'r') ADVANCE(160);
      END_STATE();
    case 144:
      if (lookahead == 'r') ADVANCE(117);
      END_STATE();
    case 145:
      if (lookahead == 'r') ADVANCE(115);
      END_STATE();
    case 146:
      if (lookahead == 'r') ADVANCE(183);
      END_STATE();
    case 147:
      if (lookahead == 'r') ADVANCE(67);
      END_STATE();
    case 148:
      if (lookahead == 'r') ADVANCE(69);
      END_STATE();
    case 149:
      if (lookahead == 'r') ADVANCE(72);
      END_STATE();
    case 150:
      if (lookahead == 'r') ADVANCE(73);
      END_STATE();
    case 151:
      if (lookahead == 'r') ADVANCE(93);
      END_STATE();
    case 152:
      if (lookahead == 's') ADVANCE(237);
      END_STATE();
    case 153:
      if (lookahead == 's') ADVANCE(208);
      END_STATE();
    case 154:
      if (lookahead == 's') ADVANCE(250);
      END_STATE();
    case 155:
      if (lookahead == 's') ADVANCE(241);
      END_STATE();
    case 156:
      if (lookahead == 's') ADVANCE(239);
      END_STATE();
    case 157:
      if (lookahead == 's') ADVANCE(243);
      END_STATE();
    case 158:
      if (lookahead == 's') ADVANCE(39);
      END_STATE();
    case 159:
      if (lookahead == 's') ADVANCE(164);
      END_STATE();
    case 160:
      if (lookahead == 's') ADVANCE(86);
      END_STATE();
    case 161:
      if (lookahead == 's') ADVANCE(90);
      END_STATE();
    case 162:
      if (lookahead == 's') ADVANCE(54);
      END_STATE();
    case 163:
      if (lookahead == 's') ADVANCE(166);
      END_STATE();
    case 164:
      if (lookahead == 't') ADVANCE(11);
      END_STATE();
    case 165:
      if (lookahead == 't') ADVANCE(260);
      END_STATE();
    case 166:
      if (lookahead == 't') ADVANCE(235);
      END_STATE();
    case 167:
      if (lookahead == 't') ADVANCE(27);
      END_STATE();
    case 168:
      if (lookahead == 't') ADVANCE(185);
      END_STATE();
    case 169:
      if (lookahead == 't') ADVANCE(122);
      END_STATE();
    case 170:
      if (lookahead == 't') ADVANCE(66);
      END_STATE();
    case 171:
      if (lookahead == 't') ADVANCE(40);
      END_STATE();
    case 172:
      if (lookahead == 't') ADVANCE(188);
      END_STATE();
    case 173:
      if (lookahead == 't') ADVANCE(170);
      END_STATE();
    case 174:
      if (lookahead == 't') ADVANCE(125);
      END_STATE();
    case 175:
      if (lookahead == 't') ADVANCE(91);
      END_STATE();
    case 176:
      if (lookahead == 't') ADVANCE(76);
      END_STATE();
    case 177:
      if (lookahead == 't') ADVANCE(77);
      END_STATE();
    case 178:
      if (lookahead == 't') ADVANCE(41);
      END_STATE();
    case 179:
      if (lookahead == 't') ADVANCE(189);
      END_STATE();
    case 180:
      if (lookahead == 't') ADVANCE(177);
      END_STATE();
    case 181:
      if (lookahead == 't') ADVANCE(190);
      END_STATE();
    case 182:
      if (lookahead == 't') ADVANCE(16);
      END_STATE();
    case 183:
      if (lookahead == 't') ADVANCE(13);
      END_STATE();
    case 184:
      if (lookahead == 'u') ADVANCE(85);
      END_STATE();
    case 185:
      if (lookahead == 'u') ADVANCE(147);
      END_STATE();
    case 186:
      if (lookahead == 'u') ADVANCE(49);
      END_STATE();
    case 187:
      if (lookahead == 'u') ADVANCE(53);
      END_STATE();
    case 188:
      if (lookahead == 'u') ADVANCE(148);
      END_STATE();
    case 189:
      if (lookahead == 'u') ADVANCE(149);
      END_STATE();
    case 190:
      if (lookahead == 'u') ADVANCE(150);
      END_STATE();
    case 191:
      if (lookahead == 'y') ADVANCE(9);
      END_STATE();
    case 192:
      if (lookahead == 'y') ADVANCE(203);
      END_STATE();
    case 193:
      if (lookahead == 'y') ADVANCE(133);
      END_STATE();
    case 194:
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(449);
      END_STATE();
    case 195:
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(206);
      END_STATE();
    case 196:
      if (lookahead != 0 &&
          lookahead != '#') ADVANCE(214);
      END_STATE();
    case 197:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 198:
      ACCEPT_TOKEN(anon_sym_LBRACE);
      END_STATE();
    case 199:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 200:
      ACCEPT_TOKEN(anon_sym_RBRACE);
      END_STATE();
    case 201:
      ACCEPT_TOKEN(sym__whitespace);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(201);
      END_STATE();
    case 202:
      ACCEPT_TOKEN(anon_sym_DQUOTE);
      END_STATE();
    case 203:
      ACCEPT_TOKEN(anon_sym_repository);
      END_STATE();
    case 204:
      ACCEPT_TOKEN(anon_sym_repository);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 205:
      ACCEPT_TOKEN(anon_sym_COLON);
      END_STATE();
    case 206:
      ACCEPT_TOKEN(aux_sym_repo_token1);
      END_STATE();
    case 207:
      ACCEPT_TOKEN(aux_sym_repo_token2);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"' &&
          lookahead != '\\') ADVANCE(207);
      END_STATE();
    case 208:
      ACCEPT_TOKEN(anon_sym_patterns);
      END_STATE();
    case 209:
      ACCEPT_TOKEN(anon_sym_patterns);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 210:
      ACCEPT_TOKEN(anon_sym_LBRACK);
      END_STATE();
    case 211:
      ACCEPT_TOKEN(anon_sym_RBRACK);
      END_STATE();
    case 212:
      ACCEPT_TOKEN(anon_sym_include);
      END_STATE();
    case 213:
      ACCEPT_TOKEN(anon_sym_include);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 214:
      ACCEPT_TOKEN(aux_sym__includeScope_token1);
      END_STATE();
    case 215:
      ACCEPT_TOKEN(aux_sym__includeScope_token2);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"' &&
          lookahead != '#' &&
          lookahead != '\\') ADVANCE(215);
      END_STATE();
    case 216:
      ACCEPT_TOKEN(anon_sym_POUND);
      END_STATE();
    case 217:
      ACCEPT_TOKEN(anon_sym_scopeName);
      END_STATE();
    case 218:
      ACCEPT_TOKEN(anon_sym_scopeName);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 219:
      ACCEPT_TOKEN(anon_sym_name);
      END_STATE();
    case 220:
      ACCEPT_TOKEN(anon_sym_name);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 221:
      ACCEPT_TOKEN(anon_sym_contentName);
      END_STATE();
    case 222:
      ACCEPT_TOKEN(anon_sym_contentName);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 223:
      ACCEPT_TOKEN(anon_sym_injectionSelector);
      END_STATE();
    case 224:
      ACCEPT_TOKEN(anon_sym_injectionSelector);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 225:
      ACCEPT_TOKEN(anon_sym_injections);
      END_STATE();
    case 226:
      ACCEPT_TOKEN(anon_sym_injections);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 227:
      ACCEPT_TOKEN(anon_sym_match);
      END_STATE();
    case 228:
      ACCEPT_TOKEN(anon_sym_match);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 229:
      ACCEPT_TOKEN(anon_sym_begin);
      if (lookahead == 'C') ADVANCE(36);
      END_STATE();
    case 230:
      ACCEPT_TOKEN(anon_sym_begin);
      if (lookahead == 'C') ADVANCE(294);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 231:
      ACCEPT_TOKEN(anon_sym_end);
      if (lookahead == 'C') ADVANCE(35);
      END_STATE();
    case 232:
      ACCEPT_TOKEN(anon_sym_end);
      if (lookahead == 'C') ADVANCE(293);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 233:
      ACCEPT_TOKEN(anon_sym_while);
      if (lookahead == 'C') ADVANCE(37);
      END_STATE();
    case 234:
      ACCEPT_TOKEN(anon_sym_while);
      if (lookahead == 'C') ADVANCE(295);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 235:
      ACCEPT_TOKEN(anon_sym_applyEndPatternLast);
      END_STATE();
    case 236:
      ACCEPT_TOKEN(anon_sym_applyEndPatternLast);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 237:
      ACCEPT_TOKEN(anon_sym_captures);
      END_STATE();
    case 238:
      ACCEPT_TOKEN(anon_sym_captures);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 239:
      ACCEPT_TOKEN(anon_sym_beginCaptures);
      END_STATE();
    case 240:
      ACCEPT_TOKEN(anon_sym_beginCaptures);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 241:
      ACCEPT_TOKEN(anon_sym_endCaptures);
      END_STATE();
    case 242:
      ACCEPT_TOKEN(anon_sym_endCaptures);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 243:
      ACCEPT_TOKEN(anon_sym_whileCaptures);
      END_STATE();
    case 244:
      ACCEPT_TOKEN(anon_sym_whileCaptures);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 245:
      ACCEPT_TOKEN(aux_sym_capture_token1);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(245);
      END_STATE();
    case 246:
      ACCEPT_TOKEN(anon_sym_version);
      END_STATE();
    case 247:
      ACCEPT_TOKEN(anon_sym_version);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 248:
      ACCEPT_TOKEN(anon_sym_DOLLARschema);
      END_STATE();
    case 249:
      ACCEPT_TOKEN(anon_sym_DOLLARschema);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 250:
      ACCEPT_TOKEN(anon_sym_fileTypes);
      END_STATE();
    case 251:
      ACCEPT_TOKEN(anon_sym_fileTypes);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 252:
      ACCEPT_TOKEN(anon_sym_firstLineMatch);
      END_STATE();
    case 253:
      ACCEPT_TOKEN(anon_sym_firstLineMatch);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 254:
      ACCEPT_TOKEN(anon_sym_foldingStartMarker);
      END_STATE();
    case 255:
      ACCEPT_TOKEN(anon_sym_foldingStartMarker);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 256:
      ACCEPT_TOKEN(anon_sym_foldingStopMarker);
      END_STATE();
    case 257:
      ACCEPT_TOKEN(anon_sym_foldingStopMarker);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 258:
      ACCEPT_TOKEN(anon_sym_uuid);
      END_STATE();
    case 259:
      ACCEPT_TOKEN(anon_sym_uuid);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 260:
      ACCEPT_TOKEN(anon_sym_comment);
      END_STATE();
    case 261:
      ACCEPT_TOKEN(anon_sym_comment);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 262:
      ACCEPT_TOKEN(anon_sym_SLASH_SLASH);
      END_STATE();
    case 263:
      ACCEPT_TOKEN(anon_sym_SLASH_SLASH);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 264:
      ACCEPT_TOKEN(anon_sym_true);
      END_STATE();
    case 265:
      ACCEPT_TOKEN(anon_sym_false);
      END_STATE();
    case 266:
      ACCEPT_TOKEN(sym_null);
      END_STATE();
    case 267:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '/') ADVANCE(263);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 268:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'E') ADVANCE(373);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 269:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'L') ADVANCE(287);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 270:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'L') ADVANCE(347);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 271:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'M') ADVANCE(286);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 272:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'M') ADVANCE(288);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 273:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'M') ADVANCE(289);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 274:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'N') ADVANCE(290);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 275:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'N') ADVANCE(291);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 276:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'P') ADVANCE(292);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 277:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'S') ADVANCE(424);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 278:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'S') ADVANCE(330);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(226);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 279:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'T') ADVANCE(448);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 280:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(425);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 281:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(358);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 282:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(249);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 283:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(429);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 284:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(389);
      if (lookahead == 'o') ADVANCE(363);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 285:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(406);
      if (lookahead == 'o') ADVANCE(388);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 286:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(395);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 287:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(418);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 288:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(430);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 289:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(408);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 290:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(361);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 291:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(362);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 292:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(433);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 293:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(392);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 294:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(393);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 295:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'a') ADVANCE(394);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 296:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'c') ADVANCE(337);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 297:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'c') ADVANCE(353);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 298:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'c') ADVANCE(339);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 299:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'c') ADVANCE(338);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 300:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'c') ADVANCE(381);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 301:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'c') ADVANCE(436);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 302:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'c') ADVANCE(431);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 303:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'd') ADVANCE(232);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 304:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'd') ADVANCE(276);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 305:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'd') ADVANCE(259);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 306:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'd') ADVANCE(311);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 307:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'd') ADVANCE(345);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 308:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(335);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 309:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 310:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(234);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 311:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(213);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 312:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(222);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 313:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(279);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 314:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(272);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 315:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(218);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 316:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(409);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 317:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(400);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 318:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(360);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 319:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(386);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 320:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(375);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 321:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(411);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 322:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(407);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 323:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(301);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 324:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(412);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 325:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(413);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 326:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(396);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 327:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(414);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 328:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(398);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 329:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(401);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 330:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(357);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 331:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(376);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 332:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(302);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 333:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'e') ADVANCE(275);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 334:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'g') ADVANCE(277);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 335:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'g') ADVANCE(341);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 336:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'h') ADVANCE(342);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 337:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'h') ADVANCE(228);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 338:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'h') ADVANCE(253);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 339:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'h') ADVANCE(318);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 340:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'i') ADVANCE(356);
      if (lookahead == 'o') ADVANCE(354);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 341:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'i') ADVANCE(367);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 342:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'i') ADVANCE(355);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 343:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'i') ADVANCE(305);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 344:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'i') ADVANCE(383);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 345:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'i') ADVANCE(372);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 346:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'i') ADVANCE(426);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 347:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'i') ADVANCE(377);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 348:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'i') ADVANCE(384);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 349:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'j') ADVANCE(323);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 350:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'k') ADVANCE(326);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 351:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'k') ADVANCE(328);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 352:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'l') ADVANCE(446);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 353:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'l') ADVANCE(441);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 354:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'l') ADVANCE(307);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 355:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'l') ADVANCE(310);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 356:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'l') ADVANCE(313);
      if (lookahead == 'r') ADVANCE(419);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 357:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'l') ADVANCE(332);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 358:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'm') ADVANCE(309);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 359:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'm') ADVANCE(320);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 360:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'm') ADVANCE(282);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 361:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'm') ADVANCE(312);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 362:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'm') ADVANCE(315);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 363:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'm') ADVANCE(359);
      if (lookahead == 'n') ADVANCE(435);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 364:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'm') ADVANCE(359);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 365:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(303);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 366:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(297);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 367:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(230);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 368:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(269);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 369:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(349);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 370:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(247);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 371:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(278);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 372:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(334);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 373:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(304);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 374:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(410);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 375:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(421);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 376:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(422);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 377:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'n') ADVANCE(314);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 378:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'o') ADVANCE(415);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 379:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'o') ADVANCE(364);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 380:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'o') ADVANCE(399);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 381:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'o') ADVANCE(390);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 382:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'o') ADVANCE(397);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 383:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'o') ADVANCE(370);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 384:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'o') ADVANCE(371);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 385:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'p') ADVANCE(352);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 386:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'p') ADVANCE(378);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 387:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'p') ADVANCE(385);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 388:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'p') ADVANCE(271);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 389:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'p') ADVANCE(420);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 390:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'p') ADVANCE(333);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 391:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'p') ADVANCE(327);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 392:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'p') ADVANCE(434);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 393:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'p') ADVANCE(437);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 394:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'p') ADVANCE(438);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 395:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(350);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 396:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(257);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 397:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(224);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 398:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(255);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 399:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(447);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 400:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(374);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 401:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(368);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 402:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(316);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 403:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(321);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 404:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(324);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 405:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(325);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 406:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(439);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 407:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(417);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 408:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'r') ADVANCE(351);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 409:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(238);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 410:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(209);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 411:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(242);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 412:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(240);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 413:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(244);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 414:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(251);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 415:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(346);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 416:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(298);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 417:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(344);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 418:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(423);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 419:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 's') ADVANCE(427);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 420:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(440);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 421:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(261);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 422:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(274);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 423:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(236);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 424:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(285);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 425:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(296);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 426:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(380);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 427:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(270);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 428:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(317);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 429:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(428);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 430:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(299);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 431:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(382);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 432:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(329);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 433:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(432);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 434:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(443);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 435:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(331);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 436:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(348);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 437:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(444);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 438:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(445);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 439:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 't') ADVANCE(273);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 440:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'u') ADVANCE(402);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 441:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'u') ADVANCE(306);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 442:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'u') ADVANCE(343);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 443:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'u') ADVANCE(403);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 444:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'u') ADVANCE(404);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 445:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'u') ADVANCE(405);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 446:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'y') ADVANCE(268);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 447:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'y') ADVANCE(204);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 448:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead == 'y') ADVANCE(391);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    case 449:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(194);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(449);
      END_STATE();
    default:
      return false;
  }
}

static const TSLexMode ts_lex_modes[STATE_COUNT] = {
  [0] = {.lex_state = 0},
  [1] = {.lex_state = 0},
  [2] = {.lex_state = 0},
  [3] = {.lex_state = 0},
  [4] = {.lex_state = 0},
  [5] = {.lex_state = 0},
  [6] = {.lex_state = 0},
  [7] = {.lex_state = 0},
  [8] = {.lex_state = 0},
  [9] = {.lex_state = 0},
  [10] = {.lex_state = 0},
  [11] = {.lex_state = 0},
  [12] = {.lex_state = 0},
  [13] = {.lex_state = 0},
  [14] = {.lex_state = 4},
  [15] = {.lex_state = 3},
  [16] = {.lex_state = 0},
  [17] = {.lex_state = 0},
  [18] = {.lex_state = 0},
  [19] = {.lex_state = 0},
  [20] = {.lex_state = 0},
  [21] = {.lex_state = 0},
  [22] = {.lex_state = 0},
  [23] = {.lex_state = 0},
  [24] = {.lex_state = 0},
  [25] = {.lex_state = 0},
  [26] = {.lex_state = 0},
  [27] = {.lex_state = 0},
  [28] = {.lex_state = 0},
  [29] = {.lex_state = 0},
  [30] = {.lex_state = 0},
  [31] = {.lex_state = 0},
  [32] = {.lex_state = 0},
  [33] = {.lex_state = 0},
  [34] = {.lex_state = 0},
  [35] = {.lex_state = 0},
  [36] = {.lex_state = 0},
  [37] = {.lex_state = 0},
  [38] = {.lex_state = 0},
  [39] = {.lex_state = 0},
  [40] = {.lex_state = 0},
  [41] = {.lex_state = 0},
  [42] = {.lex_state = 0},
  [43] = {.lex_state = 0},
  [44] = {.lex_state = 0},
  [45] = {.lex_state = 0},
  [46] = {.lex_state = 0},
  [47] = {.lex_state = 0},
  [48] = {.lex_state = 0},
  [49] = {.lex_state = 0},
  [50] = {.lex_state = 0},
  [51] = {.lex_state = 0},
  [52] = {.lex_state = 0},
  [53] = {.lex_state = 0},
  [54] = {.lex_state = 0},
  [55] = {.lex_state = 2},
  [56] = {.lex_state = 2},
  [57] = {.lex_state = 2},
  [58] = {.lex_state = 2},
  [59] = {.lex_state = 0},
  [60] = {.lex_state = 0},
  [61] = {.lex_state = 0},
  [62] = {.lex_state = 0},
  [63] = {.lex_state = 0},
  [64] = {.lex_state = 0},
  [65] = {.lex_state = 0},
  [66] = {.lex_state = 0},
  [67] = {.lex_state = 0},
  [68] = {.lex_state = 0},
  [69] = {.lex_state = 0},
  [70] = {.lex_state = 0},
  [71] = {.lex_state = 0},
  [72] = {.lex_state = 0},
  [73] = {.lex_state = 0},
  [74] = {.lex_state = 0},
  [75] = {.lex_state = 0},
  [76] = {.lex_state = 0},
  [77] = {.lex_state = 0},
  [78] = {.lex_state = 0},
  [79] = {.lex_state = 0},
  [80] = {.lex_state = 0},
  [81] = {.lex_state = 0},
  [82] = {.lex_state = 0},
  [83] = {.lex_state = 0},
  [84] = {.lex_state = 0},
  [85] = {.lex_state = 0},
  [86] = {.lex_state = 0},
  [87] = {.lex_state = 0},
  [88] = {.lex_state = 0},
  [89] = {.lex_state = 2},
  [90] = {.lex_state = 0},
  [91] = {.lex_state = 0},
  [92] = {.lex_state = 0},
  [93] = {.lex_state = 0},
  [94] = {.lex_state = 0},
  [95] = {.lex_state = 0},
  [96] = {.lex_state = 0},
  [97] = {.lex_state = 0},
  [98] = {.lex_state = 0},
  [99] = {.lex_state = 0},
  [100] = {.lex_state = 0},
  [101] = {.lex_state = 0},
  [102] = {.lex_state = 0},
  [103] = {.lex_state = 0},
  [104] = {.lex_state = 0},
  [105] = {.lex_state = 0},
  [106] = {.lex_state = 0},
  [107] = {.lex_state = 0},
  [108] = {.lex_state = 0},
  [109] = {.lex_state = 0},
  [110] = {.lex_state = 0},
  [111] = {.lex_state = 0},
  [112] = {.lex_state = 0},
  [113] = {.lex_state = 0},
  [114] = {.lex_state = 0},
  [115] = {.lex_state = 0},
  [116] = {.lex_state = 0},
  [117] = {.lex_state = 0},
  [118] = {.lex_state = 0},
  [119] = {.lex_state = 0},
  [120] = {.lex_state = 0},
  [121] = {.lex_state = 0},
  [122] = {.lex_state = 0},
  [123] = {.lex_state = 0},
  [124] = {.lex_state = 0},
  [125] = {.lex_state = 0},
  [126] = {.lex_state = 0},
  [127] = {.lex_state = 0},
  [128] = {.lex_state = 0},
  [129] = {.lex_state = 0},
  [130] = {.lex_state = 0},
  [131] = {.lex_state = 5},
  [132] = {.lex_state = 0},
  [133] = {.lex_state = 0},
  [134] = {.lex_state = 0},
  [135] = {.lex_state = 0},
  [136] = {.lex_state = 0},
  [137] = {.lex_state = 0},
  [138] = {.lex_state = 0},
  [139] = {.lex_state = 0},
  [140] = {.lex_state = 0},
  [141] = {.lex_state = 0},
  [142] = {.lex_state = 0},
  [143] = {.lex_state = 0},
  [144] = {.lex_state = 0},
  [145] = {.lex_state = 0},
  [146] = {.lex_state = 0},
  [147] = {.lex_state = 0},
  [148] = {.lex_state = 0},
  [149] = {.lex_state = 0},
  [150] = {.lex_state = 0},
  [151] = {.lex_state = 0},
  [152] = {.lex_state = 0},
  [153] = {.lex_state = 0},
  [154] = {.lex_state = 0},
  [155] = {.lex_state = 0},
  [156] = {.lex_state = 0},
  [157] = {.lex_state = 0},
  [158] = {.lex_state = 0},
  [159] = {.lex_state = 0},
  [160] = {.lex_state = 0},
  [161] = {.lex_state = 0},
  [162] = {.lex_state = 0},
  [163] = {.lex_state = 0},
  [164] = {.lex_state = 0},
  [165] = {.lex_state = 0},
  [166] = {.lex_state = 0},
  [167] = {.lex_state = 0},
  [168] = {.lex_state = 0},
  [169] = {.lex_state = 0},
  [170] = {.lex_state = 0},
  [171] = {.lex_state = 0},
  [172] = {.lex_state = 0},
  [173] = {.lex_state = 0},
  [174] = {.lex_state = 0},
  [175] = {.lex_state = 0},
  [176] = {.lex_state = 0},
  [177] = {.lex_state = 0},
  [178] = {.lex_state = 0},
  [179] = {.lex_state = 0},
  [180] = {.lex_state = 0},
  [181] = {.lex_state = 0},
  [182] = {.lex_state = 0},
  [183] = {.lex_state = 0},
  [184] = {.lex_state = 0},
  [185] = {.lex_state = 0},
  [186] = {.lex_state = 0},
  [187] = {.lex_state = 0},
  [188] = {.lex_state = 0},
  [189] = {.lex_state = 0},
  [190] = {.lex_state = 0},
  [191] = {.lex_state = 0},
  [192] = {.lex_state = 0},
  [193] = {.lex_state = 0},
  [194] = {.lex_state = 0},
  [195] = {.lex_state = 0},
  [196] = {.lex_state = 0},
  [197] = {.lex_state = 0},
  [198] = {.lex_state = 0},
  [199] = {.lex_state = 0},
  [200] = {.lex_state = 0},
  [201] = {.lex_state = 0},
  [202] = {.lex_state = 0},
  [203] = {.lex_state = 0},
  [204] = {.lex_state = 0},
  [205] = {.lex_state = 0},
  [206] = {.lex_state = 0},
  [207] = {.lex_state = 0},
  [208] = {.lex_state = 0},
  [209] = {.lex_state = 0},
  [210] = {.lex_state = 0},
  [211] = {.lex_state = 0},
  [212] = {.lex_state = 0},
  [213] = {.lex_state = 0},
  [214] = {.lex_state = 0},
  [215] = {.lex_state = 0},
  [216] = {.lex_state = 0},
  [217] = {.lex_state = 0},
  [218] = {.lex_state = 0},
  [219] = {.lex_state = 0},
  [220] = {.lex_state = 0},
  [221] = {.lex_state = 0},
  [222] = {.lex_state = 0},
  [223] = {.lex_state = 0},
  [224] = {.lex_state = 0},
  [225] = {.lex_state = 0},
  [226] = {.lex_state = 0},
  [227] = {.lex_state = 0},
  [228] = {.lex_state = 0},
  [229] = {.lex_state = 0},
  [230] = {.lex_state = 0},
  [231] = {.lex_state = 0},
  [232] = {.lex_state = 0},
  [233] = {.lex_state = 0},
  [234] = {.lex_state = 0},
  [235] = {.lex_state = 0},
  [236] = {.lex_state = 0},
  [237] = {.lex_state = 0},
  [238] = {.lex_state = 0},
  [239] = {.lex_state = 0},
  [240] = {.lex_state = 0},
  [241] = {.lex_state = 0},
  [242] = {.lex_state = 0},
  [243] = {.lex_state = 0},
  [244] = {.lex_state = 0},
  [245] = {.lex_state = 0},
  [246] = {.lex_state = 0},
  [247] = {.lex_state = 0},
  [248] = {.lex_state = 0},
  [249] = {.lex_state = 0},
  [250] = {.lex_state = 0},
  [251] = {.lex_state = 0},
  [252] = {.lex_state = 0},
  [253] = {.lex_state = 0},
  [254] = {.lex_state = 7},
  [255] = {.lex_state = 0},
  [256] = {.lex_state = 0},
  [257] = {.lex_state = 0},
  [258] = {.lex_state = 0},
  [259] = {.lex_state = 0},
  [260] = {.lex_state = 0},
  [261] = {.lex_state = 0},
  [262] = {.lex_state = 0},
  [263] = {.lex_state = 0},
  [264] = {.lex_state = 0},
  [265] = {.lex_state = 0},
  [266] = {.lex_state = 0},
  [267] = {.lex_state = 0},
  [268] = {.lex_state = 0},
  [269] = {.lex_state = 0},
  [270] = {.lex_state = 0},
  [271] = {.lex_state = 0},
  [272] = {.lex_state = 7},
  [273] = {.lex_state = 0},
  [274] = {.lex_state = 0},
  [275] = {.lex_state = 0},
  [276] = {.lex_state = 0},
  [277] = {.lex_state = 7},
  [278] = {.lex_state = 0},
  [279] = {.lex_state = 0},
  [280] = {.lex_state = 0},
  [281] = {.lex_state = 0},
  [282] = {.lex_state = 0},
  [283] = {.lex_state = 0},
  [284] = {.lex_state = 0},
  [285] = {.lex_state = 0},
  [286] = {.lex_state = 0},
  [287] = {.lex_state = 0},
  [288] = {.lex_state = 0},
  [289] = {.lex_state = 0},
  [290] = {.lex_state = 7},
  [291] = {.lex_state = 0},
  [292] = {.lex_state = 0},
  [293] = {.lex_state = 0},
  [294] = {.lex_state = 0},
  [295] = {.lex_state = 0},
  [296] = {.lex_state = 0},
  [297] = {.lex_state = 0},
  [298] = {.lex_state = 0},
  [299] = {.lex_state = 0},
  [300] = {.lex_state = 0},
  [301] = {.lex_state = 0},
  [302] = {.lex_state = 0},
  [303] = {.lex_state = 0},
  [304] = {.lex_state = 7},
  [305] = {.lex_state = 0},
  [306] = {.lex_state = 0},
  [307] = {.lex_state = 7},
  [308] = {.lex_state = 0},
  [309] = {.lex_state = 0},
  [310] = {.lex_state = 0},
  [311] = {.lex_state = 0},
  [312] = {.lex_state = 0},
  [313] = {.lex_state = 0},
  [314] = {.lex_state = 7},
  [315] = {.lex_state = 0},
  [316] = {.lex_state = 0},
  [317] = {.lex_state = 0},
  [318] = {.lex_state = 0},
  [319] = {.lex_state = 0},
  [320] = {.lex_state = 0},
  [321] = {.lex_state = 7},
  [322] = {.lex_state = 0},
  [323] = {.lex_state = 0},
  [324] = {.lex_state = 0},
  [325] = {.lex_state = 0},
  [326] = {.lex_state = 0},
  [327] = {.lex_state = 0},
  [328] = {.lex_state = 0},
  [329] = {.lex_state = 0},
  [330] = {.lex_state = 0},
  [331] = {.lex_state = 0},
  [332] = {.lex_state = 0},
  [333] = {.lex_state = 0},
  [334] = {.lex_state = 0},
  [335] = {.lex_state = 0},
  [336] = {.lex_state = 0},
  [337] = {.lex_state = 0},
  [338] = {.lex_state = 0},
  [339] = {.lex_state = 0},
  [340] = {.lex_state = 0},
  [341] = {.lex_state = 0},
  [342] = {.lex_state = 0},
  [343] = {.lex_state = 0},
  [344] = {.lex_state = 0},
  [345] = {.lex_state = 0},
  [346] = {.lex_state = 0},
  [347] = {.lex_state = 0},
  [348] = {.lex_state = 0},
  [349] = {.lex_state = 0},
  [350] = {.lex_state = 0},
  [351] = {.lex_state = 0},
  [352] = {.lex_state = 0},
  [353] = {.lex_state = 0},
  [354] = {.lex_state = 0},
  [355] = {.lex_state = 0},
  [356] = {.lex_state = 0},
  [357] = {.lex_state = 0},
  [358] = {.lex_state = 0},
  [359] = {.lex_state = 0},
  [360] = {.lex_state = 0},
  [361] = {.lex_state = 0},
  [362] = {.lex_state = 0},
  [363] = {.lex_state = 0},
  [364] = {.lex_state = 0},
  [365] = {.lex_state = 0},
  [366] = {.lex_state = 0},
  [367] = {.lex_state = 0},
  [368] = {.lex_state = 0},
  [369] = {.lex_state = 0},
  [370] = {.lex_state = 0},
  [371] = {.lex_state = 0},
  [372] = {.lex_state = 0},
  [373] = {.lex_state = 0},
  [374] = {.lex_state = 0},
  [375] = {.lex_state = 0},
  [376] = {.lex_state = 0},
  [377] = {.lex_state = 0},
  [378] = {.lex_state = 0},
  [379] = {.lex_state = 0},
  [380] = {.lex_state = 0},
  [381] = {.lex_state = 0},
  [382] = {.lex_state = 0},
  [383] = {.lex_state = 0},
  [384] = {.lex_state = 0},
  [385] = {.lex_state = 0},
  [386] = {.lex_state = 0},
  [387] = {.lex_state = 0},
  [388] = {.lex_state = 0},
  [389] = {.lex_state = 0},
  [390] = {.lex_state = 0},
  [391] = {.lex_state = 0},
  [392] = {.lex_state = 0},
  [393] = {.lex_state = 0},
  [394] = {.lex_state = 0},
  [395] = {.lex_state = 0},
  [396] = {.lex_state = 0},
  [397] = {.lex_state = 0},
  [398] = {.lex_state = 0},
  [399] = {.lex_state = 0},
  [400] = {.lex_state = 0},
  [401] = {.lex_state = 0},
  [402] = {.lex_state = 0},
  [403] = {.lex_state = 0},
  [404] = {.lex_state = 0},
  [405] = {.lex_state = 0},
  [406] = {.lex_state = 0},
  [407] = {.lex_state = 0},
  [408] = {.lex_state = 0},
  [409] = {.lex_state = 0},
  [410] = {.lex_state = 0},
  [411] = {.lex_state = 0},
  [412] = {.lex_state = 0},
  [413] = {.lex_state = 0},
  [414] = {.lex_state = 0},
  [415] = {.lex_state = 0},
  [416] = {.lex_state = 0},
  [417] = {.lex_state = 0},
  [418] = {.lex_state = 0},
  [419] = {.lex_state = 0},
  [420] = {.lex_state = 0},
  [421] = {.lex_state = 0},
  [422] = {.lex_state = 0},
  [423] = {.lex_state = 0},
  [424] = {.lex_state = 0},
  [425] = {.lex_state = 0},
  [426] = {.lex_state = 0},
  [427] = {.lex_state = 0},
  [428] = {.lex_state = 0},
  [429] = {.lex_state = 0},
  [430] = {.lex_state = 0},
  [431] = {.lex_state = 0},
  [432] = {.lex_state = 0},
  [433] = {.lex_state = 0},
  [434] = {.lex_state = 0},
  [435] = {.lex_state = 0},
  [436] = {.lex_state = 0},
  [437] = {.lex_state = 0},
  [438] = {.lex_state = 0},
  [439] = {.lex_state = 0},
  [440] = {.lex_state = 0},
  [441] = {.lex_state = 0},
  [442] = {.lex_state = 0},
  [443] = {.lex_state = 0},
  [444] = {.lex_state = 0},
  [445] = {.lex_state = 0},
  [446] = {.lex_state = 0},
  [447] = {.lex_state = 0},
  [448] = {.lex_state = 0},
  [449] = {.lex_state = 0},
  [450] = {.lex_state = 0},
  [451] = {.lex_state = 0},
  [452] = {.lex_state = 0},
  [453] = {.lex_state = 0},
  [454] = {.lex_state = 0},
  [455] = {.lex_state = 0},
  [456] = {.lex_state = 0},
  [457] = {.lex_state = 0},
  [458] = {.lex_state = 0},
  [459] = {.lex_state = 0},
  [460] = {.lex_state = 0},
  [461] = {.lex_state = 0},
  [462] = {.lex_state = 0},
  [463] = {.lex_state = 0},
  [464] = {.lex_state = 0},
  [465] = {.lex_state = 0},
  [466] = {.lex_state = 0},
  [467] = {.lex_state = 0},
  [468] = {.lex_state = 0},
  [469] = {.lex_state = 0},
  [470] = {.lex_state = 0},
  [471] = {.lex_state = 0},
  [472] = {.lex_state = 0},
  [473] = {.lex_state = 0},
  [474] = {.lex_state = 0},
  [475] = {.lex_state = 0},
  [476] = {.lex_state = 0},
  [477] = {.lex_state = 0},
  [478] = {.lex_state = 0},
  [479] = {.lex_state = 0},
  [480] = {.lex_state = 0},
  [481] = {.lex_state = 0},
  [482] = {.lex_state = 0},
  [483] = {.lex_state = 0},
  [484] = {.lex_state = 0},
  [485] = {.lex_state = 0},
  [486] = {.lex_state = 0},
  [487] = {.lex_state = 0},
  [488] = {.lex_state = 0},
  [489] = {.lex_state = 0},
  [490] = {.lex_state = 0},
  [491] = {.lex_state = 0},
  [492] = {.lex_state = 0},
  [493] = {.lex_state = 0},
  [494] = {.lex_state = 0},
  [495] = {.lex_state = 0},
  [496] = {.lex_state = 0},
  [497] = {.lex_state = 0},
  [498] = {.lex_state = 0},
  [499] = {.lex_state = 0},
  [500] = {.lex_state = 0},
  [501] = {.lex_state = 0},
  [502] = {.lex_state = 0},
  [503] = {.lex_state = 0},
  [504] = {.lex_state = 0},
  [505] = {.lex_state = 0},
  [506] = {.lex_state = 0},
  [507] = {.lex_state = 0},
  [508] = {.lex_state = 0},
  [509] = {.lex_state = 0},
  [510] = {.lex_state = 0},
  [511] = {.lex_state = 0},
  [512] = {.lex_state = 0},
  [513] = {.lex_state = 0},
  [514] = {.lex_state = 0},
  [515] = {.lex_state = 0},
  [516] = {.lex_state = 0},
  [517] = {.lex_state = 0},
  [518] = {.lex_state = 0},
  [519] = {.lex_state = 0},
  [520] = {.lex_state = 0},
  [521] = {.lex_state = 0},
  [522] = {.lex_state = 0},
  [523] = {.lex_state = 0},
  [524] = {.lex_state = 0},
  [525] = {.lex_state = 0},
  [526] = {.lex_state = 0},
  [527] = {.lex_state = 0},
  [528] = {.lex_state = 0},
  [529] = {.lex_state = 0},
  [530] = {.lex_state = 0},
  [531] = {.lex_state = 0},
  [532] = {.lex_state = 0},
  [533] = {.lex_state = 0},
  [534] = {.lex_state = 0},
  [535] = {.lex_state = 0},
  [536] = {.lex_state = 0},
  [537] = {.lex_state = 0},
  [538] = {.lex_state = 0},
  [539] = {.lex_state = 0},
  [540] = {.lex_state = 0},
  [541] = {.lex_state = 0},
  [542] = {.lex_state = 0},
  [543] = {.lex_state = 0},
  [544] = {.lex_state = 0},
  [545] = {.lex_state = 0},
  [546] = {.lex_state = 0},
  [547] = {.lex_state = 0},
  [548] = {.lex_state = 0},
  [549] = {.lex_state = 0},
  [550] = {.lex_state = 0},
  [551] = {.lex_state = 0},
  [552] = {.lex_state = 0},
  [553] = {.lex_state = 0},
  [554] = {.lex_state = 0},
  [555] = {.lex_state = 0},
  [556] = {.lex_state = 0},
  [557] = {.lex_state = 0},
  [558] = {.lex_state = 0},
  [559] = {.lex_state = 0},
  [560] = {.lex_state = 0},
  [561] = {.lex_state = 0},
  [562] = {.lex_state = 0},
  [563] = {.lex_state = 0},
  [564] = {.lex_state = 0},
  [565] = {.lex_state = 0},
  [566] = {.lex_state = 0},
  [567] = {.lex_state = 0},
  [568] = {.lex_state = 0},
  [569] = {.lex_state = 0},
  [570] = {.lex_state = 7},
  [571] = {.lex_state = 0},
  [572] = {.lex_state = 0},
  [573] = {.lex_state = 0},
  [574] = {.lex_state = 0},
  [575] = {.lex_state = 0},
  [576] = {.lex_state = 0},
  [577] = {.lex_state = 0},
  [578] = {.lex_state = 0},
  [579] = {.lex_state = 0},
  [580] = {.lex_state = 0},
  [581] = {.lex_state = 0},
  [582] = {.lex_state = 0},
  [583] = {.lex_state = 0},
  [584] = {.lex_state = 0},
  [585] = {.lex_state = 0},
  [586] = {.lex_state = 0},
  [587] = {.lex_state = 0},
  [588] = {.lex_state = 0},
  [589] = {.lex_state = 0},
  [590] = {.lex_state = 0},
  [591] = {.lex_state = 0},
  [592] = {.lex_state = 0},
  [593] = {.lex_state = 0},
  [594] = {.lex_state = 0},
  [595] = {.lex_state = 0},
  [596] = {.lex_state = 0},
  [597] = {.lex_state = 0},
  [598] = {.lex_state = 0},
  [599] = {.lex_state = 0},
  [600] = {.lex_state = 0},
  [601] = {.lex_state = 0},
  [602] = {.lex_state = 0},
  [603] = {.lex_state = 0},
  [604] = {.lex_state = 0},
  [605] = {.lex_state = 0},
  [606] = {.lex_state = 0},
  [607] = {.lex_state = 0},
  [608] = {.lex_state = 0},
  [609] = {.lex_state = 0},
  [610] = {.lex_state = 0},
  [611] = {.lex_state = 0},
  [612] = {.lex_state = 0},
  [613] = {.lex_state = 0},
  [614] = {.lex_state = 0},
  [615] = {.lex_state = 0},
  [616] = {.lex_state = 0},
  [617] = {.lex_state = 0},
  [618] = {.lex_state = 0},
  [619] = {.lex_state = 0},
  [620] = {.lex_state = 0},
  [621] = {.lex_state = 0},
  [622] = {.lex_state = 0},
  [623] = {.lex_state = 0},
  [624] = {.lex_state = 0},
  [625] = {.lex_state = 0},
  [626] = {.lex_state = 0},
  [627] = {.lex_state = 0},
  [628] = {.lex_state = 0},
  [629] = {.lex_state = 0},
  [630] = {.lex_state = 0},
  [631] = {.lex_state = 0},
  [632] = {.lex_state = 0},
  [633] = {.lex_state = 0},
  [634] = {.lex_state = 0},
  [635] = {.lex_state = 0},
  [636] = {.lex_state = 0},
  [637] = {.lex_state = 0},
  [638] = {.lex_state = 0},
  [639] = {.lex_state = 0},
  [640] = {.lex_state = 0},
  [641] = {.lex_state = 0},
  [642] = {.lex_state = 0},
  [643] = {.lex_state = 0},
  [644] = {.lex_state = 0},
  [645] = {.lex_state = 0},
  [646] = {.lex_state = 0},
  [647] = {.lex_state = 0},
  [648] = {.lex_state = 0},
  [649] = {.lex_state = 0},
  [650] = {.lex_state = 0},
  [651] = {.lex_state = 0},
  [652] = {.lex_state = 0},
  [653] = {.lex_state = 0},
  [654] = {.lex_state = 0},
  [655] = {.lex_state = 0},
  [656] = {.lex_state = 0},
  [657] = {.lex_state = 0},
  [658] = {.lex_state = 0},
  [659] = {.lex_state = 0},
  [660] = {.lex_state = 0},
  [661] = {.lex_state = 0},
  [662] = {.lex_state = 0},
  [663] = {.lex_state = 0},
  [664] = {.lex_state = 0},
  [665] = {.lex_state = 0},
  [666] = {.lex_state = 0},
  [667] = {.lex_state = 0},
  [668] = {.lex_state = 0},
  [669] = {.lex_state = 0},
  [670] = {.lex_state = 0},
  [671] = {.lex_state = 0},
  [672] = {.lex_state = 0},
  [673] = {.lex_state = 0},
  [674] = {.lex_state = 0},
  [675] = {.lex_state = 0},
  [676] = {.lex_state = 0},
  [677] = {.lex_state = 0},
  [678] = {.lex_state = 0},
  [679] = {.lex_state = 0},
  [680] = {.lex_state = 0},
  [681] = {.lex_state = 0},
  [682] = {.lex_state = 0},
  [683] = {.lex_state = 0},
  [684] = {.lex_state = 0},
  [685] = {.lex_state = 0},
  [686] = {.lex_state = 0},
  [687] = {.lex_state = 0},
  [688] = {.lex_state = 0},
  [689] = {.lex_state = 0},
  [690] = {.lex_state = 0},
  [691] = {.lex_state = 0},
  [692] = {.lex_state = 0},
  [693] = {.lex_state = 0},
  [694] = {.lex_state = 0},
  [695] = {.lex_state = 0},
  [696] = {.lex_state = 0},
  [697] = {.lex_state = 0},
  [698] = {.lex_state = 0},
  [699] = {.lex_state = 0},
  [700] = {.lex_state = 0},
  [701] = {.lex_state = 0},
  [702] = {.lex_state = 0},
  [703] = {.lex_state = 0},
  [704] = {.lex_state = 0},
  [705] = {.lex_state = 0},
  [706] = {.lex_state = 0},
  [707] = {.lex_state = 0},
  [708] = {.lex_state = 0},
  [709] = {.lex_state = 0},
  [710] = {.lex_state = 0},
  [711] = {.lex_state = 0},
  [712] = {.lex_state = 0},
  [713] = {.lex_state = 0},
  [714] = {.lex_state = 0},
  [715] = {.lex_state = 0},
  [716] = {.lex_state = 0},
  [717] = {.lex_state = 0},
  [718] = {.lex_state = 0},
  [719] = {.lex_state = 0},
  [720] = {.lex_state = 0},
  [721] = {.lex_state = 0},
  [722] = {.lex_state = 0},
  [723] = {.lex_state = 0},
  [724] = {.lex_state = 0},
  [725] = {.lex_state = 0},
  [726] = {.lex_state = 0},
  [727] = {.lex_state = 0},
  [728] = {.lex_state = 0},
  [729] = {.lex_state = 0},
  [730] = {.lex_state = 0},
  [731] = {.lex_state = 0},
  [732] = {.lex_state = 0},
  [733] = {.lex_state = 0},
  [734] = {.lex_state = 7},
  [735] = {.lex_state = 0},
  [736] = {.lex_state = 0},
  [737] = {.lex_state = 0},
  [738] = {.lex_state = 0},
  [739] = {.lex_state = 0},
  [740] = {.lex_state = 0},
  [741] = {.lex_state = 0},
  [742] = {.lex_state = 0},
  [743] = {.lex_state = 0},
  [744] = {.lex_state = 0},
  [745] = {.lex_state = 0},
  [746] = {.lex_state = 0},
  [747] = {.lex_state = 6},
  [748] = {.lex_state = 0},
  [749] = {.lex_state = 0},
  [750] = {.lex_state = 6},
  [751] = {.lex_state = 0},
  [752] = {.lex_state = 0},
  [753] = {.lex_state = 0},
  [754] = {.lex_state = 0},
  [755] = {.lex_state = 0},
  [756] = {.lex_state = 0},
  [757] = {.lex_state = 0},
  [758] = {.lex_state = 0},
  [759] = {.lex_state = 0},
  [760] = {.lex_state = 0},
  [761] = {.lex_state = 0},
  [762] = {.lex_state = 0},
  [763] = {.lex_state = 0},
  [764] = {.lex_state = 0},
  [765] = {.lex_state = 0},
  [766] = {.lex_state = 0},
  [767] = {.lex_state = 0},
  [768] = {.lex_state = 0},
  [769] = {.lex_state = 0},
  [770] = {.lex_state = 0},
  [771] = {.lex_state = 0},
  [772] = {.lex_state = 0},
  [773] = {.lex_state = 0},
  [774] = {.lex_state = 0},
  [775] = {.lex_state = 0},
  [776] = {.lex_state = 0},
  [777] = {.lex_state = 0},
  [778] = {.lex_state = 0},
  [779] = {.lex_state = 0},
  [780] = {.lex_state = 0},
  [781] = {.lex_state = 0},
  [782] = {.lex_state = 0},
  [783] = {.lex_state = 0},
  [784] = {.lex_state = 0},
  [785] = {.lex_state = 0},
  [786] = {.lex_state = 0},
};

static const uint16_t ts_parse_table[LARGE_STATE_COUNT][SYMBOL_COUNT] = {
  [0] = {
    [ts_builtin_sym_end] = ACTIONS(1),
    [anon_sym_LBRACE] = ACTIONS(1),
    [anon_sym_COMMA] = ACTIONS(1),
    [anon_sym_RBRACE] = ACTIONS(1),
    [sym__whitespace] = ACTIONS(1),
    [anon_sym_DQUOTE] = ACTIONS(1),
    [anon_sym_repository] = ACTIONS(1),
    [anon_sym_COLON] = ACTIONS(1),
    [aux_sym_repo_token1] = ACTIONS(1),
    [anon_sym_patterns] = ACTIONS(1),
    [anon_sym_LBRACK] = ACTIONS(1),
    [anon_sym_RBRACK] = ACTIONS(1),
    [anon_sym_include] = ACTIONS(1),
    [aux_sym__includeScope_token1] = ACTIONS(1),
    [anon_sym_POUND] = ACTIONS(1),
    [anon_sym_scopeName] = ACTIONS(1),
    [anon_sym_name] = ACTIONS(1),
    [anon_sym_contentName] = ACTIONS(1),
    [anon_sym_injectionSelector] = ACTIONS(1),
    [anon_sym_injections] = ACTIONS(1),
    [anon_sym_match] = ACTIONS(1),
    [anon_sym_begin] = ACTIONS(1),
    [anon_sym_end] = ACTIONS(1),
    [anon_sym_while] = ACTIONS(1),
    [anon_sym_applyEndPatternLast] = ACTIONS(1),
    [anon_sym_captures] = ACTIONS(1),
    [anon_sym_beginCaptures] = ACTIONS(1),
    [anon_sym_endCaptures] = ACTIONS(1),
    [anon_sym_whileCaptures] = ACTIONS(1),
    [aux_sym_capture_token1] = ACTIONS(1),
    [anon_sym_version] = ACTIONS(1),
    [anon_sym_DOLLARschema] = ACTIONS(1),
    [anon_sym_fileTypes] = ACTIONS(1),
    [anon_sym_firstLineMatch] = ACTIONS(1),
    [anon_sym_foldingStartMarker] = ACTIONS(1),
    [anon_sym_foldingStopMarker] = ACTIONS(1),
    [anon_sym_uuid] = ACTIONS(1),
    [anon_sym_comment] = ACTIONS(1),
    [anon_sym_SLASH_SLASH] = ACTIONS(1),
    [anon_sym_true] = ACTIONS(1),
    [anon_sym_false] = ACTIONS(1),
    [sym_null] = ACTIONS(1),
  },
  [1] = {
    [sym_json] = STATE(782),
    [aux_sym_json_repeat3] = STATE(701),
    [ts_builtin_sym_end] = ACTIONS(3),
    [anon_sym_LBRACE] = ACTIONS(5),
  },
};

static const uint16_t ts_small_parse_table[] = {
  [0] = 5,
    ACTIONS(7), 1,
      anon_sym_RBRACE,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    STATE(3), 1,
      aux_sym_json_repeat1,
    STATE(222), 18,
      sym_repository,
      sym_patterns,
      sym_include,
      sym_nameScope,
      sym_contentName,
      sym_match,
      sym_begin,
      sym_end,
      sym_while,
      sym_applyEndPatternLast,
      sym_captures,
      sym_beginCaptures,
      sym_endCaptures,
      sym_whileCaptures,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [33] = 5,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(13), 1,
      anon_sym_RBRACE,
    ACTIONS(15), 1,
      sym__whitespace,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(167), 18,
      sym_repository,
      sym_patterns,
      sym_include,
      sym_nameScope,
      sym_contentName,
      sym_match,
      sym_begin,
      sym_end,
      sym_while,
      sym_applyEndPatternLast,
      sym_captures,
      sym_beginCaptures,
      sym_endCaptures,
      sym_whileCaptures,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [66] = 5,
    ACTIONS(17), 1,
      anon_sym_RBRACE,
    ACTIONS(19), 1,
      sym__whitespace,
    ACTIONS(21), 1,
      anon_sym_DQUOTE,
    STATE(9), 1,
      aux_sym_json_repeat1,
    STATE(224), 17,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_schema,
      sym_fileTypes,
      sym_firstLineMatch,
      sym_foldingStartMarker,
      sym_foldingStopMarker,
      sym_uuid,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [98] = 4,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(15), 1,
      sym__whitespace,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(547), 18,
      sym_repository,
      sym_patterns,
      sym_include,
      sym_nameScope,
      sym_contentName,
      sym_match,
      sym_begin,
      sym_end,
      sym_while,
      sym_applyEndPatternLast,
      sym_captures,
      sym_beginCaptures,
      sym_endCaptures,
      sym_whileCaptures,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [128] = 4,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(23), 1,
      sym__whitespace,
    STATE(5), 1,
      aux_sym_json_repeat1,
    STATE(477), 18,
      sym_repository,
      sym_patterns,
      sym_include,
      sym_nameScope,
      sym_contentName,
      sym_match,
      sym_begin,
      sym_end,
      sym_while,
      sym_applyEndPatternLast,
      sym_captures,
      sym_beginCaptures,
      sym_endCaptures,
      sym_whileCaptures,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [158] = 4,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(15), 1,
      sym__whitespace,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(477), 18,
      sym_repository,
      sym_patterns,
      sym_include,
      sym_nameScope,
      sym_contentName,
      sym_match,
      sym_begin,
      sym_end,
      sym_while,
      sym_applyEndPatternLast,
      sym_captures,
      sym_beginCaptures,
      sym_endCaptures,
      sym_whileCaptures,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [188] = 4,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(25), 1,
      sym__whitespace,
    STATE(7), 1,
      aux_sym_json_repeat1,
    STATE(439), 18,
      sym_repository,
      sym_patterns,
      sym_include,
      sym_nameScope,
      sym_contentName,
      sym_match,
      sym_begin,
      sym_end,
      sym_while,
      sym_applyEndPatternLast,
      sym_captures,
      sym_beginCaptures,
      sym_endCaptures,
      sym_whileCaptures,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [218] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(21), 1,
      anon_sym_DQUOTE,
    ACTIONS(27), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(142), 17,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_schema,
      sym_fileTypes,
      sym_firstLineMatch,
      sym_foldingStartMarker,
      sym_foldingStopMarker,
      sym_uuid,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [250] = 4,
    ACTIONS(21), 1,
      anon_sym_DQUOTE,
    ACTIONS(29), 1,
      sym__whitespace,
    STATE(11), 1,
      aux_sym_json_repeat1,
    STATE(587), 17,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_schema,
      sym_fileTypes,
      sym_firstLineMatch,
      sym_foldingStartMarker,
      sym_foldingStopMarker,
      sym_uuid,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [279] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(21), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(516), 17,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_schema,
      sym_fileTypes,
      sym_firstLineMatch,
      sym_foldingStartMarker,
      sym_foldingStopMarker,
      sym_uuid,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [308] = 4,
    ACTIONS(21), 1,
      anon_sym_DQUOTE,
    ACTIONS(31), 1,
      sym__whitespace,
    STATE(13), 1,
      aux_sym_json_repeat1,
    STATE(661), 17,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_schema,
      sym_fileTypes,
      sym_firstLineMatch,
      sym_foldingStartMarker,
      sym_foldingStopMarker,
      sym_uuid,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [337] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(21), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(587), 17,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_schema,
      sym_fileTypes,
      sym_firstLineMatch,
      sym_foldingStartMarker,
      sym_foldingStopMarker,
      sym_uuid,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [366] = 18,
    ACTIONS(33), 1,
      anon_sym_DQUOTE,
    ACTIONS(35), 1,
      anon_sym_repository,
    ACTIONS(37), 1,
      anon_sym_patterns,
    ACTIONS(39), 1,
      anon_sym_include,
    ACTIONS(41), 1,
      anon_sym_name,
    ACTIONS(43), 1,
      anon_sym_contentName,
    ACTIONS(45), 1,
      anon_sym_match,
    ACTIONS(47), 1,
      anon_sym_begin,
    ACTIONS(49), 1,
      anon_sym_end,
    ACTIONS(51), 1,
      anon_sym_while,
    ACTIONS(53), 1,
      anon_sym_applyEndPatternLast,
    ACTIONS(55), 1,
      anon_sym_captures,
    ACTIONS(57), 1,
      anon_sym_beginCaptures,
    ACTIONS(59), 1,
      anon_sym_endCaptures,
    ACTIONS(61), 1,
      anon_sym_whileCaptures,
    ACTIONS(63), 1,
      anon_sym_comment,
    ACTIONS(65), 1,
      anon_sym_SLASH_SLASH,
    ACTIONS(67), 1,
      sym__string_content,
  [421] = 17,
    ACTIONS(33), 1,
      anon_sym_DQUOTE,
    ACTIONS(35), 1,
      anon_sym_repository,
    ACTIONS(37), 1,
      anon_sym_patterns,
    ACTIONS(63), 1,
      anon_sym_comment,
    ACTIONS(65), 1,
      anon_sym_SLASH_SLASH,
    ACTIONS(67), 1,
      sym__string_content,
    ACTIONS(69), 1,
      anon_sym_scopeName,
    ACTIONS(71), 1,
      anon_sym_name,
    ACTIONS(73), 1,
      anon_sym_injectionSelector,
    ACTIONS(75), 1,
      anon_sym_injections,
    ACTIONS(77), 1,
      anon_sym_version,
    ACTIONS(79), 1,
      anon_sym_DOLLARschema,
    ACTIONS(81), 1,
      anon_sym_fileTypes,
    ACTIONS(83), 1,
      anon_sym_firstLineMatch,
    ACTIONS(85), 1,
      anon_sym_foldingStartMarker,
    ACTIONS(87), 1,
      anon_sym_foldingStopMarker,
    ACTIONS(89), 1,
      anon_sym_uuid,
  [473] = 10,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(93), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(99), 1,
      anon_sym_RBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(105), 1,
      sym_null,
    STATE(18), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(172), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [509] = 10,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(107), 1,
      anon_sym_RBRACK,
    ACTIONS(109), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(177), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [545] = 10,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(111), 1,
      anon_sym_RBRACK,
    ACTIONS(113), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(221), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [581] = 10,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(115), 1,
      sym__whitespace,
    ACTIONS(117), 1,
      anon_sym_RBRACK,
    ACTIONS(119), 1,
      sym_null,
    STATE(17), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(112), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [617] = 9,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(121), 1,
      sym__whitespace,
    ACTIONS(123), 1,
      sym_null,
    STATE(22), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(714), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [650] = 9,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(125), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(491), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [683] = 9,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(127), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(629), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [716] = 9,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(127), 1,
      sym_null,
    ACTIONS(129), 1,
      sym__whitespace,
    STATE(21), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(629), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [749] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      sym__whitespace,
    ACTIONS(135), 1,
      anon_sym_LBRACK,
    ACTIONS(137), 1,
      sym_null,
    STATE(26), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(594), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [781] = 9,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(135), 1,
      anon_sym_LBRACK,
    ACTIONS(137), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(594), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [813] = 9,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(135), 1,
      anon_sym_LBRACK,
    ACTIONS(139), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(659), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [845] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(135), 1,
      anon_sym_LBRACK,
    ACTIONS(141), 1,
      sym__whitespace,
    ACTIONS(143), 1,
      sym_null,
    STATE(25), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(515), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [877] = 9,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(135), 1,
      anon_sym_LBRACK,
    ACTIONS(145), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(657), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [909] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(135), 1,
      anon_sym_LBRACK,
    ACTIONS(147), 1,
      sym__whitespace,
    ACTIONS(149), 1,
      sym_null,
    STATE(28), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(598), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [941] = 9,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(135), 1,
      anon_sym_LBRACK,
    ACTIONS(149), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(598), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [973] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(135), 1,
      anon_sym_LBRACK,
    ACTIONS(151), 1,
      sym__whitespace,
    ACTIONS(153), 1,
      sym_null,
    STATE(30), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(556), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1005] = 3,
    ACTIONS(157), 1,
      sym__whitespace,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(155), 11,
      anon_sym_LBRACE,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      anon_sym_DQUOTE,
      anon_sym_COLON,
      anon_sym_LBRACK,
      anon_sym_RBRACK,
      aux_sym_capture_token1,
      anon_sym_true,
      anon_sym_false,
      sym_null,
  [1025] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(135), 1,
      anon_sym_LBRACK,
    ACTIONS(160), 1,
      sym__whitespace,
    ACTIONS(162), 1,
      sym_null,
    STATE(34), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(653), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1057] = 9,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(135), 1,
      anon_sym_LBRACK,
    ACTIONS(153), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(556), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1089] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(164), 1,
      anon_sym_RBRACE,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(90), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1109] = 5,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(168), 1,
      anon_sym_RBRACE,
    ACTIONS(170), 1,
      sym__whitespace,
    STATE(40), 1,
      aux_sym_json_repeat1,
    STATE(67), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1129] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(172), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(110), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1149] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(174), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(92), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1169] = 5,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(176), 1,
      anon_sym_RBRACE,
    ACTIONS(178), 1,
      sym__whitespace,
    STATE(37), 1,
      aux_sym_json_repeat1,
    STATE(130), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1189] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(180), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(147), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1209] = 5,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(172), 1,
      anon_sym_RBRACE,
    ACTIONS(182), 1,
      sym__whitespace,
    STATE(38), 1,
      aux_sym_json_repeat1,
    STATE(110), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1229] = 5,
    ACTIONS(164), 1,
      anon_sym_RBRACE,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(184), 1,
      sym__whitespace,
    STATE(46), 1,
      aux_sym_json_repeat1,
    STATE(90), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1249] = 5,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(186), 1,
      anon_sym_RBRACE,
    ACTIONS(188), 1,
      sym__whitespace,
    STATE(35), 1,
      aux_sym_json_repeat1,
    STATE(107), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1269] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(190), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(69), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1289] = 5,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(174), 1,
      anon_sym_RBRACE,
    ACTIONS(192), 1,
      sym__whitespace,
    STATE(44), 1,
      aux_sym_json_repeat1,
    STATE(92), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1309] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(168), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(67), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1329] = 6,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(194), 1,
      sym__whitespace,
    ACTIONS(196), 1,
      sym_null,
    STATE(48), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(588), 2,
      sym_boolean,
      sym_integer,
  [1350] = 6,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(198), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(641), 2,
      sym_boolean,
      sym_integer,
  [1371] = 4,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(200), 1,
      sym__whitespace,
    STATE(52), 1,
      aux_sym_json_repeat1,
    STATE(612), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1388] = 6,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(196), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(588), 2,
      sym_boolean,
      sym_integer,
  [1409] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(708), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1426] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(668), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1443] = 6,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(202), 1,
      sym__whitespace,
    ACTIONS(204), 1,
      sym_null,
    STATE(50), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(532), 2,
      sym_boolean,
      sym_integer,
  [1464] = 4,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(206), 1,
      sym__whitespace,
    STATE(51), 1,
      aux_sym_json_repeat1,
    STATE(668), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1481] = 5,
    ACTIONS(210), 1,
      anon_sym_POUND,
    STATE(57), 1,
      aux_sym__includeScope,
    STATE(776), 1,
      sym__includeItem,
    STATE(777), 1,
      sym_value,
    ACTIONS(208), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1498] = 5,
    ACTIONS(210), 1,
      anon_sym_POUND,
    STATE(57), 1,
      aux_sym__includeScope,
    STATE(762), 1,
      sym_value,
    STATE(776), 1,
      sym__includeItem,
    ACTIONS(208), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1515] = 5,
    ACTIONS(210), 1,
      anon_sym_POUND,
    ACTIONS(212), 1,
      anon_sym_DQUOTE,
    STATE(89), 1,
      aux_sym__includeScope,
    STATE(767), 1,
      sym__includeItem,
    ACTIONS(214), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1532] = 5,
    ACTIONS(210), 1,
      anon_sym_POUND,
    STATE(57), 1,
      aux_sym__includeScope,
    STATE(766), 1,
      sym_value,
    STATE(776), 1,
      sym__includeItem,
    ACTIONS(208), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1549] = 5,
    ACTIONS(216), 1,
      anon_sym_COMMA,
    ACTIONS(219), 1,
      anon_sym_RBRACE,
    ACTIONS(221), 1,
      sym__whitespace,
    STATE(59), 1,
      aux_sym_json_repeat2,
    STATE(572), 1,
      aux_sym_json_repeat1,
  [1565] = 5,
    ACTIONS(224), 1,
      anon_sym_COMMA,
    ACTIONS(226), 1,
      sym__whitespace,
    ACTIONS(228), 1,
      anon_sym_RBRACK,
    STATE(132), 1,
      aux_sym_patterns_repeat1,
    STATE(385), 1,
      aux_sym_json_repeat1,
  [1581] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(232), 1,
      anon_sym_RBRACE,
    ACTIONS(234), 1,
      sym__whitespace,
    STATE(159), 1,
      aux_sym_captures_repeat1,
    STATE(268), 1,
      aux_sym_json_repeat1,
  [1597] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(232), 1,
      anon_sym_RBRACE,
    ACTIONS(234), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(268), 1,
      aux_sym_json_repeat1,
  [1613] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(236), 1,
      anon_sym_RBRACE,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(158), 1,
      sym_capture,
  [1629] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(236), 1,
      anon_sym_RBRACE,
    ACTIONS(240), 1,
      sym__whitespace,
    STATE(157), 1,
      aux_sym_captures_repeat1,
    STATE(269), 1,
      aux_sym_json_repeat1,
  [1645] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(236), 1,
      anon_sym_RBRACE,
    ACTIONS(240), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(269), 1,
      aux_sym_json_repeat1,
  [1661] = 5,
    ACTIONS(242), 1,
      anon_sym_COMMA,
    ACTIONS(245), 1,
      anon_sym_RBRACE,
    ACTIONS(247), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(723), 1,
      aux_sym_json_repeat1,
  [1677] = 5,
    ACTIONS(180), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(252), 1,
      sym__whitespace,
    STATE(146), 1,
      aux_sym_injection_repeat1,
    STATE(274), 1,
      aux_sym_json_repeat1,
  [1693] = 5,
    ACTIONS(180), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(252), 1,
      sym__whitespace,
    STATE(94), 1,
      aux_sym_injection_repeat1,
    STATE(274), 1,
      aux_sym_json_repeat1,
  [1709] = 5,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(254), 1,
      anon_sym_RBRACE,
    ACTIONS(256), 1,
      sym__whitespace,
    STATE(141), 1,
      aux_sym_injection_repeat1,
    STATE(276), 1,
      aux_sym_json_repeat1,
  [1725] = 5,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(254), 1,
      anon_sym_RBRACE,
    ACTIONS(256), 1,
      sym__whitespace,
    STATE(94), 1,
      aux_sym_injection_repeat1,
    STATE(276), 1,
      aux_sym_json_repeat1,
  [1741] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(258), 1,
      anon_sym_RBRACE,
    ACTIONS(260), 1,
      sym__whitespace,
    STATE(133), 1,
      sym_capture,
    STATE(134), 1,
      aux_sym_json_repeat1,
  [1757] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(258), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(133), 1,
      sym_capture,
  [1773] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(258), 1,
      anon_sym_RBRACE,
    ACTIONS(262), 1,
      sym__whitespace,
    STATE(128), 1,
      aux_sym_captures_repeat1,
    STATE(278), 1,
      aux_sym_json_repeat1,
  [1789] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(258), 1,
      anon_sym_RBRACE,
    ACTIONS(262), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(278), 1,
      aux_sym_json_repeat1,
  [1805] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(264), 1,
      anon_sym_RBRACE,
    ACTIONS(266), 1,
      sym__whitespace,
    STATE(126), 1,
      sym_capture,
    STATE(127), 1,
      aux_sym_json_repeat1,
  [1821] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(264), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(126), 1,
      sym_capture,
  [1837] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(264), 1,
      anon_sym_RBRACE,
    ACTIONS(268), 1,
      sym__whitespace,
    STATE(123), 1,
      aux_sym_captures_repeat1,
    STATE(281), 1,
      aux_sym_json_repeat1,
  [1853] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(264), 1,
      anon_sym_RBRACE,
    ACTIONS(268), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(281), 1,
      aux_sym_json_repeat1,
  [1869] = 5,
    ACTIONS(270), 1,
      anon_sym_COMMA,
    ACTIONS(272), 1,
      anon_sym_RBRACE,
    ACTIONS(274), 1,
      sym__whitespace,
    STATE(59), 1,
      aux_sym_json_repeat2,
    STATE(332), 1,
      aux_sym_json_repeat1,
  [1885] = 5,
    ACTIONS(117), 1,
      anon_sym_RBRACE,
    ACTIONS(276), 1,
      sym__whitespace,
    ACTIONS(278), 1,
      anon_sym_DQUOTE,
    STATE(108), 1,
      sym_item,
    STATE(109), 1,
      aux_sym_json_repeat1,
  [1901] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(280), 1,
      anon_sym_RBRACE,
    ACTIONS(282), 1,
      sym__whitespace,
    STATE(61), 1,
      sym_capture,
    STATE(122), 1,
      aux_sym_json_repeat1,
  [1917] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(280), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(61), 1,
      sym_capture,
  [1933] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(280), 1,
      anon_sym_RBRACE,
    ACTIONS(284), 1,
      sym__whitespace,
    STATE(62), 1,
      aux_sym_captures_repeat1,
    STATE(283), 1,
      aux_sym_json_repeat1,
  [1949] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(280), 1,
      anon_sym_RBRACE,
    ACTIONS(284), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(283), 1,
      aux_sym_json_repeat1,
  [1965] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(286), 1,
      anon_sym_RBRACE,
    ACTIONS(288), 1,
      sym__whitespace,
    STATE(63), 1,
      aux_sym_json_repeat1,
    STATE(64), 1,
      sym_capture,
  [1981] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(286), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(64), 1,
      sym_capture,
  [1997] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(286), 1,
      anon_sym_RBRACE,
    ACTIONS(290), 1,
      sym__whitespace,
    STATE(65), 1,
      aux_sym_captures_repeat1,
    STATE(285), 1,
      aux_sym_json_repeat1,
  [2013] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(286), 1,
      anon_sym_RBRACE,
    ACTIONS(290), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(285), 1,
      aux_sym_json_repeat1,
  [2029] = 3,
    STATE(89), 1,
      aux_sym__includeScope,
    ACTIONS(292), 2,
      anon_sym_DQUOTE,
      anon_sym_POUND,
    ACTIONS(294), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [2041] = 5,
    ACTIONS(168), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(297), 1,
      sym__whitespace,
    STATE(68), 1,
      aux_sym_injection_repeat1,
    STATE(291), 1,
      aux_sym_json_repeat1,
  [2057] = 5,
    ACTIONS(168), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(297), 1,
      sym__whitespace,
    STATE(94), 1,
      aux_sym_injection_repeat1,
    STATE(291), 1,
      aux_sym_json_repeat1,
  [2073] = 5,
    ACTIONS(190), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(299), 1,
      sym__whitespace,
    STATE(70), 1,
      aux_sym_injection_repeat1,
    STATE(292), 1,
      aux_sym_json_repeat1,
  [2089] = 5,
    ACTIONS(190), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(299), 1,
      sym__whitespace,
    STATE(94), 1,
      aux_sym_injection_repeat1,
    STATE(292), 1,
      aux_sym_json_repeat1,
  [2105] = 5,
    ACTIONS(301), 1,
      anon_sym_COMMA,
    ACTIONS(304), 1,
      anon_sym_RBRACE,
    ACTIONS(306), 1,
      sym__whitespace,
    STATE(94), 1,
      aux_sym_injection_repeat1,
    STATE(671), 1,
      aux_sym_json_repeat1,
  [2121] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(309), 1,
      anon_sym_RBRACE,
    ACTIONS(311), 1,
      sym__whitespace,
    STATE(72), 1,
      aux_sym_json_repeat1,
    STATE(73), 1,
      sym_capture,
  [2137] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(309), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(73), 1,
      sym_capture,
  [2153] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(309), 1,
      anon_sym_RBRACE,
    ACTIONS(313), 1,
      sym__whitespace,
    STATE(74), 1,
      aux_sym_captures_repeat1,
    STATE(293), 1,
      aux_sym_json_repeat1,
  [2169] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(315), 1,
      anon_sym_RBRACE,
    ACTIONS(317), 1,
      sym__whitespace,
    STATE(76), 1,
      aux_sym_json_repeat1,
    STATE(77), 1,
      sym_capture,
  [2185] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(315), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(77), 1,
      sym_capture,
  [2201] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(315), 1,
      anon_sym_RBRACE,
    ACTIONS(319), 1,
      sym__whitespace,
    STATE(78), 1,
      aux_sym_captures_repeat1,
    STATE(295), 1,
      aux_sym_json_repeat1,
  [2217] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(321), 1,
      anon_sym_RBRACE,
    ACTIONS(323), 1,
      sym__whitespace,
    STATE(82), 1,
      aux_sym_json_repeat1,
    STATE(83), 1,
      sym_capture,
  [2233] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(321), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(83), 1,
      sym_capture,
  [2249] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(321), 1,
      anon_sym_RBRACE,
    ACTIONS(325), 1,
      sym__whitespace,
    STATE(84), 1,
      aux_sym_captures_repeat1,
    STATE(299), 1,
      aux_sym_json_repeat1,
  [2265] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(327), 1,
      anon_sym_RBRACE,
    ACTIONS(329), 1,
      sym__whitespace,
    STATE(86), 1,
      aux_sym_json_repeat1,
    STATE(87), 1,
      sym_capture,
  [2281] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(327), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(87), 1,
      sym_capture,
  [2297] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(327), 1,
      anon_sym_RBRACE,
    ACTIONS(331), 1,
      sym__whitespace,
    STATE(88), 1,
      aux_sym_captures_repeat1,
    STATE(301), 1,
      aux_sym_json_repeat1,
  [2313] = 5,
    ACTIONS(164), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(333), 1,
      sym__whitespace,
    STATE(91), 1,
      aux_sym_injection_repeat1,
    STATE(309), 1,
      aux_sym_json_repeat1,
  [2329] = 5,
    ACTIONS(107), 1,
      anon_sym_RBRACE,
    ACTIONS(335), 1,
      anon_sym_COMMA,
    ACTIONS(337), 1,
      sym__whitespace,
    STATE(165), 1,
      aux_sym_object_repeat1,
    STATE(349), 1,
      aux_sym_json_repeat1,
  [2345] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(107), 1,
      anon_sym_RBRACE,
    ACTIONS(278), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(166), 1,
      sym_item,
  [2361] = 5,
    ACTIONS(174), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(339), 1,
      sym__whitespace,
    STATE(93), 1,
      aux_sym_injection_repeat1,
    STATE(315), 1,
      aux_sym_json_repeat1,
  [2377] = 5,
    ACTIONS(278), 1,
      anon_sym_DQUOTE,
    ACTIONS(341), 1,
      anon_sym_RBRACE,
    ACTIONS(343), 1,
      sym__whitespace,
    STATE(169), 1,
      sym_item,
    STATE(170), 1,
      aux_sym_json_repeat1,
  [2393] = 5,
    ACTIONS(107), 1,
      anon_sym_RBRACK,
    ACTIONS(345), 1,
      anon_sym_COMMA,
    ACTIONS(347), 1,
      sym__whitespace,
    STATE(176), 1,
      aux_sym_array_repeat1,
    STATE(336), 1,
      aux_sym_json_repeat1,
  [2409] = 5,
    ACTIONS(174), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(339), 1,
      sym__whitespace,
    STATE(94), 1,
      aux_sym_injection_repeat1,
    STATE(315), 1,
      aux_sym_json_repeat1,
  [2425] = 5,
    ACTIONS(349), 1,
      anon_sym_RBRACE,
    ACTIONS(351), 1,
      sym__whitespace,
    ACTIONS(353), 1,
      anon_sym_DQUOTE,
    STATE(181), 1,
      sym_repo,
    STATE(182), 1,
      aux_sym_json_repeat1,
  [2441] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(355), 1,
      anon_sym_RBRACE,
    ACTIONS(357), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(230), 1,
      aux_sym_json_repeat1,
  [2457] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(359), 1,
      anon_sym_RBRACE,
    ACTIONS(361), 1,
      sym__whitespace,
    STATE(96), 1,
      aux_sym_json_repeat1,
    STATE(97), 1,
      sym_capture,
  [2473] = 5,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(365), 1,
      sym__whitespace,
    ACTIONS(367), 1,
      anon_sym_RBRACK,
    STATE(187), 1,
      sym__pattern,
    STATE(188), 1,
      aux_sym_json_repeat1,
  [2489] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(369), 1,
      anon_sym_RBRACE,
    ACTIONS(371), 1,
      sym__whitespace,
    STATE(99), 1,
      aux_sym_json_repeat1,
    STATE(100), 1,
      sym_capture,
  [2505] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(373), 1,
      anon_sym_RBRACE,
    ACTIONS(375), 1,
      sym__whitespace,
    STATE(102), 1,
      aux_sym_json_repeat1,
    STATE(103), 1,
      sym_capture,
  [2521] = 5,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(377), 1,
      anon_sym_RBRACE,
    ACTIONS(379), 1,
      sym__whitespace,
    STATE(105), 1,
      aux_sym_json_repeat1,
    STATE(106), 1,
      sym_capture,
  [2537] = 5,
    ACTIONS(270), 1,
      anon_sym_COMMA,
    ACTIONS(381), 1,
      anon_sym_RBRACE,
    ACTIONS(383), 1,
      sym__whitespace,
    STATE(59), 1,
      aux_sym_json_repeat2,
    STATE(294), 1,
      aux_sym_json_repeat1,
  [2553] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(232), 1,
      anon_sym_RBRACE,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(171), 1,
      sym_capture,
  [2569] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(385), 1,
      anon_sym_RBRACE,
    ACTIONS(387), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(267), 1,
      aux_sym_json_repeat1,
  [2585] = 5,
    ACTIONS(389), 1,
      anon_sym_COMMA,
    ACTIONS(391), 1,
      sym__whitespace,
    ACTIONS(393), 1,
      anon_sym_RBRACK,
    STATE(153), 1,
      aux_sym_fileTypes_repeat1,
    STATE(330), 1,
      aux_sym_json_repeat1,
  [2601] = 5,
    ACTIONS(395), 1,
      anon_sym_COMMA,
    ACTIONS(397), 1,
      anon_sym_RBRACE,
    ACTIONS(399), 1,
      sym__whitespace,
    STATE(160), 1,
      aux_sym_injections_repeat1,
    STATE(331), 1,
      aux_sym_json_repeat1,
  [2617] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(385), 1,
      anon_sym_RBRACE,
    ACTIONS(387), 1,
      sym__whitespace,
    STATE(173), 1,
      aux_sym_captures_repeat1,
    STATE(267), 1,
      aux_sym_json_repeat1,
  [2633] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(385), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(174), 1,
      sym_capture,
  [2649] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(401), 1,
      anon_sym_RBRACE,
    ACTIONS(403), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(265), 1,
      aux_sym_json_repeat1,
  [2665] = 5,
    ACTIONS(405), 1,
      anon_sym_RBRACE,
    ACTIONS(407), 1,
      sym__whitespace,
    ACTIONS(409), 1,
      anon_sym_DQUOTE,
    STATE(199), 1,
      sym_injection,
    STATE(200), 1,
      aux_sym_json_repeat1,
  [2681] = 5,
    ACTIONS(172), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(411), 1,
      sym__whitespace,
    STATE(113), 1,
      aux_sym_injection_repeat1,
    STATE(334), 1,
      aux_sym_json_repeat1,
  [2697] = 5,
    ACTIONS(33), 1,
      anon_sym_DQUOTE,
    ACTIONS(37), 1,
      anon_sym_patterns,
    ACTIONS(63), 1,
      anon_sym_comment,
    ACTIONS(65), 1,
      anon_sym_SLASH_SLASH,
    ACTIONS(67), 1,
      sym__string_content,
  [2713] = 5,
    ACTIONS(224), 1,
      anon_sym_COMMA,
    ACTIONS(413), 1,
      sym__whitespace,
    ACTIONS(415), 1,
      anon_sym_RBRACK,
    STATE(164), 1,
      aux_sym_patterns_repeat1,
    STATE(335), 1,
      aux_sym_json_repeat1,
  [2729] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(401), 1,
      anon_sym_RBRACE,
    ACTIONS(403), 1,
      sym__whitespace,
    STATE(184), 1,
      aux_sym_captures_repeat1,
    STATE(265), 1,
      aux_sym_json_repeat1,
  [2745] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(401), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(185), 1,
      sym_capture,
  [2761] = 5,
    ACTIONS(417), 1,
      anon_sym_COMMA,
    ACTIONS(419), 1,
      anon_sym_RBRACE,
    ACTIONS(421), 1,
      sym__whitespace,
    STATE(180), 1,
      aux_sym_repository_repeat1,
    STATE(365), 1,
      aux_sym_json_repeat1,
  [2777] = 5,
    ACTIONS(389), 1,
      anon_sym_COMMA,
    ACTIONS(423), 1,
      sym__whitespace,
    ACTIONS(425), 1,
      anon_sym_RBRACK,
    STATE(124), 1,
      aux_sym_fileTypes_repeat1,
    STATE(374), 1,
      aux_sym_json_repeat1,
  [2793] = 5,
    ACTIONS(389), 1,
      anon_sym_COMMA,
    ACTIONS(423), 1,
      sym__whitespace,
    ACTIONS(425), 1,
      anon_sym_RBRACK,
    STATE(153), 1,
      aux_sym_fileTypes_repeat1,
    STATE(374), 1,
      aux_sym_json_repeat1,
  [2809] = 5,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(427), 1,
      sym__whitespace,
    ACTIONS(429), 1,
      anon_sym_RBRACK,
    STATE(208), 1,
      sym__string,
    STATE(209), 1,
      aux_sym_json_repeat1,
  [2825] = 5,
    ACTIONS(395), 1,
      anon_sym_COMMA,
    ACTIONS(431), 1,
      anon_sym_RBRACE,
    ACTIONS(433), 1,
      sym__whitespace,
    STATE(125), 1,
      aux_sym_injections_repeat1,
    STATE(375), 1,
      aux_sym_json_repeat1,
  [2841] = 5,
    ACTIONS(395), 1,
      anon_sym_COMMA,
    ACTIONS(431), 1,
      anon_sym_RBRACE,
    ACTIONS(433), 1,
      sym__whitespace,
    STATE(160), 1,
      aux_sym_injections_repeat1,
    STATE(375), 1,
      aux_sym_json_repeat1,
  [2857] = 5,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(435), 1,
      anon_sym_RBRACE,
    ACTIONS(437), 1,
      sym__whitespace,
    STATE(94), 1,
      aux_sym_injection_repeat1,
    STATE(264), 1,
      aux_sym_json_repeat1,
  [2873] = 5,
    ACTIONS(270), 1,
      anon_sym_COMMA,
    ACTIONS(381), 1,
      anon_sym_RBRACE,
    ACTIONS(383), 1,
      sym__whitespace,
    STATE(79), 1,
      aux_sym_json_repeat2,
    STATE(294), 1,
      aux_sym_json_repeat1,
  [2889] = 5,
    ACTIONS(224), 1,
      anon_sym_COMMA,
    ACTIONS(439), 1,
      sym__whitespace,
    ACTIONS(441), 1,
      anon_sym_RBRACK,
    STATE(164), 1,
      aux_sym_patterns_repeat1,
    STATE(386), 1,
      aux_sym_json_repeat1,
  [2905] = 5,
    ACTIONS(443), 1,
      anon_sym_COMMA,
    ACTIONS(445), 1,
      anon_sym_RBRACE,
    ACTIONS(447), 1,
      sym__whitespace,
    STATE(145), 1,
      aux_sym__pattern_repeat1,
    STATE(388), 1,
      aux_sym_json_repeat1,
  [2921] = 5,
    ACTIONS(449), 1,
      anon_sym_COMMA,
    ACTIONS(452), 1,
      anon_sym_RBRACE,
    ACTIONS(454), 1,
      sym__whitespace,
    STATE(145), 1,
      aux_sym__pattern_repeat1,
    STATE(480), 1,
      aux_sym_json_repeat1,
  [2937] = 5,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(457), 1,
      anon_sym_RBRACE,
    ACTIONS(459), 1,
      sym__whitespace,
    STATE(94), 1,
      aux_sym_injection_repeat1,
    STATE(261), 1,
      aux_sym_json_repeat1,
  [2953] = 5,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(457), 1,
      anon_sym_RBRACE,
    ACTIONS(459), 1,
      sym__whitespace,
    STATE(206), 1,
      aux_sym_injection_repeat1,
    STATE(261), 1,
      aux_sym_json_repeat1,
  [2969] = 5,
    ACTIONS(417), 1,
      anon_sym_COMMA,
    ACTIONS(461), 1,
      anon_sym_RBRACE,
    ACTIONS(463), 1,
      sym__whitespace,
    STATE(135), 1,
      aux_sym_repository_repeat1,
    STATE(400), 1,
      aux_sym_json_repeat1,
  [2985] = 5,
    ACTIONS(417), 1,
      anon_sym_COMMA,
    ACTIONS(461), 1,
      anon_sym_RBRACE,
    ACTIONS(463), 1,
      sym__whitespace,
    STATE(180), 1,
      aux_sym_repository_repeat1,
    STATE(400), 1,
      aux_sym_json_repeat1,
  [3001] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(465), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(136), 1,
      sym__string,
  [3017] = 5,
    ACTIONS(389), 1,
      anon_sym_COMMA,
    ACTIONS(465), 1,
      anon_sym_RBRACK,
    ACTIONS(467), 1,
      sym__whitespace,
    STATE(137), 1,
      aux_sym_fileTypes_repeat1,
    STATE(405), 1,
      aux_sym_json_repeat1,
  [3033] = 5,
    ACTIONS(389), 1,
      anon_sym_COMMA,
    ACTIONS(465), 1,
      anon_sym_RBRACK,
    ACTIONS(467), 1,
      sym__whitespace,
    STATE(153), 1,
      aux_sym_fileTypes_repeat1,
    STATE(405), 1,
      aux_sym_json_repeat1,
  [3049] = 5,
    ACTIONS(469), 1,
      anon_sym_COMMA,
    ACTIONS(472), 1,
      sym__whitespace,
    ACTIONS(475), 1,
      anon_sym_RBRACK,
    STATE(153), 1,
      aux_sym_fileTypes_repeat1,
    STATE(438), 1,
      aux_sym_json_repeat1,
  [3065] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(409), 1,
      anon_sym_DQUOTE,
    ACTIONS(477), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(139), 1,
      sym_injection,
  [3081] = 5,
    ACTIONS(395), 1,
      anon_sym_COMMA,
    ACTIONS(477), 1,
      anon_sym_RBRACE,
    ACTIONS(479), 1,
      sym__whitespace,
    STATE(140), 1,
      aux_sym_injections_repeat1,
    STATE(412), 1,
      aux_sym_json_repeat1,
  [3097] = 5,
    ACTIONS(395), 1,
      anon_sym_COMMA,
    ACTIONS(477), 1,
      anon_sym_RBRACE,
    ACTIONS(479), 1,
      sym__whitespace,
    STATE(160), 1,
      aux_sym_injections_repeat1,
    STATE(412), 1,
      aux_sym_json_repeat1,
  [3113] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(481), 1,
      anon_sym_RBRACE,
    ACTIONS(483), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(252), 1,
      aux_sym_json_repeat1,
  [3129] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(481), 1,
      anon_sym_RBRACE,
    ACTIONS(483), 1,
      sym__whitespace,
    STATE(223), 1,
      aux_sym_captures_repeat1,
    STATE(252), 1,
      aux_sym_json_repeat1,
  [3145] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(485), 1,
      anon_sym_RBRACE,
    ACTIONS(487), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(250), 1,
      aux_sym_json_repeat1,
  [3161] = 5,
    ACTIONS(489), 1,
      anon_sym_COMMA,
    ACTIONS(492), 1,
      anon_sym_RBRACE,
    ACTIONS(494), 1,
      sym__whitespace,
    STATE(160), 1,
      aux_sym_injections_repeat1,
    STATE(431), 1,
      aux_sym_json_repeat1,
  [3177] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(497), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(60), 1,
      sym__pattern,
  [3193] = 5,
    ACTIONS(224), 1,
      anon_sym_COMMA,
    ACTIONS(499), 1,
      sym__whitespace,
    ACTIONS(501), 1,
      anon_sym_RBRACK,
    STATE(143), 1,
      aux_sym_patterns_repeat1,
    STATE(418), 1,
      aux_sym_json_repeat1,
  [3209] = 5,
    ACTIONS(224), 1,
      anon_sym_COMMA,
    ACTIONS(503), 1,
      sym__whitespace,
    ACTIONS(505), 1,
      anon_sym_RBRACK,
    STATE(164), 1,
      aux_sym_patterns_repeat1,
    STATE(417), 1,
      aux_sym_json_repeat1,
  [3225] = 5,
    ACTIONS(507), 1,
      anon_sym_COMMA,
    ACTIONS(510), 1,
      sym__whitespace,
    ACTIONS(513), 1,
      anon_sym_RBRACK,
    STATE(164), 1,
      aux_sym_patterns_repeat1,
    STATE(423), 1,
      aux_sym_json_repeat1,
  [3241] = 5,
    ACTIONS(335), 1,
      anon_sym_COMMA,
    ACTIONS(515), 1,
      anon_sym_RBRACE,
    ACTIONS(517), 1,
      sym__whitespace,
    STATE(212), 1,
      aux_sym_object_repeat1,
    STATE(245), 1,
      aux_sym_json_repeat1,
  [3257] = 5,
    ACTIONS(335), 1,
      anon_sym_COMMA,
    ACTIONS(515), 1,
      anon_sym_RBRACE,
    ACTIONS(517), 1,
      sym__whitespace,
    STATE(213), 1,
      aux_sym_object_repeat1,
    STATE(245), 1,
      aux_sym_json_repeat1,
  [3273] = 5,
    ACTIONS(443), 1,
      anon_sym_COMMA,
    ACTIONS(519), 1,
      anon_sym_RBRACE,
    ACTIONS(521), 1,
      sym__whitespace,
    STATE(144), 1,
      aux_sym__pattern_repeat1,
    STATE(409), 1,
      aux_sym_json_repeat1,
  [3289] = 5,
    ACTIONS(443), 1,
      anon_sym_COMMA,
    ACTIONS(519), 1,
      anon_sym_RBRACE,
    ACTIONS(521), 1,
      sym__whitespace,
    STATE(145), 1,
      aux_sym__pattern_repeat1,
    STATE(409), 1,
      aux_sym_json_repeat1,
  [3305] = 5,
    ACTIONS(335), 1,
      anon_sym_COMMA,
    ACTIONS(523), 1,
      anon_sym_RBRACE,
    ACTIONS(525), 1,
      sym__whitespace,
    STATE(216), 1,
      aux_sym_object_repeat1,
    STATE(247), 1,
      aux_sym_json_repeat1,
  [3321] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(278), 1,
      anon_sym_DQUOTE,
    ACTIONS(523), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(217), 1,
      sym_item,
  [3337] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(485), 1,
      anon_sym_RBRACE,
    ACTIONS(487), 1,
      sym__whitespace,
    STATE(225), 1,
      aux_sym_captures_repeat1,
    STATE(250), 1,
      aux_sym_json_repeat1,
  [3353] = 5,
    ACTIONS(111), 1,
      anon_sym_RBRACK,
    ACTIONS(345), 1,
      anon_sym_COMMA,
    ACTIONS(527), 1,
      sym__whitespace,
    STATE(220), 1,
      aux_sym_array_repeat1,
    STATE(249), 1,
      aux_sym_json_repeat1,
  [3369] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(529), 1,
      anon_sym_RBRACE,
    ACTIONS(531), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(248), 1,
      aux_sym_json_repeat1,
  [3385] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(529), 1,
      anon_sym_RBRACE,
    ACTIONS(531), 1,
      sym__whitespace,
    STATE(226), 1,
      aux_sym_captures_repeat1,
    STATE(248), 1,
      aux_sym_json_repeat1,
  [3401] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(353), 1,
      anon_sym_DQUOTE,
    ACTIONS(533), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(148), 1,
      sym_repo,
  [3417] = 5,
    ACTIONS(345), 1,
      anon_sym_COMMA,
    ACTIONS(515), 1,
      anon_sym_RBRACK,
    ACTIONS(535), 1,
      sym__whitespace,
    STATE(207), 1,
      aux_sym_array_repeat1,
    STATE(251), 1,
      aux_sym_json_repeat1,
  [3433] = 5,
    ACTIONS(345), 1,
      anon_sym_COMMA,
    ACTIONS(515), 1,
      anon_sym_RBRACK,
    ACTIONS(535), 1,
      sym__whitespace,
    STATE(211), 1,
      aux_sym_array_repeat1,
    STATE(251), 1,
      aux_sym_json_repeat1,
  [3449] = 5,
    ACTIONS(417), 1,
      anon_sym_COMMA,
    ACTIONS(533), 1,
      anon_sym_RBRACE,
    ACTIONS(537), 1,
      sym__whitespace,
    STATE(149), 1,
      aux_sym_repository_repeat1,
    STATE(390), 1,
      aux_sym_json_repeat1,
  [3465] = 5,
    ACTIONS(417), 1,
      anon_sym_COMMA,
    ACTIONS(533), 1,
      anon_sym_RBRACE,
    ACTIONS(537), 1,
      sym__whitespace,
    STATE(180), 1,
      aux_sym_repository_repeat1,
    STATE(390), 1,
      aux_sym_json_repeat1,
  [3481] = 5,
    ACTIONS(539), 1,
      anon_sym_COMMA,
    ACTIONS(542), 1,
      anon_sym_RBRACE,
    ACTIONS(544), 1,
      sym__whitespace,
    STATE(180), 1,
      aux_sym_repository_repeat1,
    STATE(479), 1,
      aux_sym_json_repeat1,
  [3497] = 5,
    ACTIONS(417), 1,
      anon_sym_COMMA,
    ACTIONS(547), 1,
      anon_sym_RBRACE,
    ACTIONS(549), 1,
      sym__whitespace,
    STATE(214), 1,
      aux_sym_repository_repeat1,
    STATE(257), 1,
      aux_sym_json_repeat1,
  [3513] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(353), 1,
      anon_sym_DQUOTE,
    ACTIONS(547), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(215), 1,
      sym_repo,
  [3529] = 5,
    ACTIONS(353), 1,
      anon_sym_DQUOTE,
    ACTIONS(547), 1,
      anon_sym_RBRACE,
    ACTIONS(551), 1,
      sym__whitespace,
    STATE(215), 1,
      sym_repo,
    STATE(218), 1,
      aux_sym_json_repeat1,
  [3545] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(553), 1,
      anon_sym_RBRACE,
    ACTIONS(555), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(246), 1,
      aux_sym_json_repeat1,
  [3561] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(553), 1,
      anon_sym_RBRACE,
    ACTIONS(555), 1,
      sym__whitespace,
    STATE(115), 1,
      aux_sym_captures_repeat1,
    STATE(246), 1,
      aux_sym_json_repeat1,
  [3577] = 5,
    ACTIONS(345), 1,
      anon_sym_COMMA,
    ACTIONS(557), 1,
      sym__whitespace,
    ACTIONS(559), 1,
      anon_sym_RBRACK,
    STATE(207), 1,
      aux_sym_array_repeat1,
    STATE(379), 1,
      aux_sym_json_repeat1,
  [3593] = 5,
    ACTIONS(224), 1,
      anon_sym_COMMA,
    ACTIONS(561), 1,
      sym__whitespace,
    ACTIONS(563), 1,
      anon_sym_RBRACK,
    STATE(205), 1,
      aux_sym_patterns_repeat1,
    STATE(262), 1,
      aux_sym_json_repeat1,
  [3609] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(565), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(204), 1,
      sym__pattern,
  [3625] = 5,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(565), 1,
      anon_sym_RBRACK,
    ACTIONS(567), 1,
      sym__whitespace,
    STATE(203), 1,
      aux_sym_json_repeat1,
    STATE(204), 1,
      sym__pattern,
  [3641] = 5,
    ACTIONS(335), 1,
      anon_sym_COMMA,
    ACTIONS(569), 1,
      anon_sym_RBRACE,
    ACTIONS(571), 1,
      sym__whitespace,
    STATE(212), 1,
      aux_sym_object_repeat1,
    STATE(377), 1,
      aux_sym_json_repeat1,
  [3657] = 5,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(573), 1,
      sym__whitespace,
    ACTIONS(575), 1,
      anon_sym_RBRACK,
    STATE(150), 1,
      aux_sym_json_repeat1,
    STATE(151), 1,
      sym__string,
  [3673] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(575), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(151), 1,
      sym__string,
  [3689] = 5,
    ACTIONS(389), 1,
      anon_sym_COMMA,
    ACTIONS(575), 1,
      anon_sym_RBRACK,
    ACTIONS(577), 1,
      sym__whitespace,
    STATE(152), 1,
      aux_sym_fileTypes_repeat1,
    STATE(369), 1,
      aux_sym_json_repeat1,
  [3705] = 5,
    ACTIONS(389), 1,
      anon_sym_COMMA,
    ACTIONS(575), 1,
      anon_sym_RBRACK,
    ACTIONS(577), 1,
      sym__whitespace,
    STATE(153), 1,
      aux_sym_fileTypes_repeat1,
    STATE(369), 1,
      aux_sym_json_repeat1,
  [3721] = 5,
    ACTIONS(409), 1,
      anon_sym_DQUOTE,
    ACTIONS(579), 1,
      anon_sym_RBRACE,
    ACTIONS(581), 1,
      sym__whitespace,
    STATE(154), 1,
      aux_sym_json_repeat1,
    STATE(155), 1,
      sym_injection,
  [3737] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(409), 1,
      anon_sym_DQUOTE,
    ACTIONS(579), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(155), 1,
      sym_injection,
  [3753] = 5,
    ACTIONS(395), 1,
      anon_sym_COMMA,
    ACTIONS(579), 1,
      anon_sym_RBRACE,
    ACTIONS(583), 1,
      sym__whitespace,
    STATE(156), 1,
      aux_sym_injections_repeat1,
    STATE(360), 1,
      aux_sym_json_repeat1,
  [3769] = 5,
    ACTIONS(395), 1,
      anon_sym_COMMA,
    ACTIONS(579), 1,
      anon_sym_RBRACE,
    ACTIONS(583), 1,
      sym__whitespace,
    STATE(160), 1,
      aux_sym_injections_repeat1,
    STATE(360), 1,
      aux_sym_json_repeat1,
  [3785] = 5,
    ACTIONS(395), 1,
      anon_sym_COMMA,
    ACTIONS(585), 1,
      anon_sym_RBRACE,
    ACTIONS(587), 1,
      sym__whitespace,
    STATE(198), 1,
      aux_sym_injections_repeat1,
    STATE(275), 1,
      aux_sym_json_repeat1,
  [3801] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(409), 1,
      anon_sym_DQUOTE,
    ACTIONS(585), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(197), 1,
      sym_injection,
  [3817] = 5,
    ACTIONS(409), 1,
      anon_sym_DQUOTE,
    ACTIONS(585), 1,
      anon_sym_RBRACE,
    ACTIONS(589), 1,
      sym__whitespace,
    STATE(196), 1,
      aux_sym_json_repeat1,
    STATE(197), 1,
      sym_injection,
  [3833] = 5,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(591), 1,
      sym__whitespace,
    ACTIONS(593), 1,
      anon_sym_RBRACK,
    STATE(161), 1,
      aux_sym_json_repeat1,
    STATE(162), 1,
      sym__pattern,
  [3849] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(593), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(162), 1,
      sym__pattern,
  [3865] = 5,
    ACTIONS(224), 1,
      anon_sym_COMMA,
    ACTIONS(595), 1,
      sym__whitespace,
    ACTIONS(597), 1,
      anon_sym_RBRACK,
    STATE(163), 1,
      aux_sym_patterns_repeat1,
    STATE(348), 1,
      aux_sym_json_repeat1,
  [3881] = 5,
    ACTIONS(224), 1,
      anon_sym_COMMA,
    ACTIONS(599), 1,
      sym__whitespace,
    ACTIONS(601), 1,
      anon_sym_RBRACK,
    STATE(164), 1,
      aux_sym_patterns_repeat1,
    STATE(345), 1,
      aux_sym_json_repeat1,
  [3897] = 5,
    ACTIONS(250), 1,
      anon_sym_COMMA,
    ACTIONS(603), 1,
      anon_sym_RBRACE,
    ACTIONS(605), 1,
      sym__whitespace,
    STATE(94), 1,
      aux_sym_injection_repeat1,
    STATE(244), 1,
      aux_sym_json_repeat1,
  [3913] = 5,
    ACTIONS(607), 1,
      anon_sym_COMMA,
    ACTIONS(610), 1,
      sym__whitespace,
    ACTIONS(613), 1,
      anon_sym_RBRACK,
    STATE(207), 1,
      aux_sym_array_repeat1,
    STATE(622), 1,
      aux_sym_json_repeat1,
  [3929] = 5,
    ACTIONS(389), 1,
      anon_sym_COMMA,
    ACTIONS(615), 1,
      sym__whitespace,
    ACTIONS(617), 1,
      anon_sym_RBRACK,
    STATE(194), 1,
      aux_sym_fileTypes_repeat1,
    STATE(284), 1,
      aux_sym_json_repeat1,
  [3945] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(617), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(193), 1,
      sym__string,
  [3961] = 5,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(617), 1,
      anon_sym_RBRACK,
    ACTIONS(619), 1,
      sym__whitespace,
    STATE(192), 1,
      aux_sym_json_repeat1,
    STATE(193), 1,
      sym__string,
  [3977] = 5,
    ACTIONS(345), 1,
      anon_sym_COMMA,
    ACTIONS(621), 1,
      sym__whitespace,
    ACTIONS(623), 1,
      anon_sym_RBRACK,
    STATE(207), 1,
      aux_sym_array_repeat1,
    STATE(310), 1,
      aux_sym_json_repeat1,
  [3993] = 5,
    ACTIONS(625), 1,
      anon_sym_COMMA,
    ACTIONS(628), 1,
      anon_sym_RBRACE,
    ACTIONS(630), 1,
      sym__whitespace,
    STATE(212), 1,
      aux_sym_object_repeat1,
    STATE(651), 1,
      aux_sym_json_repeat1,
  [4009] = 5,
    ACTIONS(335), 1,
      anon_sym_COMMA,
    ACTIONS(623), 1,
      anon_sym_RBRACE,
    ACTIONS(633), 1,
      sym__whitespace,
    STATE(212), 1,
      aux_sym_object_repeat1,
    STATE(300), 1,
      aux_sym_json_repeat1,
  [4025] = 5,
    ACTIONS(417), 1,
      anon_sym_COMMA,
    ACTIONS(635), 1,
      anon_sym_RBRACE,
    ACTIONS(637), 1,
      sym__whitespace,
    STATE(180), 1,
      aux_sym_repository_repeat1,
    STATE(319), 1,
      aux_sym_json_repeat1,
  [4041] = 5,
    ACTIONS(417), 1,
      anon_sym_COMMA,
    ACTIONS(635), 1,
      anon_sym_RBRACE,
    ACTIONS(637), 1,
      sym__whitespace,
    STATE(179), 1,
      aux_sym_repository_repeat1,
    STATE(319), 1,
      aux_sym_json_repeat1,
  [4057] = 5,
    ACTIONS(335), 1,
      anon_sym_COMMA,
    ACTIONS(639), 1,
      anon_sym_RBRACE,
    ACTIONS(641), 1,
      sym__whitespace,
    STATE(212), 1,
      aux_sym_object_repeat1,
    STATE(302), 1,
      aux_sym_json_repeat1,
  [4073] = 5,
    ACTIONS(335), 1,
      anon_sym_COMMA,
    ACTIONS(639), 1,
      anon_sym_RBRACE,
    ACTIONS(641), 1,
      sym__whitespace,
    STATE(190), 1,
      aux_sym_object_repeat1,
    STATE(302), 1,
      aux_sym_json_repeat1,
  [4089] = 5,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(353), 1,
      anon_sym_DQUOTE,
    ACTIONS(635), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(178), 1,
      sym_repo,
  [4105] = 5,
    ACTIONS(353), 1,
      anon_sym_DQUOTE,
    ACTIONS(635), 1,
      anon_sym_RBRACE,
    ACTIONS(643), 1,
      sym__whitespace,
    STATE(175), 1,
      aux_sym_json_repeat1,
    STATE(178), 1,
      sym_repo,
  [4121] = 5,
    ACTIONS(345), 1,
      anon_sym_COMMA,
    ACTIONS(645), 1,
      sym__whitespace,
    ACTIONS(647), 1,
      anon_sym_RBRACK,
    STATE(207), 1,
      aux_sym_array_repeat1,
    STATE(305), 1,
      aux_sym_json_repeat1,
  [4137] = 5,
    ACTIONS(345), 1,
      anon_sym_COMMA,
    ACTIONS(645), 1,
      sym__whitespace,
    ACTIONS(647), 1,
      anon_sym_RBRACK,
    STATE(186), 1,
      aux_sym_array_repeat1,
    STATE(305), 1,
      aux_sym_json_repeat1,
  [4153] = 5,
    ACTIONS(13), 1,
      anon_sym_RBRACE,
    ACTIONS(443), 1,
      anon_sym_COMMA,
    ACTIONS(649), 1,
      sym__whitespace,
    STATE(168), 1,
      aux_sym__pattern_repeat1,
    STATE(338), 1,
      aux_sym_json_repeat1,
  [4169] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(651), 1,
      anon_sym_RBRACE,
    ACTIONS(653), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(236), 1,
      aux_sym_json_repeat1,
  [4185] = 5,
    ACTIONS(27), 1,
      anon_sym_RBRACE,
    ACTIONS(270), 1,
      anon_sym_COMMA,
    ACTIONS(655), 1,
      sym__whitespace,
    STATE(121), 1,
      aux_sym_json_repeat2,
    STATE(280), 1,
      aux_sym_json_repeat1,
  [4201] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(657), 1,
      anon_sym_RBRACE,
    ACTIONS(659), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(234), 1,
      aux_sym_json_repeat1,
  [4217] = 5,
    ACTIONS(230), 1,
      anon_sym_COMMA,
    ACTIONS(661), 1,
      anon_sym_RBRACE,
    ACTIONS(663), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_captures_repeat1,
    STATE(232), 1,
      aux_sym_json_repeat1,
  [4233] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(640), 1,
      sym__string,
  [4246] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(665), 1,
      sym__whitespace,
    STATE(340), 1,
      aux_sym_json_repeat1,
    STATE(538), 1,
      sym__string,
  [4259] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(518), 1,
      sym__pattern,
  [4272] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    ACTIONS(669), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4285] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(685), 1,
      sym__string,
  [4298] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    ACTIONS(671), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4311] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(683), 1,
      sym__string,
  [4324] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    ACTIONS(673), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4337] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(676), 1,
      sym__string,
  [4350] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    ACTIONS(675), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4363] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(672), 1,
      sym__string,
  [4376] = 4,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(677), 1,
      sym__whitespace,
    STATE(229), 1,
      aux_sym_json_repeat1,
    STATE(562), 1,
      sym__pattern,
  [4389] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(663), 1,
      sym__string,
  [4402] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(562), 1,
      sym__pattern,
  [4415] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(565), 1,
      sym__pattern,
  [4428] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(278), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(655), 1,
      sym_item,
  [4441] = 4,
    ACTIONS(278), 1,
      anon_sym_DQUOTE,
    ACTIONS(679), 1,
      sym__whitespace,
    STATE(297), 1,
      aux_sym_json_repeat1,
    STATE(655), 1,
      sym_item,
  [4454] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    ACTIONS(683), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4467] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(623), 1,
      anon_sym_RBRACE,
    ACTIONS(685), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4480] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(355), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4493] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(639), 1,
      anon_sym_RBRACE,
    ACTIONS(685), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4506] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(661), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4519] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(647), 1,
      anon_sym_RBRACK,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4532] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(657), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4545] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(623), 1,
      anon_sym_RBRACK,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4558] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(651), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4571] = 4,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(689), 1,
      sym__whitespace,
    STATE(240), 1,
      aux_sym_json_repeat1,
    STATE(632), 1,
      sym__pattern,
  [4584] = 3,
    ACTIONS(691), 1,
      anon_sym_DQUOTE,
    STATE(314), 1,
      aux_sym_repo_repeat1,
    ACTIONS(693), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4595] = 4,
    ACTIONS(353), 1,
      anon_sym_DQUOTE,
    ACTIONS(695), 1,
      sym__whitespace,
    STATE(316), 1,
      aux_sym_json_repeat1,
    STATE(616), 1,
      sym_repo,
  [4608] = 4,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(697), 1,
      sym__whitespace,
    STATE(241), 1,
      aux_sym_json_repeat1,
    STATE(634), 1,
      sym__pattern,
  [4621] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(635), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4634] = 1,
    ACTIONS(701), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [4641] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(634), 1,
      sym__pattern,
  [4654] = 4,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(703), 1,
      sym__whitespace,
    STATE(342), 1,
      aux_sym_json_repeat1,
    STATE(534), 1,
      sym__pattern,
  [4667] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(603), 1,
      anon_sym_RBRACE,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4680] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(601), 1,
      anon_sym_RBRACK,
    ACTIONS(705), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4693] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(699), 1,
      sym__string,
  [4706] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    ACTIONS(707), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4719] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(553), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4732] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(700), 1,
      sym__string,
  [4745] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(529), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4758] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(485), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4771] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(481), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4784] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(730), 1,
      sym_capture,
  [4797] = 4,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(709), 1,
      sym__whitespace,
    STATE(259), 1,
      aux_sym_json_repeat1,
    STATE(743), 1,
      sym__pattern,
  [4810] = 3,
    ACTIONS(711), 1,
      anon_sym_DQUOTE,
    STATE(314), 1,
      aux_sym_repo_repeat1,
    ACTIONS(693), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4821] = 4,
    ACTIONS(409), 1,
      anon_sym_DQUOTE,
    ACTIONS(713), 1,
      sym__whitespace,
    STATE(357), 1,
      aux_sym_json_repeat1,
    STATE(521), 1,
      sym_injection,
  [4834] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(457), 1,
      anon_sym_RBRACE,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4847] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(579), 1,
      anon_sym_RBRACE,
    ACTIONS(715), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4860] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(435), 1,
      anon_sym_RBRACE,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4873] = 3,
    ACTIONS(717), 1,
      anon_sym_DQUOTE,
    STATE(272), 1,
      aux_sym_repo_repeat1,
    ACTIONS(693), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4884] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(401), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4897] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(721), 1,
      sym__string,
  [4910] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(381), 1,
      anon_sym_RBRACE,
    ACTIONS(719), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4923] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(385), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4936] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(721), 1,
      sym__whitespace,
    STATE(366), 1,
      aux_sym_json_repeat1,
    STATE(510), 1,
      sym__string,
  [4949] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(232), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4962] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(575), 1,
      anon_sym_RBRACK,
    ACTIONS(723), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4975] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(236), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [4988] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(724), 1,
      sym__string,
  [5001] = 4,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(725), 1,
      sym__whitespace,
    STATE(270), 1,
      aux_sym_json_repeat1,
    STATE(720), 1,
      sym_capture,
  [5014] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(728), 1,
      sym__string,
  [5027] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(720), 1,
      sym_capture,
  [5040] = 3,
    ACTIONS(727), 1,
      anon_sym_DQUOTE,
    STATE(314), 1,
      aux_sym_repo_repeat1,
    ACTIONS(693), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [5051] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_RBRACE,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5064] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(254), 1,
      anon_sym_RBRACE,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5077] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(258), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5090] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(272), 1,
      anon_sym_RBRACE,
    ACTIONS(719), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5103] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(264), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5116] = 1,
    ACTIONS(729), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5123] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(278), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(504), 1,
      sym_item,
  [5136] = 1,
    ACTIONS(731), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5143] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(280), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5156] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(685), 1,
      anon_sym_COMMA,
    ACTIONS(733), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5169] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(286), 1,
      anon_sym_RBRACE,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5182] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(569), 1,
      anon_sym_RBRACE,
    ACTIONS(685), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5195] = 4,
    ACTIONS(238), 1,
      anon_sym_DQUOTE,
    ACTIONS(735), 1,
      sym__whitespace,
    STATE(289), 1,
      aux_sym_json_repeat1,
    STATE(684), 1,
      sym_capture,
  [5208] = 3,
    ACTIONS(737), 1,
      anon_sym_DQUOTE,
    STATE(290), 1,
      aux_sym_repo_repeat1,
    ACTIONS(693), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [5219] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(559), 1,
      anon_sym_RBRACK,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5232] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(739), 1,
      sym__whitespace,
    STATE(380), 1,
      aux_sym_json_repeat1,
    STATE(533), 1,
      sym__string,
  [5245] = 3,
    ACTIONS(741), 1,
      anon_sym_DQUOTE,
    STATE(314), 1,
      aux_sym_repo_repeat1,
    ACTIONS(693), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [5256] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(743), 1,
      sym__whitespace,
    STATE(376), 1,
      aux_sym_json_repeat1,
    STATE(501), 1,
      sym__string,
  [5269] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(168), 1,
      anon_sym_RBRACE,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5282] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    ACTIONS(733), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5295] = 4,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(745), 1,
      sym__whitespace,
    STATE(382), 1,
      aux_sym_json_repeat1,
    STATE(488), 1,
      sym__pattern,
  [5308] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(747), 1,
      sym__whitespace,
    STATE(381), 1,
      aux_sym_json_repeat1,
    STATE(490), 1,
      sym__string,
  [5321] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(749), 1,
      sym__whitespace,
    STATE(399), 1,
      aux_sym_json_repeat1,
    STATE(467), 1,
      sym__string,
  [5334] = 3,
    ACTIONS(751), 1,
      anon_sym_DQUOTE,
    STATE(314), 1,
      aux_sym_repo_repeat1,
    ACTIONS(753), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [5345] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(190), 1,
      anon_sym_RBRACE,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5358] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(353), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(485), 1,
      sym_repo,
  [5371] = 4,
    ACTIONS(353), 1,
      anon_sym_DQUOTE,
    ACTIONS(756), 1,
      sym__whitespace,
    STATE(387), 1,
      aux_sym_json_repeat1,
    STATE(485), 1,
      sym_repo,
  [5384] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(758), 1,
      sym__whitespace,
    STATE(415), 1,
      aux_sym_json_repeat1,
    STATE(433), 1,
      sym__string,
  [5397] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(533), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5410] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(760), 1,
      sym__whitespace,
    STATE(411), 1,
      aux_sym_json_repeat1,
    STATE(602), 1,
      sym__string,
  [5423] = 3,
    ACTIONS(762), 1,
      anon_sym_DQUOTE,
    STATE(254), 1,
      aux_sym_repo_repeat1,
    ACTIONS(693), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [5434] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(764), 1,
      sym__whitespace,
    STATE(406), 1,
      aux_sym_json_repeat1,
    STATE(436), 1,
      sym__string,
  [5447] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(766), 1,
      sym__whitespace,
    STATE(373), 1,
      aux_sym_json_repeat1,
    STATE(738), 1,
      sym__string,
  [5460] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(768), 1,
      sym__whitespace,
    STATE(370), 1,
      aux_sym_json_repeat1,
    STATE(505), 1,
      sym__string,
  [5473] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(639), 1,
      sym__string,
  [5486] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(638), 1,
      sym__string,
  [5499] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(637), 1,
      sym__string,
  [5512] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(636), 1,
      sym__string,
  [5525] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(635), 1,
      sym__string,
  [5538] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(723), 1,
      anon_sym_COMMA,
    ACTIONS(770), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5551] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(715), 1,
      anon_sym_COMMA,
    ACTIONS(772), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5564] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(719), 1,
      anon_sym_COMMA,
    ACTIONS(774), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5577] = 1,
    ACTIONS(776), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5584] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(174), 1,
      anon_sym_RBRACE,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5597] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(705), 1,
      anon_sym_COMMA,
    ACTIONS(778), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5610] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(515), 1,
      anon_sym_RBRACK,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5623] = 1,
    ACTIONS(780), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5630] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(519), 1,
      anon_sym_RBRACE,
    ACTIONS(782), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5643] = 1,
    ACTIONS(784), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5650] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(643), 1,
      sym__string,
  [5663] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(786), 1,
      sym__whitespace,
    STATE(288), 1,
      aux_sym_json_repeat1,
    STATE(643), 1,
      sym__string,
  [5676] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(432), 1,
      sym__pattern,
  [5689] = 4,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(788), 1,
      sym__whitespace,
    STATE(413), 1,
      aux_sym_json_repeat1,
    STATE(432), 1,
      sym__pattern,
  [5702] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(790), 1,
      sym__whitespace,
    STATE(227), 1,
      aux_sym_json_repeat1,
    STATE(586), 1,
      sym__string,
  [5715] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(705), 1,
      anon_sym_COMMA,
    ACTIONS(792), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5728] = 1,
    ACTIONS(794), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5735] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(586), 1,
      sym__string,
  [5748] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(505), 1,
      anon_sym_RBRACK,
    ACTIONS(705), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5761] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(515), 1,
      anon_sym_RBRACE,
    ACTIONS(685), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5774] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(796), 1,
      sym__whitespace,
    STATE(325), 1,
      aux_sym_json_repeat1,
    STATE(584), 1,
      sym__string,
  [5787] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(584), 1,
      sym__string,
  [5800] = 4,
    ACTIONS(278), 1,
      anon_sym_DQUOTE,
    ACTIONS(798), 1,
      sym__whitespace,
    STATE(242), 1,
      aux_sym_json_repeat1,
    STATE(633), 1,
      sym_item,
  [5813] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(800), 1,
      sym__whitespace,
    STATE(326), 1,
      aux_sym_json_repeat1,
    STATE(582), 1,
      sym__string,
  [5826] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(582), 1,
      sym__string,
  [5839] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(802), 1,
      sym__whitespace,
    STATE(327), 1,
      aux_sym_json_repeat1,
    STATE(580), 1,
      sym__string,
  [5852] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(580), 1,
      sym__string,
  [5865] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(409), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(428), 1,
      sym_injection,
  [5878] = 4,
    ACTIONS(409), 1,
      anon_sym_DQUOTE,
    ACTIONS(804), 1,
      sym__whitespace,
    STATE(414), 1,
      aux_sym_json_repeat1,
    STATE(428), 1,
      sym_injection,
  [5891] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(806), 1,
      sym__whitespace,
    STATE(328), 1,
      aux_sym_json_repeat1,
    STATE(578), 1,
      sym__string,
  [5904] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(477), 1,
      anon_sym_RBRACE,
    ACTIONS(715), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5917] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(578), 1,
      sym__string,
  [5930] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(808), 1,
      sym__whitespace,
    STATE(329), 1,
      aux_sym_json_repeat1,
    STATE(576), 1,
      sym__string,
  [5943] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(576), 1,
      sym__string,
  [5956] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(810), 1,
      sym__whitespace,
    STATE(239), 1,
      aux_sym_json_repeat1,
    STATE(591), 1,
      sym__string,
  [5969] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    ACTIONS(812), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [5982] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(435), 1,
      sym__string,
  [5995] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(814), 1,
      sym__whitespace,
    STATE(407), 1,
      aux_sym_json_repeat1,
    STATE(435), 1,
      sym__string,
  [6008] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(568), 1,
      sym__pattern,
  [6021] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(465), 1,
      anon_sym_RBRACK,
    ACTIONS(723), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6034] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(591), 1,
      sym__string,
  [6047] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(816), 1,
      sym__whitespace,
    STATE(286), 1,
      aux_sym_json_repeat1,
    STATE(686), 1,
      sym__string,
  [6060] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(818), 1,
      sym__whitespace,
    STATE(237), 1,
      aux_sym_json_repeat1,
    STATE(583), 1,
      sym__string,
  [6073] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(583), 1,
      sym__string,
  [6086] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(393), 1,
      anon_sym_RBRACK,
    ACTIONS(723), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6099] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(397), 1,
      anon_sym_RBRACE,
    ACTIONS(715), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6112] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(688), 1,
      sym__string,
  [6125] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(685), 1,
      anon_sym_COMMA,
    ACTIONS(820), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6138] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(822), 1,
      sym__whitespace,
    STATE(279), 1,
      aux_sym_json_repeat1,
    STATE(688), 1,
      sym__string,
  [6151] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    ACTIONS(824), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6164] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(686), 1,
      sym__string,
  [6177] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(732), 1,
      sym__string,
  [6190] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(444), 1,
      sym__pattern,
  [6203] = 4,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(826), 1,
      sym__whitespace,
    STATE(403), 1,
      aux_sym_json_repeat1,
    STATE(444), 1,
      sym__pattern,
  [6216] = 4,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(828), 1,
      sym__whitespace,
    STATE(402), 1,
      aux_sym_json_repeat1,
    STATE(446), 1,
      sym__pattern,
  [6229] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(415), 1,
      anon_sym_RBRACK,
    ACTIONS(705), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6242] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(705), 1,
      anon_sym_COMMA,
    ACTIONS(830), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6255] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(353), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(449), 1,
      sym_repo,
  [6268] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(782), 1,
      anon_sym_COMMA,
    ACTIONS(832), 1,
      anon_sym_RBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6281] = 1,
    ACTIONS(834), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [6288] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(461), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6301] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(836), 1,
      sym__whitespace,
    STATE(266), 1,
      aux_sym_json_repeat1,
    STATE(732), 1,
      sym__string,
  [6314] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(838), 1,
      sym__whitespace,
    STATE(235), 1,
      aux_sym_json_repeat1,
    STATE(579), 1,
      sym__string,
  [6327] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(840), 1,
      sym__whitespace,
    STATE(347), 1,
      aux_sym_json_repeat1,
    STATE(529), 1,
      sym__string,
  [6340] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(842), 1,
      sym__whitespace,
    STATE(351), 1,
      aux_sym_json_repeat1,
    STATE(526), 1,
      sym__string,
  [6353] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(844), 1,
      sym__whitespace,
    STATE(354), 1,
      aux_sym_json_repeat1,
    STATE(523), 1,
      sym__string,
  [6366] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(846), 1,
      sym__whitespace,
    STATE(356), 1,
      aux_sym_json_repeat1,
    STATE(520), 1,
      sym__string,
  [6379] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(848), 1,
      sym__whitespace,
    STATE(361), 1,
      aux_sym_json_repeat1,
    STATE(517), 1,
      sym__string,
  [6392] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(850), 1,
      sym__whitespace,
    STATE(363), 1,
      aux_sym_json_repeat1,
    STATE(514), 1,
      sym__string,
  [6405] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(736), 1,
      sym__string,
  [6418] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(419), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6431] = 4,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    ACTIONS(852), 1,
      sym__whitespace,
    STATE(368), 1,
      aux_sym_json_repeat1,
    STATE(507), 1,
      sym__pattern,
  [6444] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(507), 1,
      sym__pattern,
  [6457] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(506), 1,
      sym__pattern,
  [6470] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(854), 1,
      sym__whitespace,
    STATE(263), 1,
      aux_sym_json_repeat1,
    STATE(736), 1,
      sym__string,
  [6483] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(425), 1,
      anon_sym_RBRACK,
    ACTIONS(723), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6496] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(579), 1,
      sym__string,
  [6509] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(502), 1,
      sym__string,
  [6522] = 1,
    ACTIONS(856), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [6529] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(445), 1,
      anon_sym_RBRACE,
    ACTIONS(782), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6542] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(858), 1,
      sym__whitespace,
    STATE(233), 1,
      aux_sym_json_repeat1,
    STATE(574), 1,
      sym__string,
  [6555] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(574), 1,
      sym__string,
  [6568] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(431), 1,
      anon_sym_RBRACE,
    ACTIONS(715), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6581] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(363), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(482), 1,
      sym__pattern,
  [6594] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(409), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(498), 1,
      sym_injection,
  [6607] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
    STATE(571), 1,
      sym__string,
  [6620] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(860), 1,
      sym__whitespace,
    STATE(231), 1,
      aux_sym_json_repeat1,
    STATE(571), 1,
      sym__string,
  [6633] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(705), 1,
      anon_sym_COMMA,
    ACTIONS(862), 1,
      anon_sym_RBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6646] = 4,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(441), 1,
      anon_sym_RBRACK,
    ACTIONS(705), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6659] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(864), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6669] = 1,
    ACTIONS(866), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6675] = 1,
    ACTIONS(868), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6681] = 1,
    ACTIONS(870), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6687] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(705), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6697] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(872), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6707] = 3,
    ACTIONS(872), 1,
      anon_sym_LBRACE,
    ACTIONS(874), 1,
      sym__whitespace,
    STATE(494), 1,
      aux_sym_json_repeat1,
  [6717] = 3,
    ACTIONS(876), 1,
      anon_sym_LBRACE,
    ACTIONS(878), 1,
      sym__whitespace,
    STATE(496), 1,
      aux_sym_json_repeat1,
  [6727] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(880), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6737] = 1,
    ACTIONS(882), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6743] = 1,
    ACTIONS(884), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6749] = 1,
    ACTIONS(886), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6755] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(715), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6765] = 1,
    ACTIONS(888), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [6771] = 1,
    ACTIONS(890), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6777] = 3,
    ACTIONS(892), 1,
      sym__whitespace,
    ACTIONS(894), 1,
      anon_sym_LBRACK,
    STATE(560), 1,
      aux_sym_json_repeat1,
  [6787] = 1,
    ACTIONS(896), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [6793] = 1,
    ACTIONS(898), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6799] = 1,
    ACTIONS(900), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6805] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(723), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6815] = 1,
    ACTIONS(452), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6821] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(894), 1,
      anon_sym_LBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6831] = 3,
    ACTIONS(902), 1,
      sym__whitespace,
    ACTIONS(904), 1,
      anon_sym_COLON,
    STATE(476), 1,
      aux_sym_json_repeat1,
  [6841] = 1,
    ACTIONS(906), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [6847] = 1,
    ACTIONS(908), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [6853] = 1,
    ACTIONS(910), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6859] = 3,
    ACTIONS(912), 1,
      sym__whitespace,
    ACTIONS(914), 1,
      anon_sym_COLON,
    STATE(474), 1,
      aux_sym_json_repeat1,
  [6869] = 1,
    ACTIONS(916), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6875] = 3,
    ACTIONS(918), 1,
      sym__whitespace,
    ACTIONS(920), 1,
      anon_sym_COLON,
    STATE(472), 1,
      aux_sym_json_repeat1,
  [6885] = 3,
    ACTIONS(922), 1,
      sym__whitespace,
    ACTIONS(924), 1,
      anon_sym_COLON,
    STATE(470), 1,
      aux_sym_json_repeat1,
  [6895] = 1,
    ACTIONS(926), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6901] = 1,
    ACTIONS(928), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6907] = 3,
    ACTIONS(930), 1,
      sym__whitespace,
    ACTIONS(932), 1,
      anon_sym_COLON,
    STATE(468), 1,
      aux_sym_json_repeat1,
  [6917] = 3,
    ACTIONS(934), 1,
      sym__whitespace,
    ACTIONS(936), 1,
      anon_sym_COLON,
    STATE(466), 1,
      aux_sym_json_repeat1,
  [6927] = 3,
    ACTIONS(938), 1,
      sym__whitespace,
    ACTIONS(940), 1,
      anon_sym_DQUOTE,
    STATE(512), 1,
      aux_sym_json_repeat1,
  [6937] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(942), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6947] = 3,
    ACTIONS(944), 1,
      sym__whitespace,
    ACTIONS(946), 1,
      anon_sym_COLON,
    STATE(464), 1,
      aux_sym_json_repeat1,
  [6957] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(948), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6967] = 3,
    ACTIONS(950), 1,
      sym__whitespace,
    ACTIONS(952), 1,
      anon_sym_COLON,
    STATE(462), 1,
      aux_sym_json_repeat1,
  [6977] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(954), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [6987] = 3,
    ACTIONS(956), 1,
      sym__whitespace,
    ACTIONS(958), 1,
      anon_sym_COLON,
    STATE(460), 1,
      aux_sym_json_repeat1,
  [6997] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(960), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7007] = 3,
    ACTIONS(962), 1,
      sym__whitespace,
    ACTIONS(964), 1,
      anon_sym_COLON,
    STATE(458), 1,
      aux_sym_json_repeat1,
  [7017] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(966), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7027] = 3,
    ACTIONS(968), 1,
      sym__whitespace,
    ACTIONS(970), 1,
      anon_sym_COLON,
    STATE(456), 1,
      aux_sym_json_repeat1,
  [7037] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(972), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7047] = 3,
    ACTIONS(974), 1,
      sym__whitespace,
    ACTIONS(976), 1,
      anon_sym_COLON,
    STATE(454), 1,
      aux_sym_json_repeat1,
  [7057] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(978), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7067] = 1,
    ACTIONS(980), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7073] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(982), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7083] = 3,
    ACTIONS(984), 1,
      anon_sym_LBRACE,
    ACTIONS(986), 1,
      sym__whitespace,
    STATE(536), 1,
      aux_sym_json_repeat1,
  [7093] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(988), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7103] = 3,
    ACTIONS(990), 1,
      anon_sym_LBRACE,
    ACTIONS(992), 1,
      sym__whitespace,
    STATE(539), 1,
      aux_sym_json_repeat1,
  [7113] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(994), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7123] = 3,
    ACTIONS(996), 1,
      anon_sym_LBRACE,
    ACTIONS(998), 1,
      sym__whitespace,
    STATE(542), 1,
      aux_sym_json_repeat1,
  [7133] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1000), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7143] = 3,
    ACTIONS(1002), 1,
      anon_sym_LBRACE,
    ACTIONS(1004), 1,
      sym__whitespace,
    STATE(545), 1,
      aux_sym_json_repeat1,
  [7153] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1006), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7163] = 1,
    ACTIONS(1008), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7169] = 3,
    ACTIONS(1010), 1,
      anon_sym_LBRACE,
    ACTIONS(1012), 1,
      sym__whitespace,
    STATE(710), 1,
      aux_sym_json_repeat1,
  [7179] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7189] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(782), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7199] = 1,
    ACTIONS(1014), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7205] = 1,
    ACTIONS(1016), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7211] = 1,
    ACTIONS(1018), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7217] = 1,
    ACTIONS(1020), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7223] = 1,
    ACTIONS(1022), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7229] = 1,
    ACTIONS(1024), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7235] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1026), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7245] = 1,
    ACTIONS(1028), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7251] = 1,
    ACTIONS(1030), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7257] = 1,
    ACTIONS(1032), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7263] = 1,
    ACTIONS(1034), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7269] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1010), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7279] = 1,
    ACTIONS(1036), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7285] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1038), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7295] = 1,
    ACTIONS(1040), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7301] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1042), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7311] = 3,
    ACTIONS(1042), 1,
      anon_sym_LBRACE,
    ACTIONS(1044), 1,
      sym__whitespace,
    STATE(563), 1,
      aux_sym_json_repeat1,
  [7321] = 1,
    ACTIONS(1046), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7327] = 1,
    ACTIONS(1048), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7333] = 1,
    ACTIONS(1050), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7339] = 1,
    ACTIONS(1052), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7345] = 1,
    ACTIONS(1054), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7351] = 1,
    ACTIONS(1056), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7357] = 1,
    ACTIONS(1058), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7363] = 1,
    ACTIONS(1060), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7369] = 1,
    ACTIONS(1062), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7375] = 1,
    ACTIONS(1064), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7381] = 1,
    ACTIONS(1066), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7387] = 1,
    ACTIONS(1068), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7393] = 1,
    ACTIONS(475), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7399] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1070), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7409] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1072), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7419] = 3,
    ACTIONS(1072), 1,
      anon_sym_DQUOTE,
    ACTIONS(1074), 1,
      sym__whitespace,
    STATE(575), 1,
      aux_sym_json_repeat1,
  [7429] = 1,
    ACTIONS(1076), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7435] = 1,
    ACTIONS(1078), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7441] = 1,
    ACTIONS(1080), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7447] = 1,
    ACTIONS(1082), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7453] = 1,
    ACTIONS(1084), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7459] = 1,
    ACTIONS(1086), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7465] = 1,
    ACTIONS(1088), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7471] = 1,
    ACTIONS(492), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7477] = 3,
    ACTIONS(1090), 1,
      sym__whitespace,
    ACTIONS(1092), 1,
      anon_sym_COLON,
    STATE(427), 1,
      aux_sym_json_repeat1,
  [7487] = 1,
    ACTIONS(1094), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7493] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1096), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7503] = 3,
    ACTIONS(1098), 1,
      anon_sym_LBRACE,
    ACTIONS(1100), 1,
      sym__whitespace,
    STATE(424), 1,
      aux_sym_json_repeat1,
  [7513] = 1,
    ACTIONS(1102), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7519] = 1,
    ACTIONS(1104), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7525] = 1,
    ACTIONS(1106), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7531] = 1,
    ACTIONS(1108), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7537] = 1,
    ACTIONS(1110), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7543] = 1,
    ACTIONS(1112), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7549] = 1,
    ACTIONS(1114), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7555] = 1,
    ACTIONS(1116), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7561] = 1,
    ACTIONS(1118), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7567] = 1,
    ACTIONS(1120), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7573] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1122), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7583] = 3,
    ACTIONS(1122), 1,
      anon_sym_LBRACE,
    ACTIONS(1124), 1,
      sym__whitespace,
    STATE(595), 1,
      aux_sym_json_repeat1,
  [7593] = 1,
    ACTIONS(1126), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7599] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1128), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7609] = 3,
    ACTIONS(1128), 1,
      anon_sym_LBRACE,
    ACTIONS(1130), 1,
      sym__whitespace,
    STATE(600), 1,
      aux_sym_json_repeat1,
  [7619] = 3,
    ACTIONS(1132), 1,
      sym__whitespace,
    ACTIONS(1134), 1,
      anon_sym_LBRACK,
    STATE(631), 1,
      aux_sym_json_repeat1,
  [7629] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1136), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7639] = 3,
    ACTIONS(1136), 1,
      anon_sym_LBRACE,
    ACTIONS(1138), 1,
      sym__whitespace,
    STATE(605), 1,
      aux_sym_json_repeat1,
  [7649] = 1,
    ACTIONS(1140), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7655] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1142), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7665] = 3,
    ACTIONS(1142), 1,
      anon_sym_LBRACE,
    ACTIONS(1144), 1,
      sym__whitespace,
    STATE(610), 1,
      aux_sym_json_repeat1,
  [7675] = 1,
    ACTIONS(1146), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7681] = 1,
    ACTIONS(1148), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7687] = 1,
    ACTIONS(1150), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7693] = 1,
    ACTIONS(1152), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7699] = 1,
    ACTIONS(1154), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7705] = 3,
    ACTIONS(1156), 1,
      anon_sym_LBRACE,
    ACTIONS(1158), 1,
      sym__whitespace,
    STATE(604), 1,
      aux_sym_json_repeat1,
  [7715] = 1,
    ACTIONS(1160), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7721] = 1,
    ACTIONS(1162), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7727] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1156), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7737] = 1,
    ACTIONS(1164), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7743] = 1,
    ACTIONS(1166), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7749] = 1,
    ACTIONS(1168), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7755] = 1,
    ACTIONS(1170), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7761] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1172), 1,
      anon_sym_LBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7771] = 1,
    ACTIONS(1174), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7777] = 1,
    ACTIONS(1176), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7783] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1178), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7793] = 1,
    ACTIONS(1180), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7799] = 1,
    ACTIONS(1182), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7805] = 1,
    ACTIONS(1184), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7811] = 1,
    ACTIONS(1186), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7817] = 1,
    ACTIONS(1188), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7823] = 1,
    ACTIONS(1190), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7829] = 2,
    STATE(307), 1,
      aux_sym_repo_repeat1,
    ACTIONS(693), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [7837] = 1,
    ACTIONS(1192), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7843] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(719), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7853] = 1,
    ACTIONS(1194), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7859] = 1,
    ACTIONS(1196), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7865] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1198), 1,
      anon_sym_DQUOTE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7875] = 1,
    ACTIONS(1200), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7881] = 1,
    ACTIONS(1202), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7887] = 1,
    ACTIONS(1204), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7893] = 1,
    ACTIONS(1206), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7899] = 1,
    ACTIONS(1208), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7905] = 1,
    ACTIONS(1210), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7911] = 1,
    ACTIONS(1212), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7917] = 1,
    ACTIONS(1214), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7923] = 1,
    ACTIONS(1216), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7929] = 1,
    ACTIONS(1218), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7935] = 1,
    ACTIONS(1220), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7941] = 1,
    ACTIONS(1222), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7947] = 1,
    ACTIONS(1224), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7953] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1226), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7963] = 1,
    ACTIONS(1228), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7969] = 1,
    ACTIONS(1230), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7975] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1232), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7985] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1234), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [7995] = 1,
    ACTIONS(1236), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8001] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1238), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8011] = 1,
    ACTIONS(1240), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8017] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1242), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8027] = 1,
    ACTIONS(1244), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8033] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1246), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8043] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1248), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8053] = 3,
    ACTIONS(1250), 1,
      sym__whitespace,
    ACTIONS(1252), 1,
      anon_sym_COLON,
    STATE(589), 1,
      aux_sym_json_repeat1,
  [8063] = 1,
    ACTIONS(1254), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8069] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1134), 1,
      anon_sym_LBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8079] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1256), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8089] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1258), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8099] = 1,
    ACTIONS(1260), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8105] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1262), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8115] = 1,
    ACTIONS(1264), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8121] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1266), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8131] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1268), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8141] = 1,
    ACTIONS(1270), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8147] = 1,
    ACTIONS(304), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8153] = 3,
    ACTIONS(1272), 1,
      sym__whitespace,
    ACTIONS(1274), 1,
      anon_sym_LBRACK,
    STATE(440), 1,
      aux_sym_json_repeat1,
  [8163] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1276), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8173] = 1,
    ACTIONS(1278), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8179] = 1,
    ACTIONS(542), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8185] = 3,
    ACTIONS(1280), 1,
      sym__whitespace,
    ACTIONS(1282), 1,
      anon_sym_COLON,
    STATE(487), 1,
      aux_sym_json_repeat1,
  [8195] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1284), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8205] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1286), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8215] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1288), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8225] = 1,
    ACTIONS(1290), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8231] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8241] = 3,
    ACTIONS(1292), 1,
      anon_sym_LBRACE,
    ACTIONS(1294), 1,
      sym__whitespace,
    STATE(492), 1,
      aux_sym_json_repeat1,
  [8251] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1296), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8261] = 1,
    ACTIONS(1298), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8267] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1300), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8277] = 1,
    ACTIONS(1302), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8283] = 1,
    ACTIONS(1304), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8289] = 1,
    ACTIONS(1306), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8295] = 1,
    ACTIONS(1308), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8301] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1310), 1,
      anon_sym_LBRACK,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8311] = 1,
    ACTIONS(1312), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8317] = 1,
    ACTIONS(628), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8323] = 1,
    ACTIONS(1314), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8329] = 1,
    ACTIONS(1316), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8335] = 1,
    ACTIONS(1318), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8341] = 1,
    ACTIONS(1320), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8347] = 1,
    ACTIONS(1322), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8353] = 1,
    ACTIONS(1324), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8359] = 1,
    ACTIONS(1326), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8365] = 1,
    ACTIONS(1328), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8371] = 1,
    ACTIONS(1330), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8377] = 1,
    ACTIONS(1332), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8383] = 1,
    ACTIONS(1334), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8389] = 1,
    ACTIONS(1336), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8395] = 1,
    ACTIONS(1338), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8401] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1340), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8411] = 3,
    ACTIONS(1342), 1,
      sym__whitespace,
    ACTIONS(1344), 1,
      anon_sym_LBRACK,
    STATE(603), 1,
      aux_sym_json_repeat1,
  [8421] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1346), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8431] = 1,
    ACTIONS(1348), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8437] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(685), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8447] = 3,
    ACTIONS(1350), 1,
      anon_sym_LBRACE,
    ACTIONS(1352), 1,
      sym__whitespace,
    STATE(555), 1,
      aux_sym_json_repeat1,
  [8457] = 1,
    ACTIONS(1354), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8463] = 1,
    ACTIONS(1356), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8469] = 1,
    ACTIONS(1358), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8475] = 1,
    ACTIONS(1360), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8481] = 1,
    ACTIONS(1362), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8487] = 1,
    ACTIONS(1364), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8493] = 1,
    ACTIONS(1366), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8499] = 1,
    ACTIONS(1368), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8505] = 1,
    ACTIONS(219), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8511] = 1,
    ACTIONS(1370), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8517] = 1,
    ACTIONS(1372), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8523] = 1,
    ACTIONS(1374), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8529] = 3,
    ACTIONS(1376), 1,
      sym__whitespace,
    ACTIONS(1378), 1,
      anon_sym_COLON,
    STATE(592), 1,
      aux_sym_json_repeat1,
  [8539] = 3,
    ACTIONS(1380), 1,
      sym__whitespace,
    ACTIONS(1382), 1,
      anon_sym_COLON,
    STATE(593), 1,
      aux_sym_json_repeat1,
  [8549] = 3,
    ACTIONS(1384), 1,
      sym__whitespace,
    ACTIONS(1386), 1,
      anon_sym_COLON,
    STATE(597), 1,
      aux_sym_json_repeat1,
  [8559] = 1,
    ACTIONS(1388), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8565] = 3,
    ACTIONS(1390), 1,
      sym__whitespace,
    ACTIONS(1392), 1,
      anon_sym_COLON,
    STATE(599), 1,
      aux_sym_json_repeat1,
  [8575] = 1,
    ACTIONS(1394), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8581] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(681), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8591] = 1,
    ACTIONS(1396), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8597] = 3,
    ACTIONS(1398), 1,
      sym__whitespace,
    ACTIONS(1400), 1,
      anon_sym_COLON,
    STATE(419), 1,
      aux_sym_json_repeat1,
  [8607] = 3,
    ACTIONS(1402), 1,
      sym__whitespace,
    ACTIONS(1404), 1,
      anon_sym_COLON,
    STATE(607), 1,
      aux_sym_json_repeat1,
  [8617] = 1,
    ACTIONS(1406), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8623] = 1,
    ACTIONS(1408), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8629] = 3,
    ACTIONS(1410), 1,
      sym__whitespace,
    ACTIONS(1412), 1,
      anon_sym_COLON,
    STATE(609), 1,
      aux_sym_json_repeat1,
  [8639] = 3,
    ACTIONS(1414), 1,
      sym__whitespace,
    ACTIONS(1416), 1,
      anon_sym_COLON,
    STATE(614), 1,
      aux_sym_json_repeat1,
  [8649] = 3,
    ACTIONS(1418), 1,
      sym__whitespace,
    ACTIONS(1420), 1,
      anon_sym_COLON,
    STATE(618), 1,
      aux_sym_json_repeat1,
  [8659] = 1,
    ACTIONS(1422), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8665] = 1,
    ACTIONS(1424), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8671] = 3,
    ACTIONS(1426), 1,
      sym__whitespace,
    ACTIONS(1428), 1,
      anon_sym_COLON,
    STATE(718), 1,
      aux_sym_json_repeat1,
  [8681] = 1,
    ACTIONS(1430), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8687] = 1,
    ACTIONS(245), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8693] = 1,
    ACTIONS(1432), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8699] = 1,
    ACTIONS(1434), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8705] = 1,
    ACTIONS(1436), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8711] = 1,
    ACTIONS(1438), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8717] = 3,
    ACTIONS(1440), 1,
      sym__whitespace,
    ACTIONS(1442), 1,
      anon_sym_COLON,
    STATE(620), 1,
      aux_sym_json_repeat1,
  [8727] = 3,
    ACTIONS(1444), 1,
      sym__whitespace,
    ACTIONS(1446), 1,
      anon_sym_COLON,
    STATE(624), 1,
      aux_sym_json_repeat1,
  [8737] = 3,
    ACTIONS(1448), 1,
      sym__whitespace,
    ACTIONS(1450), 1,
      anon_sym_COLON,
    STATE(626), 1,
      aux_sym_json_repeat1,
  [8747] = 3,
    ACTIONS(1452), 1,
      sym__whitespace,
    ACTIONS(1454), 1,
      anon_sym_COLON,
    STATE(511), 1,
      aux_sym_json_repeat1,
  [8757] = 1,
    ACTIONS(1456), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8763] = 1,
    ACTIONS(1458), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8769] = 3,
    ACTIONS(1460), 1,
      sym__whitespace,
    ACTIONS(1462), 1,
      anon_sym_COLON,
    STATE(647), 1,
      aux_sym_json_repeat1,
  [8779] = 3,
    ACTIONS(1464), 1,
      sym__whitespace,
    ACTIONS(1466), 1,
      anon_sym_COLON,
    STATE(649), 1,
      aux_sym_json_repeat1,
  [8789] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1252), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8799] = 1,
    ACTIONS(1468), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8805] = 1,
    ACTIONS(1470), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8811] = 1,
    ACTIONS(1472), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8817] = 3,
    ACTIONS(5), 1,
      anon_sym_LBRACE,
    ACTIONS(1474), 1,
      ts_builtin_sym_end,
    STATE(711), 1,
      aux_sym_json_repeat3,
  [8827] = 1,
    ACTIONS(1476), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8833] = 1,
    ACTIONS(1478), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8839] = 1,
    ACTIONS(1480), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8845] = 1,
    ACTIONS(1482), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8851] = 1,
    ACTIONS(1484), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8857] = 1,
    ACTIONS(1486), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8863] = 1,
    ACTIONS(1488), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8869] = 1,
    ACTIONS(1490), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8875] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1492), 1,
      anon_sym_LBRACE,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8885] = 3,
    ACTIONS(1494), 1,
      ts_builtin_sym_end,
    ACTIONS(1496), 1,
      anon_sym_LBRACE,
    STATE(711), 1,
      aux_sym_json_repeat3,
  [8895] = 1,
    ACTIONS(1499), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8901] = 1,
    ACTIONS(1501), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8907] = 1,
    ACTIONS(613), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8913] = 1,
    ACTIONS(1503), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8919] = 1,
    ACTIONS(1505), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8925] = 3,
    ACTIONS(1507), 1,
      sym__whitespace,
    ACTIONS(1509), 1,
      anon_sym_COLON,
    STATE(524), 1,
      aux_sym_json_repeat1,
  [8935] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1511), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8945] = 3,
    ACTIONS(1513), 1,
      sym__whitespace,
    ACTIONS(1515), 1,
      anon_sym_COLON,
    STATE(733), 1,
      aux_sym_json_repeat1,
  [8955] = 1,
    ACTIONS(1517), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8961] = 1,
    ACTIONS(1519), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8967] = 1,
    ACTIONS(1521), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8973] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(667), 1,
      anon_sym_COMMA,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [8983] = 1,
    ACTIONS(1523), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8989] = 3,
    ACTIONS(1525), 1,
      sym__whitespace,
    ACTIONS(1527), 1,
      anon_sym_COLON,
    STATE(697), 1,
      aux_sym_json_repeat1,
  [8999] = 3,
    ACTIONS(1529), 1,
      sym__whitespace,
    ACTIONS(1531), 1,
      anon_sym_COLON,
    STATE(619), 1,
      aux_sym_json_repeat1,
  [9009] = 1,
    ACTIONS(1533), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9015] = 1,
    ACTIONS(1535), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9021] = 1,
    ACTIONS(1537), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9027] = 1,
    ACTIONS(1539), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9033] = 1,
    ACTIONS(1541), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9039] = 1,
    ACTIONS(1543), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9045] = 3,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(1545), 1,
      anon_sym_COLON,
    STATE(32), 1,
      aux_sym_json_repeat1,
  [9055] = 1,
    ACTIONS(1547), 3,
      anon_sym_DQUOTE,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [9061] = 1,
    ACTIONS(1549), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9067] = 1,
    ACTIONS(1551), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9073] = 1,
    ACTIONS(1553), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9079] = 1,
    ACTIONS(1555), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9085] = 1,
    ACTIONS(1557), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9091] = 1,
    ACTIONS(1559), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9097] = 1,
    ACTIONS(1561), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9103] = 1,
    ACTIONS(1563), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9109] = 1,
    ACTIONS(1565), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9115] = 1,
    ACTIONS(1567), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9120] = 1,
    ACTIONS(1569), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9125] = 1,
    ACTIONS(1571), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9130] = 2,
    ACTIONS(33), 1,
      anon_sym_DQUOTE,
    ACTIONS(1573), 1,
      sym__string_content,
  [9137] = 1,
    ACTIONS(1575), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9142] = 1,
    ACTIONS(1494), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9147] = 2,
    ACTIONS(1577), 1,
      anon_sym_DQUOTE,
    ACTIONS(1579), 1,
      sym__string_content,
  [9154] = 1,
    ACTIONS(1581), 1,
      anon_sym_DQUOTE,
  [9158] = 1,
    ACTIONS(1583), 1,
      anon_sym_DQUOTE,
  [9162] = 1,
    ACTIONS(1585), 1,
      anon_sym_DQUOTE,
  [9166] = 1,
    ACTIONS(1587), 1,
      anon_sym_DQUOTE,
  [9170] = 1,
    ACTIONS(1589), 1,
      anon_sym_DQUOTE,
  [9174] = 1,
    ACTIONS(1591), 1,
      anon_sym_DQUOTE,
  [9178] = 1,
    ACTIONS(1593), 1,
      anon_sym_DQUOTE,
  [9182] = 1,
    ACTIONS(1595), 1,
      anon_sym_DQUOTE,
  [9186] = 1,
    ACTIONS(1597), 1,
      anon_sym_DQUOTE,
  [9190] = 1,
    ACTIONS(1599), 1,
      anon_sym_DQUOTE,
  [9194] = 1,
    ACTIONS(1601), 1,
      anon_sym_DQUOTE,
  [9198] = 1,
    ACTIONS(1603), 1,
      anon_sym_DQUOTE,
  [9202] = 1,
    ACTIONS(1605), 1,
      anon_sym_DQUOTE,
  [9206] = 1,
    ACTIONS(1607), 1,
      anon_sym_DQUOTE,
  [9210] = 1,
    ACTIONS(1609), 1,
      anon_sym_DQUOTE,
  [9214] = 1,
    ACTIONS(1611), 1,
      anon_sym_DQUOTE,
  [9218] = 1,
    ACTIONS(1613), 1,
      anon_sym_DQUOTE,
  [9222] = 1,
    ACTIONS(1615), 1,
      anon_sym_DQUOTE,
  [9226] = 1,
    ACTIONS(1617), 1,
      aux_sym_capture_token1,
  [9230] = 1,
    ACTIONS(1619), 1,
      anon_sym_DQUOTE,
  [9234] = 1,
    ACTIONS(1621), 1,
      anon_sym_DQUOTE,
  [9238] = 1,
    ACTIONS(1623), 1,
      anon_sym_DQUOTE,
  [9242] = 1,
    ACTIONS(1625), 1,
      anon_sym_DQUOTE,
  [9246] = 1,
    ACTIONS(1627), 1,
      anon_sym_DQUOTE,
  [9250] = 1,
    ACTIONS(1629), 1,
      anon_sym_DQUOTE,
  [9254] = 1,
    ACTIONS(212), 1,
      anon_sym_DQUOTE,
  [9258] = 1,
    ACTIONS(1631), 1,
      anon_sym_DQUOTE,
  [9262] = 1,
    ACTIONS(1633), 1,
      anon_sym_DQUOTE,
  [9266] = 1,
    ACTIONS(1635), 1,
      anon_sym_DQUOTE,
  [9270] = 1,
    ACTIONS(1637), 1,
      anon_sym_DQUOTE,
  [9274] = 1,
    ACTIONS(1639), 1,
      anon_sym_DQUOTE,
  [9278] = 1,
    ACTIONS(1641), 1,
      ts_builtin_sym_end,
  [9282] = 1,
    ACTIONS(1643), 1,
      anon_sym_DQUOTE,
  [9286] = 1,
    ACTIONS(1645), 1,
      anon_sym_DQUOTE,
  [9290] = 1,
    ACTIONS(1647), 1,
      anon_sym_DQUOTE,
  [9294] = 1,
    ACTIONS(1649), 1,
      anon_sym_DQUOTE,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 33,
  [SMALL_STATE(4)] = 66,
  [SMALL_STATE(5)] = 98,
  [SMALL_STATE(6)] = 128,
  [SMALL_STATE(7)] = 158,
  [SMALL_STATE(8)] = 188,
  [SMALL_STATE(9)] = 218,
  [SMALL_STATE(10)] = 250,
  [SMALL_STATE(11)] = 279,
  [SMALL_STATE(12)] = 308,
  [SMALL_STATE(13)] = 337,
  [SMALL_STATE(14)] = 366,
  [SMALL_STATE(15)] = 421,
  [SMALL_STATE(16)] = 473,
  [SMALL_STATE(17)] = 509,
  [SMALL_STATE(18)] = 545,
  [SMALL_STATE(19)] = 581,
  [SMALL_STATE(20)] = 617,
  [SMALL_STATE(21)] = 650,
  [SMALL_STATE(22)] = 683,
  [SMALL_STATE(23)] = 716,
  [SMALL_STATE(24)] = 749,
  [SMALL_STATE(25)] = 781,
  [SMALL_STATE(26)] = 813,
  [SMALL_STATE(27)] = 845,
  [SMALL_STATE(28)] = 877,
  [SMALL_STATE(29)] = 909,
  [SMALL_STATE(30)] = 941,
  [SMALL_STATE(31)] = 973,
  [SMALL_STATE(32)] = 1005,
  [SMALL_STATE(33)] = 1025,
  [SMALL_STATE(34)] = 1057,
  [SMALL_STATE(35)] = 1089,
  [SMALL_STATE(36)] = 1109,
  [SMALL_STATE(37)] = 1129,
  [SMALL_STATE(38)] = 1149,
  [SMALL_STATE(39)] = 1169,
  [SMALL_STATE(40)] = 1189,
  [SMALL_STATE(41)] = 1209,
  [SMALL_STATE(42)] = 1229,
  [SMALL_STATE(43)] = 1249,
  [SMALL_STATE(44)] = 1269,
  [SMALL_STATE(45)] = 1289,
  [SMALL_STATE(46)] = 1309,
  [SMALL_STATE(47)] = 1329,
  [SMALL_STATE(48)] = 1350,
  [SMALL_STATE(49)] = 1371,
  [SMALL_STATE(50)] = 1388,
  [SMALL_STATE(51)] = 1409,
  [SMALL_STATE(52)] = 1426,
  [SMALL_STATE(53)] = 1443,
  [SMALL_STATE(54)] = 1464,
  [SMALL_STATE(55)] = 1481,
  [SMALL_STATE(56)] = 1498,
  [SMALL_STATE(57)] = 1515,
  [SMALL_STATE(58)] = 1532,
  [SMALL_STATE(59)] = 1549,
  [SMALL_STATE(60)] = 1565,
  [SMALL_STATE(61)] = 1581,
  [SMALL_STATE(62)] = 1597,
  [SMALL_STATE(63)] = 1613,
  [SMALL_STATE(64)] = 1629,
  [SMALL_STATE(65)] = 1645,
  [SMALL_STATE(66)] = 1661,
  [SMALL_STATE(67)] = 1677,
  [SMALL_STATE(68)] = 1693,
  [SMALL_STATE(69)] = 1709,
  [SMALL_STATE(70)] = 1725,
  [SMALL_STATE(71)] = 1741,
  [SMALL_STATE(72)] = 1757,
  [SMALL_STATE(73)] = 1773,
  [SMALL_STATE(74)] = 1789,
  [SMALL_STATE(75)] = 1805,
  [SMALL_STATE(76)] = 1821,
  [SMALL_STATE(77)] = 1837,
  [SMALL_STATE(78)] = 1853,
  [SMALL_STATE(79)] = 1869,
  [SMALL_STATE(80)] = 1885,
  [SMALL_STATE(81)] = 1901,
  [SMALL_STATE(82)] = 1917,
  [SMALL_STATE(83)] = 1933,
  [SMALL_STATE(84)] = 1949,
  [SMALL_STATE(85)] = 1965,
  [SMALL_STATE(86)] = 1981,
  [SMALL_STATE(87)] = 1997,
  [SMALL_STATE(88)] = 2013,
  [SMALL_STATE(89)] = 2029,
  [SMALL_STATE(90)] = 2041,
  [SMALL_STATE(91)] = 2057,
  [SMALL_STATE(92)] = 2073,
  [SMALL_STATE(93)] = 2089,
  [SMALL_STATE(94)] = 2105,
  [SMALL_STATE(95)] = 2121,
  [SMALL_STATE(96)] = 2137,
  [SMALL_STATE(97)] = 2153,
  [SMALL_STATE(98)] = 2169,
  [SMALL_STATE(99)] = 2185,
  [SMALL_STATE(100)] = 2201,
  [SMALL_STATE(101)] = 2217,
  [SMALL_STATE(102)] = 2233,
  [SMALL_STATE(103)] = 2249,
  [SMALL_STATE(104)] = 2265,
  [SMALL_STATE(105)] = 2281,
  [SMALL_STATE(106)] = 2297,
  [SMALL_STATE(107)] = 2313,
  [SMALL_STATE(108)] = 2329,
  [SMALL_STATE(109)] = 2345,
  [SMALL_STATE(110)] = 2361,
  [SMALL_STATE(111)] = 2377,
  [SMALL_STATE(112)] = 2393,
  [SMALL_STATE(113)] = 2409,
  [SMALL_STATE(114)] = 2425,
  [SMALL_STATE(115)] = 2441,
  [SMALL_STATE(116)] = 2457,
  [SMALL_STATE(117)] = 2473,
  [SMALL_STATE(118)] = 2489,
  [SMALL_STATE(119)] = 2505,
  [SMALL_STATE(120)] = 2521,
  [SMALL_STATE(121)] = 2537,
  [SMALL_STATE(122)] = 2553,
  [SMALL_STATE(123)] = 2569,
  [SMALL_STATE(124)] = 2585,
  [SMALL_STATE(125)] = 2601,
  [SMALL_STATE(126)] = 2617,
  [SMALL_STATE(127)] = 2633,
  [SMALL_STATE(128)] = 2649,
  [SMALL_STATE(129)] = 2665,
  [SMALL_STATE(130)] = 2681,
  [SMALL_STATE(131)] = 2697,
  [SMALL_STATE(132)] = 2713,
  [SMALL_STATE(133)] = 2729,
  [SMALL_STATE(134)] = 2745,
  [SMALL_STATE(135)] = 2761,
  [SMALL_STATE(136)] = 2777,
  [SMALL_STATE(137)] = 2793,
  [SMALL_STATE(138)] = 2809,
  [SMALL_STATE(139)] = 2825,
  [SMALL_STATE(140)] = 2841,
  [SMALL_STATE(141)] = 2857,
  [SMALL_STATE(142)] = 2873,
  [SMALL_STATE(143)] = 2889,
  [SMALL_STATE(144)] = 2905,
  [SMALL_STATE(145)] = 2921,
  [SMALL_STATE(146)] = 2937,
  [SMALL_STATE(147)] = 2953,
  [SMALL_STATE(148)] = 2969,
  [SMALL_STATE(149)] = 2985,
  [SMALL_STATE(150)] = 3001,
  [SMALL_STATE(151)] = 3017,
  [SMALL_STATE(152)] = 3033,
  [SMALL_STATE(153)] = 3049,
  [SMALL_STATE(154)] = 3065,
  [SMALL_STATE(155)] = 3081,
  [SMALL_STATE(156)] = 3097,
  [SMALL_STATE(157)] = 3113,
  [SMALL_STATE(158)] = 3129,
  [SMALL_STATE(159)] = 3145,
  [SMALL_STATE(160)] = 3161,
  [SMALL_STATE(161)] = 3177,
  [SMALL_STATE(162)] = 3193,
  [SMALL_STATE(163)] = 3209,
  [SMALL_STATE(164)] = 3225,
  [SMALL_STATE(165)] = 3241,
  [SMALL_STATE(166)] = 3257,
  [SMALL_STATE(167)] = 3273,
  [SMALL_STATE(168)] = 3289,
  [SMALL_STATE(169)] = 3305,
  [SMALL_STATE(170)] = 3321,
  [SMALL_STATE(171)] = 3337,
  [SMALL_STATE(172)] = 3353,
  [SMALL_STATE(173)] = 3369,
  [SMALL_STATE(174)] = 3385,
  [SMALL_STATE(175)] = 3401,
  [SMALL_STATE(176)] = 3417,
  [SMALL_STATE(177)] = 3433,
  [SMALL_STATE(178)] = 3449,
  [SMALL_STATE(179)] = 3465,
  [SMALL_STATE(180)] = 3481,
  [SMALL_STATE(181)] = 3497,
  [SMALL_STATE(182)] = 3513,
  [SMALL_STATE(183)] = 3529,
  [SMALL_STATE(184)] = 3545,
  [SMALL_STATE(185)] = 3561,
  [SMALL_STATE(186)] = 3577,
  [SMALL_STATE(187)] = 3593,
  [SMALL_STATE(188)] = 3609,
  [SMALL_STATE(189)] = 3625,
  [SMALL_STATE(190)] = 3641,
  [SMALL_STATE(191)] = 3657,
  [SMALL_STATE(192)] = 3673,
  [SMALL_STATE(193)] = 3689,
  [SMALL_STATE(194)] = 3705,
  [SMALL_STATE(195)] = 3721,
  [SMALL_STATE(196)] = 3737,
  [SMALL_STATE(197)] = 3753,
  [SMALL_STATE(198)] = 3769,
  [SMALL_STATE(199)] = 3785,
  [SMALL_STATE(200)] = 3801,
  [SMALL_STATE(201)] = 3817,
  [SMALL_STATE(202)] = 3833,
  [SMALL_STATE(203)] = 3849,
  [SMALL_STATE(204)] = 3865,
  [SMALL_STATE(205)] = 3881,
  [SMALL_STATE(206)] = 3897,
  [SMALL_STATE(207)] = 3913,
  [SMALL_STATE(208)] = 3929,
  [SMALL_STATE(209)] = 3945,
  [SMALL_STATE(210)] = 3961,
  [SMALL_STATE(211)] = 3977,
  [SMALL_STATE(212)] = 3993,
  [SMALL_STATE(213)] = 4009,
  [SMALL_STATE(214)] = 4025,
  [SMALL_STATE(215)] = 4041,
  [SMALL_STATE(216)] = 4057,
  [SMALL_STATE(217)] = 4073,
  [SMALL_STATE(218)] = 4089,
  [SMALL_STATE(219)] = 4105,
  [SMALL_STATE(220)] = 4121,
  [SMALL_STATE(221)] = 4137,
  [SMALL_STATE(222)] = 4153,
  [SMALL_STATE(223)] = 4169,
  [SMALL_STATE(224)] = 4185,
  [SMALL_STATE(225)] = 4201,
  [SMALL_STATE(226)] = 4217,
  [SMALL_STATE(227)] = 4233,
  [SMALL_STATE(228)] = 4246,
  [SMALL_STATE(229)] = 4259,
  [SMALL_STATE(230)] = 4272,
  [SMALL_STATE(231)] = 4285,
  [SMALL_STATE(232)] = 4298,
  [SMALL_STATE(233)] = 4311,
  [SMALL_STATE(234)] = 4324,
  [SMALL_STATE(235)] = 4337,
  [SMALL_STATE(236)] = 4350,
  [SMALL_STATE(237)] = 4363,
  [SMALL_STATE(238)] = 4376,
  [SMALL_STATE(239)] = 4389,
  [SMALL_STATE(240)] = 4402,
  [SMALL_STATE(241)] = 4415,
  [SMALL_STATE(242)] = 4428,
  [SMALL_STATE(243)] = 4441,
  [SMALL_STATE(244)] = 4454,
  [SMALL_STATE(245)] = 4467,
  [SMALL_STATE(246)] = 4480,
  [SMALL_STATE(247)] = 4493,
  [SMALL_STATE(248)] = 4506,
  [SMALL_STATE(249)] = 4519,
  [SMALL_STATE(250)] = 4532,
  [SMALL_STATE(251)] = 4545,
  [SMALL_STATE(252)] = 4558,
  [SMALL_STATE(253)] = 4571,
  [SMALL_STATE(254)] = 4584,
  [SMALL_STATE(255)] = 4595,
  [SMALL_STATE(256)] = 4608,
  [SMALL_STATE(257)] = 4621,
  [SMALL_STATE(258)] = 4634,
  [SMALL_STATE(259)] = 4641,
  [SMALL_STATE(260)] = 4654,
  [SMALL_STATE(261)] = 4667,
  [SMALL_STATE(262)] = 4680,
  [SMALL_STATE(263)] = 4693,
  [SMALL_STATE(264)] = 4706,
  [SMALL_STATE(265)] = 4719,
  [SMALL_STATE(266)] = 4732,
  [SMALL_STATE(267)] = 4745,
  [SMALL_STATE(268)] = 4758,
  [SMALL_STATE(269)] = 4771,
  [SMALL_STATE(270)] = 4784,
  [SMALL_STATE(271)] = 4797,
  [SMALL_STATE(272)] = 4810,
  [SMALL_STATE(273)] = 4821,
  [SMALL_STATE(274)] = 4834,
  [SMALL_STATE(275)] = 4847,
  [SMALL_STATE(276)] = 4860,
  [SMALL_STATE(277)] = 4873,
  [SMALL_STATE(278)] = 4884,
  [SMALL_STATE(279)] = 4897,
  [SMALL_STATE(280)] = 4910,
  [SMALL_STATE(281)] = 4923,
  [SMALL_STATE(282)] = 4936,
  [SMALL_STATE(283)] = 4949,
  [SMALL_STATE(284)] = 4962,
  [SMALL_STATE(285)] = 4975,
  [SMALL_STATE(286)] = 4988,
  [SMALL_STATE(287)] = 5001,
  [SMALL_STATE(288)] = 5014,
  [SMALL_STATE(289)] = 5027,
  [SMALL_STATE(290)] = 5040,
  [SMALL_STATE(291)] = 5051,
  [SMALL_STATE(292)] = 5064,
  [SMALL_STATE(293)] = 5077,
  [SMALL_STATE(294)] = 5090,
  [SMALL_STATE(295)] = 5103,
  [SMALL_STATE(296)] = 5116,
  [SMALL_STATE(297)] = 5123,
  [SMALL_STATE(298)] = 5136,
  [SMALL_STATE(299)] = 5143,
  [SMALL_STATE(300)] = 5156,
  [SMALL_STATE(301)] = 5169,
  [SMALL_STATE(302)] = 5182,
  [SMALL_STATE(303)] = 5195,
  [SMALL_STATE(304)] = 5208,
  [SMALL_STATE(305)] = 5219,
  [SMALL_STATE(306)] = 5232,
  [SMALL_STATE(307)] = 5245,
  [SMALL_STATE(308)] = 5256,
  [SMALL_STATE(309)] = 5269,
  [SMALL_STATE(310)] = 5282,
  [SMALL_STATE(311)] = 5295,
  [SMALL_STATE(312)] = 5308,
  [SMALL_STATE(313)] = 5321,
  [SMALL_STATE(314)] = 5334,
  [SMALL_STATE(315)] = 5345,
  [SMALL_STATE(316)] = 5358,
  [SMALL_STATE(317)] = 5371,
  [SMALL_STATE(318)] = 5384,
  [SMALL_STATE(319)] = 5397,
  [SMALL_STATE(320)] = 5410,
  [SMALL_STATE(321)] = 5423,
  [SMALL_STATE(322)] = 5434,
  [SMALL_STATE(323)] = 5447,
  [SMALL_STATE(324)] = 5460,
  [SMALL_STATE(325)] = 5473,
  [SMALL_STATE(326)] = 5486,
  [SMALL_STATE(327)] = 5499,
  [SMALL_STATE(328)] = 5512,
  [SMALL_STATE(329)] = 5525,
  [SMALL_STATE(330)] = 5538,
  [SMALL_STATE(331)] = 5551,
  [SMALL_STATE(332)] = 5564,
  [SMALL_STATE(333)] = 5577,
  [SMALL_STATE(334)] = 5584,
  [SMALL_STATE(335)] = 5597,
  [SMALL_STATE(336)] = 5610,
  [SMALL_STATE(337)] = 5623,
  [SMALL_STATE(338)] = 5630,
  [SMALL_STATE(339)] = 5643,
  [SMALL_STATE(340)] = 5650,
  [SMALL_STATE(341)] = 5663,
  [SMALL_STATE(342)] = 5676,
  [SMALL_STATE(343)] = 5689,
  [SMALL_STATE(344)] = 5702,
  [SMALL_STATE(345)] = 5715,
  [SMALL_STATE(346)] = 5728,
  [SMALL_STATE(347)] = 5735,
  [SMALL_STATE(348)] = 5748,
  [SMALL_STATE(349)] = 5761,
  [SMALL_STATE(350)] = 5774,
  [SMALL_STATE(351)] = 5787,
  [SMALL_STATE(352)] = 5800,
  [SMALL_STATE(353)] = 5813,
  [SMALL_STATE(354)] = 5826,
  [SMALL_STATE(355)] = 5839,
  [SMALL_STATE(356)] = 5852,
  [SMALL_STATE(357)] = 5865,
  [SMALL_STATE(358)] = 5878,
  [SMALL_STATE(359)] = 5891,
  [SMALL_STATE(360)] = 5904,
  [SMALL_STATE(361)] = 5917,
  [SMALL_STATE(362)] = 5930,
  [SMALL_STATE(363)] = 5943,
  [SMALL_STATE(364)] = 5956,
  [SMALL_STATE(365)] = 5969,
  [SMALL_STATE(366)] = 5982,
  [SMALL_STATE(367)] = 5995,
  [SMALL_STATE(368)] = 6008,
  [SMALL_STATE(369)] = 6021,
  [SMALL_STATE(370)] = 6034,
  [SMALL_STATE(371)] = 6047,
  [SMALL_STATE(372)] = 6060,
  [SMALL_STATE(373)] = 6073,
  [SMALL_STATE(374)] = 6086,
  [SMALL_STATE(375)] = 6099,
  [SMALL_STATE(376)] = 6112,
  [SMALL_STATE(377)] = 6125,
  [SMALL_STATE(378)] = 6138,
  [SMALL_STATE(379)] = 6151,
  [SMALL_STATE(380)] = 6164,
  [SMALL_STATE(381)] = 6177,
  [SMALL_STATE(382)] = 6190,
  [SMALL_STATE(383)] = 6203,
  [SMALL_STATE(384)] = 6216,
  [SMALL_STATE(385)] = 6229,
  [SMALL_STATE(386)] = 6242,
  [SMALL_STATE(387)] = 6255,
  [SMALL_STATE(388)] = 6268,
  [SMALL_STATE(389)] = 6281,
  [SMALL_STATE(390)] = 6288,
  [SMALL_STATE(391)] = 6301,
  [SMALL_STATE(392)] = 6314,
  [SMALL_STATE(393)] = 6327,
  [SMALL_STATE(394)] = 6340,
  [SMALL_STATE(395)] = 6353,
  [SMALL_STATE(396)] = 6366,
  [SMALL_STATE(397)] = 6379,
  [SMALL_STATE(398)] = 6392,
  [SMALL_STATE(399)] = 6405,
  [SMALL_STATE(400)] = 6418,
  [SMALL_STATE(401)] = 6431,
  [SMALL_STATE(402)] = 6444,
  [SMALL_STATE(403)] = 6457,
  [SMALL_STATE(404)] = 6470,
  [SMALL_STATE(405)] = 6483,
  [SMALL_STATE(406)] = 6496,
  [SMALL_STATE(407)] = 6509,
  [SMALL_STATE(408)] = 6522,
  [SMALL_STATE(409)] = 6529,
  [SMALL_STATE(410)] = 6542,
  [SMALL_STATE(411)] = 6555,
  [SMALL_STATE(412)] = 6568,
  [SMALL_STATE(413)] = 6581,
  [SMALL_STATE(414)] = 6594,
  [SMALL_STATE(415)] = 6607,
  [SMALL_STATE(416)] = 6620,
  [SMALL_STATE(417)] = 6633,
  [SMALL_STATE(418)] = 6646,
  [SMALL_STATE(419)] = 6659,
  [SMALL_STATE(420)] = 6669,
  [SMALL_STATE(421)] = 6675,
  [SMALL_STATE(422)] = 6681,
  [SMALL_STATE(423)] = 6687,
  [SMALL_STATE(424)] = 6697,
  [SMALL_STATE(425)] = 6707,
  [SMALL_STATE(426)] = 6717,
  [SMALL_STATE(427)] = 6727,
  [SMALL_STATE(428)] = 6737,
  [SMALL_STATE(429)] = 6743,
  [SMALL_STATE(430)] = 6749,
  [SMALL_STATE(431)] = 6755,
  [SMALL_STATE(432)] = 6765,
  [SMALL_STATE(433)] = 6771,
  [SMALL_STATE(434)] = 6777,
  [SMALL_STATE(435)] = 6787,
  [SMALL_STATE(436)] = 6793,
  [SMALL_STATE(437)] = 6799,
  [SMALL_STATE(438)] = 6805,
  [SMALL_STATE(439)] = 6815,
  [SMALL_STATE(440)] = 6821,
  [SMALL_STATE(441)] = 6831,
  [SMALL_STATE(442)] = 6841,
  [SMALL_STATE(443)] = 6847,
  [SMALL_STATE(444)] = 6853,
  [SMALL_STATE(445)] = 6859,
  [SMALL_STATE(446)] = 6869,
  [SMALL_STATE(447)] = 6875,
  [SMALL_STATE(448)] = 6885,
  [SMALL_STATE(449)] = 6895,
  [SMALL_STATE(450)] = 6901,
  [SMALL_STATE(451)] = 6907,
  [SMALL_STATE(452)] = 6917,
  [SMALL_STATE(453)] = 6927,
  [SMALL_STATE(454)] = 6937,
  [SMALL_STATE(455)] = 6947,
  [SMALL_STATE(456)] = 6957,
  [SMALL_STATE(457)] = 6967,
  [SMALL_STATE(458)] = 6977,
  [SMALL_STATE(459)] = 6987,
  [SMALL_STATE(460)] = 6997,
  [SMALL_STATE(461)] = 7007,
  [SMALL_STATE(462)] = 7017,
  [SMALL_STATE(463)] = 7027,
  [SMALL_STATE(464)] = 7037,
  [SMALL_STATE(465)] = 7047,
  [SMALL_STATE(466)] = 7057,
  [SMALL_STATE(467)] = 7067,
  [SMALL_STATE(468)] = 7073,
  [SMALL_STATE(469)] = 7083,
  [SMALL_STATE(470)] = 7093,
  [SMALL_STATE(471)] = 7103,
  [SMALL_STATE(472)] = 7113,
  [SMALL_STATE(473)] = 7123,
  [SMALL_STATE(474)] = 7133,
  [SMALL_STATE(475)] = 7143,
  [SMALL_STATE(476)] = 7153,
  [SMALL_STATE(477)] = 7163,
  [SMALL_STATE(478)] = 7169,
  [SMALL_STATE(479)] = 7179,
  [SMALL_STATE(480)] = 7189,
  [SMALL_STATE(481)] = 7199,
  [SMALL_STATE(482)] = 7205,
  [SMALL_STATE(483)] = 7211,
  [SMALL_STATE(484)] = 7217,
  [SMALL_STATE(485)] = 7223,
  [SMALL_STATE(486)] = 7229,
  [SMALL_STATE(487)] = 7235,
  [SMALL_STATE(488)] = 7245,
  [SMALL_STATE(489)] = 7251,
  [SMALL_STATE(490)] = 7257,
  [SMALL_STATE(491)] = 7263,
  [SMALL_STATE(492)] = 7269,
  [SMALL_STATE(493)] = 7279,
  [SMALL_STATE(494)] = 7285,
  [SMALL_STATE(495)] = 7295,
  [SMALL_STATE(496)] = 7301,
  [SMALL_STATE(497)] = 7311,
  [SMALL_STATE(498)] = 7321,
  [SMALL_STATE(499)] = 7327,
  [SMALL_STATE(500)] = 7333,
  [SMALL_STATE(501)] = 7339,
  [SMALL_STATE(502)] = 7345,
  [SMALL_STATE(503)] = 7351,
  [SMALL_STATE(504)] = 7357,
  [SMALL_STATE(505)] = 7363,
  [SMALL_STATE(506)] = 7369,
  [SMALL_STATE(507)] = 7375,
  [SMALL_STATE(508)] = 7381,
  [SMALL_STATE(509)] = 7387,
  [SMALL_STATE(510)] = 7393,
  [SMALL_STATE(511)] = 7399,
  [SMALL_STATE(512)] = 7409,
  [SMALL_STATE(513)] = 7419,
  [SMALL_STATE(514)] = 7429,
  [SMALL_STATE(515)] = 7435,
  [SMALL_STATE(516)] = 7441,
  [SMALL_STATE(517)] = 7447,
  [SMALL_STATE(518)] = 7453,
  [SMALL_STATE(519)] = 7459,
  [SMALL_STATE(520)] = 7465,
  [SMALL_STATE(521)] = 7471,
  [SMALL_STATE(522)] = 7477,
  [SMALL_STATE(523)] = 7487,
  [SMALL_STATE(524)] = 7493,
  [SMALL_STATE(525)] = 7503,
  [SMALL_STATE(526)] = 7513,
  [SMALL_STATE(527)] = 7519,
  [SMALL_STATE(528)] = 7525,
  [SMALL_STATE(529)] = 7531,
  [SMALL_STATE(530)] = 7537,
  [SMALL_STATE(531)] = 7543,
  [SMALL_STATE(532)] = 7549,
  [SMALL_STATE(533)] = 7555,
  [SMALL_STATE(534)] = 7561,
  [SMALL_STATE(535)] = 7567,
  [SMALL_STATE(536)] = 7573,
  [SMALL_STATE(537)] = 7583,
  [SMALL_STATE(538)] = 7593,
  [SMALL_STATE(539)] = 7599,
  [SMALL_STATE(540)] = 7609,
  [SMALL_STATE(541)] = 7619,
  [SMALL_STATE(542)] = 7629,
  [SMALL_STATE(543)] = 7639,
  [SMALL_STATE(544)] = 7649,
  [SMALL_STATE(545)] = 7655,
  [SMALL_STATE(546)] = 7665,
  [SMALL_STATE(547)] = 7675,
  [SMALL_STATE(548)] = 7681,
  [SMALL_STATE(549)] = 7687,
  [SMALL_STATE(550)] = 7693,
  [SMALL_STATE(551)] = 7699,
  [SMALL_STATE(552)] = 7705,
  [SMALL_STATE(553)] = 7715,
  [SMALL_STATE(554)] = 7721,
  [SMALL_STATE(555)] = 7727,
  [SMALL_STATE(556)] = 7737,
  [SMALL_STATE(557)] = 7743,
  [SMALL_STATE(558)] = 7749,
  [SMALL_STATE(559)] = 7755,
  [SMALL_STATE(560)] = 7761,
  [SMALL_STATE(561)] = 7771,
  [SMALL_STATE(562)] = 7777,
  [SMALL_STATE(563)] = 7783,
  [SMALL_STATE(564)] = 7793,
  [SMALL_STATE(565)] = 7799,
  [SMALL_STATE(566)] = 7805,
  [SMALL_STATE(567)] = 7811,
  [SMALL_STATE(568)] = 7817,
  [SMALL_STATE(569)] = 7823,
  [SMALL_STATE(570)] = 7829,
  [SMALL_STATE(571)] = 7837,
  [SMALL_STATE(572)] = 7843,
  [SMALL_STATE(573)] = 7853,
  [SMALL_STATE(574)] = 7859,
  [SMALL_STATE(575)] = 7865,
  [SMALL_STATE(576)] = 7875,
  [SMALL_STATE(577)] = 7881,
  [SMALL_STATE(578)] = 7887,
  [SMALL_STATE(579)] = 7893,
  [SMALL_STATE(580)] = 7899,
  [SMALL_STATE(581)] = 7905,
  [SMALL_STATE(582)] = 7911,
  [SMALL_STATE(583)] = 7917,
  [SMALL_STATE(584)] = 7923,
  [SMALL_STATE(585)] = 7929,
  [SMALL_STATE(586)] = 7935,
  [SMALL_STATE(587)] = 7941,
  [SMALL_STATE(588)] = 7947,
  [SMALL_STATE(589)] = 7953,
  [SMALL_STATE(590)] = 7963,
  [SMALL_STATE(591)] = 7969,
  [SMALL_STATE(592)] = 7975,
  [SMALL_STATE(593)] = 7985,
  [SMALL_STATE(594)] = 7995,
  [SMALL_STATE(595)] = 8001,
  [SMALL_STATE(596)] = 8011,
  [SMALL_STATE(597)] = 8017,
  [SMALL_STATE(598)] = 8027,
  [SMALL_STATE(599)] = 8033,
  [SMALL_STATE(600)] = 8043,
  [SMALL_STATE(601)] = 8053,
  [SMALL_STATE(602)] = 8063,
  [SMALL_STATE(603)] = 8069,
  [SMALL_STATE(604)] = 8079,
  [SMALL_STATE(605)] = 8089,
  [SMALL_STATE(606)] = 8099,
  [SMALL_STATE(607)] = 8105,
  [SMALL_STATE(608)] = 8115,
  [SMALL_STATE(609)] = 8121,
  [SMALL_STATE(610)] = 8131,
  [SMALL_STATE(611)] = 8141,
  [SMALL_STATE(612)] = 8147,
  [SMALL_STATE(613)] = 8153,
  [SMALL_STATE(614)] = 8163,
  [SMALL_STATE(615)] = 8173,
  [SMALL_STATE(616)] = 8179,
  [SMALL_STATE(617)] = 8185,
  [SMALL_STATE(618)] = 8195,
  [SMALL_STATE(619)] = 8205,
  [SMALL_STATE(620)] = 8215,
  [SMALL_STATE(621)] = 8225,
  [SMALL_STATE(622)] = 8231,
  [SMALL_STATE(623)] = 8241,
  [SMALL_STATE(624)] = 8251,
  [SMALL_STATE(625)] = 8261,
  [SMALL_STATE(626)] = 8267,
  [SMALL_STATE(627)] = 8277,
  [SMALL_STATE(628)] = 8283,
  [SMALL_STATE(629)] = 8289,
  [SMALL_STATE(630)] = 8295,
  [SMALL_STATE(631)] = 8301,
  [SMALL_STATE(632)] = 8311,
  [SMALL_STATE(633)] = 8317,
  [SMALL_STATE(634)] = 8323,
  [SMALL_STATE(635)] = 8329,
  [SMALL_STATE(636)] = 8335,
  [SMALL_STATE(637)] = 8341,
  [SMALL_STATE(638)] = 8347,
  [SMALL_STATE(639)] = 8353,
  [SMALL_STATE(640)] = 8359,
  [SMALL_STATE(641)] = 8365,
  [SMALL_STATE(642)] = 8371,
  [SMALL_STATE(643)] = 8377,
  [SMALL_STATE(644)] = 8383,
  [SMALL_STATE(645)] = 8389,
  [SMALL_STATE(646)] = 8395,
  [SMALL_STATE(647)] = 8401,
  [SMALL_STATE(648)] = 8411,
  [SMALL_STATE(649)] = 8421,
  [SMALL_STATE(650)] = 8431,
  [SMALL_STATE(651)] = 8437,
  [SMALL_STATE(652)] = 8447,
  [SMALL_STATE(653)] = 8457,
  [SMALL_STATE(654)] = 8463,
  [SMALL_STATE(655)] = 8469,
  [SMALL_STATE(656)] = 8475,
  [SMALL_STATE(657)] = 8481,
  [SMALL_STATE(658)] = 8487,
  [SMALL_STATE(659)] = 8493,
  [SMALL_STATE(660)] = 8499,
  [SMALL_STATE(661)] = 8505,
  [SMALL_STATE(662)] = 8511,
  [SMALL_STATE(663)] = 8517,
  [SMALL_STATE(664)] = 8523,
  [SMALL_STATE(665)] = 8529,
  [SMALL_STATE(666)] = 8539,
  [SMALL_STATE(667)] = 8549,
  [SMALL_STATE(668)] = 8559,
  [SMALL_STATE(669)] = 8565,
  [SMALL_STATE(670)] = 8575,
  [SMALL_STATE(671)] = 8581,
  [SMALL_STATE(672)] = 8591,
  [SMALL_STATE(673)] = 8597,
  [SMALL_STATE(674)] = 8607,
  [SMALL_STATE(675)] = 8617,
  [SMALL_STATE(676)] = 8623,
  [SMALL_STATE(677)] = 8629,
  [SMALL_STATE(678)] = 8639,
  [SMALL_STATE(679)] = 8649,
  [SMALL_STATE(680)] = 8659,
  [SMALL_STATE(681)] = 8665,
  [SMALL_STATE(682)] = 8671,
  [SMALL_STATE(683)] = 8681,
  [SMALL_STATE(684)] = 8687,
  [SMALL_STATE(685)] = 8693,
  [SMALL_STATE(686)] = 8699,
  [SMALL_STATE(687)] = 8705,
  [SMALL_STATE(688)] = 8711,
  [SMALL_STATE(689)] = 8717,
  [SMALL_STATE(690)] = 8727,
  [SMALL_STATE(691)] = 8737,
  [SMALL_STATE(692)] = 8747,
  [SMALL_STATE(693)] = 8757,
  [SMALL_STATE(694)] = 8763,
  [SMALL_STATE(695)] = 8769,
  [SMALL_STATE(696)] = 8779,
  [SMALL_STATE(697)] = 8789,
  [SMALL_STATE(698)] = 8799,
  [SMALL_STATE(699)] = 8805,
  [SMALL_STATE(700)] = 8811,
  [SMALL_STATE(701)] = 8817,
  [SMALL_STATE(702)] = 8827,
  [SMALL_STATE(703)] = 8833,
  [SMALL_STATE(704)] = 8839,
  [SMALL_STATE(705)] = 8845,
  [SMALL_STATE(706)] = 8851,
  [SMALL_STATE(707)] = 8857,
  [SMALL_STATE(708)] = 8863,
  [SMALL_STATE(709)] = 8869,
  [SMALL_STATE(710)] = 8875,
  [SMALL_STATE(711)] = 8885,
  [SMALL_STATE(712)] = 8895,
  [SMALL_STATE(713)] = 8901,
  [SMALL_STATE(714)] = 8907,
  [SMALL_STATE(715)] = 8913,
  [SMALL_STATE(716)] = 8919,
  [SMALL_STATE(717)] = 8925,
  [SMALL_STATE(718)] = 8935,
  [SMALL_STATE(719)] = 8945,
  [SMALL_STATE(720)] = 8955,
  [SMALL_STATE(721)] = 8961,
  [SMALL_STATE(722)] = 8967,
  [SMALL_STATE(723)] = 8973,
  [SMALL_STATE(724)] = 8983,
  [SMALL_STATE(725)] = 8989,
  [SMALL_STATE(726)] = 8999,
  [SMALL_STATE(727)] = 9009,
  [SMALL_STATE(728)] = 9015,
  [SMALL_STATE(729)] = 9021,
  [SMALL_STATE(730)] = 9027,
  [SMALL_STATE(731)] = 9033,
  [SMALL_STATE(732)] = 9039,
  [SMALL_STATE(733)] = 9045,
  [SMALL_STATE(734)] = 9055,
  [SMALL_STATE(735)] = 9061,
  [SMALL_STATE(736)] = 9067,
  [SMALL_STATE(737)] = 9073,
  [SMALL_STATE(738)] = 9079,
  [SMALL_STATE(739)] = 9085,
  [SMALL_STATE(740)] = 9091,
  [SMALL_STATE(741)] = 9097,
  [SMALL_STATE(742)] = 9103,
  [SMALL_STATE(743)] = 9109,
  [SMALL_STATE(744)] = 9115,
  [SMALL_STATE(745)] = 9120,
  [SMALL_STATE(746)] = 9125,
  [SMALL_STATE(747)] = 9130,
  [SMALL_STATE(748)] = 9137,
  [SMALL_STATE(749)] = 9142,
  [SMALL_STATE(750)] = 9147,
  [SMALL_STATE(751)] = 9154,
  [SMALL_STATE(752)] = 9158,
  [SMALL_STATE(753)] = 9162,
  [SMALL_STATE(754)] = 9166,
  [SMALL_STATE(755)] = 9170,
  [SMALL_STATE(756)] = 9174,
  [SMALL_STATE(757)] = 9178,
  [SMALL_STATE(758)] = 9182,
  [SMALL_STATE(759)] = 9186,
  [SMALL_STATE(760)] = 9190,
  [SMALL_STATE(761)] = 9194,
  [SMALL_STATE(762)] = 9198,
  [SMALL_STATE(763)] = 9202,
  [SMALL_STATE(764)] = 9206,
  [SMALL_STATE(765)] = 9210,
  [SMALL_STATE(766)] = 9214,
  [SMALL_STATE(767)] = 9218,
  [SMALL_STATE(768)] = 9222,
  [SMALL_STATE(769)] = 9226,
  [SMALL_STATE(770)] = 9230,
  [SMALL_STATE(771)] = 9234,
  [SMALL_STATE(772)] = 9238,
  [SMALL_STATE(773)] = 9242,
  [SMALL_STATE(774)] = 9246,
  [SMALL_STATE(775)] = 9250,
  [SMALL_STATE(776)] = 9254,
  [SMALL_STATE(777)] = 9258,
  [SMALL_STATE(778)] = 9262,
  [SMALL_STATE(779)] = 9266,
  [SMALL_STATE(780)] = 9270,
  [SMALL_STATE(781)] = 9274,
  [SMALL_STATE(782)] = 9278,
  [SMALL_STATE(783)] = 9282,
  [SMALL_STATE(784)] = 9286,
  [SMALL_STATE(785)] = 9290,
  [SMALL_STATE(786)] = 9294,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_json, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(4),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(258),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(337),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(32),
  [17] = {.entry = {.count = 1, .reusable = true}}, SHIFT(749),
  [19] = {.entry = {.count = 1, .reusable = true}}, SHIFT(9),
  [21] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [23] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [25] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [27] = {.entry = {.count = 1, .reusable = true}}, SHIFT(744),
  [29] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [31] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [33] = {.entry = {.count = 1, .reusable = true}}, SHIFT(725),
  [35] = {.entry = {.count = 1, .reusable = false}}, SHIFT(764),
  [37] = {.entry = {.count = 1, .reusable = false}}, SHIFT(775),
  [39] = {.entry = {.count = 1, .reusable = false}}, SHIFT(752),
  [41] = {.entry = {.count = 1, .reusable = false}}, SHIFT(770),
  [43] = {.entry = {.count = 1, .reusable = false}}, SHIFT(771),
  [45] = {.entry = {.count = 1, .reusable = false}}, SHIFT(772),
  [47] = {.entry = {.count = 1, .reusable = false}}, SHIFT(773),
  [49] = {.entry = {.count = 1, .reusable = false}}, SHIFT(774),
  [51] = {.entry = {.count = 1, .reusable = false}}, SHIFT(778),
  [53] = {.entry = {.count = 1, .reusable = false}}, SHIFT(779),
  [55] = {.entry = {.count = 1, .reusable = false}}, SHIFT(780),
  [57] = {.entry = {.count = 1, .reusable = false}}, SHIFT(765),
  [59] = {.entry = {.count = 1, .reusable = false}}, SHIFT(784),
  [61] = {.entry = {.count = 1, .reusable = false}}, SHIFT(785),
  [63] = {.entry = {.count = 1, .reusable = false}}, SHIFT(760),
  [65] = {.entry = {.count = 1, .reusable = false}}, SHIFT(751),
  [67] = {.entry = {.count = 1, .reusable = false}}, SHIFT(761),
  [69] = {.entry = {.count = 1, .reusable = false}}, SHIFT(763),
  [71] = {.entry = {.count = 1, .reusable = false}}, SHIFT(786),
  [73] = {.entry = {.count = 1, .reusable = false}}, SHIFT(781),
  [75] = {.entry = {.count = 1, .reusable = false}}, SHIFT(768),
  [77] = {.entry = {.count = 1, .reusable = false}}, SHIFT(753),
  [79] = {.entry = {.count = 1, .reusable = false}}, SHIFT(754),
  [81] = {.entry = {.count = 1, .reusable = false}}, SHIFT(755),
  [83] = {.entry = {.count = 1, .reusable = false}}, SHIFT(756),
  [85] = {.entry = {.count = 1, .reusable = false}}, SHIFT(757),
  [87] = {.entry = {.count = 1, .reusable = false}}, SHIFT(758),
  [89] = {.entry = {.count = 1, .reusable = false}}, SHIFT(759),
  [91] = {.entry = {.count = 1, .reusable = true}}, SHIFT(111),
  [93] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [95] = {.entry = {.count = 1, .reusable = true}}, SHIFT(750),
  [97] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [99] = {.entry = {.count = 1, .reusable = true}}, SHIFT(548),
  [101] = {.entry = {.count = 1, .reusable = true}}, SHIFT(296),
  [103] = {.entry = {.count = 1, .reusable = true}}, SHIFT(298),
  [105] = {.entry = {.count = 1, .reusable = true}}, SHIFT(172),
  [107] = {.entry = {.count = 1, .reusable = true}}, SHIFT(527),
  [109] = {.entry = {.count = 1, .reusable = true}}, SHIFT(177),
  [111] = {.entry = {.count = 1, .reusable = true}}, SHIFT(706),
  [113] = {.entry = {.count = 1, .reusable = true}}, SHIFT(221),
  [115] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [117] = {.entry = {.count = 1, .reusable = true}}, SHIFT(561),
  [119] = {.entry = {.count = 1, .reusable = true}}, SHIFT(112),
  [121] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [123] = {.entry = {.count = 1, .reusable = true}}, SHIFT(714),
  [125] = {.entry = {.count = 1, .reusable = true}}, SHIFT(491),
  [127] = {.entry = {.count = 1, .reusable = true}}, SHIFT(629),
  [129] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [131] = {.entry = {.count = 1, .reusable = true}}, SHIFT(80),
  [133] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [135] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [137] = {.entry = {.count = 1, .reusable = true}}, SHIFT(594),
  [139] = {.entry = {.count = 1, .reusable = true}}, SHIFT(659),
  [141] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [143] = {.entry = {.count = 1, .reusable = true}}, SHIFT(515),
  [145] = {.entry = {.count = 1, .reusable = true}}, SHIFT(657),
  [147] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [149] = {.entry = {.count = 1, .reusable = true}}, SHIFT(598),
  [151] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [153] = {.entry = {.count = 1, .reusable = true}}, SHIFT(556),
  [155] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat1, 2),
  [157] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat1, 2), SHIFT_REPEAT(32),
  [160] = {.entry = {.count = 1, .reusable = true}}, SHIFT(34),
  [162] = {.entry = {.count = 1, .reusable = true}}, SHIFT(653),
  [164] = {.entry = {.count = 1, .reusable = true}}, SHIFT(420),
  [166] = {.entry = {.count = 1, .reusable = true}}, SHIFT(131),
  [168] = {.entry = {.count = 1, .reusable = true}}, SHIFT(675),
  [170] = {.entry = {.count = 1, .reusable = true}}, SHIFT(40),
  [172] = {.entry = {.count = 1, .reusable = true}}, SHIFT(553),
  [174] = {.entry = {.count = 1, .reusable = true}}, SHIFT(615),
  [176] = {.entry = {.count = 1, .reusable = true}}, SHIFT(489),
  [178] = {.entry = {.count = 1, .reusable = true}}, SHIFT(37),
  [180] = {.entry = {.count = 1, .reusable = true}}, SHIFT(712),
  [182] = {.entry = {.count = 1, .reusable = true}}, SHIFT(38),
  [184] = {.entry = {.count = 1, .reusable = true}}, SHIFT(46),
  [186] = {.entry = {.count = 1, .reusable = true}}, SHIFT(559),
  [188] = {.entry = {.count = 1, .reusable = true}}, SHIFT(35),
  [190] = {.entry = {.count = 1, .reusable = true}}, SHIFT(670),
  [192] = {.entry = {.count = 1, .reusable = true}}, SHIFT(44),
  [194] = {.entry = {.count = 1, .reusable = true}}, SHIFT(48),
  [196] = {.entry = {.count = 1, .reusable = true}}, SHIFT(588),
  [198] = {.entry = {.count = 1, .reusable = true}}, SHIFT(641),
  [200] = {.entry = {.count = 1, .reusable = true}}, SHIFT(52),
  [202] = {.entry = {.count = 1, .reusable = true}}, SHIFT(50),
  [204] = {.entry = {.count = 1, .reusable = true}}, SHIFT(532),
  [206] = {.entry = {.count = 1, .reusable = true}}, SHIFT(51),
  [208] = {.entry = {.count = 1, .reusable = true}}, SHIFT(57),
  [210] = {.entry = {.count = 1, .reusable = true}}, SHIFT(570),
  [212] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value, 1),
  [214] = {.entry = {.count = 1, .reusable = true}}, SHIFT(89),
  [216] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 2), SHIFT_REPEAT(12),
  [219] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 2),
  [221] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 2), SHIFT_REPEAT(572),
  [224] = {.entry = {.count = 1, .reusable = true}}, SHIFT(260),
  [226] = {.entry = {.count = 1, .reusable = true}}, SHIFT(385),
  [228] = {.entry = {.count = 1, .reusable = true}}, SHIFT(486),
  [230] = {.entry = {.count = 1, .reusable = true}}, SHIFT(303),
  [232] = {.entry = {.count = 1, .reusable = true}}, SHIFT(727),
  [234] = {.entry = {.count = 1, .reusable = true}}, SHIFT(268),
  [236] = {.entry = {.count = 1, .reusable = true}}, SHIFT(722),
  [238] = {.entry = {.count = 1, .reusable = true}}, SHIFT(769),
  [240] = {.entry = {.count = 1, .reusable = true}}, SHIFT(269),
  [242] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 2), SHIFT_REPEAT(303),
  [245] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 2),
  [247] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 2), SHIFT_REPEAT(723),
  [250] = {.entry = {.count = 1, .reusable = true}}, SHIFT(49),
  [252] = {.entry = {.count = 1, .reusable = true}}, SHIFT(274),
  [254] = {.entry = {.count = 1, .reusable = true}}, SHIFT(709),
  [256] = {.entry = {.count = 1, .reusable = true}}, SHIFT(276),
  [258] = {.entry = {.count = 1, .reusable = true}}, SHIFT(703),
  [260] = {.entry = {.count = 1, .reusable = true}}, SHIFT(134),
  [262] = {.entry = {.count = 1, .reusable = true}}, SHIFT(278),
  [264] = {.entry = {.count = 1, .reusable = true}}, SHIFT(698),
  [266] = {.entry = {.count = 1, .reusable = true}}, SHIFT(127),
  [268] = {.entry = {.count = 1, .reusable = true}}, SHIFT(281),
  [270] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [272] = {.entry = {.count = 1, .reusable = true}}, SHIFT(748),
  [274] = {.entry = {.count = 1, .reusable = true}}, SHIFT(332),
  [276] = {.entry = {.count = 1, .reusable = true}}, SHIFT(109),
  [278] = {.entry = {.count = 1, .reusable = true}}, SHIFT(747),
  [280] = {.entry = {.count = 1, .reusable = true}}, SHIFT(693),
  [282] = {.entry = {.count = 1, .reusable = true}}, SHIFT(122),
  [284] = {.entry = {.count = 1, .reusable = true}}, SHIFT(283),
  [286] = {.entry = {.count = 1, .reusable = true}}, SHIFT(687),
  [288] = {.entry = {.count = 1, .reusable = true}}, SHIFT(63),
  [290] = {.entry = {.count = 1, .reusable = true}}, SHIFT(285),
  [292] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__includeScope, 2),
  [294] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__includeScope, 2), SHIFT_REPEAT(89),
  [297] = {.entry = {.count = 1, .reusable = true}}, SHIFT(291),
  [299] = {.entry = {.count = 1, .reusable = true}}, SHIFT(292),
  [301] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 2), SHIFT_REPEAT(49),
  [304] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 2),
  [306] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 2), SHIFT_REPEAT(671),
  [309] = {.entry = {.count = 1, .reusable = true}}, SHIFT(662),
  [311] = {.entry = {.count = 1, .reusable = true}}, SHIFT(72),
  [313] = {.entry = {.count = 1, .reusable = true}}, SHIFT(293),
  [315] = {.entry = {.count = 1, .reusable = true}}, SHIFT(656),
  [317] = {.entry = {.count = 1, .reusable = true}}, SHIFT(76),
  [319] = {.entry = {.count = 1, .reusable = true}}, SHIFT(295),
  [321] = {.entry = {.count = 1, .reusable = true}}, SHIFT(650),
  [323] = {.entry = {.count = 1, .reusable = true}}, SHIFT(82),
  [325] = {.entry = {.count = 1, .reusable = true}}, SHIFT(299),
  [327] = {.entry = {.count = 1, .reusable = true}}, SHIFT(644),
  [329] = {.entry = {.count = 1, .reusable = true}}, SHIFT(86),
  [331] = {.entry = {.count = 1, .reusable = true}}, SHIFT(301),
  [333] = {.entry = {.count = 1, .reusable = true}}, SHIFT(309),
  [335] = {.entry = {.count = 1, .reusable = true}}, SHIFT(352),
  [337] = {.entry = {.count = 1, .reusable = true}}, SHIFT(349),
  [339] = {.entry = {.count = 1, .reusable = true}}, SHIFT(315),
  [341] = {.entry = {.count = 1, .reusable = true}}, SHIFT(535),
  [343] = {.entry = {.count = 1, .reusable = true}}, SHIFT(170),
  [345] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [347] = {.entry = {.count = 1, .reusable = true}}, SHIFT(336),
  [349] = {.entry = {.count = 1, .reusable = true}}, SHIFT(621),
  [351] = {.entry = {.count = 1, .reusable = true}}, SHIFT(182),
  [353] = {.entry = {.count = 1, .reusable = true}}, SHIFT(321),
  [355] = {.entry = {.count = 1, .reusable = true}}, SHIFT(573),
  [357] = {.entry = {.count = 1, .reusable = true}}, SHIFT(230),
  [359] = {.entry = {.count = 1, .reusable = true}}, SHIFT(606),
  [361] = {.entry = {.count = 1, .reusable = true}}, SHIFT(96),
  [363] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [365] = {.entry = {.count = 1, .reusable = true}}, SHIFT(188),
  [367] = {.entry = {.count = 1, .reusable = true}}, SHIFT(625),
  [369] = {.entry = {.count = 1, .reusable = true}}, SHIFT(664),
  [371] = {.entry = {.count = 1, .reusable = true}}, SHIFT(99),
  [373] = {.entry = {.count = 1, .reusable = true}}, SHIFT(596),
  [375] = {.entry = {.count = 1, .reusable = true}}, SHIFT(102),
  [377] = {.entry = {.count = 1, .reusable = true}}, SHIFT(590),
  [379] = {.entry = {.count = 1, .reusable = true}}, SHIFT(105),
  [381] = {.entry = {.count = 1, .reusable = true}}, SHIFT(746),
  [383] = {.entry = {.count = 1, .reusable = true}}, SHIFT(294),
  [385] = {.entry = {.count = 1, .reusable = true}}, SHIFT(731),
  [387] = {.entry = {.count = 1, .reusable = true}}, SHIFT(267),
  [389] = {.entry = {.count = 1, .reusable = true}}, SHIFT(282),
  [391] = {.entry = {.count = 1, .reusable = true}}, SHIFT(330),
  [393] = {.entry = {.count = 1, .reusable = true}}, SHIFT(566),
  [395] = {.entry = {.count = 1, .reusable = true}}, SHIFT(273),
  [397] = {.entry = {.count = 1, .reusable = true}}, SHIFT(564),
  [399] = {.entry = {.count = 1, .reusable = true}}, SHIFT(331),
  [401] = {.entry = {.count = 1, .reusable = true}}, SHIFT(735),
  [403] = {.entry = {.count = 1, .reusable = true}}, SHIFT(265),
  [405] = {.entry = {.count = 1, .reusable = true}}, SHIFT(704),
  [407] = {.entry = {.count = 1, .reusable = true}}, SHIFT(200),
  [409] = {.entry = {.count = 1, .reusable = true}}, SHIFT(277),
  [411] = {.entry = {.count = 1, .reusable = true}}, SHIFT(334),
  [413] = {.entry = {.count = 1, .reusable = true}}, SHIFT(335),
  [415] = {.entry = {.count = 1, .reusable = true}}, SHIFT(550),
  [417] = {.entry = {.count = 1, .reusable = true}}, SHIFT(255),
  [419] = {.entry = {.count = 1, .reusable = true}}, SHIFT(509),
  [421] = {.entry = {.count = 1, .reusable = true}}, SHIFT(365),
  [423] = {.entry = {.count = 1, .reusable = true}}, SHIFT(374),
  [425] = {.entry = {.count = 1, .reusable = true}}, SHIFT(503),
  [427] = {.entry = {.count = 1, .reusable = true}}, SHIFT(209),
  [429] = {.entry = {.count = 1, .reusable = true}}, SHIFT(646),
  [431] = {.entry = {.count = 1, .reusable = true}}, SHIFT(499),
  [433] = {.entry = {.count = 1, .reusable = true}}, SHIFT(375),
  [435] = {.entry = {.count = 1, .reusable = true}}, SHIFT(739),
  [437] = {.entry = {.count = 1, .reusable = true}}, SHIFT(264),
  [439] = {.entry = {.count = 1, .reusable = true}}, SHIFT(386),
  [441] = {.entry = {.count = 1, .reusable = true}}, SHIFT(484),
  [443] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [445] = {.entry = {.count = 1, .reusable = true}}, SHIFT(389),
  [447] = {.entry = {.count = 1, .reusable = true}}, SHIFT(388),
  [449] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 2), SHIFT_REPEAT(8),
  [452] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 2),
  [454] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 2), SHIFT_REPEAT(480),
  [457] = {.entry = {.count = 1, .reusable = true}}, SHIFT(741),
  [459] = {.entry = {.count = 1, .reusable = true}}, SHIFT(261),
  [461] = {.entry = {.count = 1, .reusable = true}}, SHIFT(450),
  [463] = {.entry = {.count = 1, .reusable = true}}, SHIFT(400),
  [465] = {.entry = {.count = 1, .reusable = true}}, SHIFT(437),
  [467] = {.entry = {.count = 1, .reusable = true}}, SHIFT(405),
  [469] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 2), SHIFT_REPEAT(282),
  [472] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 2), SHIFT_REPEAT(438),
  [475] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 2),
  [477] = {.entry = {.count = 1, .reusable = true}}, SHIFT(430),
  [479] = {.entry = {.count = 1, .reusable = true}}, SHIFT(412),
  [481] = {.entry = {.count = 1, .reusable = true}}, SHIFT(729),
  [483] = {.entry = {.count = 1, .reusable = true}}, SHIFT(252),
  [485] = {.entry = {.count = 1, .reusable = true}}, SHIFT(715),
  [487] = {.entry = {.count = 1, .reusable = true}}, SHIFT(250),
  [489] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 2), SHIFT_REPEAT(273),
  [492] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 2),
  [494] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 2), SHIFT_REPEAT(431),
  [497] = {.entry = {.count = 1, .reusable = true}}, SHIFT(421),
  [499] = {.entry = {.count = 1, .reusable = true}}, SHIFT(418),
  [501] = {.entry = {.count = 1, .reusable = true}}, SHIFT(544),
  [503] = {.entry = {.count = 1, .reusable = true}}, SHIFT(417),
  [505] = {.entry = {.count = 1, .reusable = true}}, SHIFT(422),
  [507] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2), SHIFT_REPEAT(260),
  [510] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2), SHIFT_REPEAT(423),
  [513] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2),
  [515] = {.entry = {.count = 1, .reusable = true}}, SHIFT(658),
  [517] = {.entry = {.count = 1, .reusable = true}}, SHIFT(245),
  [519] = {.entry = {.count = 1, .reusable = true}}, SHIFT(408),
  [521] = {.entry = {.count = 1, .reusable = true}}, SHIFT(409),
  [523] = {.entry = {.count = 1, .reusable = true}}, SHIFT(702),
  [525] = {.entry = {.count = 1, .reusable = true}}, SHIFT(247),
  [527] = {.entry = {.count = 1, .reusable = true}}, SHIFT(249),
  [529] = {.entry = {.count = 1, .reusable = true}}, SHIFT(707),
  [531] = {.entry = {.count = 1, .reusable = true}}, SHIFT(248),
  [533] = {.entry = {.count = 1, .reusable = true}}, SHIFT(481),
  [535] = {.entry = {.count = 1, .reusable = true}}, SHIFT(251),
  [537] = {.entry = {.count = 1, .reusable = true}}, SHIFT(390),
  [539] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 2), SHIFT_REPEAT(255),
  [542] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 2),
  [544] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 2), SHIFT_REPEAT(479),
  [547] = {.entry = {.count = 1, .reusable = true}}, SHIFT(737),
  [549] = {.entry = {.count = 1, .reusable = true}}, SHIFT(257),
  [551] = {.entry = {.count = 1, .reusable = true}}, SHIFT(218),
  [553] = {.entry = {.count = 1, .reusable = true}}, SHIFT(705),
  [555] = {.entry = {.count = 1, .reusable = true}}, SHIFT(246),
  [557] = {.entry = {.count = 1, .reusable = true}}, SHIFT(379),
  [559] = {.entry = {.count = 1, .reusable = true}}, SHIFT(493),
  [561] = {.entry = {.count = 1, .reusable = true}}, SHIFT(262),
  [563] = {.entry = {.count = 1, .reusable = true}}, SHIFT(742),
  [565] = {.entry = {.count = 1, .reusable = true}}, SHIFT(740),
  [567] = {.entry = {.count = 1, .reusable = true}}, SHIFT(203),
  [569] = {.entry = {.count = 1, .reusable = true}}, SHIFT(495),
  [571] = {.entry = {.count = 1, .reusable = true}}, SHIFT(377),
  [573] = {.entry = {.count = 1, .reusable = true}}, SHIFT(150),
  [575] = {.entry = {.count = 1, .reusable = true}}, SHIFT(508),
  [577] = {.entry = {.count = 1, .reusable = true}}, SHIFT(369),
  [579] = {.entry = {.count = 1, .reusable = true}}, SHIFT(519),
  [581] = {.entry = {.count = 1, .reusable = true}}, SHIFT(154),
  [583] = {.entry = {.count = 1, .reusable = true}}, SHIFT(360),
  [585] = {.entry = {.count = 1, .reusable = true}}, SHIFT(713),
  [587] = {.entry = {.count = 1, .reusable = true}}, SHIFT(275),
  [589] = {.entry = {.count = 1, .reusable = true}}, SHIFT(196),
  [591] = {.entry = {.count = 1, .reusable = true}}, SHIFT(161),
  [593] = {.entry = {.count = 1, .reusable = true}}, SHIFT(528),
  [595] = {.entry = {.count = 1, .reusable = true}}, SHIFT(348),
  [597] = {.entry = {.count = 1, .reusable = true}}, SHIFT(530),
  [599] = {.entry = {.count = 1, .reusable = true}}, SHIFT(345),
  [601] = {.entry = {.count = 1, .reusable = true}}, SHIFT(531),
  [603] = {.entry = {.count = 1, .reusable = true}}, SHIFT(660),
  [605] = {.entry = {.count = 1, .reusable = true}}, SHIFT(244),
  [607] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 2), SHIFT_REPEAT(20),
  [610] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 2), SHIFT_REPEAT(622),
  [613] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 2),
  [615] = {.entry = {.count = 1, .reusable = true}}, SHIFT(284),
  [617] = {.entry = {.count = 1, .reusable = true}}, SHIFT(694),
  [619] = {.entry = {.count = 1, .reusable = true}}, SHIFT(192),
  [621] = {.entry = {.count = 1, .reusable = true}}, SHIFT(310),
  [623] = {.entry = {.count = 1, .reusable = true}}, SHIFT(654),
  [625] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 2), SHIFT_REPEAT(352),
  [628] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 2),
  [630] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 2), SHIFT_REPEAT(651),
  [633] = {.entry = {.count = 1, .reusable = true}}, SHIFT(300),
  [635] = {.entry = {.count = 1, .reusable = true}}, SHIFT(608),
  [637] = {.entry = {.count = 1, .reusable = true}}, SHIFT(319),
  [639] = {.entry = {.count = 1, .reusable = true}}, SHIFT(645),
  [641] = {.entry = {.count = 1, .reusable = true}}, SHIFT(302),
  [643] = {.entry = {.count = 1, .reusable = true}}, SHIFT(175),
  [645] = {.entry = {.count = 1, .reusable = true}}, SHIFT(305),
  [647] = {.entry = {.count = 1, .reusable = true}}, SHIFT(642),
  [649] = {.entry = {.count = 1, .reusable = true}}, SHIFT(338),
  [651] = {.entry = {.count = 1, .reusable = true}}, SHIFT(585),
  [653] = {.entry = {.count = 1, .reusable = true}}, SHIFT(236),
  [655] = {.entry = {.count = 1, .reusable = true}}, SHIFT(280),
  [657] = {.entry = {.count = 1, .reusable = true}}, SHIFT(581),
  [659] = {.entry = {.count = 1, .reusable = true}}, SHIFT(234),
  [661] = {.entry = {.count = 1, .reusable = true}}, SHIFT(577),
  [663] = {.entry = {.count = 1, .reusable = true}}, SHIFT(232),
  [665] = {.entry = {.count = 1, .reusable = true}}, SHIFT(340),
  [667] = {.entry = {.count = 1, .reusable = true}}, SHIFT(287),
  [669] = {.entry = {.count = 1, .reusable = true}}, SHIFT(551),
  [671] = {.entry = {.count = 1, .reusable = true}}, SHIFT(554),
  [673] = {.entry = {.count = 1, .reusable = true}}, SHIFT(557),
  [675] = {.entry = {.count = 1, .reusable = true}}, SHIFT(558),
  [677] = {.entry = {.count = 1, .reusable = true}}, SHIFT(229),
  [679] = {.entry = {.count = 1, .reusable = true}}, SHIFT(297),
  [681] = {.entry = {.count = 1, .reusable = true}}, SHIFT(54),
  [683] = {.entry = {.count = 1, .reusable = true}}, SHIFT(567),
  [685] = {.entry = {.count = 1, .reusable = true}}, SHIFT(243),
  [687] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [689] = {.entry = {.count = 1, .reusable = true}}, SHIFT(240),
  [691] = {.entry = {.count = 1, .reusable = true}}, SHIFT(617),
  [693] = {.entry = {.count = 1, .reusable = true}}, SHIFT(734),
  [695] = {.entry = {.count = 1, .reusable = true}}, SHIFT(316),
  [697] = {.entry = {.count = 1, .reusable = true}}, SHIFT(241),
  [699] = {.entry = {.count = 1, .reusable = true}}, SHIFT(317),
  [701] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 2),
  [703] = {.entry = {.count = 1, .reusable = true}}, SHIFT(342),
  [705] = {.entry = {.count = 1, .reusable = true}}, SHIFT(343),
  [707] = {.entry = {.count = 1, .reusable = true}}, SHIFT(681),
  [709] = {.entry = {.count = 1, .reusable = true}}, SHIFT(259),
  [711] = {.entry = {.count = 1, .reusable = true}}, SHIFT(522),
  [713] = {.entry = {.count = 1, .reusable = true}}, SHIFT(357),
  [715] = {.entry = {.count = 1, .reusable = true}}, SHIFT(358),
  [717] = {.entry = {.count = 1, .reusable = true}}, SHIFT(717),
  [719] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [721] = {.entry = {.count = 1, .reusable = true}}, SHIFT(366),
  [723] = {.entry = {.count = 1, .reusable = true}}, SHIFT(367),
  [725] = {.entry = {.count = 1, .reusable = true}}, SHIFT(270),
  [727] = {.entry = {.count = 1, .reusable = true}}, SHIFT(719),
  [729] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_integer, 1),
  [731] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_boolean, 1),
  [733] = {.entry = {.count = 1, .reusable = true}}, SHIFT(500),
  [735] = {.entry = {.count = 1, .reusable = true}}, SHIFT(289),
  [737] = {.entry = {.count = 1, .reusable = true}}, SHIFT(682),
  [739] = {.entry = {.count = 1, .reusable = true}}, SHIFT(380),
  [741] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__includeItem, 2),
  [743] = {.entry = {.count = 1, .reusable = true}}, SHIFT(376),
  [745] = {.entry = {.count = 1, .reusable = true}}, SHIFT(382),
  [747] = {.entry = {.count = 1, .reusable = true}}, SHIFT(381),
  [749] = {.entry = {.count = 1, .reusable = true}}, SHIFT(399),
  [751] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repo_repeat1, 2),
  [753] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_repo_repeat1, 2), SHIFT_REPEAT(734),
  [756] = {.entry = {.count = 1, .reusable = true}}, SHIFT(387),
  [758] = {.entry = {.count = 1, .reusable = true}}, SHIFT(415),
  [760] = {.entry = {.count = 1, .reusable = true}}, SHIFT(411),
  [762] = {.entry = {.count = 1, .reusable = true}}, SHIFT(726),
  [764] = {.entry = {.count = 1, .reusable = true}}, SHIFT(406),
  [766] = {.entry = {.count = 1, .reusable = true}}, SHIFT(373),
  [768] = {.entry = {.count = 1, .reusable = true}}, SHIFT(370),
  [770] = {.entry = {.count = 1, .reusable = true}}, SHIFT(628),
  [772] = {.entry = {.count = 1, .reusable = true}}, SHIFT(627),
  [774] = {.entry = {.count = 1, .reusable = true}}, SHIFT(745),
  [776] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__string, 2),
  [778] = {.entry = {.count = 1, .reusable = true}}, SHIFT(611),
  [780] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 3),
  [782] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [784] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 6),
  [786] = {.entry = {.count = 1, .reusable = true}}, SHIFT(288),
  [788] = {.entry = {.count = 1, .reusable = true}}, SHIFT(413),
  [790] = {.entry = {.count = 1, .reusable = true}}, SHIFT(227),
  [792] = {.entry = {.count = 1, .reusable = true}}, SHIFT(429),
  [794] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__string, 3, .production_id = 1),
  [796] = {.entry = {.count = 1, .reusable = true}}, SHIFT(325),
  [798] = {.entry = {.count = 1, .reusable = true}}, SHIFT(242),
  [800] = {.entry = {.count = 1, .reusable = true}}, SHIFT(326),
  [802] = {.entry = {.count = 1, .reusable = true}}, SHIFT(327),
  [804] = {.entry = {.count = 1, .reusable = true}}, SHIFT(414),
  [806] = {.entry = {.count = 1, .reusable = true}}, SHIFT(328),
  [808] = {.entry = {.count = 1, .reusable = true}}, SHIFT(329),
  [810] = {.entry = {.count = 1, .reusable = true}}, SHIFT(239),
  [812] = {.entry = {.count = 1, .reusable = true}}, SHIFT(569),
  [814] = {.entry = {.count = 1, .reusable = true}}, SHIFT(407),
  [816] = {.entry = {.count = 1, .reusable = true}}, SHIFT(286),
  [818] = {.entry = {.count = 1, .reusable = true}}, SHIFT(237),
  [820] = {.entry = {.count = 1, .reusable = true}}, SHIFT(442),
  [822] = {.entry = {.count = 1, .reusable = true}}, SHIFT(279),
  [824] = {.entry = {.count = 1, .reusable = true}}, SHIFT(443),
  [826] = {.entry = {.count = 1, .reusable = true}}, SHIFT(403),
  [828] = {.entry = {.count = 1, .reusable = true}}, SHIFT(402),
  [830] = {.entry = {.count = 1, .reusable = true}}, SHIFT(549),
  [832] = {.entry = {.count = 1, .reusable = true}}, SHIFT(339),
  [834] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 5),
  [836] = {.entry = {.count = 1, .reusable = true}}, SHIFT(266),
  [838] = {.entry = {.count = 1, .reusable = true}}, SHIFT(235),
  [840] = {.entry = {.count = 1, .reusable = true}}, SHIFT(347),
  [842] = {.entry = {.count = 1, .reusable = true}}, SHIFT(351),
  [844] = {.entry = {.count = 1, .reusable = true}}, SHIFT(354),
  [846] = {.entry = {.count = 1, .reusable = true}}, SHIFT(356),
  [848] = {.entry = {.count = 1, .reusable = true}}, SHIFT(361),
  [850] = {.entry = {.count = 1, .reusable = true}}, SHIFT(363),
  [852] = {.entry = {.count = 1, .reusable = true}}, SHIFT(368),
  [854] = {.entry = {.count = 1, .reusable = true}}, SHIFT(263),
  [856] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 4),
  [858] = {.entry = {.count = 1, .reusable = true}}, SHIFT(233),
  [860] = {.entry = {.count = 1, .reusable = true}}, SHIFT(231),
  [862] = {.entry = {.count = 1, .reusable = true}}, SHIFT(483),
  [864] = {.entry = {.count = 1, .reusable = true}}, SHIFT(410),
  [866] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 7, .production_id = 7),
  [868] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9),
  [870] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9, .production_id = 4),
  [872] = {.entry = {.count = 1, .reusable = true}}, SHIFT(41),
  [874] = {.entry = {.count = 1, .reusable = true}}, SHIFT(494),
  [876] = {.entry = {.count = 1, .reusable = true}}, SHIFT(43),
  [878] = {.entry = {.count = 1, .reusable = true}}, SHIFT(496),
  [880] = {.entry = {.count = 1, .reusable = true}}, SHIFT(497),
  [882] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 3),
  [884] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9, .production_id = 2),
  [886] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 9),
  [888] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 3, .production_id = 5),
  [890] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_firstLineMatch, 5),
  [892] = {.entry = {.count = 1, .reusable = true}}, SHIFT(560),
  [894] = {.entry = {.count = 1, .reusable = true}}, SHIFT(210),
  [896] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 3),
  [898] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStopMarker, 5),
  [900] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 9),
  [902] = {.entry = {.count = 1, .reusable = true}}, SHIFT(476),
  [904] = {.entry = {.count = 1, .reusable = true}}, SHIFT(475),
  [906] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 6),
  [908] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 6),
  [910] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 5),
  [912] = {.entry = {.count = 1, .reusable = true}}, SHIFT(474),
  [914] = {.entry = {.count = 1, .reusable = true}}, SHIFT(473),
  [916] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 5, .production_id = 7),
  [918] = {.entry = {.count = 1, .reusable = true}}, SHIFT(472),
  [920] = {.entry = {.count = 1, .reusable = true}}, SHIFT(471),
  [922] = {.entry = {.count = 1, .reusable = true}}, SHIFT(470),
  [924] = {.entry = {.count = 1, .reusable = true}}, SHIFT(469),
  [926] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 4),
  [928] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 10),
  [930] = {.entry = {.count = 1, .reusable = true}}, SHIFT(468),
  [932] = {.entry = {.count = 1, .reusable = true}}, SHIFT(53),
  [934] = {.entry = {.count = 1, .reusable = true}}, SHIFT(466),
  [936] = {.entry = {.count = 1, .reusable = true}}, SHIFT(393),
  [938] = {.entry = {.count = 1, .reusable = true}}, SHIFT(512),
  [940] = {.entry = {.count = 1, .reusable = true}}, SHIFT(55),
  [942] = {.entry = {.count = 1, .reusable = true}}, SHIFT(513),
  [944] = {.entry = {.count = 1, .reusable = true}}, SHIFT(464),
  [946] = {.entry = {.count = 1, .reusable = true}}, SHIFT(394),
  [948] = {.entry = {.count = 1, .reusable = true}}, SHIFT(362),
  [950] = {.entry = {.count = 1, .reusable = true}}, SHIFT(462),
  [952] = {.entry = {.count = 1, .reusable = true}}, SHIFT(395),
  [954] = {.entry = {.count = 1, .reusable = true}}, SHIFT(359),
  [956] = {.entry = {.count = 1, .reusable = true}}, SHIFT(460),
  [958] = {.entry = {.count = 1, .reusable = true}}, SHIFT(396),
  [960] = {.entry = {.count = 1, .reusable = true}}, SHIFT(355),
  [962] = {.entry = {.count = 1, .reusable = true}}, SHIFT(458),
  [964] = {.entry = {.count = 1, .reusable = true}}, SHIFT(397),
  [966] = {.entry = {.count = 1, .reusable = true}}, SHIFT(353),
  [968] = {.entry = {.count = 1, .reusable = true}}, SHIFT(456),
  [970] = {.entry = {.count = 1, .reusable = true}}, SHIFT(398),
  [972] = {.entry = {.count = 1, .reusable = true}}, SHIFT(350),
  [974] = {.entry = {.count = 1, .reusable = true}}, SHIFT(454),
  [976] = {.entry = {.count = 1, .reusable = true}}, SHIFT(453),
  [978] = {.entry = {.count = 1, .reusable = true}}, SHIFT(344),
  [980] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_schema, 5),
  [982] = {.entry = {.count = 1, .reusable = true}}, SHIFT(47),
  [984] = {.entry = {.count = 1, .reusable = true}}, SHIFT(120),
  [986] = {.entry = {.count = 1, .reusable = true}}, SHIFT(536),
  [988] = {.entry = {.count = 1, .reusable = true}}, SHIFT(537),
  [990] = {.entry = {.count = 1, .reusable = true}}, SHIFT(119),
  [992] = {.entry = {.count = 1, .reusable = true}}, SHIFT(539),
  [994] = {.entry = {.count = 1, .reusable = true}}, SHIFT(540),
  [996] = {.entry = {.count = 1, .reusable = true}}, SHIFT(118),
  [998] = {.entry = {.count = 1, .reusable = true}}, SHIFT(542),
  [1000] = {.entry = {.count = 1, .reusable = true}}, SHIFT(543),
  [1002] = {.entry = {.count = 1, .reusable = true}}, SHIFT(116),
  [1004] = {.entry = {.count = 1, .reusable = true}}, SHIFT(545),
  [1006] = {.entry = {.count = 1, .reusable = true}}, SHIFT(546),
  [1008] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 3),
  [1010] = {.entry = {.count = 1, .reusable = true}}, SHIFT(201),
  [1012] = {.entry = {.count = 1, .reusable = true}}, SHIFT(710),
  [1014] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 9),
  [1016] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 4, .production_id = 8),
  [1018] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 10, .production_id = 4),
  [1020] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 10, .production_id = 6),
  [1022] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 3),
  [1024] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 10, .production_id = 9),
  [1026] = {.entry = {.count = 1, .reusable = true}}, SHIFT(401),
  [1028] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 4),
  [1030] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 5),
  [1032] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_version, 5),
  [1034] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 4),
  [1036] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 5),
  [1038] = {.entry = {.count = 1, .reusable = true}}, SHIFT(45),
  [1040] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 5),
  [1042] = {.entry = {.count = 1, .reusable = true}}, SHIFT(42),
  [1044] = {.entry = {.count = 1, .reusable = true}}, SHIFT(563),
  [1046] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 4),
  [1048] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 10),
  [1050] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 6),
  [1052] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injectionSelector, 5),
  [1054] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 4),
  [1056] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 10),
  [1058] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 4),
  [1060] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment, 5),
  [1062] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 6),
  [1064] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 6, .production_id = 7),
  [1066] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 8),
  [1068] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 11),
  [1070] = {.entry = {.count = 1, .reusable = true}}, SHIFT(341),
  [1072] = {.entry = {.count = 1, .reusable = true}}, SHIFT(58),
  [1074] = {.entry = {.count = 1, .reusable = true}}, SHIFT(575),
  [1076] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_nameScope, 5),
  [1078] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment_slash, 5),
  [1080] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 4),
  [1082] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_contentName, 5),
  [1084] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 8, .production_id = 10),
  [1086] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 8),
  [1088] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_match, 5),
  [1090] = {.entry = {.count = 1, .reusable = true}}, SHIFT(427),
  [1092] = {.entry = {.count = 1, .reusable = true}}, SHIFT(426),
  [1094] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_begin, 5),
  [1096] = {.entry = {.count = 1, .reusable = true}}, SHIFT(425),
  [1098] = {.entry = {.count = 1, .reusable = true}}, SHIFT(39),
  [1100] = {.entry = {.count = 1, .reusable = true}}, SHIFT(424),
  [1102] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_end, 5),
  [1104] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 3),
  [1106] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 8),
  [1108] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_while, 5),
  [1110] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 8, .production_id = 4),
  [1112] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 8, .production_id = 2),
  [1114] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_applyEndPatternLast, 5),
  [1116] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_name, 5),
  [1118] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2, .production_id = 3),
  [1120] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 2),
  [1122] = {.entry = {.count = 1, .reusable = true}}, SHIFT(104),
  [1124] = {.entry = {.count = 1, .reusable = true}}, SHIFT(595),
  [1126] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_scopeName, 5),
  [1128] = {.entry = {.count = 1, .reusable = true}}, SHIFT(101),
  [1130] = {.entry = {.count = 1, .reusable = true}}, SHIFT(600),
  [1132] = {.entry = {.count = 1, .reusable = true}}, SHIFT(631),
  [1134] = {.entry = {.count = 1, .reusable = true}}, SHIFT(189),
  [1136] = {.entry = {.count = 1, .reusable = true}}, SHIFT(98),
  [1138] = {.entry = {.count = 1, .reusable = true}}, SHIFT(605),
  [1140] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9, .production_id = 6),
  [1142] = {.entry = {.count = 1, .reusable = true}}, SHIFT(95),
  [1144] = {.entry = {.count = 1, .reusable = true}}, SHIFT(610),
  [1146] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 4),
  [1148] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 2),
  [1150] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 11, .production_id = 6),
  [1152] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 11, .production_id = 9),
  [1154] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 12),
  [1156] = {.entry = {.count = 1, .reusable = true}}, SHIFT(183),
  [1158] = {.entry = {.count = 1, .reusable = true}}, SHIFT(604),
  [1160] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 6),
  [1162] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 12),
  [1164] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 5),
  [1166] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 12),
  [1168] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 12),
  [1170] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 6, .production_id = 7),
  [1172] = {.entry = {.count = 1, .reusable = true}}, SHIFT(191),
  [1174] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 2),
  [1176] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 7, .production_id = 10),
  [1178] = {.entry = {.count = 1, .reusable = true}}, SHIFT(36),
  [1180] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 11),
  [1182] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 7, .production_id = 7),
  [1184] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 11),
  [1186] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 12, .production_id = 7),
  [1188] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 7, .production_id = 7),
  [1190] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 12),
  [1192] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_firstLineMatch, 6),
  [1194] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 11),
  [1196] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStartMarker, 6),
  [1198] = {.entry = {.count = 1, .reusable = true}}, SHIFT(56),
  [1200] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_nameScope, 6),
  [1202] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 11),
  [1204] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_contentName, 6),
  [1206] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStopMarker, 6),
  [1208] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_match, 6),
  [1210] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 11),
  [1212] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_begin, 6),
  [1214] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_uuid, 6),
  [1216] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_end, 6),
  [1218] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 11),
  [1220] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_while, 6),
  [1222] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 3),
  [1224] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_applyEndPatternLast, 6),
  [1226] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [1228] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 6),
  [1230] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment, 6),
  [1232] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [1234] = {.entry = {.count = 1, .reusable = true}}, SHIFT(364),
  [1236] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment_slash, 6),
  [1238] = {.entry = {.count = 1, .reusable = true}}, SHIFT(85),
  [1240] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 6),
  [1242] = {.entry = {.count = 1, .reusable = true}}, SHIFT(372),
  [1244] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 6),
  [1246] = {.entry = {.count = 1, .reusable = true}}, SHIFT(392),
  [1248] = {.entry = {.count = 1, .reusable = true}}, SHIFT(81),
  [1250] = {.entry = {.count = 1, .reusable = true}}, SHIFT(589),
  [1252] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [1254] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStartMarker, 5),
  [1256] = {.entry = {.count = 1, .reusable = true}}, SHIFT(219),
  [1258] = {.entry = {.count = 1, .reusable = true}}, SHIFT(75),
  [1260] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 6),
  [1262] = {.entry = {.count = 1, .reusable = true}}, SHIFT(416),
  [1264] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 8),
  [1266] = {.entry = {.count = 1, .reusable = true}}, SHIFT(434),
  [1268] = {.entry = {.count = 1, .reusable = true}}, SHIFT(71),
  [1270] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 12, .production_id = 9),
  [1272] = {.entry = {.count = 1, .reusable = true}}, SHIFT(440),
  [1274] = {.entry = {.count = 1, .reusable = true}}, SHIFT(138),
  [1276] = {.entry = {.count = 1, .reusable = true}}, SHIFT(404),
  [1278] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 7),
  [1280] = {.entry = {.count = 1, .reusable = true}}, SHIFT(487),
  [1282] = {.entry = {.count = 1, .reusable = true}}, SHIFT(384),
  [1284] = {.entry = {.count = 1, .reusable = true}}, SHIFT(391),
  [1286] = {.entry = {.count = 1, .reusable = true}}, SHIFT(383),
  [1288] = {.entry = {.count = 1, .reusable = true}}, SHIFT(478),
  [1290] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 6),
  [1292] = {.entry = {.count = 1, .reusable = true}}, SHIFT(129),
  [1294] = {.entry = {.count = 1, .reusable = true}}, SHIFT(492),
  [1296] = {.entry = {.count = 1, .reusable = true}}, SHIFT(378),
  [1298] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 6),
  [1300] = {.entry = {.count = 1, .reusable = true}}, SHIFT(371),
  [1302] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 12),
  [1304] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 12),
  [1306] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 3),
  [1308] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_include, 7),
  [1310] = {.entry = {.count = 1, .reusable = true}}, SHIFT(202),
  [1312] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 6, .production_id = 10),
  [1314] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 6, .production_id = 7),
  [1316] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_nameScope, 7),
  [1318] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_contentName, 7),
  [1320] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_match, 7),
  [1322] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_begin, 7),
  [1324] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_end, 7),
  [1326] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_while, 7),
  [1328] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_applyEndPatternLast, 7),
  [1330] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 4),
  [1332] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_scopeName, 6),
  [1334] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 7),
  [1336] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 4),
  [1338] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 6),
  [1340] = {.entry = {.count = 1, .reusable = true}}, SHIFT(541),
  [1342] = {.entry = {.count = 1, .reusable = true}}, SHIFT(603),
  [1344] = {.entry = {.count = 1, .reusable = true}}, SHIFT(117),
  [1346] = {.entry = {.count = 1, .reusable = true}}, SHIFT(552),
  [1348] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 7),
  [1350] = {.entry = {.count = 1, .reusable = true}}, SHIFT(114),
  [1352] = {.entry = {.count = 1, .reusable = true}}, SHIFT(555),
  [1354] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 4),
  [1356] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 5),
  [1358] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 3),
  [1360] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 7),
  [1362] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 7),
  [1364] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 4),
  [1366] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment_slash, 7),
  [1368] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 11, .production_id = 7),
  [1370] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 7),
  [1372] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment, 7),
  [1374] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 6),
  [1376] = {.entry = {.count = 1, .reusable = true}}, SHIFT(592),
  [1378] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [1380] = {.entry = {.count = 1, .reusable = true}}, SHIFT(593),
  [1382] = {.entry = {.count = 1, .reusable = true}}, SHIFT(324),
  [1384] = {.entry = {.count = 1, .reusable = true}}, SHIFT(597),
  [1386] = {.entry = {.count = 1, .reusable = true}}, SHIFT(323),
  [1388] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 3),
  [1390] = {.entry = {.count = 1, .reusable = true}}, SHIFT(599),
  [1392] = {.entry = {.count = 1, .reusable = true}}, SHIFT(322),
  [1394] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 8),
  [1396] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_uuid, 7),
  [1398] = {.entry = {.count = 1, .reusable = true}}, SHIFT(419),
  [1400] = {.entry = {.count = 1, .reusable = true}}, SHIFT(320),
  [1402] = {.entry = {.count = 1, .reusable = true}}, SHIFT(607),
  [1404] = {.entry = {.count = 1, .reusable = true}}, SHIFT(318),
  [1406] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 8, .production_id = 7),
  [1408] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStopMarker, 7),
  [1410] = {.entry = {.count = 1, .reusable = true}}, SHIFT(609),
  [1412] = {.entry = {.count = 1, .reusable = true}}, SHIFT(613),
  [1414] = {.entry = {.count = 1, .reusable = true}}, SHIFT(614),
  [1416] = {.entry = {.count = 1, .reusable = true}}, SHIFT(313),
  [1418] = {.entry = {.count = 1, .reusable = true}}, SHIFT(618),
  [1420] = {.entry = {.count = 1, .reusable = true}}, SHIFT(312),
  [1422] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_include, 8),
  [1424] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 11),
  [1426] = {.entry = {.count = 1, .reusable = true}}, SHIFT(718),
  [1428] = {.entry = {.count = 1, .reusable = true}}, SHIFT(271),
  [1430] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStartMarker, 7),
  [1432] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_firstLineMatch, 7),
  [1434] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_name, 6),
  [1436] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 8),
  [1438] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injectionSelector, 6),
  [1440] = {.entry = {.count = 1, .reusable = true}}, SHIFT(620),
  [1442] = {.entry = {.count = 1, .reusable = true}}, SHIFT(623),
  [1444] = {.entry = {.count = 1, .reusable = true}}, SHIFT(624),
  [1446] = {.entry = {.count = 1, .reusable = true}}, SHIFT(308),
  [1448] = {.entry = {.count = 1, .reusable = true}}, SHIFT(626),
  [1450] = {.entry = {.count = 1, .reusable = true}}, SHIFT(306),
  [1452] = {.entry = {.count = 1, .reusable = true}}, SHIFT(511),
  [1454] = {.entry = {.count = 1, .reusable = true}}, SHIFT(228),
  [1456] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 8),
  [1458] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 7),
  [1460] = {.entry = {.count = 1, .reusable = true}}, SHIFT(647),
  [1462] = {.entry = {.count = 1, .reusable = true}}, SHIFT(648),
  [1464] = {.entry = {.count = 1, .reusable = true}}, SHIFT(649),
  [1466] = {.entry = {.count = 1, .reusable = true}}, SHIFT(652),
  [1468] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 8),
  [1470] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_schema, 7),
  [1472] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_version, 7),
  [1474] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_json, 1),
  [1476] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 3),
  [1478] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 8),
  [1480] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 6),
  [1482] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 10),
  [1484] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 3),
  [1486] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 10),
  [1488] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 4),
  [1490] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 9),
  [1492] = {.entry = {.count = 1, .reusable = true}}, SHIFT(195),
  [1494] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 2),
  [1496] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 2), SHIFT_REPEAT(4),
  [1499] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 9, .production_id = 7),
  [1501] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 7),
  [1503] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 10),
  [1505] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_include, 9),
  [1507] = {.entry = {.count = 1, .reusable = true}}, SHIFT(524),
  [1509] = {.entry = {.count = 1, .reusable = true}}, SHIFT(525),
  [1511] = {.entry = {.count = 1, .reusable = true}}, SHIFT(256),
  [1513] = {.entry = {.count = 1, .reusable = true}}, SHIFT(733),
  [1515] = {.entry = {.count = 1, .reusable = true}}, SHIFT(253),
  [1517] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 3),
  [1519] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injectionSelector, 7),
  [1521] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 9),
  [1523] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_name, 7),
  [1525] = {.entry = {.count = 1, .reusable = true}}, SHIFT(697),
  [1527] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [1529] = {.entry = {.count = 1, .reusable = true}}, SHIFT(619),
  [1531] = {.entry = {.count = 1, .reusable = true}}, SHIFT(311),
  [1533] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 9),
  [1535] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_scopeName, 7),
  [1537] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 10),
  [1539] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 4),
  [1541] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 9),
  [1543] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_version, 6),
  [1545] = {.entry = {.count = 1, .reusable = true}}, SHIFT(238),
  [1547] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repo_repeat1, 1),
  [1549] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 9),
  [1551] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_schema, 6),
  [1553] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 7),
  [1555] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_uuid, 5),
  [1557] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 10),
  [1559] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 7),
  [1561] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 10, .production_id = 7),
  [1563] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 7, .production_id = 2),
  [1565] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 5, .production_id = 7),
  [1567] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 3),
  [1569] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 6),
  [1571] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 4),
  [1573] = {.entry = {.count = 1, .reusable = true}}, SHIFT(761),
  [1575] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 5),
  [1577] = {.entry = {.count = 1, .reusable = true}}, SHIFT(333),
  [1579] = {.entry = {.count = 1, .reusable = true}}, SHIFT(783),
  [1581] = {.entry = {.count = 1, .reusable = true}}, SHIFT(665),
  [1583] = {.entry = {.count = 1, .reusable = true}}, SHIFT(465),
  [1585] = {.entry = {.count = 1, .reusable = true}}, SHIFT(679),
  [1587] = {.entry = {.count = 1, .reusable = true}}, SHIFT(678),
  [1589] = {.entry = {.count = 1, .reusable = true}}, SHIFT(677),
  [1591] = {.entry = {.count = 1, .reusable = true}}, SHIFT(674),
  [1593] = {.entry = {.count = 1, .reusable = true}}, SHIFT(673),
  [1595] = {.entry = {.count = 1, .reusable = true}}, SHIFT(669),
  [1597] = {.entry = {.count = 1, .reusable = true}}, SHIFT(667),
  [1599] = {.entry = {.count = 1, .reusable = true}}, SHIFT(666),
  [1601] = {.entry = {.count = 1, .reusable = true}}, SHIFT(601),
  [1603] = {.entry = {.count = 1, .reusable = true}}, SHIFT(716),
  [1605] = {.entry = {.count = 1, .reusable = true}}, SHIFT(692),
  [1607] = {.entry = {.count = 1, .reusable = true}}, SHIFT(696),
  [1609] = {.entry = {.count = 1, .reusable = true}}, SHIFT(447),
  [1611] = {.entry = {.count = 1, .reusable = true}}, SHIFT(680),
  [1613] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value, 2),
  [1615] = {.entry = {.count = 1, .reusable = true}}, SHIFT(689),
  [1617] = {.entry = {.count = 1, .reusable = true}}, SHIFT(304),
  [1619] = {.entry = {.count = 1, .reusable = true}}, SHIFT(463),
  [1621] = {.entry = {.count = 1, .reusable = true}}, SHIFT(461),
  [1623] = {.entry = {.count = 1, .reusable = true}}, SHIFT(459),
  [1625] = {.entry = {.count = 1, .reusable = true}}, SHIFT(457),
  [1627] = {.entry = {.count = 1, .reusable = true}}, SHIFT(455),
  [1629] = {.entry = {.count = 1, .reusable = true}}, SHIFT(695),
  [1631] = {.entry = {.count = 1, .reusable = true}}, SHIFT(630),
  [1633] = {.entry = {.count = 1, .reusable = true}}, SHIFT(452),
  [1635] = {.entry = {.count = 1, .reusable = true}}, SHIFT(451),
  [1637] = {.entry = {.count = 1, .reusable = true}}, SHIFT(448),
  [1639] = {.entry = {.count = 1, .reusable = true}}, SHIFT(690),
  [1641] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [1643] = {.entry = {.count = 1, .reusable = true}}, SHIFT(346),
  [1645] = {.entry = {.count = 1, .reusable = true}}, SHIFT(445),
  [1647] = {.entry = {.count = 1, .reusable = true}}, SHIFT(441),
  [1649] = {.entry = {.count = 1, .reusable = true}}, SHIFT(691),
};

#ifdef __cplusplus
extern "C" {
#endif
#ifdef _WIN32
#define extern __declspec(dllexport)
#endif

extern const TSLanguage *tree_sitter_jsontm(void) {
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
