import React from 'react';
import { Form, Divider } from 'antd';

@Form.create()

class ConTableStateAction extends React.Component {

  render() {
    const { record, field = 'state', onShowModal, showDelCon } = this.props;
    return (
      <span>
          {record[field] == '禁用' ? <a onClick={() => onShowModal('edit', record)}>编辑</a> : '编辑'}
        <Divider type="vertical"/>
          <a onClick={() => onShowModal('desc', record)}>查看</a>
          <Divider type="vertical"/>
        {record[field] == '禁用' ? <a onClick={() => showDelCon(record)}>删除</a> : '删除'}
        </span>
    );

  }
}

export default ConTableStateAction;
