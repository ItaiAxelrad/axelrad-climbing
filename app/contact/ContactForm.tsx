'use client';

import { Button, Textarea, TextInput, VisuallyHidden } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { sendEmail } from './sendEmail';

export default function ContactForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      message: '',
    },

    validate: {
      email: isEmail('Please enter a valid email'),
      message: hasLength(
        { min: 10, max: 1000 },
        'Message must be 10-1000 characters long',
      ),
    },
  });

  return (
    <form
      name='contact'
      method='POST'
      action={sendEmail}
      // onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <VisuallyHidden>
        <TextInput
          label="Don’t fill this out if you're human:"
          name='honeypot'
        />
      </VisuallyHidden>
      <TextInput
        label='Email'
        name='email'
        id='email'
        type='email'
        placeholder='your@email.com'
        required
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <Textarea
        label='Message'
        id='message'
        name='message'
        placeholder='Gamba, gamba!'
        required
        key={form.key('message')}
        {...form.getInputProps('message')}
      />
      <Button
        type='submit'
        my='xs'
        loading={form.submitting}
        // onClick={() =>
        // 	notifications.show({
        // 		title: "Hi",
        // 		message: "Thank you for your message!",
        // 	})
        // }
      >
        Submit
      </Button>
    </form>
  );
}
