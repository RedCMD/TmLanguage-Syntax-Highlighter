
/* IMPORT */

import CSON = require ( '../src/parser/cson.js' ); //UGLY

/* CSON 2 JSON */

function cson2json ( cson: string ) {

  return CSON.parse ( cson );

}

/* EXPORT */

export default cson2json;
