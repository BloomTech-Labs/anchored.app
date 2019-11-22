import React, { useState, useEffect } from 'react';
import ModalVideo from 'react-modal-video';
import playImg from '../../assets/video_icon.png';

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
  BgContainer,
  OutterMost,
  TagLine,
  PlayImg,
  ContentDemo,
} from './styles/LPcontentStyles.js';

import { Element } from 'react-scroll';
import ContentBox from '../ContentBox/ContentBox.js';
import docImg from '../../assets/orange_icon_document_v1.png';
import blockImg from '../../assets/orange_icon_blochain.png';
import fingerpringImg from '../../assets/orange_icon_proof.png';
import PremiumModal from '../Stripe/PremiumModal.js';
import Auth0 from '../Auth/Auth0/Auth0.js';

const auth = new Auth0();

const LPcontent = () => {
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setModal(!modal);

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
            <ContentDemo onClick={() => setIsOpen(true)}>
              <PlayImg src={playImg} alt="play icon" width="20%" />
              <TagLine>Watch the Demo</TagLine>
            </ContentDemo>
          </ContentMain>
          <ModalVideo
            channel="youtube"
            isOpen={isOpen}
            videoId="2QY0qJcTlac"
            onClose={() => setIsOpen(false)}
          />
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
              description="Start Now"
              onClick={auth.signUp}
            />
            <ContentBox
              title="Premium Subscription"
              copyOne="Unlimited Credits"
              copyTwo="$25 billed monthly"
              copyThree="Automatic Proofing"
              description="Coming Soon"
              onClick={toggle}
            />
          </ContentSet>
          <PremiumModal toggle={toggle} isOpen={modal} />
        </Element>
      </PricingSection>
    </OutterMost>
  );
};

export default LPcontent;
