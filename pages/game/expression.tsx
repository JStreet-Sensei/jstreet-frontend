import React, { useState, useEffect } from 'react';
import { getFetchBackendURL } from '@/utils/utils-data';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface ContentItem {
  content_id: number;
  japanese_slang: string;
  english_slang: string;
  formal_version: string;
  description: string;
}

const ExpressionPage: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [isLearning, setIsLearning] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userInfo, setUserInfo] = useState<number>();

  const { data: session, status } = useSession({ required: true });

  // get user info
  useEffect(() => {
    getSession().then((session) => {
      setUserInfo(session?.user.pk);
    });
  }, []);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          // const response = await fetch('http://localhost:8000/api/content');
          const response = await fetch(getFetchBackendURL(`/api/content-unlearned/${session?.user.pk}/`));
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: ContentItem[] = await response.json();
          setContent(data);
        } catch (error) {
          console.error('Error fetching content:', error);
        }
      };
      fetchData();
    }
  }, [status]);

  useEffect(() => {
    if (currentIndex === content.length - 1) {
      notifyLastContent()
    }
  }, [currentIndex])

  const handleStartLearning = () => {
    setIsLearning(true);
  };

  const handleNextContent = async () => {
    if (content.length > 0) {
      // Prepare data to be sent
      const currentContentId = content[currentIndex].content_id;

      // Send POST request to record learned word
      try {
        const response = await fetch(getFetchBackendURL('/api/words-learned/create'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: userInfo,
            content: currentContentId,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to record learned word');
        }

        // go to the next content
        setCurrentIndex(() => {
          const nextIndex = currentIndex + 1 % content.length
          return nextIndex
        });
        console.log(currentIndex)
      } catch (error) {
        console.error('Error posting learned word:', error);
      }
    }
  };

  const handlePreviousContent = () => {
    if (content.length > 0) {
      setCurrentIndex(() => {
        const previousIndex = (content.length + currentIndex) % content.length - 1
        return previousIndex
      });
    }
  };

  const notifyLastContent = () => {
    toast.info('🦄 Wow so easy!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  return (
    <>
      <div className="flex flex-1 flex-col justify-center min-h-80 mt-12">
        {!isLearning ? (
          <div className="flex items-center justify-center mb-10 space-x-4">
            <img src="/new-expression-fox.png" alt="Expression Fox" className="w-16 h-16" />

            <button
              className="w-2/3 px-9 py-4 text-center text-white bg-cyan-700 rounded-lg shadow-lg hover:bg-cyan-900 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={handleStartLearning}
            >
              Start Learning
            </button>
          </div>
        ) : (
          <div className="md:max-w-md p-8 bg-white rounded-lg shadow-xl h-96">
            {content.length > 0 ? (
              <>
                <div className='h-80  overflow-y-auto'>
                  <h2 className="text-2xl font-bold mb-4">{content[currentIndex].japanese_slang}</h2>
                  <p className="mb-2">
                    <strong>English Slang:</strong> {content[currentIndex].english_slang}
                  </p>
                  <p className="mb-2">
                    <strong>Formal Version:</strong> {content[currentIndex].formal_version}
                  </p>
                  <p className="mb-4">
                    <strong>Description:</strong> {content[currentIndex].description}
                  </p>
                  {/* {(currentIndex === content.length - 1) && (
                    <div className="text-center mt-6">
                      <p className="mt-4 text-xl font-semibold text-red-700">
                        You have reached the end of the content! All the material is available in the flashcards to
                        practice. ↓
                      </p>
                    </div>
                  )} */}
                </div>
                <div className="flex justify-center mt-3">
                  {(
                    <button
                      className={`px-4 py-2 text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 ml-20 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                      onClick={handlePreviousContent}
                    >
                      Back
                    </button>
                  )}
                  {(
                    <button
                      className={`px-4 py-2 text-white bg-cyan-700 rounded-lg shadow-md hover:bg-cyan-900 ml-20 ${currentIndex === content.length - 1 ? 'opacity-0 pointer-events-none' : ''}`}
                      onClick={handleNextContent}
                    >
                      Next
                    </button>
                  )}
                </div>

              </>
            ) : (
              <p className="text-lg text-gray-700">No content available.</p>
            )}
          </div>
        )}
        <div className="mt-5 flex items-center justify-center space-x-4">
          <img src="/practice-nife.png" alt="Practice Nife" className="w-16 h-16" />
          <Link href={{ pathname: '/game/flash-card', query: { userInfo } }} passHref>
            <button className="w-2/3 px-9 py-4 text-center text-white bg-[var(--savoy-blue)] rounded-lg shadow-lg hover:bg-[#4152b3] focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out transform hover:scale-105">
              Go to Flashcards
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={1}
      />
    </>
  );
};

export default ExpressionPage;
