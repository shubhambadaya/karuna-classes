import { MessageCircle } from 'lucide-react';
import './WhatsAppButton.css';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;
const DEFAULT_MESSAGE = "Hi Karuna! I'm interested in your art classes and would love to know more.";

const WhatsAppButton = () => {
  if (!WHATSAPP_NUMBER) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float-btn"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={24} color="#fff" />
      <span className="whatsapp-label">Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
