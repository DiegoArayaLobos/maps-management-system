import Input from "../../layout/Input";
import { SearchStyled } from "./SearchStyled";

interface Search {
    label: string;
}

const Search = (props: Search) => {
    const { label } = props;

    return (
        <>
            <SearchStyled>
                <Input />
            </SearchStyled>
        </>
    );
};

export default Search;
