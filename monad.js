/**
 * Created by psenger on 7/19/16.
 */

/**
 * Monad is a design pattern used to describe computations as a series of steps.
 *
 * This is called monadic bind and illustrates sequential flow
 */

let mbind = (val,functionA,functionB) => {
            ((_val) => functionA.call(this,_val) )(val);
    return  ((_val) => functionB.call(this,_val) )(val);
};

const bang = (s) => console.log(s + '!!');

mbind('Step One',     console.log, console.log );
mbind('Step Two',     console.log, bang );
mbind('Step Three A', console.log, () => mbind('Step Three B', bang, bang) );
mbind('Step Four A',  console.log, () => mbind('Step Four B', () => mbind('Step Three C', bang, bang), () => mbind('Step Three D', bang, bang)) );


class Pot {
    constructor(value) {
        this.contents = value;
    }
    mbind(f) {
        return f.call(this,this.contents);
    }
}
const step = ( i ) => new Pot( i + 1 );
let a = new Pot(1);
let b = a.mbind(step);
let c = b.mbind(step);
console.log( c.contents );
