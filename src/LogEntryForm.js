import React from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './API';
const LogEntryForm = ({ location }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.latitude = location.latitude;
    data.longitude = location.longitude;

    try {
      const created = await createLogEntry(data);
      console.log(created);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" required {...register('title')} />
      <label htmlFor="comments">Comment</label>
      <textarea
        type="text"
        name="comments"
        rows={3}
        style={{ resize: 'none' }}
        required
        {...register('comments')}
      ></textarea>
      <label htmlFor="description">Description</label>
      <textarea
        type="text"
        name="description"
        rows={3}
        style={{ resize: 'none' }}
        required
        {...register('description')}
      ></textarea>
      <label htmlFor="image">Image</label>
      <input type="text" name="image" {...register('image')} />
      <label htmlFor="VisitDate">Visit Date</label>
      <input type="date" name="VisitDate" required {...register('date')} />
      <button>Create Log</button>
    </form>
  );
};

export default LogEntryForm;
