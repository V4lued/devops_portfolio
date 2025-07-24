import styled, { keyframes } from 'styled-components';
import { FaEnvelope, FaGithub, FaLinkedin, FaMapMarkerAlt, FaTerminal, FaRocket } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const ContactSection = styled.section`
  padding: 6rem 2rem 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* min-height: 100vh; */
  padding-top: 5rem;
  padding-bottom: 5rem;
  position: relative;
  var(--light-surface);
  
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 6rem;
    padding: 4rem 2rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  gap: 3rem;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: stretch;  // Changed from flex-start to stretch for equal heights
    justify-content: space-between;
    gap: 4rem;
  }
`;

const ContactCard = styled.div`
  background: rgba(35, 39, 42, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 500px;
  animation: ${fadeInUp} 0.8s ease-out;
  border: 1px solid rgba(57, 204, 204, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(255, 153, 0, 0.10);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--pipeline-cyan), transparent);
    border-radius: 20px 20px 0 0;
  }
  
  @media (min-width: 1024px) {
    /* flex: 1; */
    max-width: 500px;
    /* min-height: 650px; */
  }
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 500px;
  gap: 2.5rem;
  color: var(--white);
  font-size: 1.1rem;
  animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  text-align: center;
  
  @media (min-width: 1024px) {
    /* flex: 1; */
    align-items: flex-start;
    text-align: left;
    max-width: 500px;
    /* min-height: 650px; */
    justify-content: flex-start;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  @media (min-width: 1024px) {
    text-align: left;
    margin-bottom: 0;
  }
`;

const TerminalBox = styled.div`
  background: rgba(35, 39, 42, 0.95);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  border: 1px solid rgba(57, 204, 204, 0.2);
  position: relative;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  animation: ${float} 3s ease-in-out infinite;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(255, 153, 0, 0.10);
  }
  
  &::before {
    content: '⚡ Contact Terminal';
    position: absolute;
    top: -12px;
    left: 15px;
    background: rgba(35, 39, 42, 0.95);
    color: var(--pipeline-cyan);
    padding: 0 0.5rem;
    font-size: 0.8rem;
  }
`;

const TerminalLine = styled.div`
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  /* Removed typing effect */
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  flex-grow: 1;  // Allow to grow and fill available space
  justify-content: center;  // Center the contact items vertically
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem;
  background: rgba(35, 39, 42, 0.95);
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid rgba(57, 204, 204, 0.2);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  
  &:hover {
    border-color: var(--pipeline-cyan) !important;
    transform: translateX(8px);
    box-shadow: 0 8px 20px rgba(255, 153, 0, 0.10);
  }
  
  .icon {
    color: var(--pipeline-cyan);
    font-size: 1.4rem;
    flex-shrink: 0;
  }
  
  .content {
    flex: 1;
    min-width: 0;
    
    .label {
      font-weight: 600;
      color: var(--white);
      margin-bottom: 0.3rem;
      font-size: 0.9rem;
    }
    
    .value {
      color: var(--white);
      text-decoration: none;
      font-size: 1rem;
      word-break: break-word;
      transition: color 0.2s;
      
      &:hover {
        color: var(--pipeline-cyan);
      }
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.8rem;
  flex-grow: 1;  // Allow form to grow and fill available space
  justify-content: space-between;  // Distribute form elements evenly
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  flex-grow: 1;
`;

const FormHeader = styled.h3`
  color: var(--white);
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
  text-align: center;
  
  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.4rem 1.2rem;
  background: rgba(35, 39, 42, 0.95);
  border: 2px solid var(--disabled-meta);
  border-radius: 12px;
  color: var(--white);
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: var(--pipeline-cyan);
    background: rgba(35, 39, 42, 1);
    box-shadow: 0 0 20px rgba(57, 204, 204, 0.3);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1.4rem 1.2rem;
  background: rgba(35, 39, 42, 0.95);
  border: 2px solid var(--disabled-meta);
  border-radius: 12px;
  color: var(--white);
  min-height: 270px;
  font-size: 1rem;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: var(--pipeline-cyan);
    background: rgba(35, 39, 42, 1);
    box-shadow: 0 0 20px rgba(57, 204, 204, 0.3);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const SubmitButton = styled.button`
  padding: 1.4rem 2.5rem;
  background: linear-gradient(135deg, var(--pipeline-cyan), var(--pipeline-cyan));
  color: var(--dark-background);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  align-self: center;
  min-width: 200px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: linear-gradient(135deg, #666, #666);
  }
  
  /* Removed shine effect */
  
  @media (min-width: 1024px) {
    align-self: flex-start;
  }
`;

const FloatingIcon = styled.div`
  position: absolute;
  color: var(--pipeline-cyan);
  opacity: 0.08;
  animation: ${float} 4s ease-in-out infinite;
  font-size: 2.5rem;
  
  &.icon1 { top: 8%; right: 8%; animation-delay: 0s; }
  &.icon2 { top: 50%; left: 3%; animation-delay: 1s; }
  &.icon3 { bottom: 15%; right: 12%; animation-delay: 2s; }
  
  @media (max-width: 1023px) {
    display: none;
  }
