import React from 'react';
import { Link, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import EventsEdit from './EventsEdit';
import OptionsEdit from './OptionsEdit';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // 只在首次加载且路径为 '/dashboard' 时跳转到 events 页面
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/events');
    }
  }, [navigate, location.pathname]);

  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ width: '200px', background: '#f0f0f0' }}>
        <ul>
          <li>
            <Link to="/dashboard/events">Events Edit</Link>
          </li>
          <li>
            <Link to="/dashboard/options">Options Edit</Link>
          </li>
        </ul>
      </nav>
      <div style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="events" element={<EventsEdit />} />
          <Route path="options" element={<OptionsEdit />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;