import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getGroupDetailAPI } from 'api/GroupAPI';
import Loading from 'views/components/Loading';

const GroupDetail = ({ accessToken, groupCode }) => {
  const groupDetail = useQuery({
    queryKey: ['groupDetail'],
    queryFn: async () => await getGroupDetailAPI(accessToken, groupCode),
    enabled: false,
  });

  useEffect(() => {
    if (!!accessToken) {
      groupDetail.refetch();
    }
  }, [accessToken]);

  if (groupDetail.isLoading) {
    return <Loading />;
  }

  if (groupDetail.isError) {
    return <div>error</div>;
  }

  return <div>{groupDetail.data}</div>;
};

export default GroupDetail;
