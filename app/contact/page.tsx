import {
  Card,
  CardSection,
  Container,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Metadata } from 'next';
import { comments } from './comments';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Axelrad Climbing | Contact',
};

export default function ContactPage() {
  return (
    <Container size='sm' my='xl'>
      <section>
        <Title>Contact</Title>
        <Text my='sm'>Got a question or comment? Get in touch!</Text>
        <ContactForm />
      </section>
      <section>
        <Title order={2} my='sm'>
          Comments
        </Title>
        <Stack gap='xs'>
          {comments
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((comment, i) => (
              <Card key={i} padding='lg' withBorder>
                <CardSection inheritPadding py='lg'>
                  <Text fw='bold'>{comment.subject}</Text>
                  <Text fz='sm' c='dimmed'>
                    {comment.author} commented on {comment.date}
                  </Text>
                  <Text fz='sm'>{comment.body}</Text>
                </CardSection>
                {comment.replies && (
                  <>
                    {comment.replies.map((reply, ii) => (
                      <CardSection key={ii} inheritPadding pl='xl' pb='lg'>
                        <Text fz='sm' c='dimmed'>
                          {reply.author} replied on {reply.date}
                        </Text>
                        <Text fz='sm'>{reply.body}</Text>
                      </CardSection>
                    ))}
                  </>
                )}
              </Card>
            ))}
        </Stack>
      </section>
    </Container>
  );
}
