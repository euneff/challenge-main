import React from 'react';
import { Link, Outlet } from "react-router-dom";
import './AdminPage.css';

const AdminPage = () => {
    return (
        <div className="admin-container">
            <h1 className="ad">Admin DashBoard</h1>
            <div className="admin-sidebar">
                <ul>
                    <li><Link to="qanda">질문답변</Link></li>
                    <li><Link to="adminpoint">포인트</Link></li>
                    <li><Link to="exchange">환전</Link></li>
                    <li><Link to="capproval">챌린지</Link></li>
                    <li><Link to="money">보상금</Link></li>
                </ul>
            </div>
            <div className="admin-content">
                <Outlet /> {/* 중첩된 라우트를 렌더링 */}
            </div>
        </div>
    );
};

export default AdminPage;