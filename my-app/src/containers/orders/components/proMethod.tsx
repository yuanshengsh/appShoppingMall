import React, { Component } from 'react'
//   import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile'
//   import Logo from '../../components/logo/logo'
import { Form, Input, Button, message, Card, Radio } from 'antd';
import axios from "axios";
import './proMethod.less';
import OrgTree from 'react-org-tree';

const horizontal = true; // true：横向  false：纵向
const collapsable = true; // true：可折叠 false：不可折叠 
const expandAll = false; // true: 全部展开 false：全部折叠 
const myRef: any = React.createRef();

const material =
{
  "type": "材质",
  "label": "户内PP纸无背胶",
  "children": [
    {
      "type": "工艺",
      "label": "进口高清户内写真",
      "children": [
        {
          "type": "工艺&配件",
          "label": "覆膜",
          "part": [
            {
              "type": "配件",
              "label": "亮膜"
            },
            {
              "type": "配件",
              "label": "哑膜"
            },
            {
              "type": "配件",
              "label": "地板膜（斜纹）"
            },
            {
              "type": "配件",
              "label": "地板膜（细纹）"
            },
            {
              "type": "配件",
              "label": "地板膜（粗纹）"
            },
            {
              "type": "配件",
              "label": "水晶膜"
            },
            {
              "type": "配件",
              "label": "双面胶（覆正面）"
            },
            {
              "type": "配件",
              "label": "双面胶（覆反面）"
            },
            {
              "type": "配件",
              "label": "可擦写膜"
            },
            {
              "type": "配件",
              "label": "黄底亮膜"
            },
            {
              "type": "配件",
              "label": "黄底哑膜"
            }
          ],
          "children": [
            {
              "type": "工艺",
              "label": "小块裁切"
            },
            {
              "type": "工艺",
              "label": "四角打扣",
              "children": [
                {
                  "type": "工艺&配件",
                  "label": "陪展架",
                  "part": [
                    {
                      "type": "配件",
                      "label": "X展架60普通型"
                    },
                    {
                      "type": "配件",
                      "label": "X展架60加强型"
                    },
                    {
                      "type": "配件",
                      "label": "X展架80普通型"
                    },
                    {
                      "type": "配件",
                      "label": "X展架80加强型"
                    },
                    {
                      "type": "配件",
                      "label": "门型展架60普通"
                    },
                    {
                      "type": "配件",
                      "label": "门型展架80普通"
                    },
                    {
                      "type": "配件",
                      "label": "门型展架80加强"
                    }
                  ]
                }
              ]
            },
            {
              "type": "工艺",
              "label": "异形切割"
            },
            {
              "type": "工艺&配件",
              "label": "陪挂轴",
              "part": [
                {
                  "type": "配件",
                  "label": "塑料挂轴"
                },
                {
                  "type": "配件",
                  "label": "铝合金挂轴"
                }
              ]
            },
            {
              "type": "工艺",
              "label": "易拉宝画面",
              "children": [
                {
                  "type": "工艺&配件",
                  "label": "易拉宝画面",
                  "part": [
                    {
                      "type": "配件",
                      "label": "易拉宝80塑钢"
                    },
                    {
                      "type": "配件",
                      "label": "易拉宝80铝合金"
                    },
                    {
                      "type": "配件",
                      "label": "易拉宝80豪华"
                    },
                    {
                      "type": "配件",
                      "label": "易拉宝120铝合金"
                    },
                    {
                      "type": "配件",
                      "label": "易拉宝120豪华"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}


const options = [
  { label: '户内写真', value: 1 },
  { label: '户外写真', value: 2 },
  { label: '3.2米喷绘', value: 3 },
  { label: '条幅', value: 4 },
];

type MaterialType = {
  label: string,
  children?: MaterialType[],
  type: 'string',
  part?: MaterialType[]
}

interface ProMethodState {
  craft: number | null,
  selectedArr: MaterialType[]
}

class ProMethod extends Component<any, ProMethodState> {
  constructor(props) {
    super(props);
    this.state = {
      craft: null, // 工艺
      selectedArr: []
    }
    axios.get('/api/product/1')
      .then(res => {// 对返回的token进行解构,并存储
        console.log('res', res)

      }).catch(err => {
        console.log(err);
      })

  }

  clickNode = (e, node) => {
    console.log(e)
    console.log(node);
    myRef.current.handleExpand(e, node);
    let arr = [];
    const { selectedArr } = this.state;
    if (node.expand) {
      // 是展开下级
      arr = JSON.parse(JSON.stringify(selectedArr));
      arr.push(node);
      e.target.style.border = '1px solid #f00';
      e.target.style.background = 'rgba(255, 0, 0,0.05)';
    } else {
      // 收起下级
      const i = selectedArr.findIndex(item => item.label === node.label);
      arr = selectedArr.slice(0, i);
      e.target.style.border = '';
      e.target.style.background = 'rgb(255, 255, 255)';
    }
    this.setState({
      selectedArr: arr,
    });
  }

  onChange = e => {
    console.log('radio3 checked', e.target.value);
    this.setState({
      craft: e.target.value,
    });
  };

  materialRender = () => {
    let text = '';
    const { selectedArr } = this.state;
    selectedArr.forEach(item => {
      text += item.label;
      text += '-';
    })
    return text;
  }

  render() {
    const { craft, selectedArr } = this.state;
    return (
      <div className="page-pro-method">
        <div>
          <h3>
            已选材料：
            {!selectedArr.length ? (<span>无</span>) : (<span>{this.materialRender()}</span>)}
          </h3>
        </div>
        <div>
          <Radio.Group
            options={options}
            onChange={this.onChange}
            value={craft}
            optionType="button"
          />
        </div>
        {craft && <OrgTree
          data={material}
          horizontal={horizontal}
          collapsable={collapsable}
          expandAll={expandAll}
          onClick={(e, node) => { this.clickNode(e, node) }}
          ref={myRef}
        />}
      </div>
    )
  }
}

export default ProMethod