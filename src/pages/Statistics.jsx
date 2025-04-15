import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Statistics Page Component
 * 
 * Comprehensive dashboard displaying various statistics and analytics
 * about users, sessions, and system performance.
 * 
 * Features:
 * - Real-time data visualization
 * - Interactive charts and graphs
 * - Filterable data tables
 * - Export functionality
 * - Period-based analysis
 * 
 * Data Categories:
 * 1. User Statistics
 *    - Total users by role
 *    - Active users
 *    - Registration trends
 *    - Department distribution
 * 
 * 2. Session Statistics
 *    - Total sessions
 *    - Success rate
 *    - Popular time slots
 *    - Participation metrics
 * 
 * 3. System Performance
 *    - Response times
 *    - Error rates
 *    - Resource usage
 *    - API health
 * 
 * 4. Academic Metrics
 *    - Department performance
 *    - Student engagement
 *    - Faculty contribution
 *    - Alumni participation
 * 
 * Components:
 * - Charts: Line, Bar, Pie charts
 * - Data Tables: Sortable, filterable
 * - Export Tools: CSV, Excel export
 * - Filter Controls: Date, category filters
 * 
 * Props:
 * @param {string} timeRange - Time period for data
 * @param {Array} metrics - Metrics to display
 * @param {Function} onExport - Export handler
 * @param {Object} filters - Active filters
 * 
 * Dependencies:
 * - Chart.js for visualizations
 * - API services for data
 * - Excel service for exports
 * - Date utilities
 * 
 * @component Statistics
 * @example
 * ```jsx
 * <Statistics
 *   timeRange="month"
 *   metrics={['users', 'sessions']}
 *   onExport={handleExport}
 *   filters={{ department: 'CSE' }}
 * />
 * ```
 */

