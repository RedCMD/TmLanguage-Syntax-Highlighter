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
#define STATE_COUNT 797
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 102
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
  aux_sym_beginCaptures_repeat1 = 98,
  aux_sym_fileTypes_repeat1 = 99,
  aux_sym_object_repeat1 = 100,
  aux_sym_array_repeat1 = 101,
  alias_sym_pattern = 102,
  anon_alias_sym_TILDE = 103,
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
  [aux_sym_beginCaptures_repeat1] = "beginCaptures_repeat1",
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
  [aux_sym_beginCaptures_repeat1] = aux_sym_beginCaptures_repeat1,
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
  [aux_sym_beginCaptures_repeat1] = {
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
  [787] = 787,
  [788] = 788,
  [789] = 789,
  [790] = 790,
  [791] = 791,
  [792] = 792,
  [793] = 793,
  [794] = 794,
  [795] = 795,
  [796] = 796,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(198);
      if (lookahead == '"') ADVANCE(203);
      if (lookahead == '#') ADVANCE(217);
      if (lookahead == '$') ADVANCE(159);
      if (lookahead == ',') ADVANCE(200);
      if (lookahead == '/') ADVANCE(9);
      if (lookahead == ':') ADVANCE(206);
      if (lookahead == '[') ADVANCE(211);
      if (lookahead == '\\') ADVANCE(1);
      if (lookahead == ']') ADVANCE(212);
      if (lookahead == 'a') ADVANCE(128);
      if (lookahead == 'b') ADVANCE(51);
      if (lookahead == 'c') ADVANCE(27);
      if (lookahead == 'e') ADVANCE(110);
      if (lookahead == 'f') ADVANCE(22);
      if (lookahead == 'i') ADVANCE(111);
      if (lookahead == 'm') ADVANCE(23);
      if (lookahead == 'n') ADVANCE(24);
      if (lookahead == 'p') ADVANCE(26);
      if (lookahead == 'r') ADVANCE(65);
      if (lookahead == 's') ADVANCE(39);
      if (lookahead == 't') ADVANCE(142);
      if (lookahead == 'u') ADVANCE(185);
      if (lookahead == 'v') ADVANCE(62);
      if (lookahead == 'w') ADVANCE(83);
      if (lookahead == '{') ADVANCE(199);
      if (lookahead == '}') ADVANCE(201);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(202);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(247);
      END_STATE();
    case 1:
      if (lookahead == '\n') ADVANCE(215);
      if (lookahead == '#') ADVANCE(207);
      if (lookahead != 0) ADVANCE(207);
      END_STATE();
    case 2:
      if (lookahead == '"') ADVANCE(203);
      if (lookahead == '#') ADVANCE(217);
      if (lookahead == '\\') ADVANCE(197);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(216);
      END_STATE();
    case 3:
      if (lookahead == '"') ADVANCE(203);
      if (lookahead == '$') ADVANCE(418);
      if (lookahead == '/') ADVANCE(269);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'c') ADVANCE(381);
      if (lookahead == 'f') ADVANCE(342);
      if (lookahead == 'i') ADVANCE(371);
      if (lookahead == 'n') ADVANCE(283);
      if (lookahead == 'p') ADVANCE(285);
      if (lookahead == 'r') ADVANCE(321);
      if (lookahead == 's') ADVANCE(302);
      if (lookahead == 'u') ADVANCE(444);
      if (lookahead == 'v') ADVANCE(324);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(451);
      END_STATE();
    case 4:
      if (lookahead == '"') ADVANCE(203);
      if (lookahead == '/') ADVANCE(269);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(389);
      if (lookahead == 'b') ADVANCE(310);
      if (lookahead == 'c') ADVANCE(286);
      if (lookahead == 'e') ADVANCE(367);
      if (lookahead == 'i') ADVANCE(368);
      if (lookahead == 'm') ADVANCE(282);
      if (lookahead == 'n') ADVANCE(283);
      if (lookahead == 'p') ADVANCE(285);
      if (lookahead == 'r') ADVANCE(321);
      if (lookahead == 'w') ADVANCE(338);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(451);
      END_STATE();
    case 5:
      if (lookahead == '"') ADVANCE(203);
      if (lookahead == '/') ADVANCE(269);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'c') ADVANCE(381);
      if (lookahead == 'p') ADVANCE(285);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(451);
      END_STATE();
    case 6:
      if (lookahead == '"') ADVANCE(203);
      if (lookahead == '/') ADVANCE(269);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'c') ADVANCE(381);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(246);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(451);
      END_STATE();
    case 7:
      if (lookahead == '"') ADVANCE(203);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(451);
      END_STATE();
    case 8:
      if (lookahead == '"') ADVANCE(203);
      if (lookahead == '\\') ADVANCE(196);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(208);
      END_STATE();
    case 9:
      if (lookahead == '/') ADVANCE(264);
      END_STATE();
    case 10:
      if (lookahead == 'E') ADVANCE(117);
      END_STATE();
    case 11:
      if (lookahead == 'L') ADVANCE(30);
      END_STATE();
    case 12:
      if (lookahead == 'L') ADVANCE(90);
      END_STATE();
    case 13:
      if (lookahead == 'M') ADVANCE(29);
      END_STATE();
    case 14:
      if (lookahead == 'M') ADVANCE(31);
      END_STATE();
    case 15:
      if (lookahead == 'M') ADVANCE(34);
      END_STATE();
    case 16:
      if (lookahead == 'N') ADVANCE(32);
      END_STATE();
    case 17:
      if (lookahead == 'N') ADVANCE(33);
      END_STATE();
    case 18:
      if (lookahead == 'P') ADVANCE(35);
      END_STATE();
    case 19:
      if (lookahead == 'S') ADVANCE(168);
      END_STATE();
    case 20:
      if (lookahead == 'S') ADVANCE(72);
      if (lookahead == 's') ADVANCE(226);
      END_STATE();
    case 21:
      if (lookahead == 'T') ADVANCE(194);
      END_STATE();
    case 22:
      if (lookahead == 'a') ADVANCE(97);
      if (lookahead == 'i') ADVANCE(99);
      if (lookahead == 'o') ADVANCE(98);
      END_STATE();
    case 23:
      if (lookahead == 'a') ADVANCE(172);
      END_STATE();
    case 24:
      if (lookahead == 'a') ADVANCE(105);
      if (lookahead == 'u') ADVANCE(101);
      END_STATE();
    case 25:
      if (lookahead == 'a') ADVANCE(250);
      END_STATE();
    case 26:
      if (lookahead == 'a') ADVANCE(174);
      END_STATE();
    case 27:
      if (lookahead == 'a') ADVANCE(131);
      if (lookahead == 'o') ADVANCE(109);
      END_STATE();
    case 28:
      if (lookahead == 'a') ADVANCE(147);
      if (lookahead == 'o') ADVANCE(130);
      END_STATE();
    case 29:
      if (lookahead == 'a') ADVANCE(138);
      END_STATE();
    case 30:
      if (lookahead == 'a') ADVANCE(164);
      END_STATE();
    case 31:
      if (lookahead == 'a') ADVANCE(152);
      END_STATE();
    case 32:
      if (lookahead == 'a') ADVANCE(107);
      END_STATE();
    case 33:
      if (lookahead == 'a') ADVANCE(108);
      END_STATE();
    case 34:
      if (lookahead == 'a') ADVANCE(179);
      END_STATE();
    case 35:
      if (lookahead == 'a') ADVANCE(181);
      END_STATE();
    case 36:
      if (lookahead == 'a') ADVANCE(135);
      END_STATE();
    case 37:
      if (lookahead == 'a') ADVANCE(136);
      END_STATE();
    case 38:
      if (lookahead == 'a') ADVANCE(137);
      END_STATE();
    case 39:
      if (lookahead == 'c') ADVANCE(122);
      END_STATE();
    case 40:
      if (lookahead == 'c') ADVANCE(84);
      END_STATE();
    case 41:
      if (lookahead == 'c') ADVANCE(81);
      END_STATE();
    case 42:
      if (lookahead == 'c') ADVANCE(82);
      END_STATE();
    case 43:
      if (lookahead == 'c') ADVANCE(100);
      if (lookahead == 'j') ADVANCE(64);
      END_STATE();
    case 44:
      if (lookahead == 'c') ADVANCE(176);
      END_STATE();
    case 45:
      if (lookahead == 'c') ADVANCE(175);
      END_STATE();
    case 46:
      if (lookahead == 'd') ADVANCE(232);
      END_STATE();
    case 47:
      if (lookahead == 'd') ADVANCE(260);
      END_STATE();
    case 48:
      if (lookahead == 'd') ADVANCE(18);
      END_STATE();
    case 49:
      if (lookahead == 'd') ADVANCE(88);
      END_STATE();
    case 50:
      if (lookahead == 'd') ADVANCE(58);
      END_STATE();
    case 51:
      if (lookahead == 'e') ADVANCE(80);
      END_STATE();
    case 52:
      if (lookahead == 'e') ADVANCE(21);
      END_STATE();
    case 53:
      if (lookahead == 'e') ADVANCE(220);
      END_STATE();
    case 54:
      if (lookahead == 'e') ADVANCE(266);
      END_STATE();
    case 55:
      if (lookahead == 'e') ADVANCE(267);
      END_STATE();
    case 56:
      if (lookahead == 'e') ADVANCE(16);
      END_STATE();
    case 57:
      if (lookahead == 'e') ADVANCE(234);
      END_STATE();
    case 58:
      if (lookahead == 'e') ADVANCE(213);
      END_STATE();
    case 59:
      if (lookahead == 'e') ADVANCE(15);
      END_STATE();
    case 60:
      if (lookahead == 'e') ADVANCE(218);
      END_STATE();
    case 61:
      if (lookahead == 'e') ADVANCE(222);
      END_STATE();
    case 62:
      if (lookahead == 'e') ADVANCE(144);
      END_STATE();
    case 63:
      if (lookahead == 'e') ADVANCE(104);
      END_STATE();
    case 64:
      if (lookahead == 'e') ADVANCE(44);
      END_STATE();
    case 65:
      if (lookahead == 'e') ADVANCE(129);
      END_STATE();
    case 66:
      if (lookahead == 'e') ADVANCE(119);
      END_STATE();
    case 67:
      if (lookahead == 'e') ADVANCE(145);
      END_STATE();
    case 68:
      if (lookahead == 'e') ADVANCE(153);
      END_STATE();
    case 69:
      if (lookahead == 'e') ADVANCE(155);
      END_STATE();
    case 70:
      if (lookahead == 'e') ADVANCE(156);
      END_STATE();
    case 71:
      if (lookahead == 'e') ADVANCE(139);
      END_STATE();
    case 72:
      if (lookahead == 'e') ADVANCE(103);
      END_STATE();
    case 73:
      if (lookahead == 'e') ADVANCE(157);
      END_STATE();
    case 74:
      if (lookahead == 'e') ADVANCE(158);
      END_STATE();
    case 75:
      if (lookahead == 'e') ADVANCE(141);
      END_STATE();
    case 76:
      if (lookahead == 'e') ADVANCE(45);
      END_STATE();
    case 77:
      if (lookahead == 'e') ADVANCE(120);
      END_STATE();
    case 78:
      if (lookahead == 'e') ADVANCE(146);
      END_STATE();
    case 79:
      if (lookahead == 'g') ADVANCE(19);
      END_STATE();
    case 80:
      if (lookahead == 'g') ADVANCE(85);
      END_STATE();
    case 81:
      if (lookahead == 'h') ADVANCE(228);
      END_STATE();
    case 82:
      if (lookahead == 'h') ADVANCE(254);
      END_STATE();
    case 83:
      if (lookahead == 'h') ADVANCE(89);
      END_STATE();
    case 84:
      if (lookahead == 'h') ADVANCE(63);
      END_STATE();
    case 85:
      if (lookahead == 'i') ADVANCE(112);
      END_STATE();
    case 86:
      if (lookahead == 'i') ADVANCE(47);
      END_STATE();
    case 87:
      if (lookahead == 'i') ADVANCE(124);
      END_STATE();
    case 88:
      if (lookahead == 'i') ADVANCE(115);
      END_STATE();
    case 89:
      if (lookahead == 'i') ADVANCE(102);
      END_STATE();
    case 90:
      if (lookahead == 'i') ADVANCE(121);
      END_STATE();
    case 91:
      if (lookahead == 'i') ADVANCE(170);
      END_STATE();
    case 92:
      if (lookahead == 'i') ADVANCE(125);
      END_STATE();
    case 93:
      if (lookahead == 'k') ADVANCE(71);
      END_STATE();
    case 94:
      if (lookahead == 'k') ADVANCE(75);
      END_STATE();
    case 95:
      if (lookahead == 'l') ADVANCE(192);
      END_STATE();
    case 96:
      if (lookahead == 'l') ADVANCE(268);
      END_STATE();
    case 97:
      if (lookahead == 'l') ADVANCE(163);
      END_STATE();
    case 98:
      if (lookahead == 'l') ADVANCE(49);
      END_STATE();
    case 99:
      if (lookahead == 'l') ADVANCE(52);
      if (lookahead == 'r') ADVANCE(160);
      END_STATE();
    case 100:
      if (lookahead == 'l') ADVANCE(187);
      END_STATE();
    case 101:
      if (lookahead == 'l') ADVANCE(96);
      END_STATE();
    case 102:
      if (lookahead == 'l') ADVANCE(57);
      END_STATE();
    case 103:
      if (lookahead == 'l') ADVANCE(76);
      END_STATE();
    case 104:
      if (lookahead == 'm') ADVANCE(25);
      END_STATE();
    case 105:
      if (lookahead == 'm') ADVANCE(53);
      END_STATE();
    case 106:
      if (lookahead == 'm') ADVANCE(66);
      END_STATE();
    case 107:
      if (lookahead == 'm') ADVANCE(60);
      END_STATE();
    case 108:
      if (lookahead == 'm') ADVANCE(61);
      END_STATE();
    case 109:
      if (lookahead == 'm') ADVANCE(106);
      if (lookahead == 'n') ADVANCE(177);
      END_STATE();
    case 110:
      if (lookahead == 'n') ADVANCE(46);
      END_STATE();
    case 111:
      if (lookahead == 'n') ADVANCE(43);
      END_STATE();
    case 112:
      if (lookahead == 'n') ADVANCE(230);
      END_STATE();
    case 113:
      if (lookahead == 'n') ADVANCE(248);
      END_STATE();
    case 114:
      if (lookahead == 'n') ADVANCE(20);
      END_STATE();
    case 115:
      if (lookahead == 'n') ADVANCE(79);
      END_STATE();
    case 116:
      if (lookahead == 'n') ADVANCE(11);
      END_STATE();
    case 117:
      if (lookahead == 'n') ADVANCE(48);
      END_STATE();
    case 118:
      if (lookahead == 'n') ADVANCE(154);
      END_STATE();
    case 119:
      if (lookahead == 'n') ADVANCE(166);
      END_STATE();
    case 120:
      if (lookahead == 'n') ADVANCE(183);
      END_STATE();
    case 121:
      if (lookahead == 'n') ADVANCE(59);
      END_STATE();
    case 122:
      if (lookahead == 'o') ADVANCE(133);
      END_STATE();
    case 123:
      if (lookahead == 'o') ADVANCE(143);
      END_STATE();
    case 124:
      if (lookahead == 'o') ADVANCE(113);
      END_STATE();
    case 125:
      if (lookahead == 'o') ADVANCE(114);
      END_STATE();
    case 126:
      if (lookahead == 'o') ADVANCE(140);
      END_STATE();
    case 127:
      if (lookahead == 'o') ADVANCE(162);
      END_STATE();
    case 128:
      if (lookahead == 'p') ADVANCE(132);
      END_STATE();
    case 129:
      if (lookahead == 'p') ADVANCE(127);
      END_STATE();
    case 130:
      if (lookahead == 'p') ADVANCE(13);
      END_STATE();
    case 131:
      if (lookahead == 'p') ADVANCE(169);
      END_STATE();
    case 132:
      if (lookahead == 'p') ADVANCE(95);
      END_STATE();
    case 133:
      if (lookahead == 'p') ADVANCE(56);
      END_STATE();
    case 134:
      if (lookahead == 'p') ADVANCE(69);
      END_STATE();
    case 135:
      if (lookahead == 'p') ADVANCE(173);
      END_STATE();
    case 136:
      if (lookahead == 'p') ADVANCE(180);
      END_STATE();
    case 137:
      if (lookahead == 'p') ADVANCE(182);
      END_STATE();
    case 138:
      if (lookahead == 'r') ADVANCE(93);
      END_STATE();
    case 139:
      if (lookahead == 'r') ADVANCE(258);
      END_STATE();
    case 140:
      if (lookahead == 'r') ADVANCE(224);
      END_STATE();
    case 141:
      if (lookahead == 'r') ADVANCE(256);
      END_STATE();
    case 142:
      if (lookahead == 'r') ADVANCE(188);
      END_STATE();
    case 143:
      if (lookahead == 'r') ADVANCE(193);
      END_STATE();
    case 144:
      if (lookahead == 'r') ADVANCE(161);
      END_STATE();
    case 145:
      if (lookahead == 'r') ADVANCE(118);
      END_STATE();
    case 146:
      if (lookahead == 'r') ADVANCE(116);
      END_STATE();
    case 147:
      if (lookahead == 'r') ADVANCE(184);
      END_STATE();
    case 148:
      if (lookahead == 'r') ADVANCE(68);
      END_STATE();
    case 149:
      if (lookahead == 'r') ADVANCE(70);
      END_STATE();
    case 150:
      if (lookahead == 'r') ADVANCE(73);
      END_STATE();
    case 151:
      if (lookahead == 'r') ADVANCE(74);
      END_STATE();
    case 152:
      if (lookahead == 'r') ADVANCE(94);
      END_STATE();
    case 153:
      if (lookahead == 's') ADVANCE(238);
      END_STATE();
    case 154:
      if (lookahead == 's') ADVANCE(209);
      END_STATE();
    case 155:
      if (lookahead == 's') ADVANCE(252);
      END_STATE();
    case 156:
      if (lookahead == 's') ADVANCE(242);
      END_STATE();
    case 157:
      if (lookahead == 's') ADVANCE(240);
      END_STATE();
    case 158:
      if (lookahead == 's') ADVANCE(244);
      END_STATE();
    case 159:
      if (lookahead == 's') ADVANCE(40);
      END_STATE();
    case 160:
      if (lookahead == 's') ADVANCE(165);
      END_STATE();
    case 161:
      if (lookahead == 's') ADVANCE(87);
      END_STATE();
    case 162:
      if (lookahead == 's') ADVANCE(91);
      END_STATE();
    case 163:
      if (lookahead == 's') ADVANCE(55);
      END_STATE();
    case 164:
      if (lookahead == 's') ADVANCE(167);
      END_STATE();
    case 165:
      if (lookahead == 't') ADVANCE(12);
      END_STATE();
    case 166:
      if (lookahead == 't') ADVANCE(262);
      END_STATE();
    case 167:
      if (lookahead == 't') ADVANCE(236);
      END_STATE();
    case 168:
      if (lookahead == 't') ADVANCE(28);
      END_STATE();
    case 169:
      if (lookahead == 't') ADVANCE(186);
      END_STATE();
    case 170:
      if (lookahead == 't') ADVANCE(123);
      END_STATE();
    case 171:
      if (lookahead == 't') ADVANCE(67);
      END_STATE();
    case 172:
      if (lookahead == 't') ADVANCE(41);
      END_STATE();
    case 173:
      if (lookahead == 't') ADVANCE(189);
      END_STATE();
    case 174:
      if (lookahead == 't') ADVANCE(171);
      END_STATE();
    case 175:
      if (lookahead == 't') ADVANCE(126);
      END_STATE();
    case 176:
      if (lookahead == 't') ADVANCE(92);
      END_STATE();
    case 177:
      if (lookahead == 't') ADVANCE(77);
      END_STATE();
    case 178:
      if (lookahead == 't') ADVANCE(78);
      END_STATE();
    case 179:
      if (lookahead == 't') ADVANCE(42);
      END_STATE();
    case 180:
      if (lookahead == 't') ADVANCE(190);
      END_STATE();
    case 181:
      if (lookahead == 't') ADVANCE(178);
      END_STATE();
    case 182:
      if (lookahead == 't') ADVANCE(191);
      END_STATE();
    case 183:
      if (lookahead == 't') ADVANCE(17);
      END_STATE();
    case 184:
      if (lookahead == 't') ADVANCE(14);
      END_STATE();
    case 185:
      if (lookahead == 'u') ADVANCE(86);
      END_STATE();
    case 186:
      if (lookahead == 'u') ADVANCE(148);
      END_STATE();
    case 187:
      if (lookahead == 'u') ADVANCE(50);
      END_STATE();
    case 188:
      if (lookahead == 'u') ADVANCE(54);
      END_STATE();
    case 189:
      if (lookahead == 'u') ADVANCE(149);
      END_STATE();
    case 190:
      if (lookahead == 'u') ADVANCE(150);
      END_STATE();
    case 191:
      if (lookahead == 'u') ADVANCE(151);
      END_STATE();
    case 192:
      if (lookahead == 'y') ADVANCE(10);
      END_STATE();
    case 193:
      if (lookahead == 'y') ADVANCE(204);
      END_STATE();
    case 194:
      if (lookahead == 'y') ADVANCE(134);
      END_STATE();
    case 195:
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(451);
      END_STATE();
    case 196:
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(207);
      END_STATE();
    case 197:
      if (lookahead != 0 &&
          lookahead != '#') ADVANCE(215);
      END_STATE();
    case 198:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 199:
      ACCEPT_TOKEN(anon_sym_LBRACE);
      END_STATE();
    case 200:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 201:
      ACCEPT_TOKEN(anon_sym_RBRACE);
      END_STATE();
    case 202:
      ACCEPT_TOKEN(sym__whitespace);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(202);
      END_STATE();
    case 203:
      ACCEPT_TOKEN(anon_sym_DQUOTE);
      END_STATE();
    case 204:
      ACCEPT_TOKEN(anon_sym_repository);
      END_STATE();
    case 205:
      ACCEPT_TOKEN(anon_sym_repository);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 206:
      ACCEPT_TOKEN(anon_sym_COLON);
      END_STATE();
    case 207:
      ACCEPT_TOKEN(aux_sym_repo_token1);
      END_STATE();
    case 208:
      ACCEPT_TOKEN(aux_sym_repo_token2);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"' &&
          lookahead != '\\') ADVANCE(208);
      END_STATE();
    case 209:
      ACCEPT_TOKEN(anon_sym_patterns);
      END_STATE();
    case 210:
      ACCEPT_TOKEN(anon_sym_patterns);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 211:
      ACCEPT_TOKEN(anon_sym_LBRACK);
      END_STATE();
    case 212:
      ACCEPT_TOKEN(anon_sym_RBRACK);
      END_STATE();
    case 213:
      ACCEPT_TOKEN(anon_sym_include);
      END_STATE();
    case 214:
      ACCEPT_TOKEN(anon_sym_include);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 215:
      ACCEPT_TOKEN(aux_sym__includeScope_token1);
      END_STATE();
    case 216:
      ACCEPT_TOKEN(aux_sym__includeScope_token2);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"' &&
          lookahead != '#' &&
          lookahead != '\\') ADVANCE(216);
      END_STATE();
    case 217:
      ACCEPT_TOKEN(anon_sym_POUND);
      END_STATE();
    case 218:
      ACCEPT_TOKEN(anon_sym_scopeName);
      END_STATE();
    case 219:
      ACCEPT_TOKEN(anon_sym_scopeName);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 220:
      ACCEPT_TOKEN(anon_sym_name);
      END_STATE();
    case 221:
      ACCEPT_TOKEN(anon_sym_name);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 222:
      ACCEPT_TOKEN(anon_sym_contentName);
      END_STATE();
    case 223:
      ACCEPT_TOKEN(anon_sym_contentName);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 224:
      ACCEPT_TOKEN(anon_sym_injectionSelector);
      END_STATE();
    case 225:
      ACCEPT_TOKEN(anon_sym_injectionSelector);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 226:
      ACCEPT_TOKEN(anon_sym_injections);
      END_STATE();
    case 227:
      ACCEPT_TOKEN(anon_sym_injections);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 228:
      ACCEPT_TOKEN(anon_sym_match);
      END_STATE();
    case 229:
      ACCEPT_TOKEN(anon_sym_match);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 230:
      ACCEPT_TOKEN(anon_sym_begin);
      if (lookahead == 'C') ADVANCE(37);
      END_STATE();
    case 231:
      ACCEPT_TOKEN(anon_sym_begin);
      if (lookahead == 'C') ADVANCE(296);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 232:
      ACCEPT_TOKEN(anon_sym_end);
      if (lookahead == 'C') ADVANCE(36);
      END_STATE();
    case 233:
      ACCEPT_TOKEN(anon_sym_end);
      if (lookahead == 'C') ADVANCE(295);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 234:
      ACCEPT_TOKEN(anon_sym_while);
      if (lookahead == 'C') ADVANCE(38);
      END_STATE();
    case 235:
      ACCEPT_TOKEN(anon_sym_while);
      if (lookahead == 'C') ADVANCE(297);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 236:
      ACCEPT_TOKEN(anon_sym_applyEndPatternLast);
      END_STATE();
    case 237:
      ACCEPT_TOKEN(anon_sym_applyEndPatternLast);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 238:
      ACCEPT_TOKEN(anon_sym_captures);
      END_STATE();
    case 239:
      ACCEPT_TOKEN(anon_sym_captures);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 240:
      ACCEPT_TOKEN(anon_sym_beginCaptures);
      END_STATE();
    case 241:
      ACCEPT_TOKEN(anon_sym_beginCaptures);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 242:
      ACCEPT_TOKEN(anon_sym_endCaptures);
      END_STATE();
    case 243:
      ACCEPT_TOKEN(anon_sym_endCaptures);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 244:
      ACCEPT_TOKEN(anon_sym_whileCaptures);
      END_STATE();
    case 245:
      ACCEPT_TOKEN(anon_sym_whileCaptures);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 246:
      ACCEPT_TOKEN(aux_sym_capture_token1);
      if (lookahead == '\\') ADVANCE(195);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(246);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 247:
      ACCEPT_TOKEN(aux_sym_capture_token1);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(247);
      END_STATE();
    case 248:
      ACCEPT_TOKEN(anon_sym_version);
      END_STATE();
    case 249:
      ACCEPT_TOKEN(anon_sym_version);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 250:
      ACCEPT_TOKEN(anon_sym_DOLLARschema);
      END_STATE();
    case 251:
      ACCEPT_TOKEN(anon_sym_DOLLARschema);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 252:
      ACCEPT_TOKEN(anon_sym_fileTypes);
      END_STATE();
    case 253:
      ACCEPT_TOKEN(anon_sym_fileTypes);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 254:
      ACCEPT_TOKEN(anon_sym_firstLineMatch);
      END_STATE();
    case 255:
      ACCEPT_TOKEN(anon_sym_firstLineMatch);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 256:
      ACCEPT_TOKEN(anon_sym_foldingStartMarker);
      END_STATE();
    case 257:
      ACCEPT_TOKEN(anon_sym_foldingStartMarker);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 258:
      ACCEPT_TOKEN(anon_sym_foldingStopMarker);
      END_STATE();
    case 259:
      ACCEPT_TOKEN(anon_sym_foldingStopMarker);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 260:
      ACCEPT_TOKEN(anon_sym_uuid);
      END_STATE();
    case 261:
      ACCEPT_TOKEN(anon_sym_uuid);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 262:
      ACCEPT_TOKEN(anon_sym_comment);
      END_STATE();
    case 263:
      ACCEPT_TOKEN(anon_sym_comment);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 264:
      ACCEPT_TOKEN(anon_sym_SLASH_SLASH);
      END_STATE();
    case 265:
      ACCEPT_TOKEN(anon_sym_SLASH_SLASH);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 266:
      ACCEPT_TOKEN(anon_sym_true);
      END_STATE();
    case 267:
      ACCEPT_TOKEN(anon_sym_false);
      END_STATE();
    case 268:
      ACCEPT_TOKEN(sym_null);
      END_STATE();
    case 269:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '/') ADVANCE(265);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 270:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'E') ADVANCE(375);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 271:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'L') ADVANCE(289);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 272:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'L') ADVANCE(349);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 273:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'M') ADVANCE(288);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 274:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'M') ADVANCE(290);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 275:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'M') ADVANCE(291);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 276:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'N') ADVANCE(292);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 277:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'N') ADVANCE(293);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 278:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'P') ADVANCE(294);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 279:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'S') ADVANCE(426);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 280:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'S') ADVANCE(332);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(227);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 281:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'T') ADVANCE(450);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 282:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(427);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 283:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(360);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 284:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(251);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 285:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(431);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 286:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(391);
      if (lookahead == 'o') ADVANCE(365);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 287:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(408);
      if (lookahead == 'o') ADVANCE(390);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 288:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(397);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 289:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(420);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 290:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(432);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 291:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(410);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 292:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(363);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 293:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(364);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 294:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(435);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 295:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(394);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 296:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(395);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 297:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'a') ADVANCE(396);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 298:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'c') ADVANCE(339);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 299:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'c') ADVANCE(355);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 300:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'c') ADVANCE(341);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 301:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'c') ADVANCE(340);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 302:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'c') ADVANCE(383);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 303:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'c') ADVANCE(438);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 304:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'c') ADVANCE(433);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 305:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'd') ADVANCE(233);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 306:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'd') ADVANCE(278);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 307:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'd') ADVANCE(261);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 308:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'd') ADVANCE(313);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 309:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'd') ADVANCE(347);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 310:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(337);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 311:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(221);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 312:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(235);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 313:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(214);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 314:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(223);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 315:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(281);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 316:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(274);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 317:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(219);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 318:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(411);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 319:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(402);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 320:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(362);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 321:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(388);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 322:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(377);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 323:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(413);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 324:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(409);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 325:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(303);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 326:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(414);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 327:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(415);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 328:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(398);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 329:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(416);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 330:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(400);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 331:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(403);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 332:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(359);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 333:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(378);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 334:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(304);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 335:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'e') ADVANCE(277);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 336:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'g') ADVANCE(279);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 337:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'g') ADVANCE(343);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 338:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'h') ADVANCE(344);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 339:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'h') ADVANCE(229);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 340:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'h') ADVANCE(255);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 341:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'h') ADVANCE(320);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 342:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'i') ADVANCE(358);
      if (lookahead == 'o') ADVANCE(356);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 343:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'i') ADVANCE(369);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 344:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'i') ADVANCE(357);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 345:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'i') ADVANCE(307);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 346:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'i') ADVANCE(385);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 347:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'i') ADVANCE(374);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 348:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'i') ADVANCE(428);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 349:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'i') ADVANCE(379);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 350:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'i') ADVANCE(386);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 351:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'j') ADVANCE(325);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 352:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'k') ADVANCE(328);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 353:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'k') ADVANCE(330);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 354:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'l') ADVANCE(448);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 355:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'l') ADVANCE(443);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 356:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'l') ADVANCE(309);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 357:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'l') ADVANCE(312);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 358:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'l') ADVANCE(315);
      if (lookahead == 'r') ADVANCE(421);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 359:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'l') ADVANCE(334);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 360:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'm') ADVANCE(311);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 361:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'm') ADVANCE(322);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 362:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'm') ADVANCE(284);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 363:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'm') ADVANCE(314);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 364:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'm') ADVANCE(317);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 365:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'm') ADVANCE(361);
      if (lookahead == 'n') ADVANCE(437);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 366:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'm') ADVANCE(361);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 367:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(305);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 368:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(299);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 369:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(231);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 370:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(271);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 371:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(351);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 372:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(249);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 373:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(280);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 374:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(336);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 375:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(306);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 376:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(412);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 377:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(423);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 378:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(424);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 379:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'n') ADVANCE(316);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 380:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'o') ADVANCE(417);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 381:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'o') ADVANCE(366);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 382:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'o') ADVANCE(401);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 383:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'o') ADVANCE(392);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 384:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'o') ADVANCE(399);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 385:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'o') ADVANCE(372);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 386:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'o') ADVANCE(373);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 387:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'p') ADVANCE(354);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 388:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'p') ADVANCE(380);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 389:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'p') ADVANCE(387);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 390:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'p') ADVANCE(273);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 391:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'p') ADVANCE(422);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 392:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'p') ADVANCE(335);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 393:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'p') ADVANCE(329);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 394:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'p') ADVANCE(436);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 395:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'p') ADVANCE(439);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 396:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'p') ADVANCE(440);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 397:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(352);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 398:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(259);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 399:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(225);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 400:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(257);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 401:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(449);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 402:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(376);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 403:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(370);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 404:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(318);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 405:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(323);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 406:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(326);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 407:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(327);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 408:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(441);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 409:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(419);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 410:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'r') ADVANCE(353);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 411:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(239);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 412:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(210);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 413:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(243);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 414:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(241);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 415:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(245);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 416:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(253);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 417:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(348);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 418:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(300);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 419:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(346);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 420:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(425);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 421:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 's') ADVANCE(429);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 422:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(442);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 423:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(263);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 424:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(276);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 425:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(237);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 426:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(287);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 427:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(298);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 428:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(382);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 429:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(272);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 430:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(319);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 431:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(430);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 432:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(301);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 433:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(384);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 434:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(331);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 435:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(434);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 436:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(445);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 437:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(333);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 438:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(350);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 439:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(446);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 440:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(447);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 441:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 't') ADVANCE(275);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 442:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'u') ADVANCE(404);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 443:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'u') ADVANCE(308);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 444:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'u') ADVANCE(345);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 445:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'u') ADVANCE(405);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 446:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'u') ADVANCE(406);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 447:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'u') ADVANCE(407);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 448:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'y') ADVANCE(270);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 449:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'y') ADVANCE(205);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 450:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead == 'y') ADVANCE(393);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
      END_STATE();
    case 451:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(195);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(451);
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
  [55] = {.lex_state = 0},
  [56] = {.lex_state = 0},
  [57] = {.lex_state = 0},
  [58] = {.lex_state = 0},
  [59] = {.lex_state = 0},
  [60] = {.lex_state = 0},
  [61] = {.lex_state = 0},
  [62] = {.lex_state = 0},
  [63] = {.lex_state = 0},
  [64] = {.lex_state = 0},
  [65] = {.lex_state = 2},
  [66] = {.lex_state = 2},
  [67] = {.lex_state = 2},
  [68] = {.lex_state = 2},
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
  [89] = {.lex_state = 0},
  [90] = {.lex_state = 0},
  [91] = {.lex_state = 0},
  [92] = {.lex_state = 0},
  [93] = {.lex_state = 0},
  [94] = {.lex_state = 0},
  [95] = {.lex_state = 5},
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
  [131] = {.lex_state = 0},
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
  [175] = {.lex_state = 6},
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
  [190] = {.lex_state = 2},
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
  [248] = {.lex_state = 8},
  [249] = {.lex_state = 0},
  [250] = {.lex_state = 0},
  [251] = {.lex_state = 0},
  [252] = {.lex_state = 0},
  [253] = {.lex_state = 8},
  [254] = {.lex_state = 0},
  [255] = {.lex_state = 0},
  [256] = {.lex_state = 0},
  [257] = {.lex_state = 0},
  [258] = {.lex_state = 0},
  [259] = {.lex_state = 0},
  [260] = {.lex_state = 0},
  [261] = {.lex_state = 0},
  [262] = {.lex_state = 0},
  [263] = {.lex_state = 8},
  [264] = {.lex_state = 8},
  [265] = {.lex_state = 8},
  [266] = {.lex_state = 0},
  [267] = {.lex_state = 0},
  [268] = {.lex_state = 0},
  [269] = {.lex_state = 0},
  [270] = {.lex_state = 0},
  [271] = {.lex_state = 0},
  [272] = {.lex_state = 8},
  [273] = {.lex_state = 0},
  [274] = {.lex_state = 0},
  [275] = {.lex_state = 0},
  [276] = {.lex_state = 0},
  [277] = {.lex_state = 0},
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
  [290] = {.lex_state = 0},
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
  [304] = {.lex_state = 0},
  [305] = {.lex_state = 0},
  [306] = {.lex_state = 0},
  [307] = {.lex_state = 0},
  [308] = {.lex_state = 0},
  [309] = {.lex_state = 0},
  [310] = {.lex_state = 0},
  [311] = {.lex_state = 0},
  [312] = {.lex_state = 0},
  [313] = {.lex_state = 0},
  [314] = {.lex_state = 8},
  [315] = {.lex_state = 0},
  [316] = {.lex_state = 0},
  [317] = {.lex_state = 0},
  [318] = {.lex_state = 0},
  [319] = {.lex_state = 0},
  [320] = {.lex_state = 0},
  [321] = {.lex_state = 0},
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
  [363] = {.lex_state = 8},
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
  [570] = {.lex_state = 8},
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
  [599] = {.lex_state = 8},
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
  [734] = {.lex_state = 0},
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
  [747] = {.lex_state = 0},
  [748] = {.lex_state = 0},
  [749] = {.lex_state = 0},
  [750] = {.lex_state = 0},
  [751] = {.lex_state = 0},
  [752] = {.lex_state = 0},
  [753] = {.lex_state = 0},
  [754] = {.lex_state = 7},
  [755] = {.lex_state = 0},
  [756] = {.lex_state = 0},
  [757] = {.lex_state = 0},
  [758] = {.lex_state = 0},
  [759] = {.lex_state = 7},
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
  [787] = {.lex_state = 0},
  [788] = {.lex_state = 0},
  [789] = {.lex_state = 0},
  [790] = {.lex_state = 0},
  [791] = {.lex_state = 0},
  [792] = {.lex_state = 0},
  [793] = {.lex_state = 0},
  [794] = {.lex_state = 0},
  [795] = {.lex_state = 0},
  [796] = {.lex_state = 0},
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
    [sym_json] = STATE(772),
    [aux_sym_json_repeat3] = STATE(529),
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
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(128), 18,
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
    STATE(2), 1,
      aux_sym_json_repeat1,
    STATE(194), 18,
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
    STATE(7), 1,
      aux_sym_json_repeat1,
    STATE(86), 17,
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
    ACTIONS(23), 1,
      sym__whitespace,
    STATE(8), 1,
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
  [128] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
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
  [158] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(21), 1,
      anon_sym_DQUOTE,
    ACTIONS(25), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(193), 17,
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
  [190] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
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
  [220] = 4,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(27), 1,
      sym__whitespace,
    STATE(6), 1,
      aux_sym_json_repeat1,
    STATE(447), 18,
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
  [250] = 4,
    ACTIONS(21), 1,
      anon_sym_DQUOTE,
    ACTIONS(29), 1,
      sym__whitespace,
    STATE(11), 1,
      aux_sym_json_repeat1,
    STATE(690), 17,
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
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(21), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(653), 17,
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
    STATE(721), 17,
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
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(21), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(690), 17,
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
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(95), 1,
      anon_sym_LBRACK,
    ACTIONS(97), 1,
      anon_sym_RBRACK,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(103), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(219), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [509] = 10,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(95), 1,
      anon_sym_LBRACK,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(105), 1,
      sym__whitespace,
    ACTIONS(107), 1,
      anon_sym_RBRACK,
    ACTIONS(109), 1,
      sym_null,
    STATE(16), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(172), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [545] = 10,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(95), 1,
      anon_sym_LBRACK,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(111), 1,
      sym__whitespace,
    ACTIONS(113), 1,
      anon_sym_RBRACK,
    ACTIONS(115), 1,
      sym_null,
    STATE(19), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(113), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [581] = 10,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(95), 1,
      anon_sym_LBRACK,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(117), 1,
      anon_sym_RBRACK,
    ACTIONS(119), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(177), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [617] = 9,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(95), 1,
      anon_sym_LBRACK,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(121), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(489), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [650] = 9,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(95), 1,
      anon_sym_LBRACK,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(123), 1,
      sym__whitespace,
    ACTIONS(125), 1,
      sym_null,
    STATE(20), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(554), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [683] = 9,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(95), 1,
      anon_sym_LBRACK,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(127), 1,
      sym__whitespace,
    ACTIONS(129), 1,
      sym_null,
    STATE(23), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(603), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [716] = 9,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(91), 1,
      anon_sym_LBRACE,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(95), 1,
      anon_sym_LBRACK,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(125), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(554), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [749] = 9,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      anon_sym_LBRACK,
    ACTIONS(135), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(426), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [781] = 9,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      anon_sym_LBRACK,
    ACTIONS(135), 1,
      sym_null,
    ACTIONS(137), 1,
      sym__whitespace,
    STATE(30), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(426), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [813] = 9,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      anon_sym_LBRACK,
    ACTIONS(139), 1,
      sym__whitespace,
    ACTIONS(141), 1,
      sym_null,
    STATE(31), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(647), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [845] = 9,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      anon_sym_LBRACK,
    ACTIONS(143), 1,
      sym__whitespace,
    ACTIONS(145), 1,
      sym_null,
    STATE(28), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(679), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [877] = 9,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      anon_sym_LBRACK,
    ACTIONS(141), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(647), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [909] = 9,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      anon_sym_LBRACK,
    ACTIONS(147), 1,
      sym__whitespace,
    ACTIONS(149), 1,
      sym_null,
    STATE(24), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(654), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [941] = 9,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      anon_sym_LBRACK,
    ACTIONS(151), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(562), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [973] = 9,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      anon_sym_LBRACK,
    ACTIONS(153), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(561), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1005] = 9,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      anon_sym_LBRACK,
    ACTIONS(145), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(679), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1037] = 3,
    ACTIONS(157), 1,
      sym__whitespace,
    STATE(33), 1,
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
  [1057] = 9,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      anon_sym_LBRACE,
    ACTIONS(133), 1,
      anon_sym_LBRACK,
    ACTIONS(160), 1,
      sym__whitespace,
    ACTIONS(162), 1,
      sym_null,
    STATE(32), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(717), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1089] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(164), 1,
      anon_sym_RBRACE,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(100), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1109] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(168), 1,
      anon_sym_RBRACE,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(197), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1129] = 5,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(172), 1,
      anon_sym_RBRACE,
    ACTIONS(174), 1,
      sym__whitespace,
    STATE(35), 1,
      aux_sym_json_repeat1,
    STATE(168), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1149] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(172), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(168), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1169] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(176), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(154), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1189] = 5,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(176), 1,
      anon_sym_RBRACE,
    ACTIONS(178), 1,
      sym__whitespace,
    STATE(48), 1,
      aux_sym_json_repeat1,
    STATE(154), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1209] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(180), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(116), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1229] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(182), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(107), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1249] = 5,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(182), 1,
      anon_sym_RBRACE,
    ACTIONS(184), 1,
      sym__whitespace,
    STATE(45), 1,
      aux_sym_json_repeat1,
    STATE(107), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1269] = 5,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(186), 1,
      anon_sym_RBRACE,
    ACTIONS(188), 1,
      sym__whitespace,
    STATE(36), 1,
      aux_sym_json_repeat1,
    STATE(155), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1289] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(190), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(173), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1309] = 5,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(192), 1,
      anon_sym_RBRACE,
    ACTIONS(194), 1,
      sym__whitespace,
    STATE(39), 1,
      aux_sym_json_repeat1,
    STATE(96), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1329] = 5,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(196), 1,
      anon_sym_RBRACE,
    ACTIONS(198), 1,
      sym__whitespace,
    STATE(38), 1,
      aux_sym_json_repeat1,
    STATE(184), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1349] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(200), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(207), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1369] = 5,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(200), 1,
      anon_sym_RBRACE,
    ACTIONS(202), 1,
      sym__whitespace,
    STATE(41), 1,
      aux_sym_json_repeat1,
    STATE(207), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1389] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(204), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(186), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1409] = 5,
    ACTIONS(164), 1,
      anon_sym_RBRACE,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(206), 1,
      sym__whitespace,
    STATE(50), 1,
      aux_sym_json_repeat1,
    STATE(100), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1429] = 5,
    ACTIONS(168), 1,
      anon_sym_RBRACE,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(208), 1,
      sym__whitespace,
    STATE(42), 1,
      aux_sym_json_repeat1,
    STATE(197), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1449] = 6,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(210), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(588), 2,
      sym_boolean,
      sym_integer,
  [1470] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(670), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1487] = 4,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(212), 1,
      sym__whitespace,
    STATE(54), 1,
      aux_sym_json_repeat1,
    STATE(613), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1504] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(726), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1521] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(720), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1538] = 6,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(210), 1,
      sym_null,
    ACTIONS(214), 1,
      sym__whitespace,
    STATE(60), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(588), 2,
      sym_boolean,
      sym_integer,
  [1559] = 4,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(216), 1,
      sym__whitespace,
    STATE(56), 1,
      aux_sym_json_repeat1,
    STATE(686), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1576] = 6,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(218), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(642), 2,
      sym_boolean,
      sym_integer,
  [1597] = 4,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    ACTIONS(220), 1,
      sym__whitespace,
    STATE(62), 1,
      aux_sym_json_repeat1,
    STATE(670), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1614] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(170), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(714), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1631] = 4,
    ACTIONS(166), 1,
      anon_sym_DQUOTE,
    ACTIONS(222), 1,
      sym__whitespace,
    STATE(57), 1,
      aux_sym_json_repeat1,
    STATE(726), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1648] = 6,
    ACTIONS(99), 1,
      aux_sym_capture_token1,
    ACTIONS(224), 1,
      sym__whitespace,
    ACTIONS(226), 1,
      sym_null,
    STATE(53), 1,
      aux_sym_json_repeat1,
    ACTIONS(101), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(523), 2,
      sym_boolean,
      sym_integer,
  [1669] = 5,
    ACTIONS(228), 1,
      anon_sym_DQUOTE,
    ACTIONS(232), 1,
      anon_sym_POUND,
    STATE(190), 1,
      aux_sym__includeScope,
    STATE(777), 1,
      sym__includeItem,
    ACTIONS(230), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1686] = 5,
    ACTIONS(232), 1,
      anon_sym_POUND,
    STATE(65), 1,
      aux_sym__includeScope,
    STATE(775), 1,
      sym_value,
    STATE(782), 1,
      sym__includeItem,
    ACTIONS(234), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1703] = 5,
    ACTIONS(232), 1,
      anon_sym_POUND,
    STATE(65), 1,
      aux_sym__includeScope,
    STATE(782), 1,
      sym__includeItem,
    STATE(783), 1,
      sym_value,
    ACTIONS(234), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1720] = 5,
    ACTIONS(232), 1,
      anon_sym_POUND,
    STATE(65), 1,
      aux_sym__includeScope,
    STATE(764), 1,
      sym_value,
    STATE(782), 1,
      sym__includeItem,
    ACTIONS(234), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1737] = 5,
    ACTIONS(236), 1,
      anon_sym_COMMA,
    ACTIONS(239), 1,
      anon_sym_RBRACE,
    ACTIONS(241), 1,
      sym__whitespace,
    STATE(69), 1,
      aux_sym_injection_repeat1,
    STATE(673), 1,
      aux_sym_json_repeat1,
  [1753] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(244), 1,
      anon_sym_RBRACE,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(150), 1,
      sym_capture,
  [1769] = 5,
    ACTIONS(113), 1,
      anon_sym_RBRACE,
    ACTIONS(248), 1,
      sym__whitespace,
    ACTIONS(250), 1,
      anon_sym_DQUOTE,
    STATE(108), 1,
      sym_item,
    STATE(109), 1,
      aux_sym_json_repeat1,
  [1785] = 5,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(254), 1,
      anon_sym_RBRACE,
    ACTIONS(256), 1,
      sym__whitespace,
    STATE(69), 1,
      aux_sym_injection_repeat1,
    STATE(257), 1,
      aux_sym_json_repeat1,
  [1801] = 5,
    ACTIONS(258), 1,
      anon_sym_COMMA,
    ACTIONS(260), 1,
      sym__whitespace,
    ACTIONS(262), 1,
      anon_sym_RBRACK,
    STATE(101), 1,
      aux_sym_fileTypes_repeat1,
    STATE(356), 1,
      aux_sym_json_repeat1,
  [1817] = 5,
    ACTIONS(264), 1,
      anon_sym_COMMA,
    ACTIONS(266), 1,
      anon_sym_RBRACE,
    ACTIONS(268), 1,
      sym__whitespace,
    STATE(114), 1,
      aux_sym_injections_repeat1,
    STATE(365), 1,
      aux_sym_json_repeat1,
  [1833] = 5,
    ACTIONS(264), 1,
      anon_sym_COMMA,
    ACTIONS(266), 1,
      anon_sym_RBRACE,
    ACTIONS(268), 1,
      sym__whitespace,
    STATE(110), 1,
      aux_sym_injections_repeat1,
    STATE(365), 1,
      aux_sym_json_repeat1,
  [1849] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(270), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(204), 1,
      sym_capture,
  [1865] = 5,
    ACTIONS(270), 1,
      anon_sym_RBRACE,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(274), 1,
      sym__whitespace,
    STATE(217), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(241), 1,
      aux_sym_json_repeat1,
  [1881] = 5,
    ACTIONS(270), 1,
      anon_sym_RBRACE,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(274), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(241), 1,
      aux_sym_json_repeat1,
  [1897] = 5,
    ACTIONS(276), 1,
      anon_sym_COMMA,
    ACTIONS(278), 1,
      sym__whitespace,
    ACTIONS(280), 1,
      anon_sym_RBRACK,
    STATE(94), 1,
      aux_sym_patterns_repeat1,
    STATE(381), 1,
      aux_sym_json_repeat1,
  [1913] = 5,
    ACTIONS(276), 1,
      anon_sym_COMMA,
    ACTIONS(282), 1,
      sym__whitespace,
    ACTIONS(284), 1,
      anon_sym_RBRACK,
    STATE(127), 1,
      aux_sym_patterns_repeat1,
    STATE(385), 1,
      aux_sym_json_repeat1,
  [1929] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(286), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(224), 1,
      sym_capture,
  [1945] = 5,
    ACTIONS(288), 1,
      anon_sym_COMMA,
    ACTIONS(290), 1,
      anon_sym_RBRACE,
    ACTIONS(292), 1,
      sym__whitespace,
    STATE(84), 1,
      aux_sym__pattern_repeat1,
    STATE(386), 1,
      aux_sym_json_repeat1,
  [1961] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(286), 1,
      anon_sym_RBRACE,
    ACTIONS(294), 1,
      sym__whitespace,
    STATE(223), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(240), 1,
      aux_sym_json_repeat1,
  [1977] = 5,
    ACTIONS(296), 1,
      anon_sym_COMMA,
    ACTIONS(299), 1,
      anon_sym_RBRACE,
    ACTIONS(301), 1,
      sym__whitespace,
    STATE(84), 1,
      aux_sym__pattern_repeat1,
    STATE(480), 1,
      aux_sym_json_repeat1,
  [1993] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(286), 1,
      anon_sym_RBRACE,
    ACTIONS(294), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(240), 1,
      aux_sym_json_repeat1,
  [2009] = 5,
    ACTIONS(25), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(306), 1,
      sym__whitespace,
    STATE(192), 1,
      aux_sym_json_repeat2,
    STATE(269), 1,
      aux_sym_json_repeat1,
  [2025] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(308), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(216), 1,
      sym_capture,
  [2041] = 5,
    ACTIONS(310), 1,
      anon_sym_COMMA,
    ACTIONS(312), 1,
      anon_sym_RBRACE,
    ACTIONS(314), 1,
      sym__whitespace,
    STATE(142), 1,
      aux_sym_repository_repeat1,
    STATE(353), 1,
      aux_sym_json_repeat1,
  [2057] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(308), 1,
      anon_sym_RBRACE,
    ACTIONS(316), 1,
      sym__whitespace,
    STATE(205), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(255), 1,
      aux_sym_json_repeat1,
  [2073] = 5,
    ACTIONS(310), 1,
      anon_sym_COMMA,
    ACTIONS(318), 1,
      anon_sym_RBRACE,
    ACTIONS(320), 1,
      sym__whitespace,
    STATE(88), 1,
      aux_sym_repository_repeat1,
    STATE(402), 1,
      aux_sym_json_repeat1,
  [2089] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(308), 1,
      anon_sym_RBRACE,
    ACTIONS(316), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(255), 1,
      aux_sym_json_repeat1,
  [2105] = 5,
    ACTIONS(322), 1,
      anon_sym_COMMA,
    ACTIONS(325), 1,
      anon_sym_RBRACE,
    ACTIONS(327), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(736), 1,
      aux_sym_json_repeat1,
  [2121] = 5,
    ACTIONS(310), 1,
      anon_sym_COMMA,
    ACTIONS(318), 1,
      anon_sym_RBRACE,
    ACTIONS(320), 1,
      sym__whitespace,
    STATE(142), 1,
      aux_sym_repository_repeat1,
    STATE(402), 1,
      aux_sym_json_repeat1,
  [2137] = 5,
    ACTIONS(276), 1,
      anon_sym_COMMA,
    ACTIONS(330), 1,
      sym__whitespace,
    ACTIONS(332), 1,
      anon_sym_RBRACK,
    STATE(127), 1,
      aux_sym_patterns_repeat1,
    STATE(309), 1,
      aux_sym_json_repeat1,
  [2153] = 5,
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
  [2169] = 5,
    ACTIONS(176), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(334), 1,
      sym__whitespace,
    STATE(152), 1,
      aux_sym_injection_repeat1,
    STATE(304), 1,
      aux_sym_json_repeat1,
  [2185] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(336), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(212), 1,
      sym__string,
  [2201] = 5,
    ACTIONS(258), 1,
      anon_sym_COMMA,
    ACTIONS(336), 1,
      anon_sym_RBRACK,
    ACTIONS(338), 1,
      sym__whitespace,
    STATE(73), 1,
      aux_sym_fileTypes_repeat1,
    STATE(423), 1,
      aux_sym_json_repeat1,
  [2217] = 5,
    ACTIONS(258), 1,
      anon_sym_COMMA,
    ACTIONS(336), 1,
      anon_sym_RBRACK,
    ACTIONS(338), 1,
      sym__whitespace,
    STATE(101), 1,
      aux_sym_fileTypes_repeat1,
    STATE(423), 1,
      aux_sym_json_repeat1,
  [2233] = 5,
    ACTIONS(204), 1,
      anon_sym_RBRACE,
    ACTIONS(340), 1,
      anon_sym_COMMA,
    ACTIONS(342), 1,
      sym__whitespace,
    STATE(185), 1,
      aux_sym_captures_repeat1,
    STATE(266), 1,
      aux_sym_json_repeat1,
  [2249] = 5,
    ACTIONS(344), 1,
      anon_sym_COMMA,
    ACTIONS(347), 1,
      sym__whitespace,
    ACTIONS(350), 1,
      anon_sym_RBRACK,
    STATE(101), 1,
      aux_sym_fileTypes_repeat1,
    STATE(438), 1,
      aux_sym_json_repeat1,
  [2265] = 5,
    ACTIONS(204), 1,
      anon_sym_RBRACE,
    ACTIONS(340), 1,
      anon_sym_COMMA,
    ACTIONS(342), 1,
      sym__whitespace,
    STATE(103), 1,
      aux_sym_captures_repeat1,
    STATE(266), 1,
      aux_sym_json_repeat1,
  [2281] = 5,
    ACTIONS(352), 1,
      anon_sym_COMMA,
    ACTIONS(355), 1,
      anon_sym_RBRACE,
    ACTIONS(357), 1,
      sym__whitespace,
    STATE(103), 1,
      aux_sym_captures_repeat1,
    STATE(729), 1,
      aux_sym_json_repeat1,
  [2297] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(360), 1,
      anon_sym_RBRACE,
    ACTIONS(362), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(74), 1,
      sym_injection,
  [2313] = 5,
    ACTIONS(264), 1,
      anon_sym_COMMA,
    ACTIONS(360), 1,
      anon_sym_RBRACE,
    ACTIONS(364), 1,
      sym__whitespace,
    STATE(75), 1,
      aux_sym_injections_repeat1,
    STATE(419), 1,
      aux_sym_json_repeat1,
  [2329] = 5,
    ACTIONS(264), 1,
      anon_sym_COMMA,
    ACTIONS(360), 1,
      anon_sym_RBRACE,
    ACTIONS(364), 1,
      sym__whitespace,
    STATE(110), 1,
      aux_sym_injections_repeat1,
    STATE(419), 1,
      aux_sym_json_repeat1,
  [2345] = 5,
    ACTIONS(190), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(366), 1,
      sym__whitespace,
    STATE(157), 1,
      aux_sym_injection_repeat1,
    STATE(285), 1,
      aux_sym_json_repeat1,
  [2361] = 5,
    ACTIONS(117), 1,
      anon_sym_RBRACE,
    ACTIONS(368), 1,
      anon_sym_COMMA,
    ACTIONS(370), 1,
      sym__whitespace,
    STATE(165), 1,
      aux_sym_object_repeat1,
    STATE(278), 1,
      aux_sym_json_repeat1,
  [2377] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(117), 1,
      anon_sym_RBRACE,
    ACTIONS(250), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(166), 1,
      sym_item,
  [2393] = 5,
    ACTIONS(372), 1,
      anon_sym_COMMA,
    ACTIONS(375), 1,
      anon_sym_RBRACE,
    ACTIONS(377), 1,
      sym__whitespace,
    STATE(110), 1,
      aux_sym_injections_repeat1,
    STATE(431), 1,
      aux_sym_json_repeat1,
  [2409] = 5,
    ACTIONS(190), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(366), 1,
      sym__whitespace,
    STATE(69), 1,
      aux_sym_injection_repeat1,
    STATE(285), 1,
      aux_sym_json_repeat1,
  [2425] = 5,
    ACTIONS(250), 1,
      anon_sym_DQUOTE,
    ACTIONS(380), 1,
      anon_sym_RBRACE,
    ACTIONS(382), 1,
      sym__whitespace,
    STATE(169), 1,
      sym_item,
    STATE(170), 1,
      aux_sym_json_repeat1,
  [2441] = 5,
    ACTIONS(117), 1,
      anon_sym_RBRACK,
    ACTIONS(384), 1,
      anon_sym_COMMA,
    ACTIONS(386), 1,
      sym__whitespace,
    STATE(176), 1,
      aux_sym_array_repeat1,
    STATE(268), 1,
      aux_sym_json_repeat1,
  [2457] = 5,
    ACTIONS(264), 1,
      anon_sym_COMMA,
    ACTIONS(388), 1,
      anon_sym_RBRACE,
    ACTIONS(390), 1,
      sym__whitespace,
    STATE(110), 1,
      aux_sym_injections_repeat1,
    STATE(292), 1,
      aux_sym_json_repeat1,
  [2473] = 5,
    ACTIONS(392), 1,
      anon_sym_RBRACE,
    ACTIONS(394), 1,
      sym__whitespace,
    ACTIONS(396), 1,
      anon_sym_DQUOTE,
    STATE(181), 1,
      sym_repo,
    STATE(182), 1,
      aux_sym_json_repeat1,
  [2489] = 5,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(398), 1,
      anon_sym_RBRACE,
    ACTIONS(400), 1,
      sym__whitespace,
    STATE(72), 1,
      aux_sym_injection_repeat1,
    STATE(420), 1,
      aux_sym_json_repeat1,
  [2505] = 5,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(398), 1,
      anon_sym_RBRACE,
    ACTIONS(400), 1,
      sym__whitespace,
    STATE(69), 1,
      aux_sym_injection_repeat1,
    STATE(420), 1,
      aux_sym_json_repeat1,
  [2521] = 5,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(404), 1,
      sym__whitespace,
    ACTIONS(406), 1,
      anon_sym_RBRACK,
    STATE(187), 1,
      sym__pattern,
    STATE(188), 1,
      aux_sym_json_repeat1,
  [2537] = 5,
    ACTIONS(258), 1,
      anon_sym_COMMA,
    ACTIONS(408), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_RBRACK,
    STATE(101), 1,
      aux_sym_fileTypes_repeat1,
    STATE(291), 1,
      aux_sym_json_repeat1,
  [2553] = 5,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(412), 1,
      anon_sym_RBRACE,
    ACTIONS(414), 1,
      sym__whitespace,
    STATE(76), 1,
      aux_sym_json_repeat1,
    STATE(77), 1,
      sym_capture,
  [2569] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(416), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(79), 1,
      sym__pattern,
  [2585] = 5,
    ACTIONS(276), 1,
      anon_sym_COMMA,
    ACTIONS(418), 1,
      sym__whitespace,
    ACTIONS(420), 1,
      anon_sym_RBRACK,
    STATE(80), 1,
      aux_sym_patterns_repeat1,
    STATE(414), 1,
      aux_sym_json_repeat1,
  [2601] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(412), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(77), 1,
      sym_capture,
  [2617] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(422), 1,
      anon_sym_RBRACE,
    ACTIONS(424), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(417), 1,
      aux_sym_json_repeat1,
  [2633] = 5,
    ACTIONS(276), 1,
      anon_sym_COMMA,
    ACTIONS(426), 1,
      sym__whitespace,
    ACTIONS(428), 1,
      anon_sym_RBRACK,
    STATE(127), 1,
      aux_sym_patterns_repeat1,
    STATE(413), 1,
      aux_sym_json_repeat1,
  [2649] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(412), 1,
      anon_sym_RBRACE,
    ACTIONS(430), 1,
      sym__whitespace,
    STATE(78), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(416), 1,
      aux_sym_json_repeat1,
  [2665] = 5,
    ACTIONS(432), 1,
      anon_sym_COMMA,
    ACTIONS(435), 1,
      sym__whitespace,
    ACTIONS(438), 1,
      anon_sym_RBRACK,
    STATE(127), 1,
      aux_sym_patterns_repeat1,
    STATE(433), 1,
      aux_sym_json_repeat1,
  [2681] = 5,
    ACTIONS(288), 1,
      anon_sym_COMMA,
    ACTIONS(440), 1,
      anon_sym_RBRACE,
    ACTIONS(442), 1,
      sym__whitespace,
    STATE(82), 1,
      aux_sym__pattern_repeat1,
    STATE(409), 1,
      aux_sym_json_repeat1,
  [2697] = 5,
    ACTIONS(362), 1,
      anon_sym_DQUOTE,
    ACTIONS(444), 1,
      anon_sym_RBRACE,
    ACTIONS(446), 1,
      sym__whitespace,
    STATE(199), 1,
      sym_injection,
    STATE(200), 1,
      aux_sym_json_repeat1,
  [2713] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(412), 1,
      anon_sym_RBRACE,
    ACTIONS(430), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(416), 1,
      aux_sym_json_repeat1,
  [2729] = 5,
    ACTIONS(288), 1,
      anon_sym_COMMA,
    ACTIONS(440), 1,
      anon_sym_RBRACE,
    ACTIONS(442), 1,
      sym__whitespace,
    STATE(84), 1,
      aux_sym__pattern_repeat1,
    STATE(409), 1,
      aux_sym_json_repeat1,
  [2745] = 5,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(448), 1,
      anon_sym_RBRACE,
    ACTIONS(450), 1,
      sym__whitespace,
    STATE(81), 1,
      aux_sym_json_repeat1,
    STATE(83), 1,
      sym_capture,
  [2761] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(452), 1,
      anon_sym_RBRACE,
    ACTIONS(454), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(407), 1,
      aux_sym_json_repeat1,
  [2777] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(456), 1,
      anon_sym_RBRACE,
    ACTIONS(458), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(329), 1,
      aux_sym_json_repeat1,
  [2793] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(448), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(83), 1,
      sym_capture,
  [2809] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(396), 1,
      anon_sym_DQUOTE,
    ACTIONS(460), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(90), 1,
      sym_repo,
  [2825] = 5,
    ACTIONS(310), 1,
      anon_sym_COMMA,
    ACTIONS(460), 1,
      anon_sym_RBRACE,
    ACTIONS(462), 1,
      sym__whitespace,
    STATE(93), 1,
      aux_sym_repository_repeat1,
    STATE(390), 1,
      aux_sym_json_repeat1,
  [2841] = 5,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(464), 1,
      sym__whitespace,
    ACTIONS(466), 1,
      anon_sym_RBRACK,
    STATE(208), 1,
      sym__string,
    STATE(209), 1,
      aux_sym_json_repeat1,
  [2857] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(448), 1,
      anon_sym_RBRACE,
    ACTIONS(468), 1,
      sym__whitespace,
    STATE(85), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(406), 1,
      aux_sym_json_repeat1,
  [2873] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(448), 1,
      anon_sym_RBRACE,
    ACTIONS(468), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(406), 1,
      aux_sym_json_repeat1,
  [2889] = 5,
    ACTIONS(310), 1,
      anon_sym_COMMA,
    ACTIONS(460), 1,
      anon_sym_RBRACE,
    ACTIONS(462), 1,
      sym__whitespace,
    STATE(142), 1,
      aux_sym_repository_repeat1,
    STATE(390), 1,
      aux_sym_json_repeat1,
  [2905] = 5,
    ACTIONS(470), 1,
      anon_sym_COMMA,
    ACTIONS(473), 1,
      anon_sym_RBRACE,
    ACTIONS(475), 1,
      sym__whitespace,
    STATE(142), 1,
      aux_sym_repository_repeat1,
    STATE(479), 1,
      aux_sym_json_repeat1,
  [2921] = 5,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(478), 1,
      anon_sym_RBRACE,
    ACTIONS(480), 1,
      sym__whitespace,
    STATE(70), 1,
      aux_sym_json_repeat1,
    STATE(206), 1,
      sym_capture,
  [2937] = 5,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(482), 1,
      anon_sym_RBRACE,
    ACTIONS(484), 1,
      sym__whitespace,
    STATE(87), 1,
      aux_sym_json_repeat1,
    STATE(89), 1,
      sym_capture,
  [2953] = 5,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(486), 1,
      anon_sym_RBRACE,
    ACTIONS(488), 1,
      sym__whitespace,
    STATE(226), 1,
      sym_capture,
    STATE(232), 1,
      aux_sym_json_repeat1,
  [2969] = 5,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(490), 1,
      anon_sym_RBRACE,
    ACTIONS(492), 1,
      sym__whitespace,
    STATE(222), 1,
      aux_sym_json_repeat1,
    STATE(225), 1,
      sym_capture,
  [2985] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(482), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(89), 1,
      sym_capture,
  [3001] = 5,
    ACTIONS(340), 1,
      anon_sym_COMMA,
    ACTIONS(494), 1,
      anon_sym_RBRACE,
    ACTIONS(496), 1,
      sym__whitespace,
    STATE(103), 1,
      aux_sym_captures_repeat1,
    STATE(393), 1,
      aux_sym_json_repeat1,
  [3017] = 5,
    ACTIONS(384), 1,
      anon_sym_COMMA,
    ACTIONS(498), 1,
      sym__whitespace,
    ACTIONS(500), 1,
      anon_sym_RBRACK,
    STATE(215), 1,
      aux_sym_array_repeat1,
    STATE(379), 1,
      aux_sym_json_repeat1,
  [3033] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(482), 1,
      anon_sym_RBRACE,
    ACTIONS(502), 1,
      sym__whitespace,
    STATE(91), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(391), 1,
      aux_sym_json_repeat1,
  [3049] = 5,
    ACTIONS(368), 1,
      anon_sym_COMMA,
    ACTIONS(504), 1,
      anon_sym_RBRACE,
    ACTIONS(506), 1,
      sym__whitespace,
    STATE(230), 1,
      aux_sym_object_repeat1,
    STATE(377), 1,
      aux_sym_json_repeat1,
  [3065] = 5,
    ACTIONS(200), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(508), 1,
      sym__whitespace,
    STATE(69), 1,
      aux_sym_injection_repeat1,
    STATE(245), 1,
      aux_sym_json_repeat1,
  [3081] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(482), 1,
      anon_sym_RBRACE,
    ACTIONS(502), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(391), 1,
      aux_sym_json_repeat1,
  [3097] = 5,
    ACTIONS(200), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(508), 1,
      sym__whitespace,
    STATE(211), 1,
      aux_sym_injection_repeat1,
    STATE(245), 1,
      aux_sym_json_repeat1,
  [3113] = 5,
    ACTIONS(168), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(510), 1,
      sym__whitespace,
    STATE(202), 1,
      aux_sym_injection_repeat1,
    STATE(252), 1,
      aux_sym_json_repeat1,
  [3129] = 5,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(512), 1,
      sym__whitespace,
    ACTIONS(514), 1,
      anon_sym_RBRACK,
    STATE(97), 1,
      aux_sym_json_repeat1,
    STATE(98), 1,
      sym__string,
  [3145] = 5,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(516), 1,
      anon_sym_RBRACE,
    ACTIONS(518), 1,
      sym__whitespace,
    STATE(69), 1,
      aux_sym_injection_repeat1,
    STATE(289), 1,
      aux_sym_json_repeat1,
  [3161] = 5,
    ACTIONS(520), 1,
      anon_sym_COMMA,
    ACTIONS(523), 1,
      anon_sym_RBRACE,
    ACTIONS(525), 1,
      sym__whitespace,
    STATE(158), 1,
      aux_sym_json_repeat2,
    STATE(687), 1,
      aux_sym_json_repeat1,
  [3177] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(514), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(98), 1,
      sym__string,
  [3193] = 5,
    ACTIONS(258), 1,
      anon_sym_COMMA,
    ACTIONS(514), 1,
      anon_sym_RBRACK,
    ACTIONS(528), 1,
      sym__whitespace,
    STATE(99), 1,
      aux_sym_fileTypes_repeat1,
    STATE(369), 1,
      aux_sym_json_repeat1,
  [3209] = 5,
    ACTIONS(258), 1,
      anon_sym_COMMA,
    ACTIONS(514), 1,
      anon_sym_RBRACK,
    ACTIONS(528), 1,
      sym__whitespace,
    STATE(101), 1,
      aux_sym_fileTypes_repeat1,
    STATE(369), 1,
      aux_sym_json_repeat1,
  [3225] = 5,
    ACTIONS(362), 1,
      anon_sym_DQUOTE,
    ACTIONS(530), 1,
      anon_sym_RBRACE,
    ACTIONS(532), 1,
      sym__whitespace,
    STATE(104), 1,
      aux_sym_json_repeat1,
    STATE(105), 1,
      sym_injection,
  [3241] = 5,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(534), 1,
      anon_sym_RBRACE,
    ACTIONS(536), 1,
      sym__whitespace,
    STATE(69), 1,
      aux_sym_injection_repeat1,
    STATE(368), 1,
      aux_sym_json_repeat1,
  [3257] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_DQUOTE,
    ACTIONS(530), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(105), 1,
      sym_injection,
  [3273] = 5,
    ACTIONS(368), 1,
      anon_sym_COMMA,
    ACTIONS(538), 1,
      anon_sym_RBRACE,
    ACTIONS(540), 1,
      sym__whitespace,
    STATE(230), 1,
      aux_sym_object_repeat1,
    STATE(328), 1,
      aux_sym_json_repeat1,
  [3289] = 5,
    ACTIONS(368), 1,
      anon_sym_COMMA,
    ACTIONS(538), 1,
      anon_sym_RBRACE,
    ACTIONS(540), 1,
      sym__whitespace,
    STATE(231), 1,
      aux_sym_object_repeat1,
    STATE(328), 1,
      aux_sym_json_repeat1,
  [3305] = 5,
    ACTIONS(264), 1,
      anon_sym_COMMA,
    ACTIONS(530), 1,
      anon_sym_RBRACE,
    ACTIONS(542), 1,
      sym__whitespace,
    STATE(106), 1,
      aux_sym_injections_repeat1,
    STATE(360), 1,
      aux_sym_json_repeat1,
  [3321] = 5,
    ACTIONS(164), 1,
      anon_sym_RBRACE,
    ACTIONS(340), 1,
      anon_sym_COMMA,
    ACTIONS(544), 1,
      sym__whitespace,
    STATE(102), 1,
      aux_sym_captures_repeat1,
    STATE(364), 1,
      aux_sym_json_repeat1,
  [3337] = 5,
    ACTIONS(368), 1,
      anon_sym_COMMA,
    ACTIONS(546), 1,
      anon_sym_RBRACE,
    ACTIONS(548), 1,
      sym__whitespace,
    STATE(229), 1,
      aux_sym_object_repeat1,
    STATE(398), 1,
      aux_sym_json_repeat1,
  [3353] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(250), 1,
      anon_sym_DQUOTE,
    ACTIONS(546), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(227), 1,
      sym_item,
  [3369] = 5,
    ACTIONS(164), 1,
      anon_sym_RBRACE,
    ACTIONS(340), 1,
      anon_sym_COMMA,
    ACTIONS(544), 1,
      sym__whitespace,
    STATE(103), 1,
      aux_sym_captures_repeat1,
    STATE(364), 1,
      aux_sym_json_repeat1,
  [3385] = 5,
    ACTIONS(97), 1,
      anon_sym_RBRACK,
    ACTIONS(384), 1,
      anon_sym_COMMA,
    ACTIONS(550), 1,
      sym__whitespace,
    STATE(221), 1,
      aux_sym_array_repeat1,
    STATE(237), 1,
      aux_sym_json_repeat1,
  [3401] = 5,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(516), 1,
      anon_sym_RBRACE,
    ACTIONS(518), 1,
      sym__whitespace,
    STATE(163), 1,
      aux_sym_injection_repeat1,
    STATE(289), 1,
      aux_sym_json_repeat1,
  [3417] = 5,
    ACTIONS(264), 1,
      anon_sym_COMMA,
    ACTIONS(530), 1,
      anon_sym_RBRACE,
    ACTIONS(542), 1,
      sym__whitespace,
    STATE(110), 1,
      aux_sym_injections_repeat1,
    STATE(360), 1,
      aux_sym_json_repeat1,
  [3433] = 5,
    ACTIONS(33), 1,
      anon_sym_DQUOTE,
    ACTIONS(63), 1,
      anon_sym_comment,
    ACTIONS(65), 1,
      anon_sym_SLASH_SLASH,
    ACTIONS(67), 1,
      sym__string_content,
    ACTIONS(552), 1,
      aux_sym_capture_token1,
  [3449] = 5,
    ACTIONS(384), 1,
      anon_sym_COMMA,
    ACTIONS(538), 1,
      anon_sym_RBRACK,
    ACTIONS(554), 1,
      sym__whitespace,
    STATE(215), 1,
      aux_sym_array_repeat1,
    STATE(243), 1,
      aux_sym_json_repeat1,
  [3465] = 5,
    ACTIONS(384), 1,
      anon_sym_COMMA,
    ACTIONS(538), 1,
      anon_sym_RBRACK,
    ACTIONS(554), 1,
      sym__whitespace,
    STATE(214), 1,
      aux_sym_array_repeat1,
    STATE(243), 1,
      aux_sym_json_repeat1,
  [3481] = 5,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(556), 1,
      sym__whitespace,
    ACTIONS(558), 1,
      anon_sym_RBRACK,
    STATE(121), 1,
      aux_sym_json_repeat1,
    STATE(122), 1,
      sym__pattern,
  [3497] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(558), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(122), 1,
      sym__pattern,
  [3513] = 5,
    ACTIONS(276), 1,
      anon_sym_COMMA,
    ACTIONS(560), 1,
      sym__whitespace,
    ACTIONS(562), 1,
      anon_sym_RBRACK,
    STATE(125), 1,
      aux_sym_patterns_repeat1,
    STATE(348), 1,
      aux_sym_json_repeat1,
  [3529] = 5,
    ACTIONS(310), 1,
      anon_sym_COMMA,
    ACTIONS(564), 1,
      anon_sym_RBRACE,
    ACTIONS(566), 1,
      sym__whitespace,
    STATE(203), 1,
      aux_sym_repository_repeat1,
    STATE(251), 1,
      aux_sym_json_repeat1,
  [3545] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(396), 1,
      anon_sym_DQUOTE,
    ACTIONS(564), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(198), 1,
      sym_repo,
  [3561] = 5,
    ACTIONS(396), 1,
      anon_sym_DQUOTE,
    ACTIONS(564), 1,
      anon_sym_RBRACE,
    ACTIONS(568), 1,
      sym__whitespace,
    STATE(196), 1,
      aux_sym_json_repeat1,
    STATE(198), 1,
      sym_repo,
  [3577] = 5,
    ACTIONS(172), 1,
      anon_sym_RBRACE,
    ACTIONS(340), 1,
      anon_sym_COMMA,
    ACTIONS(570), 1,
      sym__whitespace,
    STATE(171), 1,
      aux_sym_captures_repeat1,
    STATE(267), 1,
      aux_sym_json_repeat1,
  [3593] = 5,
    ACTIONS(340), 1,
      anon_sym_COMMA,
    ACTIONS(572), 1,
      anon_sym_RBRACE,
    ACTIONS(574), 1,
      sym__whitespace,
    STATE(103), 1,
      aux_sym_captures_repeat1,
    STATE(298), 1,
      aux_sym_json_repeat1,
  [3609] = 5,
    ACTIONS(340), 1,
      anon_sym_COMMA,
    ACTIONS(572), 1,
      anon_sym_RBRACE,
    ACTIONS(574), 1,
      sym__whitespace,
    STATE(148), 1,
      aux_sym_captures_repeat1,
    STATE(298), 1,
      aux_sym_json_repeat1,
  [3625] = 5,
    ACTIONS(276), 1,
      anon_sym_COMMA,
    ACTIONS(576), 1,
      sym__whitespace,
    ACTIONS(578), 1,
      anon_sym_RBRACK,
    STATE(191), 1,
      aux_sym_patterns_repeat1,
    STATE(262), 1,
      aux_sym_json_repeat1,
  [3641] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(580), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(180), 1,
      sym__pattern,
  [3657] = 5,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(580), 1,
      anon_sym_RBRACK,
    ACTIONS(582), 1,
      sym__whitespace,
    STATE(179), 1,
      aux_sym_json_repeat1,
    STATE(180), 1,
      sym__pattern,
  [3673] = 3,
    STATE(190), 1,
      aux_sym__includeScope,
    ACTIONS(584), 2,
      anon_sym_DQUOTE,
      anon_sym_POUND,
    ACTIONS(586), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [3685] = 5,
    ACTIONS(276), 1,
      anon_sym_COMMA,
    ACTIONS(589), 1,
      sym__whitespace,
    ACTIONS(591), 1,
      anon_sym_RBRACK,
    STATE(127), 1,
      aux_sym_patterns_repeat1,
    STATE(345), 1,
      aux_sym_json_repeat1,
  [3701] = 5,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(593), 1,
      anon_sym_RBRACE,
    ACTIONS(595), 1,
      sym__whitespace,
    STATE(158), 1,
      aux_sym_json_repeat2,
    STATE(287), 1,
      aux_sym_json_repeat1,
  [3717] = 5,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(593), 1,
      anon_sym_RBRACE,
    ACTIONS(595), 1,
      sym__whitespace,
    STATE(213), 1,
      aux_sym_json_repeat2,
    STATE(287), 1,
      aux_sym_json_repeat1,
  [3733] = 5,
    ACTIONS(7), 1,
      anon_sym_RBRACE,
    ACTIONS(288), 1,
      anon_sym_COMMA,
    ACTIONS(597), 1,
      sym__whitespace,
    STATE(131), 1,
      aux_sym__pattern_repeat1,
    STATE(338), 1,
      aux_sym_json_repeat1,
  [3749] = 5,
    ACTIONS(396), 1,
      anon_sym_DQUOTE,
    ACTIONS(599), 1,
      anon_sym_RBRACE,
    ACTIONS(601), 1,
      sym__whitespace,
    STATE(136), 1,
      aux_sym_json_repeat1,
    STATE(137), 1,
      sym_repo,
  [3765] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(396), 1,
      anon_sym_DQUOTE,
    ACTIONS(599), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(137), 1,
      sym_repo,
  [3781] = 5,
    ACTIONS(182), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(603), 1,
      sym__whitespace,
    STATE(111), 1,
      aux_sym_injection_repeat1,
    STATE(359), 1,
      aux_sym_json_repeat1,
  [3797] = 5,
    ACTIONS(310), 1,
      anon_sym_COMMA,
    ACTIONS(599), 1,
      anon_sym_RBRACE,
    ACTIONS(605), 1,
      sym__whitespace,
    STATE(141), 1,
      aux_sym_repository_repeat1,
    STATE(319), 1,
      aux_sym_json_repeat1,
  [3813] = 5,
    ACTIONS(264), 1,
      anon_sym_COMMA,
    ACTIONS(607), 1,
      anon_sym_RBRACE,
    ACTIONS(609), 1,
      sym__whitespace,
    STATE(174), 1,
      aux_sym_injections_repeat1,
    STATE(275), 1,
      aux_sym_json_repeat1,
  [3829] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_DQUOTE,
    ACTIONS(607), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(167), 1,
      sym_injection,
  [3845] = 5,
    ACTIONS(362), 1,
      anon_sym_DQUOTE,
    ACTIONS(607), 1,
      anon_sym_RBRACE,
    ACTIONS(611), 1,
      sym__whitespace,
    STATE(164), 1,
      aux_sym_json_repeat1,
    STATE(167), 1,
      sym_injection,
  [3861] = 5,
    ACTIONS(182), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(603), 1,
      sym__whitespace,
    STATE(69), 1,
      aux_sym_injection_repeat1,
    STATE(359), 1,
      aux_sym_json_repeat1,
  [3877] = 5,
    ACTIONS(310), 1,
      anon_sym_COMMA,
    ACTIONS(599), 1,
      anon_sym_RBRACE,
    ACTIONS(605), 1,
      sym__whitespace,
    STATE(142), 1,
      aux_sym_repository_repeat1,
    STATE(319), 1,
      aux_sym_json_repeat1,
  [3893] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(613), 1,
      anon_sym_RBRACE,
    ACTIONS(615), 1,
      sym__whitespace,
    STATE(124), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(336), 1,
      aux_sym_json_repeat1,
  [3909] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(617), 1,
      anon_sym_RBRACE,
    ACTIONS(619), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(308), 1,
      aux_sym_json_repeat1,
  [3925] = 5,
    ACTIONS(244), 1,
      anon_sym_RBRACE,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(621), 1,
      sym__whitespace,
    STATE(153), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(288), 1,
      aux_sym_json_repeat1,
  [3941] = 5,
    ACTIONS(180), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(623), 1,
      sym__whitespace,
    STATE(117), 1,
      aux_sym_injection_repeat1,
    STATE(355), 1,
      aux_sym_json_repeat1,
  [3957] = 5,
    ACTIONS(258), 1,
      anon_sym_COMMA,
    ACTIONS(625), 1,
      sym__whitespace,
    ACTIONS(627), 1,
      anon_sym_RBRACK,
    STATE(161), 1,
      aux_sym_fileTypes_repeat1,
    STATE(284), 1,
      aux_sym_json_repeat1,
  [3973] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(627), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(160), 1,
      sym__string,
  [3989] = 5,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(627), 1,
      anon_sym_RBRACK,
    ACTIONS(629), 1,
      sym__whitespace,
    STATE(159), 1,
      aux_sym_json_repeat1,
    STATE(160), 1,
      sym__string,
  [4005] = 5,
    ACTIONS(180), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      anon_sym_COMMA,
    ACTIONS(623), 1,
      sym__whitespace,
    STATE(69), 1,
      aux_sym_injection_repeat1,
    STATE(355), 1,
      aux_sym_json_repeat1,
  [4021] = 5,
    ACTIONS(258), 1,
      anon_sym_COMMA,
    ACTIONS(260), 1,
      sym__whitespace,
    ACTIONS(262), 1,
      anon_sym_RBRACK,
    STATE(119), 1,
      aux_sym_fileTypes_repeat1,
    STATE(356), 1,
      aux_sym_json_repeat1,
  [4037] = 5,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(631), 1,
      anon_sym_RBRACE,
    ACTIONS(633), 1,
      sym__whitespace,
    STATE(158), 1,
      aux_sym_json_repeat2,
    STATE(362), 1,
      aux_sym_json_repeat1,
  [4053] = 5,
    ACTIONS(384), 1,
      anon_sym_COMMA,
    ACTIONS(635), 1,
      sym__whitespace,
    ACTIONS(637), 1,
      anon_sym_RBRACK,
    STATE(215), 1,
      aux_sym_array_repeat1,
    STATE(310), 1,
      aux_sym_json_repeat1,
  [4069] = 5,
    ACTIONS(639), 1,
      anon_sym_COMMA,
    ACTIONS(642), 1,
      sym__whitespace,
    ACTIONS(645), 1,
      anon_sym_RBRACK,
    STATE(215), 1,
      aux_sym_array_repeat1,
    STATE(552), 1,
      aux_sym_json_repeat1,
  [4085] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(617), 1,
      anon_sym_RBRACE,
    ACTIONS(619), 1,
      sym__whitespace,
    STATE(134), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(308), 1,
      aux_sym_json_repeat1,
  [4101] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(613), 1,
      anon_sym_RBRACE,
    ACTIONS(615), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(336), 1,
      aux_sym_json_repeat1,
  [4117] = 5,
    ACTIONS(244), 1,
      anon_sym_RBRACE,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(647), 1,
      sym__whitespace,
    STATE(147), 1,
      aux_sym_json_repeat1,
    STATE(150), 1,
      sym_capture,
  [4133] = 5,
    ACTIONS(384), 1,
      anon_sym_COMMA,
    ACTIONS(649), 1,
      sym__whitespace,
    ACTIONS(651), 1,
      anon_sym_RBRACK,
    STATE(149), 1,
      aux_sym_array_repeat1,
    STATE(305), 1,
      aux_sym_json_repeat1,
  [4149] = 5,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(653), 1,
      anon_sym_RBRACE,
    ACTIONS(655), 1,
      sym__whitespace,
    STATE(123), 1,
      aux_sym_json_repeat1,
    STATE(126), 1,
      sym_capture,
  [4165] = 5,
    ACTIONS(384), 1,
      anon_sym_COMMA,
    ACTIONS(649), 1,
      sym__whitespace,
    ACTIONS(651), 1,
      anon_sym_RBRACK,
    STATE(215), 1,
      aux_sym_array_repeat1,
    STATE(305), 1,
      aux_sym_json_repeat1,
  [4181] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(653), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(126), 1,
      sym_capture,
  [4197] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(657), 1,
      anon_sym_RBRACE,
    ACTIONS(659), 1,
      sym__whitespace,
    STATE(92), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(325), 1,
      aux_sym_json_repeat1,
  [4213] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(657), 1,
      anon_sym_RBRACE,
    ACTIONS(659), 1,
      sym__whitespace,
    STATE(133), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(325), 1,
      aux_sym_json_repeat1,
  [4229] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(653), 1,
      anon_sym_RBRACE,
    ACTIONS(661), 1,
      sym__whitespace,
    STATE(130), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(339), 1,
      aux_sym_json_repeat1,
  [4245] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(663), 1,
      anon_sym_RBRACE,
    ACTIONS(665), 1,
      sym__whitespace,
    STATE(140), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(321), 1,
      aux_sym_json_repeat1,
  [4261] = 5,
    ACTIONS(368), 1,
      anon_sym_COMMA,
    ACTIONS(667), 1,
      anon_sym_RBRACE,
    ACTIONS(669), 1,
      sym__whitespace,
    STATE(151), 1,
      aux_sym_object_repeat1,
    STATE(302), 1,
      aux_sym_json_repeat1,
  [4277] = 5,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(663), 1,
      anon_sym_RBRACE,
    ACTIONS(671), 1,
      sym__whitespace,
    STATE(135), 1,
      aux_sym_json_repeat1,
    STATE(139), 1,
      sym_capture,
  [4293] = 5,
    ACTIONS(368), 1,
      anon_sym_COMMA,
    ACTIONS(667), 1,
      anon_sym_RBRACE,
    ACTIONS(669), 1,
      sym__whitespace,
    STATE(230), 1,
      aux_sym_object_repeat1,
    STATE(302), 1,
      aux_sym_json_repeat1,
  [4309] = 5,
    ACTIONS(673), 1,
      anon_sym_COMMA,
    ACTIONS(676), 1,
      anon_sym_RBRACE,
    ACTIONS(678), 1,
      sym__whitespace,
    STATE(230), 1,
      aux_sym_object_repeat1,
    STATE(557), 1,
      aux_sym_json_repeat1,
  [4325] = 5,
    ACTIONS(368), 1,
      anon_sym_COMMA,
    ACTIONS(637), 1,
      anon_sym_RBRACE,
    ACTIONS(681), 1,
      sym__whitespace,
    STATE(230), 1,
      aux_sym_object_repeat1,
    STATE(300), 1,
      aux_sym_json_repeat1,
  [4341] = 5,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(663), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(139), 1,
      sym_capture,
  [4357] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(683), 1,
      sym__whitespace,
    STATE(271), 1,
      aux_sym_json_repeat1,
    STATE(584), 1,
      sym__string,
  [4370] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(577), 1,
      sym__string,
  [4383] = 4,
    ACTIONS(250), 1,
      anon_sym_DQUOTE,
    ACTIONS(685), 1,
      sym__whitespace,
    STATE(297), 1,
      aux_sym_json_repeat1,
    STATE(560), 1,
      sym_item,
  [4396] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(250), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(560), 1,
      sym_item,
  [4409] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(651), 1,
      anon_sym_RBRACK,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4422] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(565), 1,
      sym__string,
  [4435] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(567), 1,
      sym__string,
  [4448] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(657), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4461] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(613), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4474] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(572), 1,
      sym__string,
  [4487] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(637), 1,
      anon_sym_RBRACK,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4500] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(574), 1,
      sym__string,
  [4513] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_RBRACE,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4526] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(586), 1,
      sym__string,
  [4539] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(581), 1,
      sym__string,
  [4552] = 3,
    ACTIONS(693), 1,
      anon_sym_DQUOTE,
    STATE(314), 1,
      aux_sym_repo_repeat1,
    ACTIONS(695), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4563] = 4,
    ACTIONS(396), 1,
      anon_sym_DQUOTE,
    ACTIONS(697), 1,
      sym__whitespace,
    STATE(316), 1,
      aux_sym_json_repeat1,
    STATE(544), 1,
      sym_repo,
  [4576] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(583), 1,
      sym__string,
  [4589] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(599), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4602] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(182), 1,
      anon_sym_RBRACE,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4615] = 3,
    ACTIONS(701), 1,
      anon_sym_DQUOTE,
    STATE(272), 1,
      aux_sym_repo_repeat1,
    ACTIONS(695), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4626] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(589), 1,
      sym__string,
  [4639] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(617), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4652] = 1,
    ACTIONS(703), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [4659] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    ACTIONS(705), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4672] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(591), 1,
      sym__string,
  [4685] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(688), 1,
      sym_capture,
  [4698] = 4,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(707), 1,
      sym__whitespace,
    STATE(342), 1,
      aux_sym_json_repeat1,
    STATE(518), 1,
      sym__pattern,
  [4711] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(592), 1,
      sym__string,
  [4724] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(591), 1,
      anon_sym_RBRACK,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4737] = 3,
    ACTIONS(711), 1,
      anon_sym_DQUOTE,
    STATE(314), 1,
      aux_sym_repo_repeat1,
    ACTIONS(695), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4748] = 3,
    ACTIONS(713), 1,
      anon_sym_DQUOTE,
    STATE(363), 1,
      aux_sym_repo_repeat1,
    ACTIONS(695), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4759] = 3,
    ACTIONS(715), 1,
      anon_sym_DQUOTE,
    STATE(248), 1,
      aux_sym_repo_repeat1,
    ACTIONS(695), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4770] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(572), 1,
      anon_sym_RBRACE,
    ACTIONS(717), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4783] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(164), 1,
      anon_sym_RBRACE,
    ACTIONS(717), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4796] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(538), 1,
      anon_sym_RBRACK,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4809] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(593), 1,
      anon_sym_RBRACE,
    ACTIONS(719), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4822] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(641), 1,
      sym__string,
  [4835] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(640), 1,
      sym__string,
  [4848] = 3,
    ACTIONS(721), 1,
      anon_sym_DQUOTE,
    STATE(314), 1,
      aux_sym_repo_repeat1,
    ACTIONS(695), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4859] = 4,
    ACTIONS(362), 1,
      anon_sym_DQUOTE,
    ACTIONS(723), 1,
      sym__whitespace,
    STATE(357), 1,
      aux_sym_json_repeat1,
    STATE(504), 1,
      sym_injection,
  [4872] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(639), 1,
      sym__string,
  [4885] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(530), 1,
      anon_sym_RBRACE,
    ACTIONS(725), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4898] = 4,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(727), 1,
      sym__whitespace,
    STATE(293), 1,
      aux_sym_json_repeat1,
    STATE(753), 1,
      sym__pattern,
  [4911] = 1,
    ACTIONS(729), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [4918] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(538), 1,
      anon_sym_RBRACE,
    ACTIONS(731), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4931] = 4,
    ACTIONS(250), 1,
      anon_sym_DQUOTE,
    ACTIONS(733), 1,
      sym__whitespace,
    STATE(236), 1,
      aux_sym_json_repeat1,
    STATE(609), 1,
      sym_item,
  [4944] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(638), 1,
      sym__string,
  [4957] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(637), 1,
      sym__string,
  [4970] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(735), 1,
      sym__whitespace,
    STATE(366), 1,
      aux_sym_json_repeat1,
    STATE(500), 1,
      sym__string,
  [4983] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(636), 1,
      sym__string,
  [4996] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(514), 1,
      anon_sym_RBRACK,
    ACTIONS(737), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5009] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(516), 1,
      anon_sym_RBRACE,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5022] = 4,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(739), 1,
      sym__whitespace,
    STATE(373), 1,
      aux_sym_json_repeat1,
    STATE(695), 1,
      sym_capture,
  [5035] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(631), 1,
      anon_sym_RBRACE,
    ACTIONS(719), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5048] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(482), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5061] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(534), 1,
      anon_sym_RBRACE,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5074] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(524), 1,
      sym__pattern,
  [5087] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(737), 1,
      anon_sym_COMMA,
    ACTIONS(741), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5100] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(725), 1,
      anon_sym_COMMA,
    ACTIONS(743), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5113] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(634), 1,
      sym__pattern,
  [5126] = 4,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(745), 1,
      sym__whitespace,
    STATE(374), 1,
      aux_sym_json_repeat1,
    STATE(634), 1,
      sym__pattern,
  [5139] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(747), 1,
      sym__whitespace,
    STATE(238), 1,
      aux_sym_json_repeat1,
    STATE(614), 1,
      sym__string,
  [5152] = 4,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(749), 1,
      sym__whitespace,
    STATE(375), 1,
      aux_sym_json_repeat1,
    STATE(633), 1,
      sym__pattern,
  [5165] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(250), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(494), 1,
      sym_item,
  [5178] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(494), 1,
      anon_sym_RBRACE,
    ACTIONS(717), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5191] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(614), 1,
      sym__string,
  [5204] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(731), 1,
      anon_sym_COMMA,
    ACTIONS(751), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5217] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(753), 1,
      sym__whitespace,
    STATE(239), 1,
      aux_sym_json_repeat1,
    STATE(615), 1,
      sym__string,
  [5230] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(504), 1,
      anon_sym_RBRACE,
    ACTIONS(731), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5243] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(615), 1,
      sym__string,
  [5256] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(200), 1,
      anon_sym_RBRACE,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5269] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(500), 1,
      anon_sym_RBRACK,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5282] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(755), 1,
      sym__whitespace,
    STATE(242), 1,
      aux_sym_json_repeat1,
    STATE(617), 1,
      sym__string,
  [5295] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(617), 1,
      sym__string,
  [5308] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(456), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5321] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    ACTIONS(757), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5334] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    ACTIONS(751), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5347] = 4,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(759), 1,
      sym__whitespace,
    STATE(382), 1,
      aux_sym_json_repeat1,
    STATE(487), 1,
      sym__pattern,
  [5360] = 1,
    ACTIONS(761), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5367] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(763), 1,
      sym__whitespace,
    STATE(244), 1,
      aux_sym_json_repeat1,
    STATE(618), 1,
      sym__string,
  [5380] = 3,
    ACTIONS(765), 1,
      anon_sym_DQUOTE,
    STATE(314), 1,
      aux_sym_repo_repeat1,
    ACTIONS(767), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [5391] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(618), 1,
      sym__string,
  [5404] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(396), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(484), 1,
      sym_repo,
  [5417] = 4,
    ACTIONS(396), 1,
      anon_sym_DQUOTE,
    ACTIONS(770), 1,
      sym__whitespace,
    STATE(387), 1,
      aux_sym_json_repeat1,
    STATE(484), 1,
      sym_repo,
  [5430] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(772), 1,
      sym__whitespace,
    STATE(234), 1,
      aux_sym_json_repeat1,
    STATE(619), 1,
      sym__string,
  [5443] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(460), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5456] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(619), 1,
      sym__string,
  [5469] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(448), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5482] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(774), 1,
      sym__whitespace,
    STATE(247), 1,
      aux_sym_json_repeat1,
    STATE(623), 1,
      sym__string,
  [5495] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(623), 1,
      sym__string,
  [5508] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(776), 1,
      sym__whitespace,
    STATE(250), 1,
      aux_sym_json_repeat1,
    STATE(624), 1,
      sym__string,
  [5521] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(452), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5534] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(624), 1,
      sym__string,
  [5547] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(582), 1,
      sym__string,
  [5560] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(637), 1,
      anon_sym_RBRACE,
    ACTIONS(731), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5573] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    ACTIONS(778), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5586] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(584), 1,
      sym__string,
  [5599] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(780), 1,
      sym__whitespace,
    STATE(274), 1,
      aux_sym_json_repeat1,
    STATE(582), 1,
      sym__string,
  [5612] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(782), 1,
      sym__whitespace,
    STATE(270), 1,
      aux_sym_json_repeat1,
    STATE(586), 1,
      sym__string,
  [5625] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(784), 1,
      sym__whitespace,
    STATE(280), 1,
      aux_sym_json_repeat1,
    STATE(580), 1,
      sym__string,
  [5638] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(580), 1,
      sym__string,
  [5651] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(786), 1,
      sym__whitespace,
    STATE(281), 1,
      aux_sym_json_repeat1,
    STATE(578), 1,
      sym__string,
  [5664] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(422), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5677] = 1,
    ACTIONS(788), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5684] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(440), 1,
      anon_sym_RBRACE,
    ACTIONS(790), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5697] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(412), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5710] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(792), 1,
      sym__whitespace,
    STATE(254), 1,
      aux_sym_json_repeat1,
    STATE(627), 1,
      sym__string,
  [5723] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(578), 1,
      sym__string,
  [5736] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(439), 1,
      sym__pattern,
  [5749] = 4,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(794), 1,
      sym__whitespace,
    STATE(412), 1,
      aux_sym_json_repeat1,
    STATE(439), 1,
      sym__pattern,
  [5762] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(796), 1,
      sym__whitespace,
    STATE(283), 1,
      aux_sym_json_repeat1,
    STATE(576), 1,
      sym__string,
  [5775] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    ACTIONS(798), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5788] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(627), 1,
      sym__string,
  [5801] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(576), 1,
      sym__string,
  [5814] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(428), 1,
      anon_sym_RBRACK,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5827] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(800), 1,
      sym__whitespace,
    STATE(258), 1,
      aux_sym_json_repeat1,
    STATE(630), 1,
      sym__string,
  [5840] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(630), 1,
      sym__string,
  [5853] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(802), 1,
      sym__whitespace,
    STATE(261), 1,
      aux_sym_json_repeat1,
    STATE(632), 1,
      sym__string,
  [5866] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(632), 1,
      sym__string,
  [5879] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    ACTIONS(804), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5892] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(568), 1,
      sym__pattern,
  [5905] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(398), 1,
      anon_sym_RBRACE,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5918] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_RBRACK,
    ACTIONS(737), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5931] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(428), 1,
      sym_injection,
  [5944] = 4,
    ACTIONS(362), 1,
      anon_sym_DQUOTE,
    ACTIONS(806), 1,
      sym__whitespace,
    STATE(418), 1,
      aux_sym_json_repeat1,
    STATE(428), 1,
      sym_injection,
  [5957] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(190), 1,
      anon_sym_RBRACE,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5970] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(360), 1,
      anon_sym_RBRACE,
    ACTIONS(725), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5983] = 1,
    ACTIONS(808), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5990] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(719), 1,
      anon_sym_COMMA,
    ACTIONS(810), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6003] = 3,
    ACTIONS(812), 1,
      anon_sym_DQUOTE,
    STATE(314), 1,
      aux_sym_repo_repeat1,
    ACTIONS(695), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [6014] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(204), 1,
      anon_sym_RBRACE,
    ACTIONS(717), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6027] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(388), 1,
      anon_sym_RBRACE,
    ACTIONS(725), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6040] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(435), 1,
      sym__string,
  [6053] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(814), 1,
      sym__whitespace,
    STATE(422), 1,
      aux_sym_json_repeat1,
    STATE(435), 1,
      sym__string,
  [6066] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    ACTIONS(816), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6079] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(336), 1,
      anon_sym_RBRACK,
    ACTIONS(737), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6092] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(818), 1,
      sym__whitespace,
    STATE(299), 1,
      aux_sym_json_repeat1,
    STATE(655), 1,
      sym__string,
  [6105] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(820), 1,
      sym__whitespace,
    STATE(303), 1,
      aux_sym_json_repeat1,
    STATE(656), 1,
      sym__string,
  [6118] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(822), 1,
      sym__whitespace,
    STATE(307), 1,
      aux_sym_json_repeat1,
    STATE(657), 1,
      sym__string,
  [6131] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(733), 1,
      sym_capture,
  [6144] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(531), 1,
      sym__pattern,
  [6157] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(530), 1,
      sym__pattern,
  [6170] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(824), 1,
      sym__whitespace,
    STATE(315), 1,
      aux_sym_json_repeat1,
    STATE(659), 1,
      sym__string,
  [6183] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(731), 1,
      anon_sym_COMMA,
    ACTIONS(826), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6196] = 4,
    ACTIONS(246), 1,
      anon_sym_DQUOTE,
    ACTIONS(828), 1,
      sym__whitespace,
    STATE(259), 1,
      aux_sym_json_repeat1,
    STATE(733), 1,
      sym_capture,
  [6209] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    ACTIONS(830), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6222] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(832), 1,
      sym__whitespace,
    STATE(320), 1,
      aux_sym_json_repeat1,
    STATE(660), 1,
      sym__string,
  [6235] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(332), 1,
      anon_sym_RBRACK,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6248] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(444), 1,
      sym__pattern,
  [6261] = 4,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(834), 1,
      sym__whitespace,
    STATE(405), 1,
      aux_sym_json_repeat1,
    STATE(444), 1,
      sym__pattern,
  [6274] = 4,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(836), 1,
      sym__whitespace,
    STATE(404), 1,
      aux_sym_json_repeat1,
    STATE(446), 1,
      sym__pattern,
  [6287] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    ACTIONS(838), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6300] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(790), 1,
      anon_sym_COMMA,
    ACTIONS(840), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6313] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(396), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(449), 1,
      sym_repo,
  [6326] = 1,
    ACTIONS(842), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [6333] = 4,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(844), 1,
      sym__whitespace,
    STATE(290), 1,
      aux_sym_json_repeat1,
    STATE(530), 1,
      sym__pattern,
  [6346] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(318), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6359] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(308), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6372] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(846), 1,
      sym__whitespace,
    STATE(323), 1,
      aux_sym_json_repeat1,
    STATE(663), 1,
      sym__string,
  [6385] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(717), 1,
      anon_sym_COMMA,
    ACTIONS(848), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6398] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(850), 1,
      sym__whitespace,
    STATE(246), 1,
      aux_sym_json_repeat1,
    STATE(522), 1,
      sym__string,
  [6411] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(852), 1,
      sym__whitespace,
    STATE(330), 1,
      aux_sym_json_repeat1,
    STATE(521), 1,
      sym__string,
  [6424] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(854), 1,
      sym__whitespace,
    STATE(327), 1,
      aux_sym_json_repeat1,
    STATE(520), 1,
      sym__string,
  [6437] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(856), 1,
      sym__whitespace,
    STATE(334), 1,
      aux_sym_json_repeat1,
    STATE(519), 1,
      sym__string,
  [6450] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(667), 1,
      anon_sym_RBRACE,
    ACTIONS(731), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6463] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(858), 1,
      sym__whitespace,
    STATE(341), 1,
      aux_sym_json_repeat1,
    STATE(516), 1,
      sym__string,
  [6476] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(860), 1,
      sym__whitespace,
    STATE(347), 1,
      aux_sym_json_repeat1,
    STATE(513), 1,
      sym__string,
  [6489] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(862), 1,
      sym__whitespace,
    STATE(326), 1,
      aux_sym_json_repeat1,
    STATE(594), 1,
      sym__string,
  [6502] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(312), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6515] = 4,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    ACTIONS(864), 1,
      sym__whitespace,
    STATE(354), 1,
      aux_sym_json_repeat1,
    STATE(506), 1,
      sym__pattern,
  [6528] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(506), 1,
      sym__pattern,
  [6541] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(505), 1,
      sym__pattern,
  [6554] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(286), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6567] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    ACTIONS(866), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6580] = 1,
    ACTIONS(868), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [6587] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(290), 1,
      anon_sym_RBRACE,
    ACTIONS(790), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6600] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(870), 1,
      sym__whitespace,
    STATE(346), 1,
      aux_sym_json_repeat1,
    STATE(668), 1,
      sym__string,
  [6613] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(872), 1,
      sym__whitespace,
    STATE(350), 1,
      aux_sym_json_repeat1,
    STATE(669), 1,
      sym__string,
  [6626] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(481), 1,
      sym__pattern,
  [6639] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    ACTIONS(874), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6652] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(284), 1,
      anon_sym_RBRACK,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6665] = 4,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    ACTIONS(876), 1,
      sym__whitespace,
    STATE(352), 1,
      aux_sym_json_repeat1,
    STATE(671), 1,
      sym__string,
  [6678] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(270), 1,
      anon_sym_RBRACE,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6691] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    ACTIONS(878), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6704] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(497), 1,
      sym_injection,
  [6717] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(266), 1,
      anon_sym_RBRACE,
    ACTIONS(725), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6730] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(254), 1,
      anon_sym_RBRACE,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6743] = 1,
    ACTIONS(880), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [6750] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(501), 1,
      sym__string,
  [6763] = 4,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(262), 1,
      anon_sym_RBRACK,
    ACTIONS(737), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6776] = 1,
    ACTIONS(882), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [6783] = 3,
    ACTIONS(884), 1,
      sym__whitespace,
    ACTIONS(886), 1,
      anon_sym_COLON,
    STATE(464), 1,
      aux_sym_json_repeat1,
  [6793] = 1,
    ACTIONS(888), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6799] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(890), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6809] = 1,
    ACTIONS(892), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6815] = 1,
    ACTIONS(894), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6821] = 1,
    ACTIONS(896), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6827] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(725), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6837] = 1,
    ACTIONS(898), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6843] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6853] = 1,
    ACTIONS(900), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6859] = 1,
    ACTIONS(902), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [6865] = 1,
    ACTIONS(904), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6871] = 1,
    ACTIONS(906), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6877] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(737), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6887] = 1,
    ACTIONS(908), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [6893] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(910), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6903] = 3,
    ACTIONS(910), 1,
      anon_sym_LBRACE,
    ACTIONS(912), 1,
      sym__whitespace,
    STATE(493), 1,
      aux_sym_json_repeat1,
  [6913] = 1,
    ACTIONS(914), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [6919] = 1,
    ACTIONS(916), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [6925] = 1,
    ACTIONS(918), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6931] = 1,
    ACTIONS(920), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6937] = 1,
    ACTIONS(922), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6943] = 1,
    ACTIONS(299), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6949] = 3,
    ACTIONS(924), 1,
      sym__whitespace,
    ACTIONS(926), 1,
      anon_sym_COLON,
    STATE(476), 1,
      aux_sym_json_repeat1,
  [6959] = 1,
    ACTIONS(928), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6965] = 1,
    ACTIONS(930), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6971] = 3,
    ACTIONS(932), 1,
      sym__whitespace,
    ACTIONS(934), 1,
      anon_sym_COLON,
    STATE(474), 1,
      aux_sym_json_repeat1,
  [6981] = 3,
    ACTIONS(936), 1,
      sym__whitespace,
    ACTIONS(938), 1,
      anon_sym_COLON,
    STATE(472), 1,
      aux_sym_json_repeat1,
  [6991] = 3,
    ACTIONS(940), 1,
      sym__whitespace,
    ACTIONS(942), 1,
      anon_sym_DQUOTE,
    STATE(511), 1,
      aux_sym_json_repeat1,
  [7001] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(944), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7011] = 3,
    ACTIONS(946), 1,
      sym__whitespace,
    ACTIONS(948), 1,
      anon_sym_COLON,
    STATE(470), 1,
      aux_sym_json_repeat1,
  [7021] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(950), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7031] = 3,
    ACTIONS(952), 1,
      sym__whitespace,
    ACTIONS(954), 1,
      anon_sym_COLON,
    STATE(468), 1,
      aux_sym_json_repeat1,
  [7041] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(956), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7051] = 3,
    ACTIONS(958), 1,
      sym__whitespace,
    ACTIONS(960), 1,
      anon_sym_COLON,
    STATE(466), 1,
      aux_sym_json_repeat1,
  [7061] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(962), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7071] = 3,
    ACTIONS(964), 1,
      sym__whitespace,
    ACTIONS(966), 1,
      anon_sym_COLON,
    STATE(462), 1,
      aux_sym_json_repeat1,
  [7081] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(968), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7091] = 3,
    ACTIONS(970), 1,
      sym__whitespace,
    ACTIONS(972), 1,
      anon_sym_COLON,
    STATE(460), 1,
      aux_sym_json_repeat1,
  [7101] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(974), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7111] = 3,
    ACTIONS(976), 1,
      sym__whitespace,
    ACTIONS(978), 1,
      anon_sym_COLON,
    STATE(458), 1,
      aux_sym_json_repeat1,
  [7121] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(980), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7131] = 3,
    ACTIONS(982), 1,
      sym__whitespace,
    ACTIONS(984), 1,
      anon_sym_COLON,
    STATE(456), 1,
      aux_sym_json_repeat1,
  [7141] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(986), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7151] = 3,
    ACTIONS(988), 1,
      anon_sym_LBRACE,
    ACTIONS(990), 1,
      sym__whitespace,
    STATE(536), 1,
      aux_sym_json_repeat1,
  [7161] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(992), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7171] = 3,
    ACTIONS(994), 1,
      anon_sym_LBRACE,
    ACTIONS(996), 1,
      sym__whitespace,
    STATE(539), 1,
      aux_sym_json_repeat1,
  [7181] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(998), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7191] = 3,
    ACTIONS(1000), 1,
      anon_sym_LBRACE,
    ACTIONS(1002), 1,
      sym__whitespace,
    STATE(542), 1,
      aux_sym_json_repeat1,
  [7201] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1004), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7211] = 3,
    ACTIONS(1006), 1,
      anon_sym_LBRACE,
    ACTIONS(1008), 1,
      sym__whitespace,
    STATE(545), 1,
      aux_sym_json_repeat1,
  [7221] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1010), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7231] = 1,
    ACTIONS(1012), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7237] = 3,
    ACTIONS(1014), 1,
      sym__whitespace,
    ACTIONS(1016), 1,
      anon_sym_COLON,
    STATE(454), 1,
      aux_sym_json_repeat1,
  [7247] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7257] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(790), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7267] = 1,
    ACTIONS(1018), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7273] = 1,
    ACTIONS(1020), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7279] = 1,
    ACTIONS(1022), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7285] = 1,
    ACTIONS(1024), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7291] = 1,
    ACTIONS(1026), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7297] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1028), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7307] = 1,
    ACTIONS(1030), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7313] = 1,
    ACTIONS(1032), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7319] = 1,
    ACTIONS(1034), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7325] = 1,
    ACTIONS(1036), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7331] = 1,
    ACTIONS(1038), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7337] = 1,
    ACTIONS(1040), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7343] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1042), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7353] = 1,
    ACTIONS(1044), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7359] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1046), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7369] = 3,
    ACTIONS(1046), 1,
      anon_sym_LBRACE,
    ACTIONS(1048), 1,
      sym__whitespace,
    STATE(563), 1,
      aux_sym_json_repeat1,
  [7379] = 1,
    ACTIONS(1050), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7385] = 1,
    ACTIONS(1052), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7391] = 1,
    ACTIONS(1054), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7397] = 1,
    ACTIONS(350), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7403] = 1,
    ACTIONS(1056), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7409] = 1,
    ACTIONS(1058), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7415] = 1,
    ACTIONS(1060), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7421] = 1,
    ACTIONS(375), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7427] = 1,
    ACTIONS(1062), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7433] = 1,
    ACTIONS(1064), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7439] = 3,
    ACTIONS(1066), 1,
      sym__whitespace,
    ACTIONS(1068), 1,
      anon_sym_COLON,
    STATE(427), 1,
      aux_sym_json_repeat1,
  [7449] = 1,
    ACTIONS(1070), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7455] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1072), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7465] = 3,
    ACTIONS(1074), 1,
      anon_sym_LBRACE,
    ACTIONS(1076), 1,
      sym__whitespace,
    STATE(440), 1,
      aux_sym_json_repeat1,
  [7475] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1078), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7485] = 3,
    ACTIONS(1078), 1,
      anon_sym_DQUOTE,
    ACTIONS(1080), 1,
      sym__whitespace,
    STATE(575), 1,
      aux_sym_json_repeat1,
  [7495] = 1,
    ACTIONS(1082), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7501] = 1,
    ACTIONS(1084), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7507] = 1,
    ACTIONS(1086), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7513] = 1,
    ACTIONS(1088), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7519] = 1,
    ACTIONS(1090), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7525] = 1,
    ACTIONS(1092), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7531] = 1,
    ACTIONS(1094), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7537] = 1,
    ACTIONS(1096), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7543] = 1,
    ACTIONS(1098), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7549] = 1,
    ACTIONS(1100), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7555] = 1,
    ACTIONS(1102), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7561] = 1,
    ACTIONS(1104), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7567] = 1,
    ACTIONS(1106), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7573] = 1,
    ACTIONS(1108), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7579] = 1,
    ACTIONS(1110), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7585] = 1,
    ACTIONS(1112), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7591] = 3,
    ACTIONS(5), 1,
      anon_sym_LBRACE,
    ACTIONS(1114), 1,
      ts_builtin_sym_end,
    STATE(534), 1,
      aux_sym_json_repeat3,
  [7601] = 1,
    ACTIONS(1116), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7607] = 1,
    ACTIONS(1118), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7613] = 1,
    ACTIONS(1120), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7619] = 1,
    ACTIONS(1122), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7625] = 3,
    ACTIONS(1124), 1,
      ts_builtin_sym_end,
    ACTIONS(1126), 1,
      anon_sym_LBRACE,
    STATE(534), 1,
      aux_sym_json_repeat3,
  [7635] = 1,
    ACTIONS(1129), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7641] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1131), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7651] = 3,
    ACTIONS(1131), 1,
      anon_sym_LBRACE,
    ACTIONS(1133), 1,
      sym__whitespace,
    STATE(595), 1,
      aux_sym_json_repeat1,
  [7661] = 1,
    ACTIONS(1135), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7667] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1137), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7677] = 3,
    ACTIONS(1137), 1,
      anon_sym_LBRACE,
    ACTIONS(1139), 1,
      sym__whitespace,
    STATE(601), 1,
      aux_sym_json_repeat1,
  [7687] = 1,
    ACTIONS(1141), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7693] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1143), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7703] = 3,
    ACTIONS(1143), 1,
      anon_sym_LBRACE,
    ACTIONS(1145), 1,
      sym__whitespace,
    STATE(606), 1,
      aux_sym_json_repeat1,
  [7713] = 1,
    ACTIONS(473), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7719] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1147), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7729] = 3,
    ACTIONS(1147), 1,
      anon_sym_LBRACE,
    ACTIONS(1149), 1,
      sym__whitespace,
    STATE(611), 1,
      aux_sym_json_repeat1,
  [7739] = 1,
    ACTIONS(1151), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7745] = 3,
    ACTIONS(1153), 1,
      sym__whitespace,
    ACTIONS(1155), 1,
      anon_sym_COLON,
    STATE(486), 1,
      aux_sym_json_repeat1,
  [7755] = 1,
    ACTIONS(1157), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7761] = 1,
    ACTIONS(1159), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7767] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1161), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7777] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(687), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7787] = 1,
    ACTIONS(1163), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7793] = 1,
    ACTIONS(1165), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7799] = 1,
    ACTIONS(1167), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7805] = 1,
    ACTIONS(1169), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7811] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(731), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7821] = 1,
    ACTIONS(1171), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7827] = 1,
    ACTIONS(1173), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7833] = 1,
    ACTIONS(1175), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7839] = 1,
    ACTIONS(1177), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7845] = 1,
    ACTIONS(1179), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7851] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1181), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7861] = 1,
    ACTIONS(1183), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7867] = 1,
    ACTIONS(1185), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7873] = 1,
    ACTIONS(1187), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7879] = 1,
    ACTIONS(1189), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7885] = 1,
    ACTIONS(1191), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7891] = 1,
    ACTIONS(1193), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7897] = 2,
    STATE(263), 1,
      aux_sym_repo_repeat1,
    ACTIONS(695), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [7905] = 3,
    ACTIONS(1195), 1,
      sym__whitespace,
    ACTIONS(1197), 1,
      anon_sym_COLON,
    STATE(751), 1,
      aux_sym_json_repeat1,
  [7915] = 1,
    ACTIONS(1199), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7921] = 1,
    ACTIONS(1201), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7927] = 1,
    ACTIONS(1203), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7933] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1205), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7943] = 1,
    ACTIONS(1207), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7949] = 1,
    ACTIONS(1209), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7955] = 1,
    ACTIONS(1211), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7961] = 1,
    ACTIONS(1213), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7967] = 1,
    ACTIONS(1215), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7973] = 1,
    ACTIONS(1217), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7979] = 1,
    ACTIONS(1219), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7985] = 1,
    ACTIONS(1221), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7991] = 1,
    ACTIONS(1223), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7997] = 1,
    ACTIONS(1225), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8003] = 1,
    ACTIONS(1227), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8009] = 3,
    ACTIONS(1229), 1,
      sym__whitespace,
    ACTIONS(1231), 1,
      anon_sym_COLON,
    STATE(509), 1,
      aux_sym_json_repeat1,
  [8019] = 1,
    ACTIONS(1233), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8025] = 1,
    ACTIONS(1235), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8031] = 1,
    ACTIONS(1237), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8037] = 1,
    ACTIONS(1239), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8043] = 1,
    ACTIONS(1241), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8049] = 1,
    ACTIONS(1243), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8055] = 1,
    ACTIONS(1245), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8061] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1247), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8071] = 1,
    ACTIONS(1249), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8077] = 1,
    ACTIONS(1251), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8083] = 1,
    ACTIONS(1253), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8089] = 1,
    ACTIONS(1255), 3,
      anon_sym_DQUOTE,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [8095] = 3,
    ACTIONS(1257), 1,
      sym__whitespace,
    ACTIONS(1259), 1,
      anon_sym_COLON,
    STATE(551), 1,
      aux_sym_json_repeat1,
  [8105] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1261), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8115] = 1,
    ACTIONS(1263), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8121] = 1,
    ACTIONS(645), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8127] = 1,
    ACTIONS(1265), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8133] = 1,
    ACTIONS(1267), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8139] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1269), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8149] = 1,
    ACTIONS(1271), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8155] = 1,
    ACTIONS(1273), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8161] = 1,
    ACTIONS(676), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8167] = 3,
    ACTIONS(1275), 1,
      anon_sym_LBRACE,
    ACTIONS(1277), 1,
      sym__whitespace,
    STATE(495), 1,
      aux_sym_json_repeat1,
  [8177] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1279), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8187] = 1,
    ACTIONS(1281), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8193] = 1,
    ACTIONS(239), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8199] = 1,
    ACTIONS(1283), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8205] = 1,
    ACTIONS(1285), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8211] = 1,
    ACTIONS(1287), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8217] = 1,
    ACTIONS(1289), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8223] = 1,
    ACTIONS(1291), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8229] = 1,
    ACTIONS(1293), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8235] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1295), 1,
      anon_sym_LBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8245] = 1,
    ACTIONS(1297), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8251] = 1,
    ACTIONS(1299), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8257] = 1,
    ACTIONS(1301), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8263] = 1,
    ACTIONS(1303), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8269] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1305), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8279] = 1,
    ACTIONS(1307), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8285] = 1,
    ACTIONS(1309), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8291] = 1,
    ACTIONS(1311), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8297] = 1,
    ACTIONS(1313), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8303] = 1,
    ACTIONS(1315), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8309] = 1,
    ACTIONS(1317), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8315] = 1,
    ACTIONS(1319), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8321] = 1,
    ACTIONS(1321), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8327] = 1,
    ACTIONS(1323), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8333] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1325), 1,
      anon_sym_LBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8343] = 1,
    ACTIONS(1327), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8349] = 1,
    ACTIONS(1329), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8355] = 1,
    ACTIONS(1331), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8361] = 1,
    ACTIONS(1333), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8367] = 1,
    ACTIONS(1335), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8373] = 1,
    ACTIONS(1337), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8379] = 1,
    ACTIONS(1339), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8385] = 1,
    ACTIONS(1341), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8391] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1343), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8401] = 1,
    ACTIONS(1345), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8407] = 1,
    ACTIONS(1347), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8413] = 1,
    ACTIONS(1349), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8419] = 1,
    ACTIONS(1351), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8425] = 1,
    ACTIONS(1353), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8431] = 1,
    ACTIONS(1355), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8437] = 1,
    ACTIONS(1357), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8443] = 1,
    ACTIONS(1359), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8449] = 1,
    ACTIONS(1361), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8455] = 1,
    ACTIONS(1363), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8461] = 1,
    ACTIONS(1365), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8467] = 1,
    ACTIONS(1367), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8473] = 1,
    ACTIONS(1369), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8479] = 1,
    ACTIONS(1371), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8485] = 1,
    ACTIONS(1373), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8491] = 1,
    ACTIONS(1375), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8497] = 3,
    ACTIONS(1377), 1,
      sym__whitespace,
    ACTIONS(1379), 1,
      anon_sym_LBRACK,
    STATE(620), 1,
      aux_sym_json_repeat1,
  [8507] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1379), 1,
      anon_sym_LBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8517] = 1,
    ACTIONS(1381), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8523] = 1,
    ACTIONS(1383), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8529] = 3,
    ACTIONS(1385), 1,
      anon_sym_LBRACE,
    ACTIONS(1387), 1,
      sym__whitespace,
    STATE(625), 1,
      aux_sym_json_repeat1,
  [8539] = 1,
    ACTIONS(1389), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8545] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1385), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8555] = 1,
    ACTIONS(1391), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8561] = 1,
    ACTIONS(1393), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8567] = 1,
    ACTIONS(1395), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8573] = 1,
    ACTIONS(1397), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8579] = 1,
    ACTIONS(1399), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8585] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(691), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8595] = 3,
    ACTIONS(1401), 1,
      sym__whitespace,
    ACTIONS(1403), 1,
      anon_sym_LBRACK,
    STATE(635), 1,
      aux_sym_json_repeat1,
  [8605] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1403), 1,
      anon_sym_LBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8615] = 3,
    ACTIONS(1405), 1,
      anon_sym_LBRACE,
    ACTIONS(1407), 1,
      sym__whitespace,
    STATE(644), 1,
      aux_sym_json_repeat1,
  [8625] = 1,
    ACTIONS(1409), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8631] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1405), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8641] = 1,
    ACTIONS(1411), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8647] = 1,
    ACTIONS(1413), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8653] = 1,
    ACTIONS(1415), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8659] = 1,
    ACTIONS(1417), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8665] = 1,
    ACTIONS(1419), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8671] = 3,
    ACTIONS(1421), 1,
      sym__whitespace,
    ACTIONS(1423), 1,
      anon_sym_COLON,
    STATE(724), 1,
      aux_sym_json_repeat1,
  [8681] = 1,
    ACTIONS(1425), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8687] = 1,
    ACTIONS(355), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8693] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(719), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8703] = 1,
    ACTIONS(1427), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8709] = 1,
    ACTIONS(1429), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8715] = 1,
    ACTIONS(1431), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8721] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1433), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8731] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1435), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8741] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1437), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8751] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1439), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8761] = 1,
    ACTIONS(325), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8767] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1441), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8777] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1443), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8787] = 1,
    ACTIONS(1445), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8793] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1447), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8803] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1449), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8813] = 3,
    ACTIONS(1451), 1,
      sym__whitespace,
    ACTIONS(1453), 1,
      anon_sym_LBRACK,
    STATE(662), 1,
      aux_sym_json_repeat1,
  [8823] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1455), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8833] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1457), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8843] = 1,
    ACTIONS(1459), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8849] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1461), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8859] = 3,
    ACTIONS(1463), 1,
      anon_sym_LBRACE,
    ACTIONS(1465), 1,
      sym__whitespace,
    STATE(667), 1,
      aux_sym_json_repeat1,
  [8869] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1467), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8879] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1469), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8889] = 1,
    ACTIONS(1471), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8895] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1473), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8905] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1475), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8915] = 3,
    ACTIONS(1477), 1,
      sym__whitespace,
    ACTIONS(1479), 1,
      anon_sym_LBRACK,
    STATE(675), 1,
      aux_sym_json_repeat1,
  [8925] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1481), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8935] = 1,
    ACTIONS(1483), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8941] = 1,
    ACTIONS(1485), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8947] = 3,
    ACTIONS(1487), 1,
      anon_sym_LBRACE,
    ACTIONS(1489), 1,
      sym__whitespace,
    STATE(678), 1,
      aux_sym_json_repeat1,
  [8957] = 1,
    ACTIONS(1491), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8963] = 1,
    ACTIONS(1493), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8969] = 1,
    ACTIONS(1495), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8975] = 1,
    ACTIONS(1497), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8981] = 1,
    ACTIONS(523), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8987] = 1,
    ACTIONS(1499), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8993] = 3,
    ACTIONS(1501), 1,
      sym__whitespace,
    ACTIONS(1503), 1,
      anon_sym_COLON,
    STATE(691), 1,
      aux_sym_json_repeat1,
  [9003] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1505), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9013] = 3,
    ACTIONS(1507), 1,
      sym__whitespace,
    ACTIONS(1509), 1,
      anon_sym_COLON,
    STATE(752), 1,
      aux_sym_json_repeat1,
  [9023] = 1,
    ACTIONS(1511), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9029] = 3,
    ACTIONS(1513), 1,
      sym__whitespace,
    ACTIONS(1515), 1,
      anon_sym_COLON,
    STATE(692), 1,
      aux_sym_json_repeat1,
  [9039] = 1,
    ACTIONS(1517), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9045] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(717), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9055] = 3,
    ACTIONS(1519), 1,
      sym__whitespace,
    ACTIONS(1521), 1,
      anon_sym_COLON,
    STATE(693), 1,
      aux_sym_json_repeat1,
  [9065] = 3,
    ACTIONS(1523), 1,
      sym__whitespace,
    ACTIONS(1525), 1,
      anon_sym_COLON,
    STATE(694), 1,
      aux_sym_json_repeat1,
  [9075] = 3,
    ACTIONS(1527), 1,
      sym__whitespace,
    ACTIONS(1529), 1,
      anon_sym_COLON,
    STATE(696), 1,
      aux_sym_json_repeat1,
  [9085] = 1,
    ACTIONS(1531), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9091] = 3,
    ACTIONS(1533), 1,
      sym__whitespace,
    ACTIONS(1535), 1,
      anon_sym_COLON,
    STATE(697), 1,
      aux_sym_json_repeat1,
  [9101] = 1,
    ACTIONS(1537), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9107] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(689), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9117] = 3,
    ACTIONS(1539), 1,
      sym__whitespace,
    ACTIONS(1541), 1,
      anon_sym_COLON,
    STATE(699), 1,
      aux_sym_json_repeat1,
  [9127] = 3,
    ACTIONS(1543), 1,
      sym__whitespace,
    ACTIONS(1545), 1,
      anon_sym_COLON,
    STATE(700), 1,
      aux_sym_json_repeat1,
  [9137] = 3,
    ACTIONS(1547), 1,
      sym__whitespace,
    ACTIONS(1549), 1,
      anon_sym_COLON,
    STATE(702), 1,
      aux_sym_json_repeat1,
  [9147] = 1,
    ACTIONS(1551), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9153] = 3,
    ACTIONS(1553), 1,
      sym__whitespace,
    ACTIONS(1555), 1,
      anon_sym_COLON,
    STATE(703), 1,
      aux_sym_json_repeat1,
  [9163] = 3,
    ACTIONS(1557), 1,
      sym__whitespace,
    ACTIONS(1559), 1,
      anon_sym_COLON,
    STATE(705), 1,
      aux_sym_json_repeat1,
  [9173] = 3,
    ACTIONS(1561), 1,
      sym__whitespace,
    ACTIONS(1563), 1,
      anon_sym_COLON,
    STATE(707), 1,
      aux_sym_json_repeat1,
  [9183] = 1,
    ACTIONS(1565), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9189] = 3,
    ACTIONS(1567), 1,
      sym__whitespace,
    ACTIONS(1569), 1,
      anon_sym_COLON,
    STATE(708), 1,
      aux_sym_json_repeat1,
  [9199] = 3,
    ACTIONS(1571), 1,
      sym__whitespace,
    ACTIONS(1573), 1,
      anon_sym_COLON,
    STATE(710), 1,
      aux_sym_json_repeat1,
  [9209] = 3,
    ACTIONS(1575), 1,
      sym__whitespace,
    ACTIONS(1577), 1,
      anon_sym_COLON,
    STATE(711), 1,
      aux_sym_json_repeat1,
  [9219] = 1,
    ACTIONS(1579), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9225] = 3,
    ACTIONS(1581), 1,
      sym__whitespace,
    ACTIONS(1583), 1,
      anon_sym_COLON,
    STATE(713), 1,
      aux_sym_json_repeat1,
  [9235] = 1,
    ACTIONS(1585), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9241] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1503), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9251] = 3,
    ACTIONS(9), 1,
      sym__whitespace,
    ACTIONS(1587), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9261] = 1,
    ACTIONS(1589), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9267] = 2,
    ACTIONS(33), 1,
      anon_sym_DQUOTE,
    ACTIONS(1591), 1,
      sym__string_content,
  [9274] = 1,
    ACTIONS(1124), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9279] = 1,
    ACTIONS(1593), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9284] = 1,
    ACTIONS(1595), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9289] = 1,
    ACTIONS(1597), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9294] = 2,
    ACTIONS(1599), 1,
      anon_sym_DQUOTE,
    ACTIONS(1601), 1,
      sym__string_content,
  [9301] = 1,
    ACTIONS(1603), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9306] = 1,
    ACTIONS(1605), 1,
      anon_sym_DQUOTE,
  [9310] = 1,
    ACTIONS(1607), 1,
      anon_sym_DQUOTE,
  [9314] = 1,
    ACTIONS(1609), 1,
      anon_sym_DQUOTE,
  [9318] = 1,
    ACTIONS(1611), 1,
      anon_sym_DQUOTE,
  [9322] = 1,
    ACTIONS(1613), 1,
      anon_sym_DQUOTE,
  [9326] = 1,
    ACTIONS(1615), 1,
      anon_sym_DQUOTE,
  [9330] = 1,
    ACTIONS(1617), 1,
      anon_sym_DQUOTE,
  [9334] = 1,
    ACTIONS(1619), 1,
      anon_sym_DQUOTE,
  [9338] = 1,
    ACTIONS(1621), 1,
      anon_sym_DQUOTE,
  [9342] = 1,
    ACTIONS(1623), 1,
      anon_sym_DQUOTE,
  [9346] = 1,
    ACTIONS(1625), 1,
      anon_sym_DQUOTE,
  [9350] = 1,
    ACTIONS(1627), 1,
      ts_builtin_sym_end,
  [9354] = 1,
    ACTIONS(1629), 1,
      anon_sym_DQUOTE,
  [9358] = 1,
    ACTIONS(1631), 1,
      anon_sym_DQUOTE,
  [9362] = 1,
    ACTIONS(1633), 1,
      anon_sym_DQUOTE,
  [9366] = 1,
    ACTIONS(1635), 1,
      anon_sym_DQUOTE,
  [9370] = 1,
    ACTIONS(1637), 1,
      anon_sym_DQUOTE,
  [9374] = 1,
    ACTIONS(1639), 1,
      anon_sym_DQUOTE,
  [9378] = 1,
    ACTIONS(1641), 1,
      anon_sym_DQUOTE,
  [9382] = 1,
    ACTIONS(1643), 1,
      aux_sym_capture_token1,
  [9386] = 1,
    ACTIONS(1645), 1,
      anon_sym_DQUOTE,
  [9390] = 1,
    ACTIONS(228), 1,
      anon_sym_DQUOTE,
  [9394] = 1,
    ACTIONS(1647), 1,
      anon_sym_DQUOTE,
  [9398] = 1,
    ACTIONS(1649), 1,
      anon_sym_DQUOTE,
  [9402] = 1,
    ACTIONS(1651), 1,
      anon_sym_DQUOTE,
  [9406] = 1,
    ACTIONS(1653), 1,
      anon_sym_DQUOTE,
  [9410] = 1,
    ACTIONS(1655), 1,
      anon_sym_DQUOTE,
  [9414] = 1,
    ACTIONS(1657), 1,
      anon_sym_DQUOTE,
  [9418] = 1,
    ACTIONS(1659), 1,
      anon_sym_DQUOTE,
  [9422] = 1,
    ACTIONS(1661), 1,
      anon_sym_DQUOTE,
  [9426] = 1,
    ACTIONS(1663), 1,
      anon_sym_DQUOTE,
  [9430] = 1,
    ACTIONS(1665), 1,
      anon_sym_DQUOTE,
  [9434] = 1,
    ACTIONS(1667), 1,
      anon_sym_DQUOTE,
  [9438] = 1,
    ACTIONS(1669), 1,
      anon_sym_DQUOTE,
  [9442] = 1,
    ACTIONS(1671), 1,
      anon_sym_DQUOTE,
  [9446] = 1,
    ACTIONS(1673), 1,
      anon_sym_DQUOTE,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 33,
  [SMALL_STATE(4)] = 66,
  [SMALL_STATE(5)] = 98,
  [SMALL_STATE(6)] = 128,
  [SMALL_STATE(7)] = 158,
  [SMALL_STATE(8)] = 190,
  [SMALL_STATE(9)] = 220,
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
  [SMALL_STATE(33)] = 1037,
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
  [SMALL_STATE(48)] = 1349,
  [SMALL_STATE(49)] = 1369,
  [SMALL_STATE(50)] = 1389,
  [SMALL_STATE(51)] = 1409,
  [SMALL_STATE(52)] = 1429,
  [SMALL_STATE(53)] = 1449,
  [SMALL_STATE(54)] = 1470,
  [SMALL_STATE(55)] = 1487,
  [SMALL_STATE(56)] = 1504,
  [SMALL_STATE(57)] = 1521,
  [SMALL_STATE(58)] = 1538,
  [SMALL_STATE(59)] = 1559,
  [SMALL_STATE(60)] = 1576,
  [SMALL_STATE(61)] = 1597,
  [SMALL_STATE(62)] = 1614,
  [SMALL_STATE(63)] = 1631,
  [SMALL_STATE(64)] = 1648,
  [SMALL_STATE(65)] = 1669,
  [SMALL_STATE(66)] = 1686,
  [SMALL_STATE(67)] = 1703,
  [SMALL_STATE(68)] = 1720,
  [SMALL_STATE(69)] = 1737,
  [SMALL_STATE(70)] = 1753,
  [SMALL_STATE(71)] = 1769,
  [SMALL_STATE(72)] = 1785,
  [SMALL_STATE(73)] = 1801,
  [SMALL_STATE(74)] = 1817,
  [SMALL_STATE(75)] = 1833,
  [SMALL_STATE(76)] = 1849,
  [SMALL_STATE(77)] = 1865,
  [SMALL_STATE(78)] = 1881,
  [SMALL_STATE(79)] = 1897,
  [SMALL_STATE(80)] = 1913,
  [SMALL_STATE(81)] = 1929,
  [SMALL_STATE(82)] = 1945,
  [SMALL_STATE(83)] = 1961,
  [SMALL_STATE(84)] = 1977,
  [SMALL_STATE(85)] = 1993,
  [SMALL_STATE(86)] = 2009,
  [SMALL_STATE(87)] = 2025,
  [SMALL_STATE(88)] = 2041,
  [SMALL_STATE(89)] = 2057,
  [SMALL_STATE(90)] = 2073,
  [SMALL_STATE(91)] = 2089,
  [SMALL_STATE(92)] = 2105,
  [SMALL_STATE(93)] = 2121,
  [SMALL_STATE(94)] = 2137,
  [SMALL_STATE(95)] = 2153,
  [SMALL_STATE(96)] = 2169,
  [SMALL_STATE(97)] = 2185,
  [SMALL_STATE(98)] = 2201,
  [SMALL_STATE(99)] = 2217,
  [SMALL_STATE(100)] = 2233,
  [SMALL_STATE(101)] = 2249,
  [SMALL_STATE(102)] = 2265,
  [SMALL_STATE(103)] = 2281,
  [SMALL_STATE(104)] = 2297,
  [SMALL_STATE(105)] = 2313,
  [SMALL_STATE(106)] = 2329,
  [SMALL_STATE(107)] = 2345,
  [SMALL_STATE(108)] = 2361,
  [SMALL_STATE(109)] = 2377,
  [SMALL_STATE(110)] = 2393,
  [SMALL_STATE(111)] = 2409,
  [SMALL_STATE(112)] = 2425,
  [SMALL_STATE(113)] = 2441,
  [SMALL_STATE(114)] = 2457,
  [SMALL_STATE(115)] = 2473,
  [SMALL_STATE(116)] = 2489,
  [SMALL_STATE(117)] = 2505,
  [SMALL_STATE(118)] = 2521,
  [SMALL_STATE(119)] = 2537,
  [SMALL_STATE(120)] = 2553,
  [SMALL_STATE(121)] = 2569,
  [SMALL_STATE(122)] = 2585,
  [SMALL_STATE(123)] = 2601,
  [SMALL_STATE(124)] = 2617,
  [SMALL_STATE(125)] = 2633,
  [SMALL_STATE(126)] = 2649,
  [SMALL_STATE(127)] = 2665,
  [SMALL_STATE(128)] = 2681,
  [SMALL_STATE(129)] = 2697,
  [SMALL_STATE(130)] = 2713,
  [SMALL_STATE(131)] = 2729,
  [SMALL_STATE(132)] = 2745,
  [SMALL_STATE(133)] = 2761,
  [SMALL_STATE(134)] = 2777,
  [SMALL_STATE(135)] = 2793,
  [SMALL_STATE(136)] = 2809,
  [SMALL_STATE(137)] = 2825,
  [SMALL_STATE(138)] = 2841,
  [SMALL_STATE(139)] = 2857,
  [SMALL_STATE(140)] = 2873,
  [SMALL_STATE(141)] = 2889,
  [SMALL_STATE(142)] = 2905,
  [SMALL_STATE(143)] = 2921,
  [SMALL_STATE(144)] = 2937,
  [SMALL_STATE(145)] = 2953,
  [SMALL_STATE(146)] = 2969,
  [SMALL_STATE(147)] = 2985,
  [SMALL_STATE(148)] = 3001,
  [SMALL_STATE(149)] = 3017,
  [SMALL_STATE(150)] = 3033,
  [SMALL_STATE(151)] = 3049,
  [SMALL_STATE(152)] = 3065,
  [SMALL_STATE(153)] = 3081,
  [SMALL_STATE(154)] = 3097,
  [SMALL_STATE(155)] = 3113,
  [SMALL_STATE(156)] = 3129,
  [SMALL_STATE(157)] = 3145,
  [SMALL_STATE(158)] = 3161,
  [SMALL_STATE(159)] = 3177,
  [SMALL_STATE(160)] = 3193,
  [SMALL_STATE(161)] = 3209,
  [SMALL_STATE(162)] = 3225,
  [SMALL_STATE(163)] = 3241,
  [SMALL_STATE(164)] = 3257,
  [SMALL_STATE(165)] = 3273,
  [SMALL_STATE(166)] = 3289,
  [SMALL_STATE(167)] = 3305,
  [SMALL_STATE(168)] = 3321,
  [SMALL_STATE(169)] = 3337,
  [SMALL_STATE(170)] = 3353,
  [SMALL_STATE(171)] = 3369,
  [SMALL_STATE(172)] = 3385,
  [SMALL_STATE(173)] = 3401,
  [SMALL_STATE(174)] = 3417,
  [SMALL_STATE(175)] = 3433,
  [SMALL_STATE(176)] = 3449,
  [SMALL_STATE(177)] = 3465,
  [SMALL_STATE(178)] = 3481,
  [SMALL_STATE(179)] = 3497,
  [SMALL_STATE(180)] = 3513,
  [SMALL_STATE(181)] = 3529,
  [SMALL_STATE(182)] = 3545,
  [SMALL_STATE(183)] = 3561,
  [SMALL_STATE(184)] = 3577,
  [SMALL_STATE(185)] = 3593,
  [SMALL_STATE(186)] = 3609,
  [SMALL_STATE(187)] = 3625,
  [SMALL_STATE(188)] = 3641,
  [SMALL_STATE(189)] = 3657,
  [SMALL_STATE(190)] = 3673,
  [SMALL_STATE(191)] = 3685,
  [SMALL_STATE(192)] = 3701,
  [SMALL_STATE(193)] = 3717,
  [SMALL_STATE(194)] = 3733,
  [SMALL_STATE(195)] = 3749,
  [SMALL_STATE(196)] = 3765,
  [SMALL_STATE(197)] = 3781,
  [SMALL_STATE(198)] = 3797,
  [SMALL_STATE(199)] = 3813,
  [SMALL_STATE(200)] = 3829,
  [SMALL_STATE(201)] = 3845,
  [SMALL_STATE(202)] = 3861,
  [SMALL_STATE(203)] = 3877,
  [SMALL_STATE(204)] = 3893,
  [SMALL_STATE(205)] = 3909,
  [SMALL_STATE(206)] = 3925,
  [SMALL_STATE(207)] = 3941,
  [SMALL_STATE(208)] = 3957,
  [SMALL_STATE(209)] = 3973,
  [SMALL_STATE(210)] = 3989,
  [SMALL_STATE(211)] = 4005,
  [SMALL_STATE(212)] = 4021,
  [SMALL_STATE(213)] = 4037,
  [SMALL_STATE(214)] = 4053,
  [SMALL_STATE(215)] = 4069,
  [SMALL_STATE(216)] = 4085,
  [SMALL_STATE(217)] = 4101,
  [SMALL_STATE(218)] = 4117,
  [SMALL_STATE(219)] = 4133,
  [SMALL_STATE(220)] = 4149,
  [SMALL_STATE(221)] = 4165,
  [SMALL_STATE(222)] = 4181,
  [SMALL_STATE(223)] = 4197,
  [SMALL_STATE(224)] = 4213,
  [SMALL_STATE(225)] = 4229,
  [SMALL_STATE(226)] = 4245,
  [SMALL_STATE(227)] = 4261,
  [SMALL_STATE(228)] = 4277,
  [SMALL_STATE(229)] = 4293,
  [SMALL_STATE(230)] = 4309,
  [SMALL_STATE(231)] = 4325,
  [SMALL_STATE(232)] = 4341,
  [SMALL_STATE(233)] = 4357,
  [SMALL_STATE(234)] = 4370,
  [SMALL_STATE(235)] = 4383,
  [SMALL_STATE(236)] = 4396,
  [SMALL_STATE(237)] = 4409,
  [SMALL_STATE(238)] = 4422,
  [SMALL_STATE(239)] = 4435,
  [SMALL_STATE(240)] = 4448,
  [SMALL_STATE(241)] = 4461,
  [SMALL_STATE(242)] = 4474,
  [SMALL_STATE(243)] = 4487,
  [SMALL_STATE(244)] = 4500,
  [SMALL_STATE(245)] = 4513,
  [SMALL_STATE(246)] = 4526,
  [SMALL_STATE(247)] = 4539,
  [SMALL_STATE(248)] = 4552,
  [SMALL_STATE(249)] = 4563,
  [SMALL_STATE(250)] = 4576,
  [SMALL_STATE(251)] = 4589,
  [SMALL_STATE(252)] = 4602,
  [SMALL_STATE(253)] = 4615,
  [SMALL_STATE(254)] = 4626,
  [SMALL_STATE(255)] = 4639,
  [SMALL_STATE(256)] = 4652,
  [SMALL_STATE(257)] = 4659,
  [SMALL_STATE(258)] = 4672,
  [SMALL_STATE(259)] = 4685,
  [SMALL_STATE(260)] = 4698,
  [SMALL_STATE(261)] = 4711,
  [SMALL_STATE(262)] = 4724,
  [SMALL_STATE(263)] = 4737,
  [SMALL_STATE(264)] = 4748,
  [SMALL_STATE(265)] = 4759,
  [SMALL_STATE(266)] = 4770,
  [SMALL_STATE(267)] = 4783,
  [SMALL_STATE(268)] = 4796,
  [SMALL_STATE(269)] = 4809,
  [SMALL_STATE(270)] = 4822,
  [SMALL_STATE(271)] = 4835,
  [SMALL_STATE(272)] = 4848,
  [SMALL_STATE(273)] = 4859,
  [SMALL_STATE(274)] = 4872,
  [SMALL_STATE(275)] = 4885,
  [SMALL_STATE(276)] = 4898,
  [SMALL_STATE(277)] = 4911,
  [SMALL_STATE(278)] = 4918,
  [SMALL_STATE(279)] = 4931,
  [SMALL_STATE(280)] = 4944,
  [SMALL_STATE(281)] = 4957,
  [SMALL_STATE(282)] = 4970,
  [SMALL_STATE(283)] = 4983,
  [SMALL_STATE(284)] = 4996,
  [SMALL_STATE(285)] = 5009,
  [SMALL_STATE(286)] = 5022,
  [SMALL_STATE(287)] = 5035,
  [SMALL_STATE(288)] = 5048,
  [SMALL_STATE(289)] = 5061,
  [SMALL_STATE(290)] = 5074,
  [SMALL_STATE(291)] = 5087,
  [SMALL_STATE(292)] = 5100,
  [SMALL_STATE(293)] = 5113,
  [SMALL_STATE(294)] = 5126,
  [SMALL_STATE(295)] = 5139,
  [SMALL_STATE(296)] = 5152,
  [SMALL_STATE(297)] = 5165,
  [SMALL_STATE(298)] = 5178,
  [SMALL_STATE(299)] = 5191,
  [SMALL_STATE(300)] = 5204,
  [SMALL_STATE(301)] = 5217,
  [SMALL_STATE(302)] = 5230,
  [SMALL_STATE(303)] = 5243,
  [SMALL_STATE(304)] = 5256,
  [SMALL_STATE(305)] = 5269,
  [SMALL_STATE(306)] = 5282,
  [SMALL_STATE(307)] = 5295,
  [SMALL_STATE(308)] = 5308,
  [SMALL_STATE(309)] = 5321,
  [SMALL_STATE(310)] = 5334,
  [SMALL_STATE(311)] = 5347,
  [SMALL_STATE(312)] = 5360,
  [SMALL_STATE(313)] = 5367,
  [SMALL_STATE(314)] = 5380,
  [SMALL_STATE(315)] = 5391,
  [SMALL_STATE(316)] = 5404,
  [SMALL_STATE(317)] = 5417,
  [SMALL_STATE(318)] = 5430,
  [SMALL_STATE(319)] = 5443,
  [SMALL_STATE(320)] = 5456,
  [SMALL_STATE(321)] = 5469,
  [SMALL_STATE(322)] = 5482,
  [SMALL_STATE(323)] = 5495,
  [SMALL_STATE(324)] = 5508,
  [SMALL_STATE(325)] = 5521,
  [SMALL_STATE(326)] = 5534,
  [SMALL_STATE(327)] = 5547,
  [SMALL_STATE(328)] = 5560,
  [SMALL_STATE(329)] = 5573,
  [SMALL_STATE(330)] = 5586,
  [SMALL_STATE(331)] = 5599,
  [SMALL_STATE(332)] = 5612,
  [SMALL_STATE(333)] = 5625,
  [SMALL_STATE(334)] = 5638,
  [SMALL_STATE(335)] = 5651,
  [SMALL_STATE(336)] = 5664,
  [SMALL_STATE(337)] = 5677,
  [SMALL_STATE(338)] = 5684,
  [SMALL_STATE(339)] = 5697,
  [SMALL_STATE(340)] = 5710,
  [SMALL_STATE(341)] = 5723,
  [SMALL_STATE(342)] = 5736,
  [SMALL_STATE(343)] = 5749,
  [SMALL_STATE(344)] = 5762,
  [SMALL_STATE(345)] = 5775,
  [SMALL_STATE(346)] = 5788,
  [SMALL_STATE(347)] = 5801,
  [SMALL_STATE(348)] = 5814,
  [SMALL_STATE(349)] = 5827,
  [SMALL_STATE(350)] = 5840,
  [SMALL_STATE(351)] = 5853,
  [SMALL_STATE(352)] = 5866,
  [SMALL_STATE(353)] = 5879,
  [SMALL_STATE(354)] = 5892,
  [SMALL_STATE(355)] = 5905,
  [SMALL_STATE(356)] = 5918,
  [SMALL_STATE(357)] = 5931,
  [SMALL_STATE(358)] = 5944,
  [SMALL_STATE(359)] = 5957,
  [SMALL_STATE(360)] = 5970,
  [SMALL_STATE(361)] = 5983,
  [SMALL_STATE(362)] = 5990,
  [SMALL_STATE(363)] = 6003,
  [SMALL_STATE(364)] = 6014,
  [SMALL_STATE(365)] = 6027,
  [SMALL_STATE(366)] = 6040,
  [SMALL_STATE(367)] = 6053,
  [SMALL_STATE(368)] = 6066,
  [SMALL_STATE(369)] = 6079,
  [SMALL_STATE(370)] = 6092,
  [SMALL_STATE(371)] = 6105,
  [SMALL_STATE(372)] = 6118,
  [SMALL_STATE(373)] = 6131,
  [SMALL_STATE(374)] = 6144,
  [SMALL_STATE(375)] = 6157,
  [SMALL_STATE(376)] = 6170,
  [SMALL_STATE(377)] = 6183,
  [SMALL_STATE(378)] = 6196,
  [SMALL_STATE(379)] = 6209,
  [SMALL_STATE(380)] = 6222,
  [SMALL_STATE(381)] = 6235,
  [SMALL_STATE(382)] = 6248,
  [SMALL_STATE(383)] = 6261,
  [SMALL_STATE(384)] = 6274,
  [SMALL_STATE(385)] = 6287,
  [SMALL_STATE(386)] = 6300,
  [SMALL_STATE(387)] = 6313,
  [SMALL_STATE(388)] = 6326,
  [SMALL_STATE(389)] = 6333,
  [SMALL_STATE(390)] = 6346,
  [SMALL_STATE(391)] = 6359,
  [SMALL_STATE(392)] = 6372,
  [SMALL_STATE(393)] = 6385,
  [SMALL_STATE(394)] = 6398,
  [SMALL_STATE(395)] = 6411,
  [SMALL_STATE(396)] = 6424,
  [SMALL_STATE(397)] = 6437,
  [SMALL_STATE(398)] = 6450,
  [SMALL_STATE(399)] = 6463,
  [SMALL_STATE(400)] = 6476,
  [SMALL_STATE(401)] = 6489,
  [SMALL_STATE(402)] = 6502,
  [SMALL_STATE(403)] = 6515,
  [SMALL_STATE(404)] = 6528,
  [SMALL_STATE(405)] = 6541,
  [SMALL_STATE(406)] = 6554,
  [SMALL_STATE(407)] = 6567,
  [SMALL_STATE(408)] = 6580,
  [SMALL_STATE(409)] = 6587,
  [SMALL_STATE(410)] = 6600,
  [SMALL_STATE(411)] = 6613,
  [SMALL_STATE(412)] = 6626,
  [SMALL_STATE(413)] = 6639,
  [SMALL_STATE(414)] = 6652,
  [SMALL_STATE(415)] = 6665,
  [SMALL_STATE(416)] = 6678,
  [SMALL_STATE(417)] = 6691,
  [SMALL_STATE(418)] = 6704,
  [SMALL_STATE(419)] = 6717,
  [SMALL_STATE(420)] = 6730,
  [SMALL_STATE(421)] = 6743,
  [SMALL_STATE(422)] = 6750,
  [SMALL_STATE(423)] = 6763,
  [SMALL_STATE(424)] = 6776,
  [SMALL_STATE(425)] = 6783,
  [SMALL_STATE(426)] = 6793,
  [SMALL_STATE(427)] = 6799,
  [SMALL_STATE(428)] = 6809,
  [SMALL_STATE(429)] = 6815,
  [SMALL_STATE(430)] = 6821,
  [SMALL_STATE(431)] = 6827,
  [SMALL_STATE(432)] = 6837,
  [SMALL_STATE(433)] = 6843,
  [SMALL_STATE(434)] = 6853,
  [SMALL_STATE(435)] = 6859,
  [SMALL_STATE(436)] = 6865,
  [SMALL_STATE(437)] = 6871,
  [SMALL_STATE(438)] = 6877,
  [SMALL_STATE(439)] = 6887,
  [SMALL_STATE(440)] = 6893,
  [SMALL_STATE(441)] = 6903,
  [SMALL_STATE(442)] = 6913,
  [SMALL_STATE(443)] = 6919,
  [SMALL_STATE(444)] = 6925,
  [SMALL_STATE(445)] = 6931,
  [SMALL_STATE(446)] = 6937,
  [SMALL_STATE(447)] = 6943,
  [SMALL_STATE(448)] = 6949,
  [SMALL_STATE(449)] = 6959,
  [SMALL_STATE(450)] = 6965,
  [SMALL_STATE(451)] = 6971,
  [SMALL_STATE(452)] = 6981,
  [SMALL_STATE(453)] = 6991,
  [SMALL_STATE(454)] = 7001,
  [SMALL_STATE(455)] = 7011,
  [SMALL_STATE(456)] = 7021,
  [SMALL_STATE(457)] = 7031,
  [SMALL_STATE(458)] = 7041,
  [SMALL_STATE(459)] = 7051,
  [SMALL_STATE(460)] = 7061,
  [SMALL_STATE(461)] = 7071,
  [SMALL_STATE(462)] = 7081,
  [SMALL_STATE(463)] = 7091,
  [SMALL_STATE(464)] = 7101,
  [SMALL_STATE(465)] = 7111,
  [SMALL_STATE(466)] = 7121,
  [SMALL_STATE(467)] = 7131,
  [SMALL_STATE(468)] = 7141,
  [SMALL_STATE(469)] = 7151,
  [SMALL_STATE(470)] = 7161,
  [SMALL_STATE(471)] = 7171,
  [SMALL_STATE(472)] = 7181,
  [SMALL_STATE(473)] = 7191,
  [SMALL_STATE(474)] = 7201,
  [SMALL_STATE(475)] = 7211,
  [SMALL_STATE(476)] = 7221,
  [SMALL_STATE(477)] = 7231,
  [SMALL_STATE(478)] = 7237,
  [SMALL_STATE(479)] = 7247,
  [SMALL_STATE(480)] = 7257,
  [SMALL_STATE(481)] = 7267,
  [SMALL_STATE(482)] = 7273,
  [SMALL_STATE(483)] = 7279,
  [SMALL_STATE(484)] = 7285,
  [SMALL_STATE(485)] = 7291,
  [SMALL_STATE(486)] = 7297,
  [SMALL_STATE(487)] = 7307,
  [SMALL_STATE(488)] = 7313,
  [SMALL_STATE(489)] = 7319,
  [SMALL_STATE(490)] = 7325,
  [SMALL_STATE(491)] = 7331,
  [SMALL_STATE(492)] = 7337,
  [SMALL_STATE(493)] = 7343,
  [SMALL_STATE(494)] = 7353,
  [SMALL_STATE(495)] = 7359,
  [SMALL_STATE(496)] = 7369,
  [SMALL_STATE(497)] = 7379,
  [SMALL_STATE(498)] = 7385,
  [SMALL_STATE(499)] = 7391,
  [SMALL_STATE(500)] = 7397,
  [SMALL_STATE(501)] = 7403,
  [SMALL_STATE(502)] = 7409,
  [SMALL_STATE(503)] = 7415,
  [SMALL_STATE(504)] = 7421,
  [SMALL_STATE(505)] = 7427,
  [SMALL_STATE(506)] = 7433,
  [SMALL_STATE(507)] = 7439,
  [SMALL_STATE(508)] = 7449,
  [SMALL_STATE(509)] = 7455,
  [SMALL_STATE(510)] = 7465,
  [SMALL_STATE(511)] = 7475,
  [SMALL_STATE(512)] = 7485,
  [SMALL_STATE(513)] = 7495,
  [SMALL_STATE(514)] = 7501,
  [SMALL_STATE(515)] = 7507,
  [SMALL_STATE(516)] = 7513,
  [SMALL_STATE(517)] = 7519,
  [SMALL_STATE(518)] = 7525,
  [SMALL_STATE(519)] = 7531,
  [SMALL_STATE(520)] = 7537,
  [SMALL_STATE(521)] = 7543,
  [SMALL_STATE(522)] = 7549,
  [SMALL_STATE(523)] = 7555,
  [SMALL_STATE(524)] = 7561,
  [SMALL_STATE(525)] = 7567,
  [SMALL_STATE(526)] = 7573,
  [SMALL_STATE(527)] = 7579,
  [SMALL_STATE(528)] = 7585,
  [SMALL_STATE(529)] = 7591,
  [SMALL_STATE(530)] = 7601,
  [SMALL_STATE(531)] = 7607,
  [SMALL_STATE(532)] = 7613,
  [SMALL_STATE(533)] = 7619,
  [SMALL_STATE(534)] = 7625,
  [SMALL_STATE(535)] = 7635,
  [SMALL_STATE(536)] = 7641,
  [SMALL_STATE(537)] = 7651,
  [SMALL_STATE(538)] = 7661,
  [SMALL_STATE(539)] = 7667,
  [SMALL_STATE(540)] = 7677,
  [SMALL_STATE(541)] = 7687,
  [SMALL_STATE(542)] = 7693,
  [SMALL_STATE(543)] = 7703,
  [SMALL_STATE(544)] = 7713,
  [SMALL_STATE(545)] = 7719,
  [SMALL_STATE(546)] = 7729,
  [SMALL_STATE(547)] = 7739,
  [SMALL_STATE(548)] = 7745,
  [SMALL_STATE(549)] = 7755,
  [SMALL_STATE(550)] = 7761,
  [SMALL_STATE(551)] = 7767,
  [SMALL_STATE(552)] = 7777,
  [SMALL_STATE(553)] = 7787,
  [SMALL_STATE(554)] = 7793,
  [SMALL_STATE(555)] = 7799,
  [SMALL_STATE(556)] = 7805,
  [SMALL_STATE(557)] = 7811,
  [SMALL_STATE(558)] = 7821,
  [SMALL_STATE(559)] = 7827,
  [SMALL_STATE(560)] = 7833,
  [SMALL_STATE(561)] = 7839,
  [SMALL_STATE(562)] = 7845,
  [SMALL_STATE(563)] = 7851,
  [SMALL_STATE(564)] = 7861,
  [SMALL_STATE(565)] = 7867,
  [SMALL_STATE(566)] = 7873,
  [SMALL_STATE(567)] = 7879,
  [SMALL_STATE(568)] = 7885,
  [SMALL_STATE(569)] = 7891,
  [SMALL_STATE(570)] = 7897,
  [SMALL_STATE(571)] = 7905,
  [SMALL_STATE(572)] = 7915,
  [SMALL_STATE(573)] = 7921,
  [SMALL_STATE(574)] = 7927,
  [SMALL_STATE(575)] = 7933,
  [SMALL_STATE(576)] = 7943,
  [SMALL_STATE(577)] = 7949,
  [SMALL_STATE(578)] = 7955,
  [SMALL_STATE(579)] = 7961,
  [SMALL_STATE(580)] = 7967,
  [SMALL_STATE(581)] = 7973,
  [SMALL_STATE(582)] = 7979,
  [SMALL_STATE(583)] = 7985,
  [SMALL_STATE(584)] = 7991,
  [SMALL_STATE(585)] = 7997,
  [SMALL_STATE(586)] = 8003,
  [SMALL_STATE(587)] = 8009,
  [SMALL_STATE(588)] = 8019,
  [SMALL_STATE(589)] = 8025,
  [SMALL_STATE(590)] = 8031,
  [SMALL_STATE(591)] = 8037,
  [SMALL_STATE(592)] = 8043,
  [SMALL_STATE(593)] = 8049,
  [SMALL_STATE(594)] = 8055,
  [SMALL_STATE(595)] = 8061,
  [SMALL_STATE(596)] = 8071,
  [SMALL_STATE(597)] = 8077,
  [SMALL_STATE(598)] = 8083,
  [SMALL_STATE(599)] = 8089,
  [SMALL_STATE(600)] = 8095,
  [SMALL_STATE(601)] = 8105,
  [SMALL_STATE(602)] = 8115,
  [SMALL_STATE(603)] = 8121,
  [SMALL_STATE(604)] = 8127,
  [SMALL_STATE(605)] = 8133,
  [SMALL_STATE(606)] = 8139,
  [SMALL_STATE(607)] = 8149,
  [SMALL_STATE(608)] = 8155,
  [SMALL_STATE(609)] = 8161,
  [SMALL_STATE(610)] = 8167,
  [SMALL_STATE(611)] = 8177,
  [SMALL_STATE(612)] = 8187,
  [SMALL_STATE(613)] = 8193,
  [SMALL_STATE(614)] = 8199,
  [SMALL_STATE(615)] = 8205,
  [SMALL_STATE(616)] = 8211,
  [SMALL_STATE(617)] = 8217,
  [SMALL_STATE(618)] = 8223,
  [SMALL_STATE(619)] = 8229,
  [SMALL_STATE(620)] = 8235,
  [SMALL_STATE(621)] = 8245,
  [SMALL_STATE(622)] = 8251,
  [SMALL_STATE(623)] = 8257,
  [SMALL_STATE(624)] = 8263,
  [SMALL_STATE(625)] = 8269,
  [SMALL_STATE(626)] = 8279,
  [SMALL_STATE(627)] = 8285,
  [SMALL_STATE(628)] = 8291,
  [SMALL_STATE(629)] = 8297,
  [SMALL_STATE(630)] = 8303,
  [SMALL_STATE(631)] = 8309,
  [SMALL_STATE(632)] = 8315,
  [SMALL_STATE(633)] = 8321,
  [SMALL_STATE(634)] = 8327,
  [SMALL_STATE(635)] = 8333,
  [SMALL_STATE(636)] = 8343,
  [SMALL_STATE(637)] = 8349,
  [SMALL_STATE(638)] = 8355,
  [SMALL_STATE(639)] = 8361,
  [SMALL_STATE(640)] = 8367,
  [SMALL_STATE(641)] = 8373,
  [SMALL_STATE(642)] = 8379,
  [SMALL_STATE(643)] = 8385,
  [SMALL_STATE(644)] = 8391,
  [SMALL_STATE(645)] = 8401,
  [SMALL_STATE(646)] = 8407,
  [SMALL_STATE(647)] = 8413,
  [SMALL_STATE(648)] = 8419,
  [SMALL_STATE(649)] = 8425,
  [SMALL_STATE(650)] = 8431,
  [SMALL_STATE(651)] = 8437,
  [SMALL_STATE(652)] = 8443,
  [SMALL_STATE(653)] = 8449,
  [SMALL_STATE(654)] = 8455,
  [SMALL_STATE(655)] = 8461,
  [SMALL_STATE(656)] = 8467,
  [SMALL_STATE(657)] = 8473,
  [SMALL_STATE(658)] = 8479,
  [SMALL_STATE(659)] = 8485,
  [SMALL_STATE(660)] = 8491,
  [SMALL_STATE(661)] = 8497,
  [SMALL_STATE(662)] = 8507,
  [SMALL_STATE(663)] = 8517,
  [SMALL_STATE(664)] = 8523,
  [SMALL_STATE(665)] = 8529,
  [SMALL_STATE(666)] = 8539,
  [SMALL_STATE(667)] = 8545,
  [SMALL_STATE(668)] = 8555,
  [SMALL_STATE(669)] = 8561,
  [SMALL_STATE(670)] = 8567,
  [SMALL_STATE(671)] = 8573,
  [SMALL_STATE(672)] = 8579,
  [SMALL_STATE(673)] = 8585,
  [SMALL_STATE(674)] = 8595,
  [SMALL_STATE(675)] = 8605,
  [SMALL_STATE(676)] = 8615,
  [SMALL_STATE(677)] = 8625,
  [SMALL_STATE(678)] = 8631,
  [SMALL_STATE(679)] = 8641,
  [SMALL_STATE(680)] = 8647,
  [SMALL_STATE(681)] = 8653,
  [SMALL_STATE(682)] = 8659,
  [SMALL_STATE(683)] = 8665,
  [SMALL_STATE(684)] = 8671,
  [SMALL_STATE(685)] = 8681,
  [SMALL_STATE(686)] = 8687,
  [SMALL_STATE(687)] = 8693,
  [SMALL_STATE(688)] = 8703,
  [SMALL_STATE(689)] = 8709,
  [SMALL_STATE(690)] = 8715,
  [SMALL_STATE(691)] = 8721,
  [SMALL_STATE(692)] = 8731,
  [SMALL_STATE(693)] = 8741,
  [SMALL_STATE(694)] = 8751,
  [SMALL_STATE(695)] = 8761,
  [SMALL_STATE(696)] = 8767,
  [SMALL_STATE(697)] = 8777,
  [SMALL_STATE(698)] = 8787,
  [SMALL_STATE(699)] = 8793,
  [SMALL_STATE(700)] = 8803,
  [SMALL_STATE(701)] = 8813,
  [SMALL_STATE(702)] = 8823,
  [SMALL_STATE(703)] = 8833,
  [SMALL_STATE(704)] = 8843,
  [SMALL_STATE(705)] = 8849,
  [SMALL_STATE(706)] = 8859,
  [SMALL_STATE(707)] = 8869,
  [SMALL_STATE(708)] = 8879,
  [SMALL_STATE(709)] = 8889,
  [SMALL_STATE(710)] = 8895,
  [SMALL_STATE(711)] = 8905,
  [SMALL_STATE(712)] = 8915,
  [SMALL_STATE(713)] = 8925,
  [SMALL_STATE(714)] = 8935,
  [SMALL_STATE(715)] = 8941,
  [SMALL_STATE(716)] = 8947,
  [SMALL_STATE(717)] = 8957,
  [SMALL_STATE(718)] = 8963,
  [SMALL_STATE(719)] = 8969,
  [SMALL_STATE(720)] = 8975,
  [SMALL_STATE(721)] = 8981,
  [SMALL_STATE(722)] = 8987,
  [SMALL_STATE(723)] = 8993,
  [SMALL_STATE(724)] = 9003,
  [SMALL_STATE(725)] = 9013,
  [SMALL_STATE(726)] = 9023,
  [SMALL_STATE(727)] = 9029,
  [SMALL_STATE(728)] = 9039,
  [SMALL_STATE(729)] = 9045,
  [SMALL_STATE(730)] = 9055,
  [SMALL_STATE(731)] = 9065,
  [SMALL_STATE(732)] = 9075,
  [SMALL_STATE(733)] = 9085,
  [SMALL_STATE(734)] = 9091,
  [SMALL_STATE(735)] = 9101,
  [SMALL_STATE(736)] = 9107,
  [SMALL_STATE(737)] = 9117,
  [SMALL_STATE(738)] = 9127,
  [SMALL_STATE(739)] = 9137,
  [SMALL_STATE(740)] = 9147,
  [SMALL_STATE(741)] = 9153,
  [SMALL_STATE(742)] = 9163,
  [SMALL_STATE(743)] = 9173,
  [SMALL_STATE(744)] = 9183,
  [SMALL_STATE(745)] = 9189,
  [SMALL_STATE(746)] = 9199,
  [SMALL_STATE(747)] = 9209,
  [SMALL_STATE(748)] = 9219,
  [SMALL_STATE(749)] = 9225,
  [SMALL_STATE(750)] = 9235,
  [SMALL_STATE(751)] = 9241,
  [SMALL_STATE(752)] = 9251,
  [SMALL_STATE(753)] = 9261,
  [SMALL_STATE(754)] = 9267,
  [SMALL_STATE(755)] = 9274,
  [SMALL_STATE(756)] = 9279,
  [SMALL_STATE(757)] = 9284,
  [SMALL_STATE(758)] = 9289,
  [SMALL_STATE(759)] = 9294,
  [SMALL_STATE(760)] = 9301,
  [SMALL_STATE(761)] = 9306,
  [SMALL_STATE(762)] = 9310,
  [SMALL_STATE(763)] = 9314,
  [SMALL_STATE(764)] = 9318,
  [SMALL_STATE(765)] = 9322,
  [SMALL_STATE(766)] = 9326,
  [SMALL_STATE(767)] = 9330,
  [SMALL_STATE(768)] = 9334,
  [SMALL_STATE(769)] = 9338,
  [SMALL_STATE(770)] = 9342,
  [SMALL_STATE(771)] = 9346,
  [SMALL_STATE(772)] = 9350,
  [SMALL_STATE(773)] = 9354,
  [SMALL_STATE(774)] = 9358,
  [SMALL_STATE(775)] = 9362,
  [SMALL_STATE(776)] = 9366,
  [SMALL_STATE(777)] = 9370,
  [SMALL_STATE(778)] = 9374,
  [SMALL_STATE(779)] = 9378,
  [SMALL_STATE(780)] = 9382,
  [SMALL_STATE(781)] = 9386,
  [SMALL_STATE(782)] = 9390,
  [SMALL_STATE(783)] = 9394,
  [SMALL_STATE(784)] = 9398,
  [SMALL_STATE(785)] = 9402,
  [SMALL_STATE(786)] = 9406,
  [SMALL_STATE(787)] = 9410,
  [SMALL_STATE(788)] = 9414,
  [SMALL_STATE(789)] = 9418,
  [SMALL_STATE(790)] = 9422,
  [SMALL_STATE(791)] = 9426,
  [SMALL_STATE(792)] = 9430,
  [SMALL_STATE(793)] = 9434,
  [SMALL_STATE(794)] = 9438,
  [SMALL_STATE(795)] = 9442,
  [SMALL_STATE(796)] = 9446,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_json, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(4),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(337),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(256),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [17] = {.entry = {.count = 1, .reusable = true}}, SHIFT(755),
  [19] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [21] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [23] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [25] = {.entry = {.count = 1, .reusable = true}}, SHIFT(757),
  [27] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [29] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [31] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [33] = {.entry = {.count = 1, .reusable = true}}, SHIFT(571),
  [35] = {.entry = {.count = 1, .reusable = false}}, SHIFT(781),
  [37] = {.entry = {.count = 1, .reusable = false}}, SHIFT(779),
  [39] = {.entry = {.count = 1, .reusable = false}}, SHIFT(796),
  [41] = {.entry = {.count = 1, .reusable = false}}, SHIFT(784),
  [43] = {.entry = {.count = 1, .reusable = false}}, SHIFT(785),
  [45] = {.entry = {.count = 1, .reusable = false}}, SHIFT(786),
  [47] = {.entry = {.count = 1, .reusable = false}}, SHIFT(788),
  [49] = {.entry = {.count = 1, .reusable = false}}, SHIFT(789),
  [51] = {.entry = {.count = 1, .reusable = false}}, SHIFT(790),
  [53] = {.entry = {.count = 1, .reusable = false}}, SHIFT(791),
  [55] = {.entry = {.count = 1, .reusable = false}}, SHIFT(792),
  [57] = {.entry = {.count = 1, .reusable = false}}, SHIFT(793),
  [59] = {.entry = {.count = 1, .reusable = false}}, SHIFT(794),
  [61] = {.entry = {.count = 1, .reusable = false}}, SHIFT(795),
  [63] = {.entry = {.count = 1, .reusable = false}}, SHIFT(787),
  [65] = {.entry = {.count = 1, .reusable = false}}, SHIFT(773),
  [67] = {.entry = {.count = 1, .reusable = false}}, SHIFT(774),
  [69] = {.entry = {.count = 1, .reusable = false}}, SHIFT(762),
  [71] = {.entry = {.count = 1, .reusable = false}}, SHIFT(776),
  [73] = {.entry = {.count = 1, .reusable = false}}, SHIFT(761),
  [75] = {.entry = {.count = 1, .reusable = false}}, SHIFT(771),
  [77] = {.entry = {.count = 1, .reusable = false}}, SHIFT(770),
  [79] = {.entry = {.count = 1, .reusable = false}}, SHIFT(768),
  [81] = {.entry = {.count = 1, .reusable = false}}, SHIFT(767),
  [83] = {.entry = {.count = 1, .reusable = false}}, SHIFT(766),
  [85] = {.entry = {.count = 1, .reusable = false}}, SHIFT(765),
  [87] = {.entry = {.count = 1, .reusable = false}}, SHIFT(763),
  [89] = {.entry = {.count = 1, .reusable = false}}, SHIFT(778),
  [91] = {.entry = {.count = 1, .reusable = true}}, SHIFT(112),
  [93] = {.entry = {.count = 1, .reusable = true}}, SHIFT(759),
  [95] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [97] = {.entry = {.count = 1, .reusable = true}}, SHIFT(604),
  [99] = {.entry = {.count = 1, .reusable = true}}, SHIFT(424),
  [101] = {.entry = {.count = 1, .reusable = true}}, SHIFT(421),
  [103] = {.entry = {.count = 1, .reusable = true}}, SHIFT(219),
  [105] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [107] = {.entry = {.count = 1, .reusable = true}}, SHIFT(648),
  [109] = {.entry = {.count = 1, .reusable = true}}, SHIFT(172),
  [111] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [113] = {.entry = {.count = 1, .reusable = true}}, SHIFT(685),
  [115] = {.entry = {.count = 1, .reusable = true}}, SHIFT(113),
  [117] = {.entry = {.count = 1, .reusable = true}}, SHIFT(650),
  [119] = {.entry = {.count = 1, .reusable = true}}, SHIFT(177),
  [121] = {.entry = {.count = 1, .reusable = true}}, SHIFT(489),
  [123] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [125] = {.entry = {.count = 1, .reusable = true}}, SHIFT(554),
  [127] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [129] = {.entry = {.count = 1, .reusable = true}}, SHIFT(603),
  [131] = {.entry = {.count = 1, .reusable = true}}, SHIFT(71),
  [133] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [135] = {.entry = {.count = 1, .reusable = true}}, SHIFT(426),
  [137] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [139] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [141] = {.entry = {.count = 1, .reusable = true}}, SHIFT(647),
  [143] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [145] = {.entry = {.count = 1, .reusable = true}}, SHIFT(679),
  [147] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [149] = {.entry = {.count = 1, .reusable = true}}, SHIFT(654),
  [151] = {.entry = {.count = 1, .reusable = true}}, SHIFT(562),
  [153] = {.entry = {.count = 1, .reusable = true}}, SHIFT(561),
  [155] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat1, 2),
  [157] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat1, 2), SHIFT_REPEAT(33),
  [160] = {.entry = {.count = 1, .reusable = true}}, SHIFT(32),
  [162] = {.entry = {.count = 1, .reusable = true}}, SHIFT(717),
  [164] = {.entry = {.count = 1, .reusable = true}}, SHIFT(689),
  [166] = {.entry = {.count = 1, .reusable = true}}, SHIFT(175),
  [168] = {.entry = {.count = 1, .reusable = true}}, SHIFT(622),
  [170] = {.entry = {.count = 1, .reusable = true}}, SHIFT(95),
  [172] = {.entry = {.count = 1, .reusable = true}}, SHIFT(645),
  [174] = {.entry = {.count = 1, .reusable = true}}, SHIFT(35),
  [176] = {.entry = {.count = 1, .reusable = true}}, SHIFT(553),
  [178] = {.entry = {.count = 1, .reusable = true}}, SHIFT(48),
  [180] = {.entry = {.count = 1, .reusable = true}}, SHIFT(672),
  [182] = {.entry = {.count = 1, .reusable = true}}, SHIFT(677),
  [184] = {.entry = {.count = 1, .reusable = true}}, SHIFT(45),
  [186] = {.entry = {.count = 1, .reusable = true}}, SHIFT(559),
  [188] = {.entry = {.count = 1, .reusable = true}}, SHIFT(36),
  [190] = {.entry = {.count = 1, .reusable = true}}, SHIFT(718),
  [192] = {.entry = {.count = 1, .reusable = true}}, SHIFT(488),
  [194] = {.entry = {.count = 1, .reusable = true}}, SHIFT(39),
  [196] = {.entry = {.count = 1, .reusable = true}}, SHIFT(590),
  [198] = {.entry = {.count = 1, .reusable = true}}, SHIFT(38),
  [200] = {.entry = {.count = 1, .reusable = true}}, SHIFT(616),
  [202] = {.entry = {.count = 1, .reusable = true}}, SHIFT(41),
  [204] = {.entry = {.count = 1, .reusable = true}}, SHIFT(728),
  [206] = {.entry = {.count = 1, .reusable = true}}, SHIFT(50),
  [208] = {.entry = {.count = 1, .reusable = true}}, SHIFT(42),
  [210] = {.entry = {.count = 1, .reusable = true}}, SHIFT(588),
  [212] = {.entry = {.count = 1, .reusable = true}}, SHIFT(54),
  [214] = {.entry = {.count = 1, .reusable = true}}, SHIFT(60),
  [216] = {.entry = {.count = 1, .reusable = true}}, SHIFT(56),
  [218] = {.entry = {.count = 1, .reusable = true}}, SHIFT(642),
  [220] = {.entry = {.count = 1, .reusable = true}}, SHIFT(62),
  [222] = {.entry = {.count = 1, .reusable = true}}, SHIFT(57),
  [224] = {.entry = {.count = 1, .reusable = true}}, SHIFT(53),
  [226] = {.entry = {.count = 1, .reusable = true}}, SHIFT(523),
  [228] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value, 1),
  [230] = {.entry = {.count = 1, .reusable = true}}, SHIFT(190),
  [232] = {.entry = {.count = 1, .reusable = true}}, SHIFT(570),
  [234] = {.entry = {.count = 1, .reusable = true}}, SHIFT(65),
  [236] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 2), SHIFT_REPEAT(55),
  [239] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 2),
  [241] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 2), SHIFT_REPEAT(673),
  [244] = {.entry = {.count = 1, .reusable = true}}, SHIFT(652),
  [246] = {.entry = {.count = 1, .reusable = true}}, SHIFT(780),
  [248] = {.entry = {.count = 1, .reusable = true}}, SHIFT(109),
  [250] = {.entry = {.count = 1, .reusable = true}}, SHIFT(754),
  [252] = {.entry = {.count = 1, .reusable = true}}, SHIFT(55),
  [254] = {.entry = {.count = 1, .reusable = true}}, SHIFT(748),
  [256] = {.entry = {.count = 1, .reusable = true}}, SHIFT(257),
  [258] = {.entry = {.count = 1, .reusable = true}}, SHIFT(282),
  [260] = {.entry = {.count = 1, .reusable = true}}, SHIFT(356),
  [262] = {.entry = {.count = 1, .reusable = true}}, SHIFT(502),
  [264] = {.entry = {.count = 1, .reusable = true}}, SHIFT(273),
  [266] = {.entry = {.count = 1, .reusable = true}}, SHIFT(498),
  [268] = {.entry = {.count = 1, .reusable = true}}, SHIFT(365),
  [270] = {.entry = {.count = 1, .reusable = true}}, SHIFT(744),
  [272] = {.entry = {.count = 1, .reusable = true}}, SHIFT(286),
  [274] = {.entry = {.count = 1, .reusable = true}}, SHIFT(241),
  [276] = {.entry = {.count = 1, .reusable = true}}, SHIFT(260),
  [278] = {.entry = {.count = 1, .reusable = true}}, SHIFT(381),
  [280] = {.entry = {.count = 1, .reusable = true}}, SHIFT(485),
  [282] = {.entry = {.count = 1, .reusable = true}}, SHIFT(385),
  [284] = {.entry = {.count = 1, .reusable = true}}, SHIFT(483),
  [286] = {.entry = {.count = 1, .reusable = true}}, SHIFT(740),
  [288] = {.entry = {.count = 1, .reusable = true}}, SHIFT(9),
  [290] = {.entry = {.count = 1, .reusable = true}}, SHIFT(388),
  [292] = {.entry = {.count = 1, .reusable = true}}, SHIFT(386),
  [294] = {.entry = {.count = 1, .reusable = true}}, SHIFT(240),
  [296] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 2), SHIFT_REPEAT(9),
  [299] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 2),
  [301] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 2), SHIFT_REPEAT(480),
  [304] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [306] = {.entry = {.count = 1, .reusable = true}}, SHIFT(269),
  [308] = {.entry = {.count = 1, .reusable = true}}, SHIFT(735),
  [310] = {.entry = {.count = 1, .reusable = true}}, SHIFT(249),
  [312] = {.entry = {.count = 1, .reusable = true}}, SHIFT(508),
  [314] = {.entry = {.count = 1, .reusable = true}}, SHIFT(353),
  [316] = {.entry = {.count = 1, .reusable = true}}, SHIFT(255),
  [318] = {.entry = {.count = 1, .reusable = true}}, SHIFT(450),
  [320] = {.entry = {.count = 1, .reusable = true}}, SHIFT(402),
  [322] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_beginCaptures_repeat1, 2), SHIFT_REPEAT(286),
  [325] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_beginCaptures_repeat1, 2),
  [327] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_beginCaptures_repeat1, 2), SHIFT_REPEAT(736),
  [330] = {.entry = {.count = 1, .reusable = true}}, SHIFT(309),
  [332] = {.entry = {.count = 1, .reusable = true}}, SHIFT(550),
  [334] = {.entry = {.count = 1, .reusable = true}}, SHIFT(304),
  [336] = {.entry = {.count = 1, .reusable = true}}, SHIFT(437),
  [338] = {.entry = {.count = 1, .reusable = true}}, SHIFT(423),
  [340] = {.entry = {.count = 1, .reusable = true}}, SHIFT(59),
  [342] = {.entry = {.count = 1, .reusable = true}}, SHIFT(266),
  [344] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 2), SHIFT_REPEAT(282),
  [347] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 2), SHIFT_REPEAT(438),
  [350] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 2),
  [352] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 2), SHIFT_REPEAT(59),
  [355] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 2),
  [357] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 2), SHIFT_REPEAT(729),
  [360] = {.entry = {.count = 1, .reusable = true}}, SHIFT(430),
  [362] = {.entry = {.count = 1, .reusable = true}}, SHIFT(253),
  [364] = {.entry = {.count = 1, .reusable = true}}, SHIFT(419),
  [366] = {.entry = {.count = 1, .reusable = true}}, SHIFT(285),
  [368] = {.entry = {.count = 1, .reusable = true}}, SHIFT(279),
  [370] = {.entry = {.count = 1, .reusable = true}}, SHIFT(278),
  [372] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 2), SHIFT_REPEAT(273),
  [375] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 2),
  [377] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 2), SHIFT_REPEAT(431),
  [380] = {.entry = {.count = 1, .reusable = true}}, SHIFT(649),
  [382] = {.entry = {.count = 1, .reusable = true}}, SHIFT(170),
  [384] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [386] = {.entry = {.count = 1, .reusable = true}}, SHIFT(268),
  [388] = {.entry = {.count = 1, .reusable = true}}, SHIFT(564),
  [390] = {.entry = {.count = 1, .reusable = true}}, SHIFT(292),
  [392] = {.entry = {.count = 1, .reusable = true}}, SHIFT(646),
  [394] = {.entry = {.count = 1, .reusable = true}}, SHIFT(182),
  [396] = {.entry = {.count = 1, .reusable = true}}, SHIFT(265),
  [398] = {.entry = {.count = 1, .reusable = true}}, SHIFT(715),
  [400] = {.entry = {.count = 1, .reusable = true}}, SHIFT(420),
  [402] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [404] = {.entry = {.count = 1, .reusable = true}}, SHIFT(188),
  [406] = {.entry = {.count = 1, .reusable = true}}, SHIFT(643),
  [408] = {.entry = {.count = 1, .reusable = true}}, SHIFT(291),
  [410] = {.entry = {.count = 1, .reusable = true}}, SHIFT(566),
  [412] = {.entry = {.count = 1, .reusable = true}}, SHIFT(709),
  [414] = {.entry = {.count = 1, .reusable = true}}, SHIFT(76),
  [416] = {.entry = {.count = 1, .reusable = true}}, SHIFT(434),
  [418] = {.entry = {.count = 1, .reusable = true}}, SHIFT(414),
  [420] = {.entry = {.count = 1, .reusable = true}}, SHIFT(429),
  [422] = {.entry = {.count = 1, .reusable = true}}, SHIFT(533),
  [424] = {.entry = {.count = 1, .reusable = true}}, SHIFT(417),
  [426] = {.entry = {.count = 1, .reusable = true}}, SHIFT(413),
  [428] = {.entry = {.count = 1, .reusable = true}}, SHIFT(436),
  [430] = {.entry = {.count = 1, .reusable = true}}, SHIFT(416),
  [432] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2), SHIFT_REPEAT(260),
  [435] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2), SHIFT_REPEAT(433),
  [438] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2),
  [440] = {.entry = {.count = 1, .reusable = true}}, SHIFT(408),
  [442] = {.entry = {.count = 1, .reusable = true}}, SHIFT(409),
  [444] = {.entry = {.count = 1, .reusable = true}}, SHIFT(626),
  [446] = {.entry = {.count = 1, .reusable = true}}, SHIFT(200),
  [448] = {.entry = {.count = 1, .reusable = true}}, SHIFT(704),
  [450] = {.entry = {.count = 1, .reusable = true}}, SHIFT(81),
  [452] = {.entry = {.count = 1, .reusable = true}}, SHIFT(535),
  [454] = {.entry = {.count = 1, .reusable = true}}, SHIFT(407),
  [456] = {.entry = {.count = 1, .reusable = true}}, SHIFT(573),
  [458] = {.entry = {.count = 1, .reusable = true}}, SHIFT(329),
  [460] = {.entry = {.count = 1, .reusable = true}}, SHIFT(445),
  [462] = {.entry = {.count = 1, .reusable = true}}, SHIFT(390),
  [464] = {.entry = {.count = 1, .reusable = true}}, SHIFT(209),
  [466] = {.entry = {.count = 1, .reusable = true}}, SHIFT(621),
  [468] = {.entry = {.count = 1, .reusable = true}}, SHIFT(406),
  [470] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 2), SHIFT_REPEAT(249),
  [473] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 2),
  [475] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 2), SHIFT_REPEAT(479),
  [478] = {.entry = {.count = 1, .reusable = true}}, SHIFT(596),
  [480] = {.entry = {.count = 1, .reusable = true}}, SHIFT(70),
  [482] = {.entry = {.count = 1, .reusable = true}}, SHIFT(698),
  [484] = {.entry = {.count = 1, .reusable = true}}, SHIFT(87),
  [486] = {.entry = {.count = 1, .reusable = true}}, SHIFT(602),
  [488] = {.entry = {.count = 1, .reusable = true}}, SHIFT(232),
  [490] = {.entry = {.count = 1, .reusable = true}}, SHIFT(607),
  [492] = {.entry = {.count = 1, .reusable = true}}, SHIFT(222),
  [494] = {.entry = {.count = 1, .reusable = true}}, SHIFT(597),
  [496] = {.entry = {.count = 1, .reusable = true}}, SHIFT(393),
  [498] = {.entry = {.count = 1, .reusable = true}}, SHIFT(379),
  [500] = {.entry = {.count = 1, .reusable = true}}, SHIFT(490),
  [502] = {.entry = {.count = 1, .reusable = true}}, SHIFT(391),
  [504] = {.entry = {.count = 1, .reusable = true}}, SHIFT(491),
  [506] = {.entry = {.count = 1, .reusable = true}}, SHIFT(377),
  [508] = {.entry = {.count = 1, .reusable = true}}, SHIFT(245),
  [510] = {.entry = {.count = 1, .reusable = true}}, SHIFT(252),
  [512] = {.entry = {.count = 1, .reusable = true}}, SHIFT(97),
  [514] = {.entry = {.count = 1, .reusable = true}}, SHIFT(499),
  [516] = {.entry = {.count = 1, .reusable = true}}, SHIFT(750),
  [518] = {.entry = {.count = 1, .reusable = true}}, SHIFT(289),
  [520] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 2), SHIFT_REPEAT(12),
  [523] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 2),
  [525] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 2), SHIFT_REPEAT(687),
  [528] = {.entry = {.count = 1, .reusable = true}}, SHIFT(369),
  [530] = {.entry = {.count = 1, .reusable = true}}, SHIFT(503),
  [532] = {.entry = {.count = 1, .reusable = true}}, SHIFT(104),
  [534] = {.entry = {.count = 1, .reusable = true}}, SHIFT(651),
  [536] = {.entry = {.count = 1, .reusable = true}}, SHIFT(368),
  [538] = {.entry = {.count = 1, .reusable = true}}, SHIFT(608),
  [540] = {.entry = {.count = 1, .reusable = true}}, SHIFT(328),
  [542] = {.entry = {.count = 1, .reusable = true}}, SHIFT(360),
  [544] = {.entry = {.count = 1, .reusable = true}}, SHIFT(364),
  [546] = {.entry = {.count = 1, .reusable = true}}, SHIFT(605),
  [548] = {.entry = {.count = 1, .reusable = true}}, SHIFT(398),
  [550] = {.entry = {.count = 1, .reusable = true}}, SHIFT(237),
  [552] = {.entry = {.count = 1, .reusable = false}}, SHIFT(264),
  [554] = {.entry = {.count = 1, .reusable = true}}, SHIFT(243),
  [556] = {.entry = {.count = 1, .reusable = true}}, SHIFT(121),
  [558] = {.entry = {.count = 1, .reusable = true}}, SHIFT(514),
  [560] = {.entry = {.count = 1, .reusable = true}}, SHIFT(348),
  [562] = {.entry = {.count = 1, .reusable = true}}, SHIFT(515),
  [564] = {.entry = {.count = 1, .reusable = true}}, SHIFT(598),
  [566] = {.entry = {.count = 1, .reusable = true}}, SHIFT(251),
  [568] = {.entry = {.count = 1, .reusable = true}}, SHIFT(196),
  [570] = {.entry = {.count = 1, .reusable = true}}, SHIFT(267),
  [572] = {.entry = {.count = 1, .reusable = true}}, SHIFT(719),
  [574] = {.entry = {.count = 1, .reusable = true}}, SHIFT(298),
  [576] = {.entry = {.count = 1, .reusable = true}}, SHIFT(262),
  [578] = {.entry = {.count = 1, .reusable = true}}, SHIFT(538),
  [580] = {.entry = {.count = 1, .reusable = true}}, SHIFT(593),
  [582] = {.entry = {.count = 1, .reusable = true}}, SHIFT(179),
  [584] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__includeScope, 2),
  [586] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__includeScope, 2), SHIFT_REPEAT(190),
  [589] = {.entry = {.count = 1, .reusable = true}}, SHIFT(345),
  [591] = {.entry = {.count = 1, .reusable = true}}, SHIFT(517),
  [593] = {.entry = {.count = 1, .reusable = true}}, SHIFT(758),
  [595] = {.entry = {.count = 1, .reusable = true}}, SHIFT(287),
  [597] = {.entry = {.count = 1, .reusable = true}}, SHIFT(338),
  [599] = {.entry = {.count = 1, .reusable = true}}, SHIFT(541),
  [601] = {.entry = {.count = 1, .reusable = true}}, SHIFT(136),
  [603] = {.entry = {.count = 1, .reusable = true}}, SHIFT(359),
  [605] = {.entry = {.count = 1, .reusable = true}}, SHIFT(319),
  [607] = {.entry = {.count = 1, .reusable = true}}, SHIFT(585),
  [609] = {.entry = {.count = 1, .reusable = true}}, SHIFT(275),
  [611] = {.entry = {.count = 1, .reusable = true}}, SHIFT(164),
  [613] = {.entry = {.count = 1, .reusable = true}}, SHIFT(680),
  [615] = {.entry = {.count = 1, .reusable = true}}, SHIFT(336),
  [617] = {.entry = {.count = 1, .reusable = true}}, SHIFT(683),
  [619] = {.entry = {.count = 1, .reusable = true}}, SHIFT(308),
  [621] = {.entry = {.count = 1, .reusable = true}}, SHIFT(288),
  [623] = {.entry = {.count = 1, .reusable = true}}, SHIFT(355),
  [625] = {.entry = {.count = 1, .reusable = true}}, SHIFT(284),
  [627] = {.entry = {.count = 1, .reusable = true}}, SHIFT(579),
  [629] = {.entry = {.count = 1, .reusable = true}}, SHIFT(159),
  [631] = {.entry = {.count = 1, .reusable = true}}, SHIFT(760),
  [633] = {.entry = {.count = 1, .reusable = true}}, SHIFT(362),
  [635] = {.entry = {.count = 1, .reusable = true}}, SHIFT(310),
  [637] = {.entry = {.count = 1, .reusable = true}}, SHIFT(558),
  [639] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 2), SHIFT_REPEAT(22),
  [642] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 2), SHIFT_REPEAT(552),
  [645] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 2),
  [647] = {.entry = {.count = 1, .reusable = true}}, SHIFT(147),
  [649] = {.entry = {.count = 1, .reusable = true}}, SHIFT(305),
  [651] = {.entry = {.count = 1, .reusable = true}}, SHIFT(555),
  [653] = {.entry = {.count = 1, .reusable = true}}, SHIFT(664),
  [655] = {.entry = {.count = 1, .reusable = true}}, SHIFT(123),
  [657] = {.entry = {.count = 1, .reusable = true}}, SHIFT(681),
  [659] = {.entry = {.count = 1, .reusable = true}}, SHIFT(325),
  [661] = {.entry = {.count = 1, .reusable = true}}, SHIFT(339),
  [663] = {.entry = {.count = 1, .reusable = true}}, SHIFT(658),
  [665] = {.entry = {.count = 1, .reusable = true}}, SHIFT(321),
  [667] = {.entry = {.count = 1, .reusable = true}}, SHIFT(556),
  [669] = {.entry = {.count = 1, .reusable = true}}, SHIFT(302),
  [671] = {.entry = {.count = 1, .reusable = true}}, SHIFT(135),
  [673] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 2), SHIFT_REPEAT(279),
  [676] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 2),
  [678] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 2), SHIFT_REPEAT(557),
  [681] = {.entry = {.count = 1, .reusable = true}}, SHIFT(300),
  [683] = {.entry = {.count = 1, .reusable = true}}, SHIFT(271),
  [685] = {.entry = {.count = 1, .reusable = true}}, SHIFT(297),
  [687] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [689] = {.entry = {.count = 1, .reusable = true}}, SHIFT(378),
  [691] = {.entry = {.count = 1, .reusable = true}}, SHIFT(61),
  [693] = {.entry = {.count = 1, .reusable = true}}, SHIFT(548),
  [695] = {.entry = {.count = 1, .reusable = true}}, SHIFT(599),
  [697] = {.entry = {.count = 1, .reusable = true}}, SHIFT(316),
  [699] = {.entry = {.count = 1, .reusable = true}}, SHIFT(317),
  [701] = {.entry = {.count = 1, .reusable = true}}, SHIFT(587),
  [703] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 2),
  [705] = {.entry = {.count = 1, .reusable = true}}, SHIFT(666),
  [707] = {.entry = {.count = 1, .reusable = true}}, SHIFT(342),
  [709] = {.entry = {.count = 1, .reusable = true}}, SHIFT(343),
  [711] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__includeItem, 2),
  [713] = {.entry = {.count = 1, .reusable = true}}, SHIFT(684),
  [715] = {.entry = {.count = 1, .reusable = true}}, SHIFT(600),
  [717] = {.entry = {.count = 1, .reusable = true}}, SHIFT(63),
  [719] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [721] = {.entry = {.count = 1, .reusable = true}}, SHIFT(507),
  [723] = {.entry = {.count = 1, .reusable = true}}, SHIFT(357),
  [725] = {.entry = {.count = 1, .reusable = true}}, SHIFT(358),
  [727] = {.entry = {.count = 1, .reusable = true}}, SHIFT(293),
  [729] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__string, 3, .production_id = 1),
  [731] = {.entry = {.count = 1, .reusable = true}}, SHIFT(235),
  [733] = {.entry = {.count = 1, .reusable = true}}, SHIFT(236),
  [735] = {.entry = {.count = 1, .reusable = true}}, SHIFT(366),
  [737] = {.entry = {.count = 1, .reusable = true}}, SHIFT(367),
  [739] = {.entry = {.count = 1, .reusable = true}}, SHIFT(373),
  [741] = {.entry = {.count = 1, .reusable = true}}, SHIFT(629),
  [743] = {.entry = {.count = 1, .reusable = true}}, SHIFT(628),
  [745] = {.entry = {.count = 1, .reusable = true}}, SHIFT(374),
  [747] = {.entry = {.count = 1, .reusable = true}}, SHIFT(238),
  [749] = {.entry = {.count = 1, .reusable = true}}, SHIFT(375),
  [751] = {.entry = {.count = 1, .reusable = true}}, SHIFT(492),
  [753] = {.entry = {.count = 1, .reusable = true}}, SHIFT(239),
  [755] = {.entry = {.count = 1, .reusable = true}}, SHIFT(242),
  [757] = {.entry = {.count = 1, .reusable = true}}, SHIFT(612),
  [759] = {.entry = {.count = 1, .reusable = true}}, SHIFT(382),
  [761] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 6),
  [763] = {.entry = {.count = 1, .reusable = true}}, SHIFT(244),
  [765] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repo_repeat1, 2),
  [767] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_repo_repeat1, 2), SHIFT_REPEAT(599),
  [770] = {.entry = {.count = 1, .reusable = true}}, SHIFT(387),
  [772] = {.entry = {.count = 1, .reusable = true}}, SHIFT(234),
  [774] = {.entry = {.count = 1, .reusable = true}}, SHIFT(247),
  [776] = {.entry = {.count = 1, .reusable = true}}, SHIFT(250),
  [778] = {.entry = {.count = 1, .reusable = true}}, SHIFT(527),
  [780] = {.entry = {.count = 1, .reusable = true}}, SHIFT(274),
  [782] = {.entry = {.count = 1, .reusable = true}}, SHIFT(270),
  [784] = {.entry = {.count = 1, .reusable = true}}, SHIFT(280),
  [786] = {.entry = {.count = 1, .reusable = true}}, SHIFT(281),
  [788] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 3),
  [790] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [792] = {.entry = {.count = 1, .reusable = true}}, SHIFT(254),
  [794] = {.entry = {.count = 1, .reusable = true}}, SHIFT(412),
  [796] = {.entry = {.count = 1, .reusable = true}}, SHIFT(283),
  [798] = {.entry = {.count = 1, .reusable = true}}, SHIFT(432),
  [800] = {.entry = {.count = 1, .reusable = true}}, SHIFT(258),
  [802] = {.entry = {.count = 1, .reusable = true}}, SHIFT(261),
  [804] = {.entry = {.count = 1, .reusable = true}}, SHIFT(569),
  [806] = {.entry = {.count = 1, .reusable = true}}, SHIFT(418),
  [808] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__string, 2),
  [810] = {.entry = {.count = 1, .reusable = true}}, SHIFT(756),
  [812] = {.entry = {.count = 1, .reusable = true}}, SHIFT(725),
  [814] = {.entry = {.count = 1, .reusable = true}}, SHIFT(422),
  [816] = {.entry = {.count = 1, .reusable = true}}, SHIFT(532),
  [818] = {.entry = {.count = 1, .reusable = true}}, SHIFT(299),
  [820] = {.entry = {.count = 1, .reusable = true}}, SHIFT(303),
  [822] = {.entry = {.count = 1, .reusable = true}}, SHIFT(307),
  [824] = {.entry = {.count = 1, .reusable = true}}, SHIFT(315),
  [826] = {.entry = {.count = 1, .reusable = true}}, SHIFT(442),
  [828] = {.entry = {.count = 1, .reusable = true}}, SHIFT(259),
  [830] = {.entry = {.count = 1, .reusable = true}}, SHIFT(443),
  [832] = {.entry = {.count = 1, .reusable = true}}, SHIFT(320),
  [834] = {.entry = {.count = 1, .reusable = true}}, SHIFT(405),
  [836] = {.entry = {.count = 1, .reusable = true}}, SHIFT(404),
  [838] = {.entry = {.count = 1, .reusable = true}}, SHIFT(549),
  [840] = {.entry = {.count = 1, .reusable = true}}, SHIFT(312),
  [842] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 5),
  [844] = {.entry = {.count = 1, .reusable = true}}, SHIFT(290),
  [846] = {.entry = {.count = 1, .reusable = true}}, SHIFT(323),
  [848] = {.entry = {.count = 1, .reusable = true}}, SHIFT(528),
  [850] = {.entry = {.count = 1, .reusable = true}}, SHIFT(246),
  [852] = {.entry = {.count = 1, .reusable = true}}, SHIFT(330),
  [854] = {.entry = {.count = 1, .reusable = true}}, SHIFT(327),
  [856] = {.entry = {.count = 1, .reusable = true}}, SHIFT(334),
  [858] = {.entry = {.count = 1, .reusable = true}}, SHIFT(341),
  [860] = {.entry = {.count = 1, .reusable = true}}, SHIFT(347),
  [862] = {.entry = {.count = 1, .reusable = true}}, SHIFT(326),
  [864] = {.entry = {.count = 1, .reusable = true}}, SHIFT(354),
  [866] = {.entry = {.count = 1, .reusable = true}}, SHIFT(526),
  [868] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 4),
  [870] = {.entry = {.count = 1, .reusable = true}}, SHIFT(346),
  [872] = {.entry = {.count = 1, .reusable = true}}, SHIFT(350),
  [874] = {.entry = {.count = 1, .reusable = true}}, SHIFT(482),
  [876] = {.entry = {.count = 1, .reusable = true}}, SHIFT(352),
  [878] = {.entry = {.count = 1, .reusable = true}}, SHIFT(525),
  [880] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_boolean, 1),
  [882] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_integer, 1),
  [884] = {.entry = {.count = 1, .reusable = true}}, SHIFT(464),
  [886] = {.entry = {.count = 1, .reusable = true}}, SHIFT(395),
  [888] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment_slash, 6),
  [890] = {.entry = {.count = 1, .reusable = true}}, SHIFT(496),
  [892] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 3),
  [894] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9, .production_id = 6),
  [896] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 9),
  [898] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9, .production_id = 2),
  [900] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9),
  [902] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 3),
  [904] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9, .production_id = 4),
  [906] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 9),
  [908] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 3, .production_id = 5),
  [910] = {.entry = {.count = 1, .reusable = true}}, SHIFT(40),
  [912] = {.entry = {.count = 1, .reusable = true}}, SHIFT(493),
  [914] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 6),
  [916] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 6),
  [918] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 5),
  [920] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 9),
  [922] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 5, .production_id = 7),
  [924] = {.entry = {.count = 1, .reusable = true}}, SHIFT(476),
  [926] = {.entry = {.count = 1, .reusable = true}}, SHIFT(475),
  [928] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 4),
  [930] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 10),
  [932] = {.entry = {.count = 1, .reusable = true}}, SHIFT(474),
  [934] = {.entry = {.count = 1, .reusable = true}}, SHIFT(473),
  [936] = {.entry = {.count = 1, .reusable = true}}, SHIFT(472),
  [938] = {.entry = {.count = 1, .reusable = true}}, SHIFT(471),
  [940] = {.entry = {.count = 1, .reusable = true}}, SHIFT(511),
  [942] = {.entry = {.count = 1, .reusable = true}}, SHIFT(67),
  [944] = {.entry = {.count = 1, .reusable = true}}, SHIFT(512),
  [946] = {.entry = {.count = 1, .reusable = true}}, SHIFT(470),
  [948] = {.entry = {.count = 1, .reusable = true}}, SHIFT(469),
  [950] = {.entry = {.count = 1, .reusable = true}}, SHIFT(344),
  [952] = {.entry = {.count = 1, .reusable = true}}, SHIFT(468),
  [954] = {.entry = {.count = 1, .reusable = true}}, SHIFT(64),
  [956] = {.entry = {.count = 1, .reusable = true}}, SHIFT(335),
  [958] = {.entry = {.count = 1, .reusable = true}}, SHIFT(466),
  [960] = {.entry = {.count = 1, .reusable = true}}, SHIFT(394),
  [962] = {.entry = {.count = 1, .reusable = true}}, SHIFT(333),
  [964] = {.entry = {.count = 1, .reusable = true}}, SHIFT(462),
  [966] = {.entry = {.count = 1, .reusable = true}}, SHIFT(396),
  [968] = {.entry = {.count = 1, .reusable = true}}, SHIFT(331),
  [970] = {.entry = {.count = 1, .reusable = true}}, SHIFT(460),
  [972] = {.entry = {.count = 1, .reusable = true}}, SHIFT(397),
  [974] = {.entry = {.count = 1, .reusable = true}}, SHIFT(233),
  [976] = {.entry = {.count = 1, .reusable = true}}, SHIFT(458),
  [978] = {.entry = {.count = 1, .reusable = true}}, SHIFT(399),
  [980] = {.entry = {.count = 1, .reusable = true}}, SHIFT(332),
  [982] = {.entry = {.count = 1, .reusable = true}}, SHIFT(456),
  [984] = {.entry = {.count = 1, .reusable = true}}, SHIFT(400),
  [986] = {.entry = {.count = 1, .reusable = true}}, SHIFT(58),
  [988] = {.entry = {.count = 1, .reusable = true}}, SHIFT(47),
  [990] = {.entry = {.count = 1, .reusable = true}}, SHIFT(536),
  [992] = {.entry = {.count = 1, .reusable = true}}, SHIFT(537),
  [994] = {.entry = {.count = 1, .reusable = true}}, SHIFT(143),
  [996] = {.entry = {.count = 1, .reusable = true}}, SHIFT(539),
  [998] = {.entry = {.count = 1, .reusable = true}}, SHIFT(540),
  [1000] = {.entry = {.count = 1, .reusable = true}}, SHIFT(145),
  [1002] = {.entry = {.count = 1, .reusable = true}}, SHIFT(542),
  [1004] = {.entry = {.count = 1, .reusable = true}}, SHIFT(543),
  [1006] = {.entry = {.count = 1, .reusable = true}}, SHIFT(146),
  [1008] = {.entry = {.count = 1, .reusable = true}}, SHIFT(545),
  [1010] = {.entry = {.count = 1, .reusable = true}}, SHIFT(546),
  [1012] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 3),
  [1014] = {.entry = {.count = 1, .reusable = true}}, SHIFT(454),
  [1016] = {.entry = {.count = 1, .reusable = true}}, SHIFT(453),
  [1018] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 4, .production_id = 8),
  [1020] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 10, .production_id = 4),
  [1022] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 10, .production_id = 6),
  [1024] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 3),
  [1026] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 10, .production_id = 9),
  [1028] = {.entry = {.count = 1, .reusable = true}}, SHIFT(403),
  [1030] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 4),
  [1032] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 5),
  [1034] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 4),
  [1036] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 5),
  [1038] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 5),
  [1040] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 6),
  [1042] = {.entry = {.count = 1, .reusable = true}}, SHIFT(49),
  [1044] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 4),
  [1046] = {.entry = {.count = 1, .reusable = true}}, SHIFT(52),
  [1048] = {.entry = {.count = 1, .reusable = true}}, SHIFT(563),
  [1050] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 4),
  [1052] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 10),
  [1054] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 8),
  [1056] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 4),
  [1058] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 10),
  [1060] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 8),
  [1062] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 6),
  [1064] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 6, .production_id = 7),
  [1066] = {.entry = {.count = 1, .reusable = true}}, SHIFT(427),
  [1068] = {.entry = {.count = 1, .reusable = true}}, SHIFT(610),
  [1070] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 11),
  [1072] = {.entry = {.count = 1, .reusable = true}}, SHIFT(441),
  [1074] = {.entry = {.count = 1, .reusable = true}}, SHIFT(46),
  [1076] = {.entry = {.count = 1, .reusable = true}}, SHIFT(440),
  [1078] = {.entry = {.count = 1, .reusable = true}}, SHIFT(66),
  [1080] = {.entry = {.count = 1, .reusable = true}}, SHIFT(575),
  [1082] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_nameScope, 5),
  [1084] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 8),
  [1086] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 8, .production_id = 4),
  [1088] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_contentName, 5),
  [1090] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 8, .production_id = 2),
  [1092] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2, .production_id = 3),
  [1094] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_match, 5),
  [1096] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_begin, 5),
  [1098] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_end, 5),
  [1100] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_while, 5),
  [1102] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_applyEndPatternLast, 5),
  [1104] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 8, .production_id = 10),
  [1106] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 12),
  [1108] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 12),
  [1110] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 12),
  [1112] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 12),
  [1114] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_json, 1),
  [1116] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 7, .production_id = 10),
  [1118] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 7, .production_id = 7),
  [1120] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 12, .production_id = 7),
  [1122] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 11),
  [1124] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 2),
  [1126] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 2), SHIFT_REPEAT(4),
  [1129] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 11),
  [1131] = {.entry = {.count = 1, .reusable = true}}, SHIFT(37),
  [1133] = {.entry = {.count = 1, .reusable = true}}, SHIFT(595),
  [1135] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 7, .production_id = 2),
  [1137] = {.entry = {.count = 1, .reusable = true}}, SHIFT(218),
  [1139] = {.entry = {.count = 1, .reusable = true}}, SHIFT(601),
  [1141] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 8),
  [1143] = {.entry = {.count = 1, .reusable = true}}, SHIFT(228),
  [1145] = {.entry = {.count = 1, .reusable = true}}, SHIFT(606),
  [1147] = {.entry = {.count = 1, .reusable = true}}, SHIFT(220),
  [1149] = {.entry = {.count = 1, .reusable = true}}, SHIFT(611),
  [1151] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 4),
  [1153] = {.entry = {.count = 1, .reusable = true}}, SHIFT(486),
  [1155] = {.entry = {.count = 1, .reusable = true}}, SHIFT(384),
  [1157] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 11, .production_id = 6),
  [1159] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 11, .production_id = 9),
  [1161] = {.entry = {.count = 1, .reusable = true}}, SHIFT(383),
  [1163] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 6),
  [1165] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 3),
  [1167] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 4),
  [1169] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 4),
  [1171] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 5),
  [1173] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 6, .production_id = 7),
  [1175] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 3),
  [1177] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 7),
  [1179] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment_slash, 7),
  [1181] = {.entry = {.count = 1, .reusable = true}}, SHIFT(43),
  [1183] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 11),
  [1185] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment, 7),
  [1187] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 11),
  [1189] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_uuid, 7),
  [1191] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 7, .production_id = 7),
  [1193] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 12),
  [1195] = {.entry = {.count = 1, .reusable = true}}, SHIFT(751),
  [1197] = {.entry = {.count = 1, .reusable = true}}, SHIFT(34),
  [1199] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStopMarker, 7),
  [1201] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 11),
  [1203] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStartMarker, 7),
  [1205] = {.entry = {.count = 1, .reusable = true}}, SHIFT(68),
  [1207] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_nameScope, 6),
  [1209] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_firstLineMatch, 7),
  [1211] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_contentName, 6),
  [1213] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 7),
  [1215] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_match, 6),
  [1217] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_schema, 7),
  [1219] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_begin, 6),
  [1221] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_version, 7),
  [1223] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_end, 6),
  [1225] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 7),
  [1227] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_while, 6),
  [1229] = {.entry = {.count = 1, .reusable = true}}, SHIFT(509),
  [1231] = {.entry = {.count = 1, .reusable = true}}, SHIFT(510),
  [1233] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_applyEndPatternLast, 6),
  [1235] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injectionSelector, 7),
  [1237] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 6),
  [1239] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_name, 7),
  [1241] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_scopeName, 7),
  [1243] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 7),
  [1245] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_version, 5),
  [1247] = {.entry = {.count = 1, .reusable = true}}, SHIFT(51),
  [1249] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 6),
  [1251] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 11),
  [1253] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 7),
  [1255] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repo_repeat1, 1),
  [1257] = {.entry = {.count = 1, .reusable = true}}, SHIFT(551),
  [1259] = {.entry = {.count = 1, .reusable = true}}, SHIFT(311),
  [1261] = {.entry = {.count = 1, .reusable = true}}, SHIFT(144),
  [1263] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 6),
  [1265] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 3),
  [1267] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 3),
  [1269] = {.entry = {.count = 1, .reusable = true}}, SHIFT(132),
  [1271] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 6),
  [1273] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 4),
  [1275] = {.entry = {.count = 1, .reusable = true}}, SHIFT(44),
  [1277] = {.entry = {.count = 1, .reusable = true}}, SHIFT(495),
  [1279] = {.entry = {.count = 1, .reusable = true}}, SHIFT(120),
  [1281] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 12, .production_id = 9),
  [1283] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment, 6),
  [1285] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_uuid, 6),
  [1287] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 7),
  [1289] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStopMarker, 6),
  [1291] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStartMarker, 6),
  [1293] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_firstLineMatch, 6),
  [1295] = {.entry = {.count = 1, .reusable = true}}, SHIFT(156),
  [1297] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 6),
  [1299] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 7, .production_id = 7),
  [1301] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_schema, 6),
  [1303] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_version, 6),
  [1305] = {.entry = {.count = 1, .reusable = true}}, SHIFT(162),
  [1307] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 6),
  [1309] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injectionSelector, 6),
  [1311] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 12),
  [1313] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 12),
  [1315] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_name, 6),
  [1317] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_include, 7),
  [1319] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_scopeName, 6),
  [1321] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 6, .production_id = 10),
  [1323] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 6, .production_id = 7),
  [1325] = {.entry = {.count = 1, .reusable = true}}, SHIFT(178),
  [1327] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_nameScope, 7),
  [1329] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_contentName, 7),
  [1331] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_match, 7),
  [1333] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_begin, 7),
  [1335] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_end, 7),
  [1337] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_while, 7),
  [1339] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_applyEndPatternLast, 7),
  [1341] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 6),
  [1343] = {.entry = {.count = 1, .reusable = true}}, SHIFT(195),
  [1345] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 7),
  [1347] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 6),
  [1349] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 6),
  [1351] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 2),
  [1353] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 2),
  [1355] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 3),
  [1357] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 11, .production_id = 7),
  [1359] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 7),
  [1361] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 4),
  [1363] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment_slash, 5),
  [1365] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment, 5),
  [1367] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_uuid, 5),
  [1369] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStopMarker, 5),
  [1371] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 7),
  [1373] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStartMarker, 5),
  [1375] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_firstLineMatch, 5),
  [1377] = {.entry = {.count = 1, .reusable = true}}, SHIFT(620),
  [1379] = {.entry = {.count = 1, .reusable = true}}, SHIFT(210),
  [1381] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_schema, 5),
  [1383] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 7),
  [1385] = {.entry = {.count = 1, .reusable = true}}, SHIFT(201),
  [1387] = {.entry = {.count = 1, .reusable = true}}, SHIFT(625),
  [1389] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 11),
  [1391] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injectionSelector, 5),
  [1393] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_name, 5),
  [1395] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 3),
  [1397] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_scopeName, 5),
  [1399] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 8),
  [1401] = {.entry = {.count = 1, .reusable = true}}, SHIFT(635),
  [1403] = {.entry = {.count = 1, .reusable = true}}, SHIFT(189),
  [1405] = {.entry = {.count = 1, .reusable = true}}, SHIFT(183),
  [1407] = {.entry = {.count = 1, .reusable = true}}, SHIFT(644),
  [1409] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 8, .production_id = 7),
  [1411] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 5),
  [1413] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 10),
  [1415] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 10),
  [1417] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_include, 8),
  [1419] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 10),
  [1421] = {.entry = {.count = 1, .reusable = true}}, SHIFT(724),
  [1423] = {.entry = {.count = 1, .reusable = true}}, SHIFT(276),
  [1425] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 2),
  [1427] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_beginCaptures_repeat1, 4),
  [1429] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 8),
  [1431] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 3),
  [1433] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [1435] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [1437] = {.entry = {.count = 1, .reusable = true}}, SHIFT(295),
  [1439] = {.entry = {.count = 1, .reusable = true}}, SHIFT(301),
  [1441] = {.entry = {.count = 1, .reusable = true}}, SHIFT(306),
  [1443] = {.entry = {.count = 1, .reusable = true}}, SHIFT(313),
  [1445] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 8),
  [1447] = {.entry = {.count = 1, .reusable = true}}, SHIFT(318),
  [1449] = {.entry = {.count = 1, .reusable = true}}, SHIFT(661),
  [1451] = {.entry = {.count = 1, .reusable = true}}, SHIFT(662),
  [1453] = {.entry = {.count = 1, .reusable = true}}, SHIFT(138),
  [1455] = {.entry = {.count = 1, .reusable = true}}, SHIFT(322),
  [1457] = {.entry = {.count = 1, .reusable = true}}, SHIFT(324),
  [1459] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 8),
  [1461] = {.entry = {.count = 1, .reusable = true}}, SHIFT(665),
  [1463] = {.entry = {.count = 1, .reusable = true}}, SHIFT(129),
  [1465] = {.entry = {.count = 1, .reusable = true}}, SHIFT(667),
  [1467] = {.entry = {.count = 1, .reusable = true}}, SHIFT(340),
  [1469] = {.entry = {.count = 1, .reusable = true}}, SHIFT(349),
  [1471] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 8),
  [1473] = {.entry = {.count = 1, .reusable = true}}, SHIFT(351),
  [1475] = {.entry = {.count = 1, .reusable = true}}, SHIFT(674),
  [1477] = {.entry = {.count = 1, .reusable = true}}, SHIFT(675),
  [1479] = {.entry = {.count = 1, .reusable = true}}, SHIFT(118),
  [1481] = {.entry = {.count = 1, .reusable = true}}, SHIFT(676),
  [1483] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 4),
  [1485] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 9),
  [1487] = {.entry = {.count = 1, .reusable = true}}, SHIFT(115),
  [1489] = {.entry = {.count = 1, .reusable = true}}, SHIFT(678),
  [1491] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 4),
  [1493] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 9, .production_id = 7),
  [1495] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 10),
  [1497] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 4),
  [1499] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_include, 9),
  [1501] = {.entry = {.count = 1, .reusable = true}}, SHIFT(691),
  [1503] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [1505] = {.entry = {.count = 1, .reusable = true}}, SHIFT(294),
  [1507] = {.entry = {.count = 1, .reusable = true}}, SHIFT(752),
  [1509] = {.entry = {.count = 1, .reusable = true}}, SHIFT(296),
  [1511] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 3),
  [1513] = {.entry = {.count = 1, .reusable = true}}, SHIFT(692),
  [1515] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [1517] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 9),
  [1519] = {.entry = {.count = 1, .reusable = true}}, SHIFT(693),
  [1521] = {.entry = {.count = 1, .reusable = true}}, SHIFT(370),
  [1523] = {.entry = {.count = 1, .reusable = true}}, SHIFT(694),
  [1525] = {.entry = {.count = 1, .reusable = true}}, SHIFT(371),
  [1527] = {.entry = {.count = 1, .reusable = true}}, SHIFT(696),
  [1529] = {.entry = {.count = 1, .reusable = true}}, SHIFT(372),
  [1531] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_beginCaptures_repeat1, 3),
  [1533] = {.entry = {.count = 1, .reusable = true}}, SHIFT(697),
  [1535] = {.entry = {.count = 1, .reusable = true}}, SHIFT(376),
  [1537] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 9),
  [1539] = {.entry = {.count = 1, .reusable = true}}, SHIFT(699),
  [1541] = {.entry = {.count = 1, .reusable = true}}, SHIFT(380),
  [1543] = {.entry = {.count = 1, .reusable = true}}, SHIFT(700),
  [1545] = {.entry = {.count = 1, .reusable = true}}, SHIFT(701),
  [1547] = {.entry = {.count = 1, .reusable = true}}, SHIFT(702),
  [1549] = {.entry = {.count = 1, .reusable = true}}, SHIFT(392),
  [1551] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 9),
  [1553] = {.entry = {.count = 1, .reusable = true}}, SHIFT(703),
  [1555] = {.entry = {.count = 1, .reusable = true}}, SHIFT(401),
  [1557] = {.entry = {.count = 1, .reusable = true}}, SHIFT(705),
  [1559] = {.entry = {.count = 1, .reusable = true}}, SHIFT(706),
  [1561] = {.entry = {.count = 1, .reusable = true}}, SHIFT(707),
  [1563] = {.entry = {.count = 1, .reusable = true}}, SHIFT(410),
  [1565] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 9),
  [1567] = {.entry = {.count = 1, .reusable = true}}, SHIFT(708),
  [1569] = {.entry = {.count = 1, .reusable = true}}, SHIFT(411),
  [1571] = {.entry = {.count = 1, .reusable = true}}, SHIFT(710),
  [1573] = {.entry = {.count = 1, .reusable = true}}, SHIFT(415),
  [1575] = {.entry = {.count = 1, .reusable = true}}, SHIFT(711),
  [1577] = {.entry = {.count = 1, .reusable = true}}, SHIFT(712),
  [1579] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 10),
  [1581] = {.entry = {.count = 1, .reusable = true}}, SHIFT(713),
  [1583] = {.entry = {.count = 1, .reusable = true}}, SHIFT(716),
  [1585] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 10, .production_id = 7),
  [1587] = {.entry = {.count = 1, .reusable = true}}, SHIFT(389),
  [1589] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 5, .production_id = 7),
  [1591] = {.entry = {.count = 1, .reusable = true}}, SHIFT(774),
  [1593] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 6),
  [1595] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 3),
  [1597] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 4),
  [1599] = {.entry = {.count = 1, .reusable = true}}, SHIFT(361),
  [1601] = {.entry = {.count = 1, .reusable = true}}, SHIFT(769),
  [1603] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 5),
  [1605] = {.entry = {.count = 1, .reusable = true}}, SHIFT(743),
  [1607] = {.entry = {.count = 1, .reusable = true}}, SHIFT(746),
  [1609] = {.entry = {.count = 1, .reusable = true}}, SHIFT(732),
  [1611] = {.entry = {.count = 1, .reusable = true}}, SHIFT(722),
  [1613] = {.entry = {.count = 1, .reusable = true}}, SHIFT(734),
  [1615] = {.entry = {.count = 1, .reusable = true}}, SHIFT(737),
  [1617] = {.entry = {.count = 1, .reusable = true}}, SHIFT(738),
  [1619] = {.entry = {.count = 1, .reusable = true}}, SHIFT(739),
  [1621] = {.entry = {.count = 1, .reusable = true}}, SHIFT(277),
  [1623] = {.entry = {.count = 1, .reusable = true}}, SHIFT(741),
  [1625] = {.entry = {.count = 1, .reusable = true}}, SHIFT(742),
  [1627] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [1629] = {.entry = {.count = 1, .reusable = true}}, SHIFT(727),
  [1631] = {.entry = {.count = 1, .reusable = true}}, SHIFT(723),
  [1633] = {.entry = {.count = 1, .reusable = true}}, SHIFT(682),
  [1635] = {.entry = {.count = 1, .reusable = true}}, SHIFT(745),
  [1637] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value, 2),
  [1639] = {.entry = {.count = 1, .reusable = true}}, SHIFT(731),
  [1641] = {.entry = {.count = 1, .reusable = true}}, SHIFT(747),
  [1643] = {.entry = {.count = 1, .reusable = true}}, SHIFT(264),
  [1645] = {.entry = {.count = 1, .reusable = true}}, SHIFT(749),
  [1647] = {.entry = {.count = 1, .reusable = true}}, SHIFT(631),
  [1649] = {.entry = {.count = 1, .reusable = true}}, SHIFT(467),
  [1651] = {.entry = {.count = 1, .reusable = true}}, SHIFT(465),
  [1653] = {.entry = {.count = 1, .reusable = true}}, SHIFT(463),
  [1655] = {.entry = {.count = 1, .reusable = true}}, SHIFT(730),
  [1657] = {.entry = {.count = 1, .reusable = true}}, SHIFT(461),
  [1659] = {.entry = {.count = 1, .reusable = true}}, SHIFT(425),
  [1661] = {.entry = {.count = 1, .reusable = true}}, SHIFT(459),
  [1663] = {.entry = {.count = 1, .reusable = true}}, SHIFT(457),
  [1665] = {.entry = {.count = 1, .reusable = true}}, SHIFT(455),
  [1667] = {.entry = {.count = 1, .reusable = true}}, SHIFT(452),
  [1669] = {.entry = {.count = 1, .reusable = true}}, SHIFT(451),
  [1671] = {.entry = {.count = 1, .reusable = true}}, SHIFT(448),
  [1673] = {.entry = {.count = 1, .reusable = true}}, SHIFT(478),
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
