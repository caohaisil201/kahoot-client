import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { joinGroupByLinkAPI } from 'api/GroupAPI';
import Loading from 'views/components/Loading';

const InviteByLink = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accessToken = sessionStorage.getItem('access_token');

  const groupCode = pathname.split('/')[2];

  const mutation = useMutation({
    mutationFn: () => joinGroupByLinkAPI(accessToken, groupCode),
  });

  useEffect(() => {
    if (accessToken) {
      mutation.mutate({});
    }
  }, []);
  console.log(accessToken);

  if (!accessToken) {
    return (
      <div className="d-flex align-center justify-center mt-10">
        Bạn cần phải{' '}
        <Link to="/sign-in" state={{ previousPath: pathname }}>
          &nbsp; Đăng nhập &nbsp;
        </Link>{' '}
        để tiếp tục.
      </div>
    );
  }
  if (mutation.isLoading) {
    return <Loading />;
  }
  if (mutation.isError) {
    return <div>error</div>;
  }
  if (mutation.isSuccess) {
    navigate(`/group/${groupCode}`);
  }
  return <div>InviteByLink</div>;
};

export default InviteByLink;
