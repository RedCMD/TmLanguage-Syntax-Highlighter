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
#define STATE_COUNT 807
#define LARGE_STATE_COUNT 2
#define SYMBOL_COUNT 104
#define ALIAS_COUNT 2
#define TOKEN_COUNT 46
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
  anon_sym_information_for_contributors = 33,
  anon_sym_DOLLARschema = 34,
  anon_sym_fileTypes = 35,
  anon_sym_firstLineMatch = 36,
  anon_sym_foldingStartMarker = 37,
  anon_sym_foldingStopMarker = 38,
  anon_sym_uuid = 39,
  anon_sym_comment = 40,
  anon_sym_SLASH_SLASH = 41,
  anon_sym_true = 42,
  anon_sym_false = 43,
  sym_null = 44,
  sym__string_content = 45,
  sym_json = 46,
  sym_repository = 47,
  sym_repo = 48,
  sym_patterns = 49,
  sym__pattern = 50,
  sym_include = 51,
  sym_value = 52,
  aux_sym__includeScope = 53,
  sym__includeItem = 54,
  sym_scopeName = 55,
  sym_name = 56,
  sym_nameScope = 57,
  sym_contentName = 58,
  sym_injectionSelector = 59,
  sym_injections = 60,
  sym_injection = 61,
  sym_match = 62,
  sym_begin = 63,
  sym_end = 64,
  sym_while = 65,
  sym_applyEndPatternLast = 66,
  sym_captures = 67,
  sym_beginCaptures = 68,
  sym_endCaptures = 69,
  sym_whileCaptures = 70,
  sym_capture = 71,
  sym_version = 72,
  sym_information_for_contributors = 73,
  sym_schema = 74,
  sym_fileTypes = 75,
  sym_firstLineMatch = 76,
  sym_foldingStartMarker = 77,
  sym_foldingStopMarker = 78,
  sym_uuid = 79,
  sym__comments = 80,
  sym_comment = 81,
  sym_comment_slash = 82,
  sym_item = 83,
  sym_object = 84,
  sym_array = 85,
  sym__value = 86,
  sym_boolean = 87,
  sym_integer = 88,
  sym__string = 89,
  aux_sym_json_repeat1 = 90,
  aux_sym_json_repeat2 = 91,
  aux_sym_json_repeat3 = 92,
  aux_sym_repository_repeat1 = 93,
  aux_sym_repo_repeat1 = 94,
  aux_sym_patterns_repeat1 = 95,
  aux_sym__pattern_repeat1 = 96,
  aux_sym_injections_repeat1 = 97,
  aux_sym_injection_repeat1 = 98,
  aux_sym_captures_repeat1 = 99,
  aux_sym_beginCaptures_repeat1 = 100,
  aux_sym_fileTypes_repeat1 = 101,
  aux_sym_object_repeat1 = 102,
  aux_sym_array_repeat1 = 103,
  alias_sym_pattern = 104,
  anon_alias_sym_TILDE = 105,
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
  [anon_sym_information_for_contributors] = "key",
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
  [sym_information_for_contributors] = "information_for_contributors",
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
  [anon_sym_information_for_contributors] = anon_sym_repository,
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
  [sym_information_for_contributors] = sym_information_for_contributors,
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
  [anon_sym_information_for_contributors] = {
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
  [sym_information_for_contributors] = {
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
  [797] = 797,
  [798] = 798,
  [799] = 799,
  [800] = 800,
  [801] = 801,
  [802] = 802,
  [803] = 803,
  [804] = 804,
  [805] = 805,
  [806] = 806,
};

static bool ts_lex(TSLexer *lexer, TSStateId state) {
  START_LEXER();
  eof = lexer->eof(lexer);
  switch (state) {
    case 0:
      if (eof) ADVANCE(223);
      if (lookahead == '"') ADVANCE(228);
      if (lookahead == '#') ADVANCE(242);
      if (lookahead == '$') ADVANCE(180);
      if (lookahead == ',') ADVANCE(225);
      if (lookahead == '/') ADVANCE(9);
      if (lookahead == ':') ADVANCE(231);
      if (lookahead == '[') ADVANCE(236);
      if (lookahead == '\\') ADVANCE(1);
      if (lookahead == ']') ADVANCE(237);
      if (lookahead == 'a') ADVANCE(144);
      if (lookahead == 'b') ADVANCE(56);
      if (lookahead == 'c') ADVANCE(29);
      if (lookahead == 'e') ADVANCE(119);
      if (lookahead == 'f') ADVANCE(24);
      if (lookahead == 'i') ADVANCE(120);
      if (lookahead == 'm') ADVANCE(25);
      if (lookahead == 'n') ADVANCE(26);
      if (lookahead == 'p') ADVANCE(28);
      if (lookahead == 'r') ADVANCE(70);
      if (lookahead == 's') ADVANCE(43);
      if (lookahead == 't') ADVANCE(158);
      if (lookahead == 'u') ADVANCE(209);
      if (lookahead == 'v') ADVANCE(67);
      if (lookahead == 'w') ADVANCE(89);
      if (lookahead == '{') ADVANCE(224);
      if (lookahead == '}') ADVANCE(226);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(227);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(272);
      END_STATE();
    case 1:
      if (lookahead == '\n') ADVANCE(240);
      if (lookahead == '#') ADVANCE(232);
      if (lookahead != 0) ADVANCE(232);
      END_STATE();
    case 2:
      if (lookahead == '"') ADVANCE(228);
      if (lookahead == '#') ADVANCE(242);
      if (lookahead == '\\') ADVANCE(222);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(241);
      END_STATE();
    case 3:
      if (lookahead == '"') ADVANCE(228);
      if (lookahead == '$') ADVANCE(466);
      if (lookahead == '/') ADVANCE(296);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(419);
      if (lookahead == 'f') ADVANCE(376);
      if (lookahead == 'i') ADVANCE(407);
      if (lookahead == 'n') ADVANCE(312);
      if (lookahead == 'p') ADVANCE(314);
      if (lookahead == 'r') ADVANCE(353);
      if (lookahead == 's') ADVANCE(333);
      if (lookahead == 'u') ADVANCE(495);
      if (lookahead == 'v') ADVANCE(356);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(503);
      END_STATE();
    case 4:
      if (lookahead == '"') ADVANCE(228);
      if (lookahead == '/') ADVANCE(296);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(432);
      if (lookahead == 'b') ADVANCE(342);
      if (lookahead == 'c') ADVANCE(315);
      if (lookahead == 'e') ADVANCE(403);
      if (lookahead == 'i') ADVANCE(404);
      if (lookahead == 'm') ADVANCE(311);
      if (lookahead == 'n') ADVANCE(312);
      if (lookahead == 'p') ADVANCE(314);
      if (lookahead == 'r') ADVANCE(353);
      if (lookahead == 'w') ADVANCE(372);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(503);
      END_STATE();
    case 5:
      if (lookahead == '"') ADVANCE(228);
      if (lookahead == '/') ADVANCE(296);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(419);
      if (lookahead == 'p') ADVANCE(314);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(503);
      END_STATE();
    case 6:
      if (lookahead == '"') ADVANCE(228);
      if (lookahead == '/') ADVANCE(296);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(419);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(271);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(503);
      END_STATE();
    case 7:
      if (lookahead == '"') ADVANCE(228);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(503);
      END_STATE();
    case 8:
      if (lookahead == '"') ADVANCE(228);
      if (lookahead == '\\') ADVANCE(221);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(233);
      END_STATE();
    case 9:
      if (lookahead == '/') ADVANCE(291);
      END_STATE();
    case 10:
      if (lookahead == 'E') ADVANCE(127);
      END_STATE();
    case 11:
      if (lookahead == 'L') ADVANCE(32);
      END_STATE();
    case 12:
      if (lookahead == 'L') ADVANCE(97);
      END_STATE();
    case 13:
      if (lookahead == 'M') ADVANCE(31);
      END_STATE();
    case 14:
      if (lookahead == 'M') ADVANCE(33);
      END_STATE();
    case 15:
      if (lookahead == 'M') ADVANCE(36);
      END_STATE();
    case 16:
      if (lookahead == 'N') ADVANCE(34);
      END_STATE();
    case 17:
      if (lookahead == 'N') ADVANCE(35);
      END_STATE();
    case 18:
      if (lookahead == 'P') ADVANCE(37);
      END_STATE();
    case 19:
      if (lookahead == 'S') ADVANCE(189);
      END_STATE();
    case 20:
      if (lookahead == 'S') ADVANCE(76);
      if (lookahead == 's') ADVANCE(251);
      END_STATE();
    case 21:
      if (lookahead == 'T') ADVANCE(219);
      END_STATE();
    case 22:
      if (lookahead == '_') ADVANCE(84);
      END_STATE();
    case 23:
      if (lookahead == '_') ADVANCE(48);
      END_STATE();
    case 24:
      if (lookahead == 'a') ADVANCE(105);
      if (lookahead == 'i') ADVANCE(107);
      if (lookahead == 'o') ADVANCE(106);
      END_STATE();
    case 25:
      if (lookahead == 'a') ADVANCE(194);
      END_STATE();
    case 26:
      if (lookahead == 'a') ADVANCE(113);
      if (lookahead == 'u') ADVANCE(109);
      END_STATE();
    case 27:
      if (lookahead == 'a') ADVANCE(277);
      END_STATE();
    case 28:
      if (lookahead == 'a') ADVANCE(196);
      END_STATE();
    case 29:
      if (lookahead == 'a') ADVANCE(146);
      if (lookahead == 'o') ADVANCE(117);
      END_STATE();
    case 30:
      if (lookahead == 'a') ADVANCE(167);
      if (lookahead == 'o') ADVANCE(145);
      END_STATE();
    case 31:
      if (lookahead == 'a') ADVANCE(154);
      END_STATE();
    case 32:
      if (lookahead == 'a') ADVANCE(185);
      END_STATE();
    case 33:
      if (lookahead == 'a') ADVANCE(172);
      END_STATE();
    case 34:
      if (lookahead == 'a') ADVANCE(115);
      END_STATE();
    case 35:
      if (lookahead == 'a') ADVANCE(116);
      END_STATE();
    case 36:
      if (lookahead == 'a') ADVANCE(200);
      END_STATE();
    case 37:
      if (lookahead == 'a') ADVANCE(201);
      END_STATE();
    case 38:
      if (lookahead == 'a') ADVANCE(202);
      END_STATE();
    case 39:
      if (lookahead == 'a') ADVANCE(151);
      END_STATE();
    case 40:
      if (lookahead == 'a') ADVANCE(152);
      END_STATE();
    case 41:
      if (lookahead == 'a') ADVANCE(153);
      END_STATE();
    case 42:
      if (lookahead == 'b') ADVANCE(213);
      END_STATE();
    case 43:
      if (lookahead == 'c') ADVANCE(134);
      END_STATE();
    case 44:
      if (lookahead == 'c') ADVANCE(90);
      END_STATE();
    case 45:
      if (lookahead == 'c') ADVANCE(87);
      END_STATE();
    case 46:
      if (lookahead == 'c') ADVANCE(88);
      END_STATE();
    case 47:
      if (lookahead == 'c') ADVANCE(108);
      if (lookahead == 'f') ADVANCE(133);
      if (lookahead == 'j') ADVANCE(69);
      END_STATE();
    case 48:
      if (lookahead == 'c') ADVANCE(143);
      END_STATE();
    case 49:
      if (lookahead == 'c') ADVANCE(197);
      END_STATE();
    case 50:
      if (lookahead == 'c') ADVANCE(203);
      END_STATE();
    case 51:
      if (lookahead == 'd') ADVANCE(257);
      END_STATE();
    case 52:
      if (lookahead == 'd') ADVANCE(287);
      END_STATE();
    case 53:
      if (lookahead == 'd') ADVANCE(18);
      END_STATE();
    case 54:
      if (lookahead == 'd') ADVANCE(95);
      END_STATE();
    case 55:
      if (lookahead == 'd') ADVANCE(63);
      END_STATE();
    case 56:
      if (lookahead == 'e') ADVANCE(86);
      END_STATE();
    case 57:
      if (lookahead == 'e') ADVANCE(21);
      END_STATE();
    case 58:
      if (lookahead == 'e') ADVANCE(245);
      END_STATE();
    case 59:
      if (lookahead == 'e') ADVANCE(293);
      END_STATE();
    case 60:
      if (lookahead == 'e') ADVANCE(294);
      END_STATE();
    case 61:
      if (lookahead == 'e') ADVANCE(16);
      END_STATE();
    case 62:
      if (lookahead == 'e') ADVANCE(259);
      END_STATE();
    case 63:
      if (lookahead == 'e') ADVANCE(238);
      END_STATE();
    case 64:
      if (lookahead == 'e') ADVANCE(15);
      END_STATE();
    case 65:
      if (lookahead == 'e') ADVANCE(243);
      END_STATE();
    case 66:
      if (lookahead == 'e') ADVANCE(247);
      END_STATE();
    case 67:
      if (lookahead == 'e') ADVANCE(162);
      END_STATE();
    case 68:
      if (lookahead == 'e') ADVANCE(112);
      END_STATE();
    case 69:
      if (lookahead == 'e') ADVANCE(49);
      END_STATE();
    case 70:
      if (lookahead == 'e') ADVANCE(147);
      END_STATE();
    case 71:
      if (lookahead == 'e') ADVANCE(129);
      END_STATE();
    case 72:
      if (lookahead == 'e') ADVANCE(173);
      END_STATE();
    case 73:
      if (lookahead == 'e') ADVANCE(163);
      END_STATE();
    case 74:
      if (lookahead == 'e') ADVANCE(175);
      END_STATE();
    case 75:
      if (lookahead == 'e') ADVANCE(176);
      END_STATE();
    case 76:
      if (lookahead == 'e') ADVANCE(111);
      END_STATE();
    case 77:
      if (lookahead == 'e') ADVANCE(177);
      END_STATE();
    case 78:
      if (lookahead == 'e') ADVANCE(178);
      END_STATE();
    case 79:
      if (lookahead == 'e') ADVANCE(155);
      END_STATE();
    case 80:
      if (lookahead == 'e') ADVANCE(157);
      END_STATE();
    case 81:
      if (lookahead == 'e') ADVANCE(50);
      END_STATE();
    case 82:
      if (lookahead == 'e') ADVANCE(130);
      END_STATE();
    case 83:
      if (lookahead == 'e') ADVANCE(166);
      END_STATE();
    case 84:
      if (lookahead == 'f') ADVANCE(138);
      END_STATE();
    case 85:
      if (lookahead == 'g') ADVANCE(19);
      END_STATE();
    case 86:
      if (lookahead == 'g') ADVANCE(92);
      END_STATE();
    case 87:
      if (lookahead == 'h') ADVANCE(253);
      END_STATE();
    case 88:
      if (lookahead == 'h') ADVANCE(281);
      END_STATE();
    case 89:
      if (lookahead == 'h') ADVANCE(96);
      END_STATE();
    case 90:
      if (lookahead == 'h') ADVANCE(68);
      END_STATE();
    case 91:
      if (lookahead == 'i') ADVANCE(42);
      END_STATE();
    case 92:
      if (lookahead == 'i') ADVANCE(121);
      END_STATE();
    case 93:
      if (lookahead == 'i') ADVANCE(52);
      END_STATE();
    case 94:
      if (lookahead == 'i') ADVANCE(136);
      END_STATE();
    case 95:
      if (lookahead == 'i') ADVANCE(125);
      END_STATE();
    case 96:
      if (lookahead == 'i') ADVANCE(110);
      END_STATE();
    case 97:
      if (lookahead == 'i') ADVANCE(132);
      END_STATE();
    case 98:
      if (lookahead == 'i') ADVANCE(195);
      END_STATE();
    case 99:
      if (lookahead == 'i') ADVANCE(137);
      END_STATE();
    case 100:
      if (lookahead == 'i') ADVANCE(139);
      END_STATE();
    case 101:
      if (lookahead == 'k') ADVANCE(79);
      END_STATE();
    case 102:
      if (lookahead == 'k') ADVANCE(80);
      END_STATE();
    case 103:
      if (lookahead == 'l') ADVANCE(217);
      END_STATE();
    case 104:
      if (lookahead == 'l') ADVANCE(295);
      END_STATE();
    case 105:
      if (lookahead == 'l') ADVANCE(184);
      END_STATE();
    case 106:
      if (lookahead == 'l') ADVANCE(54);
      END_STATE();
    case 107:
      if (lookahead == 'l') ADVANCE(57);
      if (lookahead == 'r') ADVANCE(181);
      END_STATE();
    case 108:
      if (lookahead == 'l') ADVANCE(211);
      END_STATE();
    case 109:
      if (lookahead == 'l') ADVANCE(104);
      END_STATE();
    case 110:
      if (lookahead == 'l') ADVANCE(62);
      END_STATE();
    case 111:
      if (lookahead == 'l') ADVANCE(81);
      END_STATE();
    case 112:
      if (lookahead == 'm') ADVANCE(27);
      END_STATE();
    case 113:
      if (lookahead == 'm') ADVANCE(58);
      END_STATE();
    case 114:
      if (lookahead == 'm') ADVANCE(71);
      END_STATE();
    case 115:
      if (lookahead == 'm') ADVANCE(65);
      END_STATE();
    case 116:
      if (lookahead == 'm') ADVANCE(66);
      END_STATE();
    case 117:
      if (lookahead == 'm') ADVANCE(114);
      if (lookahead == 'n') ADVANCE(198);
      END_STATE();
    case 118:
      if (lookahead == 'm') ADVANCE(38);
      END_STATE();
    case 119:
      if (lookahead == 'n') ADVANCE(51);
      END_STATE();
    case 120:
      if (lookahead == 'n') ADVANCE(47);
      END_STATE();
    case 121:
      if (lookahead == 'n') ADVANCE(255);
      END_STATE();
    case 122:
      if (lookahead == 'n') ADVANCE(273);
      END_STATE();
    case 123:
      if (lookahead == 'n') ADVANCE(20);
      END_STATE();
    case 124:
      if (lookahead == 'n') ADVANCE(22);
      END_STATE();
    case 125:
      if (lookahead == 'n') ADVANCE(85);
      END_STATE();
    case 126:
      if (lookahead == 'n') ADVANCE(11);
      END_STATE();
    case 127:
      if (lookahead == 'n') ADVANCE(53);
      END_STATE();
    case 128:
      if (lookahead == 'n') ADVANCE(174);
      END_STATE();
    case 129:
      if (lookahead == 'n') ADVANCE(187);
      END_STATE();
    case 130:
      if (lookahead == 'n') ADVANCE(207);
      END_STATE();
    case 131:
      if (lookahead == 'n') ADVANCE(193);
      END_STATE();
    case 132:
      if (lookahead == 'n') ADVANCE(64);
      END_STATE();
    case 133:
      if (lookahead == 'o') ADVANCE(160);
      END_STATE();
    case 134:
      if (lookahead == 'o') ADVANCE(149);
      END_STATE();
    case 135:
      if (lookahead == 'o') ADVANCE(161);
      END_STATE();
    case 136:
      if (lookahead == 'o') ADVANCE(122);
      END_STATE();
    case 137:
      if (lookahead == 'o') ADVANCE(123);
      END_STATE();
    case 138:
      if (lookahead == 'o') ADVANCE(159);
      END_STATE();
    case 139:
      if (lookahead == 'o') ADVANCE(124);
      END_STATE();
    case 140:
      if (lookahead == 'o') ADVANCE(156);
      END_STATE();
    case 141:
      if (lookahead == 'o') ADVANCE(165);
      END_STATE();
    case 142:
      if (lookahead == 'o') ADVANCE(183);
      END_STATE();
    case 143:
      if (lookahead == 'o') ADVANCE(131);
      END_STATE();
    case 144:
      if (lookahead == 'p') ADVANCE(148);
      END_STATE();
    case 145:
      if (lookahead == 'p') ADVANCE(13);
      END_STATE();
    case 146:
      if (lookahead == 'p') ADVANCE(190);
      END_STATE();
    case 147:
      if (lookahead == 'p') ADVANCE(142);
      END_STATE();
    case 148:
      if (lookahead == 'p') ADVANCE(103);
      END_STATE();
    case 149:
      if (lookahead == 'p') ADVANCE(61);
      END_STATE();
    case 150:
      if (lookahead == 'p') ADVANCE(74);
      END_STATE();
    case 151:
      if (lookahead == 'p') ADVANCE(204);
      END_STATE();
    case 152:
      if (lookahead == 'p') ADVANCE(205);
      END_STATE();
    case 153:
      if (lookahead == 'p') ADVANCE(206);
      END_STATE();
    case 154:
      if (lookahead == 'r') ADVANCE(101);
      END_STATE();
    case 155:
      if (lookahead == 'r') ADVANCE(285);
      END_STATE();
    case 156:
      if (lookahead == 'r') ADVANCE(249);
      END_STATE();
    case 157:
      if (lookahead == 'r') ADVANCE(283);
      END_STATE();
    case 158:
      if (lookahead == 'r') ADVANCE(212);
      END_STATE();
    case 159:
      if (lookahead == 'r') ADVANCE(23);
      END_STATE();
    case 160:
      if (lookahead == 'r') ADVANCE(118);
      END_STATE();
    case 161:
      if (lookahead == 'r') ADVANCE(218);
      END_STATE();
    case 162:
      if (lookahead == 'r') ADVANCE(182);
      END_STATE();
    case 163:
      if (lookahead == 'r') ADVANCE(128);
      END_STATE();
    case 164:
      if (lookahead == 'r') ADVANCE(91);
      END_STATE();
    case 165:
      if (lookahead == 'r') ADVANCE(179);
      END_STATE();
    case 166:
      if (lookahead == 'r') ADVANCE(126);
      END_STATE();
    case 167:
      if (lookahead == 'r') ADVANCE(208);
      END_STATE();
    case 168:
      if (lookahead == 'r') ADVANCE(72);
      END_STATE();
    case 169:
      if (lookahead == 'r') ADVANCE(75);
      END_STATE();
    case 170:
      if (lookahead == 'r') ADVANCE(77);
      END_STATE();
    case 171:
      if (lookahead == 'r') ADVANCE(78);
      END_STATE();
    case 172:
      if (lookahead == 'r') ADVANCE(102);
      END_STATE();
    case 173:
      if (lookahead == 's') ADVANCE(263);
      END_STATE();
    case 174:
      if (lookahead == 's') ADVANCE(234);
      END_STATE();
    case 175:
      if (lookahead == 's') ADVANCE(279);
      END_STATE();
    case 176:
      if (lookahead == 's') ADVANCE(267);
      END_STATE();
    case 177:
      if (lookahead == 's') ADVANCE(265);
      END_STATE();
    case 178:
      if (lookahead == 's') ADVANCE(269);
      END_STATE();
    case 179:
      if (lookahead == 's') ADVANCE(275);
      END_STATE();
    case 180:
      if (lookahead == 's') ADVANCE(44);
      END_STATE();
    case 181:
      if (lookahead == 's') ADVANCE(186);
      END_STATE();
    case 182:
      if (lookahead == 's') ADVANCE(94);
      END_STATE();
    case 183:
      if (lookahead == 's') ADVANCE(98);
      END_STATE();
    case 184:
      if (lookahead == 's') ADVANCE(60);
      END_STATE();
    case 185:
      if (lookahead == 's') ADVANCE(188);
      END_STATE();
    case 186:
      if (lookahead == 't') ADVANCE(12);
      END_STATE();
    case 187:
      if (lookahead == 't') ADVANCE(289);
      END_STATE();
    case 188:
      if (lookahead == 't') ADVANCE(261);
      END_STATE();
    case 189:
      if (lookahead == 't') ADVANCE(30);
      END_STATE();
    case 190:
      if (lookahead == 't') ADVANCE(210);
      END_STATE();
    case 191:
      if (lookahead == 't') ADVANCE(141);
      END_STATE();
    case 192:
      if (lookahead == 't') ADVANCE(73);
      END_STATE();
    case 193:
      if (lookahead == 't') ADVANCE(164);
      END_STATE();
    case 194:
      if (lookahead == 't') ADVANCE(45);
      END_STATE();
    case 195:
      if (lookahead == 't') ADVANCE(135);
      END_STATE();
    case 196:
      if (lookahead == 't') ADVANCE(192);
      END_STATE();
    case 197:
      if (lookahead == 't') ADVANCE(99);
      END_STATE();
    case 198:
      if (lookahead == 't') ADVANCE(82);
      END_STATE();
    case 199:
      if (lookahead == 't') ADVANCE(83);
      END_STATE();
    case 200:
      if (lookahead == 't') ADVANCE(46);
      END_STATE();
    case 201:
      if (lookahead == 't') ADVANCE(199);
      END_STATE();
    case 202:
      if (lookahead == 't') ADVANCE(100);
      END_STATE();
    case 203:
      if (lookahead == 't') ADVANCE(140);
      END_STATE();
    case 204:
      if (lookahead == 't') ADVANCE(214);
      END_STATE();
    case 205:
      if (lookahead == 't') ADVANCE(215);
      END_STATE();
    case 206:
      if (lookahead == 't') ADVANCE(216);
      END_STATE();
    case 207:
      if (lookahead == 't') ADVANCE(17);
      END_STATE();
    case 208:
      if (lookahead == 't') ADVANCE(14);
      END_STATE();
    case 209:
      if (lookahead == 'u') ADVANCE(93);
      END_STATE();
    case 210:
      if (lookahead == 'u') ADVANCE(168);
      END_STATE();
    case 211:
      if (lookahead == 'u') ADVANCE(55);
      END_STATE();
    case 212:
      if (lookahead == 'u') ADVANCE(59);
      END_STATE();
    case 213:
      if (lookahead == 'u') ADVANCE(191);
      END_STATE();
    case 214:
      if (lookahead == 'u') ADVANCE(169);
      END_STATE();
    case 215:
      if (lookahead == 'u') ADVANCE(170);
      END_STATE();
    case 216:
      if (lookahead == 'u') ADVANCE(171);
      END_STATE();
    case 217:
      if (lookahead == 'y') ADVANCE(10);
      END_STATE();
    case 218:
      if (lookahead == 'y') ADVANCE(229);
      END_STATE();
    case 219:
      if (lookahead == 'y') ADVANCE(150);
      END_STATE();
    case 220:
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r') ADVANCE(503);
      END_STATE();
    case 221:
      if (lookahead != 0 &&
          lookahead != '\n') ADVANCE(232);
      END_STATE();
    case 222:
      if (lookahead != 0 &&
          lookahead != '#') ADVANCE(240);
      END_STATE();
    case 223:
      ACCEPT_TOKEN(ts_builtin_sym_end);
      END_STATE();
    case 224:
      ACCEPT_TOKEN(anon_sym_LBRACE);
      END_STATE();
    case 225:
      ACCEPT_TOKEN(anon_sym_COMMA);
      END_STATE();
    case 226:
      ACCEPT_TOKEN(anon_sym_RBRACE);
      END_STATE();
    case 227:
      ACCEPT_TOKEN(sym__whitespace);
      if (lookahead == '\t' ||
          lookahead == '\n' ||
          lookahead == '\r' ||
          lookahead == ' ') ADVANCE(227);
      END_STATE();
    case 228:
      ACCEPT_TOKEN(anon_sym_DQUOTE);
      END_STATE();
    case 229:
      ACCEPT_TOKEN(anon_sym_repository);
      END_STATE();
    case 230:
      ACCEPT_TOKEN(anon_sym_repository);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 231:
      ACCEPT_TOKEN(anon_sym_COLON);
      END_STATE();
    case 232:
      ACCEPT_TOKEN(aux_sym_repo_token1);
      END_STATE();
    case 233:
      ACCEPT_TOKEN(aux_sym_repo_token2);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"' &&
          lookahead != '\\') ADVANCE(233);
      END_STATE();
    case 234:
      ACCEPT_TOKEN(anon_sym_patterns);
      END_STATE();
    case 235:
      ACCEPT_TOKEN(anon_sym_patterns);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 236:
      ACCEPT_TOKEN(anon_sym_LBRACK);
      END_STATE();
    case 237:
      ACCEPT_TOKEN(anon_sym_RBRACK);
      END_STATE();
    case 238:
      ACCEPT_TOKEN(anon_sym_include);
      END_STATE();
    case 239:
      ACCEPT_TOKEN(anon_sym_include);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 240:
      ACCEPT_TOKEN(aux_sym__includeScope_token1);
      END_STATE();
    case 241:
      ACCEPT_TOKEN(aux_sym__includeScope_token2);
      if (lookahead != 0 &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"' &&
          lookahead != '#' &&
          lookahead != '\\') ADVANCE(241);
      END_STATE();
    case 242:
      ACCEPT_TOKEN(anon_sym_POUND);
      END_STATE();
    case 243:
      ACCEPT_TOKEN(anon_sym_scopeName);
      END_STATE();
    case 244:
      ACCEPT_TOKEN(anon_sym_scopeName);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 245:
      ACCEPT_TOKEN(anon_sym_name);
      END_STATE();
    case 246:
      ACCEPT_TOKEN(anon_sym_name);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 247:
      ACCEPT_TOKEN(anon_sym_contentName);
      END_STATE();
    case 248:
      ACCEPT_TOKEN(anon_sym_contentName);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 249:
      ACCEPT_TOKEN(anon_sym_injectionSelector);
      END_STATE();
    case 250:
      ACCEPT_TOKEN(anon_sym_injectionSelector);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 251:
      ACCEPT_TOKEN(anon_sym_injections);
      END_STATE();
    case 252:
      ACCEPT_TOKEN(anon_sym_injections);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 253:
      ACCEPT_TOKEN(anon_sym_match);
      END_STATE();
    case 254:
      ACCEPT_TOKEN(anon_sym_match);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 255:
      ACCEPT_TOKEN(anon_sym_begin);
      if (lookahead == 'C') ADVANCE(40);
      END_STATE();
    case 256:
      ACCEPT_TOKEN(anon_sym_begin);
      if (lookahead == 'C') ADVANCE(326);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 257:
      ACCEPT_TOKEN(anon_sym_end);
      if (lookahead == 'C') ADVANCE(39);
      END_STATE();
    case 258:
      ACCEPT_TOKEN(anon_sym_end);
      if (lookahead == 'C') ADVANCE(324);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 259:
      ACCEPT_TOKEN(anon_sym_while);
      if (lookahead == 'C') ADVANCE(41);
      END_STATE();
    case 260:
      ACCEPT_TOKEN(anon_sym_while);
      if (lookahead == 'C') ADVANCE(327);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 261:
      ACCEPT_TOKEN(anon_sym_applyEndPatternLast);
      END_STATE();
    case 262:
      ACCEPT_TOKEN(anon_sym_applyEndPatternLast);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 263:
      ACCEPT_TOKEN(anon_sym_captures);
      END_STATE();
    case 264:
      ACCEPT_TOKEN(anon_sym_captures);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 265:
      ACCEPT_TOKEN(anon_sym_beginCaptures);
      END_STATE();
    case 266:
      ACCEPT_TOKEN(anon_sym_beginCaptures);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 267:
      ACCEPT_TOKEN(anon_sym_endCaptures);
      END_STATE();
    case 268:
      ACCEPT_TOKEN(anon_sym_endCaptures);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 269:
      ACCEPT_TOKEN(anon_sym_whileCaptures);
      END_STATE();
    case 270:
      ACCEPT_TOKEN(anon_sym_whileCaptures);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 271:
      ACCEPT_TOKEN(aux_sym_capture_token1);
      if (lookahead == '\\') ADVANCE(220);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(271);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 272:
      ACCEPT_TOKEN(aux_sym_capture_token1);
      if (('0' <= lookahead && lookahead <= '9')) ADVANCE(272);
      END_STATE();
    case 273:
      ACCEPT_TOKEN(anon_sym_version);
      END_STATE();
    case 274:
      ACCEPT_TOKEN(anon_sym_version);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 275:
      ACCEPT_TOKEN(anon_sym_information_for_contributors);
      END_STATE();
    case 276:
      ACCEPT_TOKEN(anon_sym_information_for_contributors);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 277:
      ACCEPT_TOKEN(anon_sym_DOLLARschema);
      END_STATE();
    case 278:
      ACCEPT_TOKEN(anon_sym_DOLLARschema);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 279:
      ACCEPT_TOKEN(anon_sym_fileTypes);
      END_STATE();
    case 280:
      ACCEPT_TOKEN(anon_sym_fileTypes);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 281:
      ACCEPT_TOKEN(anon_sym_firstLineMatch);
      END_STATE();
    case 282:
      ACCEPT_TOKEN(anon_sym_firstLineMatch);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 283:
      ACCEPT_TOKEN(anon_sym_foldingStartMarker);
      END_STATE();
    case 284:
      ACCEPT_TOKEN(anon_sym_foldingStartMarker);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 285:
      ACCEPT_TOKEN(anon_sym_foldingStopMarker);
      END_STATE();
    case 286:
      ACCEPT_TOKEN(anon_sym_foldingStopMarker);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 287:
      ACCEPT_TOKEN(anon_sym_uuid);
      END_STATE();
    case 288:
      ACCEPT_TOKEN(anon_sym_uuid);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 289:
      ACCEPT_TOKEN(anon_sym_comment);
      END_STATE();
    case 290:
      ACCEPT_TOKEN(anon_sym_comment);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 291:
      ACCEPT_TOKEN(anon_sym_SLASH_SLASH);
      END_STATE();
    case 292:
      ACCEPT_TOKEN(anon_sym_SLASH_SLASH);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 293:
      ACCEPT_TOKEN(anon_sym_true);
      END_STATE();
    case 294:
      ACCEPT_TOKEN(anon_sym_false);
      END_STATE();
    case 295:
      ACCEPT_TOKEN(sym_null);
      END_STATE();
    case 296:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '/') ADVANCE(292);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 297:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'E') ADVANCE(412);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 298:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'L') ADVANCE(317);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 299:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'L') ADVANCE(384);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 300:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'M') ADVANCE(318);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 301:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'M') ADVANCE(319);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 302:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'M') ADVANCE(320);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 303:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'N') ADVANCE(321);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 304:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'N') ADVANCE(322);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 305:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'P') ADVANCE(323);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 306:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'S') ADVANCE(474);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 307:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'S') ADVANCE(364);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(252);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 308:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == 'T') ADVANCE(502);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 309:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == '_') ADVANCE(369);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 310:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == '_') ADVANCE(334);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 311:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(475);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 312:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(395);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 313:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(278);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 314:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(479);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 315:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(434);
      if (lookahead == 'o') ADVANCE(400);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 316:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(455);
      if (lookahead == 'o') ADVANCE(433);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 317:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(468);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 318:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(440);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 319:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(480);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 320:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(457);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 321:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(398);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 322:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(399);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 323:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(483);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 324:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(437);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 325:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(490);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 326:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(438);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 327:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'a') ADVANCE(439);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 328:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'b') ADVANCE(499);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 329:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(373);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 330:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(390);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 331:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(375);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 332:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(374);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 333:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(421);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 334:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(429);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 335:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(488);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 336:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'c') ADVANCE(484);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 337:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'd') ADVANCE(258);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 338:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'd') ADVANCE(305);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 339:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'd') ADVANCE(288);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 340:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'd') ADVANCE(345);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 341:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'd') ADVANCE(382);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 342:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(371);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 343:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(246);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 344:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(260);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 345:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(239);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 346:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(248);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 347:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(308);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 348:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(301);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 349:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(244);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 350:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(458);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 351:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(447);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 352:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(397);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 353:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(431);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 354:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(414);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 355:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(460);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 356:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(456);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 357:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(335);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 358:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(461);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 359:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(462);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 360:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(463);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 361:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(441);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 362:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(443);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 363:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(448);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 364:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(394);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 365:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(415);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 366:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(336);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 367:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'e') ADVANCE(304);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 368:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'f') ADVANCE(422);
      if (lookahead == 'j') ADVANCE(357);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 369:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'f') ADVANCE(423);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 370:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'g') ADVANCE(306);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 371:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'g') ADVANCE(378);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 372:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'h') ADVANCE(379);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 373:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'h') ADVANCE(254);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 374:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'h') ADVANCE(282);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 375:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'h') ADVANCE(352);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 376:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(393);
      if (lookahead == 'o') ADVANCE(391);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 377:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(328);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 378:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(405);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 379:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(392);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 380:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(339);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 381:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(424);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 382:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(411);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 383:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(476);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 384:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(417);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 385:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(426);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 386:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'i') ADVANCE(427);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 387:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'k') ADVANCE(361);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 388:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'k') ADVANCE(362);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 389:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'l') ADVANCE(500);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 390:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'l') ADVANCE(494);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 391:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'l') ADVANCE(341);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 392:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'l') ADVANCE(344);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 393:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'l') ADVANCE(347);
      if (lookahead == 'r') ADVANCE(469);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 394:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'l') ADVANCE(366);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 395:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'm') ADVANCE(343);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 396:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'm') ADVANCE(354);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 397:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'm') ADVANCE(313);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 398:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'm') ADVANCE(346);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 399:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'm') ADVANCE(349);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 400:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'm') ADVANCE(396);
      if (lookahead == 'n') ADVANCE(487);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 401:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'm') ADVANCE(396);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 402:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'm') ADVANCE(325);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 403:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(337);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 404:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(330);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 405:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(256);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 406:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(298);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 407:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(368);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 408:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(274);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 409:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(307);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 410:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(309);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 411:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(370);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 412:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(338);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 413:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(459);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 414:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(471);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 415:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(472);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 416:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(481);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 417:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'n') ADVANCE(348);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 418:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(465);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 419:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(401);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 420:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(444);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 421:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(435);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 422:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(446);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 423:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(445);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 424:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(408);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 425:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(442);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 426:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(409);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 427:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(410);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 428:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(452);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 429:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'o') ADVANCE(416);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 430:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'p') ADVANCE(389);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 431:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'p') ADVANCE(418);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 432:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'p') ADVANCE(430);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 433:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'p') ADVANCE(300);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 434:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'p') ADVANCE(470);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 435:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'p') ADVANCE(367);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 436:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'p') ADVANCE(360);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 437:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'p') ADVANCE(486);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 438:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'p') ADVANCE(489);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 439:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'p') ADVANCE(491);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 440:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(387);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 441:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(286);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 442:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(250);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 443:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(284);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 444:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(501);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 445:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(310);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 446:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(402);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 447:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(413);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 448:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(406);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 449:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(377);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 450:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(350);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 451:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(355);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 452:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(464);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 453:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(358);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 454:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(359);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 455:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(492);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 456:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(467);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 457:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'r') ADVANCE(388);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 458:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(264);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 459:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(235);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 460:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(268);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 461:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(266);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 462:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(270);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 463:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(280);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 464:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(276);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 465:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(383);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 466:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(331);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 467:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(381);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 468:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(473);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 469:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 's') ADVANCE(477);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 470:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(493);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 471:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(290);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 472:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(303);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 473:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(262);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 474:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(316);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 475:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(329);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 476:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(420);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 477:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(299);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 478:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(351);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 479:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(478);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 480:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(332);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 481:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(449);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 482:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(363);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 483:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(482);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 484:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(425);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 485:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(428);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 486:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(496);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 487:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(365);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 488:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(385);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 489:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(497);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 490:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(386);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 491:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(498);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 492:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 't') ADVANCE(302);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 493:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'u') ADVANCE(450);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 494:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'u') ADVANCE(340);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 495:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'u') ADVANCE(380);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 496:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'u') ADVANCE(451);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 497:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'u') ADVANCE(453);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 498:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'u') ADVANCE(454);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 499:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'u') ADVANCE(485);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 500:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'y') ADVANCE(297);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 501:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'y') ADVANCE(230);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 502:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead == 'y') ADVANCE(436);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
      END_STATE();
    case 503:
      ACCEPT_TOKEN(sym__string_content);
      if (lookahead == '\\') ADVANCE(220);
      if (lookahead != 0 &&
          lookahead != '\t' &&
          lookahead != '\n' &&
          lookahead != '\r' &&
          lookahead != '"') ADVANCE(503);
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
  [65] = {.lex_state = 0},
  [66] = {.lex_state = 0},
  [67] = {.lex_state = 0},
  [68] = {.lex_state = 0},
  [69] = {.lex_state = 2},
  [70] = {.lex_state = 2},
  [71] = {.lex_state = 2},
  [72] = {.lex_state = 2},
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
  [86] = {.lex_state = 5},
  [87] = {.lex_state = 0},
  [88] = {.lex_state = 0},
  [89] = {.lex_state = 0},
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
  [131] = {.lex_state = 0},
  [132] = {.lex_state = 0},
  [133] = {.lex_state = 0},
  [134] = {.lex_state = 0},
  [135] = {.lex_state = 0},
  [136] = {.lex_state = 0},
  [137] = {.lex_state = 0},
  [138] = {.lex_state = 6},
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
  [201] = {.lex_state = 2},
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
  [253] = {.lex_state = 0},
  [254] = {.lex_state = 0},
  [255] = {.lex_state = 0},
  [256] = {.lex_state = 0},
  [257] = {.lex_state = 8},
  [258] = {.lex_state = 0},
  [259] = {.lex_state = 8},
  [260] = {.lex_state = 0},
  [261] = {.lex_state = 0},
  [262] = {.lex_state = 0},
  [263] = {.lex_state = 0},
  [264] = {.lex_state = 0},
  [265] = {.lex_state = 0},
  [266] = {.lex_state = 0},
  [267] = {.lex_state = 0},
  [268] = {.lex_state = 8},
  [269] = {.lex_state = 0},
  [270] = {.lex_state = 8},
  [271] = {.lex_state = 0},
  [272] = {.lex_state = 0},
  [273] = {.lex_state = 0},
  [274] = {.lex_state = 8},
  [275] = {.lex_state = 0},
  [276] = {.lex_state = 0},
  [277] = {.lex_state = 0},
  [278] = {.lex_state = 0},
  [279] = {.lex_state = 0},
  [280] = {.lex_state = 0},
  [281] = {.lex_state = 8},
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
  [314] = {.lex_state = 0},
  [315] = {.lex_state = 0},
  [316] = {.lex_state = 0},
  [317] = {.lex_state = 0},
  [318] = {.lex_state = 0},
  [319] = {.lex_state = 0},
  [320] = {.lex_state = 0},
  [321] = {.lex_state = 0},
  [322] = {.lex_state = 0},
  [323] = {.lex_state = 0},
  [324] = {.lex_state = 8},
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
  [451] = {.lex_state = 8},
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
  [570] = {.lex_state = 0},
  [571] = {.lex_state = 0},
  [572] = {.lex_state = 0},
  [573] = {.lex_state = 0},
  [574] = {.lex_state = 0},
  [575] = {.lex_state = 0},
  [576] = {.lex_state = 0},
  [577] = {.lex_state = 0},
  [578] = {.lex_state = 0},
  [579] = {.lex_state = 0},
  [580] = {.lex_state = 8},
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
  [764] = {.lex_state = 7},
  [765] = {.lex_state = 0},
  [766] = {.lex_state = 0},
  [767] = {.lex_state = 7},
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
  [797] = {.lex_state = 0},
  [798] = {.lex_state = 0},
  [799] = {.lex_state = 0},
  [800] = {.lex_state = 0},
  [801] = {.lex_state = 0},
  [802] = {.lex_state = 0},
  [803] = {.lex_state = 0},
  [804] = {.lex_state = 0},
  [805] = {.lex_state = 0},
  [806] = {.lex_state = 0},
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
    [anon_sym_information_for_contributors] = ACTIONS(1),
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
    [aux_sym_json_repeat3] = STATE(737),
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
    STATE(4), 1,
      aux_sym_json_repeat1,
    STATE(198), 18,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_information_for_contributors,
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
  [33] = 5,
    ACTIONS(13), 1,
      anon_sym_RBRACE,
    ACTIONS(15), 1,
      sym__whitespace,
    ACTIONS(17), 1,
      anon_sym_DQUOTE,
    STATE(5), 1,
      aux_sym_json_repeat1,
    STATE(200), 18,
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
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(19), 1,
      anon_sym_RBRACE,
    ACTIONS(21), 1,
      sym__whitespace,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(113), 18,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_information_for_contributors,
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
  [99] = 5,
    ACTIONS(17), 1,
      anon_sym_DQUOTE,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(23), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(107), 18,
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
  [132] = 4,
    ACTIONS(17), 1,
      anon_sym_DQUOTE,
    ACTIONS(25), 1,
      sym__whitespace,
    STATE(11), 1,
      aux_sym_json_repeat1,
    STATE(435), 18,
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
  [162] = 4,
    ACTIONS(17), 1,
      anon_sym_DQUOTE,
    ACTIONS(21), 1,
      sym__whitespace,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(557), 18,
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
  [192] = 4,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(27), 1,
      sym__whitespace,
    STATE(12), 1,
      aux_sym_json_repeat1,
    STATE(757), 18,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_information_for_contributors,
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
  [222] = 4,
    ACTIONS(17), 1,
      anon_sym_DQUOTE,
    ACTIONS(29), 1,
      sym__whitespace,
    STATE(7), 1,
      aux_sym_json_repeat1,
    STATE(487), 18,
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
  [252] = 4,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(21), 1,
      sym__whitespace,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(757), 18,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_information_for_contributors,
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
  [282] = 4,
    ACTIONS(17), 1,
      anon_sym_DQUOTE,
    ACTIONS(21), 1,
      sym__whitespace,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(487), 18,
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
  [312] = 4,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(21), 1,
      sym__whitespace,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(713), 18,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_information_for_contributors,
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
  [342] = 4,
    ACTIONS(11), 1,
      anon_sym_DQUOTE,
    ACTIONS(31), 1,
      sym__whitespace,
    STATE(10), 1,
      aux_sym_json_repeat1,
    STATE(670), 18,
      sym_repository,
      sym_patterns,
      sym_scopeName,
      sym_name,
      sym_injectionSelector,
      sym_injections,
      sym_version,
      sym_information_for_contributors,
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
  [372] = 18,
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
  [427] = 18,
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
      anon_sym_information_for_contributors,
    ACTIONS(81), 1,
      anon_sym_DOLLARschema,
    ACTIONS(83), 1,
      anon_sym_fileTypes,
    ACTIONS(85), 1,
      anon_sym_firstLineMatch,
    ACTIONS(87), 1,
      anon_sym_foldingStartMarker,
    ACTIONS(89), 1,
      anon_sym_foldingStopMarker,
    ACTIONS(91), 1,
      anon_sym_uuid,
  [482] = 10,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_LBRACE,
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
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(184), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [518] = 10,
    ACTIONS(93), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(107), 1,
      sym__whitespace,
    ACTIONS(109), 1,
      anon_sym_RBRACK,
    ACTIONS(111), 1,
      sym_null,
    STATE(18), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(179), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [554] = 10,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(113), 1,
      anon_sym_RBRACK,
    ACTIONS(115), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(229), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [590] = 10,
    ACTIONS(93), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(117), 1,
      sym__whitespace,
    ACTIONS(119), 1,
      anon_sym_RBRACK,
    ACTIONS(121), 1,
      sym_null,
    STATE(16), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(116), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [626] = 9,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(123), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(501), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [659] = 9,
    ACTIONS(93), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(125), 1,
      sym__whitespace,
    ACTIONS(127), 1,
      sym_null,
    STATE(23), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(664), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [692] = 9,
    ACTIONS(93), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(129), 1,
      sym__whitespace,
    ACTIONS(131), 1,
      sym_null,
    STATE(20), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(591), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [725] = 9,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(93), 1,
      anon_sym_LBRACE,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(97), 1,
      anon_sym_LBRACK,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(131), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(591), 5,
      sym_object,
      sym_array,
      sym_boolean,
      sym_integer,
      sym__string,
  [758] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(135), 1,
      sym__whitespace,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(139), 1,
      sym_null,
    STATE(31), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(755), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [790] = 9,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(141), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(686), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [822] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(143), 1,
      sym__whitespace,
    ACTIONS(145), 1,
      sym_null,
    STATE(38), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(717), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [854] = 9,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(147), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(627), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [886] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(149), 1,
      sym__whitespace,
    ACTIONS(151), 1,
      sym_null,
    STATE(25), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(733), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [918] = 9,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(153), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(609), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [950] = 9,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(155), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(608), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [982] = 9,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(157), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(707), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1014] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(159), 1,
      sym__whitespace,
    ACTIONS(161), 1,
      sym_null,
    STATE(29), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(672), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1046] = 3,
    ACTIONS(165), 1,
      sym__whitespace,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(163), 11,
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
  [1066] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(168), 1,
      sym__whitespace,
    ACTIONS(170), 1,
      sym_null,
    STATE(37), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(730), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1098] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(157), 1,
      sym_null,
    ACTIONS(172), 1,
      sym__whitespace,
    STATE(30), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(707), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1130] = 9,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(141), 1,
      sym_null,
    ACTIONS(174), 1,
      sym__whitespace,
    STATE(27), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(686), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1162] = 9,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(139), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(755), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1194] = 9,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(133), 1,
      anon_sym_LBRACE,
    ACTIONS(137), 1,
      anon_sym_LBRACK,
    ACTIONS(161), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(672), 4,
      sym__value,
      sym_boolean,
      sym_integer,
      sym__string,
  [1226] = 5,
    ACTIONS(176), 1,
      anon_sym_RBRACE,
    ACTIONS(178), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    STATE(40), 1,
      aux_sym_json_repeat1,
    STATE(87), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1246] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(182), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(132), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1266] = 5,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(184), 1,
      anon_sym_RBRACE,
    ACTIONS(186), 1,
      sym__whitespace,
    STATE(46), 1,
      aux_sym_json_repeat1,
    STATE(199), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1286] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(188), 1,
      anon_sym_RBRACE,
    ACTIONS(190), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(230), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1306] = 5,
    ACTIONS(188), 1,
      anon_sym_RBRACE,
    ACTIONS(190), 1,
      anon_sym_DQUOTE,
    ACTIONS(192), 1,
      sym__whitespace,
    STATE(49), 1,
      aux_sym_json_repeat1,
    STATE(230), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1326] = 5,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(182), 1,
      anon_sym_RBRACE,
    ACTIONS(194), 1,
      sym__whitespace,
    STATE(54), 1,
      aux_sym_json_repeat1,
    STATE(132), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1346] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(196), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(207), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1366] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(198), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(202), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1386] = 5,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(198), 1,
      anon_sym_RBRACE,
    ACTIONS(200), 1,
      sym__whitespace,
    STATE(53), 1,
      aux_sym_json_repeat1,
    STATE(202), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1406] = 5,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(202), 1,
      anon_sym_RBRACE,
    ACTIONS(204), 1,
      sym__whitespace,
    STATE(56), 1,
      aux_sym_json_repeat1,
    STATE(135), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1426] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(190), 1,
      anon_sym_DQUOTE,
    ACTIONS(206), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(186), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1446] = 5,
    ACTIONS(190), 1,
      anon_sym_DQUOTE,
    ACTIONS(206), 1,
      anon_sym_RBRACE,
    ACTIONS(208), 1,
      sym__whitespace,
    STATE(52), 1,
      aux_sym_json_repeat1,
    STATE(186), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1466] = 5,
    ACTIONS(190), 1,
      anon_sym_DQUOTE,
    ACTIONS(210), 1,
      anon_sym_RBRACE,
    ACTIONS(212), 1,
      sym__whitespace,
    STATE(42), 1,
      aux_sym_json_repeat1,
    STATE(141), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1486] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(190), 1,
      anon_sym_DQUOTE,
    ACTIONS(214), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(130), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1506] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(216), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(139), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1526] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(218), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(175), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1546] = 5,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(218), 1,
      anon_sym_RBRACE,
    ACTIONS(220), 1,
      sym__whitespace,
    STATE(45), 1,
      aux_sym_json_repeat1,
    STATE(175), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1566] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(184), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(199), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1586] = 4,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(222), 1,
      sym__whitespace,
    STATE(66), 1,
      aux_sym_json_repeat1,
    STATE(680), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1603] = 6,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(224), 1,
      sym__whitespace,
    ACTIONS(226), 1,
      sym_null,
    STATE(60), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(542), 2,
      sym_boolean,
      sym_integer,
  [1624] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(190), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(712), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1641] = 6,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(228), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(598), 2,
      sym_boolean,
      sym_integer,
  [1662] = 6,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(228), 1,
      sym_null,
    ACTIONS(230), 1,
      sym__whitespace,
    STATE(63), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(598), 2,
      sym_boolean,
      sym_integer,
  [1683] = 4,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    ACTIONS(232), 1,
      sym__whitespace,
    STATE(64), 1,
      aux_sym_json_repeat1,
    STATE(623), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1700] = 6,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(101), 1,
      aux_sym_capture_token1,
    ACTIONS(234), 1,
      sym_null,
    STATE(33), 1,
      aux_sym_json_repeat1,
    ACTIONS(103), 2,
      anon_sym_true,
      anon_sym_false,
    STATE(652), 2,
      sym_boolean,
      sym_integer,
  [1721] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(680), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1738] = 4,
    ACTIONS(190), 1,
      anon_sym_DQUOTE,
    ACTIONS(236), 1,
      sym__whitespace,
    STATE(67), 1,
      aux_sym_json_repeat1,
    STATE(696), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1755] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(180), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(724), 5,
      sym_patterns,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1772] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(190), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(736), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1789] = 4,
    ACTIONS(190), 1,
      anon_sym_DQUOTE,
    ACTIONS(238), 1,
      sym__whitespace,
    STATE(59), 1,
      aux_sym_json_repeat1,
    STATE(736), 5,
      sym_capture,
      sym__comments,
      sym_comment,
      sym_comment_slash,
      sym_item,
  [1806] = 5,
    ACTIONS(242), 1,
      anon_sym_POUND,
    STATE(70), 1,
      aux_sym__includeScope,
    STATE(788), 1,
      sym__includeItem,
    STATE(790), 1,
      sym_value,
    ACTIONS(240), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1823] = 5,
    ACTIONS(242), 1,
      anon_sym_POUND,
    ACTIONS(244), 1,
      anon_sym_DQUOTE,
    STATE(201), 1,
      aux_sym__includeScope,
    STATE(777), 1,
      sym__includeItem,
    ACTIONS(246), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1840] = 5,
    ACTIONS(242), 1,
      anon_sym_POUND,
    STATE(70), 1,
      aux_sym__includeScope,
    STATE(776), 1,
      sym_value,
    STATE(788), 1,
      sym__includeItem,
    ACTIONS(240), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1857] = 5,
    ACTIONS(242), 1,
      anon_sym_POUND,
    STATE(70), 1,
      aux_sym__includeScope,
    STATE(788), 1,
      sym__includeItem,
    STATE(793), 1,
      sym_value,
    ACTIONS(240), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [1874] = 5,
    ACTIONS(248), 1,
      anon_sym_COMMA,
    ACTIONS(250), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      sym__whitespace,
    STATE(83), 1,
      aux_sym_repository_repeat1,
    STATE(409), 1,
      aux_sym_json_repeat1,
  [1890] = 5,
    ACTIONS(254), 1,
      anon_sym_RBRACE,
    ACTIONS(256), 1,
      sym__whitespace,
    ACTIONS(258), 1,
      anon_sym_DQUOTE,
    STATE(127), 1,
      aux_sym_json_repeat1,
    STATE(128), 1,
      sym_repo,
  [1906] = 5,
    ACTIONS(260), 1,
      anon_sym_COMMA,
    ACTIONS(262), 1,
      sym__whitespace,
    ACTIONS(264), 1,
      anon_sym_RBRACK,
    STATE(96), 1,
      aux_sym_fileTypes_repeat1,
    STATE(384), 1,
      aux_sym_json_repeat1,
  [1922] = 5,
    ACTIONS(260), 1,
      anon_sym_COMMA,
    ACTIONS(262), 1,
      sym__whitespace,
    ACTIONS(264), 1,
      anon_sym_RBRACK,
    STATE(95), 1,
      aux_sym_fileTypes_repeat1,
    STATE(384), 1,
      aux_sym_json_repeat1,
  [1938] = 5,
    ACTIONS(266), 1,
      anon_sym_COMMA,
    ACTIONS(268), 1,
      anon_sym_RBRACE,
    ACTIONS(270), 1,
      sym__whitespace,
    STATE(78), 1,
      aux_sym__pattern_repeat1,
    STATE(398), 1,
      aux_sym_json_repeat1,
  [1954] = 5,
    ACTIONS(272), 1,
      anon_sym_COMMA,
    ACTIONS(275), 1,
      anon_sym_RBRACE,
    ACTIONS(277), 1,
      sym__whitespace,
    STATE(78), 1,
      aux_sym__pattern_repeat1,
    STATE(490), 1,
      aux_sym_json_repeat1,
  [1970] = 5,
    ACTIONS(280), 1,
      anon_sym_COMMA,
    ACTIONS(282), 1,
      anon_sym_RBRACE,
    ACTIONS(284), 1,
      sym__whitespace,
    STATE(89), 1,
      aux_sym_injections_repeat1,
    STATE(386), 1,
      aux_sym_json_repeat1,
  [1986] = 5,
    ACTIONS(286), 1,
      anon_sym_COMMA,
    ACTIONS(288), 1,
      sym__whitespace,
    ACTIONS(290), 1,
      anon_sym_RBRACK,
    STATE(85), 1,
      aux_sym_patterns_repeat1,
    STATE(395), 1,
      aux_sym_json_repeat1,
  [2002] = 5,
    ACTIONS(280), 1,
      anon_sym_COMMA,
    ACTIONS(282), 1,
      anon_sym_RBRACE,
    ACTIONS(284), 1,
      sym__whitespace,
    STATE(101), 1,
      aux_sym_injections_repeat1,
    STATE(386), 1,
      aux_sym_json_repeat1,
  [2018] = 5,
    ACTIONS(286), 1,
      anon_sym_COMMA,
    ACTIONS(292), 1,
      sym__whitespace,
    ACTIONS(294), 1,
      anon_sym_RBRACK,
    STATE(106), 1,
      aux_sym_patterns_repeat1,
    STATE(396), 1,
      aux_sym_json_repeat1,
  [2034] = 5,
    ACTIONS(248), 1,
      anon_sym_COMMA,
    ACTIONS(296), 1,
      anon_sym_RBRACE,
    ACTIONS(298), 1,
      sym__whitespace,
    STATE(131), 1,
      aux_sym_repository_repeat1,
    STATE(369), 1,
      aux_sym_json_repeat1,
  [2050] = 5,
    ACTIONS(248), 1,
      anon_sym_COMMA,
    ACTIONS(250), 1,
      anon_sym_RBRACE,
    ACTIONS(252), 1,
      sym__whitespace,
    STATE(131), 1,
      aux_sym_repository_repeat1,
    STATE(409), 1,
      aux_sym_json_repeat1,
  [2066] = 5,
    ACTIONS(286), 1,
      anon_sym_COMMA,
    ACTIONS(300), 1,
      sym__whitespace,
    ACTIONS(302), 1,
      anon_sym_RBRACK,
    STATE(106), 1,
      aux_sym_patterns_repeat1,
    STATE(337), 1,
      aux_sym_json_repeat1,
  [2082] = 5,
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
  [2098] = 5,
    ACTIONS(182), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(306), 1,
      sym__whitespace,
    STATE(126), 1,
      aux_sym_injection_repeat1,
    STATE(335), 1,
      aux_sym_json_repeat1,
  [2114] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(310), 1,
      anon_sym_RBRACE,
    ACTIONS(312), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(425), 1,
      aux_sym_json_repeat1,
  [2130] = 5,
    ACTIONS(280), 1,
      anon_sym_COMMA,
    ACTIONS(314), 1,
      anon_sym_RBRACE,
    ACTIONS(316), 1,
      sym__whitespace,
    STATE(101), 1,
      aux_sym_injections_repeat1,
    STATE(322), 1,
      aux_sym_json_repeat1,
  [2146] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(318), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(75), 1,
      sym__string,
  [2162] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(320), 1,
      anon_sym_RBRACE,
    ACTIONS(322), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(424), 1,
      aux_sym_json_repeat1,
  [2178] = 5,
    ACTIONS(260), 1,
      anon_sym_COMMA,
    ACTIONS(318), 1,
      anon_sym_RBRACK,
    ACTIONS(324), 1,
      sym__whitespace,
    STATE(76), 1,
      aux_sym_fileTypes_repeat1,
    STATE(422), 1,
      aux_sym_json_repeat1,
  [2194] = 5,
    ACTIONS(260), 1,
      anon_sym_COMMA,
    ACTIONS(318), 1,
      anon_sym_RBRACK,
    ACTIONS(324), 1,
      sym__whitespace,
    STATE(95), 1,
      aux_sym_fileTypes_repeat1,
    STATE(422), 1,
      aux_sym_json_repeat1,
  [2210] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(326), 1,
      anon_sym_RBRACE,
    ACTIONS(328), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(420), 1,
      aux_sym_json_repeat1,
  [2226] = 5,
    ACTIONS(330), 1,
      anon_sym_COMMA,
    ACTIONS(333), 1,
      sym__whitespace,
    ACTIONS(336), 1,
      anon_sym_RBRACK,
    STATE(95), 1,
      aux_sym_fileTypes_repeat1,
    STATE(454), 1,
      aux_sym_json_repeat1,
  [2242] = 5,
    ACTIONS(260), 1,
      anon_sym_COMMA,
    ACTIONS(338), 1,
      sym__whitespace,
    ACTIONS(340), 1,
      anon_sym_RBRACK,
    STATE(95), 1,
      aux_sym_fileTypes_repeat1,
    STATE(319), 1,
      aux_sym_json_repeat1,
  [2258] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(342), 1,
      anon_sym_RBRACE,
    ACTIONS(344), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(79), 1,
      sym_injection,
  [2274] = 5,
    ACTIONS(346), 1,
      anon_sym_COMMA,
    ACTIONS(348), 1,
      anon_sym_RBRACE,
    ACTIONS(350), 1,
      sym__whitespace,
    STATE(193), 1,
      aux_sym_captures_repeat1,
    STATE(412), 1,
      aux_sym_json_repeat1,
  [2290] = 5,
    ACTIONS(280), 1,
      anon_sym_COMMA,
    ACTIONS(342), 1,
      anon_sym_RBRACE,
    ACTIONS(352), 1,
      sym__whitespace,
    STATE(81), 1,
      aux_sym_injections_repeat1,
    STATE(428), 1,
      aux_sym_json_repeat1,
  [2306] = 5,
    ACTIONS(280), 1,
      anon_sym_COMMA,
    ACTIONS(342), 1,
      anon_sym_RBRACE,
    ACTIONS(352), 1,
      sym__whitespace,
    STATE(101), 1,
      aux_sym_injections_repeat1,
    STATE(428), 1,
      aux_sym_json_repeat1,
  [2322] = 5,
    ACTIONS(354), 1,
      anon_sym_COMMA,
    ACTIONS(357), 1,
      anon_sym_RBRACE,
    ACTIONS(359), 1,
      sym__whitespace,
    STATE(101), 1,
      aux_sym_injections_repeat1,
    STATE(716), 1,
      aux_sym_json_repeat1,
  [2338] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(364), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(80), 1,
      sym__pattern,
  [2354] = 5,
    ACTIONS(286), 1,
      anon_sym_COMMA,
    ACTIONS(366), 1,
      sym__whitespace,
    ACTIONS(368), 1,
      anon_sym_RBRACK,
    STATE(82), 1,
      aux_sym_patterns_repeat1,
    STATE(249), 1,
      aux_sym_json_repeat1,
  [2370] = 5,
    ACTIONS(286), 1,
      anon_sym_COMMA,
    ACTIONS(370), 1,
      sym__whitespace,
    ACTIONS(372), 1,
      anon_sym_RBRACK,
    STATE(106), 1,
      aux_sym_patterns_repeat1,
    STATE(427), 1,
      aux_sym_json_repeat1,
  [2386] = 5,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(374), 1,
      anon_sym_RBRACE,
    ACTIONS(376), 1,
      sym__whitespace,
    STATE(171), 1,
      aux_sym_injection_repeat1,
    STATE(390), 1,
      aux_sym_json_repeat1,
  [2402] = 5,
    ACTIONS(378), 1,
      anon_sym_COMMA,
    ACTIONS(381), 1,
      sym__whitespace,
    ACTIONS(384), 1,
      anon_sym_RBRACK,
    STATE(106), 1,
      aux_sym_patterns_repeat1,
    STATE(440), 1,
      aux_sym_json_repeat1,
  [2418] = 5,
    ACTIONS(266), 1,
      anon_sym_COMMA,
    ACTIONS(386), 1,
      anon_sym_RBRACE,
    ACTIONS(388), 1,
      sym__whitespace,
    STATE(77), 1,
      aux_sym__pattern_repeat1,
    STATE(419), 1,
      aux_sym_json_repeat1,
  [2434] = 5,
    ACTIONS(266), 1,
      anon_sym_COMMA,
    ACTIONS(386), 1,
      anon_sym_RBRACE,
    ACTIONS(388), 1,
      sym__whitespace,
    STATE(78), 1,
      aux_sym__pattern_repeat1,
    STATE(419), 1,
      aux_sym_json_repeat1,
  [2450] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(390), 1,
      anon_sym_RBRACE,
    ACTIONS(392), 1,
      sym__whitespace,
    STATE(88), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(385), 1,
      aux_sym_json_repeat1,
  [2466] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(390), 1,
      anon_sym_RBRACE,
    ACTIONS(392), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(385), 1,
      aux_sym_json_repeat1,
  [2482] = 5,
    ACTIONS(99), 1,
      anon_sym_RBRACE,
    ACTIONS(394), 1,
      anon_sym_COMMA,
    ACTIONS(396), 1,
      sym__whitespace,
    STATE(172), 1,
      aux_sym_object_repeat1,
    STATE(285), 1,
      aux_sym_json_repeat1,
  [2498] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(99), 1,
      anon_sym_RBRACE,
    ACTIONS(398), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(173), 1,
      sym_item,
  [2514] = 5,
    ACTIONS(400), 1,
      anon_sym_COMMA,
    ACTIONS(402), 1,
      anon_sym_RBRACE,
    ACTIONS(404), 1,
      sym__whitespace,
    STATE(181), 1,
      aux_sym_json_repeat2,
    STATE(261), 1,
      aux_sym_json_repeat1,
  [2530] = 5,
    ACTIONS(406), 1,
      anon_sym_RBRACE,
    ACTIONS(408), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    STATE(143), 1,
      sym_capture,
    STATE(144), 1,
      aux_sym_json_repeat1,
  [2546] = 5,
    ACTIONS(398), 1,
      anon_sym_DQUOTE,
    ACTIONS(412), 1,
      anon_sym_RBRACE,
    ACTIONS(414), 1,
      sym__whitespace,
    STATE(176), 1,
      sym_item,
    STATE(177), 1,
      aux_sym_json_repeat1,
  [2562] = 5,
    ACTIONS(99), 1,
      anon_sym_RBRACK,
    ACTIONS(416), 1,
      anon_sym_COMMA,
    ACTIONS(418), 1,
      sym__whitespace,
    STATE(183), 1,
      aux_sym_array_repeat1,
    STATE(276), 1,
      aux_sym_json_repeat1,
  [2578] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(420), 1,
      anon_sym_RBRACE,
    ACTIONS(422), 1,
      sym__whitespace,
    STATE(91), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(383), 1,
      aux_sym_json_repeat1,
  [2594] = 5,
    ACTIONS(258), 1,
      anon_sym_DQUOTE,
    ACTIONS(424), 1,
      anon_sym_RBRACE,
    ACTIONS(426), 1,
      sym__whitespace,
    STATE(188), 1,
      sym_repo,
    STATE(189), 1,
      aux_sym_json_repeat1,
  [2610] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(420), 1,
      anon_sym_RBRACE,
    ACTIONS(422), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(383), 1,
      aux_sym_json_repeat1,
  [2626] = 5,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(428), 1,
      anon_sym_RBRACE,
    ACTIONS(430), 1,
      sym__whitespace,
    STATE(149), 1,
      sym_capture,
    STATE(150), 1,
      aux_sym_json_repeat1,
  [2642] = 5,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(432), 1,
      sym__whitespace,
    ACTIONS(434), 1,
      anon_sym_RBRACK,
    STATE(194), 1,
      sym__pattern,
    STATE(195), 1,
      aux_sym_json_repeat1,
  [2658] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(436), 1,
      anon_sym_RBRACE,
    ACTIONS(438), 1,
      sym__whitespace,
    STATE(94), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(380), 1,
      aux_sym_json_repeat1,
  [2674] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(436), 1,
      anon_sym_RBRACE,
    ACTIONS(438), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(380), 1,
      aux_sym_json_repeat1,
  [2690] = 5,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(440), 1,
      anon_sym_RBRACE,
    ACTIONS(442), 1,
      sym__whitespace,
    STATE(158), 1,
      sym_capture,
    STATE(159), 1,
      aux_sym_json_repeat1,
  [2706] = 5,
    ACTIONS(400), 1,
      anon_sym_COMMA,
    ACTIONS(402), 1,
      anon_sym_RBRACE,
    ACTIONS(404), 1,
      sym__whitespace,
    STATE(192), 1,
      aux_sym_json_repeat2,
    STATE(261), 1,
      aux_sym_json_repeat1,
  [2722] = 5,
    ACTIONS(218), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(444), 1,
      sym__whitespace,
    STATE(171), 1,
      aux_sym_injection_repeat1,
    STATE(289), 1,
      aux_sym_json_repeat1,
  [2738] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(258), 1,
      anon_sym_DQUOTE,
    ACTIONS(446), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(73), 1,
      sym_repo,
  [2754] = 5,
    ACTIONS(248), 1,
      anon_sym_COMMA,
    ACTIONS(446), 1,
      anon_sym_RBRACE,
    ACTIONS(448), 1,
      sym__whitespace,
    STATE(84), 1,
      aux_sym_repository_repeat1,
    STATE(400), 1,
      aux_sym_json_repeat1,
  [2770] = 5,
    ACTIONS(248), 1,
      anon_sym_COMMA,
    ACTIONS(446), 1,
      anon_sym_RBRACE,
    ACTIONS(448), 1,
      sym__whitespace,
    STATE(131), 1,
      aux_sym_repository_repeat1,
    STATE(400), 1,
      aux_sym_json_repeat1,
  [2786] = 5,
    ACTIONS(346), 1,
      anon_sym_COMMA,
    ACTIONS(450), 1,
      anon_sym_RBRACE,
    ACTIONS(452), 1,
      sym__whitespace,
    STATE(98), 1,
      aux_sym_captures_repeat1,
    STATE(373), 1,
      aux_sym_json_repeat1,
  [2802] = 5,
    ACTIONS(454), 1,
      anon_sym_COMMA,
    ACTIONS(457), 1,
      anon_sym_RBRACE,
    ACTIONS(459), 1,
      sym__whitespace,
    STATE(131), 1,
      aux_sym_repository_repeat1,
    STATE(491), 1,
      aux_sym_json_repeat1,
  [2818] = 5,
    ACTIONS(218), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(444), 1,
      sym__whitespace,
    STATE(174), 1,
      aux_sym_injection_repeat1,
    STATE(289), 1,
      aux_sym_json_repeat1,
  [2834] = 5,
    ACTIONS(344), 1,
      anon_sym_DQUOTE,
    ACTIONS(462), 1,
      anon_sym_RBRACE,
    ACTIONS(464), 1,
      sym__whitespace,
    STATE(204), 1,
      sym_injection,
    STATE(205), 1,
      aux_sym_json_repeat1,
  [2850] = 5,
    ACTIONS(346), 1,
      anon_sym_COMMA,
    ACTIONS(450), 1,
      anon_sym_RBRACE,
    ACTIONS(452), 1,
      sym__whitespace,
    STATE(193), 1,
      aux_sym_captures_repeat1,
    STATE(373), 1,
      aux_sym_json_repeat1,
  [2866] = 5,
    ACTIONS(184), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(466), 1,
      sym__whitespace,
    STATE(187), 1,
      aux_sym_injection_repeat1,
    STATE(278), 1,
      aux_sym_json_repeat1,
  [2882] = 5,
    ACTIONS(416), 1,
      anon_sym_COMMA,
    ACTIONS(468), 1,
      sym__whitespace,
    ACTIONS(470), 1,
      anon_sym_RBRACK,
    STATE(231), 1,
      aux_sym_array_repeat1,
    STATE(389), 1,
      aux_sym_json_repeat1,
  [2898] = 5,
    ACTIONS(394), 1,
      anon_sym_COMMA,
    ACTIONS(472), 1,
      anon_sym_RBRACE,
    ACTIONS(474), 1,
      sym__whitespace,
    STATE(222), 1,
      aux_sym_object_repeat1,
    STATE(387), 1,
      aux_sym_json_repeat1,
  [2914] = 5,
    ACTIONS(33), 1,
      anon_sym_DQUOTE,
    ACTIONS(63), 1,
      anon_sym_comment,
    ACTIONS(65), 1,
      anon_sym_SLASH_SLASH,
    ACTIONS(67), 1,
      sym__string_content,
    ACTIONS(476), 1,
      aux_sym_capture_token1,
  [2930] = 5,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(478), 1,
      anon_sym_RBRACE,
    ACTIONS(480), 1,
      sym__whitespace,
    STATE(105), 1,
      aux_sym_injection_repeat1,
    STATE(359), 1,
      aux_sym_json_repeat1,
  [2946] = 5,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(478), 1,
      anon_sym_RBRACE,
    ACTIONS(480), 1,
      sym__whitespace,
    STATE(171), 1,
      aux_sym_injection_repeat1,
    STATE(359), 1,
      aux_sym_json_repeat1,
  [2962] = 5,
    ACTIONS(188), 1,
      anon_sym_RBRACE,
    ACTIONS(346), 1,
      anon_sym_COMMA,
    ACTIONS(482), 1,
      sym__whitespace,
    STATE(233), 1,
      aux_sym_captures_repeat1,
    STATE(256), 1,
      aux_sym_json_repeat1,
  [2978] = 5,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(484), 1,
      anon_sym_RBRACE,
    ACTIONS(486), 1,
      sym__whitespace,
    STATE(171), 1,
      aux_sym_injection_repeat1,
    STATE(356), 1,
      aux_sym_json_repeat1,
  [2994] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(488), 1,
      anon_sym_RBRACE,
    ACTIONS(490), 1,
      sym__whitespace,
    STATE(227), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(237), 1,
      aux_sym_json_repeat1,
  [3010] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(488), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(224), 1,
      sym_capture,
  [3026] = 5,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(492), 1,
      sym__whitespace,
    ACTIONS(494), 1,
      anon_sym_RBRACK,
    STATE(210), 1,
      sym__string,
    STATE(211), 1,
      aux_sym_json_repeat1,
  [3042] = 5,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(488), 1,
      anon_sym_RBRACE,
    ACTIONS(496), 1,
      sym__whitespace,
    STATE(221), 1,
      aux_sym_json_repeat1,
    STATE(224), 1,
      sym_capture,
  [3058] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(498), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(109), 1,
      sym_capture,
  [3074] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(498), 1,
      anon_sym_RBRACE,
    ACTIONS(500), 1,
      sym__whitespace,
    STATE(110), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(342), 1,
      aux_sym_json_repeat1,
  [3090] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(502), 1,
      anon_sym_RBRACE,
    ACTIONS(504), 1,
      sym__whitespace,
    STATE(219), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(255), 1,
      aux_sym_json_repeat1,
  [3106] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(502), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(218), 1,
      sym_capture,
  [3122] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(498), 1,
      anon_sym_RBRACE,
    ACTIONS(500), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(342), 1,
      aux_sym_json_repeat1,
  [3138] = 5,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(502), 1,
      anon_sym_RBRACE,
    ACTIONS(506), 1,
      sym__whitespace,
    STATE(217), 1,
      aux_sym_json_repeat1,
    STATE(218), 1,
      sym_capture,
  [3154] = 5,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(508), 1,
      sym__whitespace,
    ACTIONS(510), 1,
      anon_sym_RBRACK,
    STATE(90), 1,
      aux_sym_json_repeat1,
    STATE(92), 1,
      sym__string,
  [3170] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(510), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(92), 1,
      sym__string,
  [3186] = 5,
    ACTIONS(260), 1,
      anon_sym_COMMA,
    ACTIONS(510), 1,
      anon_sym_RBRACK,
    ACTIONS(512), 1,
      sym__whitespace,
    STATE(93), 1,
      aux_sym_fileTypes_repeat1,
    STATE(379), 1,
      aux_sym_json_repeat1,
  [3202] = 5,
    ACTIONS(260), 1,
      anon_sym_COMMA,
    ACTIONS(510), 1,
      anon_sym_RBRACK,
    ACTIONS(512), 1,
      sym__whitespace,
    STATE(95), 1,
      aux_sym_fileTypes_repeat1,
    STATE(379), 1,
      aux_sym_json_repeat1,
  [3218] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(514), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(117), 1,
      sym_capture,
  [3234] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(516), 1,
      anon_sym_RBRACE,
    ACTIONS(518), 1,
      sym__whitespace,
    STATE(215), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(243), 1,
      aux_sym_json_repeat1,
  [3250] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(516), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(214), 1,
      sym_capture,
  [3266] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(514), 1,
      anon_sym_RBRACE,
    ACTIONS(520), 1,
      sym__whitespace,
    STATE(119), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(341), 1,
      aux_sym_json_repeat1,
  [3282] = 5,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(516), 1,
      anon_sym_RBRACE,
    ACTIONS(522), 1,
      sym__whitespace,
    STATE(213), 1,
      aux_sym_json_repeat1,
    STATE(214), 1,
      sym_capture,
  [3298] = 5,
    ACTIONS(344), 1,
      anon_sym_DQUOTE,
    ACTIONS(524), 1,
      anon_sym_RBRACE,
    ACTIONS(526), 1,
      sym__whitespace,
    STATE(97), 1,
      aux_sym_json_repeat1,
    STATE(99), 1,
      sym_injection,
  [3314] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(514), 1,
      anon_sym_RBRACE,
    ACTIONS(520), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(341), 1,
      aux_sym_json_repeat1,
  [3330] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(344), 1,
      anon_sym_DQUOTE,
    ACTIONS(524), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(99), 1,
      sym_injection,
  [3346] = 5,
    ACTIONS(280), 1,
      anon_sym_COMMA,
    ACTIONS(524), 1,
      anon_sym_RBRACE,
    ACTIONS(528), 1,
      sym__whitespace,
    STATE(100), 1,
      aux_sym_injections_repeat1,
    STATE(370), 1,
      aux_sym_json_repeat1,
  [3362] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(530), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(122), 1,
      sym_capture,
  [3378] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(530), 1,
      anon_sym_RBRACE,
    ACTIONS(532), 1,
      sym__whitespace,
    STATE(123), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(340), 1,
      aux_sym_json_repeat1,
  [3394] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(530), 1,
      anon_sym_RBRACE,
    ACTIONS(532), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(340), 1,
      aux_sym_json_repeat1,
  [3410] = 5,
    ACTIONS(280), 1,
      anon_sym_COMMA,
    ACTIONS(524), 1,
      anon_sym_RBRACE,
    ACTIONS(528), 1,
      sym__whitespace,
    STATE(101), 1,
      aux_sym_injections_repeat1,
    STATE(370), 1,
      aux_sym_json_repeat1,
  [3426] = 5,
    ACTIONS(534), 1,
      anon_sym_COMMA,
    ACTIONS(537), 1,
      anon_sym_RBRACE,
    ACTIONS(539), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(746), 1,
      aux_sym_json_repeat1,
  [3442] = 5,
    ACTIONS(542), 1,
      anon_sym_COMMA,
    ACTIONS(545), 1,
      anon_sym_RBRACE,
    ACTIONS(547), 1,
      sym__whitespace,
    STATE(171), 1,
      aux_sym_injection_repeat1,
    STATE(683), 1,
      aux_sym_json_repeat1,
  [3458] = 5,
    ACTIONS(394), 1,
      anon_sym_COMMA,
    ACTIONS(550), 1,
      anon_sym_RBRACE,
    ACTIONS(552), 1,
      sym__whitespace,
    STATE(222), 1,
      aux_sym_object_repeat1,
    STATE(332), 1,
      aux_sym_json_repeat1,
  [3474] = 5,
    ACTIONS(394), 1,
      anon_sym_COMMA,
    ACTIONS(550), 1,
      anon_sym_RBRACE,
    ACTIONS(552), 1,
      sym__whitespace,
    STATE(223), 1,
      aux_sym_object_repeat1,
    STATE(332), 1,
      aux_sym_json_repeat1,
  [3490] = 5,
    ACTIONS(196), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(554), 1,
      sym__whitespace,
    STATE(171), 1,
      aux_sym_injection_repeat1,
    STATE(264), 1,
      aux_sym_json_repeat1,
  [3506] = 5,
    ACTIONS(196), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(554), 1,
      sym__whitespace,
    STATE(208), 1,
      aux_sym_injection_repeat1,
    STATE(264), 1,
      aux_sym_json_repeat1,
  [3522] = 5,
    ACTIONS(394), 1,
      anon_sym_COMMA,
    ACTIONS(556), 1,
      anon_sym_RBRACE,
    ACTIONS(558), 1,
      sym__whitespace,
    STATE(225), 1,
      aux_sym_object_repeat1,
    STATE(242), 1,
      aux_sym_json_repeat1,
  [3538] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(398), 1,
      anon_sym_DQUOTE,
    ACTIONS(556), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(226), 1,
      sym_item,
  [3554] = 5,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(560), 1,
      sym__whitespace,
    ACTIONS(562), 1,
      anon_sym_RBRACK,
    STATE(102), 1,
      aux_sym_json_repeat1,
    STATE(103), 1,
      sym__pattern,
  [3570] = 5,
    ACTIONS(113), 1,
      anon_sym_RBRACK,
    ACTIONS(416), 1,
      anon_sym_COMMA,
    ACTIONS(564), 1,
      sym__whitespace,
    STATE(228), 1,
      aux_sym_array_repeat1,
    STATE(246), 1,
      aux_sym_json_repeat1,
  [3586] = 5,
    ACTIONS(119), 1,
      anon_sym_RBRACE,
    ACTIONS(398), 1,
      anon_sym_DQUOTE,
    ACTIONS(566), 1,
      sym__whitespace,
    STATE(111), 1,
      sym_item,
    STATE(112), 1,
      aux_sym_json_repeat1,
  [3602] = 5,
    ACTIONS(400), 1,
      anon_sym_COMMA,
    ACTIONS(568), 1,
      anon_sym_RBRACE,
    ACTIONS(570), 1,
      sym__whitespace,
    STATE(192), 1,
      aux_sym_json_repeat2,
    STATE(350), 1,
      aux_sym_json_repeat1,
  [3618] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(562), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(103), 1,
      sym__pattern,
  [3634] = 5,
    ACTIONS(416), 1,
      anon_sym_COMMA,
    ACTIONS(550), 1,
      anon_sym_RBRACK,
    ACTIONS(572), 1,
      sym__whitespace,
    STATE(231), 1,
      aux_sym_array_repeat1,
    STATE(252), 1,
      aux_sym_json_repeat1,
  [3650] = 5,
    ACTIONS(416), 1,
      anon_sym_COMMA,
    ACTIONS(550), 1,
      anon_sym_RBRACK,
    ACTIONS(572), 1,
      sym__whitespace,
    STATE(232), 1,
      aux_sym_array_repeat1,
    STATE(252), 1,
      aux_sym_json_repeat1,
  [3666] = 5,
    ACTIONS(286), 1,
      anon_sym_COMMA,
    ACTIONS(574), 1,
      sym__whitespace,
    ACTIONS(576), 1,
      anon_sym_RBRACK,
    STATE(104), 1,
      aux_sym_patterns_repeat1,
    STATE(358), 1,
      aux_sym_json_repeat1,
  [3682] = 5,
    ACTIONS(214), 1,
      anon_sym_RBRACE,
    ACTIONS(346), 1,
      anon_sym_COMMA,
    ACTIONS(578), 1,
      sym__whitespace,
    STATE(134), 1,
      aux_sym_captures_repeat1,
    STATE(328), 1,
      aux_sym_json_repeat1,
  [3698] = 5,
    ACTIONS(198), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(580), 1,
      sym__whitespace,
    STATE(171), 1,
      aux_sym_injection_repeat1,
    STATE(245), 1,
      aux_sym_json_repeat1,
  [3714] = 5,
    ACTIONS(248), 1,
      anon_sym_COMMA,
    ACTIONS(582), 1,
      anon_sym_RBRACE,
    ACTIONS(584), 1,
      sym__whitespace,
    STATE(234), 1,
      aux_sym_repository_repeat1,
    STATE(260), 1,
      aux_sym_json_repeat1,
  [3730] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(258), 1,
      anon_sym_DQUOTE,
    ACTIONS(582), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(235), 1,
      sym_repo,
  [3746] = 5,
    ACTIONS(258), 1,
      anon_sym_DQUOTE,
    ACTIONS(582), 1,
      anon_sym_RBRACE,
    ACTIONS(586), 1,
      sym__whitespace,
    STATE(235), 1,
      sym_repo,
    STATE(236), 1,
      aux_sym_json_repeat1,
  [3762] = 5,
    ACTIONS(214), 1,
      anon_sym_RBRACE,
    ACTIONS(346), 1,
      anon_sym_COMMA,
    ACTIONS(578), 1,
      sym__whitespace,
    STATE(193), 1,
      aux_sym_captures_repeat1,
    STATE(328), 1,
      aux_sym_json_repeat1,
  [3778] = 5,
    ACTIONS(588), 1,
      anon_sym_COMMA,
    ACTIONS(591), 1,
      anon_sym_RBRACE,
    ACTIONS(593), 1,
      sym__whitespace,
    STATE(192), 1,
      aux_sym_json_repeat2,
    STATE(761), 1,
      aux_sym_json_repeat1,
  [3794] = 5,
    ACTIONS(596), 1,
      anon_sym_COMMA,
    ACTIONS(599), 1,
      anon_sym_RBRACE,
    ACTIONS(601), 1,
      sym__whitespace,
    STATE(193), 1,
      aux_sym_captures_repeat1,
    STATE(739), 1,
      aux_sym_json_repeat1,
  [3810] = 5,
    ACTIONS(286), 1,
      anon_sym_COMMA,
    ACTIONS(604), 1,
      sym__whitespace,
    ACTIONS(606), 1,
      anon_sym_RBRACK,
    STATE(197), 1,
      aux_sym_patterns_repeat1,
    STATE(271), 1,
      aux_sym_json_repeat1,
  [3826] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(608), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(185), 1,
      sym__pattern,
  [3842] = 5,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(608), 1,
      anon_sym_RBRACK,
    ACTIONS(610), 1,
      sym__whitespace,
    STATE(182), 1,
      aux_sym_json_repeat1,
    STATE(185), 1,
      sym__pattern,
  [3858] = 5,
    ACTIONS(286), 1,
      anon_sym_COMMA,
    ACTIONS(612), 1,
      sym__whitespace,
    ACTIONS(614), 1,
      anon_sym_RBRACK,
    STATE(106), 1,
      aux_sym_patterns_repeat1,
    STATE(355), 1,
      aux_sym_json_repeat1,
  [3874] = 5,
    ACTIONS(19), 1,
      anon_sym_RBRACE,
    ACTIONS(400), 1,
      anon_sym_COMMA,
    ACTIONS(616), 1,
      sym__whitespace,
    STATE(125), 1,
      aux_sym_json_repeat2,
    STATE(325), 1,
      aux_sym_json_repeat1,
  [3890] = 5,
    ACTIONS(198), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(580), 1,
      sym__whitespace,
    STATE(203), 1,
      aux_sym_injection_repeat1,
    STATE(245), 1,
      aux_sym_json_repeat1,
  [3906] = 5,
    ACTIONS(23), 1,
      anon_sym_RBRACE,
    ACTIONS(266), 1,
      anon_sym_COMMA,
    ACTIONS(618), 1,
      sym__whitespace,
    STATE(108), 1,
      aux_sym__pattern_repeat1,
    STATE(348), 1,
      aux_sym_json_repeat1,
  [3922] = 3,
    STATE(201), 1,
      aux_sym__includeScope,
    ACTIONS(620), 2,
      anon_sym_DQUOTE,
      anon_sym_POUND,
    ACTIONS(622), 2,
      aux_sym__includeScope_token1,
      aux_sym__includeScope_token2,
  [3934] = 5,
    ACTIONS(216), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(625), 1,
      sym__whitespace,
    STATE(140), 1,
      aux_sym_injection_repeat1,
    STATE(306), 1,
      aux_sym_json_repeat1,
  [3950] = 5,
    ACTIONS(216), 1,
      anon_sym_RBRACE,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(625), 1,
      sym__whitespace,
    STATE(171), 1,
      aux_sym_injection_repeat1,
    STATE(306), 1,
      aux_sym_json_repeat1,
  [3966] = 5,
    ACTIONS(280), 1,
      anon_sym_COMMA,
    ACTIONS(627), 1,
      anon_sym_RBRACE,
    ACTIONS(629), 1,
      sym__whitespace,
    STATE(169), 1,
      aux_sym_injections_repeat1,
    STATE(284), 1,
      aux_sym_json_repeat1,
  [3982] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(344), 1,
      anon_sym_DQUOTE,
    ACTIONS(627), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(165), 1,
      sym_injection,
  [3998] = 5,
    ACTIONS(344), 1,
      anon_sym_DQUOTE,
    ACTIONS(627), 1,
      anon_sym_RBRACE,
    ACTIONS(631), 1,
      sym__whitespace,
    STATE(164), 1,
      aux_sym_json_repeat1,
    STATE(165), 1,
      sym_injection,
  [4014] = 5,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(633), 1,
      anon_sym_RBRACE,
    ACTIONS(635), 1,
      sym__whitespace,
    STATE(142), 1,
      aux_sym_injection_repeat1,
    STATE(303), 1,
      aux_sym_json_repeat1,
  [4030] = 5,
    ACTIONS(304), 1,
      anon_sym_COMMA,
    ACTIONS(633), 1,
      anon_sym_RBRACE,
    ACTIONS(635), 1,
      sym__whitespace,
    STATE(171), 1,
      aux_sym_injection_repeat1,
    STATE(303), 1,
      aux_sym_json_repeat1,
  [4046] = 5,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(637), 1,
      anon_sym_RBRACE,
    ACTIONS(639), 1,
      sym__whitespace,
    STATE(147), 1,
      aux_sym_json_repeat1,
    STATE(148), 1,
      sym_capture,
  [4062] = 5,
    ACTIONS(260), 1,
      anon_sym_COMMA,
    ACTIONS(641), 1,
      sym__whitespace,
    ACTIONS(643), 1,
      anon_sym_RBRACK,
    STATE(156), 1,
      aux_sym_fileTypes_repeat1,
    STATE(294), 1,
      aux_sym_json_repeat1,
  [4078] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(643), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(155), 1,
      sym__string,
  [4094] = 5,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(643), 1,
      anon_sym_RBRACK,
    ACTIONS(645), 1,
      sym__whitespace,
    STATE(154), 1,
      aux_sym_json_repeat1,
    STATE(155), 1,
      sym__string,
  [4110] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(637), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(148), 1,
      sym_capture,
  [4126] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(637), 1,
      anon_sym_RBRACE,
    ACTIONS(647), 1,
      sym__whitespace,
    STATE(151), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(266), 1,
      aux_sym_json_repeat1,
  [4142] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(637), 1,
      anon_sym_RBRACE,
    ACTIONS(647), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(266), 1,
      aux_sym_json_repeat1,
  [4158] = 5,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(649), 1,
      anon_sym_RBRACE,
    ACTIONS(651), 1,
      sym__whitespace,
    STATE(157), 1,
      aux_sym_json_repeat1,
    STATE(160), 1,
      sym_capture,
  [4174] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(649), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(160), 1,
      sym_capture,
  [4190] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(649), 1,
      anon_sym_RBRACE,
    ACTIONS(653), 1,
      sym__whitespace,
    STATE(163), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(287), 1,
      aux_sym_json_repeat1,
  [4206] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(649), 1,
      anon_sym_RBRACE,
    ACTIONS(653), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(287), 1,
      aux_sym_json_repeat1,
  [4222] = 5,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(655), 1,
      anon_sym_RBRACE,
    ACTIONS(657), 1,
      sym__whitespace,
    STATE(166), 1,
      aux_sym_json_repeat1,
    STATE(167), 1,
      sym_capture,
  [4238] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(655), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(167), 1,
      sym_capture,
  [4254] = 5,
    ACTIONS(659), 1,
      anon_sym_COMMA,
    ACTIONS(662), 1,
      anon_sym_RBRACE,
    ACTIONS(664), 1,
      sym__whitespace,
    STATE(222), 1,
      aux_sym_object_repeat1,
    STATE(597), 1,
      aux_sym_json_repeat1,
  [4270] = 5,
    ACTIONS(394), 1,
      anon_sym_COMMA,
    ACTIONS(667), 1,
      anon_sym_RBRACE,
    ACTIONS(669), 1,
      sym__whitespace,
    STATE(222), 1,
      aux_sym_object_repeat1,
    STATE(310), 1,
      aux_sym_json_repeat1,
  [4286] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(655), 1,
      anon_sym_RBRACE,
    ACTIONS(671), 1,
      sym__whitespace,
    STATE(168), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(280), 1,
      aux_sym_json_repeat1,
  [4302] = 5,
    ACTIONS(394), 1,
      anon_sym_COMMA,
    ACTIONS(673), 1,
      anon_sym_RBRACE,
    ACTIONS(675), 1,
      sym__whitespace,
    STATE(222), 1,
      aux_sym_object_repeat1,
    STATE(312), 1,
      aux_sym_json_repeat1,
  [4318] = 5,
    ACTIONS(394), 1,
      anon_sym_COMMA,
    ACTIONS(673), 1,
      anon_sym_RBRACE,
    ACTIONS(675), 1,
      sym__whitespace,
    STATE(137), 1,
      aux_sym_object_repeat1,
    STATE(312), 1,
      aux_sym_json_repeat1,
  [4334] = 5,
    ACTIONS(308), 1,
      anon_sym_COMMA,
    ACTIONS(655), 1,
      anon_sym_RBRACE,
    ACTIONS(671), 1,
      sym__whitespace,
    STATE(170), 1,
      aux_sym_beginCaptures_repeat1,
    STATE(280), 1,
      aux_sym_json_repeat1,
  [4350] = 5,
    ACTIONS(416), 1,
      anon_sym_COMMA,
    ACTIONS(677), 1,
      sym__whitespace,
    ACTIONS(679), 1,
      anon_sym_RBRACK,
    STATE(231), 1,
      aux_sym_array_repeat1,
    STATE(315), 1,
      aux_sym_json_repeat1,
  [4366] = 5,
    ACTIONS(416), 1,
      anon_sym_COMMA,
    ACTIONS(677), 1,
      sym__whitespace,
    ACTIONS(679), 1,
      anon_sym_RBRACK,
    STATE(136), 1,
      aux_sym_array_repeat1,
    STATE(315), 1,
      aux_sym_json_repeat1,
  [4382] = 5,
    ACTIONS(206), 1,
      anon_sym_RBRACE,
    ACTIONS(346), 1,
      anon_sym_COMMA,
    ACTIONS(681), 1,
      sym__whitespace,
    STATE(191), 1,
      aux_sym_captures_repeat1,
    STATE(273), 1,
      aux_sym_json_repeat1,
  [4398] = 5,
    ACTIONS(683), 1,
      anon_sym_COMMA,
    ACTIONS(686), 1,
      sym__whitespace,
    ACTIONS(689), 1,
      anon_sym_RBRACK,
    STATE(231), 1,
      aux_sym_array_repeat1,
    STATE(587), 1,
      aux_sym_json_repeat1,
  [4414] = 5,
    ACTIONS(416), 1,
      anon_sym_COMMA,
    ACTIONS(667), 1,
      anon_sym_RBRACK,
    ACTIONS(691), 1,
      sym__whitespace,
    STATE(231), 1,
      aux_sym_array_repeat1,
    STATE(320), 1,
      aux_sym_json_repeat1,
  [4430] = 5,
    ACTIONS(206), 1,
      anon_sym_RBRACE,
    ACTIONS(346), 1,
      anon_sym_COMMA,
    ACTIONS(681), 1,
      sym__whitespace,
    STATE(193), 1,
      aux_sym_captures_repeat1,
    STATE(273), 1,
      aux_sym_json_repeat1,
  [4446] = 5,
    ACTIONS(248), 1,
      anon_sym_COMMA,
    ACTIONS(254), 1,
      anon_sym_RBRACE,
    ACTIONS(693), 1,
      sym__whitespace,
    STATE(131), 1,
      aux_sym_repository_repeat1,
    STATE(329), 1,
      aux_sym_json_repeat1,
  [4462] = 5,
    ACTIONS(248), 1,
      anon_sym_COMMA,
    ACTIONS(254), 1,
      anon_sym_RBRACE,
    ACTIONS(693), 1,
      sym__whitespace,
    STATE(129), 1,
      aux_sym_repository_repeat1,
    STATE(329), 1,
      aux_sym_json_repeat1,
  [4478] = 5,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(254), 1,
      anon_sym_RBRACE,
    ACTIONS(258), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(128), 1,
      sym_repo,
  [4494] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(655), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4507] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(697), 1,
      sym__whitespace,
    STATE(267), 1,
      aux_sym_json_repeat1,
    STATE(698), 1,
      sym__string,
  [4520] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(430), 1,
      sym__string,
  [4533] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(620), 1,
      sym__string,
  [4546] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(615), 1,
      sym__string,
  [4559] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(673), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4572] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(637), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4585] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(614), 1,
      sym__string,
  [4598] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(216), 1,
      anon_sym_RBRACE,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4611] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(679), 1,
      anon_sym_RBRACK,
    ACTIONS(703), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4624] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(613), 1,
      sym__string,
  [4637] = 3,
    ACTIONS(705), 1,
      anon_sym_DQUOTE,
    STATE(281), 1,
      aux_sym_repo_repeat1,
    ACTIONS(707), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4648] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(294), 1,
      anon_sym_RBRACK,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4661] = 4,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(711), 1,
      sym__whitespace,
    STATE(275), 1,
      aux_sym_json_repeat1,
    STATE(705), 1,
      sym_capture,
  [4674] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(610), 1,
      sym__string,
  [4687] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(667), 1,
      anon_sym_RBRACK,
    ACTIONS(703), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4700] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(628), 1,
      sym__string,
  [4713] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(633), 1,
      sym__string,
  [4726] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(649), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4739] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(206), 1,
      anon_sym_RBRACE,
    ACTIONS(713), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4752] = 3,
    ACTIONS(715), 1,
      anon_sym_DQUOTE,
    STATE(324), 1,
      aux_sym_repo_repeat1,
    ACTIONS(707), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4763] = 4,
    ACTIONS(258), 1,
      anon_sym_DQUOTE,
    ACTIONS(717), 1,
      sym__whitespace,
    STATE(326), 1,
      aux_sym_json_repeat1,
    STATE(570), 1,
      sym_repo,
  [4776] = 3,
    ACTIONS(719), 1,
      anon_sym_DQUOTE,
    STATE(270), 1,
      aux_sym_repo_repeat1,
    ACTIONS(707), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4787] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(254), 1,
      anon_sym_RBRACE,
    ACTIONS(721), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4800] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(568), 1,
      anon_sym_RBRACE,
    ACTIONS(723), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4813] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(398), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(602), 1,
      sym_item,
  [4826] = 4,
    ACTIONS(398), 1,
      anon_sym_DQUOTE,
    ACTIONS(725), 1,
      sym__whitespace,
    STATE(307), 1,
      aux_sym_json_repeat1,
    STATE(602), 1,
      sym_item,
  [4839] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(633), 1,
      anon_sym_RBRACE,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4852] = 1,
    ACTIONS(727), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [4859] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(498), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4872] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(634), 1,
      sym__string,
  [4885] = 3,
    ACTIONS(729), 1,
      anon_sym_DQUOTE,
    STATE(324), 1,
      aux_sym_repo_repeat1,
    ACTIONS(707), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4896] = 4,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(731), 1,
      sym__whitespace,
    STATE(352), 1,
      aux_sym_json_repeat1,
    STATE(537), 1,
      sym__pattern,
  [4909] = 3,
    ACTIONS(733), 1,
      anon_sym_DQUOTE,
    STATE(324), 1,
      aux_sym_repo_repeat1,
    ACTIONS(707), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4920] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(614), 1,
      anon_sym_RBRACK,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4933] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(429), 1,
      sym__string,
  [4946] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(214), 1,
      anon_sym_RBRACE,
    ACTIONS(713), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4959] = 3,
    ACTIONS(735), 1,
      anon_sym_DQUOTE,
    STATE(257), 1,
      aux_sym_repo_repeat1,
    ACTIONS(707), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [4970] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(743), 1,
      sym_capture,
  [4983] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(550), 1,
      anon_sym_RBRACK,
    ACTIONS(703), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [4996] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(344), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(508), 1,
      sym_injection,
  [5009] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(198), 1,
      anon_sym_RBRACE,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5022] = 4,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    ACTIONS(737), 1,
      sym__whitespace,
    STATE(334), 1,
      aux_sym_json_repeat1,
    STATE(743), 1,
      sym_capture,
  [5035] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(530), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5048] = 3,
    ACTIONS(739), 1,
      anon_sym_DQUOTE,
    STATE(324), 1,
      aux_sym_repo_repeat1,
    ACTIONS(707), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [5059] = 4,
    ACTIONS(344), 1,
      anon_sym_DQUOTE,
    ACTIONS(741), 1,
      sym__whitespace,
    STATE(367), 1,
      aux_sym_json_repeat1,
    STATE(526), 1,
      sym_injection,
  [5072] = 1,
    ACTIONS(743), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5079] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(524), 1,
      anon_sym_RBRACE,
    ACTIONS(745), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5092] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(550), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5105] = 4,
    ACTIONS(398), 1,
      anon_sym_DQUOTE,
    ACTIONS(747), 1,
      sym__whitespace,
    STATE(262), 1,
      aux_sym_json_repeat1,
    STATE(669), 1,
      sym_item,
  [5118] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(514), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5131] = 1,
    ACTIONS(749), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5138] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(196), 1,
      anon_sym_RBRACE,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5151] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(751), 1,
      sym__whitespace,
    STATE(251), 1,
      aux_sym_json_repeat1,
    STATE(673), 1,
      sym__string,
  [5164] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(673), 1,
      sym__string,
  [5177] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(753), 1,
      sym__whitespace,
    STATE(376), 1,
      aux_sym_json_repeat1,
    STATE(520), 1,
      sym__string,
  [5190] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(755), 1,
      sym__whitespace,
    STATE(247), 1,
      aux_sym_json_repeat1,
    STATE(566), 1,
      sym__string,
  [5203] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(510), 1,
      anon_sym_RBRACK,
    ACTIONS(757), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5216] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(566), 1,
      sym__string,
  [5229] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(759), 1,
      sym__whitespace,
    STATE(244), 1,
      aux_sym_json_repeat1,
    STATE(676), 1,
      sym__string,
  [5242] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(676), 1,
      sym__string,
  [5255] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(461), 1,
      sym__pattern,
  [5268] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(761), 1,
      sym__whitespace,
    STATE(241), 1,
      aux_sym_json_repeat1,
    STATE(677), 1,
      sym__string,
  [5281] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(677), 1,
      sym__string,
  [5294] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(763), 1,
      sym__whitespace,
    STATE(239), 1,
      aux_sym_json_repeat1,
    STATE(678), 1,
      sym__string,
  [5307] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(678), 1,
      sym__string,
  [5320] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(484), 1,
      anon_sym_RBRACE,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5333] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(765), 1,
      sym__whitespace,
    STATE(240), 1,
      aux_sym_json_repeat1,
    STATE(685), 1,
      sym__string,
  [5346] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(685), 1,
      sym__string,
  [5359] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(478), 1,
      anon_sym_RBRACE,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5372] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(398), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(515), 1,
      sym_item,
  [5385] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(651), 1,
      sym__string,
  [5398] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(650), 1,
      sym__string,
  [5411] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    ACTIONS(767), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5424] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(649), 1,
      sym__string,
  [5437] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(472), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5450] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(769), 1,
      sym__whitespace,
    STATE(253), 1,
      aux_sym_json_repeat1,
    STATE(688), 1,
      sym__string,
  [5463] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(648), 1,
      sym__string,
  [5476] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(470), 1,
      anon_sym_RBRACK,
    ACTIONS(703), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5489] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(688), 1,
      sym__string,
  [5502] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(647), 1,
      sym__string,
  [5515] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(646), 1,
      sym__string,
  [5528] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(757), 1,
      anon_sym_COMMA,
    ACTIONS(771), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5541] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(703), 1,
      anon_sym_COMMA,
    ACTIONS(767), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5554] = 4,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(773), 1,
      sym__whitespace,
    STATE(392), 1,
      aux_sym_json_repeat1,
    STATE(500), 1,
      sym__pattern,
  [5567] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(745), 1,
      anon_sym_COMMA,
    ACTIONS(775), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5580] = 4,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(777), 1,
      sym__whitespace,
    STATE(361), 1,
      aux_sym_json_repeat1,
    STATE(762), 1,
      sym__pattern,
  [5593] = 3,
    ACTIONS(779), 1,
      anon_sym_DQUOTE,
    STATE(324), 1,
      aux_sym_repo_repeat1,
    ACTIONS(781), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [5604] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(402), 1,
      anon_sym_RBRACE,
    ACTIONS(723), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5617] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(258), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(497), 1,
      sym_repo,
  [5630] = 4,
    ACTIONS(258), 1,
      anon_sym_DQUOTE,
    ACTIONS(784), 1,
      sym__whitespace,
    STATE(397), 1,
      aux_sym_json_repeat1,
    STATE(497), 1,
      sym_repo,
  [5643] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(450), 1,
      anon_sym_RBRACE,
    ACTIONS(713), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5656] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(446), 1,
      anon_sym_RBRACE,
    ACTIONS(721), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5669] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(786), 1,
      sym__whitespace,
    STATE(254), 1,
      aux_sym_json_repeat1,
    STATE(695), 1,
      sym__string,
  [5682] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(695), 1,
      sym__string,
  [5695] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(667), 1,
      anon_sym_RBRACE,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5708] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(698), 1,
      sym__string,
  [5721] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(410), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(660), 1,
      sym_capture,
  [5734] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(218), 1,
      anon_sym_RBRACE,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5747] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(788), 1,
      sym__whitespace,
    STATE(272), 1,
      aux_sym_json_repeat1,
    STATE(700), 1,
      sym__string,
  [5760] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    ACTIONS(790), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5773] = 1,
    ACTIONS(792), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5780] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(700), 1,
      sym__string,
  [5793] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(436), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5806] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(420), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5819] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(390), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5832] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(794), 1,
      sym__whitespace,
    STATE(308), 1,
      aux_sym_json_repeat1,
    STATE(596), 1,
      sym__string,
  [5845] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(596), 1,
      sym__string,
  [5858] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(796), 1,
      sym__whitespace,
    STATE(309), 1,
      aux_sym_json_repeat1,
    STATE(594), 1,
      sym__string,
  [5871] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(594), 1,
      sym__string,
  [5884] = 1,
    ACTIONS(798), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5891] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(386), 1,
      anon_sym_RBRACE,
    ACTIONS(800), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5904] = 1,
    ACTIONS(802), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [5911] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(723), 1,
      anon_sym_COMMA,
    ACTIONS(804), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5924] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(806), 1,
      sym__whitespace,
    STATE(311), 1,
      aux_sym_json_repeat1,
    STATE(592), 1,
      sym__string,
  [5937] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(438), 1,
      sym__pattern,
  [5950] = 4,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(808), 1,
      sym__whitespace,
    STATE(423), 1,
      aux_sym_json_repeat1,
    STATE(438), 1,
      sym__pattern,
  [5963] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(592), 1,
      sym__string,
  [5976] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    ACTIONS(810), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [5989] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    ACTIONS(812), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6002] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(814), 1,
      sym__whitespace,
    STATE(314), 1,
      aux_sym_json_repeat1,
    STATE(590), 1,
      sym__string,
  [6015] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(372), 1,
      anon_sym_RBRACK,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6028] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(374), 1,
      anon_sym_RBRACE,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6041] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(590), 1,
      sym__string,
  [6054] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(603), 1,
      sym__pattern,
  [6067] = 4,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(816), 1,
      sym__whitespace,
    STATE(401), 1,
      aux_sym_json_repeat1,
    STATE(603), 1,
      sym__pattern,
  [6080] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(818), 1,
      sym__whitespace,
    STATE(317), 1,
      aux_sym_json_repeat1,
    STATE(588), 1,
      sym__string,
  [6093] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(588), 1,
      sym__string,
  [6106] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(820), 1,
      sym__whitespace,
    STATE(318), 1,
      aux_sym_json_repeat1,
    STATE(586), 1,
      sym__string,
  [6119] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(586), 1,
      sym__string,
  [6132] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(344), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(449), 1,
      sym_injection,
  [6145] = 4,
    ACTIONS(344), 1,
      anon_sym_DQUOTE,
    ACTIONS(822), 1,
      sym__whitespace,
    STATE(277), 1,
      aux_sym_json_repeat1,
    STATE(449), 1,
      sym_injection,
  [6158] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(721), 1,
      anon_sym_COMMA,
    ACTIONS(824), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6171] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(342), 1,
      anon_sym_RBRACE,
    ACTIONS(745), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6184] = 4,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(826), 1,
      sym__whitespace,
    STATE(408), 1,
      aux_sym_json_repeat1,
    STATE(584), 1,
      sym__pattern,
  [6197] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(828), 1,
      sym__whitespace,
    STATE(291), 1,
      aux_sym_json_repeat1,
    STATE(718), 1,
      sym__string,
  [6210] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(348), 1,
      anon_sym_RBRACE,
    ACTIONS(713), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6223] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(830), 1,
      sym__whitespace,
    STATE(295), 1,
      aux_sym_json_repeat1,
    STATE(720), 1,
      sym__string,
  [6236] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(578), 1,
      sym__pattern,
  [6249] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(452), 1,
      sym__string,
  [6262] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(832), 1,
      sym__whitespace,
    STATE(415), 1,
      aux_sym_json_repeat1,
    STATE(452), 1,
      sym__string,
  [6275] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(834), 1,
      sym__whitespace,
    STATE(297), 1,
      aux_sym_json_repeat1,
    STATE(721), 1,
      sym__string,
  [6288] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(318), 1,
      anon_sym_RBRACK,
    ACTIONS(757), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6301] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(326), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6314] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(836), 1,
      sym__whitespace,
    STATE(300), 1,
      aux_sym_json_repeat1,
    STATE(722), 1,
      sym__string,
  [6327] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(838), 1,
      sym__whitespace,
    STATE(302), 1,
      aux_sym_json_repeat1,
    STATE(723), 1,
      sym__string,
  [6340] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(320), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6353] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(340), 1,
      anon_sym_RBRACK,
    ACTIONS(757), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6366] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(310), 1,
      anon_sym_RBRACE,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6379] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(314), 1,
      anon_sym_RBRACE,
    ACTIONS(745), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6392] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    ACTIONS(840), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6405] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(842), 1,
      sym__whitespace,
    STATE(305), 1,
      aux_sym_json_repeat1,
    STATE(729), 1,
      sym__string,
  [6418] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(703), 1,
      anon_sym_COMMA,
    ACTIONS(844), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6431] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    ACTIONS(846), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6444] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(848), 1,
      sym__whitespace,
    STATE(316), 1,
      aux_sym_json_repeat1,
    STATE(740), 1,
      sym__string,
  [6457] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(457), 1,
      sym__pattern,
  [6470] = 4,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(850), 1,
      sym__whitespace,
    STATE(414), 1,
      aux_sym_json_repeat1,
    STATE(457), 1,
      sym__pattern,
  [6483] = 4,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(852), 1,
      sym__whitespace,
    STATE(417), 1,
      aux_sym_json_repeat1,
    STATE(458), 1,
      sym__pattern,
  [6496] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(302), 1,
      anon_sym_RBRACK,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6509] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    ACTIONS(854), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6522] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(258), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(459), 1,
      sym_repo,
  [6535] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(800), 1,
      anon_sym_COMMA,
    ACTIONS(856), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6548] = 1,
    ACTIONS(858), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [6555] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(250), 1,
      anon_sym_RBRACE,
    ACTIONS(721), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6568] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(554), 1,
      sym__pattern,
  [6581] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(860), 1,
      sym__whitespace,
    STATE(344), 1,
      aux_sym_json_repeat1,
    STATE(539), 1,
      sym__string,
  [6594] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(862), 1,
      sym__whitespace,
    STATE(346), 1,
      aux_sym_json_repeat1,
    STATE(536), 1,
      sym__string,
  [6607] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(864), 1,
      sym__whitespace,
    STATE(354), 1,
      aux_sym_json_repeat1,
    STATE(533), 1,
      sym__string,
  [6620] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(866), 1,
      sym__whitespace,
    STATE(360), 1,
      aux_sym_json_repeat1,
    STATE(530), 1,
      sym__string,
  [6633] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(868), 1,
      sym__whitespace,
    STATE(364), 1,
      aux_sym_json_repeat1,
    STATE(527), 1,
      sym__string,
  [6646] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(870), 1,
      sym__whitespace,
    STATE(366), 1,
      aux_sym_json_repeat1,
    STATE(524), 1,
      sym__string,
  [6659] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(551), 1,
      sym__pattern,
  [6672] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(296), 1,
      anon_sym_RBRACE,
    ACTIONS(721), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6685] = 4,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(872), 1,
      sym__whitespace,
    STATE(298), 1,
      aux_sym_json_repeat1,
    STATE(551), 1,
      sym__pattern,
  [6698] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(874), 1,
      sym__whitespace,
    STATE(331), 1,
      aux_sym_json_repeat1,
    STATE(744), 1,
      sym__string,
  [6711] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(713), 1,
      anon_sym_COMMA,
    ACTIONS(876), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6724] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(878), 1,
      sym__whitespace,
    STATE(333), 1,
      aux_sym_json_repeat1,
    STATE(747), 1,
      sym__string,
  [6737] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(516), 1,
      sym__pattern,
  [6750] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(512), 1,
      sym__string,
  [6763] = 4,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    ACTIONS(880), 1,
      sym__whitespace,
    STATE(375), 1,
      aux_sym_json_repeat1,
    STATE(517), 1,
      sym__pattern,
  [6776] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(517), 1,
      sym__pattern,
  [6789] = 1,
    ACTIONS(882), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [6796] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(268), 1,
      anon_sym_RBRACE,
    ACTIONS(800), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6809] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    ACTIONS(884), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6822] = 4,
    ACTIONS(95), 1,
      anon_sym_DQUOTE,
    ACTIONS(886), 1,
      sym__whitespace,
    STATE(339), 1,
      aux_sym_json_repeat1,
    STATE(748), 1,
      sym__string,
  [6835] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(264), 1,
      anon_sym_RBRACK,
    ACTIONS(757), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6848] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(362), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
    STATE(492), 1,
      sym__pattern,
  [6861] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    ACTIONS(888), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6874] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    ACTIONS(890), 1,
      anon_sym_RBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6887] = 1,
    ACTIONS(892), 4,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
      anon_sym_RBRACK,
  [6894] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    ACTIONS(894), 1,
      anon_sym_RBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6907] = 4,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(282), 1,
      anon_sym_RBRACE,
    ACTIONS(745), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [6920] = 1,
    ACTIONS(896), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6926] = 1,
    ACTIONS(898), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6932] = 3,
    ACTIONS(900), 1,
      sym__whitespace,
    ACTIONS(902), 1,
      anon_sym_COLON,
    STATE(480), 1,
      aux_sym_json_repeat1,
  [6942] = 3,
    ACTIONS(904), 1,
      sym__whitespace,
    ACTIONS(906), 1,
      anon_sym_COLON,
    STATE(482), 1,
      aux_sym_json_repeat1,
  [6952] = 3,
    ACTIONS(908), 1,
      sym__whitespace,
    ACTIONS(910), 1,
      anon_sym_COLON,
    STATE(484), 1,
      aux_sym_json_repeat1,
  [6962] = 3,
    ACTIONS(912), 1,
      sym__whitespace,
    ACTIONS(914), 1,
      anon_sym_COLON,
    STATE(486), 1,
      aux_sym_json_repeat1,
  [6972] = 1,
    ACTIONS(275), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [6978] = 3,
    ACTIONS(916), 1,
      sym__whitespace,
    ACTIONS(918), 1,
      anon_sym_COLON,
    STATE(637), 1,
      aux_sym_json_repeat1,
  [6988] = 3,
    ACTIONS(920), 1,
      sym__whitespace,
    ACTIONS(922), 1,
      anon_sym_COLON,
    STATE(625), 1,
      aux_sym_json_repeat1,
  [6998] = 1,
    ACTIONS(924), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7004] = 1,
    ACTIONS(926), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7010] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(709), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7020] = 1,
    ACTIONS(928), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7026] = 1,
    ACTIONS(930), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7032] = 1,
    ACTIONS(932), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7038] = 3,
    ACTIONS(934), 1,
      sym__whitespace,
    ACTIONS(936), 1,
      anon_sym_COLON,
    STATE(604), 1,
      aux_sym_json_repeat1,
  [7048] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(938), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7058] = 3,
    ACTIONS(938), 1,
      anon_sym_LBRACE,
    ACTIONS(940), 1,
      sym__whitespace,
    STATE(504), 1,
      aux_sym_json_repeat1,
  [7068] = 3,
    ACTIONS(942), 1,
      anon_sym_LBRACE,
    ACTIONS(944), 1,
      sym__whitespace,
    STATE(506), 1,
      aux_sym_json_repeat1,
  [7078] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(946), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7088] = 1,
    ACTIONS(948), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7094] = 3,
    ACTIONS(950), 1,
      anon_sym_LBRACE,
    ACTIONS(952), 1,
      sym__whitespace,
    STATE(753), 1,
      aux_sym_json_repeat1,
  [7104] = 1,
    ACTIONS(954), 3,
      anon_sym_DQUOTE,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [7110] = 1,
    ACTIONS(956), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7116] = 1,
    ACTIONS(958), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7122] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(757), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7132] = 1,
    ACTIONS(960), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7138] = 1,
    ACTIONS(962), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7144] = 1,
    ACTIONS(964), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7150] = 1,
    ACTIONS(966), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7156] = 1,
    ACTIONS(968), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7162] = 1,
    ACTIONS(970), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7168] = 1,
    ACTIONS(972), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7174] = 3,
    ACTIONS(974), 1,
      sym__whitespace,
    ACTIONS(976), 1,
      anon_sym_COLON,
    STATE(476), 1,
      aux_sym_json_repeat1,
  [7184] = 3,
    ACTIONS(978), 1,
      sym__whitespace,
    ACTIONS(980), 1,
      anon_sym_DQUOTE,
    STATE(522), 1,
      aux_sym_json_repeat1,
  [7194] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(982), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7204] = 3,
    ACTIONS(984), 1,
      sym__whitespace,
    ACTIONS(986), 1,
      anon_sym_COLON,
    STATE(474), 1,
      aux_sym_json_repeat1,
  [7214] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(988), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7224] = 3,
    ACTIONS(990), 1,
      sym__whitespace,
    ACTIONS(992), 1,
      anon_sym_COLON,
    STATE(472), 1,
      aux_sym_json_repeat1,
  [7234] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(994), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7244] = 3,
    ACTIONS(996), 1,
      sym__whitespace,
    ACTIONS(998), 1,
      anon_sym_COLON,
    STATE(470), 1,
      aux_sym_json_repeat1,
  [7254] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1000), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7264] = 3,
    ACTIONS(1002), 1,
      sym__whitespace,
    ACTIONS(1004), 1,
      anon_sym_COLON,
    STATE(468), 1,
      aux_sym_json_repeat1,
  [7274] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1006), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7284] = 3,
    ACTIONS(1008), 1,
      sym__whitespace,
    ACTIONS(1010), 1,
      anon_sym_COLON,
    STATE(466), 1,
      aux_sym_json_repeat1,
  [7294] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1012), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7304] = 3,
    ACTIONS(1014), 1,
      sym__whitespace,
    ACTIONS(1016), 1,
      anon_sym_COLON,
    STATE(464), 1,
      aux_sym_json_repeat1,
  [7314] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1018), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7324] = 3,
    ACTIONS(1020), 1,
      sym__whitespace,
    ACTIONS(1022), 1,
      anon_sym_COLON,
    STATE(599), 1,
      aux_sym_json_repeat1,
  [7334] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1024), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7344] = 3,
    ACTIONS(1026), 1,
      anon_sym_LBRACE,
    ACTIONS(1028), 1,
      sym__whitespace,
    STATE(546), 1,
      aux_sym_json_repeat1,
  [7354] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1030), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7364] = 3,
    ACTIONS(1032), 1,
      anon_sym_LBRACE,
    ACTIONS(1034), 1,
      sym__whitespace,
    STATE(549), 1,
      aux_sym_json_repeat1,
  [7374] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1036), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7384] = 3,
    ACTIONS(1038), 1,
      anon_sym_LBRACE,
    ACTIONS(1040), 1,
      sym__whitespace,
    STATE(552), 1,
      aux_sym_json_repeat1,
  [7394] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1042), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7404] = 3,
    ACTIONS(1044), 1,
      anon_sym_LBRACE,
    ACTIONS(1046), 1,
      sym__whitespace,
    STATE(555), 1,
      aux_sym_json_repeat1,
  [7414] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1048), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7424] = 1,
    ACTIONS(1050), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7430] = 1,
    ACTIONS(1052), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7436] = 3,
    ACTIONS(1054), 1,
      sym__whitespace,
    ACTIONS(1056), 1,
      anon_sym_COLON,
    STATE(583), 1,
      aux_sym_json_repeat1,
  [7446] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(800), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7456] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(721), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7466] = 1,
    ACTIONS(1058), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7472] = 1,
    ACTIONS(1060), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7478] = 1,
    ACTIONS(1062), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7484] = 1,
    ACTIONS(1064), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7490] = 1,
    ACTIONS(1066), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7496] = 1,
    ACTIONS(1068), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7502] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1070), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7512] = 1,
    ACTIONS(1072), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7518] = 1,
    ACTIONS(1074), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7524] = 1,
    ACTIONS(1076), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7530] = 3,
    ACTIONS(1078), 1,
      sym__whitespace,
    ACTIONS(1080), 1,
      anon_sym_COLON,
    STATE(572), 1,
      aux_sym_json_repeat1,
  [7540] = 3,
    ACTIONS(1082), 1,
      sym__whitespace,
    ACTIONS(1084), 1,
      anon_sym_COLON,
    STATE(568), 1,
      aux_sym_json_repeat1,
  [7550] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1086), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7560] = 3,
    ACTIONS(1088), 1,
      sym__whitespace,
    ACTIONS(1090), 1,
      anon_sym_COLON,
    STATE(564), 1,
      aux_sym_json_repeat1,
  [7570] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1092), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7580] = 3,
    ACTIONS(1092), 1,
      anon_sym_LBRACE,
    ACTIONS(1094), 1,
      sym__whitespace,
    STATE(573), 1,
      aux_sym_json_repeat1,
  [7590] = 1,
    ACTIONS(1096), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7596] = 1,
    ACTIONS(1098), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7602] = 1,
    ACTIONS(1100), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7608] = 1,
    ACTIONS(1102), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7614] = 1,
    ACTIONS(1104), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7620] = 1,
    ACTIONS(1106), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7626] = 1,
    ACTIONS(1108), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7632] = 1,
    ACTIONS(1110), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7638] = 1,
    ACTIONS(1112), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7644] = 1,
    ACTIONS(1114), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7650] = 1,
    ACTIONS(1116), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7656] = 1,
    ACTIONS(1118), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7662] = 1,
    ACTIONS(336), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7668] = 3,
    ACTIONS(1120), 1,
      sym__whitespace,
    ACTIONS(1122), 1,
      anon_sym_COLON,
    STATE(561), 1,
      aux_sym_json_repeat1,
  [7678] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1124), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7688] = 3,
    ACTIONS(1124), 1,
      anon_sym_DQUOTE,
    ACTIONS(1126), 1,
      sym__whitespace,
    STATE(585), 1,
      aux_sym_json_repeat1,
  [7698] = 1,
    ACTIONS(1128), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7704] = 1,
    ACTIONS(1130), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7710] = 1,
    ACTIONS(357), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7716] = 1,
    ACTIONS(1132), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7722] = 3,
    ACTIONS(1134), 1,
      sym__whitespace,
    ACTIONS(1136), 1,
      anon_sym_COLON,
    STATE(448), 1,
      aux_sym_json_repeat1,
  [7732] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1138), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7742] = 1,
    ACTIONS(1140), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7748] = 3,
    ACTIONS(1142), 1,
      anon_sym_LBRACE,
    ACTIONS(1144), 1,
      sym__whitespace,
    STATE(445), 1,
      aux_sym_json_repeat1,
  [7758] = 1,
    ACTIONS(1146), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7764] = 1,
    ACTIONS(1148), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7770] = 1,
    ACTIONS(1150), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7776] = 1,
    ACTIONS(1152), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7782] = 1,
    ACTIONS(1154), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7788] = 1,
    ACTIONS(1156), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [7794] = 3,
    ACTIONS(1158), 1,
      sym__whitespace,
    ACTIONS(1160), 1,
      anon_sym_COLON,
    STATE(645), 1,
      aux_sym_json_repeat1,
  [7804] = 1,
    ACTIONS(1162), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7810] = 1,
    ACTIONS(1164), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7816] = 1,
    ACTIONS(1166), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7822] = 1,
    ACTIONS(1168), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7828] = 3,
    ACTIONS(1170), 1,
      sym__whitespace,
    ACTIONS(1172), 1,
      anon_sym_COLON,
    STATE(690), 1,
      aux_sym_json_repeat1,
  [7838] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1174), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7848] = 1,
    ACTIONS(1176), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7854] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1178), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7864] = 3,
    ACTIONS(1178), 1,
      anon_sym_LBRACE,
    ACTIONS(1180), 1,
      sym__whitespace,
    STATE(605), 1,
      aux_sym_json_repeat1,
  [7874] = 3,
    ACTIONS(1182), 1,
      sym__whitespace,
    ACTIONS(1184), 1,
      anon_sym_LBRACK,
    STATE(751), 1,
      aux_sym_json_repeat1,
  [7884] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1186), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7894] = 3,
    ACTIONS(1186), 1,
      anon_sym_LBRACE,
    ACTIONS(1188), 1,
      sym__whitespace,
    STATE(611), 1,
      aux_sym_json_repeat1,
  [7904] = 1,
    ACTIONS(1190), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7910] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1192), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7920] = 3,
    ACTIONS(1192), 1,
      anon_sym_LBRACE,
    ACTIONS(1194), 1,
      sym__whitespace,
    STATE(616), 1,
      aux_sym_json_repeat1,
  [7930] = 1,
    ACTIONS(1196), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7936] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1198), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7946] = 3,
    ACTIONS(1198), 1,
      anon_sym_LBRACE,
    ACTIONS(1200), 1,
      sym__whitespace,
    STATE(621), 1,
      aux_sym_json_repeat1,
  [7956] = 1,
    ACTIONS(1202), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7962] = 1,
    ACTIONS(1204), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7968] = 1,
    ACTIONS(1206), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7974] = 1,
    ACTIONS(1208), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7980] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1210), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [7990] = 1,
    ACTIONS(1212), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [7996] = 1,
    ACTIONS(1214), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8002] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1216), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8012] = 1,
    ACTIONS(1218), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8018] = 1,
    ACTIONS(1220), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8024] = 1,
    ACTIONS(1222), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8030] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1224), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8040] = 1,
    ACTIONS(1226), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8046] = 1,
    ACTIONS(457), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8052] = 1,
    ACTIONS(1228), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8058] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1230), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8068] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1232), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8078] = 1,
    ACTIONS(1234), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8084] = 3,
    ACTIONS(1236), 1,
      sym__whitespace,
    ACTIONS(1238), 1,
      anon_sym_COLON,
    STATE(498), 1,
      aux_sym_json_repeat1,
  [8094] = 1,
    ACTIONS(1240), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8100] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1242), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8110] = 1,
    ACTIONS(1244), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8116] = 1,
    ACTIONS(1246), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8122] = 2,
    STATE(268), 1,
      aux_sym_repo_repeat1,
    ACTIONS(707), 2,
      aux_sym_repo_token1,
      aux_sym_repo_token2,
  [8130] = 1,
    ACTIONS(1248), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8136] = 3,
    ACTIONS(1250), 1,
      anon_sym_LBRACE,
    ACTIONS(1252), 1,
      sym__whitespace,
    STATE(742), 1,
      aux_sym_json_repeat1,
  [8146] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1254), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8156] = 1,
    ACTIONS(1256), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8162] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1258), 1,
      anon_sym_DQUOTE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8172] = 1,
    ACTIONS(1260), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8178] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(703), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8188] = 1,
    ACTIONS(1262), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8194] = 3,
    ACTIONS(1264), 1,
      sym__whitespace,
    ACTIONS(1266), 1,
      anon_sym_COLON,
    STATE(654), 1,
      aux_sym_json_repeat1,
  [8204] = 1,
    ACTIONS(1268), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8210] = 1,
    ACTIONS(1270), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8216] = 1,
    ACTIONS(1272), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8222] = 1,
    ACTIONS(1274), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8228] = 1,
    ACTIONS(1276), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8234] = 1,
    ACTIONS(1278), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8240] = 1,
    ACTIONS(1280), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8246] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(699), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8256] = 1,
    ACTIONS(1282), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8262] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1284), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8272] = 1,
    ACTIONS(1286), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8278] = 1,
    ACTIONS(1288), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8284] = 1,
    ACTIONS(1290), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8290] = 1,
    ACTIONS(1292), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8296] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1294), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8306] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1296), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8316] = 1,
    ACTIONS(1298), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8322] = 1,
    ACTIONS(1300), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8328] = 1,
    ACTIONS(1302), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8334] = 1,
    ACTIONS(1304), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8340] = 1,
    ACTIONS(1306), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8346] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1308), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8356] = 1,
    ACTIONS(1310), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8362] = 1,
    ACTIONS(1312), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8368] = 1,
    ACTIONS(1314), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8374] = 1,
    ACTIONS(1316), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8380] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1318), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8390] = 1,
    ACTIONS(1320), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8396] = 3,
    ACTIONS(1322), 1,
      sym__whitespace,
    ACTIONS(1324), 1,
      anon_sym_COLON,
    STATE(478), 1,
      aux_sym_json_repeat1,
  [8406] = 1,
    ACTIONS(1326), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8412] = 1,
    ACTIONS(1328), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8418] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1330), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8428] = 1,
    ACTIONS(1332), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8434] = 1,
    ACTIONS(545), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8440] = 1,
    ACTIONS(1334), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8446] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1336), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8456] = 1,
    ACTIONS(1338), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8462] = 1,
    ACTIONS(1340), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8468] = 1,
    ACTIONS(1342), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8474] = 1,
    ACTIONS(1344), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8480] = 3,
    ACTIONS(1346), 1,
      sym__whitespace,
    ACTIONS(1348), 1,
      anon_sym_COLON,
    STATE(529), 1,
      aux_sym_json_repeat1,
  [8490] = 3,
    ACTIONS(1350), 1,
      sym__whitespace,
    ACTIONS(1352), 1,
      anon_sym_LBRACK,
    STATE(727), 1,
      aux_sym_json_repeat1,
  [8500] = 1,
    ACTIONS(1354), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8506] = 1,
    ACTIONS(1356), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8512] = 1,
    ACTIONS(1358), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8518] = 1,
    ACTIONS(1360), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8524] = 1,
    ACTIONS(1362), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8530] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1364), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8540] = 1,
    ACTIONS(1366), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8546] = 1,
    ACTIONS(1368), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8552] = 1,
    ACTIONS(1370), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8558] = 1,
    ACTIONS(1372), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8564] = 3,
    ACTIONS(1374), 1,
      sym__whitespace,
    ACTIONS(1376), 1,
      anon_sym_COLON,
    STATE(681), 1,
      aux_sym_json_repeat1,
  [8574] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1378), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8584] = 1,
    ACTIONS(1380), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8590] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1382), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8600] = 1,
    ACTIONS(1384), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8606] = 1,
    ACTIONS(1386), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8612] = 1,
    ACTIONS(1388), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8618] = 1,
    ACTIONS(1390), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8624] = 1,
    ACTIONS(1392), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8630] = 1,
    ACTIONS(1394), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8636] = 1,
    ACTIONS(1396), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8642] = 3,
    ACTIONS(1398), 1,
      sym__whitespace,
    ACTIONS(1400), 1,
      anon_sym_COLON,
    STATE(693), 1,
      aux_sym_json_repeat1,
  [8652] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1402), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8662] = 1,
    ACTIONS(1404), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8668] = 1,
    ACTIONS(1406), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8674] = 1,
    ACTIONS(1408), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8680] = 3,
    ACTIONS(1410), 1,
      sym__whitespace,
    ACTIONS(1412), 1,
      anon_sym_COLON,
    STATE(577), 1,
      aux_sym_json_repeat1,
  [8690] = 1,
    ACTIONS(1414), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8696] = 1,
    ACTIONS(1416), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8702] = 3,
    ACTIONS(1418), 1,
      sym__whitespace,
    ACTIONS(1420), 1,
      anon_sym_COLON,
    STATE(731), 1,
      aux_sym_json_repeat1,
  [8712] = 1,
    ACTIONS(1422), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8718] = 3,
    ACTIONS(1174), 1,
      anon_sym_COLON,
    ACTIONS(1424), 1,
      sym__whitespace,
    STATE(756), 1,
      aux_sym_json_repeat1,
  [8728] = 1,
    ACTIONS(689), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8734] = 1,
    ACTIONS(1426), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8740] = 1,
    ACTIONS(1428), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [8746] = 1,
    ACTIONS(1430), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8752] = 1,
    ACTIONS(1432), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8758] = 1,
    ACTIONS(662), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8764] = 1,
    ACTIONS(591), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8770] = 3,
    ACTIONS(1434), 1,
      sym__whitespace,
    ACTIONS(1436), 1,
      anon_sym_COLON,
    STATE(643), 1,
      aux_sym_json_repeat1,
  [8780] = 1,
    ACTIONS(1438), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8786] = 1,
    ACTIONS(1440), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8792] = 1,
    ACTIONS(1442), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8798] = 1,
    ACTIONS(1444), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8804] = 1,
    ACTIONS(1446), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8810] = 1,
    ACTIONS(1448), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8816] = 1,
    ACTIONS(1450), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8822] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1452), 1,
      anon_sym_LBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8832] = 1,
    ACTIONS(1454), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8838] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1456), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8848] = 1,
    ACTIONS(1458), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8854] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(701), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8864] = 1,
    ACTIONS(1460), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8870] = 1,
    ACTIONS(1462), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8876] = 1,
    ACTIONS(1464), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8882] = 1,
    ACTIONS(1466), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8888] = 1,
    ACTIONS(1468), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8894] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1470), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8904] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1472), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8914] = 3,
    ACTIONS(1474), 1,
      sym__whitespace,
    ACTIONS(1476), 1,
      anon_sym_COLON,
    STATE(544), 1,
      aux_sym_json_repeat1,
  [8924] = 1,
    ACTIONS(1478), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8930] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1480), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [8940] = 3,
    ACTIONS(1482), 1,
      sym__whitespace,
    ACTIONS(1484), 1,
      anon_sym_COLON,
    STATE(734), 1,
      aux_sym_json_repeat1,
  [8950] = 1,
    ACTIONS(1486), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8956] = 1,
    ACTIONS(599), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8962] = 3,
    ACTIONS(1488), 1,
      ts_builtin_sym_end,
    ACTIONS(1490), 1,
      anon_sym_LBRACE,
    STATE(697), 1,
      aux_sym_json_repeat3,
  [8972] = 1,
    ACTIONS(1493), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8978] = 1,
    ACTIONS(1495), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8984] = 1,
    ACTIONS(1497), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [8990] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1499), 1,
      anon_sym_LBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9000] = 1,
    ACTIONS(1501), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9006] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1503), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9016] = 1,
    ACTIONS(1505), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9022] = 1,
    ACTIONS(537), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9028] = 1,
    ACTIONS(1507), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9034] = 1,
    ACTIONS(1509), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9040] = 1,
    ACTIONS(1511), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9046] = 1,
    ACTIONS(1513), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [9052] = 1,
    ACTIONS(1515), 3,
      anon_sym_COMMA,
      sym__whitespace,
      anon_sym_RBRACK,
  [9058] = 1,
    ACTIONS(1517), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9064] = 1,
    ACTIONS(1519), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9070] = 1,
    ACTIONS(1521), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9076] = 1,
    ACTIONS(1523), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9082] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1525), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9092] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(745), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9102] = 1,
    ACTIONS(1527), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9108] = 1,
    ACTIONS(1529), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9114] = 1,
    ACTIONS(1531), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9120] = 1,
    ACTIONS(1533), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9126] = 1,
    ACTIONS(1535), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9132] = 1,
    ACTIONS(1537), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9138] = 1,
    ACTIONS(1539), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9144] = 1,
    ACTIONS(1541), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9150] = 1,
    ACTIONS(1543), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9156] = 3,
    ACTIONS(1545), 1,
      sym__whitespace,
    ACTIONS(1547), 1,
      anon_sym_LBRACK,
    STATE(679), 1,
      aux_sym_json_repeat1,
  [9166] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1547), 1,
      anon_sym_LBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9176] = 1,
    ACTIONS(1549), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9182] = 1,
    ACTIONS(1551), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9188] = 1,
    ACTIONS(1553), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9194] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1555), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9204] = 1,
    ACTIONS(1557), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9210] = 1,
    ACTIONS(1559), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9216] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1561), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9226] = 3,
    ACTIONS(1563), 1,
      sym__whitespace,
    ACTIONS(1565), 1,
      anon_sym_COLON,
    STATE(715), 1,
      aux_sym_json_repeat1,
  [9236] = 1,
    ACTIONS(1567), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9242] = 3,
    ACTIONS(5), 1,
      anon_sym_LBRACE,
    ACTIONS(1569), 1,
      ts_builtin_sym_end,
    STATE(697), 1,
      aux_sym_json_repeat3,
  [9252] = 1,
    ACTIONS(1571), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9258] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(713), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9268] = 1,
    ACTIONS(1573), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9274] = 3,
    ACTIONS(1575), 1,
      anon_sym_LBRACE,
    ACTIONS(1577), 1,
      sym__whitespace,
    STATE(689), 1,
      aux_sym_json_repeat1,
  [9284] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1575), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9294] = 1,
    ACTIONS(1579), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9300] = 1,
    ACTIONS(1581), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9306] = 1,
    ACTIONS(1583), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9312] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(695), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9322] = 1,
    ACTIONS(1585), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9328] = 1,
    ACTIONS(1587), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9334] = 3,
    ACTIONS(1589), 1,
      sym__whitespace,
    ACTIONS(1591), 1,
      anon_sym_LBRACK,
    STATE(701), 1,
      aux_sym_json_repeat1,
  [9344] = 1,
    ACTIONS(1593), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9350] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1591), 1,
      anon_sym_LBRACK,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9360] = 3,
    ACTIONS(1595), 1,
      anon_sym_LBRACE,
    ACTIONS(1597), 1,
      sym__whitespace,
    STATE(703), 1,
      aux_sym_json_repeat1,
  [9370] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1595), 1,
      anon_sym_LBRACE,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9380] = 1,
    ACTIONS(1599), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9386] = 1,
    ACTIONS(1601), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9392] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(1603), 1,
      anon_sym_COLON,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9402] = 1,
    ACTIONS(1605), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9408] = 1,
    ACTIONS(1607), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9414] = 1,
    ACTIONS(1609), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9420] = 1,
    ACTIONS(1611), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9426] = 3,
    ACTIONS(21), 1,
      sym__whitespace,
    ACTIONS(723), 1,
      anon_sym_COMMA,
    STATE(33), 1,
      aux_sym_json_repeat1,
  [9436] = 1,
    ACTIONS(1613), 3,
      anon_sym_COMMA,
      anon_sym_RBRACE,
      sym__whitespace,
  [9442] = 1,
    ACTIONS(1615), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9447] = 2,
    ACTIONS(33), 1,
      anon_sym_DQUOTE,
    ACTIONS(1617), 1,
      sym__string_content,
  [9454] = 1,
    ACTIONS(1619), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9459] = 1,
    ACTIONS(1621), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9464] = 2,
    ACTIONS(1623), 1,
      anon_sym_DQUOTE,
    ACTIONS(1625), 1,
      sym__string_content,
  [9471] = 1,
    ACTIONS(1627), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9476] = 1,
    ACTIONS(1488), 2,
      ts_builtin_sym_end,
      anon_sym_LBRACE,
  [9481] = 1,
    ACTIONS(1629), 1,
      anon_sym_DQUOTE,
  [9485] = 1,
    ACTIONS(1631), 1,
      anon_sym_DQUOTE,
  [9489] = 1,
    ACTIONS(1633), 1,
      anon_sym_DQUOTE,
  [9493] = 1,
    ACTIONS(1635), 1,
      anon_sym_DQUOTE,
  [9497] = 1,
    ACTIONS(1637), 1,
      anon_sym_DQUOTE,
  [9501] = 1,
    ACTIONS(1639), 1,
      anon_sym_DQUOTE,
  [9505] = 1,
    ACTIONS(1641), 1,
      anon_sym_DQUOTE,
  [9509] = 1,
    ACTIONS(1643), 1,
      anon_sym_DQUOTE,
  [9513] = 1,
    ACTIONS(1645), 1,
      anon_sym_DQUOTE,
  [9517] = 1,
    ACTIONS(1647), 1,
      anon_sym_DQUOTE,
  [9521] = 1,
    ACTIONS(1649), 1,
      anon_sym_DQUOTE,
  [9525] = 1,
    ACTIONS(1651), 1,
      anon_sym_DQUOTE,
  [9529] = 1,
    ACTIONS(1653), 1,
      ts_builtin_sym_end,
  [9533] = 1,
    ACTIONS(1655), 1,
      aux_sym_capture_token1,
  [9537] = 1,
    ACTIONS(1657), 1,
      anon_sym_DQUOTE,
  [9541] = 1,
    ACTIONS(1659), 1,
      anon_sym_DQUOTE,
  [9545] = 1,
    ACTIONS(1661), 1,
      anon_sym_DQUOTE,
  [9549] = 1,
    ACTIONS(1663), 1,
      anon_sym_DQUOTE,
  [9553] = 1,
    ACTIONS(244), 1,
      anon_sym_DQUOTE,
  [9557] = 1,
    ACTIONS(1665), 1,
      anon_sym_DQUOTE,
  [9561] = 1,
    ACTIONS(1667), 1,
      anon_sym_DQUOTE,
  [9565] = 1,
    ACTIONS(1669), 1,
      anon_sym_DQUOTE,
  [9569] = 1,
    ACTIONS(1671), 1,
      anon_sym_DQUOTE,
  [9573] = 1,
    ACTIONS(1673), 1,
      anon_sym_DQUOTE,
  [9577] = 1,
    ACTIONS(1675), 1,
      anon_sym_DQUOTE,
  [9581] = 1,
    ACTIONS(1677), 1,
      anon_sym_DQUOTE,
  [9585] = 1,
    ACTIONS(1679), 1,
      anon_sym_DQUOTE,
  [9589] = 1,
    ACTIONS(1681), 1,
      anon_sym_DQUOTE,
  [9593] = 1,
    ACTIONS(1683), 1,
      anon_sym_DQUOTE,
  [9597] = 1,
    ACTIONS(1685), 1,
      anon_sym_DQUOTE,
  [9601] = 1,
    ACTIONS(1687), 1,
      anon_sym_DQUOTE,
  [9605] = 1,
    ACTIONS(1689), 1,
      anon_sym_DQUOTE,
  [9609] = 1,
    ACTIONS(1691), 1,
      anon_sym_DQUOTE,
  [9613] = 1,
    ACTIONS(1693), 1,
      anon_sym_DQUOTE,
  [9617] = 1,
    ACTIONS(1695), 1,
      anon_sym_DQUOTE,
  [9621] = 1,
    ACTIONS(1697), 1,
      anon_sym_DQUOTE,
  [9625] = 1,
    ACTIONS(1699), 1,
      anon_sym_DQUOTE,
};

