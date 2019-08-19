import * as React from 'react';
import './Header.scss';

interface IHeaderState {
    navLinks: { href: string, name: string, isActive: boolean; }[];
}

export class Header extends React.Component<{}, IHeaderState> {

    state = {
        navLinks: [{
            href: "#/",
            name: "Home",
            isActive: true
        }, {
            href: "#/test",
            name: "Test",
            isActive: false
        }]
    }

    onHeaderLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {

        let navLinks = this.state.navLinks;

        for (let navLink of navLinks) {

            const hrefAttribute = e.currentTarget.attributes.getNamedItem('href');

            navLink.isActive = hrefAttribute != null && hrefAttribute.nodeValue === navLink.href;
        }

        this.setState({
            navLinks
        });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="header-componnent">
                <a className="navbar-brand" href="/">React Typescript - Starter</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {
                            this.state.navLinks.map(w => (
                                <li className={`nav-item${(w.isActive ? ' active' : '')}`} key={w.name}>
                                    <a className="nav-link" href={w.href} onClick={e => this.onHeaderLinkClick(e)}>{w.name}</a>
                                </li>))
                        }
                    </ul>
                </div>
            </nav>);
    }
}