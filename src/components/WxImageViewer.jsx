import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import WrapViewer from './WrapViewer';

import './WxImageViewer.css';

const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

class WxImageViewer extends Component {

  static propTypes = {
    maxZoomNum: PropTypes.number.isRequired,     //最大放大倍数
    zIndex: PropTypes.number.isRequired,         //组件图层深度
    index: PropTypes.number.isRequired,          // 当前显示图片的http链接
    urls: PropTypes.array.isRequired,            // 需要预览的图片http链接列表
    gap: PropTypes.number.isRequired,            //间隙
    onClose: PropTypes.func.isRequired,          //关闭组件回调
  }

  static childContextTypes = {
    onClose: PropTypes.func
  };

  static defaultProps = {
    maxZoomNum: 4,
    zIndex: 100,
    index: 0,
    gap: 10,
  }

  constructor(props) {
    super(props);
    this.node = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.node);
  }

  componentWillUnmount() {
    document.body.removeChild(this.node);
  }

  getChildContext() {
    return { onClose: this.props.onClose };
  }

  render() {
    return ReactDOM.createPortal(
      <WrapViewer
        {...this.props}
      />,
      this.node,
    );
  }
}

export default WxImageViewer;