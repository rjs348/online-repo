import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Edit2 } from 'lucide-react';
import type { Candidate } from '../App';

interface ManageCandidatesProps {
  candidates: Candidate[];
  onUpdateCandidates: (candidates: Candidate[]) => void;
  onBack: () => void;
}

export function ManageCandidates({ candidates, onUpdateCandidates, onBack }: ManageCandidatesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    photo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Edit existing candidate
      onUpdateCandidates(
        candidates.map(c =>
          c.id === editingId
            ? { ...c, name: formData.name, department: formData.department, photo: formData.photo }
            : c
        )
      );
      setEditingId(null);
    } else {
      // Add new candidate
      const newCandidate: Candidate = {
        id: Date.now().toString(),
        name: formData.name,
        department: formData.department,
        photo: formData.photo || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        votes: 0,
        status: 'active'
      };
      onUpdateCandidates([...candidates, newCandidate]);
      setIsAdding(false);
    }
    setFormData({ name: '', department: '', photo: '' });
  };

  const handleEdit = (candidate: Candidate) => {
    setEditingId(candidate.id);
    setFormData({
      name: candidate.name,
      department: candidate.department,
      photo: candidate.photo
    });
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this candidate?')) {
      onUpdateCandidates(candidates.filter(c => c.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    onUpdateCandidates(
      candidates.map(c =>
        c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
      )
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl mb-1">Manage Candidates</h1>
              <p className="text-gray-600">Add, edit, or remove candidates</p>
            </div>
            {!isAdding && (
              <button
                onClick={() => {
                  setIsAdding(true);
                  setEditingId(null);
                  setFormData({ name: '', department: '', photo: '' });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Candidate
              </button>
            )}
          </div>
        </div>

        {/* Add/Edit Form */}
        {isAdding && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl mb-4">
              {editingId ? 'Edit Candidate' : 'Add New Candidate'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700">
                  Photo URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({ name: '', department: '', photo: '' });
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors"
                >
                  {editingId ? 'Update' : 'Add'} Candidate
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Candidates List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                candidate.status === 'inactive' ? 'opacity-60' : ''
              }`}
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-1">{candidate.name}</h3>
                <p className="text-gray-600 mb-4">{candidate.department}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      candidate.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {candidate.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(candidate)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(candidate.id)}
                    className={`flex-1 px-3 py-2 rounded-lg transition-colors ${
                      candidate.status === 'active'
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {candidate.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(candidate.id)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}