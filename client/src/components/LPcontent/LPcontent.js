import React from 'react';
import {
  Container,
  ContentMain,
  H1,
  H2,
  ContentSet,
  NumberedImage,
  PricingSection,
  Image,
  Copy,
  TagLine,
  PlayImg,
  BgContainer,
} from './styles/LPcontentStyles.js';

import { Element } from 'react-scroll';

import ContentBox from '../ContentBox/ContentBox.js';
import playImg from '../../assets/video_icon.png';
import docImg from '../../assets/orange_icon_document_v1.png';
import blockImg from '../../assets/orange_icon_blochain.png';
import fingerpringImg from '../../assets/orange_icon_proof.png';
import './styles/firefoxStyles.css';

const LPcontent = () => {
  return (
    <Container>
      <ContentMain>
        <BgContainer className="bgContainer">
          <H2>How Proofd Works:</H2>
          <ContentSet>
            <NumberedImage>
              <Image src={docImg} alt="Image of a Document" />
            </NumberedImage>
            <Copy>
              Leverage agile frameworks to provide a robust synopsis for high
              level overviews. Iterative approaches to corporate strategy foster
              collaborative thinking.
            </Copy>
          </ContentSet>
          <ContentSet>
            <Copy>
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X.
            </Copy>
            <NumberedImage>
              <Image src={blockImg} alt="Blockchain image" />
            </NumberedImage>
          </ContentSet>
          <ContentSet>
            <NumberedImage>
              <Image src={fingerpringImg} alt="Fingerprint image" />
            </NumberedImage>
            <Copy>
              Capitalize on low hanging fruit to identify a ballpark value added
              activity to beta test. Override the digital divide with additional
              clickthroughs from DevOps.
            </Copy>
          </ContentSet>
          <ContentSet>
            <PlayImg src={playImg} alt="play icon" />
            <TagLine>The science behind our work</TagLine>
          </ContentSet>
        </BgContainer>
        <PricingSection>
          <H1>Killer Prices, Subscribe and Save</H1>
          <Element name="pricingSheets">
            <ContentSet>
              <ContentBox
                title="Pay As You Go"
                copyOne="3 Free Credits"
                copyTwo="Purchase Credits A La Carte"
                copyThree="Upgrade Anytime"
              />
              <ContentBox
                title="Premium Subscription"
                copyOne="Unlimited Credits"
                copyTwo="$25 billed monthly, or"
                copyThree="$240 billed annually"
              />
            </ContentSet>
          </Element>
        </PricingSection>
      </ContentMain>
    </Container>
  );
};

export default LPcontent;
