import { FC } from "react";
import {
    DataFunc,
    DisplayTransformFunc,
    Mention,
    MentionsInput,
    OnChangeHandlerFunc,
    SuggestionDataItem,
} from "react-mentions";
import * as React from "react";
import { DropdownItem } from "@doar/components";
import classNames from "./mentions.module.css";

export interface MentionProps {
    value: string;
    onChange?: OnChangeHandlerFunc | undefined;
    placeholder?: string | undefined;
    onBlur?:
        | ((
              event:
                  | React.FocusEvent<HTMLInputElement>
                  | React.FocusEvent<HTMLTextAreaElement>,
              clickedSuggestion: boolean
          ) => void)
        | undefined;
    onSelect?: ((event: React.UIEvent) => void) | undefined;
    onKeyDown?:
        | ((
              event:
                  | React.KeyboardEvent<HTMLTextAreaElement>
                  | React.KeyboardEvent<HTMLInputElement>
          ) => void)
        | undefined;
    trigger?: string | RegExp;
    isLoading?: boolean | undefined;
    className?: string | undefined;
    data: SuggestionDataItem[] | DataFunc;
    onSelectionClick?: (e: React.MouseEvent) => void;
    renderSuggestion?:
        | ((
              suggestion: SuggestionDataItem,
              search: string,
              highlightedDisplay: React.ReactNode,
              index: number,
              focused: boolean
          ) => React.ReactNode)
        | undefined;
    displayTransform?: DisplayTransformFunc;
    forceSuggestionsAboveCursor?: boolean;
    allowSuggestionsAboveCursor?: boolean;
    suggestionsPortalHost?: Element;
}

const Mentions: FC<MentionProps> = ({
    value,
    placeholder,
    onSelectionClick,
    onChange,
    onKeyDown,
    onBlur,
    trigger,
    data,
    forceSuggestionsAboveCursor = true,
    allowSuggestionsAboveCursor = true,
    suggestionsPortalHost,
    ...restProps
}) => {
    const renderSuggestion = (
        suggestion: SuggestionDataItem,
        search: string,
        highlightedDisplay: React.ReactNode,
        index: number,
        focused: boolean
    ) => {
        return (
            <DropdownItem active={focused} path="#" onClick={onSelectionClick}>
                {suggestion.display}
            </DropdownItem>
        );
    };
    const displayTransform = (id: string, display: string): string => {
        return `@${display.replace(/\s+/g, ".")}`;
    };
    return (
        <MentionsInput
            suggestionsPortalHost={suggestionsPortalHost}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            classNames={classNames}
            placeholder={placeholder}
            forceSuggestionsAboveCursor={forceSuggestionsAboveCursor}
            allowSuggestionsAboveCursor={allowSuggestionsAboveCursor}
        >
            <Mention
                trigger={trigger ?? "@"}
                data={data}
                renderSuggestion={
                    restProps.renderSuggestion ?? renderSuggestion
                }
                displayTransform={
                    restProps.displayTransform ?? displayTransform
                }
                style={{
                    background: "#c6dcf9",
                    borderRadius: "2px",
                    boxShadow: "0 0 0 1px #98c0f4",
                    zIndex: 999,
                    cursor: "pointer",
                }}
            />
        </MentionsInput>
    );
};
export default Mentions;
