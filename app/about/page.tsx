import {
  Blockquote,
  Container,
  Image,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Axelrad Climbing | About',
};

export default function AboutPage() {
  return (
    <Container size='sm' my={{ base: 'xs', sm: 'xl' }} component='article'>
      <TypographyStylesProvider>
        <Title>About</Title>
        <Image src='/images/BioPic1.jpg?nf_resize=fit&w=1200' alt='BioPic1' />
        <Title order={2}>Our Story</Title>
        <Text>
          We are Los Angeles/Boulder based identical twin brothers Eden and
          Itai. We started climbing in 2005 and never looked back. Since then,
          we have enjoyed the many climbing destinations that the country has to
          offer. Some of our favorites include Yosemite, Bishop, Black Mountain,
          and RMNP.
        </Text>
        <Text>
          We are both graduates of UCLA master&apos;s programs, where Eden
          studied environmental health sciences and Itai studied civil &
          environmental engineering. Although we both work full-time, we still
          manage to find a little time to climb.
        </Text>
        <Text>Hope to see you out there!</Text>
        <Image src='/images/BioPic2.jpg?nf_resize=fit&w=1200' alt='BioPic2' />
        <Title order={2}>What We Have to Offer</Title>
        <Text>
          Over our extensive climbing careers, we have accumulated a set of
          valuable skills and experiences. We understand that learning is a
          continuous process, and we strive to expand on this every day.
        </Text>
        <Title order={3}>3</Title>
        <Text>
          We have each made three bouldering national competition appearances,
          including a team US top-four finish.
        </Text>
        <Title order={3}>8</Title>
        <Text>
          We offer a combined eight years of boulder and route setting
          experience across the many gyms that California and Colorado have to
          offer. This includes both Collegiate and National Cup Series
          competitions.
        </Text>
        <Title order={3}>40</Title>
        <Text>
          As a team, we have been climbing for a combined forty years! This
          experience is irreplaceable and provides a foundation for our future
          climbing goals.
        </Text>
        <Title order={3}>60</Title>
        <Text>
          We have traveled to over sixty different outdoor climbing locations
          worldwide. Exploring new crags feeds our sense of adventure, so we are
          always looking to discover new climbing areas.
        </Text>
        <Title order={3}>250</Title>
        <Text>
          We have climbed well over two hundred unique double-digit boulder
          problems ranging from V10 up to V14. This base allows us to push our
          limit in terms of difficult bouldering.
        </Text>
        <Image src='/images/BioPic3.jpg?nf_resize=fit&w=1200' alt='BioPic3' />
        <Title order={2}>A Coach&apos;s Perspective</Title>
        <Blockquote cite='- Taylor Reed'>
          A couple of my old proteges, Eden and Itai Axelrad, still climbing for
          the pure love of climbing. Best moment in a teacher’s life is the
          moment your students surpass you. With these two, I remember the day
          fondly.
        </Blockquote>
      </TypographyStylesProvider>
    </Container>
  );
}
