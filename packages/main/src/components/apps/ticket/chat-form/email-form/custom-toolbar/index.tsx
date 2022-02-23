import { Button, Spinner } from "@doar/components";
import { FC } from "react";
import { StyledToolbar, StyledToolbarWrap } from "../style";

type Props = {
    loading: boolean;
};
const CustomToolbar: FC<Props> = ({ loading }) => (
    <StyledToolbarWrap>
        <Button type="submit">
            {loading ? <Spinner color="white" size="xs" /> : "Reply"}
        </Button>
        <StyledToolbar id="toolbar">
            <span className="ql-formats">
                <button type="button" className="ql-bold" />
                <button type="button" className="ql-italic" />
                <button type="button" className="ql-underline" />
            </span>
            <span className="ql-formats">
                <button type="button" className="ql-link" />
                <button type="button" className="ql-image" />
            </span>
        </StyledToolbar>
    </StyledToolbarWrap>
);

export default CustomToolbar;
