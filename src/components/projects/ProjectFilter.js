import React from 'react';
import { useTheme } from '../../styles/ThemeContext';
import SectionTab, { TabContainer } from '../layout/SectionTab';

const ProjectFilter = ({ activeFilter, setActiveFilter }) => {
    const { theme } = useTheme();

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'AI/ML', label: 'AI/ML' },
        { id: 'Data Science', label: 'Data Science' },
        { id: 'Software Engineering', label: 'Software' },
        { id: 'Finance', label: 'Finance' }
    ];

    return (
        <TabContainer>
            {filters.map(filter => (
                <SectionTab
                    key={filter.id}
                    isActive={activeFilter === filter.id}
                    theme={theme}
                    onClick={() => setActiveFilter(filter.id)}
                >
                    {filter.label}
                </SectionTab>
            ))}
        </TabContainer>
    );
};

export default ProjectFilter;
