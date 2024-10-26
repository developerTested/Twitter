import React, { useState } from 'react'
import Input from './Input'
import { Form } from 'react-router-dom';
import { ImCross, ImPlus } from 'react-icons/im';

export default function Poll() {

    const [inputs, setInputs] = useState([{ answer: "" }, { answer: "" }]);

    const handleAddInput = () => {
        setInputs([...inputs, { answer: "" }]);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let { name, value } = event.target;
        let onChangeValue = [...inputs];
        onChangeValue[index][name] = value;
        setInputs(onChangeValue);
    };

    const handleDeleteInput = (index: number) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
    };

    return (
        <div>
            <Form className='flex flex-col gap-4'>
                {inputs.map((x, i) => <div className="flex items-center gap-2">

                    <div className="relative flex-auto">

                        <Input name="answer" key={i} placeholder={`Option ${i + 1}`} className='border border-gray-400' onChange={(event) => handleChange(event, i)} />

                        {i === inputs.length - 1 ? (
                            <button onClick={handleAddInput} className='absolute top-0 bottom-0 right-2 text-success'>
                                <ImPlus className='w-6 h-6' />
                            </button>
                        ) : ''}
                    </div>

                    {i > 1 ? (
                        <button onClick={() => handleDeleteInput(i)} className='text-danger'>
                            <ImCross className='w-6 h-6' />
                        </button>
                    ) : ''}
                </div>)}
            </Form>
        </div>
    )
}