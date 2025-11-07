import { redirect, useFetcher, type ActionFunctionArgs } from 'react-router';

export function Login() {
  const fetcher = useFetcher();

  const handleSubmit = (formData: FormData) => {
    const user = formData.get('user');
    if (user) {
      fetcher.submit(JSON.stringify({ user }), {
        method: 'post',
        encType: 'application/json',
      });
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 max-w-md ">
      Login form
      <form action={handleSubmit} className="space-y-2">
        <label className="flex flex-col">
          Test
          <input
            type="text"
            name="user"
            className="border-black border rounded-md"
          />
        </label>
        <button className="bg-black text-white rounded-md p-2">Submit </button>
      </form>
    </div>
  );
}

async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();

  const TWO_MINUTES_MS = 2 * 60 * 1000; // 120,000 milliseconds

  const token = new Date().getTime() + TWO_MINUTES_MS;

  localStorage.setItem('token', token.toString());

  // Redirect to previous page
  const url = new URL(request.url);
  const from = url.searchParams.get('from') || '/';

  throw redirect(from);
}

Login.action = action;
