import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #121212;
  color: #ffffff;
`;

const NotFoundTitle = styled.h1`
    font-size: 4rem;
    margin-bottom: 1rem;
    `;
const NotFoundMessage = styled.p`
    font-size: 1.5rem;
    margin-bottom: 2rem;
`;

const HomeLink = styled.a`
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 1.2rem;
    color: #ffffff;
    background-color: #1e88e5;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
        background-color: #1565c0;
    }

    svg {
        margin-right: 0.5rem;
    }
`;
const NotFound = () => {
    return (
        
        <NotFoundContainer>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <NotFoundTitle>404</NotFoundTitle>
                <NotFoundMessage>Page Not Found</NotFoundMessage>
                <HomeLink href="/">
                    <FiHome /> Go to Home
                </HomeLink>
            </motion.div>
        </NotFoundContainer>
    );
};
export default NotFound;
