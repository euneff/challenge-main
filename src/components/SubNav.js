import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Nav.module.css';


function getLinkStyle({ isActive }) {
    return {
        textDecoration: isActive ? 'underline' : '',
    };
}

function SubNav({ isLoggedIn }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCategoryOpen, setCategoryOpen] = useState(false);
    const [isCommunityOpen, setCommunityOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const toggleCategory = () => {
        setCategoryOpen(!isCategoryOpen);
        if (isCommunityOpen) setCommunityOpen(false); // 하나의 메뉴만 열리도록
    };

    const toggleCommunity = () => {
        setCommunityOpen(!isCommunityOpen);
        if (isCategoryOpen) setCategoryOpen(false); // 하나의 메뉴만 열리도록
    };

    return (
        <div className={styles.nav}>  
             <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <button className={styles.closeButton} onClick={toggleSidebar}>X</button>*
                <ul className={styles.sidebarMenu}>
                    <li className={styles.sectionHeader} onClick={toggleCategory}>
                        카테고리
                    </li>
                    {isCategoryOpen && (
                        <ul className={styles.subMenu}>
                            <li><NavLink to="/course" style={getLinkStyle}>도전 목록</NavLink></li>
                        </ul>
                    )}
                    <li className={styles.sectionHeader} onClick={toggleCommunity}>
                        커뮤니티
                    </li>
                    {isCommunityOpen && (
                        <ul className={styles.subMenu}>
                            <li><NavLink to="/freeboard" style={getLinkStyle}>게시판</NavLink></li>
                            <li><NavLink to="/mypage/helpCenter" style={getLinkStyle}>문의</NavLink></li>
                            <li><NavLink to="/review" style={getLinkStyle}>후기</NavLink></li>
                            <li><NavLink to="/adminpage" style={getLinkStyle}>관리자페이지</NavLink></li>
                            {isLoggedIn && (
                                <li><NavLink to="/mypage" style={getLinkStyle}>마이페이지</NavLink></li>

                            )}
                        </ul>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SubNav;