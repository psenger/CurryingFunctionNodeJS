/**
 * Created by psenger on 4/12/15.
 */
var fs = require('fs'),
    curry = require('curry'),
    Q = require('q'),
    _ = require('lodash');

function medicalRecordsService() {
    var deferred = Q.defer();
    setTimeout(function () {
        fs.readFile('medical_data.json', 'utf8', function (err,data) {
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

medicalRecordsService()
    .then( JSON.parse )
    .then( extract( "medical" ) )
    .then( map( extract( "diagcode" ) ) )
    .then( function( codes ){
        console.log('All extracted diagcodes', codes );
    })
    .catch( function(reason){
        console.log('failure', reason );
    });