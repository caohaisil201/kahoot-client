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
    return <div>Có lỗi xảy ra</div>;
  }

  return <div className="group-detail">
    <div className="header d-flex align-baseline">
      <div style={{fontSize: '1.5rem'}}>Tên nhóm: {groupDetail.data.name}</div>
      <div className="ml-16">Mã nhóm: {groupDetail.data.code}</div>
    </div>
    <div>Owner: {groupDetail.data.owner.fullName}</div>
    <div>Mô tả: {groupDetail.data.description}</div>
    <div>Số lượng thành viên: {groupDetail.data.capacity}</div>
  </div>;
};

export default GroupDetail;
