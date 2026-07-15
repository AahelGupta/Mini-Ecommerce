import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const addToast = useCallback((msg, type = 'info') => {
    const id = ++idRef.current;
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => removeToast(id), 3200);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Toast({ toast, onClose }) {
  const icons = { success: '✅', error: '❌', info: '💜', warning: '⚠️' };
  return (
    <div className={`toast toast-${toast.type}`} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="toast-icon">{icons[toast.type] || icons.info}</div>
      <span className="toast-msg">{toast.msg}</span>
      <button className="toast-close" onClick={onClose} aria-label="Dismiss">×</button>
      <div className="toast-progress" />
    </div>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be within ToastProvider');
  return ctx;
}
