import Navbar from 'react-bootstrap/Navbar';
import Logo from './Logo';
import Search from './Search';
import NumOfResult from './NumOfResult';

export default function NavBar({ query, setQuery, movies }) {
    return (
        <Navbar expand="lg" className=" nav">
            <Logo />
            <Navbar.Toggle aria-controls="basic-navbar-nav bo" />
            <Navbar.Collapse id="basic-navbar-nav nav-bar">
                <Search query={query} setQuery={setQuery} />
                <NumOfResult movies={movies} />
            </Navbar.Collapse>
        </Navbar>
    );
}
