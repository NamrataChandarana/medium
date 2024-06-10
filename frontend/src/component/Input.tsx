
interface InputProps {
    label: string;
    placeholder: string;
    type: string;
    id: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
  }
 const Input: React.FC<InputProps> = ({ label, placeholder, type, id, onChange, value }) =>  {
    return(
        <div className="space-y-2 px-8 ">
            <label htmlFor={id}>{label}</label><br />
            <input className="p-[.4rem] w-full  rounded-md" style={{ borderColor: "black"}} value={value} id={id} placeholder={placeholder} type={type} onChange={onChange} required />
        </div>
    )
}

export default Input