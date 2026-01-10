
//TODO: Implement indentation rules

/* INIT */

{
  const newlinePlaceholder = `<NEWLINE:PLACEHOLDER:${Math.random ()}>`;
  const newlinePlaceholderRe = new RegExp ( newlinePlaceholder, 'g' );
}

/* CSON */

CSON = BOM? void v:value void { return v; }

BOM = '\uFEFF'

/* VOID */

void = (whitespace comment? newline)* whitespace
void_newline = (whitespace comment? newline)+ whitespace

whitespace = [ \t]*
newline = '\r'? '\n'
comment = '#' [^\n]*

/* VALUE */

value = line_object / null / boolean / number / string / array / object

/* NULL */

null = 'null' { return null; }

/* BOOLEAN */

boolean = true / false

true = 'true' { return true; }
false = 'false' { return false; }

/* NUMBER */

number = (number_binary / number_octal / number_hexadecimal / number_float) { return Number ( text () ); }

number_binary = '0b' [01]+
number_octal = '0o' [0-7]+
number_hexadecimal = '0x' [0-9a-fA-F]+
number_float = '-'? (('0' / [1-9][0-9]* ) ('.' [0-9]+)? / ('.' [0-9]+)) ('e' [-+]? [0-9]+)?

/* STRING */

string
  = v:(
      "'''" (!"'''" ("\\'''" { return "'''"; } / char))* "'''"
    / '"""' (!'"""' ('\\"""' { return '"""'; } / char))* '"""'
    / "'" (!"'" ("\\'" { return "'"; } / char))* "'"
    / '"' (!'"' ('\\"' { return '"'; } / char))* '"'
  )
  {
    const loc = location ();
    const isBlock = ( v[0].length === 3 );
    const isMultiline = ( loc.start.line !== loc.end.line );
    let string = v[1].map ( x => x[1] ).join ( '' );
    if ( isMultiline ) {
      if ( isBlock ) {
        string = string.replace ( /^[^\S\r\n]*\n/g, '' ); // Trim start
        string = string.replace ( /\n[^\S\r\n]*$/g, '' ); // Trim end
        string = string.replace ( /(\S\s*)\\\n\s*(\S)/g, '$1$2' ); // Trim escaped newlines
        const indentations = string.split ( '\n' ).filter ( line => !/^\s*$/.test ( line ) ).map ( line => line.match ( '(^[^\\S\\r\\n]*)' )[1].length );
        const indentation = indentations.length ? indentations.reduce ( ( prev, next ) => Math.min ( prev, next ) ) : 0;
        const indentationRe = new RegExp ( `^[^\\S\\r\\n]{${indentation}}` );
        string = string.split ( '\n' ).map ( line => line.replace ( indentationRe, '' ) ).join ( '\n' ); // Trim indentation
      } else {
        string = string.replace ( /^\s*\n\s*(\S)/g, '$1' ); // Trim start
        string = string.replace ( /(\S)\s*\n\s*$/g, '$1' ); // Trim end
        string = string.replace ( /(\S\s*)\\\n\s*(\S)/g, '$1$2' ); // Trim escaped newlines
        string = string.replace ( /(\S)\s*\n\s*(\S)/g, '$1 $2' ); // Collapse middle
      }
    }
    string = string.replace ( newlinePlaceholderRe, '\n' );
    return string;
  }

char = char_escaped_simple / char_escaped_newline / char_escaped_special / char_escaped_unicode / .
char_escaped_simple = '\\' v:[\\/#] { return v; }
char_escaped_newline = '\\n' { return newlinePlaceholder; }
char_escaped_special = '\\' v:[bfrt] { return { b: '\b', f: '\f', r: '\r', t: '\t' }[v]; }
char_escaped_unicode = '\\u' digits:$([0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]) { return String.fromCharCode ( parseInt ( digits, 16 ) ); }

/* ARRAY */

array
  = array_start
    v:(
      head:value
      tail:(array_values_separator v:value { return v; })*
      array_values_separator?
      { return [head].concat ( tail ); }
    )?
    array_end
    { return v || []; }

array_start = void '[' void
array_end = void ']'
array_values_separator = (void ',' void / void_newline ','? void)

/* OBJECT */

object
  = object_start
    v:(
      head:object_kv
      tail:(object_values_separator kw:object_kv { return kw; })*
      object_values_separator?
      { return [head].concat ( tail ).reduce ( ( acc, kw ) => ( acc[kw.k] = kw.v, acc ), {} ); }
    )?
    object_end
    { return v || {} }

object_kv = k:object_key object_key_separator v:value { return {k, v }; }

object_start = void '{' void
object_end = void '}'
object_values_separator = (void ',' void / void_newline ','? void)
object_identifier = [$a-zA-Z_][$0-9a-zA-Z_]* { return text (); }
object_key = string / object_identifier
object_key_separator = void ':' void

/* LINE OBJECT */

line_object
  = void
    v:(
      head:object_kv
      tail:(object_values_separator kw:object_kv { return kw; })*
      { return [head].concat ( tail ).reduce ( ( acc, kw ) => ( acc[kw.k] = kw.v, acc ), {} ); }
    )
    { return v || {} }
