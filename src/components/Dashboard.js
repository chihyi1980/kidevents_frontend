import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import EventsEdit from './EventsEdit';
import TagsEdit from './TagsEdit';

const Dashboard = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // 默认跳转到 events edit 页面
    navigate('/dashboard/events');
  }, [navigate]);

  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ width: '200px', background: '#f0f0f0' }}>
        <ul>
          <li>
            <Link to="/dashboard/events">Events Edit</Link>
          </li>
          <li>
            <Link to="/dashboard/tags">Tags Edit</Link>
          </li>
        </ul>
      </nav>
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="events" element={<EventsEdit />} />
          <Route path="tags" element={<TagsEdit />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
