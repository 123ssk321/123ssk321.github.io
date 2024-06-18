import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import QualificationsTab from './QualificationsTab';
import 'bootstrap/dist/css/bootstrap.min.css';

const Qualifications = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [activeSection, setActiveSection] = useState('Education');

  const toggleTab = (index) => {
    setActiveTab(activeTab === index ? null : index);
  };

  const experiences = {
    Education: [
      {
        title: 'MSc Computer Science and Engineering',
        institution: 'NOVA University, Portugal - Current Grade: 17/20',
        duration: '2022-Present',
        description: '',
        grade: '',
      },
      {
        title: 'BSc Computer Science and Engineering',
        institution: 'NOVA University, Portugal - ECTS Grade: A (17/20)',
        duration: '2019-2022',
        description: '',
        grade: '',
      },
      {
        title: 'High School',
        institution: 'Colégio Campo de Flores, Portugal - Grade: 17/20',
        duration: '2016-2019',
        description: '',
        grade: '',
      },
    ],
    Work: [
      {
        title: 'Software Engineer @ Saimon Global Ltd',
        duration: '2019 – Present',
        location: 'Dhaka, Bangladesh',
        website: 'saimonglobal.com',
        description:
          'Developing front-end and mobile app solutions (B2C, B2B) in Travel Tech on React/Next.js framework and Flutter SDK.',
        skills: ['Javascript', 'Dart', 'React', 'NextJS', 'Redux', 'Flutter'],
      },
      {
        title: 'Web Developer @ influenceTHIS Canada',
        duration: '2018 – 2019',
        location: '',
        website: '',
        description: '',
        skills: [],
      },
      {
        title: 'Top Rated Web Developer @ Upwork Inc.',
        duration: '2017 – Present',
        location: '',
        website: '',
        description: '',
        skills: [],
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col>
          <Nav justify variant='tabs' defaultActiveKey='Education'>
            <Nav.Item>
              <Nav.Link
                eventKey='Education'
                onClick={() => setActiveSection('Education')}
              >
                Education
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey='Work'
                onClick={() => setActiveSection('Work')}
              >
                Work
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <h2 className='mt-4'>{activeSection}</h2>
          {experiences[activeSection].map((experience, index) => (
            <QualificationsTab
              key={index}
              experience={experience}
              index={index}
              activeTab={activeTab}
              toggleTab={toggleTab}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Qualifications;
