import List from "./List";
import styles from "./style.module.sass";
import SearchBox from "./Search";

const Home = () => {
    return (
        <div className={styles.bg}>
            <header></header>
            <SearchBox />
            <List></List>
            <footer></footer>
        </div>
    );
};

export default Home;
