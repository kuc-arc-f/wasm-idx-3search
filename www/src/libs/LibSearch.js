// LibSearch
import LibCommon from '../libs/LibCommon';

//
export default {
    get_search_items: function(items, key){
        var data =[]
        items.forEach(function(item){
            if ( item.title.indexOf(key) != -1 ) {
                data.push(item)
            }
        });        
        return data
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    get_rand_str: function(){
        var arr = [
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
            "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
        ];
//        console.log(arr.length )
        var n = this.getRandomInt(arr.length);
//        console.log( n )
        var s  = arr[n]
        return s
//        console.log( s )

    },
    get_title: function(num){
        var ret = ""
        for(var i= 0; i< 100; i++){
            var s = this.get_rand_str()
            ret += s
        }
        ret = ret + "-" + String(num)
//        console.log( ret )
        return ret
    }

}
