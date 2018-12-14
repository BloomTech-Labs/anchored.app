import React from 'react';
import {
  TeamContainer,
  Members,
  TeamMember,
  Initials,
  Astyle,
  NameHeader,
  Role,
  H1,
} from './styles/OurTeamStyles';
import ZackImg from '../../assets/zack_thumbnail.png';
import JeremyImg from '../../assets/jeremy.jpg';
import SunitiImg from '../../assets/suniti.jpeg';
import JaredImg from '../../assets/profile.jpg';
import SeanImg from '../../assets/sean.jpg';
import RandyImg from '../../assets/RandyPicture.jpg';
import BrandonImg from '../../assets/brandon.png';

const OurTeam = () => {
  return (
    <TeamContainer>
      <H1>The Proofd Team</H1>
      <Members>
        <TeamMember>
          <img src={BrandonImg} alt="Brandon" />
          <NameHeader>Brandon Aguirre</NameHeader>
          <Role>Full Stack Developer</Role>
          <Astyle href="https://github.com/DirupT" target="_blank">
            <i className="fab fa-github fa-2x" />
          </Astyle>
          <Astyle
            href="https://www.linkedin.com/in/brandon-aguirre-7b88a8161/"
            target="_blank"
          >
            <i className="fab fa-linkedin fa-2x" />
          </Astyle>
        </TeamMember>
        <TeamMember>
          <img src={JeremyImg} alt="Jeremy" />
          <NameHeader>Jeremy A. Jones</NameHeader>
          <Role>Full Stack Developer</Role>
          <Astyle href="https://github.com/crypto-jones" target="_blank">
            <i className="fab fa-github fa-2x" />
          </Astyle>
          <Astyle
            href="https://www.linkedin.com/in/jeremyalexanderjones/"
            target="_blank"
          >
            <i className="fab fa-linkedin fa-2x" />
          </Astyle>
        </TeamMember>
        <TeamMember>
          <img src={ZackImg} alt="Zack" />
          <NameHeader>Zack Hitchcock</NameHeader>
          <Role>Full Stack Developer</Role>
          <Astyle href="https://github.com/zackhitch" target="_blank">
            <i className="fab fa-github fa-2x" />
          </Astyle>
          <Astyle
            href="https://www.linkedin.com/in/zackhitchcock/"
            target="_blank"
          >
            <i className="fab fa-linkedin fa-2x" />
          </Astyle>
        </TeamMember>
        <TeamMember>
          <img src={RandyImg} alt="Randy" />
          <NameHeader>Randy Calderon</NameHeader>
          <Role>Full Stack Developer</Role>
          <Astyle href="https://github.com/RandyCalderon" target="_blank">
            <i className="fab fa-github fa-2x" />
          </Astyle>
          <Astyle
            href="https://www.linkedin.com/in/randy-calderon-237474161/"
            target="_blank"
          >
            <i className="fab fa-linkedin fa-2x" />
          </Astyle>
        </TeamMember>
        <TeamMember>
          <img src={SeanImg} alt="Sean" />
          <NameHeader>Sean Chavez</NameHeader>
          <Role>Full Stack Developer</Role>
          <Astyle href="https://github.com/seanchavez" target="_blank">
            <i className="fab fa-github fa-2x" />
          </Astyle>
          <Astyle
            href="https://www.linkedin.com/in/sean-chavez-a69935176/"
            target="_blank"
          >
            <i className="fab fa-linkedin fa-2x" />
          </Astyle>
        </TeamMember>
        <TeamMember>
          <img src={SunitiImg} alt="Suniti" />
          <NameHeader>Suniti Thapa</NameHeader>
          <Role>UI/UX Designer</Role>
          <Astyle
            href="https://www.linkedin.com/in/suniti-thapa-10688355/"
            target="_blank"
          >
            <i className="fab fa-linkedin fa-2x" />
          </Astyle>
        </TeamMember>
      </Members>
      <Members>
        <TeamMember>
          <img src={JaredImg} alt="Jared" />
          <NameHeader>Jared Cuffe</NameHeader>
          <Role>Project Manager</Role>
          <Astyle href="https://github.com/jcuffe" target="_blank">
            <i className="fab fa-github fa-2x" />
          </Astyle>
          <Astyle
            href="https://www.linkedin.com/in/jared-cuffe"
            target="_blank"
          >
            <i className="fab fa-linkedin fa-2x" />
          </Astyle>
        </TeamMember>
      </Members>
    </TeamContainer>
  );
};

export default OurTeam;
