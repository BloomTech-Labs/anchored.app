import React from 'react';
import {
  TermsContainer,
  Header,
  SubHeading,
  Paragraph,
} from './styles/TermsStyles.js';
import ReactGA from 'react-ga';

const Terms = () => {
  ReactGA.pageview('/terms');

  return (
    <TermsContainer>
      <Header>Terms and Conditions</Header>

      <Paragraph>Effective date: January 01, 2019</Paragraph>

      <Paragraph>
        These terms and conditions outline the rules and regulations for the use
        of Proofd's Website, located at{' '}
        <a href="https://proofd.app">proofd.app.</a>
      </Paragraph>

      <Paragraph>
        By accessing this website we assume you accept these terms and
        conditions. Do not continue to use Proofd if you do not agree to take
        all of the terms and conditions stated on this page.
      </Paragraph>

      <Paragraph>
        The following terminology applies to these Terms and Conditions, Privacy
        Statement and Disclaimer Notice and all Agreements: "Client", "You" and
        "Your" refers to you, the person log on this website and compliant to
        the Company’s terms and conditions. "The Company", "Ourselves", "We",
        "Our" and "Us", refers to our Company. "Party", "Parties", or "Us",
        refers to both the Client and ourselves. All terms refer to the offer,
        acceptance and consideration of payment necessary to undertake the
        process of our assistance to the Client in the most appropriate manner
        for the express purpose of meeting the Client’s needs in respect of
        provision of the Company’s stated services, in accordance with and
        subject to, prevailing law of the United States. Any use of the above
        terminology or other words in the singular, plural, capitalization
        and/or he/she or they, are taken as interchangeable and therefore as
        referring to same.
      </Paragraph>

      <SubHeading>Cookies</SubHeading>

      <Paragraph>
        We employ the use of cookies. By accessing Proofd, you agreed to use
        cookies in agreement with Proofd's{' '}
        <a href="https://proofd.app/#/privacy">Privacy Policy</a>.
      </Paragraph>

      <Paragraph>
        Most interactive websites use cookies to let us retrieve the user’s
        details for each visit. Cookies are used by our website to enable the
        functionality of certain areas to make it easier for people visiting our
        website. Some of our affiliate/advertising partners may also use
        cookies.
      </Paragraph>

      <SubHeading>License</SubHeading>

      <Paragraph>
        Unless otherwise stated, Proofd and/or its licensors own the
        intellectual property rights for all material on Proofd. All
        intellectual property rights are reserved. You may access this from
        Proofd for your own personal use subjected to restrictions set in these
        terms and conditions.
      </Paragraph>

      <Paragraph>You must not: </Paragraph>
      <Paragraph>
        <li>Republish material from Proofd</li>
        <li>Sell, rent or sub-license material from Proofd</li>
        <li>Reproduce, duplicate or copy material from Proofd</li>
        <li>Redistribute content from Proofd</li>
      </Paragraph>

      <Paragraph>This Agreement shall begin on the date hereof. </Paragraph>

      <SubHeading>Your Privacy</SubHeading>

      <Paragraph>
        Please read our{' '}
        <a href="https://proofd.app/#/privacy">Privacy Policy</a>.
      </Paragraph>

      <SubHeading>Your Data</SubHeading>

      <Paragraph>
        By using Proofd's service, you agree to give Proofd the right to copy
        your data for the use of product.
      </Paragraph>

      <SubHeading>Termination of Service</SubHeading>

      <Paragraph>
        We reserve the right to terminate service at any time without a refund,
        and you are responsible for backing up your data.
      </Paragraph>

      <SubHeading>Reservation of Rights</SubHeading>

      <Paragraph>
        We reserve the right to request that you remove all links or any
        particular link to our Website. You approve to immediately remove all
        links to our Website upon request. We also reserve the right to amen
        these terms and conditions and it’s linking policy at any time. By
        continuously linking to our Website, you agree to be bound to and follow
        these linking terms and conditions.
      </Paragraph>

      <SubHeading>Removal of links from our website</SubHeading>

      <Paragraph>
        If you find any link on our Website that is offensive for any reason,
        you are free to contact and inform us any moment. We will consider
        requests to remove links but we are not obligated to or so or to respond
        to you directly.
      </Paragraph>

      <Paragraph>
        We do not ensure that the information on this website is correct, we do
        not warrant its completeness or accuracy; nor do we promise to ensure
        that the website remains available or that the material on the website
        is kept up to date.
      </Paragraph>

      <SubHeading>Disclaimer</SubHeading>

      <Paragraph>
        To the maximum extent permitted by applicable law, we exclude all
        representations, warranties and conditions relating to our website and
        the use of this website. Nothing in this disclaimer will:
      </Paragraph>

      <Paragraph>
        <li>
          limit or exclude our or your liability for death or personal injury;
        </li>
        <li>
          limit or exclude our or your liability for fraud or fraudulent
          misrepresentation;
        </li>
        <li>
          limit any of our or your liabilities in any way that is not permitted
          under applicable law; or
        </li>
        <li>
          exclude any of our or your liabilities that may not be excluded under
          applicable law.
        </li>
      </Paragraph>

      <Paragraph>
        The limitations and prohibitions of liability set in this Section and
        elsewhere in this disclaimer: (a) are subject to the preceding
        paragraph; and (b) govern all liabilities arising under the disclaimer,
        including liabilities arising in contract, in tort and for breach of
        statutory duty.
      </Paragraph>

      <SubHeading>Contact Us</SubHeading>

      <Paragraph>
        If you have any questions about these Terms and Conditions, please
        contact us:
      </Paragraph>

      <Paragraph>
        <li>
          By email: <a href="mailto:support@proofd.app">support@proofd.app</a>
        </li>
      </Paragraph>

      <Paragraph />
    </TermsContainer>
  );
};

export default Terms;
