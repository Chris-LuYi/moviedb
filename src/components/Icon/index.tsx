import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2525112_yoduxgmnuqp.js',
});

export default ({ type = 'question', ...rest }: { type: string }) => {
  return <IconFont type={`icon-${type}`} {...rest} />;
};
