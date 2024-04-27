// https://github.com/tree-sitter/tree-sitter/blob/master/docs/section-3-creating-parsers.md
/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
	name: "regextm",
	word: $ => $.backslash,
	extras: $ => [],
	precedences: $ => [],
	conflicts: $ => [
		[$.capture_group_conditional, $.alteration],
		[$.capture_group_conditional_extended, $.alteration],
		[$.absent, $.alteration],
		[$.absent_extended, $.alteration],
		[$.capture_group_conditional],
		[$.capture_group_conditional_extended],
		[$.absent],
		[$.absent_extended],
	],
	externals: $ => [ // this **MUST** match up with `scanner.c`
		$._group_end_lookahead, // 0-width, do **not** put this directly in a repeat()
		$._force_property_name_node,
		$._callout_syntax,
		$._modify_syntax,
		$.ERROR,
	],

	rules: {
		regex: $ => repeat($._expression),
		invalid: $ => /./,
		_expression: $ => choice(
			$.capture_group,
			$.non_capture_group,
			$.atomic_group,
			$.capture_group_name,
			$.capture_group_conditional,
			$.comment_group,
			$.modify,
			$._modify_extended,
			$.look_ahead,
			$.look_behind,
			$.callout,
			$.absent,
			$.character_class,
			$.character_property,
			$.subroutine,
			$.backreference,
			$.meta_control_char,
			$.unicode,
			$.backslash,
			$.quantifier,
			$.alteration,
			$.literal,
		),
		_expression_extended: $ => choice(
			$.capture_group_extended,
			$.non_capture_group_extended,
			$.atomic_group_extended,
			$.capture_group_name_extended,
			$.capture_group_conditional_extended,
			$.comment_group,
			$.modify,
			$._modify_extended,
			$.look_ahead_extended,
			$.look_behind_extended,
			$.callout,
			$.absent_extended,
			$.character_class,
			$.character_property,
			$.subroutine,
			$.backreference,
			$.meta_control_char,
			$.unicode,
			$.backslash,
			$.quantifier,
			$.alteration,
			$.literal,
			$.comment_extended,
		),
		literal: $ => prec.right(
			repeat1(/[^\\\t\n]/),
		),
		backslash: $ => token(
			choice(
				'\\\\\\\\',
				/\\\\\\["/bfnrt]/,
				/\\\\[^\\u]/,
				/\\["/bfnrt]/,
			),
		),
		quantifier: $ => prec.right(
			repeat1(
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
									',',
									/\d+/,
								),
							),
							'}',
						),
					),
				),
			),
		),
		alteration: $ => '|',
		capture_group: $ => seq(
			'(',
			repeat($._expression),
			')',
		),
		capture_group_extended: $ => seq(
			'(',
			repeat($._expression_extended),
			')',
		),
		non_capture_group: $ => seq(
			'(?:',
			repeat($._expression),
			')',
		),
		non_capture_group_extended: $ => seq(
			'(?:',
			repeat($._expression_extended),
			')',
		),
		atomic_group: $ => seq(
			'(?>',
			repeat($._expression),
			')',
		),
		atomic_group_extended: $ => seq(
			'(?>',
			repeat($._expression_extended),
			')',
		),
		capture_group_name: $ => seq(
			choice(
				seq(
					'(?<',
					alias(
						repeat(/[^A-Za-z_>)]/),
						$.error
					),
					alias(
						token(
							seq(
								/[A-Za-z_]/,
								repeat(/[^>]/),
							),
						),
						$.name
					),
					'>',
				),
				seq(
					'(?\'',
					alias(
						repeat(/[^A-Za-z_')]/),
						$.error
					),
					alias(
						token(
							seq(
								/[A-Za-z_]/,
								repeat(/[^']/),
							),
						),
						$.name
					),
					'\'',
				),
			),
			repeat($._expression),
			')',
		),
		capture_group_name_extended: $ => seq(
			choice(
				seq(
					'(?<',
					alias(
						repeat(/[^A-Za-z_>)]/),
						$.error
					),
					alias(
						token(
							seq(
								/[A-Za-z_]/,
								repeat(/[^>]/),
							),
						),
						$.name
					),
					'>',
				),
				seq(
					'(?\'',
					alias(
						repeat(/[^A-Za-z_')]/),
						$.error
					),
					alias(
						token(
							seq(
								/[A-Za-z_]/,
								repeat(/[^']/),
							),
						),
						$.name
					),
					'\'',
				),
			),
			repeat($._expression_extended),
			')',
		),
		capture_group_conditional: $ => seq(
			'(?(',
			choice(
				$.capture_group_conditional_name,
				repeat($._expression),
			),
			')',
			repeat($._expression),
			optional('|'),
			repeat($._expression),
			')',
		),
		capture_group_conditional_extended: $ => seq(
			'(?(',
			choice(
				$.capture_group_conditional_name,
				repeat($._expression_extended),
			),
			')',
			repeat($._expression_extended),
			optional('|'),
			repeat($._expression_extended),
			')',
		),
		capture_group_conditional_name: $ => alias(
			choice(
				seq(
					'<',
					seq(
						token(
							choice(
								seq(
									optional(choice('+', '-')),
									repeat('0'),
									/[1-9]/,
									repeat(/[0-9]/),
								),
								seq(
									/[a-zA-Z_]/,
									repeat(/\w/),
								),
							),
						),
						optional(
							seq(
								optional(choice('-', '+')),
								repeat1(/[0-9]/),
							),
						),
					),
					'>'
				),
				seq(
					"'",
					choice(
						/[+-]?[1-9]\d*/,
						/[a-zA-Z_]\w*/,
					),
					optional(/[+-]\d+/),
					"'"
				),
				seq(
					/[+-]?[1-9]\d*/,
					optional(/[+-]\d+/),
				),
			),
			$.name,
		),
		comment_group: $ => seq(
			'(?#',
			alias(
				repeat(
					choice(
						/\\./,
						/[^)\\]/,
					)
				),
				$.comment,
			),
			')',
		),
		comment_extended: $ => prec.right(
			repeat1(
				choice(
					' ',
					'\\n',
					'\\t',
					prec.right(
						seq(
							'#',
							alias(
								repeat(
									choice(
										/\\[^n]/,
										/[^\\]+/,
									)
								),
								$.comment,
							),
							optional('\\n'),
						),
					),
				),
			),
		),
		modify: $ => seq(
			// '(?',
			alias(
				$._modify_syntax,
				'(?',
			),
			alias(
				token(
					choice(
						seq(
							repeat1(/[IimWDSP]|y\{[gw]\}/),
							repeat(/[-imWDSP]/),
						),
						seq(
							repeat(/[IimxWDSP]|y\{[gw]\}/),
							'-',
							repeat(/[-imWDSP]/),
							'x',
							repeat(/[-imxWDSP]/),
						),
					),
				),
				$.options,
			),
			choice(
				seq(
					':',
					repeat($._expression),
					')',
				),
				seq(
					')',
					repeat($._expression),
					$._group_end_lookahead,
				),
			),
		),
		_modify: $ => seq(
			// '(?',
			alias(
				$._modify_syntax,
				'(?',
			),
			alias(
				token(
					choice(
						seq(
							repeat1(/[IimWDSP]|y\{[gw]\}/),
							repeat(/[-imWDSP]/),
						),
						seq(
							repeat(/[IimxWDSP]|y\{[gw]\}/),
							'-',
							repeat(/[-imWDSP]/),
							'x',
							repeat(/[-imxWDSP]/),
						),
					),
				),
				$.options,
			),
			choice(
				seq(
					':',
					repeat($._expression),
					')',
				),
				seq(
					')',
					repeat($._expression),
					$._group_end_lookahead,
				),
			),
		),
		_modify_extended: $ => choice(
			seq(
				$.modify_extended_1,
				repeat($._expression_extended),
				$._group_end_lookahead,
			),
			$.modify_extended_2,
		),
		modify_extended_1: $ => seq(
			// '(?',
			alias(
				$._modify_syntax,
				'(?',
			),
			alias(
				token(
					choice(
						seq(
							repeat1(/[imxWDSP]|y\{[gw]\}/),
							repeat(/[-imWDSP]/),
						),
						seq(
							repeat(/[imxWDSP]|y\{[gw]\}/),
							repeat1(/[-imWDSP]/),
						),
					),
				),
				$.options,
			),
			')',
		),
		modify_extended_2: $ => seq(
			// '(?',
			alias(
				$._modify_syntax,
				'(?',
			),
			alias(
				token(
					choice(
						seq(
							repeat1(/[imxWDSP]|y\{[gw]\}/),
							repeat(/[-imWDSP]/),
						),
						seq(
							repeat(/[imxWDSP]|y\{[gw]\}/),
							repeat1(/[-imWDSP]/),
						),
					),
				),
				$.options,
			),
			':',
			repeat($._expression_extended),
			')',
		),
		look_ahead: $ => seq(
			token(
				seq(
					'(',
					'?',
					choice(
						'=',
						'!'
					),
				),
			),
			repeat($._expression),
			')',
		),
		look_ahead_extended: $ => seq(
			token(
				seq(
					'(',
					'?',
					choice(
						'=',
						'!'
					),
				),
			),
			repeat($._expression_extended),
			')',
		),
		look_behind: $ => seq(
			token(
				seq(
					'(',
					'?',
					'<',
					choice(
						'=',
						'!'
					),
				),
			),
			repeat($._expression),
			')',
		),
		look_behind_extended: $ => seq(
			token(
				seq(
					'(',
					'?',
					'<',
					choice(
						'=',
						'!'
					),
				),
			),
			repeat($._expression_extended),
			')',
		),
		callout: $ => seq(
			// '(*',
			alias(
				$._callout_syntax,
				'(*',
			),
			alias(
				token(
					seq(
						/[A-Za-z_]/,
						repeat(/\w/),
					),
				),
				$.name,
			),
			')',
		),
		absent: $ => seq(
			choice(
				seq(
					'(?~|',
					repeat($._expression),
					optional('|'),
				),
				'(?~',
			),
			repeat($._expression),
			')',
		),
		absent_extended: $ => seq(
			choice(
				seq(
					'(?~|',
					repeat($._expression_extended),
					optional('|'),
				),
				'(?~',
			),
			repeat($._expression_extended),
			')',
		),
		character_class: $ => seq(
			'[',
			repeat(
				choice(
					// $.octal,
					// $.hexadecimal,
					// $.property,
					// $.meta_control_char,
					$.character_property,
					$.unicode,
					$.backslash,
					$.literal,
					')',
				),
			),
			']',
		),
		character_property: $ => seq(
			token(
				seq(
					'\\\\',
					choice(
						'p',
						'P',
					),
					'{',
					optional('^'),
				),
			),
			optional($.character_property_name),
			'}',
		),
		character_property_name: $ => choice(
			seq(
				repeat1(/[a-zA-Z1 _-]/),
				repeat(/[^(){}|]/),
			),
			$._force_property_name_node,
		),
		subroutine: $ => choice(
			seq(
				'\\\\g<',
				optional(
					alias(
						repeat1(/[^\w>"()\\\[]/),
						$.error
					),
				),
				choice(
					seq(
						seq(
							optional(
								choice(
									'+',
									'-',
								),
							),
							alias(
								repeat1(/\d/),
								$.number
							),
						),
						optional(
							alias(
								repeat1(/[^>"()\\\[]/),
								$.error
							),
						),
					),
					alias(
						token(
							seq(
								/[A-Za-z_]/,
								repeat(/[^>]/),
							),
						),
						$.name
					),
				),
				'>',
			),
			seq(
				'\\\\g\'',
				optional(
					alias(
						repeat1(/[^\w>"()\\\[]/),
						$.error
					),
				),
				choice(
					seq(
						alias(
							token(
								seq(
									optional(
										choice(
											'+',
											'-',
										),
									),
									repeat1(/\d/),
								),
							),
							$.number
						),
						optional(
							alias(
								repeat1(/[^>"()\\\[]/),
								$.error
							),
						),
					),
					alias(
						token(
							seq(
								/[A-Za-z_]/,
								repeat(/[^']/),
							),
						),
						$.name
					),
				),
				'\'',
			),
		),
		backreference: $ => choice(
			seq(
				'\\\\k<',
				optional(
					alias(
						repeat1(/[^\w>"()\\\[]/),
						$.error
					),
				),
				choice(
					seq(
						alias(
							token(
								seq(
									optional(
										choice(
											'+',
											'-',
										),
									),
									repeat1(/\d/),
								),
							),
							$.number
						),
						optional(
							alias(
								repeat1(/[^>"()\\\[]/),
								$.error
							),
						),
					),
					alias(
						token(
							seq(
								/[A-Za-z_]/,
								repeat(/[^>]/),
							),
						),
						$.name
					),
				),
				'>',
			),
			seq(
				'\\\\k\'',
				optional(
					alias(
						repeat1(/[^\w>"()\\\[]/),
						$.error
					),
				),
				choice(
					seq(
						alias(
							token(
								seq(
									optional(
										choice(
											'+',
											'-',
										),
									),
									repeat1(/\d/),
								),
							),
							$.number
						),
						optional(
							alias(
								repeat1(/[^>"()\\\[]/),
								$.error
							),
						),
					),
					alias(
						token(
							seq(
								/[A-Za-z_]/,
								repeat(/[^']/),
							),
						),
						$.name
					),
				),
				'\'',
			),
		),
		unicode: $ => seq(
			choice(
				seq(
					/\\{1,3}u/,
					/[0-9a-fA-F]/,
					/[0-9a-fA-F]/,
					/[0-9a-fA-F]/,
					/[0-9a-fA-F]/,
				),
			),
		),
		meta_control_char: $ => seq(
			repeat1(
				choice(
					'\\\\c',
					'\\\\C-',
					'\\\\M-',
				),
			),
			choice(
				'\\\\u',
				$.unicode,
				$.backslash,
				/./,
			),
		),
	},
});
