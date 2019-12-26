/* eslint-disable import/first */

import React from 'react';
import {Row, Col, Card} from 'antd';


import gree from 'assets/img/gree.jpg';
import tcl from 'assets/img/tcl.jpg';

import styles from './index.less';

const {Meta} = Card;


const bannerData = [
  {
    id: '1',
    src: gree,
  },
  {
    id: '2',
    src: tcl,
  }

]


class Index extends React.Component {

  state = {};

  render() {

    return (
      <div className={styles.index}>

        {/*轮播图*/}
        {/*<Carousel autoplay afterChange={this.onChange}>*/}
        {/*{bannerData && bannerData.map((item) => {*/}
        {/*const {id, title, src} = item;*/}
        {/*return (*/}
        {/*<div key={id}>*/}
        {/*<img src={src} style={{height: 500}}/>*/}
        {/*</div>*/}
        {/*);*/}
        {/*})}*/}
        {/*</Carousel>*/}


        <div className={styles.content}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card
                hoverable
                style={{width: 240}}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
              >
                <Meta title="Europe Street beat"/>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{width: 240}}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
              >
                <Meta title="Europe Street beat"/>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{width: 240}}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
              >
                <Meta title="Europe Street beat"/>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{width: 240}}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"/>}
              >
                <Meta title="Europe Street beat"/>
              </Card>
            </Col>
          </Row>
        </div>

      </div>

    );
  }
}

export default Index;
