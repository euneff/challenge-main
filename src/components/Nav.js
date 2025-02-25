import { Link, NavLink } from 'react-router-dom';
import Container from './Container';
import UserMenu from './UserMenu';
import Clogo from '../assets/Clogo.png';
import styles from './Nav.module.css';

function getLinkStyle({ isActive }) {
    return {
        textDecoration: isActive ? 'underline' : '',
    };
}

function Nav({ isLoggedIn, onLogout }) {
    return (
        <div className={styles.nav}>
            <Link to="/">
                    <img src={Clogo} alt="Challengers Logo" className={styles.logo} />
                </Link>
            <Container className={styles.container}>
                
                <ul className={styles.menu}>
                {!isLoggedIn ? (
                    <>
                        <li>
                            <NavLink style={getLinkStyle} to="/challenge">
                                도전
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={getLinkStyle} to="/community">
                                게시판
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={getLinkStyle} to="/review">
                                후기
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink style={getLinkStyle} to="/challenge">
                                도전
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={getLinkStyle} to="/community">
                                게시판
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={getLinkStyle} to="/review">
                                후기
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/adminpage" style={getLinkStyle}>관리자페이지</NavLink>
                        </li>
                        <li>
                            <NavLink style={getLinkStyle} to="/mypage">
                                마이페이지
                            </NavLink>
                        </li>

                    </>
                )}
                    <li>
                        <UserMenu isLoggedIn={isLoggedIn} onLogout={onLogout}/>
                    </li>
                </ul>
            </Container>
        </div>
    );
}

export default Nav;
