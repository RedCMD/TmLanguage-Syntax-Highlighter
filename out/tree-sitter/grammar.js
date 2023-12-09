// https://github.com/tree-sitter/tree-sitter/blob/master/docs/section-3-creating-parsers.md

module.exports = grammar({
	name: "jsontm",
	extras: $ => [
		//$._whitespace,
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
			seq(
				'"',
				$.value,
				'"',
			),
		),
		value: $ => choice(
			seq(
				$._includeScope,
				optional(
					$._includeItem,
				),
			),
			$._includeItem,
		),
		_includeScope: $ => repeat1(
			choice(
				/\\[^#]/,
				/[^#\\"\r\n]+/,
			),
		),
		_includeItem: $ => seq(
			'#',
			repeat1(
				choice(
					/\\./,
					/[^\\"\r\n]+/,
				),
			),
		),

		scopeName: $ => pair($,
			"scopeName",
			$._string,
		),
		name: $ => pair($,
			"name",
			$._string,
		),
		nameScope: $ => pair($,
			"name",
			$._string,
		),
		contentName: $ => pair($,
			"contentName",
			$._string,
		),

		injectionSelector: $ => pair($,
			"injectionSelector",
			$._string,
		),
		injections: $ => pair($,
			"injections",
			object($, $.injection),
		),
		injection: $ => pair($,
			repeat(
				choice(
					/\\./,
					/[^\\"\r\n]+/,
				),
			),
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
			$._string,
		),
		begin: $ => pair($,
			"begin",
			$._string,
		),
		end: $ => pair($,
			"end",
			$._string,
		),
		while: $ => pair($,
			"while",
			$._string,
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
			$._string,
		),
		information_for_contributors: $ => pair($,
			"information_for_contributors",
			$._value,
		),
		schema: $ => pair($,
			"$schema",
			$._string,
		),
		fileTypes: $ => pair($,
			"fileTypes",
			array($, $._string),
		),
		firstLineMatch: $ => pair($,
			"firstLineMatch",
			$._string,
		),
		foldingStartMarker: $ => pair($,
			"foldingStartMarker",
			$._string,
		),
		foldingStopMarker: $ => pair($,
			"foldingStopMarker",
			$._string,
		),
		uuid: $ => pair($,
			"uuid",
			$._string,
		),

		_comments: $ => choice(
			$.comment,
			$.comment_slash,
		),
		comment: $ => pair($,
			"comment",
			$._string,
		),
		comment_slash: $ => pair($,
			"//",
			$._value,
		),

		item: $ => pair($,
			optional($._string_content),
			$._value,
		),
		object: $ => object($, $.item),
		array: $ => array($,
			choice(
				$.object,
				$.array,
				$._string,
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
					$._string,
					$.integer,
					$.boolean,
					$.null,
				),
			),
			$._string,
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
		_string: $ => seq(
			'"',
			optional(
				alias(
					$._string_content,
					$.value,
				),
			),
			'"',
		),
		_string_content: $ => token(
			repeat1(
				choice(
					/\\[^\r\n\t]/,
					/[^\\\r\n\t"]+/,
				),
			),
		),
	}
});

function object($, rule) {
	return seq(
		'{',
		commaSep($, rule),
		repeat($._whitespace),
		'}',
	)
}

function array($, rule) {
	return seq(
		'[',
		commaSep($, rule),
		repeat($._whitespace),
		']',
	)
}

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

function pair($, key, value) {
	return seq(
		'"',
		alias(key, $.key),
		'"',
		repeat($._whitespace),
		':',
		repeat($._whitespace),
		value,
	)
}