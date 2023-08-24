import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Task } from "../../interfaces/task";

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>();

  const onSubmit = async (data: Task) => {
    console.log({ data });
    try {
      const response = await axios.post("http://localhost:4000/tasks", data);
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-6 text-gray-700"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring"
          id="name"
          type="text"
          placeholder="Enter name"
          {...register("name", { required: true })}
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring"
          placeholder="Enter description"
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-red-500">Description is required</span>
        )}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="type"
        >
          Type
        </label>
        <select
          className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring text-gray-500"
          id="type"
          {...register("type", { required: true })}
        >
          <option value="Work">Work</option>
          <option value="Health">Health</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
        {errors.type && <span className="text-red-500">Type is required</span>}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dueDate"
        >
          Due Date
        </label>
        <input
          className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring"
          id="dueDate"
          type="date"
          {...register("dueDate", { required: true })}
        />
        {errors.dueDate && (
          <span className="text-red-500">Due Date is required</span>
        )}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
