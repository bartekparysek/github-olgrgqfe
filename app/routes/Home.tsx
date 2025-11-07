import { useFetcher, type ActionFunctionArgs } from 'react-router';
import { useState, useEffect } from 'react';

export function Home() {
  const fetcher = useFetcher();
  const token = localStorage.getItem('token');
  const [timeLeft, setTimeLeft] = useState<string>('');

  const handleSubmit = (formData: FormData) => {
    fetcher.submit(formData, {
      method: 'post',
    });
  };

  useEffect(() => {
    if (!token) return;

    const updateTimer = () => {
      const now = Date.now();
      const tokenExpiry = parseInt(token, 10);
      const remaining = tokenExpiry - now;

      if (remaining <= 0) {
        setTimeLeft('Token expired');
        return;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="text-center p-4">
      <h1 className="text-2xl">Hello</h1>

      {token && (
        <div className="my-4 p-4 bg-green-100 rounded-lg max-w-md mx-auto">
          <p className="text-green-800 font-medium">
            Token valid for:{' '}
            <span className="font-bold text-lg">{timeLeft}</span>
          </p>
        </div>
      )}

      <form action={handleSubmit} className="mt-8 max-w-md mx-auto">
        <input
          type="text"
          name="message"
          placeholder="Enter a message"
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <a
        className="block mt-8 text-blue-500 underline hover:text-blue-600"
        href="https://reactrouter.com/docs"
      >
        React Router Docs
      </a>
    </div>
  );
}

function loader() {
  return { name: 'React Router', timestamp: new Date().toISOString() };
}

async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const message = formData.get('message');
  console.log('Action received:', message);
  return { success: true, message };
}

Home.loader = loader;
Home.action = action;
