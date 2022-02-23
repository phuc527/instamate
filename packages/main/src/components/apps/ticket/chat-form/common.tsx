import { Avatar, Text } from "@doar/components";
import debounce from "debounce-promise";
import { uniqBy } from "lodash-es";
import {
    components,
    MenuProps,
    Option,
    OptionProps,
    StylesConfig,
} from "react-select";
import { getChannelsApi } from "src/api/channel/channel";
import { getLeadsApi } from "src/api/lead/lead";
import { getPhoneNumbersApi } from "src/api/phoneNumber/phoneNumber";

export const promiseSearchChannel = (inputValue: string): Promise<Option[]> =>
    new Promise((resolve, reject) => {
        getChannelsApi({ name: inputValue })
            .then((r) =>
                resolve(
                    uniqBy(r.data, "name").map((c) => {
                        return {
                            label:
                                c.channelable_type ===
                                "App\\Models\\EmailChannel"
                                    ? `${[
                                          c.name,
                                          c?.channelable?.api_integration
                                              ?.username,
                                      ]
                                          .filter((i) => !!i)
                                          .join(" • ")}`
                                    : `${[
                                          c.name,
                                          c.channelable?.phone_number
                                              ?.phone_sid,
                                      ]
                                          .filter((i) => !!i)
                                          .join(" • ")}`,
                            value: String(c.id),
                        };
                    }) || []
                )
            )
            .catch((e) => reject(e));
    });

export const promiseSearchPhoneNumber = (
    inputValue: string
): Promise<Option[]> =>
    new Promise((resolve, reject) => {
        getPhoneNumbersApi({ phone: inputValue })
            .then((r) =>
                resolve(
                    uniqBy(r.data, "name").map((i) => ({
                        label: i.phone,
                        value: String(i.id),
                    })) || []
                )
            )
            .catch((e) => reject(e));
    });

const promiseSearchLead = (inputValue: string): Promise<Option[]> =>
    new Promise((resolve, reject) => {
        getLeadsApi({ keyword: inputValue, limit: 5 })
            .then((r) =>
                resolve(
                    uniqBy(r.data, "email").map((i) => ({
                        label: [i.first_name, i.last_name].join(" "),
                        value: i.email,
                        meta: {
                            avatar:
                                i.staff?.photo ||
                                `https://ui-avatars.com/api/?name=${String(
                                    i.first_name
                                )}+${String(i.last_name)}`,
                            lead_id: i.id,
                        },
                    })) || []
                )
            )
            .catch((e) => reject(e));
    });
export const handleSearchLead = debounce(promiseSearchLead, 700);
export const handleSearchPhoneNumber = debounce(promiseSearchPhoneNumber, 500);
export const handleSearchChannel = debounce(promiseSearchChannel, 500);

export const selectStyle: (hasError: boolean) => StylesConfig<Option, true> = (
    hasError = false
) => ({
    valueContainer: (base) => ({
        ...base,
        padding: "0",
    }),
    container: (base) => ({
        ...base,
        flexGrow: 1,
        // borderBottom: `1px solid`,
        // borderBottomColor: String(themeGet("colors.gray200")),
    }),
    control: (base) => ({
        ...base,
        ...(hasError
            ? {
                  border: "none",
                  boxShadow: "none",
                  borderBottom: "1px solid #dc3545",
              }
            : {
                  border: "none",
                  boxShadow: "none",
                  borderBottom: `1px solid #e3e7ed`,
              }),
    }),
    input: (base) => ({
        ...base,
        margin: 0,
        padding: 0,
    }),
    noOptionsMessage: () => ({
        display: "none",
    }),
});

export const Menu = (props: MenuProps<Option, true>): JSX.Element => {
    const { options, children } = props;

    if (options.length === 0) {
        return <></>;
    }
    return <components.Menu {...props}>{children}</components.Menu>;
};

export const CustomOption = (props: OptionProps<Option, true>): JSX.Element => {
    const { children, data } = props;

    return (
        <components.Option {...props}>
            <div style={{ display: "flex", alignItems: "center" }}>
                {data.meta?.avatar && (
                    <Avatar size="xs">
                        <img src={String(data.meta?.avatar)} alt="avatar" />
                    </Avatar>
                )}
                <Text
                    as="span"
                    ml={data.meta?.avatar ? "5px" : "0px"}
                    width="100%"
                >
                    {children}
                </Text>
            </div>
        </components.Option>
    );
};
