import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN();

export default ({ type = 'question', ...rest }: { type: string }) => {
  return <IconFont type={`icon-${type}`} {...rest} />;
};
