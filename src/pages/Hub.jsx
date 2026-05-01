import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp, Users, Clock, Target, Plus, ChevronRight } from 'lucide-react';

const Hub = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const problems = [
    {
      id: 1,
      title: "Decentralized Carbon Credit Marketplace",
      domain: "Sustainability",
      impact: "High",
      difficulty: "Advanced",
      skills: ["Blockchain", "React", "Smart Contracts"],
      team: { current: 2, total: 5 },
      status: "Ideation",
      desc: "Creating a transparent way for small-scale farmers to trade carbon offsets directly with corporations."
    },
    {
      id: 2,
      title: "AI-Powered Mental Health Companion",
      domain: "HealthTech",
      impact: "Life-changing",
      difficulty: "Intermediate",
      skills: ["Python", "NLP", "UX Design"],
      team: { current: 3, total: 4 },
      status: "Prototype",
      desc: "An empathetic AI that provides immediate support for people in high-stress environments."
    },
    {
      id: 3,
      title: "Smart Budgeting for Gen Z",
      domain: "FinTech",
      impact: "High",
      difficulty: "Intermediate",
      skills: ["React Native", "Firebase", "Financial API"],
      team: { current: 1, total: 4 },
      status: "Ideation",
      desc: "A gamified financial management app that helps young adults save and invest effortlessly."
    },
    {
      id: 4,
      title: "Edge AI for Predictive Maintenance",
      domain: "AI/ML",
      impact: "High",
      difficulty: "Advanced",
      skills: ["PyTorch", "C++", "IoT"],
      team: { current: 2, total: 3 },
      status: "Ideation",
      desc: "Real-time failure prediction for manufacturing lines using low-power edge devices."
    },
    {
      id: 5,
      title: "VR-Based Language Immersion",
      domain: "Education",
      impact: "Medium",
      difficulty: "Intermediate",
      skills: ["Unity", "C#", "Oculus SDK"],
      team: { current: 4, total: 6 },
      status: "Prototype",
      desc: "Virtual reality environments where students can practice language skills in realistic scenarios."
    },
    {
      id: 6,
      title: "Plastic Waste Tracking System",
      domain: "Sustainability",
      impact: "Critical",
      difficulty: "Intermediate",
      skills: ["React", "Node.js", "GIS"],
      team: { current: 1, total: 2 },
      status: "Validation",
      desc: "End-to-end tracking of industrial plastic waste to ensure 100% recycling compliance."
    }
  ];

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
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search problems..."
              style={{ 
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '12px 12px 12px 40px', color: 'white', width: '300px'
              }}
            />
          </div>
          <button className="btn-primary">
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
              padding: '8px 20px', borderRadius: '12px', border: '1px solid var(--border)',
              background: activeFilter === filter ? 'var(--primary)' : 'var(--bg-surface)',
              color: 'white', cursor: 'pointer', transition: 'var(--transition)',
              whiteSpace: 'nowrap'
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid-auto">
        {filteredProblems.map((p, i) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            layout
            className="glass-card"
            style={{ padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative' }}
          >
            {p.id === 1 && (
              <div style={{ position: 'absolute', top: '-12px', right: '12px', background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Target size={12} /> 95% Match
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-info">{p.domain}</span>
              <div style={{ display: 'flex', gap: '4px', color: 'var(--secondary)' }}>
                <TrendingUp size={16} />
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{p.impact} Impact</span>
              </div>
            </div>
            
            <h3 style={{ marginBottom: '12px', lineHeight: 1.3 }}>{p.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', flex: 1 }}>{p.desc}</p>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '8px' }}>Required Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {p.skills.map(s => <span key={s} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem' }}>{s}</span>)}
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} color="var(--text-muted)" />
                <span style={{ fontSize: '0.85rem' }}>{p.team.current}/{p.team.total}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  className="btn-outline" 
                  style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px', border: '1px solid var(--secondary)', color: 'var(--secondary)' }}
                >
                  Validate
                </button>
                <button 
                  className="btn-primary" 
                  style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '8px' }}
                  onClick={() => window.location.href = `/workspace/${p.id}`}
                >
                  Join
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Hub;
