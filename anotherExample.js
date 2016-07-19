/**
 * Created by psenger on 7/19/16.
 *
 * I think this is a better example.
 *
 * A Function transforms input to output.
 */

var curriedFunction = function (a) {
    return function (b) {
        return function (c) {
            console.log( a, b, c);
        }
    }
};

/** Full **/
curriedFunction('a')('b')('c');

/** Partial **/
var x = curriedFunction('a');
x('b')('c');

/**
 * Composition - declarative style
 *
 */
function compose( g, f ){
    return function( x ) {
        return g( f( x ) );
    }
}

function count( x ) {
    return x.length;
}

function double( x ) {
    return x.concat(x);
}

var result = compose( count, double )( [ 'apple', 'banna', 'grape' ] );

console.log( result );

/**
 * Recursion is top down
 * Iteration is usually bottom up
 */
