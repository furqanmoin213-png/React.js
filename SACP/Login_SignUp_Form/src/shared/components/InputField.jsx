
const InputFields = ({ label, id, name, type, placeholder, register, text }) => {
    
  return (
   <div className="flex flex-col w-full gap-3"><div className="flex gap-2 items-center">
     <label htmlFor={id} className="text-Login-Text">{label}</label>
   <span className="text-gray-500 text-sm ">{text}</span>
    </div>
            <input 
              type={type} 
              id={id} 
              name={name}
              placeholder={placeholder}
              {...register(name, { required: true })} 
              className="w-full px-4 py-4 border border-input-border text-gray-900"
            />
    </div>
  )
}

export default InputFields