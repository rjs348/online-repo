import { GraduationCap, User, Shield, Clock } from 'lucide-react';

interface LandingPageProps {
  onStudentLogin: () => void;
  onAdminLogin: () => void;
}

export function LandingPage({ onStudentLogin, onAdminLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 text-white p-6 rounded-full animate-bounce-slow">
            <GraduationCap className="w-16 h-16" />
          </div>
        </div>
        <h1 className="text-4xl mb-4 text-white">National Institute of Technology</h1>
        <h2 className="text-2xl text-blue-200 mb-2">Online Voting System</h2>
        <p className="text-blue-100 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 animate-tick-tock" />
          College Elections 2026
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl w-full">
        <button
          onClick={onStudentLogin}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-purple-500 hover-lift animate-slide-left btn-ripple"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 p-4 rounded-full animate-float">
              <User className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h3 className="text-xl mb-2">Student Login</h3>
          <p className="text-gray-600 text-sm">Cast your vote for college elections</p>
        </button>

        <button
          onClick={onAdminLogin}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-purple-500 hover-lift animate-slide-right btn-ripple"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 p-4 rounded-full animate-pulse-slow">
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <h3 className="text-xl mb-2">Admin Login</h3>
          <p className="text-gray-600 text-sm">Manage elections and view results</p>
        </button>
      </div>

      <div className="mt-12 text-center text-sm text-blue-200 animate-fade-in">
        <p>🔒 Secure • Fair • Transparent</p>
      </div>
    </div>
  );
}