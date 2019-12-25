/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Upload, Icon, Spin } from 'antd';

@Form.create()

class ConUploadOne extends React.Component {

  state = {
    imageUrl: '',
  };

  componentDidMount() {
    const { imageUrl, onRef } = this.props;
    this.setState({ imageUrl });
    if (onRef) {
      this.props.onRef(this);
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    // 将picture url 放到 state 中
    const { imageUrl } = nextProps;
    if (imageUrl !== this.props.imageUrl) {
      this.setState({ imageUrl });
    }
  }

  getFileUrl = () => {
    return this.state.imageUrl;
  };


  // 文件上传请处理
  beforeUpload = () => {

  };


  // 文件上传成处理
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'done') {
      // Get this url from response in real world.
      const { response } = info.file;
      const { link } = response.data;
      // 服务器端 头像地址
      if (link) {
        this.props.updatePicture(link, info.file);
        this.setState({ imageUrl: link });
      }
    }
  };

  render() {

    const {
      disabled = false,
      title,
      formItemLayout = {
        labelCol: { sm: { span: 3 } },
        wrapperCol: { sm: { span: 21 } },
      },
      label = '头像',
      accept,
    } = this.props;
    const { imageUrl, loading } = this.state;

    const uploadButton = (
      <div>
        {/*<Icon type={this.state.loading ? 'loading' : 'plus'}/>*/}
        <div className="ant-upload-text">{title ? title : '上传头像'}</div>
      </div>
    );

    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
          style={{ marginBottom: 0, paddingBottom: 0 }}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action='/admin/file/upload'
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
            disabled={disabled}
            style={{ width: '100%' }}
            accept={accept}
          >
            <Spin spinning={loading}>
              {imageUrl ? <img src={imageUrl} alt={title} style={{ height: 90 }}/> : uploadButton}
            </Spin>
          </Upload>
        </Form.Item>
      </div>
    );
  }
}

export default ConUploadOne;
