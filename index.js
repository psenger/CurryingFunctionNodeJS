var fs = require('fs'),
    curry = require('curry'),
    Q = require('q'),
    _ = require('lodash');

function bookService() {
    var deferred = Q.defer();
    setTimeout(function () {
        fs.readFile('book_data.json', 'utf8', function (err,data) {
            if (err) {
                deferred.reject( err );
                return;
            }
            deferred.resolve( data );
        });
    }, 0);
    return deferred.promise;
}

var /**
     * Iterate over all items in a list or object, applying a curried function to each, returning a new list of values.
     */
     map = curry( function( fn, obj ) {
        return _.map(obj, fn);
     }),

    /**
     * For any object extract, its property value based on the curried property key.
     */
    extract = curry( function( key, source ) {
        return source.hasOwnProperty(key) ? source[key] : null;
    });

bookService()
    .then( JSON.parse )
    .then( extract( "posts" ) )
    .then( map( extract( "title" ) ) )
    .then( function( titles ){
        console.log('All extracted post titles', titles );
    })
    .catch( function(reason){
        console.log('failure', reason );
    });