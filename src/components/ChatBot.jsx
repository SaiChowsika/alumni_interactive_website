import React, { useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('questions');
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const answers = {
    registration: {
      title: "Registration Process",
      content: "Registration is simple and free! Click on 'Register' in the top navigation, select your appropriate role, fill in your details and Bingo! You can access your previleges according to your role. Hope this helps you."
    },
    events: {
      title: "Alumni Registratiion process",
      content: "Registration is simple and free! Click on 'Register' in the top navigation, select your role as 'Alumni', fill in your details, related information, verify your mail, verify your number and once submitted, wait for our admin to give access. Once you are approved, you would get a mail relating to it. After that, You can access your previleges. We hope as the evry alumni of our college you would bring out the best sessions. Looking forward to your contributions!"
    },
    networking: {
      title: "About the website",
      content: "The website is designed to facilitate connections between alumni and current students. It features a user-friendly interface for alumni to register, students to access resources and bring out the best sessions. Il also provoides the statistics of placements in our university. Together "
    },
    mentorship: {
      title: "Session Program Details",
      content: "The sessions conducted by alumni will be based on "
    },
    career: {
      title: "Career Services for Alumni",
      content: "Comprehensive career support including access to exclusive job postings, resume review and career counseling, interview preparation workshops, salary negotiation guidance, and professional development courses."
    }
  };

  const questions = [
   { key: "networking", text: "What is this website about?" },
    { key: "registration", text: "How do I register?" },
    { key: "events", text: "How do I resiter as an alumni?" },
    { key: "mentorship", text: "How does the sessions program work?" },
    { key: "career", text: "What career services are available?" }
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setCurrentView('questions');
      setSelectedQuestion(null);
    }
  };

  const showAnswer = (questionKey) => {
    setSelectedQuestion(questionKey);
    setCurrentView('answer');
  };

  const showQuestions = () => {
    setCurrentView('questions');
    setSelectedQuestion(null);
  };

  const selectedAnswer = selectedQuestion ? answers[selectedQuestion] : null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="bg-red-500 hover:bg-red-600 text-white w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center cursor-pointer"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L1 23l6.71-1.97C9.02 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V9h2v4z"/>
            <circle cx="12" cy="8" r="1.5" fill="white"/>
            <path d="M8.5 14.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5" stroke="white" strokeWidth="1.5" fill="none"/>
          </svg>
        )}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border">
          {/* Chat Header */}
          <div className="bg-red-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Alumni Assistant</h3>
                  <p className="text-xs opacity-90">Here to help you!</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:bg-white hover:bg-opacity-20 h-8 w-8 rounded flex items-center justify-center cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 max-h-96 overflow-y-auto">
            {currentView === 'questions' && (
              <div className="space-y-3">
                <div className="bg-gray-100 p-3 rounded-lg mb-4">
                  <p className="text-gray-700 text-sm">
                    👋 Hi! I'm here to help you with common questions about our alumni services. Click on any question below:
                  </p>
                </div>
                
                {questions.map((question) => (
                  <button
                    key={question.key}
                    onClick={() => showAnswer(question.key)}
                    className="w-full text-left p-3 bg-red-50 hover:bg-red-100 border border-red-200 text-gray-800 rounded transition-colors cursor-pointer"
                  >
                    {question.text}
                  </button>
                ))}
              </div>
            )}

            {currentView === 'answer' && selectedAnswer && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">{selectedAnswer.title}</h3>
                  <p className="text-gray-700 text-sm">{selectedAnswer.content}</p>
                </div>
                
                <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                  <p className="text-gray-700 text-sm flex items-start">
                    <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    I hope I have answered your query. For any other queries, click the below options:
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={showQuestions}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center cursor-pointer"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Other Questions
                  </button>
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded flex items-center justify-center cursor-pointer">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Contact Support
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;