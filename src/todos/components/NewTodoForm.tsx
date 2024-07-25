import React from 'react'
import { CiSaveUp1 } from 'react-icons/ci'
import { IoMdClose } from 'react-icons/io'
import { Checkbox } from './Checkbox'

interface NewTodoFormProps {
  onSubmit: (e: React.FormEvent) => void
  onClose: () => void
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
  date: string
  setDate: (date: string) => void
  suggestions: { label: string; value: boolean }[]
  handleChange: (suggestion: { label: string; value: boolean }) => void
}

export const NewTodoForm = ({
  onSubmit,
  onClose,
  title,
  setTitle,
  description,
  setDescription,
  date,
  setDate,
  suggestions,
  handleChange,
}: NewTodoFormProps) => {
  const maxDate = new Date().toISOString().split('T')[0]
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full bg-gray-100 shadow-sm p-5 border-dashed border border-gray-500">
      <div className="flex flex-col-2">
        <h2 className="w-11/12 text-2xl align-middle font-semibold text-gray-700 text-center mt-5">
          New Todo
        </h2>
        <div
          className="flex w-1/12 items-end justify-end mr-5 mt-5 text-gray-500"
          onClick={() => onClose()}>
          <IoMdClose size={50} />
        </div>
      </div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        type="text"
        className="w-12/12 ml-10 mr-10 pl-3 mt-8 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="What is done?"
      />

      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        maxLength={200}
        className="w-12/12 ml-10 mr-10 mt-5 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="Provide a description"
      />

      <input
        type="date"
        id="start"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className="w-12/12 ml-10 mr-10 mt-5 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        min={`2024-01-01`}
        max={maxDate}
      />

      <div className="flex flex-col ml-10 mr-10 mt-5 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all">
        <div className="grid sm:grid-cols-2 sm:text-left mt-3">
          {suggestions.map((suggestion) => (
            <Checkbox
              key={suggestion.label}
              label={suggestion.label}
              value={suggestion.value}
              onChange={() => {
                handleChange(suggestion)
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col-2 items-center justify-center mt-8 mb-5">
        <button
          type="submit"
          className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
          <CiSaveUp1 />
          <span className="ml-2">Create</span>
        </button>

        <button
          onClick={() => onClose()}
          type="button"
          className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
          <IoMdClose />
          <span className="ml-2">Cancel</span>
        </button>
      </div>
    </form>
  )
}
