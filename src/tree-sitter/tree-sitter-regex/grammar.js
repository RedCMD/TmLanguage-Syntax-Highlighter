// https://github.com/tree-sitter/tree-sitter/blob/master/docs/section-3-creating-parsers.md

if (false) {// `tree-sitter generate` fails if this is true
	// However the VSCode js extension still seems to pickup the file. Providing lovely tooltip hints :)
	require('./../../../node_modules/tree-sitter-cli/dsl');
}

module.exports = grammar({
	name: "regextm",
	extras: $ => [
		//$._whitespace,
	],
	conflicts: $ => [
		[$.unicode],
		[$.quantifier],
	],
	// word: $ => /.+/,
	rules: {
		regex: $ => optional(
			seq(
				optional(
					alias(
						$.quantifier,
						$.ERROR,
					),
				),
				$._expression,
			),
		),
		_expression: $ => repeat1(
			choice(
				$.octal,
				$.hexadecimal,
				$.backreference,
				$.subroutine,
				$.property,
				$.meta_control_char,
				$.unicode,
				$.backslash,
				$.capture_group,
				$.character_class,
				$.alteration,
				$.literal,
			),
		),
		literal: $ => prec(-1,
			seq(
				repeat1(/[^\\]/),
				optional($.quantifier),
			),
		),
		backslash: $ => seq(
			choice(
				'\\\\\\\\',
				/\\\\\\["/bfnrtu]/,
				// /\\\\[^\\]/,
				/\\\\[NORXDHSWdhswaefnrtvABbGKYyZz]/,
				/\\\\[$()*+?|\[^]/,
				/\\\\[ !#%&',-/:;<=>@EFIJLQTUV\]_`ijlmoq{}~]/,
				/\\["/bfnrtu]/,
			),
			optional($.quantifier),
		),
		quantifier: $ => repeat1(
			choice(
				'?',
				'+',
				'*',
				token(
					seq(
						'{',
						choice(
							seq(
								/\d+/,
								optional(
									seq(
										',',
										optional(/\d+/),
									),
								),
							),
							seq(
								optional(','),
								/\d+/,
							),
						),
						'}',
					),
				),
			),
		),
		alteration: $ => '|',
		capture_group: $ => seq(
			'(',
			optional(
				alias(
					$.quantifier,
					$.ERROR,
				),
			),
			optional(
				choice(
					'?:',
					'?>'
				),
			),
			optional($._expression),
			')',
			optional($.quantifier),
		),
		character_class: $ => seq(
			'[',
			repeat(
				choice(
					$.octal,
					$.hexadecimal,
					$.property,
					$.meta_control_char,
					$.unicode,
					$.backslash,
					$.literal,
				),
			),
			']',
			optional($.quantifier),
		),
		octal: $ => seq(
			choice(
				/\\\\0[0-7]{0,2}/,
				seq(
					/\\\\o\{[0-7]+/,
					repeat(
						seq(
							/(\s|\\u0020|\\n)+/,
							/[0-7]+/,
						),
					),
					'}',
				),
			),
			optional($.quantifier),
		),
		hexadecimal: $ => seq(
			choice(
				/\\\\x[0-9a-fA-F]{0,2}/,
				seq(
					/\\\\x\{[0-9a-fA-F]+/,
					repeat(
						seq(
							/(\s+|\\u0020|\\n)+/,
							/[0-9a-fA-F]+/,
						),
					),
					'}',
				),
			),
			optional($.quantifier),
		),
		property: $ => seq(
			/\\\\[pP]\{\^?/,
			repeat(
				choice(
					/[a-zA-Z1]+/,
					/[ _-]+/,
				),
			),
			'}',
			optional($.quantifier),
		),
		backreference: $ => seq(
			choice(
				/\\\\[1-9]\d{0,2}/,
				seq(
					'\\\\k<',
					choice(
						seq(
							optional(/\d*[1-9]/),
							optional(/[-+]/),
							/\d*[1-9]/,
						),
						seq(
							/[a-zA-Z_]\w*/,
							optional(/[-+]\d*[1-9]/),
						),
						alias(
							// $.not_closing_angle_bracket,
							'=',
							$.ERROR,
						),
					),
					'>',
				),
				seq(
					"\\\\k'",
					choice(
						seq(
							optional(/\d*[1-9]/),
							optional(/[-+]/),
							/\d*[1-9]/,
						),
						seq(
							/[a-zA-Z_]\w*/,
							optional(/[-+]\d*[1-9]/),
						),
					),
					"'",
				),
			),
			optional($.quantifier),
		),
		subroutine: $ => seq(
			choice(
				seq(
					'\\\\g<',
					choice(
						seq(
							optional(/[-+]/),
							/\d+/,
						),
						seq(
							/[a-zA-Z_]/,
							optional(/[^>]+/),
						),
					),
					'>',
				),
				seq(
					"\\\\g'",
					choice(
						seq(
							optional(/[-+]/),
							/\d+/,
						),
						seq(
							/[a-zA-Z_]/,
							optional(/[^>]+/),
						),
					),
					"'",
				),
			),
			optional($.quantifier),
		),
		not_closing_angle_bracket: $ => alias(
			// /[^>]+/,
			'=',
			$.ERROR,
		),
		unicode: $ => seq(
			choice(
				/\\{1,3}u[0-9a-fA-F]{4}/
			),
			optional($.quantifier),
		),
		meta_control_char: $ => seq(
			choice(
				seq(
					repeat1(
						choice(
							'\\\\c',
							'\\\\C-',
							'\\\\M-',
						),
					),
					choice(
						$.unicode,
						// $.backslash,
						/./,
					),
				),
			),
			optional($.quantifier),
		),
	},
});