`;

const COOLDOWN_KEY = 'contactFormCooldownUntil';
const COOLDOWN_SECONDS = 300; // 5 minutes

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [cooldownTime, setCooldownTime] = useState(0);
  const [isInCooldown, setIsInCooldown] = useState(false);

  // On mount, check for cooldown in localStorage
  useEffect(() => {
    const cooldownUntil = localStorage.getItem(COOLDOWN_KEY);
    if (cooldownUntil) {
      const until = parseInt(cooldownUntil, 10);
      const now = Math.floor(Date.now() / 1000);
      if (until > now) {
        setIsInCooldown(true);
        setCooldownTime(until - now);
      } else {
        localStorage.removeItem(COOLDOWN_KEY);
      }
    }
  }, []);

  // Cooldown timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isInCooldown && cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setIsInCooldown(false);
            localStorage.removeItem(COOLDOWN_KEY);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval as unknown as number);
  }, [isInCooldown, cooldownTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isInCooldown) {
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      // EmailJS configuration
      const serviceId = 'service_39nnn37';
      const templateId = 'template_9atavfe';
      const publicKey = 'uzs5BBSkiMFqFRzRI';
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'cgdseverino@gmail.com', // Your email where you want to receive messages
      };
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      // Start cooldown period (5 minutes = 300 seconds)
      setIsInCooldown(true);
      setCooldownTime(COOLDOWN_SECONDS);
      const cooldownUntil = Math.floor(Date.now() / 1000) + COOLDOWN_SECONDS;
      localStorage.setItem(COOLDOWN_KEY, cooldownUntil.toString());
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      // Reset error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact">
      <FloatingIcon className="icon1"><FaTerminal /></FloatingIcon>
      <FloatingIcon className="icon3"><FaRocket /></FloatingIcon>
      
      <ContentContainer>
        <InfoBlock>
          <HeaderSection>
            <h2 style={{ color: 'var(--pipeline-cyan)', fontSize: '2.8rem', marginBottom: '1rem', fontWeight: '700' }}>
              Let's Connect
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '0' }}>
              Ready to collaborate on your next DevOps project
            </p>
          </HeaderSection>
          
          <TerminalBox>
            <TerminalLine>
              <span style={{ color: 'var(--pipeline-cyan)' }}>$</span>
              <span style={{ color: 'var(--pipeline-cyan)' }}>whoami</span>
            </TerminalLine>
            <TerminalLine>
              DevOps Engineer | Cloud Enthusiast | Problem Solver
            </TerminalLine>
            <TerminalLine>
              <span style={{ color: 'var(--pipeline-cyan)' }}>$</span>
              <span style={{ color: 'var(--pipeline-cyan)' }}>contact --status</span>
            </TerminalLine>
            <TerminalLine style={{ color: 'var(--success-green)' }}>
              ✓ Available for opportunities
            </TerminalLine>
          </TerminalBox>

          <ContactInfo>
            <ContactItem>
              <FaEnvelope className="icon" />
              <div className="content">
                <div className="label">Email</div>
                <a href="mailto:cgdseverino@gmail.com" className="value">cgdseverino@gmail.com</a>
              </div>
            </ContactItem>
            
            <ContactItem>
              <FaGithub className="icon" />
              <div className="content">
                <div className="label">GitHub</div>
                <a href="https://github.com/V4lued" className="value" target="_blank" rel="noopener noreferrer">github.com/V4lued</a>
              </div>
            </ContactItem>
            
            <ContactItem>
              <FaLinkedin className="icon" />
              <div className="content">
                <div className="label">LinkedIn</div>
                <a href="https://www.linkedin.com/in/cyrusseverino/" className="value" target="_blank" rel="noopener noreferrer">linkedin.com/in/cyrusseverino/</a>
              </div>
            </ContactItem>
            
            <ContactItem>
              <FaMapMarkerAlt className="icon" />
              <div className="content">
                <div className="label">Location</div>
                <span className="value">Metro Manila, Philippines</span>
              </div>
            </ContactItem>
          </ContactInfo>
        </InfoBlock>

        <ContactCard>
          <FormHeader>Send Message</FormHeader>
          <Form ref={form} onSubmit={handleSubmit}>
            <FormContent>
              <InputGroup>
                <Input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="name"
                  required 
                />
              </InputGroup>
              <InputGroup>
                <Input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required 
                />
              </InputGroup>
              <InputGroup>
                <Input 
                  type="text" 
                  name="subject"
                  placeholder="Subject" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  autoComplete="off"
                  required 
                />
              </InputGroup>
              <InputGroup>
                <Textarea 
                  name="message"
                  placeholder="Your Message" 
                  value={formData.message}
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
                />
              </InputGroup>
              
              {/* Status messages */}
              {submitStatus === 'success' && (
                <div style={{ 
                  color: 'var(--success-green)', 
                  textAlign: 'center', 
                  padding: '1rem',
                  background: 'rgba(46, 204, 64, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid var(--success-green)'
                }}>
                  ✓ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div style={{ 
                  color: 'var(--error-red)', 
                  textAlign: 'center', 
                  padding: '1rem',
                  background: 'rgba(255, 65, 54, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid var(--error-red)'
                }}>
                  ✗ Failed to send message. Please try again or email me directly.
                </div>
              )}
              
              {isInCooldown && (
                <div style={{ 
                  color: 'var(--warning-yellow)', 
                  textAlign: 'center', 
                  padding: '1rem',
                  background: 'rgba(255, 184, 0, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid var(--warning-yellow)'
                }}>
                  ⏱️ Please wait {cooldownTime} seconds before sending another message.
                </div>
              )}
            </FormContent>
            <SubmitButton type="submit" disabled={isSubmitting || isInCooldown}>
              {isSubmitting 
                ? 'Sending...' 
                : isInCooldown 
                  ? `Wait ${cooldownTime}s` 
                  : 'Send Message'}
            </SubmitButton>
          </Form>
        </ContactCard>
      </ContentContainer>
    </ContactSection>
  );
};

export default Contact; 