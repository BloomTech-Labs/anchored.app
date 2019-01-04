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
  OutterMost,
} from './styles/LPcontentStyles.js';

import { Element } from 'react-scroll';

import ContentBox from '../ContentBox/ContentBox.js';
import playImg from '../../assets/video_icon.png';
import docImg from '../../assets/orange_icon_document_v1.png';
import blockImg from '../../assets/orange_icon_blochain.png';
import fingerpringImg from '../../assets/orange_icon_proof.png';

const LPcontent = () => {
  return (
    <OutterMost>
      <BgContainer className="bgContainer">
        <Container>
          <ContentMain>
            <H2>How Proofd Works:</H2>
            <ContentSet>
              <NumberedImage>
                <Image src={docImg} alt="Image of a Document" />
              </NumberedImage>
              <Copy>
                Connect to a number of third party services that allow for easy
                transfer of your data to Proofd and select which files you would
                like to link to the Bitcoin blockchain.
              </Copy>
            </ContentSet>
            <ContentSet>
              <Copy>
                By using Chainpoint's innovative technology, a tamper-proof
                cryptographic token is generated which is published in a Bitcoin
                transaction.
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
                By associating your data to an immutable ledger, you can
                mathematically prove that your data existed at an exact time and
                place.
              </Copy>
            </ContentSet>
            {/* Uncomment the below section when we
                have the 'science behind our work' video
            */}
            {/* <ContentSet>
              <PlayImg src={playImg} alt="play icon" />
              <TagLine>The science behind our work</TagLine>
            </ContentSet> */}
          </ContentMain>
        </Container>
      </BgContainer>
      <PricingSection>
        <H1>Killer Prices. Subscribe and Save.</H1>
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
              copyTwo="$25 billed monthly"
              copyThree="Automatic Proofing"
            />
          </ContentSet>
        </Element>
      </PricingSection>
    </OutterMost>
  );
};

export default LPcontent;
