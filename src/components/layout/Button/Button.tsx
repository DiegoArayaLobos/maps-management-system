import { useRef } from "react";
import styled from "./ButtonStyled.module.css";

interface ButtonInterface {
    className: string;
    content: JSX.IntrinsicAttributes | string;
    onClick?: () => void;
}

const Button = (props: ButtonInterface) => {
    const { content, className, onClick = () => {} } = props;

    const rippleRoot = useRef<HTMLHeadingElement>(null);
    // const [count, setcount] = useState<boolean[]>([]);

    const rippleEffect = (event: React.MouseEvent) => {
        // const nativeEvent = event.nativeEvent;
        // const target = event.target as HTMLInputElement;
        // if (rippleRoot.current !== null) {
        //     let span = document.createElement("span");
        //     span.setAttribute("class", styled.spanChildOn);
        //     span.style.top = nativeEvent.offsetY - target.clientWidth / 2 + "px";
        //     span.style.left = nativeEvent.offsetX - target.clientWidth / 2 + "px";
        //     span.style.width = target.clientWidth + "px";
        //     span.style.height = target.clientWidth + "px";
        //     rippleRoot.current.appendChild(span);
        //     setcount((arrPrev: boolean[]) => [...arrPrev, true]);
        // }
        // console.log("down");
    };

    const pressUp = () => {
        // setTimeout(() => {
        //     if (rippleRoot.current !== null) {
        //         let childs = rippleRoot.current.children.length;
        //         for (let index = 0; index < childs; index++) {
        //             rippleRoot.current.children[index].className = styled.spanChildOff;
        //         }
        //     }
        // }, 300);
        // console.log("up");
    };

    const onClickEffect = () => {
        onClick();
        // setTimeout(() => {
        //     if (rippleRoot.current !== null) {
        //         let lastChild = rippleRoot.current.children.length - 1;
        //         rippleRoot.current.removeChild(rippleRoot.current.childNodes[lastChild]);
        //     }
        // }, 500);
        // console.log("click");
    };

    if (rippleRoot.current !== null) {
        // console.log(rippleRoot.current);
    }

    return (
        <>
            <button
                className={`${className} ${styled.button}`}
                onMouseDown={rippleEffect}
                onMouseUp={pressUp}
                onClick={() => {
                    onClickEffect();
                }}
            >
                <span className={styled.spanContent}>{content}</span>
                <span className={`rippleRoot`} ref={rippleRoot} />
            </button>
        </>
    );
};

export default Button;
