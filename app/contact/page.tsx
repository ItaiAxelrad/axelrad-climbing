import {
  Button,
  Card,
  CardSection,
  Container,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  VisuallyHidden,
} from '@mantine/core';
import { comments } from './comments';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Axelrad Climbing | Contact',
};

export default function ContactPage() {
  return (
    <Container size='sm' my='xl'>
      <section>
        <Title>Contact</Title>
        <Text my='sm'>Got a question or comment? Get in touch!</Text>
        <form
          name='contact'
          method='POST'
          data-netlify='true'
          netlify-honeypot='bot-field'
        >
          <VisuallyHidden>
            <TextInput
              label="Don’t fill this out if you're human:"
              name='bot-field'
            />
          </VisuallyHidden>
          <TextInput
            label='Email'
            name='email'
            id='email'
            type='email'
            placeholder='your@email.com'
            required
          />
          <TextInput
            label='Subject'
            id='subject'
            type='text'
            name='subject'
            placeholder='Likely climbing'
            required
          />
          <Textarea
            label='Message'
            id='message'
            name='message'
            placeholder='Gamba, gamba!'
            required
          />
          <Button type='submit' my='xs'>
            Submit
          </Button>
        </form>
      </section>
      <section>
        <Title order={2} my='sm'>
          Comments
        </Title>
        <Stack gap='xs'>
          {comments
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
