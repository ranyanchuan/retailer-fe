import React from 'react';
import {connect} from 'dva';
import {Layout, Menu, Icon, message, Spin, Badge, Dropdown} from 'antd';
import logoUrl from 'assets/img/logo.png';

import Footer from 'components/Footer';

import styles from './index.less';


const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

@connect((state) => ({
  commonModel: state.commonModel,
}))

class BasicLayout extends React.Component {

  state = {};


  render() {
    return (

      <div>
        {/*后台*/}
        <Layout>
          <Header className="header">
            <div className="logo" style={{float: 'left'}}><img src={logoUrl} alt="小卖部"/></div>
          </Header>

          <Layout style={{padding: '0 24px 24px'}}>
            <Content
              className={styles.content}
            >
              {this.props.children}
            </Content>
            <Footer/>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default BasicLayout;


