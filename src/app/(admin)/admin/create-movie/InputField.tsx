interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  id: string;
  isTextArea?: boolean;
  className?: string;
}

const InputField = ({ label, type = "text", placeholder, id, isTextArea, className }: InputFieldProps) => {
  const inputClasses = "p-3.5 bg-slate-900/60 border border-slate-400/20 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-slate-500";
  
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-xs font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </label>
      {isTextArea ? (
        <textarea id={id} required placeholder={placeholder} name={id} className={`${inputClasses} min-h-[100px] resize-vertical`} />
      ) : (
        <input type={type} required id={id} placeholder={placeholder} className={inputClasses} name={id}/>
      )}
    </div>
  );
};  

export default InputField;