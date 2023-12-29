// https://github.com/tree-sitter/tree-sitter/blob/master/docs/section-3-creating-parsers.md

module.exports = grammar({
	name: "regextm",
	extras: $ => [
		//$._whitespace,
	],
	// word: $ => $._string,
	rules: {
		regex: $ => repeat1(
			choice(
				$.backslash,
				$.capture_group,
				$.character_class,
				$.literal,
			),
		),
		literal: $ => prec(-1, /[^"()][^\x00-\x1F\x7F "#$^.+*?|\[{()\\]*/),
		character_class_literal: $ => prec(-1, /[^\]"][^\x00-\x1F\x7F"&:\[\]\\\-]*/),

		backslash: $ => choice(
			'\\\\\\\\',
			/\\\\[^"]/,
			/\\[^\r\n\t]/,
		),

		capture_group: $ => seq(
			'(',
			optional(
				$.regex,
			),
			')',
		),
		character_class: $ => prec(1,
			seq(
				'[',
				repeat(
					choice(
						$.backslash,
						$.character_class_literal,
					),
				),
				']',
			),
		),
	},
});