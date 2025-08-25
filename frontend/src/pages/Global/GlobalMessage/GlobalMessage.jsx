import './GlobalMessage.scss';
import GlobalLayout from '../../../layouts/GlobalLayout/GlobalLayout';

function GlobalUserMessage() {
  return (
    <GlobalLayout>
      <div className="message-content-col">
        <h2>Global Message Center</h2>
        <div className="message-placeholder">This is the Message section. Add your message components here.</div>
      </div>
    </GlobalLayout>
  );
}

export default GlobalUserMessage; 