static const uint32_t ts_small_parse_table_map[] = {
  [SMALL_STATE(2)] = 0,
  [SMALL_STATE(3)] = 33,
  [SMALL_STATE(4)] = 66,
  [SMALL_STATE(5)] = 99,
  [SMALL_STATE(6)] = 132,
  [SMALL_STATE(7)] = 162,
  [SMALL_STATE(8)] = 192,
  [SMALL_STATE(9)] = 222,
  [SMALL_STATE(10)] = 252,
  [SMALL_STATE(11)] = 282,
  [SMALL_STATE(12)] = 312,
  [SMALL_STATE(13)] = 342,
  [SMALL_STATE(14)] = 372,
  [SMALL_STATE(15)] = 427,
  [SMALL_STATE(16)] = 482,
  [SMALL_STATE(17)] = 518,
  [SMALL_STATE(18)] = 554,
  [SMALL_STATE(19)] = 590,
  [SMALL_STATE(20)] = 626,
  [SMALL_STATE(21)] = 659,
  [SMALL_STATE(22)] = 692,
  [SMALL_STATE(23)] = 725,
  [SMALL_STATE(24)] = 758,
  [SMALL_STATE(25)] = 790,
  [SMALL_STATE(26)] = 822,
  [SMALL_STATE(27)] = 854,
  [SMALL_STATE(28)] = 886,
  [SMALL_STATE(29)] = 918,
  [SMALL_STATE(30)] = 950,
  [SMALL_STATE(31)] = 982,
  [SMALL_STATE(32)] = 1014,
  [SMALL_STATE(33)] = 1046,
  [SMALL_STATE(34)] = 1066,
  [SMALL_STATE(35)] = 1098,
  [SMALL_STATE(36)] = 1130,
  [SMALL_STATE(37)] = 1162,
  [SMALL_STATE(38)] = 1194,
  [SMALL_STATE(39)] = 1226,
  [SMALL_STATE(40)] = 1246,
  [SMALL_STATE(41)] = 1266,
  [SMALL_STATE(42)] = 1286,
  [SMALL_STATE(43)] = 1306,
  [SMALL_STATE(44)] = 1326,
  [SMALL_STATE(45)] = 1346,
  [SMALL_STATE(46)] = 1366,
  [SMALL_STATE(47)] = 1386,
  [SMALL_STATE(48)] = 1406,
  [SMALL_STATE(49)] = 1426,
  [SMALL_STATE(50)] = 1446,
  [SMALL_STATE(51)] = 1466,
  [SMALL_STATE(52)] = 1486,
  [SMALL_STATE(53)] = 1506,
  [SMALL_STATE(54)] = 1526,
  [SMALL_STATE(55)] = 1546,
  [SMALL_STATE(56)] = 1566,
  [SMALL_STATE(57)] = 1586,
  [SMALL_STATE(58)] = 1603,
  [SMALL_STATE(59)] = 1624,
  [SMALL_STATE(60)] = 1641,
  [SMALL_STATE(61)] = 1662,
  [SMALL_STATE(62)] = 1683,
  [SMALL_STATE(63)] = 1700,
  [SMALL_STATE(64)] = 1721,
  [SMALL_STATE(65)] = 1738,
  [SMALL_STATE(66)] = 1755,
  [SMALL_STATE(67)] = 1772,
  [SMALL_STATE(68)] = 1789,
  [SMALL_STATE(69)] = 1806,
  [SMALL_STATE(70)] = 1823,
  [SMALL_STATE(71)] = 1840,
  [SMALL_STATE(72)] = 1857,
  [SMALL_STATE(73)] = 1874,
  [SMALL_STATE(74)] = 1890,
  [SMALL_STATE(75)] = 1906,
  [SMALL_STATE(76)] = 1922,
  [SMALL_STATE(77)] = 1938,
  [SMALL_STATE(78)] = 1954,
  [SMALL_STATE(79)] = 1970,
  [SMALL_STATE(80)] = 1986,
  [SMALL_STATE(81)] = 2002,
  [SMALL_STATE(82)] = 2018,
  [SMALL_STATE(83)] = 2034,
  [SMALL_STATE(84)] = 2050,
  [SMALL_STATE(85)] = 2066,
  [SMALL_STATE(86)] = 2082,
  [SMALL_STATE(87)] = 2098,
  [SMALL_STATE(88)] = 2114,
  [SMALL_STATE(89)] = 2130,
  [SMALL_STATE(90)] = 2146,
  [SMALL_STATE(91)] = 2162,
  [SMALL_STATE(92)] = 2178,
  [SMALL_STATE(93)] = 2194,
  [SMALL_STATE(94)] = 2210,
  [SMALL_STATE(95)] = 2226,
  [SMALL_STATE(96)] = 2242,
  [SMALL_STATE(97)] = 2258,
  [SMALL_STATE(98)] = 2274,
  [SMALL_STATE(99)] = 2290,
  [SMALL_STATE(100)] = 2306,
  [SMALL_STATE(101)] = 2322,
  [SMALL_STATE(102)] = 2338,
  [SMALL_STATE(103)] = 2354,
  [SMALL_STATE(104)] = 2370,
  [SMALL_STATE(105)] = 2386,
  [SMALL_STATE(106)] = 2402,
  [SMALL_STATE(107)] = 2418,
  [SMALL_STATE(108)] = 2434,
  [SMALL_STATE(109)] = 2450,
  [SMALL_STATE(110)] = 2466,
  [SMALL_STATE(111)] = 2482,
  [SMALL_STATE(112)] = 2498,
  [SMALL_STATE(113)] = 2514,
  [SMALL_STATE(114)] = 2530,
  [SMALL_STATE(115)] = 2546,
  [SMALL_STATE(116)] = 2562,
  [SMALL_STATE(117)] = 2578,
  [SMALL_STATE(118)] = 2594,
  [SMALL_STATE(119)] = 2610,
  [SMALL_STATE(120)] = 2626,
  [SMALL_STATE(121)] = 2642,
  [SMALL_STATE(122)] = 2658,
  [SMALL_STATE(123)] = 2674,
  [SMALL_STATE(124)] = 2690,
  [SMALL_STATE(125)] = 2706,
  [SMALL_STATE(126)] = 2722,
  [SMALL_STATE(127)] = 2738,
  [SMALL_STATE(128)] = 2754,
  [SMALL_STATE(129)] = 2770,
  [SMALL_STATE(130)] = 2786,
  [SMALL_STATE(131)] = 2802,
  [SMALL_STATE(132)] = 2818,
  [SMALL_STATE(133)] = 2834,
  [SMALL_STATE(134)] = 2850,
  [SMALL_STATE(135)] = 2866,
  [SMALL_STATE(136)] = 2882,
  [SMALL_STATE(137)] = 2898,
  [SMALL_STATE(138)] = 2914,
  [SMALL_STATE(139)] = 2930,
  [SMALL_STATE(140)] = 2946,
  [SMALL_STATE(141)] = 2962,
  [SMALL_STATE(142)] = 2978,
  [SMALL_STATE(143)] = 2994,
  [SMALL_STATE(144)] = 3010,
  [SMALL_STATE(145)] = 3026,
  [SMALL_STATE(146)] = 3042,
  [SMALL_STATE(147)] = 3058,
  [SMALL_STATE(148)] = 3074,
  [SMALL_STATE(149)] = 3090,
  [SMALL_STATE(150)] = 3106,
  [SMALL_STATE(151)] = 3122,
  [SMALL_STATE(152)] = 3138,
  [SMALL_STATE(153)] = 3154,
  [SMALL_STATE(154)] = 3170,
  [SMALL_STATE(155)] = 3186,
  [SMALL_STATE(156)] = 3202,
  [SMALL_STATE(157)] = 3218,
  [SMALL_STATE(158)] = 3234,
  [SMALL_STATE(159)] = 3250,
  [SMALL_STATE(160)] = 3266,
  [SMALL_STATE(161)] = 3282,
  [SMALL_STATE(162)] = 3298,
  [SMALL_STATE(163)] = 3314,
  [SMALL_STATE(164)] = 3330,
  [SMALL_STATE(165)] = 3346,
  [SMALL_STATE(166)] = 3362,
  [SMALL_STATE(167)] = 3378,
  [SMALL_STATE(168)] = 3394,
  [SMALL_STATE(169)] = 3410,
  [SMALL_STATE(170)] = 3426,
  [SMALL_STATE(171)] = 3442,
  [SMALL_STATE(172)] = 3458,
  [SMALL_STATE(173)] = 3474,
  [SMALL_STATE(174)] = 3490,
  [SMALL_STATE(175)] = 3506,
  [SMALL_STATE(176)] = 3522,
  [SMALL_STATE(177)] = 3538,
  [SMALL_STATE(178)] = 3554,
  [SMALL_STATE(179)] = 3570,
  [SMALL_STATE(180)] = 3586,
  [SMALL_STATE(181)] = 3602,
  [SMALL_STATE(182)] = 3618,
  [SMALL_STATE(183)] = 3634,
  [SMALL_STATE(184)] = 3650,
  [SMALL_STATE(185)] = 3666,
  [SMALL_STATE(186)] = 3682,
  [SMALL_STATE(187)] = 3698,
  [SMALL_STATE(188)] = 3714,
  [SMALL_STATE(189)] = 3730,
  [SMALL_STATE(190)] = 3746,
  [SMALL_STATE(191)] = 3762,
  [SMALL_STATE(192)] = 3778,
  [SMALL_STATE(193)] = 3794,
  [SMALL_STATE(194)] = 3810,
  [SMALL_STATE(195)] = 3826,
  [SMALL_STATE(196)] = 3842,
  [SMALL_STATE(197)] = 3858,
  [SMALL_STATE(198)] = 3874,
  [SMALL_STATE(199)] = 3890,
  [SMALL_STATE(200)] = 3906,
  [SMALL_STATE(201)] = 3922,
  [SMALL_STATE(202)] = 3934,
  [SMALL_STATE(203)] = 3950,
  [SMALL_STATE(204)] = 3966,
  [SMALL_STATE(205)] = 3982,
  [SMALL_STATE(206)] = 3998,
  [SMALL_STATE(207)] = 4014,
  [SMALL_STATE(208)] = 4030,
  [SMALL_STATE(209)] = 4046,
  [SMALL_STATE(210)] = 4062,
  [SMALL_STATE(211)] = 4078,
  [SMALL_STATE(212)] = 4094,
  [SMALL_STATE(213)] = 4110,
  [SMALL_STATE(214)] = 4126,
  [SMALL_STATE(215)] = 4142,
  [SMALL_STATE(216)] = 4158,
  [SMALL_STATE(217)] = 4174,
  [SMALL_STATE(218)] = 4190,
  [SMALL_STATE(219)] = 4206,
  [SMALL_STATE(220)] = 4222,
  [SMALL_STATE(221)] = 4238,
  [SMALL_STATE(222)] = 4254,
  [SMALL_STATE(223)] = 4270,
  [SMALL_STATE(224)] = 4286,
  [SMALL_STATE(225)] = 4302,
  [SMALL_STATE(226)] = 4318,
  [SMALL_STATE(227)] = 4334,
  [SMALL_STATE(228)] = 4350,
  [SMALL_STATE(229)] = 4366,
  [SMALL_STATE(230)] = 4382,
  [SMALL_STATE(231)] = 4398,
  [SMALL_STATE(232)] = 4414,
  [SMALL_STATE(233)] = 4430,
  [SMALL_STATE(234)] = 4446,
  [SMALL_STATE(235)] = 4462,
  [SMALL_STATE(236)] = 4478,
  [SMALL_STATE(237)] = 4494,
  [SMALL_STATE(238)] = 4507,
  [SMALL_STATE(239)] = 4520,
  [SMALL_STATE(240)] = 4533,
  [SMALL_STATE(241)] = 4546,
  [SMALL_STATE(242)] = 4559,
  [SMALL_STATE(243)] = 4572,
  [SMALL_STATE(244)] = 4585,
  [SMALL_STATE(245)] = 4598,
  [SMALL_STATE(246)] = 4611,
  [SMALL_STATE(247)] = 4624,
  [SMALL_STATE(248)] = 4637,
  [SMALL_STATE(249)] = 4648,
  [SMALL_STATE(250)] = 4661,
  [SMALL_STATE(251)] = 4674,
  [SMALL_STATE(252)] = 4687,
  [SMALL_STATE(253)] = 4700,
  [SMALL_STATE(254)] = 4713,
  [SMALL_STATE(255)] = 4726,
  [SMALL_STATE(256)] = 4739,
  [SMALL_STATE(257)] = 4752,
  [SMALL_STATE(258)] = 4763,
  [SMALL_STATE(259)] = 4776,
  [SMALL_STATE(260)] = 4787,
  [SMALL_STATE(261)] = 4800,
  [SMALL_STATE(262)] = 4813,
  [SMALL_STATE(263)] = 4826,
  [SMALL_STATE(264)] = 4839,
  [SMALL_STATE(265)] = 4852,
  [SMALL_STATE(266)] = 4859,
  [SMALL_STATE(267)] = 4872,
  [SMALL_STATE(268)] = 4885,
  [SMALL_STATE(269)] = 4896,
  [SMALL_STATE(270)] = 4909,
  [SMALL_STATE(271)] = 4920,
  [SMALL_STATE(272)] = 4933,
  [SMALL_STATE(273)] = 4946,
  [SMALL_STATE(274)] = 4959,
  [SMALL_STATE(275)] = 4970,
  [SMALL_STATE(276)] = 4983,
  [SMALL_STATE(277)] = 4996,
  [SMALL_STATE(278)] = 5009,
  [SMALL_STATE(279)] = 5022,
  [SMALL_STATE(280)] = 5035,
  [SMALL_STATE(281)] = 5048,
  [SMALL_STATE(282)] = 5059,
  [SMALL_STATE(283)] = 5072,
  [SMALL_STATE(284)] = 5079,
  [SMALL_STATE(285)] = 5092,
  [SMALL_STATE(286)] = 5105,
  [SMALL_STATE(287)] = 5118,
  [SMALL_STATE(288)] = 5131,
  [SMALL_STATE(289)] = 5138,
  [SMALL_STATE(290)] = 5151,
  [SMALL_STATE(291)] = 5164,
  [SMALL_STATE(292)] = 5177,
  [SMALL_STATE(293)] = 5190,
  [SMALL_STATE(294)] = 5203,
  [SMALL_STATE(295)] = 5216,
  [SMALL_STATE(296)] = 5229,
  [SMALL_STATE(297)] = 5242,
  [SMALL_STATE(298)] = 5255,
  [SMALL_STATE(299)] = 5268,
  [SMALL_STATE(300)] = 5281,
  [SMALL_STATE(301)] = 5294,
  [SMALL_STATE(302)] = 5307,
  [SMALL_STATE(303)] = 5320,
  [SMALL_STATE(304)] = 5333,
  [SMALL_STATE(305)] = 5346,
  [SMALL_STATE(306)] = 5359,
  [SMALL_STATE(307)] = 5372,
  [SMALL_STATE(308)] = 5385,
  [SMALL_STATE(309)] = 5398,
  [SMALL_STATE(310)] = 5411,
  [SMALL_STATE(311)] = 5424,
  [SMALL_STATE(312)] = 5437,
  [SMALL_STATE(313)] = 5450,
  [SMALL_STATE(314)] = 5463,
  [SMALL_STATE(315)] = 5476,
  [SMALL_STATE(316)] = 5489,
  [SMALL_STATE(317)] = 5502,
  [SMALL_STATE(318)] = 5515,
  [SMALL_STATE(319)] = 5528,
  [SMALL_STATE(320)] = 5541,
  [SMALL_STATE(321)] = 5554,
  [SMALL_STATE(322)] = 5567,
  [SMALL_STATE(323)] = 5580,
  [SMALL_STATE(324)] = 5593,
  [SMALL_STATE(325)] = 5604,
  [SMALL_STATE(326)] = 5617,
  [SMALL_STATE(327)] = 5630,
  [SMALL_STATE(328)] = 5643,
  [SMALL_STATE(329)] = 5656,
  [SMALL_STATE(330)] = 5669,
  [SMALL_STATE(331)] = 5682,
  [SMALL_STATE(332)] = 5695,
  [SMALL_STATE(333)] = 5708,
  [SMALL_STATE(334)] = 5721,
  [SMALL_STATE(335)] = 5734,
  [SMALL_STATE(336)] = 5747,
  [SMALL_STATE(337)] = 5760,
  [SMALL_STATE(338)] = 5773,
  [SMALL_STATE(339)] = 5780,
  [SMALL_STATE(340)] = 5793,
  [SMALL_STATE(341)] = 5806,
  [SMALL_STATE(342)] = 5819,
  [SMALL_STATE(343)] = 5832,
  [SMALL_STATE(344)] = 5845,
  [SMALL_STATE(345)] = 5858,
  [SMALL_STATE(346)] = 5871,
  [SMALL_STATE(347)] = 5884,
  [SMALL_STATE(348)] = 5891,
  [SMALL_STATE(349)] = 5904,
  [SMALL_STATE(350)] = 5911,
  [SMALL_STATE(351)] = 5924,
  [SMALL_STATE(352)] = 5937,
  [SMALL_STATE(353)] = 5950,
  [SMALL_STATE(354)] = 5963,
  [SMALL_STATE(355)] = 5976,
  [SMALL_STATE(356)] = 5989,
  [SMALL_STATE(357)] = 6002,
  [SMALL_STATE(358)] = 6015,
  [SMALL_STATE(359)] = 6028,
  [SMALL_STATE(360)] = 6041,
  [SMALL_STATE(361)] = 6054,
  [SMALL_STATE(362)] = 6067,
  [SMALL_STATE(363)] = 6080,
  [SMALL_STATE(364)] = 6093,
  [SMALL_STATE(365)] = 6106,
  [SMALL_STATE(366)] = 6119,
  [SMALL_STATE(367)] = 6132,
  [SMALL_STATE(368)] = 6145,
  [SMALL_STATE(369)] = 6158,
  [SMALL_STATE(370)] = 6171,
  [SMALL_STATE(371)] = 6184,
  [SMALL_STATE(372)] = 6197,
  [SMALL_STATE(373)] = 6210,
  [SMALL_STATE(374)] = 6223,
  [SMALL_STATE(375)] = 6236,
  [SMALL_STATE(376)] = 6249,
  [SMALL_STATE(377)] = 6262,
  [SMALL_STATE(378)] = 6275,
  [SMALL_STATE(379)] = 6288,
  [SMALL_STATE(380)] = 6301,
  [SMALL_STATE(381)] = 6314,
  [SMALL_STATE(382)] = 6327,
  [SMALL_STATE(383)] = 6340,
  [SMALL_STATE(384)] = 6353,
  [SMALL_STATE(385)] = 6366,
  [SMALL_STATE(386)] = 6379,
  [SMALL_STATE(387)] = 6392,
  [SMALL_STATE(388)] = 6405,
  [SMALL_STATE(389)] = 6418,
  [SMALL_STATE(390)] = 6431,
  [SMALL_STATE(391)] = 6444,
  [SMALL_STATE(392)] = 6457,
  [SMALL_STATE(393)] = 6470,
  [SMALL_STATE(394)] = 6483,
  [SMALL_STATE(395)] = 6496,
  [SMALL_STATE(396)] = 6509,
  [SMALL_STATE(397)] = 6522,
  [SMALL_STATE(398)] = 6535,
  [SMALL_STATE(399)] = 6548,
  [SMALL_STATE(400)] = 6555,
  [SMALL_STATE(401)] = 6568,
  [SMALL_STATE(402)] = 6581,
  [SMALL_STATE(403)] = 6594,
  [SMALL_STATE(404)] = 6607,
  [SMALL_STATE(405)] = 6620,
  [SMALL_STATE(406)] = 6633,
  [SMALL_STATE(407)] = 6646,
  [SMALL_STATE(408)] = 6659,
  [SMALL_STATE(409)] = 6672,
  [SMALL_STATE(410)] = 6685,
  [SMALL_STATE(411)] = 6698,
  [SMALL_STATE(412)] = 6711,
  [SMALL_STATE(413)] = 6724,
  [SMALL_STATE(414)] = 6737,
  [SMALL_STATE(415)] = 6750,
  [SMALL_STATE(416)] = 6763,
  [SMALL_STATE(417)] = 6776,
  [SMALL_STATE(418)] = 6789,
  [SMALL_STATE(419)] = 6796,
  [SMALL_STATE(420)] = 6809,
  [SMALL_STATE(421)] = 6822,
  [SMALL_STATE(422)] = 6835,
  [SMALL_STATE(423)] = 6848,
  [SMALL_STATE(424)] = 6861,
  [SMALL_STATE(425)] = 6874,
  [SMALL_STATE(426)] = 6887,
  [SMALL_STATE(427)] = 6894,
  [SMALL_STATE(428)] = 6907,
  [SMALL_STATE(429)] = 6920,
  [SMALL_STATE(430)] = 6926,
  [SMALL_STATE(431)] = 6932,
  [SMALL_STATE(432)] = 6942,
  [SMALL_STATE(433)] = 6952,
  [SMALL_STATE(434)] = 6962,
  [SMALL_STATE(435)] = 6972,
  [SMALL_STATE(436)] = 6978,
  [SMALL_STATE(437)] = 6988,
  [SMALL_STATE(438)] = 6998,
  [SMALL_STATE(439)] = 7004,
  [SMALL_STATE(440)] = 7010,
  [SMALL_STATE(441)] = 7020,
  [SMALL_STATE(442)] = 7026,
  [SMALL_STATE(443)] = 7032,
  [SMALL_STATE(444)] = 7038,
  [SMALL_STATE(445)] = 7048,
  [SMALL_STATE(446)] = 7058,
  [SMALL_STATE(447)] = 7068,
  [SMALL_STATE(448)] = 7078,
  [SMALL_STATE(449)] = 7088,
  [SMALL_STATE(450)] = 7094,
  [SMALL_STATE(451)] = 7104,
  [SMALL_STATE(452)] = 7110,
  [SMALL_STATE(453)] = 7116,
  [SMALL_STATE(454)] = 7122,
  [SMALL_STATE(455)] = 7132,
  [SMALL_STATE(456)] = 7138,
  [SMALL_STATE(457)] = 7144,
  [SMALL_STATE(458)] = 7150,
  [SMALL_STATE(459)] = 7156,
  [SMALL_STATE(460)] = 7162,
  [SMALL_STATE(461)] = 7168,
  [SMALL_STATE(462)] = 7174,
  [SMALL_STATE(463)] = 7184,
  [SMALL_STATE(464)] = 7194,
  [SMALL_STATE(465)] = 7204,
  [SMALL_STATE(466)] = 7214,
  [SMALL_STATE(467)] = 7224,
  [SMALL_STATE(468)] = 7234,
  [SMALL_STATE(469)] = 7244,
  [SMALL_STATE(470)] = 7254,
  [SMALL_STATE(471)] = 7264,
  [SMALL_STATE(472)] = 7274,
  [SMALL_STATE(473)] = 7284,
  [SMALL_STATE(474)] = 7294,
  [SMALL_STATE(475)] = 7304,
  [SMALL_STATE(476)] = 7314,
  [SMALL_STATE(477)] = 7324,
  [SMALL_STATE(478)] = 7334,
  [SMALL_STATE(479)] = 7344,
  [SMALL_STATE(480)] = 7354,
  [SMALL_STATE(481)] = 7364,
  [SMALL_STATE(482)] = 7374,
  [SMALL_STATE(483)] = 7384,
  [SMALL_STATE(484)] = 7394,
  [SMALL_STATE(485)] = 7404,
  [SMALL_STATE(486)] = 7414,
  [SMALL_STATE(487)] = 7424,
  [SMALL_STATE(488)] = 7430,
  [SMALL_STATE(489)] = 7436,
  [SMALL_STATE(490)] = 7446,
  [SMALL_STATE(491)] = 7456,
  [SMALL_STATE(492)] = 7466,
  [SMALL_STATE(493)] = 7472,
  [SMALL_STATE(494)] = 7478,
  [SMALL_STATE(495)] = 7484,
  [SMALL_STATE(496)] = 7490,
  [SMALL_STATE(497)] = 7496,
  [SMALL_STATE(498)] = 7502,
  [SMALL_STATE(499)] = 7512,
  [SMALL_STATE(500)] = 7518,
  [SMALL_STATE(501)] = 7524,
  [SMALL_STATE(502)] = 7530,
  [SMALL_STATE(503)] = 7540,
  [SMALL_STATE(504)] = 7550,
  [SMALL_STATE(505)] = 7560,
  [SMALL_STATE(506)] = 7570,
  [SMALL_STATE(507)] = 7580,
  [SMALL_STATE(508)] = 7590,
  [SMALL_STATE(509)] = 7596,
  [SMALL_STATE(510)] = 7602,
  [SMALL_STATE(511)] = 7608,
  [SMALL_STATE(512)] = 7614,
  [SMALL_STATE(513)] = 7620,
  [SMALL_STATE(514)] = 7626,
  [SMALL_STATE(515)] = 7632,
  [SMALL_STATE(516)] = 7638,
  [SMALL_STATE(517)] = 7644,
  [SMALL_STATE(518)] = 7650,
  [SMALL_STATE(519)] = 7656,
  [SMALL_STATE(520)] = 7662,
  [SMALL_STATE(521)] = 7668,
  [SMALL_STATE(522)] = 7678,
  [SMALL_STATE(523)] = 7688,
  [SMALL_STATE(524)] = 7698,
  [SMALL_STATE(525)] = 7704,
  [SMALL_STATE(526)] = 7710,
  [SMALL_STATE(527)] = 7716,
  [SMALL_STATE(528)] = 7722,
  [SMALL_STATE(529)] = 7732,
  [SMALL_STATE(530)] = 7742,
  [SMALL_STATE(531)] = 7748,
  [SMALL_STATE(532)] = 7758,
  [SMALL_STATE(533)] = 7764,
  [SMALL_STATE(534)] = 7770,
  [SMALL_STATE(535)] = 7776,
  [SMALL_STATE(536)] = 7782,
  [SMALL_STATE(537)] = 7788,
  [SMALL_STATE(538)] = 7794,
  [SMALL_STATE(539)] = 7804,
  [SMALL_STATE(540)] = 7810,
  [SMALL_STATE(541)] = 7816,
  [SMALL_STATE(542)] = 7822,
  [SMALL_STATE(543)] = 7828,
  [SMALL_STATE(544)] = 7838,
  [SMALL_STATE(545)] = 7848,
  [SMALL_STATE(546)] = 7854,
  [SMALL_STATE(547)] = 7864,
  [SMALL_STATE(548)] = 7874,
  [SMALL_STATE(549)] = 7884,
  [SMALL_STATE(550)] = 7894,
  [SMALL_STATE(551)] = 7904,
  [SMALL_STATE(552)] = 7910,
  [SMALL_STATE(553)] = 7920,
  [SMALL_STATE(554)] = 7930,
  [SMALL_STATE(555)] = 7936,
  [SMALL_STATE(556)] = 7946,
  [SMALL_STATE(557)] = 7956,
  [SMALL_STATE(558)] = 7962,
  [SMALL_STATE(559)] = 7968,
  [SMALL_STATE(560)] = 7974,
  [SMALL_STATE(561)] = 7980,
  [SMALL_STATE(562)] = 7990,
  [SMALL_STATE(563)] = 7996,
  [SMALL_STATE(564)] = 8002,
  [SMALL_STATE(565)] = 8012,
  [SMALL_STATE(566)] = 8018,
  [SMALL_STATE(567)] = 8024,
  [SMALL_STATE(568)] = 8030,
  [SMALL_STATE(569)] = 8040,
  [SMALL_STATE(570)] = 8046,
  [SMALL_STATE(571)] = 8052,
  [SMALL_STATE(572)] = 8058,
  [SMALL_STATE(573)] = 8068,
  [SMALL_STATE(574)] = 8078,
  [SMALL_STATE(575)] = 8084,
  [SMALL_STATE(576)] = 8094,
  [SMALL_STATE(577)] = 8100,
  [SMALL_STATE(578)] = 8110,
  [SMALL_STATE(579)] = 8116,
  [SMALL_STATE(580)] = 8122,
  [SMALL_STATE(581)] = 8130,
  [SMALL_STATE(582)] = 8136,
  [SMALL_STATE(583)] = 8146,
  [SMALL_STATE(584)] = 8156,
  [SMALL_STATE(585)] = 8162,
  [SMALL_STATE(586)] = 8172,
  [SMALL_STATE(587)] = 8178,
  [SMALL_STATE(588)] = 8188,
  [SMALL_STATE(589)] = 8194,
  [SMALL_STATE(590)] = 8204,
  [SMALL_STATE(591)] = 8210,
  [SMALL_STATE(592)] = 8216,
  [SMALL_STATE(593)] = 8222,
  [SMALL_STATE(594)] = 8228,
  [SMALL_STATE(595)] = 8234,
  [SMALL_STATE(596)] = 8240,
  [SMALL_STATE(597)] = 8246,
  [SMALL_STATE(598)] = 8256,
  [SMALL_STATE(599)] = 8262,
  [SMALL_STATE(600)] = 8272,
  [SMALL_STATE(601)] = 8278,
  [SMALL_STATE(602)] = 8284,
  [SMALL_STATE(603)] = 8290,
  [SMALL_STATE(604)] = 8296,
  [SMALL_STATE(605)] = 8306,
  [SMALL_STATE(606)] = 8316,
  [SMALL_STATE(607)] = 8322,
  [SMALL_STATE(608)] = 8328,
  [SMALL_STATE(609)] = 8334,
  [SMALL_STATE(610)] = 8340,
  [SMALL_STATE(611)] = 8346,
  [SMALL_STATE(612)] = 8356,
  [SMALL_STATE(613)] = 8362,
  [SMALL_STATE(614)] = 8368,
  [SMALL_STATE(615)] = 8374,
  [SMALL_STATE(616)] = 8380,
  [SMALL_STATE(617)] = 8390,
  [SMALL_STATE(618)] = 8396,
  [SMALL_STATE(619)] = 8406,
  [SMALL_STATE(620)] = 8412,
  [SMALL_STATE(621)] = 8418,
  [SMALL_STATE(622)] = 8428,
  [SMALL_STATE(623)] = 8434,
  [SMALL_STATE(624)] = 8440,
  [SMALL_STATE(625)] = 8446,
  [SMALL_STATE(626)] = 8456,
  [SMALL_STATE(627)] = 8462,
  [SMALL_STATE(628)] = 8468,
  [SMALL_STATE(629)] = 8474,
  [SMALL_STATE(630)] = 8480,
  [SMALL_STATE(631)] = 8490,
  [SMALL_STATE(632)] = 8500,
  [SMALL_STATE(633)] = 8506,
  [SMALL_STATE(634)] = 8512,
  [SMALL_STATE(635)] = 8518,
  [SMALL_STATE(636)] = 8524,
  [SMALL_STATE(637)] = 8530,
  [SMALL_STATE(638)] = 8540,
  [SMALL_STATE(639)] = 8546,
  [SMALL_STATE(640)] = 8552,
  [SMALL_STATE(641)] = 8558,
  [SMALL_STATE(642)] = 8564,
  [SMALL_STATE(643)] = 8574,
  [SMALL_STATE(644)] = 8584,
  [SMALL_STATE(645)] = 8590,
  [SMALL_STATE(646)] = 8600,
  [SMALL_STATE(647)] = 8606,
  [SMALL_STATE(648)] = 8612,
  [SMALL_STATE(649)] = 8618,
  [SMALL_STATE(650)] = 8624,
  [SMALL_STATE(651)] = 8630,
  [SMALL_STATE(652)] = 8636,
  [SMALL_STATE(653)] = 8642,
  [SMALL_STATE(654)] = 8652,
  [SMALL_STATE(655)] = 8662,
  [SMALL_STATE(656)] = 8668,
  [SMALL_STATE(657)] = 8674,
  [SMALL_STATE(658)] = 8680,
  [SMALL_STATE(659)] = 8690,
  [SMALL_STATE(660)] = 8696,
  [SMALL_STATE(661)] = 8702,
  [SMALL_STATE(662)] = 8712,
  [SMALL_STATE(663)] = 8718,
  [SMALL_STATE(664)] = 8728,
  [SMALL_STATE(665)] = 8734,
  [SMALL_STATE(666)] = 8740,
  [SMALL_STATE(667)] = 8746,
  [SMALL_STATE(668)] = 8752,
  [SMALL_STATE(669)] = 8758,
  [SMALL_STATE(670)] = 8764,
  [SMALL_STATE(671)] = 8770,
  [SMALL_STATE(672)] = 8780,
  [SMALL_STATE(673)] = 8786,
  [SMALL_STATE(674)] = 8792,
  [SMALL_STATE(675)] = 8798,
  [SMALL_STATE(676)] = 8804,
  [SMALL_STATE(677)] = 8810,
  [SMALL_STATE(678)] = 8816,
  [SMALL_STATE(679)] = 8822,
  [SMALL_STATE(680)] = 8832,
  [SMALL_STATE(681)] = 8838,
  [SMALL_STATE(682)] = 8848,
  [SMALL_STATE(683)] = 8854,
  [SMALL_STATE(684)] = 8864,
  [SMALL_STATE(685)] = 8870,
  [SMALL_STATE(686)] = 8876,
  [SMALL_STATE(687)] = 8882,
  [SMALL_STATE(688)] = 8888,
  [SMALL_STATE(689)] = 8894,
  [SMALL_STATE(690)] = 8904,
  [SMALL_STATE(691)] = 8914,
  [SMALL_STATE(692)] = 8924,
  [SMALL_STATE(693)] = 8930,
  [SMALL_STATE(694)] = 8940,
  [SMALL_STATE(695)] = 8950,
  [SMALL_STATE(696)] = 8956,
  [SMALL_STATE(697)] = 8962,
  [SMALL_STATE(698)] = 8972,
  [SMALL_STATE(699)] = 8978,
  [SMALL_STATE(700)] = 8984,
  [SMALL_STATE(701)] = 8990,
  [SMALL_STATE(702)] = 9000,
  [SMALL_STATE(703)] = 9006,
  [SMALL_STATE(704)] = 9016,
  [SMALL_STATE(705)] = 9022,
  [SMALL_STATE(706)] = 9028,
  [SMALL_STATE(707)] = 9034,
  [SMALL_STATE(708)] = 9040,
  [SMALL_STATE(709)] = 9046,
  [SMALL_STATE(710)] = 9052,
  [SMALL_STATE(711)] = 9058,
  [SMALL_STATE(712)] = 9064,
  [SMALL_STATE(713)] = 9070,
  [SMALL_STATE(714)] = 9076,
  [SMALL_STATE(715)] = 9082,
  [SMALL_STATE(716)] = 9092,
  [SMALL_STATE(717)] = 9102,
  [SMALL_STATE(718)] = 9108,
  [SMALL_STATE(719)] = 9114,
  [SMALL_STATE(720)] = 9120,
  [SMALL_STATE(721)] = 9126,
  [SMALL_STATE(722)] = 9132,
  [SMALL_STATE(723)] = 9138,
  [SMALL_STATE(724)] = 9144,
  [SMALL_STATE(725)] = 9150,
  [SMALL_STATE(726)] = 9156,
  [SMALL_STATE(727)] = 9166,
  [SMALL_STATE(728)] = 9176,
  [SMALL_STATE(729)] = 9182,
  [SMALL_STATE(730)] = 9188,
  [SMALL_STATE(731)] = 9194,
  [SMALL_STATE(732)] = 9204,
  [SMALL_STATE(733)] = 9210,
  [SMALL_STATE(734)] = 9216,
  [SMALL_STATE(735)] = 9226,
  [SMALL_STATE(736)] = 9236,
  [SMALL_STATE(737)] = 9242,
  [SMALL_STATE(738)] = 9252,
  [SMALL_STATE(739)] = 9258,
  [SMALL_STATE(740)] = 9268,
  [SMALL_STATE(741)] = 9274,
  [SMALL_STATE(742)] = 9284,
  [SMALL_STATE(743)] = 9294,
  [SMALL_STATE(744)] = 9300,
  [SMALL_STATE(745)] = 9306,
  [SMALL_STATE(746)] = 9312,
  [SMALL_STATE(747)] = 9322,
  [SMALL_STATE(748)] = 9328,
  [SMALL_STATE(749)] = 9334,
  [SMALL_STATE(750)] = 9344,
  [SMALL_STATE(751)] = 9350,
  [SMALL_STATE(752)] = 9360,
  [SMALL_STATE(753)] = 9370,
  [SMALL_STATE(754)] = 9380,
  [SMALL_STATE(755)] = 9386,
  [SMALL_STATE(756)] = 9392,
  [SMALL_STATE(757)] = 9402,
  [SMALL_STATE(758)] = 9408,
  [SMALL_STATE(759)] = 9414,
  [SMALL_STATE(760)] = 9420,
  [SMALL_STATE(761)] = 9426,
  [SMALL_STATE(762)] = 9436,
  [SMALL_STATE(763)] = 9442,
  [SMALL_STATE(764)] = 9447,
  [SMALL_STATE(765)] = 9454,
  [SMALL_STATE(766)] = 9459,
  [SMALL_STATE(767)] = 9464,
  [SMALL_STATE(768)] = 9471,
  [SMALL_STATE(769)] = 9476,
  [SMALL_STATE(770)] = 9481,
  [SMALL_STATE(771)] = 9485,
  [SMALL_STATE(772)] = 9489,
  [SMALL_STATE(773)] = 9493,
  [SMALL_STATE(774)] = 9497,
  [SMALL_STATE(775)] = 9501,
  [SMALL_STATE(776)] = 9505,
  [SMALL_STATE(777)] = 9509,
  [SMALL_STATE(778)] = 9513,
  [SMALL_STATE(779)] = 9517,
  [SMALL_STATE(780)] = 9521,
  [SMALL_STATE(781)] = 9525,
  [SMALL_STATE(782)] = 9529,
  [SMALL_STATE(783)] = 9533,
  [SMALL_STATE(784)] = 9537,
  [SMALL_STATE(785)] = 9541,
  [SMALL_STATE(786)] = 9545,
  [SMALL_STATE(787)] = 9549,
  [SMALL_STATE(788)] = 9553,
  [SMALL_STATE(789)] = 9557,
  [SMALL_STATE(790)] = 9561,
  [SMALL_STATE(791)] = 9565,
  [SMALL_STATE(792)] = 9569,
  [SMALL_STATE(793)] = 9573,
  [SMALL_STATE(794)] = 9577,
  [SMALL_STATE(795)] = 9581,
  [SMALL_STATE(796)] = 9585,
  [SMALL_STATE(797)] = 9589,
  [SMALL_STATE(798)] = 9593,
  [SMALL_STATE(799)] = 9597,
  [SMALL_STATE(800)] = 9601,
  [SMALL_STATE(801)] = 9605,
  [SMALL_STATE(802)] = 9609,
  [SMALL_STATE(803)] = 9613,
  [SMALL_STATE(804)] = 9617,
  [SMALL_STATE(805)] = 9621,
  [SMALL_STATE(806)] = 9625,
};

