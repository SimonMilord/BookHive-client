import Linkedin from '../../assets/Icons/linkedin.png';
import Github from '../../assets/Icons/github.png';
import { Flex } from '@chakra-ui/react';

export default function Footer() {
  const linkedinLink: string = 'https://www.linkedin.com/in/simonmilord/';
  const githubLink: string = 'https://github.com/SimonMilord';

  return (
    <div className='footer'>
      <p>&copy; SimonMilord</p>
      <Flex>
        <a href={githubLink}>
          <img src={Github} alt="Github" />
        </a>
        <a href={linkedinLink}>
          <img src={Linkedin} alt="Linkedin" />
        </a>
      </Flex>
    </div>
  );
}
