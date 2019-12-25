
import React from 'react';
import styles from './index.less';
class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
          <div className={styles.copyright}>
            Copyright © 2019 北京IUAP有限公司 版权所有
          </div>
      </div>
    );
  }
}
export default Footer;
