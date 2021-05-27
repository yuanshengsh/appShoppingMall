import React, { Component } from 'react'
//   import Logo from '../../components/logo/logo'
import { withRouter } from 'react-router-dom'
import { Form, Input, Button, message, Card, Radio, Modal } from 'antd';
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
  parentId: 0,
  id: 1,
  "children": [
    {
      "type": "工艺",
      "label": "进口高清户内写真",
      parentId: 1,
      id: 2,
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
          parentId: 2,
          id: 3,
          "children": [
            {
              "type": "工艺",
              "label": "小块裁切",
              parentId: 3,
              id: 5,
            },
            {
              "type": "工艺",
              "label": "四角打扣",
              parentId: 3,
              id: 6,
              "children": [
                {
                  "type": "工艺&配件",
                  "label": "陪展架",
                  parentId: 6,
                  id: 10,
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
              "label": "异形切割",
              parentId: 3,
              id: 7,
            },
            {
              "type": "工艺&配件",
              "label": "陪挂轴",
              parentId: 3,
              id: 8,
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
              parentId: 3,
              id: 9,
              "children": [
                {
                  "type": "工艺&配件",
                  "label": "易拉宝画面",
                  parentId: 9,
                  id: 11,
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
        },
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
  type?: string,
  part?: MaterialType[],
  parentId?: number,
  id?: number
}
type SelectedArr = {
  e?: any,
  node: MaterialType,
}

type RadioOptions = {
  label: string,
  value: string
}

interface ProMethodState {
  craft: number | null,
  selectedArr: SelectedArr[],
  visible: boolean,
  curPartOptions: RadioOptions[],
  curPart: string,
  curPartParent: SelectedArr
}

class ProMethod extends Component<any, ProMethodState> {
  constructor(props) {
    super(props);
    const { history } = props;
    console.log('history', history)
    this.state = {
      craft: null, // 工艺
      selectedArr: [],// 当前选中的工艺
      visible: false,// 配件弹窗
      curPartOptions: [],// 当前配件列表配置
      curPart: '',// 当前配件
      curPartParent: null,// 当前配件父级
    }
    axios.get('/api/product/1')
      .then(res => {// 对返回的token进行解构,并存储
        if (res.data.errno === 401) {
          history.push('/login')
        }
        console.log('res', res)
      }).catch(err => {
        console.log(err);
      })

  }

  clickNode = (e, node) => {
    console.log(e)
    console.log(node);
    const { selectedArr } = this.state;
    let arr = [];
    if (node.expand) {
      // 收起下级
      const i = selectedArr.findIndex(item => item.node.id === node.id);
      arr = selectedArr.slice(0, i);
      e.target.style.border = '';
      e.target.style.background = 'rgb(255, 255, 255)';
      myRef.current.handleExpand(e, node);
    } else {
      console.log('part', node.part)
      // 是展开下级
      arr = selectedArr;
      if (selectedArr.length && selectedArr.some(item => item.node.parentId === node.parentId)) {
        // 选中同级，同级其他取消
        const { node: cancelNode, e: cancelE } = selectedArr.find(item => item.node.parentId === node.parentId);
        const i = selectedArr.findIndex(item => item.node.parentId === node.parentId);
        arr = selectedArr.slice(0, i);
        this.clickNode(cancelE, cancelNode)
      }
      arr.push({ node, e });
      e.target.style.border = '1px solid #f00';
      e.target.style.background = 'rgba(255, 0, 0,0.05)';
      if (node.part && node.part.length) {
        // 有配件
        const part = node.part.map(item => {
          const obj = { value: item.label, label: item.label };
          return obj
        });
        this.setState({ curPartOptions: part, visible: true, curPartParent: { e, node } });
      } else {
        // 无配件
        myRef.current.handleExpand(e, node);
      }
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

  onChange3 = e => {
    this.setState({ curPart: e.target.value })
  };

  materialRender = () => {
    let text = '';
    const { selectedArr } = this.state;
    selectedArr.forEach(item => {
      text += item.node.label;
      text += '-';
    })
    return text;
  }

  handleOk = () => {
    // 确认选择配件
    const { selectedArr, curPart, curPartParent } = this.state;
    this.setState({ visible: false, selectedArr: selectedArr.concat({ 'node': { label: curPart } }) })
    const { node, e } = curPartParent;
    myRef.current.handleExpand(e, node);
  };

  render() {
    const { craft, selectedArr, visible, curPartOptions, curPart } = this.state;
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
        <Modal
          visible={visible}
          onOk={this.handleOk}
          closable={false}
          className="part-modal"
          footer={[
            <Button key="submit" type="primary" onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          <Radio.Group
            options={curPartOptions}
            onChange={this.onChange3}
            value={curPart}
            optionType="button"
          />
        </Modal>
      </div>
    )
  }
}

export default withRouter(ProMethod);
