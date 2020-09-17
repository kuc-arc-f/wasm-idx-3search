import React , { Component } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';

import Home from './component/Home';
import About from './component/About';
import Navbar from './component/Layouts/Navbar';
import Footer from './component/Layouts/Footer';
//import Test from './component/Test';
//
/* task */
import TaskCreate from './component/Task/Create';
import TaskIndex from './component/Task/Index';
import TaskShow from './component/Task/Show';
import TaskEdit from './component/Task/Edit';
import TaskImportTask from './component/Task/ImportTask';
import TaskTest from './component/Task/Test';

/* speed_test*/
import SpeedTest from './component/SpeedTest/Index';
import SpeedTestIndexJs from './component/SpeedTest/IndexJs';
import SpeedTestTest from './component/SpeedTest/Test';
/* speed_serach */
import SearchTestSearch from './component/SearchTest/Search';
import SearchTestSearchJs from './component/SearchTest/SearchJs';
/* SearchTest_2 */
import SearchTest_2_Search from './component/SearchTest_2/Search';
/* SpeedTest_2 */
import SpeedTest_2 from './component/SpeedTest_2/Index';

//
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
        <Navbar />
          <div>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>

            <Route path='/task' component={TaskIndex}/>
            <Route path='/task_create' component={TaskCreate}/>
            <Route path='/task_edit/:id' component={TaskEdit}/> 
            <Route path='/task_show/:id' component={TaskShow}/>
            <Route path='/task_import' component={TaskImportTask}/>
            <Route path='/task_test' component={TaskTest}/>

            <Route path='/speed_test' component={SpeedTest}/>
            <Route path='/speed_test_js' component={SpeedTestIndexJs}/>
            <Route path='/speed_test_test' component={SpeedTestTest}/>
            <Route path='/speed_test_search' component={SearchTestSearch}/>
            <Route path='/speed_test_search_js' component={SearchTestSearchJs}/>
            <Route path='/speed_test2_search' component={SearchTest_2_Search}/>
            <Route path='/speed_test2' component={SpeedTest_2}/>
            
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
export default App;
