import { FC } from "react";
import {
    LogOut
} from "react-feather";
import { useAppDispatch } from "src/redux/hooks";
import { doLogout } from "src/redux/slices/authentication";
import {
    StyledDropItem
} from "./style";

const Logout: FC = () => {
    const dispatch = useAppDispatch();
    const signOut = () => {
        dispatch(doLogout());
    }
    return (
        <>
            <StyledDropItem path="/login" mt="10px" onClick={signOut}>
                <LogOut size="24" />
                    Sign Out
            </StyledDropItem>
        </>
    )
}

export default Logout;