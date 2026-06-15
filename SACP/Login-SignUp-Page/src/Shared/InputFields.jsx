
const InputFields = ({ label, id, name, type, placeholder, register }) => {
    
  return (
    <div className="flex flex-col gap-3 w-full"> <label htmlFor={id} className="text-sm text-Login-Text">{label}</label>
            <input 
              type={type} 
              id={id} 
              name={name}
              placeholder={placeholder}
              {...register(name, { required: true })} 
              className="w-full px-4 py-3 border border-input-border text-[1.1rem] text-gray-900"
            />
    </div>
  )
}

export default InputFields