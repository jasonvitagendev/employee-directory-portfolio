import List from "./List";
import styles from "./style.module.sass";

const Home = () => {
    return (
        <div className={styles.bg}>
            <header></header>
            <List></List>
            <footer></footer>
        </div>
    );
};

export default Home;
