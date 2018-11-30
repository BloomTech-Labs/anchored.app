import React from 'react';
import {
  ContentMain,
  H1,
  H2,
  ContentSet,
  NumberedImage,
  Numbered,
  Image,
  Copy,
  TagLine,
  PlayImg,
} from './styles/LPcontentStyles.js';

import { Element } from 'react-scroll';

import ContentBox from '../ContentBox/ContentBox.js';
import playImg from '../../assets/play-circle.svg';

const LPcontent = () => {
  return (
    <ContentMain>
      <H2>How Proofd Works:</H2>
      <ContentSet>
        <NumberedImage>
          <Numbered>1</Numbered>
          <Image />
        </NumberedImage>
        <Copy>
          Leverage agile frameworks to provide a robust synopsis for high level
          overviews. Iterative approaches to corporate strategy foster
          collaborative thinking to further the overall value proposition.
          Organically grow the holistic world view of disruptive innovation via
          workplace diversity and empowerment.
        </Copy>
      </ContentSet>
      <ContentSet>
        <Copy>
          Bring to the table win-win survival strategies to ensure proactive
          domination. At the end of the day, going forward, a new normal that
          has evolved from generation X is on the runway heading towards a
          streamlined cloud solution. User generated content in real-time will
          have multiple touchpoints for offshoring.
        </Copy>
        <NumberedImage>
          <Numbered>2</Numbered>
          <Image />
        </NumberedImage>
      </ContentSet>
      <ContentSet>
        <NumberedImage>
          <Numbered>3</Numbered>
          <Image />
        </NumberedImage>
        <Copy>
          Capitalize on low hanging fruit to identify a ballpark value added
          activity to beta test. Override the digital divide with additional
          clickthroughs from DevOps. Nanotechnology immersion along the
          information highway will close the loop on focusing solely on the
          bottom line.
        </Copy>
      </ContentSet>
      <ContentSet>
        <PlayImg src={playImg} alt="play icon" />
        <TagLine>The science behind our work</TagLine>
      </ContentSet>
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
    </ContentMain>
  );
};

export default LPcontent;
