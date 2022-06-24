import { Link } from 'react-router-dom';

const RouterTest = () => {
    return <>
        <Link to={"/"}>HOME</Link>
        <br />
        <Link to={"/diary"}>DIARY</Link>
        <br />
        <Link to={"/new"}>NEW</Link>
        <br />
        <Link to={"/Edit"}>EDIT</Link>
    </>
};

export default RouterTest;