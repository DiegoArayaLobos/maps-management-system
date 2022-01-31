import ReactSelect from "react-select";
import { SelectStyled } from "./SelectStyled";

interface SelectInterface {
    options: { value: string; label: string }[] | { label: string; options: { label: string; value: string }[] }[];
    defaultValue?: { value: string; label: string };
    isSearchable?: boolean;
    onChange?: (
        e: {
            value: string;
            label: string;
        } | null
    ) => void;
    isDisabled?: boolean;
    id: string;
    value: { value: string; label: string };
    validate?: boolean;
}

const Select = (props: SelectInterface) => {
    const { options, defaultValue, isSearchable = true, onChange = () => {}, isDisabled = false, id, value, validate = false } = props;

    return (
        <>
            <SelectStyled validate={validate}>
                <ReactSelect id={id} onChange={(e) => onChange(e)} className={`select`} classNamePrefix="filter" options={options} defaultValue={defaultValue} isSearchable={isSearchable} noOptionsMessage={() => "Sin resultados"} isDisabled={isDisabled} value={value} />
            </SelectStyled>
        </>
    );
};

export default Select;
