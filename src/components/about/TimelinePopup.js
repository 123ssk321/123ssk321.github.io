import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const PopupOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme === 'dark'
        ? 'rgba(0, 0, 0, 0.8)'
        : 'rgba(0, 0, 0, 0.5)'
    };
  z-index: 999;
`;

const PopupContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
  background: ${props => props.theme === 'dark'
        ? 'rgba(0, 0, 0, 0.9)'
        : 'white'
    };
  border-radius: var(--radius-lg);
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: ${props => props.theme === 'dark'
        ? '0 20px 40px rgba(0, 0, 0, 0.5)'
        : '0 20px 40px rgba(0, 0, 0, 0.1)'
    };

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)'
    };
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)'
    };
    border-radius: 4px;
    
    &:hover {
      background: ${props => props.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.3)'
        : 'rgba(0, 0, 0, 0.3)'
    };
    }
  }
`;

const PopupTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
`;

const PopupSubtitle = styled.p`
  font-size: 1rem;
  color: var(--color-text-secondary);
  margin-bottom: 0.5rem;
`;

const PopupDate = styled.span`
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  display: block;
  margin-bottom: 1rem;
`;

const PopupContent = styled.div`
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-medium);

  &:hover {
    background: ${props => props.theme === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)'
    };
  }
`;

const TimelinePopup = ({ item, theme, onClose }) => {
    return (
        <>
            <PopupOverlay
                theme={theme}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <PopupContainer
                theme={theme}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                <CloseButton theme={theme} onClick={onClose}>
                    <FiX size={24} />
                </CloseButton>
                <PopupTitle>{item.title}</PopupTitle>
                <PopupSubtitle>{item.subtitle}</PopupSubtitle>
                <PopupDate>{item.date}</PopupDate>
                {item.grade && <PopupDate>{item.grade}</PopupDate>}
                <PopupContent>{item.details}</PopupContent>
            </PopupContainer>
        </>
    );
};

export default TimelinePopup;