// https://github.com/tree-sitter/tree-sitter/blob/master/docs/section-3-creating-parsers.md
/// <reference types="tree-sitter-cli/dsl" />
// @ts-check


module.exports = grammar({
	name: "jsontm",
	// word: $ => $._string,
	extras: $ => [
		//$._whitespace,
	],
	externals: $ => [
		$._forceStringNode, // Forces a 0width empty node if it is before a double quote " . Useful when querying the resulting syntax tree
		$.ERROR,
	],

	rules: {
		json: $ => repeat(
			choice(
				$._whitespace,
				object($,
					choice(
						$.version,
						$.schema,
						$.scopeName,
						$.name_display,
						$.information_for_contributors,
						$.fileTypes,
						$.firstLineMatch,
						$.foldingStartMarker,
						$.foldingStopMarker,
						$.injectionSelector,
						$.injections,
						$.patterns,
						$.repository,
						$.uuid,
						$._comments,
						$.item,
					),
				),
			),
		),

		_whitespace: $ => /\s+/,

		repository: $ => pair($,
			"repository",
			object($, $.repo),
		),
		repo: $ => pair($,
			undefined,
			$._pattern,
		),
		patterns: $ => pair($,
			"patterns",
			array($,
				alias(
					$._pattern,
					$.pattern,
				),
			),
		),
		_pattern: $ => object($,
			choice(
				field(
					'include',
					$.include,
				),
				$.name,
				$.contentName,
				field(
					'match',
					$.match,
				),
				field(
					'begin',
					$.begin,
				),
				field(
					'end',
					$.end,
				),
				field(
					'while',
					$.while,
				),
				field(
					'patterns',
					$.patterns,
				),
				field(
					'repository',
					$.repository,
				),
				$.captures,
				field(
					'beginCaptures',
					$.beginCaptures,
				),
				field(
					'endCaptures',
					$.endCaptures,
				),
				field(
					'whileCaptures',
					$.whileCaptures,
				),
				$.applyEndPatternLast,
				$.disabled,
				$._comments,
				$.item,
			),
		),

		/*
		
		source
		source#
		source#$self
		source#include
		#
		#$self
		#include
		$self
		*/
		include: $ => pair($,
			"include",
			string($,
				alias(
					choice(
						$.includeValue,
						$._forceStringNode,
					),
					$.value,
				),
			),
		),
		includeValue: $ => choice(
			$._self,
			$._base,
			$._includeScopeName,
			seq(
				$._sharp,
				choice(
					$._includeRuleName,
					$._self,
					$._base,
					fieldAlias($,
						'ruleName',
						$._forceStringNode,
					),
				),
			),
			seq(
				$._includeScopeName,
				$._sharp,
				optional(
					choice(
						$._includeRuleName,
						$._self,
						$._base,
					),
				),
			),
		),
		_includeScopeName: $ => fieldAlias($,
			'scopeName',
			token(
				repeat1(
					choice(
						/\\[^\r\n\t#]?/,
						/[^\\\r\n\t#"]+/,
					),
				),
			),
		),
		_sharp: $ => field(
			'sharp',
			'#',
		),
		_includeRuleName: $ => fieldAlias($,
			'ruleName',
			token(
				repeat1(
					choice(
						/\\[^\r\n\t]/,
						/[^\\\r\n\t"]+/,
					),
				),
			),
		),
		_self: $ => fieldAlias($,
			'self',
			'$self',
		),
		_base: $ => fieldAlias($,
			'base',
			'$base',
		),

		scopeName: $ => pair($,
			"scopeName",
			string($),
		),
		name_display: $ => pair($,
			"name",
			string($),
		),
		name: $ => pair($,
			"name",
			$._name_scopes,
		),
		contentName: $ => pair($,
			"contentName",
			$._name_scopes,
		),
		_name_scopes: $ => string($,
			alias(
				choice(
					repeat1(
						choice(
							$._scope,
							/ +/,
						),
					),
					$._forceStringNode,
				),
				$.value,
			),
		),
		_scope: $ => fieldAlias($,
			"scope",
			prec.right(
				repeat1(
					choice(
						$.replace_capture,
						/\\[^\r\n\t ]/,
						/[^\\\r\n\t $"]+/,
						/\$/,
					),
				),
			),
		),
		replace_capture: $ => token(
			seq(
				'$',
				/\d+/,
			),
		),

		injectionSelector: $ => pair($,
			"injectionSelector",
			$._injectionSelectorValue,
		),
		_injectionSelectorValue: $ => choice(
			array($, $._injectionSelectorValue),
			string($),
		),
		injections: $ => pair($,
			"injections",
			object($, $.injection),
		),
		injection: $ => pair($,
			undefined,
			object($,
				choice(
					$.patterns,
					$._comments,
					$.item,
				),
			),
		),

		match: $ => pair($,
			"match",
			string($,
				fieldAlias($,
					'regex',
					choice(
						$._string,
						$._forceStringNode,
					),
				),
			),
		),
		begin: $ => pair($,
			"begin",
			string($,
				fieldAlias($,
					'regex',
					choice(
						$._string,
						$._forceStringNode,
					),
				),
			),
		),
		end: $ => pair($,
			"end",
			string($,
				fieldAlias($,
					'regex',
					choice(
						$._string,
						$._forceStringNode,
					),
				),
			),
		),
		while: $ => pair($,
			"while",
			string($,
				fieldAlias($,
					'regex',
					choice(
						$._string,
						$._forceStringNode,
					),
				),
			),
		),

		applyEndPatternLast: $ => pair($,
			"applyEndPatternLast",
			choice(
				$.integer,
				$.boolean,
				$.null,
			),
		),

		captures: $ => pair($,
			"captures",
			choice(
				object($,
					choice(
						$.capture,
						$._comments,
						$.item,
					),
				),
				array($,
					$._pattern,
				),
			),
		),
		beginCaptures: $ => pair($,
			"beginCaptures",
			choice(
				object($,
					choice(
						$.capture,
						$._comments,
						$.item,
					),
				),
				array($,
					$._pattern,
				),
			),
		),
		endCaptures: $ => pair($,
			"endCaptures",
			choice(
				object($,
					choice(
						$.capture,
						$._comments,
						$.item,
					),
				),
				array($,
					$._pattern,
				),
			),
		),
		whileCaptures: $ => pair($,
			"whileCaptures",
			choice(
				object($,
					choice(
						$.capture,
						$._comments,
						$.item,
					),
				),
				array($,
					$._pattern,
				),
			),
		),
		capture: $ => pair($,
			seq(
				/\d+/,
				alias(
					repeat(
						choice(
							/\\./,
							/[^\\"\r\n]+/,
						),
					),
					'~',
				),
			),
			$._pattern,
		),

		disabled: $ => pair($,
			"disabled",
			choice(
				$.integer,
				$.boolean,
				$.null,
			),
		),

		version: $ => pair($,
			"version",
			string($),
		),
		information_for_contributors: $ => pair($,
			"information_for_contributors",
			$._value,
		),
		schema: $ => pair($,
			"$schema",
			string($),
		),
		fileTypes: $ => pair($,
			"fileTypes",
			array($, string($)),
		),
		firstLineMatch: $ => pair($,
			"firstLineMatch",
			string($),
		),
		foldingStartMarker: $ => pair($,
			"foldingStartMarker",
			string($),
		),
		foldingStopMarker: $ => pair($,
			"foldingStopMarker",
			string($),
		),
		uuid: $ => pair($,
			"uuid",
			string($),
		),

		_comments: $ => choice(
			$.comment,
			$.comment_slash,
		),
		comment: $ => pair($,
			"comment",
			string($),
		),
		comment_slash: $ => pair($,
			"//",
			$._value,
		),

		item: $ => prec(-1,
			pair($,
				undefined,
				$._value,
			),
		),
		object: $ => prec(-1,
			object($,
				$.item,
				-1,
			),
		),
		array: $ => prec(-1,
			array($, $._value),
		),
		_value: $ => prec(-1,
			choice(
				object($,
					$.item,
					-1,
				),
				array($,
					choice(
						$.object,
						$.array,
						string($),
						$.integer,
						$.boolean,
						$.null,
					),
					-1,
				),
				string($),
				$.integer,
				$.boolean,
				$.null,
			),
		),

		boolean: $ => choice(
			"true",
			"false",
		),
		null: $ => "null",
		integer: $ => /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/,
		_string: $ => token(
			prec(-1,
				repeat1(
					choice(
						/\\[^\r\n\t]/,
						/[^\\\r\n\t"]+/,
					),
				),
			),
		),

		_comma: $ => repeat1( // Is able to insert `missing` comma
			seq(
				repeat($._whitespace),
				',',
			),
		),
		_colon: $ => seq( // Is able to insert `missing` colon
			repeat($._whitespace),
			':',
		),
	},
});

/**
 * Boiler plate for creating an object. `{ rule, rule... }`
 * @param {GrammarSymbols<string>} $
 * @param {RuleOrLiteral} rule
 * @param {String | number} [precedence]
 * @returns {Rule}
 */
function object($, rule, precedence) {
	return seq(
		'{',
		commaSep($, rule, precedence),
		repeat($._whitespace),
		'}',
	);
}

/**
 * Boiler plate for creating an array. `[ rule, rule... ]`
 * @param {GrammarSymbols<string>} $
 * @param {RuleOrLiteral} rule
 * @param {String | number} [precedence]
 * @returns {Rule}
 */
function array($, rule, precedence) {
	return seq(
		'[',
		commaSep($, rule, precedence),
		repeat($._whitespace),
		']',
	);
}

/**
 * Boiler plate for creating comma seperated rules. `rule, rule...`
 * @param {GrammarSymbols<string>} $
 * @param {RuleOrLiteral} rule
 * @param {String | number} [precedence]
 * @returns {Rule}
 */
function commaSep($, rule, precedence) {
	return optional(
		choice(
			seq(
				repeat(
					precedence ? prec(precedence, $._whitespace) : $._whitespace
				),
				rule,
				repeat(
					seq(
						$._comma,
						repeat($._whitespace),
						precedence ? prec(precedence, rule) : rule
					),
				),
				optional($._comma), // trailing comma
			),
			$._comma,
		),
	);
}

/**
 * Boiler plate for creating a json pair. `key: value`
 * @param {GrammarSymbols<string>} $
 * @param {RuleOrLiteral | undefined} key string
 * @param {RuleOrLiteral} value
 * @returns {Rule}
 */
function pair($, key, value) {
	return prec.right(
		seq(
			string($,
				fieldAlias($,
					'key',
					key == null ?
						choice(
							$._string,
							$._forceStringNode,
						) :
						token(
							prec.right(-1,
								key,
							),
						),
				),
			),
			$._colon,
			repeat($._whitespace),
			optional(
				choice(
					value ?? blank(),
					prec(-2,
						$._value,
					),
				),
			),
		),
	);
}

/**
 * Boiler plate for creating a string. `"value"`
 * @param {GrammarSymbols<string>} $
 * @param {RuleOrLiteral} [contents]
 * @returns {Rule}
 */
function string($, contents) {
	return seq(
		'"',
		contents ?? alias(
			choice(
				$._string,
				$._forceStringNode,
			),
			$.value,
		),
		'"',
	);
}

/**
 * MACRO for adding a `field` and `alias`.
 * @param {GrammarSymbols<string>} $
 * @param {string} name
 * @param {RuleOrLiteral} rule
 * @returns {Rule}
 */
function fieldAlias($, name, rule) {
	return field(
		name,
		alias(
			rule,
			$[name],
		),
	);
}
