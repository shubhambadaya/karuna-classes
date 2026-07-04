import { useState, useEffect, useRef } from 'react';
import { Edit3, X, Copy, Check, Info, MousePointer } from 'lucide-react';

export default function DevInspector() {
  // Only enable in development mode
  if (!import.meta.env.DEV) {
    return null;
  }

  const [isActive, setIsActive] = useState(false);
  const [hoveredEl, setHoveredEl] = useState(null);
  const [selectedEl, setSelectedEl] = useState(null);
  const [overlayRect, setOverlayRect] = useState(null);
  const [copied, setCopied] = useState(false);
  const [editableTexts, setEditableTexts] = useState([]);
  
  const selectedElRef = useRef(null);

  // Track scroll and resize when overlay is active
  useEffect(() => {
    if (!isActive) {
      setHoveredEl(null);
      setOverlayRect(null);
      return;
    }

    const updateRect = () => {
      if (hoveredEl) {
        const rect = hoveredEl.getBoundingClientRect();
        setOverlayRect({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
          name: hoveredEl.getAttribute('data-component') || 'Unknown Component',
        });
      } else {
        setOverlayRect(null);
      }
    };

    updateRect();

    window.addEventListener('scroll', updateRect);
    window.addEventListener('resize', updateRect);

    return () => {
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('resize', updateRect);
    };
  }, [isActive, hoveredEl]);

  // Global mousemove and click listeners when active
  useEffect(() => {
    if (!isActive) return;

    const handleMouseMove = (e) => {
      // Find closest element with data-component attribute
      const target = e.target.closest('[data-component]');
      
      // If we are hovering over the inspector UI itself, ignore
      if (e.target.closest('.dev-inspector-ui')) {
        setHoveredEl(null);
        return;
      }

      if (target) {
        setHoveredEl(target);
      } else {
        setHoveredEl(null);
      }
    };

    const handleElementClick = (e) => {
      const target = e.target.closest('[data-component]');
      if (e.target.closest('.dev-inspector-ui')) {
        return; // Let normal clicks on inspector UI go through
      }

      if (target) {
        e.preventDefault();
        e.stopPropagation();
        setSelectedEl(target);
        selectedElRef.current = target;
        
        // Scan for editable text elements within the component
        // We find leaf elements or headers/paragraphs
        const textElements = Array.from(target.querySelectorAll('h1, h2, h3, h4, h5, p, span, button, a'))
          .filter(el => {
            // Only include elements with direct text content and no complex children
            const hasDirectText = Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0);
            return hasDirectText && el.getBoundingClientRect().width > 0;
          })
          .map((el, index) => {
            // Assign a temporary identifier so we can find it
            const existingId = el.getAttribute('data-editable-id');
            const editId = existingId || `editable-${index}-${Date.now()}`;
            if (!existingId) {
              el.setAttribute('data-editable-id', editId);
            }
            return {
              id: editId,
              tagName: el.tagName.toLowerCase(),
              initialText: el.innerText.trim(),
              currentText: el.innerText.trim(),
            };
          });

        setEditableTexts(textElements);
        setIsActive(false); // Disable picking mode once selected
        setHoveredEl(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleElementClick, true); // Use capture phase to intercept

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleElementClick, true);
    };
  }, [isActive]);

  const handleCopyPath = (path) => {
    const cleanPath = path.split(' ')[0]; // Strip section details if any
    navigator.clipboard.writeText(cleanPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextChange = (id, newText) => {
    // Update local state
    setEditableTexts(prev =>
      prev.map(item => (item.id === id ? { ...item, currentText: newText } : item))
    );

    // Update real DOM node
    if (selectedElRef.current) {
      const el = selectedElRef.current.querySelector(`[data-editable-id="${id}"]`);
      if (el) {
        el.innerText = newText;
      }
    }
  };

  const getComponentName = (path) => {
    if (!path) return '';
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  return (
    <>
      {/* Styles injected dynamically to avoid external CSS setup issues */}
      <style>{`
        .dev-inspector-ui {
          font-family: 'DM Sans', -apple-system, sans-serif;
          z-index: 99999;
          position: fixed;
        }
        .dev-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: rgba(18, 18, 18, 0.85);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 12px 20px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 14px;
          font-weight: 500;
        }
        .dev-fab:hover {
          transform: translateY(-2px);
          background: rgba(220, 107, 74, 0.95); /* Terracotta */
          border-color: rgba(220, 107, 74, 0.4);
          box-shadow: 0 12px 40px rgba(220, 107, 74, 0.3);
        }
        .dev-fab.active {
          background: #dc6b4a;
          border-color: rgba(255, 255, 255, 0.2);
        }
        .dev-inspector-overlay {
          position: absolute;
          border: 2px dashed #dc6b4a;
          background: rgba(220, 107, 74, 0.08);
          pointer-events: none;
          z-index: 99998;
          transition: all 0.15s ease-out;
          box-sizing: border-box;
          animation: pulseBorder 2s infinite;
        }
        @keyframes pulseBorder {
          0% { border-color: rgba(220, 107, 74, 0.8); }
          50% { border-color: rgba(220, 107, 74, 1); }
          100% { border-color: rgba(220, 107, 74, 0.8); }
        }
        .dev-overlay-label {
          position: absolute;
          top: -24px;
          left: -2px;
          background: #dc6b4a;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 4px 4px 0 0;
          white-space: nowrap;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        }
        .dev-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 380px;
          height: 100vh;
          background: #1a1a1a;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: -10px 0 40px rgba(0,0,0,0.5);
          color: #e5e5e5;
          padding: 24px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .dev-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 16px;
        }
        .dev-drawer-header h3 {
          margin: 0;
          color: #fff;
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
        }
        .close-btn {
          background: none;
          border: none;
          color: #a3a3a3;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .close-btn:hover {
          color: #fff;
          background: rgba(255,255,255,0.05);
        }
        .path-box {
          background: #121212;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .path-label {
          font-size: 10px;
          text-transform: uppercase;
          color: #dc6b4a;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        .path-value-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .path-value {
          font-family: monospace;
          font-size: 12px;
          word-break: break-all;
          color: #a3a3a3;
        }
        .copy-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          cursor: pointer;
          border-radius: 6px;
          padding: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .copy-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
        }
        .edit-info {
          display: flex;
          gap: 8px;
          background: rgba(220, 107, 74, 0.1);
          border: 1px solid rgba(220, 107, 74, 0.2);
          color: #e5b399;
          font-size: 12px;
          padding: 12px;
          border-radius: 8px;
          margin-bottom: 24px;
          line-height: 1.5;
        }
        .edit-fields-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex-grow: 1;
        }
        .edit-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .field-label {
          font-size: 11px;
          color: #737373;
          font-weight: bold;
          text-transform: uppercase;
        }
        .field-input {
          background: #262626;
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
          border-radius: 6px;
          padding: 10px;
          font-family: inherit;
          font-size: 13px;
          resize: vertical;
          transition: all 0.2s;
        }
        .field-input:focus {
          outline: none;
          border-color: #dc6b4a;
          box-shadow: 0 0 0 2px rgba(220, 107, 74, 0.2);
        }
        .picking-banner {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #dc6b4a;
          color: white;
          padding: 8px 18px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 8px 24px rgba(0,0,0,0.2);
          z-index: 99999;
          animation: floatIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes floatIn {
          from { transform: translate(-50%, -30px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>

      {/* Picking active banner */}
      {isActive && (
        <div className="dev-inspector-ui picking-banner">
          <MousePointer size={16} />
          <span>Hover & click any page section to inspect / edit it</span>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="dev-inspector-ui">
        <button 
          className={`dev-fab ${isActive ? 'active' : ''}`}
          onClick={() => {
            setIsActive(!isActive);
            if (!isActive) setSelectedEl(null);
          }}
          title="Toggle component inspector to highlight sections to edit"
        >
          {isActive ? <X size={18} /> : <Edit3 size={18} />}
          <span>{isActive ? 'Cancel' : 'Edit Mode'}</span>
        </button>
      </div>

      {/* Bounding Box Overlay */}
      {isActive && overlayRect && (
        <div 
          className="dev-inspector-overlay"
          style={{
            top: `${overlayRect.top}px`,
            left: `${overlayRect.left}px`,
            width: `${overlayRect.width}px`,
            height: `${overlayRect.height}px`,
          }}
        >
          <div className="dev-overlay-label">
            {getComponentName(overlayRect.name)}
          </div>
        </div>
      )}

      {/* Inspection Drawer */}
      {selectedEl && (
        <div className="dev-inspector-ui dev-drawer">
          <div className="dev-drawer-header">
            <h3>Component Inspector</h3>
            <button className="close-btn" onClick={() => setSelectedEl(null)}>
              <X size={20} />
            </button>
          </div>

          <div className="path-box">
            <span className="path-label">Source Component</span>
            <div className="path-value-row">
              <span className="path-value">
                {selectedEl.getAttribute('data-component')}
              </span>
              <button 
                className="copy-btn"
                onClick={() => handleCopyPath(selectedEl.getAttribute('data-component'))}
                title="Copy file path"
              >
                {copied ? <Check size={14} style={{ color: '#4ade80' }} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div className="edit-info">
            <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>
              Type in the inputs below to preview edits live. To make your changes permanent, edit the file path shown above in your IDE.
            </span>
          </div>

          <div className="edit-fields-container">
            <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', textTransform: 'uppercase', color: '#a3a3a3' }}>
              Live Text Editor
            </h4>
            
            {editableTexts.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#737373', fontStyle: 'italic' }}>
                No text elements found in this section.
              </p>
            ) : (
              editableTexts.map(field => (
                <div key={field.id} className="edit-field">
                  <span className="field-label">&lt;{field.tagName}&gt;</span>
                  {field.initialText.length > 50 ? (
                    <textarea 
                      className="field-input"
                      rows={3}
                      value={field.currentText}
                      onChange={(e) => handleTextChange(field.id, e.target.value)}
                    />
                  ) : (
                    <input 
                      type="text" 
                      className="field-input"
                      value={field.currentText}
                      onChange={(e) => handleTextChange(field.id, e.target.value)}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
