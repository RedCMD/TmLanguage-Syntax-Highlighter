
module.exports = grammar({
	name: "jsontm",
	extras: $ => [
		$._whitespace,
	],

	rules: {
		json: $ => repeat(
			object(
				choice(
					$.scopeName,
					$.name,
					$.patterns,
					$.repository,
					$.include,
					$.injectionSelector,
					$.injections,
					prec.left(-1, $.item),
				),
			),
		),

		repository: $ => pair($,
			"repository",
			object($.repo),
		),
		repo: $ => pair($,
			repeat(
				choice(
					/\\./,
					/[^\\"\r\n]+/,
				),
			),
			$._object,
		),
		patterns: $ => pair($,
			"patterns",
			array(
				alias(
					$._object,
					$.pattern
				),
			),
		),
		_object: $ => object(
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
				$.comment,
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
			object($.injection),
		),
		injection: $ => pair($,
			repeat(
				choice(
					/\\./,
					/[^\\"\r\n]+/,
				),
			),
			object(
				choice(
					$.patterns,
					$.comment
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

		captures: $ => pair($,
			"captures",
			object($.capture),
		),
		beginCaptures: $ => pair($,
			"beginCaptures",
			object($.capture),
		),
		endCaptures: $ => pair($,
			"endCaptures",
			object($.capture),
		),
		capture: $ => pair($,
			/\d+/,
			$._object,
		),

		comment: $ => pair($,
			"comment",
			$._string,
		),
		item: $ => pair($,
			repeat(
				choice(
					/\\./,
					/[^\\"\r\n]+/,
				),
			),
			optional(
				choice(
					$._string,
					array($.item),
					object($.item),
				),
			),
		),

		_string: $ => seq(
			'"',
			alias(
				token.immediate(
					repeat(
						choice(
							/\\./,
							/[^\\"\r\n]+/,
						),
					),
				),
				$.value
			),
			'"',
		),

		_whitespace: $ => /\s+/,
	}
});

function object(rule) {
	return seq(
		'{',
		commaSep(rule),
		'}',
	)
}

function array(rule) {
	return seq(
		'[',
		commaSep(rule),
		']',
	)
}

function commaSep(rule) {
	return optional(
		seq(
			rule,
			repeat(
				seq(
					',',
					rule,
				),
			),
		),
	)
}


function pair($, key, value) {
	return seq(
		'"', alias(key, $.key), '"', optional(seq(':', value))
	)
}
