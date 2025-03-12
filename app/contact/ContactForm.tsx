'use client';

import { Button, Textarea, TextInput, VisuallyHidden } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
interface FormValues {
  email: string;
  message: string;
}

export default function ContactForm() {
  const form = useForm<FormValues>({
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

  const handleSubmit = (values: FormValues): void => {
    console.log(values);
    notifications.show({
      title: 'Hi',
      message: 'Thank you for your message!',
      position: 'top-center',
      color: 'teal',
      icon: <IconCheck size={18} />,
    });
    form.reset();
  };

  return (
    <form
      name='contact'
      method='POST'
      onSubmit={form.onSubmit((values) => handleSubmit(values))}
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
      <Button type='submit' my='xs' loading={form.submitting}>
        Submit
      </Button>
    </form>
  );
}
