import { ChangeEvent } from "react";
import { InputStyled } from "./InputStyled";

interface InputInterface {
    value?: string;
    id?: string;
    validate?: boolean;
    onChange?: (e: ChangeEvent) => void;
}

const Input = (props: InputInterface) => {
    const { value, id, validate = false, onChange } = props;
    return (
        <>
            <InputStyled validate={validate}>
                <input id={id} type="text" value={value} onChange={onChange} required />
            </InputStyled>
        </>
    );
};

export default Input;