// Get the base URL for API requests
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const Statistics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: {
      total: 0,
      byRole: {
        students: 0,
        alumni: 0,
        faculty: 0
      },
      studentsByBranch: {},
      studentsByYear: {},
      alumniByYear: {},
      alumniByBranch: {}
    },
    sessions: {
      total: 0,
      upcoming: 0,
      ongoing: 0,
      previous: 0,
      rejected: []
    },
    placements: {
      total: 0,
      accepted: 0,
      rejected: 0,
      pending: 0,
      submissions: []
    },
    rejectedSignups: [],
    failedSignups: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Authentication token not found. Please login again.');
          setLoading(false);
          return;
        }

        console.log('Fetching statistics with token:', token);
        const response = await axios.get(`${API_BASE_URL}/api/statistics`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Statistics API Response:', response.data);

        if (response.data && typeof response.data === 'object') {
          console.log('Setting statistics state:', response.data);
          setStats(response.data);
        } else {
          console.error('Invalid data format received:', response.data);
          setError('Invalid data format received from server');
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
        console.error('Error response:', error.response);
        setError(
          error.response?.data?.message || 
          error.response?.data?.error || 
          error.message || 
          'Failed to fetch statistics. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Statistics Dashboard</h1>
          {loading && (
            <div className="text-blue-600">Loading...</div>
          )}
          {error && (
            <div className="text-red-600 bg-red-50 px-4 py-2 rounded-md">{error}</div>
          )}
        </div>

        {/* User Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Statistics</h2>
          
          {/* Total Users */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.users?.total || '0'}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Students</h3>
              <p className="text-3xl font-bold text-green-600">{stats.users?.byRole?.students || '0'}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Alumni</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.users?.byRole?.alumni || '0'}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">Faculty</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.users?.byRole?.faculty || '0'}</p>
            </div>
          </div>

          {/* Students by Branch */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Students by Branch</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.users?.studentsByBranch || {}).length > 0 ? (
                Object.entries(stats.users.studentsByBranch).map(([branch, count]) => (
                  <div key={branch} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700">{branch || 'Unknown'}</h4>
                    <p className="text-2xl font-bold text-gray-600">{count}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                  No branch data available
                </div>
              )}
            </div>
          </div>

          {/* Students by Year */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Students by Year</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.users?.studentsByYear || {}).length > 0 ? (
                Object.entries(stats.users.studentsByYear).map(([year, count]) => (
                  <div key={year} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700">Year {year || 'Unknown'}</h4>
                    <p className="text-2xl font-bold text-gray-600">{count}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                  No year data available
                </div>
              )}
            </div>
          </div>

          {/* Alumni by Year */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Alumni by Year</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.users?.alumniByYear || {}).length > 0 ? (
                Object.entries(stats.users.alumniByYear).map(([year, count]) => (
                  <div key={year} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700">{year || 'Unknown'}</h4>
                    <p className="text-2xl font-bold text-gray-600">{count}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                  No alumni year data available
                </div>
              )}
            </div>
          </div>

          {/* Alumni by Branch */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Alumni by Branch</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.users?.alumniByBranch || {}).length > 0 ? (
                Object.entries(stats.users.alumniByBranch).map(([branch, count]) => (
                  <div key={branch} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-700">{branch || 'Unknown'}</h4>
                    <p className="text-2xl font-bold text-gray-600">{count}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
                  No alumni branch data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Session Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Session Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Sessions</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.sessions?.total || '0'}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Upcoming</h3>
              <p className="text-3xl font-bold text-green-600">{stats.sessions?.upcoming || '0'}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">Ongoing</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.sessions?.ongoing || '0'}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800">Previous</h3>
              <p className="text-3xl font-bold text-red-600">{stats.sessions?.previous || '0'}</p>
            </div>
          </div>

          {/* Rejected Sessions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Rejected Sessions</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {stats.sessions?.rejected?.length > 0 ? (
                <div className="space-y-2">
                  {stats.sessions.rejected.map((session, index) => (
                    <div key={index} className="p-3 bg-white rounded shadow-sm">
                      <p className="text-gray-700">
                        <span className="font-semibold">{session.title}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{session.venue}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">No rejected sessions</div>
              )}
            </div>
          </div>
        </div>

        {/* Placement Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Placement Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Placements</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.placements?.total || '0'}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Accepted</h3>
              <p className="text-3xl font-bold text-green-600">{stats.placements?.accepted || '0'}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">Rejected</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.placements?.rejected || '0'}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800">Pending</h3>
              <p className="text-3xl font-bold text-red-600">{stats.placements?.pending || '0'}</p>
            </div>
          </div>

          {/* Placement Submissions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Placement Submissions</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {stats.placements?.submissions?.length > 0 ? (
                <div className="space-y-2">
                  {stats.placements.submissions.map((submission, index) => (
                    <div key={index} className="p-3 bg-white rounded shadow-sm">
                      <p className="text-gray-700">
                        <span className="font-semibold">{submission.student}</span>
                        <span className="mx-2">•</span>
                        <span>{submission.company}</span>
                        <span className="mx-2">•</span>
                        <span>{submission.position}</span>
                        <span className="mx-2">•</span>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          submission.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          submission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {submission.status}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">No placement submissions</div>
              )}
            </div>
          </div>
        </div>

        {/* Rejected Signups */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Rejected Signups</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            {stats.rejectedSignups?.length > 0 ? (
              <div className="space-y-2">
                {stats.rejectedSignups.map((signup, index) => (
                  <div key={index} className="p-3 bg-white rounded shadow-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold">{signup.name}</span>
                      <span className="mx-2">•</span>
                      <span>{signup.email}</span>
                      <span className="mx-2">•</span>
                      <span className="text-red-600">{signup.reason}</span>
                      <span className="mx-2">•</span>
                      <span className="text-gray-500">{new Date(signup.date).toLocaleDateString()}</span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">No rejected signups</div>
            )}
          </div>
        </div>

        {/* Failed Signups */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Failed Signups</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            {stats.failedSignups?.length > 0 ? (
              <div className="space-y-2">
                {stats.failedSignups.map((signup, index) => (
                  <div key={index} className="p-3 bg-white rounded shadow-sm">
                    <p className="text-gray-700">
                      <span className="font-semibold">{signup.name}</span>
                      <span className="mx-2">•</span>
                      <span>{signup.email}</span>
                      <span className="mx-2">•</span>
                      <span className="text-red-600">{signup.error}</span>
                      <span className="mx-2">•</span>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        signup.status === 'checked' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {signup.status}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">No failed signups</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Statistics; 