/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useCallback, useEffect } from "react";

const useOnEscape = (action: () => void): void => {
    window &&
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                action();
            }
        });
};

export default useOnEscape;
