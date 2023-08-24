import Form from "../components/Form";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Create a New Task
        </h1>

        <Form />
      </div>
    </div>
  );
}
