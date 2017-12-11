import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

import Avatar from './Avatar';
import NavLink from './NavLink';

const Nav = styled.nav`
  background-color: #00979D;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-height: 150px;
  padding: 0 10px;
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  max-width: 1200px;
  width: 100%;
`;

const Title = styled.h1`
  color: #fff;
  font-family: Karla;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: -1px;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  & a {
    text-decoration: none;
    color: #fff;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
`;


function ProjectNavbar({ avatarSrc, projectLink, projectTitle, navLinks }) {
  return (
    <Nav>
      <Container>
        <Avatar src={avatarSrc} projectTitle={projectTitle} />
        <Title>
          <Link to={`${projectLink}?facelift=true`}>
            {projectTitle}
          </Link>
        </Title>
        <NavLinks>
          {navLinks.map(link => <NavLink key={link.url} {...link} />)}
        </NavLinks>
      </Container>
    </Nav>
  );
}

ProjectNavbar.propTypes = {
  avatarSrc: PropTypes.string,
  navLinks: PropTypes.array,
  projectLink: PropTypes.string,
  projectTitle: PropTypes.string
};

export default ProjectNavbar;