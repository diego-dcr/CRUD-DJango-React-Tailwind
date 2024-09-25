import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, getTask, updateTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      const res = await getTask(params.id);
      setValue("title", res.data.title);
      setValue("description", res.data.description);
    }

    loadTask();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success("Task updated");
    } else {
      await createTask(data);
      toast.success("Task created");
    }
    navigate("/tasks");
  });

  const onDelete = async () => {
    const accepted = window.confirm("Are you sure? ");
    if (accepted) {
      await deleteTask(params.id);
      toast.success("Task deleted");
      navigate("/tasks");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        />
        {errors.title && <span>Title is required</span>}
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        ></textarea>
        {errors.description && <span>Description is required</span>}
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
      </form>
      {params.id && <button className="bg-red-500 p-3 rounded-lg block w-full mt-3" onClick={onDelete}>Delete</button>}
    </div>
  );
}
