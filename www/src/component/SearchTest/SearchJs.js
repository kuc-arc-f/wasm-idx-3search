import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';
import LibDexie from '../../libs/LibDexie';
import LibSearch from '../../libs/LibSearch';

//
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {data: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        var config = LibTask.get_const()
// console.log(config)
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );
        this.get_items()        
    }
    async get_items(){
        var self = this
        await this.db.tasks.toArray().then(function (items ) {
            var tasks = LibDexie.get_reverse_items(items)
            self.setState({ data: tasks })
// console.log( tasks )
        });
    }
    getPostRow(item){
        var ret = "<div class='div_post_row_wrap'>";
        ret += "  <p class='p_title mb-0'>";
        ret += item.title;
        ret += " , "+ item.created_at + " ,";
        ret += "<span>ID :" + item.id + "</span>";
        ret += "  </p>";
        ret += "  <hr class='hr_ex1 mt-1 mb-1'>";
        ret += "</div>";
        return ret;
    }    
    execSearch( key ){
        $("#div_post_wrap").empty();
        if(this.state.data instanceof Array){
            var t0 = performance.now();
            var values= LibSearch.get_search_items(this.state.data, key);
            var t1 = performance.now();
            //dom
            var s_elm = "";     
            var self = this
            values.map(function(object, i){
                var s = self.getPostRow( object );
                s_elm += s;
            })
            var parent = window.document.getElementById('div_post_wrap');
            var div = document.createElement('div');
            div.innerHTML = s_elm;
            parent.appendChild(div);            
console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
//console.log( values )
        }
    }        
    handleClick(){
        console.log("#-handleClick")
        var s = $("#input_key").val();
//        console.log( s )
        this.execSearch(s)
    }    
    render(){
        return (
        <div className="container">
            <h3>SeachTest-javascript - index</h3>
            <hr className="mt-2 mb-2" />
            Serach - Key:
            <input type="text" className="form-control mb-2" id="input_key" />
            <button className="btn btn-primary" onClick={this.handleClick}>Test
            </button>
            <hr />            
            <div id="div_post_wrap">
            </div>
        </div>
        )
    }
}

export default Index;

