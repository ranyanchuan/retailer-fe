import React from 'react';
import { Form, TreeSelect } from 'antd';
import { request } from 'utils/request';
import { formData } from 'utils/index';

const { SHOW_PARENT, SHOW_ALL } = TreeSelect;


@Form.create()

class ConTreeSelectPromise extends React.Component {

  state = {
    defValue: '',
    treeData: [],
  };

  async componentDidMount() {
    const { defValue, onRef } = this.props;
    let { data } = await this.treeService();
    // 兼容接口
    let treeData = Array.isArray(data) ? data : data.rows;
    this.setState({ treeData, defValue });
    if (onRef) {
      this.props.onRef(this);
    }
  }


  async componentWillReceiveProps(nextProps) {
    const { defValue, isLoadingData } = nextProps;
    if (isLoadingData && (defValue !== this.props.defValue)) {
      let { data } = await this.treeService();
      // 兼容接口
      let treeData = Array.isArray(data) ? data : data.rows;
      this.setState({ treeData, defValue });
    }
  }


  // 获取
  treeService = () => {
    const { url, payload } = this.props;
    return request(url, {
      method: 'POST',
      body: formData(payload),
    });
  };


  onFocus = () => {
    console.log('onFocusddd');
  };

  //onChange
  onChange = (keys, values, nodes) => {
    this.setState({ defValue: values.toString() });
  };


  tree2Map = (data) => {
    const { treeOptionId = 'id', treeOptionTitle = 'title', treeOptionCode = 'code' } = this.props;
    let map = {};
    this.treeMap(data, map, treeOptionTitle, treeOptionId, treeOptionCode);
    return map;
  };


  treeMap = (data, map, key, value, code) => {
    if (!Array.isArray(data)) {
      return data;
    }
    for (let item of data) {
      let { children } = item;
      map[`${item[key]}(${item[code]})`] = item[value];
      if (children) {
        this.treeMap(children, map, key, value);
      }
    }
    return map;
  };


  getTreeSelect = () => {
    const { treeData, defValue } = this.state;
    let obj = this.tree2Map(treeData);
    const set = new Set(defValue.split(','));
    let setDefValue = (Array.from(set)).toString();

    let id = setDefValue ? setDefValue.split(',').map(item => obj[item]).toString() : '';
    return { id: id, title: setDefValue };
  };


  changeTreeData = (data) => {

    const { treeOptionId = 'id', treeOptionTitle = 'title', treeOptionCode = 'code' } = this.props;

    if (!Array.isArray(data)) {
      return data;
    }
    return data.map(item => {
      let { children } = item;
      // let result = { ...item };
      let result = {};
      if (children && Array.isArray(children) && children.length > 0) {
        result.children = this.changeTreeData(children);
      }
      result.value = `${item[treeOptionTitle]}(${ item[treeOptionCode]})`;
      result.key = item[treeOptionId].toString();
      result.title = `${item[treeOptionTitle]}(${ item[treeOptionCode]})`;
      return result;
    });
  };

  // 去除相同key
  clearEqualKey = (data) => {
    const set = new Set(data.split(','));
    return Array.from(set);
  };


  render() {

    const { treeData } = this.state;
    const formatData = this.changeTreeData(treeData);
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue,
      form,
      required = false,
      label,
      id,
      message,
      placeholder,
      treeCheckable = true,
      autoClearSearchValue = true,
      multiple = false,
      allowClear = true,
    } = this.props;
    const { getFieldDecorator } = form;

    const tProps = {
      ...this.props,
      treeData: formatData,
      // treeData,
      onChange: this.onChange,
      treeCheckable,
      focus: this.onFocus,
      multiple,
      showCheckedStrategy: SHOW_ALL,
      searchPlaceholder: placeholder,
      allowClear,
      autoClearSearchValue,
      style: {
        width: '100%',
      },
    };
    return (
      <div>

        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue ? this.clearEqualKey(defValue) : [],

          })(
            <TreeSelect
              {...tProps}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConTreeSelectPromise;
