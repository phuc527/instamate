import { useCallback } from "react";
import { useAppDispatch } from "src/redux/hooks";
import { start } from "src/redux/slices/ticket/mention";

const useFetchMention = (): [() => void] => {
    const dispatch = useAppDispatch();

    return [
        useCallback(() => {
            dispatch(start());
        }, [dispatch]),
    ];
};

export default useFetchMention;
