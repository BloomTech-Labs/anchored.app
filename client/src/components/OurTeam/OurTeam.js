import React from 'react';
//import './OurTeam.css';
import {
  TeamContainer,
  Members,
  TeamMember,
  Initials,
  Astyle,
} from './styles/OurTeamStyles';
import ZackImg from '../../assets/zack_thumbnail.png';
import JeremyImg from '../../assets/jeremy.jpg';
import SunitiImg from '../../assets/suniti.jpeg';
import JaredImg from '../../assets/profile.jpg';

const OurTeam = () => {
  return (
    <TeamContainer>
      <h1>Our Team: </h1>
      <Members>
        <TeamMember>
          <Initials>BA</Initials>
          <h5>Brandon Aguirre</h5>
          <a href='https://github.com/DirupT'>github</a>
        </TeamMember>
        <TeamMember>
          <img src={JeremyImg} alt='Jeremy' />
          <h5>Jeremy Jones</h5>
          <a href='https://github.com/crypto-jones'>github</a>
        </TeamMember>
        <TeamMember>
          <img src={ZackImg} alt='Zack' />
          <h5>Zack Hitchcock</h5>

          <Astyle href='https://github.com/zackhitch'>
            <i className='fab fa-github fa-2x' />
          </Astyle>
        </TeamMember>
        <TeamMember>
          <Initials>RC</Initials>
          <h5>Randy Calderon</h5>
          <a href='https://github.com/RandyCalderon'>github</a>
        </TeamMember>
        <TeamMember>
          <Initials>SC</Initials>
          <h5>Sean Chavez</h5>
          <a href='https://github.com/seanchavez'>github</a>
        </TeamMember>
        <TeamMember>
          <img src={SunitiImg} alt='Suniti' />
          <h5>Suniti Thapa</h5>
          <a href='https://www.linkedin.com/in/suniti-thapa-10688355/'>
            linkedin
          </a>
        </TeamMember>
        <TeamMember>
          <img src={JaredImg} alt='Jared' />
          <h5>Jared Cuffe</h5>
          <a href='https://github.com/jcuffe'>github</a>
        </TeamMember>
      </Members>
    </TeamContainer>
  );
};

export default OurTeam;
