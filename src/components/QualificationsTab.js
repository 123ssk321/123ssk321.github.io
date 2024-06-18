import React from 'react';
import { Card, Button } from 'react-bootstrap';

const QualificationsTab = ({ experience, index, activeTab, toggleTab }) => {
  return (
    <Card className='mb-3'>
      <Card.Header onClick={() => toggleTab(index)}>
        {experience.title} <span>{experience.duration}</span>
        <Button variant='link'>{activeTab === index ? '-' : '+'}</Button>
      </Card.Header>
      {activeTab === index && (
        <Card.Body>
          {experience.location && <p>{experience.location}</p>}
          {experience.website && (
            <p>
              <a
                href={`https://${experience.website}`}
                target='_blank'
                rel='noopener noreferrer'
              >
                {experience.website}
              </a>
            </p>
          )}
          <p>{experience.institution}</p>
          <p>{experience.description}</p>
          {experience.skills && (
            <div>
              {experience.skills.map((skill, skillIndex) => (
                <Button key={skillIndex} variant='primary' className='mr-2'>
                  {skill}
                </Button>
              ))}
            </div>
          )}
        </Card.Body>
      )}
    </Card>
  );
};

export default QualificationsTab;
