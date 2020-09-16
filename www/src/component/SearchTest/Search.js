
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Dexie from 'dexie';
import LibTask from '../../libs/LibTask';
import LibDexie from '../../libs/LibDexie';
import LibCommon from '../../libs/LibCommon';
//import LibPaginate from '../../libs/LibPaginate';
import axios from 'axios';

import * as wasm from "wasm-idx";
//
class Test extends Component {
    constructor(props){
        super(props)
        this.state = {title: '', content: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        var config = LibTask.get_const()
        this.db = new Dexie( config.DB_NAME );
        this.db.version(config.DB_VERSION).stores( config.DB_STORE );
// console.log( config.DB_STORE );
        this.get_items();
    }
    async add_item (num) {
        var task = {
            title: "title-" + num,
            content: "content-" + num,
            created_at: new Date(),
        }
        await this.db.tasks.add( task)
       console.log( task )
    }
    async get_items(){
//console.log( "#get_items" )
        var self = this
        await this.db.tasks.toArray().then(function (items ) {
            var tasks = LibDexie.get_reverse_items(items)
            self.setState({ data: tasks })
//console.log( tasks )
        });
    }
    getRowTag(item){
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
            //console.log( this.state.data )
            var t0 = performance.now();
            var values = wasm.wasm_test_array("div_post_wrap", this.state.data , key);
            var t1 = performance.now();

            var s_elm = "";     
            var self = this
            values.map(function(object, i){
                var s = self.getRowTag( object );
                s_elm += s;
            })
            var parent = window.document.getElementById('div_post_wrap');
            var div = document.createElement('div');
            div.innerHTML = s_elm;
            parent.appendChild(div);            

            //var t1 = performance.now();
            console.log("Call to function took= " + (t1 - t0) + " milliseconds.");
//            console.log( values )
        }
    }    
    handleChangeKey(){
    }
    handleClick(){
        console.log("#-handleClick")
        var s = $("#input_key").val();
//        console.log( s )
        this.execSearch(s)
    }
    render() {
        $("#div_post_wrap").empty();
        return (
        <div className="container">
            <Link to="/speed_test" className="btn btn-outline-primary mt-2">Back</Link>
            <hr />
            <h1 className="mt-2">Wasm - SearchTest</h1>
            <hr className="mt-2 mb-2" />
            Serach - Key:
            <input type="text" className="form-control mb-2" id="input_key" />
            <button className="btn btn-primary" onClick={this.handleClick}> Search
            </button>            
            <hr className="mt-2 mb-2" />
            <div id="div_post_wrap">
            </div>
        
        </div>
        )
    }
}
export default Test;

