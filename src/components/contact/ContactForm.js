import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-primary);
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: ${props => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'white'};
  color: var(--color-text-primary);
  font-size: 1rem;
  transition: all var(--transition-medium);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px ${props => props.theme === 'dark'
        ? 'rgba(255, 107, 107, 0.2)'
        : 'rgba(255, 107, 107, 0.1)'};
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }
`;

const TextArea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 120px;
`;

const SubmitButton = styled(motion.button)`
  padding: 0.75rem 2rem;
  border: none;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all var(--transition-medium);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  }
`;

const ErrorMessage = styled.span`
  color: #EF4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const SuccessMessage = styled(motion.div)`
  color: #10B981;
  text-align: center;
  padding: 1rem;
  border-radius: var(--radius-md);
  background: ${props => props.theme === 'dark'
        ? 'rgba(16, 185, 129, 0.1)'
        : 'rgba(16, 185, 129, 0.05)'};
  border: 1px solid #10B981;
  margin-bottom: 1rem;
`;

const ContactForm = () => {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);

            // Simulate form submission
            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                setIsSubmitted(true);
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            } catch (error) {
                setErrors({ submit: 'Failed to send message. Please try again.' });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <>
            {isSubmitted && (
                <SuccessMessage
                    theme={theme}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    Thank you for your message! I'll get back to you soon.
                </SuccessMessage>
            )}

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        theme={theme}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                    />
                    {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        theme={theme}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                    />
                    {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                        theme={theme}
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                    />
                    {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                    <Label htmlFor="message">Message</Label>
                    <TextArea
                        theme={theme}
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message here..."
                    />
                    {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
                </FormGroup>

                <SubmitButton
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </SubmitButton>
                {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
            </Form>
        </>
    );
};

export default ContactForm;
