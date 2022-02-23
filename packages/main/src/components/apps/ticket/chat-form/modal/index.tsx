import classnames from "classnames";
import { FC } from "react";
import { Portal } from "react-portal";
import { CSSTransition } from "react-transition-group";
import { StyledModal, StyledModalContent } from "./style";

export interface IProps {
    show: boolean;
    className?: string;
    onClose: () => void;
}
const EmailFormModal: FC<IProps> = ({
    show,
    onClose,
    className,
    children,
    ...restProps
}) => {
    return (
        <Portal>
            <>
                <StyledModal
                    $show={show}
                    className={classnames(className)}
                    onClick={onClose}
                    $centered
                    $size="md"
                    {...restProps}
                >
                    <CSSTransition
                        in={show}
                        timeout={0}
                        unmountOnExit
                        classNames="modal"
                    >
                        {() => (
                            <div className="modal-dialog">
                                <StyledModalContent
                                    className="modal-content"
                                    onClick={(e) => e.stopPropagation()}
                                    role="button"
                                    tabIndex={0}
                                >
                                    {children}
                                </StyledModalContent>
                            </div>
                        )}
                    </CSSTransition>
                </StyledModal>
            </>
        </Portal>
    );
};

export default EmailFormModal;
