mod utils;

use std::collections::HashMap;
use wasm_bindgen::prelude::*;
use web_sys::console;
use serde::{Deserialize, Serialize};
use serde_json::{Value};
//use chrono::{Utc, Local, DateTime, Date};
//use chrono::{NaiveDateTime, Duration};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-idx!");
}


#[wasm_bindgen]
pub fn add(x: i32, y: i32) ->i32{
    return x + y;
}

#[derive(Serialize, Deserialize, Debug)]
struct TaskItem {
    id: i64,
    title: String,
    content: String,
    created_at: String,
}

//
fn convert_struct_2(row : &TaskItem) -> String{
    let mut ret : String = String::from("");
    ret.push_str("<div class='div_post_row_wrap'>");
    ret.push_str("<p class='p_title mb-0'>");
    ret.push_str( &row.title);
    ret.push_str(" , ");
    ret.push_str( &row.created_at );
    ret.push_str("  <span>ID :");
    ret.push_str( &row.id.to_string() );
    ret.push_str("  </span>");
    ret.push_str("</p>");
    ret.push_str("<hr class='hr_ex1 mt-1 mb-1'>");
    ret.push_str("</div>");
    return ret;
}

#[wasm_bindgen]
pub fn wasm_object_array(id_name: &str, val: &JsValue) -> JsValue {
    let deserialized: Vec<TaskItem> = val.into_serde().unwrap();
    let mut s_elm : String = String::from("");
    for row in &deserialized {
        let s = convert_struct_2( row);
        s_elm.push_str( &s );
/*
        let s = format!("
        <div class='div_post_row_wrap'>
            <p class='p_title mb-0'>{} {} ,<span>ID :{}</span>
            </p>
            <hr class='hr_ex1 mt-1 mb-1'>    
        </div>" , &row.title  ,&row.created_at, &row.id );
        s_elm.push_str( &s );    
*/
    }    
    // dom , add
    let document = web_sys::window().unwrap().document().unwrap();
    let entry_point = document.get_element_by_id(id_name).unwrap();
    let val = document.create_element("div").unwrap();
    val.set_inner_html(&s_elm );
    entry_point.append_child(&val).unwrap();
    //        console::log_1(&JsValue::from_str( &row.title ));
    JsValue::from_str( &s_elm )
}
//
fn convert_struct2str(row : &TaskItem) -> String{
    let mut ret : String = String::from("");
    let s_elm = format!("
    <div class='div_post_row_wrap'>
        <a href='#/task_show/{}'>
            <h3 class='h3_title'>{}</h3>
        </a>
        <div class='div_post_date_wrap'>
            <p class='mb-0'>
                <span class='mr-2 time_icon_wrap'><i class='far fa-calendar'></i></span>
                {} ,
                <span>ID :{}</span>
                <a href='#/task_edit/{}' class='btn btn-sm btn-outline-primary ml-2'>
                Edit</a>                
            </p>
        </div>
        <hr class='hr_ex1'>    
    </div>", row.id, row.title ,row.created_at ,row.id, row.id );
    ret = s_elm.to_string();
    return ret;
}

#[wasm_bindgen]
pub fn wasm_task_disp(id_name: &str, json: &str) -> Result<(), JsValue>{
    let mut s_elm : String = String::from("");
    let deserialized: Vec<TaskItem> = serde_json::from_str(json).unwrap();
    for row in &deserialized {
        let s = convert_struct2str( row);
        s_elm.push_str( &s );
//        console::log_1(&JsValue::from_str( &row.created_at ));
//        console::log_1(&JsValue::from_str( &s ));
    }
    // dom , add
    let document = web_sys::window().unwrap().document().unwrap();
    let entry_point = document.get_element_by_id(id_name).unwrap();
    let val = document.create_element("div")?;
    val.set_inner_html(&s_elm );
    entry_point.append_child(&val)?;

    Ok(())
}

#[wasm_bindgen]
pub fn wasm_show_disp(id_name: &str, json: &str) -> Result<(), JsValue>{
    let v: Value = serde_json::from_str( json ).unwrap();
    let tmp_title = v["title"].to_string();
    let title = tmp_title.replace('"', "");
    let tmp_date = v["created_at"].to_string();
    let date_val = tmp_date.replace('"', "");
    let tmp_content = v["content"].to_string();
    let content_val = tmp_content.replace('"', "");
 //console::log_1(&JsValue::from_str( &id_name ));

    let document = web_sys::window().unwrap().document().unwrap();
    let entry_point = document.get_element_by_id(id_name).unwrap();
    let val = document.create_element("div")?;
    let s_elm = format!("
        <h1>{}</h1>
        Date : {}<hr>
        {} <br />
        <br />", title, date_val, content_val);
    val.set_inner_html(&s_elm );
    entry_point.append_child(&val)?;

    Ok(())
}

/*
#[wasm_bindgen_fetures]
pub async fn wasm_test_request() -> Result<(), JsValue>{
    run("reqwest naive serial 1000", async {
        let body = reqwest::get("https://www.rust-lang.org")
        .await.unwrap()
        .text()
        .await.unwrap();
        println!("body = {:?}", body);
    })
    .await;
    Ok(())
}
*/
#[wasm_bindgen]
pub fn wasm_test_array(id_name: &str, val: &JsValue, key_val: &str) -> JsValue {
    let deserialized: Vec<TaskItem> = val.into_serde().unwrap();
    let mut vect : Vec<TaskItem> = Vec::new();
    for row in &deserialized {
//console::log_1(&JsValue::from_str( &row.title ));
        let r = row.title.find(&key_val);
        if(r != None){
            let item = TaskItem{
                id: row.id ,
                title: row.title.to_string(),
                content: row.content.to_string(),
                created_at: row.created_at.to_string(),
            };
            vect.push(item);
        }
//console::log_1(&JsValue::from_str( &key_val ));
        //let s = convert_struct_2( row.title );
        //s_elm.push_str( &s );
    }    
/*
    let mut s_elm : String = String::from("");
    let document = web_sys::window().unwrap().document().unwrap();
    let entry_point = document.get_element_by_id(id_name).unwrap();
    let val = document.create_element("div").unwrap();
    val.set_inner_html(&s_elm );
    entry_point.append_child(&val).unwrap();
    */
    //        console::log_1(&JsValue::from_str( &row.title ));
//    JsValue::from_str( &s_elm )
    JsValue::from_serde(&vect ).unwrap()
}
//
fn convert_html(title: &str ,id_num: i32, created_at: &str) -> String{
    let mut ret : String = String::from("");
    ret.push_str("<div class='div_post_row_wrap'>");
    ret.push_str("<p class='p_title mb-0'>");
    ret.push_str( &title);
    ret.push_str(" , ");
    ret.push_str( &created_at );
    ret.push_str("  <span>ID :");
    ret.push_str( &id_num.to_string() );
    ret.push_str("  </span>");
    ret.push_str("</p>");
    ret.push_str("<hr class='hr_ex1 mt-1 mb-1'>");
    ret.push_str("</div>");
    return ret;
}

#[wasm_bindgen]
pub fn wasm_search_row(
    key_val: &str, title: &str ,id_num: i32, created_at: &str) -> JsValue {
//console::log_1(&JsValue::from_str( &row.title ));
    let mut s_elem : String = String::from("");
    let mut ret : i32 = 0;
    let r = title.find(&key_val);
    if(r != None){
        ret = 1;
        let s = convert_html(title, id_num, created_at);
        s_elem.push_str( &s );
    }
    JsValue::from_str( &s_elem )
}

#[wasm_bindgen]
pub fn wasm_disp_row(title: &str ,id_num: i32, created_at: &str) -> JsValue {
//console::log_1(&JsValue::from_str( &row.title ));
    let mut s_elem : String = String::from("");
    let s = convert_html(title, id_num, created_at);
    s_elem.push_str( &s );
    JsValue::from_str( &s_elem )
}
