import { CheckCircle2, Sparkles } from 'lucide-react';

interface SuccessPageProps {
  onBackToDashboard: () => void;
}

export function SuccessPage({ onBackToDashboard }: SuccessPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-6 rounded-full animate-bounce-slow relative">
            <CheckCircle2 className="w-20 h-20 text-green-600" />
            <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse-slow" />
            <Sparkles className="w-5 h-5 text-yellow-500 absolute -bottom-1 -left-1 animate-swing" />
          </div>
        </div>
        
        <h1 className="text-3xl mb-4 animate-slide-left">Vote Submitted Successfully!</h1>
        
        <p className="text-gray-600 mb-8 animate-slide-right">
          Thank you for participating in the college elections. Your vote has been recorded securely.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 animate-fade-in hover-lift">
          <p className="text-blue-800 text-sm">
            ✓ Your vote is anonymous and secure<br />
            ✓ You cannot change your vote once submitted<br />
            ✓ Results will be announced after voting closes
          </p>
        </div>

        <button
          onClick={onBackToDashboard}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-colors btn-ripple hover-lift"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}