/* eslint-disable import/first */

import React from 'react';
import { Icon, Result } from 'antd';

class Index extends React.Component {

  state = {

  };

  render() {
    // 判断404
    return (
      <Result
        style={{ marginTop: 100 }}
        icon={<Icon type="smile" theme="twoTone"/>}
        title="Great, we have done all the operations!"
      />

    );
  }
}

export default Index;
