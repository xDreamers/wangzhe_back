import React from 'react';
import { Tabs ,message} from 'antd';
const TabPane = Tabs.TabPane;
import './index.less';


import {

    get_category,
    get_hero_list
}from '../../utils/request';

import {uploader_init} from '../../common/uploader';
/**
 * 测试用
 */


class CurrentHeros extends React.PureComponent {

    constructor(props){

        super(props);

        this.state={

            list:[]
        }
    }


    componentDidMount(){

        if (this.props.current_key != this.props.select_key){

            return
        }

        var index = this.props.current_key;
        this.getList(this.props.cateList[index].id);
    }

    componentWillReceiveProps(nextProps){

        if (this.props.current_key != nextProps.current_key){

            var index = nextProps.current_key;

            this.getList(nextProps.cateList[index].id);
        }

    }

    getList = (id)=>{

        var thiz = this;
        get_hero_list(id,(data)=>{

            thiz.setState({

                list:data.data
            })
        })
    }



    render(){


        if (this.props.current_key != this.props.select_key){

            return <h1></h1>
        }


        return (

            <div>

                {

                    this.state.list.map(function(l,index){

                        return <div className="hero_item">

                            <img src={l.logo} />
                            <p>{l.name}</p>

                        </div>
                    })
                }
            </div>

        )

    }

}

class Hello extends React.PureComponent {

  constructor(props){

    super(props);

    this.state = {

        cateList:[],
        current_key:0
    }
  }

  componentDidMount(){

        var thiz = this;

    uploader_init({id:'new_hero'});

      try {
          get_category((data)=>{

               thiz.setState({

                   cateList:data.data
               })
          });
      } catch (e) {
          // 如果网络请求出错, 弹出一个错误提示
          this.message.error(`网络请求出错: ${e.message}`);
      }
  }

  callback = (v)=>{

    this.setState({

        current_key:v
    })
  }


  render() {

      var thiz = this;

    return <div>

      <h1 className="testStyle">Hello, React!</h1>

      <button id="new_hero">新增英雄</button>

      <Tabs defaultActiveKey='0' onChange={this.callback.bind(this)}>

          {

              this.state.cateList.map(function(c,index){

                  return <TabPane tab={c.name} key={index}>

                      <CurrentHeros {...thiz.state} select_key={index}/>
                  </TabPane>

              })
          }

      </Tabs>

    </div>;
  }

}

export default Hello;
