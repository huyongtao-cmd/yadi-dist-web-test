import { ElFormProps } from '@/components/el/ElForm';
const getEditFormItems = ({
  userList,
  onFormUserSelectChange
}): ElFormProps => {
  return {
    items: [
      {
        title: '被替换的任务负责人',
        name: 'fromUserId',
        span: 24,
        rules: [
          {
            required: true,
            message: '请选择被替换的任务处理人!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            options: userList,
            placeholder: '被替换的任务负责人'
          },
          events: {
            onSelectChange: onFormUserSelectChange
          }
        }
      },
      {
        title: '替换后的任务负责人',
        name: 'toUserId',
        span: 24,
        rules: [
          {
            required: true,
            message: '请选择替换后的任务负责人!'
          }
        ],
        formOption: {
          type: '$select',
          props: {
            options: userList,
            placeholder: '替换后的任务负责人'
          }
        }
      }
    ]
  };
};
export { getEditFormItems };
