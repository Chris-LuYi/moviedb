import { Helmet } from 'umi';

export default ({
  title,
  replace = false,
}: {
  title: string;
  replace?: boolean;
}) => {
  return (
    <Helmet>
      <title>
        {title} {replace ? '' : `- ${GLOBAL_CONFIG.site}`}
      </title>
    </Helmet>
  );
};
