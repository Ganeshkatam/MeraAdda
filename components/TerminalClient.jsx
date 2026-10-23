'use client';

import React, { useState } from 'react';
import { Terminal } from 'lucide-react';

export default function TerminalClient({ profile, skills = [], projects = [] }) {
  const [terminalHistory, setTerminalHistory] = useState([
    { cmd: 'help', output: 'Available commands: whoami, bio, skills, projects, contact, clear' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  const handleCommand = (cmdText) => {
    const clean = (cmdText || terminalInput).trim().toLowerCase();
    let res = '';
    if (clean === 'help') {
      res = 'Available commands: whoami, bio, skills, projects, contact, clear';
    } else if (clean === 'whoami') {
      res = `${profile?.name || 'Katam Ganesh Reddy'} (${profile?.title || 'Full-Stack Developer'}) based in ${profile?.location || 'India'}`;
    } else if (clean === 'bio') {
      res = profile?.intro || profile?.bio || 'Full-stack software engineer and systems builder.';
    } else if (clean === 'skills') {
      res = skills.length > 0 ? skills.join(' · ') : 'Loading verified skills...';
    } else if (clean === 'projects') {
      res = projects.length > 0 ? projects.map(p => `${p.name} [${p.status}] - ${p.category} (${p.url})`).join('\n') : 'No projects loaded.';
    } else if (clean === 'contact') {
      res = `Email: ${profile?.email || 'katamganesh61@gmail.com'}\nLinkedIn: https://${profile?.socials?.linkedin || 'linkedin.com/in/ganeshkatam'}`;
    } else if (clean === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else {
      res = `Command not recognized: "${clean}". Type 'help' for available commands.`;
    }
    setTerminalHistory(prev => [...prev, { cmd: clean, output: res }]);
    setTerminalInput('');
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot dot-red" />
          <span className="terminal-dot dot-yellow" />
          <span className="terminal-dot dot-green" />
        </div>
        <div className="terminal-title">guest@tomesphere: ~</div>
        <Terminal size={14} style={{ color: 'var(--text-muted)' }} />
      </div>

      <div className="terminal-body">
        {terminalHistory.map((item, index) => (
          <div key={index} style={{ marginBottom: '12px' }}>
            <div className="term-line">
              <span className="term-prompt">visitor@tomesphere:~$</span>
              <span className="term-cmd">{item.cmd}</span>
            </div>
            <div className="term-output" style={{ whiteSpace: 'pre-wrap' }}>
              {item.output}
            </div>
          </div>
        ))}

        <form
          onSubmit={e => {
            e.preventDefault();
            if (terminalInput.trim()) handleCommand(terminalInput);
          }}
          className="term-line"
          style={{ marginTop: '12px' }}
        >
          <span className="term-prompt">visitor@tomesphere:~$</span>
          <input
            type="text"
            value={terminalInput}
            onChange={e => setTerminalInput(e.target.value)}
            placeholder="Type 'help', 'skills', 'projects', 'whoami'..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              flex: 1
            }}
          />
        </form>

        <div className="term-quick-btns">
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', alignSelf: 'center', marginRight: '6px' }}>
            Quick commands:
          </span>
          {['help', 'whoami', 'skills', 'projects', 'contact', 'clear'].map(cmd => (
            <button key={cmd} type="button" className="term-btn" onClick={() => handleCommand(cmd)}>
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
