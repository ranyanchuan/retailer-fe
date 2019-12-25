import React from 'react';
import { Col, Form, TreeSelect } from 'antd';
import { request } from 'utils/request';
import { formData } from 'utils/index';

@Form.create()

class ConTreeSelectLoading extends React.Component {

  state = {
    treeData: [],
  };


  async componentDidMount() {
    const { data } = await this.treeService();
    const { changeTreeData } = this.props;
    this.setState({ treeData: changeTreeData(data) });
  }

  // 获取
  treeService = async (payload) => {
    const {url}=this.props;
    return request(url, {
      method: 'POST',
      body: formData(payload),
    });
  };

  onLoadData = treeNode =>
    new Promise(async resolve => {
      const { id } = treeNode.props;
      const { data } = await this.treeService({ pid: id });
      const { changeTreeData } = this.props;
      this.setState({
        treeData: this.state.treeData.concat([
          ...changeTreeData(data),
        ]),
      });
      resolve();
    });

  render() {
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
      placeholder = '请选择',
      allowClear=true,
    } = this.props;
    const { getFieldDecorator } = form;
    const { treeData } = this.state;

    return (
      <div>

        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue ? defValue.split(',') : [],

          })(
            <TreeSelect
              treeDataSimpleMode
              style={{ width: '100%' }}
              // value={defValue}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder={placeholder}
              loadData={this.onLoadData}
              treeData={treeData}
              allowClear={allowClear}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConTreeSelectLoading;
