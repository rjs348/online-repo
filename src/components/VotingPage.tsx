import { useState } from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import type { Candidate } from '../App';

interface VotingPageProps {
  candidates: Candidate[];
  onSubmitVote: (candidateId: string) => void;
  onBack: () => void;
  hasVoted: boolean;
}

export function VotingPage({ candidates, onSubmitVote, onBack, hasVoted }: VotingPageProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = () => {
    if (selectedCandidate && !hasVoted) {
      setShowConfirmation(true);
    }
  };

  const confirmVote = () => {
    if (selectedCandidate) {
      onSubmitVote(selectedCandidate);
    }
  };

  if (showConfirmation) {
    const candidate = candidates.find(c => c.id === selectedCandidate);
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full animate-fade-in">
          <div className="text-center">
            <div className="bg-yellow-100 p-4 rounded-full inline-block mb-4 animate-pulse-slow">
              <CheckCircle className="w-12 h-12 text-yellow-600" />
            </div>
            <h2 className="text-2xl mb-4">Confirm Your Vote</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to vote for:
            </p>
            <div className="bg-blue-50 p-4 rounded-xl mb-6 animate-bounce-slow">
              <p className="text-xl">{candidate?.name}</p>
              <p className="text-gray-600">{candidate?.department}</p>
            </div>
            <p className="text-sm text-red-600 mb-6 animate-swing">
              ⚠️ This action cannot be undone
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors btn-ripple"
              >
                Cancel
              </button>
              <button
                onClick={confirmVote}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors btn-ripple"
              >
                Confirm Vote
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-fade-in">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl mb-2">Cast Your Vote</h1>
            <p className="text-gray-600">Select one candidate from the list below</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {candidates.map((candidate, index) => (
            <div
              key={candidate.id}
              onClick={() => !hasVoted && setSelectedCandidate(candidate.id)}
              className={`flex items-center gap-4 p-4 cursor-pointer transition-all border-b last:border-b-0 hover-lift animate-fade-in ${
                selectedCandidate === candidate.id
                  ? 'bg-blue-50 border-l-4 border-l-blue-600'
                  : 'hover:bg-gray-50'
              } ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={candidate.photo}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg mb-1">{candidate.name}</h3>
                <p className="text-gray-600 text-sm">{candidate.department}</p>
              </div>
              
              <div className="flex-shrink-0">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedCandidate === candidate.id
                      ? 'border-blue-600 bg-blue-600 animate-pulse-slow'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedCandidate === candidate.id && (
                    <div className="w-3 h-3 bg-white rounded-full animate-bounce-slow" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {!hasVoted && (
          <button
            onClick={handleSubmit}
            disabled={!selectedCandidate}
            className={`w-full py-4 rounded-lg text-lg transition-all btn-ripple ${
              selectedCandidate
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg hover-lift animate-pulse-slow'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Vote
          </button>
        )}
      </div>
    </div>
  );
}