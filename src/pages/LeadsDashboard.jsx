import { useState, useEffect, useMemo, useCallback } from 'react';
import { RefreshCw, Download, Phone, Mail } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './LeadsDashboard.css';

const STATUS_OPTIONS = ['new', 'contacted', 'trial', 'paid', 'dropped'];

const STATUS_COLORS = {
  new: '#3B82F6',
  contacted: '#F59E0B',
  trial: '#8B5CF6',
  paid: '#16A34A',
  dropped: '#EF4444',
};

function timeAgo(dateString) {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function toCSV(rows) {
  const headers = ['id', 'name', 'phone', 'email', 'interest', 'source', 'page', 'utm_source', 'utm_medium', 'utm_campaign', 'status', 'notes', 'created_at'];
  const escape = (val) => {
    if (val === null || val === undefined) return '';
    const str = String(val);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };
  const lines = [headers.join(',')];
  rows.forEach((row) => {
    lines.push(headers.map((h) => escape(row[h])).join(','));
  });
  return lines.join('\n');
}

const LeadsDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');

  const fetchLeads = useCallback(async () => {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leads:', error);
    } else {
      setLeads(data || []);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchLeads();
      setLoading(false);
    })();
  }, [fetchLeads]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLeads();
    setRefreshing(false);
  };

  const stats = useMemo(() => {
    const counts = { new: 0, contacted: 0, trial: 0, paid: 0, dropped: 0 };
    leads.forEach((lead) => {
      if (counts[lead.status] !== undefined) counts[lead.status] += 1;
    });
    return counts;
  }, [leads]);

  const filteredLeads = useMemo(() => {
    if (!statusFilter) return leads;
    return leads.filter((lead) => lead.status === statusFilter);
  }, [leads, statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead)));
    const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);
    if (error) console.error('Error updating status:', error);
  };

  const startEditingNotes = (lead) => {
    setEditingNotesId(lead.id);
    setNotesDraft(lead.notes || '');
  };

  const saveNotes = async (id) => {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, notes: notesDraft } : lead)));
    setEditingNotesId(null);
    const { error } = await supabase.from('leads').update({ notes: notesDraft }).eq('id', id);
    if (error) console.error('Error updating notes:', error);
  };

  const handleNotesKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveNotes(id);
    }
  };

  const handleExportCSV = () => {
    const csv = toCSV(filteredLeads);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="leads-dashboard page-transition-enter-active">
        <div className="container">
          <div className="leads-loading">Loading leads...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="leads-dashboard page-transition-enter-active">
      <div className="container">
        <div className="leads-header">
          <h1>Leads Dashboard</h1>
          <div className="leads-actions">
            <button className="btn btn-outline" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw size={16} className={refreshing ? 'spin' : ''} /> Refresh
            </button>
            <button className="btn btn-primary" onClick={handleExportCSV}>
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        <div className="leads-stats">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              className={`stat-card ${statusFilter === status ? 'active' : ''}`}
              style={{ '--stat-color': STATUS_COLORS[status] }}
              onClick={() => setStatusFilter(statusFilter === status ? null : status)}
            >
              <span className="stat-count">{stats[status]}</span>
              <span className="stat-label">{status}</span>
            </button>
          ))}
        </div>

        <div className="leads-table-card">
          <div className="leads-table-scroll">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Interest</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="leads-empty">No leads found.</td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="lead-name">{lead.name}</td>
                      <td>
                        <div className="lead-contact">
                          {lead.phone && (
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="lead-contact-link"
                            >
                              <Phone size={14} /> {lead.phone}
                            </a>
                          )}
                          {lead.email && (
                            <a href={`mailto:${lead.email}`} className="lead-contact-link">
                              <Mail size={14} /> {lead.email}
                            </a>
                          )}
                        </div>
                      </td>
                      <td>{lead.interest || '—'}</td>
                      <td>
                        <div className="lead-source">
                          <span>{lead.utm_source || lead.source || 'website'}</span>
                          {lead.page && <span className="lead-page">{lead.page}</span>}
                        </div>
                      </td>
                      <td>
                        <select
                          className="status-select"
                          value={lead.status}
                          style={{ '--status-color': STATUS_COLORS[lead.status] || STATUS_COLORS.new }}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td className="lead-notes-cell">
                        {editingNotesId === lead.id ? (
                          <div className="notes-edit">
                            <input
                              type="text"
                              value={notesDraft}
                              autoFocus
                              onChange={(e) => setNotesDraft(e.target.value)}
                              onKeyDown={(e) => handleNotesKeyDown(e, lead.id)}
                              onBlur={() => saveNotes(lead.id)}
                            />
                          </div>
                        ) : (
                          <div className="notes-display" onClick={() => startEditingNotes(lead)}>
                            {lead.notes || <span className="notes-placeholder">Add note...</span>}
                          </div>
                        )}
                      </td>
                      <td className="lead-when">{timeAgo(lead.created_at)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsDashboard;
