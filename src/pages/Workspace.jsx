import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Layout, CheckSquare, MessageSquare, Files, Settings, 
  AlertCircle, Users, Activity, Flag, ChevronRight, Plus 
} from 'lucide-react';
import { problems } from '../data/problems';

const Workspace = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('board');
  
  // Find the problem based on the ID from the URL
  const selectedProblem = problems.find(p => p.id === parseInt(id)) || problems[0];

  const project = {
    title: selectedProblem.title,
    domain: selectedProblem.domain,
    desc: selectedProblem.desc,
    stage: selectedProblem.status || "Ideation",
    progress: 35, // Placeholder
    team: [
      { name: "Anu", role: "Product Owner", activity: "High", contributions: 10 },
      { name: "Alex", role: "UI Designer", activity: "High", contributions: 12 },
    ],
    missingRoles: selectedProblem.skills.slice(0, 2),
    tasks: {
      todo: ["Implement " + selectedProblem.skills[0], "Research " + selectedProblem.domain + " market"],
      doing: ["Architecture Setup"],
      done: ["Initial Ideation"]
    }
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      {/* Project Header */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ fontSize: '2rem' }}>{project.title}</h1>
              <span className="badge badge-primary">{project.stage}</span>
            </div>
            <p style={{ color: 'var(--text-muted)' }}>{project.desc}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Project Progress</div>
            <div style={{ width: '200px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                style={{ height: '100%', background: 'var(--primary)' }}
              />
            </div>
            <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>{project.progress}% Complete</div>
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', padding: '0 20px' }}>
          <div style={{ position: 'absolute', top: '12px', left: '40px', right: '40px', height: '2px', background: 'var(--border)', zIndex: 0 }} />
          {['Idea', 'Validation', 'Prototype', 'MVP', 'Launch'].map((m, i) => {
            const isDone = i <= 2;
            const isCurrent = i === 2;
            return (
              <div key={m} style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <div style={{ 
                  width: '24px', height: '24px', borderRadius: '50%', 
                  background: isCurrent ? 'var(--primary)' : isDone ? 'var(--secondary)' : 'var(--bg-main)',
                  border: `2px solid ${isDone ? 'var(--secondary)' : 'var(--border)'}`,
                  margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {isDone && <CheckSquare size={12} color="white" />}
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isCurrent ? 'white' : 'var(--text-dim)' }}>{m}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
        {/* Sidebar: Team Health & Stats */}
        <aside>
          <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="var(--secondary)" />
              Team Health
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Current Members</div>
              {project.team.map(m => (
                <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>{m.name[0]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{m.role}</div>
                  </div>
                  <div className={`badge ${m.activity === 'High' ? 'badge-success' : 'badge-info'}`} style={{ fontSize: '0.6rem' }}>{m.activity}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Missing Roles</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {project.missingRoles.map(r => (
                  <span key={r} className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.2)', fontSize: '0.65rem' }}>
                    {r}
                  </span>
                ))}
              </div>
              <button className="btn-outline" style={{ width: '100%', marginTop: '16px', fontSize: '0.8rem', padding: '8px' }}>
                <Plus size={14} /> Recruit Members
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area: Kanban / Communication */}
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <button 
              onClick={() => setActiveTab('board')}
              className={activeTab === 'board' ? 'btn-primary' : 'btn-outline'} 
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              <Layout size={16} /> Task Board
            </button>
            <button 
              onClick={() => setActiveTab('chat')}
              className={activeTab === 'chat' ? 'btn-primary' : 'btn-outline'} 
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              <MessageSquare size={16} /> Team Chat
            </button>
            <button 
              className="btn-outline" 
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              <Files size={16} /> Docs & Files
            </button>
          </div>

          {activeTab === 'board' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {['todo', 'doing', 'done'].map(status => (
                <div key={status} className="glass-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                  <h4 style={{ textTransform: 'capitalize', marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between' }}>
                    {status}
                    <span style={{ background: 'var(--border)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem' }}>{project.tasks[status].length}</span>
                  </h4>
                  {project.tasks[status].map(task => (
                    <div key={task} className="glass-card" style={{ padding: '12px', marginBottom: '12px', fontSize: '0.85rem', cursor: 'grab' }}>
                      {task}
                      <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent)', maskImage: 'linear-gradient(to right, black 50%, transparent)' }}>
                          {/* Avatars */}
                          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary)', fontSize: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>2d ago</span>
                      </div>
                    </div>
                  ))}
                  <button style={{ width: '100%', padding: '8px', border: '1px dashed var(--border)', borderRadius: '8px', background: 'transparent', color: 'var(--text-dim)', fontSize: '0.8rem', cursor: 'pointer' }}>
                    + Add Task
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                <div style={{ color: 'var(--text-dim)', textAlign: 'center', marginTop: '100px' }}>
                  <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                  <p>Welcome to the project chat!</p>
                  <p style={{ fontSize: '0.8rem' }}>Start collaborating with your team.</p>
                </div>
              </div>
              <div style={{ padding: '20px', borderTop: '1px solid var(--border)' }}>
                <input 
                  type="text" 
                  placeholder="Type a message..."
                  style={{ 
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                    borderRadius: '12px', padding: '12px', color: 'white'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
