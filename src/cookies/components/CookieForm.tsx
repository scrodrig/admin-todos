'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { cookies } from 'next/headers'

interface CookieFormProps {
  cookies: { name: string; value: string }[]
}

type Inputs = {
  [key: string]: string
}

export const CookieForm = ({ cookies = [] }: CookieFormProps) => {
  const inputs: Inputs = {
    description: 'test',
    title: 'test',
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch('title')) // watch input value by passing the name of it
  return (
    <div className="flex flex-col w-full bg-gray-100 shadow-sm p-5 border-dashed border border-gray-500">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <legend className="w-full text-2xl align-middle font-semibold text-gray-700 text-center mt-5">
          Cookies
        </legend>

        {cookies.map((cookie) => {
          return (
            <div key={cookie.name} className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                {cookie.name}
              </label>
              <input
                readOnly
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                defaultValue={cookie.value}
                {...register('title', { disabled: true })}
              />
            </div>
          )
        })}
      </form>
    </div>
  )
}
