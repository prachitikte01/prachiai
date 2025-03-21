import React, { useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Loading spinner

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle API request
  async function generateAnswer() {
    setLoading(true);
    setError('');
    setAnswer('Loading...');

    // Input validation
    if (!question.trim()) {
      setError('Please enter a question.');
      setAnswer('');
      setLoading(false);
      return;
    }

    try {
      const response = await axios({
        url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyALx_rQCk-Mmk9DRfdIB4-jughu_WuhFos', 
        method: 'POST',
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      if (response.data && response.data.candidates && response.data.candidates[0]) {
        setAnswer(response.data.candidates[0].content.parts[0].text);
      } else {
        setAnswer('No valid response received.');
      }
    } catch (err) {
      setError('An error occurred while generating the answer. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen bg-gradient-to-r from-purple-600 to-blue-500 dark:from-blue-700 dark:to-purple-600 flex items-center justify-center">
      <div className="bg-zinc-800 dark:bg-zinc-900 p-8 rounded-lg shadow-xl max-w-xl w-full">
        <h1 className="text-4xl font-bold text-center text-white mb-6">Prachi AI</h1>

        <div className="mb-6">
          <textarea
            rows={8}
            cols={60}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="bg-zinc-700 dark:bg-zinc-800 text-white w-full rounded-lg p-4 text-xl placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
            placeholder="Ask your question here..."
          />
        </div>

        <div className="flex justify-center mb-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={generateAnswer}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader color="#ffffff" loading={loading} size={24} />
            ) : (
              'Generate'
            )}
          </button>
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Display Answer */}
        <div>
          <div className="bg-zinc-700 dark:bg-zinc-800 p-4 rounded-lg text-white">
            {answer && <pre className="whitespace-pre-wrap break-words">{answer}</pre>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

