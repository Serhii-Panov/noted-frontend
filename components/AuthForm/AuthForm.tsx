
const AuthForm = ({ handleSubmit, error, title }: { handleSubmit: (formData: FormData) => void; error?: string; title: string }) => {
return (
      <form className="flex flex-col gap-4 max-w-[400px] mx-auto my-9 p-6 border bg-white rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] " action={handleSubmit}>
        <h1 className="text-2xl font-semibold text-center mb-2 text-[#212529]">{title}</h1>

        <div className="flex flex-col text-sm font-medium text-[#212529]">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1 px-2 py-3 text-sm border border-[#ced4da] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0d6efd] focus:border-[#0d6efd] "
            required
          />
        </div>

        <div className="flex flex-col text-sm font-medium text-[#212529]">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="mt-1 px-2 py-3 text-sm border border-[#ced4da] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#0d6efd] focus:border-[#0d6efd] "
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button type="submit" className="px-4 py-2 bg-[#0d6efd] text-white border-none rounded-sm hover:bg-[#0b5ed7] transition-colors duration-200 ease-in-out cursor-pointer">
            {title === "Sign in" ? "Log in" : "Register"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm text-center mt-1">{error}</p>}
      </form>
  )
}

export default AuthForm