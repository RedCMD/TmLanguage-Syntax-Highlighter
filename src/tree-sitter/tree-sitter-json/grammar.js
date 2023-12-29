// https://github.com/tree-sitter/tree-sitter/blob/master/docs/section-3-creating-parsers.md

if (false) {// `tree-sitter generate` fails if this is true
	// However VSCode js extension still seems to pickup the file. Providing lovely tooltip hints :)
	require('./../../../node_modules/tree-sitter-cli/dsl');
}

module.exports = grammar({
	name: "jsontm",
	extras: $ => [
		//$._whitespace,
	],
	word: $ => $._string,
	rules: {
		json: $ => repeat(
			choice(
				$._whitespace,
				object($,
					choice(
						$.version,
						$.schema,
						$.scopeName,
						$.name,
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
			repeat(
				choice(
					/\\./,
					/[^\\"\r\n]+/,
				),
			),
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
				$.include,
				$.nameScope,
				$.contentName,
				$.match,
				$.begin,
				$.end,
				$.while,
				$.patterns,
				$.repository,
				$.captures,
				$.beginCaptures,
				$.endCaptures,
				$.whileCaptures,
				$.applyEndPatternLast,
				$._comments,
				$.item,
			),
		),

		include: $ => pair($,
			"include",
			string($),
		),
		// value: $ => choice(
		// 	seq(
		// 		$._includeScope,
		// 		optional(
		// 			$._includeItem,
		// 		),
		// 	),
		// 	$._includeItem,
		// ),
		// _includeScope: $ => repeat1(
		// 	choice(
		// 		/\\[^#]/,
		// 		/[^#\\"\r\n]+/,
		// 	),
		// ),
		// _includeItem: $ => seq(
		// 	'#',
		// 	repeat1(
		// 		choice(
		// 			/\\./,
		// 			/[^\\"\r\n]+/,
		// 		),
		// 	),
		// ),

		scopeName: $ => pair($,
			"scopeName",
			string($),
		),
		name: $ => pair($,
			"name",
			string($),
		),
		nameScope: $ => pair($,
			"name",
			string($),
		),
		contentName: $ => pair($,
			"contentName",
			string($),
		),

		injectionSelector: $ => pair($,
			"injectionSelector",
			string($),
		),
		injections: $ => pair($,
			"injections",
			object($, $.injection),
		),
		injection: $ => pair($,
			$._string,
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
				alias(
					$._string,
					$.regex,
				),
			),
		),
		begin: $ => pair($,
			"begin",
			string($),
		),
		end: $ => pair($,
			"end",
			string($),
		),
		while: $ => pair($,
			"while",
			string($),
		),

		applyEndPatternLast: $ => pair($,
			"applyEndPatternLast",
			choice(
				$.boolean,
				$.null,
				$.integer
			),
		),

		captures: $ => pair($,
			"captures",
			object($,
				choice(
					$.capture,
					$._comments,
					$.item,
				),
			),
		),
		beginCaptures: $ => pair($,
			"beginCaptures",
			object($, $.capture),
		),
		endCaptures: $ => pair($,
			"endCaptures",
			object($, $.capture),
		),
		whileCaptures: $ => pair($,
			"whileCaptures",
			object($, $.capture),
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

		item: $ => pair($,
			optional($._string),
			$._value,
		),
		object: $ => object($, $.item),
		array: $ => array($,
			choice(
				$.object,
				$.array,
				string($),
				$.integer,
				$.boolean,
				$.null,
			),
		),
		_value: $ => choice(
			object($, $.item),
			array($,
				choice(
					$.object,
					$.array,
					string($),
					$.integer,
					$.boolean,
					$.null,
				),
			),
			string($),
			$.integer,
			$.boolean,
			$.null,
		),

		boolean: $ => choice(
			"true",
			"false",
		),
		null: $ => "null",
		integer: $ => /\d+/,
		_string: $ => token(
			repeat1(
				choice(
					/\\[^\r\n\t]/,
					/[^\\\r\n\t"]+/,
				),
			),
		),
	},
});

/**
* Boiler plate for creating an object. `{ rule, rule... }`
* @param {_$} $ 
* @param {RuleOrLiteral} rule 
* @returns {Rule}
*/
function object($, rule) {
	return seq(
		'{',
		commaSep($, rule),
		repeat($._whitespace),
		'}',
	)
}

/**
 * Boiler plate for creating an array. `[ rule, rule... ]`
 * @param {_$} $ 
 * @param {RuleOrLiteral} rule 
 * @returns {Rule}
 */
function array($, rule) {
	return seq(
		'[',
		commaSep($, rule),
		repeat($._whitespace),
		']',
	)
}

/**
 * Boiler plate for creating comma seperated rules. `rule, rule...`
 * @param {_$} $ 
 * @param {RuleOrLiteral} rule 
 * @returns {Rule}
 */
function commaSep($, rule) {
	return optional(
		seq(
			repeat($._whitespace),
			rule,
			repeat(
				seq(
					repeat($._whitespace),
					',',
					repeat($._whitespace),
					rule,
				),
			),
		),
	)
}

/**
 * Boiler plate for creating a json pair. `key: value`
 * @param {_$} $ 
 * @param {RuleOrLiteral} key 
 * @param {RuleOrLiteral} value 
 * @returns {Rule}
 */
function pair($, key, value) {
	return seq(
		string($, alias(key, $.key)),
		repeat($._whitespace),
		':',
		repeat($._whitespace),
		value,
	)
}

/**
 * Boiler plate for creating a string. `"value"`
 * @param {_$} $ 
 * @param {RuleOrLiteral | null} contents 
 * @returns {Rule}
 */
function string($, contents) {
	return seq(
		'"',
		contents != null ?
			contents :
			optional(
				alias(
					$._string,
					$.value,
				),
			),
		'"',
	)
}