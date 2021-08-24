import React from 'react';
import cls from 'classnames';
import { Space, Button, ButtonProps, Modal, Affix } from 'antd';
import './style.less';
import { withRouter } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import AuthWrapper from '@/layout/AuthWrapper';
const { confirm } = Modal;
interface ActionButtonProps extends ButtonProps {
  text?: string;
  disabled?: boolean;
  hidden?: boolean;
  key: string;
  handleClick?: Function;
  needConfirm?: boolean;
  confirmText?: string;
  localtion?: 'left' | 'right';
  authCode?: string;
}
interface Props {
  position: 'top' | 'inbox';
  blocks?: Array<ActionButtonProps>;
  onBack?: Function;
  history?: History;
  needBackButton?: boolean;
}
class ElRowContainer extends React.Component<Props, {}> {
  static defaultProps = {
    needBackButton: true,
    position: 'inbox'
  };
  constructor(props) {
    super(props);
  }

  onBackClick = () => {
    const { onBack, history } = this.props;
    if (onBack) {
      onBack();
    } else {
      history.go(-1);
    }
  };
  render() {
    const { position, needBackButton } = this.props;
    return position === 'top' ? (
      // 解决固钉上方1px漏缝问题
      <Affix target={() => document.getElementById('el-content-id')}>
        <div className={'el-row-container-top'}>
          {Array.isArray(this.props.blocks) ? (
            <Space>
              {needBackButton && (
                <Button
                  icon={<LeftOutlined />}
                  key={'inbox-container'}
                  className='action-button back-button'
                  onClick={this.onBackClick}
                >
                  返回
                </Button>
              )}
              {this.props.blocks.map((v) => {
                const {
                  text,
                  key,
                  disabled,
                  hidden,
                  handleClick,
                  className,
                  needConfirm,
                  confirmText,
                  authCode,
                  ...rest
                } = v;
                return needConfirm ? (
                  <AuthWrapper authCode={authCode}>
                    <Button
                      {...rest}
                      key={key}
                      disabled={disabled}
                      hidden={hidden}
                      type='primary'
                      className={cls('action-button', className)}
                      onClick={() =>
                        confirm({
                          content: confirmText,
                          onOk: () => {
                            handleClick();
                          },
                          onCancel: () => {}
                        })
                      }
                    >
                      {text}
                    </Button>
                  </AuthWrapper>
                ) : (
                  <AuthWrapper authCode={authCode}>
                    <Button
                      {...rest}
                      key={key}
                      disabled={disabled}
                      hidden={hidden}
                      type='primary'
                      className={cls('action-button', className)}
                      onClick={() => handleClick()}
                    >
                      {text}
                    </Button>
                  </AuthWrapper>
                );
              })}
            </Space>
          ) : null}
        </div>
      </Affix>
    ) : (
      <div className={'el-row-container-inbox'}>
        {Array.isArray(this.props.blocks) ? (
          <Space>
            {this.props.blocks.map((v) => {
              const {
                text,
                key,
                disabled,
                hidden,
                handleClick,
                className,
                needConfirm,
                confirmText,
                authCode,
                ...rest
              } = v;
              return needConfirm ? (
                <AuthWrapper authCode={authCode}>
                  <Button
                    type='primary'
                    {...rest}
                    key={key}
                    disabled={disabled}
                    hidden={hidden}
                    className={cls('action-button', className)}
                    onClick={() =>
                      confirm({
                        content: confirmText,
                        onOk: () => {
                          handleClick();
                        },
                        onCancel: () => {}
                      })
                    }
                  >
                    {text}
                  </Button>
                </AuthWrapper>
              ) : (
                <AuthWrapper authCode={authCode}>
                  <Button
                    type='primary'
                    {...rest}
                    key={key}
                    disabled={disabled}
                    hidden={hidden}
                    className={cls('action-button', className)}
                    onClick={() => handleClick()}
                  >
                    {text}
                  </Button>
                </AuthWrapper>
              );
            })}
          </Space>
        ) : null}
      </div>
    );
  }
}
export type { ActionButtonProps as ElContainerProps };
export default withRouter(ElRowContainer);
