import React from 'react';

const Dashboard: React.FC<React.PropsWithChildren> = (props) => {
  return <div className='my-24'>{props.children}</div>;
};

export default Dashboard;
