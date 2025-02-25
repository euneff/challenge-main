import Button from '../components/Button';
import Container from '../components/Container';
import Lined from '../components/Lined';
import styles from './HomePage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import SubNav from '../components/SubNav'; 

function HomePage() {
    const navigate = useNavigate(); // useNavigate 훅 호출

    return (
        <>
            <div className={styles.bg} />
            <Container className={styles.container}>
                <div className={styles.texts}>
                    <h1 className={styles.heading}>
                        <Lined >도전을 더욱 가치있게,</Lined>
                        <br />
                        <strong>도전자들</strong>
                    </h1>
                    <p className={styles.description}>
                        뿌듯함과 성취감 뿐만아니라 보상금까지 !!!
                    </p>
                    <div>
                        <Button onClick={() => navigate('/review')}
                            className={styles.button}>
                            도전자들 후기
                        </Button>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default HomePage;
