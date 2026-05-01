import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, TrendingUp, Users, Clock, Target, Plus, ChevronRight } from 'lucide-react';
import { problems } from '../data/problems';

const Hub = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProblems = problems.filter(p => 
    activeFilter === 'All' || p.domain === activeFilter
  );

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      {/* Header & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Problem Hub</h1>
          <p style={{ color: 'var(--text-muted)' }}>Explore curated challenges and find your next mission.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search problems..."
              style={{ 
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '12px 12px 12px 40px', color: 'white', width: '300px',
                height: '46px'
              }}
            />
          </div>
          <button className="btn-primary" style={{ height: '46px' }}>
            <Plus size={18} />
            Post Problem
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '8px' }}>
        {['All', 'Sustainability', 'FinTech', 'AI/ML', 'HealthTech', 'Education'].map(filter => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            style={{ 
              padding: '8px 24px', borderRadius: '12px', border: '1px solid var(--border)',
              background: activeFilter === filter ? 'var(--primary)' : 'var(--bg-surface)',
              color: 'white', cursor: 'pointer', transition: 'var(--transition)',
              whiteSpace: 'nowrap', fontWeight: 500
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div 
        className="grid-auto" 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
          gap: '24px',
          position: 'relative', // Ensure container is a positioning context
          alignItems: 'stretch'
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProblems.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.2,
                delay: i * 0.03 // Subtle stagger
              }}
              onClick={() => window.location.href = `/workspace/${p.id}`}
              className="glass-card clickable-card"
              style={{ 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                position: 'relative',
                minHeight: '420px',
                height: '100%',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
            >
              {p.id % 7 === 0 && (
                <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', zIndex: 10 }}>
                  <Target size={12} /> 95% Match
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
                <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>{p.domain}</span>
                <div style={{ display: 'flex', gap: '4px', color: 'var(--secondary)', alignItems: 'center' }}>
                  <TrendingUp size={14} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{p.impact} Impact</span>
                </div>
              </div>
              
              <h3 
                style={{ 
                  marginBottom: '12px', 
                  lineHeight: 1.3, 
                  minHeight: '3.4em', 
                  display: '-webkit-box', 
                  WebkitLineClamp: 2, 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden'
                }}
              >
                {p.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px', flex: 1, lineHeight: 1.6 }}>
                {p.desc}
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '10px', fontWeight: 500 }}>Required Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {p.skills.map(s => <span key={s} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', border: '1px solid var(--border)' }}>{s}</span>)}
                </div>
              </div>
  
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.team.current}/{p.team.total} builders</span>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn-outline" 
                    style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid var(--secondary)', color: 'var(--secondary)' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Validate
                  </button>
                  <button 
                    className="btn-primary" 
                    style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: '8px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `/workspace/${p.id}`;
                    }}
                  >
                    Join Team
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hub;
