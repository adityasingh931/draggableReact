import React, { Component }  from 'react';
import GridLayout from 'react-grid-layout';
import { blue } from 'ansi-colors';
import RGL, { Responsive, WidthProvider } from 'react-grid-layout';
import Chart from './Chart';
import BarCharts from './BarCharts';
import CountWidget from './CountWidget'
import { classes } from 'istanbul-lib-coverage';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import NewModal from './Model/newModel';


const ResponsiveGridLayout = WidthProvider(Responsive);


class ConfigView extends Component{
    state = {
        widgets: [{grid: {x:0, y: 0, w:2, h: 4,minH: 3, minW: 2},color:"#caf5b5",type:null},
        {grid: {x:2, y: 0, w:2, h: 4,minH: 3, minW: 2},color:"#caf5b5",type:null}
                ],
        showModel:false,
        selectedWidget:null,
        selectedType:null,
      }

      showModel = (id) => {        
        this.setState({
                selectedWidget:id,
                showModel: true
            })
          }

      hideModel = () => {
          this.setState({
            showModel: false,
            selectedWidget:null,
            selectedType:null,
          })
          }
      
      handleChange = (e)=>{
        this.setState({
          selectedType:e.target.value
        })
      }
      
      saveModel = () =>{
        const {widgets, selectedWidget, selectedType} =this.state
        let newWidget = widgets
        if (this.state.widgets){
        newWidget[selectedWidget].type=selectedType
      } 
      this.setState({
        widgets: newWidget,
        showModel:false,
        selectedWidget:null,
        selectedType:null,
      })
      } 

      addWidget = () => {
        
          this.setState(
            
            prevState => {
              let newWidget = prevState.widgets;
              let valueX = 0
              let valueY = 0
              if (newWidget.length) {
              let lastElement = Object.keys(newWidget)[Object.keys(newWidget).length-1];
              valueX = newWidget[lastElement].grid["x"]+newWidget[lastElement].grid["w"]
              valueY = newWidget[lastElement].grid["y"]
              }
              if (valueX>10){
                valueX=0
              }
              newWidget.push({grid: {x:valueX, y: valueY, w:2, h: 4, minH: 3, minW: 2},color:"#caf5b5", type:null});
              return {
                widgets:newWidget,
              }
            }
          );
      }
      removeWidget =(id) =>{
        
        let newWidget = this.state.widgets
        newWidget.splice(id,1)
        this.setState (
          {
            widgets:newWidget
        });
      }
      onLayoutChange =(layout)=>{
        let newWidgets=this.state.widgets
        layout.map((item, index)=>{
          return newWidgets[index].grid=item})
        
        this.setState({
          widgets:newWidgets
        })
      }
  
    render() {
        return (
            <div>
            <button onClick={this.addWidget}>Add Widgets</button>
            <NewModal
                    show={this.state.showModel}
                    handleChange={(e)=>this.handleChange(e)}
                    hideModel={this.hideModel}
                    saveModel={this.saveModel}
                />
            <ResponsiveGridLayout className="layout" style={{marginTop: '10px'}}
            rowHeight={100}
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}} 
            onLayoutChange={this.onLayoutChange}
            >
            {this.state.widgets.map((item, index)=>{
            return <div style={{backgroundColor: item.color}} key={index} data-grid={item.grid}>
              <div>
              <ResponsiveGridLayout>
              <div key="a" data-grid={{x: 0, y: 0, w: 0, h: 0}}>a</div>
              <div key="b" data-grid={{x: 1, y: 0, w: 1, h: 1, minW: 1, maxW: 4}}>b</div>
              <div key="c" data-grid={{x: 4, y: 0, w: 1, h: 1}}>c</div>
              </ResponsiveGridLayout>
              <button onClick={() => this.showModel(index)}>Edit</button>
              {(this.state.widgets.length-1)===index ?
              <button onClick={() => this.removeWidget(index)}>remove</button>
              :null}
              {item.type==="count"?<CountWidget
              index={index}
              />
              : item.type==="lineChart"?<Chart/>
              : item.type==="barChart"?<BarCharts/>
              : null
              }
              </div>
              </div>
               })}
            
          </ResponsiveGridLayout>
          
          </div>
        )
      }
    
}




export default ConfigView;