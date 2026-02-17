import { ArrowLeft, Download, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { Candidate } from '../App';

interface ResultsPageProps {
  candidates: Candidate[];
  onBack: () => void;
}

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export function ResultsPage({ candidates, onBack }: ResultsPageProps) {
  const chartData = candidates
    .filter(c => c.status === 'active')
    .map(c => ({
      name: c.name,
      votes: c.votes,
      department: c.department
    }))
    .sort((a, b) => b.votes - a.votes);

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  const handleExportCSV = () => {
    const csvContent = [
      ['Candidate Name', 'Department', 'Votes', 'Percentage'],
      ...chartData.map(d => [
        d.name,
        d.department,
        d.votes.toString(),
        totalVotes > 0 ? `${((d.votes / totalVotes) * 100).toFixed(2)}%` : '0%'
      ])
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'election_results.csv';
    a.click();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
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
              <h1 className="text-3xl mb-1">Election Results</h1>
              <p className="text-gray-600">Voting statistics and analytics</p>
            </div>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-4 rounded-full">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Votes Cast</p>
                <p className="text-3xl">{totalVotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div>
              <p className="text-gray-600 text-sm mb-2">Leading Candidate</p>
              {chartData.length > 0 && chartData[0].votes > 0 ? (
                <>
                  <p className="text-xl">{chartData[0].name}</p>
                  <p className="text-gray-600">{chartData[0].votes} votes</p>
                </>
              ) : (
                <p className="text-gray-400">No votes yet</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div>
              <p className="text-gray-600 text-sm mb-2">Active Candidates</p>
              <p className="text-3xl">{candidates.filter(c => c.status === 'active').length}</p>
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl mb-6">Vote Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart and Table */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl mb-6">Vote Share</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="votes"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl mb-6">Detailed Results</h2>
            <div className="space-y-4">
              {chartData.map((candidate, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-lg">{candidate.name}</p>
                      <p className="text-sm text-gray-600">{candidate.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl">{candidate.votes}</p>
                      <p className="text-sm text-gray-600">
                        {totalVotes > 0 ? `${((candidate.votes / totalVotes) * 100).toFixed(1)}%` : '0%'}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{
                        width: totalVotes > 0 ? `${(candidate.votes / totalVotes) * 100}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}