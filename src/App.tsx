import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { StudentLogin } from './components/StudentLogin';
import { AdminLogin } from './components/AdminLogin';
import { StudentDashboard } from './components/StudentDashboard';
import { VotingPage } from './components/VotingPage';
import { SuccessPage } from './components/SuccessPage';
import { AdminDashboard } from './components/AdminDashboard';
import { ManageCandidates } from './components/ManageCandidates';
import { ResultsPage } from './components/ResultsPage';

export type UserType = 'student' | 'admin' | null;

export type Student = {
  rollNumber: string;
  email: string;
  name: string;
  hasVoted: boolean;
};

export type Candidate = {
  id: string;
  name: string;
  department: string;
  photo: string;
  votes: number;
  status: 'active' | 'inactive';
};

export type ElectionStatus = 'open' | 'closed';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('landing');
  const [userType, setUserType] = useState<UserType>(null);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  
  // Mock election status
  const [electionStatus, setElectionStatus] = useState<ElectionStatus>('open');
  
  // Mock candidates data
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      department: 'Computer Science',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      votes: 0,
      status: 'active'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      department: 'Electronics Engineering',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      votes: 0,
      status: 'active'
    },
    {
      id: '3',
      name: 'Amit Patel',
      department: 'Mechanical Engineering',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      votes: 0,
      status: 'active'
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      department: 'Civil Engineering',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      votes: 0,
      status: 'active'
    }
  ]);

  const handleStudentLogin = (rollNumber: string) => {
    // Mock student data
    const student: Student = {
      rollNumber,
      email: `${rollNumber}@college.edu`,
      name: 'Student Name',
      hasVoted: false
    };
    setCurrentStudent(student);
    setUserType('student');
    setCurrentPage('student-dashboard');
  };

  const handleAdminLogin = () => {
    setUserType('admin');
    setCurrentPage('admin-dashboard');
  };

  const handleVote = (candidateId: string) => {
    setCandidates(prev =>
      prev.map(c => c.id === candidateId ? { ...c, votes: c.votes + 1 } : c)
    );
    if (currentStudent) {
      setCurrentStudent({ ...currentStudent, hasVoted: true });
    }
    setCurrentPage('success');
  };

  const handleLogout = () => {
    setUserType(null);
    setCurrentStudent(null);
    setCurrentPage('landing');
  };

  const handleUpdateCandidates = (updatedCandidates: Candidate[]) => {
    setCandidates(updatedCandidates);
  };

  const handleToggleElection = () => {
    setElectionStatus(prev => prev === 'open' ? 'closed' : 'open');
  };

  return (
    <div className="min-h-screen dark-starry-bg relative overflow-hidden">
      {/* Glowing Orbs */}
      <div className="dark-floating-orb orb-blue" style={{ width: '400px', height: '400px', top: '10%', left: '10%' }}></div>
      <div className="dark-floating-orb orb-purple" style={{ width: '350px', height: '350px', top: '60%', right: '15%', animationDelay: '2s' }}></div>
      <div className="dark-floating-orb orb-cyan" style={{ width: '300px', height: '300px', bottom: '20%', left: '20%', animationDelay: '4s' }}></div>

      {/* Twinkling Stars - Multiple Layers */}
      {/* Tiny Stars */}
      <div className="star star-tiny" style={{ top: '5%', left: '10%', animationDelay: '0s' }}></div>
      <div className="star star-tiny" style={{ top: '15%', left: '25%', animationDelay: '0.5s' }}></div>
      <div className="star star-tiny" style={{ top: '8%', left: '45%', animationDelay: '1s' }}></div>
      <div className="star star-tiny" style={{ top: '20%', left: '60%', animationDelay: '1.5s' }}></div>
      <div className="star star-tiny" style={{ top: '12%', left: '80%', animationDelay: '2s' }}></div>
      <div className="star star-tiny" style={{ top: '35%', left: '15%', animationDelay: '0.3s' }}></div>
      <div className="star star-tiny" style={{ top: '40%', left: '35%', animationDelay: '0.8s' }}></div>
      <div className="star star-tiny" style={{ top: '38%', left: '55%', animationDelay: '1.3s' }}></div>
      <div className="star star-tiny" style={{ top: '42%', left: '75%', animationDelay: '1.8s' }}></div>
      <div className="star star-tiny" style={{ top: '45%', left: '90%', animationDelay: '2.3s' }}></div>
      <div className="star star-tiny" style={{ top: '65%', left: '20%', animationDelay: '0.6s' }}></div>
      <div className="star star-tiny" style={{ top: '70%', left: '40%', animationDelay: '1.1s' }}></div>
      <div className="star star-tiny" style={{ top: '68%', left: '65%', animationDelay: '1.6s' }}></div>
      <div className="star star-tiny" style={{ top: '75%', left: '85%', animationDelay: '2.1s' }}></div>
      <div className="star star-tiny" style={{ top: '85%', left: '12%', animationDelay: '0.4s' }}></div>
      <div className="star star-tiny" style={{ top: '90%', left: '30%', animationDelay: '0.9s' }}></div>
      <div className="star star-tiny" style={{ top: '88%', left: '50%', animationDelay: '1.4s' }}></div>
      <div className="star star-tiny" style={{ top: '92%', left: '70%', animationDelay: '1.9s' }}></div>

      {/* Small Stars */}
      <div className="star star-small" style={{ top: '10%', left: '18%', animationDelay: '0.2s' }}></div>
      <div className="star star-small" style={{ top: '22%', left: '40%', animationDelay: '0.7s' }}></div>
      <div className="star star-small" style={{ top: '18%', left: '70%', animationDelay: '1.2s' }}></div>
      <div className="star star-small" style={{ top: '48%', left: '22%', animationDelay: '0.5s' }}></div>
      <div className="star star-small" style={{ top: '52%', left: '48%', animationDelay: '1.0s' }}></div>
      <div className="star star-small" style={{ top: '50%', left: '82%', animationDelay: '1.5s' }}></div>
      <div className="star star-small" style={{ top: '78%', left: '28%', animationDelay: '0.3s' }}></div>
      <div className="star star-small" style={{ top: '82%', left: '58%', animationDelay: '0.8s' }}></div>

      {/* Medium Stars */}
      <div className="star star-medium" style={{ top: '12%', left: '32%', animationDelay: '0.4s' }}></div>
      <div className="star star-medium" style={{ top: '25%', left: '65%', animationDelay: '0.9s' }}></div>
      <div className="star star-medium" style={{ top: '55%', left: '10%', animationDelay: '1.4s' }}></div>
      <div className="star star-medium" style={{ top: '72%', left: '72%', animationDelay: '1.9s' }}></div>

      {/* Sparkles ✨ */}
      <div className="sparkle" style={{ top: '15%', left: '50%', animationDelay: '0s' }}>✨</div>
      <div className="sparkle" style={{ top: '30%', left: '85%', animationDelay: '1s' }}>✨</div>
      <div className="sparkle" style={{ top: '60%', left: '25%', animationDelay: '2s' }}>⭐</div>
      <div className="sparkle" style={{ top: '80%', left: '60%', animationDelay: '1.5s' }}>✨</div>
      <div className="sparkle" style={{ top: '45%', left: '92%', animationDelay: '0.5s' }}>⭐</div>
      <div className="sparkle" style={{ top: '25%', left: '12%', animationDelay: '2.5s' }}>✨</div>

      {/* Floating Sparkles */}
      <div className="sparkle-float" style={{ bottom: '10%', left: '15%', animationDelay: '0s', fontSize: '1.5rem' }}>✨</div>
      <div className="sparkle-float" style={{ bottom: '20%', left: '40%', animationDelay: '1s', fontSize: '1.2rem' }}>⭐</div>
      <div className="sparkle-float" style={{ bottom: '15%', left: '70%', animationDelay: '2s', fontSize: '1.3rem' }}>✨</div>
      <div className="sparkle-float" style={{ bottom: '25%', left: '85%', animationDelay: '1.5s', fontSize: '1rem' }}>⭐</div>

      {/* Shooting Stars */}
      <div className="shooting-star" style={{ top: '10%', right: '20%', animationDelay: '3s' }}></div>
      <div className="shooting-star" style={{ top: '30%', right: '50%', animationDelay: '7s' }}></div>
      <div className="shooting-star" style={{ top: '60%', right: '80%', animationDelay: '5s' }}></div>

      {/* Constellation Lines */}
      <div className="constellation-line" style={{ top: '20%', left: '15%', width: '100px', transform: 'rotate(25deg)' }}></div>
      <div className="constellation-line" style={{ top: '50%', right: '20%', width: '80px', transform: 'rotate(-15deg)' }}></div>
      <div className="constellation-line" style={{ bottom: '30%', left: '40%', width: '120px', transform: 'rotate(40deg)' }}></div>

      {/* Main Content */}
      <div className="relative z-10">
        {currentPage === 'landing' && (
          <LandingPage
            onStudentLogin={() => setCurrentPage('student-login')}
            onAdminLogin={() => setCurrentPage('admin-login')}
          />
        )}
        
        {currentPage === 'student-login' && (
          <StudentLogin
            onLogin={handleStudentLogin}
            onBack={() => setCurrentPage('landing')}
          />
        )}
        
        {currentPage === 'admin-login' && (
          <AdminLogin
            onLogin={handleAdminLogin}
            onBack={() => setCurrentPage('landing')}
          />
        )}
        
        {currentPage === 'student-dashboard' && currentStudent && (
          <StudentDashboard
            student={currentStudent}
            electionStatus={electionStatus}
            onVoteNow={() => setCurrentPage('voting')}
            onLogout={handleLogout}
          />
        )}
        
        {currentPage === 'voting' && currentStudent && (
          <VotingPage
            candidates={candidates.filter(c => c.status === 'active')}
            onSubmitVote={handleVote}
            onBack={() => setCurrentPage('student-dashboard')}
            hasVoted={currentStudent.hasVoted}
          />
        )}
        
        {currentPage === 'success' && (
          <SuccessPage onBackToDashboard={() => setCurrentPage('student-dashboard')} />
        )}
        
        {currentPage === 'admin-dashboard' && (
          <AdminDashboard
            electionStatus={electionStatus}
            onManageCandidates={() => setCurrentPage('manage-candidates')}
            onViewResults={() => setCurrentPage('results')}
            onToggleElection={handleToggleElection}
            onLogout={handleLogout}
            totalVotes={candidates.reduce((sum, c) => sum + c.votes, 0)}
            totalCandidates={candidates.filter(c => c.status === 'active').length}
          />
        )}
        
        {currentPage === 'manage-candidates' && (
          <ManageCandidates
            candidates={candidates}
            onUpdateCandidates={handleUpdateCandidates}
            onBack={() => setCurrentPage('admin-dashboard')}
          />
        )}
        
        {currentPage === 'results' && (
          <ResultsPage
            candidates={candidates}
            onBack={() => setCurrentPage('admin-dashboard')}
          />
        )}
      </div>
    </div>
  );
}

export default App;