static const TSParseActionEntry ts_parse_actions[] = {
  [0] = {.entry = {.count = 0, .reusable = false}},
  [1] = {.entry = {.count = 1, .reusable = false}}, RECOVER(),
  [3] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_json, 0),
  [5] = {.entry = {.count = 1, .reusable = true}}, SHIFT(2),
  [7] = {.entry = {.count = 1, .reusable = true}}, SHIFT(769),
  [9] = {.entry = {.count = 1, .reusable = true}}, SHIFT(4),
  [11] = {.entry = {.count = 1, .reusable = true}}, SHIFT(15),
  [13] = {.entry = {.count = 1, .reusable = true}}, SHIFT(265),
  [15] = {.entry = {.count = 1, .reusable = true}}, SHIFT(5),
  [17] = {.entry = {.count = 1, .reusable = true}}, SHIFT(14),
  [19] = {.entry = {.count = 1, .reusable = true}}, SHIFT(765),
  [21] = {.entry = {.count = 1, .reusable = true}}, SHIFT(33),
  [23] = {.entry = {.count = 1, .reusable = true}}, SHIFT(347),
  [25] = {.entry = {.count = 1, .reusable = true}}, SHIFT(11),
  [27] = {.entry = {.count = 1, .reusable = true}}, SHIFT(12),
  [29] = {.entry = {.count = 1, .reusable = true}}, SHIFT(7),
  [31] = {.entry = {.count = 1, .reusable = true}}, SHIFT(10),
  [33] = {.entry = {.count = 1, .reusable = true}}, SHIFT(691),
  [35] = {.entry = {.count = 1, .reusable = false}}, SHIFT(789),
  [37] = {.entry = {.count = 1, .reusable = false}}, SHIFT(772),
  [39] = {.entry = {.count = 1, .reusable = false}}, SHIFT(801),
  [41] = {.entry = {.count = 1, .reusable = false}}, SHIFT(794),
  [43] = {.entry = {.count = 1, .reusable = false}}, SHIFT(795),
  [45] = {.entry = {.count = 1, .reusable = false}}, SHIFT(796),
  [47] = {.entry = {.count = 1, .reusable = false}}, SHIFT(797),
  [49] = {.entry = {.count = 1, .reusable = false}}, SHIFT(798),
  [51] = {.entry = {.count = 1, .reusable = false}}, SHIFT(799),
  [53] = {.entry = {.count = 1, .reusable = false}}, SHIFT(800),
  [55] = {.entry = {.count = 1, .reusable = false}}, SHIFT(806),
  [57] = {.entry = {.count = 1, .reusable = false}}, SHIFT(802),
  [59] = {.entry = {.count = 1, .reusable = false}}, SHIFT(803),
  [61] = {.entry = {.count = 1, .reusable = false}}, SHIFT(804),
  [63] = {.entry = {.count = 1, .reusable = false}}, SHIFT(771),
  [65] = {.entry = {.count = 1, .reusable = false}}, SHIFT(791),
  [67] = {.entry = {.count = 1, .reusable = false}}, SHIFT(792),
  [69] = {.entry = {.count = 1, .reusable = false}}, SHIFT(773),
  [71] = {.entry = {.count = 1, .reusable = false}}, SHIFT(774),
  [73] = {.entry = {.count = 1, .reusable = false}}, SHIFT(775),
  [75] = {.entry = {.count = 1, .reusable = false}}, SHIFT(778),
  [77] = {.entry = {.count = 1, .reusable = false}}, SHIFT(779),
  [79] = {.entry = {.count = 1, .reusable = false}}, SHIFT(780),
  [81] = {.entry = {.count = 1, .reusable = false}}, SHIFT(781),
  [83] = {.entry = {.count = 1, .reusable = false}}, SHIFT(805),
  [85] = {.entry = {.count = 1, .reusable = false}}, SHIFT(784),
  [87] = {.entry = {.count = 1, .reusable = false}}, SHIFT(770),
  [89] = {.entry = {.count = 1, .reusable = false}}, SHIFT(786),
  [91] = {.entry = {.count = 1, .reusable = false}}, SHIFT(787),
  [93] = {.entry = {.count = 1, .reusable = true}}, SHIFT(115),
  [95] = {.entry = {.count = 1, .reusable = true}}, SHIFT(767),
  [97] = {.entry = {.count = 1, .reusable = true}}, SHIFT(17),
  [99] = {.entry = {.count = 1, .reusable = true}}, SHIFT(711),
  [101] = {.entry = {.count = 1, .reusable = true}}, SHIFT(426),
  [103] = {.entry = {.count = 1, .reusable = true}}, SHIFT(288),
  [105] = {.entry = {.count = 1, .reusable = true}}, SHIFT(184),
  [107] = {.entry = {.count = 1, .reusable = true}}, SHIFT(18),
  [109] = {.entry = {.count = 1, .reusable = true}}, SHIFT(709),
  [111] = {.entry = {.count = 1, .reusable = true}}, SHIFT(179),
  [113] = {.entry = {.count = 1, .reusable = true}}, SHIFT(665),
  [115] = {.entry = {.count = 1, .reusable = true}}, SHIFT(229),
  [117] = {.entry = {.count = 1, .reusable = true}}, SHIFT(16),
  [119] = {.entry = {.count = 1, .reusable = true}}, SHIFT(759),
  [121] = {.entry = {.count = 1, .reusable = true}}, SHIFT(116),
  [123] = {.entry = {.count = 1, .reusable = true}}, SHIFT(501),
  [125] = {.entry = {.count = 1, .reusable = true}}, SHIFT(23),
  [127] = {.entry = {.count = 1, .reusable = true}}, SHIFT(664),
  [129] = {.entry = {.count = 1, .reusable = true}}, SHIFT(20),
  [131] = {.entry = {.count = 1, .reusable = true}}, SHIFT(591),
  [133] = {.entry = {.count = 1, .reusable = true}}, SHIFT(180),
  [135] = {.entry = {.count = 1, .reusable = true}}, SHIFT(31),
  [137] = {.entry = {.count = 1, .reusable = true}}, SHIFT(19),
  [139] = {.entry = {.count = 1, .reusable = true}}, SHIFT(755),
  [141] = {.entry = {.count = 1, .reusable = true}}, SHIFT(686),
  [143] = {.entry = {.count = 1, .reusable = true}}, SHIFT(38),
  [145] = {.entry = {.count = 1, .reusable = true}}, SHIFT(717),
  [147] = {.entry = {.count = 1, .reusable = true}}, SHIFT(627),
  [149] = {.entry = {.count = 1, .reusable = true}}, SHIFT(25),
  [151] = {.entry = {.count = 1, .reusable = true}}, SHIFT(733),
  [153] = {.entry = {.count = 1, .reusable = true}}, SHIFT(609),
  [155] = {.entry = {.count = 1, .reusable = true}}, SHIFT(608),
  [157] = {.entry = {.count = 1, .reusable = true}}, SHIFT(707),
  [159] = {.entry = {.count = 1, .reusable = true}}, SHIFT(29),
  [161] = {.entry = {.count = 1, .reusable = true}}, SHIFT(672),
  [163] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat1, 2),
  [165] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat1, 2), SHIFT_REPEAT(33),
  [168] = {.entry = {.count = 1, .reusable = true}}, SHIFT(37),
  [170] = {.entry = {.count = 1, .reusable = true}}, SHIFT(730),
  [172] = {.entry = {.count = 1, .reusable = true}}, SHIFT(30),
  [174] = {.entry = {.count = 1, .reusable = true}}, SHIFT(27),
  [176] = {.entry = {.count = 1, .reusable = true}}, SHIFT(499),
  [178] = {.entry = {.count = 1, .reusable = true}}, SHIFT(40),
  [180] = {.entry = {.count = 1, .reusable = true}}, SHIFT(86),
  [182] = {.entry = {.count = 1, .reusable = true}}, SHIFT(563),
  [184] = {.entry = {.count = 1, .reusable = true}}, SHIFT(632),
  [186] = {.entry = {.count = 1, .reusable = true}}, SHIFT(46),
  [188] = {.entry = {.count = 1, .reusable = true}}, SHIFT(655),
  [190] = {.entry = {.count = 1, .reusable = true}}, SHIFT(138),
  [192] = {.entry = {.count = 1, .reusable = true}}, SHIFT(49),
  [194] = {.entry = {.count = 1, .reusable = true}}, SHIFT(54),
  [196] = {.entry = {.count = 1, .reusable = true}}, SHIFT(682),
  [198] = {.entry = {.count = 1, .reusable = true}}, SHIFT(687),
  [200] = {.entry = {.count = 1, .reusable = true}}, SHIFT(53),
  [202] = {.entry = {.count = 1, .reusable = true}}, SHIFT(569),
  [204] = {.entry = {.count = 1, .reusable = true}}, SHIFT(56),
  [206] = {.entry = {.count = 1, .reusable = true}}, SHIFT(699),
  [208] = {.entry = {.count = 1, .reusable = true}}, SHIFT(52),
  [210] = {.entry = {.count = 1, .reusable = true}}, SHIFT(600),
  [212] = {.entry = {.count = 1, .reusable = true}}, SHIFT(42),
  [214] = {.entry = {.count = 1, .reusable = true}}, SHIFT(738),
  [216] = {.entry = {.count = 1, .reusable = true}}, SHIFT(728),
  [218] = {.entry = {.count = 1, .reusable = true}}, SHIFT(626),
  [220] = {.entry = {.count = 1, .reusable = true}}, SHIFT(45),
  [222] = {.entry = {.count = 1, .reusable = true}}, SHIFT(66),
  [224] = {.entry = {.count = 1, .reusable = true}}, SHIFT(60),
  [226] = {.entry = {.count = 1, .reusable = true}}, SHIFT(542),
  [228] = {.entry = {.count = 1, .reusable = true}}, SHIFT(598),
  [230] = {.entry = {.count = 1, .reusable = true}}, SHIFT(63),
  [232] = {.entry = {.count = 1, .reusable = true}}, SHIFT(64),
  [234] = {.entry = {.count = 1, .reusable = true}}, SHIFT(652),
  [236] = {.entry = {.count = 1, .reusable = true}}, SHIFT(67),
  [238] = {.entry = {.count = 1, .reusable = true}}, SHIFT(59),
  [240] = {.entry = {.count = 1, .reusable = true}}, SHIFT(70),
  [242] = {.entry = {.count = 1, .reusable = true}}, SHIFT(580),
  [244] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value, 1),
  [246] = {.entry = {.count = 1, .reusable = true}}, SHIFT(201),
  [248] = {.entry = {.count = 1, .reusable = true}}, SHIFT(258),
  [250] = {.entry = {.count = 1, .reusable = true}}, SHIFT(460),
  [252] = {.entry = {.count = 1, .reusable = true}}, SHIFT(409),
  [254] = {.entry = {.count = 1, .reusable = true}}, SHIFT(567),
  [256] = {.entry = {.count = 1, .reusable = true}}, SHIFT(127),
  [258] = {.entry = {.count = 1, .reusable = true}}, SHIFT(274),
  [260] = {.entry = {.count = 1, .reusable = true}}, SHIFT(292),
  [262] = {.entry = {.count = 1, .reusable = true}}, SHIFT(384),
  [264] = {.entry = {.count = 1, .reusable = true}}, SHIFT(513),
  [266] = {.entry = {.count = 1, .reusable = true}}, SHIFT(6),
  [268] = {.entry = {.count = 1, .reusable = true}}, SHIFT(399),
  [270] = {.entry = {.count = 1, .reusable = true}}, SHIFT(398),
  [272] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 2), SHIFT_REPEAT(6),
  [275] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 2),
  [277] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 2), SHIFT_REPEAT(490),
  [280] = {.entry = {.count = 1, .reusable = true}}, SHIFT(282),
  [282] = {.entry = {.count = 1, .reusable = true}}, SHIFT(509),
  [284] = {.entry = {.count = 1, .reusable = true}}, SHIFT(386),
  [286] = {.entry = {.count = 1, .reusable = true}}, SHIFT(269),
  [288] = {.entry = {.count = 1, .reusable = true}}, SHIFT(395),
  [290] = {.entry = {.count = 1, .reusable = true}}, SHIFT(496),
  [292] = {.entry = {.count = 1, .reusable = true}}, SHIFT(396),
  [294] = {.entry = {.count = 1, .reusable = true}}, SHIFT(494),
  [296] = {.entry = {.count = 1, .reusable = true}}, SHIFT(519),
  [298] = {.entry = {.count = 1, .reusable = true}}, SHIFT(369),
  [300] = {.entry = {.count = 1, .reusable = true}}, SHIFT(337),
  [302] = {.entry = {.count = 1, .reusable = true}}, SHIFT(560),
  [304] = {.entry = {.count = 1, .reusable = true}}, SHIFT(62),
  [306] = {.entry = {.count = 1, .reusable = true}}, SHIFT(335),
  [308] = {.entry = {.count = 1, .reusable = true}}, SHIFT(250),
  [310] = {.entry = {.count = 1, .reusable = true}}, SHIFT(562),
  [312] = {.entry = {.count = 1, .reusable = true}}, SHIFT(425),
  [314] = {.entry = {.count = 1, .reusable = true}}, SHIFT(574),
  [316] = {.entry = {.count = 1, .reusable = true}}, SHIFT(322),
  [318] = {.entry = {.count = 1, .reusable = true}}, SHIFT(453),
  [320] = {.entry = {.count = 1, .reusable = true}}, SHIFT(565),
  [322] = {.entry = {.count = 1, .reusable = true}}, SHIFT(424),
  [324] = {.entry = {.count = 1, .reusable = true}}, SHIFT(422),
  [326] = {.entry = {.count = 1, .reusable = true}}, SHIFT(571),
  [328] = {.entry = {.count = 1, .reusable = true}}, SHIFT(420),
  [330] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 2), SHIFT_REPEAT(292),
  [333] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 2), SHIFT_REPEAT(454),
  [336] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 2),
  [338] = {.entry = {.count = 1, .reusable = true}}, SHIFT(319),
  [340] = {.entry = {.count = 1, .reusable = true}}, SHIFT(576),
  [342] = {.entry = {.count = 1, .reusable = true}}, SHIFT(657),
  [344] = {.entry = {.count = 1, .reusable = true}}, SHIFT(248),
  [346] = {.entry = {.count = 1, .reusable = true}}, SHIFT(65),
  [348] = {.entry = {.count = 1, .reusable = true}}, SHIFT(581),
  [350] = {.entry = {.count = 1, .reusable = true}}, SHIFT(412),
  [352] = {.entry = {.count = 1, .reusable = true}}, SHIFT(428),
  [354] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 2), SHIFT_REPEAT(282),
  [357] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 2),
  [359] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 2), SHIFT_REPEAT(716),
  [362] = {.entry = {.count = 1, .reusable = true}}, SHIFT(3),
  [364] = {.entry = {.count = 1, .reusable = true}}, SHIFT(443),
  [366] = {.entry = {.count = 1, .reusable = true}}, SHIFT(249),
  [368] = {.entry = {.count = 1, .reusable = true}}, SHIFT(442),
  [370] = {.entry = {.count = 1, .reusable = true}}, SHIFT(427),
  [372] = {.entry = {.count = 1, .reusable = true}}, SHIFT(441),
  [374] = {.entry = {.count = 1, .reusable = true}}, SHIFT(607),
  [376] = {.entry = {.count = 1, .reusable = true}}, SHIFT(390),
  [378] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2), SHIFT_REPEAT(269),
  [381] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2), SHIFT_REPEAT(440),
  [384] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2),
  [386] = {.entry = {.count = 1, .reusable = true}}, SHIFT(418),
  [388] = {.entry = {.count = 1, .reusable = true}}, SHIFT(419),
  [390] = {.entry = {.count = 1, .reusable = true}}, SHIFT(636),
  [392] = {.entry = {.count = 1, .reusable = true}}, SHIFT(385),
  [394] = {.entry = {.count = 1, .reusable = true}}, SHIFT(286),
  [396] = {.entry = {.count = 1, .reusable = true}}, SHIFT(285),
  [398] = {.entry = {.count = 1, .reusable = true}}, SHIFT(764),
  [400] = {.entry = {.count = 1, .reusable = true}}, SHIFT(13),
  [402] = {.entry = {.count = 1, .reusable = true}}, SHIFT(766),
  [404] = {.entry = {.count = 1, .reusable = true}}, SHIFT(261),
  [406] = {.entry = {.count = 1, .reusable = true}}, SHIFT(606),
  [408] = {.entry = {.count = 1, .reusable = true}}, SHIFT(144),
  [410] = {.entry = {.count = 1, .reusable = true}}, SHIFT(783),
  [412] = {.entry = {.count = 1, .reusable = true}}, SHIFT(710),
  [414] = {.entry = {.count = 1, .reusable = true}}, SHIFT(177),
  [416] = {.entry = {.count = 1, .reusable = true}}, SHIFT(21),
  [418] = {.entry = {.count = 1, .reusable = true}}, SHIFT(276),
  [420] = {.entry = {.count = 1, .reusable = true}}, SHIFT(644),
  [422] = {.entry = {.count = 1, .reusable = true}}, SHIFT(383),
  [424] = {.entry = {.count = 1, .reusable = true}}, SHIFT(706),
  [426] = {.entry = {.count = 1, .reusable = true}}, SHIFT(189),
  [428] = {.entry = {.count = 1, .reusable = true}}, SHIFT(612),
  [430] = {.entry = {.count = 1, .reusable = true}}, SHIFT(150),
  [432] = {.entry = {.count = 1, .reusable = true}}, SHIFT(195),
  [434] = {.entry = {.count = 1, .reusable = true}}, SHIFT(702),
  [436] = {.entry = {.count = 1, .reusable = true}}, SHIFT(659),
  [438] = {.entry = {.count = 1, .reusable = true}}, SHIFT(380),
  [440] = {.entry = {.count = 1, .reusable = true}}, SHIFT(617),
  [442] = {.entry = {.count = 1, .reusable = true}}, SHIFT(159),
  [444] = {.entry = {.count = 1, .reusable = true}}, SHIFT(289),
  [446] = {.entry = {.count = 1, .reusable = true}}, SHIFT(495),
  [448] = {.entry = {.count = 1, .reusable = true}}, SHIFT(400),
  [450] = {.entry = {.count = 1, .reusable = true}}, SHIFT(704),
  [452] = {.entry = {.count = 1, .reusable = true}}, SHIFT(373),
  [454] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 2), SHIFT_REPEAT(258),
  [457] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 2),
  [459] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 2), SHIFT_REPEAT(491),
  [462] = {.entry = {.count = 1, .reusable = true}}, SHIFT(675),
  [464] = {.entry = {.count = 1, .reusable = true}}, SHIFT(205),
  [466] = {.entry = {.count = 1, .reusable = true}}, SHIFT(278),
  [468] = {.entry = {.count = 1, .reusable = true}}, SHIFT(389),
  [470] = {.entry = {.count = 1, .reusable = true}}, SHIFT(510),
  [472] = {.entry = {.count = 1, .reusable = true}}, SHIFT(511),
  [474] = {.entry = {.count = 1, .reusable = true}}, SHIFT(387),
  [476] = {.entry = {.count = 1, .reusable = false}}, SHIFT(259),
  [478] = {.entry = {.count = 1, .reusable = true}}, SHIFT(760),
  [480] = {.entry = {.count = 1, .reusable = true}}, SHIFT(359),
  [482] = {.entry = {.count = 1, .reusable = true}}, SHIFT(256),
  [484] = {.entry = {.count = 1, .reusable = true}}, SHIFT(758),
  [486] = {.entry = {.count = 1, .reusable = true}}, SHIFT(356),
  [488] = {.entry = {.count = 1, .reusable = true}}, SHIFT(662),
  [490] = {.entry = {.count = 1, .reusable = true}}, SHIFT(237),
  [492] = {.entry = {.count = 1, .reusable = true}}, SHIFT(211),
  [494] = {.entry = {.count = 1, .reusable = true}}, SHIFT(684),
  [496] = {.entry = {.count = 1, .reusable = true}}, SHIFT(221),
  [498] = {.entry = {.count = 1, .reusable = true}}, SHIFT(754),
  [500] = {.entry = {.count = 1, .reusable = true}}, SHIFT(342),
  [502] = {.entry = {.count = 1, .reusable = true}}, SHIFT(668),
  [504] = {.entry = {.count = 1, .reusable = true}}, SHIFT(255),
  [506] = {.entry = {.count = 1, .reusable = true}}, SHIFT(217),
  [508] = {.entry = {.count = 1, .reusable = true}}, SHIFT(90),
  [510] = {.entry = {.count = 1, .reusable = true}}, SHIFT(518),
  [512] = {.entry = {.count = 1, .reusable = true}}, SHIFT(379),
  [514] = {.entry = {.count = 1, .reusable = true}}, SHIFT(750),
  [516] = {.entry = {.count = 1, .reusable = true}}, SHIFT(674),
  [518] = {.entry = {.count = 1, .reusable = true}}, SHIFT(243),
  [520] = {.entry = {.count = 1, .reusable = true}}, SHIFT(341),
  [522] = {.entry = {.count = 1, .reusable = true}}, SHIFT(213),
  [524] = {.entry = {.count = 1, .reusable = true}}, SHIFT(525),
  [526] = {.entry = {.count = 1, .reusable = true}}, SHIFT(97),
  [528] = {.entry = {.count = 1, .reusable = true}}, SHIFT(370),
  [530] = {.entry = {.count = 1, .reusable = true}}, SHIFT(745),
  [532] = {.entry = {.count = 1, .reusable = true}}, SHIFT(340),
  [534] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_beginCaptures_repeat1, 2), SHIFT_REPEAT(250),
  [537] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_beginCaptures_repeat1, 2),
  [539] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_beginCaptures_repeat1, 2), SHIFT_REPEAT(746),
  [542] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 2), SHIFT_REPEAT(62),
  [545] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 2),
  [547] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 2), SHIFT_REPEAT(683),
  [550] = {.entry = {.count = 1, .reusable = true}}, SHIFT(667),
  [552] = {.entry = {.count = 1, .reusable = true}}, SHIFT(332),
  [554] = {.entry = {.count = 1, .reusable = true}}, SHIFT(264),
  [556] = {.entry = {.count = 1, .reusable = true}}, SHIFT(666),
  [558] = {.entry = {.count = 1, .reusable = true}}, SHIFT(242),
  [560] = {.entry = {.count = 1, .reusable = true}}, SHIFT(102),
  [562] = {.entry = {.count = 1, .reusable = true}}, SHIFT(532),
  [564] = {.entry = {.count = 1, .reusable = true}}, SHIFT(246),
  [566] = {.entry = {.count = 1, .reusable = true}}, SHIFT(112),
  [568] = {.entry = {.count = 1, .reusable = true}}, SHIFT(763),
  [570] = {.entry = {.count = 1, .reusable = true}}, SHIFT(350),
  [572] = {.entry = {.count = 1, .reusable = true}}, SHIFT(252),
  [574] = {.entry = {.count = 1, .reusable = true}}, SHIFT(358),
  [576] = {.entry = {.count = 1, .reusable = true}}, SHIFT(534),
  [578] = {.entry = {.count = 1, .reusable = true}}, SHIFT(328),
  [580] = {.entry = {.count = 1, .reusable = true}}, SHIFT(245),
  [582] = {.entry = {.count = 1, .reusable = true}}, SHIFT(656),
  [584] = {.entry = {.count = 1, .reusable = true}}, SHIFT(260),
  [586] = {.entry = {.count = 1, .reusable = true}}, SHIFT(236),
  [588] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 2), SHIFT_REPEAT(13),
  [591] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 2),
  [593] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 2), SHIFT_REPEAT(761),
  [596] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 2), SHIFT_REPEAT(65),
  [599] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 2),
  [601] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 2), SHIFT_REPEAT(739),
  [604] = {.entry = {.count = 1, .reusable = true}}, SHIFT(271),
  [606] = {.entry = {.count = 1, .reusable = true}}, SHIFT(640),
  [608] = {.entry = {.count = 1, .reusable = true}}, SHIFT(635),
  [610] = {.entry = {.count = 1, .reusable = true}}, SHIFT(182),
  [612] = {.entry = {.count = 1, .reusable = true}}, SHIFT(355),
  [614] = {.entry = {.count = 1, .reusable = true}}, SHIFT(535),
  [616] = {.entry = {.count = 1, .reusable = true}}, SHIFT(325),
  [618] = {.entry = {.count = 1, .reusable = true}}, SHIFT(348),
  [620] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__includeScope, 2),
  [622] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym__includeScope, 2), SHIFT_REPEAT(201),
  [625] = {.entry = {.count = 1, .reusable = true}}, SHIFT(306),
  [627] = {.entry = {.count = 1, .reusable = true}}, SHIFT(629),
  [629] = {.entry = {.count = 1, .reusable = true}}, SHIFT(284),
  [631] = {.entry = {.count = 1, .reusable = true}}, SHIFT(164),
  [633] = {.entry = {.count = 1, .reusable = true}}, SHIFT(725),
  [635] = {.entry = {.count = 1, .reusable = true}}, SHIFT(303),
  [637] = {.entry = {.count = 1, .reusable = true}}, SHIFT(719),
  [639] = {.entry = {.count = 1, .reusable = true}}, SHIFT(147),
  [641] = {.entry = {.count = 1, .reusable = true}}, SHIFT(294),
  [643] = {.entry = {.count = 1, .reusable = true}}, SHIFT(619),
  [645] = {.entry = {.count = 1, .reusable = true}}, SHIFT(154),
  [647] = {.entry = {.count = 1, .reusable = true}}, SHIFT(266),
  [649] = {.entry = {.count = 1, .reusable = true}}, SHIFT(714),
  [651] = {.entry = {.count = 1, .reusable = true}}, SHIFT(157),
  [653] = {.entry = {.count = 1, .reusable = true}}, SHIFT(287),
  [655] = {.entry = {.count = 1, .reusable = true}}, SHIFT(708),
  [657] = {.entry = {.count = 1, .reusable = true}}, SHIFT(166),
  [659] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 2), SHIFT_REPEAT(286),
  [662] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 2),
  [664] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 2), SHIFT_REPEAT(597),
  [667] = {.entry = {.count = 1, .reusable = true}}, SHIFT(601),
  [669] = {.entry = {.count = 1, .reusable = true}}, SHIFT(310),
  [671] = {.entry = {.count = 1, .reusable = true}}, SHIFT(280),
  [673] = {.entry = {.count = 1, .reusable = true}}, SHIFT(595),
  [675] = {.entry = {.count = 1, .reusable = true}}, SHIFT(312),
  [677] = {.entry = {.count = 1, .reusable = true}}, SHIFT(315),
  [679] = {.entry = {.count = 1, .reusable = true}}, SHIFT(593),
  [681] = {.entry = {.count = 1, .reusable = true}}, SHIFT(273),
  [683] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 2), SHIFT_REPEAT(21),
  [686] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 2), SHIFT_REPEAT(587),
  [689] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 2),
  [691] = {.entry = {.count = 1, .reusable = true}}, SHIFT(320),
  [693] = {.entry = {.count = 1, .reusable = true}}, SHIFT(329),
  [695] = {.entry = {.count = 1, .reusable = true}}, SHIFT(279),
  [697] = {.entry = {.count = 1, .reusable = true}}, SHIFT(267),
  [699] = {.entry = {.count = 1, .reusable = true}}, SHIFT(263),
  [701] = {.entry = {.count = 1, .reusable = true}}, SHIFT(57),
  [703] = {.entry = {.count = 1, .reusable = true}}, SHIFT(22),
  [705] = {.entry = {.count = 1, .reusable = true}}, SHIFT(630),
  [707] = {.entry = {.count = 1, .reusable = true}}, SHIFT(451),
  [709] = {.entry = {.count = 1, .reusable = true}}, SHIFT(353),
  [711] = {.entry = {.count = 1, .reusable = true}}, SHIFT(275),
  [713] = {.entry = {.count = 1, .reusable = true}}, SHIFT(68),
  [715] = {.entry = {.count = 1, .reusable = true}}, SHIFT(575),
  [717] = {.entry = {.count = 1, .reusable = true}}, SHIFT(326),
  [719] = {.entry = {.count = 1, .reusable = true}}, SHIFT(694),
  [721] = {.entry = {.count = 1, .reusable = true}}, SHIFT(327),
  [723] = {.entry = {.count = 1, .reusable = true}}, SHIFT(8),
  [725] = {.entry = {.count = 1, .reusable = true}}, SHIFT(307),
  [727] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 2),
  [729] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__includeItem, 2),
  [731] = {.entry = {.count = 1, .reusable = true}}, SHIFT(352),
  [733] = {.entry = {.count = 1, .reusable = true}}, SHIFT(735),
  [735] = {.entry = {.count = 1, .reusable = true}}, SHIFT(658),
  [737] = {.entry = {.count = 1, .reusable = true}}, SHIFT(334),
  [739] = {.entry = {.count = 1, .reusable = true}}, SHIFT(528),
  [741] = {.entry = {.count = 1, .reusable = true}}, SHIFT(367),
  [743] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__string, 3, .production_id = 1),
  [745] = {.entry = {.count = 1, .reusable = true}}, SHIFT(368),
  [747] = {.entry = {.count = 1, .reusable = true}}, SHIFT(262),
  [749] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_boolean, 1),
  [751] = {.entry = {.count = 1, .reusable = true}}, SHIFT(251),
  [753] = {.entry = {.count = 1, .reusable = true}}, SHIFT(376),
  [755] = {.entry = {.count = 1, .reusable = true}}, SHIFT(247),
  [757] = {.entry = {.count = 1, .reusable = true}}, SHIFT(377),
  [759] = {.entry = {.count = 1, .reusable = true}}, SHIFT(244),
  [761] = {.entry = {.count = 1, .reusable = true}}, SHIFT(241),
  [763] = {.entry = {.count = 1, .reusable = true}}, SHIFT(239),
  [765] = {.entry = {.count = 1, .reusable = true}}, SHIFT(240),
  [767] = {.entry = {.count = 1, .reusable = true}}, SHIFT(514),
  [769] = {.entry = {.count = 1, .reusable = true}}, SHIFT(253),
  [771] = {.entry = {.count = 1, .reusable = true}}, SHIFT(639),
  [773] = {.entry = {.count = 1, .reusable = true}}, SHIFT(392),
  [775] = {.entry = {.count = 1, .reusable = true}}, SHIFT(638),
  [777] = {.entry = {.count = 1, .reusable = true}}, SHIFT(361),
  [779] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repo_repeat1, 2),
  [781] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_repo_repeat1, 2), SHIFT_REPEAT(451),
  [784] = {.entry = {.count = 1, .reusable = true}}, SHIFT(397),
  [786] = {.entry = {.count = 1, .reusable = true}}, SHIFT(254),
  [788] = {.entry = {.count = 1, .reusable = true}}, SHIFT(272),
  [790] = {.entry = {.count = 1, .reusable = true}}, SHIFT(622),
  [792] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 6),
  [794] = {.entry = {.count = 1, .reusable = true}}, SHIFT(308),
  [796] = {.entry = {.count = 1, .reusable = true}}, SHIFT(309),
  [798] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 3),
  [800] = {.entry = {.count = 1, .reusable = true}}, SHIFT(9),
  [802] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__string, 2),
  [804] = {.entry = {.count = 1, .reusable = true}}, SHIFT(768),
  [806] = {.entry = {.count = 1, .reusable = true}}, SHIFT(311),
  [808] = {.entry = {.count = 1, .reusable = true}}, SHIFT(423),
  [810] = {.entry = {.count = 1, .reusable = true}}, SHIFT(439),
  [812] = {.entry = {.count = 1, .reusable = true}}, SHIFT(624),
  [814] = {.entry = {.count = 1, .reusable = true}}, SHIFT(314),
  [816] = {.entry = {.count = 1, .reusable = true}}, SHIFT(401),
  [818] = {.entry = {.count = 1, .reusable = true}}, SHIFT(317),
  [820] = {.entry = {.count = 1, .reusable = true}}, SHIFT(318),
  [822] = {.entry = {.count = 1, .reusable = true}}, SHIFT(277),
  [824] = {.entry = {.count = 1, .reusable = true}}, SHIFT(579),
  [826] = {.entry = {.count = 1, .reusable = true}}, SHIFT(408),
  [828] = {.entry = {.count = 1, .reusable = true}}, SHIFT(291),
  [830] = {.entry = {.count = 1, .reusable = true}}, SHIFT(295),
  [832] = {.entry = {.count = 1, .reusable = true}}, SHIFT(415),
  [834] = {.entry = {.count = 1, .reusable = true}}, SHIFT(297),
  [836] = {.entry = {.count = 1, .reusable = true}}, SHIFT(300),
  [838] = {.entry = {.count = 1, .reusable = true}}, SHIFT(302),
  [840] = {.entry = {.count = 1, .reusable = true}}, SHIFT(455),
  [842] = {.entry = {.count = 1, .reusable = true}}, SHIFT(305),
  [844] = {.entry = {.count = 1, .reusable = true}}, SHIFT(456),
  [846] = {.entry = {.count = 1, .reusable = true}}, SHIFT(558),
  [848] = {.entry = {.count = 1, .reusable = true}}, SHIFT(316),
  [850] = {.entry = {.count = 1, .reusable = true}}, SHIFT(414),
  [852] = {.entry = {.count = 1, .reusable = true}}, SHIFT(417),
  [854] = {.entry = {.count = 1, .reusable = true}}, SHIFT(559),
  [856] = {.entry = {.count = 1, .reusable = true}}, SHIFT(338),
  [858] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 5),
  [860] = {.entry = {.count = 1, .reusable = true}}, SHIFT(344),
  [862] = {.entry = {.count = 1, .reusable = true}}, SHIFT(346),
  [864] = {.entry = {.count = 1, .reusable = true}}, SHIFT(354),
  [866] = {.entry = {.count = 1, .reusable = true}}, SHIFT(360),
  [868] = {.entry = {.count = 1, .reusable = true}}, SHIFT(364),
  [870] = {.entry = {.count = 1, .reusable = true}}, SHIFT(366),
  [872] = {.entry = {.count = 1, .reusable = true}}, SHIFT(298),
  [874] = {.entry = {.count = 1, .reusable = true}}, SHIFT(331),
  [876] = {.entry = {.count = 1, .reusable = true}}, SHIFT(545),
  [878] = {.entry = {.count = 1, .reusable = true}}, SHIFT(333),
  [880] = {.entry = {.count = 1, .reusable = true}}, SHIFT(375),
  [882] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__pattern, 4),
  [884] = {.entry = {.count = 1, .reusable = true}}, SHIFT(541),
  [886] = {.entry = {.count = 1, .reusable = true}}, SHIFT(339),
  [888] = {.entry = {.count = 1, .reusable = true}}, SHIFT(540),
  [890] = {.entry = {.count = 1, .reusable = true}}, SHIFT(488),
  [892] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_integer, 1),
  [894] = {.entry = {.count = 1, .reusable = true}}, SHIFT(493),
  [896] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_scopeName, 7),
  [898] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_firstLineMatch, 7),
  [900] = {.entry = {.count = 1, .reusable = true}}, SHIFT(480),
  [902] = {.entry = {.count = 1, .reusable = true}}, SHIFT(479),
  [904] = {.entry = {.count = 1, .reusable = true}}, SHIFT(482),
  [906] = {.entry = {.count = 1, .reusable = true}}, SHIFT(481),
  [908] = {.entry = {.count = 1, .reusable = true}}, SHIFT(484),
  [910] = {.entry = {.count = 1, .reusable = true}}, SHIFT(483),
  [912] = {.entry = {.count = 1, .reusable = true}}, SHIFT(486),
  [914] = {.entry = {.count = 1, .reusable = true}}, SHIFT(485),
  [916] = {.entry = {.count = 1, .reusable = true}}, SHIFT(637),
  [918] = {.entry = {.count = 1, .reusable = true}}, SHIFT(631),
  [920] = {.entry = {.count = 1, .reusable = true}}, SHIFT(625),
  [922] = {.entry = {.count = 1, .reusable = true}}, SHIFT(388),
  [924] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 3, .production_id = 5),
  [926] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9, .production_id = 2),
  [928] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9, .production_id = 4),
  [930] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9, .production_id = 6),
  [932] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 9),
  [934] = {.entry = {.count = 1, .reusable = true}}, SHIFT(604),
  [936] = {.entry = {.count = 1, .reusable = true}}, SHIFT(28),
  [938] = {.entry = {.count = 1, .reusable = true}}, SHIFT(44),
  [940] = {.entry = {.count = 1, .reusable = true}}, SHIFT(504),
  [942] = {.entry = {.count = 1, .reusable = true}}, SHIFT(48),
  [944] = {.entry = {.count = 1, .reusable = true}}, SHIFT(506),
  [946] = {.entry = {.count = 1, .reusable = true}}, SHIFT(507),
  [948] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 3),
  [950] = {.entry = {.count = 1, .reusable = true}}, SHIFT(118),
  [952] = {.entry = {.count = 1, .reusable = true}}, SHIFT(753),
  [954] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repo_repeat1, 1),
  [956] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 3),
  [958] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 9),
  [960] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 6),
  [962] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 6),
  [964] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 5),
  [966] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 5, .production_id = 7),
  [968] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 4),
  [970] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 10),
  [972] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 8, .production_id = 10),
  [974] = {.entry = {.count = 1, .reusable = true}}, SHIFT(476),
  [976] = {.entry = {.count = 1, .reusable = true}}, SHIFT(402),
  [978] = {.entry = {.count = 1, .reusable = true}}, SHIFT(522),
  [980] = {.entry = {.count = 1, .reusable = true}}, SHIFT(69),
  [982] = {.entry = {.count = 1, .reusable = true}}, SHIFT(523),
  [984] = {.entry = {.count = 1, .reusable = true}}, SHIFT(474),
  [986] = {.entry = {.count = 1, .reusable = true}}, SHIFT(403),
  [988] = {.entry = {.count = 1, .reusable = true}}, SHIFT(365),
  [990] = {.entry = {.count = 1, .reusable = true}}, SHIFT(472),
  [992] = {.entry = {.count = 1, .reusable = true}}, SHIFT(404),
  [994] = {.entry = {.count = 1, .reusable = true}}, SHIFT(363),
  [996] = {.entry = {.count = 1, .reusable = true}}, SHIFT(470),
  [998] = {.entry = {.count = 1, .reusable = true}}, SHIFT(405),
  [1000] = {.entry = {.count = 1, .reusable = true}}, SHIFT(357),
  [1002] = {.entry = {.count = 1, .reusable = true}}, SHIFT(468),
  [1004] = {.entry = {.count = 1, .reusable = true}}, SHIFT(406),
  [1006] = {.entry = {.count = 1, .reusable = true}}, SHIFT(351),
  [1008] = {.entry = {.count = 1, .reusable = true}}, SHIFT(466),
  [1010] = {.entry = {.count = 1, .reusable = true}}, SHIFT(407),
  [1012] = {.entry = {.count = 1, .reusable = true}}, SHIFT(345),
  [1014] = {.entry = {.count = 1, .reusable = true}}, SHIFT(464),
  [1016] = {.entry = {.count = 1, .reusable = true}}, SHIFT(463),
  [1018] = {.entry = {.count = 1, .reusable = true}}, SHIFT(343),
  [1020] = {.entry = {.count = 1, .reusable = true}}, SHIFT(599),
  [1022] = {.entry = {.count = 1, .reusable = true}}, SHIFT(391),
  [1024] = {.entry = {.count = 1, .reusable = true}}, SHIFT(61),
  [1026] = {.entry = {.count = 1, .reusable = true}}, SHIFT(51),
  [1028] = {.entry = {.count = 1, .reusable = true}}, SHIFT(546),
  [1030] = {.entry = {.count = 1, .reusable = true}}, SHIFT(547),
  [1032] = {.entry = {.count = 1, .reusable = true}}, SHIFT(114),
  [1034] = {.entry = {.count = 1, .reusable = true}}, SHIFT(549),
  [1036] = {.entry = {.count = 1, .reusable = true}}, SHIFT(550),
  [1038] = {.entry = {.count = 1, .reusable = true}}, SHIFT(120),
  [1040] = {.entry = {.count = 1, .reusable = true}}, SHIFT(552),
  [1042] = {.entry = {.count = 1, .reusable = true}}, SHIFT(553),
  [1044] = {.entry = {.count = 1, .reusable = true}}, SHIFT(124),
  [1046] = {.entry = {.count = 1, .reusable = true}}, SHIFT(555),
  [1048] = {.entry = {.count = 1, .reusable = true}}, SHIFT(556),
  [1050] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 3),
  [1052] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 12),
  [1054] = {.entry = {.count = 1, .reusable = true}}, SHIFT(583),
  [1056] = {.entry = {.count = 1, .reusable = true}}, SHIFT(582),
  [1058] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 4, .production_id = 8),
  [1060] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 10, .production_id = 4),
  [1062] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 10, .production_id = 6),
  [1064] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 9),
  [1066] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 10, .production_id = 9),
  [1068] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_repository_repeat1, 3),
  [1070] = {.entry = {.count = 1, .reusable = true}}, SHIFT(416),
  [1072] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 5),
  [1074] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 4),
  [1076] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 4),
  [1078] = {.entry = {.count = 1, .reusable = true}}, SHIFT(572),
  [1080] = {.entry = {.count = 1, .reusable = true}}, SHIFT(411),
  [1082] = {.entry = {.count = 1, .reusable = true}}, SHIFT(568),
  [1084] = {.entry = {.count = 1, .reusable = true}}, SHIFT(413),
  [1086] = {.entry = {.count = 1, .reusable = true}}, SHIFT(55),
  [1088] = {.entry = {.count = 1, .reusable = true}}, SHIFT(564),
  [1090] = {.entry = {.count = 1, .reusable = true}}, SHIFT(421),
  [1092] = {.entry = {.count = 1, .reusable = true}}, SHIFT(41),
  [1094] = {.entry = {.count = 1, .reusable = true}}, SHIFT(573),
  [1096] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injections_repeat1, 4),
  [1098] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 10),
  [1100] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 5),
  [1102] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 5),
  [1104] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_fileTypes_repeat1, 4),
  [1106] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 10),
  [1108] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 6),
  [1110] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 4),
  [1112] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 6),
  [1114] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 6, .production_id = 7),
  [1116] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 8),
  [1118] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 11),
  [1120] = {.entry = {.count = 1, .reusable = true}}, SHIFT(561),
  [1122] = {.entry = {.count = 1, .reusable = true}}, SHIFT(548),
  [1124] = {.entry = {.count = 1, .reusable = true}}, SHIFT(71),
  [1126] = {.entry = {.count = 1, .reusable = true}}, SHIFT(585),
  [1128] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_nameScope, 5),
  [1130] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 8),
  [1132] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_contentName, 5),
  [1134] = {.entry = {.count = 1, .reusable = true}}, SHIFT(448),
  [1136] = {.entry = {.count = 1, .reusable = true}}, SHIFT(447),
  [1138] = {.entry = {.count = 1, .reusable = true}}, SHIFT(446),
  [1140] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_match, 5),
  [1142] = {.entry = {.count = 1, .reusable = true}}, SHIFT(39),
  [1144] = {.entry = {.count = 1, .reusable = true}}, SHIFT(445),
  [1146] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 8),
  [1148] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_begin, 5),
  [1150] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 8, .production_id = 4),
  [1152] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 8, .production_id = 2),
  [1154] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_end, 5),
  [1156] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_patterns_repeat1, 2, .production_id = 3),
  [1158] = {.entry = {.count = 1, .reusable = true}}, SHIFT(645),
  [1160] = {.entry = {.count = 1, .reusable = true}}, SHIFT(381),
  [1162] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_while, 5),
  [1164] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 12),
  [1166] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 12),
  [1168] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_applyEndPatternLast, 5),
  [1170] = {.entry = {.count = 1, .reusable = true}}, SHIFT(690),
  [1172] = {.entry = {.count = 1, .reusable = true}}, SHIFT(450),
  [1174] = {.entry = {.count = 1, .reusable = true}}, SHIFT(24),
  [1176] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 12),
  [1178] = {.entry = {.count = 1, .reusable = true}}, SHIFT(43),
  [1180] = {.entry = {.count = 1, .reusable = true}}, SHIFT(605),
  [1182] = {.entry = {.count = 1, .reusable = true}}, SHIFT(751),
  [1184] = {.entry = {.count = 1, .reusable = true}}, SHIFT(121),
  [1186] = {.entry = {.count = 1, .reusable = true}}, SHIFT(146),
  [1188] = {.entry = {.count = 1, .reusable = true}}, SHIFT(611),
  [1190] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 7, .production_id = 10),
  [1192] = {.entry = {.count = 1, .reusable = true}}, SHIFT(152),
  [1194] = {.entry = {.count = 1, .reusable = true}}, SHIFT(616),
  [1196] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 7, .production_id = 7),
  [1198] = {.entry = {.count = 1, .reusable = true}}, SHIFT(161),
  [1200] = {.entry = {.count = 1, .reusable = true}}, SHIFT(621),
  [1202] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym__pattern_repeat1, 4),
  [1204] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 12, .production_id = 7),
  [1206] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 11, .production_id = 6),
  [1208] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 11, .production_id = 9),
  [1210] = {.entry = {.count = 1, .reusable = true}}, SHIFT(749),
  [1212] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 11),
  [1214] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 6),
  [1216] = {.entry = {.count = 1, .reusable = true}}, SHIFT(336),
  [1218] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 11),
  [1220] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_uuid, 6),
  [1222] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 8),
  [1224] = {.entry = {.count = 1, .reusable = true}}, SHIFT(238),
  [1226] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 6, .production_id = 7),
  [1228] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 11),
  [1230] = {.entry = {.count = 1, .reusable = true}}, SHIFT(330),
  [1232] = {.entry = {.count = 1, .reusable = true}}, SHIFT(47),
  [1234] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 11),
  [1236] = {.entry = {.count = 1, .reusable = true}}, SHIFT(498),
  [1238] = {.entry = {.count = 1, .reusable = true}}, SHIFT(394),
  [1240] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 11),
  [1242] = {.entry = {.count = 1, .reusable = true}}, SHIFT(393),
  [1244] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repo, 7, .production_id = 7),
  [1246] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 12),
  [1248] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 11),
  [1250] = {.entry = {.count = 1, .reusable = true}}, SHIFT(133),
  [1252] = {.entry = {.count = 1, .reusable = true}}, SHIFT(742),
  [1254] = {.entry = {.count = 1, .reusable = true}}, SHIFT(741),
  [1256] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 6, .production_id = 10),
  [1258] = {.entry = {.count = 1, .reusable = true}}, SHIFT(72),
  [1260] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_nameScope, 6),
  [1262] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_contentName, 6),
  [1264] = {.entry = {.count = 1, .reusable = true}}, SHIFT(654),
  [1266] = {.entry = {.count = 1, .reusable = true}}, SHIFT(378),
  [1268] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_match, 6),
  [1270] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_array_repeat1, 3),
  [1272] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_begin, 6),
  [1274] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 4),
  [1276] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_end, 6),
  [1278] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 4),
  [1280] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_while, 6),
  [1282] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_applyEndPatternLast, 6),
  [1284] = {.entry = {.count = 1, .reusable = true}}, SHIFT(313),
  [1286] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 6),
  [1288] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 5),
  [1290] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_object_repeat1, 3),
  [1292] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 6, .production_id = 7),
  [1294] = {.entry = {.count = 1, .reusable = true}}, SHIFT(36),
  [1296] = {.entry = {.count = 1, .reusable = true}}, SHIFT(50),
  [1298] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 6),
  [1300] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 11, .production_id = 7),
  [1302] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 7),
  [1304] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment_slash, 7),
  [1306] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment, 7),
  [1308] = {.entry = {.count = 1, .reusable = true}}, SHIFT(220),
  [1310] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 6),
  [1312] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_uuid, 7),
  [1314] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStopMarker, 7),
  [1316] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStartMarker, 7),
  [1318] = {.entry = {.count = 1, .reusable = true}}, SHIFT(216),
  [1320] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 6),
  [1322] = {.entry = {.count = 1, .reusable = true}}, SHIFT(478),
  [1324] = {.entry = {.count = 1, .reusable = true}}, SHIFT(58),
  [1326] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 7),
  [1328] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_schema, 7),
  [1330] = {.entry = {.count = 1, .reusable = true}}, SHIFT(209),
  [1332] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 12, .production_id = 9),
  [1334] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 11),
  [1336] = {.entry = {.count = 1, .reusable = true}}, SHIFT(304),
  [1338] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 7),
  [1340] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_information_for_contributors, 7),
  [1342] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_version, 7),
  [1344] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 7),
  [1346] = {.entry = {.count = 1, .reusable = true}}, SHIFT(529),
  [1348] = {.entry = {.count = 1, .reusable = true}}, SHIFT(531),
  [1350] = {.entry = {.count = 1, .reusable = true}}, SHIFT(727),
  [1352] = {.entry = {.count = 1, .reusable = true}}, SHIFT(145),
  [1354] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 7, .production_id = 7),
  [1356] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injectionSelector, 7),
  [1358] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_name, 7),
  [1360] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 7),
  [1362] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 10),
  [1364] = {.entry = {.count = 1, .reusable = true}}, SHIFT(726),
  [1366] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 12),
  [1368] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 12),
  [1370] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 7, .production_id = 2),
  [1372] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_include, 7),
  [1374] = {.entry = {.count = 1, .reusable = true}}, SHIFT(681),
  [1376] = {.entry = {.count = 1, .reusable = true}}, SHIFT(374),
  [1378] = {.entry = {.count = 1, .reusable = true}}, SHIFT(301),
  [1380] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 10),
  [1382] = {.entry = {.count = 1, .reusable = true}}, SHIFT(299),
  [1384] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_nameScope, 7),
  [1386] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_contentName, 7),
  [1388] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_match, 7),
  [1390] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_begin, 7),
  [1392] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_end, 7),
  [1394] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_while, 7),
  [1396] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_applyEndPatternLast, 7),
  [1398] = {.entry = {.count = 1, .reusable = true}}, SHIFT(693),
  [1400] = {.entry = {.count = 1, .reusable = true}}, SHIFT(372),
  [1402] = {.entry = {.count = 1, .reusable = true}}, SHIFT(296),
  [1404] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 7),
  [1406] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 7),
  [1408] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 9),
  [1410] = {.entry = {.count = 1, .reusable = true}}, SHIFT(577),
  [1412] = {.entry = {.count = 1, .reusable = true}}, SHIFT(321),
  [1414] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 10),
  [1416] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_beginCaptures_repeat1, 4),
  [1418] = {.entry = {.count = 1, .reusable = true}}, SHIFT(731),
  [1420] = {.entry = {.count = 1, .reusable = true}}, SHIFT(26),
  [1422] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 7),
  [1424] = {.entry = {.count = 1, .reusable = true}}, SHIFT(756),
  [1426] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 3),
  [1428] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 3),
  [1430] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 4),
  [1432] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 7),
  [1434] = {.entry = {.count = 1, .reusable = true}}, SHIFT(643),
  [1436] = {.entry = {.count = 1, .reusable = true}}, SHIFT(382),
  [1438] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment_slash, 6),
  [1440] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment, 6),
  [1442] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 7),
  [1444] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injections, 6),
  [1446] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStopMarker, 6),
  [1448] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStartMarker, 6),
  [1450] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_firstLineMatch, 6),
  [1452] = {.entry = {.count = 1, .reusable = true}}, SHIFT(153),
  [1454] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 3),
  [1456] = {.entry = {.count = 1, .reusable = true}}, SHIFT(293),
  [1458] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 8),
  [1460] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_fileTypes, 6),
  [1462] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_schema, 6),
  [1464] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_information_for_contributors, 6),
  [1466] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 8, .production_id = 7),
  [1468] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_version, 6),
  [1470] = {.entry = {.count = 1, .reusable = true}}, SHIFT(162),
  [1472] = {.entry = {.count = 1, .reusable = true}}, SHIFT(752),
  [1474] = {.entry = {.count = 1, .reusable = true}}, SHIFT(544),
  [1476] = {.entry = {.count = 1, .reusable = true}}, SHIFT(34),
  [1478] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_include, 8),
  [1480] = {.entry = {.count = 1, .reusable = true}}, SHIFT(290),
  [1482] = {.entry = {.count = 1, .reusable = true}}, SHIFT(734),
  [1484] = {.entry = {.count = 1, .reusable = true}}, SHIFT(323),
  [1486] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injectionSelector, 6),
  [1488] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 2),
  [1490] = {.entry = {.count = 2, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 2), SHIFT_REPEAT(2),
  [1493] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_name, 6),
  [1495] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 8),
  [1497] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_scopeName, 6),
  [1499] = {.entry = {.count = 1, .reusable = true}}, SHIFT(178),
  [1501] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_patterns, 6),
  [1503] = {.entry = {.count = 1, .reusable = true}}, SHIFT(74),
  [1505] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 10),
  [1507] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_repository, 6),
  [1509] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 6),
  [1511] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 8),
  [1513] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_array, 2),
  [1515] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_object, 2),
  [1517] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 3),
  [1519] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 4),
  [1521] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 4),
  [1523] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 8),
  [1525] = {.entry = {.count = 1, .reusable = true}}, SHIFT(410),
  [1527] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment_slash, 5),
  [1529] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_comment, 5),
  [1531] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 8),
  [1533] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_uuid, 5),
  [1535] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStopMarker, 5),
  [1537] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_foldingStartMarker, 5),
  [1539] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_firstLineMatch, 5),
  [1541] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_injection_repeat1, 4),
  [1543] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 9),
  [1545] = {.entry = {.count = 1, .reusable = true}}, SHIFT(679),
  [1547] = {.entry = {.count = 1, .reusable = true}}, SHIFT(212),
  [1549] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 9, .production_id = 7),
  [1551] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_schema, 5),
  [1553] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 4),
  [1555] = {.entry = {.count = 1, .reusable = true}}, SHIFT(32),
  [1557] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_include, 9),
  [1559] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_information_for_contributors, 5),
  [1561] = {.entry = {.count = 1, .reusable = true}}, SHIFT(362),
  [1563] = {.entry = {.count = 1, .reusable = true}}, SHIFT(715),
  [1565] = {.entry = {.count = 1, .reusable = true}}, SHIFT(371),
  [1567] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_captures_repeat1, 3),
  [1569] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_json, 1),
  [1571] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_captures, 9),
  [1573] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_version, 5),
  [1575] = {.entry = {.count = 1, .reusable = true}}, SHIFT(206),
  [1577] = {.entry = {.count = 1, .reusable = true}}, SHIFT(689),
  [1579] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_beginCaptures_repeat1, 3),
  [1581] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injectionSelector, 5),
  [1583] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_beginCaptures, 9),
  [1585] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_name, 5),
  [1587] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_scopeName, 5),
  [1589] = {.entry = {.count = 1, .reusable = true}}, SHIFT(701),
  [1591] = {.entry = {.count = 1, .reusable = true}}, SHIFT(196),
  [1593] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_endCaptures, 9),
  [1595] = {.entry = {.count = 1, .reusable = true}}, SHIFT(190),
  [1597] = {.entry = {.count = 1, .reusable = true}}, SHIFT(703),
  [1599] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_whileCaptures, 9),
  [1601] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_item, 5),
  [1603] = {.entry = {.count = 1, .reusable = true}}, SHIFT(35),
  [1605] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat2, 3),
  [1607] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 10),
  [1609] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym__value, 2),
  [1611] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_injection, 10, .production_id = 7),
  [1613] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_capture, 5, .production_id = 7),
  [1615] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 5),
  [1617] = {.entry = {.count = 1, .reusable = true}}, SHIFT(792),
  [1619] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 3),
  [1621] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 4),
  [1623] = {.entry = {.count = 1, .reusable = true}}, SHIFT(349),
  [1625] = {.entry = {.count = 1, .reusable = true}}, SHIFT(785),
  [1627] = {.entry = {.count = 1, .reusable = true}}, REDUCE(aux_sym_json_repeat3, 6),
  [1629] = {.entry = {.count = 1, .reusable = true}}, SHIFT(538),
  [1631] = {.entry = {.count = 1, .reusable = true}}, SHIFT(653),
  [1633] = {.entry = {.count = 1, .reusable = true}}, SHIFT(521),
  [1635] = {.entry = {.count = 1, .reusable = true}}, SHIFT(505),
  [1637] = {.entry = {.count = 1, .reusable = true}}, SHIFT(503),
  [1639] = {.entry = {.count = 1, .reusable = true}}, SHIFT(502),
  [1641] = {.entry = {.count = 1, .reusable = true}}, SHIFT(692),
  [1643] = {.entry = {.count = 1, .reusable = true}}, REDUCE(sym_value, 2),
  [1645] = {.entry = {.count = 1, .reusable = true}}, SHIFT(489),
  [1647] = {.entry = {.count = 1, .reusable = true}}, SHIFT(477),
  [1649] = {.entry = {.count = 1, .reusable = true}}, SHIFT(444),
  [1651] = {.entry = {.count = 1, .reusable = true}}, SHIFT(437),
  [1653] = {.entry = {.count = 1, .reusable = true}},  ACCEPT_INPUT(),
  [1655] = {.entry = {.count = 1, .reusable = true}}, SHIFT(259),
  [1657] = {.entry = {.count = 1, .reusable = true}}, SHIFT(671),
  [1659] = {.entry = {.count = 1, .reusable = true}}, SHIFT(283),
  [1661] = {.entry = {.count = 1, .reusable = true}}, SHIFT(589),
  [1663] = {.entry = {.count = 1, .reusable = true}}, SHIFT(642),
  [1665] = {.entry = {.count = 1, .reusable = true}}, SHIFT(543),
  [1667] = {.entry = {.count = 1, .reusable = true}}, SHIFT(641),
  [1669] = {.entry = {.count = 1, .reusable = true}}, SHIFT(661),
  [1671] = {.entry = {.count = 1, .reusable = true}}, SHIFT(663),
  [1673] = {.entry = {.count = 1, .reusable = true}}, SHIFT(732),
  [1675] = {.entry = {.count = 1, .reusable = true}}, SHIFT(473),
  [1677] = {.entry = {.count = 1, .reusable = true}}, SHIFT(471),
  [1679] = {.entry = {.count = 1, .reusable = true}}, SHIFT(469),
  [1681] = {.entry = {.count = 1, .reusable = true}}, SHIFT(467),
  [1683] = {.entry = {.count = 1, .reusable = true}}, SHIFT(465),
  [1685] = {.entry = {.count = 1, .reusable = true}}, SHIFT(462),
  [1687] = {.entry = {.count = 1, .reusable = true}}, SHIFT(618),
  [1689] = {.entry = {.count = 1, .reusable = true}}, SHIFT(475),
  [1691] = {.entry = {.count = 1, .reusable = true}}, SHIFT(432),
  [1693] = {.entry = {.count = 1, .reusable = true}}, SHIFT(433),
  [1695] = {.entry = {.count = 1, .reusable = true}}, SHIFT(434),
  [1697] = {.entry = {.count = 1, .reusable = true}}, SHIFT(436),
  [1699] = {.entry = {.count = 1, .reusable = true}}, SHIFT(431),
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
