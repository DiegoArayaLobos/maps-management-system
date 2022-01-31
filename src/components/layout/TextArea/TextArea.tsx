import { ChangeEvent } from "react";
import { TextAreaStyled } from "./TextAreaStyled";

interface TextAreaInterface {
    value?: string;
    id?: string;
    validate?: boolean;
    onChange?: (e: ChangeEvent) => void;
}

const TextArea = (props: TextAreaInterface) => {
    const { value, id, validate = false, onChange } = props;
    return (
        <>
            <TextAreaStyled validate={validate}>
                <textarea name="" id={id} value={value} cols={30} rows={10} onChange={onChange}></textarea>
            </TextAreaStyled>
        </>
    );
};

export default TextArea;
